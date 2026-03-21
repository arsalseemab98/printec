import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/blog-data";
import { CtaBanner } from "@/components/shared/cta-banner";
import { ORANGE, BLACK, WHITE } from "@/lib/constants";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dbPost = await getBlogPostBySlug(slug);
  if (dbPost) {
    return {
      title: dbPost.title as string,
      description: dbPost.excerpt as string,
    };
  }
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try Supabase first, fall back to hardcoded data
  const dbPost = await getBlogPostBySlug(slug);

  const post = dbPost
    ? {
        slug: dbPost.slug as string,
        title: dbPost.title as string,
        excerpt: dbPost.excerpt as string,
        date: (dbPost.created_at as string) ?? "",
        category: dbPost.category as string,
        readTime: (dbPost.read_time as string) ?? "",
        content: dbPost.content as string,
      }
    : getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // For related posts: try Supabase, fall back to hardcoded
  const dbAllPosts = await getBlogPosts();
  const relatedPosts =
    dbAllPosts.length > 0
      ? dbAllPosts
          .filter((p: Record<string, unknown>) => p.slug !== slug)
          .slice(0, 3)
          .map((p: Record<string, unknown>) => ({
            slug: p.slug as string,
            title: p.title as string,
            excerpt: p.excerpt as string,
            date: (p.created_at as string) ?? "",
            category: p.category as string,
            readTime: (p.read_time as string) ?? "",
            content: p.content as string,
          }))
      : getRelatedPosts(slug, 3);

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: BLACK,
          padding: "160px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Back link */}
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: ORANGE,
              textDecoration: "none",
              marginBottom: "40px",
            }}
          >
            <ArrowLeft size={14} /> BACK TO BLOG
          </Link>

          {/* Category pill */}
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
            {post.category}
          </p>

          {/* Title */}
          <h1
            style={{
              fontSize: "36px",
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              lineHeight: 1.1,
              color: WHITE,
              margin: "0 0 24px",
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>&bull;</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div style={{ height: "1px", background: "#161616" }} />

      {/* Article content */}
      <section
        style={{
          background: BLACK,
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Separator */}
      <div style={{ height: "1px", background: "#161616" }} />

      {/* Related posts */}
      <section
        style={{
          background: BLACK,
          padding: "100px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: ORANGE,
                margin: "0 0 12px",
              }}
            >
              KEEP READING
            </p>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: WHITE,
                margin: 0,
              }}
            >
              Related Articles
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <article
                  className="blog-card"
                  style={{
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: "4px",
                    padding: "28px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  {/* Category */}
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "4px",
                      textTransform: "uppercase",
                      color: ORANGE,
                      marginBottom: "12px",
                    }}
                  >
                    {related.category}
                  </span>

                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: WHITE,
                      margin: "0 0 10px",
                    }}
                  >
                    {related.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: "rgba(255,255,255,0.5)",
                      margin: "0 0 16px",
                      flex: 1,
                    }}
                  >
                    {related.excerpt}
                  </p>

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
