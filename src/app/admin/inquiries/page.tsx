"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

const STATUSES = ["All", "New", "Contacted", "Follow Up", "Quoted", "Booked", "Completed"];

const STATUS_COLORS: Record<string, string> = {
  New: "#3b82f6",
  Contacted: "#eab308",
  "Follow Up": "#a855f7",
  Quoted: "#06b6d4",
  Booked: "#22c55e",
  Completed: "#6b7280",
};

export default function InquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetch_data() {
      setLoading(true);
      const url =
        activeStatus === "All"
          ? "/api/admin/inquiries"
          : `/api/admin/inquiries?status=${encodeURIComponent(activeStatus)}`;
      const res = await fetch(url);
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetch_data();
  }, [activeStatus]);

  const filtered = inquiries.filter((inq) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      inq.name?.toLowerCase().includes(q) ||
      inq.email?.toLowerCase().includes(q)
    );
  });

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
          CRM
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
          Inquiries
        </h1>
      </div>

      {/* Status filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: activeStatus === s ? "#F7941D" : "#222",
              background: activeStatus === s ? "rgba(247,148,29,0.15)" : "#111",
              color: activeStatus === s ? "#F7941D" : "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div
        style={{
          position: "relative",
          marginBottom: "1.5rem",
          maxWidth: "400px",
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

      {/* Table */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.4)" }}>No inquiries found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr>
                {["Name", "Email", "Service", "Status", "Source", "Date"].map(
                  (h) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => (
                <tr
                  key={inq.id}
                  onClick={() => router.push(`/admin/inquiries/${inq.id}`)}
                  style={{
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(247,148,29,0.05)")
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
                    {inq.name}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.5)",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    {inq.email}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.5)",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    {inq.service}
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
                        color: STATUS_COLORS[inq.status] || "#888",
                        background: `${STATUS_COLORS[inq.status] || "#888"}20`,
                        border: `1px solid ${STATUS_COLORS[inq.status] || "#888"}40`,
                      }}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.4)",
                      borderBottom: "1px solid #161616",
                    }}
                  >
                    {inq.source || "—"}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "rgba(255,255,255,0.4)",
                      borderBottom: "1px solid #161616",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(inq.created_at).toLocaleDateString()}
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
