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
│   ├── dance-floor-wraps/            # Service page — "Floor Wraps" in nav (hero + before/after)
│   ├── wall-wraps/                   # Service page (hero + before/after)
│   ├── window-wraps/                 # Service page (hero + before/after)
│   ├── channel-letters-signage/      # Service page (hero + before/after)
│   ├── vinyl-wraps/                  # Service page (removed from nav)
│   ├── business-signage/             # Service page (hero image)
│   ├── custom-neon-signs/            # Service page (hero + before/after)
│   ├── wedding-floor-wrap/           # SEO landing page (hero + 6 design cards with real images)
│   ├── led-channel-letters/          # SEO landing page
│   ├── channel-letter-signs-near-me/ # SEO landing page
│   ├── storefront-window-graphics/   # SEO landing page
│   ├── locations/                    # Location SEO pages — DMV only (Virginia, Washington DC, Maryland). 6 out-of-area pages (Seattle, NYC, LA, Chicago, Dallas, Houston) removed 2026-04-25 with 301s in next.config.ts due to doorway-page risk.
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
│   │   ├── quotes/                   # Quote management
│   │   │   ├── page.tsx              # All quotes listing (filter: All/Sent/Not Sent)
│   │   │   └── new/page.tsx          # Manual quote creation (customer form → quote builder)
│   │   ├── catalogs/                 # Catalog management
│   │   │   ├── page.tsx              # Catalog list (create/delete)
│   │   │   ├── [id]/page.tsx         # Catalog detail (edit + manage projects)
│   │   │   └── leads/page.tsx        # Catalog leads list (filter/search/export)
│   │   ├── customers/page.tsx        # Unified customer list (inquiries + catalog leads)
│   │   ├── promos/page.tsx           # Promo slider management (create/edit/toggle/reorder)
│   │   ├── statistics/page.tsx         # Full analytics dashboard (Recharts)
│   │   ├── images/page.tsx            # Image manager (view, upload, delete)
│   │   ├── calendar/page.tsx          # Booking calendar (monthly/weekly/daily views)
│   │   ├── emails/                   # Email marketing system
│   │   │   ├── page.tsx              # Email dashboard (sent log, stats)
│   │   │   ├── compose/page.tsx      # Compose email (Tiptap WYSIWYG + recipient picker)
│   │   │   └── templates/page.tsx    # Saved email templates CRUD
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
│   │       ├── quotes/              # Quotes CRUD + send PDF
│   │       ├── emails/              # Email marketing (send, templates, recipients, logs)
│   │       └── azure-status/        # Azure email health check endpoint
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
- **URL**: /admin (protected by admin session cookie via proxy.ts; matcher covers BOTH /admin/* and /api/admin/*)
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
  - Quote sending via Microsoft Graph email (PDF attachment) — hidden when inquiry has no email, download PDF always available
  - Manual quote creation (/admin/quotes/new) — create quotes for walk-in/phone customers without existing inquiry (auto-creates inquiry with status "Quoted")
  - All quotes listing page (/admin/quotes) with "Create Quote" button
  - Image manager: view all Supabase Storage images, single + bulk upload, delete, copy URL, search/filter
  - Digital contracts: create, edit, send signing link, download PDF, status management (Pending/Sent/Signed/Completed/Cancelled)
  - Contract status dropdown on detail page (manual override)
  - Payment status (Not Paid / Half Paid / Full Paid) on contracts detail page; "Send Payment Update Email" button (Microsoft Graph) sends a Half-Paid or Full-Paid email to the customer with current balance details (button disabled when payment_status is Not Paid or no client_email)
  - Payment-status pill (color-coded: gray/orange/green) on /admin/contracts list rows
  - Customers page now also surfaces orphan contracts (`type: "contract"`) that have no linked inquiry — safety net plus auto-create inquiry on every new contract created via BookingModal or /admin/contracts/new
  - Contract signing/completion feeds into dashboard sales metrics
  - Public signing page at /sign/[id] (customer draws signature on canvas)
  - Signed PDF emailed to both parties after signing
  - Create contracts from inquiries (auto-fills client details) or from catalog leads (via query params)
  - Customers page: "+ Inquiry" action for catalog leads, "+ Contract" action for all customers
  - POST /api/admin/inquiries — create inquiry from admin (used when converting catalog lead to inquiry)
  - **Catalogs**: Create/edit/delete portfolio catalogs, manage projects (images, specs, reorder), view leads
  - **Customers**: Unified view of all inquiries + catalog leads with filter/search/export
  - Industry tag on customers (datalist input on /admin/inquiries/[id]; preset list in src/lib/constants.ts INDUSTRIES + free-text fallback). Surfaces as a column + filter on /admin/customers (catalog leads + orphan contracts have no industry — they show "—" and are hidden when an industry is selected).
  - Email composer recipient picker has an Industry filter (URL-synced via ?industry=X), backed by a server-side narrow on the inquiries query at /api/admin/emails/recipients?industry=X. When filtered, catalog leads + contracts are excluded from the picker (they have no industry).
  - Interactive web catalogs: 6 categories (channel letters, vehicle wraps, window graphics, wall wraps, floor wraps, neon signs)
  - Email-gated catalog viewer (fullscreen cinematic slideshow)
  - "Send This Design" inquiry form within catalog viewer (auto-fills service category)
  - Catalog leads saved to catalog_leads table with slug tracking
  - **Promos**: Promotional slider bar below navbar with auto-rotating offers, admin CRUD at /admin/promos (create/edit/toggle active/reorder/delete)
  - **Calendar**: Booking calendar (/admin/calendar) — monthly/weekly/daily views, contracts + inquiries color-coded, click to detail. "+ Add Booking" button and click-empty-day quick-create use the shared BookingModal (src/components/admin/booking-modal.tsx) to POST /api/admin/contracts — the single source of truth for manual booking/order creation.
  - **Orders** (/admin/orders): confirmed-jobs view listing contracts in status Sent (labeled "Quoted"), Signed, or Completed. Filter tabs, search, revenue total, mobile card layout. "+ Add Order" button opens the shared BookingModal with status defaulted to Signed.
  - **Reorderable sidebar nav**: admin nav items are drag-and-drop reorderable (HTML5 DnD); order persisted per browser in localStorage.admin-nav-order-v1. "Reset nav order" link restores the default.
  - Dashboard KPI grid includes **Quoted** ($ of quotes sent + contracts in Sent status) and **Invoices Sent** (count). Statistics page mirrors the same two metrics in its KPI grid and top summary bar.
  - **Emails**: Email marketing system (/admin/emails) — compose with Tiptap WYSIWYG, recipient picker (inquiries + catalog leads + contracts), placeholders {name}/{email}/{service}, save/load templates, individual sends via Microsoft Graph, sent log
  - **Azure Health**: Dashboard shows email service status (active/down), client secret expiry date + days remaining, warning at ≤30 days
  - **Fully mobile responsive** — all admin pages work on phone/tablet (responsive grids, collapsing layouts)
  - **Inquiries & Quotes**: card layout on mobile (no horizontal scroll), full table on desktop (admin-desktop-only / admin-mobile-only CSS toggle)
  - **Auto-refresh**: browser auto-reloads when new deploy goes live (polls /api/version every 30s, plus an immediate check on tab focus / visibilitychange so backgrounded mobile tabs don't sit on a stale build)
  - **Quotes hardening (2026-04-22)**:
    - Quote send (/api/admin/quotes/[id]/send) returns `{success, sent_at, warning?}`. If the email goes out but the `sent_at` DB write fails, the response includes a `warning` and the UI surfaces it so admin doesn't blindly resend. Graph errors propagate the real Azure/Graph message instead of a generic "Failed to send."
    - Quote list (/admin/quotes) shows real alerts on load + resend failures (no more `// silent` swallowed errors). Resend prompts a confirm() so a mis-tap on mobile can't double-email.
    - Quote number race: POST /api/admin/quotes retries on Postgres unique-violation (23505). Requires the unique index from scripts/migrations/2026-04-22-quotes-quote-number-unique.sql to be applied via Supabase MCP.
    - Manual quote flow (/admin/quotes/new): inquiry is created with status `New`, then promoted to `Quoted` only after the quote is actually saved in the builder. Abandoning the builder leaves a normal `New` inquiry instead of a fake `Quoted` orphan.
    - Quote builder mobile: header buttons wrap; line-items grid uses `quote-item-row` class that collapses column widths at ≤768px so the price/delete columns don't push the description input off-screen.
  - **Save-path hardening (2026-04-21)**: POST /api/admin/contracts requires `client_name` when no `inquiry_id` (returns 400 instead of silently creating a nameless orphan). PUT /api/admin/inquiries/[id] trims `industry` and stores null for empty/whitespace. /api/admin/emails/recipients returns 500 on any Supabase error (was silently returning empty list). /admin/emails/compose surfaces the failure in red.

## Email Integration
- **Provider**: Microsoft Graph API (Azure AD app)
- **From**: info@printecwrap.com (all contact emails use this domain)
- **Contact form**: Sends notification to Printec + confirmation to customer
- **Quote emails**: Branded PDF attachment with quote details
- **Contract emails**: Signing link sent to customer, signed PDF to both parties
- **UTM tracking**: Captured from URL params, included in notification emails
- **Rate limiting**: 60s cooldown per email+source (in-memory)
- **DB-first**: Contact form saves inquiry to DB before sending emails (prevents data loss if email fails)
- **Anti-spam**: All public forms protected with honeypot field, timing check (3s minimum), server-side email regex validation, gibberish detection
- **Gibberish detection**: Catches bot-generated random strings — no-space names >10 chars, low vowel ratio (<15%), mixed case patterns, no-space messages >12 chars. Silent rejection (fake success).
- **Turnstile**: Cloudflare Turnstile CAPTCHA integrated but NOT ACTIVE yet — needs site key + secret key from Cloudflare dashboard. Fails open (won't block users if keys missing/invalid)
- **Anti-spam utility**: `src/lib/antispam.ts` — shared server-side checks used by both `/api/contact` and `/api/catalog-leads`
- **Turnstile component**: `src/components/shared/turnstile.tsx` — reusable client widget (dark theme, explicit render)
- **Email marketing**: Compose + send bulk emails from /admin/emails with Tiptap editor
- **Templates**: Save reusable email templates with placeholder support
- **Azure health check**: /api/admin/azure-status tests credentials + shows secret expiry
- Payment update emails (Microsoft Graph): manual send from contract detail page; subject + body vary by Half Paid vs Full Paid; recorded in contracts.payment_email_sent_at

## Supabase Access & RLS Policy
- **Service role** (`SUPABASE_SERVICE_ROLE_KEY`) is used ONLY by admin API routes under `/api/admin/*` via `createServerClient()` in `src/lib/supabase.ts`. These routes are gated by `proxy.ts` admin session cookie.
- **Anon client** (`getSupabase()`) is used by all public routes/pages. Public access is constrained by RLS:
  - `inquiries` — anon INSERT only
  - `catalog_leads` — anon INSERT only
  - `catalogs`, `catalog_projects` — anon SELECT only
  - `page_content`, `page_images`, `portfolio_images` — anon SELECT, service_role write
  - `blog_posts` — anon SELECT only where `published = true`, service_role write
  - `promo_slides` — anon SELECT only where `active = true`, service_role write
  - `contracts`, `quotes`, `email_logs`, `email_templates` — service_role only (no anon access at all)
- **Customer signing flow** reads contract data via PUBLIC endpoint `GET /api/contracts/[id]/public-view` (NOT `/api/admin/contracts/[id]`). It exposes only 15 fields: id, contract_number, client_name, client_email, event_date, venue, service_description, total_price, advance_amount, balance_amount, balance_due, travel_cost, terms, signed_at, signature_data. Internal admin metadata (payment_status, status, inquiry_id, sent_at, completed_at, category, created_at, updated_at) is intentionally omitted.
- **Never add service-role usage to a public route** without admin auth gating. Use the anon client and add the narrowest RLS policy needed.

## Database Tables (Supabase)
- `page_images` — page_slug, slot, url, alt_text
- `page_content` — page_slug, field, value
- `blog_posts` — slug, title, excerpt, category, content (HTML), published
- `inquiries` — name, email, phone, service, status, booked_price, completed_price, event_date, utm_*, industry
- `quotes` — inquiry_id (FK nullable, ON DELETE SET NULL — was NOT NULL + CASCADE until 2026-04-22, which silently wiped quotes when an inquiry was deleted), quote_number (PQ-0001, unique), items (jsonb), total, sent_at
- `contracts` — inquiry_id (nullable), contract_number (PC-001), event_date, venue, service_description, total_price, advance_amount, balance_amount, balance_due, travel_cost, client_name, client_email, terms (jsonb), signature_data, signed_at, sent_at, status (Pending/Sent/Signed/Completed/Cancelled), completed_at, payment_status (Not Paid/Half Paid/Full Paid), payment_email_sent_at, category
- `catalogs` — id (uuid), title, slug (unique), description, created_at
- `catalog_projects` — id (uuid), catalog_id (FK→catalogs, cascade delete), title, description, image_url, specs (jsonb array of {label,value}), sort_order, created_at
- `catalog_leads` — id (uuid), catalog_slug, name, email, created_at
- `promo_slides` — id (uuid), text, link, active (boolean), sort_order, created_at
- `email_templates` — id (uuid), name, subject, body (HTML), created_at
- `email_logs` — id (uuid), template_id (FK→email_templates, nullable), subject, recipient_email, recipient_name, status (sent/failed), sent_at

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Service role (admin writes)
- `ADMIN_PASSWORD` — Admin portal password
- `AZURE_TENANT_ID` — Microsoft Graph auth
- `AZURE_CLIENT_ID` — Microsoft Graph auth
- `AZURE_CLIENT_SECRET` — Microsoft Graph auth
- `EMAIL_FROM` — Sender email (info@printecwrap.com)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key (anti-bot) — NOT YET CONFIGURED
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key (server-side verification) — NOT YET CONFIGURED

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
- Phone number: +1 (715) 503-5444 (used across all pages) — **WARNING: 715 is a Wisconsin area code; the company is in Virginia. NAP geo trust mismatch flagged in 2026-04-25 SEO audit. Replace with 571/703/804 when a real VA number is acquired.**
- Email: info@printecwrap.com (NOT printeccorp.com)
- Address: 15485 Marsh Overlook Dr, Woodbridge, VA 22191 (in JSON-LD schema + contract PDFs). Site footer + contact form show "Woodbridge, VA 22191" (city/state/zip only).
- Company name: Printec Virginia LLC (NOT "Printec Corp")
- Homepage is server component wrapper → imports HomePageClient (client component)
- JSON-LD LocalBusiness structured data in root layout (schema.org)
- Microsoft Clarity analytics (ID: vzki5lbs56) — disabled on /admin/* and /sign/* pages
- Logo spin+bounce animation on first visit (sessionStorage)
- AVIF + WebP image formats enabled, 1-year cache TTL
- Portfolio categories match actual services (single source of truth in constants.ts)
- Portfolio gallery is DB-driven (admin manages via /admin/portfolio)
- Catalogs page shows "Coming Soon" (full catalog system built but not live yet)
- Contact page: no map placeholder, address shows "Woodbridge, VA 22191" (was "Virginia, USA" before 2026-04-25 NAP fix)
- Homepage: "LATEST WORK" placeholder grid removed from social section
- Storefront Window Graphics page has before/after slider + industry images
- Food Truck Wraps page has Taco Fiesta wrap image in portfolio

## SEO Features
- Unique metadata (title, description, keywords, openGraph) on all 26 public pages (was 32 before 2026-04-25 doorway-page cleanup)
- **JSON-LD schema architecture (post 2026-04-25/26 audit):**
  - `LocalBusiness` on every page (in root layout) — `@id: "https://printecwrap.com/#business"` for cross-entity references. Includes `aggregateRating` (5.0/13) + 3 real `Review` entries from GBP, `streetAddress: "15485 Marsh Overlook Dr"`, `openingHoursSpecification`, `areaServed`, `hasOfferCatalog`.
  - `Service` schema on 7 main service pages — `provider` field references LocalBusiness via `@id`. Each has `serviceType`, `name`, `description`, `areaServed` (VA/MD/DC), and `hasOfferCatalog` with 5–7 sub-services.
  - `BreadcrumbList` on all 21 inner pages.
  - `FAQPage` on 4 pages with FAQ data (business-signage, custom-neon-signs, wedding-floor-wrap, locations/washington-dc) — reuses existing `FAQ_DATA`/`FAQ`/`FAQS` arrays.
  - `BlogPosting` on `/blog/[slug]` — pulls from existing `post` object.
  - Helper: `src/components/shared/json-ld.tsx` exports `BreadcrumbJsonLd`, `FaqJsonLd`, `ServiceJsonLd`, `BlogPostingJsonLd`.
- sitemap.xml with priority tiers (service 0.9, SEO 0.8, location 0.7, blog 0.6) — 33 URLs total
- robots.txt pointing to correct sitemap; AhrefsBot allowed (was blocked, unblocked 2026-04-25 so own SEO tools can monitor)
- Canonical URL on homepage; Next.js `metadataBase` handles canonicals on inner pages
- Meta descriptions all under 160 chars
- 3 location pages for local SEO (DC, VA, MD) — 6 out-of-area pages removed 2026-04-25 (doorway-page risk; all 308-redirect to /locations/virginia via next.config.ts)
- Homepage has a Testimonials section (between sections 6.5 and 7) with 3 real Google reviews + GBP CTAs. Constants `GBP_RATING`, `GBP_REVIEW_COUNT`, `TESTIMONIALS` in src/components/home-page-client.tsx must stay synced with the JSON-LD `aggregateRating` + `review` array in src/app/layout.tsx. **Never invent ratings — Google manual-action risk.**
- Security headers via `next.config.ts` `headers()`: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=()/microphone=()/geolocation=()`. HSTS already present from Vercel default.
- www → apex redirect is **308 Permanent** (set via Vercel API: `PATCH /v9/projects/{id}/domains/www.printecwrap.com` with `redirectStatusCode: 308`). The change is persisted at the Vercel platform level — survives redeploys. To revert, PATCH back to 307 or null.
- Google Analytics 4 (Measurement ID: G-6K8LW0P8B9) — page views, custom events, conversion tracking
- GA4 custom events: generate_lead, catalog_email_capture, phone_click, email_click, whatsapp_click, cta_click
- GA4 event helper: `src/lib/gtag.ts` — trackEvent() wrapper used across 8 components
- GA4 disabled on /admin/* and /sign/* pages (same as Clarity)
- Microsoft Clarity for heatmaps and session recordings
- Google Ads: Account 342-087-0676, Search campaign ready to publish (PMax removed). 72 keywords across 7 services, $10/day, DMV area
- GA4 linked to Google Ads (Property 530146539). GA4 verified on live site. Pending: publish campaign, advertiser verification, import conversions
- Marketing plan documented in MARKETING.md (campaigns, UTM params, scaling strategy)
- Preconnect + dns-prefetch to Supabase CDN in layout for faster image loads
- Gallery images use Next.js `<Image>` with `fill` + responsive `sizes` (auto AVIF/WebP, CDN cached 1yr)
- First 6 gallery images load eagerly, rest lazy-loaded
- Portfolio images served through `/_next/image` optimization pipeline (not raw files)
