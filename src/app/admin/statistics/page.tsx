"use client";

import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Inbox,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

/* ─── Types ─── */
interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  status: string;
  description: string | null;
  budget: string | null;
  source: string | null;
  page: string | null;
  booked_price: number | null;
  completed_price: number | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  created_at: string;
}

interface Contract {
  id: string;
  total_price: number;
  status: string;
  service_description: string | null;
  signed_at: string | null;
  completed_at: string | null;
  created_at: string;
}

/* ─── Constants ─── */
const ORANGE = "#F7941D";
const CHART_COLORS = ["#F7941D", "#3b82f6", "#22c55e", "#a855f7", "#06b6d4", "#ef4444", "#eab308", "#ec4899", "#6366f1", "#14b8a6"];
const STATUS_COLORS: Record<string, string> = {
  New: "#3b82f6",
  Contacted: "#eab308",
  "Follow Up": "#a855f7",
  Quoted: "#06b6d4",
  Booked: "#22c55e",
  Completed: "#6b7280",
};
const FUNNEL_ORDER = ["New", "Contacted", "Follow Up", "Quoted", "Booked", "Completed"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FILTER_OPTIONS = ["All Time", "This Month", "Last Month", "Custom"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

/* ─── Styles ─── */
const CARD: React.CSSProperties = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: "4px",
  padding: "1.25rem",
};

const CARD_TITLE: React.CSSProperties = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "2px",
  color: "rgba(255,255,255,0.4)",
  fontWeight: 600,
  margin: "0 0 1rem 0",
};

const SECTION_TITLE: React.CSSProperties = {
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "3px",
  color: ORANGE,
  fontWeight: 700,
  margin: "2.5rem 0 1rem 0",
  fontFamily: "'Arial Black', Arial, sans-serif",
};

