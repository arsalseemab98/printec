import { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { ContactForm } from "@/components/shared/contact-form";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
} from "@/lib/constants";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Quote",
  description:
    "Get a free quote for custom signs, vehicle wraps, channel letters, window graphics and more. Contact Printec Virginia LLC in Virginia. Call (555) 123-4567.",
  keywords: [
    "contact Printec Virginia LLC",
    "free sign quote Virginia",
    "custom signage estimate",
    "vehicle wrap quote",
    "sign company contact",
    "Virginia sign maker",
  ],
  openGraph: {
    title: "Contact Us | Get a Free Quote | Printec Virginia LLC",
    description:
      "Get a free quote for custom signs, vehicle wraps, channel letters, window graphics and more. Contact Printec Virginia LLC in Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── STYLES ─── */

const LABEL: React.CSSProperties = {
  fontSize: "10px",
  fontFamily: "Arial, sans-serif",
  fontWeight: 500,
  letterSpacing: "4px",
  textTransform: "uppercase",
  color: ORANGE,
};

const H1: React.CSSProperties = {
  fontSize: "36px",
  fontFamily: "'Arial Black', sans-serif",
  fontWeight: 900,
  lineHeight: 1.1,
  color: WHITE,
  margin: 0,
};

const BODY: React.CSSProperties = {
  fontSize: "15px",
  fontFamily: "Arial, sans-serif",
  lineHeight: 1.8,
  color: `rgba(255,255,255,0.5)`,
};

const SEPARATOR: React.CSSProperties = {
  height: "1px",
  background: DARK1,
  border: "none",
  margin: 0,
};

/* ─── PAGE ─── */

export default function ContactPage() {
  return (
    <main style={{ background: BLACK }}>
      {/* ── 1. HERO ── */}
      <Section
        style={{
          background: BLACK,
          padding: "100px 24px 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p style={{ ...LABEL, margin: "0 0 12px" }}>Contact</p>
          <h1 style={H1}>Get In Touch</h1>
          <p
            style={{
              ...BODY,
              maxWidth: "520px",
              margin: "16px auto 0",
            }}
          >
            Have a project in mind — a wedding, an event, or a business? Drop us a line
            and we&apos;ll get back to you within 24 hours with a free, no-obligation quote.
          </p>
        </div>
      </Section>

      <hr style={{ ...SEPARATOR, maxWidth: "1200px", margin: "0 auto" }} />

      {/* ── 2. CONTACT FORM ── */}
      <ContactForm />

      <hr style={{ ...SEPARATOR, maxWidth: "1200px", margin: "0 auto" }} />

      {/* ── 3. MAP PLACEHOLDER ── */}
      <Section
        style={{
          background: BLACK,
          padding: "100px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "21 / 9",
              background: DARK1,
              border: `1px solid ${DARK2}`,
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <MapPin size={28} color={`${WHITE}44`} />
            <span style={{ ...BODY, color: `${WHITE}44`, fontSize: "13px" }}>
              Map Placeholder — 2100 x 900
            </span>
            <span
              style={{
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                color: `${WHITE}66`,
              }}
            >
              1234 Commerce Drive, Virginia Beach, VA 23456
            </span>
          </div>
        </div>
      </Section>
    </main>
  );
}
