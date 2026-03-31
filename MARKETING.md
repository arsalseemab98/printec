# Marketing — Printec Virginia LLC

## Google Ads

### Account
- **Google Ads Account:** 342-087-0676
- **GA4 Linked:** Yes (Property ID: 530146539)

### Active Campaign — Search

**Campaign:** `Printec – Wall & Floor Wraps – Search`
- **Status:** Draft ready to publish
- **Type:** Search only (text ads on Google Search results)
- **Budget:** $300/month ($10/day)
- **Bidding:** Maximize Clicks
- **Locations:** Virginia, Maryland, District of Columbia
- **Schedule:** All day (can be adjusted to Mon–Sat 8AM–7PM after launch)
- **Networks:** Search only (no Display, no Search Partners)
- **Estimated:** 155 weekly clicks, $0.45 avg CPC, $70/week

### Keywords (72 total across 7 services)

| Service | Landing Page | Keywords |
|---------|-------------|----------|
| Wall Wraps (16) | /wall-wraps | wall wrap company, wall wraps near me, custom wall wraps, wall wrap installation, wall wraps virginia, wall wrap company dc, commercial wall wraps, wall mural wrap, wall graphics company, wall mural installation, vinyl wall wrap, office wall wraps, restaurant wall wrap, wall wrap printing near me, interior wall wraps, branded wall wraps |
| Floor Wraps (16) | /dance-floor-wraps | floor wrap company, dance floor wraps, dance floor wrap for wedding, floor wraps near me, dance floor wraps virginia, wedding floor wrap, custom floor wraps, event floor graphics, dance floor decal, floor graphics for events, vinyl floor wrap, custom dance floor, wedding dance floor decal, event floor decal, floor wrap printing, dance floor sticker |
| Window Wraps (8) | /window-wraps | window wraps near me, storefront window graphics, business window decals, commercial window graphics, window wrap installation, frosted window film, perforated vinyl windows, store window graphics |
| Channel Letters (8) | /channel-letters-signage | channel letters near me, LED channel letters, illuminated business signs, channel letter installation, custom channel letter signs, LED signs virginia, business sign installation, sign company virginia |
| Custom Neon Signs (8) | /custom-neon-signs | custom neon signs, LED neon signs, neon signs for business, custom LED neon signs, neon sign maker near me, wedding neon signs, restaurant neon signs, logo neon signs |
| Food Truck Wraps (8) | /food-truck-wraps | food truck wraps, food truck wrap design, custom food truck wrap, food truck graphics, food trailer wrap, food truck vinyl wrap, food truck branding, catering truck wrap |
| Business Signage (8) | /business-signage | business signage near me, commercial signage, storefront signage, office signs virginia, sign design and installation, commercial sign company, retail signage, illuminated signs |

### Negative Keywords
DIY, tutorial, how to, free, cheap, wholesale, jobs, salary, career, training, course, template, photoshop, illustrator, software

### UTM Parameters
- Wall Wraps: `?utm_source=google&utm_medium=cpc&utm_campaign=wall-wraps-dmv`
- Floor Wraps: `?utm_source=google&utm_medium=cpc&utm_campaign=floor-wraps-dmv`

### Conversion Tracking
- **Primary:** `generate_lead` (GA4 event → imported to Google Ads)
- **Secondary:** `phone_click` (observation only)
- **GA4 Property:** G-6K8LW0P8B9
- **Linking:** GA4 linked to Google Ads (confirmed)
- **Import Status:** "Contacts" goal added (tracks printecwrap.com/contact). GA4 `generate_lead` import pending (needs event data first)

### Targets (30 days at $300/mo)
| Metric | Target |
|--------|--------|
| Clicks | 60–120 |
| CTR | 3%+ |
| Leads | 3–6 |
| Cost/Lead | $50–$100 |

### Scaling Decision
- Leads at <$50/lead → Scale to $500–$800/mo
- Clicks but no leads → Optimize landing pages
- Low impressions → Expand keywords
- One ad group wins → Shift budget to winner

### Setup TODO
1. ~~Create Google Ads account~~ ✅ (342-087-0676)
2. ~~Link GA4 property~~ ✅ (530146539)
3. ~~Remove Performance Max campaign~~ ✅ (permanently removed)
4. ~~Create Search campaign draft~~ ✅ (Bidding: Maximize Clicks, Networks: Search only)
5. ~~Add locations~~ ✅ (Virginia, Maryland, District of Columbia)
6. ~~Add 72 keywords~~ ✅ (all 7 services: wall wraps, floor wraps, window wraps, channel letters, neon signs, food truck wraps, business signage)
7. ~~Add ad copy~~ ✅ (5 headlines + 2 descriptions)
8. ~~Set budget $10/day~~ ✅
9. ~~GA4 verified on live site~~ ✅ (gtag loading, G-6K8LW0P8B9 configured, dataLayer active)
10. ~~generate_lead event verified~~ ✅ (fires from contact form, catalog viewer, floating widget)
11. ~~Add "Contacts" conversion goal~~ ✅ (tracks /contact page)
12. Publish campaign (click Publish in Review step)
13. Complete advertiser verification (Google requires before ads run)
14. Import GA4 `generate_lead` as conversion (after first form submission registers in GA4)
15. Import GA4 `phone_click` as secondary conversion (observation only)

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
