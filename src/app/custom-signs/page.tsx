import { Metadata } from "next";
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
import {
  Store,
  UtensilsCrossed,
  Stethoscope,
  Home,
  Church,
  Presentation,
  MessageSquare,
  Palette,
  Hammer,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Signs | Business Signs, Storefront & Commercial Signage",
  description:
    "Custom signs for businesses, storefronts, offices, and events. Channel letters, monument signs, wayfinding, and commercial signage. Professional sign shop serving Virginia.",
  keywords: [
    "custom signs",
    "custom business signs",
    "sign shop near me",
    "custom signage Virginia",
    "storefront signs",
    "commercial signage",
  ],
  openGraph: {
    title: "Custom Signs | Printec Corp",
    description:
      "Custom signs for businesses, storefronts, offices, and events. Professional sign shop serving Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Corp",
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
    title: "Retail Stores",
    desc: "Eye-catching storefront signs, window lettering, and promotional displays that drive foot traffic and build brand recognition in any retail environment.",
    icon: Store,
    img: "retail",
  },
  {
    title: "Restaurants & Cafes",
    desc: "Menu boards, illuminated exterior signs, and branded interior graphics that set the mood and guide customers from the curb to the counter.",
    icon: UtensilsCrossed,
    img: "restaurants",
  },
  {
    title: "Medical Offices",
    desc: "Professional wayfinding signs, suite identification, and ADA-compliant signage that instills confidence and helps patients navigate your facility.",
    icon: Stethoscope,
    img: "medical",
  },
  {
    title: "Real Estate",
    desc: "Yard signs, directional arrows, open-house banners, and development site signs that capture attention and generate leads around the clock.",
    icon: Home,
    img: "real-estate",
  },
  {
    title: "Churches & Schools",
    desc: "Welcome monuments, event banners, donor walls, and campus wayfinding that reflect your institution's values and guide your community.",
    icon: Church,
    img: "churches",
  },
  {
    title: "Trade Shows",
    desc: "Portable banner stands, booth backdrops, tabletop displays, and hanging signs that make your exhibit impossible to walk past.",
    icon: Presentation,
    img: "trade-shows",
  },
];

const PROCESS_STEPS = [
  {
    num: "1",
    title: "Consultation",
    desc: "We discuss your goals, location requirements, brand guidelines, and budget to define the ideal sign solution for your space.",
    icon: MessageSquare,
  },
  {
    num: "2",
    title: "Design",
    desc: "Our designers create detailed mockups and 3D renderings so you can visualize the finished sign before any fabrication begins.",
    icon: Palette,
  },
  {
    num: "3",
    title: "Fabrication",
    desc: "Your approved design is manufactured in-house using premium materials — aluminum, acrylic, PVC, LED modules, and commercial-grade vinyl.",
    icon: Hammer,
  },
  {
    num: "4",
    title: "Installation",
    desc: "Our certified installers handle permitting coordination, site prep, and professional mounting with a clean, code-compliant finish.",
    icon: Truck,
  },
];

const FAQ_DATA = [
  {
    q: "What materials do you use for custom signs?",
    a: "We work with a wide range of commercial-grade materials including aluminum composite, acrylic, PVC, HDU foam, corrugated plastic, and brushed metals. For illuminated signs we use energy-efficient LED modules. Every material is selected based on your location, budget, and how long the sign needs to last.",
  },
  {
    q: "How long does production typically take?",
    a: "Standard turnaround is two to three weeks from design approval to installation. Simple signs like banners or yard signs can ship in as little as three business days. Large-scale projects such as channel letters or monument signs may take four to six weeks depending on permitting and fabrication complexity.",
  },
  {
    q: "Do I need a permit for my sign?",
    a: "Most exterior commercial signs require a permit from your local municipality. Our team handles the entire permitting process for you, including site surveys, sign drawings to code, and submission to the relevant zoning or building department. We factor permit timelines into every project schedule.",
  },
  {
    q: "How durable are your outdoor signs?",
    a: "Our exterior signs are engineered to withstand UV exposure, rain, wind, and temperature swings. We use automotive-grade UV laminates, powder-coated metals, and weatherproof LED systems. Most outdoor signs carry a five-to-ten-year lifespan depending on the material and environmental conditions.",
  },
  {
    q: "What sizes and shapes are available?",
    a: "There is virtually no limit. We fabricate everything from 12-inch suite plaques to 20-foot monument signs and multi-story building wraps. Custom die-cut shapes, dimensional letters, and contour-cut panels are all standard capabilities in our shop.",
  },
  {
    q: "How much does a custom sign cost?",
    a: "Pricing depends on size, material, illumination, and installation complexity. A simple vinyl banner may start around $150, while a full channel-letter storefront sign typically ranges from $2,000 to $8,000. We provide detailed, line-item quotes after the initial consultation so there are never any surprises.",
  },
];

/* ─── PAGE ─── */

export default function CustomSignsPage() {
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
              Custom Signs
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
            beforeSrc="/images/signs-before.webp"
            afterSrc="/images/signs-after.webp"
            beforeAlt="Empty storefront before custom sign installation"
            afterAlt="Storefront after custom illuminated sign installation"
            width={500}
            height={400}
          />

          {/* Right — copy */}
          <div>
            <h2 style={H2}>Professional Signage for Every Business</h2>

            <p style={BODY}>
              A well-crafted sign is the single most effective way to attract
              new customers and establish credibility. Whether you need an
              illuminated channel-letter storefront, a polished lobby sign, or a
              bold monument at your property entrance, Printec Corp designs and
              fabricates every sign in-house using commercial-grade materials
              built to last.
            </p>

            <p style={{ ...BODY, margin: 0 }}>
              From initial concept through permitting and installation, our team
              manages the entire process so you can focus on running your
              business. We serve retail stores, restaurants, medical offices,
              churches, schools, and commercial developers across Virginia and
              the greater East Coast region, delivering signage that works as
              hard as you do.
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
            Ready to Get Your Sign Made?
          </h2>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 40px",
            }}
          >
            Whether it&#39;s a storefront channel letter, an office lobby sign,
            or a full building wrap, we will design and install custom signage
            that puts your business on the map.
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
            (555) 123-4567
          </p>
        </div>
      </Section>
    </main>
  );
}
