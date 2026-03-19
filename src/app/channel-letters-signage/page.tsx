import { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
} from "@/lib/constants";
import {
  Sun,
  Moon,
  Blend,
  Lightbulb,
  Landmark,
  ArrowUpDown,
  Sword,
  Box,
  Zap,
  Timer,
  Wrench,
  Shield,
  DollarSign,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Channel Letters & Custom Signage | LED Signs in Virginia",
  description:
    "Custom channel letter signs and LED signage for businesses in Virginia. Front-lit, back-lit, and halo-lit options. Expert installation. Get a free consultation.",
  keywords: [
    "channel letters",
    "custom signage",
    "LED signs Virginia",
    "front-lit channel letters",
    "halo-lit signs",
    "business signage",
    "monument signs",
  ],
  openGraph: {
    title: "Channel Letters & Custom Signage | Printec Corp",
    description:
      "Custom channel letter signs and LED signage for businesses in Virginia. Front-lit, back-lit, and halo-lit options. Expert installation.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Corp",
  },
};

/* ─── STYLES ─── */

const sectionLabel: React.CSSProperties = {
  fontSize: "10px",
  fontFamily: "Arial, sans-serif",
  fontWeight: 500,
  letterSpacing: "4px",
  textTransform: "uppercase",
  color: ORANGE,
  marginBottom: "20px",
};

const h2Style: React.CSSProperties = {
  fontSize: "28px",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  lineHeight: 1.3,
  color: WHITE,
  margin: "0 0 20px",
};

const bodyStyle: React.CSSProperties = {
  fontSize: "15px",
  fontFamily: "Arial, sans-serif",
  lineHeight: 1.8,
  color: `rgba(255,255,255,0.5)`,
};

const thinSeparator: React.CSSProperties = {
  height: "1px",
  background: DARK1,
  border: "none",
  margin: 0,
};

const card: React.CSSProperties = {
  background: "#111",
  border: `1px solid ${DARK2}`,
  borderRadius: "4px",
  overflow: "hidden",
};

/* ─── DATA ─── */

const CHANNEL_TYPES = [
  {
    title: "Front-Lit Channel Letters",
    tag: "Most Popular",
    desc: "The industry standard for business signage. Front-lit channel letters feature LED modules inside an aluminum housing with a translucent acrylic face that illuminates forward, delivering maximum visibility day and night.",
    icon: Sun,
  },
  {
    title: "Back-Lit (Halo) Letters",
    tag: "Premium",
    desc: "Back-lit channel letters project a soft halo of light onto the wall behind each letter, creating an elegant, high-end aesthetic favored by upscale brands, hotels, medical offices, and financial institutions.",
    icon: Moon,
  },
  {
    title: "Combination Lit",
    tag: "Best of Both",
    desc: "Combination-lit channel letters feature both front and back illumination, delivering maximum impact with a glowing face and a halo effect simultaneously. Ideal for high-visibility locations demanding the most striking signage.",
    icon: Blend,
  },
  {
    title: "Open Face Letters",
    tag: "Classic",
    desc: "Open face channel letters expose the LED or neon light source directly with no acrylic face cover. This bold, vintage-inspired look is popular with restaurants, bars, and entertainment venues seeking an industrial or retro aesthetic.",
    icon: Lightbulb,
  },
];

const ADDITIONAL_SIGNAGE = [
  {
    title: "Monument Signs",
    desc: "Ground-level freestanding signs built with stone, brick, aluminum, and HDU foam. Monument signs establish a professional, permanent presence at building entrances and corporate campuses with optional LED illumination.",
    icon: Landmark,
  },
  {
    title: "Pylon Signs",
    desc: "Tall, freestanding pole signs designed for maximum visibility from highways and major roads. Essential for shopping centers, gas stations, hotels, and multi-tenant properties that need to be seen from a distance.",
    icon: ArrowUpDown,
  },
  {
    title: "Blade Signs",
    desc: "Projecting signs that mount perpendicular to the building facade to catch foot traffic on sidewalks. A staple of downtown retail districts and boutique businesses attracting walk-in customers.",
    icon: Sword,
  },
  {
    title: "Dimensional Letters",
    desc: "Non-illuminated three-dimensional letters and logos fabricated from acrylic, metal, PVC, or wood. Adds depth and professionalism to interior lobbies and exterior facades without electrical connections.",
    icon: Box,
  },
];

