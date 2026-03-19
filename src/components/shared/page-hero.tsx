"use client";

import { ORANGE, BLACK, WHITE } from "@/lib/constants";
import { Section } from "@/components/shared/section";

export function PageHero({
  title,
  subtitle,
  tag,
}: {
  title: string;
  subtitle?: string;
  tag?: string;
}) {
  return (
    <Section
      style={{
        background: BLACK,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "120px 24px 60px",
      }}
    >
      {/* Tag */}
      {tag && (
        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: ORANGE,
            fontWeight: 500,
            fontFamily: "Arial, sans-serif",
            marginBottom: "20px",
          }}
        >
          {tag}
        </p>
      )}

      {/* Title */}
      <h1
        style={{
          fontSize: "36px",
          fontFamily: "'Arial Black', 'Impact', sans-serif",
          fontWeight: 900,
          textTransform: "uppercase",
          color: WHITE,
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            marginTop: "20px",
            fontSize: "15px",
            lineHeight: 1.7,
            fontFamily: "Arial, sans-serif",
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            maxWidth: "520px",
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Thin orange line */}
      <div
        style={{
          width: "60px",
          height: "1px",
          background: ORANGE,
          marginTop: "28px",
        }}
      />
    </Section>
  );
}
