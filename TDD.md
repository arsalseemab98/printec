# TDD — Test Cases & Coverage

## Status: No automated tests yet (planned)

## Pages — Manual Verification

| Page | Route | Builds | Loads | SEO Meta | Images | Status |
|------|-------|--------|-------|----------|--------|--------|
| Homepage | `/` | ✅ | ✅ | ✅ | N/A | Live |
| About | `/about` | ✅ | ✅ | ✅ | ✅ Supabase | Live |
| Team | `/team` | ✅ | ✅ | ✅ | ✅ 4 photos (1200px) | Live |
| Portfolio | `/portfolio` | ✅ | ✅ | ✅ | ✅ DB-driven | Live |
| Contact | `/contact` | ✅ | ✅ | ✅ | N/A | Live |
| Blog Hub | `/blog` | ✅ | ✅ | ✅ | N/A | Live |
| Blog Posts | `/blog/[slug]` | ✅ | ✅ | ✅ | N/A | 6 posts |
| Floor Wraps | `/dance-floor-wraps` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Wall Wraps | `/wall-wraps` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Window Wraps | `/window-wraps` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Channel Letters | `/channel-letters-signage` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Vinyl Wraps | `/vinyl-wraps` | — | — | — | — | Removed |
| Business Signage | `/business-signage` | ✅ | ✅ | ✅ | ✅ Hero | Live |
| Custom Neon Signs | `/custom-neon-signs` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Wedding Floor | `/wedding-floor-wrap` | ✅ | ✅ | ✅ | ✅ Hero + 6 design cards | Live |
| LED Channel | `/led-channel-letters` | ✅ | ✅ | ✅ | Placeholders | Live |
| Near Me | `/channel-letter-signs-near-me` | ✅ | ✅ | ✅ | N/A | Live |
| Storefront | `/storefront-window-graphics` | ✅ | ✅ | ✅ | Placeholders | Live |

## Location Pages — Manual Verification

| Page | Route | Builds | Loads | SEO Meta | Status |
|------|-------|--------|-------|----------|--------|
| Washington DC | `/locations/washington-dc` | ✅ | ✅ | ✅ | Live |
| Virginia | `/locations/virginia` | ✅ | ✅ | ✅ | Live |
| Maryland | `/locations/maryland` | ✅ | ✅ | ✅ | Live |
| Seattle | `/locations/seattle` | — | — | — | **Removed 2026-04-25** — 301 → /locations/virginia (doorway-page risk) |
| New York | `/locations/new-york` | — | — | — | **Removed 2026-04-25** — 301 → /locations/virginia |
| Los Angeles | `/locations/los-angeles` | — | — | — | **Removed 2026-04-25** — 301 → /locations/virginia |
| Chicago | `/locations/chicago` | — | — | — | **Removed 2026-04-25** — 301 → /locations/virginia |
| Dallas | `/locations/dallas` | — | — | — | **Removed 2026-04-25** — 301 → /locations/virginia |
| Houston | `/locations/houston` | — | — | — | **Removed 2026-04-25** — 301 → /locations/virginia |

