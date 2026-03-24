"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface PromoSlide {
  id: string;
  text: string;
  link: string;
  active: boolean;
  sort_order: number;
}

export function PromoBar() {
  const [slides, setSlides] = useState<PromoSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [dismissed, setDismissed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("promo-bar-dismissed") === "1") {
      setDismissed(true);
      return;
    }

    async function fetchSlides() {
      try {
        const res = await fetch("/api/promo-slides");
        const data = await res.json();
        setSlides(data.slides || []);
      } catch {
        // silently fail
      }
    }
    fetchSlides();
  }, []);

  const advanceSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setOpacity(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setOpacity(1);
    }, 500);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || hovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(advanceSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length, hovered, advanceSlide]);

  function goTo(direction: "prev" | "next") {
    setOpacity(0);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (direction === "next") return (prev + 1) % slides.length;
        return (prev - 1 + slides.length) % slides.length;
      });
      setOpacity(1);
    }, 500);
  }

  function handleDismiss() {
    setVisible(false);
    sessionStorage.setItem("promo-bar-dismissed", "1");
    setDismissed(true);
  }

  if (dismissed || !visible || slides.length === 0) return null;

  const slide = slides[currentIndex];

  const PROMO_HEIGHT = "38px";

  const textContent = (
    <span
      style={{
        opacity,
        transition: "opacity 0.5s ease",
        fontSize: "12px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        color: "#0C0C0C",
        fontFamily: "'Arial Black', 'Impact', sans-serif",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "calc(100% - 80px)",
        display: "inline-block",
      }}
    >
      {slide.text}
    </span>
  );

  return (
    <>
    {/* Spacer so page content isn't hidden behind fixed bar */}
    <div style={{ height: PROMO_HEIGHT }} />
    <div
      style={{
        width: "100%",
        height: PROMO_HEIGHT,
        background: "#F7941D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: "64px",
        left: 0,
        right: 0,
        zIndex: 999,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left arrow */}
      {slides.length > 1 && (
        <button
          onClick={() => goTo("prev")}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(0,0,0,0.35)",
            fontSize: "8px",
            padding: "4px",
            lineHeight: 1,
          }}
          aria-label="Previous slide"
        >
          &#9664;
        </button>
      )}

      {/* Slide text */}
      {slide.link ? (
        <a
          href={slide.link}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "calc(100% - 80px)",
          }}
        >
          {textContent}
        </a>
      ) : (
        textContent
      )}

      {/* Right arrow */}
      {slides.length > 1 && (
        <button
          onClick={() => goTo("next")}
          style={{
            position: "absolute",
            right: "36px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(0,0,0,0.35)",
            fontSize: "8px",
            padding: "4px",
            lineHeight: 1,
          }}
          aria-label="Next slide"
        >
          &#9654;
        </button>
      )}

      {/* Close button */}
      <button
        onClick={handleDismiss}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(0,0,0,0.5)",
          fontSize: "14px",
          padding: "4px",
          lineHeight: 1,
          fontWeight: 700,
        }}
        aria-label="Close promotions bar"
      >
        &#10005;
      </button>
    </div>
    </>
  );
}
