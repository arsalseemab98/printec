"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileImage,
  FileText,
  HardDrive,
  ArrowRight,
  DollarSign,
  TrendingUp,
  BarChart3,
  Inbox,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  status: string;
  booked_price: number | null;
  completed_price: number | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  New: "#3b82f6",
  Contacted: "#eab308",
  "Follow Up": "#a855f7",
  Quoted: "#06b6d4",
  Booked: "#22c55e",
  Completed: "#6b7280",
};

const PAGES = [
  { name: "Homepage", href: "/admin/pages/homepage" },
  { name: "About", href: "/admin/pages/about" },
  { name: "Portfolio", href: "/admin/pages/portfolio" },
  { name: "Contact", href: "/admin/pages/contact" },
  { name: "Team", href: "/admin/pages/team" },
];

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [bookedPipeline, setBookedPipeline] = useState(0);
  const [completedRevenue, setCompletedRevenue] = useState(0);
  const [averageOrder, setAverageOrder] = useState(0);
  const [newCount, setNewCount] = useState(0);

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

    async function fetchInquiries() {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (!Array.isArray(data)) return;

      setInquiries(data);

      const booked = data.filter((i: Inquiry) => i.status === "Booked");
      const completed = data.filter((i: Inquiry) => i.status === "Completed");
      const newInq = data.filter((i: Inquiry) => i.status === "New");

      setBookedPipeline(
        booked.reduce((sum: number, i: Inquiry) => sum + (i.booked_price || 0), 0)
      );

      const totalCompleted = completed.reduce(
        (sum: number, i: Inquiry) => sum + (i.completed_price || 0),
        0
      );
      setCompletedRevenue(totalCompleted);
      setAverageOrder(completed.length > 0 ? totalCompleted / completed.length : 0);
      setNewCount(newInq.length);
    }

    fetchBlogCount();
    fetchInquiries();
  }, []);

  const recentInquiries = inquiries.slice(0, 5);

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

      {/* Sales Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.25rem",
          marginBottom: "2.5rem",
        }}
      >
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          <DollarSign
            size={20}
            style={{ color: "#22c55e", marginBottom: "0.75rem" }}
          />
          <p
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#22c55e",
              margin: "0 0 0.25rem",
            }}
          >
            ${bookedPipeline.toLocaleString()}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
              margin: 0,
            }}
          >
            Booked Pipeline
          </p>
        </div>

        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          <TrendingUp
            size={20}
            style={{ color: "#F7941D", marginBottom: "0.75rem" }}
          />
          <p
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#F7941D",
              margin: "0 0 0.25rem",
            }}
          >
            ${completedRevenue.toLocaleString()}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
              margin: 0,
            }}
          >
            Completed Revenue
          </p>
        </div>

        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          <BarChart3
            size={20}
            style={{ color: "#06b6d4", marginBottom: "0.75rem" }}
          />
          <p
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#06b6d4",
              margin: "0 0 0.25rem",
            }}
          >
            ${Math.round(averageOrder).toLocaleString()}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
              margin: 0,
            }}
          >
            Average Order
          </p>
        </div>

        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          <Inbox
            size={20}
            style={{ color: "#3b82f6", marginBottom: "0.75rem" }}
          />
          <p
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#3b82f6",
              margin: "0 0 0.25rem",
            }}
          >
            {newCount}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
              margin: 0,
            }}
          >
            New Inquiries
          </p>
        </div>
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

      {/* Recent Inquiries */}
      {recentInquiries.length > 0 && (
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
              }}
            >
              Recent Inquiries
            </h2>
            <Link
              href="/admin/inquiries"
              style={{
                fontSize: "13px",
                color: "#F7941D",
                textDecoration: "none",
              }}
            >
              View All
            </Link>
          </div>
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {recentInquiries.map((inq, i) => (
              <Link
                key={inq.id}
                href={`/admin/inquiries/${inq.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.875rem 1.25rem",
                    borderBottom:
                      i < recentInquiries.length - 1
                        ? "1px solid #1a1a1a"
                        : "none",
                    transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(247,148,29,0.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#fff",
                          margin: 0,
                          fontWeight: 500,
                        }}
                      >
                        {inq.name}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.4)",
                          margin: "0.2rem 0 0",
                        }}
                      >
                        {inq.service || inq.email}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: STATUS_COLORS[inq.status] || "#888",
                        background: `${STATUS_COLORS[inq.status] || "#888"}20`,
                        border: `1px solid ${STATUS_COLORS[inq.status] || "#888"}40`,
                      }}
                    >
                      {inq.status}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

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
          <Link
            href="/admin/inquiries"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#111",
              border: "1px solid #F7941D",
              borderRadius: "4px",
              padding: "0.875rem 1.25rem",
              color: "#F7941D",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(247,148,29,0.1)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#F7941D";
            }}
          >
            Inquiries
            <ArrowRight size={14} style={{ opacity: 0.7 }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
