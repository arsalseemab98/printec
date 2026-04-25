import { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/shared/json-ld";
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
  title: "Sign Shop & Custom Signage in Washington DC | Printec Virginia LLC",
  description:
    "Trusted sign shop in Washington DC. Custom channel letters, business signage & more. Serving Capitol Hill, Georgetown & all of DC.",
  keywords: [
    "sign shop Washington DC",
    "custom signs DC",
    "signage Washington DC",
    "signs near me DC",
    "channel letters Washington DC",
    "vehicle wraps DC",
    "business signs DC",
  ],
  openGraph: {
    title: "Sign Shop & Custom Signage in Washington DC | Printec Virginia LLC",
    description:
      "Trusted sign shop in Washington DC. Custom channel letters, business signage & more. Serving Capitol Hill, Georgetown & all of DC.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── DATA ─── */

const SERVICES = [
  {
    title: "Channel Letter Signs",
    desc: "Illuminated channel letters that make your DC storefront stand out day and night on busy corridors like H Street and U Street.",
    icon: Lightbulb,
  },
  {
    title: "Business Signage",
    desc: "Monument signs, blade signs, and ADA-compliant wayfinding for offices, restaurants, and retail spaces across the District.",
    icon: Store,
  },
  {
    title: "Vehicle Wraps",
    desc: "Full and partial vehicle wraps that turn your fleet into mobile billboards navigating DC traffic every day.",
    icon: Car,
  },
  {
    title: "Window Graphics",
    desc: "Storefront window wraps and frosted vinyl that boost curb appeal in high-foot-traffic neighborhoods like Georgetown and Penn Quarter.",
    icon: PenTool,
  },
  {
    title: "Digital Signage",
    desc: "Dynamic LED displays and digital menu boards for restaurants, lobbies, and event venues throughout Washington DC.",
    icon: Monitor,
  },
  {
    title: "Custom Apparel",
    desc: "Branded uniforms, event shirts, and promotional apparel for DC businesses, organizations, and sports teams.",
    icon: Shirt,
  },
];

const BENEFITS = [
  {
    title: "DC Permit Expertise",
    desc: "We navigate the District's unique sign permitting process — including historic district regulations and DCRA requirements — so your project stays on track.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Turnaround",
    desc: "Located just minutes from DC, we deliver and install faster than national franchises. Most projects completed in 3-5 weeks from approval.",
    icon: Clock,
  },
  {
    title: "Premium Quality",
    desc: "Every sign is custom-fabricated in our facility using commercial-grade materials built to withstand DC's four-season climate.",
    icon: Award,
  },
  {
    title: "Dedicated Project Manager",
    desc: "You get a single point of contact who knows your project inside and out — from design through permitting to final installation.",
    icon: Users,
  },
];

const AREAS = [
  "Capitol Hill",
  "Georgetown",
  "Dupont Circle",
  "Adams Morgan",
  "U Street",
  "Navy Yard",
  "NoMa",
  "H Street",
  "Foggy Bottom",
  "Penn Quarter",
];

const FAQS = [
  {
    q: "Do you handle sign permits in Washington DC?",
    a: "Yes. We manage the entire DC sign permit process, including applications through the Department of Consumer and Regulatory Affairs (DCRA), historic preservation reviews, and public space permits. Our team knows DC regulations inside and out.",
  },
  {
    q: "How long does a custom sign project take in DC?",
    a: "Most projects take 3-5 weeks from design approval to completed installation. DC permitting can add 1-2 weeks depending on the neighborhood and sign type. We provide a detailed timeline during your free consultation.",
  },
  {
    q: "Do you install signs in historic districts like Georgetown?",
    a: "Absolutely. We have extensive experience working within DC's historic districts. We design signage that meets the Historic Preservation Review Board's guidelines while still making your business stand out.",
  },
  {
    q: "What areas of Washington DC do you serve?",
    a: "We serve every neighborhood in the District, including Capitol Hill, Georgetown, Dupont Circle, Adams Morgan, U Street, Navy Yard, NoMa, H Street, Foggy Bottom, Penn Quarter, and beyond. No travel fees within the DC metro area.",
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

export default function WashingtonDCPage() {
  return (
    <main style={{ background: BLACK }}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/virginia" },
          { name: "Washington DC", path: "/locations/washington-dc" },
        ]}
      />
      <FaqJsonLd items={FAQS} />

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
        <div style={label}>WASHINGTON DC</div>

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
          Sign Shop &amp; Custom Signage in Washington DC
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          Printec Virginia LLC delivers premium custom signage to businesses across the
          nation&apos;s capital — from channel letters and storefront signs to
          vehicle wraps and digital displays.
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
              Services We Offer in Washington DC
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
              Why Choose Printec in Washington DC
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
              Areas We Serve in Washington DC
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
