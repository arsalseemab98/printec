import { MetadataRoute } from "next";

// Third-party SEO/scraping crawlers that pollute analytics without business value.
// Blocking is voluntary — well-behaved bots honor robots.txt; hostile scrapers ignore it.
const BLOCKED_BOTS = [
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "PetalBot",
  "DataForSeoBot",
  "SeekportBot",
  "SerpstatBot",
  "ZoominfoBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/sign/"],
      },
      ...BLOCKED_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: "/",
      })),
    ],
    sitemap: "https://printecwrap.com/sitemap.xml",
  };
}
