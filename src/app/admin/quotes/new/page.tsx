"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES_NAV } from "@/lib/constants";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  background: "#111",
  border: "1px solid #333",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "rgba(255,255,255,0.6)",
  display: "block",
  marginBottom: "6px",
  fontWeight: 600,
};

export default function NewQuotePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = "#F7941D";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = "#333";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    if (!trimmedName || !service) {
      setError("Name and Service are required.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: email.trim() || null,
          phone: phone.trim() || null,
          service,
          description: description.trim() || null,
          budget: budget.trim() || null,
          event_date: eventDate || null,
          source: "manual-quote",
          status: "Quoted",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/admin/inquiries/${data.id}/quote`);
      } else {
        const err = await res.json().catch(() => null);
        setError(err?.error || "Failed to create inquiry.");
        setSubmitting(false);
      }
    } catch {
      setError("Failed to create inquiry.");
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/quotes"
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
        <ArrowLeft size={14} /> Back to Quotes
      </Link>

      {/* Header */}
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
        New Quote
      </p>
      <h1
        style={{
          fontSize: "36px",
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 0.5rem 0",
        }}
      >
        Create Manual Quote
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.45)",
          margin: "0 0 2rem 0",
          lineHeight: 1.6,
        }}
      >
        Enter customer details to create a new quote. An inquiry will be automatically created.
      </p>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Error box */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "4px",
              padding: "0.75rem 1rem",
              color: "#ef4444",
              fontSize: "14px",
              marginBottom: "1.5rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {/* Name */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>
                Name <span style={{ color: "#F7941D" }}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Customer name"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Service */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>
                Service <span style={{ color: "#F7941D" }}>*</span>
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="">Select a service...</option>
                {SERVICES_NAV.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project details..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Budget + Event Date row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Budget</label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. $500"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  style={{ ...inputStyle, colorScheme: "dark" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <Link
              href="/admin/quotes"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.65rem 1.25rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #333",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.65rem 1.25rem",
                background: "#F7941D",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: submitting ? "wait" : "pointer",
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? "Creating..." : "Create Quote"} <ArrowRight size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
