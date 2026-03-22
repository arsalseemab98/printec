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
| FloatingActionButton | ✅ | Chat modal with form + worker photo, submits to /api/contact |
| SkewedButton (neon) | ✅ | Pulse animation, hover states |
| ContainerTextFlip | ✅ | Word cycling animation in hero |
| GalleryGridBlock | ✅ | Filter, lightbox, hover effects |
| EtheralShadow | ✅ | SVG displacement, lazy-loaded |
| ContactForm | ✅ | Service dropdown, budget, validation, submits to /api/contact |
| PageHero | ✅ | Refined minimal style |
| CtaBanner | ✅ | Refined minimal style |
| Section (reveal) | ✅ | IntersectionObserver CSS transitions |
| BeforeAfterSlider | ✅ | Style 3 — Elegant Pill Glow, drag interaction, pill labels, corner accents |

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

## SEO Verification

| Feature | Status |
|---------|--------|
| Unique meta title per page | ✅ (27 pages) |
| Unique meta description per page | ✅ |
| Keywords array per page | ✅ |
| OpenGraph tags | ✅ |
| Twitter cards | ✅ |
| sitemap.xml | ✅ Auto-generated (27 pages + 6 blog posts) |
| robots.txt | ✅ |
| Favicon (P monogram) | ✅ |
| Apple touch icon | ✅ |
| OG image (1200x630) | ✅ |
| Location pages (9 cities) | ✅ |
| Sitemap base URL = printecwrap.com | ✅ |

## Planned Tests
- [ ] E2E: Navigation between all 27 pages
- [ ] E2E: Contact form submission (API + Supabase)
- [ ] E2E: Floating action button modal flow
- [ ] E2E: Blog post navigation
- [ ] E2E: Before/after slider interaction
- [ ] Visual: Responsive layouts (mobile/tablet/desktop)
- [ ] Performance: Lighthouse scores
- [ ] Accessibility: WCAG compliance
- [ ] SEO: Structured data validation
- [ ] Images: All Supabase CDN URLs return 200
