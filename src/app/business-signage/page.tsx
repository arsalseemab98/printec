import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/shared/section";
import { SkewedButton } from "@/components/shared/skewed-button";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
  IMG,
} from "@/lib/constants";
import { getPageImages } from "@/lib/content";
import {
  ShoppingBag,
  Building2,
  Coffee,
  Heart,
  HardHat,
  KeyRound,
  MapPin,
  PenTool,
  Factory,
  Settings,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Business Signage | Commercial Signs, Storefront & Office Signage",
  description:
    "Custom business signage — monument signs, pylon signs, channel letters, storefront & office signs. ADA-compliant. Serving Virginia.",
  keywords: [
    "business signage",
    "commercial signage",
    "office signs Virginia",
    "storefront signage",
    "monument signs",
    "pylon signs",
    "ADA compliant signs",
    "illuminated signs",
  ],
  openGraph: {
    title: "Business Signage | Printec Virginia LLC",
    description:
      "Custom business signage solutions including monument signs, pylon signs, channel letters, storefront signage, and office signs. Serving Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── STYLES ─── */

const LABEL: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "4px",
  textTransform: "uppercase",
  color: ORANGE,
  margin: "0 0 16px",
};

const H2: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: 1.25,
  color: WHITE,
  margin: "0 0 20px",
};

const BODY: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.5)",
  margin: "0 0 16px",
};

const SEPARATOR: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #161616",
  margin: "0",
};

const IMAGE_PLACEHOLDER: React.CSSProperties = {
  width: "100%",
  background: "#111",
  border: "1px solid #222",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(255,255,255,0.2)",
  fontSize: "13px",
  letterSpacing: "2px",
  fontWeight: 500,
};

/* ─── DATA ─── */

const WHO_ITS_FOR = [
  {
    title: "Retail & Shopping",
    desc: "Eye-catching storefront signs, window displays, and wayfinding systems that drive foot traffic and reinforce your retail brand identity.",
    icon: ShoppingBag,
    img: "retail",
  },
  {
    title: "Corporate Offices",
    desc: "Lobby signs, suite identifiers, conference room plaques, and branded wall graphics that project professionalism from the moment visitors arrive.",
    icon: Building2,
    img: "corporate",
  },
  {
    title: "Restaurants & Hospitality",
    desc: "Menu boards, blade signs, illuminated awnings, and patio signage that attract diners and set the tone for your dining experience.",
    icon: Coffee,
    img: "restaurants",
  },
  {
    title: "Healthcare",
    desc: "ADA-compliant wayfinding, room identification, and exterior monument signs that help patients navigate your facility with confidence.",
    icon: Heart,
    img: "healthcare",
  },
  {
    title: "Construction & Industrial",
    desc: "Job site signs, safety signage, directional banners, and durable outdoor panels engineered to withstand harsh conditions and heavy use.",
    icon: HardHat,
    img: "construction",
  },
  {
    title: "Property Management",
    desc: "Tenant directories, parking signs, community entrance monuments, and property identification systems for residential and commercial complexes.",
    icon: KeyRound,
    img: "property",
  },
];

const PROCESS_STEPS = [
  {
    num: "1",
    title: "Site Survey",
    desc: "We visit your location to assess visibility, structural requirements, local codes, and optimal sign placement for maximum impact.",
    icon: MapPin,
  },
  {
    num: "2",
    title: "Design & Engineering",
    desc: "Our team creates detailed mockups and engineering drawings, ensuring your sign meets brand standards, ADA compliance, and zoning regulations.",
    icon: PenTool,
  },
  {
    num: "3",
    title: "Manufacturing",
    desc: "Your approved design is fabricated in our Virginia facility using premium materials — aluminum, acrylic, LED modules, and architectural-grade finishes.",
    icon: Factory,
  },
  {
    num: "4",
    title: "Installation & Maintenance",
    desc: "Our licensed crew handles permitting, installation, and electrical connections, with ongoing maintenance plans to keep your signage looking pristine.",
    icon: Settings,
  },
];

const FAQ_DATA = [
  {
    q: "What types of signs do you offer?",
    a: "We design and fabricate a full range of commercial signage including monument signs, pylon signs, blade signs, A-frame sidewalk signs, channel letters, cabinet signs, post-and-panel signs, and dimensional lettering. Each type is engineered for its specific application, whether freestanding, wall-mounted, or projecting from a building facade.",
  },
  {
    q: "Are your signs ADA compliant?",
    a: "Yes. All interior wayfinding and room identification signs we produce meet ADA requirements including tactile lettering, Grade 2 Braille, proper mounting height, and compliant color contrast ratios. We stay current with both federal ADA standards and Virginia-specific accessibility codes to ensure full compliance.",
  },
  {
    q: "What is the difference between illuminated and non-illuminated signs?",
    a: "Illuminated signs use LED modules for front-lit, back-lit, or halo-lit effects, providing 24/7 visibility and a premium appearance. Non-illuminated signs rely on ambient light and reflective materials. We help you choose based on your location, visibility needs, operating hours, and budget.",
  },
  {
    q: "Do you handle permits and zoning approval?",
    a: "Absolutely. We manage the entire permitting process from start to finish, including sign variance applications, zoning reviews, landlord approvals, and HOA submissions. Our team is experienced with municipal sign codes across Northern Virginia, Richmond, and the greater DMV area.",
  },
  {
    q: "Do you offer multi-location signage programs?",
    a: "Yes. We provide turnkey signage programs for franchises, retail chains, and multi-site businesses. This includes standardized design templates, centralized project management, consistent fabrication quality, and coordinated installation scheduling across all your locations.",
  },
  {
    q: "What warranty do your signs come with?",
    a: "All signs include a standard three-year warranty covering materials, fabrication, and LED components. Extended warranty packages are available for up to seven years. We also offer preventive maintenance agreements that include periodic cleaning, electrical inspections, and lamp replacements.",
  },
];

