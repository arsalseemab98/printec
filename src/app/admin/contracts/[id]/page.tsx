"use client";

import { useEffect, useState, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Send,
  Copy,
  Download,
  Pencil,
  Check,
  X,
} from "lucide-react";

interface Contract {
  id: string;
  contract_number: string;
  inquiry_id: string | null;
  client_name: string | null;
  client_email: string | null;
  event_date: string | null;
  venue: string | null;
  service_description: string | null;
  total_price: number;
  advance_amount: number;
  balance_amount: number;
  balance_due: string | null;
  travel_cost: number;
  terms: string[] | null;
  status: string;
  category: string | null;
  sent_at: string | null;
  signed_at: string | null;
  signature_data: string | null;
  created_at: string;
  updated_at: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem",
  background: "#0C0C0C",
  border: "1px solid #333",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "rgba(255,255,255,0.35)",
  display: "block",
  marginBottom: "4px",
  fontWeight: 500,
};

export default function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Contract>>({});
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const CONTRACT_STATUSES = ["Pending", "Sent", "Signed", "Completed", "Cancelled"] as const;
  const CONTRACT_STATUS_COLORS: Record<string, string> = {
    Pending: "#eab308",
    Sent: "#3b82f6",
    Signed: "#22c55e",
    Completed: "#F7941D",
    Cancelled: "#ef4444",
  };

  async function handleStatusChange(newStatus: string) {
    if (!contract) return;
    if (newStatus === contract.status) return;
    if (newStatus === "Completed" && !confirm("Mark this contract as completed? This will add it to Completed Revenue on the dashboard.")) return;
    if (newStatus === "Cancelled" && !confirm("Cancel this contract? This will remove it from sales metrics.")) return;

    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/contracts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setContract(data);
      }
    } catch {
      // silent
    } finally {
      setUpdatingStatus(false);
    }
  }

  const fetchContract = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/contracts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setContract(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  function startEditing() {
    if (!contract) return;
    setEditData({
      client_name: contract.client_name || "",
      client_email: contract.client_email || "",
      event_date: contract.event_date || "",
      venue: contract.venue || "",
      service_description: contract.service_description || "",
      category: contract.category || "Other",
      total_price: contract.total_price,
      travel_cost: contract.travel_cost,
      advance_amount: contract.advance_amount,
      balance_due: contract.balance_due || "",
      terms: contract.terms ? [...contract.terms] : [],
    });
    setEditing(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/contracts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        const data = await res.json();
        setContract(data);
        setEditing(false);
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  }

  async function handleSend() {
    if (!confirm("Send this contract to the client via email?")) return;
    setSending(true);
    try {
      const res = await fetch(`/api/admin/contracts/${id}/send`, {
        method: "POST",
      });
      if (res.ok) {
        await fetchContract();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to send.");
      }
    } catch {
      alert("Failed to send contract.");
    } finally {
      setSending(false);
    }
  }

  async function handleDelete() {
    if (
      !confirm(
        "Are you sure you want to delete this contract? This cannot be undone."
      )
    )
      return;
    await fetch(`/api/admin/contracts/${id}`, { method: "DELETE" });
    router.push("/admin/contracts");
  }

  async function handleDownloadPDF() {
    if (!contract) return;
    setDownloadingPdf(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { ContractPDF } = await import("@/lib/contract-pdf");
      const React = await import("react");
      const element = React.createElement(ContractPDF, {
        contract_number: contract.contract_number,
        client_name: contract.client_name || "",
        client_email: contract.client_email || "",
        event_date: contract.event_date,
        venue: contract.venue,
        service_description: contract.service_description,
        total_price: contract.total_price,
        travel_cost: contract.travel_cost,
        advance_amount: contract.advance_amount,
        balance_amount: contract.balance_amount,
        balance_due: contract.balance_due,
        terms: contract.terms || [],
        signature_data: contract.signature_data,
        signed_at: contract.signed_at,
        logoUrl: "/printec-logo.png",
        providerSignatureUrl: "/azhar-signature.png",
      });
      const blob = await pdf(element as any).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${contract.contract_number}${contract.signed_at ? "-signed" : ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF.");
    } finally {
      setDownloadingPdf(false);
    }
  }

  function handleCopyLink() {
    const link = `https://printecwrap.com/sign/${id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatDate(dateStr: string) {
    const [y, m, d] = dateStr.slice(0, 10).split("-").map(Number);
    const local = new Date(y, (m || 1) - 1, d || 1);
    return local.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "#F7941D";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "#333";
  }

  function renderStatusDropdown() {
    if (!contract) return null;
    const color = CONTRACT_STATUS_COLORS[contract.status] || "#888";
    return (
      <select
        value={contract.status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={updatingStatus}
        style={{
          padding: "0.3rem 0.75rem",
          borderRadius: "4px",
          background: `${color}20`,
          color: color,
          border: `1px solid ${color}40`,
          fontSize: "13px",
          fontWeight: 600,
          cursor: updatingStatus ? "wait" : "pointer",
          outline: "none",
          opacity: updatingStatus ? 0.6 : 1,
        }}
      >
        {CONTRACT_STATUSES.map((s) => (
          <option key={s} value={s} style={{ background: "#111", color: "#fff" }}>
            {s}
          </option>
        ))}
      </select>
    );
  }

  if (loading) {
    return <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>;
  }

  if (!contract) {
    return <p style={{ color: "#f87171" }}>Contract not found.</p>;
  }

  const isSigned = contract.status === "Signed" || contract.status === "Completed";
  const isCancelled = contract.status === "Cancelled";

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/contracts"
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
        <ArrowLeft size={14} /> Back to Contracts
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
            Contract
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: 900,
                color: "#fff",
                fontFamily: "'Arial Black', Arial, sans-serif",
                margin: 0,
              }}
            >
              {contract.contract_number}
            </h1>
            {renderStatusDropdown()}
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {!isSigned && !isCancelled && !editing && (
            <button
              onClick={startEditing}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1rem",
                background: "transparent",
                border: "1px solid #F7941D",
                borderRadius: "4px",
                color: "#F7941D",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Pencil size={14} /> Edit
            </button>
          )}
          {editing && (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  background: "#F7941D",
                  border: "none",
                  borderRadius: "4px",
                  color: "#0C0C0C",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: saving ? "wait" : "pointer",
                  opacity: saving ? 0.6 : 1,
                }}
              >
                <Check size={14} /> {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  background: "transparent",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: "#999",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                <X size={14} /> Cancel
              </button>
            </>
          )}
          <button
            onClick={handleDelete}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
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
      </div>

      {/* Two columns */}
      <div
        className="admin-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Left: Client & Event Info */}
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
              margin: "0 0 1.25rem",
            }}
          >
            Client & Event Details
          </h2>

          {editing ? (
            <>
              {[
                { key: "client_name", label: "Client Name", type: "text" },
                { key: "client_email", label: "Client Email", type: "email" },
                { key: "event_date", label: "Event Date", type: "date" },
                { key: "venue", label: "Venue", type: "text" },
              ].map((f) => (
                <div key={f.key} style={{ marginBottom: "0.75rem" }}>
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    type={f.type}
                    value={String(editData[f.key as keyof Contract] ?? "")}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        [f.key]: e.target.value,
                      }))
                    }
                    style={{
                      ...inputStyle,
                      ...(f.type === "date" ? { colorScheme: "dark" } : {}),
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              ))}
              <div style={{ marginBottom: "0.75rem" }}>
                <label style={labelStyle}>Category</label>
                <select
                  value={String(editData.category ?? "Other")}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  {["Dance Floor Wraps", "Wall Wraps", "Window Wraps", "Channel Letters", "Vinyl Wraps", "Business Signage", "Neon Signs", "Other"].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Service Description</label>
                <textarea
                  value={String(editData.service_description ?? "")}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      service_description: e.target.value,
                    }))
                  }
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </>
          ) : (
            <>
              {[
                { label: "Client Name", value: contract.client_name },
                { label: "Client Email", value: contract.client_email },
                { label: "Category", value: contract.category },
                {
                  label: "Event Date",
                  value: contract.event_date
                    ? formatDate(contract.event_date)
                    : null,
                },
                { label: "Venue", value: contract.venue },
                {
                  label: "Service Description",
                  value: contract.service_description,
                },
              ]
                .filter((f) => f.value && String(f.value).trim() !== "")
                .map((f) => (
                  <div key={f.label} style={{ marginBottom: "0.875rem" }}>
                    <p style={{ ...labelStyle, margin: "0 0 0.25rem" }}>
                      {f.label}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#fff",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {f.value}
                    </p>
                  </div>
                ))}
            </>
          )}
        </div>

        {/* Right: Pricing & Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Pricing */}
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
                margin: "0 0 1.25rem",
              }}
            >
              Pricing
            </h2>

            {editing ? (
              <>
                {[
                  { key: "total_price", label: "Total Price ($)" },
                  { key: "travel_cost", label: "Travel Cost ($)" },
                  { key: "advance_amount", label: "Advance Amount ($)" },
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: "0.75rem" }}>
                    <label style={labelStyle}>{f.label}</label>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={
                        (editData[f.key as keyof Contract] as number) || ""
                      }
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          [f.key]: Number(e.target.value) || 0,
                        }))
                      }
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={labelStyle}>Balance Amount ($)</label>
                  <div
                    style={{
                      ...inputStyle,
                      background: "#181818",
                      color: "#F7941D",
                      fontWeight: 700,
                      cursor: "default",
                    }}
                  >
                    {(
                      (editData.total_price || 0) -
                      (editData.advance_amount || 0)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Balance Due</label>
                  <input
                    type="text"
                    value={String(editData.balance_due ?? "")}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        balance_due: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </>
            ) : (
              <>
                {[
                  {
                    label: "Total Price",
                    value: formatCurrency(contract.total_price),
                    highlight: true,
                  },
                  {
                    label: "Travel Cost",
                    value: formatCurrency(contract.travel_cost),
                  },
                  {
                    label: "Advance Amount",
                    value: formatCurrency(contract.advance_amount),
                  },
                  {
                    label: "Balance Amount",
                    value: formatCurrency(contract.balance_amount),
                    highlight: true,
                  },
                  { label: "Balance Due", value: contract.balance_due },
                ].map((f) => (
                  <div key={f.label} style={{ marginBottom: "0.875rem" }}>
                    <p style={{ ...labelStyle, margin: "0 0 0.25rem" }}>
                      {f.label}
                    </p>
                    <p
                      style={{
                        fontSize: f.highlight ? "18px" : "14px",
                        color: f.highlight ? "#F7941D" : "#fff",
                        fontWeight: f.highlight ? 700 : 400,
                        margin: 0,
                      }}
                    >
                      {f.value || "\u2014"}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Actions */}
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
              Actions
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {!isSigned && !isCancelled && (
                <button
                  onClick={handleSend}
                  disabled={sending}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 1rem",
                    background: "#F7941D",
                    border: "none",
                    borderRadius: "4px",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: sending ? "wait" : "pointer",
                    opacity: sending ? 0.6 : 1,
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Send size={14} />{" "}
                  {sending ? "Sending..." : "Send to Customer"}
                </button>
              )}
              <button
                onClick={handleCopyLink}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1rem",
                  background: "transparent",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: copied ? "#22c55e" : "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                  justifyContent: "center",
                  transition: "color 0.2s",
                }}
              >
                {copied ? (
                  <>
                    <Check size={14} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy Signing Link
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={downloadingPdf}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1rem",
                  background: "transparent",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: downloadingPdf ? "wait" : "pointer",
                  opacity: downloadingPdf ? 0.6 : 1,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Download size={14} />{" "}
                {downloadingPdf
                  ? "Generating..."
                  : isSigned
                    ? "Download Signed PDF"
                    : "Download PDF"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div
        style={{
          background: "#111",
          border: "1px solid #222",
          borderRadius: "4px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 1.25rem",
          }}
        >
          Contract Terms
        </h2>

        {editing ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {(editData.terms || []).map((term, i) => (
              <div key={i}>
                <label style={labelStyle}>Term {i + 1}</label>
                <textarea
                  value={term}
                  onChange={(e) => {
                    const updated = [...(editData.terms || [])];
                    updated[i] = e.target.value;
                    setEditData((prev) => ({ ...prev, terms: updated }));
                  }}
                  rows={2}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            ))}
          </div>
        ) : contract.terms && contract.terms.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {contract.terms.map((term, i) => (
              <div
                key={i}
                style={{
                  padding: "0.75rem",
                  background: "#0C0C0C",
                  border: "1px solid #1a1a1a",
                  borderRadius: "4px",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#F7941D",
                    margin: "0 0 0.35rem",
                    fontWeight: 600,
                  }}
                >
                  Term {i + 1}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {term}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "14px",
              margin: 0,
            }}
          >
            No terms defined.
          </p>
        )}
      </div>

      {/* Signature (if signed) */}
      {isSigned && contract.signature_data && (
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 1.25rem",
            }}
          >
            Signature
          </h2>
          <div
            style={{
              background: "#fff",
              borderRadius: "4px",
              padding: "1rem",
              display: "inline-block",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={contract.signature_data}
              alt="Client signature"
              style={{ maxWidth: "400px", height: "auto" }}
            />
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
              marginTop: "0.75rem",
              margin: "0.75rem 0 0",
            }}
          >
            Signed on {formatDate(contract.signed_at!)}
          </p>
        </div>
      )}

      {/* Meta info */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          color: "rgba(255,255,255,0.3)",
          fontSize: "12px",
        }}
      >
        <span>Created: {formatDate(contract.created_at)}</span>
        {contract.updated_at && (
          <span>Updated: {formatDate(contract.updated_at)}</span>
        )}
      </div>
    </div>
  );
}
