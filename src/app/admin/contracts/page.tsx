"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileSignature, Plus, Trash2 } from "lucide-react";

interface Contract {
  id: string;
  contract_number: string;
  client_name: string | null;
  client_email: string | null;
  service_description: string | null;
  total_price: number;
  event_date: string | null;
  status: string;
  category: string | null;
  sent_at: string | null;
  signed_at: string | null;
  created_at: string;
}

const CONTRACT_STATUSES = ["Pending", "Sent", "Signed", "Completed", "Cancelled"] as const;

const CONTRACT_CATEGORIES = [
  "Dance Floor Wraps",
  "Wall Wraps",
  "Window Wraps",
  "Channel Letters",
  "Vinyl Wraps",
  "Business Signage",
  "Neon Signs",
  "Other",
] as const;

type FilterTab = "all" | "pending" | "sent" | "signed" | "completed" | "cancelled";

export default function ContractsPage() {
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchContracts();
  }, []);

  async function fetchContracts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contracts");
      const data = await res.json();
      if (Array.isArray(data)) {
        setContracts(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  async function handleQuickUpdate(id: string, field: string, value: string) {
    try {
      const res = await fetch(`/api/admin/contracts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) {
        const updated = await res.json();
        setContracts((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
      }
    } catch {
      // silent
    }
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((c) => c.id)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this contract? This cannot be undone.")) return;
    try {
      await fetch(`/api/admin/contracts/${id}`, { method: "DELETE" });
      setContracts((prev) => prev.filter((c) => c.id !== id));
      setSelected((prev) => { const next = new Set(prev); next.delete(id); return next; });
    } catch {
      alert("Failed to delete contract.");
    }
  }

  async function handleBulkDelete() {
    if (!selected.size) return;
    if (!confirm(`Delete ${selected.size} contract${selected.size > 1 ? "s" : ""}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await Promise.all(
        Array.from(selected).map((id) =>
          fetch(`/api/admin/contracts/${id}`, { method: "DELETE" })
        )
      );
      setContracts((prev) => prev.filter((c) => !selected.has(c.id)));
      setSelected(new Set());
    } catch {
      alert("Some deletes failed.");
    } finally {
      setDeleting(false);
    }
  }

  const filtered = contracts.filter((c) => {
    if (filter === "all") return true;
    return c.status.toLowerCase() === filter;
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

  const CONTRACT_STATUS_COLORS: Record<string, string> = {
    Pending: "#eab308",
    Sent: "#3b82f6",
    Signed: "#22c55e",
    Completed: "#F7941D",
    Cancelled: "#ef4444",
  };

  function renderStatusDropdown(contract: Contract) {
    const color = CONTRACT_STATUS_COLORS[contract.status] || "#888";
    return (
      <select
        value={contract.status}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "Completed" && !confirm("Mark as completed? This adds to Completed Revenue.")) return;
          if (val === "Cancelled" && !confirm("Cancel this contract?")) return;
          handleQuickUpdate(contract.id, "status", val);
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: "0.2rem 0.5rem",
          borderRadius: "4px",
          background: `${color}20`,
          color: color,
          border: `1px solid ${color}40`,
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
          outline: "none",
        }}
      >
        {CONTRACT_STATUSES.map((s) => (
          <option key={s} value={s} style={{ background: "#111", color: "#fff" }}>{s}</option>
        ))}
      </select>
    );
  }

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "sent", label: "Sent" },
    { key: "signed", label: "Signed" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div>
      {/* Header */}
      <div
        className="admin-header-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
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
            Contracts
          </p>
          <h1
            style={{
              fontSize: "36px",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
            }}
          >
            Client Agreements
          </h1>
        </div>
        <Link
          href="/admin/contracts/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            background: "#F7941D",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <Plus size={16} /> New Contract
        </Link>
      </div>

      {/* Filter Tabs */}
      <div
        className="admin-filter-tabs"
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
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

      {/* Bulk Actions Bar */}
      {selected.size > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "4px",
            padding: "0.75rem 1.25rem",
            marginBottom: "1rem",
          }}
        >
          <span style={{ color: "#ef4444", fontSize: "13px", fontWeight: 600 }}>
            {selected.size} contract{selected.size > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={deleting}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1rem",
              background: "#ef4444",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 700,
              cursor: deleting ? "wait" : "pointer",
              opacity: deleting ? 0.6 : 1,
            }}
          >
            <Trash2 size={14} /> {deleting ? "Deleting..." : "Delete Selected"}
          </button>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
          Loading contracts...
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
          <FileSignature
            size={32}
            color="rgba(255,255,255,0.2)"
            style={{ marginBottom: "1rem" }}
          />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
            No contracts found.
          </p>
        </div>
      ) : (
        <div
          className="admin-table-wrap"
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
                <th style={{ padding: "0.75rem 0.5rem 0.75rem 1rem", width: "40px" }}>
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selected.size === filtered.length}
                    onChange={toggleSelectAll}
                    style={{ cursor: "pointer", accentColor: "#F7941D" }}
                  />
                </th>
                {[
                  "Contract #",
                  "Client Name",
                  "Category",
                  "Total",
                  "Status",
                  "Event Date",
                  "Actions",
                ].map((col) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  style={{
                    borderBottom: "1px solid #1a1a1a",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onClick={() => router.push(`/admin/contracts/${c.id}`)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {/* Checkbox */}
                  <td
                    style={{ padding: "0.75rem 0.5rem 0.75rem 1rem" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      style={{ cursor: "pointer", accentColor: "#F7941D" }}
                    />
                  </td>

                  {/* Contract Number */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span
                      style={{
                        color: "#F7941D",
                        fontWeight: 600,
                      }}
                    >
                      {c.contract_number}
                    </span>
                  </td>

                  {/* Client Name */}
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.client_name || "\u2014"}
                  </td>

                  {/* Category */}
                  <td
                    style={{ padding: "0.75rem 1rem" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={c.category || "Other"}
                      onChange={(e) => handleQuickUpdate(c.id, "category", e.target.value)}
                      style={{
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.6)",
                        border: "1px solid #333",
                        fontSize: "12px",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      {CONTRACT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} style={{ background: "#111", color: "#fff" }}>{cat}</option>
                      ))}
                    </select>
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
                    {formatCurrency(c.total_price)}
                  </td>

                  {/* Status */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    {renderStatusDropdown(c)}
                  </td>

                  {/* Event Date */}
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.4)",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                    }}
                  >
                    {c.event_date ? formatDate(c.event_date) : "\u2014"}
                  </td>

                  {/* Actions */}
                  <td
                    style={{ padding: "0.75rem 1rem" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: "flex", gap: "0.35rem" }}>
                      <Link
                        href={`/admin/contracts/${c.id}`}
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
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(c.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "0.35rem 0.5rem",
                          borderRadius: "4px",
                          border: "1px solid rgba(239,68,68,0.2)",
                          background: "transparent",
                          color: "#ef4444",
                          fontSize: "12px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
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
