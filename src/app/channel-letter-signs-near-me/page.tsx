import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SkewedButton } from "@/components/shared/skewed-button";
import {
  MapPin,
  FileCheck,
  HeadphonesIcon,
  Truck,
  Phone,
  UserCheck,
  Hammer,
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
  title: "Channel Letter Signs Near Me | Virginia's Top Sign Company",
  description:
    "Looking for channel letter signs near you? Printec Virginia LLC serves Virginia Beach, Norfolk, Richmond, and all of Virginia. Local installation, competitive pricing.",
  keywords: [
    "channel letter signs near me",
    "sign company Virginia",
    "channel letters Virginia Beach",
    "local sign maker",
    "illuminated signs near me",
    "Norfolk sign company",
    "Richmond channel letters",
  ],
  openGraph: {
    title: "Channel Letter Signs Near Me | Printec Virginia LLC",
    description:
      "Looking for channel letter signs near you? Printec Virginia LLC serves Virginia Beach, Norfolk, Richmond, and all of Virginia. Local installation, competitive pricing.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── DATA ─── */

const SERVICE_AREAS = [
  "Virginia Beach",
  "Norfolk",
  "Richmond",
  "Chesapeake",
  "Newport News",
  "Hampton",
  "Alexandria",
  "Arlington",
  "Fairfax",
  "All of Virginia",
];

const LOCAL_BENEFITS = [
  {
    title: "Free On-Site Survey",
    desc: "Our team visits your location to take precise measurements, assess mounting surfaces, and photograph your building — completely free and with zero obligation.",
    icon: MapPin,
    img: "On-Site Survey Photo",
  },
  {
    title: "Local Permits Expertise",
    desc: "We know Virginia sign codes inside and out. From Virginia Beach zoning rules to Richmond historic district requirements, we handle every permit so you do not have to.",
    icon: FileCheck,
    img: "Permit Documentation",
  },
  {
    title: "Same-Day Support",
    desc: "When you work with a local channel letter sign company, service calls happen fast. Need a repair or adjustment? We can be on-site the same day in most areas.",
    icon: HeadphonesIcon,
    img: "Service Team On-Site",
  },
  {
    title: "No Travel Fees",
    desc: "Because we are based right here in Virginia, you never pay travel surcharges or out-of-state markups. Our pricing reflects local rates, not inflated national chain fees.",
    icon: Truck,
    img: "Local Delivery Truck",
  },
];

const GET_STARTED_STEPS = [
  {
    num: "01",
    title: "Call or Email",
    desc: "Reach out by phone or fill out our online form. Tell us about your business, location, and what you envision for your channel letter sign.",
    icon: Phone,
  },
  {
    num: "02",
    title: "Free Site Visit",
    desc: "We come to your location for a complimentary survey. We measure, photograph, and assess your building to create an accurate proposal.",
    icon: UserCheck,
  },
  {
    num: "03",
    title: "Design & Install",
    desc: "We design, fabricate, and install your custom channel letter sign — handling permits, electrical, and everything in between.",
    icon: Hammer,
  },
];

const FAQS = [
  {
    q: "How do I find a reliable channel letter sign company near me?",
    a: "Look for a locally owned company with at least 10 years of experience, a physical fabrication facility in your state, and a portfolio of local installations. Printec Virginia LLC checks every box — we have been designing and installing channel letter signs across Virginia since 2017.",
  },
  {
    q: "Do you offer free estimates for channel letter signs?",
    a: "Yes. We provide completely free, no-obligation estimates that include a site survey, design mockup, and detailed pricing breakdown. Call us or fill out our contact form to schedule your free consultation.",
  },
  {
    q: "How long does it take to get channel letter signs installed?",
    a: "From initial contact to completed installation, most projects take 3-5 weeks. This includes design approval, permitting, fabrication, and installation. Rush options are available for time-sensitive projects.",
  },
  {
    q: "What areas in Virginia do you serve?",
    a: "We serve the entire Commonwealth of Virginia, including Virginia Beach, Norfolk, Richmond, Chesapeake, Newport News, Hampton, Alexandria, Arlington, Fairfax, and every community in between. No travel fees within Virginia.",
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

export default function ChannelLetterSignsNearMePage() {
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
          Channel Letter Signs Hero Image
        </div>

        <div style={label}>LOCAL</div>

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
          Channel Letter Signs Near You
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          Virginia&apos;s most trusted sign company — locally owned, locally
          fabricated, and installed by our own certified crew.
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

      {/* ── 2. LOCAL INTRO ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>
          <div style={label}>LOCALLY OWNED</div>
          <hr style={separator} />

          <h2 style={{ ...h2Style, marginTop: "24px" }}>
            Virginia&apos;s Channel Letter Sign Experts
          </h2>

          <div style={body}>
            <p style={{ margin: "0 0 20px" }}>
              When you search for &ldquo;channel letter signs near me,&rdquo; you
              want a sign company that actually knows your area — not a national
              franchise sending a subcontractor from three states away. Printec Virginia LLC
              is a Virginia-based, locally owned sign company that has been designing,
              fabricating, and installing custom channel letter signs across the
              Commonwealth since 2017.
            </p>
            <p style={{ margin: "0 0 20px" }}>
              We serve every corner of Virginia, from the Virginia Beach oceanfront to
              Northern Virginia&apos;s business corridors, from Richmond&apos;s
              historic districts to Hampton Roads&apos; bustling commercial centers.
              Our team knows the local sign codes, permitting processes, and building
              requirements in every jurisdiction — which means your project moves
              faster and costs less.
            </p>
            <p style={{ margin: 0 }}>
              Whether you need front-lit channel letters for a new storefront,
              halo-lit letters for a professional office, or a complete sign package
              for a shopping center, Printec Virginia LLC delivers premium quality at local
              prices. Every sign is custom-fabricated in our Virginia facility and
              installed by our own certified team — never outsourced.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 3. SERVICE AREAS — 10 CITIES ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ ...label, textAlign: "center" }}>SERVICE AREAS</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Channel Letter Signs Across Virginia
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
              gap: "12px",
            }}
          >
            {SERVICE_AREAS.map((area) => {
              const isAll = area === "All of Virginia";
              return (
                <div
                  key={area}
                  style={{
                    background: "#111",
                    border: `1px solid ${isAll ? ORANGE : DARK2}`,
                    borderRadius: "4px",
                    padding: "20px 16px",
                    textAlign: "center",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <MapPin
                    size={16}
                    color={isAll ? ORANGE : `${WHITE}55`}
                    style={{ marginBottom: "8px" }}
                  />
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "Arial, sans-serif",
                      color: isAll ? ORANGE : WHITE,
                    }}
                  >
                    {area}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 4. WHY LOCAL — 4 BENEFIT CARDS WITH IMAGES ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>LOCAL ADVANTAGE</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Why Choosing a Local Sign Company Matters
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "20px",
            }}
          >
            {LOCAL_BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} style={card}>
                  <div
                    style={{
                      aspectRatio: "16/10",
                      background: `linear-gradient(135deg, #111, ${DARK1})`,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: `${WHITE}44`,
                      fontFamily: "Arial, sans-serif",
                      marginBottom: "20px",
                    }}
                  >
                    {b.img}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
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
                      {b.title}
                    </h3>
                  </div>

                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}88`, margin: 0 }}>
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 5. GET STARTED — 3 STEPS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>GET STARTED</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Three Simple Steps to Your New Sign
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {GET_STARTED_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.num}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "56px 1fr",
                      gap: "24px",
                      padding: "32px 0",
                      alignItems: "start",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "4px",
                        background: "#111",
                        border: `1px solid ${DARK2}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={22} color={ORANGE} />
                    </div>
                    <div>
                      <div style={{ ...label, marginBottom: "6px" }}>{step.num}</div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          fontFamily: "Arial, sans-serif",
                          color: WHITE,
                          margin: "0 0 8px",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ ...body, fontSize: "14px", color: `${WHITE}88`, margin: 0 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  {i < GET_STARTED_STEPS.length - 1 && <hr style={separator} />}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <SkewedButton href="/contact">
              CALL YOUR LOCAL TEAM <ArrowRight size={16} style={{ marginLeft: "6px" }} />
            </SkewedButton>
          </div>
        </div>
      </Section>

      {/* ── 6. FAQ — 4 QUESTIONS ── */}
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

      {/* ── 7. CTA ── */}
      <CtaBanner />
    </main>
  );
}
