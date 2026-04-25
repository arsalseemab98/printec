# SEO Audit — printecwrap.com
**Printec Virginia LLC** — Custom signage, vehicle wraps & graphics
**Audit Date:** 2026-04-25
**Stack:** Next.js 16 App Router on Vercel
**Pages crawled:** 32 public URLs (homepage + about + team + portfolio + contact + blog hub + 6 blog posts + 10 service pages + 9 location pages + catalogs hub + 6 catalog detail pages)

---

## Overall SEO Health Score: **58 / 100**

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Technical SEO | 22% | 74 | 16.3 |
| Content Quality / E-E-A-T | 23% | 56 | 12.9 |
| On-Page SEO | 20% | 78 | 15.6 |
| Schema / Structured Data | 10% | 55 | 5.5 |
| Performance (CWV — source signals) | 10% | 85 | 8.5 |
| AI Search Readiness (GEO) | 10% | 61 | 6.1 |
| Local SEO | (separate) | 34 | — |
| Images | 5% | 80 | 4.0 |
| **TOTAL** | | | **~69** |

> Composite drops to **~58** after weighting in Local SEO impact, since this is fundamentally a local service business and Local SEO is the dominant ranking dimension.

---

## TL;DR — Answer to "Do we have reviews?"

**No. Reviews are completely missing across every layer of the site:**

| Where | Status |
|-------|--------|
| Customer testimonials section on any page | ❌ NONE |
| `/reviews` or `/testimonials` page | ❌ NONE |
| Google Reviews widget (Elfsight, etc.) | ❌ NONE |
| `aggregateRating` in JSON-LD schema | ❌ MISSING |
| Individual `Review` schema entities | ❌ MISSING |
| Outbound link to GBP review page | ❌ NONE |
| BBB badge or similar third-party trust mark | ❌ NONE |
| Numerical rating shown anywhere | ❌ NONE |

The word "review" appears 5x in the codebase but only refers to:
- **Permit reviews** (Historic Preservation Review Board, zoning reviews, DCRA reviews) on location/service pages
- **Mockup approval** ("Review, request revisions, and approve") on `/custom-neon-signs`

**Zero customer review content exists.** This is the single biggest trust gap on the site and the largest scoring drag on the Local SEO sub-score (0/100 on Reviews & Reputation). See "Reviews Action Plan" below.

---

## Top 5 Critical Issues

1. **No reviews anywhere** — schema, on-page, or third-party widget. Highest trust gap. (See Reviews Action Plan.)
2. **Wisconsin (715) area code on a Virginia business** — `+1 (715) 503-5444` is northern Wisconsin. Geographic NAP mismatch with Woodbridge VA address. Risks GBP suppression and re-verification holds.
3. **6 doorway-style location pages** — Seattle, NYC, LA, Chicago, Dallas, Houston are city-name-swapped templates. No physical presence, no local projects, no local phone. Manual-action risk under Sept 2025 QRG.
4. **NAP inconsistency** — schema/footer says "Woodbridge, VA 22191" but contact page body says "Virginia, USA" (no street). Conflicting signals on a single crawl.
5. **AhrefsBot + SemrushBot blocked in robots.txt** — site owner's own SEO tools see blank data; any future agency starts blind.

## Top 5 Quick Wins (under 30 min each)

1. **Vercel Dashboard:** change `www.printecwrap.com` redirect from 307 to **301 Permanent**.
2. **`src/app/robots.ts`:** remove `AhrefsBot` and `SemrushBot` from blocklist.
3. **`src/app/catalogs/[slug]/page.tsx`:** add `export const metadata = { robots: { index: false } }` — gated catalog pages should not be indexed.
4. **`next.config.ts`:** add `headers()` with `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`.
5. **`src/app/layout.tsx`:** verify Facebook `sameAs` URL — current value `/printecvirginia` may not resolve.

---

## Reviews Action Plan (User's Specific Question)

### Phase 1 — Collect (Weeks 1–4)
- **Claim/verify Google Business Profile** (set primary category "Sign Shop")
- Send **every past customer** the direct GBP review link: `https://g.page/r/[PLACE_ID]/review`
- Add a **+7-day post-job email** asking for a Google review
- **Target:** 10 verified Google reviews in 30 days
- Secondary platforms: Yelp, Facebook Reviews, Houzz (B2B sign clients), BBB
- **Velocity goal:** ≥1 new Google review every 18 days (Sterling Sky cliff threshold)

### Phase 2 — Display on Site (Weeks 3–6)
Pick one approach in order of effort:
1. **Static testimonials** — hardcode 5–10 real quotes with first name + business + city + rating. Zero dependency, zero ongoing cost.
2. **Live widget** — Elfsight ($9/mo) or open-source `react-google-reviews` library pulls live reviews.
3. **Dedicated `/reviews` page** with a "Leave a Review" CTA → GBP shortlink.

Add a small "trust strip" to the homepage hero ("4.9★ on Google, 47 reviews") and to every service page.

