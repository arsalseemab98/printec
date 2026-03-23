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

              {/* CTA button */}
              <div
                key={`cta-${animKey}`}
                style={{
                  animation: i === current ? "cvSlideUp 0.5s ease forwards" : "none",
                  animationDelay: "0.8s",
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
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
                  Get a Quote Like This
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
      </div>
    </>
  );
}
