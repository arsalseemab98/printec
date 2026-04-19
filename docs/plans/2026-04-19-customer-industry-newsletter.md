# Customer Industry Tag + Newsletter Filter — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tag customers with an industry and let admin filter the email recipient picker by industry.

**Architecture:** One nullable `industry` column on `inquiries`. Native HTML `<datalist>` input on inquiry detail (preset list + free text). New column + filter on `/admin/customers`. Industry filter (with URL param + server-side narrowing) on `/admin/emails/compose`.

**Tech Stack:** Next.js 16 · TypeScript · Supabase (service-role on admin routes) · No automated test runner.

**Design doc:** `docs/plans/2026-04-19-customer-industry-newsletter-design.md`

---

## Conventions

- Branch: `main` (user authorized).
- Apply DB migration via Supabase MCP (`mcp__supabase__apply_migration`); also record the SQL in `scripts/migrations/` for repo history.
- Commit per task; no `git push` (user pushes manually).
- Manual testing per project convention. No Jest.
- Doc updates batched in the final task.

---

## Task 1: Schema migration via MCP

**Files:**
- Create: `scripts/migrations/2026-04-19-add-industry-to-inquiries.sql`
- Apply via: `mcp__supabase__apply_migration` on project `eofjaizkkxqxbynnvemi`

**Step 1: Apply migration via MCP**

Use `mcp__supabase__apply_migration` with:
- `name`: `add_industry_to_inquiries`
- `query`:

```sql
ALTER TABLE public.inquiries ADD COLUMN industry text NULL;
ALTER TABLE public.inquiries FORCE ROW LEVEL SECURITY;
```

**Step 2: Verify via MCP**

Use `mcp__supabase__execute_sql` with:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name='inquiries' AND column_name='industry';

SELECT relname, relrowsecurity, relforcerowsecurity
FROM pg_class WHERE relname='inquiries';
```

Expected: industry row returned (text, nullable). `relforcerowsecurity` now `true`.

**Step 3: Re-probe RLS to confirm no regression**

```bash
ANON_KEY=$(grep '^NEXT_PUBLIC_SUPABASE_ANON_KEY=' /Users/arsalseemab/Desktop/github/printec/.env.local | head -1 | sed -E 's/^[^=]+=//' | tr -d '"' | tr -d "'")
curl -s -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY" \
  "https://eofjaizkkxqxbynnvemi.supabase.co/rest/v1/inquiries?select=id&limit=1"
```

Expected: `[]`. (Anon SELECT still rejected — adding the column did not open a new path.)

**Step 4: Run security advisor**

Use `mcp__supabase__get_advisors` with type=security. Expected: zero new ERROR-level findings (the warnings about anon INSERT on inquiries / catalog_leads remain — those are intentional design).

**Step 5: Record migration in repo**

Create `/Users/arsalseemab/Desktop/github/printec/scripts/migrations/2026-04-19-add-industry-to-inquiries.sql`:

```sql
-- Applied via MCP on 2026-04-19. Adds industry tag for customer
-- segmentation in the email composer's recipient picker.

ALTER TABLE public.inquiries ADD COLUMN industry text NULL;

-- Defensive alignment with contracts/quotes/email_logs/email_templates
-- which received FORCE on 2026-04-19. Service role still bypasses RLS
-- via role privilege; FORCE only matters if a future role becomes
-- the table owner.
ALTER TABLE public.inquiries FORCE ROW LEVEL SECURITY;
```

**Step 6: Commit**

```bash
cd /Users/arsalseemab/Desktop/github/printec
git add scripts/migrations/2026-04-19-add-industry-to-inquiries.sql
git commit -m "db: add industry column to inquiries for newsletter segmentation"
```

---

## Task 2: INDUSTRIES constant

**Files:**
- Modify: `src/lib/constants.ts`

**Step 1: Append the export**

Add at the end of `src/lib/constants.ts`:

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

**Step 2: Verify**

```bash
cd /Users/arsalseemab/Desktop/github/printec && npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: clean.

**Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "constants: export INDUSTRIES list for customer segmentation"
```

---

## Task 3: PUT inquiries route — accept industry

**Files:**
- Modify: `src/app/api/admin/inquiries/[id]/route.ts:32`

**Step 1: Add `industry` to the `allowed` array**

Change line 32 from:

```typescript
const allowed = ["status", "notes", "booked_price", "completed_price", "name", "email", "phone", "service", "budget", "description", "event_date"];
```

to:

```typescript
const allowed = ["status", "notes", "booked_price", "completed_price", "name", "email", "phone", "service", "budget", "description", "event_date", "industry"];
```

**Step 2: Verify**

```bash
npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: clean.

**Step 3: Commit**

```bash
git add "src/app/api/admin/inquiries/[id]/route.ts"
git commit -m "api: accept industry on inquiries PUT"
```

---

## Task 4: Inquiry detail page — datalist input

**Files:**
- Modify: `src/app/admin/inquiries/[id]/page.tsx`

**Step 1: Read the page first**

The page renders inquiry details with editable fields. Identify:
- The state object holding the inquiry (likely `inquiry` / `setInquiry`).
- The block where editable fields like `service`, `budget`, `event_date` are rendered.
- The save handler that PUTs to `/api/admin/inquiries/[id]`.

**Step 2: Add the import**

