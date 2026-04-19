# Gate /api/admin/* + Public Signing Endpoint — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Close the unauthenticated `/api/admin/*` hole without breaking the customer signing flow.

**Architecture:** Rewrite `proxy.ts` so its matcher covers both `/admin/*` (HTML redirect) and `/api/admin/*` (JSON 401). Add a new public read-only endpoint `GET /api/contracts/[id]/public-view` returning only the 15 fields the signing page needs. Switch the signing page's fetch URL.

**Tech Stack:** Next.js 16 App Router · TypeScript · Supabase service-role client · No automated test runner (manual verification + curl probes).

**Design doc:** `docs/plans/2026-04-19-admin-api-auth-design.md`

---

## Conventions

- Branch: `main` (per user's standing authorization).
- Verification per task = manual curl + dev server + `npx tsc --noEmit`. No Jest in repo.
- Commit per task; never `git push`.
- Doc updates (CLAUDE.md / DEVLOG.md) are batched in the final task.

---

## Task 1: Create the public-view endpoint

Build the new endpoint FIRST, before locking down `/api/admin/*`. Order matters: if proxy.ts ships before the signing page has its replacement read URL, the customer signing flow breaks for any contract someone tries to sign in that window.

**Files:**
- Create: `src/app/api/contracts/[id]/public-view/route.ts`

**Step 1: Write the new file**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("contracts")
    .select(
      "id, contract_number, client_name, client_email, event_date, venue, service_description, total_price, advance_amount, balance_amount, balance_due, travel_cost, terms, signed_at, signature_data"
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Contract not found." }, { status: 404 });
  }

  return NextResponse.json(data);
}
```

**Step 2: Verify build**

```bash
cd /Users/arsalseemab/Desktop/github/printec && npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: no output (clean).

**Step 3: Manual smoke test**

Start dev server: `npx next dev -p 3424`. Pick a real contract id from Supabase (the earlier probe showed `8ec3b7bf-1a18-4303-8d5f-8ebd81dc817e` exists).

```bash
curl -s http://localhost:3424/api/contracts/8ec3b7bf-1a18-4303-8d5f-8ebd81dc817e/public-view | python3 -c "import sys,json; d=json.load(sys.stdin); print('keys:', sorted(d.keys()))"
```

Expected: `keys:` lists exactly the 15 names from the SELECT (no `payment_status`, `inquiry_id`, `status`, `sent_at`, etc.).

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3424/api/contracts/00000000-0000-0000-0000-000000000000/public-view
```
Expected: `404`.

**Step 4: Commit**

```bash
git add "src/app/api/contracts/[id]/public-view/route.ts"
git commit -m "api: public read-only endpoint for customer signing page"
```

---

## Task 2: Switch the signing page to the new endpoint

**Files:**
- Modify: `src/app/sign/[id]/page.tsx:42`

**Step 1: Edit the fetch URL**

Replace the single line:

```typescript
const res = await fetch(`/api/admin/contracts/${id}`);
```

with:

```typescript
const res = await fetch(`/api/contracts/${id}/public-view`);
```

Nothing else in the file changes — the existing `Contract` interface fields are a subset of what the new endpoint returns.

**Step 2: Verify build**

```bash
cd /Users/arsalseemab/Desktop/github/printec && npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: clean.

**Step 3: Manual end-to-end test**

1. `npx next dev -p 3424` (if not still running).
2. Open `http://localhost:3424/sign/8ec3b7bf-1a18-4303-8d5f-8ebd81dc817e` in a browser. Note this contract was already signed in the seed data, so the page should render in the post-sign state. If it errors, open DevTools and check the Network tab — the `public-view` request should be 200.
3. (Optional) Pick an unsigned contract id from Supabase and try drawing a signature. The POST to `/api/contracts/[id]/sign` is unchanged so signing should still work.

**Step 4: Commit**

```bash
git add "src/app/sign/[id]/page.tsx"
git commit -m "ui: signing page reads from public-view endpoint"
```

---

## Task 3: Gate /api/admin/* in proxy.ts

**Files:**
- Modify: `src/proxy.ts` (full rewrite — short file)

**Step 1: Replace the file**

Overwrite `src/proxy.ts` with:

```typescript
import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const session = request.cookies.get("admin_session");
  const authed = session?.value === "authenticated";

  if (authed) return NextResponse.next();

  if (pathname.startsWith("/api/admin/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (pathname.startsWith("/admin/")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```

**Step 2: Verify build**

```bash
cd /Users/arsalseemab/Desktop/github/printec && npx tsc --noEmit -p . 2>&1 | tail -10
```
Expected: clean.

**Step 3: Manual verification with dev server**

Restart the dev server (Next.js middleware needs a restart to pick up changes):

```bash
# kill existing dev (Ctrl+C in its terminal), then
npx next dev -p 3424
```

In a fresh terminal (no cookies):

