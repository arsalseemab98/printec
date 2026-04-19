# Gate `/api/admin/*` + Public-View Signing Endpoint

**Date:** 2026-04-19
**Scope:** Close the unauthenticated `/api/admin/*` hole left over after the RLS hardening, without breaking the customer signing page.

## Problem

`src/proxy.ts` has two compounding bugs:

1. The Next.js middleware `matcher` is `/admin/:path*`, which does not include `/api/admin/:path*`.
2. The function body early-returns for any path starting with `/api/`.

Result: every route under `/api/admin/*` runs with the Supabase **service role** key (which bypasses RLS) and accepts requests from anyone on the internet. Anyone with — or who guesses — a contract UUID can `GET /api/admin/contracts/<id>` and read the full row, or `PUT` to mutate it.

This is the back door that survived the 2026-04-19 RLS hardening migrations: those locked direct PostgREST access for anon, but our own admin API surface still serves the same data to anyone.

We cannot simply gate `/api/admin/*` in proxy.ts, because the customer signing page `src/app/sign/[id]/page.tsx:42` deliberately fetches `/api/admin/contracts/[id]` without auth (the customer is not logged in as admin). Closing the hole requires giving the signing page another way to read.

## Goals

- Every `/api/admin/*` route requires the admin session cookie. Unauthenticated requests get `401` with a JSON body — no redirect to HTML login.
- Customer signing flow keeps working end-to-end without changes the customer can perceive.
- No new attack surface introduced by the public signing endpoint.

## Non-Goals

- Replacing the password-cookie auth with anything stronger (still single shared `ADMIN_PASSWORD`). That is a separate ticket.
- Per-route auth helpers. We use middleware so we cannot forget on a new route.
- Rate-limiting the public signing endpoint (UUID is 128-bit; guessing is impractical and out of scope).

## Design

### 1. `src/proxy.ts` — gate both surfaces

Replace the function so both `/admin/*` and `/api/admin/*` require an admin session, but each rejects in the right format:

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

Rationale:
- Single source of truth for admin auth — every present and future `/api/admin/*` route is covered automatically.
- Admin pages get a redirect (HTML), API consumers get a JSON 401 (no surprise HTML in their fetch).
- `/api/admin/login` (the password POST) and `/admin/login` (the page) bypass the gate so the user can authenticate.

### 2. New endpoint — `GET /api/contracts/[id]/public-view`

Path: `src/app/api/contracts/[id]/public-view/route.ts`

Public (not under `/api/admin/`), no auth required, returns only the fields the signing page needs. Uses the service-role client because RLS now blocks anon SELECT on `contracts`.

Returned shape (matches the existing `Contract` interface in `src/app/sign/[id]/page.tsx`):

```typescript
{
  id, contract_number,
  client_name, client_email,
  event_date, venue,
  service_description,
  total_price, advance_amount, balance_amount, balance_due, travel_cost,
  terms, signed_at, signature_data
}
```

Excluded (kept private): `inquiry_id`, `status`, `payment_status`, `payment_email_sent_at`, `sent_at`, `completed_at`, `category`, `created_at`, `updated_at`. None of these are needed for the customer to sign.

Behavior:
- 404 if contract not found.
- 200 with the curated object otherwise.
- No POST/PUT/DELETE — read-only.

The existing `POST /api/contracts/[id]/sign` (customer signature submission) is already public and stays unchanged.

### 3. `src/app/sign/[id]/page.tsx` — switch the fetch URL

Change line 42 from:

```typescript
const res = await fetch(`/api/admin/contracts/${id}`);
```

to:

```typescript
const res = await fetch(`/api/contracts/${id}/public-view`);
```

No other changes needed — the field names match.

### 4. Verification

After deploy:

1. `curl https://printecwrap.com/api/admin/contracts/<uuid>` → expect `401 {"error":"Unauthorized"}`.
2. `curl https://printecwrap.com/api/admin/inquiries` → expect `401`.
3. `curl https://printecwrap.com/api/contracts/<uuid>/public-view` → expect `200` with the curated 15 fields, NO `payment_status` / `status` / `inquiry_id`.
4. Open `/sign/<existing-uuid>` in an incognito browser → contract details render, signature canvas works, submit signs successfully.
5. Open any `/admin/*` page in an incognito browser → redirect to `/admin/login`.
6. Log in, hit any admin page → works.
7. Log in, fetch any `/api/admin/*` from the page → works (cookie carries through).

## Error Handling

- Middleware: never throws; missing/invalid cookie returns 401 (API) or redirect (page).
- Public-view endpoint: 404 on missing row, 500 on DB error, otherwise 200.

## Files Touched

- `src/proxy.ts` — rewritten.
- `src/app/api/contracts/[id]/public-view/route.ts` — new.
- `src/app/sign/[id]/page.tsx` — one URL change.
- `CLAUDE.md`, `DEVLOG.md` — note the lockdown + new endpoint.

## Out of Scope (deferred)

- Strengthening admin auth beyond shared password.
- Logging unauthorized attempts (would be nice for forensics).
- Per-customer signing tokens (defense-in-depth for UUID-leak scenarios).
- Splitting `/api/admin/contracts/[id]` GET vs PUT permissions (currently any admin can do everything).
