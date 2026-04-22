"use client";

import { useEffect, useState, use, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, Send, Download } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  description: string | null;
}

interface QuoteItem {
  description: string;
  price: number;
}

interface Quote {
  id: string;
  inquiry_id: string;
  quote_number: string;
  items: QuoteItem[];
  total: number;
  notes: string;
  sent_at: string | null;
  created_at: string;
}

export default function QuoteBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: inquiryId } = use(params);
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("quote_id");

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [items, setItems] = useState<QuoteItem[]>([
    { description: "", price: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const total = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const loadData = useCallback(async () => {
    try {
      // Fetch inquiry
      const inqRes = await fetch(`/api/admin/inquiries/${inquiryId}`);
      const inqData = await inqRes.json();
      setInquiry(inqData);

      // Fetch existing quote if editing
      if (quoteId) {
        const qRes = await fetch(`/api/admin/quotes/${quoteId}`);
        if (qRes.ok) {
          const qData = await qRes.json();
          setQuote(qData);
          setItems(
            qData.items && qData.items.length > 0
              ? qData.items
              : [{ description: "", price: 0 }]
          );
          setNotes(qData.notes || "");
        }
      }
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  }, [inquiryId, quoteId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function showMessage(text: string, type: "success" | "error") {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  }

  function handleItemChange(
    index: number,
    field: "description" | "price",
    value: string
  ) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: field === "price" ? parseFloat(value) || 0 : value,
            }
          : item
      )
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { description: "", price: 0 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const validItems = items.filter(
        (item) => item.description.trim() !== ""
      );

      if (validItems.length === 0) {
        showMessage("Add at least one line item.", "error");
        setSaving(false);
        return;
      }

      const payload = {
        inquiry_id: inquiryId,
        items: validItems,
        total,
        notes,
      };

      let res: Response;
      if (quote) {
        // Update existing
        res = await fetch(`/api/admin/quotes/${quote.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new
        res = await fetch("/api/admin/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }

      const saved = await res.json();
      const wasNew = !quote;
      setQuote(saved);
      setItems(
        saved.items && saved.items.length > 0
          ? saved.items
          : [{ description: "", price: 0 }]
      );
      setNotes(saved.notes || "");
      showMessage(
        quote ? "Quote updated successfully." : "Quote created successfully.",
        "success"
      );

      // Update URL with quote_id if newly created
      if (wasNew) {
        window.history.replaceState(
          null,
          "",
          `/admin/inquiries/${inquiryId}/quote?quote_id=${saved.id}`
        );
        // Promote the inquiry to Quoted now that an actual quote exists.
        // Best-effort: failure here doesn't void the saved quote.
        fetch(`/api/admin/inquiries/${inquiryId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Quoted" }),
        }).catch((e) => console.error("Failed to promote inquiry to Quoted:", e));
      }
    } catch (err) {
      showMessage(
        err instanceof Error ? err.message : "Failed to save quote.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleSend() {
    if (!quote) return;
    if (
      !confirm(
        `Send quote ${quote.quote_number} to ${inquiry?.email}? This will email the PDF.`
      )
    )
      return;

    setSending(true);
    try {
      const res = await fetch(`/api/admin/quotes/${quote.id}/send`, {
        method: "POST",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Send failed");
      }

      const data = await res.json();
      setQuote((prev) => (prev ? { ...prev, sent_at: data.sent_at } : prev));
      if (data.warning) {
        showMessage(`Quote sent — warning: ${data.warning}`, "error");
      } else {
        showMessage("Quote sent to customer successfully!", "success");
      }
    } catch (err) {
      showMessage(
        err instanceof Error ? err.message : "Failed to send quote.",
        "error"
      );
    } finally {
      setSending(false);
    }
  }

  async function handleDownload() {
    if (!quote || !inquiry) return;

    try {
      // Dynamic import to avoid loading react-pdf on initial page load
      const { pdf } = await import("@react-pdf/renderer");
      const { QuotePDF } = await import("@/lib/quote-pdf");
      const React = await import("react");

      const pdfElement = React.createElement(QuotePDF, {
        quote_number: quote.quote_number,
        items: quote.items,
        total: quote.total,
        notes: quote.notes,
        created_at: quote.created_at,
        logoUrl: "/printec-logo-light.png",
        customer: {
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          service: inquiry.service,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(pdfElement as any).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Printec-Quote-${quote.quote_number}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download error:", err);
      showMessage("Failed to generate PDF.", "error");
    }
  }

  if (loading) {
    return (
      <p style={{ color: "rgba(255,255,255,0.4)", padding: "2rem" }}>
        Loading...
      </p>
    );
  }

  if (!inquiry) {
    return <p style={{ color: "#f87171" }}>Inquiry not found.</p>;
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href={`/admin/inquiries/${inquiryId}`}
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
        <ArrowLeft size={14} /> Back to Inquiry
      </Link>

      {/* Header */}
      <div
        className="admin-header-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
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
            {quote ? `Quote ${quote.quote_number}` : "New Quote"}
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
            Quote Builder
          </h1>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {quote && (
            <>
              <button
                onClick={handleDownload}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Download size={14} /> Download PDF
              </button>
              {inquiry?.email && (
                <button
                  onClick={handleSend}
                  disabled={sending}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    background: sending
                      ? "rgba(247,148,29,0.3)"
                      : "rgba(247,148,29,0.15)",
                    border: "1px solid #F7941D",
                    borderRadius: "4px",
                    color: "#F7941D",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: sending ? "wait" : "pointer",
                    opacity: sending ? 0.6 : 1,
                  }}
                >
                  <Send size={14} /> {sending ? "Sending..." : "Send to Customer"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Message toast */}
      {message && (
        <div
          style={{
            padding: "0.75rem 1rem",
            marginBottom: "1.5rem",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 600,
            background:
              message.type === "success"
                ? "rgba(34,197,94,0.1)"
                : "rgba(239,68,68,0.1)",
            border: `1px solid ${message.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
            color: message.type === "success" ? "#22c55e" : "#ef4444",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Sent status */}
      {quote?.sent_at && (
        <div
          style={{
            padding: "0.75rem 1rem",
            marginBottom: "1.5rem",
            borderRadius: "4px",
            fontSize: "13px",
            background: "rgba(34,197,94,0.05)",
            border: "1px solid rgba(34,197,94,0.2)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Sent to {inquiry.email} on{" "}
          <span style={{ color: "#22c55e", fontWeight: 600 }}>
            {new Date(quote.sent_at).toLocaleString()}
          </span>
        </div>
      )}

      <div
        className="admin-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "1.5rem",
        }}
      >
        {/* Left: Line items */}
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
            Line Items
          </h2>

          {/* Table header */}
          <div
            className="quote-item-row"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) 120px 40px",
              gap: "0.5rem",
              marginBottom: "0.5rem",
              padding: "0 0.25rem",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Description
            </span>
            <span
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Price ($)
            </span>
            <span />
          </div>

          {/* Rows */}
          {items.map((item, index) => (
            <div
              key={index}
              className="quote-item-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 40px",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="text"
                placeholder="Item description..."
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
                style={{
                  padding: "0.625rem",
                  background: "#0C0C0C",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={item.price || ""}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
                style={{
                  padding: "0.625rem",
                  background: "#0C0C0C",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  textAlign: "right",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={() => removeItem(index)}
                disabled={items.length <= 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  color:
                    items.length <= 1
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(239,68,68,0.7)",
                  cursor: items.length <= 1 ? "default" : "pointer",
                  padding: 0,
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {/* Add item button */}
          <button
            onClick={addItem}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              marginTop: "0.75rem",
              padding: "0.5rem 1rem",
              background: "rgba(247,148,29,0.08)",
              border: "1px dashed rgba(247,148,29,0.4)",
              borderRadius: "4px",
              color: "#F7941D",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Plus size={14} /> Add Item
          </button>

          {/* Total */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "1.5rem",
              paddingTop: "1rem",
              borderTop: "1px solid #222",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: "22px",
                fontWeight: 900,
                color: "#F7941D",
                fontFamily: "'Arial Black', Arial, sans-serif",
              }}
            >
              $
              {total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {/* Right: Customer info + Notes + Save */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Customer summary */}
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
              Customer
            </h2>
            {[
              { label: "Name", value: inquiry.name },
              { label: "Email", value: inquiry.email },
              { label: "Phone", value: inquiry.phone },
              { label: "Service", value: inquiry.service },
            ].map((f) => (
              <div key={f.label} style={{ marginBottom: "0.625rem" }}>
                <p
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "rgba(255,255,255,0.35)",
                    margin: "0 0 0.15rem",
                  }}
                >
                  {f.label}
                </p>
                <p style={{ fontSize: "14px", color: "#fff", margin: 0 }}>
                  {f.value || "---"}
                </p>
              </div>
            ))}
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
              placeholder="Additional notes for the customer..."
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
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              background: "#F7941D",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              cursor: saving ? "wait" : "pointer",
              opacity: saving ? 0.6 : 1,
              width: "100%",
            }}
          >
            <Save size={16} /> {saving ? "Saving..." : quote ? "Update Quote" : "Save Quote"}
          </button>
        </div>
      </div>
    </div>
  );
}