```bash
# 3a. Unauth admin API → 401 JSON
curl -s -w "\n%{http_code}\n" http://localhost:3424/api/admin/contracts
# Expected: {"error":"Unauthorized"} then 401

curl -s -w "\n%{http_code}\n" http://localhost:3424/api/admin/inquiries
# Expected: 401

# 3b. Public sign read still works
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3424/api/contracts/8ec3b7bf-1a18-4303-8d5f-8ebd81dc817e/public-view
# Expected: 200

# 3c. Public sign POST endpoint untouched
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3424/api/contracts/8ec3b7bf-1a18-4303-8d5f-8ebd81dc817e/sign
# Expected: 405 (GET not allowed; route is POST). NOT 401.

# 3d. Admin page → redirect to login
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3424/admin/contracts
# Expected: 307 http://localhost:3424/admin/login

# 3e. Admin login page itself reachable
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3424/admin/login
# Expected: 200
```

**Step 4: Logged-in regression test**

In a real browser:
1. Visit `/admin/login`, log in with `ADMIN_PASSWORD`.
2. Visit `/admin/contracts` — list loads (proves session cookie passes through).
3. Open a contract — detail loads (proves `/api/admin/contracts/[id]` works for authed admin).
4. Change a payment status (uses the PUT we shipped earlier) — saves successfully.

**Step 5: Commit**

```bash
git add src/proxy.ts
git commit -m "security: gate /api/admin/* with admin session cookie"
```

---

## Task 4: Production verification (post-deploy)

This task runs AFTER the user pushes and Vercel deploys. The dev-server checks above prove the logic locally; this is the final external validation.

**Files:** none.

**Step 1: After deploy, probe production**

```bash
# Admin API rejects anon
curl -s -w "\n%{http_code}\n" https://printecwrap.com/api/admin/contracts
# Expected: {"error":"Unauthorized"} then 401

curl -s -w "\n%{http_code}\n" https://printecwrap.com/api/admin/inquiries
# Expected: 401

# Public-view works
curl -s -o /dev/null -w "%{http_code}\n" https://printecwrap.com/api/contracts/8ec3b7bf-1a18-4303-8d5f-8ebd81dc817e/public-view
# Expected: 200

# Customer signing page renders
curl -s -o /dev/null -w "%{http_code}\n" "https://printecwrap.com/sign/8ec3b7bf-1a18-4303-8d5f-8ebd81dc817e"
# Expected: 200
```

**Step 2: Spot-check Supabase advisor**

Use the MCP `mcp__supabase__get_advisors` (security) — confirm no new ERROR entries appeared.

**Step 3: No commit (verification-only).**

---

## Task 5: Update CLAUDE.md + DEVLOG.md

**Files:**
- Modify: `CLAUDE.md`
- Modify: `DEVLOG.md`

**Step 1: CLAUDE.md updates**

Under "Important Notes" or similar section, add or update:

```
- Admin auth (proxy.ts): gates BOTH /admin/* (redirect to login) AND /api/admin/* (401 JSON). Never assume an /api/admin/* route is reachable without the admin_session cookie.
- Customer contract signing reads via PUBLIC endpoint /api/contracts/[id]/public-view (not /api/admin/contracts/[id]). Only 15 fields exposed: id, contract_number, client_name, client_email, event_date, venue, service_description, total_price, advance_amount, balance_amount, balance_due, travel_cost, terms, signed_at, signature_data. Internal fields (payment_status, status, inquiry_id, etc.) intentionally omitted.
```

Under "Database Tables" → keep as-is. Under "Supabase Access & RLS Policy", note that contracts/quotes/email_logs/email_templates are now strictly service_role; blog_posts allows anon SELECT only when published=true; promo_slides allows anon SELECT only when active=true.

**Step 2: DEVLOG.md update**

Prepend a new 2026-04-19 entry below the previous one:

```
## 2026-04-19 — Admin API gating + public signing endpoint
- Closed unauthenticated /api/admin/* surface. proxy.ts matcher now covers both /admin/:path* and /api/admin/:path*. Pages get redirect; APIs get JSON 401.
- New public read-only endpoint /api/contracts/[id]/public-view returns only the 15 fields the customer signing page needs (no payment_status, status, inquiry_id, internal flags).
- /sign/[id]/page.tsx switched to the new endpoint.
- Why: RLS hardening earlier today closed direct PostgREST anon access, but our own admin API surface (running with service-role key) was open to the internet. UUID guessing is impractical but anyone with a leaked id could read or mutate any contract.
- Production verification: external curl confirms 401 on /api/admin/*, 200 on public-view, 200 on /sign/[id].
```

**Step 3: Commit**

```bash
git add CLAUDE.md DEVLOG.md
git commit -m "docs: admin API gating + public signing endpoint notes"
```

---

## Out of Scope (deferred)

- Stronger admin auth (multi-user, MFA, OAuth) — still single shared `ADMIN_PASSWORD`.
- Audit logging of unauthorized attempts.
- Per-customer signing tokens (defense-in-depth in case a UUID leaks).
- Splitting GET vs PUT permissions inside `/api/admin/contracts/[id]`.
- Re-architecting the publicly-bound RLS warnings on `inquiries`/`catalog_leads` (intentional anon INSERT for the contact form / catalog email gate).