/* ─── PAGE ─── */

export default async function BusinessSignagePage() {
  const imgs = await getPageImages("business-signage");
  return (
    <main style={{ background: BLACK }}>

      {/* ── 1. HERO ── */}
      <Section
        style={{
          background: BLACK,
          padding: 0,
        }}
      >
        {/* Hero image with overlay */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1920 / 400",
            position: "relative",
            overflow: "hidden",
            borderBottom: `1px solid ${DARK1}`,
          }}
        >
          <Image
            src={imgs.hero || IMG.bizSignageHero}
            alt="Meridian Business Park monument sign and wayfinding signage at dusk"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: "36px",
                fontFamily: "'Arial Black', sans-serif",
                fontWeight: 900,
                color: WHITE,
                margin: 0,
                textAlign: "center",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              Business Signage
            </h1>
          </div>
        </div>
      </Section>

      {/* ── 2. INTRO ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <hr style={SEPARATOR} />
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            paddingTop: "100px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Left — interactive before/after slider */}
          <BeforeAfterSlider
            beforeSrc="/images/biz-signage-before.webp"
            afterSrc="/images/biz-signage-after.webp"
            beforeAlt="Building exterior before professional business signage installation"
            afterAlt="Building exterior after custom business signage — illuminated channel letters and monument sign"
            width={500}
            height={400}
          />

          {/* Right — copy */}
          <div>
            <h2 style={H2}>Professional Signage for Every Business</h2>

            <p style={BODY}>
              Your signage is the first impression customers have of your
              business. Whether you need an illuminated monument sign that
              commands attention from the road or refined lobby lettering
              that reinforces your brand the moment visitors walk in, Printec
              Corp designs and fabricates commercial signage that works as
              hard as you do. We use premium materials including brushed
              aluminum, high-output LEDs, and architectural-grade acrylic to
              ensure every sign looks exceptional and lasts for years.
            </p>

            <p style={{ ...BODY, margin: 0 }}>
              From single-location storefronts to multi-site franchise
              rollouts, our team manages every phase of the process including
              site surveys, permit acquisition, structural engineering,
              fabrication, and professional installation. We serve retail
              shops, corporate offices, restaurants, healthcare facilities,
              and property managers across Virginia and the greater East
              Coast region.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 3. WHO IT'S FOR ── */}
      <Section style={{ background: DARK1, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "60px" }}>
            <p style={LABEL}>APPLICATIONS</p>
            <h2 style={H2}>Who It&#39;s For</h2>
            <hr style={SEPARATOR} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "24px",
            }}
          >
            {WHO_ITS_FOR.map((card) => (
              <div
                key={card.title}
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease",
                }}
                className="card-hover"
              >
                {/* Card image placeholder */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    background: "#0e0e0e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.15)",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    fontWeight: 500,
                    borderBottom: "1px solid #222",
                  }}
                >
                  {card.title} — 400x180
                </div>

                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <card.icon size={16} color={ORANGE} />
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: WHITE,
                        margin: 0,
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.5)",
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 4. PROCESS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "60px" }}>
            <p style={LABEL}>HOW IT WORKS</p>
            <h2 style={H2}>Our Process</h2>
            <hr style={SEPARATOR} />
          </div>

          <div style={{ position: "relative" }}>
            {/* Connecting line — desktop only */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "12.5%",
                right: "12.5%",
                height: "1px",
                background: "#222",
                zIndex: 0,
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
                gap: "40px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} style={{ textAlign: "center" }}>
                  {/* Numbered circle */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: `1px solid ${ORANGE}`,
                      background: BLACK,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: ORANGE,
                    }}
                  >
                    {step.num}
                  </div>

                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 8px",
                      letterSpacing: "1px",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.5)",
                      margin: 0,
                      maxWidth: "240px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 5. FAQ ── */}
      <Section style={{ background: DARK1, padding: "100px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ marginBottom: "60px" }}>
            <p style={LABEL}>QUESTIONS</p>
            <h2 style={H2}>Frequently Asked</h2>
            <hr style={SEPARATOR} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FAQ_DATA.map((item, i) => (
              <div key={item.q}>
                <div style={{ padding: "28px 0" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 10px",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: "rgba(255,255,255,0.5)",
                      margin: 0,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
                {i < FAQ_DATA.length - 1 && <hr style={SEPARATOR} />}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 6. CTA ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <hr style={SEPARATOR} />
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
            paddingTop: "100px",
          }}
        >
          <p style={LABEL}>GET STARTED</p>

          <h2 style={{ ...H2, marginBottom: "16px" }}>
            Ready to Elevate Your Business Signage?
          </h2>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 40px",
            }}
          >
            Whether it&#39;s a storefront sign, office lobby display, or a
            multi-location rollout, we will design and install signage that
            strengthens your brand and drives results.
          </p>

          <SkewedButton href="/contact">REQUEST A QUOTE</SkewedButton>

          <p
            style={{
              marginTop: "24px",
              fontSize: "14px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "1px",
            }}
          >
            (647) 299-1460
          </p>
        </div>
      </Section>
    </main>
  );
}
