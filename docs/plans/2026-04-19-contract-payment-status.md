# Contract Payment Status + Customer Linking Fix — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Not Paid / Half Paid / Full Paid tracking to contracts with admin-triggered customer email, and ensure every admin-created contract appears in the Customers list.

**Architecture:** Single new `payment_status` column on `contracts` (CHECK-constrained), plus `payment_email_sent_at` timestamp. New manual send endpoint mirrors existing contract-send route. Bug fix auto-creates an `inquiries` row when admin creates a contract without one, plus a safety-net merge in `GET /api/admin/customers` for any orphan contracts.

**Tech Stack:** Next.js 16 App Router · TypeScript · Supabase (Postgres + service role) · Microsoft Graph API · React (client components, no test runner — manual verification tracked in TDD.md).

**Design doc:** `docs/plans/2026-04-19-contract-payment-status-design.md`

---

## Conventions

- Project has no automated test runner. Each task's "verify" step is manual testing in dev (`npx next dev -p 3424`) plus build check (`npx next build`).
- Update `TDD.md` and `DEVLOG.md` per project rules in the final task.
- Commit after every task.
- Don't run `git push` — user does that.

---

## Task 1: Add `payment_status` + `payment_email_sent_at` columns to `contracts`

**Files:**
- Modify (Supabase): `contracts` table via SQL editor.
- Create: `scripts/migrations/2026-04-19-add-payment-status.sql` (record the SQL in repo for history).

**Step 1: Write the migration SQL file**

Create `scripts/migrations/2026-04-19-add-payment-status.sql`:

```sql
ALTER TABLE contracts
  ADD COLUMN payment_status text NOT NULL DEFAULT 'Not Paid'
    CHECK (payment_status IN ('Not Paid', 'Half Paid', 'Full Paid'));

ALTER TABLE contracts
  ADD COLUMN payment_email_sent_at timestamptz NULL;
```

**Step 2: Apply migration in Supabase**

Open Supabase SQL Editor for project `eofjaizkkxqxbynnvemi`. Paste the file contents. Run.

**Step 3: Verify**

In SQL editor:

```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'contracts'
  AND column_name IN ('payment_status', 'payment_email_sent_at');
```

Expected: 2 rows. `payment_status` default `'Not Paid'::text`. `payment_email_sent_at` default NULL.

```sql
SELECT count(*) FROM contracts WHERE payment_status IS NULL;
```

Expected: `0`.

**Step 4: Commit**

```bash
git add scripts/migrations/2026-04-19-add-payment-status.sql
git commit -m "db: add payment_status and payment_email_sent_at to contracts"
```

---

## Task 2: Allow `payment_status` updates via PUT route

**Files:**
- Modify: `src/app/api/admin/contracts/[id]/route.ts:32-48` (the `allowed` array)

**Step 1: Add `payment_status` and `payment_email_sent_at` to `allowed` array**

Edit `src/app/api/admin/contracts/[id]/route.ts`. In the `allowed` array (currently lines ~32-48), add two entries at the end:

```typescript
const allowed = [
  "inquiry_id",
  "event_date",
  "venue",
  "service_description",
  "total_price",
  "advance_amount",
  "balance_amount",
  "balance_due",
  "travel_cost",
  "client_name",
  "client_email",
  "terms",
  "status",
  "completed_at",
  "category",
  "payment_status",
  "payment_email_sent_at",
];
```

**Step 2: Verify build**

Run: `npx next build`
Expected: build succeeds, no type errors.

**Step 3: Manual smoke test**

Start dev server: `npx next dev -p 3424`. In another terminal:

```bash
# Replace <ID> with a real contract id from /admin/contracts
curl -X PUT http://localhost:3424/api/admin/contracts/<ID> \
  -H "Content-Type: application/json" \
  -H "Cookie: $(cat ~/.printec-admin-cookie 2>/dev/null || echo 'admin_session=...')" \
  -d '{"payment_status":"Half Paid"}'
```

