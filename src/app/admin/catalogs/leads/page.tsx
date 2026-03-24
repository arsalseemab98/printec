"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Copy, Check } from "lucide-react";

interface CatalogLead {
  id: string;
  name: string;
  email: string;
  catalog_slug: string;
  created_at: string;
}

export default function CatalogLeadsPage() {
  const [leads, setLeads] = useState<CatalogLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catalogFilter, setCatalogFilter] = useState("All");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/admin/catalog-leads");
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      } catch {
        console.error("Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  // Get unique catalog slugs for the filter dropdown
  const catalogSlugs = Array.from(new Set(leads.map((l) => l.catalog_slug))).sort();

  // Apply filters
  const filtered = leads.filter((lead) => {
    if (catalogFilter !== "All" && lead.catalog_slug !== catalogFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(q) ||
      lead.email?.toLowerCase().includes(q)
    );
  });

  function handleCopyEmails() {
    const emails = filtered.map((l) => l.email).join(", ");
    navigator.clipboard.writeText(emails).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/admin/catalogs"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            fontSize: "13px",
            marginBottom: "1rem",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F7941D")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
          }
        >
          <ArrowLeft size={14} /> Back to Catalogs
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
          Lead Management
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
          Catalog Leads
        </h1>
      </div>

      {/* Filters row */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Catalog filter dropdown */}
        <select
          value={catalogFilter}
          onChange={(e) => setCatalogFilter(e.target.value)}
          style={{
            padding: "0.625rem 1rem",
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            minWidth: "180px",
            cursor: "pointer",
          }}
        >
          <option value="All">All Catalogs</option>
          {catalogSlugs.map((slug) => (
            <option key={slug} value={slug}>
              {slug}
            </option>
          ))}
        </select>

        {/* Search */}
        <div
          style={{
            position: "relative",
            maxWidth: "300px",
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

        {/* Copy all emails button */}
        <button
          onClick={handleCopyEmails}
          disabled={filtered.length === 0}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            background: copied ? "rgba(34,197,94,0.15)" : "rgba(247,148,29,0.15)",
            color: copied ? "#22c55e" : "#F7941D",
            fontWeight: 600,
            fontSize: "13px",
            border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(247,148,29,0.3)"}`,
            borderRadius: "4px",
            cursor: filtered.length === 0 ? "not-allowed" : "pointer",
            opacity: filtered.length === 0 ? 0.5 : 1,
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : `Copy All Emails (${filtered.length})`}
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
          Loading leads...
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
            {leads.length === 0
              ? "No leads yet. Leads will appear here when visitors submit their email to view a catalog."
              : "No leads match your current filters."}
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
                {["Name", "Email", "Catalog", "Date"].map((h) => (
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
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  style={{
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
                    {lead.name}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.5)",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    {lead.email}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.5)",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    {lead.catalog_slug}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.4)",
                      borderBottom: "1px solid #161616",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(lead.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
