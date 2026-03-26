# Printec Virginia LLC Website

## Project Overview
Full-service website for Printec Virginia LLC — a custom signage, vehicle wrap, and graphics company established in 2017 in Virginia. The site targets both B2B (businesses, storefronts) and B2C (weddings, events, venues) customers.

## Hosting & Services
- **Domain**: https://printecwrap.com (www.printecwrap.com → redirects to non-www)
- **Hosting**: Vercel — project `printec` under `arsalseemab98s-projects`
- **Vercel URL**: https://printec.vercel.app
- **GitHub**: https://github.com/arsalseemab98/printec
- **Database**: Supabase — project `printecwrap` (ID: `eofjaizkkxqxbynnvemi`, region: us-east-1)
- **Supabase Dashboard**: https://supabase.com/dashboard/project/eofjaizkkxqxbynnvemi
- **Image Storage**: Supabase Storage — bucket `images` (public CDN)
- **Image CDN URL**: `https://eofjaizkkxqxbynnvemi.supabase.co/storage/v1/object/public/images/`

## Tech Stack
- **Framework**: Next.js 16.1.7 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + inline styles (dark theme)
- **UI Components**: shadcn/ui base + custom components
- **Animations**: Framer Motion (hero, scroll-driven) + CSS transitions (reveals)
- **Charts**: Recharts (admin statistics dashboard)
- **Icons**: Lucide React
- **Font**: Inter (body via Geist), Arial Black (headings)
- **Database**: Supabase (PostgreSQL)
- **Image Hosting**: Supabase Storage (WebP, served via CDN)

## Design System — Refined Minimal
- **Background**: #0C0C0C (dark), #111 (cards), #222 (borders)
- **Accent**: #F7941D (orange — Printec brand)
- **H1**: 36px, Arial Black, weight 900
- **H2**: 28px, Arial, weight 700
- **Body**: 15px, line-height 1.8, rgba(255,255,255,0.5)
- **Labels**: 10px uppercase, letter-spacing 4px, orange, weight 500
- **Separators**: 1px solid #161616
- **Cards**: bg #111, 1px solid #222, 4px border-radius
- **Buttons**: Neon glow pulse (orange fill, white text, pulsing box-shadow)
- **Before/After Slider**: Style 3 — Elegant Pill with Glow (pill labels, gradient slider line, pulsing handle, corner accents)
- **NO skewed labels, NO spectrum gradients on inner pages**