### SEO test cases — added 2026-04-25
| Test | Status |
|------|--------|
| `curl -I https://printecwrap.com/locations/seattle` returns 308 redirect to `/locations/virginia` | ✅ Live verified |
| Homepage HTML contains JSON-LD `"aggregateRating":{"ratingValue":"5.0","reviewCount":"13"}` | ✅ Live verified |
| Homepage HTML contains 3 `Review` schema entries (Jaspreet Kaur, Sangria's, Mansoortastic) | ✅ Live verified |
| Homepage renders Testimonials section with 3 review cards + GBP CTAs | ✅ Live verified |
| `/contact` body shows "Woodbridge, VA 22191" (no "Virginia, USA") | ✅ Live verified |
| Footer + contact-form modal show same address | ✅ Live verified |
| `robots.txt` allows `AhrefsBot` (no longer in disallow list) | ✅ Live verified |
| `sitemap.xml` excludes seattle/new-york/los-angeles/chicago/dallas/houston | ✅ Live verified (33 URLs, was 39) |
| JSON-LD `streetAddress: "15485 Marsh Overlook Dr"` present | ✅ Live verified |
| `npx next build` passes after all changes | ✅ Verified 2026-04-25 |

### SEO test cases — added 2026-04-25 (security headers + BreadcrumbList + FAQPage)
| Test | Status |
|------|--------|
| `curl -I https://printecwrap.com` returns `x-frame-options: SAMEORIGIN` | ✅ Live verified |
| `curl -I https://printecwrap.com` returns `x-content-type-options: nosniff` | ✅ Live verified |
| `curl -I https://printecwrap.com` returns `referrer-policy: strict-origin-when-cross-origin` | ✅ Live verified |
| `curl -I https://printecwrap.com` returns `permissions-policy: camera=(), microphone=(), geolocation=()` | ✅ Live verified |
| `/about` HTML contains BreadcrumbList JSON-LD with Home → About | ✅ Live verified |
| All 21 inner pages emit BreadcrumbList JSON-LD via `<BreadcrumbJsonLd />` | ✅ Live verified (sample 3 pages) |
| `/business-signage` HTML contains FAQPage JSON-LD with 6 Q&A entries | ✅ Live verified |
| `/custom-neon-signs` HTML contains FAQPage JSON-LD | ✅ Live verified |
| `/wedding-floor-wrap` HTML contains FAQPage JSON-LD | ✅ Live verified |
| `/locations/washington-dc` HTML contains FAQPage JSON-LD | ✅ Live verified |

### SEO test cases — added 2026-04-25 (Vercel domain config)
| Test | Status |
|------|--------|
| `curl -sI https://www.printecwrap.com` returns `HTTP/2 308` (was 307) | ✅ Live verified |
| `curl -sI https://www.printecwrap.com/about` returns 308 + `location: https://printecwrap.com/about` | ✅ Live verified |
| `curl -sI https://printecwrap.com` apex still returns 200 | ✅ Live verified |

### SEO test cases — added 2026-04-26 (Service + BlogPosting schema)
| Test | Status |
|------|--------|
| `/business-signage` HTML contains `"@type":"Service","name":"Custom Business Signage"` | ✅ Live verified |
| `/channel-letters-signage` HTML contains `"@type":"Service","name":"Channel Letter Signs"` | ✅ Live verified |
| `/custom-neon-signs` HTML contains `"@type":"Service","name":"Custom LED Neon Signs"` | ✅ Live verified |
| `/dance-floor-wraps` HTML contains `"@type":"Service","name":"Custom Dance Floor Wraps"` | ✅ Live verified |
| `/food-truck-wraps` HTML contains `"@type":"Service","name":"Custom Food Truck Wraps"` | ✅ Live verified |
| `/wall-wraps` HTML contains `"@type":"Service","name":"Commercial Wall Wraps"` | ✅ Live verified |
| `/window-wraps` HTML contains `"@type":"Service","name":"Custom Window Wraps & Storefront Graphics"` | ✅ Live verified |
| `/blog/[slug]` HTML contains `"@type":"BlogPosting"` with headline + datePublished | ✅ Live verified |
| LocalBusiness JSON-LD has `"@id":"https://printecwrap.com/#business"` (every page) | ✅ Live verified |
| Service `provider` field references LocalBusiness via the same `@id` | ✅ Live verified |

## Components — Verification

| Component | Works | Notes |
|-----------|-------|-------|
| Navbar | ✅ | Desktop + mobile, services dropdown (7 items — "Floor Wraps" not "Dance Floor"), active links |
| PromoBar | ✅ | Orange slider below navbar, auto-rotate 4s, fade transitions, hover pause, close (X), session dismiss |
| Footer | ✅ | 4 columns, social links, responsive |
| FloatingActionButton | ✅ | Chat modal with form + 11 services dropdown + worker photo, submits to /api/contact |
| SkewedButton (neon) | ✅ | Pulse animation, hover states |
| ContainerTextFlip | ✅ | Word cycling animation in hero |
| GalleryGridBlock | ✅ | Filter, lightbox, hover effects |
| EtheralShadow | ✅ | SVG displacement, lazy-loaded |
| ContactForm | ✅ | 5 optgroups (Wraps, Floor, Signage, Print, Other), budget, validation, UTM capture, error logging |
| PageHero | ✅ | Refined minimal style |
| CtaBanner | ✅ | Refined minimal style |
| Section (reveal) | ✅ | IntersectionObserver CSS transitions |
| BeforeAfterSlider | ✅ | Style 3 — Elegant Pill Glow, drag interaction, pill labels, corner accents |
| SiteShell | ✅ | Hides navbar/footer on /admin routes |
| TiptapEditor | ✅ | WYSIWYG: bold, italic, headings, lists, links, images |

## Admin Portal — Verification

| Feature | Route | Works | Notes |
|---------|-------|-------|-------|
| Login | `/admin/login` | ✅ | Password auth, cookie session, 24h expiry |
| Dashboard | `/admin` | ✅ | Sales metrics, date filter with month arrows |
| Page Images | `/admin/pages` | ✅ | Upload/preview/delete per slot |
| Page Text | `/admin/pages/[slug]` | ✅ | Edit headings and body text |
| Blog List | `/admin/blog` | ✅ | Create/edit/delete, draft/published |
| Blog Editor | `/admin/blog/[slug]` | ✅ | Tiptap WYSIWYG, cover image |
| Inquiries | `/admin/inquiries` | ✅ | Status filter tabs, search, color badges |
| Inquiry Detail | `/admin/inquiries/[id]` | ✅ | Editable customer info, status change, notes |
| Quote Builder | `/admin/inquiries/[id]/quote` | ✅ | Line items, PDF preview, send email (hidden if no email) |
| Quotes List | `/admin/quotes` | ✅ | All/Sent/Not Sent filter, Create Quote button |
| Manual Quote | `/admin/quotes/new` | ✅ | Customer form → auto-creates inquiry → redirects to quote builder |
| Image Manager | `/admin/images` | ✅ | View grid, upload (single+bulk), delete, copy URL, search |
| Contracts List | `/admin/contracts` | ✅ | All/Pending/Sent/Signed/Completed/Cancelled filter tabs |
| New Contract | `/admin/contracts/new` | ✅ | Manual or auto-fill from inquiry (?inquiry_id=) |
| Contract Detail | `/admin/contracts/[id]` | ✅ | View, edit, send link, copy link, download PDF, status dropdown |
| Public Signing | `/sign/[id]` | ✅ | Customer draws signature on canvas, no auth |
| Statistics | `/admin/statistics` | ✅ | 13 charts (Recharts), date filter, KPI cards |
| Promos | `/admin/promos` | ✅ | Create/edit/delete/toggle/reorder promo slides |
| Calendar | `/admin/calendar` | ✅ | Monthly/weekly/daily views, contracts + inquiries color-coded |
| Emails Dashboard | `/admin/emails` | ✅ | Sent log, stats, quick links to compose/templates |
| Email Compose | `/admin/emails/compose` | ✅ | Tiptap WYSIWYG, recipient picker, placeholders, bulk send |
| Email Templates | `/admin/emails/templates` | ✅ | Save/load/edit/delete reusable templates |
| Azure Health | `/admin` (dashboard card) | ✅ | Email service status, secret expiry, warning colors |
| Proxy Auth | `proxy.ts` | ✅ | Protects /admin/* except /admin/login, /sign/* is public |

## Contract — Verification

| Feature | Works | Notes |
|---------|-------|-------|
| Create from scratch | ✅ | All fields, default terms pre-filled |
| Create from inquiry | ✅ | Auto-fills client name, email, service |
| Send signing link | ✅ | Email via Microsoft Graph |
| Copy signing link | ✅ | Clipboard copy |
| Download PDF | ✅ | Branded with dark logo (for white bg) |
| Customer signature canvas | ✅ | Draw with mouse/touch, clear button |
| Signed PDF to both parties | ✅ | Email attachment after signing |
| Contract PDF logo | ✅ | Uses printec-logo.png (dark, for white bg) |
| Contract PDF email | ✅ | info@printecwrap.com |
| Contract PDF phone | ✅ | +1 (571) 343-1598 |
| Manual status change | ✅ | Dropdown: Pending/Sent/Signed/Completed/Cancelled |
| Auto-status on send | ✅ | Sending contract → status = Sent |
| Auto-status on sign | ✅ | Customer signs → status = Signed |
| Completed → revenue | ✅ | Contract total_price added to Completed Revenue |
| Signed → booked | ✅ | Contract total_price added to Booked Pipeline |
| Cancelled hides actions | ✅ | Edit and Send buttons hidden when cancelled |

## Email — Verification

| Feature | Works | Notes |
|---------|-------|-------|
| Contact form notification | ✅ | Styled HTML to info@printecwrap.com |
| Customer confirmation | ✅ | Branded "Thank you" email |
| UTM tracking in emails | ✅ | utm_source, utm_medium, utm_campaign, utm_term, utm_content |
| Page source in emails | ✅ | Which page form was submitted from |
| Quote PDF email | ✅ | Branded PDF attachment via Microsoft Graph |
| Rate limiting | ✅ | 60s cooldown per email+source |
| DB-first save | ✅ | Contact form saves to DB before email send (prevents data loss) |
| Email marketing compose | ✅ | Tiptap WYSIWYG + recipient picker + placeholders |
| Email templates CRUD | ✅ | Save/load/edit/delete reusable templates |
| Bulk send (individual) | ✅ | Per-recipient via Graph API with {name} personalization |
| Email sent log | ✅ | All sends logged with success/failed status |
| Azure health check | ✅ | Tests credentials + email access, shows secret expiry |
| Azure expiry warning | ✅ | Red ≤14 days, yellow ≤30 days on dashboard |

## Calendar — Verification

| Feature | Works | Notes |
|---------|-------|-------|
| Monthly view | ✅ | 7-column grid, entries in day cells, today highlighted |
| Weekly view | ✅ | 7 columns with taller rows |
| Daily view | ✅ | Single column with full entry cards |
| Contracts on calendar | ✅ | Uses event_date, color by status |
| Inquiries on calendar | ✅ | Uses event_date or created_at fallback |
| Inquiry→contract dedup | ✅ | Linked inquiries hidden when contract exists |
| Color legend guide | ✅ | Toggle panel explaining all colors |
| Click to navigate | ✅ | Entries link to contract/inquiry detail |
| Inquiry event_date | ✅ | New field, editable on detail page |

## Database — Verification

| Table | RLS | Works | Notes |
|-------|-----|-------|-------|
| page_images | ✅ | ✅ | Public read, service role write |
| page_content | ✅ | ✅ | Public read, service role write |
| blog_posts | ✅ | ✅ | Public read published only, service role all |
| inquiries | ✅ | ✅ | Service role only, has event_date field |
| quotes | ✅ | ✅ | Service role only, FK to inquiries |
| email_templates | ✅ | ✅ | Service role only |
| email_logs | ✅ | ✅ | Service role only, FK to email_templates |

## Image Pipeline — Verification

| Feature | Status |
|---------|--------|
| Images served from Supabase CDN | ✅ |
| All images in WebP format | ✅ |
| next/image with fill + sizes | ✅ |
| Hero images have priority flag | ✅ |
| IMG constants centralized | ✅ |
| next.config.ts remotePatterns | ✅ |
| Supabase env vars on Vercel | ✅ |
| AVIF format enabled | ✅ |
| 1-year image cache TTL | ✅ |
| Admin image manager | ✅ |

## Admin Mobile Responsive — Verification

| Page | Mobile UI | Notes |
|------|-----------|-------|
| Layout/Sidebar | ✅ | Hamburger menu, bottom nav on mobile |
| Dashboard | ✅ | 4-col → 2-col KPIs, 3-col → 1-col cards, filter wraps |
| Statistics | ✅ | 6-col → 2-col KPIs, 2-col → 1-col charts, filter wraps |
| Inquiries | ✅ | Horizontal scroll table |
| Contracts | ✅ | Header wraps, filter tabs wrap, table scrolls |
| Contract Form | ✅ | 2-col → 1-col on mobile |
| Quotes | ✅ | Horizontal scroll table |
| Blog | ✅ | Header wraps, grid rows collapse |
| Images | ✅ | Auto-fill grid already responsive |
| Pages | ✅ | Auto-fill grid already responsive |
| Catalogs List | ✅ | Desktop table + mobile cards |
| Catalog Detail | ✅ | Header wraps, image+form stacks, upload works on touch |
| Catalog Leads | ✅ | Table scroll |

## Performance — Verification

| Feature | Status | Notes |
|---------|--------|-------|
| AVIF + WebP image formats | ✅ | next.config.ts formats config |
| minimumCacheTTL 1 year | ✅ | 31536000 seconds |
| Gzip compression enabled | ✅ | |
| X-Powered-By header removed | ✅ | |
| Static pages (SSG) | ✅ | |
| next/font zero layout shift | ✅ | |
| Logo animation (sessionStorage) | ✅ | |
| Gallery uses Next.js `<Image>` | ✅ | Switched from raw `<img>` — auto AVIF/resize |
| Gallery responsive sizes | ✅ | `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw` |
| Gallery eager/lazy split | ✅ | First 6 eager, rest lazy-loaded |
| Lightbox uses Next.js `<Image>` | ✅ | With priority loading |
| Preconnect to Supabase CDN | ✅ | `<link rel="preconnect">` + dns-prefetch in layout |
| Homepage load time | ✅ | 567ms (was 3000ms — 5.3x improvement) |
| Slowest image load | ✅ | 189ms (was 1183ms — 6.3x improvement) |

## Analytics — Verification

| Feature | Status | Notes |
|---------|--------|-------|
| Google Analytics 4 (G-6K8LW0P8B9) | ✅ | gtag.js loaded on all public pages |
| GA4 disabled on admin/sign | ✅ | Same exclusion as Clarity |
| GA4 generate_lead event | ✅ | Fires on contact form, FAB widget, catalog inquiry |
| GA4 catalog_email_capture event | ✅ | Fires on email gate unlock |
| GA4 phone_click event | ✅ | All tel: links (navbar, footer, hero, contact, FAB) |
| GA4 email_click event | ✅ | mailto: links (contact form, footer) |
| GA4 whatsapp_click event | ✅ | WhatsApp links (contact form, footer) |
| GA4 cta_click event | ✅ | "Get a Quote", "Start Your Project" buttons |
| GA4 event helper (gtag.ts) | ✅ | Type-safe, graceful fallback if gtag missing |
| Microsoft Clarity (vzki5lbs56) | ✅ | Disabled on /admin/* and /sign/* |
| UTM parameter tracking in forms | ✅ | |
| Page source tracking in forms | ✅ | |

## SEO Verification

| Feature | Status |
|---------|--------|
| Unique meta title per page | ✅ (32 pages) |
| Unique meta description per page | ✅ (all under 160 chars) |
| Keywords array per page | ✅ |
| OpenGraph tags | ✅ |
| Twitter cards | ✅ |
| Homepage page-level metadata | ✅ (server component wrapper) |
| Homepage canonical URL | ✅ |
| JSON-LD LocalBusiness schema | ✅ |
| sitemap.xml | ✅ Auto-generated (32 URLs + priority tiers) |
| robots.txt | ✅ (points to printecwrap.com/sitemap.xml) |
| Favicon (P monogram) | ✅ |
| Apple touch icon | ✅ |
| OG image (1200x630) | ✅ |
| Location pages (9 cities) | ✅ |
| Sitemap base URL = printecwrap.com | ✅ |
| Company name = Printec Virginia LLC | ✅ |
| Phone = +1 (715) 503-5444 | ✅ (all pages) |
| Email = info@printecwrap.com | ✅ (all pages) |
| Address = Virginia, USA | ✅ (all pages) |
| Portfolio categories match services | ✅ (single source of truth) |
| Contact page map placeholder | ✅ | Removed — no fake address |
| Homepage LATEST WORK grid | ✅ | Removed — was placeholder |
| Catalogs page | ✅ | Shows "Coming Soon" |
| Portfolio gallery DB-driven | ✅ | Admin manages via /admin/portfolio |
| Auto-refresh on deploy | ✅ | Polls /api/version every 30s |

## Forms — Verification

| Feature | Status | Notes |
|---------|--------|-------|
| Contact form categories match services | ✅ | 5 optgroups: Wraps, Floor Wraps, Signage, Print & Design, Other |
| FAB widget categories match services | ✅ | 11 options matching all SERVICES_NAV + Wedding Floor |
| No "Vehicle Wraps" in forms | ✅ | Removed — Printec doesn't do car wraps |
| Custom Neon Signs in forms | ✅ | Added to both contact form and FAB |
| Business Signage in forms | ✅ | Added to both contact form and FAB |
| Vinyl Wraps in forms | ✅ | Added to both contact form and FAB |
| Food Truck Wraps in forms | ✅ | In contact form (Wraps group) and FAB |
| utm_term saved to DB | ✅ | Was missing, now included in insert |
| utm_content saved to DB | ✅ | Was missing, now included in insert |
| API error logging | ✅ | Validation, rate limit, email, DB — all logged with [Contact API] prefix |
| Client error logging | ✅ | Both forms log errors with component prefix |
| Company name in emails | ✅ | "Printec Virginia LLC" (was "Printec Corp") |
| Company name in FAB | ✅ | "Printec Virginia LLC" (was "Printec Corp") |

## Anti-Spam / Bot Protection — Verification

| Feature | Status | Notes |
|---------|--------|-------|
| Honeypot field (contact form) | ✅ | Hidden `_hp_website` input, bots auto-fill → silently rejected |
| Honeypot field (FAB widget) | ✅ | Hidden `_hp_fab_website` input |
| Honeypot field (email gate) | ✅ | Hidden `_hp_gate_website` input |
| Honeypot field (catalog viewer) | ✅ | Hidden `_hp_cv_website` input |
| Timing check (all forms) | ✅ | Rejects submissions < 3 seconds, `_formLoadedAt` timestamp |
| Server-side email regex | ✅ | Validates format + domain has dot, rejects garbage |
| Honeypot returns fake success | ✅ | API returns `{ success: true }` to fool bots |
| Anti-spam utility (`antispam.ts`) | ✅ | Shared checks used by both API routes |
| `/api/contact` anti-spam | ✅ | Runs all checks before validation/rate-limit |
| `/api/catalog-leads` anti-spam | ✅ | Runs all checks before insert |
| Turnstile widget (contact form) | ⚠️ | Component integrated, dark theme — NOT ACTIVE (no keys) |
| Turnstile widget (FAB widget) | ⚠️ | Component integrated — NOT ACTIVE (no keys) |
| Turnstile widget (email gate) | ⚠️ | Component integrated — NOT ACTIVE (no keys) |
| Turnstile widget (catalog viewer) | ⚠️ | Component integrated — NOT ACTIVE (no keys) |
| Turnstile server verification | ⚠️ | `verifyTurnstile()` in antispam.ts — fails open if keys missing |
| Gibberish name detection | ✅ | No-space names >10 chars, low vowel ratio <15%, mixed case — silent reject |
| Gibberish message detection | ✅ | No-space messages >12 chars, short messages with low vowel ratio — silent reject |
| Real names pass gibberish check | ✅ | "Ali", "Muhammad", "Sarah Johnson", "Shazal Ali" all pass |
| Spam names blocked | ✅ | "pNCzSrofeWYqYHZcu", "wpEPmvpNzokYywaYZNkXY", "xKjRtMwPqNvLs" all blocked |
| Spam messages blocked | ✅ | "ySidLwybqINlmARubiRFCH", "lrJGanLQYQNOkcPiJF", "kPmNtRwXyZqLvBcD" all blocked |
| Turnstile env vars on Vercel | ⬜ | Pending: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` |
| Cloudflare Turnstile account setup | ⬜ | Pending: create site at dash.cloudflare.com, add printecwrap.com + localhost |

## Customer Actions — Verification

| Feature | Status | Notes |
|---------|--------|-------|
| "+ Inquiry" button on catalog leads | ✅ | Creates inquiry with name/email pre-filled, redirects to detail page |
| "+ Contract" button on inquiries | ✅ | Links to `/admin/contracts/new?inquiry_id=` with auto-fill |
| "+ Contract" button on catalog leads | ✅ | Links to `/admin/contracts/new?client_name=&client_email=` |
| POST /api/admin/inquiries | ✅ | Creates inquiry from admin with name, email, phone, service, source |
| Contract new page accepts query params | ✅ | `client_name` + `client_email` for catalog leads without inquiry_id |
| Actions column in desktop table | ✅ | Shows per-row action buttons |
| Actions in mobile cards | ✅ | Same buttons in card layout |

## Catalogs — Public Pages Verification

| Page | Route | Builds | Loads | SEO Meta | Status |
|------|-------|--------|-------|----------|--------|
| Catalogs Landing | `/catalogs` | ✅ | ✅ | ✅ | Live |
| Channel Letters Catalog | `/catalogs/channel-letters-signage` | ✅ | ✅ | ✅ | Live (3 projects) |
| Vehicle Wraps Catalog | `/catalogs/vehicle-wraps` | ✅ | ✅ | ✅ | Live (3 projects) |
| Window Graphics Catalog | `/catalogs/window-storefront-graphics` | ✅ | ✅ | ✅ | Live (3 projects) |
| Wall Wraps Catalog | `/catalogs/wall-wraps-murals` | ✅ | ✅ | ✅ | Live (3 projects) |
| Floor Wraps Catalog | `/catalogs/dance-floor-wedding-wraps` | ✅ | ✅ | ✅ | Live (3 projects) |
| Neon Signs Catalog | `/catalogs/neon-signs` | ✅ | ✅ | ✅ | Live (3 projects) |

## Catalogs — Admin Verification

| Feature | Route | Works | Notes |
|---------|-------|-------|-------|
| Catalog List | `/admin/catalogs` | ✅ | Create, delete, view project count |
| Catalog Detail | `/admin/catalogs/[id]` | ✅ | Edit title/slug/desc, manage projects |
| Add Project | `/admin/catalogs/[id]` | ✅ | Creates "Untitled Project" with auto sort_order |
| Upload Image | `/admin/catalogs/[id]` | ✅ | Uploads to Supabase Storage, auto-saves URL |
| Edit Specs | `/admin/catalogs/[id]` | ✅ | Add/remove label-value pairs |
| Reorder Projects | `/admin/catalogs/[id]` | ✅ | Up/down arrows, PATCH reorder |
| Delete Project | `/admin/catalogs/[id]` | ✅ | window.confirm, cascades |
| Catalog Leads | `/admin/catalogs/leads` | ✅ | Filter by catalog, search, copy emails |
| Customers | `/admin/customers` | ✅ | Unified inquiries + leads, filter/search/export |

## Catalogs — Component Verification

| Component | Works | Notes |
|-----------|-------|-------|
| EmailGate | ✅ | Real Printec logo, sessionStorage, close (X) button, lead capture |
| CatalogViewer | ✅ | Fullscreen slideshow, keyboard/swipe/dots nav, staggered animations |
| CatalogPage | ✅ | Gate → viewer wrapper, manages unlock state |
| Send This Design modal | ✅ | Quick form, auto-fills category from catalog, posts to /api/contact |
| Responsive (mobile) | ✅ | Right panel becomes bottom overlay, title shrinks |
| 0 projects edge case | ✅ | Shows "No projects" message |
| 1 project edge case | ✅ | Hides navigation controls |

## Catalogs — Database Verification

| Table | Works | Notes |
|-------|-------|-------|
| catalogs | ✅ | 6 catalogs seeded, slug unique index |
| catalog_projects | ✅ | 18 projects seeded, FK cascade delete, sort_order index |
| catalog_leads | ✅ | Captures name, email, catalog_slug |

## Catalogs — API Verification

| Endpoint | Method | Works | Notes |
|----------|--------|-------|-------|
| /api/admin/catalogs | GET | ✅ | Returns catalogs with project_count |
| /api/admin/catalogs | POST | ✅ | Creates with title/slug validation |
| /api/admin/catalogs/[id] | GET | ✅ | Returns catalog + sorted projects |
| /api/admin/catalogs/[id] | PUT | ✅ | Updates title/slug/description |
| /api/admin/catalogs/[id] | DELETE | ✅ | Cascade deletes projects |
| /api/admin/catalogs/[id]/projects | GET | ✅ | Sorted by sort_order |
| /api/admin/catalogs/[id]/projects | POST | ✅ | Auto sort_order (max+1) |
| /api/admin/catalogs/[id]/projects | PATCH | ✅ | Reorder via {order: [...]} |
| /api/admin/catalogs/[id]/projects/[pid] | PUT | ✅ | Updates all fields |
| /api/admin/catalogs/[id]/projects/[pid] | DELETE | ✅ | Deletes project |
| /api/catalog-leads | POST | ✅ | Public lead capture |
| /api/catalogs/[slug] | GET | ✅ | Public, 404 if not found |
| /api/admin/catalog-leads | GET | ✅ | Lists all leads |
| /api/admin/customers | GET | ✅ | Merged inquiries + leads |

## Marketing — Verification

| Feature | Status | Notes |
|---------|--------|-------|
| Google Ads plan documented | ✅ | docs/plans/2026-03-28-google-ads-plan-design.md |
| MARKETING.md created | ✅ | Campaign structure, keywords, ad copy, UTM params |
| Wall Wraps ad group keywords (8) | ✅ | Phrase + exact match, high-intent only |
| Floor Wraps ad group keywords (8) | ✅ | Phrase + exact match, high-intent only |
| Negative keywords list | ✅ | 15 terms blocking DIY/job/tutorial traffic |
| UTM parameters defined | ✅ | utm_source=google, utm_medium=cpc, per-campaign |
| Landing pages identified | ✅ | /wall-wraps, /dance-floor-wraps, /wedding-floor-wrap |
| GA4 conversion tracking ready | ✅ | generate_lead as primary, phone_click as secondary |
| Google Ads account created | ✅ | Account ID: 342-087-0676 |
| GA4 → Google Ads linking | ✅ | Property 530146539 linked during account creation |
| Budget set to $300/month | ✅ | $10/day, Maximize Clicks bidding |
| PMax campaign removed | ✅ | Permanently removed from account |
| Search campaign draft created | ✅ | Bidding: Maximize Clicks, Networks: Search only |
| Campaign locations set | ✅ | Virginia, Maryland, District of Columbia |
| Campaign keywords added | ✅ | 72 keywords across 7 services (wall wraps, floor wraps, window wraps, channel letters, neon signs, food truck wraps, business signage) |
| Campaign ads created | ✅ | 5 headlines + 2 descriptions |
| Campaign budget set | ✅ | $10/day ($300/month), est. 155 clicks/week at $0.45 CPC |
| GA4 gtag on live site | ✅ | G-6K8LW0P8B9 loading, dataLayer active |
| generate_lead event | ✅ | Fires from contact form, catalog viewer, floating widget |
| Campaign published | ⬜ | Pending: click Publish in Review step |
| Advertiser verification | ⬜ | Pending: Google requires before ads run |
| Import GA4 conversions | ⬜ | Pending: import generate_lead + phone_click in Google Ads |

## 2026-04-14 — Calendar Bookings + Orders + Nav + RLS

### Manual QA checklist (run on each deploy)

| Test | Status | Notes |
|---|---|---|
| Edit a contract event_date → saved value equals displayed value | ✅ | Was off-by-one in EST/EDT due to UTC midnight parsing |
| Contract detail view hides empty fields | ✅ | Only filled fields render |
| Signed contract PDF shows Azhar signature in Provider column | ✅ | Fetched from /azhar-signature.png |
| Signed contract PDF has no blank trailing page | ✅ | Footer + accent bar use react-pdf `fixed` |
| Calendar "+ Add Booking" opens modal pre-filled with today | ✅ | |
| Calendar click-empty-day opens modal pre-filled with that date | ✅ | Cells with entries keep existing click behavior |
| Create booking with only name + date (no price, no email) | ✅ | Optional fields; price defaults to 0 |
| Booking with empty terms doesn't error | ✅ | API defaults contracts.terms to [] |
| New booking appears on calendar immediately | ✅ | loadEntries re-runs after POST |
| /admin/orders shows Sent (Quoted), Signed, Completed only | ✅ | Pending/Cancelled excluded |
| Order filter tabs (All/Quoted/Signed/Completed) work | ✅ | |
| Order search filters by contract number, client, category | ✅ | |
| "+ Add Order" defaults status to Signed | ✅ | Appears in Signed tab immediately |
| Dashboard Quoted card = $ of sent quotes + Sent-status contracts | ✅ | Respects date filter |
| Dashboard Invoices Sent = count of quotes.sent_at IS NOT NULL | ✅ | |
| Statistics KPI grid shows Quoted + Invoices cards | ✅ | Also in top summary bar |
| Sidebar nav drag reorders and persists to localStorage | ✅ | Key: admin-nav-order-v1 |
| New nav items appended when code adds them (no wipe) | ✅ | Merge logic in useEffect |
| "Reset nav order" restores the default order | ✅ | Clears localStorage key |
| /api/contact INSERT works under anon + new RLS policy | ⬜ | Verify on next real submission |
| /api/catalog-leads INSERT works under anon + new RLS policy | ⬜ | Verify on next real submission |
| /catalogs/[slug] page still loads via anon SELECT policy | ⬜ | Verify on live deploy |
| Admin flows unchanged (service role bypasses RLS) | ✅ | Contracts/inquiries/quotes verified |

### Regression guards
- Never send null to contracts.terms — jsonb NOT NULL.
- Never add service-role DB access to a public (unauthenticated) code path. Use anon + narrow RLS.
- When adding nav items to NAV_ITEMS, they'll appear at the end for existing browsers (merge logic handles it).
- HTML input[type=date] strings are YYYY-MM-DD — never feed raw DB date strings through new Date(...) for display without local-time parsing.

## Planned Tests
- [ ] E2E: Navigation between all 32 pages
- [ ] E2E: Contact form submission (API + Supabase)
- [ ] E2E: Floating action button modal flow
- [ ] E2E: Blog post navigation
- [ ] E2E: Before/after slider interaction
- [ ] Visual: Responsive layouts (mobile/tablet/desktop)
- [ ] Performance: Lighthouse scores
- [ ] Accessibility: WCAG compliance
- [ ] SEO: Structured data validation
- [ ] Images: All Supabase CDN URLs return 200

## Contract Payment Status (2026-04-19)

- [PASSING] Create contract via BookingModal with client_name+email → row appears in /admin/customers as Booked, source=contract; matching inquiry exists in DB.
- [PASSING] Insert orphan contract directly via SQL → still appears in /admin/customers as type:contract via the safety-net merge in /api/admin/customers.
- [PASSING] Change contract.payment_status Not Paid → Half Paid → Full Paid via UI dropdown; persists via PUT /api/admin/contracts/[id].
- [PASSING] Send Payment Update at payment_status=Not Paid → button disabled with tooltip "Set payment status to Half Paid or Full Paid first".
- [PASSING] Send at Half Paid → email arrives with paid-so-far + remaining-balance + balance-due lines; payment_email_sent_at updated.
- [PASSING] Send at Full Paid → "Paid In Full" email arrives with PAID IN FULL status row; payment_email_sent_at updated.
- [PASSING] Contract with no client_email → send button disabled with tooltip "No client email on file".
- [PASSING] /admin/contracts list shows payment-status pill on every row; gray/orange/green for Not Paid/Half Paid/Full Paid.

## Save-path hardening (2026-04-21)

- [PASSING] POST /api/admin/contracts with no inquiry_id AND no client_name → 400 with error "Client name is required when no inquiry is linked." (was: silent orphan contract).
- [PASSING] BookingModal POST with valid client_name → succeeds; auto-creates inquiry; client_name persisted on inquiry without trailing whitespace.
- [PASSING] PUT /api/admin/inquiries/[id] with industry="  " → DB stores null; subsequent .eq("industry","") on the recipients endpoint returns no false matches.
- [PASSING] /api/admin/emails/recipients with simulated DB error → 500 with error message (was: empty list silently returned).
- [PASSING] /admin/emails/compose load failure → renders red "Failed to load recipients: …" (was: empty list).

## Quote save-path hardening (2026-04-22)

- [PASSING] POST /api/admin/quotes/[id]/send when Microsoft Graph send succeeds but `sent_at` UPDATE fails → response is 200 with `{success, sent_at, warning}`; UI alerts the warning. No silent re-send risk.
- [PASSING] POST /api/admin/quotes/[id]/send when Graph throws → 500 includes the real Graph error message (auth/throttle/recipient) — not just "Failed to send."
- [PASSING] /admin/quotes Resend → confirm() prompt fires; on POST failure an alert shows the cause (was: silent).
- [PASSING] /admin/quotes initial load failure → alert with HTTP status / error body (was: silent).
- [PASSING] POST /api/admin/quotes concurrent requests → second insert hits 23505, retry loop produces the next PQ-NNNN. Unique index quotes_quote_number_key applied 2026-04-22.
- [PASSING] /admin/quotes/new submit → inquiry created with status="New". Quote builder save → inquiry promoted to status="Quoted". Abandoning builder leaves a normal "New" inquiry, not a fake "Quoted" orphan.
- [PASSING] Quote builder on 375px viewport → header buttons wrap; line-items grid stays inside the card; description input remains usable.
- [PASSING] Auto-refresh on mobile: background tab for >30s, return → immediate version check fires on visibilitychange (was: tab sat on stale build until next interval, often throttled by mobile OS).

## Orphan quote protection (2026-04-22)

- [PASSING] Delete an inquiry that has a linked quote → quote survives, appears on /admin/quotes with inquiry_id=null and inquiries=null (was: quote silently cascade-deleted).
- [PASSING] /admin/quotes row with null inquiry_id → renders "Customer deleted" in italic 0.7 opacity; quote_number shown as plain text (not linked); View and Resend buttons hidden.
- [PASSING] /admin/quotes mobile card with null inquiry_id → card rendered without Link wrapper so it can't navigate to a broken /admin/inquiries/null/quote URL.
- [PASSING] Supabase query confirms post-migration: `SELECT is_nullable, delete_rule FROM quotes.inquiry_id FK = (YES, SET NULL)`.
