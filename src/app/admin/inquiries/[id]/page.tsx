"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Save, Plus } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget: string;
  source: string;
  page: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  status: string;
  booked_price: number | null;
  completed_price: number | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface Quote {
  id: string;
  inquiry_id: string;
  quote_number: string;
  items: { description: string; price: number }[];
  total: number;
  notes: string;
  sent_at: string | null;
  created_at: string;
}

const STATUSES = ["New", "Contacted", "Follow Up", "Quoted", "Booked", "Completed"];

const STATUS_COLORS: Record<string, string> = {
  New: "#3b82f6",
  Contacted: "#eab308",
  "Follow Up": "#a855f7",
  Quoted: "#06b6d4",
  Booked: "#22c55e",
  Completed: "#6b7280",
};

export default function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const [inqRes, quotesRes] = await Promise.all([
        fetch(`/api/admin/inquiries/${id}`),
        fetch(`/api/admin/quotes?inquiry_id=${id}`),
      ]);
      const inqData = await inqRes.json();
      const quotesData = await quotesRes.json();
      setInquiry(inqData);
      setNotes(inqData.notes || "");
      setQuotes(Array.isArray(quotesData) ? quotesData : []);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleStatusChange(newStatus: string) {
    if (!inquiry) return;

    const updates: Record<string, unknown> = { status: newStatus };

    if (newStatus === "Booked") {
      const price = prompt("Enter booked price ($):");
      if (price === null) return;
      const parsed = parseFloat(price);
      if (!isNaN(parsed)) updates.booked_price = parsed;
    }

    if (newStatus === "Completed") {
      const price = prompt("Enter completed price ($):");
      if (price === null) return;
      const parsed = parseFloat(price);
      if (!isNaN(parsed)) updates.completed_price = parsed;
    }

    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    setInquiry(data);
  }

  async function handleSaveNotes() {
    setSaving(true);
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    const data = await res.json();
    setInquiry(data);
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this inquiry? This cannot be undone."))
      return;
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    router.push("/admin/inquiries");
  }

  async function handleCreateQuote() {
    const res = await fetch("/api/admin/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inquiry_id: id,
        items: [],
        total: 0,
        notes: "",
      }),
    });
    const data = await res.json();
    setQuotes((prev) => [data, ...prev]);
  }

  if (loading) {
    return <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>;
  }

  if (!inquiry) {
    return <p style={{ color: "#f87171" }}>Inquiry not found.</p>;
  }

  const infoFields = [
    { label: "Name", value: inquiry.name },
    { label: "Email", value: inquiry.email },
    { label: "Phone", value: inquiry.phone },
    { label: "Service", value: inquiry.service },
    { label: "Budget", value: inquiry.budget },
    { label: "Source", value: inquiry.source },
    { label: "Page", value: inquiry.page },
    { label: "UTM Source", value: inquiry.utm_source },
    { label: "UTM Medium", value: inquiry.utm_medium },
    { label: "UTM Campaign", value: inquiry.utm_campaign },
  ];

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/inquiries"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "rgba(255,255,255,0.5)",
          textDecoration: "none",
          fontSize: "13px",
          marginBottom: "1.5rem",
        }}
      >
        <ArrowLeft size={14} /> Back to Inquiries
      </Link>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
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
            Inquiry
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
            {inquiry.name}
          </h1>
        </div>
        <button
          onClick={handleDelete}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "4px",
            color: "#ef4444",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>

      {/* Two columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        {/* Left: Customer info */}
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "1.25rem",
              margin: "0 0 1.25rem",
            }}
          >
            Customer Info
          </h2>
          {infoFields.map((f) => (
            <div key={f.label} style={{ marginBottom: "0.875rem" }}>
              <p
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "rgba(255,255,255,0.35)",
                  margin: "0 0 0.25rem",
                }}
              >
                {f.label}
              </p>
              <p style={{ fontSize: "14px", color: "#fff", margin: 0 }}>
                {f.value || "—"}
              </p>
            </div>
          ))}
          {inquiry.description && (
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "rgba(255,255,255,0.35)",
                  margin: "0 0 0.25rem",
                }}
              >
                Description
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {inquiry.description}
              </p>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Status */}
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 1rem",
              }}
            >
              Status
            </h2>
            <select
              value={inquiry.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              style={{
                width: "100%",
                padding: "0.625rem",
                background: "#0C0C0C",
                border: `1px solid ${STATUS_COLORS[inquiry.status] || "#222"}`,
                borderRadius: "4px",
                color: STATUS_COLORS[inquiry.status] || "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {inquiry.booked_price != null && (
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "0.75rem",
                  margin: "0.75rem 0 0",
                }}
              >
                Booked Price:{" "}
                <span style={{ color: "#22c55e", fontWeight: 600 }}>
                  ${inquiry.booked_price.toLocaleString()}
                </span>
              </p>
            )}
            {inquiry.completed_price != null && (
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "0.5rem",
                  margin: "0.5rem 0 0",
                }}
              >
                Completed Price:{" "}
                <span style={{ color: "#6b7280", fontWeight: 600 }}>
                  ${inquiry.completed_price.toLocaleString()}
                </span>
              </p>
            )}
          </div>

          {/* Notes */}
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 1rem",
              }}
            >
              Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              style={{
                width: "100%",
                padding: "0.625rem",
                background: "#0C0C0C",
                border: "1px solid #222",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "14px",
                resize: "vertical",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.75rem",
                padding: "0.5rem 1rem",
                background: "#F7941D",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: saving ? "wait" : "pointer",
                opacity: saving ? 0.6 : 1,
              }}
            >
              <Save size={14} /> {saving ? "Saving..." : "Save Notes"}
            </button>
          </div>

          {/* Quotes */}
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.5rem",
            }}
          >
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
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Quotes
              </h2>
              <button
                onClick={handleCreateQuote}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.4rem 0.75rem",
                  background: "rgba(247,148,29,0.15)",
                  border: "1px solid #F7941D",
                  borderRadius: "4px",
                  color: "#F7941D",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Plus size={13} /> Create Quote
              </button>
            </div>
            {quotes.length === 0 ? (
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                }}
              >
                No quotes yet.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {quotes.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem",
                      background: "#0C0C0C",
                      border: "1px solid #1a1a1a",
                      borderRadius: "4px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#F7941D",
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        {q.quote_number}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.4)",
                          margin: "0.25rem 0 0",
                        }}
                      >
                        {q.sent_at
                          ? `Sent ${new Date(q.sent_at).toLocaleDateString()}`
                          : "Not sent"}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#fff",
                        margin: 0,
                      }}
                    >
                      ${q.total.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
