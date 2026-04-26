/**
 * JSON-LD helper components for SEO structured data.
 * Each emits a server-rendered <script type="application/ld+json"> block.
 * Safe to use inside server components; data is JSON-stringified before injection.
 */

const SITE_URL = "https://printecwrap.com";
const BUSINESS_ID = `${SITE_URL}/#business`;

type BreadcrumbItem = { name: string; path: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type ServiceProps = {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  offers?: string[];
};

export function ServiceJsonLd({ name, serviceType, description, path, offers }: ServiceProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@type": "LocalBusiness", "@id": BUSINESS_ID },
    areaServed: [
      { "@type": "State", name: "Virginia" },
      { "@type": "State", name: "Maryland" },
      { "@type": "Place", name: "Washington, D.C." },
    ],
  };
  if (offers && offers.length > 0) {
    data.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${name} Options`,
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offer },
      })),
    };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type BlogPostingProps = {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
};

export function BlogPostingJsonLd({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
  image,
}: BlogPostingProps) {
  const url = `${SITE_URL}/blog/${slug}`;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: "Printec Virginia LLC",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Printec Virginia LLC",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/printec-logo.png`,
        width: 2000,
        height: 1252,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
  if (image) {
    data.image = image;
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type FaqItem = { q: string; a: string };

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
