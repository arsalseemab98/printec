import { Metadata } from "next";
import Link from "next/link";
import { ORANGE, BLACK, DARK1, WHITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio Catalogs | Printec Virginia LLC",
  description:
    "Browse our curated portfolio catalogs showcasing channel letters, vehicle wraps, window graphics, wall murals, wedding floor wraps, and neon signs.",
};

export default function CatalogsPage() {
  return (
    <main>
      <section
        style={{
          background: BLACK,
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "160px 24px 100px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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
              margin: "0 0 24px",
            }}
          >
            PORTFOLIO CATALOGS
          </h1>
          <div
            style={{
              display: "inline-block",
              padding: "12px 32px",
              background: DARK1,
              border: `1px solid ${ORANGE}`,
              borderRadius: "4px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: ORANGE,
              }}
            >
              Coming Soon
            </span>
          </div>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 32px",
            }}
          >
            We&apos;re putting together curated collections of our best work.
            Check back soon to browse our project catalogs.
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
            }}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
