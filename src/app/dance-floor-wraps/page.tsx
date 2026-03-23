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
  Heart,
  Building2,
  Ticket,
  Award,
  Landmark,
  Music,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Dance Floor Wraps | Weddings, Events & Corporate",
  description:
    "Custom dance floor wraps for weddings, corporate events, galas & trade shows. Slip-resistant vinyl. Serving Virginia.",
  keywords: [
    "dance floor wraps",
    "custom floor graphics",
    "wedding floor wrap",
    "event floor decals",
    "vinyl floor graphics Virginia",
    "trade show floor wraps",
  ],
  openGraph: {
    title: "Custom Dance Floor Wraps | Printec Virginia LLC",
    description:
      "Custom dance floor wraps and vinyl floor graphics for weddings, corporate events, galas, trade shows, and brand activations. Serving Virginia.",
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
    title: "Weddings",
    desc: "Elegant monograms, floral patterns, and bespoke designs that transform your reception into a one-of-a-kind celebration.",
    icon: Heart,
    img: "weddings",
  },
  {
    title: "Corporate Events",
    desc: "Logo placements, brand activations, and themed floor graphics that reinforce your corporate identity from the ground up.",
    icon: Building2,
    img: "corporate",
  },
  {
    title: "Trade Shows",
    desc: "High-traffic booth flooring that draws attention and differentiates your exhibit space from every other booth on the floor.",
    icon: Ticket,
    img: "trade-shows",
  },
  {
    title: "Galas & Fundraisers",
    desc: "Sophisticated, black-tie-ready floor wraps that set the tone for upscale charity events and formal dinner galas.",
    icon: Award,
    img: "galas",
  },
  {
    title: "Venues & Hotels",
    desc: "Permanent and semi-permanent installations for lobbies, ballrooms, and event spaces that elevate your venue year-round.",
    icon: Landmark,
    img: "venues",
  },
  {
    title: "DJs & Entertainment",
    desc: "Stage wraps and performance branding that give artists, DJs, and entertainers a polished, professional look on any platform.",
    icon: Music,
    img: "djs",
  },
];

const PROCESS_STEPS = [
  {
    num: "1",
    title: "Consultation",
    desc: "We discuss your event, venue dimensions, design vision, and timeline to build a clear project scope.",
  },
  {
    num: "2",
    title: "Design",
    desc: "Our team creates a custom mockup tailored to your brand or wedding theme with unlimited revisions included.",
  },
  {
    num: "3",
    title: "Production",
    desc: "Your approved artwork is printed on premium vinyl with a slip-resistant laminate rated for heavy foot traffic.",
  },
  {
    num: "4",
    title: "Installation",
    desc: "Our certified crew installs on-site quickly and cleanly, with zero damage to the underlying floor surface.",
  },
];

const FAQ_DATA = [
  {
    q: "What sizes are available?",
    a: "We wrap floors of any dimension, from a compact 8x8-foot wedding monogram to a 5,000-square-foot ballroom. Our wide-format printers produce seamless panels up to 60 inches wide, and our installers align them precisely so the finished surface reads as one continuous graphic.",
  },
  {
    q: "Is the material safe for dancing?",
    a: "Absolutely. Every wrap includes a textured, slip-resistant laminate that meets ASTM anti-slip standards. The surface is engineered for high heels, dress shoes, and heavy foot traffic while maintaining vibrant print clarity throughout your event.",
  },
  {
    q: "How long does production take?",
    a: "Standard turnaround is two to three weeks from design approval to installation. Rush orders are available and we can often deliver in as little as five business days for simpler designs. We recommend booking early during peak wedding and event seasons.",
  },
  {
    q: "Can I reuse the wrap for multiple events?",
    a: "Our wraps are engineered for single-event use with a temporary adhesive that removes cleanly. For clients who need reusable floor graphics, we offer a roll-up vinyl option that can be transported and re-laid at multiple venues.",
  },
  {
    q: "Do you work with event planners and venues?",
    a: "Yes. We partner with wedding planners, corporate event coordinators, venue managers, and AV production companies throughout Virginia. We handle all logistics including site surveys, load-in scheduling, and post-event removal.",
  },
  {
    q: "Do you offer installation and removal?",
    a: "Every project includes professional installation by our certified crew. We also provide complete removal after your event at no additional charge, leaving the original floor surface in pristine condition with zero residue.",
  },
];

