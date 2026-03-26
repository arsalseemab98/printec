# DEVLOG — Printec Virginia LLC Website

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