Expected: 200 with the updated contract row showing `payment_status: "Half Paid"`.

If you don't have a session cookie handy, skip the curl and test via the UI in Task 6.

**Step 4: Commit**

```bash
git add src/app/api/admin/contracts/[id]/route.ts
git commit -m "api: allow payment_status updates on contracts PUT"
```

---

## Task 3: Auto-create `inquiries` row when contract created without one

**Files:**
- Modify: `src/app/api/admin/contracts/route.ts:26-73` (the `POST` handler)

**Step 1: Add the inquiry-create step before the contract insert**

Replace the existing `POST` function in `src/app/api/admin/contracts/route.ts` with:

```typescript
export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();

  const { count, error: countError } = await supabase
    .from("contracts")
    .select("*", { count: "exact", head: true });

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  const contractNumber = `PC-${String((count ?? 0) + 1).padStart(3, "0")}`;

  const totalPrice = Number(body.total_price) || 0;
  const advanceAmount = Number(body.advance_amount) || 0;
  const balanceAmount = totalPrice - advanceAmount;

  // If admin created the contract without picking an inquiry, mint one so the
  // customer surfaces in the Customers list and CRM pipeline.
  let inquiryId: string | null = body.inquiry_id || null;
  if (!inquiryId && body.client_name) {
    const { data: newInquiry, error: inqErr } = await supabase
      .from("inquiries")
      .insert({
        name: body.client_name,
        email: body.client_email || null,
        service: body.service_description || body.category || null,
        status: "Booked",
        source: "contract",
      })
      .select("id")
      .single();

    if (inqErr) {
      // Surface loudly — user explicitly does not want silent fallbacks.
      console.error("Auto-create inquiry failed:", inqErr);
      return NextResponse.json(
        { error: `Failed to create linked inquiry: ${inqErr.message}` },
        { status: 500 }
      );
    }
    inquiryId = newInquiry?.id ?? null;
  }

  const { data, error } = await supabase
    .from("contracts")
    .insert({
      inquiry_id: inquiryId,
      contract_number: contractNumber,
      event_date: body.event_date || null,
      venue: body.venue || null,
      service_description: body.service_description || null,
      total_price: totalPrice,
      advance_amount: advanceAmount,
      balance_amount: balanceAmount,
      balance_due: body.balance_due || null,
      travel_cost: Number(body.travel_cost) || 0,
      client_name: body.client_name || null,
      client_email: body.client_email || null,
      terms: Array.isArray(body.terms) ? body.terms : [],
      category: body.category || "Other",
      status: body.status || "Pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
```

**Step 2: Verify the `inquiries` table accepts `source = 'contract'`**

In Supabase SQL editor:

```sql
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'inquiries' AND column_name = 'source';
```

Expected: column exists, type `text`. If a CHECK constraint restricts values, run:

```sql
SELECT pg_get_constraintdef(oid) FROM pg_constraint
WHERE conrelid = 'inquiries'::regclass AND contype = 'c';
```

If `source` is constrained and `'contract'` is not allowed, drop+re-add the CHECK to include `'contract'` before continuing.

**Step 3: Manual smoke test (dev)**

1. `npx next dev -p 3424`
2. Visit `/admin/calendar`, click "+ Add Booking", fill a fake `Test User` + `test@example.com`, submit.
3. Visit `/admin/customers`. Expected: `Test User` appears in the list with `Booked` status.
4. In Supabase: `SELECT id, name, status, source FROM inquiries WHERE name='Test User';` — one row, `status='Booked'`, `source='contract'`.
5. Cleanup: delete the test contract from `/admin/contracts/[id]` and the inquiry from Supabase.

**Step 4: Commit**

```bash
git add src/app/api/admin/contracts/route.ts
git commit -m "api: auto-create inquiry when contract created without one"
```

---

