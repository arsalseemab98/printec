# Marketing — Printec Virginia LLC

## Google Ads

### Active Campaign

**Campaign:** `Printec – Wall & Floor Wraps – DMV`
- **Status:** Planned (not yet live)
- **Budget:** $100/month test
- **Bidding:** Maximize Clicks (max CPC: $5)
- **Locations:** Virginia, Maryland, Washington D.C.
- **Schedule:** Mon–Sat, 8AM–7PM
- **Networks:** Search only

### Ad Groups

| Ad Group | Budget | Landing Page | Keywords |
|----------|--------|-------------|----------|
| Wall Wraps | ~$50 | /wall-wraps | wall wrap company, wall wraps near me, custom wall wraps, wall wrap installation, wall wraps virginia, wall wrap company dc, commercial wall wraps, wall mural wrap |
| Floor Wraps | ~$50 | /dance-floor-wraps | floor wrap company, dance floor wraps, dance floor wrap for wedding, floor wraps near me, dance floor wraps virginia, wedding floor wrap, custom floor wraps, event floor graphics |

### Negative Keywords
DIY, tutorial, how to, free, cheap, wholesale, jobs, salary, career, training, course, template, photoshop, illustrator, software

### UTM Parameters
- Wall Wraps: `?utm_source=google&utm_medium=cpc&utm_campaign=wall-wraps-dmv`
- Floor Wraps: `?utm_source=google&utm_medium=cpc&utm_campaign=floor-wraps-dmv`

### Conversion Tracking
- **Primary:** `generate_lead` (GA4 event → imported to Google Ads)
- **Secondary:** `phone_click` (observation only)
- **GA4 Property:** G-6K8LW0P8B9
- **Linking:** GA4 must be linked to Google Ads account

### Test Targets (30 days)
| Metric | Target |
|--------|--------|
| Clicks | 20–40 |
| CTR | 3%+ |
| Leads | 1–3 |
| Cost/Lead | $30–$100 |

### Scaling Decision
- Leads at <$50/lead → Scale to $300–$500/mo
- Clicks but no leads → Optimize landing pages
- Low impressions → Expand keywords
- One ad group wins → Shift budget to winner

---

## Analytics Setup

### Google Analytics 4
- **Measurement ID:** G-6K8LW0P8B9
- **Events tracked:** generate_lead, catalog_email_capture, phone_click, email_click, whatsapp_click, cta_click
- **Helper:** `src/lib/gtag.ts`
- **Disabled on:** /admin/*, /sign/*

### Microsoft Clarity
- **Project ID:** vzki5lbs56
- **Disabled on:** /admin/*, /sign/*

### UTM Tracking
- Contact form captures: utm_source, utm_medium, utm_campaign, utm_term, utm_content
- Visible in admin statistics → UTM Campaign Breakdown chart
- Page source also tracked (which page form was submitted from)

---

## SEO

### Service Pages (7 main)
- /business-signage
- /dance-floor-wraps (nav label: "Floor Wraps")
- /wall-wraps
- /window-wraps
- /channel-letters-signage
- /custom-neon-signs
- /food-truck-wraps

### SEO Landing Pages (4)
- /led-channel-letters
- /channel-letter-signs-near-me
- /storefront-window-graphics
- /wedding-floor-wrap

### Location Pages (9)
- /locations/virginia
- /locations/maryland
- /locations/washington-dc
- /locations/seattle
- /locations/new-york
- /locations/los-angeles
- /locations/chicago
- /locations/dallas
- /locations/houston

### Technical SEO
- Unique meta title + description on all 32 pages
- JSON-LD LocalBusiness schema
- sitemap.xml (auto-generated, priority tiers)
- robots.txt
- OpenGraph + Twitter cards
- Canonical URL on homepage

---

## Social Media
- **Instagram:** https://www.instagram.com/printecvirginia/
- **Facebook:** https://www.facebook.com/share/1E2N8msTsc/
- **TikTok:** https://www.tiktok.com/@printec.va

---

## Contact Channels
- **Phone:** (715) 503-5444
- **Email:** info@printecwrap.com
- **WhatsApp:** (715) 503-5444
- **Website:** https://printecwrap.com
