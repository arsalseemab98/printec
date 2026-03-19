"use client";

import { useRef, useState, useEffect } from "react";

export function Section({
  children,
  id,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`section-reveal ${visible ? "section-visible" : ""} ${className}`}
      style={{ position: "relative", ...style }}
    >
      {children}
    </section>
  );
}
