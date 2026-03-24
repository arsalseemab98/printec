"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Upload, Trash2, Pencil, Check, X, ImageIcon } from "lucide-react";

interface PortfolioImage {
  id: string;
  url: string;
  title: string;
  category: string;
  sort_order: number;
  created_at: string;
}

const CATEGORIES = [
  "Floor Wraps",
  "Signage",
  "Wall Wraps",
  "Window Wraps",
  "Neon Signs",
  "Food Truck Wraps",
  "Other",
];

type FilterTab = "All" | string;

export default function AdminPortfolioPage() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("All");
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  // Add form
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Floor Wraps");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (Array.isArray(data)) setImages(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file || !newTitle) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", newTitle);
    formData.append("category", newCategory);

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        await fetchImages();
        setNewTitle("");
        setNewCategory("Floor Wraps");
        if (fileRef.current) fileRef.current.value = "";
        setAdding(false);
      } else {
        const err = await res.json();
        alert(err.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this portfolio image?")) return;
    try {
      await fetch("/api/admin/portfolio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch {
      alert("Delete failed");
    }
  }

  async function handleSaveEdit(id: string) {
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title: editTitle, category: editCategory }),
      });
      if (res.ok) {
        const updated = await res.json();
        setImages((prev) => prev.map((img) => (img.id === id ? { ...img, ...updated } : img)));
        setEditingId(null);
      }
    } catch {
      alert("Update failed");
    }
  }

  function startEdit(img: PortfolioImage) {
    setEditingId(img.id);
    setEditTitle(img.title);
    setEditCategory(img.category);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    background: "#0C0C0C",
    border: "1px solid #333",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
  };

  const tabs = ["All", ...CATEGORIES];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "4px", color: "#F7941D", fontWeight: 500, marginBottom: "0.5rem" }}>
            Content
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", fontFamily: "'Arial Black', Arial, sans-serif", margin: 0 }}>
            Portfolio
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginTop: "0.25rem" }}>
            {images.length} image{images.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            background: adding ? "transparent" : "#F7941D",
            border: adding ? "1px solid #333" : "none",
            borderRadius: "4px",
            color: adding ? "rgba(255,255,255,0.6)" : "#fff",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {adding ? <><X size={16} /> Cancel</> : <><Upload size={16} /> Add Image</>}
        </button>
      </div>

      {/* Add Form */}
      {adding && (
        <form
          onSubmit={handleUpload}
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "4px" }}>
                Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. WEDDING MONOGRAM FLOOR"
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "4px" }}>
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "4px" }}>
              Image File
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".webp,.png,.jpg,.jpeg"
              required
              style={{ ...inputStyle, padding: "0.4rem", cursor: "pointer" }}
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            style={{
              padding: "0.625rem 1.25rem",
              background: "#F7941D",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              cursor: uploading ? "wait" : "pointer",
              opacity: uploading ? 0.6 : 1,
              alignSelf: "flex-start",
            }}
          >
            {uploading ? "Uploading..." : "Upload & Save"}
          </button>
        </form>
      )}

      {/* Filter Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: filter === tab ? "#F7941D" : "#222",
              background: filter === tab ? "rgba(247,148,29,0.1)" : "#111",
              color: filter === tab ? "#F7941D" : "rgba(255,255,255,0.5)",
              fontSize: "13px",
              fontWeight: filter === tab ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "3rem", textAlign: "center" }}>
          <ImageIcon size={32} color="rgba(255,255,255,0.2)" style={{ marginBottom: "1rem" }} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>No portfolio images found.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          {filtered.map((img) => (
            <div
              key={img.id}
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: "4px",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: "100%", aspectRatio: "1", background: "#0a0a0a", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div style={{ padding: "0.75rem" }}>
                {editingId === img.id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={{ ...inputStyle, marginBottom: "0.5rem" }}
                    />
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      style={{ ...inputStyle, cursor: "pointer", marginBottom: "0.5rem" }}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div style={{ display: "flex", gap: "0.35rem" }}>
                      <button
                        onClick={() => handleSaveEdit(img.id)}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.3rem",
                          padding: "0.4rem",
                          background: "#F7941D",
                          border: "none",
                          borderRadius: "3px",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        <Check size={12} /> Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          padding: "0.4rem 0.6rem",
                          background: "transparent",
                          border: "1px solid #333",
                          borderRadius: "3px",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "11px",
                          cursor: "pointer",
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: "12px", color: "#fff", margin: "0 0 0.25rem", fontWeight: 600 }}>
                      {img.title}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "4px",
                        background: "rgba(247,148,29,0.1)",
                        color: "#F7941D",
                        fontSize: "10px",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {img.category}
                    </span>
                    <div style={{ display: "flex", gap: "0.35rem" }}>
                      <button
                        onClick={() => startEdit(img)}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.3rem",
                          padding: "0.4rem",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid #333",
                          borderRadius: "3px",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "11px",
                          cursor: "pointer",
                        }}
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(img.id)}
                        style={{
                          padding: "0.4rem 0.6rem",
                          background: "rgba(239,68,68,0.08)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          borderRadius: "3px",
                          color: "#ef4444",
                          fontSize: "11px",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
