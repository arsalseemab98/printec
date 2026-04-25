# Action Plan — printecwrap.com

Prioritized by impact × effort. Each item has a concrete fix location.

---

## CRITICAL (this week)

### 1. Fix the phone number — Wisconsin → Virginia area code
**Effort:** External (acquire VA number) + ~30 min code/citations
**Impact:** Highest — unlocks GBP trust + Local Pack eligibility

- Acquire a 571, 703, or 804 number (Google Voice, Twilio, or local carrier)
- Update simultaneously:
  - `src/app/layout.tsx` line 121 (`telephone`)
  - `src/components/layout/footer.tsx` (NAP block)
  - All page copy with phone (homepage, contact, FAB chat)
  - Social bios (Instagram, Facebook, TikTok)
  - Google Business Profile
  - Google Ads campaign
  - Print materials, business cards
- **Don't build any new citations until this is done** — you'd permanently embed the WI mismatch.

### 2. Claim/optimize Google Business Profile
**Effort:** 1–2 hours
**Impact:** #1 local ranking factor (Whitespark 2026)

- Verify ownership at business.google.com
- Primary category: **Sign Shop** (or "Graphics Designer" if SS unavailable)
- Add website URL → printecwrap.com
- Upload ≥10 photos (workshop, finished signs, team)
- Set hours to match `openingHoursSpecification` in JSON-LD
- Enable messaging
- Get the GBP review shortlink: `https://g.page/r/[PLACE_ID]/review`

### 3. Reviews collection program
**Effort:** ~2 hours setup + ongoing
**Impact:** Highest single trust gap on the site

- Email every past customer the GBP review shortlink
- Add post-job review request to email automation (T+7 days)
- Target 10 Google reviews in 30 days
- Velocity goal: ≥1 every 18 days
- Secondary: Yelp, Facebook, Houzz, BBB

### 4. Remove or rebuild 6 doorway location pages
**Effort:** 1 hour (redirects) or 1+ week (real rebuild)
**Impact:** Avoid Google manual action; preserve domain trust

**Fastest fix:** add to `next.config.ts` redirects:
```ts
{ source: "/locations/seattle", destination: "/locations/virginia", permanent: true },
{ source: "/locations/new-york", destination: "/locations/virginia", permanent: true },
{ source: "/locations/los-angeles", destination: "/locations/virginia", permanent: true },
{ source: "/locations/chicago", destination: "/locations/virginia", permanent: true },
{ source: "/locations/dallas", destination: "/locations/virginia", permanent: true },
{ source: "/locations/houston", destination: "/locations/virginia", permanent: true },
```
Then delete the directories from `src/app/locations/` and remove from `sitemap.ts`.

**Alternative:** Rebuild each with real project photos from that city, client testimonials, honest "we ship/travel" framing.

---

## HIGH (within 1 week)

### 5. Change www → non-www redirect from 307 to 301
**Effort:** 2 minutes in Vercel Dashboard
- Settings → Domains → www.printecwrap.com → set redirect type to "Permanent (301)"

### 6. Remove AhrefsBot + SemrushBot from robots.txt
**Effort:** 2 minutes
- Edit `src/app/robots.ts` and remove the `AhrefsBot` and `SemrushBot` user-agent disallows.

### 7. Add security headers
**Effort:** 15 minutes
Edit `next.config.ts`:
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

### 8. Noindex gated catalog pages
**Effort:** 5 minutes
In `src/app/catalogs/[slug]/page.tsx`:
```ts
export const metadata: Metadata = {
  // ...
  robots: { index: false, follow: true },
};
```
OR remove from `src/app/sitemap.ts`.

### 9. Fix Anton's missing photo
**Effort:** 30 min
Either get a real photo of Anton Andersson, or hide his card until you have one. Currently renders as the literal text "PHOTO" on `/team`.

### 10. Add street address to footer + JSON-LD
**Effort:** 10 minutes
- Add `streetAddress` field to `PostalAddress` in `src/app/layout.tsx` line 124
- Update footer to show full street address
- Update `/contact` page body copy to "Woodbridge, VA 22191" instead of "Virginia, USA"

### 11. Embed Google Maps on /contact
**Effort:** 15 minutes
After GBP is claimed, get the embed iframe from "Share → Embed a map" and drop into `src/app/contact/page.tsx`.

---

## MEDIUM (within 1 month)

### 12. Add static testimonials section to homepage
Even 3 real customer quotes (first name + business + city + rating) is the single highest-ROI trust improvement before the live Google reviews widget is set up.

### 13. Schema upgrades (after first 5 real Google reviews are live)
In `src/app/layout.tsx`:
- Change `@type` to `["LocalBusiness", "ProfessionalService"]`
- Add `@id`: `https://printecwrap.com/#business`
- Add `aggregateRating` (REAL data from GBP)
- Add 3–5 `Review` entities (REAL reviews)
- Convert `logo` from string to `ImageObject` with width/height
- Verify Facebook `sameAs` URL resolves

### 14. Add BreadcrumbList JSON-LD to all inner pages
Pattern in `schema-audit.md`. Add to layout helpers for service + location + blog pages.

### 15. Add BlogPosting schema to /blog/[slug]
Use existing `post` object. Pattern in `schema-audit.md`.

### 16. Add Service schema to each service page
9 service pages — repeat the template from `schema-audit.md`.

### 17. Add FAQPage schema where FAQ content exists
`/business-signage`, `/custom-neon-signs`, `/wedding-floor-wrap`. Note: AI/GEO benefit only — Google removed FAQ rich results for commercial sites in 2023.

### 18. Strengthen team bios
Add last names, years of experience, LinkedIn links, and certifications (CSM if any).

### 19. Sitemap lastmod cleanup
`src/app/sitemap.ts` — replace `new Date()` with static date strings for stable pages (about, team, locations).

### 20. Disable AutoRefresh on public pages
Move the `/api/version` polling out of public site routes; gate to admin only.

---

## LOW (backlog)

### 21. IndexNow protocol
Generate a key at bing.com/indexnow, place `.txt` file in `/public/`, POST to `https://api.indexnow.org/indexnow` on new content publish.

### 22. Add `llms.txt` for AI search optimization
Plain-text file at `/public/llms.txt` describing the site for LLM crawlers.

### 23. Author bylines on blog posts
Link blog post authorship to team-member profile cards.

### 24. Surface "Established 2017" on homepage hero
Currently buried on `/about` and `/wedding-floor-wrap` only.

### 25. Delete orphan directories
Remove `src/app/vinyl-wraps/`, `src/app/custom-signs/`, `src/app/demo/` (currently 404 with no `page.tsx`).

### 26. Standardize Tier 1 citations (AFTER phone fix)
Yelp, BBB, Houzz, Angi, Thumbtack — all with corrected NAP.

---

## Effort Summary

| Tier | Items | Total Effort |
|------|-------|--------------|
| Critical | 4 | 1 day setup + ongoing |
| High | 7 | ~2 hours total |
| Medium | 9 | ~1 week part-time |
| Low | 6 | Backlog |

**Single biggest needle-mover:** Fix the phone number + claim GBP + collect 10 reviews. That moves Local SEO from 34 → 70+ and the overall SEO Health Score from 58 → 75+.
