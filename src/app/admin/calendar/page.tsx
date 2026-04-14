"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Info, PlusCircle } from "lucide-react";

const CONTRACT_CATEGORIES = [
  "Vehicle Wrap",
  "Channel Letters",
  "Window Wrap",
  "Wall Wrap",
  "Floor Wrap",
  "Neon Sign",
  "Business Signage",
  "Event / Wedding",
  "Other",
];
const BOOKING_STATUSES = ["Pending", "Sent", "Signed", "Completed"];

const ORANGE = "#F7941D";
const BLACK = "#0C0C0C";

interface CalendarEntry {
  id: string;
  type: "contract" | "inquiry";
  clientName: string;
  category: string;
  totalPrice: number;
  status: string;
  date: string; // ISO date
  href: string;
}

const STATUS_COLORS: Record<string, string> = {
  // Contracts
  Pending: "#EAB308",
  Sent: "#F7941D",
  Signed: "#22C55E",
  Completed: "#6B7280",
  Cancelled: "#EF4444",
  // Inquiries
  Inquiry: "#3B82F6",
};

const LEGEND_ITEMS = [
  { label: "Inquiry", color: "#3B82F6" },
  { label: "Pending", color: "#EAB308" },
  { label: "Sent", color: "#F7941D" },
  { label: "Signed", color: "#22C55E" },
  { label: "Completed", color: "#6B7280" },
  { label: "Cancelled", color: "#EF4444" },
];

type ViewMode = "monthly" | "weekly" | "daily";

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday start
  const days: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

