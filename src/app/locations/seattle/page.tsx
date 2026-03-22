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
  ChevronRight,
} from "lucide-react";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Custom Signs & Signage in Seattle | Printec Corp",
  description:
    "Printec Corp provides custom signs, vehicle wraps, channel letters, and business signage in Seattle, WA. Serving Downtown, Capitol Hill, Ballard, Bellevue, and all of greater Seattle.",
  keywords: [
    "sign shop Seattle",
    "custom signs Seattle",
    "signage Seattle",
    "vehicle wraps Seattle",
    "channel letters Seattle",
    "business signs Seattle",
    "LED signs Seattle",
    "storefront signs Seattle",
  ],
  openGraph: {
    title: "Custom Signs & Signage in Seattle | Printec Corp",
    description:
      "Printec Corp provides custom signs, vehicle wraps, channel letters, and business signage in Seattle, WA. Serving Downtown, Capitol Hill, Ballard, Bellevue, and all of greater Seattle.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Corp",
  },
};

/* ─── DATA ─── */

const SERVICES = [
  {
    title: "Channel Letter Signs",
    desc: "Illuminated channel letters that make your Seattle storefront impossible to miss, day or night.",
    icon: Lightbulb,
  },
  {
    title: "Vehicle Wraps",
    desc: "Full and partial vehicle wraps that turn your fleet into moving billboards across the Seattle metro.",
    icon: Car,
  },
  {
    title: "Storefront Signage",
    desc: "Custom exterior signs, awnings, and blade signs designed to stand out on Seattle streets.",
    icon: Store,
  },
  {
    title: "Digital Signage",
    desc: "Dynamic LED displays and digital menu boards for restaurants, retail, and corporate lobbies.",
    icon: Monitor,
  },
  {
    title: "Graphic Design",
    desc: "Professional logo development, brand identity, and print-ready artwork from our in-house design team.",
    icon: PenTool,
  },
  {
    title: "Custom Apparel",
    desc: "Branded uniforms, team gear, and promotional apparel printed and embroidered locally.",
    icon: Shirt,
  },
];

const BENEFITS = [
  {
    title: "Premium Materials",
    desc: "We use only top-grade 3M and Avery vinyl, commercial-grade LEDs, and marine-grade hardware built to withstand Seattle rain and weather.",
    icon: Shield,
  },
  {
    title: "Fast Turnaround",
    desc: "Most signage projects completed in 2-4 weeks from design approval. Rush options available for time-sensitive Seattle openings.",
    icon: Clock,
  },
  {
    title: "Proven Track Record",
    desc: "Trusted by hundreds of businesses since 2017. From Pike Place shops to Bellevue office parks, our work speaks for itself.",
    icon: Award,
  },
  {
    title: "Dedicated Support",
    desc: "A single point of contact from first call to final installation. Our Seattle-area team is always a quick call away for service.",
    icon: Users,
  },
];

const AREAS = [
  "Downtown",
  "Capitol Hill",
  "Ballard",
  "Fremont",
  "Queen Anne",
  "South Lake Union",
  "Georgetown",
  "Bellevue",
  "Redmond",
  "Kirkland",
  "Tacoma",
  "Everett",
];

const FAQS = [
  {
    q: "How much do custom signs cost in Seattle?",
    a: "Pricing varies based on sign type, size, and materials. A basic storefront sign starts around $1,500, while illuminated channel letters typically range from $3,000 to $10,000+. Contact us for a free, no-obligation quote tailored to your Seattle location.",
  },
  {
    q: "Do you handle sign permits in Seattle?",
    a: "Yes. We are well-versed in Seattle Department of Construction and Inspections (SDCI) sign permit requirements. We handle the entire permitting process so you can focus on running your business.",
  },
  {
    q: "How long does sign installation take in the Seattle area?",
    a: "From initial consultation to completed installation, most projects take 3-5 weeks. This includes design, permitting, fabrication, and professional installation. Rush timelines are available for grand openings and urgent needs.",
  },
  {
    q: "Do you service businesses outside of Seattle proper?",
    a: "Absolutely. We serve the entire Puget Sound region including Bellevue, Redmond, Kirkland, Tacoma, Everett, and everywhere in between. No travel surcharges for the greater Seattle metro area.",
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

export default function SeattleLocationPage() {
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
        <div style={label}>SEATTLE, WA</div>

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
          Custom Signs &amp; Signage in Seattle
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          From channel letters and storefront signs to full vehicle wraps,
          Printec Corp delivers premium signage solutions to businesses across
          the greater Seattle area.
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
              Services We Offer in Seattle
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
              Why Choose Printec in Seattle
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
              Areas We Serve in Greater Seattle
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
