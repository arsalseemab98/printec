"use client";

import Link from "next/link";
import { DARK1, DARK2, ORANGE, WHITE, SERVICES_NAV } from "@/lib/constants";
import { Music, Layers, AppWindow, Type, ArrowRight } from "lucide-react";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Dance Floor Wraps": <Music size={20} color={ORANGE} style={{ flexShrink: 0 }} />,
  "Wall Wraps": <Layers size={20} color={ORANGE} style={{ flexShrink: 0 }} />,
  "Window Wraps": <AppWindow size={20} color={ORANGE} style={{ flexShrink: 0 }} />,
  "Channel Letters & Signage": <Type size={20} color={ORANGE} style={{ flexShrink: 0 }} />,
};

export function ServicesShowcase() {
  return (
    <section
      style={{
        background: DARK1,
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <p
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "4px",
              color: ORANGE,
              fontWeight: 500,
              fontFamily: "Arial, sans-serif",
              marginBottom: "12px",
            }}
          >
            Explore
          </p>
          <h2
            style={{
              fontSize: "28px",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              color: WHITE,
              margin: 0,
            }}
          >
            Our Services
          </h2>
        </div>

        {/* Service cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "12px",
          }}
        >
          {SERVICES_NAV.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  cursor: "pointer",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ORANGE;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#222";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: WHITE,
                  }}
                >
                  {SERVICE_ICONS[service.name]}
                  {service.name}
                </span>

                <ArrowRight size={18} color={ORANGE} style={{ flexShrink: 0, opacity: 0.6 }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