/* ─── Custom Tooltip ─── */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: "4px", padding: "10px 14px", fontSize: "13px" }}>
      <p style={{ color: "rgba(255,255,255,0.6)", margin: "0 0 4px", fontSize: "11px" }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color, margin: "2px 0", fontWeight: 600 }}>
          {entry.name}: {typeof entry.value === "number" && entry.name?.toLowerCase().includes("revenue") ? `$${entry.value.toLocaleString()}` : entry.value}
        </p>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function StatisticsPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterOption>("All Time");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [inqRes, conRes] = await Promise.all([
          fetch("/api/admin/inquiries"),
          fetch("/api/admin/contracts"),
        ]);
        const inqData = await inqRes.json();
        const conData = await conRes.json();
        if (Array.isArray(inqData)) setInquiries(inqData);
        if (Array.isArray(conData)) setContracts(conData);
      } catch (err) {
        console.error("[Statistics] Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ─── Date filter ─── */
  const getDateRange = useMemo(() => {
    if (filter === "All Time") return null;
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
    return { startDate, endDate };
  }, [filter, selectedMonth]);

  const filtered = useMemo(() => {
    if (!getDateRange) return inquiries;
    const { startDate, endDate } = getDateRange;
    return inquiries.filter((i) => {
      const d = new Date(i.created_at);
      return d >= startDate && d <= endDate;
    });
  }, [inquiries, getDateRange]);

  const filteredContracts = useMemo(() => {
    if (!getDateRange) return contracts;
    const { startDate, endDate } = getDateRange;
    return contracts.filter((c) => {
      const d = new Date(c.created_at);
      return d >= startDate && d <= endDate;
    });
  }, [contracts, getDateRange]);

  /* ─── KPI Cards ─── */
  const kpis = useMemo(() => {
    const total = filtered.length;
    const newCount = filtered.filter((i) => i.status === "New").length;
    const booked = filtered.filter((i) => i.status === "Booked");
    const completed = filtered.filter((i) => i.status === "Completed");
    const signedContracts = filteredContracts.filter((c) => c.status === "Signed");
    const completedContracts = filteredContracts.filter((c) => c.status === "Completed");

    const bookedPipeline =
      booked.reduce((s, i) => s + (i.booked_price || 0), 0) +
      signedContracts.reduce((s, c) => s + (c.total_price || 0), 0);

    const completedRevenue =
      completed.reduce((s, i) => s + (i.completed_price || 0), 0) +
      completedContracts.reduce((s, c) => s + (c.total_price || 0), 0);

    const totalCompleted = completed.length + completedContracts.length;
    const avgOrder = totalCompleted > 0 ? completedRevenue / totalCompleted : 0;

    const conversionRate = total > 0 ? ((booked.length + completed.length) / total * 100) : 0;

    return { total, newCount, bookedPipeline, completedRevenue, avgOrder, conversionRate };
  }, [filtered, filteredContracts]);

  /* ─── 1. Inquiries Over Time (monthly bar chart) ─── */
  const inquiriesOverTime = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((i) => {
      const d = new Date(i.created_at);
      const key = `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
      map.set(key, (map.get(key) || 0) + 1);
    });
    // Sort chronologically
    const sorted = [...map.entries()].sort((a, b) => {
      const pa = a[0].split(" ");
      const pb = b[0].split(" ");
      return (Number(pa[1]) * 12 + MONTHS_SHORT.indexOf(pa[0])) - (Number(pb[1]) * 12 + MONTHS_SHORT.indexOf(pb[0]));
    });
    return sorted.map(([name, count]) => ({ name, count }));
  }, [filtered]);

  /* ─── 2. By Service Type ─── */
  const byService = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((i) => {
      const svc = i.service || "Not specified";
      map.set(svc, (map.get(svc) || 0) + 1);
    });
    return [...map.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [filtered]);

  /* ─── 3. Conversion Funnel ─── */
  const funnel = useMemo(() => {
    const map = new Map<string, number>();
    FUNNEL_ORDER.forEach((s) => map.set(s, 0));
    filtered.forEach((i) => {
      if (map.has(i.status)) map.set(i.status, (map.get(i.status) || 0) + 1);
    });
    return FUNNEL_ORDER.map((status) => ({
      name: status,
      count: map.get(status) || 0,
      fill: STATUS_COLORS[status] || "#888",
    }));
  }, [filtered]);

  /* ─── 4. By Source (pie) ─── */
  const bySource = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((i) => {
      const src = i.source === "contact-form" ? "Contact Form" : i.source === "floating-widget" ? "Chat Widget" : (i.source || "Unknown");
      map.set(src, (map.get(src) || 0) + 1);
    });
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [filtered]);

  /* ─── 5. Revenue Over Time (area chart) ─── */
  const revenueOverTime = useMemo(() => {
    const map = new Map<string, { booked: number; completed: number }>();
    filtered.forEach((i) => {
      const d = new Date(i.created_at);
      const key = `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
      const entry = map.get(key) || { booked: 0, completed: 0 };
      if (i.status === "Booked") entry.booked += i.booked_price || 0;
      if (i.status === "Completed") entry.completed += i.completed_price || 0;
      map.set(key, entry);
    });
    filteredContracts.forEach((c) => {
      const d = new Date(c.created_at);
      const key = `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
      const entry = map.get(key) || { booked: 0, completed: 0 };
      if (c.status === "Signed") entry.booked += c.total_price || 0;
      if (c.status === "Completed") entry.completed += c.total_price || 0;
      map.set(key, entry);
    });
    const sorted = [...map.entries()].sort((a, b) => {
      const pa = a[0].split(" ");
      const pb = b[0].split(" ");
      return (Number(pa[1]) * 12 + MONTHS_SHORT.indexOf(pa[0])) - (Number(pb[1]) * 12 + MONTHS_SHORT.indexOf(pb[0]));
    });
    return sorted.map(([name, { booked, completed }]) => ({ name, booked, completed }));
  }, [filtered, filteredContracts]);

  /* ─── 6. Revenue by Service ─── */
  const revenueByService = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((i) => {
      if (i.status === "Completed" && i.completed_price) {
        const svc = i.service || "Not specified";
        map.set(svc, (map.get(svc) || 0) + i.completed_price);
      }
    });
    return [...map.entries()]
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filtered]);

  /* ─── 7. Avg Deal Size Over Time (line chart) ─── */
  const avgDealOverTime = useMemo(() => {
    const map = new Map<string, { total: number; count: number }>();
    filtered.forEach((i) => {
      if (i.status === "Completed" && i.completed_price) {
        const d = new Date(i.created_at);
        const key = `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
        const entry = map.get(key) || { total: 0, count: 0 };
        entry.total += i.completed_price;
        entry.count += 1;
        map.set(key, entry);
      }
    });
    filteredContracts.forEach((c) => {
      if (c.status === "Completed" && c.total_price) {
        const d = new Date(c.created_at);
        const key = `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
        const entry = map.get(key) || { total: 0, count: 0 };
        entry.total += c.total_price;
        entry.count += 1;
        map.set(key, entry);
      }
    });
    const sorted = [...map.entries()].sort((a, b) => {
      const pa = a[0].split(" ");
      const pb = b[0].split(" ");
      return (Number(pa[1]) * 12 + MONTHS_SHORT.indexOf(pa[0])) - (Number(pb[1]) * 12 + MONTHS_SHORT.indexOf(pb[0]));
    });
    return sorted.map(([name, { total, count }]) => ({ name, avg: Math.round(total / count) }));
  }, [filtered, filteredContracts]);

  /* ─── 8. Top Pages ─── */
  const topPages = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((i) => {
      const pg = i.page || "Unknown";
      map.set(pg, (map.get(pg) || 0) + 1);
    });
    return [...map.entries()]
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [filtered]);

  /* ─── 9. Submissions by Day of Week ─── */
  const byDayOfWeek = useMemo(() => {
    const counts = new Array(7).fill(0);
    filtered.forEach((i) => {
      const d = new Date(i.created_at);
      counts[d.getDay()]++;
    });
    return DAYS.map((day, i) => ({ name: day, count: counts[i] }));
  }, [filtered]);

  /* ─── 10. Submissions by Hour ─── */
  const byHour = useMemo(() => {
    const counts = new Array(24).fill(0);
    filtered.forEach((i) => {
      const d = new Date(i.created_at);
      counts[d.getHours()]++;
    });
    return counts.map((count, h) => ({
      name: h === 0 ? "12am" : h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`,
      count,
    }));
  }, [filtered]);

  /* ─── 11. Budget Range Distribution (donut) ─── */
  const budgetDist = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((i) => {
      const budget = i.budget || "Not specified";
      map.set(budget, (map.get(budget) || 0) + 1);
    });
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [filtered]);

  /* ─── 12. UTM Breakdown ─── */
  const utmBreakdown = useMemo(() => {
    const map = new Map<string, { count: number; medium: string; campaign: string }>();
    filtered.forEach((i) => {
      if (i.utm_source) {
        const key = i.utm_source;
        const entry = map.get(key) || { count: 0, medium: i.utm_medium || "—", campaign: i.utm_campaign || "—" };
        entry.count += 1;
        if (i.utm_medium && entry.medium === "—") entry.medium = i.utm_medium;
        if (i.utm_campaign && entry.campaign === "—") entry.campaign = i.utm_campaign;
        map.set(key, entry);
      }
    });
    return [...map.entries()]
      .map(([source, data]) => ({ source, ...data }))
      .sort((a, b) => b.count - a.count);
  }, [filtered]);

  /* ─── Navigation helpers ─── */
  function prevMonth() {
    setSelectedMonth((prev) =>
      prev.month === 0 ? { month: 11, year: prev.year - 1 } : { month: prev.month - 1, year: prev.year }
    );
  }
  function nextMonth() {
    setSelectedMonth((prev) =>
      prev.month === 11 ? { month: 0, year: prev.year + 1 } : { month: prev.month + 1, year: prev.year }
    );
  }

  const filterLabel =
    filter === "Custom"
      ? `${MONTHS[selectedMonth.month]} ${selectedMonth.year}`
      : filter === "This Month"
      ? `${MONTHS[new Date().getMonth()]} ${new Date().getFullYear()}`
      : filter === "Last Month"
      ? (() => { const d = new Date(); d.setMonth(d.getMonth() - 1); return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`; })()
      : "All Time";

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Loading statistics...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header + Sales Summary Bar */}
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "4px", color: ORANGE, fontWeight: 500, marginBottom: "0.5rem" }}>
            Admin
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", fontFamily: "'Arial Black', Arial, sans-serif", margin: 0 }}>
            Statistics
          </h1>
        </div>
        {/* Top bar sales summary */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[
            { label: "Pipeline", value: `$${kpis.bookedPipeline.toLocaleString()}`, color: "#22c55e" },
            { label: "Revenue", value: `$${kpis.completedRevenue.toLocaleString()}`, color: ORANGE },
            { label: "Avg Order", value: `$${Math.round(kpis.avgOrder).toLocaleString()}`, color: "#06b6d4" },
            { label: "Inquiries", value: String(kpis.total), color: "#3b82f6" },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "right" }}>
              <p style={{ fontSize: "20px", fontWeight: 700, color: item.color, margin: 0, lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", margin: "2px 0 0", textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Date Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "12px 20px", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Calendar size={16} color={ORANGE} />
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", letterSpacing: "1px", textTransform: "uppercase" }}>Period</span>
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
                background: filter === opt ? ORANGE : "transparent",
                border: filter === opt ? `1px solid ${ORANGE}` : "1px solid #333",
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
        {filter !== "All Time" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => { setFilter("Custom"); prevMonth(); }} style={{ background: "transparent", border: "1px solid #333", borderRadius: "4px", color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: "4px 8px", display: "flex", alignItems: "center" }}>
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff", minWidth: "140px", textAlign: "center" }}>{filterLabel}</span>
            <button onClick={() => { setFilter("Custom"); nextMonth(); }} style={{ background: "transparent", border: "1px solid #333", borderRadius: "4px", color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: "4px 8px", display: "flex", alignItems: "center" }}>
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.3)" }}>All Time</span>
        )}
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { icon: Inbox, label: "Total Inquiries", value: kpis.total, color: "#3b82f6" },
          { icon: Users, label: "New Inquiries", value: kpis.newCount, color: "#22c55e" },
          { icon: DollarSign, label: "Booked Pipeline", value: `$${kpis.bookedPipeline.toLocaleString()}`, color: "#22c55e" },
          { icon: TrendingUp, label: "Completed Revenue", value: `$${kpis.completedRevenue.toLocaleString()}`, color: ORANGE },
          { icon: BarChart3, label: "Avg Order", value: `$${Math.round(kpis.avgOrder).toLocaleString()}`, color: "#06b6d4" },
          { icon: ArrowUpRight, label: "Conversion Rate", value: `${kpis.conversionRate.toFixed(1)}%`, color: "#a855f7" },
        ].map((kpi) => (
          <div key={kpi.label} style={CARD}>
            <kpi.icon size={18} style={{ color: kpi.color, marginBottom: "0.5rem" }} />
            <p style={{ fontSize: "24px", fontWeight: 700, color: kpi.color, margin: "0 0 0.2rem" }}>{kpi.value}</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* ═══════ INQUIRY ANALYTICS ═══════ */}
      <p style={SECTION_TITLE}>Inquiry Analytics</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {/* Inquiries Over Time */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Inquiries Over Time</p>
          {inquiriesOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={inquiriesOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 11 }} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Inquiries" fill={ORANGE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>

        {/* By Service Type */}
        <div style={CARD}>
          <p style={CARD_TITLE}>By Service Type</p>
          {byService.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={byService.slice(0, 8)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis type="number" tick={{ fill: "#666", fontSize: 11 }} allowDecimals={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: "#999", fontSize: 11 }} width={160} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Inquiries" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {/* Conversion Funnel */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Conversion Funnel</p>
          {filtered.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={funnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 11 }} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Inquiries" radius={[4, 4, 0, 0]}>
                  {funnel.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>

        {/* By Source (Pie) */}
        <div style={CARD}>
          <p style={CARD_TITLE}>By Source</p>
          {bySource.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={bySource} cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3} dataKey="value" label={(props: { name?: string; percent?: number }) => `${props.name || ""} ${((props.percent || 0) * 100).toFixed(0)}%`}>
                  {bySource.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>
      </div>

      {/* ═══════ REVENUE ANALYTICS ═══════ */}
      <p style={SECTION_TITLE}>Revenue Analytics</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {/* Revenue Over Time */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Revenue Over Time</p>
          {revenueOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueOverTime}>
                <defs>
                  <linearGradient id="gradBooked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ORANGE} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={ORANGE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 11 }} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="booked" name="Booked Revenue" stroke="#22c55e" fill="url(#gradBooked)" strokeWidth={2} />
                <Area type="monotone" dataKey="completed" name="Completed Revenue" stroke={ORANGE} fill="url(#gradCompleted)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>

        {/* Revenue by Service */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Revenue by Service</p>
          {revenueByService.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueByService.slice(0, 8)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis type="number" tick={{ fill: "#666", fontSize: 11 }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
                <YAxis dataKey="name" type="category" tick={{ fill: "#999", fontSize: 11 }} width={160} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="revenue" name="Revenue" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {/* Avg Deal Size */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Average Deal Size Over Time</p>
          {avgDealOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={avgDealOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 11 }} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="avg" name="Avg Deal" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>

        {/* Pipeline: Booked vs Completed (stacked) */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Pipeline: Booked vs Completed</p>
          {revenueOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 11 }} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="booked" name="Booked" fill="#22c55e" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill={ORANGE} stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>
      </div>

      {/* ═══════ TRAFFIC & FORM ANALYTICS ═══════ */}
      <p style={SECTION_TITLE}>Traffic & Form Analytics</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {/* Top Pages */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Top Pages Generating Inquiries</p>
          {topPages.length > 0 ? (
            <div>
              {topPages.map((item, i) => (
                <div key={item.page} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < topPages.length - 1 ? "1px solid #1a1a1a" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", minWidth: "20px" }}>#{i + 1}</span>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>{item.page}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: `${Math.max(20, (item.count / (topPages[0]?.count || 1)) * 80)}px`, height: "6px", background: ORANGE, borderRadius: "3px", opacity: 0.6 }} />
                    <span style={{ fontSize: "13px", color: ORANGE, fontWeight: 600, minWidth: "24px", textAlign: "right" }}>{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : <EmptyChart />}
        </div>

        {/* Submissions by Day of Week */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Submissions by Day of Week</p>
          {filtered.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={byDayOfWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 11 }} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Submissions" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {/* Submissions by Hour */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Submissions by Hour of Day</p>
          {filtered.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={byHour}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 9 }} interval={1} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Submissions" fill="#06b6d4" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>

        {/* Budget Range Distribution (donut) */}
        <div style={CARD}>
          <p style={CARD_TITLE}>Budget Range Distribution</p>
          {budgetDist.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={budgetDist} cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3} dataKey="value" label={(props: { name?: string; percent?: number }) => `${props.name || ""} ${((props.percent || 0) * 100).toFixed(0)}%`}>
                  {budgetDist.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>
      </div>

      {/* UTM Breakdown Table */}
      <div style={CARD}>
        <p style={CARD_TITLE}>UTM Campaign Breakdown</p>
        {utmBreakdown.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Source", "Medium", "Campaign", "Inquiries"].map((h) => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #222", fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {utmBreakdown.map((row) => (
                <tr key={row.source}>
                  <td style={{ padding: "8px 12px", fontSize: "13px", color: ORANGE, fontWeight: 600, borderBottom: "1px solid #1a1a1a" }}>{row.source}</td>
                  <td style={{ padding: "8px 12px", fontSize: "13px", color: "rgba(255,255,255,0.6)", borderBottom: "1px solid #1a1a1a" }}>{row.medium}</td>
                  <td style={{ padding: "8px 12px", fontSize: "13px", color: "rgba(255,255,255,0.6)", borderBottom: "1px solid #1a1a1a" }}>{row.campaign}</td>
                  <td style={{ padding: "8px 12px", fontSize: "13px", color: "#fff", fontWeight: 600, borderBottom: "1px solid #1a1a1a" }}>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "2rem 0" }}>
            No UTM data yet. Inquiries from campaigns with UTM parameters will appear here.
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Empty state ─── */
function EmptyChart() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "260px", color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>
      No data for this period
    </div>
  );
}
