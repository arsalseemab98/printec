"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileSignature, Plus } from "lucide-react";

interface Contract {
  id: string;
  contract_number: string;
  client_name: string | null;
  client_email: string | null;
  service_description: string | null;
  total_price: number;
  event_date: string | null;
  status: string;
  sent_at: string | null;
  signed_at: string | null;
  created_at: string;
}

type FilterTab = "all" | "pending" | "sent" | "signed" | "completed" | "cancelled";

export default function ContractsPage() {
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("all");

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

  function getStatusBadge(contract: Contract) {
    const color = CONTRACT_STATUS_COLORS[contract.status] || "#888";
    let label = contract.status;
    if (contract.status === "Signed" && contract.signed_at) {
      label = `Signed ${formatDate(contract.signed_at)}`;
    } else if (contract.status === "Sent" && contract.sent_at) {
      label = `Sent ${formatDate(contract.sent_at)}`;
    }
    return (
      <span
        style={{
          display: "inline-block",
          padding: "0.2rem 0.6rem",
          borderRadius: "4px",
          background: `${color}20`,
          color: color,
          fontSize: "12px",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
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
                {[
                  "Contract #",
                  "Client Name",
                  "Service",
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

                  {/* Service */}
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.5)",
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.service_description || "\u2014"}
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
                    {getStatusBadge(c)}
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