### Phase 3 — Schema (after 5+ real reviews exist)
Insert into existing JSON-LD in `src/app/layout.tsx`:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "<REAL value from GBP>",
  "reviewCount": "<REAL count from GBP>",
  "bestRating": "5",
  "worstRating": "1"
}
```
Plus 3–5 individual `Review` entities (see `schema-audit.md`).

> **WARNING:** Never invent ratings. Inflated/fake `aggregateRating` is a Google manual-action risk. Numbers must reconcile with the live GBP profile and require manual maintenance.

---

## Issue Inventory by Category

### Technical (74/100) — see `technical-audit.md`
**HIGH:** www→non-www is 307 (should be 301) · AhrefsBot+SemrushBot blocked · X-Frame-Options + X-Content-Type-Options missing
**MEDIUM:** Catalog pages indexable but gated · Facebook sameAs URL likely broken · sitemap lastmod regenerates on every deploy
**LOW:** No BreadcrumbList · No BlogPosting schema · No IndexNow · AutoRefresh polls /api/version on every public page · Orphan source dirs

### Content / E-E-A-T (56/100) — see `content-audit.md`
**CRITICAL:** 6 doorway-pattern location pages (Seattle, NYC, LA, Chicago, Dallas, Houston)
**HIGH:** Zero reviews · No FAQPage schema (content exists) · Anton Andersson "PHOTO" placeholder live in production · No street address publicly
**MEDIUM:** No author bylines on blog · "Est. 2017" buried · `/team` page <500 words · Team bios missing last names + LinkedIn

### Schema (55/100) — see `schema-audit.md`
**CRITICAL:** No `aggregateRating` or `review`
**HIGH:** No BreadcrumbList anywhere · No Service schema on service pages · No BlogPosting on blog
**MEDIUM:** `@type` should be `["LocalBusiness", "ProfessionalService"]` with `@id` anchor · `streetAddress` missing from PostalAddress · `logo` should be ImageObject

### Local SEO (34/100) — see `local-audit.md`
**CRITICAL:** Wisconsin area code on Virginia business · GBP not linked from site · Zero reviews · 6 doorway pages
**HIGH:** No Google Maps embed on `/contact` · No street address publicly · Facebook sameAs probably broken
**MEDIUM:** Citations not standardized (Yelp, BBB, Houzz unconfirmed)

### On-Page SEO (78/100)
- ✅ Unique title + description on all 32 public pages (verified — see `metadata-by-url.md` from prior session)
- ✅ All meta descriptions under 160 chars
- ✅ Keywords appropriately scoped per page
- ✅ Single `<h1>`, 7 `<h2>` on homepage — clean hierarchy
- ⚠️ Only homepage has explicit `canonical` (others rely on Next.js `metadataBase`)
- ⚠️ Only homepage has Twitter card override (others inherit from layout)
- ⚠️ `/catalogs` is the only public page missing `keywords` + OG override

### Performance / CWV (85/100 — source signals only)
- ✅ Hero images use `next/image priority` → SSR `<link rel=preload>` injected (LCP-correct)
- ✅ AVIF + WebP enabled, 1-year cache TTL, served from Supabase CDN
- ✅ All 3 analytics scripts (`afterInteractive`) — deferred past TTI
- ✅ Font preloading configured
- ⚠️ Framer Motion (~30KB gzip) heaviest interactive dep — monitor real-user INP
- ⚠️ No CrUX field data available — recommend running CrUX/Search Console once GA traffic ramps

### AI Search Readiness / GEO (61/100)
- ✅ Service-page FAQ content well-structured for AI Overview extraction
- ✅ Pricing tiers ($399/$799/$1,299 on `/wedding-floor-wrap`) directly quotable
- ✅ Verifiable specs (LED 50K hrs, ADA Grade 2 Braille, vinyl brands)
- ❌ No FAQPage JSON-LD (content exists)
- ❌ No definitional content on homepage
- ❌ No author/expertise signals on blog
- ❌ No `llms.txt`

### Images (80/100)
- ✅ Modern formats (AVIF/WebP)
- ✅ `next/image` with `fill` + `sizes` everywhere — no CLS risk
- ✅ Alt text descriptive (e.g. "AURORA & OAK CHANNEL LETTERS", "BREWERY WINDOW WRAP") — sample shows ALL CAPS but content-rich
- ⚠️ No `ImageObject` schema for portfolio images
- ⚠️ Logo is bare URL string, not ImageObject

---

## Strengths Worth Preserving

- HSTS configured (2-year max-age)
- Comprehensive WordPress legacy 301 redirects
- Server-rendered Next.js — full SEO content in initial HTML
- LocalBusiness JSON-LD on every page (good base — needs reviews + improvements)
- Sitemap auto-generated with priority tiers (homepage 1.0, services 0.9, locations 0.7, blog 0.6)
- robots.txt correctly protects `/admin/`, `/api/`, `/sign/`
- 32 unique meta titles + descriptions (per metadata extraction)
- Modern image stack (AVIF, WebP, CDN-cached, lazy-loaded)
- GA4 + Microsoft Clarity + Meta Pixel correctly gated (disabled on `/admin/*` and `/sign/*`)
- Industry-correct LocalBusiness schema with `hasOfferCatalog` listing all 7 services

---

## Files Generated

```
seo-audit/
├── FULL-AUDIT-REPORT.md       (this file)
├── ACTION-PLAN.md             (prioritized tickets)
├── technical-audit.md         (74/100)
├── content-audit.md           (56/100)
├── schema-audit.md            (55/100)
├── local-audit.md             (34/100 — REVIEWS GAP)
├── homepage.html              (raw HTML snapshot)
├── robots.txt                 (raw)
└── sitemap.xml                (raw)
```
