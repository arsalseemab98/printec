import { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
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
  title: "Custom Signs & Signage in Virginia | Printec Virginia LLC",
  description:
    "Virginia's trusted sign company. Custom channel letters, business signage & more. Serving Virginia Beach, Norfolk, Richmond & beyond.",
  keywords: [
    "sign company Virginia",
    "custom signs Virginia",
    "signage Virginia",
    "vehicle wraps Virginia",
    "channel letters Virginia",
    "sign shop Virginia Beach",
    "business signs Richmond",
  ],
  openGraph: {
    title: "Custom Signs & Signage in Virginia | Printec Virginia LLC",
    description:
      "Virginia's trusted sign company. Custom channel letters, business signage & more. Serving Virginia Beach, Norfolk, Richmond & beyond.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── DATA ─── */

const SERVICES = [
  {
    title: "Channel Letter Signs",
    desc: "Front-lit, halo-lit, and reverse-lit channel letters custom-fabricated for storefronts and shopping centers across Virginia.",
    icon: Lightbulb,
  },
  {
    title: "Business Signage",
    desc: "Monument signs, pylon signs, blade signs, and ADA wayfinding for offices, retail, and commercial properties statewide.",
    icon: Store,
  },
  {
    title: "Vehicle Wraps",
    desc: "Full wraps, partial wraps, and fleet graphics that turn your vehicles into high-visibility mobile advertising across Virginia roads.",
    icon: Car,
  },
  {
    title: "Window Graphics",
    desc: "Storefront window wraps, perforated vinyl, and frosted privacy film for businesses from Virginia Beach to Arlington.",
    icon: PenTool,
  },
  {
    title: "Digital Signage",
    desc: "LED message boards, digital menu displays, and interactive kiosks for restaurants, lobbies, and events throughout the Commonwealth.",
    icon: Monitor,
  },
  {
    title: "Custom Apparel",
    desc: "Branded uniforms, team jerseys, and promotional apparel for Virginia businesses, schools, and sports organizations.",
    icon: Shirt,
  },
];

const BENEFITS = [
  {
    title: "Virginia-Based & Locally Owned",
    desc: "We are headquartered right here in Virginia. No national franchise middlemen, no out-of-state subcontractors. Your project stays local from design to installation.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Statewide Service",
    desc: "We serve the entire Commonwealth with no travel fees. Most projects are completed in 3-5 weeks, and rush options are available for time-sensitive needs.",
    icon: Clock,
  },
  {
    title: "Commercial-Grade Quality",
    desc: "Every sign is fabricated in our own Virginia facility using premium materials rated for years of outdoor durability in Virginia's variable climate.",
    icon: Award,
  },
  {
    title: "Full-Service Team",
    desc: "From graphic design and permitting to fabrication and installation, our in-house team handles every step so nothing gets lost between vendors.",
    icon: Users,
  },
];

const AREAS = [
  "Virginia Beach",
  "Norfolk",
  "Richmond",
  "Arlington",
  "Alexandria",
  "Fairfax",
  "Chesapeake",
  "Newport News",
  "Hampton",
  "Roanoke",
  "Charlottesville",
  "Fredericksburg",
];

const FAQS = [
  {
    q: "Do you serve all of Virginia?",
    a: "Yes. We serve the entire Commonwealth of Virginia, from Hampton Roads and Virginia Beach to Northern Virginia, Richmond, Roanoke, Charlottesville, and every community in between. There are no travel fees anywhere in Virginia.",
  },
  {
    q: "How much do custom signs cost in Virginia?",
    a: "Pricing depends on the type, size, and complexity of your sign. Channel letter signs typically range from $2,000 to $15,000+, while vehicle wraps start around $2,500. We provide free, detailed estimates with no obligation.",
  },
  {
    q: "Do you handle Virginia sign permits?",
    a: "Absolutely. We manage the full permitting process across all Virginia jurisdictions, including local zoning approvals, electrical permits, and VDOT compliance for roadside signage. Our team knows each locality's requirements.",
  },
  {
    q: "How long does a sign project take in Virginia?",
    a: "Most projects take 3-5 weeks from design approval to completed installation. Permitting timelines vary by jurisdiction but typically add 1-2 weeks. We keep you updated at every stage and offer rush service when needed.",
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

export default function VirginiaPage() {
  return (
    <main style={{ background: BLACK }}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/virginia" },
          { name: "Virginia", path: "/locations/virginia" },
        ]}
      />

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
        <div style={label}>VIRGINIA</div>

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
          Custom Signs &amp; Signage in Virginia
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          Virginia&apos;s locally owned sign company — custom channel letters,
          vehicle wraps, business signage, and more, fabricated and installed by
          our own team across the entire Commonwealth.
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
              Services We Offer in Virginia
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
              Why Choose Printec in Virginia
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
              Areas We Serve Across Virginia
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
