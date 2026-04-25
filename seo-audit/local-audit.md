# Local SEO Audit — Printec Virginia LLC
**URL:** https://printecwrap.com — **Date:** 2026-04-25

## Local SEO Score: 34 / 100

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|---------|
| GBP Signals | 25% | 20/100 | 5.0 |
| Reviews & Reputation | 20% | **0/100** | **0.0** |
| Local On-Page SEO | 20% | 60/100 | 12.0 |
| NAP Consistency | 15% | 40/100 | 6.0 |
| Local Schema | 10% | 65/100 | 6.5 |
| Local Authority Signals | 10% | 45/100 | 4.5 |

**Business type:** Hybrid (SAB with declared shop in Woodbridge, VA)
**Industry:** Sign Company / Graphics & Wraps

---

## CRITICAL: NAP Inconsistency

| Source | Address | Phone |
|--------|---------|-------|
| JSON-LD schema (layout.tsx) | Woodbridge, VA 22191 | +1-715-503-5444 |
| Footer | Woodbridge, VA 22191 | (715) 503-5444 |
| Contact page body copy | "Virginia, USA" (no street) | (715) 503-5444 |
| CLAUDE.md docs | "no specific street address shown publicly" | — |

### Issue 1: Wisconsin area code on a Virginia business
`(715)` is northern Wisconsin (Wausau/Eau Claire). Google cross-references area code with declared address for GBP trust scoring. A WI number for a VA address is a **geographic trust mismatch** that can:
- Suppress Local Pack rankings
- Trigger GBP re-verification holds
- Lock the mismatch into every citation built before correction

### Issue 2: Address inconsistency between schema and body copy
Schema says "Woodbridge, VA 22191" but contact page reads "Virginia, USA" with no street. Googlebot sees conflicting NAP signals on a single crawl.

### Issue 3: Facebook sameAs URL likely broken
`https://www.facebook.com/printecvirginia` may not be a valid vanity URL — project docs reference share URL `/share/1E2N8msTsc/` instead.

---

## Reviews & Reputation: 0/100 — TOTAL GAP

| Element | Status |
|---------|--------|
| Customer testimonials on site | NONE |
| Review widget (Google/Yelp) | NONE |
| `aggregateRating` in JSON-LD | MISSING |
| `Review` schema entities | MISSING |
| Outbound links to review platforms | NONE |
| Review velocity history | UNKNOWN |

**This is the largest scoring gap in the audit.** Per Sterling Sky's "18-day rule," GBP rankings drop sharply if a profile goes 3 weeks without a new review. Sign companies are high-trust purchases — competitors with 4.8★ + 80 reviews will consistently outrank and outconvert this site.

### Reviews Action Plan

**Phase 1 — Collect (Weeks 1–4)**
- Claim/verify Google Business Profile if not already done
- Send every past customer the direct GBP review link: `https://g.page/r/[PLACE_ID]/review`
- Add a 7-day post-job email asking for a Google review
- Target: 10 verified reviews in 30 days
- Secondary platforms: Yelp, Facebook Reviews, Houzz (relevant for B2B sign clients), BBB
- Velocity goal: ≥1 new Google review every 18 days

**Phase 2 — Display (Weeks 3–6)**
Pick one:
1. **Static testimonials** (cheapest): hardcode 5–10 real quotes with first name + business name + city + rating
2. **Live widget** ($9/mo): Elfsight or `react-google-reviews` library
3. **Dedicated `/reviews` page** with "Leave a Review" CTA → GBP shortlink

