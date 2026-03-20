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

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        borderRadius: "4px",
        border: "1px solid #222",
        overflow: "hidden",
        position: "relative",
        cursor: "ew-resize",
        touchAction: "none",
        willChange: "auto",
      }}
    >
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
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "#F7941D",
          }}
        />

        {/* Grab handle circle */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#F7941D",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
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
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 6L17 10L13 14"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span
        ref={beforeLabelRef}
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "2px",
          color: "#fff",
          background: "rgba(0,0,0,0.6)",
          padding: "4px 10px",
          borderRadius: "2px",
          zIndex: 1,
          textTransform: "uppercase",
          transition: "opacity 0.15s",
        }}
      >
        Before
      </span>
      <span
        ref={afterLabelRef}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "2px",
          color: "#F7941D",
          background: "rgba(0,0,0,0.6)",
          padding: "4px 10px",
          borderRadius: "2px",
          zIndex: 1,
          textTransform: "uppercase",
          transition: "opacity 0.15s",
        }}
      >
        After
      </span>
    </div>
  );
}
