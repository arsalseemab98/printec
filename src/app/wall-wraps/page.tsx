import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
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
  Building2,
  Store,
  UtensilsCrossed,
  Dumbbell,
  Hotel,
  GraduationCap,
  Layers,
  Shirt,
  Sparkles,
  Star,
  Ruler,
  Palette,
  Printer,
  Wrench,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial Wall Wraps | Vinyl Wall Graphics for Offices & Businesses",
  description:
    "Custom vinyl wall wraps for offices, retail stores, restaurants, and commercial spaces. Durable wall graphics that transform any interior. Serving Virginia.",
  keywords: [
    "wall wraps",
    "vinyl wall graphics",
    "commercial wall wraps",
    "office wall murals",
    "interior wall branding",
    "wall graphics Virginia",
  ],
  openGraph: {
    title: "Commercial Wall Wraps | Printec Corp",
    description:
      "Custom vinyl wall wraps for offices, retail stores, restaurants, and commercial spaces. Durable wall graphics that transform any interior. Serving Virginia.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Corp",
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

const WHO_ITS_FOR = [
  {
    title: "Offices",
    desc: "Reinforce your brand culture with mission statements, core values, and branded graphics in every hallway, conference room, and lobby space.",
    icon: Building2,
  },
  {
    title: "Retail Stores",
    desc: "Guide customers with larger-than-life product imagery, seasonal promotions, and lifestyle graphics that refresh your retail environment instantly.",
    icon: Store,
  },
  {
    title: "Restaurants",
    desc: "Set the mood with custom murals, menu highlights, and immersive themed environments that guests photograph and share on social media.",
    icon: UtensilsCrossed,
  },
  {
    title: "Gyms & Fitness",
    desc: "Motivational quotes, action photography, and bold geometric patterns that energize members the moment they walk through the door.",
    icon: Dumbbell,
  },
  {
    title: "Hotels",
    desc: "Elevate guest experiences with curated wall art, wayfinding graphics, and branded environments that distinguish your property from competitors.",
    icon: Hotel,
  },
  {
    title: "Schools",
    desc: "Celebrate school pride with mascot murals, inspirational messaging, achievement walls, and colorful educational graphics throughout campus.",
    icon: GraduationCap,
  },
];

const MATERIALS = [
  {
    title: "Cast Vinyl",
    desc: "Premium-grade cast vinyl conforms to textured walls and curved surfaces. Best for long-term installations lasting 7 or more years with vibrant color retention.",
    icon: Layers,
  },
  {
    title: "Calendered Vinyl",
    desc: "An economical option ideal for flat, smooth walls and shorter-term applications. Perfect for seasonal promotions, event spaces, and temporary branding campaigns.",
    icon: Shirt,
  },
  {
    title: "Fabric Wall Coverings",
    desc: "Repositionable adhesive-backed fabric wraps with a premium woven texture. Ideal for upscale corporate environments, hotels, and spaces needing a softer finish.",
    icon: Sparkles,
  },
  {
    title: "Specialty Finishes",
    desc: "Matte, gloss, satin, textured, and dry-erase laminates available. We also offer whiteboard and chalkboard finishes that combine function with branding.",
    icon: Star,
  },
];

const PROCESS = [
  { num: "01", title: "Site Survey", desc: "We measure walls, assess textures, and document lighting conditions to plan a flawless installation.", icon: Ruler },
  { num: "02", title: "Design", desc: "Our designers create a custom mockup aligned with your brand guidelines, with unlimited revisions until approved.", icon: Palette },
  { num: "03", title: "Print", desc: "Your approved artwork is printed at up to 1440 DPI on premium vinyl with UV-resistant, eco-solvent inks.", icon: Printer },
  { num: "04", title: "Install", desc: "Our certified crew installs bubble-free wall wraps on-site with clean edges and zero damage to surfaces.", icon: Wrench },
];

const FAQ = [
  {
    q: "How long do vinyl wall wraps last?",
    a: "High-quality cast vinyl wall wraps installed indoors typically last 7 to 10 years without fading, peeling, or cracking. Calendered vinyl is best suited for shorter-term applications of 1 to 3 years. Lifespan depends on direct sunlight exposure, humidity, and surface type.",
  },
  {
    q: "Can wall wraps be applied to textured walls?",
    a: "Yes. Lightly textured walls work well with cast vinyl, which conforms to minor imperfections. Heavily textured surfaces like deep stucco or rough brick may require a primer coat or wall prep. Our team always inspects and preps surfaces before installation.",
  },
  {
    q: "Will removing a wall wrap damage the paint?",
    a: "When professionally removed, our wall wraps leave minimal to no residue and should not damage properly cured paint. We use adhesives formulated for clean removal. If the underlying paint is old or not fully cured, some touch-up may be needed.",
  },
  {
    q: "How much does a commercial wall wrap cost?",
    a: "Pricing depends on wall size, material selection, design complexity, and installation requirements. Most projects range from several hundred dollars for a single accent wall to several thousand for a full-space transformation. Contact us for a free on-site quote.",
  },
  {
    q: "Are wall wraps fire-rated for commercial buildings?",
    a: "Yes. We offer Class A and Class B fire-rated vinyl materials that meet commercial building code requirements. Fire-rated options are essential for office buildings, hotels, restaurants, and schools where code compliance is mandatory.",
  },
];

/* ─── PAGE ─── */

export default function WallWrapsPage() {
  return (
    <main style={{ background: BLACK }}>

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
            src={IMG.wallWrapHero}
            alt="Restaurant with dramatic tropical leaf wall wrap mural in warm orange and dark tones"
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
              Wall Wraps
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
            beforeSrc={IMG.wallBefore}
            afterSrc={IMG.wallAfter}
            beforeAlt="Bar with plain grey wall before vinyl wrap"
            afterAlt="Bar with custom wall wrap mural installed"
            width={600}
            height={450}
          />

          {/* Copy */}
          <div>
            <p style={sectionLabel}>Overview</p>
            <hr style={thinSeparator} />
            <h2 style={{ ...h2Style, marginTop: "20px" }}>
              Vinyl Wall Wraps That Transform Your Space
            </h2>
            <div style={bodyStyle}>
              <p style={{ margin: "0 0 16px" }}>
                Your walls are the largest untapped branding asset in your
                building. A custom vinyl wall wrap converts empty drywall into a
                powerful visual experience that communicates your brand story,
                engages customers, and inspires your team. At Printec Corp, we
                design, print, and install commercial wall wraps for businesses
                of every size across Virginia.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                Whether you need a single branded accent wall in your lobby or a
                full-building interior transformation, our wall graphics are
                printed in photo-realistic quality on premium vinyl and
                professionally installed for a flawless, bubble-free finish.
              </p>
              <p style={{ margin: 0 }}>
                We work with architects, interior designers, property managers,
                and business owners to deliver wall wrap solutions that align
                with your brand guidelines and spatial requirements. Our
                materials are fire-rated, eco-solvent printed, and designed
                for clean removal when it is time for a refresh.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 3. WHO IT'S FOR ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Who It&apos;s For</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Wall Wraps for Every Industry
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {WHO_ITS_FOR.map((item) => (
              <div key={item.title} style={card}>
                {/* Image area */}
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    background: "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...bodyStyle,
                    color: `${WHITE}33`,
                    fontSize: "12px",
                  }}
                >
                  {item.title} — 640x360
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <item.icon size={18} color={ORANGE} />
                    <h3
                      style={{
                        fontSize: "15px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: 700,
                        color: WHITE,
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
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

      {/* ── 4. MATERIALS ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Materials</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Wall Wrap Materials &amp; Finishes
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {MATERIALS.map((mat) => (
              <div key={mat.title} style={card}>
                <div style={{ padding: "28px 24px" }}>
                  <mat.icon size={20} color={ORANGE} style={{ marginBottom: "14px" }} />
                  <h3
                    style={{
                      fontSize: "15px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 10px",
                    }}
                  >
                    {mat.title}
                  </h3>
                  <p style={{ ...bodyStyle, fontSize: "14px", margin: 0 }}>
                    {mat.desc}
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
            How We Deliver Your Wall Wrap
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "32px",
              marginTop: "48px",
            }}
          >
            {PROCESS.map((step) => (
              <div key={step.num} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#111",
                    border: `1px solid ${DARK2}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 700,
                      color: ORANGE,
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    color: WHITE,
                    margin: "0 0 8px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    ...bodyStyle,
                    fontSize: "14px",
                    margin: 0,
                    maxWidth: "260px",
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
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 6. GALLERY ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>Gallery</p>
          <hr style={{ ...thinSeparator, maxWidth: "60px", margin: "0 auto 20px" }} />
          <h2 style={{ ...h2Style, textAlign: "center" }}>
            Recent Wall Wrap Projects
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "20px",
              marginTop: "48px",
            }}
          >
            {[
              "Office Lobby Mural — 600x400",
              "Retail Accent Wall — 600x400",
              "Restaurant Interior — 600x400",
              "Gym Motivational Wall — 600x400",
            ].map((label) => (
              <div
                key={label}
                style={{
                  aspectRatio: "3 / 2",
                  background: "#0a0a0a",
                  borderRadius: "4px",
                  border: `1px solid ${DARK2}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...bodyStyle,
                  color: `${WHITE}33`,
                  fontSize: "12px",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <hr style={thinSeparator} />
      </div>

      {/* ── 7. FAQ ── */}
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

      {/* ── 8. CTA ── */}
      <CtaBanner />
    </main>
  );
}
