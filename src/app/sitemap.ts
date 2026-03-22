import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://printecwrap.com";

  const staticPages = [
    "",
    "/about",
    "/team",
    "/portfolio",
    "/contact",
    "/blog",
    "/vinyl-wraps",
    "/business-signage",
    "/dance-floor-wraps",
    "/wall-wraps",
    "/window-wraps",
    "/channel-letters-signage",
    "/custom-neon-signs",
    "/wedding-floor-wrap",
    "/led-channel-letters",
    "/channel-letter-signs-near-me",
    "/storefront-window-graphics",
    "/locations/washington-dc",
    "/locations/virginia",
    "/locations/maryland",
    "/locations/seattle",
    "/locations/new-york",
    "/locations/los-angeles",
    "/locations/chicago",
    "/locations/dallas",
    "/locations/houston",
  ];

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.8,
    })),
    ...blogPages,
  ];
}
