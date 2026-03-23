"use client";

import { AnimatePresence, motion } from "framer-motion";
import { KeyboardEvent, useState } from "react";

const ORANGE = "#F7941D";
const TEAL = "#00897B";
const BLACK = "#0C0C0C";
const DARK1 = "#161616";
const DARK2 = "#222222";
const SPECTRUM = "linear-gradient(90deg, #FFD600, #F7941D, #E53935, #9B2D8E, #00897B, #8BC34A)";

const galleryImages = [
  { id: 1, url: "/images/portfolio/floor-as-monogram.webp", title: "A&S MONOGRAM WEDDING FLOOR", category: "Floor Wraps" },
  { id: 2, url: "/images/portfolio/floor-mandala-colorful.webp", title: "COLORFUL MANDALA MEHNDI FLOOR", category: "Floor Wraps" },
  { id: 3, url: "/images/portfolio/floor-mm-gold.webp", title: "M&M GOLD MONOGRAM FLOOR", category: "Floor Wraps" },
  { id: 4, url: "/images/portfolio/floor-hz-orange.webp", title: "H&Z ORANGE MONOGRAM FLOOR", category: "Floor Wraps" },
  { id: 5, url: "/images/portfolio/floor-anjana-aditya.webp", title: "ANJANA & ADITYA WEDDING FLOOR", category: "Floor Wraps" },
  { id: 6, url: "/images/portfolio/floor-rv-wreath.webp", title: "R&V GOLD WREATH FLOOR", category: "Floor Wraps" },
  { id: 7, url: "/images/portfolio/floor-pastel-mandala.webp", title: "PASTEL MANDALA FLOOR", category: "Floor Wraps" },
  { id: 8, url: "/images/portfolio/floor-red-pattern.webp", title: "TRADITIONAL RED PATTERN FLOOR", category: "Floor Wraps" },
  { id: 9, url: "/images/portfolio/floor-mehndi-colorful.webp", title: "VIBRANT MEHNDI FLOOR", category: "Floor Wraps" },
];

export function GalleryGridBlock() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...new Set(galleryImages.map((img) => img.category))];
  const filteredImages = filter === "All" ? galleryImages : galleryImages.filter((img) => img.category === filter);

  const handleNext = () => {
    if (selectedImage !== null) {
      const idx = galleryImages.findIndex((img) => img.id === selectedImage);
      setSelectedImage(galleryImages[(idx + 1) % galleryImages.length].id);
    }
  };
  const handlePrev = () => {
    if (selectedImage !== null) {
      const idx = galleryImages.findIndex((img) => img.id === selectedImage);
      setSelectedImage(galleryImages[(idx - 1 + galleryImages.length) % galleryImages.length].id);
    }
  };

  const selectedImageData = galleryImages.find((img) => img.id === selectedImage);

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

        {/* Filter Tabs — street style */}
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
                    />

                    {/* Hover overlay — shows on parent .gallery-card:hover */}
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
                      {/* Category tag */}
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
                  border: `1px solid rgba(255,255,255,0.15)`,
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
                  border: `1px solid rgba(255,255,255,0.15)`,
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
                style={{ maxHeight: "75vh", width: "auto", maxWidth: "100%", display: "block" }}
              />

              {/* Info */}
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
                    margin: "4px 0 0",
                  }}
                >
                  {selectedImageData.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
