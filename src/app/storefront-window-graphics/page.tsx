import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SkewedButton } from "@/components/shared/skewed-button";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import {
  Maximize,
  Scissors,
  Snowflake,
  Calendar,
  UtensilsCrossed,
  Store,
  Home,
  Stethoscope,
  Dumbbell,
  Users,
  TrendingUp,
  Eye,
  DollarSign,
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
  title: "Storefront Window Graphics & Decals | Business Window Signs",
  description:
    "Professional storefront window graphics and decals that drive foot traffic. Custom window signs, vinyl lettering, and full window wraps for businesses in Virginia.",
  keywords: [
    "storefront window graphics",
    "window decals business",
    "window signs Virginia",
    "vinyl window lettering",
    "storefront branding",
    "business window wraps",
    "commercial window graphics",
  ],
  openGraph: {
    title: "Storefront Window Graphics & Decals | Printec Virginia LLC",
    description:
      "Professional storefront window graphics and decals that drive foot traffic. Custom window signs, vinyl lettering, and full window wraps for businesses in Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
  },
};

/* ─── DATA ─── */

const SOLUTIONS = [
  {
    title: "Full Window Wraps",
    desc: "Complete coverage storefront window graphics that transform your entire glass facade into a high-impact billboard. Perforated vinyl lets natural light through from the inside while displaying vivid, photo-quality graphics to every passerby outside. Ideal for maximizing advertising space on large storefront windows.",
    icon: Maximize,
    img: "Full Window Wrap Example",
  },
  {
    title: "Cut Vinyl Lettering",
    desc: "Clean, professional vinyl letters and logos applied directly to your storefront glass. The most cost-effective way to display your business name, hours, phone number, and services. Available in any color and dozens of premium fonts for a polished, permanent look.",
    icon: Scissors,
    img: "Cut Vinyl Lettering",
  },
  {
    title: "Frosted Window Films",
    desc: "Elegant frosted or etched-glass effect films that add privacy while reinforcing your brand. Popular for offices, medical practices, salons, and any business that wants a sophisticated look without blocking all natural light. Custom patterns and logos available.",
    icon: Snowflake,
    img: "Frosted Glass Film",
  },
  {
    title: "Seasonal & Promotional",
    desc: "Short-term storefront window decals for sales events, holidays, grand openings, and product launches. Our removable promotional window graphics install in minutes and peel off cleanly, letting you refresh your storefront messaging as often as your marketing calendar demands.",
    icon: Calendar,
    img: "Seasonal Promotion Graphics",
  },
];

const INDUSTRIES = [
  { name: "Restaurants", desc: "Menu highlights, daily specials, and mouth-watering food photography on your front windows.", icon: UtensilsCrossed, img: "/images/industry-restaurant.webp" },
  { name: "Retail", desc: "Sale promotions, brand imagery, and product showcases that draw shoppers through your door.", icon: Store, img: "/images/industry-retail.webp" },
  { name: "Salons & Spas", desc: "Elegant frosted films and service menus that create an inviting, premium atmosphere.", icon: Scissors, img: null },
  { name: "Real Estate", desc: "Property listings, agent branding, and office privacy films for professional offices.", icon: Home, img: "/images/industry-realestate.webp" },
  { name: "Medical & Dental", desc: "Privacy films, service lists, and professional branding that build patient trust.", icon: Stethoscope, img: "/images/industry-medical.webp" },
  { name: "Fitness & Gyms", desc: "Motivational graphics, class schedules, and high-energy brand imagery that energize your space.", icon: Dumbbell, img: "/images/industry-gym.webp" },
];

const BEFORE_AFTER = [
  {
    before: "Plain, unmarked glass that blends into the streetscape. Pedestrians walk past without a second glance. Zero brand presence. Zero messaging. Your storefront is invisible.",
    after: "Bold, branded storefront window graphics that stop foot traffic dead. Your business name, services, and personality are on full display. Every window is working for you 24/7.",
  },
  {
    before: "Faded, peeling vinyl from years ago that makes your business look outdated and neglected. Customers assume you are closed or do not care about quality.",
    after: "Fresh, professionally installed window decals with vivid colors and crisp text. Your storefront looks modern, active, and trustworthy — exactly the first impression you need.",
  },
];

