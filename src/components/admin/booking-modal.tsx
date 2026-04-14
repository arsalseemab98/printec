"use client";

import { useEffect, useState } from "react";

const ORANGE = "#F7941D";
const BLACK = "#0C0C0C";

export const CONTRACT_CATEGORIES = [
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
export const BOOKING_STATUSES = ["Pending", "Sent", "Signed", "Completed"];

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  defaultDate?: string;
  defaultStatus?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: 2,
  color: "rgba(255,255,255,0.4)",
  marginBottom: 4,
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.55rem",
  background: BLACK,
  border: "1px solid #333",
  borderRadius: 4,
  color: "#fff",
  fontSize: 14,
  colorScheme: "dark",
  boxSizing: "border-box",
};

export function BookingModal({
  open,
  onClose,
  onCreated,
  defaultDate,
  defaultStatus = "Pending",
  title = "Add Booking",
  subtitle = "Creates a contract that will show on the calendar, orders, and dashboard.",
  ctaLabel = "Create Booking",
}: BookingModalProps) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => ({
    client_name: "",
    client_email: "",
    event_date: defaultDate || dateKey(new Date()),
    category: "Other",
    venue: "",
    service_description: "",
    total_price: "",
    advance_amount: "",
    status: defaultStatus,
  }));

  useEffect(() => {
    if (open) {
      setForm({
        client_name: "",
        client_email: "",
        event_date: defaultDate || dateKey(new Date()),
        category: "Other",
        venue: "",
        service_description: "",
        total_price: "",
        advance_amount: "",
        status: defaultStatus,
      });
    }
  }, [open, defaultDate, defaultStatus]);

  if (!open) return null;

  async function handleSubmit() {
    if (!form.client_name.trim() || !form.event_date || !form.total_price) {
      alert("Client name, event date, and total price are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: form.client_name.trim(),
          client_email: form.client_email.trim() || null,
          event_date: form.event_date,
          venue: form.venue.trim() || null,
          service_description: form.service_description.trim() || null,
          category: form.category,
          total_price: Number(form.total_price) || 0,
          advance_amount: Number(form.advance_amount) || 0,
          status: form.status,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to create.");
        return;
      }
      onCreated();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      onClick={() => !saving && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, padding: 16 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#111", border: "1px solid #222", borderRadius: 8, padding: "1.5rem", width: "min(520px, 100%)", maxHeight: "90vh", overflowY: "auto" }}
      >
        <h3 style={{ margin: "0 0 0.25rem", fontSize: 20, color: "#fff", fontWeight: 700 }}>{title}</h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "0 0 1.25rem" }}>{subtitle}</p>

        {[
          { key: "client_name", label: "Client Name", type: "text", required: true },
          { key: "client_email", label: "Client Email", type: "email" },
          { key: "event_date", label: "Event Date", type: "date", required: true },
          { key: "venue", label: "Venue", type: "text" },
          { key: "service_description", label: "Service Description", type: "text" },
        ].map((f) => (
          <div key={f.key} style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>
              {f.label}{f.required ? " *" : ""}
            </label>
            <input
              type={f.type}
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Total Price *</label>
            <input
              type="number"
              value={form.total_price}
              onChange={(e) => setForm((p) => ({ ...p, total_price: e.target.value }))}
              placeholder="0"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Advance</label>
            <input
              type="number"
              value={form.advance_amount}
              onChange={(e) => setForm((p) => ({ ...p, advance_amount: e.target.value }))}
              placeholder="0"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              style={inputStyle}
            >
              {CONTRACT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
              style={inputStyle}
            >
              {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            disabled={saving}
            style={{ background: "#222", color: "#fff", border: "none", padding: "0.55rem 1.25rem", borderRadius: 4, cursor: "pointer", fontSize: 13 }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{ background: ORANGE, color: BLACK, border: "none", padding: "0.55rem 1.25rem", borderRadius: 4, cursor: "pointer", fontSize: 13, fontWeight: 700, opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving..." : ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
