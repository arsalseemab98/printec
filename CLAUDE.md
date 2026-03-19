# Printec Corp Website

## Project Overview
Full-service website for Printec Corp — a custom signage, vehicle wrap, and graphics company established in 2017 in Virginia. The site targets both B2B (businesses, storefronts) and B2C (weddings, events, venues) customers.

## Hosting & Services
- **Domain**: https://printecwrap.com (+ www.printecwrap.com)
- **Hosting**: Vercel — project `printec` under `arsalseemab98s-projects`
- **Vercel URL**: https://printec.vercel.app
- **GitHub**: https://github.com/arsalseemab98/printec
- **Database**: Supabase — project `printecwrap` (ID: `eofjaizkkxqxbynnvemi`, region: us-east-1)
- **Supabase Dashboard**: https://supabase.com/dashboard/project/eofjaizkkxqxbynnvemi

## Tech Stack
- **Framework**: Next.js 16.1.7 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + inline styles (dark theme)
- **UI Components**: shadcn/ui base + custom components
- **Animations**: Framer Motion (hero, scroll-driven) + CSS transitions (reveals)
- **Icons**: Lucide React
- **Font**: Inter (body via Geist), Arial Black (headings)
- **Database**: Supabase (PostgreSQL)

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
- **NO skewed labels, NO spectrum gradients on inner pages**

## Architecture
```
src/
├── app/                          # Pages (App Router)
│   ├── page.tsx                  # Homepage (has unique street/urban hero style)
│   ├── layout.tsx                # Root layout (Navbar + Footer + FloatingActionButton)
│   ├── about/                    # About Us
│   ├── team/                     # Team page
│   ├── portfolio/                # Portfolio/Gallery
│   ├── contact/                  # Contact / Get a Quote
│   ├── blog/                     # Blog hub + [slug] dynamic posts
│   ├── dance-floor-wraps/        # Service page
│   ├── wall-wraps/               # Service page
│   ├── window-wraps/             # Service page
│   ├── channel-letters-signage/  # Service page
│   ├── wedding-floor-wrap/       # SEO landing page
│   ├── led-channel-letters/      # SEO landing page
│   ├── channel-letter-signs-near-me/ # SEO landing page
│   ├── storefront-window-graphics/   # SEO landing page
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # Robots.txt
│   └── globals.css               # Global styles + CSS animations
├── components/
│   ├── layout/
│   │   ├── navbar.tsx            # Site-wide nav with services dropdown
│   │   └── footer.tsx            # 4-column footer with social links
│   ├── shared/
│   │   ├── section.tsx           # IntersectionObserver reveal wrapper
│   │   ├── page-hero.tsx         # Reusable inner-page hero
│   │   ├── cta-banner.tsx        # Reusable CTA section
│   │   ├── skewed-button.tsx     # Neon glow pulse CTA button
│   │   ├── tape-strip.tsx        # Spectrum gradient strip (homepage only)
│   │   ├── contact-form.tsx      # Contact form with service dropdown
│   │   └── floating-action-button.tsx # Bottom-right chat modal with worker photo
│   └── ui/
│       ├── container-text-flip.tsx    # Animated word flip component
│       ├── gallery-grid-block-shadcnui.tsx # Filterable gallery with lightbox
│       └── etheral-shadow.tsx         # SVG displacement animation (hero bg)
├── lib/
│   ├── constants.ts              # Brand colors, services data, nav links
│   └── blog-data.ts              # Blog articles (6 posts with full content)
└── public/
    ├── printec-logo.png          # Original logo (2000x1252, high-res)
    ├── printec-logo-light.png    # White text version for dark bg
    ├── og-image.png              # OpenGraph image (1200x630)
    ├── apple-touch-icon.png      # iOS icon (180x180)
    ├── images/
    │   └── worker.png            # Team member photo for chat modal
    └── favicon.ico               # Colorful P monogram
```

## How to Run
```bash
npm install
npx next dev -p 3424      # Dev server
npx next build             # Production build
```

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

## Important Notes
- Company established in **2017** (~9 years, NOT 25 years)
- Content targets BOTH businesses AND events/weddings
- Use "your vision" not "your brand" in general copy
- Homepage has unique animated hero (street/urban style) — different from inner pages
- Inner pages use Refined Minimal style consistently
- All image areas are currently placeholders — replace with real .webp photos
- Blog articles are hardcoded in blog-data.ts (no CMS)
- Contact form submissions log to console (no backend yet)
