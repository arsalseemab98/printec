import { Metadata } from "next";
import { CtaBanner } from "@/components/shared/cta-banner";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { GalleryGridBlock } from "@/components/ui/gallery-grid-block-shadcnui";
import { ServicesShowcase } from "./services-showcase";
import { ORANGE, BLACK, WHITE } from "@/lib/constants";
import { getPortfolioImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Printec Virginia LLC's portfolio of custom signs, vehicle wraps, window graphics, dance floor wraps, and channel letter signage projects in Virginia.",
  keywords: [
    "signage portfolio",
    "vehicle wrap gallery",
    "custom sign projects",
    "window graphics examples",
    "channel letter portfolio",
    "Virginia sign work",
  ],
  openGraph: {
    title: "Portfolio | Printec Virginia LLC",
    description:
      "Browse Printec Virginia LLC's portfolio of custom signs, vehicle wraps, window graphics, dance floor wraps, and channel letter signage projects in Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

export default async function PortfolioPage() {
  const portfolioData = await getPortfolioImages();
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]} />
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
            PORTFOLIO
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
            Our Work
          </h1>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 32px",
            }}
          >
            Real projects. Real results. See what we've built.
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

      <GalleryGridBlock data={portfolioData} />

      <ServicesShowcase />

      <CtaBanner />
    </main>
  );
}