const ROI_STATS = [
  { stat: "76%", desc: "of consumers have entered a store they never visited before based solely on its signage and window graphics.", icon: Users },
  { stat: "50%", desc: "average increase in foot traffic reported by businesses after installing professional storefront window graphics.", icon: TrendingUp },
  { stat: "85%", desc: "of your customers live or work within a 5-mile radius — storefront window decals reach them every single day.", icon: Eye },
  { stat: "$0.01", desc: "effective cost per impression. Storefront window graphics deliver the lowest cost-per-view of any advertising medium.", icon: DollarSign },
];

const FAQS = [
  {
    q: "How long do storefront window graphics last?",
    a: "Professional storefront window graphics typically last 3-7 years depending on sun exposure, material quality, and whether they are installed on interior or exterior surfaces. Our premium vinyl and UV-resistant laminates are rated for maximum outdoor durability.",
  },
  {
    q: "Will window graphics block natural light?",
    a: "It depends on the product. Perforated vinyl window wraps allow up to 50% of natural light through from the inside while appearing opaque from outside. Frosted films reduce glare while maintaining ambient light. Cut vinyl letters have minimal impact on light.",
  },
  {
    q: "Can window graphics be removed without damage?",
    a: "Yes. All of our storefront window graphics are designed for clean removal. Vinyl lettering, perforated wraps, and frosted films peel away without leaving residue or damaging glass surfaces. This makes seasonal and promotional graphics especially practical.",
  },
  {
    q: "How much do storefront window graphics cost?",
    a: "Pricing varies based on size, material, and complexity. Simple cut vinyl lettering starts around $150, while full window wraps for a standard storefront typically range from $500 to $2,500. Contact us for a free estimate tailored to your specific windows and goals.",
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

export default function StorefrontWindowGraphicsPage() {
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
        <div style={{ width: "100%", maxWidth: "900px", marginBottom: "48px" }}>
          <BeforeAfterSlider
            beforeSrc="/images/storefront-before.webp"
            afterSrc="/images/storefront-after.webp"
            beforeAlt="Plain storefront with clear glass windows"
            afterAlt="Storefront with professional Urban Essentials window graphics"
          />
        </div>

        <div style={label}>BUSINESS</div>

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
          Storefront Window Graphics
        </h1>

        <p
          style={{
            ...body,
            color: `${WHITE}88`,
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          Turn every passerby into a customer with professional window
          graphics designed and installed by Printec Virginia LLC.
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

      {/* ── 2. INTRO ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>
          <div style={label}>FREE ADVERTISING</div>
          <hr style={separator} />

          <h2 style={{ ...h2Style, marginTop: "24px" }}>
            Your Storefront Windows Are Free Advertising — Use Them
          </h2>

          <div style={body}>
            <p style={{ margin: "0 0 20px" }}>
              Your storefront windows are the single most valuable advertising asset
              your business owns — and most businesses leave them completely blank.
              Every square foot of bare glass is a missed opportunity to attract new
              customers, communicate your brand, and drive sales. Professional
              storefront window graphics transform that wasted space into a 24/7
              marketing machine that works while you sleep.
            </p>
            <p style={{ margin: "0 0 20px" }}>
              Storefront window decals and graphics are not just about aesthetics.
              Research consistently shows that effective window signage is the number
              one factor in a consumer&apos;s decision to enter a business for the
              first time. In an era of rising digital ad costs, storefront window
              graphics deliver the highest return on investment of any physical
              marketing medium — with zero recurring fees and years of durability.
            </p>
            <p style={{ margin: 0 }}>
              At Printec Virginia LLC, we design and install custom storefront window graphics
              for businesses across Virginia. From full window wraps to elegant
              frosted films, from{" "}
              <Link href="/window-wraps" style={{ color: ORANGE, textDecoration: "underline" }}>
                vinyl window lettering
              </Link>{" "}
              to seasonal promotional decals — we help you make every window count.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 3. SOLUTIONS — 4 CARDS WITH IMAGES ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>SOLUTIONS</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Storefront Window Graphic Options
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "20px",
            }}
          >
            {SOLUTIONS.map((sol) => {
              const Icon = sol.icon;
              return (
                <div key={sol.title} style={card}>
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
                    {sol.img}
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
                      {sol.title}
                    </h3>
                  </div>

                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}88`, margin: 0 }}>
                    {sol.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 4. INDUSTRIES — 6 CARDS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>INDUSTRIES</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Window Graphics for Every Business
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "20px",
            }}
          >
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              return (
                <div key={ind.name} style={card}>
                  <div
                    style={{
                      aspectRatio: "16/9",
                      background: `linear-gradient(135deg, #111, ${DARK1})`,
                      borderRadius: "4px",
                      overflow: "hidden",
                      position: "relative",
                      marginBottom: "20px",
                    }}
                  >
                    {ind.img ? (
                      <img
                        src={ind.img}
                        alt={`${ind.name} window graphics`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: `${WHITE}44`, fontFamily: "Arial, sans-serif" }}>
                        {ind.name}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <Icon size={18} color={ORANGE} />
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        fontFamily: "Arial, sans-serif",
                        color: ORANGE,
                        margin: 0,
                      }}
                    >
                      {ind.name}
                    </h3>
                  </div>

                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}88`, margin: 0 }}>
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── 5. BEFORE & AFTER ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>THE DIFFERENCE</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Before &amp; After Storefront Graphics
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {BEFORE_AFTER.map((ba, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
                  gap: "2px",
                }}
              >
                {/* BEFORE */}
                <div
                  style={{
                    background: "#111",
                    borderRadius: "4px 0 0 4px",
                    padding: "32px 28px",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16/9",
                      background: `linear-gradient(135deg, ${DARK1}, ${DARK2})`,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: `${WHITE}33`,
                      fontFamily: "Arial, sans-serif",
                      marginBottom: "16px",
                    }}
                  >
                    Before Photo
                  </div>

                  <div style={{ ...label, color: `${WHITE}55`, marginBottom: "10px" }}>BEFORE</div>
                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}55`, margin: 0 }}>
                    {ba.before}
                  </p>
                </div>

                {/* AFTER */}
                <div
                  style={{
                    background: "#111",
                    borderRadius: "0 4px 4px 0",
                    padding: "32px 28px",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16/9",
                      background: `linear-gradient(135deg, ${DARK1}, ${DARK2})`,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: `${WHITE}44`,
                      fontFamily: "Arial, sans-serif",
                      marginBottom: "16px",
                    }}
                  >
                    After Photo
                  </div>

                  <div style={{ ...label, marginBottom: "10px" }}>AFTER</div>
                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}aa`, margin: 0 }}>
                    {ba.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 6. ROI STATS ── */}
      <Section style={{ background: BLACK, padding: "100px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ ...label, textAlign: "center" }}>ROI</div>
            <hr style={{ ...separator, maxWidth: "60px", margin: "0 auto 24px" }} />
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              The Numbers Do Not Lie
            </h2>
            <p style={{ ...body, color: `${WHITE}88`, maxWidth: "600px", margin: "0 auto" }}>
              Storefront window graphics deliver measurable returns that outperform
              most traditional and digital advertising channels combined.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "20px",
            }}
          >
            {ROI_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.stat} style={{ ...card, textAlign: "center" }}>
                  <Icon size={24} color={ORANGE} style={{ marginBottom: "16px" }} />
                  <div
                    style={{
                      fontSize: "32px",
                      fontFamily: "'Arial Black', sans-serif",
                      fontWeight: 900,
                      color: ORANGE,
                      lineHeight: 1,
                      marginBottom: "14px",
                    }}
                  >
                    {s.stat}
                  </div>
                  <p style={{ ...body, fontSize: "14px", color: `${WHITE}77`, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <SkewedButton href="/contact">
              GET YOUR FREE ESTIMATE <ArrowRight size={16} style={{ marginLeft: "6px" }} />
            </SkewedButton>
          </div>
        </div>
      </Section>

      {/* ── 7. FAQ — 4 QUESTIONS ── */}
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

      {/* ── 8. CTA ── */}
      <CtaBanner />
    </main>
  );
}
