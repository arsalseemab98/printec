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
  Wrench,
} from "lucide-react";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Custom Signs & Signage in Chicago | Printec Virginia LLC",
  description:
    "Professional custom signs and signage in Chicago. Printec Virginia LLC offers channel letters, vehicle wraps, window graphics, LED signs, and more for Chicago businesses. Free quotes.",
  keywords: [
    "sign shop Chicago",
    "custom signs Chicago",
    "signage Chicago",
    "vehicle wraps Chicago",
    "channel letters Chicago",
    "LED signs Chicago",
    "business signs Chicago",
    "storefront signs Chicago",
  ],
  openGraph: {
    title: "Custom Signs & Signage in Chicago | Printec Virginia LLC",
    description:
      "Professional custom signs and signage in Chicago. Channel letters, vehicle wraps, window graphics, LED signs, and more. Free quotes available.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* --- DATA --- */

const SERVICES = [
  {
    title: "Channel Letter Signs",
    desc: "Illuminated channel letters that make your Chicago storefront impossible to miss, day or night.",
    icon: Lightbulb,
  },
  {
    title: "Vehicle Wraps",
    desc: "Full and partial vehicle wraps that turn your fleet into mobile billboards across Chicagoland.",
    icon: Car,
  },
  {
    title: "Storefront Signage",
    desc: "Custom exterior signs, awnings, and blade signs designed for Chicago's diverse commercial corridors.",
    icon: Store,
  },
  {
    title: "Window Graphics",
    desc: "Eye-catching window wraps and frosted vinyl that attract foot traffic along Michigan Avenue and beyond.",
    icon: PenTool,
  },
  {
    title: "Digital Signage",
    desc: "Dynamic LED and digital menu boards that keep your messaging fresh in fast-paced Chicago markets.",
    icon: Monitor,
  },
  {
    title: "Custom Apparel",
    desc: "Branded uniforms, team gear, and promotional apparel for Chicago businesses and organizations.",
    icon: Shirt,
  },
];

const BENEFITS = [
  {
    title: "Premium Materials",
    desc: "We use only commercial-grade substrates and UV-resistant inks so your Chicago signage withstands harsh winters and hot summers without fading.",
    icon: Shield,
  },
  {
    title: "Fast Turnaround",
    desc: "Most projects completed in 3-5 weeks from design approval to installation. Rush options available for time-sensitive Chicago openings.",
    icon: Clock,
  },
  {
    title: "Expert Installation",
    desc: "Our certified installation crews know Chicago building codes and permitting requirements inside and out.",
    icon: Wrench,
  },
  {
    title: "Proven Track Record",
    desc: "Serving businesses since 2017 with hundreds of successful sign installations across major metro areas.",
    icon: Award,
  },
];

const AREAS = [
  "Loop",
  "River North",
  "Lincoln Park",
  "Wicker Park",
  "Logan Square",
  "West Loop",
  "Lakeview",
  "Old Town",
  "Bucktown",
  "Pilsen",
  "Hyde Park",
  "Evanston",
];

const FAQS = [
  {
    q: "How much do custom signs cost in Chicago?",
    a: "Pricing varies based on sign type, size, and materials. A basic set of channel letters starts around $2,000, while full vehicle wraps range from $2,500 to $5,000. We provide free, detailed quotes for every Chicago project — no hidden fees.",
  },
  {
    q: "Do you handle Chicago sign permits?",
    a: "Yes. Chicago has specific signage ordinances that vary by zoning district. Our team handles the entire permitting process with the City of Chicago Department of Buildings so you can focus on running your business.",
  },
  {
    q: "How long does sign installation take in Chicago?",
    a: "From initial consultation to completed installation, most projects take 3-5 weeks. This includes design, permitting, fabrication, and professional installation. We offer rush timelines for grand openings and urgent needs.",
  },
  {
    q: "What areas of Chicago do you serve?",
    a: "We serve all of Chicago and the greater Chicagoland area, including the Loop, River North, Lincoln Park, Wicker Park, Logan Square, West Loop, Lakeview, Evanston, and surrounding suburbs.",
  },
];

/* --- STYLE HELPERS --- */

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

/* --- PAGE --- */

export default function ChicagoLocationPage() {
  return (
    <main style={{ background: BLACK }}>

      {/* -- HERO -- */}
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
        <div style={label}>CHICAGO</div>

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
          Custom Signs &amp; Signage in Chicago
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          Professional signage solutions for Chicago businesses — from the Loop
          to Lincoln Park, we design, fabricate, and install signs that get
          noticed.
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

      {/* -- SERVICES WE OFFER -- */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>OUR SERVICES</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Services We Offer in Chicago
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
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

      {/* -- WHY CHOOSE PRINTEC -- */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>WHY PRINTEC</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Why Choose Printec in Chicago
            </h2>
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
                <div key={b.title} style={card}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "4px",
                      background: DARK1,
                      border: `1px solid ${DARK2}`,
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

      {/* -- AREAS WE SERVE -- */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ ...label, textAlign: "center" }}>SERVICE AREAS</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Areas We Serve in Chicago
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

      {/* -- FAQ -- */}
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

      {/* -- CTA -- */}
      <CtaBanner />
    </main>
  );
}