## Task 4: Safety-net merge of orphan contracts in customers API

**Files:**
- Modify: `src/app/api/admin/customers/route.ts`

**Step 1: Add a third query for orphan contracts and merge**

Replace the file with:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerClient();

  const { data: inquiries, error: inqError } = await supabase
    .from("inquiries")
    .select("id, name, email, phone, service, status, source, created_at")
    .order("created_at", { ascending: false });

  const { data: leads, error: leadError } = await supabase
    .from("catalog_leads")
    .select("id, name, email, catalog_slug, created_at")
    .order("created_at", { ascending: false });

  // Safety net: contracts with no linked inquiry should still surface here.
  const { data: orphanContracts, error: contractError } = await supabase
    .from("contracts")
    .select("id, client_name, client_email, service_description, status, created_at")
    .is("inquiry_id", null)
    .order("created_at", { ascending: false });

  if (inqError || leadError || contractError) {
    return NextResponse.json(
      { error: inqError?.message || leadError?.message || contractError?.message },
      { status: 500 }
    );
  }

  const unified = [
    ...(inquiries || []).map((inq) => ({
      id: inq.id,
      name: inq.name,
      email: inq.email,
      phone: inq.phone || "",
      service: inq.service || "",
      status: inq.status || "New",
      source: inq.source || "",
      type: "inquiry" as const,
      created_at: inq.created_at,
    })),
    ...(leads || []).map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: "",
      service: lead.catalog_slug || "",
      status: "Lead",
      source: "Catalog: " + (lead.catalog_slug || ""),
      type: "catalog_lead" as const,
      created_at: lead.created_at,
    })),
    ...(orphanContracts || []).map((c) => ({
      id: c.id,
      name: c.client_name || "",
      email: c.client_email || "",
      phone: "",
      service: c.service_description || "",
      status: c.status || "Pending",
      source: "Contract",
      type: "contract" as const,
      created_at: c.created_at,
    })),
  ];

  unified.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return NextResponse.json(unified);
}
```

**Step 2: Verify build**

Run: `npx next build`
Expected: success.

**Step 3: Manual smoke test**

In Supabase SQL editor, insert a test orphan:

```sql
INSERT INTO contracts (contract_number, client_name, client_email, status, total_price, advance_amount, balance_amount)
VALUES ('PC-TEST', 'Orphan User', 'orphan@example.com', 'Pending', 100, 0, 100)
RETURNING id;
```

Visit `/admin/customers`. Expected: "Orphan User" listed with source "Contract".

Cleanup: `DELETE FROM contracts WHERE contract_number='PC-TEST';`

**Step 4: Commit**

```bash
git add src/app/api/admin/customers/route.ts
git commit -m "api: include orphan contracts in customers list (safety net)"
```

---

## Task 5: New endpoint — `POST /api/admin/contracts/[id]/send-payment-update`

**Files:**
- Create: `src/app/api/admin/contracts/[id]/send-payment-update/route.ts`

**Step 1: Create the new file**

Create `src/app/api/admin/contracts/[id]/send-payment-update/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { createServerClient } from "@/lib/supabase";