const LED_BENEFITS = [
  { title: "Energy Efficient", desc: "LED channel letters consume up to 75% less energy than traditional neon or fluorescent alternatives, reducing your monthly electric bill dramatically.", icon: Zap },
  { title: "Long Lifespan", desc: "Premium LED modules last 50,000 to 100,000 hours — over 10 years of reliable nighttime visibility before any maintenance is needed.", icon: Timer },
  { title: "Superior Brightness", desc: "Modern LEDs produce a brighter, more uniform glow than neon tubes with no flickering, dim spots, or dead sections from any viewing angle.", icon: Sun },
  { title: "Low Maintenance", desc: "No gas tubes to replace, no transformers to fail. LED channel letters require virtually zero maintenance after installation.", icon: Wrench },
  { title: "Weather Resistant", desc: "Solid-state electronics sealed inside aluminum housings, impervious to rain, snow, humidity, and Virginia temperature extremes.", icon: Shield },
  { title: "Fast ROI", desc: "Lower energy costs, near-zero maintenance, and increased customer visibility mean LED signs typically pay for themselves within the first year.", icon: DollarSign },
];

const FAQ = [
  {
    q: "How much do custom channel letter signs cost?",
    a: "Pricing varies based on letter count, size, illumination type, and installation complexity. A typical set of front-lit LED channel letters for a small business ranges from a few thousand dollars to over ten thousand for larger, multi-color installations. We provide detailed, no-obligation quotes after an on-site assessment.",
  },
  {
    q: "Do I need a permit for channel letter signage?",
    a: "Yes, most Virginia municipalities require a sign permit before installation. Requirements vary by jurisdiction and typically regulate sign size, height, illumination, and placement. Printec Corp handles the entire permitting process, including scaled drawings, electrical plans, and local building department documentation.",
  },
  {
    q: "How long does fabrication and installation take?",
    a: "From design approval to completed installation, most channel letter projects take 4 to 6 weeks. This includes custom fabrication of aluminum housings, acrylic faces, LED wiring, and powder-coated finishes. Installation typically takes one day. Rush fabrication is available for time-sensitive projects.",
  },
  {
    q: "Can you match my exact brand colors?",
    a: "Absolutely. We custom-match Pantone, RAL, and proprietary brand colors for both letter faces and housing trim caps. LED modules are available in multiple color temperatures, and we offer colored LEDs for accent lighting. Physical color samples are provided for approval before fabrication.",
  },
  {
    q: "How are channel letters mounted to the building?",
    a: "Channel letters can be individually mounted directly to the building facade using aluminum studs, or mounted to a raceway — a rectangular aluminum box that houses all wiring. Raceway mounting is faster to install and easier to relocate. We recommend the best method based on your building structure and local codes.",
  },
];

/* ─── PAGE ─── */

