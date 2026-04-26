import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/shared/json-ld";
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
  Maximize,
  LayoutPanelLeft,
  ClipboardList,
  Sun,
  RefreshCw,
  ShieldCheck,
  Truck,
  Caravan,
  Coffee,
  UtensilsCrossed,
  Store,
  CalendarDays,
  MessageSquare,
  Palette,
  Printer,
  Wrench,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Food Truck Wraps | Custom Food Truck & Trailer Graphics",
  description:
    "Custom food truck wraps and trailer graphics that turn your mobile kitchen into a rolling billboard. Full wraps, partial wraps, menu boards. Serving Virginia.",
  keywords: [
    "food truck wraps",
    "food truck wrap",
    "food trailer wrap",
    "food truck graphics",
    "custom food truck design",
    "mobile kitchen wrap",
    "food truck vinyl wrap Virginia",
  ],
  openGraph: {
    title: "Food Truck Wraps | Printec Virginia LLC",
    description:
      "Custom food truck wraps and trailer graphics that turn your mobile kitchen into a rolling billboard. Full wraps, partial wraps, menu boards. Serving Virginia.",
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
  {
    title: "Full Coverage Wraps",
    desc: "Bumper-to-bumper coverage for maximum brand impact.",
    icon: Maximize,
  },
  {
    title: "Partial Wraps",
    desc: "Cost-effective branding on key panels — sides, rear, hood.",
    icon: LayoutPanelLeft,
  },
  {
    title: "Menu Board Graphics",
    desc: "Large-format menu displays integrated into the wrap design.",
    icon: ClipboardList,
  },
  {
    title: "Weather & UV Resistant",
    desc: "3M and Avery vinyl rated for 5-7 years of outdoor exposure.",
    icon: Sun,
  },
  {
    title: "Easy to Update",
    desc: "Swap out menu items or seasonal promotions without a full rewrap.",
    icon: RefreshCw,
  },
  {
    title: "Health Code Compliant",
    desc: "Food-safe laminates that meet health department requirements for food service vehicles.",
    icon: ShieldCheck,
  },
];

const WHO_ITS_FOR = [
  {
    title: "Food Trucks",
    desc: "Taco trucks, burger joints, BBQ, pizza, ice cream — any mobile food vendor.",
    icon: Truck,
  },
  {
    title: "Food Trailers",
    desc: "Concession trailers, catering trailers, mobile kitchens.",
    icon: Caravan,
  },
  {
    title: "Coffee & Juice Trucks",
    desc: "Mobile beverage services, cold brew, smoothie trucks.",
    icon: Coffee,
  },
  {
    title: "Catering Companies",
    desc: "Branded delivery vans and catering vehicles.",
    icon: UtensilsCrossed,
  },
  {
    title: "Ghost Kitchens",
    desc: "Mobile extensions of delivery-only restaurants.",
    icon: Store,
  },
  {
    title: "Food Festivals & Pop-ups",
    desc: "Temporary branded wraps for seasonal events and markets.",
    icon: CalendarDays,
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Consultation",
    desc: "Discuss your brand, menu, truck dimensions, and timeline.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Design",
    desc: "Custom mockup with your logo, colors, menu, and contact info.",
    icon: Palette,
  },
  {
    step: "03",
    title: "Print & Laminate",
    desc: "High-resolution print on premium cast vinyl with UV laminate.",
    icon: Printer,
  },
  {
    step: "04",
    title: "Installation",
    desc: "Professional wrap by certified installers — usually 2-3 days.",
    icon: Wrench,
  },
];

const FAQ = [
  {
    q: "How much does a food truck wrap cost?",
    a: "Full wraps typically range from $3,000 to $8,000 depending on truck size, design complexity, and material. Partial wraps start around $1,500.",
  },
  {
    q: "How long does a food truck wrap last?",
    a: "5-7 years with proper care. Our wraps use automotive-grade cast vinyl with UV-protective laminate.",
  },
  {
    q: "Can I wrap a food trailer too?",
    a: "Yes — we wrap trailers, concession stands, and any mobile food service vehicle.",
  },
  {
    q: "Will the wrap damage my truck's paint?",
    a: "No. Professional-grade vinyl actually protects the original paint. Removal is clean with no residue.",
  },
  {
    q: "How long does installation take?",
    a: "Most food truck wraps take 2-3 business days for full coverage. Partial wraps can be done in 1 day.",
  },
  {
    q: "Can I include my menu on the wrap?",
    a: "Absolutely — menu boards, QR codes, social media handles, phone numbers, and business hours are all commonly integrated.",
  },
];

/* ─── PAGE ─── */

export default function FoodTruckWrapsPage() {
  return (
    <main style={{ background: BLACK }}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Food Truck Wraps", path: "/food-truck-wraps" }]} />
      <ServiceJsonLd
        name="Custom Food Truck Wraps"
        serviceType="Food Truck Wraps"
        description="Custom food truck wraps and trailer graphics that turn your mobile kitchen into a rolling billboard. Full wraps, partial wraps, menu boards. Serving Virginia, Maryland, and Washington DC."
        path="/food-truck-wraps"
        offers={[
          "Full Food Truck Wraps",
          "Partial Food Truck Wraps",
          "Trailer Graphics",
          "Menu Boards",
          "Window Lettering",
        ]}
      />

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
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #1a0a00 0%, #0C0C0C 40%, #1a0800 70%, #0C0C0C 100%)",
            }}
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
              Food Truck Wraps
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
            beforeSrc="/images/foodtruck-before.webp"
            afterSrc="/images/foodtruck-after.webp"
            beforeAlt="Plain food truck before vinyl wrap"
            afterAlt="Same food truck with custom branded vinyl wrap"
            width={600}
            height={450}
          />

          {/* Copy */}
          <div>
            <p style={sectionLabel}>Overview</p>
            <hr style={thinSeparator} />
            <h2 style={{ ...h2Style, marginTop: "20px" }}>
              Turn Your Truck Into a Rolling Billboard
            </h2>
            <div style={bodyStyle}>
              <p style={{ margin: "0 0 16px" }}>
                Your food truck is more than a kitchen on wheels — it&apos;s your
                most powerful marketing tool. A custom vinyl wrap transforms your
                vehicle into a head-turning, brand-building machine that attracts
                hungry customers everywhere you park.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                At Printec Virginia LLC, we design and install custom food truck
                wraps for mobile vendors across Virginia. Every wrap is printed
                on premium 3M or Avery cast vinyl with UV-protective laminate,
                engineered to withstand years of sun, rain, and daily use.
              </p>
              <p style={{ margin: 0 }}>
                Whether you&apos;re launching a new food truck, rebranding an
                existing one, or adding menu boards and seasonal graphics, our
                team delivers wraps that look professional, last long, and get
                you noticed.
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
          <p style={{ ...sectionLabel, textAlign: "center" }}>Features</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            What We Offer
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
            Built for Every Mobile Food Business
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
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
