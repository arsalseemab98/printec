# Content Quality & E-E-A-T Audit — printecwrap.com
**Date:** 2026-04-25 — **Score: 56/100**

## E-E-A-T Scores (Weighted)

| Factor | Weight | Score | Key Signal |
|--------|--------|-------|------------|
| Experience | 20% | 38 | Founded 2017 mentioned on /about + /wedding-floor-wrap only — absent from homepage hero and all out-of-area location pages. Zero project case studies or named client references. |
| Expertise | 25% | 62 | Technically accurate: LED neon lifespan (50,000 hrs), ADA Grade 2 Braille, 3M/Avery vinyl, CNC router specs. `/business-signage` FAQ is the strongest expertise signal. No certifications (CSM, ISA) surfaced. |
| Authoritativeness | 25% | 28 | No external citations, press, awards. Team bios lack last names (Nomi, Aryan W.), credentials, LinkedIn. Anton Andersson has no photo (renders "PHOTO" placeholder). No reviews. |
| Trustworthiness | 30% | 44 | Phone + email visible. No street address publicly ("Virginia, USA"). Warranty terms only on `/business-signage` FAQ. **No review widget, BBB badge, or social proof anywhere.** |

**Weighted E-E-A-T Score: 43/100**

## Word Count Audit

| Page | Words | Min | Status |
|------|-------|-----|--------|
| / (homepage) | n/a — client component | 500 | Cannot audit from `page.tsx` shell |
| /about | ~600 | 500 | PASS (barely) |
| /team | ~450 | 500 | FAIL |
| /business-signage | ~1,100 | 800 | PASS — strongest |
| /custom-neon-signs | ~980 | 800 | PASS |
| /wedding-floor-wrap | ~900 | 800 | PASS |
| /locations/virginia | ~750 | 500–600 | PASS — legitimate |
| /locations/los-angeles | ~550 | 500–600 | BORDERLINE |
| /locations/chicago | ~510 | 500–600 | BORDERLINE |

## Confirmed: Doorway Page Pattern (Non-DMV Locations)

All 6 out-of-area location pages (Seattle, NYC, LA, Chicago, Dallas, Houston) use an identical 4-section template with city name swapped + 1 adjective per service.

**200-character opener comparison:**

> Chicago: "Professional signage solutions for Chicago businesses — from the Loop to Lincoln Park, we design, fabricate, and install signs that get noticed."

> Dallas: "Bold signage solutions for Dallas businesses — from Deep Ellum to Uptown, we design, fabricate, and install signs that make an impact."

The sentence is a direct template substitution: `[adjective] signage solutions for [City] businesses — from [Neighborhood A] to [Neighborhood B], we design, fabricate, and install signs that [generic phrase].`

`/business-signage` explicitly states fabrication happens "in our Virginia facility." There's no evidence of physical presence, staff, or completed projects in any out-of-area city. **Under September 2025 QRG, these qualify as doorway pages.**

## Team Page E-E-A-T Gaps

Present: 5 named members, 4 photos, ~50-word bios, shared email/phone.

Missing — all critical:
- No last names for Nomi or Aryan W.
- No years of experience for any member
- No educational credentials or certifications
- No LinkedIn links
- No ISA membership or Certified Sign Maker (CSM) designation
- No author attribution on blog posts
- **Anton Andersson's missing photo renders as "PHOTO" text in production — active trust failure**

## AI Citation Readiness: 61/100

**Strengths:**
- `/business-signage` and `/custom-neon-signs` FAQ sections are well-structured for AI Overview extraction
- Wedding pricing tiers ($399 / $799 / $1,299) are directly quotable
- LED neon specs (50,000 hrs, 12V DC, UL-listed) are verifiable facts

**Gaps:**
- No FAQPage JSON-LD schema (content exists, markup doesn't)
- No FAQ on `/about`, `/team`, or `/locations/virginia`
- No definitional content on homepage ("What is a channel letter sign?")

## Readability

Estimated Flesch ~62–68 (Standard). Short paragraphs, low-to-moderate sentence complexity. Appropriate for SMB audience. No flags.

## Prioritized Recommendations

### CRITICAL — Doorway Page Risk
1. **Remove or substantively differentiate all 6 out-of-area location pages.** Fastest compliant fix: 301-redirect Seattle/NYC/LA/Chicago/Dallas/Houston to `/locations/virginia` or a single "We Ship Nationwide" page. Alternative: each page needs a real completed-project photo from that market, a client testimonial from that city, and genuine narrative explaining how remote orders work.

### HIGH — Trust Gaps
2. **Add Google Reviews widget immediately.** Even 5 reviews would be the single highest-ROI trust improvement on the site.
3. **Add FAQPage JSON-LD schema** to `/business-signage` and `/custom-neon-signs` — content exists, markup doesn't.
4. **Strengthen team bios:** add last names, years of experience, LinkedIn links. Get Anton's photo into production.
5. **Add a real street address** to footer and `/contact`. "Virginia, USA" doesn't satisfy quality-rater trust signals.

### MEDIUM — Authority & Freshness
6. **Add author bylines to blog posts** linking to team profile cards.
7. **Surface "Established 2017"** on the homepage hero — currently buried on `/about` and `/wedding-floor-wrap` only.
8. **Replace the "100% Satisfaction Rate" stat** on `/about` with a verifiable metric once reviews are collected.
9. **Add "Last reviewed: [Month Year]"** to service-page footers.

### LOW — AI Citation Polish
10. Add "What is a dance floor wrap?" definitional section to `/wedding-floor-wrap`.
11. Add FAQPage schema to `/wedding-floor-wrap` — pricing tiers make it a strong AI Overview candidate.
