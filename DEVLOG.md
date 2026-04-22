# DEVLOG — Printec Virginia LLC Website

---

## 2026-04-22 — Stop silent quote loss on inquiry delete
- Root cause of missing quotes on /admin/quotes: `quotes.inquiry_id` FK was NOT NULL + ON DELETE CASCADE. Deleting an inquiry (via /admin/inquiries/[id] delete) silently dropped every linked quote from the database. Numbering gap in production (PQ-0002, PQ-0007 present; PQ-0001, 0003, 0004, 0005, 0006 gone) is the smoking gun — 5 quotes already lost to this.
- Fix: applied migration scripts/migrations/2026-04-22-quotes-inquiry-fk-set-null.sql via Supabase MCP — dropped NOT NULL on quotes.inquiry_id and changed the FK to ON DELETE SET NULL. Mirror of contracts.inquiry_id which was already SET NULL.
- /admin/quotes list now handles orphan quotes (inquiry_id IS NULL): row rendered at 0.7 opacity with "Customer deleted" label, quote number is non-linked, View button hidden, Resend hidden (send route would 404 on the missing inquiry anyway). Financial record (quote_number, total, sent_at, items, notes) preserved.
- Note: only protects future deletions; the 5 already-cascaded quotes are unrecoverable.

## 2026-04-22 — Quote save-path hardening + mobile auto-refresh
- /api/admin/quotes/[id]/send: surface DB write failure as `warning` field instead of swallowing it (fixes the double-email risk where the email succeeded but `sent_at` didn't update). Graph errors now propagate the real cause instead of "Failed to send. Please try again."
- /admin/quotes list: replaced the two `// silent` catches with real alerts on load + resend failures. Resend now confirms before firing.
- /api/admin/quotes POST: 5-attempt retry loop catches Postgres 23505 (unique violation) so concurrent requests can't both produce the same PQ-NNNN. Migration file at scripts/migrations/2026-04-22-quotes-quote-number-unique.sql (CREATE UNIQUE INDEX) — needs to be applied via Supabase MCP after re-auth; without it the retry has nothing to catch.
- /admin/quotes/new: inquiry created with status `New` instead of `Quoted`. Quote builder promotes to `Quoted` only after a successful save. Abandoning the builder no longer leaves a fake `Quoted` orphan in CRM.
- Quote builder mobile: header gets flexWrap + admin-header-row class; line-items grid uses new `quote-item-row` class that collapses to `1fr 100px 36px` at ≤768px so inputs don't get squished off-screen.
- Auto-refresh: added visibilitychange + window focus listeners so when a phone user backgrounds the tab and returns, an immediate version check runs (mobile browsers throttle setInterval in background, leaving stale UI without this).

## 2026-04-21 — Save-path hardening across admin APIs
- /api/admin/contracts POST: reject with 400 when no `inquiry_id` AND no `client_name` (previously silently skipped the inquiry auto-create, leaving an orphan contract with no customer-list name).
- /api/admin/inquiries/[id] PUT: trim `industry` and store `null` for empty/whitespace so the industry filter can't match polluted rows.
- /api/admin/emails/recipients GET: return 500 if any of the three parallel Supabase queries errors (previously the errors were dropped and an empty recipient list was returned silently).
- /admin/emails/compose: check `res.ok` and render the failure in red instead of rendering a misleading empty list.

## 2026-04-19 — Customer industry tag + newsletter filter
- New nullable column `industry` on `inquiries` (applied via Supabase MCP; recorded in scripts/migrations/2026-04-19-add-industry-to-inquiries.sql).
- Datalist input on /admin/inquiries/[id] — preset list (Restaurant / Retail / Wedding / etc., from src/lib/constants.ts INDUSTRIES) + free text fallback.
- /admin/customers gets an Industry column + dropdown filter; catalog leads and orphan contracts show "—" and are hidden when an industry is selected (they have no industry).
- /admin/emails/compose gets an Industry filter that narrows the recipient picker via /api/admin/emails/recipients?industry=X (server-side filter at the SQL level, not just client-side). URL-synced via ?industry=X for bookmarkability.
- Defensive: applied FORCE ROW LEVEL SECURITY on inquiries to align with contracts/quotes/email_logs/email_templates from earlier today.
- RLS regression check: anon SELECT on inquiries still returns []; security advisor reports zero new ERROR-level findings.

## 2026-04-19 — Contract payment status feature
- New columns on contracts: `payment_status` (CHECK Not Paid/Half Paid/Full Paid, default Not Paid) and `payment_email_sent_at` (timestamptz).
- Contract detail page: payment status dropdown + "Send Payment Update Email" button (Microsoft Graph). Button disabled when payment_status is Not Paid or contract has no client_email; tooltip explains the reason.
- Email content varies: Half Paid email shows paid-so-far + remaining balance + balance due; Full Paid email confirms paid-in-full.
- Contracts list now shows a color-coded payment-status pill alongside the existing status badge.
- Bug fix (long-standing): contracts created via BookingModal or /admin/contracts/new without an existing inquiry no longer fall off the customer list. POST /api/admin/contracts now auto-creates a matching inquiries row (status=Booked, source=contract), with orphan-cleanup if the contract insert fails afterward. As a safety net, GET /api/admin/customers also merges any contracts where inquiry_id IS NULL (rendered as type:contract — customers page extended to handle that variant correctly: badge, color, click-route to /admin/contracts/[id], hide duplicate "+ Contract" action).
- Why: requested by Arsal — admin needs clearer payment tracking and customers were silently disappearing from CRM when admin created contracts directly.

## 2026-04-19 — Admin API gating + public signing endpoint
- Closed unauthenticated /api/admin/* surface. proxy.ts matcher now covers both /admin/:path* and /api/admin/:path*. Pages get redirect to /admin/login; APIs get JSON 401.
- New public read-only endpoint /api/contracts/[id]/public-view returns only the 15 fields the customer signing page needs (no payment_status, status, inquiry_id, internal flags).
- /sign/[id]/page.tsx switched from /api/admin/contracts/[id] to the new endpoint.
- Why: earlier RLS hardening today closed direct PostgREST anon access, but our own admin API surface (running with service-role key) was still open to the internet. Anyone with — or who guessed — a contract UUID could read or mutate any contract via /api/admin/*.
- Local verification pending external testing in production after deploy.

## 2026-04-19 — RLS hardening across admin tables
- contracts table was leaking ALL rows (incl. PII, financial data, signature_data) to anon clients via two misnamed policies (Allow public read by id, Allow all for service role) that were attached to the public Postgres role with USING (true). Dropped both; added a single service_role-only policy.
- Same misconfiguration found by the security advisor on quotes (was leaking financial PII), email_logs, email_templates, page_content. Locked all four to service_role only.
- For tables that are publicly rendered (page_images, blog_posts, promo_slides), split the policy: explicit anon SELECT (filtered by published=true / active=true where applicable) + service_role ALL.
- promo_slides had RLS disabled entirely; enabled and policed.
- Verified: anon SELECT on contracts/quotes/email_logs/email_templates returns []. Public reads on page_images/blog_posts/promo_slides still work (filtered correctly). Supabase advisor reports zero ERROR-level lints; remaining WARNs are intentional design (anon INSERT for contact form, public images CDN bucket).

---

## 2026-04-14 — Edit Bugs, Contract PDF, Calendar Bookings, Orders, Nav, RLS Hardening

### What was done
**Contract / quote edit flow audit**
- Confirmed dates and prices save correctly through edit forms, API whitelist, and DB update; surfaced the real bug as a display-only timezone issue.
- Fixed timezone off-by-one: `new Date("YYYY-MM-DD")` parses as UTC midnight and renders as the previous day in EST/EDT. Now parsed as local date across contracts detail/list, inquiry detail, and public signing page.
- Contract detail view hides empty fields in read mode (no more em-dashes for missing values).

**Contract PDF**
- Added Muhammad Azhar's signature image (`public/azhar-signature.png`) to the Provider column of `src/lib/contract-pdf.tsx`.
- Fixed blank second page: footer + bottom accent bar are now `position: absolute` with react-pdf `fixed`, so they anchor to every page instead of being pushed into flow. Paddings trimmed so content fits on a single A4 page.
- Sign route (`/api/contracts/[id]/sign`) and admin download both pass `providerSignatureUrl`.

**Manual bookings on the calendar**
- "+ Add Booking" button in the calendar header; clicking an empty day cell also opens the modal with that date prefilled.
- Modal fields: client name, email (optional), event date, venue, service description, category, total price (optional), advance (optional), status. Posts to `/api/admin/contracts`.
- Contracts POST now accepts `status` and defaults `terms` to `[]` (was writing null → violated jsonb NOT NULL constraint).

**Orders page**
- New `/admin/orders` listing contracts with status Sent (labeled "Quoted"), Signed, or Completed. Filters, search, revenue total, mobile card layout.
- "+ Add Order" opens the shared BookingModal with status defaulted to Signed.
- Extracted `src/components/admin/booking-modal.tsx` so calendar and orders use one source of truth for categories, statuses, and the POST payload.

**Reorderable sidebar nav**
- HTML5 drag-and-drop on each sidebar item; order persisted per browser in `localStorage.admin-nav-order-v1`. Gracefully merges in any new nav items added to the codebase.
- "Reset nav order" link above Logout.

**Dashboard + Statistics**
- Two new KPI cards: **Quoted** ($ = sent quotes + contracts in Sent status) and **Invoices Sent** (count of quotes with `sent_at`).
- Dashboard KPI grid expanded to 6 columns. Statistics KPI grid expanded to 4×2 + top summary bar mirrors the same metrics.

**Public-routes RLS hardening**
- `/api/contact`, `/api/catalog-leads`, `/api/catalogs/[slug]`, and `/catalogs/[slug]` page now use the anon Supabase client.
- Applied migration `tighten_public_rls_insert_select_only`:
  - `inquiries`: removed permissive "allow all" policy; added `anon_insert_inquiries` (INSERT-only for anon).
  - `catalog_leads`: RLS enabled; added `anon_insert_catalog_leads`.
  - `catalogs` + `catalog_projects`: RLS enabled; added `anon_select_*`.
- Admin routes unchanged — they continue to use `createServerClient()` (service role bypasses RLS).
- `src/lib/supabase.ts` refactored so `getSupabase()` has a proper typed return (`ReturnType<typeof createClient>` was collapsing generics to `never`).

### Decisions
- Bookings, Orders, and Calendar all write to `contracts` rather than introducing a new table — contracts already have `event_date`, `category`, `total_price`, `status`, and feed the dashboard.
- "Quoted" in the UI means `contracts.status = 'Sent'` plus `quotes.sent_at IS NOT NULL` — one concept, aggregated from both data sources.
- Nav order persisted in localStorage (not DB) because admin is single-user.
- Public routes use service role nowhere — anon + narrow RLS is the new bar.

### Commits
- `15ad37e` / `9ae0659` — timezone fix + hide empty fields
- `302e52a` — Azhar signature + blank-second-page fix
- `92d5b4f` — manual calendar bookings, Orders page, reorderable nav
- `82e13f2` — shared BookingModal + Add Order
- `878a215` — Quoted filter in Orders + Quoted/Invoices KPIs on dashboard
- `756418c` — Quoted/Invoices KPIs on Statistics
- `d17c9be` — booking-modal: null terms fix + optional email/price
- `d815f92` — anon client for public routes + narrow RLS policies

---

## 2026-04-10 — Manual Quote Creation

### What was done
- **Problem**: Quotes were tightly coupled to inquiries — no way to create a quote for walk-in/phone customers without first creating an inquiry manually.
- **Solution**: New `/admin/quotes/new` page that collects customer details (name + service required, email/phone/description/budget/event date optional), auto-creates an inquiry with status "Quoted", and redirects to the existing quote builder.
- **API change**: Relaxed `POST /api/admin/inquiries` validation to require only name (email now optional, stored as null when missing).
- **Conditional send**: "Send to Customer" button in quote builder is now hidden when the inquiry has no email — "Save" and "Download PDF" always available.
- **Entry points**: "Create Quote" button on quotes listing page + "+ New Quote" link in admin sidebar.

### Decisions
- Chose to auto-create an inquiry rather than making quotes standalone — keeps data model intact, customer appears in CRM pipeline for tracking.
- Required only name + service (not email) to support walk-in customers who just want a printed quote.

### Files changed
- `src/app/api/admin/inquiries/route.ts` — Relaxed validation (name only)
- `src/app/admin/quotes/new/page.tsx` — NEW: manual quote creation form
- `src/app/admin/quotes/page.tsx` — Added "Create Quote" button
- `src/app/admin/layout.tsx` — Added sidebar nav item
- `src/app/admin/inquiries/[id]/quote/page.tsx` — Conditional send button

---

## 2026-04-08 — Anti-Spam / Bot Protection

### What was done
- **Problem**: Bots were sending spam through all public forms (contact form, floating widget, email gate, catalog viewer inquiry). No CAPTCHA, no honeypot, no server-side email validation — forms were wide open.
- **Honeypot fields**: Added hidden `_hp_website` inputs to all 4 forms. Bots auto-fill these; server silently returns fake success so bots think it worked.
- **Timing check**: All forms send `_formLoadedAt` timestamp. Server rejects submissions faster than 3 seconds (bots submit instantly).
- **Server-side email regex**: Validates format + domain has at least one dot. Catches garbage emails bots submit.
- **Cloudflare Turnstile**: Integrated the widget (dark theme) into all 4 forms and server-side verification in both API routes. **NOT ACTIVE YET** — needs Cloudflare account + site key + secret key. Fails open so real customers aren't blocked while keys are missing.
- **Shared utility**: Created `src/lib/antispam.ts` with `runAntiSpamChecks()` — single function runs honeypot, timing, email, and Turnstile checks in order.
- **Reusable component**: Created `src/components/shared/turnstile.tsx` — handles script loading, explicit render, cleanup on unmount.

### Files changed
- `src/lib/antispam.ts` — NEW: server-side anti-spam checks (honeypot, timing, email regex, gibberish detection, Turnstile)
- `src/components/shared/turnstile.tsx` — NEW: Turnstile client widget
- `src/app/api/contact/route.ts` — Added anti-spam checks before processing
- `src/app/api/catalog-leads/route.ts` — Added anti-spam checks before insert
- `src/components/shared/contact-form.tsx` — Honeypot + Turnstile + timing
- `src/components/shared/floating-action-button.tsx` — Honeypot + Turnstile + timing
- `src/components/catalogs/email-gate.tsx` — Honeypot + Turnstile + timing
- `src/components/catalogs/catalog-viewer.tsx` — Honeypot + Turnstile + timing
- `src/app/admin/customers/page.tsx` — Added Actions column with "+ Inquiry" and "+ Contract" buttons
- `src/app/api/admin/inquiries/route.ts` — Added POST handler to create inquiries from admin
- `src/app/admin/contracts/new/page.tsx` — Accept `client_name` + `client_email` query params for catalog leads
- `.env.local` — Added placeholder Turnstile env vars

### Gibberish detection (added after initial deploy — spam was bypassing honeypot/timing)
- Bots like "pNCzSrofeWYqYHZcu" / "wpEPmvpNzokYywaYZNkXY" were getting through because they used valid emails, waited long enough, and didn't fill honeypot
- Added `checkGibberish()` to detect: no-space names >10 chars, vowel ratio <15%, mixed case patterns (2+ uppercase + 2+ lowercase in a single word), no-space messages >12 chars
- Tested against real names (Ali, Muhammad, Sarah Johnson, Shazal Ali) — all pass
- Tested against spam names (pNCzSrofeWYqYHZcu, xKjRtMwPqNvLs) — all blocked
- Silent rejection (returns fake success so bots don't adapt)

### Customer actions (added same session)
- Customers page now has Actions column: "+ Inquiry" for catalog leads, "+ Contract" for all
- "+ Inquiry" creates a new inquiry via POST /api/admin/inquiries with name/email pre-filled from the catalog lead
- "+ Contract" navigates to contract creation with auto-fill (via inquiry_id or client_name/client_email query params)

### Decisions
- Honeypot returns fake success (not 400) — bots should think submission worked, otherwise they adapt
- Turnstile fails open — if Cloudflare is down or keys aren't set, real customers pass through. Better to let some spam through than block customers.
- 3-second minimum timing — generous enough for fast typists, still catches instant bot submissions
- Each form has its own honeypot ID (`_hp_website`, `_hp_fab_website`, `_hp_gate_website`, `_hp_cv_website`) to avoid DOM ID conflicts since multiple forms can exist on the same page
- Gibberish detection uses silent reject (fake success) — same philosophy as honeypot

### TODO
- [ ] Create Cloudflare account and Turnstile site (printecwrap.com + localhost)
- [ ] Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` to Vercel env vars
- [ ] Monitor spam levels — if honeypot + timing + gibberish aren't enough, activate Turnstile

---

## 2026-03-18 — Initial Build

### What was done
- Created full 13-page Next.js website for Printec Virginia LLC
- Extracted shared components (Navbar, Footer, Section, PageHero, CtaBanner, SkewedButton)
- Built all service landing pages: Dance Floor Wraps, Wall Wraps, Window Wraps, Channel Letters & Signage
- Built all SEO landing pages: Wedding Floor Wrap, LED Channel Letters, Channel Letter Signs Near Me, Storefront Window Graphics
- Built core pages: About, Portfolio, Contact, Blog (hub + 6 articles + dynamic [slug])
- Added Lucide React icons across all pages
- Created filterable gallery with lightbox
- Homepage with animated hero (EtheralShadow bg, motion text, ContainerTextFlip)
- Horizontal auto-scrolling services carousel

### Decisions
- Used inline styles (not Tailwind utilities) for brand-specific styling — matches original codebase pattern
- Server Components by default, 'use client' only where needed (forms, animations)
- Blog articles hardcoded in blog-data.ts (no CMS needed yet)
- Image areas are placeholders — real photos to be added later as .webp

### Problems & Solutions
- **Logo invisible on dark bg**: Created light version (white text) using Python PIL
- **Page lag (52 motion elements)**: Replaced framer-motion variants with CSS IntersectionObserver + transitions
- **Turbopack cache corruption**: Fixed by cleaning .next dirs with spaces in names
- **Port conflicts**: Used alternate ports (4444, 3000, 3424)

---

## 2026-03-18 — Design System: Refined Minimal

### What was done
- Redesigned all inner pages from heavy "street/urban" style to Refined Minimal
- Font sizes reduced: h1 36px, h2 28px, body 15px (was 48-60px+)
- Removed skewed labels, spectrum gradient bars, heavy borders
- Added thin 1px separators, subtle card styles, clean 10px labels
- Updated PageHero and CtaBanner shared components to match
- Consistent body text color: rgba(255,255,255,0.5) across all pages
- Added image placeholder areas to all service/SEO pages

### Decisions
- Homepage keeps its unique animated hero style (different from inner pages intentionally)
- Inter font for body text, Arial Black only for h1 headings
- Cards: bg #111, 1px solid #222, 4px border-radius

---

## 2026-03-18 — Buttons: Neon Glow Pulse

### What was done
- Replaced old spectrum gradient skewed buttons with Neon Glow Pulse style
- Solid orange fill (#F7941D), white text, pulsing box-shadow animation
- Hover: brighter orange, larger glow, lifts up
- Applied across all pages including contact form submit button

---

## 2026-03-18 — SEO & Meta

### What was done
- Added detailed metadata (title, description, keywords, openGraph) to all 14 pages
- Created sitemap.ts (auto-generates XML sitemap)
- Created robots.ts
- Generated favicon (colorful P monogram), apple-touch-icon, OG image from logo
- Updated layout.tsx with metadataBase, twitter cards, icons config

---

## 2026-03-19 — Content & Copy Updates

### What was done
- Fixed "25+ years" → "Since 2017" / "nearly a decade" across all pages (company est. 2017)
- Changed "your brand" → "your vision" on general pages (targets weddings + events too)
- Updated hero tagline: "FROM VISION TO VINYL"
- Added ContainerTextFlip: "WE CREATE [SIGNS/WRAPS/GRAPHICS/EVENTS/BRANDS] THAT STAND OUT"
- Updated homepage services to match actual service pages (9 services with correct links)
- Contact form: categorized service dropdown with optgroups (Floor Wraps, Signage, Wraps, Print, Other)

---

## 2026-03-19 — Animations

### What was done
- About section ("WHO WE ARE"): Scroll-driven animation — heading from left, text from right, tags staggered
- Services header ("WHAT WE DO / OUR SERVICES"): Typewriter label + split reveal heading
- CTA section ("READY TO GO BIG?"): Typewriter + split reveal + fade-up paragraph + staggered buttons
- Services carousel: Auto-scrolling marquee (50s loop, pauses on hover, fade edges)

---

## 2026-03-19 — Team Page & Social

### What was done
- Created /team page: 3 leadership profiles + 8 team members + company values
- Added to navbar and footer navigation
- Added social links (Instagram, Facebook, TikTok) to:
  - Footer (icon row)
  - Contact page (info section)
  - Homepage ("Follow Our Work" section with platform cards + feed grid)
- Cleaned social URLs (removed tracking params)

---

## 2026-03-19 — Floating Action Button

### What was done
- Built chat modal with banner header style (worker photo)
- 3 actions: Connect with Our Team (opens inline form), Get a Quote, Call
- Inline quick form: name, email, phone → success confirmation
- Worker photo displayed as wide banner with gradient overlay
- "Online" green pulsing badge
- Neon glow pulse on the FAB button

---

## 2026-03-19 — Logo Update

### What was done
- Replaced low-res logo (752×471) with high-res PDF version (2000×1252)
- Regenerated: favicon, apple-touch-icon, OG image, light version
- Updated navbar and footer image dimensions
- Removed spectrum gradient lines from navbar/footer (refined minimal)
- Updated footer fonts from Arial Black to Arial (consistent)

---

## 2026-03-19 — Domain & Deployment Fix

### What was done
- Fixed redirect loop between printecwrap.com ↔ www.printecwrap.com (ERR_TOO_MANY_REDIRECTS)
- Root cause: both domains were redirecting to each other in Vercel
- Fix: made printecwrap.com the primary Production domain, www redirects to non-www
- Site live at https://printecwrap.com

---

## 2026-03-19 — Images: Supabase Storage + WebP Migration

### What was done
- Created public `images` bucket in Supabase Storage with public read access
- Converted all images from PNG/JPEG to WebP (97-99% size reduction)
- Uploaded all images to Supabase CDN
- Configured next.config.ts for Supabase remote image patterns
- Created centralized `IMG` constants in constants.ts for all Supabase image URLs
- Updated all pages to use `IMG.xxx` instead of `/images/xxx`
- Added `next/image` with `priority`, `sizes`, `fill` for optimal SSR loading
- Added Supabase env vars to Vercel (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- Fixed Supabase client lazy init to prevent build crashes

### Images added
| Image | Size | Used On |
|-------|------|---------|
| workshop.webp | 188KB | About hero + story |
| worker.webp | 36KB | Floating action button |
| dance-floor-hero.webp | 168KB | Dance floor wraps hero |
| floor-before/after.webp | 37KB/27KB | Dance floor before/after slider |
| wall-wrap-hero.webp | 100KB | Wall wraps hero |
| wall-before/after.webp | 26KB/45KB | Wall wraps before/after slider |
| window-wrap-hero.webp | 120KB | Window wraps hero |
| window-before/after.webp | 25KB/37KB | Window wraps before/after slider |
| signage-hero.webp | 144KB | Channel letters hero (Aurora & Oak plaza) |
| signage-before/after.webp | 64KB/84KB | Channel letters before/after slider |
| neon-before/after.webp | 72KB/92KB | Custom neon signs before/after slider |
| biz-signage-hero.webp | 260KB | Business signage hero (Meridian Business Park) |
| team-shazil.webp | 24KB | Team page — Shazil Ali |
| team-azhar.webp | 24KB | Team page — Azhar Ahmed |
| team-anton.webp | 24KB | Team page — Anton Andersson |

---

## 2026-03-19 — Before/After Slider Redesign

### What was done
- Redesigned BeforeAfterSlider component with Style 3 (Elegant Pill with Glow)
- Pill-shaped labels: frosted "BEFORE" (white), glowing "AFTER" (orange with pulse animation)
- Gradient slider line that fades at top/bottom edges
- Pulsing orange handle with radial gradient
- Decorative corner accents (white left, orange right)
- CSS animations added: baHandlePulse, baAfterGlow
- Applied to all 4 service pages with before/after sliders

---

## 2026-03-21 — New Service Pages

### What was done
- Created `/vinyl-wraps` — targeting vinyl wraps (33,100/mo), vehicle wraps, boat wraps
- Created `/business-signage` — targeting business signage (14,800/mo), commercial signage
- Created `/custom-neon-signs` — targeting custom neon signs (33,100/mo), custom led neon signs (4,400/mo)
- All follow identical structure: hero, before/after, who it's for, process, FAQ, CTA
- Added to SERVICES_NAV dropdown, footer, and sitemap
- `/custom-signs` was created then removed (overlapped with existing pages)

### Decisions
- No vehicle wraps page — Printec doesn't do car wraps
- Removed custom-signs to avoid keyword cannibalization with channel-letters-signage

---

## 2026-03-21 — Team Page Updates

### What was done
- Added real team photos: Shazil Ali, Azhar Ahmed, Anton Andersson (24KB WebP each)
- Updated team structure:
  - Shakila — CEO (no photo)
  - Shazil Ali — Sales Representative (photo)
  - Azhar Ahmed — Sales Representative (photo)
  - Anton Andersson — Sales Representative (photo)
  - Maria Gonzalez — Lead Designer (no photo)
- Removed "The Crew" section with 8 placeholder team members
- All members share same email (info@printeccorp.com) and phone
- Replaced LinkedIn links with Call buttons
- Removed team hero photo placeholder

---

## 2026-03-22 — Location SEO Pages

### What was done
- Created 9 location pages for local search targeting:
  - `/locations/washington-dc`
  - `/locations/virginia`
  - `/locations/maryland`
  - `/locations/seattle`
  - `/locations/new-york`
  - `/locations/los-angeles`
  - `/locations/chicago`
  - `/locations/dallas`
  - `/locations/houston`
- Each page: hero, services, benefits, areas served (12 neighborhoods), FAQ (4 local Q&As), CTA
- Content localized per city (permits, weather, neighborhoods)
- All added to sitemap.xml
- No images needed for location pages (text-heavy SEO pages)

### Decisions
- Text-only location pages (no hero images) — Google ranks based on content, not visuals
- City-specific FAQ answers (e.g., Chicago winters, Texas sun, NYC DOB regulations)

---

## 2026-03-22 — Admin Portal & CRM

### What was done
- Built full admin portal at /admin with password auth (proxy.ts middleware)
- Dashboard with sales metrics: Booked Pipeline, Completed Revenue, Average Order, New Inquiries
- Date filter with month navigation arrows (All Time / This Month / Last Month / Custom)
- Page image management: upload to Supabase Storage, preview, delete per page slot
- Page text management: edit headings and body text per page
- Blog CRUD with Tiptap WYSIWYG editor (bold, italic, headings, lists, links, images)
- Blog reads from Supabase with fallback to hardcoded blog-data.ts
- Seeded 6 blog posts into Supabase

### CRM Features
- Inquiry management: all contact form submissions saved to `inquiries` table
- Status pipeline: New → Contacted → Follow Up → Quoted → Booked → Completed
- Color-coded status badges, filter tabs, search by name/email
- Editable customer details (name, email, phone, service, budget, description)
- Notes per inquiry
- Price tracking: prompted on Booked/Completed status change
- PDF quote generator: branded dark theme with Printec logo, line items, totals
- Quote sending via Microsoft Graph email with PDF attachment
- All quotes listing page with Sent/Not Sent filter

### Email Integration
- Microsoft Graph API (Azure AD app registration)
- Contact form: sends notification to info@printecwrap.com + confirmation to customer
- UTM parameter capture (utm_source, utm_medium, utm_campaign) from URL
- Page source tracking (which page form was submitted from)
- Rate limiting: 60s cooldown per email+source
- Added service dropdown to floating widget form

### Packages Added
- @supabase/supabase-js — database + storage client
- @tiptap/react, @tiptap/starter-kit, @tiptap/extension-image, @tiptap/extension-link — WYSIWYG
- @react-pdf/renderer — PDF quote generation
- @azure/identity, @microsoft/microsoft-graph-client — email sending

### Database Tables Created
- page_images (page_slug, slot, url, alt_text)
- page_content (page_slug, field, value)
- blog_posts (slug, title, content, published, etc.)
- inquiries (name, email, status, booked_price, completed_price, utm_*, etc.)
- quotes (inquiry_id, quote_number, items jsonb, total, sent_at)

### Environment Variables Added to Vercel
- SUPABASE_SERVICE_ROLE_KEY
- ADMIN_PASSWORD
- AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET
- EMAIL_FROM (info@printecwrap.com)

### Decisions
- Simple password auth (no Supabase Auth) — single admin user
- Tiptap for WYSIWYG (free, React-native, extensible)
- React PDF for quote generation (server-side rendering)
- Microsoft Graph for email (company already uses M365)
- In-memory rate limiting (serverless-safe with cleanup on each request)
- Blog migration is backward-compatible (fallback to blog-data.ts if DB empty)

---

## 2026-03-22 — Admin Image Management

### What was done
- Created /admin/images page for managing Supabase Storage images
- Features: view all images in grid, single + bulk upload (drag & drop), delete with confirmation
- Copy URL button copies Supabase CDN URL to clipboard
- Search/filter bar to find images by filename
- Shows file size (KB/MB) and thumbnail preview for each image
- API route /api/admin/images (GET list, POST upload, DELETE remove)
- Added "Images" to admin sidebar navigation

---

## 2026-03-22 — Logo Animation + Performance + Analytics

### What was done
- Added navbar logo spin + bounce animation (Style 1) on first visit
- Uses sessionStorage — plays once per browser session, no SEO impact
- Added Microsoft Clarity analytics (ID: vzki5lbs56) via next/Script afterInteractive
- Fixed metadataBase URL: printeccorp.com → printecwrap.com
- Performance: enabled AVIF format, 1-year image cache TTL, gzip compression, removed X-Powered-By header
- Improved sitemap with priority tiers (service pages 0.9, SEO pages 0.8, locations 0.7, blog 0.6)

---

## 2026-03-22 — Digital Contract System

### What was done
- Built complete digital contract system for client agreements
- Admin creates contracts at /admin/contracts (manual or auto-fill from inquiry)
- Customer receives email with signing link (printecwrap.com/sign/[id])
- Customer draws signature on canvas (mouse + touch), clicks "Sign & Submit"
- Signed PDF generated and emailed to both customer and info@printecwrap.com
- Contract PDF: branded with Printec logo (dark version for white bg), company info, terms, signatures
- Contract list with All/Pending/Sent/Signed filter tabs
- Contract detail page: view, edit, send link, copy link, download PDF
- "Create Contract" button added to inquiry detail page
- Sidebar nav updated with Contracts link

### Database
- New `contracts` table: contract_number (PC-001), event_date, venue, service_description, pricing fields (total, advance, balance, travel), client info, terms (jsonb), signature_data (base64), signed_at, sent_at

### Default contract terms (pre-filled, editable)
10 clauses matching the original PDF template: services, payment, deposit/cancellation, confidentiality, liability, governing law, entire agreement, film type, amendment, signatures

### Fixes
- Contract PDF uses dark logo (printec-logo.png) for white background (was using light version — invisible)
- Updated email to info@printecwrap.com
- Updated phone to +1 (571) 343-1598

### Decisions
- White background for contract PDF (printable, professional)
- Public /sign/[id] page — no auth required for customer signing
- Signature drawn on HTML canvas, saved as base64 PNG
- React PDF for server-side PDF generation
- Terms stored as jsonb array — each contract can have customized terms

---

## 2026-03-23 — Contract-Sales Integration

### What was done
- Added explicit `status` column to contracts table (Pending/Sent/Signed/Completed/Cancelled)
- Added `completed_at` column for tracking when contracts are completed
- Migrated existing contracts: status set from sent_at/signed_at timestamps
- Dashboard sales metrics now include contract revenue:
  - Booked Pipeline: inquiry booked_price + contract total_price (status=Signed)
  - Completed Revenue: inquiry completed_price + contract total_price (status=Completed)
  - Average Order: calculated across both completed inquiries and contracts
- Contract list page: 6 filter tabs (All/Pending/Sent/Signed/Completed/Cancelled)
- Contract detail page: status dropdown in header (replaces static badge)
- Auto-transitions: sending → Sent, signing → Signed
- Manual override: admin can change status via dropdown at any time
- Confirmation prompts on Completed and Cancelled status changes
- Edit/Send buttons hidden when contract is Cancelled

### Decisions
- Contracts and inquiries remain independent (no auto-sync between them)
- Both contribute to dashboard sales metrics independently
- Contract total_price is the value used for sales metrics (not advance or balance)

---

## 2026-03-23 — Form Audit & Fixes

### What was done
- Audited all forms (contact form, FAB widget, API route) for category completeness
- **Contact form categories fixed**: Removed Vehicle Wraps, Monument Signs, Pylon Signs. Added Vinyl Wraps, Business Signage, Custom Neon Signs, Food Truck/Trailer Wraps. Reorganized into 5 optgroups (Wraps, Floor Wraps, Signage, Print & Design, Other)
- **FAB widget categories fixed**: Removed Vehicle Wraps, LED Channel Letters. Added Vinyl Wraps, Business Signage, Custom Neon Signs, Food Truck Wraps, Wedding Floor Wraps (11 options total)
- **Branding fixes**: "PRINTEC CORP" → "PRINTEC VIRGINIA LLC" in FAB footer and confirmation email
- **API bug fix**: utm_term and utm_content were captured from URL but dropped on DB insert — now saved
- **Error logging added**: API route logs all submissions, validation failures, rate limits, email send results, DB saves with [Contact API] prefix. Client forms log errors with component prefix.

---

## 2026-03-23 — Admin Statistics Dashboard

### What was done
- Created /admin/statistics page with 13 charts/visualizations using Recharts
- Added "Statistics" to admin sidebar navigation (2nd position with chart icon)
- Installed `recharts` package

### Charts & Visualizations
**KPI Cards (6):** Total Inquiries, New Inquiries, Booked Pipeline ($), Completed Revenue ($), Avg Order ($), Conversion Rate (%)

**Inquiry Analytics (4 charts):**
1. Inquiries Over Time — monthly bar chart
2. By Service Type — horizontal bar chart (top 8)
3. Conversion Funnel — colored bars (New → Contacted → Follow Up → Quoted → Booked → Completed)
4. By Source — donut chart (Contact Form vs Chat Widget)

**Revenue Analytics (4 charts):**
5. Revenue Over Time — area chart (booked + completed with gradient fills)
6. Revenue by Service — horizontal bar chart
7. Average Deal Size Over Time — line chart
8. Pipeline: Booked vs Completed — stacked bar chart

**Traffic & Form Analytics (5 items):**
9. Top Pages Generating Inquiries — ranked list with inline bars
10. Submissions by Day of Week — bar chart
11. Submissions by Hour of Day — bar chart
12. Budget Range Distribution — donut chart
13. UTM Campaign Breakdown — table (source, medium, campaign, count)

### Technical Details
- All data computed client-side from existing API endpoints (no new backend needed)
- Same date filter as dashboard (All Time / This Month / Last Month / Custom)
- Dark theme matching admin panel (#111 cards, #222 borders, orange accents)
- Custom tooltip component for consistent chart hover styling
- Empty state component for charts with no data
- Responsive charts via Recharts ResponsiveContainer

### Packages Added
- recharts — React charting library

### Decisions
- Client-side computation (data volume is small, no need for backend aggregation)
- Recharts chosen for React-native API, dark theme support, lightweight bundle
- Statistics page separate from dashboard (dashboard = quick overview, statistics = deep analytics)

---

## 2026-03-23 — Contact Info & Address Update

### What was done
- Updated phone number across all pages: `(647) 299-1460` → `(715) 503-5444`
- Updated email across all pages: `info@printeccorp.com` → `info@printecwrap.com`
- Updated address: `1234 Commerce Drive, Virginia Beach, VA 23456` → `Woodbridge, VA 22191`
- Updated homepage location: `Oshkosh, Wisconsin` → `Woodbridge, Virginia`
- Updated JSON-LD geo coordinates to Woodbridge, VA (38.6582, -77.2497)
- Updated team page email and phone
- Updated footer connect info and bottom bar address
- Updated contact form info panel (phone, email, WhatsApp, address, map link)
- Updated floating action button call link
- Updated contract PDF and quote PDF contact details
- Updated CTA banner phone link
- Added "Sales Statistics" button to admin dashboard header (links to /admin/statistics)

### Files changed (15)
- layout.tsx, page.tsx, team/page.tsx, contact/page.tsx
- home-page-client.tsx, footer.tsx, contact-form.tsx, floating-action-button.tsx
- cta-banner.tsx, business-signage/page.tsx, dance-floor-wraps/page.tsx, vinyl-wraps/page.tsx
- contract-pdf.tsx, quote-pdf.tsx, admin/page.tsx

---

## 2026-03-23 — Interactive Web Catalog System

### What was done
- Built complete interactive web catalog system with 6 service categories
- Fullscreen cinematic slideshow viewer (Template #4 — dark theme, immersive)
- Email-gated access with lead capture (per-catalog sessionStorage)
- Admin CRUD for catalogs and projects (images, specs, reorder)
- Unified Customers page merging inquiries + catalog leads
- "Send This Design" inquiry modal within catalog viewer

### Catalog Categories (seeded with 3 projects each)
1. Channel Letters & Signage
2. Vehicle & Food Truck Wraps
3. Window & Storefront Graphics
4. Wall Wraps & Murals
5. Dance Floor & Wedding Wraps
6. Neon Signs

### Public Pages Created
- `/catalogs` — Landing page with grid of 6 catalog cards
- `/catalogs/[slug]` — Fullscreen slideshow viewer with email gate

### Admin Pages Created
- `/admin/catalogs` — Catalog list (create/delete)
- `/admin/catalogs/[id]` — Edit catalog + manage projects (upload images, edit specs, reorder)
- `/admin/catalogs/leads` — View captured leads (filter, search, export emails)
- `/admin/customers` — Unified customer view (inquiries + catalog leads)

### API Routes Created (7)
- `/api/admin/catalogs` — Catalogs CRUD (GET list, POST create)
- `/api/admin/catalogs/[id]` — Single catalog (GET, PUT, DELETE)
- `/api/admin/catalogs/[id]/projects` — Projects CRUD + reorder (GET, POST, PATCH)
- `/api/admin/catalogs/[id]/projects/[projectId]` — Single project (PUT, DELETE)
- `/api/admin/catalog-leads` — Admin: list catalog leads
- `/api/catalog-leads` — Public: capture lead email
- `/api/catalogs/[slug]` — Public: fetch catalog by slug
- `/api/admin/customers` — Unified customers (inquiries + leads merged)

### Components Created
- `email-gate.tsx` — Modal overlay with name/email form, sessionStorage persistence, close button
- `catalog-viewer.tsx` — Fullscreen slideshow (keyboard, swipe, dots, progress bar, staggered animations)
- `catalog-page.tsx` — Gate + viewer wrapper

### Catalog Viewer Features
- Fullscreen cinematic slideshow (100vh, dark theme)
- Left: full-bleed project image with gradient overlay
- Right: project details (counter, title, description, specs grid, CTA)
- Staggered slide-up text animations on slide change
- Navigation: prev/next buttons, dot indicators, keyboard arrows, touch swipe
- Progress bar showing position
- "Send This Design" button → quick inquiry modal (auto-fills catalog category)
- "Get a Quote" button → links to /contact
- Floating "Request Quote" CTA with pulse glow
- Real Printec logo in top bar and email gate
- Responsive: mobile-friendly bottom panel layout

### Database Tables Created
- `catalogs` — id, title, slug (unique), description, created_at
- `catalog_projects` — id, catalog_id (FK, cascade), title, description, image_url, specs (jsonb), sort_order, created_at
- `catalog_leads` — id, catalog_slug, name, email, created_at

### Navigation Updates
- Added "Catalogs" to navbar (between Portfolio and Blog)
- Added "Catalogs" to footer (Company links)
- Added "Catalogs" and "Customers" to admin sidebar
- Updated sitemap with catalog URLs (priority 0.7-0.8)

### Bug Fixes
- Fixed catalog API returning wrong project count format
- Fixed PDF fallback text: "PRINTEC CORP" → "PRINTEC VIRGINIA LLC" in quote-pdf.tsx and contract-pdf.tsx
- Replaced fake "P + PRINTEC" text logos with real `/printec-logo-light.png` in catalog components
- Removed Location specs from all seeded catalog projects
- Added close (X) button to email gate modal

### Decisions
- Catalogs live on main domain (`/catalogs`) not a subdomain — SEO + lead flow benefits
- Email gate is per-catalog (Option B) — tracks which catalog each lead viewed
- Inquiry form in catalog viewer posts to existing `/api/contact` with `source: "catalog"`
- Inline styles (no Tailwind) matching existing codebase pattern
- 18 sample projects seeded via Supabase SQL (3 per catalog, with specs)

---

## 2026-03-24 — Team Photos Update

### What was done
- New high-res team photos (1200px, q85 WebP) for Azhar, Shazal, Nomi, Aryan
- All photos: workshop background with Printec logo polo, orange accent lighting
- Per-person `objectPosition` for proper face centering in 4:5 cards
- Added Nomi (Lead Designer, he/him) and Aryan W. (Junior Intern) to team
- Removed Anton's photo (placeholder until new photo available)
- Removed old low-res 600px photos
- Card aspect ratio changed from 3:4 to 4:5 for better landscape photo fit

### Team Members
| Name | Role | Photo | Position |
|------|------|-------|----------|
| Muhammad Azhar | CEO | team-azhar-v2.webp (1200px) | center top |
| Shazal Ali | Sales Rep | team-shazal-v3.webp (1200px) | 35% top |
| Anton Andersson | Sales Rep | No photo | — |
| Nomi | Lead Designer | team-nomi.webp (1200px) | center top |
| Aryan W. | Junior Intern | team-aryan-v2.webp (1200px) | center top |

---

## 2026-03-24 — Admin Portal Mobile Responsive

### What was done
- Made all admin pages fully mobile responsive
- Added CSS responsive classes in globals.css (768px + 480px breakpoints)
- Sidebar already had mobile hamburger menu + bottom nav (no changes needed)

### Responsive CSS Classes Added
| Class | Desktop | Mobile (≤768px) |
|-------|---------|-----------------|
| `admin-grid-6` | 6 columns | 2 columns |
| `admin-grid-4` | 4 columns | 2 columns (1 on ≤480px) |
| `admin-grid-3` | 3 columns | 1 column |
| `admin-grid-2` | 2 columns | 1 column |
| `admin-header-row` | flex row | stacked column |
| `admin-filter-bar` | flex row | stacked, centered |
| `admin-filter-tabs` | flex row | wraps, smaller buttons |
| `admin-table-wrap` | normal | horizontal scroll (min-width 600px) |
| `admin-form-grid` | 2 columns | 1 column |
| `admin-blog-row` | 5-column grid | 1 column |
| `admin-stats-summary` | flex row | wraps |

### Pages Fixed
- Dashboard: KPIs, overview cards, quick links, filter bar, header
- Statistics: KPIs, all chart grids, filter bar, header, UTM table
- Contracts: header, filter tabs, table scroll
- Inquiries: table scroll
- Quotes: table scroll
- Blog: header, grid rows
- Contract form: 2-col → 1-col

### Decisions
- CSS class approach (not inline media queries) — cleaner, reusable across pages
- Tables use horizontal scroll rather than hiding columns — preserves all data
- 768px breakpoint for tablet, 480px for small phone

---

## 2026-03-24 — Promotional Slider Bar

### What was done
- Built promotional slider bar below navbar for special offers
- Orange bar (#F7941D bg, black text, 38px height) auto-rotates every 4 seconds
- Fade transitions between slides, pauses on hover
- Clickable slides link to any page (service pages, contact, catalogs)
- Close (X) button hides bar for the session (sessionStorage)
- Admin management page at /admin/promos
- Added "Promos" to admin sidebar with Megaphone icon

### Admin Features
- Create/edit/delete promo slides
- Toggle active/inactive per slide (green=active, gray=inactive)
- Reorder with up/down arrows
- Set text + link URL per slide
- Only active slides shown on public site

### Database
- New `promo_slides` table: id, text, link, active (boolean), sort_order, created_at
- 3 sample offers seeded

### Files Created
- `src/components/layout/promo-bar.tsx` — Client component, auto-rotating slider
- `src/app/admin/promos/page.tsx` — Admin management page
- `src/app/api/promo-slides/route.ts` — Public: fetch active slides
- `src/app/api/admin/promo-slides/route.ts` — Admin: list all + create
- `src/app/api/admin/promo-slides/[id]/route.ts` — Admin: update + delete

### Files Modified
- `src/components/layout/site-shell.tsx` — Renders PromoBar after Navbar
- `src/app/admin/layout.tsx` — Added Promos nav item

### Decisions
- Orange background (brand color) makes the bar stand out without clashing
- Session-based dismissal (not permanent) — bar returns on next visit
- Auto-rotate with hover pause — non-intrusive but visible

---

## 2026-03-24 — Admin Portfolio Manager

### What was done
- Built DB-driven portfolio gallery at /admin/portfolio
- Admin can manage portfolio images (add, edit, delete, reorder)
- Public portfolio page reads from Supabase instead of hardcoded data

---

## 2026-03-24 — Contact Page Cleanup

### What was done
- Removed map placeholder section from contact page (was showing fake "1234 Commerce Drive" address)
- Changed address in contact info from "Woodbridge, VA 22191" to "Virginia, USA"
- No specific street address shown publicly

---

## 2026-03-24 — Clarity Disabled on Admin

### What was done
- Microsoft Clarity analytics script now skips /admin/* and /sign/* pages
- Prevents admin activity from being tracked in heatmaps/session recordings

---

## 2026-03-25 — Catalogs Coming Soon

### What was done
- Replaced full catalogs page with "Coming Soon" landing page
- Clean design: title, "Coming Soon" badge, description, "Get in Touch" CTA
- Full catalog system (6 categories, email gate, slideshow viewer) still built but not live

---

## 2026-03-25 — Food Truck & Storefront Updates

### What was done
- Added Taco Fiesta food truck wrap image to portfolio and food truck wraps page
- Added before/after slider to storefront window graphics page
- Added industry-specific images to storefront window graphics page

---

## 2026-03-25 — Homepage Cleanup

### What was done
- Removed "LATEST WORK" placeholder grid (6 empty boxes) from homepage social section
- Was below the "Follow Our Work" social media cards, showing placeholder text only

---

## 2026-03-26 — Admin Catalog Mobile UI

### What was done
- Catalogs list: added mobile card layout (desktop table + mobile cards toggle)
- Catalog detail: fixed mobile layout for project editor
  - Header wraps on mobile
  - Project image + form grid stacks vertically (280px sidebar → full width)
  - Image area min-height 200px when stacked
  - Upload button works on touch devices
  - Fixed duplicate className bug on project grid
- Updated CLAUDE.md, TDD.md, DEVLOG.md with all recent changes

---

## 2026-03-27 — Wedding Floor Wrap Images Connected

### What was done
- Connected 7 existing wedding floor wrap images to `/wedding-floor-wrap` page
- Hero: `wedding-floral-border.webp` (floral border tent design)
- 6 Design Ideas cards mapped to real images:
  - Classic Monogram → `wedding-am-wreath.webp` (A&M white rose wreath)
  - Floral Garden → `wedding-am-floral.webp` (A&M floral ballroom)
  - Starry Night → `wedding-starry-night.webp` (Sarah & Michael celestial)
  - Photo Collage → `wedding-photo-collage.webp` (heart photo collage)
  - Geometric Gold → `wedding-aj-geometric.webp` (A&J gold geometric)
  - Custom Illustration → `wedding-illustration.webp` (Leo & Maya custom art)
- All using `next/image` with `fill` + responsive `sizes`
- Replaced gradient placeholders with real WebP images

---

## 2026-03-27 — Navigation: "Dance Floor Wraps" → "Floor Wraps"

### What was done
- Renamed "Dance Floor Wraps" to "Floor Wraps" in navbar dropdown, homepage services, admin pages
- Broader label covers weddings, corporate events, mehndi, trade shows
- Portfolio category already used "Floor Wraps" — now consistent
- URL unchanged (`/dance-floor-wraps`) to avoid breaking existing links
- Wedding Floor Wraps remains as separate SEO page in footer

### Files changed
- `src/lib/constants.ts` — SERVICES_NAV label
- `src/components/home-page-client.tsx` — homepage service #06 title
- `src/app/admin/pages/page.tsx` — admin page list display name
- `src/app/admin/pages/[slug]/page.tsx` — admin page detail display name

---

## 2026-03-28 — Google Ads Plan & Marketing Documentation

### What was done
- Created comprehensive Google Ads plan
- Single Search campaign with 2 ad groups: Wall Wraps + Floor Wraps
- 16 high-intent keywords (8 per ad group) — phrase + exact match only
- 15 negative keywords to block DIY/tutorial/job traffic
- Responsive search ad copy written for both ad groups (5 headlines + 2 descriptions each)
- Landing pages mapped: /wall-wraps, /dance-floor-wraps, /wedding-floor-wrap
- UTM parameters defined for tracking in existing contact form + admin statistics
- Conversion tracking strategy: GA4 `generate_lead` as primary, `phone_click` as secondary
- Created MARKETING.md — central reference for all marketing activities
- Created design doc: docs/plans/2026-03-28-google-ads-plan-design.md

### Decisions
- Maximize Clicks bidding (not Maximize Conversions) — need data first
- Mon–Sat 8AM–7PM schedule (business hours + buffer)
- Search only (no Display, no Search Partners) — highest intent traffic

---

## 2026-03-29 — Google Ads Account Setup & Campaign Decision

### What was done
- Created Google Ads account: **342-087-0676**
- GA4 property **530146539** (G-6K8LW0P8B9) linked to Google Ads during account creation
- Budget set to **$300/month** ($10/day) — upgraded from initial $100 test
- Bidding: Maximize Clicks
- Locations configured: Virginia, Maryland, Washington D.C.
- Payment method added: Mastercard ****1410

### Issues & Pivots
- Google's new account wizard defaulted to **Performance Max** campaign (not Search)
- PMax requires images and shows ads across all Google channels (Search, Display, YouTube, Maps, Gmail)
- User decided: **Search-only campaign** is better for the budget — text ads targeting high-intent searchers
- **Permanently removed** PMax campaign #1 from account
- Created new **Search campaign draft**: `Printec – Wall & Floor Wraps – Search`
  - Bidding: Maximize Clicks
  - Networks: Search only (unchecked Search Partners + Display Network)
  - Location: Virginia added (MD + DC to be added manually — dropdown keeps selecting congressional districts)

### Updated Documentation
- MARKETING.md: $300/month budget, account ID, GA4 linking, setup TODO checklist
- TDD.md: Added progress tracking for each campaign setup step
- CLAUDE.md: Updated campaign status
- DEVLOG.md: Full session log

### Campaign Setup Completed
- Locations: Virginia, Maryland, District of Columbia (all states)
- Keywords: **32 total** (16 wall wrap + 16 floor wrap) — expanded from original 16
- Ad copy: 5 headlines (Custom Wall & Floor Wraps, Free Quote - Fast Turnaround, Serving VA MD & DC, Printec Virginia LLC, Professional Installation) + 2 descriptions
- Budget: $10/day ($300/month)
- Estimated performance: 155 weekly clicks, $0.45 avg CPC, $70/week
- Networks: Search only (Display + Search Partners unchecked)
- AI Max: Off

### GA4 Verification (Live Site)
- `gtag()` function: working on printecwrap.com
- Measurement ID: G-6K8LW0P8B9 confirmed loading
- DataLayer: active (4 entries on page load)
- `generate_lead` fires from: contact form, catalog viewer, floating widget (3 sources)
- `phone_click` fires from: all tel: links across site
- GA4 linked to Google Ads: confirmed (Property 530146539)

### Next Steps
1. Publish campaign (click Publish in Review step)
2. Complete advertiser verification (Google requires before ads run)
3. Import GA4 `generate_lead` as primary conversion in Google Ads
4. Monitor for 30 days

---

## 2026-03-29 — Booking Calendar

### What was done
- Created `/admin/calendar` page with monthly, weekly, and daily views
- Shows contracts (by event_date) and inquiries (by event_date or created_at)
- Color-coded: blue=inquiry, yellow=pending, orange=sent, green=signed, gray=completed, red=cancelled
- Inquiries linked to a contract are hidden (no duplicates)
- Toggleable color guide panel explaining all statuses
- Click any entry → navigates to contract/inquiry detail
- Added `event_date` column to inquiries table (nullable, editable on detail page)
- Added Calendar to admin sidebar nav (position 3, after Statistics)

---

## 2026-03-29 — Email Marketing System

### What was done
- Built complete email marketing system at `/admin/emails`
- **Compose page**: Tiptap WYSIWYG editor + recipient picker sidebar
- **Recipients**: pulls from inquiries + catalog leads + contracts, deduplicated by email
- **Filters**: by source (Inquiry/Catalog/Contract) + search by name/email
- **Placeholders**: `{name}`, `{email}`, `{service}` auto-replaced per recipient
- **Sending**: individual sends via Microsoft Graph (personalized, not BCC)
- **Templates**: save/load/edit/delete reusable email templates
- **Sent log**: tracks every email with success/failed status
- **Branded wrapper**: dark/orange Printec theme on every outbound email
- Added Emails to admin sidebar nav (after Quotes)

### Database
- `email_templates` — name, subject, body (HTML)
- `email_logs` — template_id, subject, recipient_email, recipient_name, status, sent_at

---

## 2026-03-30 — Contact Form Bug Fix & Azure Health Check

### What was done
- **Bug fix**: Contact form was sending notification email BEFORE saving to DB. If email failed (Azure auth error, rate limit), the `throw` killed the request and inquiry was never saved. Customer Leslie Gonzales was lost this way.
- **Fix**: DB save now happens FIRST. Email failures no longer prevent customer from being saved.
- **Manually added** Leslie Gonzales inquiry to Supabase (was lost before fix)
- **Azure health check**: New `/api/admin/azure-status` endpoint tests credentials + email access
- **Dashboard card**: Shows email service status (Active green / Down red)
- **Secret expiry**: Shows client secret expiry date + days remaining
- **Warning colors**: red at ≤14 days, yellow at ≤30 days
- **Alert**: When emails are down, dashboard warns "Contact forms saving to DB but emails not being sent"

### Decisions
- DB-first is non-negotiable — never lose a customer due to email infrastructure failure
- Azure health check runs on dashboard load (not a cron — lightweight enough)