**Phase 3 — Schema (after 5+ real reviews exist)**
Add to the JSON-LD in `src/app/layout.tsx`:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "23",
  "bestRating": "5",
  "worstRating": "1"
},
"review": [
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Jane D." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "Printec did our storefront channel letters in two days. Incredible quality.",
    "datePublished": "2026-03-15"
  }
]
```

**Critical:** Never invent ratings. Inflated/fake `aggregateRating` is a Google manual-action risk. Pull real numbers from your GBP dashboard.

---

## GBP Signals: 20/100

Nothing on the site connects to a Google Business Profile:
- No Google Maps embed anywhere
- No GBP profile link in footer or contact page
- No Place ID referenced
- No "See us on Google" CTA

GBP category selection is the **#1 local ranking factor** (Whitespark 2026). Without a verified, optimized GBP linked from the site, Google can't tie the website and the business entity together.

---

## Multi-Location Page Quality: Doorway-Page Risk

**9 location pages — DMV trio acceptable, non-DMV six are doorway-page risk.**

✅ **Acceptable (DMV):** Virginia, Washington DC, Maryland — defensible given Woodbridge proximity (30mi to DC, 45mi to Baltimore).

❌ **Doorway-page risk:** Seattle, NYC, LA, Chicago, Dallas, Houston
- All use the same template with city name + 1 swapped adjective per service
- All show Woodbridge VA address in footer
- All show Wisconsin (715) phone
- Zero local case studies, project photos, client names
- No Maps embed, no proof of physical presence
- **Swap test fails:** Replace "Dallas" with "Denver" → page reads identically

Under Google's September 2025 doorway page policy, these qualify as doorway pages and risk a manual action.

**Fix options:**
- **Option A (safest):** 301-redirect all 6 non-DMV pages to `/locations/virginia` or `/contact`
- **Option B:** Rebuild with real project photos, client testimonials from each city, and honest "we ship/travel for large projects" framing — not a fake local-office simulation

---

## Local Schema Validation

**Current `@type`:** `LocalBusiness` — correct (no schema.org subtype exists for sign companies).

| Property | Status | Issue |
|----------|--------|-------|
| `name` | ✅ | — |
| `address.streetAddress` | ❌ | MISSING — only locality/region/postalCode |
| `telephone` | ⚠️ | WI area code mismatch with VA address |
| `url`, `email` | ✅ | — |
| `geo` | ✅ | 4 decimals; recommend 5 for precision |
| `openingHoursSpecification` | ✅ | Correctly defined |
| `aggregateRating` | ❌ | MISSING |
| `review` | ❌ | MISSING |
| `priceRange` | ✅ | "$$" |
| `areaServed` | ✅ | VA, MD, DC — appropriately scoped |
| `sameAs` | ⚠️ | Facebook URL may not resolve |

---

## Top 10 Prioritized Actions

### CRITICAL
1. **Replace (715) 503-5444** with a Virginia area code (571, 703, or 804) **everywhere simultaneously** — site, schema, GBP, citations. Single most impactful change.
2. **Claim, verify, and optimize Google Business Profile.** Set primary category "Sign Shop," upload 10+ photos, link the website URL.
3. **Begin collecting Google reviews immediately.** Target 10 in 30 days.

### HIGH
4. **Embed Google Maps on `/contact`** — direct on-page GBP signal + conversion trust.
5. **Remove or rebuild the 6 non-DMV location pages.** 301-redirect them or replace with genuine national project portfolios.
6. **Add `aggregateRating` to JSON-LD** after 5+ real Google reviews are collected.
7. **Add `streetAddress` to PostalAddress** and align body copy to "Woodbridge, VA."

### MEDIUM
8. **Add static testimonials section to homepage** — bridge while collecting Google reviews.
9. **Fix Facebook sameAs URL** in `layout.tsx` line 140.
10. **Claim Yelp, BBB, Houzz citations** — but only AFTER fixing the phone number, otherwise the WI mismatch propagates.

---

## Limitations

The following require paid tools or authenticated access:
- GBP live data (review count, rating, photos, Q&A) → DataForSEO or GBP dashboard
- Local Pack positions → DataForSEO `google_local_pack_serp`
- Yelp / BBB live citation status → BrightLocal or Whitespark
- Backlink profile → Ahrefs/Moz/Semrush
- Spam/suspension risk on GBP — check the dashboard directly for verification holds
