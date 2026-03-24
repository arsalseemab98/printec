"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

interface Catalog {
  id: string;
  title: string;
  slug: string;
  description: string;
  project_count: number;
  created_at: string;
}

export default function CatalogsListPage() {
  const router = useRouter();
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCatalogs();
  }, []);

  async function fetchCatalogs() {
    try {
      const res = await fetch("/api/admin/catalogs");
      const data = await res.json();
      setCatalogs(data.catalogs || []);
    } catch {
      console.error("Failed to fetch catalogs");
    } finally {
      setLoading(false);
    }
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  function handleTitleChange(value: string) {
    setFormTitle(value);
    setFormSlug(generateSlug(value));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!formTitle.trim() || !formSlug.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/catalogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle.trim(),
          slug: formSlug.trim(),
          description: formDescription.trim(),
        }),
      });

      if (res.ok) {
        setFormTitle("");
        setFormSlug("");
        setFormDescription("");
        setShowForm(false);
        fetchCatalogs();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create catalog");
      }
    } catch {
      alert("Failed to create catalog");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/catalogs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCatalogs((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete catalog");
      }
    } catch {
      alert("Failed to delete catalog");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "#0C0C0C",
    border: "1px solid #222",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "2px",
    color: "rgba(255,255,255,0.35)",
    marginBottom: "0.5rem",
  };

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          color: "rgba(255,255,255,0.5)",
          textDecoration: "none",
          fontSize: "13px",
          marginBottom: "1.5rem",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#F7941D")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
        }
      >
        <ArrowLeft size={14} />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div
        className="admin-header-row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2rem",
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
            Catalog Management
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
            Catalogs
          </h1>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: "#F7941D",
            color: "#000",
            fontWeight: 600,
            fontSize: "14px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          <Plus size={16} />
          New Catalog
        </button>
      </div>

      {/* New catalog form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Catalog title"
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Slug</label>
            <input
              type="text"
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              placeholder="catalog-slug"
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Optional description"
              rows={3}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "0.625rem 1.25rem",
                background: "#F7941D",
                color: "#000",
                fontWeight: 600,
                fontSize: "14px",
                border: "none",
                borderRadius: "4px",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.6 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {submitting ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormTitle("");
                setFormSlug("");
                setFormDescription("");
              }}
              style={{
                padding: "0.625rem 1.25rem",
                background: "transparent",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 500,
                fontSize: "14px",
                border: "1px solid #222",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "color 0.15s",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Loading */}
      {loading && (
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
          Loading catalogs...
        </p>
      )}

      {/* Empty state */}
      {!loading && catalogs.length === 0 && (
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
            No catalogs yet. Create your first catalog.
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{
              color: "#F7941D",
              textDecoration: "underline",
              fontSize: "14px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create a catalog
          </button>
        </div>
      )}

      {/* Catalogs table */}
      {!loading && catalogs.length > 0 && (
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            className="admin-blog-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 150px 100px 130px 140px",
              gap: "1rem",
              padding: "0.875rem 1.25rem",
              borderBottom: "1px solid #222",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <span>Title</span>
            <span>Slug</span>
            <span>Projects</span>
            <span>Created</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          {catalogs.map((catalog) => (
            <div
              key={catalog.id}
              className="admin-blog-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 150px 100px 130px 140px",
                gap: "1rem",
                padding: "0.875rem 1.25rem",
                borderBottom: "1px solid #1a1a1a",
                alignItems: "center",
                fontSize: "14px",
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
              <span
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {catalog.title}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.5)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {catalog.slug}
              </span>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>
                {catalog.project_count ?? 0}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                }}
              >
                {new Date(catalog.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <Link
                  href={`/admin/catalogs/${catalog.id}`}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "color 0.15s",
                  }}
                  title="Edit"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#F7941D")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(catalog.id, catalog.title)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(239,68,68,0.7)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.15s",
                  }}
                  title="Delete"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ef4444")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(239,68,68,0.7)")
                  }
                >
                  <Trash2 size={16} />
                </button>
                <Link
                  href="/admin/catalogs/leads"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "color 0.15s",
                    textDecoration: "none",
                    display: "inline-flex",
                  }}
                  title="View Leads"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#F7941D")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  <ExternalLink size={16} />
                </Link>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
