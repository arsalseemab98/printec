"use client";

import { useRef, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  width?: number;
  height?: number;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  width = 500,
  height = 400,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const beforeLabelRef = useRef<HTMLSpanElement>(null);
  const afterLabelRef = useRef<HTMLSpanElement>(null);
  const isDragging = useRef(false);
  const hasInteracted = useRef(false);
  const hasAutoPlayed = useRef(false);
  const animFrameRef = useRef<number>(0);

  const updateSlider = useCallback((pct: number) => {
    if (!beforeRef.current || !handleRef.current) return;
    beforeRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handleRef.current.style.left = `${pct}%`;
    if (beforeLabelRef.current) {
      beforeLabelRef.current.style.opacity = pct > 10 ? "1" : "0";
    }
    if (afterLabelRef.current) {
      afterLabelRef.current.style.opacity = pct < 90 ? "1" : "0";
    }
  }, []);

  const getPosition = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return 50;
      const rect = container.getBoundingClientRect();
      return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      isDragging.current = true;
      hasInteracted.current = true;
      // Cancel any running auto-animation
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      container.setPointerCapture(e.pointerId);
      updateSlider(getPosition(e.clientX));
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      updateSlider(getPosition(e.clientX));
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);
    };
  }, [getPosition, updateSlider]);

  // Auto-swipe animation when slider enters viewport (plays once)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAutoPlayed.current && !hasInteracted.current) {
          hasAutoPlayed.current = true;

          // Keyframes: center(50) → right(80) → left(20) → center(50)
          const keyframes = [
            { from: 50, to: 80 },   // reveal more "after"
            { from: 80, to: 20 },   // sweep to reveal "before"
            { from: 20, to: 50 },   // return to center
          ];
          const segmentDuration = 800; // ms per segment
          const pauseBetween = 400;    // ms pause between segments
          let segmentIndex = 0;

          function animateSegment() {
            if (hasInteracted.current || segmentIndex >= keyframes.length) return;

            const { from, to } = keyframes[segmentIndex];
            const startTime = performance.now();

            function tick(now: number) {
              if (hasInteracted.current) return;

              const elapsed = now - startTime;
              const progress = Math.min(elapsed / segmentDuration, 1);
              // Ease in-out cubic
              const eased = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

              const current = from + (to - from) * eased;
              updateSlider(current);

              if (progress < 1) {
                animFrameRef.current = requestAnimationFrame(tick);
              } else {
                // Pause then next segment
                segmentIndex++;
                if (segmentIndex < keyframes.length && !hasInteracted.current) {
                  setTimeout(() => {
                    if (!hasInteracted.current) {
                      animFrameRef.current = requestAnimationFrame(animateSegment);
                    }
                  }, pauseBetween);
                }
              }
            }

            animFrameRef.current = requestAnimationFrame(tick);
          }

          // Start after a short delay
          setTimeout(() => {
            if (!hasInteracted.current) {
              animateSegment();
            }
          }, 500);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateSlider]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        borderRadius: "8px",
        border: "1px solid #222",
        overflow: "hidden",
        position: "relative",
        cursor: "ew-resize",
        touchAction: "none",
        willChange: "auto",
      }}
    >
      {/* Corner accents */}
      <div style={{ position: "absolute", top: 12, left: 12, width: 24, height: 24, borderTop: "1px solid rgba(255,255,255,0.3)", borderLeft: "1px solid rgba(255,255,255,0.3)", zIndex: 3, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, borderTop: "1px solid rgba(247,148,29,0.3)", borderRight: "1px solid rgba(247,148,29,0.3)", zIndex: 3, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 12, left: 12, width: 24, height: 24, borderBottom: "1px solid rgba(255,255,255,0.3)", borderLeft: "1px solid rgba(255,255,255,0.3)", zIndex: 3, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 12, right: 12, width: 24, height: 24, borderBottom: "1px solid rgba(247,148,29,0.3)", borderRight: "1px solid rgba(247,148,29,0.3)", zIndex: 3, pointerEvents: "none" }} />

      {/* After image (full, bottom layer) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        width={width}
        height={height}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Before image (clipped, top layer) */}
      <div
        ref={beforeRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: "inset(0 50% 0 0)",
          willChange: "clip-path",
        }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          width={width}
          height={height}
          draggable={false}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Slider handle */}
      <div
        ref={handleRef}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          willChange: "left",
        }}
      >
        {/* Gradient vertical line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 15%, rgba(247,148,29,0.6) 50%, rgba(255,255,255,0.4) 85%, transparent 100%)",
          }}
        />

        {/* Grab handle circle with glow */}
        <div
          className="ba-slider-handle"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #F7941D 0%, #c67200 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(247,148,29,0.4), 0 0 40px rgba(247,148,29,0.15)",
            zIndex: 3,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ display: "block" }}
          >
            <path
              d="M7 6L3 10L7 14"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 6L17 10L13 14"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels — Elegant pill with glow */}
      <span
        ref={beforeLabelRef}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "10px",
          fontFamily: "Arial, sans-serif",
          fontWeight: 700,
          letterSpacing: "3px",
          color: "rgba(255,255,255,0.6)",
          background: "rgba(255,255,255,0.06)",
          padding: "7px 20px",
          borderRadius: "50px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 20px rgba(255,255,255,0.03)",
          zIndex: 4,
          textTransform: "uppercase",
          transition: "opacity 0.15s",
          pointerEvents: "none",
        }}
      >
        Before
      </span>
      <span
        ref={afterLabelRef}
        className="ba-after-label"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "10px",
          fontFamily: "Arial, sans-serif",
          fontWeight: 700,
          letterSpacing: "3px",
          color: "#F7941D",
          background: "rgba(247,148,29,0.15)",
          padding: "7px 20px",
          borderRadius: "50px",
          border: "1px solid rgba(247,148,29,0.3)",
          boxShadow: "0 0 20px rgba(247,148,29,0.15), 0 0 40px rgba(247,148,29,0.05)",
          zIndex: 4,
          textTransform: "uppercase",
          transition: "opacity 0.15s",
          pointerEvents: "none",
        }}
      >
        After
      </span>
    </div>
  );
}
