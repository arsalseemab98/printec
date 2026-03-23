"use client";

import { WHITE, ORANGE, BLACK } from "@/lib/constants";
import { SkewedButton } from "@/components/shared/skewed-button";
import { Section } from "@/components/shared/section";
import { Sparkles, Phone, ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <Section
      style={{
        background: BLACK,
        padding: 0,
      }}
    >
      {/* Top separator */}
      <div
        style={{
          height: "1px",
          background: "#161616",
        }}
      />

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "100px 24px",
          textAlign: "center",
        }}
      >
        {/* Label */}
        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: ORANGE,
            fontWeight: 500,
            fontFamily: "Arial, sans-serif",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Sparkles size={14} />
          Get Started
        </p>

        {/* Heading */}
        <h2
          style={{
            fontSize: "28px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            color: WHITE,
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          Ready to Make Your Mark?
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "15px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            marginBottom: "36px",
          }}
        >
          Get a free quote today and let us bring your vision to life.
        </p>

        {/* CTA button */}
        <SkewedButton href="/contact">
          GET A QUOTE <ArrowRight size={16} style={{ marginLeft: "6px" }} />
        </SkewedButton>

        {/* Phone number */}
        <p
          style={{
            marginTop: "24px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "rgba(255,255,255,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <Phone size={13} />
          (647) 299-1460
        </p>
      </div>
    </Section>
  );
}
