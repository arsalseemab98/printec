import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@/lib/supabase";
import { ORANGE, BLACK, DARK1, DARK2, WHITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio Catalogs | Printec Virginia LLC",
  description:
    "Browse our curated portfolio catalogs showcasing channel letters, vehicle wraps, window graphics, wall murals, wedding floor wraps, and neon signs.",
  openGraph: {
    title: "Portfolio Catalogs | Printec Virginia",
    description:
      "Browse our curated portfolio catalogs showcasing channel letters, vehicle wraps, window graphics, wall murals, wedding floor wraps, and neon signs.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

interface CatalogProject {
  id: string;
  image_url: string | null;
  sort_order: number;
}

interface Catalog {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  created_at: string;
  catalog_projects: CatalogProject[];
}

async function getCatalogs(): Promise<Catalog[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("catalogs")
      .select("id, title, slug, description, created_at, catalog_projects(id, image_url, sort_order)")
      .order("created_at", { ascending: false })
      .order("sort_order", { ascending: true, referencedTable: "catalog_projects" });

    if (error) {
      console.error("Failed to fetch catalogs:", error.message);
      return [];
    }

    return (data as Catalog[]) ?? [];
  } catch {
    console.error("Failed to fetch catalogs");
    return [];
  }
}

export default async function CatalogsPage() {
  const catalogs = await getCatalogs();

  return (
    <main>
      {/* Hero */}
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
            FROM VISION TO VINYL
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
            PORTFOLIO CATALOGS
          </h1>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 32px",
            }}
          >
            Explore our curated collections of completed projects. Each catalog
            showcases the craftsmanship and attention to detail that defines
            Printec Virginia.
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
      <div style={{ height: "1px", background: DARK1 }} />

      {/* Catalog Grid */}
      <section
        style={{
          background: BLACK,
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {catalogs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8,
                }}
              >
                Catalogs are coming soon. Check back shortly.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "28px",
              }}
              className="catalogs-grid"
            >
              {catalogs.map((catalog) => {
                const projectCount = catalog.catalog_projects?.length ?? 0;
                const firstImage = catalog.catalog_projects?.find(
                  (p) => p.image_url
                )?.image_url;

                return (
                  <Link
                    key={catalog.id}
                    href={`/catalogs/${catalog.slug}`}
                    style={{
                      background: DARK1,
                      border: `1px solid ${DARK2}`,
                      borderRadius: "4px",
                      overflow: "hidden",
                      textDecoration: "none",
                      transition: "border-color 0.25s ease",
                      display: "block",
                    }}
                    className="catalog-card"
                  >
                    {/* Image area */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        overflow: "hidden",
                      }}
                    >
                      {firstImage ? (
                        <Image
                          src={firstImage}
                          alt={catalog.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(135deg, ${DARK2} 0%, ${BLACK} 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 500,
                              letterSpacing: "3px",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            No preview
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "20px" }}>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontFamily: "'Arial Black', sans-serif",
                          fontWeight: 900,
                          color: WHITE,
                          margin: "0 0 8px",
                          lineHeight: 1.2,
                        }}
                      >
                        {catalog.title}
                      </h2>

                      {catalog.description && (
                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: 1.6,
                            color: "rgba(255,255,255,0.5)",
                            margin: "0 0 14px",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {catalog.description}
                        </p>
                      )}

                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: ORANGE,
                          margin: "0 0 16px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {projectCount} {projectCount === 1 ? "project" : "projects"}
                      </p>

                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: ORANGE,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                        }}
                      >
                        View Catalog &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: DARK1,
          borderTop: `1px solid ${DARK2}`,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "28px",
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              color: WHITE,
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            Don&apos;t see what you need?
          </h2>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 32px",
            }}
          >
            We take on custom projects every day. Tell us about your vision and
            we&apos;ll make it happen.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "14px 36px",
              background: ORANGE,
              color: BLACK,
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "14px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "4px",
              transition: "opacity 0.2s",
            }}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
