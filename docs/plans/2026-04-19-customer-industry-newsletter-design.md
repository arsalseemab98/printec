# Customer Industry Tag + Newsletter Filter

**Date:** 2026-04-19
**Scope:** Tag each customer with an industry (dropdown + free-text), then let admin filter the email-compose recipient picker by industry to send targeted newsletters.

## Problem

Admin wants to send newsletters/blasts to specific customer segments — e.g., a wedding-season campaign only to wedding/event customers, or a storefront-signage promo only to restaurants and retail. Today the email composer's recipient picker is all-or-nothing: every customer in one undifferentiated list.

## Goals

- Admin can categorize each customer by industry (Restaurant / Retail / Wedding / etc.) — picking from a starter dropdown OR typing a new value.
- Admin can filter recipients in `/admin/emails/compose` by industry before sending.
- The existing single-customer email send mechanism (Microsoft Graph) is reused — no changes to actual sending.

## Non-Goals

- Backfilling industry on catalog leads or orphan contracts (they live in different tables and don't surface industry; out of scope here).
- Auto-classifying industry from existing customer data (no ML, no inference).
- Recurring scheduled newsletters (out of scope — admin still triggers each send manually).
- Opt-out / unsubscribe footer (separate compliance ticket).
- Industry-based reporting/charts on the statistics dashboard.

## Design

### 1. Schema

Single migration via Supabase MCP (no DDL is destructive; nullable column with no default):

```sql
ALTER TABLE public.inquiries ADD COLUMN industry text NULL;

-- Defensive alignment with contracts/quotes/email_logs/email_templates:
ALTER TABLE public.inquiries FORCE ROW LEVEL SECURITY;
```

The `FORCE` clause is a no-op in normal Supabase usage (service_role bypasses via role privilege, not table ownership), but matches the pattern applied to other admin-data tables on 2026-04-19 — defense in depth in case a future role gets table-owner ownership.

No CHECK constraint on `industry` because the spec allows any free-text value.

### 2. Constants

Add to `src/lib/constants.ts`:

```typescript
export const INDUSTRIES = [
  "Restaurant",
  "Retail / Storefront",
  "Wedding / Event",
  "Real Estate",
  "Healthcare",
  "Office / Corporate",
  "Automotive",
  "Religious / Church",
  "Education",
  "Other",
] as const;
```

These are suggestions in the dropdown; admin can type anything else.

### 3. Admin UI — set / edit industry

**`/admin/inquiries/[id]`** — add a new "Industry" field in the customer details block. Pattern:

```tsx
<input list="industries-list" value={industry} onChange={...} />
<datalist id="industries-list">
  {INDUSTRIES.map(i => <option key={i} value={i} />)}
</datalist>
```

Native HTML — no extra dependencies, dark theme works, browsers render a typeahead dropdown that matches the suggestions while still accepting free text.

Save flow: the existing PUT `/api/admin/inquiries/[id]` route gets `industry` added to its allowlist.

**`/admin/customers`** — extend in two ways:

1. New column "Industry" in the desktop table; rendered as a small pill (gray bg, text body) next to the existing fields. Empty for catalog_lead / contract rows.
2. New "Industry" filter dropdown above the table — options are "All industries" + each distinct industry value seen in the loaded data. Filtering is client-side over the already-fetched customers array (consistent with the existing source/status filters on the page).

### 4. Email compose — recipient filter by industry

**`/admin/emails/compose`** — find the existing recipient picker (which currently pulls inquiries + catalog leads + contracts). Above the picker, add an "Industry" select with "All industries" + INDUSTRIES values + any extra distinct values present in the loaded recipients.

When industry filter is set:
- Recipients narrow to those whose `industry === selected`.
- Catalog leads and orphan contracts (which have no industry field) are hidden — they only show when filter is "All industries".
- Selected value persists in the URL as `?industry=Restaurant` so the page is bookmarkable.

**Server side:** the recipients API endpoint (which the picker fetches) accepts `?industry=X` query param and filters at the SQL level (`.eq("industry", value)` on the inquiries query). Defense-in-depth: even if the client filter glitches, the server returns only the right rows.

### 5. APIs touched

- `PUT /api/admin/inquiries/[id]` — add `industry` to `allowed` field list.
- `GET /api/admin/customers` — add `industry` to the inquiries SELECT and to the merged response shape (catalog_lead + contract rows just have `industry: null`).
- Email recipients endpoint (find via grep — likely `/api/admin/emails/recipients/route.ts`) — accept optional `?industry=` query param.

## Data Flow

```
Admin types industry in /admin/inquiries/[id]
   → PUT /api/admin/inquiries/[id]  (writes industry)

Admin opens /admin/customers
   → GET /api/admin/customers (response now includes industry)
   → user filters by industry → client-side narrow

Admin opens /admin/emails/compose?industry=Restaurant
   → GET /api/admin/emails/recipients?industry=Restaurant
   → server filters inquiries WHERE industry='Restaurant'
   → admin picks subset → composes → sends (existing send loop, unchanged)
```

## Error Handling

- Industry is nullable everywhere. Filter "All industries" must always include rows with NULL industry.
- If admin picks an industry that no customer has, the recipient picker shows empty list with a hint: "No customers tagged with industry 'X'. Try a different industry or add the tag on /admin/inquiries/[id]."
- PUT failure on industry update surfaces as alert via existing inquiry-detail save handler — no silent error.

## Testing (manual, per project convention — no Jest)

- Tag three test inquiries with three different industries; verify each appears under the right filter on `/admin/customers`.
- Open `/admin/emails/compose?industry=Restaurant`; verify only Restaurant inquiries appear in the picker.
- Type a brand-new industry value (not in the starter list) into `/admin/inquiries/[id]`; verify it saves and appears as a filter option in customers + emails.
- Confirm server-side filter via curl: `GET /api/admin/emails/recipients?industry=Restaurant` (with admin cookie) returns only matching rows.
- RLS regression: anon SELECT on inquiries still returns `[]` (verify via curl with anon key after migration).

## Files Touched

- Supabase migration (via MCP, recorded at `scripts/migrations/2026-04-19-add-industry-to-inquiries.sql`).
- `src/lib/constants.ts` — add `INDUSTRIES`.
- `src/app/api/admin/inquiries/[id]/route.ts` — extend allowlist.
- `src/app/api/admin/customers/route.ts` — include industry in select + response.
- Email recipients route (path TBD via grep) — accept industry filter.
- `src/app/admin/inquiries/[id]/page.tsx` — datalist input.
- `src/app/admin/customers/page.tsx` — column + filter.
- `src/app/admin/emails/compose/page.tsx` — filter dropdown + URL param.
- `CLAUDE.md`, `DEVLOG.md` — note the new field + filter.

## Out of Scope (deferred)

- Industry on catalog_leads / contracts.
- Industry-based statistics on the dashboard.
- Recurring scheduled newsletter sends.
- Opt-out / unsubscribe link in newsletter footer (compliance work).
- Bulk-tag UI (set industry on many customers at once).
