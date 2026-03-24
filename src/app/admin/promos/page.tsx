"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ArrowUp, ArrowDown, Trash2, Save } from "lucide-react";

interface PromoSlide {
  id: string;
  text: string;
  link: string;
  active: boolean;
  sort_order: number;
  created_at: string;
}

export default function PromosPage() {
  const [slides, setSlides] = useState<PromoSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newText, setNewText] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newActive, setNewActive] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  async function fetchSlides() {
    try {
      const res = await fetch("/api/admin/promo-slides");
      const data = await res.json();
      setSlides(data.slides || []);
    } catch {
      console.error("Failed to fetch promo slides");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!newText.trim()) return;
    try {
      const res = await fetch("/api/admin/promo-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newText,
          link: newLink,
          active: newActive,
          sort_order: slides.length,
        }),
      });
      if (res.ok) {
        setNewText("");
        setNewLink("");
        setNewActive(true);
        setShowNew(false);
        fetchSlides();
      }
    } catch {
      alert("Failed to create slide");
    }
  }

  async function handleSave(slide: PromoSlide) {
    setSaving(slide.id);
    try {
      await fetch(`/api/admin/promo-slides/${slide.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: slide.text,
          link: slide.link,
          active: slide.active,
          sort_order: slide.sort_order,
        }),
      });
    } catch {
      alert("Failed to save slide");
    } finally {
      setSaving(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this promo slide?")) return;
    try {
      const res = await fetch(`/api/admin/promo-slides/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSlides((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      alert("Failed to delete slide");
    }
  }

  function updateSlide(id: string, updates: Partial<PromoSlide>) {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  }

  async function moveSlide(id: string, direction: "up" | "down") {
    const idx = slides.findIndex((s) => s.id === id);
    if (
      (direction === "up" && idx === 0) ||
      (direction === "down" && idx === slides.length - 1)
    )
      return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const newSlides = [...slides];
    const temp = newSlides[idx].sort_order;
    newSlides[idx].sort_order = newSlides[swapIdx].sort_order;
    newSlides[swapIdx].sort_order = temp;
    [newSlides[idx], newSlides[swapIdx]] = [newSlides[swapIdx], newSlides[idx]];
    setSlides(newSlides);

    // Save both reordered slides
    await Promise.all([
      fetch(`/api/admin/promo-slides/${newSlides[idx].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newSlides[idx].text,
          link: newSlides[idx].link,
          active: newSlides[idx].active,
          sort_order: newSlides[idx].sort_order,
        }),
      }),
      fetch(`/api/admin/promo-slides/${newSlides[swapIdx].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newSlides[swapIdx].text,
          link: newSlides[swapIdx].link,
          active: newSlides[swapIdx].active,
          sort_order: newSlides[swapIdx].sort_order,
        }),
      }),
    ]);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.625rem 0.75rem",
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "0.375rem",
    display: "block",
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2rem",
        }}
      >
        <div>
          <Link
            href="/admin"
            style={{
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              fontSize: "13px",
              display: "inline-block",
              marginBottom: "0.75rem",
            }}
          >
            &larr; Dashboard
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
            Promotions
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
            Special Offers
          </h1>
        </div>

        <button
          onClick={() => setShowNew(!showNew)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: "#F7941D",
            color: "#fff",
            fontWeight: 600,
            fontSize: "14px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          <Plus size={16} />
          New Slide
        </button>
      </div>

      {/* New slide form */}
      {showNew && (
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h3
            style={{
              color: "#fff",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontSize: "16px",
              fontWeight: 900,
              marginBottom: "1rem",
              margin: "0 0 1rem 0",
            }}
          >
            Add New Slide
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Text</label>
              <input
                style={inputStyle}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="FREE SHIPPING ON ALL ORDERS OVER $500"
              />
            </div>
            <div>
              <label style={labelStyle}>Link</label>
              <input
                style={inputStyle}
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="/contact"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Active</label>
              <button
                onClick={() => setNewActive(!newActive)}
                style={{
                  width: "44px",
                  height: "24px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  background: newActive ? "#22c55e" : "#555",
                  position: "relative",
                  transition: "background 0.2s",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: newActive ? "22px" : "2px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                  }}
                />
              </button>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handleCreate}
                style={{
                  padding: "0.625rem 1.25rem",
                  background: "#F7941D",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "13px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Create Slide
              </button>
              <button
                onClick={() => setShowNew(false)}
                style={{
                  padding: "0.625rem 1.25rem",
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                  fontSize: "13px",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
          Loading slides...
        </p>
      )}

      {/* Empty state */}
      {!loading && slides.length === 0 && (
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "15px",
              marginBottom: "1rem",
            }}
          >
            No promo slides yet. Create your first slide to get started.
          </p>
          <button
            onClick={() => setShowNew(true)}
            style={{
              color: "#F7941D",
              background: "none",
              border: "none",
              textDecoration: "underline",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Create a slide
          </button>
        </div>
      )}

      {/* Slide list */}
      {!loading &&
        slides.length > 0 &&
        slides.map((slide, idx) => (
          <div
            key={slide.id}
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.25rem",
              marginBottom: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Top row: toggle + text */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              {/* Active toggle */}
              <button
                onClick={() => updateSlide(slide.id, { active: !slide.active })}
                style={{
                  width: "44px",
                  height: "24px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  background: slide.active ? "#22c55e" : "#555",
                  position: "relative",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
                title={slide.active ? "Active" : "Inactive"}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: slide.active ? "22px" : "2px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                  }}
                />
              </button>

              {/* Text input */}
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={labelStyle}>Text</label>
                <input
                  style={inputStyle}
                  value={slide.text}
                  onChange={(e) =>
                    updateSlide(slide.id, { text: e.target.value })
                  }
                />
              </div>

              {/* Link input */}
              <div style={{ flex: 0.5, minWidth: "150px" }}>
                <label style={labelStyle}>Link</label>
                <input
                  style={inputStyle}
                  value={slide.link}
                  onChange={(e) =>
                    updateSlide(slide.id, { link: e.target.value })
                  }
                  placeholder="/contact"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => moveSlide(slide.id, "up")}
                disabled={idx === 0}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "0.4rem 0.75rem",
                  background: "transparent",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: idx === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
                  fontSize: "12px",
                  cursor: idx === 0 ? "not-allowed" : "pointer",
                }}
              >
                <ArrowUp size={14} />
                Up
              </button>
              <button
                onClick={() => moveSlide(slide.id, "down")}
                disabled={idx === slides.length - 1}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "0.4rem 0.75rem",
                  background: "transparent",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color:
                    idx === slides.length - 1
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.6)",
                  fontSize: "12px",
                  cursor: idx === slides.length - 1 ? "not-allowed" : "pointer",
                }}
              >
                <ArrowDown size={14} />
                Down
              </button>

              <div style={{ flex: 1 }} />

              <button
                onClick={() => handleSave(slide)}
                disabled={saving === slide.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "0.4rem 0.75rem",
                  background: "#F7941D",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: saving === slide.id ? 0.6 : 1,
                }}
              >
                <Save size={14} />
                {saving === slide.id ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => handleDelete(slide.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "0.4rem 0.75rem",
                  background: "transparent",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "4px",
                  color: "rgba(239,68,68,0.7)",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ef4444")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(239,68,68,0.7)")
                }
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
