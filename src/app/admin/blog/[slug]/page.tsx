"use client";

import { useState, useEffect, useCallback, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Save, Trash2, Upload } from "lucide-react";

const TiptapEditor = dynamic(
  () => import("@/components/admin/tiptap-editor"),
  { ssr: false }
);

const CATEGORIES = ["Signage", "Events", "Business", "Design", "General"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "#111",
  border: "1px solid #222",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.6)",
  marginBottom: "0.5rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: routeSlug } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("General");
  const [readTime, setReadTime] = useState("5 min read");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [content, setContent] = useState("");

  const handleContentChange = useCallback((html: string) => {
    setContent(html);
  }, []);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/admin/blog/${routeSlug}`);
        if (!res.ok) {
          alert("Post not found");
          router.push("/admin/blog");
          return;
        }
        const data = await res.json();
        const post = data.post;
        setTitle(post.title || "");
        setSlug(post.slug || "");
        setCategory(post.category || "General");
        setReadTime(post.read_time || "5 min read");
        setExcerpt(post.excerpt || "");
        setCoverImage(post.cover_image || "");
        setPublished(post.published || false);
        setContent(post.content || "");
      } catch {
        alert("Failed to load post");
        router.push("/admin/blog");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [routeSlug, router]);

  async function handleUploadCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setCoverImage(data.url);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!title || !slug) {
      alert("Title and slug are required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog/${routeSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title,
          excerpt,
          category,
          read_time: readTime,
          content,
          cover_image: coverImage,
          published,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // If slug changed, redirect to new slug
        if (data.post?.slug && data.post.slug !== routeSlug) {
          router.push(`/admin/blog/${data.post.slug}`);
        }
        alert("Post saved!");
      } else {
        const data = await res.json();
        alert("Save failed: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/blog/${routeSlug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/blog");
      } else {
        alert("Delete failed");
      }
    } catch {
      alert("Delete failed");
    }
  }

  if (loading) {
    return (
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
        Loading post...
      </p>
    );
  }

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/admin/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            fontSize: "13px",
            marginBottom: "1rem",
          }}
        >
          <ArrowLeft size={14} />
          Back to Blog
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
          Content
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
          Edit Post
        </h1>
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Title */}
        <div>
          <label style={labelStyle}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
          />
        </div>

        {/* Slug */}
        <div>
          <label style={labelStyle}>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="post-slug"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
          />
        </div>

        {/* Category + Read Time row */}
        <div className="admin-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} style={{ background: "#111", color: "#fff" }}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Read Time</label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="5 min read"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description..."
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label style={labelStyle}>Cover Image</label>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Image URL or upload..."
              style={{ ...inputStyle, flex: 1 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadCover}
              style={{ display: "none" }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.75rem 1rem",
                background: "#222",
                border: "1px solid #333",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "13px",
                cursor: uploading ? "wait" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <Upload size={14} />
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {coverImage && (
            <img
              src={coverImage}
              alt="Cover preview"
              style={{
                marginTop: "0.75rem",
                maxWidth: "300px",
                borderRadius: "4px",
                border: "1px solid #222",
              }}
            />
          )}
        </div>

        {/* Published toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <label
            style={{
              position: "relative",
              display: "inline-block",
              width: 44,
              height: 24,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0, position: "absolute" }}
            />
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: published ? "#F7941D" : "#333",
                borderRadius: "9999px",
                transition: "background 0.2s",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 2,
                left: published ? 22 : 2,
                width: 20,
                height: 20,
                background: "#fff",
                borderRadius: "50%",
                transition: "left 0.2s",
              }}
            />
          </label>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
            {published ? "Published" : "Draft"}
          </span>
        </div>

        {/* Content */}
        <div>
          <label style={labelStyle}>Content</label>
          <TiptapEditor content={content} onChange={handleContentChange} />
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            paddingTop: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 2rem",
              background: "#F7941D",
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px",
              border: "none",
              borderRadius: "4px",
              cursor: saving ? "wait" : "pointer",
              opacity: saving ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Post"}
          </button>

          <button
            onClick={handleDelete}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              background: "transparent",
              color: "#ef4444",
              fontWeight: 600,
              fontSize: "14px",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.1)";
              e.currentTarget.style.borderColor = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
            }}
          >
            <Trash2 size={16} />
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
}
