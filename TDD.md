# TDD — Test Cases & Coverage

## Status: No automated tests yet (planned)

## Pages — Manual Verification

| Page | Route | Builds | Loads | SEO Meta | Images | Status |
|------|-------|--------|-------|----------|--------|--------|
| Homepage | `/` | ✅ | ✅ | ✅ | N/A | Live |
| About | `/about` | ✅ | ✅ | ✅ | ✅ Supabase | Live |
| Team | `/team` | ✅ | ✅ | ✅ | ✅ 4 photos (1200px) | Live |
| Portfolio | `/portfolio` | ✅ | ✅ | ✅ | Placeholders | Live |
| Contact | `/contact` | ✅ | ✅ | ✅ | N/A | Live |
| Blog Hub | `/blog` | ✅ | ✅ | ✅ | N/A | Live |
| Blog Posts | `/blog/[slug]` | ✅ | ✅ | ✅ | N/A | 6 posts |
| Dance Floor Wraps | `/dance-floor-wraps` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Wall Wraps | `/wall-wraps` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Window Wraps | `/window-wraps` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Channel Letters | `/channel-letters-signage` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Vinyl Wraps | `/vinyl-wraps` | — | — | — | — | Removed |
| Business Signage | `/business-signage` | ✅ | ✅ | ✅ | ✅ Hero | Live |
| Custom Neon Signs | `/custom-neon-signs` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Wedding Floor | `/wedding-floor-wrap` | ✅ | ✅ | ✅ | Placeholders | Live |
| LED Channel | `/led-channel-letters` | ✅ | ✅ | ✅ | Placeholders | Live |
| Near Me | `/channel-letter-signs-near-me` | ✅ | ✅ | ✅ | N/A | Live |
| Storefront | `/storefront-window-graphics` | ✅ | ✅ | ✅ | Placeholders | Live |

## Location Pages — Manual Verification

| Page | Route | Builds | Loads | SEO Meta | Status |
|------|-------|--------|-------|----------|--------|
| Washington DC | `/locations/washington-dc` | ✅ | ✅ | ✅ | Live |
| Virginia | `/locations/virginia` | ✅ | ✅ | ✅ | Live |
| Maryland | `/locations/maryland` | ✅ | ✅ | ✅ | Live |
| Seattle | `/locations/seattle` | ✅ | ✅ | ✅ | Live |
| New York | `/locations/new-york` | ✅ | ✅ | ✅ | Live |
| Los Angeles | `/locations/los-angeles` | ✅ | ✅ | ✅ | Live |
| Chicago | `/locations/chicago` | ✅ | ✅ | ✅ | Live |
| Dallas | `/locations/dallas` | ✅ | ✅ | ✅ | Live |
| Houston | `/locations/houston` | ✅ | ✅ | ✅ | Live |

## Components — Verification

| Component | Works | Notes |
|-----------|-------|-------|
| Navbar | ✅ | Desktop + mobile, services dropdown (8 items), active links |
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
| Quote Builder | `/admin/inquiries/[id]/quote` | ✅ | Line items, PDF preview, send email |
| Quotes List | `/admin/quotes` | ✅ | All/Sent/Not Sent filter |
| Image Manager | `/admin/images` | ✅ | View grid, upload (single+bulk), delete, copy URL, search |
| Contracts List | `/admin/contracts` | ✅ | All/Pending/Sent/Signed/Completed/Cancelled filter tabs |
| New Contract | `/admin/contracts/new` | ✅ | Manual or auto-fill from inquiry (?inquiry_id=) |
| Contract Detail | `/admin/contracts/[id]` | ✅ | View, edit, send link, copy link, download PDF, status dropdown |
| Public Signing | `/sign/[id]` | ✅ | Customer draws signature on canvas, no auth |
| Statistics | `/admin/statistics` | ✅ | 13 charts (Recharts), date filter, KPI cards |
| Promos | `/admin/promos` | ✅ | Create/edit/delete/toggle/reorder promo slides |
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

## Database — Verification

| Table | RLS | Works | Notes |
|-------|-----|-------|-------|
| page_images | ✅ | ✅ | Public read, service role write |
| page_content | ✅ | ✅ | Public read, service role write |
| blog_posts | ✅ | ✅ | Public read published only, service role all |
| inquiries | ✅ | ✅ | Service role only |
| quotes | ✅ | ✅ | Service role only, FK to inquiries |

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
