import { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import { BLOG_POSTS } from "@/lib/blog-data";
import { CtaBanner } from "@/components/shared/cta-banner";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { DARK1, DARK2, ORANGE, BLACK, WHITE } from "@/lib/constants";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert tips on signage, vehicle wraps, channel letters, window graphics, and more from Printec Virginia LLC in Virginia.",
  keywords: [
    "signage tips",
    "vehicle wrap guide",
    "channel letter blog",
    "window graphics advice",
    "sign industry insights",
    "Printec Virginia LLC blog",
  ],
  openGraph: {
    title: "Blog | Printec Virginia LLC",
    description:
      "Expert tips on signage, vehicle wraps, channel letters, window graphics, and more from Printec Virginia LLC in Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

function formatDate(dateStr: string) {
  // Handle both "2026-03-15" (hardcoded) and ISO timestamp "2026-03-15T..." (Supabase)
  const normalized = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const date = new Date(normalized + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  // Fetch from Supabase first, fall back to hardcoded data
  const dbPosts = await getBlogPosts();
  const posts = dbPosts.length > 0
    ? dbPosts.map((p: Record<string, unknown>) => ({
        slug: p.slug as string,
        title: p.title as string,
        excerpt: p.excerpt as string,
        date: (p.created_at as string) ?? "",
        category: p.category as string,
        readTime: (p.read_time as string) ?? "",
      }))
    : BLOG_POSTS;

  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      {/* Custom Hero */}
      <section
        style={{
          background: BLACK,
          padding: "160px 24px 100px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: ORANGE,
              margin: "0 0 16px",
            }}
          >
            BLOG
          </p>
          <h1
            style={{
              fontSize: "36px",
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              lineHeight: 1.1,
              color: WHITE,
              margin: "0 0 16px",
            }}
          >
            Insights & Tips
          </h1>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 32px",
            }}
          >
            Expert advice on signage, wraps, and graphics
          </p>
          <div
            style={{
              width: "40px",
              height: "2px",
              background: ORANGE,
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      {/* Separator */}
      <div style={{ height: "1px", background: "#161616" }} />

      {/* Blog Cards Grid */}
      <section
        style={{
          background: BLACK,
          padding: "100px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "32px",
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <article
                  className="blog-card"
                  style={{
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: "4px",
                    padding: "32px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  {/* Category pill */}
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "4px",
                      textTransform: "uppercase",
                      color: ORANGE,
                      marginBottom: "16px",
                    }}
                  >
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: WHITE,
                      margin: "0 0 12px",
                    }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: "rgba(255,255,255,0.5)",
                      margin: "0 0 24px",
                      flex: 1,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Meta row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid #161616",
                      paddingTop: "16px",
                      marginTop: "auto",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Calendar size={13} />
                        {formatDate(post.date)}
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Clock size={13} />
                        {post.readTime}
                      </span>
                    </span>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "4px",
                        textTransform: "uppercase",
                        color: ORANGE,
                      }}
                    >
                      READ MORE <ArrowRight size={13} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