At the top of the file, add to the existing constants import (or add a new one if `INDUSTRIES` isn't already imported):

```typescript
import { INDUSTRIES } from "@/lib/constants";
```

**Step 3: Add the field to local state shape**

If the page uses a typed state, add `industry: string | null` to the type. If it spreads the inquiry row directly, no change needed.

**Step 4: Render the datalist input**

Place adjacent to the existing service/budget fields:

```tsx
<div style={{ marginBottom: "1rem" }}>
  <label style={labelStyle}>Industry</label>
  <input
    type="text"
    list="industries-list"
    value={inquiry.industry ?? ""}
    onChange={(e) => setInquiry({ ...inquiry, industry: e.target.value || null })}
    style={inputStyle}
    placeholder="Restaurant, Retail, Wedding…"
  />
  <datalist id="industries-list">
    {INDUSTRIES.map((i) => (
      <option key={i} value={i} />
    ))}
  </datalist>
</div>
```

(Match `labelStyle` / `inputStyle` / `setInquiry` to the names actually used in the file. Read the file first; if the local style names differ, use those.)

**Step 5: Wire industry into the existing save flow**

The save handler builds an object passed to PUT. Add `industry: inquiry.industry || null` to that object so it's sent on save (the PUT route now accepts it from Task 3).

**Step 6: Verify**

```bash
npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: clean.

**Step 7: Manual test (with dev server)**

`npx next dev -p 3424` → log in to /admin → open any inquiry → set Industry to "Restaurant" → save → reload → industry persists.
Then type a new value not in the list (e.g., "Brewery") → save → reload → persists.

**Step 8: Commit**

```bash
git add "src/app/admin/inquiries/[id]/page.tsx"
git commit -m "ui: industry datalist input on inquiry detail page"
```

---

## Task 5: Customers API — include industry

**Files:**
- Modify: `src/app/api/admin/customers/route.ts`

**Step 1: Add industry to the inquiries SELECT and to the merged response**

In the inquiries query, change the select string to include `industry`. In the inquiries map, add `industry: inq.industry ?? null`. In the catalog_leads and orphan-contracts maps, add `industry: null` to keep the response shape consistent.

**Step 2: Verify**

```bash
npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: clean.

**Step 3: Manual test**

```bash
curl -s -H "Cookie: admin_session=authenticated" http://localhost:3424/api/admin/customers | python3 -c "import sys,json; d=json.load(sys.stdin); print('keys sample:', sorted(d[0].keys()) if d else '[]'); print('inquiry rows with industry:', sum(1 for x in d if x.get('industry')))"
```
Expected: `industry` appears in the keys list. Count of rows with industry will be 0 until you tag some.

**Step 4: Commit**

```bash
git add src/app/api/admin/customers/route.ts
git commit -m "api: include industry in /admin/customers response"
```

---

## Task 6: Customers page — column + filter

**Files:**
- Modify: `src/app/admin/customers/page.tsx`

**Step 1: Read the page**

Identify the existing table column rendering, the filter row above the table, and the `Customer` interface.

**Step 2: Extend the Customer interface**

Add `industry: string | null;` to the interface (it's already typed for inquiry/catalog_lead/contract).

**Step 3: Add the industry filter dropdown**

Place next to the existing source / status filters (inside the same flex/grid container). Suggested JSX:

```tsx
{(() => {
  const allIndustries = Array.from(
    new Set(customers.map((c) => c.industry).filter((x): x is string => !!x))
  ).sort();
  return (
    <select
      value={industryFilter}
      onChange={(e) => setIndustryFilter(e.target.value)}
      style={inputStyle}
    >
      <option value="All">All industries</option>
      {allIndustries.map((i) => (
        <option key={i} value={i}>{i}</option>
      ))}
    </select>
  );
})()}
```

Add the corresponding state at the top of the component:

```typescript
const [industryFilter, setIndustryFilter] = useState("All");
```

**Step 4: Apply the filter in the existing `filtered` chain**

In the existing `customers.filter(c => …)` chain, add:

```typescript
if (industryFilter !== "All" && c.industry !== industryFilter) return false;
```

**Step 5: Add the industry column to the table**

In the existing column header row and each row's `<td>`, add an Industry column. Render as a small pill-style span; empty string for catalog_lead / contract rows whose `industry` is null.

```tsx
<td>
  {c.industry ? (
    <span style={{
      fontSize: 11, padding: "2px 8px", borderRadius: 3,
      background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.75)",
    }}>{c.industry}</span>
  ) : (
    <span style={{ color: "rgba(255,255,255,0.25)" }}>—</span>
  )}
</td>
```

(Add the matching `<th>Industry</th>` header.)

**Step 6: Verify**

```bash
npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: clean.

**Step 7: Manual test**

Visit `/admin/customers` → industry column appears → filter dropdown shows "All industries" + each value present in the data → selecting "Restaurant" narrows the list → catalog_lead / contract rows hidden when an industry is selected, show again under "All".

**Step 8: Commit**

```bash
git add src/app/admin/customers/page.tsx
git commit -m "ui: industry column + filter on /admin/customers"
```

---

## Task 7: Email recipients API — accept industry filter

**Files:**
- Modify: `src/app/api/admin/emails/recipients/route.ts`

**Step 1: Accept the query param and apply server-side filter**

Replace the file with this version:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const supabase = createServerClient();
  const industry = req.nextUrl.searchParams.get("industry");

  let inquiriesQuery = supabase
    .from("inquiries")
    .select("id, name, email, service, status, industry, created_at")
    .order("created_at", { ascending: false });
  if (industry) {
    inquiriesQuery = inquiriesQuery.eq("industry", industry);
  }

  // When filtering by industry, exclude leads/contracts (no industry data).
  const [inquiriesRes, leadsRes, contractsRes] = await Promise.all([
    inquiriesQuery,
    industry
      ? Promise.resolve({ data: [] as Array<{ id: string; name: string | null; email: string; catalog_slug: string | null; created_at: string }>, error: null })
      : supabase
          .from("catalog_leads")
          .select("id, name, email, catalog_slug, created_at")
          .order("created_at", { ascending: false }),
    industry
      ? Promise.resolve({ data: [] as Array<{ id: string; client_name: string | null; client_email: string; category: string | null; status: string; created_at: string }>, error: null })
      : supabase
          .from("contracts")
          .select("id, client_name, client_email, category, status, created_at")
          .order("created_at", { ascending: false }),
  ]);

  const recipients: { id: string; name: string; email: string; source: string; detail: string; industry: string | null }[] = [];
  const seen = new Set<string>();

  for (const inq of inquiriesRes.data || []) {
    if (!inq.email || seen.has(inq.email.toLowerCase())) continue;
    seen.add(inq.email.toLowerCase());
    recipients.push({
      id: inq.id,
      name: inq.name || "Unknown",
      email: inq.email,
      source: "inquiry",
      detail: inq.service || inq.status || "",
      industry: inq.industry ?? null,
    });
  }

  for (const lead of leadsRes.data || []) {
    if (!lead.email || seen.has(lead.email.toLowerCase())) continue;
    seen.add(lead.email.toLowerCase());
    recipients.push({
      id: lead.id,
      name: lead.name || "Unknown",
      email: lead.email,
      source: "catalog",
      detail: lead.catalog_slug || "",
      industry: null,
    });
  }

  for (const c of contractsRes.data || []) {
    if (!c.client_email || seen.has(c.client_email.toLowerCase())) continue;
    seen.add(c.client_email.toLowerCase());
    recipients.push({
      id: c.id,
      name: c.client_name || "Unknown",
      email: c.client_email,
      source: "contract",
      detail: c.category || c.status || "",
      industry: null,
    });
  }

  return NextResponse.json(recipients);
}
```

**Step 2: Verify**

```bash
npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: clean.

**Step 3: Manual test**

```bash
# unfiltered (returns all 3 sources)
curl -s -H "Cookie: admin_session=authenticated" "http://localhost:3424/api/admin/emails/recipients" | python3 -c "import sys,json; d=json.load(sys.stdin); print('total:', len(d), '| sources:', sorted(set(x['source'] for x in d)))"

# filtered (only inquiries with matching industry)
curl -s -H "Cookie: admin_session=authenticated" "http://localhost:3424/api/admin/emails/recipients?industry=Restaurant" | python3 -c "import sys,json; d=json.load(sys.stdin); print('total:', len(d), '| sources:', sorted(set(x['source'] for x in d)) if d else '[]')"
```

Expected: unfiltered returns mixed sources. Filtered returns only `inquiry` source rows where `industry='Restaurant'`.

**Step 4: Commit**

```bash
git add src/app/api/admin/emails/recipients/route.ts
git commit -m "api: industry filter on /admin/emails recipients"
```

---

## Task 8: Email compose page — industry filter UI

**Files:**
- Modify: `src/app/admin/emails/compose/page.tsx`

**Step 1: Read the page**

Find:
- The fetch call that loads recipients (likely `useEffect` that calls `/api/admin/emails/recipients`).
- The recipient picker UI.
- Where the existing filter UI lives (search box, source toggle, etc.).

**Step 2: Read URL param + thread it through fetch**

Add at the top of the component:

```typescript
import { useSearchParams } from "next/navigation";
import { INDUSTRIES } from "@/lib/constants";
```

Inside the component:

```typescript
const searchParams = useSearchParams();
const initialIndustry = searchParams.get("industry") || "All";
const [industryFilter, setIndustryFilter] = useState(initialIndustry);
```

Update the recipients fetch to include the industry param when set:

```typescript
useEffect(() => {
  const url =
    industryFilter && industryFilter !== "All"
      ? `/api/admin/emails/recipients?industry=${encodeURIComponent(industryFilter)}`
      : `/api/admin/emails/recipients`;
  fetch(url).then((r) => r.json()).then(setRecipients);
}, [industryFilter]);
```

(Adapt `setRecipients` to whatever the existing setter is named.)

**Step 3: Render the filter dropdown above the recipient picker**

```tsx
<select
  value={industryFilter}
  onChange={(e) => setIndustryFilter(e.target.value)}
  style={inputStyle}
>
  <option value="All">All industries</option>
  {INDUSTRIES.map((i) => (
    <option key={i} value={i}>{i}</option>
  ))}
</select>
```

**Step 4: URL sync (optional but in the design)**

When the dropdown changes, push the new industry to the URL so the page is bookmarkable:

```typescript
const router = useRouter();
useEffect(() => {
  const params = new URLSearchParams();
  if (industryFilter && industryFilter !== "All") params.set("industry", industryFilter);
  router.replace(`/admin/emails/compose${params.toString() ? `?${params}` : ""}`, { scroll: false });
}, [industryFilter, router]);
```

(Import `useRouter` from `next/navigation`.)

**Step 5: Empty-state hint**

When `industryFilter !== "All"` and the recipients list returns empty, render a hint above (or in place of) the picker:

```tsx
{industryFilter !== "All" && recipients.length === 0 && (
  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, padding: "1rem" }}>
    No customers tagged with industry &ldquo;{industryFilter}&rdquo;. Tag one from{" "}
    <Link href="/admin/inquiries" style={{ color: "#F7941D" }}>/admin/inquiries</Link>.
  </p>
)}
```

**Step 6: Verify**

```bash
npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: clean.