function getGraphClient() {
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID!,
    process.env.AZURE_CLIENT_ID!,
    process.env.AZURE_CLIENT_SECRET!
  );
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return Client.initWithMiddleware({ authProvider });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildBodyHtml(
  status: "Half Paid" | "Full Paid",
  contract: {
    contract_number: string;
    client_name: string | null;
    total_price: number;
    advance_amount: number;
    balance_amount: number;
    balance_due: string | null;
  }
): { subject: string; html: string } {
  const name = escapeHtml(contract.client_name || "there");
  const num = escapeHtml(contract.contract_number);
  const fmt = (n: number) =>
    Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const intro =
    status === "Full Paid"
      ? `<p style="margin:0 0 16px;">Thank you, <strong style="color:#fff;">${name}</strong> — your contract <strong style="color:#F7941D;">${num}</strong> is now paid in full.</p>`
      : `<p style="margin:0 0 16px;">Hi <strong style="color:#fff;">${name}</strong>, we've received a partial payment toward your contract <strong style="color:#F7941D;">${num}</strong>. Below is your remaining balance.</p>`;

  const balanceRow =
    status === "Full Paid"
      ? `
        <tr>
          <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Status</td>
          <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;font-weight:700;">PAID IN FULL</td>
        </tr>`
      : `
        <tr>
          <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Paid So Far</td>
          <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;">$${fmt(contract.advance_amount)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Remaining Balance</td>
          <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;font-size:18px;font-weight:700;">$${fmt(contract.balance_amount)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Balance Due</td>
          <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;">${escapeHtml(contract.balance_due || "TBD")}</td>
        </tr>`;

  const subject =
    status === "Full Paid"
      ? `Payment Received — Contract ${contract.contract_number} (Paid in Full)`
      : `Payment Update — Contract ${contract.contract_number}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0C0C0C;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#161616;border:1px solid #222;border-radius:8px;overflow:hidden;">
      <div style="background:#F7941D;padding:20px 24px;">
        <h1 style="margin:0;color:#0C0C0C;font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:1px;">
          ${status === "Full Paid" ? "Paid In Full" : "Payment Update"}
        </h1>
      </div>
      <div style="padding:28px 24px;color:#ccc;font-size:15px;line-height:1.7;">
        ${intro}
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr>
            <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Total</td>
            <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;">$${fmt(contract.total_price)}</td>
          </tr>
          ${balanceRow}
        </table>
        <p style="margin:0;color:#888;">Questions? Reply to this email and we'll get right back to you.</p>
        <p style="margin:16px 0 0;color:#888;">— The Printec Team</p>
      </div>
    </div>
    <div style="text-align:center;padding:20px;color:#444;font-size:11px;letter-spacing:1px;">
      PRINTEC VIRGINIA LLC &mdash; FROM VISION TO VINYL
    </div>
  </div>
</body>
</html>`;

  return { subject, html };
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerClient();

    const { data: contract, error: contractErr } = await supabase
      .from("contracts")
      .select("*")
      .eq("id", id)
      .single();

    if (contractErr || !contract) {
      return NextResponse.json({ error: "Contract not found." }, { status: 404 });
    }

    if (!contract.client_email) {
      return NextResponse.json(
        { error: "Contract has no client email address." },
        { status: 400 }
      );
    }

    if (contract.payment_status !== "Half Paid" && contract.payment_status !== "Full Paid") {
      return NextResponse.json(
        { error: "Set payment status to Half Paid or Full Paid before sending." },
        { status: 400 }
      );
    }

    const { subject, html } = buildBodyHtml(contract.payment_status, contract);

    const emailFrom = process.env.EMAIL_FROM!;
    const graphClient = getGraphClient();

    await graphClient.api(`/users/${emailFrom}/sendMail`).post({
      message: {
        subject,
        body: { contentType: "HTML", content: html },
        toRecipients: [{ emailAddress: { address: contract.client_email } }],
        replyTo: [{ emailAddress: { address: emailFrom } }],
      },
    });

    const sentAt = new Date().toISOString();
    const { error: updateErr } = await supabase
      .from("contracts")
      .update({ payment_email_sent_at: sentAt })
      .eq("id", id);

    if (updateErr) {
      console.error("Failed to update payment_email_sent_at:", updateErr);
    }

    return NextResponse.json({ success: true, sent_at: sentAt });
  } catch (error) {
    console.error("Payment update send error:", error);
    return NextResponse.json(
      { error: "Failed to send payment update. Please try again." },
      { status: 500 }
    );
  }
}
```

**Step 2: Verify build**

Run: `npx next build`
Expected: success.

**Step 3: Defer manual end-to-end test** until UI is wired in Task 6.

**Step 4: Commit**

```bash
git add src/app/api/admin/contracts/[id]/send-payment-update/route.ts
git commit -m "api: add send-payment-update endpoint for contracts"
```

---

## Task 6: Add payment dropdown + send button on contract detail page

**Files:**
- Modify: `src/app/admin/contracts/[id]/page.tsx`

**Step 1: Extend the `Contract` interface**

In `src/app/admin/contracts/[id]/page.tsx`, find the `Contract` interface (lines ~17-39). Add:

```typescript
  payment_status: "Not Paid" | "Half Paid" | "Full Paid";
  payment_email_sent_at: string | null;
