"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, Eye, RefreshCw } from "lucide-react";

interface Quote {
  id: string;
  inquiry_id: string;
  quote_number: string;
  items: unknown[];
  total: number;
  notes: string;
  sent_at: string | null;
  created_at: string;
  inquiries: {
    name: string;
    email: string;
    service: string;
    status: string;
  } | null;
}

type FilterTab = "all" | "sent" | "not_sent";

export default function QuotesSentPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [resending, setResending] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/quotes");
      const data = await res.json();
      if (Array.isArray(data)) {
        setQuotes(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  async function handleResend(quoteId: string) {
    setResending(quoteId);
    try {
      await fetch(`/api/admin/quotes/${quoteId}/send`, { method: "POST" });
      await fetchQuotes();
    } catch {
      // silent
    } finally {
      setResending(null);
    }
  }

  const filtered = quotes.filter((q) => {
    if (filter === "sent") return q.sent_at !== null;
    if (filter === "not_sent") return q.sent_at === null;
    return true;
  });

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "sent", label: "Sent" },
    { key: "not_sent", label: "Not Sent" },
  ];

  return (
    <div>
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
        Quotes
      </p>
      <h1
        style={{
          fontSize: "36px",
          fontFamily: "Arial Black, Arial, sans-serif",
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 1.5rem 0",
        }}
      >
        All Quotes
      </h1>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: filter === tab.key ? "#F7941D" : "#222",
              background: filter === tab.key ? "rgba(247,148,29,0.1)" : "#111",
              color: filter === tab.key ? "#F7941D" : "rgba(255,255,255,0.5)",
              fontSize: "13px",
              fontWeight: filter === tab.key ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
          Loading quotes...
        </p>
      ) : filtered.length === 0 ? (
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <Send size={32} color="rgba(255,255,255,0.2)" style={{ marginBottom: "1rem" }} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
            No quotes found.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #222",
                  textAlign: "left",
                }}
              >
                {["Quote #", "Customer", "Email", "Service", "Total", "Status", "Created", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      style={{
                        padding: "0.75rem 1rem",
                        color: "rgba(255,255,255,0.4)",
                        fontWeight: 500,
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr
                  key={q.id}
                  style={{
                    borderBottom: "1px solid #1a1a1a",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {/* Quote Number */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <Link
                      href={`/admin/inquiries/${q.inquiry_id}/quote?quote_id=${q.id}`}
                      style={{
                        color: "#F7941D",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      {q.quote_number}
                    </Link>
                  </td>

                  {/* Customer Name */}
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q.inquiries?.name ?? "—"}
                  </td>

                  {/* Email */}
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {q.inquiries?.email ?? "—"}
                  </td>

                  {/* Service */}
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.5)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q.inquiries?.service ?? "—"}
                  </td>

                  {/* Total */}
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "#F7941D",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(q.total)}
                  </td>

                  {/* Status */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    {q.sent_at ? (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "4px",
                          background: "rgba(76,175,80,0.15)",
                          color: "#4CAF50",
                          fontSize: "12px",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Sent {formatDate(q.sent_at)}
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "4px",
                          background: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        Not Sent
                      </span>
                    )}
                  </td>

                  {/* Created */}
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.4)",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                    }}
                  >
                    {formatDate(q.created_at)}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <Link
                        href={`/admin/inquiries/${q.inquiry_id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #222",
                          background: "transparent",
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "12px",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          transition: "all 0.2s",
                        }}
                      >
                        <Eye size={13} />
                        View
                      </Link>
                      {q.sent_at && (
                        <button
                          onClick={() => handleResend(q.id)}
                          disabled={resending === q.id}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            padding: "0.35rem 0.75rem",
                            borderRadius: "4px",
                            border: "1px solid #F7941D",
                            background: "rgba(247,148,29,0.1)",
                            color: "#F7941D",
                            fontSize: "12px",
                            cursor: resending === q.id ? "wait" : "pointer",
                            opacity: resending === q.id ? 0.5 : 1,
                            whiteSpace: "nowrap",
                            transition: "all 0.2s",
                          }}
                        >
                          <RefreshCw
                            size={13}
                            style={
                              resending === q.id
                                ? { animation: "spin 1s linear infinite" }
                                : undefined
                            }
                          />
                          Resend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