**Step 7: Manual end-to-end test**

1. Tag two test inquiries with different industries (Restaurant, Wedding) via /admin/inquiries.
2. Open `/admin/emails/compose` → all recipients show.
3. Pick Restaurant from the dropdown → only the Restaurant inquiry remains in the picker; URL updates to `?industry=Restaurant`.
4. Reload the URL with `?industry=Restaurant` → industry filter pre-selected.
5. Pick a non-existent industry → empty-state hint renders.
6. Compose + send a test email to one Restaurant recipient (use your own email) → email arrives via the existing send loop.

**Step 8: Commit**

```bash
git add "src/app/admin/emails/compose/page.tsx"
git commit -m "ui: industry filter on email compose recipient picker"
```

---

## Task 9: Update CLAUDE.md + DEVLOG.md

**Files:**
- Modify: `CLAUDE.md`
- Modify: `DEVLOG.md`

**Step 1: CLAUDE.md updates**

Under "Database Tables" → `inquiries` line, append `, industry`.

Under "Admin Portal Features", add bullet:

```
- Industry tag on customers (datalist input on inquiry detail; preset list in src/lib/constants.ts INDUSTRIES + free-text). Surfaces as a column + filter on /admin/customers.
- Email composer recipient picker has an Industry filter (URL-synced via ?industry=X) backed by a server-side narrow on the inquiries query.
```