## Architecture
```
src/
├── app/                              # Pages (App Router)
│   ├── page.tsx                      # Homepage (unique animated hero)
│   ├── layout.tsx                    # Root layout (SiteShell wraps Navbar/Footer/FAB)
│   ├── proxy.ts                      # Auth middleware (protects /admin/*)
│   ├── about/                        # About Us (workshop hero image)
│   ├── team/                         # Team page (5 members)
│   ├── portfolio/                    # Portfolio/Gallery
│   ├── contact/                      # Contact / Get a Quote
│   ├── blog/                         # Blog hub + [slug] (reads from Supabase with fallback)
│   ├── dance-floor-wraps/            # Service page (hero + before/after)
│   ├── wall-wraps/                   # Service page (hero + before/after)
│   ├── window-wraps/                 # Service page (hero + before/after)
│   ├── channel-letters-signage/      # Service page (hero + before/after)
│   ├── vinyl-wraps/                  # Service page
│   ├── business-signage/             # Service page (hero image)
│   ├── custom-neon-signs/            # Service page (hero + before/after)
│   ├── wedding-floor-wrap/           # SEO landing page
│   ├── led-channel-letters/          # SEO landing page
│   ├── channel-letter-signs-near-me/ # SEO landing page
│   ├── storefront-window-graphics/   # SEO landing page
│   ├── locations/                    # Location SEO pages (9 cities)
│   ├── catalogs/                     # Interactive web catalogs
│   │   ├── page.tsx                  # Public catalogs landing (grid of 6 catalogs)
│   │   └── [slug]/page.tsx           # Fullscreen slideshow viewer + email gate
│   ├── admin/                        # Admin portal
│   │   ├── layout.tsx                # Admin sidebar layout
│   │   ├── login/page.tsx            # Password login
│   │   ├── page.tsx                  # Dashboard (sales metrics, date filter)
│   │   ├── pages/                    # Page image + text management
│   │   ├── blog/                     # Blog CRUD with Tiptap WYSIWYG
│   │   ├── inquiries/                # CRM: inquiry list, detail, quote builder
│   │   │   ├── page.tsx              # Inquiry list (status filter, search)
│   │   │   └── [id]/                 # Inquiry detail + quote builder
│   │   ├── catalogs/                 # Catalog management
│   │   │   ├── page.tsx              # Catalog list (create/delete)
│   │   │   ├── [id]/page.tsx         # Catalog detail (edit + manage projects)
│   │   │   └── leads/page.tsx        # Catalog leads list (filter/search/export)
│   │   ├── customers/page.tsx        # Unified customer list (inquiries + catalog leads)
│   │   ├── promos/page.tsx           # Promo slider management (create/edit/toggle/reorder)
│   │   ├── statistics/page.tsx         # Full analytics dashboard (Recharts)
│   │   ├── images/page.tsx            # Image manager (view, upload, delete)
│   │   ├── contracts/                # Digital contract management
│   │   │   ├── page.tsx              # Contract list (Pending/Sent/Signed filter)
│   │   │   ├── new/page.tsx          # Create contract (manual or from inquiry)
│   │   │   └── [id]/page.tsx         # Contract detail, edit, send, download PDF
│   │   └── quotes/page.tsx           # All quotes sent listing
│   ├── sign/[id]/page.tsx            # Public contract signing page (no auth)
│   ├── api/
│   │   ├── contact/route.ts          # Contact form → email + save to DB
│   │   ├── contracts/[id]/sign/      # Public: customer signs contract
│   │   ├── catalog-leads/route.ts    # Public: capture catalog email leads
│   │   ├── catalogs/[slug]/route.ts  # Public: fetch catalog by slug
│   │   └── admin/                    # Admin API routes
│   │       ├── login/route.ts        # Password auth
│   │       ├── logout/route.ts       # Clear session
│   │       ├── upload/route.ts       # Image upload to Supabase Storage
│   │       ├── pages/[slug]/         # Page images + content CRUD
│   │       ├── blog/                 # Blog posts CRUD
│   │       ├── inquiries/            # Inquiries CRUD
│   │       ├── images/route.ts       # Image list, upload, delete (Supabase Storage)
│   │       ├── catalogs/             # Catalogs + projects CRUD + reorder
│   │       ├── catalog-leads/        # Admin: list catalog leads
│   │       ├── customers/            # Unified customers API (inquiries + leads)
│   │       ├── promo-slides/         # Promo slides CRUD + toggle active
│   │       ├── contracts/            # Contracts CRUD + send signing link
│   │       └── quotes/              # Quotes CRUD + send PDF
│   ├── api/promo-slides/route.ts     # Public: fetch active promo slides
│   ├── sitemap.ts                    # Auto-generated sitemap
│   ├── robots.ts                     # Robots.txt
│   └── globals.css                   # Global styles + CSS animations
├── components/
│   ├── layout/
│   │   ├── navbar.tsx                # Site-wide nav with services dropdown
│   │   ├── promo-bar.tsx             # Orange promo slider bar (below navbar, auto-rotating offers)
│   │   ├── footer.tsx                # 5-column footer (Company, Services, Locations, Connect, Hours)
│   │   └── site-shell.tsx            # Wraps Navbar + PromoBar + Footer (hides on /admin)
│   ├── shared/
│   │   ├── section.tsx               # IntersectionObserver reveal wrapper
│   │   ├── page-hero.tsx             # Reusable inner-page hero
│   │   ├── cta-banner.tsx            # Reusable CTA section
│   │   ├── skewed-button.tsx         # Neon glow pulse CTA button
│   │   ├── tape-strip.tsx            # Spectrum gradient strip (homepage only)
│   │   ├── contact-form.tsx          # Contact form → /api/contact (email + UTM)
│   │   └── floating-action-button.tsx # Chat modal → /api/contact (with service dropdown)
│   ├── catalogs/
│   │   ├── email-gate.tsx            # Email gate overlay (name+email to unlock)
│   │   ├── catalog-viewer.tsx        # Fullscreen cinematic slideshow viewer
│   │   └── catalog-page.tsx          # Gate + viewer wrapper (manages unlock state)
│   ├── admin/
│   │   └── tiptap-editor.tsx         # WYSIWYG editor for blog posts
│   └── ui/
│       ├── container-text-flip.tsx    # Animated word flip component
│       ├── gallery-grid-block-shadcnui.tsx # Filterable gallery with lightbox
│       ├── before-after-slider.tsx    # Elegant pill glow before/after slider
│       └── etheral-shadow.tsx         # SVG displacement animation (hero bg)
├── lib/
│   ├── constants.ts                  # Brand colors, services data, nav links, IMG URLs
│   ├── blog-data.ts                  # Blog articles (fallback if Supabase empty)
│   ├── supabase.ts                   # Supabase client (lazy init for build safety)
│   ├── content.ts                    # Helpers: getPageImage, getBlogPosts, etc.
│   ├── gtag.ts                       # Google Analytics 4 event tracking helper
│   ├── quote-pdf.tsx                 # React PDF template for branded quotes
│   └── contract-pdf.tsx              # React PDF template for client agreements
└── public/
    ├── printec-logo.png              # Original logo (2000x1252, high-res)
    ├── printec-logo-light.png        # White text version for dark bg
    ├── og-image.png                  # OpenGraph image (1200x630)
    ├── apple-touch-icon.png          # iOS icon (180x180)
    ├── images/                       # Local WebP backups (served from Supabase)
    │   ├── workshop.webp             # Workshop panoramic (188KB)
    │   ├── worker.webp               # Worker photo for chat modal (36KB)
    │   ├── team-shazal-v3.webp        # Shazal Ali team photo (1200px, workshop bg)
    │   ├── team-azhar-v2.webp        # Muhammad Azhar team photo (1200px, workshop bg)
    │   ├── team-nomi.webp            # Nomi team photo (1200px, workshop bg)
    │   ├── team-aryan-v2.webp        # Aryan W. team photo (1200px, workshop bg)
    │   ├── dance-floor-hero.webp     # Wedding monogram hero
    │   ├── floor-before/after.webp   # Dance floor before/after
    │   ├── wall-wrap-hero.webp       # Restaurant wall wrap hero
    │   ├── wall-before/after.webp    # Wall wrap before/after
    │   ├── window-wrap-hero.webp     # Storefront window hero
    │   ├── window-before/after.webp  # Window wrap before/after
    │   ├── signage-hero.webp         # Shopping plaza signage hero
    │   ├── signage-before/after.webp # Signage before/after
    │   ├── neon-before/after.webp    # Neon sign staircase before/after
    │   └── biz-signage-hero.webp     # Business park signage hero
    └── favicon.ico                   # Colorful P monogram

## How to Run
```bash
npm install
npx next dev -p 3424      # Dev server
npx next build             # Production build
```

## Image Pipeline
1. Convert to WebP: `cwebp -q 80 -resize 2400 0 input.png -o output.webp`
2. Upload to Supabase: `curl -X POST .../storage/v1/object/images/filename.webp`
3. Add to `IMG` constant in `src/lib/constants.ts`
4. Reference as `IMG.imageName` in pages (served from Supabase CDN)
5. Use `next/image` with `fill`, `sizes`, and `priority` (for hero images)

## Team
- **Muhammad Azhar** — CEO (photo)
- **Shazal Ali** — Sales Representative (photo)
- **Anton Andersson** — Sales Representative (no photo)
- **Nomi** — Lead Designer (photo)
- **Aryan W.** — Junior Intern (photo)

## Brand Constants
- Orange: #F7941D
- Red: #E53935
- Yellow: #FFD600
- Magenta: #9B2D8E
- Teal: #00897B
- Emerald: #00695C
- Lime: #8BC34A
- Black: #0C0C0C
- Dark1: #161616
- Dark2: #222222

## Social Links
- Instagram: https://www.instagram.com/printecvirginia/
- Facebook: https://www.facebook.com/share/1E2N8msTsc/
- TikTok: https://www.tiktok.com/@printec.va

## Admin Portal
- **URL**: /admin (protected by password auth via proxy.ts)
- **Password**: Set via `ADMIN_PASSWORD` env var
- **Features**:
  - Dashboard with sales metrics (booked pipeline, completed revenue, avg order) — includes both inquiries and contracts
  - Statistics page with 13 charts/visualizations (Recharts): inquiries over time, by service, conversion funnel, by source, revenue over time, revenue by service, avg deal size, pipeline, top pages, day/hour heatmaps, budget distribution, UTM breakdown
  - Date filter: All Time / This Month / Last Month / Custom month with ← → arrows
  - Page image management (upload to Supabase Storage)
  - Page text management (headings, body text)
  - Blog CRUD with Tiptap WYSIWYG editor
  - CRM: Inquiry list with status pipeline (New → Contacted → Follow Up → Quoted → Booked → Completed)
  - Editable customer details (name, email, phone, service, budget, description)
  - PDF quote generator (branded dark theme with logo, line items, totals)
  - Quote sending via Microsoft Graph email (PDF attachment)
  - All quotes listing page (/admin/quotes)
  - Image manager: view all Supabase Storage images, single + bulk upload, delete, copy URL, search/filter
  - Digital contracts: create, edit, send signing link, download PDF, status management (Pending/Sent/Signed/Completed/Cancelled)
  - Contract status dropdown on detail page (manual override)
  - Contract signing/completion feeds into dashboard sales metrics
  - Public signing page at /sign/[id] (customer draws signature on canvas)
  - Signed PDF emailed to both parties after signing
  - Create contracts from inquiries (auto-fills client details)
  - **Catalogs**: Create/edit/delete portfolio catalogs, manage projects (images, specs, reorder), view leads
  - **Customers**: Unified view of all inquiries + catalog leads with filter/search/export
  - Interactive web catalogs: 6 categories (channel letters, vehicle wraps, window graphics, wall wraps, floor wraps, neon signs)
  - Email-gated catalog viewer (fullscreen cinematic slideshow)
  - "Send This Design" inquiry form within catalog viewer (auto-fills service category)
  - Catalog leads saved to catalog_leads table with slug tracking
  - **Promos**: Promotional slider bar below navbar with auto-rotating offers, admin CRUD at /admin/promos (create/edit/toggle active/reorder/delete)
  - **Fully mobile responsive** — all admin pages work on phone/tablet (responsive grids, collapsing layouts)
  - **Inquiries & Quotes**: card layout on mobile (no horizontal scroll), full table on desktop (admin-desktop-only / admin-mobile-only CSS toggle)
  - **Auto-refresh**: browser auto-reloads when new deploy goes live (polls /api/version every 30s)

## Email Integration
- **Provider**: Microsoft Graph API (Azure AD app)
- **From**: info@printecwrap.com (all contact emails use this domain)
- **Contact form**: Sends notification to Printec + confirmation to customer
- **Quote emails**: Branded PDF attachment with quote details
- **Contract emails**: Signing link sent to customer, signed PDF to both parties
- **UTM tracking**: Captured from URL params, included in notification emails
- **Rate limiting**: 60s cooldown per email+source

## Database Tables (Supabase)
- `page_images` — page_slug, slot, url, alt_text
- `page_content` — page_slug, field, value
- `blog_posts` — slug, title, excerpt, category, content (HTML), published
- `inquiries` — name, email, phone, service, status, booked_price, completed_price, utm_*
- `quotes` — inquiry_id, quote_number (PQ-001), items (jsonb), total, sent_at
- `contracts` — inquiry_id (nullable), contract_number (PC-001), event_date, venue, service_description, total_price, advance_amount, balance_amount, balance_due, travel_cost, client_name, client_email, terms (jsonb), signature_data, signed_at, sent_at, status (Pending/Sent/Signed/Completed/Cancelled), completed_at
- `catalogs` — id (uuid), title, slug (unique), description, created_at
- `catalog_projects` — id (uuid), catalog_id (FK→catalogs, cascade delete), title, description, image_url, specs (jsonb array of {label,value}), sort_order, created_at
- `catalog_leads` — id (uuid), catalog_slug, name, email, created_at
- `promo_slides` — id (uuid), text, link, active (boolean), sort_order, created_at

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Service role (admin writes)
- `ADMIN_PASSWORD` — Admin portal password
- `AZURE_TENANT_ID` — Microsoft Graph auth
- `AZURE_CLIENT_ID` — Microsoft Graph auth
- `AZURE_CLIENT_SECRET` — Microsoft Graph auth
- `EMAIL_FROM` — Sender email (info@printecwrap.com)

## Important Notes
- Company established in **2017** (~9 years, NOT 25 years)
- Content targets BOTH businesses AND events/weddings
- Use "your vision" not "your brand" in general copy
- Homepage has unique animated hero (street/urban style) — different from inner pages
- Inner pages use Refined Minimal style consistently
- Images served from Supabase Storage CDN (not public/ folder)
- Blog reads from Supabase with fallback to blog-data.ts
- Contact form + FAB submit to /api/contact (email + save to inquiries table)
- Supabase client uses lazy init to prevent build crashes when env vars missing
- Domain: printecwrap.com is primary (www redirects to non-www)
- Sitemap base URL: https://printecwrap.com
- Phone number: +1 (715) 503-5444 (used across all pages)
- Email: info@printecwrap.com (NOT printeccorp.com)
- Address: Virginia, USA (no specific street address shown publicly)
- Company name: Printec Virginia LLC (NOT "Printec Corp")
- Homepage is server component wrapper → imports HomePageClient (client component)
- JSON-LD LocalBusiness structured data in root layout (schema.org)
- Microsoft Clarity analytics (ID: vzki5lbs56) — disabled on /admin/* and /sign/* pages
- Logo spin+bounce animation on first visit (sessionStorage)
- AVIF + WebP image formats enabled, 1-year cache TTL
- Portfolio categories match actual services (single source of truth in constants.ts)
- Portfolio gallery is DB-driven (admin manages via /admin/portfolio)
- Catalogs page shows "Coming Soon" (full catalog system built but not live yet)
- Contact page: no map placeholder, address shows "Virginia, USA"
- Homepage: "LATEST WORK" placeholder grid removed from social section
- Storefront Window Graphics page has before/after slider + industry images
- Food Truck Wraps page has Taco Fiesta wrap image in portfolio

## SEO Features
- Unique metadata (title, description, keywords, openGraph) on all 32 pages
- JSON-LD LocalBusiness schema (services, hours, social, area served)
- sitemap.xml with priority tiers (service 0.9, SEO 0.8, location 0.7, blog 0.6)
- robots.txt pointing to correct sitemap
- Canonical URL on homepage
- Meta descriptions all under 160 chars
- 9 location pages for local SEO (DC, VA, MD, Seattle, NYC, LA, Chicago, Dallas, Houston)
- Google Analytics 4 (Measurement ID: G-6K8LW0P8B9) — page views, custom events, conversion tracking
- GA4 custom events: generate_lead, catalog_email_capture, phone_click, email_click, whatsapp_click, cta_click
- GA4 event helper: `src/lib/gtag.ts` — trackEvent() wrapper used across 8 components
- GA4 disabled on /admin/* and /sign/* pages (same as Clarity)
- Microsoft Clarity for heatmaps and session recordings
