# Google Ads Plan — Printec Virginia LLC

**Date:** 2026-03-28
**Budget:** $100 test (30 days)
**Goal:** Form submissions (quote requests)
**Services:** Wall Wraps + Floor Wraps
**Area:** Virginia + Maryland + Washington D.C.

## Approach

Single Search campaign with 2 ad groups (~$50 each). Maximize Clicks bidding with max CPC cap of $5. Exact match + phrase match keywords only — no broad match at this budget.

## Campaign Structure

- **Campaign Name:** `Printec – Wall & Floor Wraps – DMV`
- **Type:** Search
- **Budget:** $100 total (~$3.30/day for 30 days)
- **Bidding:** Maximize Clicks (max CPC cap: $5)
- **Locations:** Virginia, Maryland, Washington D.C.
- **Schedule:** Mon–Sat, 8AM–7PM
- **Networks:** Search only (no Display, no Search Partners)

## Ad Group 1: Wall Wraps (~$50)

### Keywords

| Keyword | Match Type |
|---------|-----------|
| "wall wrap company" | Phrase |
| "wall wraps near me" | Phrase |
| "wall wrap installation" | Phrase |
| "custom wall wraps" | Phrase |
| [wall wraps virginia] | Exact |
| [wall wrap company dc] | Exact |
| [commercial wall wraps] | Exact |
| "wall mural wrap" | Phrase |

### Ad Copy

| Element | Copy |
|---------|------|
| Headline 1 | Custom Wall Wraps – DMV Area |
| Headline 2 | Transform Any Wall – Free Quote |
| Headline 3 | Printec Virginia LLC |
| Headline 4 | Commercial & Residential Wraps |
| Headline 5 | Professional Installation |
| Description 1 | Virginia's premier wall wrap company. Custom murals, branded walls & graphics. Get a free quote today — fast turnaround. |
| Description 2 | Serving VA, MD & DC. High-quality wall wraps for offices, restaurants, retail & events. Call or request a quote online. |
| Final URL | https://printecwrap.com/wall-wraps |
| Sitelinks | Portfolio, Contact Us, Floor Wraps, About Us |

## Ad Group 2: Floor Wraps (~$50)

### Keywords

| Keyword | Match Type |
|---------|-----------|
| "floor wrap company" | Phrase |
| "dance floor wraps" | Phrase |
| "dance floor wrap for wedding" | Phrase |
| "floor wraps near me" | Phrase |
| [dance floor wraps virginia] | Exact |
| [wedding floor wrap] | Exact |
| [custom floor wraps] | Exact |
| "event floor graphics" | Phrase |

### Ad Copy

| Element | Copy |
|---------|------|
| Headline 1 | Dance Floor Wraps – Custom Design |
| Headline 2 | Wedding & Event Floor Wraps |
| Headline 3 | Printec Virginia LLC |
| Headline 4 | Free Quote – Fast Turnaround |
| Headline 5 | Serving VA, MD & DC |
| Description 1 | Stunning custom dance floor wraps for weddings, galas & corporate events. Premium vinyl, professional install. Free quote! |
| Description 2 | Virginia's top floor wrap company. Custom designs, durable materials, quick turnaround. Serving the entire DMV area. |
| Final URL | https://printecwrap.com/dance-floor-wraps |
| Sitelinks | Portfolio, Contact Us, Wall Wraps, Wedding Floor Wraps |

## Negative Keywords (Shared)

DIY, tutorial, how to, free, cheap, wholesale, jobs, salary, career, training, course, template, photoshop, illustrator, software

## Conversion Tracking

Already set up via GA4 (G-6K8LW0P8B9):

| Conversion | GA4 Event | Type |
|-----------|-----------|------|
| Quote form submission | `generate_lead` | Primary conversion |
| Phone call clicks | `phone_click` | Secondary (observation) |
| CTA button clicks | `cta_click` | Secondary (observation) |

### Setup Steps
1. Link GA4 property (G-6K8LW0P8B9) to Google Ads account
2. Import `generate_lead` as primary conversion in Google Ads
3. Import `phone_click` as secondary conversion (observation only)

## Landing Pages

| Ad Group | Landing Page | URL |
|----------|-------------|-----|
| Wall Wraps | Wall Wraps service page | /wall-wraps |
| Floor Wraps | Dance Floor Wraps service page | /dance-floor-wraps |
| Sitelink: Wedding | Wedding Floor Wrap SEO page | /wedding-floor-wrap |

No new pages needed — existing service pages have CTAs, contact forms, and portfolio images.

## Success Metrics (30-day test)

| Metric | Target |
|--------|--------|
| Clicks | 20–40 (at ~$2.50–$5 CPC) |
| CTR | 3%+ |
| Form submissions | 1–3 leads |
| Cost per lead | $30–$100 |

## Decision Framework After 30 Days

- **Got leads at <$50/lead?** → Scale budget to $300–$500/mo
- **Got clicks but no leads?** → Review landing pages, tighten keywords
- **Low impressions?** → Expand to phrase match, add more keywords
- **One ad group outperforms?** → Shift budget to winner

## UTM Parameters

Use these UTM parameters on all ad URLs for tracking in existing contact form:

- Wall Wraps: `?utm_source=google&utm_medium=cpc&utm_campaign=wall-wraps-dmv`
- Floor Wraps: `?utm_source=google&utm_medium=cpc&utm_campaign=floor-wraps-dmv`

These will be captured by the contact form and saved to the inquiries table, visible in admin statistics (UTM Campaign Breakdown chart).
