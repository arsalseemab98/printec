# Technical SEO Audit — printecwrap.com
**Date:** 2026-04-25 | **Stack:** Next.js 16 App Router on Vercel

## Score Summary

| Category | Status | Score |
|---|---|---|
| Crawlability (robots.txt) | WARN | 72/100 |
| Indexability (canonicals, sitemap) | WARN | 78/100 |
| Security Headers | FAIL | 55/100 |
| HTTPS / Redirects | WARN | 82/100 |
| Mobile / HTML Fundamentals | PASS | 90/100 |
| Core Web Vitals (source signals) | PASS | 85/100 |
| Structured Data | PASS | 88/100 |
| JS Rendering | PASS | 95/100 |
| URL Structure | PASS | 90/100 |
| IndexNow Protocol | FAIL | 0/100 |

**Overall Technical Score: 74/100**

---

## High-Priority Issues

### 1. www → non-www redirect is HTTP 307 (should be 301)
`https://www.printecwrap.com` returns `307 Temporary Redirect` to `https://printecwrap.com/`. A 307 does not pass PageRank. Backlinks pointing to the www version do not consolidate to the canonical domain.
**Fix:** In Vercel Dashboard → Settings → Domains, set the www alias redirect type to 301 Permanent.

### 2. AhrefsBot and SemrushBot blocked in robots.txt
Blocking these means **the owner's own SEO tools (and any future agency) will see blank data** for the domain. The bots add no server load and have no Google ranking effect. The other 8 blocked bots (MJ12bot, DotBot, BLEXBot, DataForSeoBot, etc.) are pure scrapers — keeping those blocked is fine.
**Fix:** Remove `AhrefsBot` and `SemrushBot` from `src/app/robots.ts`.

### 3. Missing security headers: X-Frame-Options, X-Content-Type-Options
`curl -I` confirms neither is present. HSTS *is* present (`max-age=63072000`, 2 years) — that part is correct.
**Fix:** Add a `headers()` function in `next.config.ts`:
```ts
async headers() {
  return [{
    source: "/:path*",
    headers: [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  }];
}
```

## Medium-Priority Issues

### 4. Catalog detail pages indexable but show "Coming Soon"
6 URLs in the sitemap (`/catalogs/channel-letters-signage`, `/catalogs/vehicle-wraps`, etc.) return 200 with `cache-control: private, no-cache` — they're behind the email gate. They should not be indexed.
**Fix:** Add `export const metadata = { robots: { index: false } }` to `src/app/catalogs/[slug]/page.tsx`, or remove from `sitemap.ts`.

### 5. Facebook sameAs URL likely incorrect in JSON-LD
Schema declares `https://www.facebook.com/printecvirginia` but project docs show the actual share URL is `https://www.facebook.com/share/1E2N8msTsc/`. Verify which URL resolves to the live FB page.

### 6. Sitemap lastmod regenerates on every deploy
`src/app/sitemap.ts` uses `new Date()` for non-blog pages. Every Vercel deploy resets every URL's lastmod to "now," degrading Google's recrawl scheduling signal.
**Fix:** Use static date strings for pages that haven't actually changed.

### 7. Out-of-area location pages may be thin (Seattle, LA, Chicago, Dallas, Houston, NYC)
Each has unique canonicals but content may be city-name-swapped templates. See content audit for confirmation.

## Low-Priority Issues

### 8. No BreadcrumbList structured data on inner pages
Service pages, location pages, and blog posts are missing breadcrumb schema — a missed rich-result opportunity.

### 9. No Article/BlogPosting schema on `/blog/[slug]`
Missing `datePublished`, `author`, `headline`, `image` markup.

### 10. IndexNow not implemented
No key file in `/public/`. IndexNow (Bing, Yandex, Naver) enables instant URL submission on publish.

### 11. AutoRefresh component polls `/api/version` every 30s site-wide
Dev convenience that adds perpetual background network activity for every public visitor. Should be gated to admin sessions or preview environments only.

### 12. Orphaned source directories
`src/app/vinyl-wraps/`, `src/app/custom-signs/`, `src/app/demo/` exist as empty directories. They're correctly absent from the sitemap but should be deleted to avoid confusion.

## What's Working

- HSTS present (2-year max-age)
- HTTPS enforced
- Server-side rendering — all critical SEO content is in initial HTML
- `next/image` with AVIF + WebP, 1-year cache, `priority` on hero images
- Analytics (GA4, Clarity, Meta Pixel) deferred via `strategy="afterInteractive"`
- Clean URL structure (lowercase, hyphenated, descriptive)
- Comprehensive WordPress legacy 301 redirects in `next.config.ts`
- LocalBusiness JSON-LD present and well-formed
- `<html lang="en">`, charset, viewport all correct
- Font preloading configured

## Quick-Win Checklist

**5 minutes each:**
- [ ] Vercel: change www domain redirect from 307 to 301
- [ ] `robots.ts`: remove AhrefsBot, SemrushBot
- [ ] `layout.tsx`: verify Facebook sameAs URL
- [ ] `catalogs/[slug]/page.tsx`: add `robots: { index: false }`

**30 minutes:**
- [ ] `next.config.ts`: add headers() with X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- [ ] `sitemap.ts`: replace `new Date()` with static dates for stable pages
- [ ] Generate IndexNow key, deploy to `/public/`

**1–2 hours:**
- [ ] Add BreadcrumbList JSON-LD to service + location layouts
- [ ] Add BlogPosting JSON-LD to `blog/[slug]/page.tsx`
- [ ] Audit non-DMV location pages for content depth (see content-audit.md)
