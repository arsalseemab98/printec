import { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
} from "@/lib/constants";
import {
  Calendar,
  FolderCheck,
  Users,
  ThumbsUp,
  Hammer,
  Shield,
  Zap,
  MapPin,
  MessageSquare,
  Palette,
  Printer,
  Truck,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Printec Corp is Virginia's trusted custom signage and vehicle wrap company with nearly a decade of experience, established in 2017. Learn about our story, team, and commitment to quality.",
  keywords: [
    "about Printec Corp",
    "Virginia sign company",
    "custom signage Virginia",
    "vehicle wrap company",
    "sign maker near me",
    "signage and graphics",
  ],
  openGraph: {
    title: "About Us | Printec Corp",
    description:
      "Printec Corp is Virginia's trusted custom signage and vehicle wrap company with nearly a decade of experience, established in 2017. Learn about our story, team, and commitment to quality.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Corp",
  },
};

/* ─── DATA ─── */

const ABOUT_STATS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "2017", label: "Established", icon: Calendar },
  { value: "5000+", label: "Projects Completed", icon: FolderCheck },
  { value: "500+", label: "Happy Clients", icon: Users },
  { value: "100%", label: "Satisfaction Rate", icon: ThumbsUp },
];

const WHY_CARDS: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "Expert Craftsmanship",
    desc: "Nearly a decade of precision signage and wrap installation, backed by a team that treats every project like a masterpiece.",
    icon: Hammer,
  },
  {
    title: "Premium Materials",
    desc: "Only the highest quality 3M and Avery vinyl and LED components — because your project deserves materials that last.",
    icon: Shield,
  },
  {
    title: "Fast Turnaround",
    desc: "Rush jobs welcome. Most projects completed in 5-7 business days — whether it's a wedding next week or a grand opening.",
    icon: Zap,
  },
  {
    title: "Local Service",
    desc: "Proudly serving Virginia and the East Coast from our state-of-the-art facility with hands-on, personal attention.",
    icon: MapPin,
  },
];

const PROCESS_STEPS: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: "01",
    title: "Consultation",
    desc: "We sit down with you to understand your goals and vision — whether it's a wedding, event, or business signage project.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "Design",
    desc: "Our creative team develops bold, eye-catching concepts with unlimited revisions until you love every detail.",
    icon: Palette,
  },
  {
    num: "03",
    title: "Production",
    desc: "Using cutting-edge printers, routers, and LED fabrication tools, we bring your approved design to life.",
    icon: Printer,
  },
  {
    num: "04",
    title: "Installation",
    desc: "Our certified installers handle every wrap, sign, and display with precision for a flawless finished product.",
    icon: Truck,
  },
];

/* ─── STYLES ─── */

const LABEL: React.CSSProperties = {
  fontSize: "10px",
  fontFamily: "Arial, sans-serif",
  fontWeight: 500,
  letterSpacing: "4px",
  textTransform: "uppercase",
  color: ORANGE,
};

const H1: React.CSSProperties = {
  fontSize: "36px",
  fontFamily: "'Arial Black', sans-serif",
  fontWeight: 900,
  lineHeight: 1.1,
  color: WHITE,
  margin: 0,
};

const H2: React.CSSProperties = {
  fontSize: "28px",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  lineHeight: 1.2,
  color: WHITE,
  margin: 0,
};

const BODY: React.CSSProperties = {
  fontSize: "15px",
  fontFamily: "Arial, sans-serif",
  lineHeight: 1.8,
  color: `rgba(255,255,255,0.5)`,
};

const SEPARATOR: React.CSSProperties = {
  height: "1px",
  background: DARK1,
  border: "none",
  margin: 0,
};

const CARD: React.CSSProperties = {
  background: "#111",
  border: `1px solid ${DARK2}`,
  borderRadius: "4px",
  padding: "32px 24px",
  transition: "border-color 0.3s ease",
};

/* ─── PAGE ─── */

