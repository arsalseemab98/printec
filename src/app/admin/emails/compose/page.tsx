"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Send, Save, Users, Search, CheckSquare, Square, Loader2 } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";

const TiptapEditor = dynamic(() => import("@/components/admin/tiptap-editor"), { ssr: false });

const ORANGE = "#F7941D";

interface Recipient {
  id: string;
  name: string;
  email: string;
  source: string;
  detail: string;
}

const SOURCE_LABELS: Record<string, string> = {
  inquiry: "Inquiry",
  catalog: "Catalog Lead",
  contract: "Contract",
};

const SOURCE_COLORS: Record<string, string> = {
  inquiry: "#3B82F6",
  catalog: "#A855F7",
  contract: "#22C55E",
};

export default function ComposeEmailPageWrapper() {
  return (
    <Suspense fallback={<p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>}>
      <ComposeEmailPage />
    </Suspense>
  );
}

function ComposeEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");
  const initialIndustry = searchParams.get("industry") || "All";

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState(initialIndustry);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ sent: number; failed: number } | null>(null);
  const [savingTemplate, setSavingTemplate] = useState(false);

  // Load recipients
  useEffect(() => {
    const url =
      industryFilter && industryFilter !== "All"
        ? `/api/admin/emails/recipients?industry=${encodeURIComponent(industryFilter)}`
        : `/api/admin/emails/recipients`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => { setRecipients(Array.isArray(data) ? data : []); setLoading(false); });
  }, [industryFilter]);

  // Sync industry to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (industryFilter && industryFilter !== "All") params.set("industry", industryFilter);
    router.replace(`/admin/emails/compose${params.toString() ? `?${params}` : ""}`, { scroll: false });
  }, [industryFilter, router]);

  // Load template if specified
  useEffect(() => {
    if (!templateId) return;
    fetch("/api/admin/emails/templates")
      .then((r) => r.json())
      .then((templates) => {
        const t = (Array.isArray(templates) ? templates : []).find((t: { id: string }) => t.id === templateId);
        if (t) {
          setSubject(t.subject);
          setBody(t.body);
        }
      });
  }, [templateId]);

  const filtered = recipients.filter((r) => {
    if (sourceFilter !== "all" && r.source !== sourceFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.detail.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleRecipient = (email: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email);
      else next.add(email);
      return next;
    });
  };

  const selectAll = () => {
    if (filtered.every((r) => selected.has(r.email))) {
      // Deselect all filtered
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((r) => next.delete(r.email));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((r) => next.add(r.email));
        return next;
      });
    }
  };

  const handleSend = useCallback(async () => {
    if (!subject.trim() || !body.trim() || selected.size === 0) return;
    setSending(true);
    setSendResult(null);

    const selectedRecipients = recipients
      .filter((r) => selected.has(r.email))
      .map((r) => ({ name: r.name, email: r.email, service: r.detail }));

    try {
      const res = await fetch("/api/admin/emails/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          emailBody: body,
          recipients: selectedRecipients,
          templateId: templateId || null,
        }),
      });
      const data = await res.json();
      setSendResult({ sent: data.sent || 0, failed: data.failed || 0 });
    } catch {
      setSendResult({ sent: 0, failed: selected.size });
    }
    setSending(false);
  }, [subject, body, selected, recipients, templateId]);

  const handleSaveTemplate = async () => {
    const name = prompt("Template name:");
    if (!name) return;
    setSavingTemplate(true);
    await fetch("/api/admin/emails/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subject, body }),
    });
    setSavingTemplate(false);
    alert("Template saved!");
  };

  const allFilteredSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.email));

  return (
    <div>
      <Link href="/admin/emails" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "13px", marginBottom: "1.5rem" }}>
        <ArrowLeft size={14} /> Back to Emails
      </Link>

      <div className="admin-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "12px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", fontFamily: "'Arial Black', Arial, sans-serif", margin: 0 }}>
          Compose Email
        </h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleSaveTemplate}
            disabled={savingTemplate || !subject || !body}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", background: "transparent", border: "1px solid #333",
              borderRadius: "4px", color: "rgba(255,255,255,0.7)", fontSize: "13px",
              fontWeight: 600, cursor: "pointer", opacity: (!subject || !body) ? 0.4 : 1,
            }}
          >
            <Save size={14} /> {savingTemplate ? "Saving..." : "Save Template"}
          </button>
          <button
            onClick={handleSend}
            disabled={sending || !subject.trim() || !body.trim() || selected.size === 0}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", background: ORANGE, border: "none",
              borderRadius: "4px", color: "#0C0C0C", fontSize: "13px",
              fontWeight: 700, cursor: "pointer",
              opacity: (sending || !subject.trim() || !body.trim() || selected.size === 0) ? 0.5 : 1,
            }}
          >
            {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            {sending ? "Sending..." : `Send to ${selected.size} recipient${selected.size !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>

      {/* Send result */}
      {sendResult && (
        <div style={{
          padding: "12px 16px", marginBottom: "1rem", borderRadius: "4px",
          background: sendResult.failed === 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          border: `1px solid ${sendResult.failed === 0 ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
          color: sendResult.failed === 0 ? "#22C55E" : "#EF4444",
          fontSize: "14px",
        }}>
          Sent: {sendResult.sent} | Failed: {sendResult.failed}
        </div>
      )}

      <div className="admin-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "1.5rem" }}>
        {/* Left: Editor */}
        <div>
          {/* Subject */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "6px" }}>
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. 20% Off Floor Wraps This Month!"
              style={{
                width: "100%", padding: "10px 12px", background: "#111", border: "1px solid #222",
                borderRadius: "4px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
            />
          </div>

          {/* Placeholders hint */}
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>
            Placeholders: <code style={{ color: ORANGE }}>{"{name}"}</code> <code style={{ color: ORANGE }}>{"{email}"}</code> <code style={{ color: ORANGE }}>{"{service}"}</code> — auto-replaced per recipient
          </div>

          {/* Body editor */}
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", minHeight: "400px" }}>
            <TiptapEditor content={body} onChange={setBody} />
          </div>
        </div>

        {/* Right: Recipient picker */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "1rem", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 200px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Users size={16} color={ORANGE} />
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: 0 }}>
              Recipients ({selected.size} selected)
            </h3>
          </div>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: "8px" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", top: "9px", color: "rgba(255,255,255,0.3)" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              style={{
                width: "100%", padding: "8px 10px 8px 30px", background: "#0C0C0C", border: "1px solid #222",
                borderRadius: "4px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Industry filter */}
          <div style={{ marginBottom: "8px" }}>
            <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
              Filter by Industry
            </label>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "0.55rem",
                background: "#0C0C0C",
                border: "1px solid #333",
                borderRadius: 4,
                color: "#fff",
                fontSize: 14,
                colorScheme: "dark",
              }}
            >
              <option value="All">All industries</option>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          {/* Source filter */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "8px", flexWrap: "wrap" }}>
            {[{ key: "all", label: "All" }, { key: "inquiry", label: "Inquiries" }, { key: "catalog", label: "Catalog" }, { key: "contract", label: "Contracts" }].map((f) => (
              <button
                key={f.key}
                onClick={() => setSourceFilter(f.key)}
                style={{
                  padding: "4px 10px", fontSize: "11px", fontWeight: 600,
                  background: sourceFilter === f.key ? ORANGE : "transparent",
                  border: `1px solid ${sourceFilter === f.key ? ORANGE : "#333"}`,
                  borderRadius: "4px", color: sourceFilter === f.key ? "#0C0C0C" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Select all */}
          <button
            onClick={selectAll}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "6px 0", background: "none", border: "none",
              color: ORANGE, fontSize: "12px", fontWeight: 600, cursor: "pointer",
              marginBottom: "8px",
            }}
          >
            {allFilteredSelected ? <CheckSquare size={14} /> : <Square size={14} />}
            {allFilteredSelected ? "Deselect All" : `Select All (${filtered.length})`}
          </button>

          {/* List */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {loading ? (
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Loading contacts...</p>
            ) : industryFilter !== "All" && recipients.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, padding: "1rem" }}>
                No customers tagged with industry &ldquo;{industryFilter}&rdquo;. Tag one from{" "}
                <Link href="/admin/inquiries" style={{ color: "#F7941D" }}>/admin/inquiries</Link>.
              </p>
            ) : filtered.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "20px" }}>
                No contacts found
              </p>
            ) : (
              filtered.map((r) => {
                const isSelected = selected.has(r.email);
                return (
                  <div
                    key={r.email}
                    onClick={() => toggleRecipient(r.email)}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "8px", borderRadius: "4px", cursor: "pointer",
                      background: isSelected ? "rgba(247,148,29,0.08)" : "transparent",
                      borderBottom: "1px solid #1a1a1a",
                    }}
                  >
                    {isSelected ? <CheckSquare size={14} color={ORANGE} /> : <Square size={14} color="#444" />}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.email}
                      </div>
                    </div>
                    <span style={{
                      fontSize: "9px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
                      color: SOURCE_COLORS[r.source] || "#666", flexShrink: 0,
                    }}>
                      {SOURCE_LABELS[r.source] || r.source}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