```

**Step 2: Add Payment section to the page**

Find a logical home — adjacent to the existing Status section. Add this JSX block (place near existing status controls):

```tsx
{contract && (
  <div style={{ background: "#111", border: "1px solid #222", borderRadius: 4, padding: "1.25rem", marginBottom: "1.5rem" }}>
    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: 1 }}>
      Payment
    </h3>

    <label style={labelStyle}>Payment Status</label>
    <select
      value={contract.payment_status}
      onChange={async (e) => {
        const newStatus = e.target.value as Contract["payment_status"];
        const res = await fetch(`/api/admin/contracts/${contract.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_status: newStatus }),
        });
        if (res.ok) {
          const updated = await res.json();
          setContract(updated);
        } else {
          alert("Failed to update payment status.");
        }
      }}
      style={{ ...inputStyle, cursor: "pointer", marginBottom: "1rem" }}
    >
      {["Not Paid", "Half Paid", "Full Paid"].map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>

    {(() => {
      const canSend =
        !!contract.client_email &&
        (contract.payment_status === "Half Paid" || contract.payment_status === "Full Paid");
      const reason = !contract.client_email
        ? "No client email on file"
        : contract.payment_status === "Not Paid"
          ? "Set payment status to Half Paid or Full Paid first"
          : "";
      return (
        <>
          <button
            disabled={!canSend || sendingPayment}
            title={reason}
            onClick={async () => {
              if (!confirm("Send payment update email to the customer?")) return;
              setSendingPayment(true);
              try {
                const res = await fetch(`/api/admin/contracts/${contract.id}/send-payment-update`, {
                  method: "POST",
                });
                if (res.ok) {
                  const data = await res.json();
                  setContract({ ...contract, payment_email_sent_at: data.sent_at });
                  alert("Payment update email sent.");
                } else {
                  const err = await res.json().catch(() => ({}));
                  alert(err.error || "Failed to send.");
                }
              } finally {
                setSendingPayment(false);
              }
            }}
            style={{
              background: canSend ? "#F7941D" : "#333",
              color: canSend ? "#0C0C0C" : "rgba(255,255,255,0.4)",
              border: "none",
              padding: "0.55rem 1.25rem",
              borderRadius: 4,
              cursor: canSend ? "pointer" : "not-allowed",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {sendingPayment ? "Sending..." : "Send Payment Update Email"}
          </button>
          {contract.payment_email_sent_at && (
            <p style={{ marginTop: 8, color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
              Last sent: {new Date(contract.payment_email_sent_at).toLocaleString()}
            </p>
          )}
        </>
      );
    })()}
  </div>
)}
```

**Step 3: Add the `sendingPayment` state**

Near other `useState` calls in the component, add:

```typescript
const [sendingPayment, setSendingPayment] = useState(false);
```

**Step 4: Verify build**

Run: `npx next build`
Expected: success.

**Step 5: Manual end-to-end test**

1. `npx next dev -p 3424`
2. Open an existing contract that has a `client_email` (use your own email for the test).
3. Change Payment Status to **Half Paid**, save reflects in dropdown after refresh.
4. Click **Send Payment Update Email**, confirm dialog.
5. Check inbox — Half-Paid email arrives with remaining balance.
6. Change to **Full Paid**, send again — Full-Paid email arrives.
7. Change to **Not Paid** — button disables, hover tooltip shows reason.
8. Open a contract with no email — button disables, tooltip says no email.

**Step 6: Commit**

```bash
git add src/app/admin/contracts/[id]/page.tsx
git commit -m "ui: payment status dropdown + send-update button on contract detail"
```

---

## Task 7: Payment-status pill on contracts list

**Files:**
- Modify: `src/app/admin/contracts/page.tsx`

**Step 1: Extend `Contract` interface**

Add to the interface (lines ~8-21):

```typescript
  payment_status: "Not Paid" | "Half Paid" | "Full Paid";
```

**Step 2: Add a pill renderer**

Below the existing status pill in the row (search for the existing status badge in the file), add a sibling pill:

```tsx
<span
  style={{
    fontSize: 10,
    padding: "2px 8px",
    borderRadius: 4,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginLeft: 6,
    background:
      c.payment_status === "Full Paid"
        ? "rgba(34,197,94,0.15)"
        : c.payment_status === "Half Paid"
          ? "rgba(247,148,29,0.15)"
          : "rgba(255,255,255,0.08)",
    color:
      c.payment_status === "Full Paid"
        ? "#22c55e"
        : c.payment_status === "Half Paid"
          ? "#F7941D"
          : "rgba(255,255,255,0.5)",
  }}
>
  {c.payment_status}
</span>
```

(Place it next to the existing status badge in both the desktop table row and mobile card layout if both exist — search for the status badge JSX twice.)

**Step 3: Verify build**

Run: `npx next build`
Expected: success.

**Step 4: Manual test**

Visit `/admin/contracts`. Expected: each row shows a payment-status pill (gray for Not Paid, orange for Half Paid, green for Full Paid).

**Step 5: Commit**

```bash
git add src/app/admin/contracts/page.tsx
git commit -m "ui: payment-status pill on contracts list"
```

---

## Task 7.5: Verify RLS + Supabase logs are clean

**Files:** none (verification-only task).

**Step 1: Confirm RLS still constrains anon access on changed tables**

In Supabase SQL editor:

```sql
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE tablename IN ('contracts', 'inquiries', 'catalog_leads')
ORDER BY tablename, policyname;
```

Expected:
- `inquiries`: anon INSERT only (no SELECT/UPDATE/DELETE for anon).
- `contracts`: NO anon policies (admin server-role only). If any anon policy is listed for `contracts`, STOP and ask before continuing.
- `catalog_leads`: anon INSERT only.

**Step 2: Probe with the anon key (real RLS check)**

```bash
# Get anon key from .env.local
ANON_KEY=$(grep NEXT_PUBLIC_SUPABASE_ANON_KEY /Users/arsalseemab/Desktop/github/printec/.env.local | cut -d'=' -f2 | tr -d '"' | tr -d "'")

# Anon SHOULD NOT be able to read contracts
curl -s -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY" \
  "https://eofjaizkkxqxbynnvemi.supabase.co/rest/v1/contracts?select=id&limit=1"
# Expected: [] or RLS error — NOT a populated array

# Anon SHOULD NOT be able to read inquiries
curl -s -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY" \
  "https://eofjaizkkxqxbynnvemi.supabase.co/rest/v1/inquiries?select=id&limit=1"
# Expected: [] or RLS error — NOT a populated array

# Anon SHOULD still be able to INSERT inquiry (public contact form path)
curl -s -X POST -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" -H "Prefer: return=representation" \
  "https://eofjaizkkxqxbynnvemi.supabase.co/rest/v1/inquiries" \
  -d '{"name":"RLS Test","email":"rls@test.local","service":"test","source":"rls-test"}'
# Expected: 201 with the new row

# Cleanup the test row via SQL editor:
#   DELETE FROM inquiries WHERE source='rls-test';
```

If any expectation fails, STOP and surface the result before proceeding.

**Step 3: Check Supabase logs for silent errors**

Open Supabase dashboard → Project `eofjaizkkxqxbynnvemi` → Logs → Postgres Logs. Filter to last hour. Look for any `ERROR` or `FATAL` entries from our routes. If anything related to `contracts`, `inquiries`, or our payment-status work shows up, paste it here before marking complete.

Also check Logs → Edge / API Logs filtered to `/rest/v1/contracts` and `/rest/v1/inquiries`. Expected: only the requests you triggered, all 200/201.

**Step 4: Commit (verification notes only)**

No file changes — this task is a gate. If everything passed, no commit needed; just proceed to Task 8.

---

## Task 8: Update CLAUDE.md, TDD.md, DEVLOG.md

**Files:**
- Modify: `CLAUDE.md`
- Modify: `TDD.md`
- Modify: `DEVLOG.md`

**Step 1: CLAUDE.md updates**

Under "Database Tables" → `contracts` line, append `, payment_status (Not Paid/Half Paid/Full Paid), payment_email_sent_at`.

Under "Admin Portal" → after "Contract status dropdown on detail page (manual override)", add bullet:

```
- Payment status (Not Paid / Half Paid / Full Paid) on contracts; admin can send a "Send Payment Update Email" with the current balance to the customer (Microsoft Graph)
```

Under "Email Integration", add bullet:

```
- Payment update emails: manual send from contract detail page; subject + body vary by Half Paid vs Full Paid
```

**Step 2: TDD.md updates**

Add a section "Contract Payment Status" with these test cases (manual):

- Create contract via BookingModal → customer appears in `/admin/customers` (status Booked, source contract). [PASSING]
- Insert orphan contract via SQL → still appears in `/admin/customers` (safety net). [PASSING]
- Change payment_status Not Paid → Half Paid → Full Paid via UI; saved to DB. [PASSING]
- Send Payment Update at Not Paid → button disabled. [PASSING]
- Send at Half Paid → email arrives with remaining balance. [PASSING]
- Send at Full Paid → "Paid in Full" email arrives. [PASSING]
- Contract with no client_email → send button disabled with tooltip. [PASSING]

**Step 3: DEVLOG.md update**

Prepend a 2026-04-19 entry:

```
## 2026-04-19 — Contract payment status + customer linking fix
- Added `payment_status` (Not Paid / Half Paid / Full Paid) and `payment_email_sent_at` columns to `contracts`.
- New admin endpoint `POST /api/admin/contracts/[id]/send-payment-update` (Microsoft Graph, Half-Paid + Full-Paid templates).
- Contract detail page: payment dropdown + Send Payment Update button (disables on Not Paid or no email).
- Contracts list: payment-status pill.
- Bug fix: contracts created without an existing inquiry now auto-create an `inquiries` row (status=Booked, source=contract) so the customer appears in `/admin/customers`. Customers API also merges any orphan contracts as a safety net.
- Why: requested by Arsal for clearer payment tracking and a recurring "where did the customer go?" issue when creating contracts directly.
```

**Step 4: Commit**

```bash
git add CLAUDE.md TDD.md DEVLOG.md
git commit -m "docs: payment status + customer-linking notes"
```

---

## Out of Scope (deferred)

- Dashboard / Statistics charts for payment status.
- Backfilling `payment_status` from `advance_amount` on existing contracts.
- Automatic email when payment_status changes (only manual button per design decision).
- Payment ledger / multiple partial payments.
- Customer-facing payment page or Stripe integration.

---

## Final Verification Checklist

After all tasks complete, re-run:

- `npx next build` → succeeds.
- Create a contract via BookingModal with no inquiry → row in `/admin/customers` and matching `inquiries` row in DB.
- Set payment status, send email, confirm receipt + timestamp.
- `/admin/contracts` list shows payment pill for every row.
