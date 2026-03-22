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
  title: "Custom Signs & Signage in Los Angeles | Printec Virginia LLC",
  description:
    "Printec Virginia LLC creates custom signs, vehicle wraps, channel letters, and business signage in Los Angeles, CA. Serving Hollywood, Downtown LA, Santa Monica, Beverly Hills, and all of LA County.",
  keywords: [
    "sign shop LA",
    "custom signs Los Angeles",
    "signage LA",
    "vehicle wraps Los Angeles",
    "channel letters LA",
    "business signs Los Angeles",
    "LED signs LA",
    "storefront signs Hollywood",
  ],
  openGraph: {
    title: "Custom Signs & Signage in Los Angeles | Printec Virginia LLC",
    description:
      "Printec Virginia LLC creates custom signs, vehicle wraps, channel letters, and business signage in Los Angeles, CA. Serving Hollywood, Downtown LA, Santa Monica, Beverly Hills, and all of LA County.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── DATA ─── */

const SERVICES = [
  {
    title: "Channel Letter Signs",
    desc: "Eye-catching illuminated channel letters designed to stand out under the LA sun and shine bright after dark.",
    icon: Lightbulb,
  },
  {
    title: "Vehicle Wraps",
    desc: "Full and partial vehicle wraps that turn LA traffic into prime advertising time for your brand.",
    icon: Car,
  },
  {
    title: "Storefront Signage",
    desc: "Custom exterior signs, monument signs, and blade signs crafted for the diverse architecture of Los Angeles.",
    icon: Store,
  },
  {
    title: "Digital Signage",
    desc: "Dynamic LED displays, digital menu boards, and video walls for restaurants, retail, and entertainment venues.",
    icon: Monitor,
  },
  {
    title: "Graphic Design",
    desc: "Full-service design from logos and brand identity to large-format print artwork, all created by our in-house team.",
    icon: PenTool,
  },
  {
    title: "Custom Apparel",
    desc: "Branded uniforms, promotional merchandise, and custom screen-printed apparel for LA businesses and events.",
    icon: Shirt,
  },
];

const BENEFITS = [
  {
    title: "LA-Tested Materials",
    desc: "We use UV-resistant, fade-proof vinyl and materials rated for California sun exposure, ensuring your signs look brilliant year-round.",
    icon: Shield,
  },
  {
    title: "Quick Delivery",
    desc: "Most projects completed in 2-4 weeks from design approval. Rush production available for film sets, pop-ups, and grand openings.",
    icon: Clock,
  },
  {
    title: "Trusted Since 2017",
    desc: "From Hollywood storefronts to Downtown LA offices, hundreds of businesses trust Printec for signage that delivers results.",
    icon: Award,
  },
  {
    title: "End-to-End Service",
    desc: "One team handles everything — design, permitting, fabrication, and installation. No subcontractors, no runaround, just results.",
    icon: Users,
  },
];

const AREAS = [
  "Hollywood",
  "Downtown LA",
  "Santa Monica",
  "Beverly Hills",
  "Venice",
  "Pasadena",
  "Burbank",
  "Glendale",
  "Long Beach",
  "Culver City",
  "West Hollywood",
  "Koreatown",
];

const FAQS = [
  {
    q: "How much do custom signs cost in Los Angeles?",
    a: "Pricing depends on sign type, dimensions, materials, and installation requirements. Basic storefront signage starts around $1,800, while illuminated channel letters typically range from $3,500 to $12,000+. Contact us for a free estimate specific to your LA location.",
  },
  {
    q: "Do you handle LA sign permits?",
    a: "Yes. We manage the full City of Los Angeles Department of Building and Safety (LADBS) sign permit process, including applications for specific plan areas, historic districts, and sign districts. We keep your project compliant and on track.",
  },
  {
    q: "What is the timeline for a sign project in Los Angeles?",
    a: "Typical projects take 3-5 weeks from consultation to completed installation. LA permitting can add time for certain districts, but we plan ahead to minimize delays. Rush options are available for urgent needs.",
  },
  {
    q: "Do you serve areas outside the City of Los Angeles?",
    a: "Yes. We serve all of LA County including Santa Monica, Beverly Hills, Pasadena, Burbank, Glendale, Long Beach, Culver City, and surrounding communities. We also service Orange County and the Inland Empire.",
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

export default function LosAngelesLocationPage() {
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
        <div style={label}>LOS ANGELES, CA</div>

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
          Custom Signs &amp; Signage in Los Angeles
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          From Hollywood storefronts to Downtown LA offices, Printec Virginia LLC
          delivers custom channel letters, vehicle wraps, and business signage
          across all of Los Angeles County.
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
              Services We Offer in Los Angeles
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
              Why Choose Printec in Los Angeles
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
              Areas We Serve in Greater Los Angeles
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
