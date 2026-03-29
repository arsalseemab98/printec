"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, Send, CheckCircle, XCircle } from "lucide-react";

const ORANGE = "#F7941D";

interface EmailLog {
  id: string;
  subject: string;
  recipient_email: string;
  recipient_name: string | null;
  status: string;
  sent_at: string;
}

export default function EmailsPage() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/emails")
      .then((r) => r.json())
      .then((data) => { setLogs(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const sentCount = logs.filter((l) => l.status === "sent").length;
  const failedCount = logs.filter((l) => l.status === "failed").length;

  return (
    <div>
      {/* Header */}
      <div className="admin-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "4px", color: ORANGE, fontWeight: 500, marginBottom: "0.5rem" }}>
            MARKETING
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", fontFamily: "'Arial Black', Arial, sans-serif", margin: 0 }}>
            Emails
          </h1>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link
            href="/admin/emails/templates"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", background: "transparent", border: "1px solid #333",
              borderRadius: "4px", color: "rgba(255,255,255,0.7)", fontSize: "13px",
              fontWeight: 600, textDecoration: "none", cursor: "pointer",
            }}
          >
            <FileText size={14} /> Templates
          </Link>
          <Link
            href="/admin/emails/compose"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", background: ORANGE, border: "none",
              borderRadius: "4px", color: "#0C0C0C", fontSize: "13px",
              fontWeight: 700, textDecoration: "none", cursor: "pointer",
            }}
          >
            <Plus size={14} /> Compose
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "16px 24px", flex: 1, minWidth: "120px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>Total Sent</div>
          <div style={{ fontSize: "28px", fontWeight: 900, color: "#fff" }}>{sentCount}</div>
        </div>
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "16px 24px", flex: 1, minWidth: "120px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>Failed</div>
          <div style={{ fontSize: "28px", fontWeight: 900, color: failedCount > 0 ? "#EF4444" : "#fff" }}>{failedCount}</div>
        </div>
      </div>

      {/* Sent log */}
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "0 0 1rem" }}>
          Recent Emails
        </h2>

        {loading ? (
          <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>
        ) : logs.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
            <Send size={32} style={{ marginBottom: "12px", opacity: 0.3 }} />
            <p style={{ margin: 0, fontSize: "14px" }}>No emails sent yet. Click Compose to get started.</p>
          </div>
        ) : (
          <div className="admin-table-wrap" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #222" }}>
                  {["Status", "Recipient", "Subject", "Sent"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ padding: "10px 12px" }}>
                      {log.status === "sent" ? (
                        <CheckCircle size={16} color="#22C55E" />
                      ) : (
                        <XCircle size={16} color="#EF4444" />
                      )}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: "14px", color: "#fff", fontWeight: 600 }}>{log.recipient_name || "—"}</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{log.recipient_email}</div>
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                      {log.subject}
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                      {new Date(log.sent_at).toLocaleDateString()} {new Date(log.sent_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
