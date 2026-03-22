"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Search, Upload, Trash2, Copy, CheckCircle, XCircle, ImageIcon } from "lucide-react";

interface ImageFile {
  name: string;
  url: string;
  size: number;
  created_at?: string;
}

function formatSize(bytes: number): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function AdminImagesPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/images");
      const data = await res.json();
      if (data.images) setImages(data.images);
    } catch {
      console.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const allowed = [".webp", ".png", ".jpg", ".jpeg"];
    const valid = fileArray.filter((f) =>
      allowed.some((ext) => f.name.toLowerCase().endsWith(ext))
    );

    if (!valid.length) {
      setUploadStatus("No valid image files selected (.webp, .png, .jpg, .jpeg)");
      return;
    }

    setUploading(true);
    setUploadStatus(`Uploading ${valid.length} file${valid.length > 1 ? "s" : ""}...`);

    const formData = new FormData();
    valid.forEach((f) => formData.append("files", f));

    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.results) {
        const successes = data.results.filter((r: { error?: string }) => !r.error);
        const failures = data.results.filter((r: { error?: string }) => r.error);
        let msg = `${successes.length} uploaded`;
        if (failures.length) msg += `, ${failures.length} failed`;
        setUploadStatus(msg);
        await fetchImages();
      } else {
        setUploadStatus(data.error || "Upload failed");
      }
    } catch {
      setUploadStatus("Upload failed — network error");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadStatus(null), 4000);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!window.confirm(`Delete "${filename}"?\n\nThis cannot be undone.`)) return;

    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      const data = await res.json();
      if (data.success) {
        setImages((prev) => prev.filter((img) => img.name !== filename));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch {
      alert("Delete failed — network error");
    }
  };

  const handleCopy = async (url: string, name: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
    } catch {
      alert("Failed to copy URL");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files);
  };

  const filtered = images.filter((img) =>
    img.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
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
          Media
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
          Image Manager
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginTop: "0.5rem" }}>
          {loading ? "Loading..." : `${images.length} image${images.length !== 1 ? "s" : ""} in storage`}
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          background: dragOver ? "rgba(247,148,29,0.08)" : "#111",
          border: `2px dashed ${dragOver ? "#F7941D" : "#333"}`,
          borderRadius: "4px",
          padding: "2rem",
          textAlign: "center",
          marginBottom: "1.5rem",
          transition: "all 0.2s",
          cursor: "pointer",
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".webp,.png,.jpg,.jpeg"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.length) handleUpload(e.target.files);
            e.target.value = "";
          }}
        />
        <Upload
          size={28}
          style={{
            color: dragOver ? "#F7941D" : "rgba(255,255,255,0.3)",
            marginBottom: "0.75rem",
          }}
        />
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0 0 0.25rem" }}>
          {uploading ? "Uploading..." : "Drag & drop images here, or click to browse"}
        </p>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", margin: 0 }}>
          Accepts .webp, .png, .jpg, .jpeg — multiple files supported
        </p>
        {uploadStatus && (
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "13px",
              color: uploadStatus.includes("failed") ? "#E53935" : "#F7941D",
              fontWeight: 600,
            }}
          >
            {uploadStatus}
          </p>
        )}
      </div>

      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          background: "#111",
          border: "1px solid #222",
          borderRadius: "4px",
          padding: "0.6rem 1rem",
          marginBottom: "1.5rem",
        }}
      >
        <Search size={16} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Filter images by filename..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: "14px",
            width: "100%",
          }}
        />
        {search && (
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", whiteSpace: "nowrap" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Image Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)" }}>
          Loading images...
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "rgba(255,255,255,0.3)",
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
          }}
        >
          <ImageIcon size={32} style={{ marginBottom: "0.75rem", opacity: 0.4 }} />
          <p style={{ margin: 0 }}>
            {search ? "No images match your search" : "No images uploaded yet"}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map((img) => (
            <div
              key={img.name}
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: "4px",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#222")}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: "100%",
                  height: 160,
                  background: "#0a0a0a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div style={{ padding: "0.75rem" }}>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#fff",
                    margin: "0 0 0.25rem",
                    wordBreak: "break-all",
                    lineHeight: 1.4,
                  }}
                  title={img.name}
                >
                  {img.name.length > 40 ? img.name.slice(0, 37) + "..." : img.name}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.3)",
                    margin: "0 0 0.75rem",
                  }}
                >
                  {formatSize(img.size)}
                </p>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleCopy(img.url, img.name)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.35rem",
                      padding: "0.4rem",
                      background: copiedName === img.name ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${copiedName === img.name ? "rgba(76,175,80,0.3)" : "#333"}`,
                      borderRadius: "3px",
                      color: copiedName === img.name ? "#4CAF50" : "rgba(255,255,255,0.5)",
                      fontSize: "11px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {copiedName === img.name ? (
                      <>
                        <CheckCircle size={12} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy URL
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(img.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.4rem 0.6rem",
                      background: "rgba(229,57,53,0.08)",
                      border: "1px solid rgba(229,57,53,0.2)",
                      borderRadius: "3px",
                      color: "#E53935",
                      fontSize: "11px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(229,57,53,0.15)";
                      e.currentTarget.style.borderColor = "rgba(229,57,53,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(229,57,53,0.08)";
                      e.currentTarget.style.borderColor = "rgba(229,57,53,0.2)";
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
