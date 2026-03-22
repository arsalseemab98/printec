import { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import {
  MapPin,
  Store,
  Car,
  Lightbulb,
  PenTool,
  Monitor,
  Shirt,
  Shield,
  Clock,
  Award,
  Users,
} from "lucide-react";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Custom Signs & Signage in New York | Printec Virginia LLC",
  description:
    "Printec Virginia LLC delivers custom signs, vehicle wraps, channel letters, and business signage across New York City. Serving Manhattan, Brooklyn, Queens, and the entire NYC metro.",
  keywords: [
    "sign shop NYC",
    "custom signs New York",
    "signage NYC",
    "vehicle wraps New York",
    "channel letters NYC",
    "business signs New York",
    "LED signs NYC",
    "storefront signs Manhattan",
  ],
  openGraph: {
    title: "Custom Signs & Signage in New York | Printec Virginia LLC",
    description:
      "Printec Virginia LLC delivers custom signs, vehicle wraps, channel letters, and business signage across New York City. Serving Manhattan, Brooklyn, Queens, and the entire NYC metro.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── DATA ─── */

const SERVICES = [
  {
    title: "Channel Letter Signs",
    desc: "Bold, illuminated channel letters built to compete with the bright lights of New York and grab attention on any block.",
    icon: Lightbulb,
  },
  {
    title: "Vehicle Wraps",
    desc: "High-impact full and partial wraps that turn your vehicles into mobile advertisements across all five boroughs.",
    icon: Car,
  },
  {
    title: "Storefront Signage",
    desc: "Custom awning signs, projecting blade signs, and facade lettering designed for NYC storefronts of every size.",
    icon: Store,
  },
  {
    title: "Digital Signage",
    desc: "LED displays, digital menu boards, and interactive kiosks for restaurants, retail, and corporate spaces in NYC.",
    icon: Monitor,
  },
  {
    title: "Graphic Design",
    desc: "From logo creation to full brand identity packages, our design team delivers print-ready and digital-ready artwork.",
    icon: PenTool,
  },
  {
    title: "Custom Apparel",
    desc: "Branded uniforms, event merchandise, and promotional gear printed and embroidered for New York businesses.",
    icon: Shirt,
  },
];

const BENEFITS = [
  {
    title: "Built for NYC",
    desc: "We understand the unique demands of New York signage — tight spaces, strict DOB regulations, co-op boards, and landmark district requirements.",
    icon: Shield,
  },
  {
    title: "Fast Turnaround",
    desc: "New York moves fast and so do we. Most signage projects are completed in 2-4 weeks, with rush options for grand openings and pop-ups.",
    icon: Clock,
  },
  {
    title: "Proven Excellence",
    desc: "Trusted by businesses since 2017, from SoHo boutiques to Midtown corporate offices. Our portfolio speaks for itself.",
    icon: Award,
  },
  {
    title: "Full-Service Team",
    desc: "One dedicated point of contact handles your project from concept through installation. Design, permits, fabrication, and mounting — all in-house.",
    icon: Users,
  },
];

const AREAS = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island",
  "Long Island City",
  "Williamsburg",
  "Soho",
  "Midtown",
  "Chelsea",
  "Harlem",
  "Jersey City",
];

const FAQS = [
  {
    q: "How much do custom signs cost in New York City?",
    a: "Sign pricing in NYC depends on type, size, materials, and installation complexity. Basic storefront signs start around $2,000, while illuminated channel letters range from $4,000 to $15,000+. We provide free, detailed quotes for every project.",
  },
  {
    q: "Do you handle NYC sign permits and DOB approvals?",
    a: "Yes. We navigate NYC Department of Buildings sign permits, landmark preservation approvals, and local zoning requirements on your behalf. Our team knows the process inside and out so your project stays on schedule.",
  },
  {
    q: "What is the typical timeline for sign projects in NYC?",
    a: "Most projects are completed within 3-6 weeks, accounting for NYC permitting timelines, fabrication, and professional installation. We offer expedited options when deadlines are tight.",
  },
  {
    q: "Do you serve areas outside Manhattan?",
    a: "Absolutely. We serve all five boroughs — Manhattan, Brooklyn, Queens, the Bronx, and Staten Island — plus Jersey City, Long Island, and the greater NYC metro area.",
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
  color: "rgba(255,255,255,0.5)",
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

export default function NewYorkLocationPage() {
  return (
    <main style={{ background: BLACK }}>

      {/* ── HERO ── */}
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
        <div style={label}>NEW YORK, NY</div>

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
          Custom Signs &amp; Signage in New York
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          Channel letters, storefront signs, vehicle wraps, and more —
          Printec Virginia LLC brings premium signage to businesses across all five
          boroughs and the greater NYC metro.
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

      {/* ── SERVICES WE OFFER ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>OUR SERVICES</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Services We Offer in New York
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "20px",
            }}
          >
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} style={card}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "4px",
                        background: `${ORANGE}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} color={ORANGE} />
                    </div>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        fontFamily: "Arial, sans-serif",
                        color: WHITE,
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}88`, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── WHY CHOOSE PRINTEC ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>WHY PRINTEC</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Why Choose Printec in New York
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "20px",
            }}
          >
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} style={card}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "4px",
                      background: `${ORANGE}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Icon size={22} color={ORANGE} />
                  </div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      fontFamily: "Arial, sans-serif",
                      color: WHITE,
                      margin: "0 0 10px",
                    }}
                  >
                    {b.title}
                  </h3>
                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}88`, margin: 0 }}>
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── AREAS WE SERVE ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ ...label, textAlign: "center" }}>SERVICE AREAS</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Areas We Serve in Greater New York
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
              gap: "12px",
            }}
          >
            {AREAS.map((area) => (
              <div
                key={area}
                style={{
                  background: "#111",
                  border: `1px solid ${DARK2}`,
                  borderRadius: "4px",
                  padding: "20px 16px",
                  textAlign: "center",
                  transition: "border-color 0.3s ease",
                }}
              >
                <MapPin
                  size={16}
                  color={`${WHITE}55`}
                  style={{ marginBottom: "8px" }}
                />
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "Arial, sans-serif",
                    color: WHITE,
                  }}
                >
                  {area}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
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

      {/* ── CTA ── */}
      <CtaBanner />
    </main>
  );
}
