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
  Maximize,
  Eye,
  Snowflake,
  Type,
  Clock,
  Shield,
  Lock,
  Palette,
  RefreshCw,
  DollarSign,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Window Wraps & Storefront Graphics | Business Window Decals",
  description:
    "Custom window wraps, storefront graphics, and business window decals that attract customers. Privacy films, full wraps, and perforated vinyl. Virginia's #1 choice.",
  keywords: [
    "window wraps",
    "storefront graphics",
    "business window decals",
    "perforated vinyl windows",
    "frosted window film",
    "window graphics Virginia",
  ],
  openGraph: {
    title: "Window Wraps & Storefront Graphics | Printec Corp",
    description:
      "Custom window wraps, storefront graphics, and business window decals that attract customers. Privacy films, full wraps, and perforated vinyl. Virginia's #1 choice.",
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

const WINDOW_TYPES = [
  {
    title: "Full Window Wraps",
    desc: "Complete coverage window wraps that transform your storefront glass into a massive, high-impact advertising canvas. Ideal for seasonal campaigns, grand openings, and businesses that want maximum visibility from the street.",
    icon: Maximize,
  },
  {
    title: "Perforated Vinyl",
    desc: "See-through window graphics that display vibrant, full-color imagery on the outside while maintaining clear visibility from the inside. The most popular choice for storefront window wraps because it delivers bold branding without blocking natural light.",
    icon: Eye,
  },
  {
    title: "Frosted Films",
    desc: "Elegant frosted and etched glass films that add privacy to conference rooms, medical offices, and storefronts without sacrificing natural light. Available with custom patterns, logos, and text cut into the frosted layer.",
    icon: Snowflake,
  },
  {
    title: "Cut Vinyl Lettering",
    desc: "Precision-cut individual letters, logos, and graphics applied directly to glass surfaces. Perfect for business hours, contact information, regulatory signage, and clean, minimalist branding in hundreds of colors and metallic finishes.",
    icon: Type,
  },
];

const BUSINESS_BENEFITS = [
  { title: "24/7 Advertising", desc: "Your storefront window works around the clock, reaching every pedestrian and driver that passes — even when the store is closed.", icon: Clock },
  { title: "UV Protection", desc: "Window wraps block up to 99% of harmful UV rays, protecting interior merchandise, furniture, and flooring from sun damage.", icon: Shield },
  { title: "Privacy Control", desc: "Choose your level of privacy without sacrificing style. From full blackout to semi-transparent films, we match the material to your needs.", icon: Lock },
  { title: "Brand Visibility", desc: "A well-designed storefront window graphic is the most cost-effective advertising investment a local business can make.", icon: Palette },
  { title: "Easy to Update", desc: "Swap out seasonal promotions, sales messaging, or product launches in hours. Vinyl window graphics are designed for clean removal.", icon: RefreshCw },
  { title: "Cost-Effective", desc: "Compared to traditional signage and paid advertising, window wraps deliver the lowest cost per impression of any local marketing medium.", icon: DollarSign },
];

const FAQ = [
  {
    q: "Can I still see out of my windows with a window wrap?",
    a: "Yes. Perforated vinyl allows nearly full visibility from inside the building while displaying vibrant full-color graphics on the exterior. The tiny perforations are invisible from outside but provide clear sight lines from within. We also offer clear window clings and cut vinyl lettering for complete transparency.",
  },
  {
    q: "How long do storefront window wraps last?",
    a: "Exterior window wraps typically last 3 to 5 years depending on sun exposure and weather conditions. Interior-applied window graphics last even longer since they are shielded from the elements. We use premium UV-resistant inks and laminates to maximize lifespan and color vibrancy.",
  },
  {
    q: "Will window wraps block natural light in my store?",
    a: "It depends on the material. Perforated vinyl allows approximately 50% of natural light through. Frosted films transmit most light while diffusing it softly. Full opaque wraps block light in covered areas but can be designed with clear cutouts to balance branding with brightness.",
  },
  {
    q: "Can window graphics be applied to any type of glass?",
    a: "Yes. Our window wraps adhere to standard plate glass, tempered glass, low-E glass, and most commercial glazing systems. For specialty coated glass, we perform an adhesion test beforehand to ensure a clean, lasting bond.",
  },
  {
    q: "How quickly can storefront window wraps be installed?",
    a: "Most storefront window wrap installations are completed in a single day. Larger projects spanning multiple storefronts or full building facades may require 2 to 3 days. We schedule installations during off-hours when possible to minimize disruption to your business operations.",
  },
];

/* ─── PAGE ─── */

export default function WindowWrapsPage() {
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
            Window Wraps
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
              Storefront Window Graphics That Attract Customers
            </h2>
            <div style={bodyStyle}>
              <p style={{ margin: "0 0 16px" }}>
                Your storefront windows are the first thing potential customers see
                when they walk or drive past your business. Custom window wraps
                turn that glass into high-impact, cost-effective advertising that
                works 24 hours a day, 7 days a week. At Printec Corp, we design
                and install storefront window graphics, business window decals,
                and privacy films for retail stores, restaurants, medical offices,
                and commercial buildings throughout Virginia.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                Whether you need full-coverage window wraps that transform your
                entire facade, perforated vinyl that advertises outside while
                preserving interior views, or elegant frosted privacy films
                for office glass, our team delivers stunning results with
                premium materials and expert installation.
              </p>
              <p style={{ margin: 0 }}>
                Every window wrap project begins with a free consultation where
                we assess your windows, discuss your goals, and recommend the
                ideal material and design approach. From design to installation,
                we handle every detail so you can focus on running your business.
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
            Types of Window Wraps
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {WINDOW_TYPES.map((item) => (
              <div key={item.title} style={card}>
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
                  }}
                >
                  {item.title} — 640x360
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

      {/* ── 4. BENEFITS FOR BUSINESS ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Advantages</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Benefits for Your Business
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "20px",
              marginTop: "48px",
            }}
          >
            {BUSINESS_BENEFITS.map((item) => (
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

      {/* ── 5. GALLERY ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Gallery</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Recent Window Wrap Projects
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
              "Storefront Full Wrap — 600x400",
              "Perforated Vinyl Install — 600x400",
              "Frosted Office Glass — 600x400",
              "Cut Vinyl Lettering — 600x400",
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

      {/* ── 6. FAQ ── */}
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

      {/* ── 7. CTA ── */}
      <CtaBanner />
    </main>
  );
}
