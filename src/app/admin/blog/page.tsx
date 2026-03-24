"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  published: boolean;
  created_at: string;
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      } else {
        alert("Failed to delete post");
      }
    } catch {
      alert("Failed to delete post");
    }
  }

  return (
    <div>
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
            Blog Posts
          </h1>
        </div>

        <Link
          href="/admin/blog/new"
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
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
          Loading posts...
        </p>
      )}

      {/* Empty state */}
      {!loading && posts.length === 0 && (
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
            No blog posts yet. Create your first post to get started.
          </p>
          <Link
            href="/admin/blog/new"
            style={{
              color: "#F7941D",
              textDecoration: "underline",
              fontSize: "14px",
            }}
          >
            Create a post
          </Link>
        </div>
      )}

      {/* Posts table */}
      {!loading && posts.length > 0 && (
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
              gridTemplateColumns: "1fr 140px 110px 130px 90px",
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
            <span>Category</span>
            <span>Status</span>
            <span>Date</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="admin-blog-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 110px 130px 90px",
                gap: "1rem",
                padding: "0.875rem 1.25rem",
                borderBottom: "1px solid #1a1a1a",
                alignItems: "center",
                fontSize: "14px",
              }}
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
                {post.title}
              </span>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>
                {post.category}
              </span>
              <span>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: post.published
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(234,179,8,0.15)",
                    color: post.published ? "#22c55e" : "#eab308",
                    border: `1px solid ${
                      post.published
                        ? "rgba(34,197,94,0.3)"
                        : "rgba(234,179,8,0.3)"
                    }`,
                  }}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span style={{ display: "flex", gap: "0.5rem" }}>
                <Link
                  href={`/admin/blog/${post.slug}`}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "color 0.15s",
                  }}
                  title="Edit"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(post.slug, post.title)}
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
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
