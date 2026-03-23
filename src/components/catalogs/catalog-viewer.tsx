"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const ORANGE = "#F7941D";
const BLACK = "#0C0C0C";
const DARK2 = "#222222";

interface ProjectSpec {
  label: string;
  value: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  specs: ProjectSpec[];
}

interface CatalogViewerProps {
  catalog: {
    title: string;
    description: string;
    slug: string;
  };
  projects: Project[];
}

export default function CatalogViewer({ catalog, projects }: CatalogViewerProps) {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const touchStartRef = useRef<number | null>(null);
  const total = projects.length;

  // Inquiry modal state
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySending, setInquirySending] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  function openInquiry() {
    setInquirySent(false);
    setShowInquiry(true);
  }

  async function handleSendInquiry(e: React.FormEvent) {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim()) return;
    setInquirySending(true);
    const currentProject = projects[current];
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName.trim(),
          email: inquiryEmail.trim(),
          phone: inquiryPhone.trim(),
          service: catalog.title,
          description: `[Catalog Inquiry] Interested in: "${currentProject?.title}" from the "${catalog.title}" catalog.\n\n${inquiryMessage.trim() || "No additional message."}`,
          source: "catalog",
          budget: "",
        }),
      });
      setInquirySent(true);
      setTimeout(() => {
        setShowInquiry(false);
        setInquiryName("");
        setInquiryEmail("");
        setInquiryPhone("");
        setInquiryMessage("");
        setInquirySent(false);
      }, 2500);
    } catch {
      alert("Failed to send. Please try again.");
    } finally {
      setInquirySending(false);
    }
  }

  const goTo = useCallback(
    (idx: number) => {
      if (total <= 1) return;
      let next = idx;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      setCurrent(next);
      setAnimKey((k) => k + 1);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Touch/swipe
  function onTouchStart(e: React.TouchEvent) {
    touchStartRef.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartRef.current = null;
  }

  // No projects
  if (total === 0) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: BLACK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            fontFamily: "'Arial Black', sans-serif",
            fontWeight: 900,
            color: "#fff",
          }}
        >
          No projects in this catalog yet
        </p>
        <Link
          href="/catalogs"
          style={{
            fontSize: "14px",
            color: ORANGE,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          &larr; Back to Catalogs
        </Link>
      </div>
    );
  }

  const showNav = total > 1;
  const progress = ((current + 1) / total) * 100;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <style>{`
        @keyframes cvSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cvPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(247,148,29,0.4); }
          50% { box-shadow: 0 0 35px rgba(247,148,29,0.7); }
        }
        @media (max-width: 768px) {
          .cv-right-panel {
            width: 100% !important;
            right: 0 !important;
            left: 0 !important;
            top: auto !important;
            bottom: 0 !important;
            height: auto !important;
            max-height: 65vh !important;
            padding: 24px 20px 100px !important;
          }
          .cv-title {
            font-size: 28px !important;
          }
          .cv-specs-grid {
            grid-template-columns: 1fr !important;
          }
          .cv-kb-hint {
            display: none !important;
          }
          .cv-floating-cta {
            bottom: 80px !important;
            right: 16px !important;
          }
        }
      `}</style>

      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: BLACK,
          position: "relative",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── SLIDES ── */}
        {projects.map((project, i) => (
          <div
            key={project.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1)" : "scale(1.02)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {/* Background image */}
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${DARK2} 0%, ${BLACK} 100%)`,
                }}
              />
            )}

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, transparent 0%, rgba(12,12,12,0.7) 50%, rgba(12,12,12,0.95) 70%, #0C0C0C 100%)",
              }}
            />

            {/* Right panel */}
            <div
              className="cv-right-panel"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "45%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "80px 48px",
                boxSizing: "border-box",
                zIndex: 10,
              }}
            >
              {/* Slide counter */}
              <p
                key={`counter-${animKey}`}
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: ORANGE,
                  margin: "0 0 16px",
                  animation: i === current ? "cvSlideUp 0.5s ease forwards" : "none",
                  animationDelay: "0.1s",
                  opacity: i === current ? undefined : 0,
                }}
              >
                {pad(current + 1)} / {pad(total)}
              </p>

              {/* Title */}
              <h2
                key={`title-${animKey}`}
                className="cv-title"
                style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontWeight: 900,
                  fontSize: "48px",
                  lineHeight: 1.05,
                  color: "#fff",
                  margin: "0 0 20px",
                  animation: i === current ? "cvSlideUp 0.5s ease forwards" : "none",
                  animationDelay: "0.2s",
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                {project.title}
              </h2>

              {/* Orange divider */}
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  background: ORANGE,
                  boxShadow: `0 0 8px ${ORANGE}`,
                  marginBottom: "20px",
                }}
              />

              {/* Description */}
              {project.description && (
                <p
                  key={`desc-${animKey}`}
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.5)",
                    margin: "0 0 28px",
                    maxWidth: "440px",
                    animation: i === current ? "cvSlideUp 0.5s ease forwards" : "none",
                    animationDelay: "0.4s",
                    opacity: 0,
                    animationFillMode: "forwards",
                  }}
                >
                  {project.description}
                </p>
              )}

              {/* Specs grid */}
              {project.specs && project.specs.length > 0 && (
                <div
                  key={`specs-${animKey}`}
                  className="cv-specs-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px 24px",
                    marginBottom: "32px",
                    animation: i === current ? "cvSlideUp 0.5s ease forwards" : "none",
                    animationDelay: "0.6s",
                    opacity: 0,
                    animationFillMode: "forwards",
                  }}
                >
                  {project.specs.map((spec, si) => (
                    <div key={si}>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          letterSpacing: "3px",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.3)",
                          margin: "0 0 4px",
                        }}
                      >
                        {spec.label}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA buttons */}
              <div
                key={`cta-${animKey}`}
                style={{
                  animation: i === current ? "cvSlideUp 0.5s ease forwards" : "none",
                  animationDelay: "0.8s",
                  opacity: 0,
                  animationFillMode: "forwards",
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={openInquiry}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 28px",
                    background: ORANGE,
                    border: "none",
                    color: "#000",
                    fontFamily: "'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Send This Design
                </button>
                <Link
                  href={`/contact?service=${encodeURIComponent(catalog.title)}`}
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    background: "transparent",
                    border: `1px solid ${ORANGE}`,
                    color: ORANGE,
                    fontFamily: "'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderRadius: "4px",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = ORANGE;
                    e.currentTarget.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = ORANGE;
                  }}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* ── TOP BAR ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 32px",
          }}
        >
          {/* Logo */}
          <Link
            href="/catalogs"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                background: ORANGE,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Arial Black', sans-serif",
                fontWeight: 900,
                fontSize: "16px",
                color: "#000",
              }}
            >
              P
            </div>
            <span
              style={{
                fontFamily: "'Arial Black', sans-serif",
                fontWeight: 900,
                fontSize: "16px",
                color: "#fff",
                letterSpacing: "2px",
              }}
            >
              PRINTEC
            </span>
          </Link>

          {/* Catalog title */}
          <p
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: ORANGE,
              margin: 0,
            }}
          >
            {catalog.title}
          </p>
        </div>

        {/* ── BOTTOM NAVIGATION ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 30,
          }}
        >
          {/* Progress bar */}
          {showNav && (
            <div style={{ width: "100%", height: "2px", background: DARK2 }}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: ORANGE,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          )}

          {/* Nav controls */}
          {showNav && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 32px",
              }}
            >
              {/* Prev / Next */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={goPrev}
                  aria-label="Previous slide"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: `1px solid ${DARK2}`,
                    background: "transparent",
                    color: "#fff",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ORANGE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = DARK2;
                  }}
                >
                  &#8592;
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next slide"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: `1px solid ${DARK2}`,
                    background: "transparent",
                    color: "#fff",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ORANGE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = DARK2;
                  }}
                >
                  &#8594;
                </button>
              </div>

              {/* Dot indicators */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    style={{
                      width: i === current ? "12px" : "8px",
                      height: i === current ? "12px" : "8px",
                      borderRadius: "50%",
                      border: "none",
                      background: i === current ? ORANGE : "rgba(255,255,255,0.2)",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              {/* Keyboard hint */}
              <p
                className="cv-kb-hint"
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.25)",
                  margin: 0,
                  letterSpacing: "1px",
                }}
              >
                &#8592; &#8594; Navigate
              </p>
            </div>
          )}
        </div>

        {/* ── FLOATING CTA ── */}
        <Link
          href="/contact"
          className="cv-floating-cta"
          style={{
            position: "absolute",
            bottom: showNav ? "100px" : "32px",
            right: "32px",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: ORANGE,
            color: "#000",
            fontFamily: "'Arial Black', sans-serif",
            fontWeight: 900,
            fontSize: "11px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "4px",
            animation: "cvPulse 2s ease-in-out infinite",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Request Quote
        </Link>

        {/* ── INQUIRY MODAL ── */}
        {showInquiry && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowInquiry(false); }}
          >
            <div
              style={{
                background: "#161616",
                border: `1px solid ${DARK2}`,
                borderRadius: "4px",
                padding: "32px",
                width: "100%",
                maxWidth: "440px",
                margin: "16px",
                position: "relative",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowInquiry(false)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "32px",
                  height: "32px",
                  border: "none",
                  background: "transparent",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &times;
              </button>

              {inquirySent ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      color: "#22c55e",
                      fontSize: "24px",
                    }}
                  >
                    &#10003;
                  </div>
                  <p style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: "20px", color: "#fff", margin: "0 0 8px" }}>
                    Sent!
                  </p>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
                    Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: ORANGE, margin: "0 0 8px" }}>
                    CONNECT WITH OUR TEAM
                  </p>
                  <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: "20px", color: "#fff", margin: "0 0 4px" }}>
                    {projects[current]?.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 20px" }}>
                    from {catalog.title}
                  </p>

                  {/* Auto-filled category badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", padding: "10px 14px", background: "rgba(247,148,29,0.08)", border: "1px solid rgba(247,148,29,0.2)", borderRadius: "4px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: ORANGE, letterSpacing: "1px", textTransform: "uppercase" }}>
                      {catalog.title}
                    </span>
                  </div>

                  <form onSubmit={handleSendInquiry} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontWeight: 600, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "6px" }}>Name *</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        required
                        style={{ width: "100%", padding: "12px 14px", background: "#111", border: `1px solid ${DARK2}`, borderRadius: "4px", color: "#fff", fontFamily: "Arial, sans-serif", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = ORANGE; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = DARK2; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontWeight: 600, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "6px" }}>Email *</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "12px 14px", background: "#111", border: `1px solid ${DARK2}`, borderRadius: "4px", color: "#fff", fontFamily: "Arial, sans-serif", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = ORANGE; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = DARK2; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontWeight: 600, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "6px" }}>Phone</label>
                      <input
                        type="tel"
                        placeholder="(optional)"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        style={{ width: "100%", padding: "12px 14px", background: "#111", border: `1px solid ${DARK2}`, borderRadius: "4px", color: "#fff", fontFamily: "Arial, sans-serif", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = ORANGE; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = DARK2; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontWeight: 600, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "6px" }}>Message</label>
                      <textarea
                        placeholder="Tell us about your project (optional)"
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        rows={3}
                        style={{ width: "100%", padding: "12px 14px", background: "#111", border: `1px solid ${DARK2}`, borderRadius: "4px", color: "#fff", fontFamily: "Arial, sans-serif", fontSize: "14px", outline: "none", boxSizing: "border-box", resize: "vertical", transition: "border-color 0.2s" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = ORANGE; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = DARK2; }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={inquirySending}
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: ORANGE,
                        border: "none",
                        borderRadius: "4px",
                        color: "#000",
                        fontFamily: "'Arial Black', sans-serif",
                        fontWeight: 900,
                        fontSize: "13px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        cursor: inquirySending ? "wait" : "pointer",
                        opacity: inquirySending ? 0.6 : 1,
                        transition: "opacity 0.2s",
                      }}
                    >
                      {inquirySending ? "Sending..." : "Send to Our Team"}
                    </button>
                  </form>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", textAlign: "center", margin: "12px 0 0" }}>
                    We respond within 24 hours.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
