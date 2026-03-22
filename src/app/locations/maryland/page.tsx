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
  ShieldCheck,
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
  title: "Custom Signs & Signage in Maryland | Printec Corp",
  description:
    "Printec Corp delivers custom signs and signage in Maryland. Channel letters, vehicle wraps, business signage, and more. Serving Baltimore, Silver Spring, Bethesda, Rockville, Annapolis, and all of Maryland.",
  keywords: [
    "custom signs Maryland",
    "sign shop Maryland",
    "signage Maryland",
    "vehicle wraps Maryland",
    "channel letters Maryland",
    "sign company Baltimore",
    "business signs Bethesda",
  ],
  openGraph: {
    title: "Custom Signs & Signage in Maryland | Printec Corp",
    description:
      "Printec Corp delivers custom signs and signage in Maryland. Channel letters, vehicle wraps, business signage, and more. Serving Baltimore, Silver Spring, Bethesda, Rockville, Annapolis, and all of Maryland.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Corp",
  },
};

/* ─── DATA ─── */

const SERVICES = [
  {
    title: "Channel Letter Signs",
    desc: "Custom-fabricated illuminated channel letters for storefronts, shopping centers, and commercial buildings throughout Maryland.",
    icon: Lightbulb,
  },
  {
    title: "Business Signage",
    desc: "Monument signs, pylon signs, dimensional letters, and ADA-compliant wayfinding for Maryland offices, retail, and medical facilities.",
    icon: Store,
  },
  {
    title: "Vehicle Wraps",
    desc: "Full and partial vehicle wraps that transform your cars, vans, and trucks into moving advertisements on Maryland highways and city streets.",
    icon: Car,
  },
  {
    title: "Window Graphics",
    desc: "Eye-catching storefront window wraps, perforated vinyl, and privacy film for businesses from Baltimore to Bethesda and beyond.",
    icon: PenTool,
  },
  {
    title: "Digital Signage",
    desc: "LED displays, digital menu boards, and interactive screens for Maryland restaurants, corporate lobbies, and event venues.",
    icon: Monitor,
  },
  {
    title: "Custom Apparel",
    desc: "Branded uniforms, promotional shirts, and custom team apparel for Maryland businesses, nonprofits, and sports leagues.",
    icon: Shirt,
  },
];

const BENEFITS = [
  {
    title: "Maryland Market Knowledge",
    desc: "We understand Maryland's diverse business landscape — from Baltimore's Inner Harbor retail to Montgomery County's corporate corridors and Annapolis' historic waterfront districts.",
    icon: ShieldCheck,
  },
  {
    title: "Quick Delivery & Install",
    desc: "Located in the DC metro region, we reach every corner of Maryland fast. Most projects are completed in 3-5 weeks with no travel fees anywhere in the state.",
    icon: Clock,
  },
  {
    title: "Built to Last",
    desc: "Our signs are fabricated with commercial-grade aluminum, LEDs, and vinyl rated to withstand Maryland's humid summers, icy winters, and everything in between.",
    icon: Award,
  },
  {
    title: "End-to-End Service",
    desc: "Design, permitting, fabrication, and installation — all handled by our in-house team. One company, one point of contact, zero headaches.",
    icon: Users,
  },
];

const AREAS = [
  "Baltimore",
  "Silver Spring",
  "Bethesda",
  "Rockville",
  "Annapolis",
  "Columbia",
  "Frederick",
  "Gaithersburg",
  "Bowie",
  "College Park",
  "Towson",
  "Germantown",
];

const FAQS = [
  {
    q: "Do you provide sign installation services throughout Maryland?",
    a: "Yes. We install custom signage across the entire state of Maryland, from the Baltimore metro area and Montgomery County to the Eastern Shore and Western Maryland. No travel fees apply within the state.",
  },
  {
    q: "What types of signs are most popular for Maryland businesses?",
    a: "Channel letter signs, monument signs, and illuminated cabinet signs are the most requested for Maryland storefronts and commercial properties. Vehicle wraps and window graphics are also popular for businesses looking to maximize local visibility.",
  },
  {
    q: "Do you handle sign permits in Maryland counties?",
    a: "Absolutely. We manage the entire permitting process across all Maryland jurisdictions, including Montgomery County, Prince George's County, Baltimore County, Anne Arundel County, and Baltimore City. Each has different requirements and we know them all.",
  },
  {
    q: "How quickly can I get a custom sign in Maryland?",
    a: "Most sign projects are completed in 3-5 weeks from design approval. Permitting in Maryland typically takes 1-3 weeks depending on the county and sign type. We offer rush fabrication for time-sensitive projects like grand openings.",
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

export default function MarylandPage() {
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
        <div style={label}>MARYLAND</div>

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
          Custom Signs &amp; Signage in Maryland
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          Printec Corp brings premium custom signage to Maryland businesses —
          from channel letters and monument signs to vehicle wraps and digital
          displays, all fabricated and installed by our own team.
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
              Services We Offer in Maryland
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
                      gap: "10px",
                      marginBottom: "12px",
                    }}
                  >
                    <Icon size={18} color={ORANGE} />
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
                  <p
                    style={{
                      ...body,
                      fontSize: "14px",
                      color: `${WHITE}88`,
                      margin: 0,
                    }}
                  >
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
              Why Choose Printec in Maryland
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
                      background: DARK1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
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
                  <p
                    style={{
                      ...body,
                      fontSize: "14px",
                      color: `${WHITE}88`,
                      margin: 0,
                    }}
                  >
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
              Areas We Serve Across Maryland
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
                  <p
                    style={{
                      ...body,
                      fontSize: "14px",
                      color: `${WHITE}88`,
                      margin: 0,
                    }}
                  >
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
