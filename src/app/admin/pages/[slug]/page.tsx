"use client";

import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Trash2, Loader2, Check, Save } from "lucide-react";

const PAGE_FIELDS: Record<string, { field: string; label: string; type: "input" | "textarea" }[]> = {
  "about": [
    { field: "hero_title", label: "Hero Title", type: "input" },
    { field: "story_heading", label: "Story Heading", type: "input" },
    { field: "story_body", label: "Story Text", type: "textarea" },
    { field: "mission_quote", label: "Mission Quote", type: "input" },
  ],
  "dance-floor-wraps": [
    { field: "hero_title", label: "Hero Title", type: "input" },
    { field: "intro_heading", label: "Intro Heading", type: "input" },
    { field: "intro_body", label: "Intro Text", type: "textarea" },
  ],
  "wall-wraps": [
    { field: "hero_title", label: "Hero Title", type: "input" },
    { field: "intro_heading", label: "Intro Heading", type: "input" },
    { field: "intro_body", label: "Intro Text", type: "textarea" },
  ],
  "window-wraps": [
    { field: "hero_title", label: "Hero Title", type: "input" },
    { field: "intro_heading", label: "Intro Heading", type: "input" },
    { field: "intro_body", label: "Intro Text", type: "textarea" },
  ],
  "channel-letters-signage": [
    { field: "hero_title", label: "Hero Title", type: "input" },
    { field: "intro_heading", label: "Intro Heading", type: "input" },
    { field: "intro_body", label: "Intro Text", type: "textarea" },
  ],
};

const PAGES = [
  { slug: "about", name: "About Us", slots: ["hero", "story"] },
  { slug: "dance-floor-wraps", name: "Dance Floor Wraps", slots: ["hero", "before", "after"] },
  { slug: "wall-wraps", name: "Wall Wraps", slots: ["hero", "before", "after"] },
  { slug: "window-wraps", name: "Window Wraps", slots: ["hero", "before", "after"] },
  { slug: "channel-letters-signage", name: "Channel Letters & Signage", slots: ["hero", "before", "after"] },
  { slug: "custom-neon-signs", name: "Custom Neon Signs", slots: ["hero", "before", "after"] },
  { slug: "business-signage", name: "Business Signage", slots: ["hero"] },
  { slug: "team", name: "Team", slots: ["hero"] },
  { slug: "contact", name: "Contact", slots: ["map"] },
  { slug: "portfolio", name: "Portfolio", slots: [] },
];

interface SlotImage {
  slot: string;
  url: string;
  alt_text: string;
}

