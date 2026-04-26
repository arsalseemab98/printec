import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/shared/json-ld";
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
  Zap,
  Shield,
  Palette,
  SunDim,
  Timer,
  Plug,
  UtensilsCrossed,
  Store,
  Heart,
  Home,
  Scissors,
  Building2,
  PenTool,
  Eye,
  Wrench,
  Truck,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Neon Signs | LED Neon Signs, Business & Event Signage",
  description:
    "Custom LED neon signs for businesses, events, weddings, and home decor. Energy-efficient, long-lasting, and fully customizable. Serving Virginia.",
  keywords: [
    "custom neon signs",
    "custom led neon signs",
    "neon signs for business",
    "custom neon light",
    "neon sign maker near me",
    "led neon signs Virginia",
    "neon wedding signs",
  ],
  openGraph: {
    title: "Custom Neon Signs | Printec Virginia LLC",
    description:
      "Custom LED neon signs for businesses, events, weddings, and home decor. Energy-efficient, long-lasting, and fully customizable. Serving Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── STYLES ─── */

const sectionLabel: React.CSSProperties = {
  fontSize: "10px",
  fontFamily: "Arial, sans-serif",
  fontWeight: 500,
  letterSpacing: "4px",
  textTransform: "uppercase",
  color: ORANGE,
  marginBottom: "20px",
};

const h2Style: React.CSSProperties = {
  fontSize: "28px",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  lineHeight: 1.3,
  color: WHITE,
  margin: "0 0 20px",
};

const bodyStyle: React.CSSProperties = {
  fontSize: "15px",
  fontFamily: "Arial, sans-serif",
  lineHeight: 1.8,
  color: `rgba(255,255,255,0.5)`,
};

const thinSeparator: React.CSSProperties = {
  height: "1px",
  background: DARK1,
  border: "none",
  margin: 0,
};

const card: React.CSSProperties = {
  background: "#111",
  border: `1px solid ${DARK2}`,
  borderRadius: "4px",
  overflow: "hidden",
};

/* ─── DATA ─── */

const FEATURES = [
  { title: "Energy Efficient", desc: "LED neon uses 80% less energy than traditional glass neon, dramatically reducing your electricity costs while delivering the same vibrant glow.", icon: Zap },
  { title: "Safe & Cool", desc: "No gas, no heat, no glass breakage risk. LED neon signs run cool to the touch, making them safe for any indoor or outdoor environment.", icon: Shield },
  { title: "Fully Customizable", desc: "Any font, color, size, or shape you can imagine. From script lettering to logos and symbols, your design possibilities are unlimited.", icon: Palette },
  { title: "Dimmable", desc: "Adjustable brightness for any mood or setting. Dim for ambient atmosphere or brighten for maximum visibility with the included dimmer controller.", icon: SunDim },
  { title: "Long Lifespan", desc: "50,000+ hours of continuous use — that is over 5 years of reliable, maintenance-free operation before any components need attention.", icon: Timer },
  { title: "Easy Installation", desc: "Lightweight acrylic backing with pre-drilled mounting holes. Simply hang on the wall and plug in — no electrician required.", icon: Plug },
];

const WHO_ITS_FOR = [
  { title: "Restaurants & Bars", desc: "Neon signs for ambiance and branding. Create an inviting atmosphere that draws customers in and keeps them coming back.", icon: UtensilsCrossed },
  { title: "Retail Stores", desc: "Eye-catching window and interior displays. Highlight promotions, brand names, or create instagram-worthy photo spots for customers.", icon: Store },
  { title: "Weddings & Events", desc: "Custom names, dates, and hashtags. Transform your venue with personalized neon that makes every photo unforgettable.", icon: Heart },
  { title: "Home Decor", desc: "Personalized neon art for bedrooms, game rooms, home offices, and entertainment spaces. Add a warm, modern glow to any room.", icon: Home },
  { title: "Salons & Studios", desc: "Instagram-worthy backdrop signs that elevate your space and encourage social sharing. Perfect for beauty, fitness, and creative studios.", icon: Scissors },
  { title: "Corporate Offices", desc: "Branded lobby and conference room signage. Reinforce your company identity with a sleek, modern neon logo or mission statement.", icon: Building2 },
];

const PROCESS = [
  { step: "01", title: "Design Your Sign", desc: "Share your text, font, and color preferences. Send us a sketch, screenshot, or just describe your vision and we will bring it to life.", icon: PenTool },
  { step: "02", title: "Mockup & Approval", desc: "We create a digital preview showing your sign at exact scale with your chosen colors. Review, request revisions, and approve before we build.", icon: Eye },
  { step: "03", title: "Fabrication", desc: "LED neon strip is precisely bent to match your design and mounted on a clear acrylic backing. Every sign is hand-assembled and quality tested.", icon: Wrench },
  { step: "04", title: "Delivery & Install", desc: "Shipped ready to hang in custom protective packaging, or professionally installed at your location anywhere in Virginia.", icon: Truck },
];

const FAQ = [
  {
    q: "How long do LED neon signs last?",
    a: "LED neon signs last 50,000+ hours, which translates to approximately 5-8 years of continuous use. With typical business hours usage, your sign can easily last over a decade. LED modules degrade gradually rather than burning out suddenly, so you will notice a slow dimming long before replacement is needed.",
  },
  {
    q: "Are they safe for indoor use?",
    a: "Yes, LED neon runs cool to the touch — unlike traditional glass neon which uses high-voltage gas and generates heat. There is no glass to break, no toxic gas, and no fire risk. LED neon signs are UL-listed and safe for homes, offices, restaurants, and any indoor environment including around children and pets.",
  },
  {
    q: "What colors are available?",
    a: "We offer the full RGB spectrum including warm white, cool white, ice blue, red, pink, purple, green, yellow, orange, and more. Color-changing RGB options are available with remote control, allowing you to switch between colors or set dynamic lighting modes to match any occasion.",
  },
  {
    q: "Can I customize the font and size?",
    a: "Absolutely. We offer unlimited font options — from elegant scripts and bold block letters to custom hand-drawn lettering. Sizes range from 12 inches for small accent pieces to 6+ feet for large wall installations. Logos, symbols, and custom shapes are also available.",
  },
  {
    q: "How are they powered?",
    a: "All signs plug into a standard wall outlet using an included 12V DC adapter. The low-voltage design keeps energy consumption minimal. Some smaller models offer optional battery packs for portable use at events. A dimmer switch is included with every sign for brightness control.",
  },
  {
    q: "Do you ship nationwide?",
    a: "Yes, we ship across the United States in custom protective packaging designed to prevent damage during transit. Each sign is individually tested before shipping. We also offer professional installation services throughout Virginia and the greater DMV area for customers who prefer hands-free setup.",
  },
];

/* ─── PAGE ─── */

export default async function CustomNeonSignsPage() {
  const imgs = await getPageImages("custom-neon-signs");
  return (
    <main style={{ background: BLACK }}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Custom Neon Signs", path: "/custom-neon-signs" },
        ]}
      />
      <ServiceJsonLd
        name="Custom LED Neon Signs"
        serviceType="Custom Neon Signs"
        description="Custom LED neon signs for businesses, weddings, events, and home decor. Energy-efficient, long-lasting, and fully customizable. Serving Virginia, Maryland, and Washington DC."
        path="/custom-neon-signs"
        offers={[
          "Business LED Neon Signs",
          "Wedding & Event Neon Signs",
          "Home Decor LED Neon",
          "Custom Logo Neon",
          "Quote & Phrase Neon Signs",
        ]}
      />
      <FaqJsonLd items={FAQ} />

      {/* ── 1. HERO ── */}
      <Section style={{ padding: 0 }}>
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
            src={imgs.hero || IMG.neonHero}
            alt="Good Vibes Only neon sign glowing orange on dark brick wall in cocktail bar"
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
              Custom Neon Signs
            </h1>
          </div>
        </div>
      </Section>

      {/* ── 2. INTRO 50/50 ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Before/after slider */}
          <BeforeAfterSlider
            beforeSrc={imgs.before || IMG.neonBefore}
            afterSrc={imgs.after || IMG.neonAfter}
            beforeAlt="Dark staircase wall in boutique hotel — plain plaster, no signage"
            afterAlt="Same staircase with THIS WAY UP vertical LED neon sign glowing warm orange"
            width={600}
            height={450}
            startPosition={5}
          />

          {/* Copy */}
          <div>
            <p style={sectionLabel}>Overview</p>
            <hr style={thinSeparator} />
            <h2 style={{ ...h2Style, marginTop: "20px" }}>
              LED Neon Signs Built for Your Vision
            </h2>
            <div style={bodyStyle}>
              <p style={{ margin: "0 0 16px" }}>
                Custom LED neon signs combine the iconic glow of classic neon with
                modern LED technology — delivering a safer, more energy-efficient,
                and fully customizable signage solution for businesses, events, and
                personal spaces.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                At Printec Virginia LLC, we design and fabricate custom LED neon signs for
                clients across Virginia. Every sign is hand-bent from premium LED
                neon flex strip, mounted on laser-cut clear acrylic backing, and
                wired with a low-voltage adapter for plug-and-play simplicity.
              </p>
              <p style={{ margin: 0 }}>
                Whether you need a bold storefront sign, an elegant wedding
                backdrop, a branded photo wall for your business, or a personalized
                piece of neon art for your home, our team creates custom signs that
                match your exact specifications in color, font, size, and shape.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 3. FEATURES / BENEFITS ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Benefits</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Why Choose LED Neon Signs
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "20px",
              marginTop: "48px",
            }}
          >
            {FEATURES.map((item) => (
              <div
                key={item.title}
                style={{
                  ...card,
                  padding: "24px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "4px",
                    background: "#0a0a0a",
                    border: `1px solid ${DARK2}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={18} color={ORANGE} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 6px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ ...bodyStyle, fontSize: "14px", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 4. WHO IT'S FOR ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Who It&apos;s For</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Neon Signs for Every Space
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "20px",
              marginTop: "48px",
            }}
          >
            {WHO_ITS_FOR.map((item) => (
              <div key={item.title} style={card}>
                <div style={{ padding: "28px 24px" }}>
                  <item.icon size={20} color={ORANGE} style={{ marginBottom: "14px" }} />
                  <h3
                    style={{
                      fontSize: "15px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 10px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ ...bodyStyle, fontSize: "14px", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 5. PROCESS ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Process</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            How It Works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {PROCESS.map((item) => (
              <div key={item.title} style={card}>
                <div style={{ padding: "28px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: 700,
                        color: ORANGE,
                        letterSpacing: "2px",
                      }}
                    >
                      {item.step}
                    </span>
                    <item.icon size={18} color={ORANGE} />
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
                    {item.title}
                  </h3>
                  <p style={{ ...bodyStyle, fontSize: "14px", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 6. FAQ ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>FAQ</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Common Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0px", marginTop: "48px" }}>
            {FAQ.map((item) => (
              <div
                key={item.q}
                style={{
                  padding: "28px 0",
                  borderBottom: `1px solid ${DARK1}`,
                }}
              >
                <h3
                  style={{
                    fontSize: "15px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    color: WHITE,
                    margin: "0 0 12px",
                    lineHeight: 1.5,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <ChevronRight size={16} color={ORANGE} style={{ flexShrink: 0, marginTop: "3px" }} />
                  {item.q}
                </h3>
                <p
                  style={{
                    ...bodyStyle,
                    fontSize: "14px",
                    margin: 0,
                    paddingLeft: "28px",
                    color: `${WHITE}99`,
                  }}
                >
                  {item.a}
                </p>
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