/* ─── PAGE ─── */

export default async function DanceFloorWrapsPage() {
  const imgs = await getPageImages("dance-floor-wraps");
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
            src={imgs.hero || IMG.danceFloorHero}
            alt="Elegant wedding dance floor wrap with custom monogram initials on dark marble surface"
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
              Dance Floor Wraps
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
            beforeSrc={imgs.before || IMG.floorBefore}
            afterSrc={imgs.after || IMG.floorAfter}
            beforeAlt="Plain ballroom dance floor before vinyl wrap"
            afterAlt="Dance floor after custom vinyl wrap — elegant monogram design"
            width={500}
            height={400}
          />

          {/* Right — copy */}
          <div>
            <h2 style={H2}>Custom Floor Graphics for Every Occasion</h2>

            <p style={BODY}>
              A custom dance floor wrap turns an ordinary venue into an
              unforgettable experience. Whether you are hosting an elegant
              wedding reception with a personalized monogram or a high-energy
              corporate gala with branded flooring, a professionally designed
              wrap sets the tone the moment your guests arrive. At Printec Virginia LLC,
              we use premium 3M vinyl paired with a slip-resistant laminate
              engineered specifically for foot traffic.
            </p>

            <p style={{ ...BODY, margin: 0 }}>
              From intricate floral designs and couple initials to bold company
              logos and product launch graphics, our team manages every detail
              from initial concept through on-site installation. We serve event
              planners, venues, wedding coordinators, and businesses across
              Virginia and the greater East Coast region, delivering
              photo-realistic prints that look like they were always part of the
              floor.
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

      {/* ── 5. GALLERY ── */}
      <Section style={{ background: DARK1, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "60px" }}>
            <p style={LABEL}>PORTFOLIO</p>
            <h2 style={H2}>Recent Work</h2>
            <hr style={SEPARATOR} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "16px",
            }}
          >
            {[
              { src: "/images/portfolio/floor-as-monogram.webp", alt: "A&S monogram wedding floor wrap with gold wreath design" },
              { src: "/images/portfolio/floor-mandala-colorful.webp", alt: "Colorful mandala mehndi dance floor wrap in pink, blue and yellow" },
              { src: "/images/portfolio/floor-mm-gold.webp", alt: "M&M gold monogram wedding dance floor wrap" },
              { src: "/images/portfolio/floor-hz-orange.webp", alt: "H&Z orange monogram wedding floor wrap" },
              { src: "/images/portfolio/floor-anjana-aditya.webp", alt: "Anjana & Aditya wedding dance floor with blue lighting" },
              { src: "/images/portfolio/floor-rv-wreath.webp", alt: "R&V gold wreath monogram dance floor wrap" },
              { src: "/images/portfolio/floor-pastel-mandala.webp", alt: "Pastel pink and purple mandala dance floor wrap" },
              { src: "/images/portfolio/floor-red-pattern.webp", alt: "Traditional red cross-stitch pattern dance floor wrap" },
              { src: "/images/portfolio/floor-mehndi-colorful.webp", alt: "Vibrant mehndi mandala floor wrap with chandeliers" },
            ].map((img) => (
              <div
                key={img.src}
                style={{
                  position: "relative",
                  aspectRatio: "4 / 3",
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: "1px solid #222",
                  transition: "border-color 0.3s ease",
                }}
                className="card-hover"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 6. FAQ ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
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

      {/* ── 7. CTA ── */}
      <Section style={{ background: DARK1, padding: "100px 24px" }}>
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
            Ready to Transform Your Floor?
          </h2>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 40px",
            }}
          >
            Whether it&#39;s a wedding, corporate gala, or trade show booth, we
            will design and install a custom floor wrap that leaves a lasting
            impression on every guest.
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
            (715) 503-5444
          </p>
        </div>
      </Section>
    </main>
  );
}
