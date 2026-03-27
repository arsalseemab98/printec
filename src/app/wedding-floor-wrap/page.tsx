import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SkewedButton } from "@/components/shared/skewed-button";
import {
  Crown,
  Flower2,
  Star,
  Camera,
  Hexagon,
  PenTool,
  Share2,
  Eye,
  Printer,
  CalendarCheck,
  Gem,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Wedding Dance Floor Wraps & Decals | Custom Wedding Floor Graphics",
  description:
    "Make your wedding unforgettable with custom dance floor wraps and decals. Elegant monograms, photo prints, and personalized designs. Free design consultation in Virginia.",
  keywords: [
    "wedding floor wrap",
    "wedding dance floor decal",
    "custom wedding floor graphics",
    "wedding monogram floor",
    "Virginia wedding decor",
    "reception floor wrap",
  ],
  openGraph: {
    title: "Wedding Dance Floor Wraps & Decals | Printec Virginia LLC",
    description:
      "Make your wedding unforgettable with custom dance floor wraps and decals. Elegant monograms, photo prints, and personalized designs. Free consultation in Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── DATA ─── */

const DESIGN_IDEAS = [
  {
    title: "Classic Monogram",
    desc: "Timeless intertwined initials with elegant serif typography. The most popular wedding floor decal choice for formal receptions.",
    icon: Crown,
    img: "/images/portfolio/wedding-am-wreath.webp",
  },
  {
    title: "Floral Garden",
    desc: "Lush botanical arrangements — roses, peonies, eucalyptus — printed in vivid full color directly onto your dance floor wrap.",
    icon: Flower2,
    img: "/images/portfolio/wedding-am-floral.webp",
  },
  {
    title: "Starry Night",
    desc: "A celestial design with constellations, moons, and metallic accents. Perfect for evening receptions and outdoor tent weddings.",
    icon: Star,
    img: "/images/portfolio/wedding-starry-night.webp",
  },
  {
    title: "Photo Collage",
    desc: "Your engagement photos, love story timeline, or family portraits printed in stunning photo-realistic quality on vinyl.",
    icon: Camera,
    img: "/images/portfolio/wedding-photo-collage.webp",
  },
  {
    title: "Geometric Gold",
    desc: "Modern geometric patterns with faux-gold metallic finish. A striking wedding floor graphic for contemporary venues.",
    icon: Hexagon,
    img: "/images/portfolio/wedding-aj-geometric.webp",
  },
  {
    title: "Custom Illustration",
    desc: "Fully bespoke hand-drawn artwork — your venue, your pets, your portrait — transformed into a one-of-a-kind floor decal.",
    icon: PenTool,
    img: "/images/portfolio/wedding-illustration.webp",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Share Your Vision",
    desc: "Tell us about your wedding theme, colors, venue dimensions, and any inspiration photos. We love Pinterest boards.",
    icon: Share2,
  },
  {
    num: "02",
    title: "Design Preview",
    desc: "Our design team creates a digital mockup of your custom wedding floor wrap. Unlimited revisions until it is perfect.",
    icon: Eye,
  },
  {
    num: "03",
    title: "Production",
    desc: "We print your wedding floor decal on premium non-slip vinyl using UV-resistant inks that photograph beautifully.",
    icon: Printer,
  },
  {
    num: "04",
    title: "Day-of Install",
    desc: "Our crew arrives early on your wedding day to install the floor wrap — and removes it after the celebration. Zero stress.",
    icon: CalendarCheck,
  },
];

const PRICING_TIERS = [
  {
    name: "Standard",
    price: "$399",
    size: "Up to 8 ft",
    icon: Star,
    features: [
      "Single color design",
      "Monogram or text-based",
      "Non-slip laminate",
      "Professional installation",
      "Same-day removal included",
    ],
  },
  {
    name: "Premium",
    price: "$799",
    size: "Up to 12 ft",
    icon: Gem,
    popular: true,
    features: [
      "Full color printing",
      "Custom artwork or florals",
      "Photo-quality finish",
      "Non-slip laminate",
      "Professional installation",
      "Same-day removal included",
    ],
  },
  {
    name: "Grand",
    price: "$1,299",
    size: "Up to 20 ft",
    icon: Crown,
    features: [
      "Photo-realistic printing",
      "Full custom illustration",
      "Edge-to-edge coverage",
      "Premium non-slip laminate",
      "Professional installation",
      "Same-day removal included",
      "Keepsake section to keep",
    ],
  },
];

const FAQS = [
  {
    q: "How durable are wedding dance floor wraps?",
    a: "Our wedding floor wraps are printed on commercial-grade non-slip vinyl rated for heavy foot traffic. They handle heels, dance moves, and champagne spills without tearing, peeling, or becoming slippery. Every wrap includes a laminate layer that protects the print throughout your entire reception.",
  },
  {
    q: "Can you install a floor wrap on any surface?",
    a: "Yes. Our vinyl adheres to hardwood, tile, concrete, laminate, and even low-pile carpet. During your free consultation we ask about your venue surface so we can recommend the right adhesive backing for a secure, damage-free installation.",
  },
  {
    q: "How far in advance should we order?",
    a: "We recommend placing your order at least four weeks before your wedding date. Rush orders are available with a two-week turnaround for an additional fee. The earlier you book, the more time we have for design revisions.",
  },
  {
    q: "Will the wrap damage my venue floor?",
    a: "Absolutely not. We use a repositionable adhesive that peels away cleanly without leaving residue, scratches, or marks. Our installation crew handles removal the same day or next morning so your venue stays in perfect condition.",
  },
  {
    q: "Do you offer delivery outside Virginia?",
    a: "While our installation crew serves all of Virginia, we can ship finished floor wraps nationwide with detailed DIY installation instructions. Many couples and venue coordinators install them successfully on their own.",
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

const imgPlaceholder = (ratio: string, text: string): React.CSSProperties => ({
  aspectRatio: ratio,
  background: `linear-gradient(135deg, #111, ${DARK1})`,
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: `${WHITE}44`,
  fontFamily: "Arial, sans-serif",
  marginBottom: "20px",
});

/* ─── PAGE ─── */

export default function WeddingFloorWrapPage() {
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
        {/* Hero image */}
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "16/7",
            borderRadius: "4px",
            overflow: "hidden",
            position: "relative",
            marginBottom: "48px",
          }}
        >
          <Image
            src="/images/portfolio/wedding-floral-border.webp"
            alt="Wedding dance floor wrap with floral border design"
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div style={label}>WEDDINGS</div>

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
          Wedding Dance Floor Wraps
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          Make your first dance unforgettable with a fully custom floor wrap
          designed, printed, and installed by Printec Virginia LLC.
        </p>

        <div
          style={{
            width: "1px",
            height: "48px",
            background: `${DARK2}`,
            margin: "40px auto 0",
          }}
        />
      </Section>

      {/* ── 2. INTRO — 2026 TREND ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>
          <div style={label}>2026 TREND</div>
          <hr style={separator} />

          <h2 style={{ ...h2Style, marginTop: "24px" }}>
            Why Wedding Floor Wraps Are the Hottest Trend of 2026
          </h2>

          <div style={body}>
            <p style={{ margin: "0 0 20px" }}>
              Wedding floor wraps have exploded in popularity because they transform
              the most photographed moment of your reception — the first dance — into
              a visual masterpiece. Instead of dancing on a plain wooden floor or
              generic hotel carpet, imagine stepping onto a stunning custom wedding
              floor decal featuring your monogram, a garden of flowers, or a
              photo-realistic design that matches your theme perfectly.
            </p>
            <p style={{ margin: "0 0 20px" }}>
              A wedding dance floor wrap does more than look beautiful. It creates a
              defined focal point that draws guests onto the floor, photographs
              exceptionally well from every angle — especially drone shots and balcony
              perspectives — and gives your venue an instant luxury upgrade without
              the luxury price tag. Whether your ceremony is in a rustic barn, an
              elegant ballroom, or a backyard tent, a custom floor graphic makes the
              space entirely yours.
            </p>
            <p style={{ margin: 0 }}>
              At Printec Virginia LLC, we have been creating custom wedding floor wraps and
              wedding floor decals for couples across Virginia since 2017. Our
              premium non-slip vinyl is safe for heels, dance moves, and champagne
              spills — and our installation crew handles everything so you can focus
              on enjoying your big day.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 3. DESIGN IDEAS — 6 CARDS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>INSPIRATION</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Popular Wedding Floor Wrap Designs
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "20px",
            }}
          >
            {DESIGN_IDEAS.map((idea) => {
              const Icon = idea.icon;
              return (
                <div key={idea.title} style={card}>
                  <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: "4px", overflow: "hidden", marginBottom: "20px" }}>
                    <Image
                      src={idea.img}
                      alt={`${idea.title} wedding floor wrap design`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
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
                      {idea.title}
                    </h3>
                  </div>
                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}88`, margin: 0 }}>
                    {idea.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 4. HOW IT WORKS — 4 STEPS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>PROCESS</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              From Your Vision to Your Venue
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {PROCESS_STEPS.map((step, i) => {
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
                  {i < PROCESS_STEPS.length - 1 && <hr style={separator} />}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 5. PRICING — 3 TIERS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>PRICING</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Wedding Floor Wrap Packages
            </h2>
            <p style={{ ...body, color: `${WHITE}88`, maxWidth: "500px", margin: "0 auto" }}>
              All packages include installation, removal, and a free design consultation.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "20px",
            }}
          >
            {PRICING_TIERS.map((tier) => {
              const TierIcon = tier.icon;
              const pop = "popular" in tier && tier.popular;
              return (
                <div
                  key={tier.name}
                  style={{
                    ...card,
                    borderColor: pop ? ORANGE : DARK2,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <TierIcon size={18} color={ORANGE} />
                    <span style={{ ...label, marginBottom: 0 }}>{tier.name.toUpperCase()}</span>
                  </div>

                  <div
                    style={{
                      fontSize: "36px",
                      fontFamily: "'Arial Black', sans-serif",
                      fontWeight: 900,
                      color: WHITE,
                      lineHeight: 1,
                      margin: "8px 0 4px",
                    }}
                  >
                    {tier.price}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      fontFamily: "Arial, sans-serif",
                      color: `${WHITE}55`,
                      marginBottom: "24px",
                    }}
                  >
                    {tier.size} &middot; Starting from
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
                    {tier.features.map((feat) => (
                      <li
                        key={feat}
                        style={{
                          fontSize: "14px",
                          fontFamily: "Arial, sans-serif",
                          color: `${WHITE}aa`,
                          padding: "9px 0",
                          borderBottom: `1px solid ${DARK1}`,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span style={{ color: ORANGE, fontSize: "14px" }}>&#10003;</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <SkewedButton href="/contact" filled={!!pop}>
                    GET QUOTE
                  </SkewedButton>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 6. FAQ — 5 QUESTIONS ── */}
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
