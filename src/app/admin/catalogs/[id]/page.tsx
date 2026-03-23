"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Save,
  Plus,
  ChevronUp,
  ChevronDown,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";

interface Spec {
  label: string;
  value: string;
}

interface Project {
  id: string;
  catalog_id: string;
  title: string;
  description: string;
  image_url: string | null;
  specs: Spec[] | null;
  sort_order: number;
  created_at: string;
}

interface Catalog {
  id: string;
  title: string;
  slug: string;
  description: string;
  created_at: string;
  catalog_projects: Project[];
}

export default function CatalogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Catalog edit state
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ title: "", slug: "", description: "" });
  const [savingCatalog, setSavingCatalog] = useState(false);

  // Per-project edit state: projectId -> edited fields
  const [projectEdits, setProjectEdits] = useState<Record<string, Partial<Project> & { specs: Spec[] }>>({});
  const [savingProject, setSavingProject] = useState<string | null>(null);
  const [uploadingProject, setUploadingProject] = useState<string | null>(null);
  const [addingProject, setAddingProject] = useState(false);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const fetchCatalog = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/catalogs/${id}`);
      if (!res.ok) throw new Error("Failed");
      const data: Catalog = await res.json();
      setCatalog(data);
      const sorted = [...(data.catalog_projects || [])].sort(
        (a, b) => a.sort_order - b.sort_order
      );
      setProjects(sorted);
      // Initialize project edits
      const edits: Record<string, Partial<Project> & { specs: Spec[] }> = {};
      sorted.forEach((p) => {
        edits[p.id] = {
          title: p.title || "",
          description: p.description || "",
          image_url: p.image_url,
          specs: p.specs ? [...p.specs] : [],
        };
      });
      setProjectEdits(edits);
    } catch {
      console.error("Failed to fetch catalog");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchCatalog();
  }, [id, fetchCatalog]);

  // -- Catalog actions --

  function startEditing() {
    if (!catalog) return;
    setEditData({
      title: catalog.title || "",
      slug: catalog.slug || "",
      description: catalog.description || "",
    });
    setEditing(true);
  }

  async function handleSaveCatalog() {
    setSavingCatalog(true);
    try {
      const res = await fetch(`/api/admin/catalogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (res.ok) {
        setCatalog((prev) => (prev ? { ...prev, ...data } : prev));
        setEditing(false);
      } else {
        alert(data.error || "Failed to save catalog");
      }
    } catch {
      alert("Failed to save catalog");
    } finally {
      setSavingCatalog(false);
    }
  }

  async function handleDeleteCatalog() {
    if (!window.confirm("Delete this catalog and all its projects? This cannot be undone."))
      return;
    try {
      await fetch(`/api/admin/catalogs/${id}`, { method: "DELETE" });
      router.push("/admin/catalogs");
    } catch {
      alert("Failed to delete catalog");
    }
  }

  // -- Project actions --

  async function handleAddProject() {
    setAddingProject(true);
    try {
      const res = await fetch(`/api/admin/catalogs/${id}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Untitled Project" }),
      });
      if (res.ok) {
        await fetchCatalog();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add project");
      }
    } catch {
      alert("Failed to add project");
    } finally {
      setAddingProject(false);
    }
  }

  function updateProjectEdit(projectId: string, field: string, value: unknown) {
    setProjectEdits((prev) => ({
      ...prev,
      [projectId]: { ...prev[projectId], [field]: value },
    }));
  }

  function updateSpec(projectId: string, index: number, field: "label" | "value", val: string) {
    setProjectEdits((prev) => {
      const edit = prev[projectId];
      if (!edit) return prev;
      const specs = [...edit.specs];
      specs[index] = { ...specs[index], [field]: val };
      return { ...prev, [projectId]: { ...edit, specs } };
    });
  }

  function addSpec(projectId: string) {
    setProjectEdits((prev) => {
      const edit = prev[projectId];
      if (!edit) return prev;
      return {
        ...prev,
        [projectId]: { ...edit, specs: [...edit.specs, { label: "", value: "" }] },
      };
    });
  }

  function removeSpec(projectId: string, index: number) {
    setProjectEdits((prev) => {
      const edit = prev[projectId];
      if (!edit) return prev;
      const specs = edit.specs.filter((_, i) => i !== index);
      return { ...prev, [projectId]: { ...edit, specs } };
    });
  }

  async function handleSaveProject(projectId: string) {
    const edit = projectEdits[projectId];
    if (!edit) return;
    setSavingProject(projectId);
    try {
      const res = await fetch(`/api/admin/catalogs/${id}/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: edit.title,
          description: edit.description,
          image_url: edit.image_url,
          specs: edit.specs.filter((s) => s.label.trim() || s.value.trim()),
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? { ...p, ...updated } : p))
        );
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save project");
      }
    } catch {
      alert("Failed to save project");
    } finally {
      setSavingProject(null);
    }
  }

  async function handleDeleteProject(projectId: string) {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/catalogs/${id}/projects/${projectId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        setProjectEdits((prev) => {
          const next = { ...prev };
          delete next[projectId];
          return next;
        });
      } else {
        alert("Failed to delete project");
      }
    } catch {
      alert("Failed to delete project");
    }
  }

  async function handleReorder(projectId: string, direction: "up" | "down") {
    const idx = projects.findIndex((p) => p.id === projectId);
    if (idx === -1) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= projects.length) return;

    const newProjects = [...projects];
    [newProjects[idx], newProjects[swapIdx]] = [newProjects[swapIdx], newProjects[idx]];

    const order = newProjects.map((p, i) => ({ id: p.id, sort_order: i }));
    setProjects(newProjects);

    try {
      await fetch(`/api/admin/catalogs/${id}/projects`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });
    } catch {
      // Revert on failure
      await fetchCatalog();
    }
  }

  async function handleImageUpload(projectId: string, file: File) {
    setUploadingProject(projectId);
    try {
      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch("/api/admin/images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.results && data.results.length > 0 && !data.results[0].error) {
        const url = data.results[0].url;
        updateProjectEdit(projectId, "image_url", url);
        // Auto-save the image to the project
        await fetch(`/api/admin/catalogs/${id}/projects/${projectId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: url }),
        });
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? { ...p, image_url: url } : p))
        );
      } else {
        alert("Image upload failed");
      }
    } catch {
      alert("Image upload failed");
    } finally {
      setUploadingProject(null);
    }
  }

  // -- Styles --

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    background: "#0C0C0C",
    border: "1px solid #333",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "rgba(255,255,255,0.35)",
    display: "block",
    marginBottom: "4px",
  };

  if (loading) {
    return <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>;
  }

  if (!catalog) {
    return <p style={{ color: "#f87171" }}>Catalog not found.</p>;
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/catalogs"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "rgba(255,255,255,0.5)",
          textDecoration: "none",
          fontSize: "13px",
          marginBottom: "1.5rem",
        }}
      >
        <ArrowLeft size={14} /> Back to Catalogs
      </Link>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
            Edit Catalog
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
            {catalog.title}
          </h1>
        </div>
        <button
          onClick={handleDeleteCatalog}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "4px",
            color: "#ef4444",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <Trash2 size={14} /> Delete Catalog
        </button>
      </div>

      {/* Catalog Info Card */}
      <div
        style={{
          background: "#111",
          border: "1px solid #222",
          borderRadius: "4px",
          padding: "1.5rem",
          marginBottom: "2.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>
            Catalog Info
          </h2>
          {!editing ? (
            <button
              onClick={startEditing}
              style={{
                padding: "4px 12px",
                background: "transparent",
                border: "1px solid #F7941D",
                borderRadius: "4px",
                color: "#F7941D",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "1px",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Edit
            </button>
          ) : (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={handleSaveCatalog}
                disabled={savingCatalog}
                style={{
                  padding: "4px 12px",
                  background: "#F7941D",
                  border: "none",
                  borderRadius: "4px",
                  color: "#0C0C0C",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                {savingCatalog ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{
                  padding: "4px 12px",
                  background: "transparent",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: "#999",
                  fontSize: "11px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {editing ? (
          <>
            {[
              { key: "title", label: "Title" },
              { key: "slug", label: "Slug" },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: "0.75rem" }}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type="text"
                  value={editData[f.key as keyof typeof editData]}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, [f.key]: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                />
              </div>
            ))}
            <div style={{ marginBottom: "0.75rem" }}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={3}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
              />
            </div>
          </>
        ) : (
          <>
            {[
              { label: "Title", value: catalog.title },
              { label: "Slug", value: catalog.slug },
            ].map((f) => (
              <div key={f.label} style={{ marginBottom: "0.875rem" }}>
                <p
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "rgba(255,255,255,0.35)",
                    margin: "0 0 0.25rem",
                  }}
                >
                  {f.label}
                </p>
                <p style={{ fontSize: "14px", color: "#fff", margin: 0 }}>
                  {f.value || "\u2014"}
                </p>
              </div>
            ))}
            {catalog.description && (
              <div style={{ marginTop: "0.5rem" }}>
                <p
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "rgba(255,255,255,0.35)",
                    margin: "0 0 0.25rem",
                  }}
                >
                  Description
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {catalog.description}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Projects Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Arial, sans-serif",
              margin: 0,
            }}
          >
            Projects
          </h2>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "24px",
              height: "24px",
              padding: "0 6px",
              background: "rgba(247,148,29,0.15)",
              border: "1px solid rgba(247,148,29,0.3)",
              borderRadius: "12px",
              color: "#F7941D",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {projects.length}
          </span>
        </div>
        <button
          onClick={handleAddProject}
          disabled={addingProject}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            background: "#F7941D",
            color: "#000",
            fontWeight: 600,
            fontSize: "14px",
            border: "none",
            borderRadius: "4px",
            cursor: addingProject ? "not-allowed" : "pointer",
            opacity: addingProject ? 0.6 : 1,
          }}
        >
          <Plus size={16} />
          {addingProject ? "Adding..." : "Add Project"}
        </button>
      </div>

      {projects.length === 0 ? (
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
              margin: 0,
            }}
          >
            No projects yet. Add your first project.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {projects.map((project, index) => {
            const edit = projectEdits[project.id];
            if (!edit) return null;
            const isSaving = savingProject === project.id;
            const isUploading = uploadingProject === project.id;

            return (
              <div
                key={project.id}
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "280px 1fr",
                    minHeight: "280px",
                  }}
                >
                  {/* Image area */}
                  <div
                    style={{
                      position: "relative",
                      background: "#0a0a0a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      borderRight: "1px solid #222",
                    }}
                  >
                    {edit.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={edit.image_url}
                        alt={edit.title || "Project image"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "rgba(255,255,255,0.2)",
                        }}
                      >
                        <ImageIcon size={40} />
                        <span style={{ fontSize: "12px" }}>No image</span>
                      </div>
                    )}
                    <button
                      onClick={() => fileInputRefs.current[project.id]?.click()}
                      disabled={isUploading}
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "6px 14px",
                        background: "rgba(0,0,0,0.75)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "4px",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: isUploading ? "wait" : "pointer",
                        backdropFilter: "blur(8px)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Upload size={12} />
                      {isUploading ? "Uploading..." : "Upload Image"}
                    </button>
                    <input
                      ref={(el) => {
                        fileInputRefs.current[project.id] = el;
                      }}
                      type="file"
                      accept=".webp,.png,.jpg,.jpeg"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(project.id, file);
                        e.target.value = "";
                      }}
                    />
                  </div>

                  {/* Info area */}
                  <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {/* Title */}
                    <div>
                      <label style={labelStyle}>Title</label>
                      <input
                        type="text"
                        value={edit.title || ""}
                        onChange={(e) => updateProjectEdit(project.id, "title", e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label style={labelStyle}>Description</label>
                      <textarea
                        value={edit.description || ""}
                        onChange={(e) =>
                          updateProjectEdit(project.id, "description", e.target.value)
                        }
                        rows={2}
                        style={{
                          ...inputStyle,
                          resize: "vertical",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                      />
                    </div>

                    {/* Specs */}
                    <div>
                      <label style={labelStyle}>Specs</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {edit.specs.map((spec, si) => (
                          <div
                            key={si}
                            style={{ display: "flex", gap: "6px", alignItems: "center" }}
                          >
                            <input
                              type="text"
                              placeholder="Label"
                              value={spec.label}
                              onChange={(e) =>
                                updateSpec(project.id, si, "label", e.target.value)
                              }
                              style={{ ...inputStyle, flex: 1 }}
                              onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
                              onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                            />
                            <input
                              type="text"
                              placeholder="Value"
                              value={spec.value}
                              onChange={(e) =>
                                updateSpec(project.id, si, "value", e.target.value)
                              }
                              style={{ ...inputStyle, flex: 1 }}
                              onFocus={(e) => (e.currentTarget.style.borderColor = "#F7941D")}
                              onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                            />
                            <button
                              onClick={() => removeSpec(project.id, si)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "32px",
                                height: "32px",
                                background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.25)",
                                borderRadius: "4px",
                                color: "#ef4444",
                                cursor: "pointer",
                                flexShrink: 0,
                              }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addSpec(project.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            padding: "4px 10px",
                            background: "transparent",
                            border: "1px solid #333",
                            borderRadius: "4px",
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "12px",
                            cursor: "pointer",
                            alignSelf: "flex-start",
                          }}
                        >
                          <Plus size={12} /> Add Spec
                        </button>
                      </div>
                    </div>

                    {/* Project actions row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto",
                        paddingTop: "0.75rem",
                        borderTop: "1px solid #1a1a1a",
                      }}
                    >
                      <div style={{ display: "flex", gap: "6px" }}>
                        {/* Save */}
                        <button
                          onClick={() => handleSaveProject(project.id)}
                          disabled={isSaving}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.4rem 0.75rem",
                            background: "#F7941D",
                            border: "none",
                            borderRadius: "4px",
                            color: "#0C0C0C",
                            fontSize: "12px",
                            fontWeight: 700,
                            cursor: isSaving ? "wait" : "pointer",
                            opacity: isSaving ? 0.6 : 1,
                          }}
                        >
                          <Save size={13} /> {isSaving ? "Saving..." : "Save"}
                        </button>

                        {/* Move Up */}
                        <button
                          onClick={() => handleReorder(project.id, "up")}
                          disabled={index === 0}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px",
                            height: "32px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid #333",
                            borderRadius: "4px",
                            color: index === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)",
                            cursor: index === 0 ? "not-allowed" : "pointer",
                          }}
                          title="Move up"
                        >
                          <ChevronUp size={16} />
                        </button>

                        {/* Move Down */}
                        <button
                          onClick={() => handleReorder(project.id, "down")}
                          disabled={index === projects.length - 1}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px",
                            height: "32px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid #333",
                            borderRadius: "4px",
                            color:
                              index === projects.length - 1
                                ? "rgba(255,255,255,0.15)"
                                : "rgba(255,255,255,0.5)",
                            cursor: index === projects.length - 1 ? "not-allowed" : "pointer",
                          }}
                          title="Move down"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>

                      {/* Delete project */}
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          padding: "0.4rem 0.75rem",
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.3)",
                          borderRadius: "4px",
                          color: "#ef4444",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
