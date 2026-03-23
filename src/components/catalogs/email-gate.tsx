"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";

interface EmailGateProps {
  catalogTitle: string;
  catalogSlug: string;
  onUnlock: () => void;
}

const ORANGE = "#F7941D";
const BLACK = "#0C0C0C";
const DARK1 = "#161616";
const DARK2 = "#222222";

export default function EmailGate({ catalogTitle, catalogSlug, onUnlock }: EmailGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const key = "catalog_unlocked_" + catalogSlug;
    if (sessionStorage.getItem(key) === "true") {
      onUnlock();
      return;
    }
    // Trigger fade-in
    requestAnimationFrame(() => setVisible(true));
  }, [catalogSlug, onUnlock]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/catalog-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), catalog_slug: catalogSlug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      sessionStorage.setItem("catalog_unlocked_" + catalogSlug, "true");
      onUnlock();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#fff",
    background: BLACK,
    border: `1px solid ${DARK2}`,
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <>
      <style>{`
        @keyframes emailGateFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes emailGatePulse {
          0%, 100% { box-shadow: 0 0 20px rgba(247,148,29,0.4); }
          50% { box-shadow: 0 0 35px rgba(247,148,29,0.7); }
        }
        .email-gate-input:focus {
          border-color: ${ORANGE} !important;
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div
          style={{
            position: "relative",
            background: DARK1,
            border: `1px solid ${DARK2}`,
            borderRadius: "4px",
            padding: "32px",
            maxWidth: "420px",
            width: "100%",
          }}
        >
          {/* Close button */}
          <button
            onClick={onUnlock}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "32px",
              height: "32px",
              border: "none",
              background: "transparent",
              color: "rgba(255,255,255,0.3)",
              fontSize: "22px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
            aria-label="Skip"
          >
            &times;
          </button>

          {/* Logo */}
          <div style={{ marginBottom: "24px" }}>
            <Image
              src="/printec-logo-light.png"
              alt="Printec Virginia LLC"
              width={200}
              height={125}
              style={{ height: "40px", width: "auto" }}
            />
          </div>

          {/* Orange divider */}
          <div
            style={{
              width: "48px",
              height: "2px",
              background: ORANGE,
              boxShadow: `0 0 10px ${ORANGE}`,
              marginBottom: "20px",
            }}
          />

          {/* Label */}
          <p
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: ORANGE,
              margin: "0 0 12px",
            }}
          >
            EXCLUSIVE PORTFOLIO
          </p>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "24px",
              color: "#fff",
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            {catalogTitle}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 24px",
            }}
          >
            Enter your details to unlock this exclusive portfolio catalog and explore our work.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              className="email-gate-input"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ ...inputStyle, marginBottom: "12px" }}
              required
            />
            <input
              className="email-gate-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...inputStyle, marginBottom: "16px" }}
              required
            />

            {error && (
              <p style={{ fontSize: "13px", color: "#E53935", margin: "0 0 12px" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                padding: "14px",
                background: ORANGE,
                color: "#000",
                fontFamily: "'Arial Black', sans-serif",
                fontWeight: 900,
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                border: "none",
                borderRadius: "4px",
                cursor: submitting ? "wait" : "pointer",
                opacity: submitting ? 0.7 : 1,
                animation: "emailGatePulse 2s ease-in-out infinite",
                transition: "opacity 0.2s",
              }}
            >
              {submitting ? "Unlocking..." : "View Catalog"}
            </button>
          </form>

          {/* Privacy */}
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.2)",
              margin: "16px 0 0",
              textAlign: "center",
            }}
          >
            We respect your privacy.
          </p>
        </div>
      </div>
    </>
  );
}
