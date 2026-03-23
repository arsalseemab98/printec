"use client";

import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";

const PAGES = [
  { slug: "about", name: "About Us", slots: ["hero", "story"] },
  { slug: "dance-floor-wraps", name: "Dance Floor Wraps", slots: ["hero", "before", "after"] },
  { slug: "wall-wraps", name: "Wall Wraps", slots: ["hero", "before", "after"] },
  { slug: "window-wraps", name: "Window Wraps", slots: ["hero", "before", "after"] },
  { slug: "channel-letters-signage", name: "Channel Letters & Signage", slots: ["hero", "before", "after"] },
  { slug: "custom-neon-signs", name: "Custom Neon Signs", slots: ["hero", "before", "after"] },
  { slug: "business-signage", name: "Business Signage", slots: ["hero"] },
  { slug: "team", name: "Team", slots: ["hero"] },
  { slug: "contact", name: "Contact", slots: ["map"] },
  { slug: "portfolio", name: "Portfolio", slots: [] },
];

export default function AdminPagesPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: "#F7941D",
            fontWeight: 500,
            marginBottom: "0.5rem",
          }}
        >
          Content
        </p>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: "#fff",
            fontFamily: "'Arial Black', Arial, sans-serif",
            margin: 0,
          }}
        >
          Manage Pages
        </h1>
      </div>

      {/* Page Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {PAGES.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: "4px",
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "border-color 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#F7941D")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#222")
              }
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <ImageIcon
                  size={20}
                  style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#fff",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    {page.name}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.4)",
                      margin: 0,
                    }}
                  >
                    {page.slots.length} image slot{page.slots.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <ArrowRight size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
