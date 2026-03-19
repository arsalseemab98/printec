"use client";

import { ORANGE, WHITE, DARK2 } from "@/lib/constants";

export function SkewedButton({
  children,
  href,
  onClick,
  filled = true,
  style = {},
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  filled?: boolean;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 40px",
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    fontWeight: 900,
    fontSize: "14px",
    letterSpacing: "3px",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    color: filled ? "#fff" : `${WHITE}bb`,
    background: filled ? ORANGE : "transparent",
    border: filled ? `2px solid ${ORANGE}` : `2px solid ${DARK2}`,
    cursor: "pointer",
    textShadow: filled ? `0 0 10px rgba(247,148,29,0.8), 0 0 20px rgba(247,148,29,0.4)` : "none",
    boxShadow: filled
      ? `0 0 15px rgba(247,148,29,0.5), 0 0 30px rgba(247,148,29,0.2), inset 0 0 15px rgba(255,255,255,0.1)`
      : "none",
    transition: "all 0.3s ease",
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (filled) {
      el.style.background = "#ffaa33";
      el.style.color = "#0C0C0C";
      el.style.textShadow = "none";
      el.style.boxShadow = `0 0 40px rgba(247,148,29,0.8), 0 0 80px rgba(247,148,29,0.4), 0 0 120px rgba(247,148,29,0.2)`;
      el.style.transform = "translateY(-3px)";
    } else {
      el.style.borderColor = ORANGE;
      el.style.color = ORANGE;
      el.style.boxShadow = `0 0 20px rgba(247,148,29,0.3)`;
      el.style.transform = "translateY(-2px)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (filled) {
      el.style.background = ORANGE;
      el.style.color = "#fff";
      el.style.textShadow = `0 0 10px rgba(247,148,29,0.8), 0 0 20px rgba(247,148,29,0.4)`;
      el.style.boxShadow = `0 0 15px rgba(247,148,29,0.5), 0 0 30px rgba(247,148,29,0.2), inset 0 0 15px rgba(255,255,255,0.1)`;
      el.style.transform = "none";
    } else {
      el.style.borderColor = DARK2;
      el.style.color = `${WHITE}bb`;
      el.style.boxShadow = "none";
      el.style.transform = "none";
    }
  };

  if (href) {
    return (
      <a
        href={href}
        style={base}
        className={filled ? "neon-pulse" : ""}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      style={base}
      className={filled ? "neon-pulse" : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
