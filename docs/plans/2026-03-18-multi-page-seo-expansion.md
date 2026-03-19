# Printec Multi-Page SEO Expansion

**Goal:** Expand the single-page Printec website into a 13-page SEO-optimized site with service landing pages, portfolio gallery, contact/quote page, blog hub, and high-value SEO pages — all matching the existing dark Street/Urban theme.

## Architecture

- Shared layout with persistent nav + footer extracted from current page.tsx
- Each page is a Server Component with its own metadata for SEO
- Shared brand constants, components (TapeStrip, SkewedButton, Section) extracted to lib/
- Service pages use a reusable template component with dynamic content
- Blog uses a simple MDX-free approach with hardcoded articles for now

## Tech Stack

- Next.js 16 App Router (existing)
- Tailwind CSS + shadcn/ui (existing)
- Framer Motion (hero only, existing)
- CSS IntersectionObserver animations (existing pattern)

## File Structure (Final)

```
src/
├── lib/
│   └── constants.ts          # Brand colors, services data, shared constants
├── components/
│   ├── layout/
│   │   ├── navbar.tsx         # Extracted nav with multi-page links
│   │   └── footer.tsx         # Extracted footer
│   ├── shared/
│   │   ├── section.tsx        # CSS reveal section wrapper
│   │   ├── tape-strip.tsx     # Spectrum gradient strip
│   │   ├── skewed-button.tsx  # Brand CTA button
│   │   ├── page-hero.tsx      # Reusable inner-page hero banner
│   │   └── cta-banner.tsx     # Reusable quote CTA section
│   └── ui/                    # Existing shadcn + custom components
├── app/
│   ├── layout.tsx             # Updated with navbar + footer
│   ├── page.tsx               # Homepage (refactored)
│   ├── about/page.tsx         # About Us
│   ├── portfolio/page.tsx     # Portfolio/Gallery
│   ├── contact/page.tsx       # Contact / Get a Quote
│   ├── blog/
│   │   ├── page.tsx           # Blog hub
│   │   └── [slug]/page.tsx    # Individual blog posts
│   ├── dance-floor-wraps/page.tsx
│   ├── wall-wraps/page.tsx
│   ├── window-wraps/page.tsx
│   ├── channel-letters-signage/page.tsx
│   ├── wedding-floor-wrap/page.tsx
│   ├── led-channel-letters/page.tsx
│   ├── channel-letter-signs-near-me/page.tsx
│   └── storefront-window-graphics/page.tsx
```

## Tasks

### Task 1: Extract shared constants and components

Extract brand constants, shared UI components from page.tsx into reusable modules.

### Task 2: Build navbar and footer components

Multi-page nav with service dropdown, mobile hamburger. Footer with sitemap links.

### Task 3: Update layout.tsx

Add navbar + footer wrapping all pages. Update metadata.

### Task 4: Refactor homepage (page.tsx)

Remove nav/footer (now in layout), import shared components.

### Task 5: Build page-hero and cta-banner shared components

Reusable hero banner for inner pages. Reusable CTA section.

### Task 6: About Us page

Company story, team, Virginia roots, trust badges.

### Task 7: Portfolio/Gallery page

Full filterable gallery with all categories, lightbox.

### Task 8: Contact / Get a Quote page

Quote form, phone, WhatsApp, map embed, business hours.

### Task 9: Blog hub + blog post template

Blog listing page + dynamic [slug] route with 6 articles.

### Task 10: Service pages — Dance Floor Wraps + Wall Wraps

SEO landing pages with keyword-rich content.

### Task 11: Service pages — Window Wraps + Channel Letters Signage

SEO landing pages with keyword-rich content.

### Task 12: SEO pages — Wedding Floor Wrap + LED Channel Letters

High-value keyword targeting pages.

### Task 13: SEO pages — Channel Letter Signs Near Me + Storefront Window Graphics

Local intent and B2B targeting pages.

### Task 14: Sitemap and meta tags

Add generateMetadata to all pages, create sitemap.ts.
