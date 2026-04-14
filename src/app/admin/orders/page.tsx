"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Search, PlusCircle } from "lucide-react";
import { BookingModal } from "@/components/admin/booking-modal";

interface Contract {
  id: string;
  contract_number: string;
  client_name: string | null;
  client_email: string | null;
  event_date: string | null;
  category: string | null;
  total_price: number;
  balance_amount: number;
  status: string;
  signed_at: string | null;
  completed_at: string | null;
  created_at: string;
}

const ORANGE = "#F7941D";
const ORDER_STATUSES = ["All", "Quoted", "Signed", "Completed"] as const;
const STATUS_COLORS: Record<string, string> = {
  Sent: "#F7941D",
  Signed: "#22C55E",
  Completed: "#6B7280",
};
// Visual label shown in the table — contracts with status "Sent" are treated as "Quoted".
const STATUS_LABELS: Record<string, string> = {
  Sent: "Quoted",
};
function isOrder(c: Contract) {
  return c.status === "Sent" || c.status === "Signed" || c.status === "Completed";
}

function fmtDate(d: string | null) {
  if (!d) return "—";
  const [y, m, dd] = d.slice(0, 10).split("-").map(Number);
  return new Date(y, (m || 1) - 1, dd || 1).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function fmtMoney(n: number) {
  return "$" + Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof ORDER_STATUSES)[number]>("All");
  const [query, setQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/contracts");
    const all: Contract[] = await res.json();
    setOrders(Array.isArray(all) ? all.filter(isOrder) : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filtered = orders.filter((o) => {
    if (filter === "Quoted" && o.status !== "Sent") return false;
    if (filter === "Signed" && o.status !== "Signed") return false;
    if (filter === "Completed" && o.status !== "Completed") return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        o.contract_number?.toLowerCase().includes(q) ||
        o.client_name?.toLowerCase().includes(q) ||
        o.category?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalRevenue = filtered.reduce((s, o) => s + Number(o.total_price || 0), 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: "1.5rem" }}>
        <div>
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 4, color: ORANGE, fontWeight: 500, marginBottom: "0.5rem" }}>
            CONFIRMED JOBS
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: "#fff", fontFamily: "'Arial Black', Arial, sans-serif", margin: "0 0 0.25rem" }}>
            Orders
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: 0 }}>
            {filtered.length} {filtered.length === 1 ? "order" : "orders"} · {fmtMoney(totalRevenue)} total
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: ORANGE, border: "none", borderRadius: 4, color: "#0C0C0C", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}
        >
          <PlusCircle size={14} /> Add Order
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        {ORDER_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              background: filter === s ? ORANGE : "#111",
              color: filter === s ? "#0C0C0C" : "#fff",
              border: `1px solid ${filter === s ? ORANGE : "#222"}`,
              padding: "0.45rem 0.9rem",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {s}
          </button>
        ))}
        <div style={{ marginLeft: "auto", position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 11, color: "#666" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search client, number, category..."
            style={{ background: "#111", border: "1px solid #222", borderRadius: 4, color: "#fff", fontSize: 13, padding: "0.5rem 0.75rem 0.5rem 2rem", width: 260 }}
          />
        </div>
      </div>

      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading orders...</p>
      ) : filtered.length === 0 ? (
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 4, padding: "3rem", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>No orders yet.</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: "0.5rem 0 0" }}>
            Orders appear here when a contract is signed or marked complete.
          </p>
        </div>
      ) : (
        <>
          <div className="orders-table-desktop" style={{ background: "#111", border: "1px solid #222", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 140px 130px 110px 110px 100px", padding: "12px 16px", borderBottom: "1px solid #222", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>
              <div>Order #</div>
              <div>Client</div>
              <div>Category</div>
              <div>Event Date</div>
              <div>Total</div>
              <div>Balance</div>
              <div>Status</div>
            </div>
            {filtered.map((o) => (
              <Link
                key={o.id}
                href={`/admin/contracts/${o.id}`}
                style={{ display: "grid", gridTemplateColumns: "110px 1fr 140px 130px 110px 110px 100px", padding: "14px 16px", borderBottom: "1px solid #1a1a1a", fontSize: 13, color: "#fff", textDecoration: "none", alignItems: "center" }}
              >
                <div style={{ color: ORANGE, fontWeight: 700 }}>{o.contract_number}</div>
                <div>{o.client_name || "—"}</div>
                <div style={{ color: "rgba(255,255,255,0.65)" }}>{o.category || "—"}</div>
                <div style={{ color: "rgba(255,255,255,0.65)" }}>{fmtDate(o.event_date)}</div>
                <div style={{ fontWeight: 600 }}>{fmtMoney(o.total_price)}</div>
                <div style={{ color: o.balance_amount > 0 ? "#EAB308" : "#22C55E", fontWeight: 600 }}>{fmtMoney(o.balance_amount)}</div>
                <div>
                  <span style={{ background: STATUS_COLORS[o.status] || "#666", color: "#0C0C0C", padding: "2px 8px", borderRadius: 3, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                    {STATUS_LABELS[o.status] || o.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="orders-cards-mobile" style={{ display: "none" }}>
            {filtered.map((o) => (
              <Link
                key={o.id}
                href={`/admin/contracts/${o.id}`}
                style={{ display: "block", background: "#111", border: "1px solid #222", borderRadius: 4, padding: 14, marginBottom: 10, color: "#fff", textDecoration: "none" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ color: ORANGE, fontWeight: 700, fontSize: 13 }}>{o.contract_number}</span>
                  <span style={{ background: STATUS_COLORS[o.status] || "#666", color: "#0C0C0C", padding: "2px 8px", borderRadius: 3, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                    {STATUS_LABELS[o.status] || o.status}
                  </span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{o.client_name || "—"}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                  {o.category || "—"} · {fmtDate(o.event_date)}
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                  <span>Total: <strong>{fmtMoney(o.total_price)}</strong></span>
                  <span style={{ color: o.balance_amount > 0 ? "#EAB308" : "#22C55E" }}>
                    Balance: <strong>{fmtMoney(o.balance_amount)}</strong>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <BookingModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreated={loadOrders}
        defaultStatus="Signed"
        title="Add Order"
        subtitle="Creates a confirmed contract (status Signed) that appears here and on the dashboard."
        ctaLabel="Create Order"
      />

      <style>{`
        @media (max-width: 768px) {
          .orders-table-desktop { display: none !important; }
          .orders-cards-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}
