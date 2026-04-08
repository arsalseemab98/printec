"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Copy, Check, Plus, FileText } from "lucide-react";
import Link from "next/link";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: string;
  source: string;
  type: "inquiry" | "catalog_lead";
  created_at: string;
}

const SOURCE_TABS = ["All", "Inquiries", "Catalog Leads"];
const STATUS_FILTERS = [
  "All",
  "New",
  "Contacted",
  "Follow Up",
  "Quoted",
  "Booked",
  "Completed",
];

const STATUS_COLORS: Record<string, string> = {
  New: "#3b82f6",
  Contacted: "#f59e0b",
  "Follow Up": "#8b5cf6",
  Quoted: "#06b6d4",
  Booked: "#22c55e",
  Completed: "#10b981",
  Lead: "#F7941D",
};

const TYPE_COLORS: Record<string, string> = {
  inquiry: "#3b82f6",
  catalog_lead: "#F7941D",
};

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceTab, setSourceTab] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/customers");
        const data = await res.json();
        setCustomers(Array.isArray(data) ? data : []);
      } catch {
        console.error("Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = customers.filter((c) => {
    // Source filter
    if (sourceTab === "Inquiries" && c.type !== "inquiry") return false;
    if (sourceTab === "Catalog Leads" && c.type !== "catalog_lead") return false;

    // Status filter (only applies to inquiries)
    if (statusFilter !== "All") {
      if (c.type === "inquiry" && c.status !== statusFilter) return false;
      if (c.type === "catalog_lead") return false; // hide catalog leads when filtering by inquiry status
    }

    // Search
    if (search) {
      const q = search.toLowerCase();
      return (
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const inquiryCount = customers.filter((c) => c.type === "inquiry").length;
  const leadCount = customers.filter((c) => c.type === "catalog_lead").length;

  function handleCopyEmails() {
    const emails = Array.from(new Set(filtered.map((c) => c.email))).join(", ");
    navigator.clipboard.writeText(emails).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleRowClick(c: Customer) {
    if (c.type === "inquiry") {
      router.push(`/admin/inquiries/${c.id}`);
    } else {
      router.push("/admin/catalogs/leads");
    }
  }

  async function handleCreateInquiry(c: Customer, e: React.MouseEvent) {
    e.stopPropagation();
    const res = await fetch("/api/admin/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: c.name,
        email: c.email,
        phone: c.phone || null,
        service: c.service || null,
        source: "catalog-lead",
      }),
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/admin/inquiries/${data.id}`);
    }
  }

  function handleCreateContract(c: Customer, e: React.MouseEvent) {
    e.stopPropagation();
    if (c.type === "inquiry") {
      router.push(`/admin/contracts/new?inquiry_id=${c.id}`);
    } else {
      // For catalog leads, pass name/email as query params
      const params = new URLSearchParams({
        client_name: c.name,
        client_email: c.email,
      });
      router.push(`/admin/contracts/new?${params.toString()}`);
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/admin"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            fontSize: "13px",
            marginBottom: "1rem",
          }}
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
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
          CUSTOMER DATABASE
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
          All Customers
        </h1>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Total", value: customers.length },
            { label: "Inquiries", value: inquiryCount },
            { label: "Catalog Leads", value: leadCount },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.75rem",
                background: "rgba(247,148,29,0.1)",
                border: "1px solid rgba(247,148,29,0.25)",
                borderRadius: "4px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {stat.label}:{" "}
              <span style={{ color: "#F7941D", fontWeight: 700 }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Source filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        {SOURCE_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSourceTab(tab);
              if (tab === "Catalog Leads") setStatusFilter("All");
            }}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: sourceTab === tab ? "#F7941D" : "#222",
              background:
                sourceTab === tab ? "rgba(247,148,29,0.15)" : "#111",
              color:
                sourceTab === tab ? "#F7941D" : "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Status filter (only show when not filtering to catalog leads only) */}
      {sourceTab !== "Catalog Leads" && (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: statusFilter === s ? "#F7941D" : "#222",
                background:
                  statusFilter === s ? "rgba(247,148,29,0.15)" : "#111",
                color:
                  statusFilter === s ? "#F7941D" : "rgba(255,255,255,0.6)",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Search + Export row */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: "400px",
            flex: 1,
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.3)",
            }}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.625rem 0.75rem 0.625rem 2.25rem",
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* Export Emails button */}
        <button
          onClick={handleCopyEmails}
          disabled={filtered.length === 0}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            background: copied
              ? "rgba(34,197,94,0.15)"
              : "rgba(247,148,29,0.15)",
            color: copied ? "#22c55e" : "#F7941D",
            fontWeight: 600,
            fontSize: "13px",
            border: `1px solid ${
              copied ? "rgba(34,197,94,0.3)" : "rgba(247,148,29,0.3)"
            }`,
            borderRadius: "4px",
            cursor: filtered.length === 0 ? "not-allowed" : "pointer",
            opacity: filtered.length === 0 ? 0.5 : 1,
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : `Export Emails (${filtered.length})`}
        </button>

        {/* Filtered count */}
        <span
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Showing {filtered.length} of {customers.length}
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
          Loading customers...
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
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
            {customers.length === 0
              ? "No customers yet. Customers will appear here from inquiries and catalog leads."
              : "No customers match your current filters."}
          </p>
        </div>
      ) : (
        <div className="admin-table-wrap" style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr>
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Source",
                  "Type",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.4)",
                      fontWeight: 500,
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      borderBottom: "1px solid #222",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={`${c.type}-${c.id}`}
                  onClick={() => handleRowClick(c)}
                  style={{
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(247,148,29,0.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "#fff",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    {c.name}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.5)",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    {c.email}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.5)",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    {c.phone || "\u2014"}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.4)",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    {c.source || "\u2014"}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: TYPE_COLORS[c.type] || "#888",
                        background: `${TYPE_COLORS[c.type] || "#888"}20`,
                        border: `1px solid ${TYPE_COLORS[c.type] || "#888"}40`,
                      }}
                    >
                      {c.type === "inquiry" ? "Inquiry" : "Catalog Lead"}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: STATUS_COLORS[c.status] || "#888",
                        background: `${STATUS_COLORS[c.status] || "#888"}20`,
                        border: `1px solid ${
                          STATUS_COLORS[c.status] || "#888"
                        }40`,
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.4)",
                      borderBottom: "1px solid #161616",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(c.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 0.5rem",
                      borderBottom: "1px solid #161616",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div style={{ display: "flex", gap: "6px" }}>
                      {c.type === "catalog_lead" && (
                        <button
                          onClick={(e) => handleCreateInquiry(c, e)}
                          title="Create Inquiry from this lead"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "4px 10px",
                            background: "rgba(59,130,246,0.1)",
                            border: "1px solid rgba(59,130,246,0.3)",
                            borderRadius: "4px",
                            color: "#3b82f6",
                            fontSize: "11px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.2)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; }}
                        >
                          <Plus size={12} /> Inquiry
                        </button>
                      )}
                      <button
                        onClick={(e) => handleCreateContract(c, e)}
                        title="Create Contract for this customer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 10px",
                          background: "rgba(247,148,29,0.1)",
                          border: "1px solid rgba(247,148,29,0.3)",
                          borderRadius: "4px",
                          color: "#F7941D",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(247,148,29,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(247,148,29,0.1)"; }}
                      >
                        <FileText size={12} /> Contract
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
