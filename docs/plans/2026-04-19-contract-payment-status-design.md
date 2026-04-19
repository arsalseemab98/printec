# Contract Payment Status + Customer Linking Fix

**Date:** 2026-04-19
**Scope:** Add payment tracking to contracts; fix bug where contract-created customers don't appear in Customers list.

## Problem

1. **No payment tracking on contracts.** The `contracts` table tracks signing status (Pending/Sent/Signed/Completed/Cancelled) but not whether the customer has paid. Admin has no way to record or notify a customer about payment progress.
2. **Customer-not-added bug.** When admin creates a contract via `BookingModal` or `/admin/contracts/new` without picking an existing inquiry, the contract row is inserted directly into `contracts` with `inquiry_id = null`. The Customers page (`GET /api/admin/customers`) only merges `inquiries` + `catalog_leads` — these contract-only clients never appear.

## Goals

- Admin can set a contract to **Not Paid / Half Paid / Full Paid** from the contract detail page.
- Admin can manually send a payment-status email to the customer with one click.
- Every contract created from admin shows up in Customers, regardless of entry point.

## Non-Goals

- Auto-deriving payment status from `advance_amount` / `total_price`.
- Payment ledger / multiple payment events / partial-amount tracking beyond the three labels.
- Auto-sending payment emails on status change.
- Customer-facing payment portal.

## Design

### 1. Schema change

Add one column to `contracts`:

```sql
ALTER TABLE contracts
  ADD COLUMN payment_status text NOT NULL DEFAULT 'Not Paid'
    CHECK (payment_status IN ('Not Paid', 'Half Paid', 'Full Paid'));

ALTER TABLE contracts
  ADD COLUMN payment_email_sent_at timestamptz NULL;
```

Default `'Not Paid'` covers all existing rows. No migration of historical data needed.

### 2. Contract detail page (`/admin/contracts/[id]`)

- New section "Payment" with a dropdown (Not Paid / Half Paid / Full Paid). Saves via existing `PUT /api/admin/contracts/[id]` (add `payment_status` to the `allowed` list).
- New button "Send Payment Update Email" — disabled when `client_email` is missing or when `payment_status === 'Not Paid'` (no need to notify a customer they haven't paid). Tooltip explains the disable reason.
- Last-sent timestamp shown under the button when present.

### 3. Payment update email

New endpoint: `POST /api/admin/contracts/[id]/send-payment-update`.

- Mirrors `src/app/api/admin/contracts/[id]/send/route.ts` (Microsoft Graph + dark-themed HTML, escapeHtml helper).
- Subject: `Payment Update — Contract {contract_number}`.
- Body content varies by status:
  - **Half Paid:** Confirms partial payment received, reminds of remaining balance (`balance_amount`) and `balance_due` text.
  - **Full Paid:** Thanks customer, confirms paid in full, attaches no PDF.
- 400 if `payment_status === 'Not Paid'` or `client_email` missing.
- On success, set `payment_email_sent_at = now()`.

### 4. Bug fix — customer linking (both A and C from approaches)

**Fix A — auto-create inquiry on contract POST.**
In `POST /api/admin/contracts`, if `inquiry_id` is null AND `client_name` is provided:

1. INSERT into `inquiries`: `name = client_name`, `email = client_email`, `service = service_description || category`, `status = 'Booked'`, `source = 'contract'`.
2. Use the returned id as `contracts.inquiry_id`.
3. Wrap the two inserts so a failure on inquiry creation does not silently drop the contract — log and continue with `inquiry_id = null` (the safety-net fix C still surfaces them).

**Fix C — safety net in customers API.**
In `GET /api/admin/customers`, also `SELECT id, client_name, client_email, service_description, status, created_at FROM contracts WHERE inquiry_id IS NULL`. Merge as `type: 'contract'`, `source: 'Contract'`. Dedupe is unnecessary because the fix A path always sets `inquiry_id`.

### 5. UI surfaces (small)

- `/admin/contracts` list: small payment-status pill next to existing status pill (`Not Paid` = gray, `Half Paid` = orange, `Full Paid` = green).
- Dashboard / Statistics: out of scope for this change.

## Data Flow

```
Admin updates payment_status on detail page
   → PUT /api/admin/contracts/[id]   (writes payment_status)

Admin clicks "Send Payment Update"
   → POST /api/admin/contracts/[id]/send-payment-update
   → Graph API send  → set payment_email_sent_at

Admin creates contract (no inquiry)
   → POST /api/admin/contracts
       → INSERT inquiry (status=Booked, source=contract)
       → INSERT contract with inquiry_id

Customers page
   → GET /api/admin/customers
       → inquiries  ∪  catalog_leads  ∪  contracts WHERE inquiry_id IS NULL
```

## Error Handling

- Send-payment-update endpoint mirrors existing send route's try/catch + 500 fallback.
- Inquiry-auto-create failure is logged, contract still inserts (safety net catches it).
- Schema CHECK constraint rejects invalid payment_status values at the DB layer.

## Testing

- Manual: set each of the three statuses, send email at Half Paid and Full Paid, verify email lands and timestamp updates. Confirm "Send" disabled at Not Paid.
- Manual: create contract via BookingModal with new email — verify it appears in Customers list and a corresponding inquiry exists with status Booked.
- Manual: create contract via `/admin/contracts/new` without inquiry_id — same checks.
- Migration safety: existing contracts default to `Not Paid` — confirm no NULLs after `ALTER TABLE`.
- Update `TDD.md` with the three new test cases.

## Files Touched

- `supabase` migration (manual SQL via dashboard or `scripts/`).
- `src/app/api/admin/contracts/route.ts` — auto-create inquiry; pass `payment_status` through.
- `src/app/api/admin/contracts/[id]/route.ts` — add `payment_status` to allowed list.
- `src/app/api/admin/contracts/[id]/send-payment-update/route.ts` — new file.
- `src/app/api/admin/customers/route.ts` — merge orphan contracts.
- `src/app/admin/contracts/[id]/page.tsx` — payment dropdown + send button.
- `src/app/admin/contracts/page.tsx` — payment-status pill in list.
- `CLAUDE.md`, `TDD.md`, `DEVLOG.md` — update per project convention.
