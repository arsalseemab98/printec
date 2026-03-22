import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SkewedButton } from "@/components/shared/skewed-button";
import {
  Zap,
  Timer,
  Sun,
  TrendingUp,
  Moon,
  Blend,
  CheckCircle,
  XCircle,
  MapPin,
  FileCheck,
  Wrench,
  Cable,
  HardHat,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "LED Channel Letters | Illuminated Business Signs in Virginia",
  description:
    "Premium LED channel letter signs that make your business shine 24/7. Energy-efficient, long-lasting, and custom-designed. Free estimates in Virginia.",
  keywords: [
    "LED channel letters",
    "illuminated signs",
    "business signs Virginia",
    "channel letter signs",
    "LED signage",
    "front-lit LED signs",
    "halo-lit channel letters",
  ],
  openGraph: {
    title: "LED Channel Letters | Printec Virginia LLC",
    description:
      "Premium LED channel letter signs that make your business shine 24/7. Energy-efficient, long-lasting, and custom-designed. Free estimates in Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── DATA ─── */

const BENEFITS = [
  { stat: "80%", label: "LESS ENERGY", desc: "LED channel letters consume up to 80% less electricity than traditional neon or fluorescent signage, slashing your monthly utility costs.", icon: Zap },
  { stat: "50,000+", label: "HOUR LIFESPAN", desc: "LED modules last over 50,000 hours — nearly six years of continuous 24/7 operation before a single module needs replacement.", icon: Timer },
  { stat: "5X", label: "BRIGHTER OUTPUT", desc: "Modern LED channel letter signs produce five times the brightness of conventional neon, ensuring maximum visibility day and night.", icon: Sun },
  { stat: "2 YR", label: "ROI PAYBACK", desc: "Most businesses recoup their LED channel letter investment within two years through energy savings and increased foot traffic alone.", icon: TrendingUp },
];

const TYPES = [
  {
    title: "Front-Lit LED",
    desc: "The most popular style of LED channel letters. Illuminated translucent acrylic faces with aluminum returns create bold, high-visibility signage that pops against any building facade. Front-lit channel letters are the go-to choice for retail stores, restaurants, and shopping centers.",
    best: "Retail storefronts, restaurants, and high-traffic commercial locations",
    price: "From $75 per letter",
    icon: Sun,
    img: "Front-Lit Channel Letters",
  },
  {
    title: "Back-Lit (Halo) LED",
    desc: "A sophisticated halo-lit effect where LED modules face the wall, casting a soft glow behind each letter. Back-lit channel letters create an upscale, modern look favored by professional offices, hotels, and luxury brands. The halo effect adds depth and elegance.",
    best: "Professional offices, hotels, medical practices, and upscale brands",
    price: "From $95 per letter",
    icon: Moon,
    img: "Back-Lit Halo Letters",
  },
  {
    title: "Combination LED",
    desc: "The best of both worlds — front-lit faces paired with halo-lit backs. Combination LED channel letters deliver maximum impact with dual illumination that makes your business name virtually impossible to miss, day or night.",
    best: "High-visibility locations, corner buildings, and businesses open at night",
    price: "From $120 per letter",
    icon: Blend,
    img: "Combination LED Letters",
  },
];

const COMPARISON = [
  { feature: "Energy Use", led: "Low (80% savings)", neon: "High", fluorescent: "Medium" },
  { feature: "Lifespan", led: "50,000+ hours", neon: "10,000 hours", fluorescent: "15,000 hours" },
  { feature: "Brightness", led: "Very High", neon: "Medium", fluorescent: "Medium" },
  { feature: "Maintenance", led: "Minimal", neon: "Frequent (gas refills)", fluorescent: "Regular (tube swaps)" },
  { feature: "Weather Resistance", led: "Excellent", neon: "Fragile", fluorescent: "Good" },
  { feature: "Color Options", led: "Unlimited (RGB)", neon: "Limited by gas", fluorescent: "White only" },
  { feature: "Initial Cost", led: "Medium-High", neon: "High", fluorescent: "Low" },
  { feature: "Total Cost (5yr)", led: "Lowest", neon: "Highest", fluorescent: "Medium" },
];

const INSTALL_STEPS = [
  { num: "01", title: "Site Survey", desc: "We measure your building, assess structural mounting points, and photograph the facade for accurate design mockups.", icon: MapPin },
  { num: "02", title: "Permits", desc: "We handle all Virginia sign permits, HOA approvals, and landlord coordination — saving you weeks of paperwork.", icon: FileCheck },
  { num: "03", title: "Fabrication", desc: "Each LED channel letter is custom-built in our Virginia facility: aluminum returns, LED modules, wiring, and acrylic faces.", icon: Wrench },
  { num: "04", title: "Wiring", desc: "Licensed electricians run all power connections to code. We coordinate with your building management for clean, concealed wiring.", icon: Cable },
  { num: "05", title: "Installation", desc: "Our certified installers mount every channel letter with precision, ensuring perfect alignment, spacing, and structural security.", icon: HardHat },
  { num: "06", title: "Testing", desc: "We test every LED module, check brightness uniformity, and verify night-time visibility before signing off on your project.", icon: ClipboardCheck },
];

const GALLERY_ITEMS = [
  "Restaurant Channel Letters — Virginia Beach",
  "Medical Office Halo Letters — Richmond",
  "Retail Storefront Sign — Norfolk",
  "Corporate Office Letters — Arlington",
];

const FAQS = [
  {
    q: "How much do LED channel letters cost?",
    a: "LED channel letter pricing depends on letter size, style (front-lit, back-lit, or combination), and quantity. Most business signs range from $2,000 to $8,000 for a complete set. Contact us for a free custom quote based on your specific requirements.",
  },
  {
    q: "How long do LED channel letters last?",
    a: "LED channel letters are rated for 50,000+ hours of continuous operation — roughly 5-6 years running 24/7. With typical business hours usage, you can expect 10-15 years of reliable performance before any LED modules need replacing.",
  },
  {
    q: "Do I need a permit for LED channel letter signs in Virginia?",
    a: "Yes, most Virginia municipalities require a sign permit for illuminated channel letters. Printec Virginia LLC handles the entire permitting process as part of our service, including zoning compliance, electrical permits, and HOA submissions.",
  },
  {
    q: "Can LED channel letters be installed on any building?",
    a: "LED channel letters can be installed on virtually any building surface — brick, stucco, EIFS, metal panels, concrete, and wood. During our free site survey, we assess your building and recommend the best mounting approach.",
  },
  {
    q: "How long does installation take?",
    a: "From approved design to completed installation, most LED channel letter projects take 3-4 weeks. Fabrication takes 2-3 weeks, and on-site installation is typically completed in a single day.",
  },
];

/* ─── STYLE HELPERS ─── */

const label: React.CSSProperties = {
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "4px",
  color: ORANGE,
  fontWeight: 500,
  fontFamily: "Arial, sans-serif",
  marginBottom: "16px",
};

const h2Style: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  fontFamily: "Arial, sans-serif",
  lineHeight: 1.2,
  color: WHITE,
  margin: "0 0 20px",
};

const body: React.CSSProperties = {
  fontSize: "15px",
  fontFamily: "Arial, sans-serif",
  lineHeight: 1.8,
  color: `rgba(255,255,255,0.5)`,
};

const separator: React.CSSProperties = {
  height: "1px",
  background: DARK1,
  border: "none",
  margin: "0",
};

const card: React.CSSProperties = {
  background: "#111",
  border: `1px solid ${DARK2}`,
  borderRadius: "4px",
  padding: "32px 28px",
  transition: "border-color 0.3s ease",
};

/* ─── PAGE ─── */

export default function LedChannelLettersPage() {
  return (
    <main style={{ background: BLACK }}>

      {/* ── 1. HERO ── */}
      <Section
        style={{
          background: `linear-gradient(to bottom, ${BLACK}, ${DARK1})`,
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "160px 24px 100px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "16/7",
            background: `linear-gradient(135deg, #111, ${DARK1})`,
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: `${WHITE}33`,
            fontFamily: "Arial, sans-serif",
            marginBottom: "48px",
          }}
        >
          LED Channel Letters Hero Image
        </div>

        <div style={label}>SIGNAGE</div>

        <h1
          style={{
            fontSize: "36px",
            fontFamily: "'Arial Black', sans-serif",
            fontWeight: 900,
            lineHeight: 1.1,
            color: WHITE,
            margin: "0 0 16px",
          }}
        >
          LED Channel Letters
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          Custom-fabricated illuminated signage that makes your business
          impossible to miss — day and night.
        </p>

        <div
          style={{
            width: "1px",
            height: "48px",
            background: DARK2,
            margin: "40px auto 0",
          }}
        />
      </Section>

      {/* ── 2. BENEFITS WITH STATS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>WHY LED</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              The Smart Choice for Business Signage
            </h2>
            <p style={{ ...body, color: `${WHITE}88`, maxWidth: "600px", margin: "0 auto" }}>
              LED channel letters combine stunning visual impact with unmatched
              efficiency and durability — the most cost-effective signage investment
              you can make.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "20px",
            }}
          >
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.label} style={{ ...card, textAlign: "center" }}>
                  <Icon size={24} color={ORANGE} style={{ marginBottom: "16px" }} />
                  <div
                    style={{
                      fontSize: "32px",
                      fontFamily: "'Arial Black', sans-serif",
                      fontWeight: 900,
                      color: ORANGE,
                      lineHeight: 1,
                    }}
                  >
                    {b.stat}
                  </div>
                  <div style={{ ...label, marginTop: "8px", marginBottom: "14px" }}>
                    {b.label}
                  </div>
                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}77`, margin: 0 }}>
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 3. TYPES — 3 CARDS WITH IMAGES ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>TYPES</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              LED Channel Letter Styles
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "20px",
            }}
          >
            {TYPES.map((t) => {
              const TypeIcon = t.icon;
              return (
                <div key={t.title} style={card}>
                  <div
                    style={{
                      aspectRatio: "16/10",
                      background: `linear-gradient(135deg, #111, ${DARK1})`,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: `${WHITE}44`,
                      fontFamily: "Arial, sans-serif",
                      marginBottom: "24px",
                    }}
                  >
                    {t.img}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <TypeIcon size={18} color={ORANGE} />
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        fontFamily: "Arial, sans-serif",
                        color: WHITE,
                        margin: 0,
                      }}
                    >
                      {t.title}
                    </h3>
                  </div>

                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}88`, margin: "0 0 20px" }}>
                    {t.desc}
                  </p>

                  <div style={{ ...label, marginBottom: "4px", fontSize: "9px" }}>BEST FOR</div>
                  <p style={{ fontSize: "13px", fontFamily: "Arial, sans-serif", color: `${WHITE}66`, margin: "0 0 16px" }}>
                    {t.best}
                  </p>

                  <div
                    style={{
                      fontSize: "18px",
                      fontFamily: "'Arial Black', sans-serif",
                      fontWeight: 900,
                      color: ORANGE,
                    }}
                  >
                    {t.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 4. LED VS NEON VS FLUORESCENT COMPARISON ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ ...label, textAlign: "center" }}>COMPARE</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              LED vs Neon vs Fluorescent
            </h2>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  {["Feature", "LED", "Neon", "Fluorescent"].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "4px",
                        textTransform: "uppercase",
                        color: i === 1 ? ORANGE : `${WHITE}88`,
                        borderBottom: `1px solid ${DARK1}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: WHITE,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK1}`,
                      }}
                    >
                      {row.feature}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: ORANGE,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK1}`,
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <CheckCircle size={14} color={ORANGE} />
                        {row.led}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: `${WHITE}66`,
                        borderBottom: `1px solid ${DARK1}`,
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <XCircle size={14} color={`${WHITE}33`} />
                        {row.neon}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: `${WHITE}66`,
                        borderBottom: `1px solid ${DARK1}`,
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <XCircle size={14} color={`${WHITE}33`} />
                        {row.fluorescent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── 5. INSTALLATION PROCESS — 6 STEPS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>INSTALLATION</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Our Installation Process
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "20px",
            }}
          >
            {INSTALL_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} style={card}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <div
                      style={{
                        fontSize: "24px",
                        fontFamily: "'Arial Black', sans-serif",
                        fontWeight: 900,
                        color: `${ORANGE}44`,
                        lineHeight: 1,
                      }}
                    >
                      {step.num}
                    </div>
                    <Icon size={18} color={ORANGE} />
                  </div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      fontFamily: "Arial, sans-serif",
                      color: WHITE,
                      margin: "0 0 8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}77`, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 6. GALLERY — 4 IMAGES ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ ...label, textAlign: "center" }}>GALLERY</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Recent LED Channel Letter Projects
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "16px",
            }}
          >
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item}
                style={{
                  aspectRatio: "4/3",
                  background: `linear-gradient(135deg, #111, ${DARK1})`,
                  borderRadius: "4px",
                  border: `1px solid ${DARK2}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: `${WHITE}44`,
                  fontFamily: "Arial, sans-serif",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 7. FAQ — 5 QUESTIONS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>FAQ</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FAQS.map((faq, i) => (
              <div key={faq.q}>
                <div style={{ padding: "28px 0" }}>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      fontFamily: "Arial, sans-serif",
                      color: WHITE,
                      margin: "0 0 10px",
                    }}
                  >
                    {faq.q}
                  </h3>
                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}88`, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
                {i < FAQS.length - 1 && <hr style={separator} />}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 8. CTA ── */}
      <CtaBanner />
    </main>
  );
}