**Step 2: DEVLOG.md update**

Prepend (after any existing 2026-04-19 entries):

```
## 2026-04-19 — Customer industry tag + newsletter filter
- New nullable column `industry` on `inquiries` (applied via Supabase MCP; recorded in scripts/migrations).
- Datalist input on /admin/inquiries/[id] — preset list (Restaurant / Retail / Wedding / etc.) + free text fallback.
- /admin/customers gets an Industry column + dropdown filter; catalog_leads and orphan contracts show no industry (out of scope).
- /admin/emails/compose gets an Industry filter that narrows the recipient picker via /api/admin/emails/recipients?industry=X (server-side filter at the SQL level, not just client-side).
- Defensive: applied FORCE ROW LEVEL SECURITY on inquiries to align with contracts/quotes/email_logs/email_templates from earlier today.
- RLS regression check: anon SELECT on inquiries still returns []; security advisor reports zero new ERROR-level findings.
```

**Step 3: Commit**

```bash
git add CLAUDE.md DEVLOG.md
git commit -m "docs: customer industry + newsletter filter notes"
```

---

## Out of Scope (deferred)

- Industry on catalog_leads / orphan contracts (would require schema + migration + UI changes there).
- Industry-based statistics charts on the dashboard.
- Bulk-tag UI (set industry on many customers at once).
- Recurring scheduled newsletters / unsubscribe footer (compliance work).

---

## Final Verification Checklist

After all tasks complete, run:

- `npx next build` → succeeds.
- Tag at least one test inquiry per industry; confirm filter narrows correctly on both /admin/customers and /admin/emails/compose.
- `mcp__supabase__get_advisors type=security` → no new ERROR entries.
- Anon `SELECT` on `inquiries` still returns `[]`.
