"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit3, Send } from "lucide-react";

const ORANGE = "#F7941D";

interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  created_at: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSubject, setEditSubject] = useState("");

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    const res = await fetch("/api/admin/emails/templates");
    const data = await res.json();
    setTemplates(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this template?")) return;
    await fetch("/api/admin/emails/templates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }

  function startEdit(t: Template) {
    setEditingId(t.id);
    setEditName(t.name);
    setEditSubject(t.subject);
  }

  async function saveEdit() {
    if (!editingId) return;
    await fetch("/api/admin/emails/templates", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, name: editName, subject: editSubject }),
    });
    setTemplates((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, name: editName, subject: editSubject } : t))
    );
    setEditingId(null);
  }

  return (
    <div>
      <Link href="/admin/emails" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "13px", marginBottom: "1.5rem" }}>
        <ArrowLeft size={14} /> Back to Emails
      </Link>

      <div className="admin-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "12px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", fontFamily: "'Arial Black', Arial, sans-serif", margin: 0 }}>
          Email Templates
        </h1>
        <Link
          href="/admin/emails/compose"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "8px 16px", background: ORANGE, border: "none",
            borderRadius: "4px", color: "#0C0C0C", fontSize: "13px",
            fontWeight: 700, textDecoration: "none",
          }}
        >
          <Plus size={14} /> New Template
        </Link>
      </div>

      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>
      ) : templates.length === 0 ? (
        <div style={{
          padding: "60px 24px", textAlign: "center", color: "rgba(255,255,255,0.3)",
          background: "#111", border: "1px solid #222", borderRadius: "4px",
        }}>
          <p style={{ margin: 0, fontSize: "14px" }}>No templates yet. Compose an email and save it as a template.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {templates.map((t) => (
            <div key={t.id} style={{
              background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "16px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
              flexWrap: "wrap",
            }}>
              {editingId === t.id ? (
                <div style={{ flex: 1, display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Template name"
                    style={{
                      padding: "6px 10px", background: "#0C0C0C", border: "1px solid #333",
                      borderRadius: "4px", color: "#fff", fontSize: "14px", outline: "none", flex: 1, minWidth: "150px",
                    }}
                  />
                  <input
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    placeholder="Subject"
                    style={{
                      padding: "6px 10px", background: "#0C0C0C", border: "1px solid #333",
                      borderRadius: "4px", color: "#fff", fontSize: "14px", outline: "none", flex: 2, minWidth: "200px",
                    }}
                  />
                  <button onClick={saveEdit} style={{ padding: "6px 14px", background: ORANGE, border: "none", borderRadius: "4px", color: "#0C0C0C", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} style={{ padding: "6px 14px", background: "transparent", border: "1px solid #333", borderRadius: "4px", color: "#999", fontSize: "12px", cursor: "pointer" }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                      Subject: {t.subject}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "4px" }}>
                      Created {new Date(t.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                    <Link
                      href={`/admin/emails/compose?template=${t.id}`}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        padding: "6px 12px", background: "rgba(247,148,29,0.1)", border: "1px solid " + ORANGE,
                        borderRadius: "4px", color: ORANGE, fontSize: "12px", fontWeight: 600, textDecoration: "none",
                      }}
                    >
                      <Send size={12} /> Use
                    </Link>
                    <button
                      onClick={() => startEdit(t)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        padding: "6px 12px", background: "transparent", border: "1px solid #333",
                        borderRadius: "4px", color: "rgba(255,255,255,0.5)", fontSize: "12px", cursor: "pointer",
                      }}
                    >
                      <Edit3 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        padding: "6px 12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                        borderRadius: "4px", color: "#EF4444", fontSize: "12px", cursor: "pointer",
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
