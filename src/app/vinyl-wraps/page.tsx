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
import {
  Truck,
  UtensilsCrossed,
  Ship,
  Caravan,
  Bike,
  Car,
  MessageSquare,
  Palette,
  Printer,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vinyl Wraps | Vehicle Wraps, Boat Wraps & Custom Vinyl Graphics",
  description:
    "Professional vinyl wraps for vehicles, boats, trailers, and more. Custom vinyl graphics, fleet wraps, and full or partial vehicle wraps. Serving Virginia and the greater East Coast.",
  keywords: [
    "vinyl wraps",
    "vinyl wrap near me",
    "vinyl signs",
    "custom vinyl graphics Virginia",
    "vehicle wraps",
    "boat wraps",
    "fleet wraps",
    "car wrap",
  ],
  openGraph: {
    title: "Vinyl Wraps | Printec Virginia LLC",
    description:
      "Professional vinyl wraps for vehicles, boats, trailers, and more. Custom vinyl graphics and fleet wraps serving Virginia.",
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
    title: "Vehicle Fleets",
    desc: "Unified fleet branding that turns every company vehicle into a mobile billboard, reinforcing brand recognition across every route.",
    icon: Truck,
    img: "vehicle-fleets",
  },
  {
    title: "Food Trucks",
    desc: "Eye-catching, full-coverage wraps that showcase your menu and brand personality, drawing hungry customers from blocks away.",
    icon: UtensilsCrossed,
    img: "food-trucks",
  },
  {
    title: "Boats & Marine",
    desc: "UV-resistant, waterproof vinyl graphics engineered for saltwater and sun exposure, keeping your vessel looking sharp season after season.",
    icon: Ship,
    img: "boats-marine",
  },
  {
    title: "Trailers & RVs",
    desc: "Durable, highway-ready wraps for trailers and recreational vehicles that withstand road debris, weather, and years of travel.",
    icon: Caravan,
    img: "trailers-rvs",
  },
  {
    title: "Motorcycles",
    desc: "Precision-cut wraps for tanks, fairings, and fenders that give your bike a custom paint-shop look without the permanent commitment.",
    icon: Bike,
    img: "motorcycles",
  },
  {
    title: "Personal Vehicles",
    desc: "Color-change wraps, racing stripes, accent graphics, and full transformations that let you express your style and protect factory paint.",
    icon: Car,
    img: "personal-vehicles",
  },
];

const PROCESS_STEPS = [
  {
    num: "1",
    title: "Consultation",
    desc: "We assess your vehicle, discuss your goals, take measurements, and recommend the best vinyl and finish for your project.",
    icon: MessageSquare,
  },
  {
    num: "2",
    title: "Design",
    desc: "Our designers create a full mockup on a digital template of your vehicle so you can visualize the finished wrap before we print.",
    icon: Palette,
  },
  {
    num: "3",
    title: "Print & Laminate",
    desc: "Your approved design is printed on premium cast vinyl and sealed with a protective laminate for UV and scratch resistance.",
    icon: Printer,
  },
  {
    num: "4",
    title: "Installation",
    desc: "Our certified installers apply the wrap in a climate-controlled bay, ensuring bubble-free adhesion and seamless panel alignment.",
    icon: Wrench,
  },
];

const FAQ_DATA = [
  {
    q: "What is the difference between cast and calendered vinyl?",
    a: "Cast vinyl is thinner, more conformable, and designed for complex curves like vehicle body lines. It lasts five to seven years or more. Calendered vinyl is thicker and more affordable, best suited for flat or gently curved surfaces like trailers and signage panels with a typical lifespan of three to five years.",
  },
  {
    q: "How long does a vinyl wrap last?",
    a: "A professionally installed cast vinyl wrap typically lasts five to seven years with proper care. Longevity depends on factors like sun exposure, climate, and maintenance. Garaged vehicles and those washed regularly tend to stay vibrant the longest.",
  },
  {
    q: "How do I care for and maintain my wrap?",
    a: "Hand wash with a mild automotive soap and water. Avoid automatic car washes with abrasive brushes. For stubborn contaminants, use isopropyl alcohol on a microfiber cloth. We also recommend applying a spray sealant designed for vinyl every few months to maintain gloss and protection.",
  },
  {
    q: "Can you wrap over existing paint or a damaged panel?",
    a: "Vinyl wraps adhere best to smooth, undamaged paint. Minor imperfections like small chips or light scratches can usually be covered, but dents, rust, or peeling clear coat should be repaired first. The wrap conforms to the surface beneath it, so any texture will show through.",
  },
  {
    q: "What is the difference between a partial wrap and a full wrap?",
    a: "A full wrap covers the entire vehicle surface for a complete color change or branding transformation. A partial wrap covers select areas like doors, hood, or tailgate, and is a cost-effective option for businesses that want impactful branding without the investment of a full wrap.",
  },
  {
    q: "Can a vinyl wrap be removed without damaging the paint?",
    a: "Yes. Professional-grade cast vinyl is designed for clean removal. When heated and peeled by a trained installer, it lifts off without damaging the factory paint underneath. In fact, wraps protect the original paint from UV fade and minor abrasion while they are applied.",
  },
];

/* ─── PAGE ─── */

export default function VinylWrapsPage() {
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
              Vinyl Wraps
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
            beforeSrc="/images/vinyl-before.webp"
            afterSrc="/images/vinyl-after.webp"
            beforeAlt="Vehicle before vinyl wrap application"
            afterAlt="Vehicle after custom vinyl wrap — full color change"
            width={500}
            height={400}
          />

          {/* Right — copy */}
          <div>
            <h2 style={H2}>Custom Vinyl Graphics for Every Surface</h2>

            <p style={BODY}>
              A professional vinyl wrap transforms any vehicle, boat, or trailer
              into a head-turning statement. Whether you are branding an entire
              commercial fleet or giving your personal car a bold new color, a
              precision-installed wrap delivers paint-shop results at a fraction
              of the cost. At Printec Virginia LLC, we use premium 3M and Avery Dennison
              cast vinyl paired with UV-protective laminates engineered for years
              of outdoor exposure.
            </p>

            <p style={{ ...BODY, margin: 0 }}>
              From full color-change wraps and corporate fleet graphics to boat
              lettering and motorcycle accents, our team handles every step from
              design through installation. We serve businesses, car enthusiasts,
              and marine owners across Virginia and the greater East Coast,
              delivering flawless finishes that protect your paint and elevate
              your presence on the road or water.
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
            Ready to Wrap Your Ride?
          </h2>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 40px",
            }}
          >
            Whether it&#39;s a full fleet rebrand, a personal color change, or a
            custom boat wrap, we will design and install a vinyl wrap that
            delivers maximum impact and long-lasting protection.
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
