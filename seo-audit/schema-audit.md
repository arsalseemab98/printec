# Schema / Structured Data Audit — printecwrap.com
**Date:** 2026-04-25

## What's Currently Present

A single `LocalBusiness` JSON-LD block in `src/app/layout.tsx` (rendered on every page). Structurally valid. Includes name, address, geo, telephone, openingHours, areaServed, hasOfferCatalog (7 services), sameAs (3 social), priceRange.

## What's Missing

| Page | Missing Schema | Priority |
|------|---------------|----------|
| Root layout (every page) | `aggregateRating`, `review` | **Critical** |
| Root layout | `@type` array (LocalBusiness + ProfessionalService), `@id` anchor, `logo` as ImageObject, `streetAddress` | Medium |
| All inner pages | `BreadcrumbList` | High |
| 9 service pages | `Service` schema | High |
| Service pages with FAQ data | `FAQPage` | Medium |
| `/blog/[slug]` | `BlogPosting` | High |
| Location pages | `BreadcrumbList` | High |

## Critical: Add Reviews to Schema

Already covered in detail in `local-audit.md`. Once 5+ real Google reviews exist, add:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "<real value from GBP>",
  "reviewCount": "<real count from GBP>",
  "bestRating": "5",
  "worstRating": "1"
}
```

**Never fabricate review data — Google manual-action risk.**

## Type Upgrade

Change root schema `@type` from `"LocalBusiness"` to:
```json
"@type": ["LocalBusiness", "ProfessionalService"],
"@id": "https://printecwrap.com/#business"
```

The `@id` anchor lets inner-page Service schemas reference this entity cleanly.

## Service Schema Template

For each of 9 service pages (`/business-signage`, `/channel-letters-signage`, etc.):

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Business Signage",
  "name": "Custom Business Signage",
  "description": "<from page metadata>",
  "url": "https://printecwrap.com/business-signage",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://printecwrap.com/#business"
  },
  "areaServed": { "@type": "State", "name": "Virginia" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Business Signage Options",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Monument Signs" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pylon Signs" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ADA Wayfinding Signs" } }
    ]
  }
}
```

## FAQPage Schema

Add to service pages that already have FAQ data (e.g., `business-signage`):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are your signs ADA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All interior wayfinding and room identification signs meet ADA requirements including tactile lettering, Grade 2 Braille, proper mounting height, and compliant color contrast."
      }
    }
  ]
}
```
**Note:** No Google rich-result on commercial sites since 2023. Pure AI/GEO benefit.

## BreadcrumbList Template

Add to every inner-page metadata:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://printecwrap.com" },
    { "@type": "ListItem", "position": 2, "name": "Business Signage", "item": "https://printecwrap.com/business-signage" }
  ]
}
```

## BlogPosting Template

For `src/app/blog/[slug]/page.tsx`, inject dynamically using the `post` object:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "<post.title>",
  "description": "<post.excerpt>",
  "url": "https://printecwrap.com/blog/<post.slug>",
  "datePublished": "<post.date YYYY-MM-DD>",
  "dateModified": "<post.date YYYY-MM-DD>",
  "author": {
    "@type": "Organization",
    "name": "Printec Virginia LLC",
    "url": "https://printecwrap.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Printec Virginia LLC",
    "logo": {
      "@type": "ImageObject",
      "url": "https://printecwrap.com/printec-logo.png",
      "width": 2000,
      "height": 1252
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://printecwrap.com/blog/<post.slug>"
  }
}
```

## Implementation Order

1. **`aggregateRating` + `review` in `layout.tsx`** — single file, unlocks Knowledge Panel stars (REAL DATA ONLY)
2. **`@type` array + `@id` anchor + `streetAddress` + ImageObject `logo`** — same file
3. **`BlogPosting` + `BreadcrumbList` on `/blog/[slug]`** — dynamic from existing `post` object
4. **`Service` schema on each of 9 service pages** — repeatable pattern
5. **`BreadcrumbList` on all service + location pages** — sitelinks eligibility
6. **`FAQPage` on service pages** — only if AI/GEO is a stated goal
