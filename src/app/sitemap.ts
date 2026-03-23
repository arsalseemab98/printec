import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import { createServerClient } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://printecwrap.com";

  // Fetch all catalogs from Supabase
  let catalogSlugs: string[] = [];
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("catalogs")
      .select("slug");
    if (data) {
      catalogSlugs = data.map((c: { slug: string }) => c.slug);
    }
  } catch {
    // Silently fail — sitemap still generates without catalog entries
  }

  const corePages = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/team", priority: 0.7, freq: "monthly" as const },
    { path: "/portfolio", priority: 0.8, freq: "weekly" as const },
    { path: "/contact", priority: 0.9, freq: "monthly" as const },
    { path: "/blog", priority: 0.7, freq: "weekly" as const },
    { path: "/catalogs", priority: 0.8, freq: "weekly" as const },
  ];

  const servicePages = [
    "/vinyl-wraps",
    "/business-signage",
    "/dance-floor-wraps",
    "/wall-wraps",
    "/window-wraps",
    "/channel-letters-signage",
    "/custom-neon-signs",
    "/food-truck-wraps",
  ];

  const seoLandingPages = [
    "/wedding-floor-wrap",
    "/led-channel-letters",
    "/channel-letter-signs-near-me",
    "/storefront-window-graphics",
  ];

  const locationPages = [
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
    ...corePages.map((p) => ({
      url: `${baseUrl}${p.path}`,
      lastModified: new Date(),
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...servicePages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...seoLandingPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...locationPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPages,
    ...catalogSlugs.map((slug) => ({
      url: `${baseUrl}/catalogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