export default function AboutPage() {
  return (
    <main style={{ background: BLACK }}>
      {/* ── 1. HERO ── */}
      <Section
        style={{
          background: BLACK,
          padding: "0 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Hero image placeholder */}
          <div
            style={{
              width: "100%",
              aspectRatio: "21 / 9",
              background: DARK1,
              border: `1px solid ${DARK2}`,
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <span style={{ ...BODY, color: `${WHITE}44` }}>
              Hero Image — 2100 x 900
            </span>
          </div>

          <div style={{ marginTop: "40px", marginBottom: "20px" }}>
            <p style={{ ...LABEL, margin: "0 0 12px" }}>About Us</p>
            <h1 style={H1}>Who We Are</h1>
          </div>
        </div>
      </Section>

      <hr style={{ ...SEPARATOR, maxWidth: "1200px", margin: "0 auto" }} />

      {/* ── 2. OUR STORY — 50/50 ── */}
      <Section
        style={{
          background: BLACK,
          padding: "100px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "60px",
            alignItems: "start",
          }}
        >
          {/* Left — image placeholder */}
          <div
            style={{
              width: "100%",
              aspectRatio: "4 / 3",
              background: DARK1,
              border: `1px solid ${DARK2}`,
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ ...BODY, color: `${WHITE}44` }}>
              Story Image — 800 x 600
            </span>
          </div>

          {/* Right — story text */}
          <div>
            <p style={{ ...LABEL, margin: "0 0 12px" }}>Our Story</p>
            <h2 style={{ ...H2, margin: "0 0 24px" }}>
              From a Small Print Shop to Virginia&apos;s Sign Authority
            </h2>

            <div style={BODY}>
              <p style={{ margin: "0 0 16px" }}>
                Printec Corp was founded in 2017 in the heart of Virginia by a
                sign maker with one mission: help local businesses get noticed. What started
                as a modest print shop with a single wide-format printer has grown into a
                full-service signage, vehicle wrap, and custom graphics company trusted by
                hundreds of businesses across the East Coast.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                Our founder&apos;s passion for bold, eye-catching design runs through
                everything we do. From illuminated channel letter signs that light up
                storefronts at night, to full food truck wraps that turn heads on every
                highway, we combine old-school craftsmanship with cutting-edge digital
                fabrication technology.
              </p>
              <p style={{ margin: 0 }}>
                Today, Printec Corp operates from a state-of-the-art production facility
                equipped with the latest wide-format printers, CNC routers, and LED
                fabrication tools. We remain a family-run business at heart — every client
                gets the personal attention, fast turnaround, and uncompromising quality
                that built our reputation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <hr style={{ ...SEPARATOR, maxWidth: "1200px", margin: "0 auto" }} />

      {/* ── 3. STATS — 4 cards in a row ── */}
      <Section
        style={{
          background: BLACK,
          padding: "100px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "20px",
          }}
        >
          {ABOUT_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                style={{
                  ...CARD,
                  textAlign: "center",
                  padding: "40px 20px",
                }}
              >
                <Icon size={24} color={`${WHITE}44`} style={{ marginBottom: "16px" }} />
                <div
                  style={{
                    fontSize: "28px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    color: ORANGE,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 400,
                    letterSpacing: "1px",
                    color: `${WHITE}66`,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <hr style={{ ...SEPARATOR, maxWidth: "1200px", margin: "0 auto" }} />

      {/* ── 4. MISSION — centered quote ── */}
      <Section
        style={{
          background: BLACK,
          padding: "100px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p style={{ ...LABEL, margin: "0 0 16px" }}>Our Mission</p>

          {/* Thin orange accent line */}
          <div
            style={{
              width: "40px",
              height: "2px",
              background: ORANGE,
              margin: "0 auto 32px",
            }}
          />

          <blockquote
            style={{
              fontSize: "24px",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              lineHeight: 1.5,
              color: WHITE,
              margin: "0 0 24px",
              padding: 0,
              border: "none",
            }}
          >
            &ldquo;We believe every business deserves to be seen.&rdquo;
          </blockquote>

          <p style={{ ...BODY, maxWidth: "600px", margin: "0 auto" }}>
            At Printec Corp, our mission is simple: combine cutting-edge printing and
            fabrication technology with fearless creative design to deliver signs, wraps,
            and custom graphics that demand attention. Whether you&apos;re planning a dream
            wedding, launching a new storefront, or wrapping a fleet of vehicles — we make
            sure your vision is impossible to ignore.
          </p>
        </div>
      </Section>

      <hr style={{ ...SEPARATOR, maxWidth: "1200px", margin: "0 auto" }} />

      {/* ── 5. WHY CHOOSE US — 4 cards with image placeholders ── */}
      <Section
        style={{
          background: BLACK,
          padding: "100px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ ...LABEL, margin: "0 0 12px" }}>Why Printec</p>
            <h2 style={H2}>Why Choose Us</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "20px",
            }}
          >
            {WHY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  style={CARD}
                >
                  {/* Image placeholder */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      background: DARK1,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: `${WHITE}33` }}>
                      480 x 270
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <Icon size={18} color={ORANGE} />
                    <h3
                      style={{
                        fontSize: "15px",
                        fontFamily: "Arial, sans-serif",
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
                      ...BODY,
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <hr style={{ ...SEPARATOR, maxWidth: "1200px", margin: "0 auto" }} />

      {/* ── 6. PROCESS — 4 steps ── */}
      <Section
        style={{
          background: BLACK,
          padding: "100px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ ...LABEL, margin: "0 0 12px" }}>How We Work</p>
            <h2 style={H2}>Our Process</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "20px",
            }}
          >
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  style={{
                    ...CARD,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 500,
                      letterSpacing: "4px",
                      color: ORANGE,
                      marginBottom: "16px",
                    }}
                  >
                    STEP {step.num}
                  </div>

                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      border: `1px solid ${DARK2}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <Icon size={24} color={`${WHITE}88`} />
                  </div>

                  <h3
                    style={{
                      fontSize: "15px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 10px",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      ...BODY,
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 7. CTA BANNER ── */}
      <CtaBanner />
    </main>
  );
}