export default function ChannelLettersSignagePage() {
  return (
    <main style={{ background: BLACK }}>

      {/* ── 1. HERO ── */}
      <Section style={{ padding: 0 }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "1920 / 400",
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            borderBottom: `1px solid ${DARK1}`,
          }}
        >
          <span style={{ ...bodyStyle, color: `${WHITE}44`, fontSize: "13px" }}>
            Hero Image — 1920x400
          </span>
          <h1
            style={{
              fontSize: "36px",
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              color: WHITE,
              margin: 0,
              textAlign: "center",
            }}
          >
            Channel Letters &amp; Signage
          </h1>
        </div>
      </Section>

      {/* ── 2. INTRO 50/50 ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              aspectRatio: "4 / 3",
              background: "#0a0a0a",
              borderRadius: "4px",
              border: `1px solid ${DARK2}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...bodyStyle,
              color: `${WHITE}44`,
              fontSize: "13px",
            }}
          >
            Intro Image — 600x450
          </div>

          {/* Copy */}
          <div>
            <p style={sectionLabel}>Overview</p>
            <hr style={thinSeparator} />
            <h2 style={{ ...h2Style, marginTop: "20px" }}>
              The #1 Choice for Business Signage
            </h2>
            <div style={bodyStyle}>
              <p style={{ margin: "0 0 16px" }}>
                Channel letter signs are the most recognizable and effective form
                of commercial signage in the country. These individually
                fabricated, three-dimensional illuminated letters mount directly
                to your building facade or a raceway, giving your business a
                bold, professional presence that attracts customers day and night.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                At Printec Corp, we custom-fabricate LED channel letter signs for
                businesses across Virginia. Every sign is built from durable
                aluminum housings, precision-bent returns, high-output LED
                modules, and UV-stable acrylic faces. We handle design,
                engineering, city permitting, fabrication, and professional
                installation.
              </p>
              <p style={{ margin: 0 }}>
                Whether you are opening a new location, rebranding an existing
                storefront, or upgrading outdated neon signage to energy-efficient
                LED channel letters, our team delivers custom signage solutions
                that meet your brand standards, local building codes, and budget.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 3. TYPES ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Types</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Types of Channel Letters
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {CHANNEL_TYPES.map((item) => (
              <div key={item.title} style={{ ...card, position: "relative" }}>
                {/* Image area */}
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    background: "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...bodyStyle,
                    color: `${WHITE}33`,
                    fontSize: "12px",
                    position: "relative",
                  }}
                >
                  {item.title} — 640x360
                  {/* Tag */}
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: `${ORANGE}18`,
                      color: ORANGE,
                      padding: "4px 10px",
                      fontSize: "10px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 500,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      borderRadius: "2px",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <item.icon size={18} color={ORANGE} />
                    <h3
                      style={{
                        fontSize: "15px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: 700,
                        color: WHITE,
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p style={{ ...bodyStyle, fontSize: "14px", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 4. ADDITIONAL SIGNAGE ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>More Signage</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Additional Signage Services
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {ADDITIONAL_SIGNAGE.map((item) => (
              <div key={item.title} style={card}>
                <div style={{ padding: "28px 24px" }}>
                  <item.icon size={20} color={ORANGE} style={{ marginBottom: "14px" }} />
                  <h3
                    style={{
                      fontSize: "15px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 10px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ ...bodyStyle, fontSize: "14px", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 5. WHY LED ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>LED Advantage</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Why LED Channel Letters
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "20px",
              marginTop: "48px",
            }}
          >
            {LED_BENEFITS.map((item) => (
              <div
                key={item.title}
                style={{
                  ...card,
                  padding: "24px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "4px",
                    background: "#0a0a0a",
                    border: `1px solid ${DARK2}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={18} color={ORANGE} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 6px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ ...bodyStyle, fontSize: "14px", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 6. GALLERY ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Gallery</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Recent Signage Projects
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "20px",
              marginTop: "48px",
            }}
          >
            {[
              "Front-Lit Restaurant Sign — 600x400",
              "Halo-Lit Corporate Letters — 600x400",
              "Monument Sign Install — 600x400",
              "Blade Sign Downtown — 600x400",
            ].map((label) => (
              <div
                key={label}
                style={{
                  aspectRatio: "3 / 2",
                  background: "#0a0a0a",
                  borderRadius: "4px",
                  border: `1px solid ${DARK2}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...bodyStyle,
                  color: `${WHITE}33`,
                  fontSize: "12px",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 7. FAQ ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>FAQ</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Common Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0px", marginTop: "48px" }}>
            {FAQ.map((item) => (
              <div
                key={item.q}
                style={{
                  padding: "28px 0",
                  borderBottom: `1px solid ${DARK1}`,
                }}
              >
                <h3
                  style={{
                    fontSize: "15px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    color: WHITE,
                    margin: "0 0 12px",
                    lineHeight: 1.5,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <ChevronRight size={16} color={ORANGE} style={{ flexShrink: 0, marginTop: "3px" }} />
                  {item.q}
                </h3>
                <p
                  style={{
                    ...bodyStyle,
                    fontSize: "14px",
                    margin: 0,
                    paddingLeft: "28px",
                    color: `${WHITE}99`,
                  }}
                >
                  {item.a}
                </p>
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