function getWeekDays(date: Date) {
  const day = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((day + 6) % 7));
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatCurrency(n: number) {
  return "$" + n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function CalendarPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewMode>("monthly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showGuide, setShowGuide] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalDate, setAddModalDate] = useState<string>("");
  const [savingBooking, setSavingBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    client_name: "",
    client_email: "",
    event_date: "",
    category: "Other",
    venue: "",
    service_description: "",
    total_price: "",
    advance_amount: "",
    status: "Pending",
  });

  const loadEntries = useCallback(async () => {
    setLoading(true);
    const [contractsRes, inquiriesRes] = await Promise.all([
      fetch("/api/admin/contracts"),
      fetch("/api/admin/inquiries"),
    ]);
    const contracts = await contractsRes.json();
    const inquiries = await inquiriesRes.json();

    const contractInquiryIds = new Set(
      (Array.isArray(contracts) ? contracts : [])
        .filter((c: Record<string, unknown>) => c.inquiry_id)
        .map((c: Record<string, unknown>) => c.inquiry_id)
    );

    const calEntries: CalendarEntry[] = [];

    for (const c of Array.isArray(contracts) ? contracts : []) {
      if (!c.event_date) continue;
      calEntries.push({
        id: c.id,
        type: "contract",
        clientName: c.client_name || "Unknown",
        category: c.category || "Other",
        totalPrice: c.total_price || 0,
        status: c.status || "Pending",
        date: c.event_date,
        href: `/admin/contracts/${c.id}`,
      });
    }

    for (const inq of Array.isArray(inquiries) ? inquiries : []) {
      if (contractInquiryIds.has(inq.id)) continue;
      const d = inq.event_date || inq.created_at;
      if (!d) continue;
      calEntries.push({
        id: inq.id,
        type: "inquiry",
        clientName: inq.name || "Unknown",
        category: inq.service || "General",
        totalPrice: inq.booked_price || 0,
        status: "Inquiry",
        date: d,
        href: `/admin/inquiries/${inq.id}`,
      });
    }

    setEntries(calEntries);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  function openAddModal(forDate?: string) {
    const d = forDate || dateKey(new Date());
    setAddModalDate(d);
    setBookingForm({
      client_name: "",
      client_email: "",
      event_date: d,
      category: "Other",
      venue: "",
      service_description: "",
      total_price: "",
      advance_amount: "",
      status: "Pending",
    });
    setShowAddModal(true);
  }

  async function handleCreateBooking() {
    if (!bookingForm.client_name.trim() || !bookingForm.event_date || !bookingForm.total_price) {
      alert("Client name, event date, and total price are required.");
      return;
    }
    setSavingBooking(true);
    try {
      const res = await fetch("/api/admin/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: bookingForm.client_name.trim(),
          client_email: bookingForm.client_email.trim() || null,
          event_date: bookingForm.event_date,
          venue: bookingForm.venue.trim() || null,
          service_description: bookingForm.service_description.trim() || null,
          category: bookingForm.category,
          total_price: Number(bookingForm.total_price) || 0,
          advance_amount: Number(bookingForm.advance_amount) || 0,
          status: bookingForm.status,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to create booking.");
        return;
      }
      setShowAddModal(false);
      await loadEntries();
    } finally {
      setSavingBooking(false);
    }
  }

  const entriesByDate: Record<string, CalendarEntry[]> = {};
  for (const e of entries) {
    const key = e.date.slice(0, 10);
    if (!entriesByDate[key]) entriesByDate[key] = [];
    entriesByDate[key].push(e);
  }

  const today = dateKey(new Date());

  // Navigation
  function navigatePrev() {
    const d = new Date(currentDate);
    if (view === "monthly") d.setMonth(d.getMonth() - 1);
    else if (view === "weekly") d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  }
  function navigateNext() {
    const d = new Date(currentDate);
    if (view === "monthly") d.setMonth(d.getMonth() + 1);
    else if (view === "weekly") d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  }
  function goToday() {
    setCurrentDate(new Date());
  }

  const monthLabel = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  function EntryCard({ entry, compact }: { entry: CalendarEntry; compact?: boolean }) {
    const color = STATUS_COLORS[entry.status] || "#666";
    if (compact) {
      return (
        <div
          onClick={() => router.push(entry.href)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 4px",
            borderLeft: `3px solid ${color}`,
            background: `${color}15`,
            borderRadius: "2px",
            cursor: "pointer",
            fontSize: "10px",
            color: "#fff",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            marginBottom: "2px",
          }}
          title={`${entry.clientName} — ${entry.category} — ${formatCurrency(entry.totalPrice)}`}
        >
          <span style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>
            {entry.clientName}
          </span>
        </div>
      );
    }
    return (
      <div
        onClick={() => router.push(entry.href)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 12px",
          borderLeft: `4px solid ${color}`,
          background: "#111",
          border: "1px solid #222",
          borderLeftColor: color,
          borderLeftWidth: "4px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "border-color 0.2s",
          marginBottom: "6px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {entry.clientName}
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>
            {entry.category}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: ORANGE }}>
            {formatCurrency(entry.totalPrice)}
          </div>
          <div style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color,
            marginTop: "2px",
          }}>
            {entry.type === "inquiry" ? "INQUIRY" : entry.status.toUpperCase()}
          </div>
        </div>
      </div>
    );
  }

  // Monthly view
  function MonthlyView() {
    const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px", background: "#222", borderRadius: "4px", overflow: "hidden" }}>
          {weekdays.map((wd) => (
            <div key={wd} style={{ padding: "8px", textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", color: "rgba(255,255,255,0.4)", background: "#111", textTransform: "uppercase" }}>
              {wd}
            </div>
          ))}
          {days.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} style={{ background: "#0a0a0a", minHeight: "100px", padding: "6px" }} />;
            const key = dateKey(day);
            const isToday = key === today;
            const dayEntries = entriesByDate[key] || [];
            return (
              <div
                key={key}
                onClick={() => {
                  if (dayEntries.length === 0) openAddModal(key);
                }}
                style={{
                  background: isToday ? "rgba(247,148,29,0.06)" : BLACK,
                  minHeight: "100px",
                  padding: "6px",
                  position: "relative",
                  cursor: dayEntries.length === 0 ? "pointer" : "default",
                }}
              >
                <div style={{
                  fontSize: "12px",
                  fontWeight: isToday ? 800 : 500,
                  color: isToday ? ORANGE : "rgba(255,255,255,0.6)",
                  marginBottom: "4px",
                  width: isToday ? "22px" : "auto",
                  height: isToday ? "22px" : "auto",
                  borderRadius: "50%",
                  background: isToday ? ORANGE : "transparent",
                  display: isToday ? "flex" : "block",
                  alignItems: "center",
                  justifyContent: "center",
                  ...(isToday ? { color: BLACK } : {}),
                }}>
                  {day.getDate()}
                </div>
                {dayEntries.slice(0, 3).map((e) => (
                  <EntryCard key={e.id} entry={e} compact />
                ))}
                {dayEntries.length > 3 && (
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)", padding: "2px 4px" }}>
                    +{dayEntries.length - 3} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Weekly view
  function WeeklyView() {
    const days = getWeekDays(currentDate);
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
        {days.map((day) => {
          const key = dateKey(day);
          const isToday = key === today;
          const dayEntries = entriesByDate[key] || [];
          return (
            <div key={key} style={{
              background: "#111",
              border: `1px solid ${isToday ? ORANGE : "#222"}`,
              borderRadius: "4px",
              padding: "10px",
              minHeight: "200px",
            }}>
              <div style={{
                fontSize: "11px",
                fontWeight: 700,
                color: isToday ? ORANGE : "rgba(255,255,255,0.5)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}>
                {day.toLocaleDateString("default", { weekday: "short", month: "short", day: "numeric" })}
              </div>
              {dayEntries.map((e) => (
                <EntryCard key={e.id} entry={e} compact />
              ))}
              {dayEntries.length === 0 && (
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)", textAlign: "center", marginTop: "40px" }}>
                  No bookings
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Daily view
  function DailyView() {
    const key = dateKey(currentDate);
    const dayEntries = entriesByDate[key] || [];
    const isToday = key === today;
    return (
      <div>
        <div style={{
          fontSize: "16px",
          fontWeight: 700,
          color: isToday ? ORANGE : "#fff",
          marginBottom: "16px",
        }}>
          {currentDate.toLocaleDateString("default", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          {isToday && <span style={{ fontSize: "11px", marginLeft: "8px", color: ORANGE, fontWeight: 500 }}>Today</span>}
        </div>
        {dayEntries.length === 0 ? (
          <div style={{
            padding: "60px 24px",
            textAlign: "center",
            color: "rgba(255,255,255,0.3)",
            fontSize: "14px",
            background: "#111",
            borderRadius: "4px",
            border: "1px solid #222",
          }}>
            No bookings for this day
          </div>
        ) : (
          dayEntries.map((e) => <EntryCard key={e.id} entry={e} />)
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="admin-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "4px", color: ORANGE, fontWeight: 500, marginBottom: "0.5rem" }}>
            BOOKINGS
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", fontFamily: "'Arial Black', Arial, sans-serif", margin: 0 }}>
            Calendar
          </h1>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => openAddModal()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: ORANGE,
              border: "none",
              borderRadius: "4px",
              color: BLACK,
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <PlusCircle size={14} /> Add Booking
          </button>
          <button
            onClick={() => setShowGuide(!showGuide)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: showGuide ? "rgba(59,130,246,0.15)" : "transparent",
              border: "1px solid #333",
              borderRadius: "4px",
              color: showGuide ? "#3B82F6" : "rgba(255,255,255,0.5)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Info size={14} /> Guide
          </button>
        </div>
      </div>

      {/* Guide */}
      {showGuide && (
        <div style={{
          background: "#111",
          border: "1px solid #222",
          borderRadius: "4px",
          padding: "16px 20px",
          marginBottom: "1.5rem",
        }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Color Guide
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: item.color }} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: "12px 0 0", lineHeight: 1.6 }}>
            <strong style={{ color: "rgba(255,255,255,0.5)" }}>Blue</strong> = Inquiry (lead, no contract yet).{" "}
            <strong style={{ color: "rgba(255,255,255,0.5)" }}>Yellow</strong> = Contract created but not sent.{" "}
            <strong style={{ color: "rgba(255,255,255,0.5)" }}>Orange</strong> = Contract sent, waiting for signature.{" "}
            <strong style={{ color: "rgba(255,255,255,0.5)" }}>Green</strong> = Signed and confirmed.{" "}
            <strong style={{ color: "rgba(255,255,255,0.5)" }}>Gray</strong> = Completed job.{" "}
            <strong style={{ color: "rgba(255,255,255,0.5)" }}>Red</strong> = Cancelled.
            Inquiries linked to a contract are hidden to avoid duplicates. Click any entry to view details.
          </p>
        </div>
      )}

      {/* Navigation bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={navigatePrev} style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", background: "#111", border: "1px solid #222", borderRadius: "4px", color: "#fff", cursor: "pointer" }}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={goToday} style={{ padding: "6px 14px", background: "#111", border: "1px solid #222", borderRadius: "4px", color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
            Today
          </button>
          <button onClick={navigateNext} style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", background: "#111", border: "1px solid #222", borderRadius: "4px", color: "#fff", cursor: "pointer" }}>
            <ChevronRight size={16} />
          </button>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 0 8px" }}>
            {view === "daily"
              ? currentDate.toLocaleDateString("default", { month: "long", day: "numeric", year: "numeric" })
              : monthLabel}
          </h2>
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", background: "#111", border: "1px solid #222", borderRadius: "4px", overflow: "hidden" }}>
          {(["monthly", "weekly", "daily"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "6px 16px",
                background: view === v ? ORANGE : "transparent",
                border: "none",
                color: view === v ? BLACK : "rgba(255,255,255,0.5)",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar content */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading bookings...</p>
      ) : (
        <>
          {view === "monthly" && <MonthlyView />}
          {view === "weekly" && <WeeklyView />}
          {view === "daily" && <DailyView />}
        </>
      )}

      {/* Summary */}
      {!loading && (
        <div style={{
          display: "flex",
          gap: "16px",
          marginTop: "1.5rem",
          flexWrap: "wrap",
        }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
            Total entries: <span style={{ color: "#fff", fontWeight: 600 }}>{entries.length}</span>
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
            Contracts: <span style={{ color: "#fff", fontWeight: 600 }}>{entries.filter((e) => e.type === "contract").length}</span>
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
            Inquiries: <span style={{ color: "#fff", fontWeight: 600 }}>{entries.filter((e) => e.type === "inquiry").length}</span>
          </div>
        </div>
      )}

      {showAddModal && (
        <div
          onClick={() => !savingBooking && setShowAddModal(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, padding: 16 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#111", border: "1px solid #222", borderRadius: 8, padding: "1.5rem", width: "min(520px, 100%)", maxHeight: "90vh", overflowY: "auto" }}
          >
            <h3 style={{ margin: "0 0 0.25rem", fontSize: 20, color: "#fff", fontWeight: 700 }}>Add Booking</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "0 0 1.25rem" }}>Creates a contract that will show on the calendar, orders, and dashboard.</p>

            {[
              { key: "client_name", label: "Client Name", type: "text", required: true },
              { key: "client_email", label: "Client Email", type: "email" },
              { key: "event_date", label: "Event Date", type: "date", required: true },
              { key: "venue", label: "Venue", type: "text" },
              { key: "service_description", label: "Service Description", type: "text" },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: "0.75rem" }}>
                <label style={{ display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
                  {f.label}{f.required ? " *" : ""}
                </label>
                <input
                  type={f.type}
                  value={bookingForm[f.key as keyof typeof bookingForm]}
                  onChange={(e) => setBookingForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  style={{ width: "100%", padding: "0.55rem", background: "#0C0C0C", border: "1px solid #333", borderRadius: 4, color: "#fff", fontSize: 14, colorScheme: "dark", boxSizing: "border-box" }}
                />
              </div>
            ))}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Total Price *</label>
                <input
                  type="number"
                  value={bookingForm.total_price}
                  onChange={(e) => setBookingForm((p) => ({ ...p, total_price: e.target.value }))}
                  placeholder="0"
                  style={{ width: "100%", padding: "0.55rem", background: "#0C0C0C", border: "1px solid #333", borderRadius: 4, color: "#fff", fontSize: 14, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Advance</label>
                <input
                  type="number"
                  value={bookingForm.advance_amount}
                  onChange={(e) => setBookingForm((p) => ({ ...p, advance_amount: e.target.value }))}
                  placeholder="0"
                  style={{ width: "100%", padding: "0.55rem", background: "#0C0C0C", border: "1px solid #333", borderRadius: 4, color: "#fff", fontSize: 14, boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Category</label>
                <select
                  value={bookingForm.category}
                  onChange={(e) => setBookingForm((p) => ({ ...p, category: e.target.value }))}
                  style={{ width: "100%", padding: "0.55rem", background: "#0C0C0C", border: "1px solid #333", borderRadius: 4, color: "#fff", fontSize: 14 }}
                >
                  {CONTRACT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Status</label>
                <select
                  value={bookingForm.status}
                  onChange={(e) => setBookingForm((p) => ({ ...p, status: e.target.value }))}
                  style={{ width: "100%", padding: "0.55rem", background: "#0C0C0C", border: "1px solid #333", borderRadius: 4, color: "#fff", fontSize: 14 }}
                >
                  {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowAddModal(false)}
                disabled={savingBooking}
                style={{ background: "#222", color: "#fff", border: "none", padding: "0.55rem 1.25rem", borderRadius: 4, cursor: "pointer", fontSize: 13 }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBooking}
                disabled={savingBooking}
                style={{ background: ORANGE, color: BLACK, border: "none", padding: "0.55rem 1.25rem", borderRadius: 4, cursor: "pointer", fontSize: 13, fontWeight: 700, opacity: savingBooking ? 0.6 : 1 }}
              >
                {savingBooking ? "Saving..." : "Create Booking"}
              </button>
            </div>
            {addModalDate && (
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, margin: "0.75rem 0 0", textAlign: "center" }}>
                Source date: {addModalDate}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
