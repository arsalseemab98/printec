"use client";

import { useEffect, useState, useMemo } from "react";
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
  ChevronLeft,
  ChevronRight,
  Calendar,
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

interface ContractMetric {
  id: string;
  total_price: number;
  status: string;
  signed_at: string | null;
  completed_at: string | null;
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

const FILTER_OPTIONS = ["All Time", "This Month", "Last Month", "Custom"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

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
  const [contracts, setContracts] = useState<ContractMetric[]>([]);
  const [filter, setFilter] = useState<FilterOption>("All Time");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
  });

  useEffect(() => {
    async function fetchBlogCount() {
      const { count, error } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });
      if (!error && count !== null) setBlogCount(count);
      else setBlogCount(0);
    }

    async function fetchInquiries() {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (Array.isArray(data)) setInquiries(data);
    }

    async function fetchContracts() {
      const res = await fetch("/api/admin/contracts");
      const data = await res.json();
      if (Array.isArray(data)) setContracts(data);
    }

    fetchBlogCount();
    fetchInquiries();
    fetchContracts();
  }, []);

  // Filter inquiries by date
  const filteredInquiries = useMemo(() => {
    if (filter === "All Time") return inquiries;

    let startDate: Date;
    let endDate: Date;

    if (filter === "This Month") {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else if (filter === "Last Month") {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    } else {
      // Custom — use selectedMonth
      startDate = new Date(selectedMonth.year, selectedMonth.month, 1);
      endDate = new Date(selectedMonth.year, selectedMonth.month + 1, 0, 23, 59, 59);
    }

    return inquiries.filter((inq) => {
      const d = new Date(inq.created_at);
      return d >= startDate && d <= endDate;
    });
  }, [inquiries, filter, selectedMonth]);

  // Filter contracts by date
  const filteredContracts = useMemo(() => {
    if (filter === "All Time") return contracts;

    let startDate: Date;
    let endDate: Date;

    if (filter === "This Month") {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else if (filter === "Last Month") {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    } else {
      startDate = new Date(selectedMonth.year, selectedMonth.month, 1);
      endDate = new Date(selectedMonth.year, selectedMonth.month + 1, 0, 23, 59, 59);
    }

    return contracts.filter((c) => {
      const dateStr = c.completed_at || c.signed_at || c.created_at;
      const d = new Date(dateStr);
      return d >= startDate && d <= endDate;
    });
  }, [contracts, filter, selectedMonth]);

  // Calculate metrics from filtered data (inquiries + contracts)
  const metrics = useMemo(() => {
    const booked = filteredInquiries.filter((i) => i.status === "Booked");
    const completed = filteredInquiries.filter((i) => i.status === "Completed");
    const newInq = filteredInquiries.filter((i) => i.status === "New");

    const signedContracts = filteredContracts.filter((c) => c.status === "Signed");
    const completedContracts = filteredContracts.filter((c) => c.status === "Completed");

    const inquiryBooked = booked.reduce((sum, i) => sum + (i.booked_price || 0), 0);
    const contractBooked = signedContracts.reduce((sum, c) => sum + (c.total_price || 0), 0);
    const bookedPipeline = inquiryBooked + contractBooked;

    const inquiryCompleted = completed.reduce((sum, i) => sum + (i.completed_price || 0), 0);
    const contractCompleted = completedContracts.reduce((sum, c) => sum + (c.total_price || 0), 0);
    const completedRevenue = inquiryCompleted + contractCompleted;

    const totalCompletedCount = completed.length + completedContracts.length;
    const averageOrder = totalCompletedCount > 0 ? completedRevenue / totalCompletedCount : 0;

    return { bookedPipeline, completedRevenue, averageOrder, newCount: newInq.length, totalCount: filteredInquiries.length };
  }, [filteredInquiries, filteredContracts]);

  function prevMonth() {
    setSelectedMonth((prev) => {
      if (prev.month === 0) return { month: 11, year: prev.year - 1 };
      return { month: prev.month - 1, year: prev.year };
    });
  }

  function nextMonth() {
    setSelectedMonth((prev) => {
      if (prev.month === 11) return { month: 0, year: prev.year + 1 };
      return { month: prev.month + 1, year: prev.year };
    });
  }

  const recentInquiries = filteredInquiries.slice(0, 5);
  const filterLabel =
    filter === "Custom"
      ? `${MONTHS[selectedMonth.month]} ${selectedMonth.year}`
      : filter === "This Month"
      ? `${MONTHS[new Date().getMonth()]} ${new Date().getFullYear()}`
      : filter === "Last Month"
      ? (() => {
          const d = new Date();
          d.setMonth(d.getMonth() - 1);
          return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
        })()
      : "All Time";

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
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
        <Link
          href="/admin/statistics"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "transparent",
            border: "1px solid #F7941D",
            borderRadius: "4px",
            color: "#F7941D",
            fontSize: "13px",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(247,148,29,0.1)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F7941D"; }}
        >
          <BarChart3 size={16} />
          Sales Statistics
        </Link>
      </div>

      {/* Date Filter Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#111",
          border: "1px solid #222",
          borderRadius: "4px",
          padding: "12px 20px",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Calendar size={16} color="#F7941D" />
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Sales Period
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setFilter(opt);
                if (opt === "Custom") {
                  const now = new Date();
                  setSelectedMonth({ month: now.getMonth(), year: now.getFullYear() });
                }
              }}
              style={{
                padding: "6px 14px",
                background: filter === opt ? "#F7941D" : "transparent",
                border: filter === opt ? "1px solid #F7941D" : "1px solid #333",
                borderRadius: "4px",
                color: filter === opt ? "#0C0C0C" : "rgba(255,255,255,0.5)",
                fontSize: "12px",
                fontWeight: filter === opt ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Month navigation arrows (show for Custom, This Month, Last Month) */}
        {filter !== "All Time" && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => {
                setFilter("Custom");
                prevMonth();
              }}
              style={{
                background: "transparent",
                border: "1px solid #333",
                borderRadius: "4px",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff", minWidth: "140px", textAlign: "center" }}>
              {filterLabel}
            </span>
            <button
              onClick={() => {
                setFilter("Custom");
                nextMonth();
              }}
              style={{
                background: "transparent",
                border: "1px solid #333",
                borderRadius: "4px",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {filter === "All Time" && (
          <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.3)" }}>
            All Time
          </span>
        )}
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
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "1.5rem" }}>
          <DollarSign size={20} style={{ color: "#22c55e", marginBottom: "0.75rem" }} />
          <p style={{ fontSize: "28px", fontWeight: 700, color: "#22c55e", margin: "0 0 0.25rem" }}>
            ${metrics.bookedPipeline.toLocaleString()}
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: 0 }}>
            Booked Pipeline
          </p>
        </div>

        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "1.5rem" }}>
          <TrendingUp size={20} style={{ color: "#F7941D", marginBottom: "0.75rem" }} />
          <p style={{ fontSize: "28px", fontWeight: 700, color: "#F7941D", margin: "0 0 0.25rem" }}>
            ${metrics.completedRevenue.toLocaleString()}
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: 0 }}>
            Completed Revenue
          </p>
        </div>

        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "1.5rem" }}>
          <BarChart3 size={20} style={{ color: "#06b6d4", marginBottom: "0.75rem" }} />
          <p style={{ fontSize: "28px", fontWeight: 700, color: "#06b6d4", margin: "0 0 0.25rem" }}>
            ${Math.round(metrics.averageOrder).toLocaleString()}
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: 0 }}>
            Average Order
          </p>
        </div>

        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "1.5rem" }}>
          <Inbox size={20} style={{ color: "#3b82f6", marginBottom: "0.75rem" }} />
          <p style={{ fontSize: "28px", fontWeight: 700, color: "#3b82f6", margin: "0 0 0.25rem" }}>
            {metrics.newCount}
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: 0 }}>
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
        <Link href="/admin/pages" style={{ textDecoration: "none" }}>
          <div
            style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "1.5rem", transition: "border-color 0.2s", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#222")}
          >
            <FileImage size={24} style={{ color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }} />
            <p style={{ fontSize: "32px", fontWeight: 700, color: "#F7941D", margin: "0 0 0.25rem" }}>5</p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: 0 }}>Pages</p>
          </div>
        </Link>

        <Link href="/admin/blog" style={{ textDecoration: "none" }}>
          <div
            style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "1.5rem", transition: "border-color 0.2s", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#222")}
          >
            <FileText size={24} style={{ color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }} />
            <p style={{ fontSize: "32px", fontWeight: 700, color: "#F7941D", margin: "0 0 0.25rem" }}>{blogCount !== null ? blogCount : "..."}</p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: 0 }}>Blog Posts</p>
          </div>
        </Link>

        <Link href="/admin/images" style={{ textDecoration: "none" }}>
          <div
            style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "1.5rem", transition: "border-color 0.2s", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#222")}
          >
            <HardDrive size={24} style={{ color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }} />
            <p style={{ fontSize: "32px", fontWeight: 700, color: "#F7941D", margin: "0 0 0.25rem" }}>Images</p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: 0 }}>Media Manager</p>
          </div>
        </Link>
      </div>

      {/* Recent Inquiries */}
      {recentInquiries.length > 0 && (
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: 0 }}>
              Recent Inquiries {filter !== "All Time" && <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>({filterLabel})</span>}
            </h2>
            <Link href="/admin/inquiries" style={{ fontSize: "13px", color: "#F7941D", textDecoration: "none" }}>
              View All
            </Link>
          </div>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", overflow: "hidden" }}>
            {recentInquiries.map((inq, i) => (
              <Link key={inq.id} href={`/admin/inquiries/${inq.id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.875rem 1.25rem",
                    borderBottom: i < recentInquiries.length - 1 ? "1px solid #1a1a1a" : "none",
                    transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(247,148,29,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div>
                    <p style={{ fontSize: "14px", color: "#fff", margin: 0, fontWeight: 500 }}>{inq.name}</p>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "0.2rem 0 0" }}>{inq.service || inq.email}</p>
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
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>
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
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
          Quick Links
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
          {PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#111", border: "1px solid #222", borderRadius: "4px",
                padding: "0.875rem 1.25rem", color: "rgba(255,255,255,0.7)",
                textDecoration: "none", fontSize: "14px", transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#F7941D"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              {page.name}
              <ArrowRight size={14} style={{ opacity: 0.5 }} />
            </Link>
          ))}
          <Link
            href="/admin/blog"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#111", border: "1px solid #222", borderRadius: "4px",
              padding: "0.875rem 1.25rem", color: "rgba(255,255,255,0.7)",
              textDecoration: "none", fontSize: "14px", transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#F7941D"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            Blog Posts
            <ArrowRight size={14} style={{ opacity: 0.5 }} />
          </Link>
          <Link
            href="/admin/inquiries"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#111", border: "1px solid #F7941D", borderRadius: "4px",
              padding: "0.875rem 1.25rem", color: "#F7941D",
              textDecoration: "none", fontSize: "14px", fontWeight: 600,
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(247,148,29,0.1)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F7941D"; }}
          >
            Inquiries
            <ArrowRight size={14} style={{ opacity: 0.7 }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
