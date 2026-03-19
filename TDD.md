# TDD — Test Cases & Coverage

## Status: No automated tests yet (planned)

## Pages — Manual Verification

| Page | Route | Builds | Loads | SEO Meta | Status |
|------|-------|--------|-------|----------|--------|
| Homepage | `/` | ✅ | ✅ | ✅ | Live |
| About | `/about` | ✅ | ✅ | ✅ | Live |
| Team | `/team` | ✅ | ✅ | ✅ | Live |
| Portfolio | `/portfolio` | ✅ | ✅ | ✅ | Live |
| Contact | `/contact` | ✅ | ✅ | ✅ | Live |
| Blog Hub | `/blog` | ✅ | ✅ | ✅ | Live |
| Blog Posts | `/blog/[slug]` | ✅ | ✅ | ✅ | 6 posts |
| Dance Floor Wraps | `/dance-floor-wraps` | ✅ | ✅ | ✅ | Live |
| Wall Wraps | `/wall-wraps` | ✅ | ✅ | ✅ | Live |
| Window Wraps | `/window-wraps` | ✅ | ✅ | ✅ | Live |
| Channel Letters | `/channel-letters-signage` | ✅ | ✅ | ✅ | Live |
| Wedding Floor | `/wedding-floor-wrap` | ✅ | ✅ | ✅ | Live |
| LED Channel | `/led-channel-letters` | ✅ | ✅ | ✅ | Live |
| Near Me | `/channel-letter-signs-near-me` | ✅ | ✅ | ✅ | Live |
| Storefront | `/storefront-window-graphics` | ✅ | ✅ | ✅ | Live |

## Components — Verification

| Component | Works | Notes |
|-----------|-------|-------|
| Navbar | ✅ | Desktop + mobile, services dropdown, active links |
| Footer | ✅ | 4 columns, social links, responsive |
| FloatingActionButton | ✅ | Chat modal with form + worker photo |
| SkewedButton (neon) | ✅ | Pulse animation, hover states |
| ContainerTextFlip | ✅ | Word cycling animation in hero |
| GalleryGridBlock | ✅ | Filter, lightbox, hover effects |
| EtheralShadow | ✅ | SVG displacement, lazy-loaded |
| ContactForm | ✅ | Service dropdown, budget, validation |
| PageHero | ✅ | Refined minimal style |
| CtaBanner | ✅ | Refined minimal style |
| Section (reveal) | ✅ | IntersectionObserver CSS transitions |

## SEO Verification

| Feature | Status |
|---------|--------|
| Unique meta title per page | ✅ |
| Unique meta description per page | ✅ |
| Keywords array per page | ✅ |
| OpenGraph tags | ✅ |
| Twitter cards | ✅ |
| sitemap.xml | ✅ Auto-generated |
| robots.txt | ✅ |
| Favicon (P monogram) | ✅ |
| Apple touch icon | ✅ |
| OG image (1200x630) | ✅ |

## Planned Tests
- [ ] E2E: Navigation between all pages
- [ ] E2E: Contact form submission
- [ ] E2E: Floating action button modal flow
- [ ] E2E: Blog post navigation
- [ ] Visual: Responsive layouts (mobile/tablet/desktop)
- [ ] Performance: Lighthouse scores
- [ ] Accessibility: WCAG compliance
- [ ] SEO: Structured data validation
