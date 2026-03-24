"use client";

import { AnimatePresence, motion } from "framer-motion";
import { KeyboardEvent, useState } from "react";
import { PORTFOLIO_IMAGES, PORTFOLIO_CATEGORIES, type PortfolioItem } from "@/lib/constants";
import { Instagram } from "lucide-react";

const ORANGE = "#F7941D";
const BLACK = "#0C0C0C";
const DARK1 = "#161616";
const DARK2 = "#222222";

export function GalleryGridBlock({ category }: { category?: string }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>(category || "All");

  // If a category is passed, only show that category (for service pages)
  const availableImages = category
    ? PORTFOLIO_IMAGES.filter((img) => img.category === category)
    : PORTFOLIO_IMAGES;

  const categories = category ? [] : PORTFOLIO_CATEGORIES;
  const filteredImages = filter === "All" ? availableImages : availableImages.filter((img) => img.category === filter);

  const handleNext = () => {
    if (selectedImage !== null) {
      const idx = availableImages.findIndex((img) => img.id === selectedImage);
      setSelectedImage(availableImages[(idx + 1) % availableImages.length].id);
    }
  };
  const handlePrev = () => {
    if (selectedImage !== null) {
      const idx = availableImages.findIndex((img) => img.id === selectedImage);
      setSelectedImage(availableImages[(idx - 1 + availableImages.length) % availableImages.length].id);
    }
  };

  const selectedImageData = availableImages.find((img) => img.id === selectedImage);

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, imageId: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedImage(imageId);
    }
  };

  return (
    <section style={{ background: BLACK, padding: "clamp(60px, 10vw, 100px) 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "48px" }}
        >
          <div
            style={{
              display: "inline-block",
              background: ORANGE,
              color: BLACK,
              padding: "4px 14px",
              fontWeight: 900,
              fontSize: "11px",
              letterSpacing: "3px",
              fontFamily: "'Arial Black', Impact, sans-serif",
              transform: "rotate(-2deg) skewX(-4deg)",
              marginBottom: "20px",
            }}
          >
            PORTFOLIO
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 900,
              lineHeight: 1,
              textTransform: "uppercase",
              margin: 0,
              fontFamily: "'Arial Black', Impact, sans-serif",
              color: "#fff",
            }}
          >
            RECENT{" "}
            <span style={{ color: ORANGE }}>
              WORK
            </span>
          </h2>
        </motion.div>

        {/* Filter Tabs (hidden when showing single category) */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "48px" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "10px 22px",
                  fontFamily: "'Arial Black', Impact, sans-serif",
                  fontWeight: 900,
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  border: `2px solid ${filter === cat ? ORANGE : DARK2}`,
                  background: filter === cat ? ORANGE : "transparent",
                  color: filter === cat ? BLACK : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  transform: "skewX(-4deg)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (filter !== cat) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== cat) {
                    e.currentTarget.style.borderColor = DARK2;
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }
                }}
              >
                <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>{cat}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Gallery Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="gallery-card"
                  onClick={() => setSelectedImage(image.id)}
                  onKeyDown={(event) => handleCardKeyDown(event, image.id)}
                  role="button"
                  tabIndex={0}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: DARK1,
                    border: `1px solid ${DARK2}`,
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt={image.title}
                      className="gallery-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s ease",
                      }}
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div
                      className="gallery-overlay"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(180deg, transparent 30%, ${BLACK}ee 100%)`,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-block",
                          background: ORANGE,
                          color: BLACK,
                          padding: "3px 10px",
                          fontWeight: 900,
                          fontSize: "9px",
                          letterSpacing: "2px",
                          fontFamily: "'Arial Black', Impact, sans-serif",
                          transform: "skewX(-4deg)",
                          marginBottom: "8px",
                          alignSelf: "flex-start",
                        }}
                      >
                        <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>
                          {image.category.toUpperCase()}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Arial Black', Impact, sans-serif",
                          fontWeight: 900,
                          fontSize: "16px",
                          letterSpacing: "2px",
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {image.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginTop: "10px",
                          color: ORANGE,
                          fontWeight: 900,
                          fontSize: "10px",
                          letterSpacing: "2px",
                          fontFamily: "'Arial Black', Impact, sans-serif",
                        }}
                      >
                        VIEW PROJECT
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h12M8 2l5 5-5 5" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ textAlign: "center", marginTop: "60px" }}
        >
          <a
            href="https://www.instagram.com/printecvirginia/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              background: "transparent",
              border: `2px solid ${ORANGE}`,
              borderRadius: "4px",
              color: ORANGE,
              fontSize: "13px",
              fontWeight: 900,
              fontFamily: "'Arial Black', Impact, sans-serif",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.color = BLACK; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ORANGE; }}
          >
            <Instagram size={18} />
            See More on Instagram
          </a>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.92)",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", maxHeight: "90vh", maxWidth: "900px" }}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: 0,
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "28px",
                  cursor: "pointer",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                ✕
              </button>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                style={{
                  position: "absolute",
                  left: "-50px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                ‹
              </button>

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                style={{
                  position: "absolute",
                  right: "-50px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                ›
              </button>

              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                key={selectedImage}
                src={selectedImageData.url}
                alt={selectedImageData.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ maxHeight: "70vh", width: "auto", maxWidth: "100%", display: "block" }}
              />

              {/* Info + Instagram CTA */}
              <div style={{ marginTop: "16px", textAlign: "center" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: ORANGE,
                    color: BLACK,
                    padding: "3px 12px",
                    fontWeight: 900,
                    fontSize: "9px",
                    letterSpacing: "2px",
                    fontFamily: "'Arial Black', Impact, sans-serif",
                    transform: "skewX(-4deg)",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>
                    {selectedImageData.category.toUpperCase()}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Arial Black', Impact, sans-serif",
                    fontWeight: 900,
                    fontSize: "18px",
                    letterSpacing: "2px",
                    color: "#fff",
                    margin: "4px 0 12px",
                  }}
                >
                  {selectedImageData.title}
                </h3>
                <a
                  href="https://www.instagram.com/printecvirginia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: ORANGE,
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textDecoration: "none",
                  }}
                >
                  <Instagram size={14} />
                  More photos on Instagram →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