function SlotCard({
  slug,
  slotName,
  existingImage,
  onUpdate,
}: {
  slug: string;
  slotName: string;
  existingImage: SlotImage | null;
  onUpdate: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState(existingImage?.alt_text || "");
  const [imageUrl, setImageUrl] = useState(existingImage?.url || "");

  useEffect(() => {
    setAltText(existingImage?.alt_text || "");
    setImageUrl(existingImage?.url || "");
  }, [existingImage]);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Upload file
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error);

      // Save to page_images
      const saveRes = await fetch(`/api/admin/pages/${slug}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: slotName,
          url: uploadData.url,
          alt_text: altText,
        }),
      });
      if (!saveRes.ok) {
        const saveData = await saveRes.json();
        throw new Error(saveData.error);
      }

      setImageUrl(uploadData.url);
      onUpdate();
    } catch (err) {
      alert(`Upload failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleSaveAlt() {
    if (!imageUrl) return;
    try {
      const res = await fetch(`/api/admin/pages/${slug}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: slotName,
          url: imageUrl,
          alt_text: altText,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      onUpdate();
    } catch (err) {
      alert(`Save failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }

  async function handleRemove() {
    if (!confirm("Remove this image?")) return;
    try {
      const res = await fetch(`/api/admin/pages/${slug}/images`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot: slotName }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      setImageUrl("");
      setAltText("");
      onUpdate();
    } catch (err) {
      alert(`Delete failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }

  const label = slotName.charAt(0).toUpperCase() + slotName.slice(1);

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "4px",
        padding: "1.25rem",
      }}
    >
      {/* Slot label */}
      <p
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "4px",
          color: "#F7941D",
          fontWeight: 500,
          marginBottom: "0.75rem",
        }}
      >
        {label}
      </p>

      {/* Image preview or placeholder */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: "4px",
          overflow: "hidden",
          background: "#1a1a1a",
          border: "1px solid #222",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {uploading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <Loader2
              size={32}
              style={{
                color: "#F7941D",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        )}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={altText || slotName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>
            No image
          </p>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {/* Upload button */}
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "0.6rem 1rem",
          background: "#F7941D",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "13px",
          fontWeight: 600,
          cursor: uploading ? "not-allowed" : "pointer",
          opacity: uploading ? 0.6 : 1,
          marginBottom: "0.75rem",
          justifyContent: "center",
        }}
      >
        <Upload size={14} />
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Alt text input */}
      <div style={{ marginBottom: "0.75rem" }}>
        <input
          type="text"
          placeholder="Alt text..."
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            background: "#0C0C0C",
            border: "1px solid #222",
            borderRadius: "4px",
            color: "#fff",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleSaveAlt}
          disabled={!imageUrl}
          style={{
            flex: 1,
            padding: "0.5rem",
            background: "transparent",
            border: "1px solid #222",
            borderRadius: "4px",
            color: imageUrl ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
            fontSize: "12px",
            cursor: imageUrl ? "pointer" : "not-allowed",
          }}
        >
          Save Alt Text
        </button>
        <button
          onClick={handleRemove}
          disabled={!imageUrl}
          style={{
            padding: "0.5rem 0.75rem",
            background: "transparent",
            border: "1px solid #E53935",
            borderRadius: "4px",
            color: imageUrl ? "#E53935" : "rgba(229,57,53,0.3)",
            fontSize: "12px",
            cursor: imageUrl ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <Trash2 size={12} />
          Remove
        </button>
      </div>
    </div>
  );
}

function ContentField({
  slug,
  fieldDef,
  initialValue,
}: {
  slug: string;
  fieldDef: { field: string; label: string; type: "input" | "textarea" };
  initialValue: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/pages/${slug}/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field: fieldDef.field, value }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert(`Save failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem 0.75rem",
    background: "#111",
    border: "1px solid #222",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "12px",
          color: "rgba(255,255,255,0.6)",
          marginBottom: "0.4rem",
          fontWeight: 500,
        }}
      >
        {fieldDef.label}
      </label>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
        {fieldDef.type === "textarea" ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: "vertical", flex: 1 }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
          />
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.6rem 1rem",
            background: saved ? "#2E7D32" : "#F7941D",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.6 : 1,
            whiteSpace: "nowrap",
            transition: "background 0.3s",
            minHeight: fieldDef.type === "textarea" ? "38px" : undefined,
          }}
        >
          {saved ? <Check size={14} /> : <Save size={14} />}
          {saving ? "Saving..." : saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

function PageContentSection({ slug }: { slug: string }) {
  const fields = PAGE_FIELDS[slug];
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch(`/api/admin/pages/${slug}/content`);
        const data = await res.json();
        if (res.ok && data.content) {
          const map: Record<string, string> = {};
          for (const item of data.content) {
            map[item.field] = item.value;
          }
          setContent(map);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [slug]);

  if (!fields) return null;

  return (
    <div style={{ marginTop: "2.5rem" }}>
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
        Page Content
      </p>
      <h2
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#fff",
          margin: "0 0 1.5rem 0",
        }}
      >
        Text Fields
      </h2>

      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Loader2
            size={24}
            style={{
              color: "#F7941D",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          {fields.map((fieldDef) => (
            <ContentField
              key={fieldDef.field}
              slug={slug}
              fieldDef={fieldDef}
              initialValue={content[fieldDef.field] || ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PageEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const page = PAGES.find((p) => p.slug === slug);
  const [images, setImages] = useState<SlotImage[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchImages() {
    try {
      const res = await fetch(`/api/admin/pages/${slug}/images`);
      const data = await res.json();
      if (res.ok) {
        setImages(data.images || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!page) {
    return (
      <div style={{ color: "#fff", padding: "2rem" }}>
        <p>Page not found.</p>
        <Link href="/admin/pages" style={{ color: "#F7941D" }}>
          Back to Pages
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/pages"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "rgba(255,255,255,0.5)",
          textDecoration: "none",
          fontSize: "13px",
          marginBottom: "1.5rem",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#F7941D")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
        }
      >
        <ArrowLeft size={14} />
        Back to Pages
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
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
          Page Images
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
          {page.name}
        </h1>
      </div>

      {/* Slots grid */}
      {page.slots.length === 0 ? (
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
            This page has no configurable image slots.
          </p>
        </div>
      ) : loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <Loader2
            size={32}
            style={{
              color: "#F7941D",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {page.slots.map((slot) => {
            const existing = images.find((img) => img.slot === slot) || null;
            return (
              <SlotCard
                key={slot}
                slug={slug}
                slotName={slot}
                existingImage={existing}
                onUpdate={fetchImages}
              />
            );
          })}
        </div>
      )}

      {/* Page Content Section */}
      {PAGE_FIELDS[slug] && (
        <PageContentSection slug={slug} />
      )}

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
