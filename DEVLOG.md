# DEVLOG — Printec Corp Website

---

## 2026-03-18 — Initial Build

### What was done
- Created full 13-page Next.js website for Printec Corp
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
