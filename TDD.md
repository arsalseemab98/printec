# TDD — Test Cases & Coverage

## Status: No automated tests yet (planned)

## Pages — Manual Verification

| Page | Route | Builds | Loads | SEO Meta | Images | Status |
|------|-------|--------|-------|----------|--------|--------|
| Homepage | `/` | ✅ | ✅ | ✅ | N/A | Live |
| About | `/about` | ✅ | ✅ | ✅ | ✅ Supabase | Live |
| Team | `/team` | ✅ | ✅ | ✅ | ✅ 3 photos | Live |
| Portfolio | `/portfolio` | ✅ | ✅ | ✅ | Placeholders | Live |
| Contact | `/contact` | ✅ | ✅ | ✅ | N/A | Live |
| Blog Hub | `/blog` | ✅ | ✅ | ✅ | N/A | Live |
| Blog Posts | `/blog/[slug]` | ✅ | ✅ | ✅ | N/A | 6 posts |
| Dance Floor Wraps | `/dance-floor-wraps` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Wall Wraps | `/wall-wraps` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Window Wraps | `/window-wraps` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Channel Letters | `/channel-letters-signage` | ✅ | ✅ | ✅ | ✅ Hero + B/A | Live |
| Vinyl Wraps | `/vinyl-wraps` | ✅ | ✅ | ✅ | Placeholder | Live |
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

## Performance — Verification

| Feature | Status |
|---------|--------|
| AVIF + WebP image formats | ✅ |
| minimumCacheTTL 1 year | ✅ |
| Gzip compression enabled | ✅ |
| X-Powered-By header removed | ✅ |
| Static pages (SSG) | ✅ |
| next/font zero layout shift | ✅ |
| Logo animation (sessionStorage) | ✅ |

## Analytics — Verification

| Feature | Status |
|---------|--------|
| Microsoft Clarity (vzki5lbs56) | ✅ |
| UTM parameter tracking in forms | ✅ |
| Page source tracking in forms | ✅ |

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
| Phone = +1 (647) 299-1460 | ✅ (all pages) |
| Portfolio categories match services | ✅ (single source of truth) |

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
