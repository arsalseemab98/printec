"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileImage,
  FileText,
  HardDrive,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const PAGES = [
  { name: "Homepage", href: "/admin/pages/homepage" },
  { name: "About", href: "/admin/pages/about" },
  { name: "Portfolio", href: "/admin/pages/portfolio" },
  { name: "Contact", href: "/admin/pages/contact" },
  { name: "Team", href: "/admin/pages/team" },
];

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBlogCount() {
      const { count, error } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });
      if (!error && count !== null) {
        setBlogCount(count);
      } else {
        setBlogCount(0);
      }
    }
    fetchBlogCount();
  }, []);

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
          Admin
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
          Dashboard
        </h1>
      </div>

      {/* Overview Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
          marginBottom: "2.5rem",
        }}
      >
        {/* Pages Card */}
        <Link href="/admin/pages" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.5rem",
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
            <FileImage
              size={24}
              style={{ color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}
            />
            <p
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#F7941D",
                margin: "0 0 0.25rem",
              }}
            >
              5
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
              }}
            >
              Pages
            </p>
          </div>
        </Link>

        {/* Blog Posts Card */}
        <Link href="/admin/blog" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.5rem",
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
            <FileText
              size={24}
              style={{ color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}
            />
            <p
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#F7941D",
                margin: "0 0 0.25rem",
              }}
            >
              {blogCount !== null ? blogCount : "..."}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
              }}
            >
              Blog Posts
            </p>
          </div>
        </Link>

        {/* Media Card */}
        <a
          href="https://supabase.com/dashboard/project/eofjaizkkxqxbynnvemi/storage/buckets"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.5rem",
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
            <HardDrive
              size={24}
              style={{ color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}
            />
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#F7941D",
                margin: "0 0 0.25rem",
              }}
            >
              Supabase Storage
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
              }}
            >
              Media
            </p>
          </div>
        </a>
      </div>

      {/* Quick Links */}
      <div>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "1rem",
          }}
        >
          Quick Links
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
          }}
        >
          {PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#111",
                border: "1px solid #222",
                borderRadius: "4px",
                padding: "0.875rem 1.25rem",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: "14px",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#F7941D";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#222";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              {page.name}
              <ArrowRight size={14} style={{ opacity: 0.5 }} />
            </Link>
          ))}
          <Link
            href="/admin/blog"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "0.875rem 1.25rem",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#F7941D";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#222";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            Blog Posts
            <ArrowRight size={14} style={{ opacity: 0.5 }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
