import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import {
  ORANGE,
  BLACK,
  WHITE,
  IMG,
} from "@/lib/constants";
import {
  Phone,
  Mail,
  Award,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the Printec Corp team — experienced designers, installers, and project managers dedicated to delivering exceptional signage, wraps, and graphics in Virginia.",
  keywords: [
    "Printec Corp team",
    "sign company staff",
    "signage designers Virginia",
    "wrap installers",
    "sign fabrication experts",
    "Virginia sign professionals",
  ],
  openGraph: {
    title: "Our Team | Printec Corp",
    description:
      "Meet the Printec Corp team — experienced designers, installers, and project managers dedicated to delivering exceptional signage, wraps, and graphics in Virginia.",
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
  margin: "0 0 12px",
  fontFamily: "Arial, sans-serif",
};

const H2: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: 1.25,
  color: WHITE,
  margin: "0 0 20px",
  fontFamily: "Arial, sans-serif",
};

const BODY: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.5)",
  margin: 0,
  fontFamily: "Arial, sans-serif",
};

/* ─── TEAM DATA ─── */

const TEAM_EMAIL = "info@printeccorp.com";
const TEAM_PHONE = "(555) 123-4567";

const LEADERSHIP = [
  {
    name: "Shakila",
    role: "CEO",
    bio: "Shakila leads Printec Corp with a clear vision — delivering bold, high-quality signage and graphics that help businesses and events stand out. Under her leadership, Printec has grown into Virginia's trusted name in custom signage.",
    email: TEAM_EMAIL,
    phone: TEAM_PHONE,
    image: null,
  },
  {
    name: "Shazil Ali",
    role: "Sales Representative",
    bio: "Shazil connects clients with the right signage solutions for their business. From initial consultation to final delivery, he ensures every client gets personalized attention and a seamless experience.",
    email: TEAM_EMAIL,
    phone: TEAM_PHONE,
    image: IMG.teamShazil,
  },
  {
    name: "Azhar Ahmed",
    role: "Sales Representative",
    bio: "Azhar brings a decade of industry knowledge to every client conversation. He specializes in helping businesses choose the right sign type, material, and installation approach for maximum impact.",
    email: TEAM_EMAIL,
    phone: TEAM_PHONE,
    image: IMG.teamAzhar,
  },
  {
    name: "Anton Andersson",
    role: "Sales Representative",
    bio: "Anton helps clients navigate the full range of Printec's services — from custom signage and neon signs to wall wraps and event graphics. His hands-on approach ensures every project is tailored to the client's needs.",
    email: TEAM_EMAIL,
    phone: TEAM_PHONE,
    image: IMG.teamAnton,
  },
  {
    name: "Maria Gonzalez",
    role: "Lead Designer",
    bio: "Maria brings creative vision and precision to every signage project. With a background in graphic design and brand identity, she transforms client ideas into bold, production-ready artwork.",
    email: TEAM_EMAIL,
    phone: TEAM_PHONE,
    image: null,
  },
];

const VALUES = [
  { title: "Craftsmanship", desc: "Every project is treated as a work of art. We don't cut corners — we wrap them." },
  { title: "Reliability", desc: "Deadlines aren't suggestions. We deliver on time, every time, without exception." },
  { title: "Innovation", desc: "From the latest vinyl materials to LED technology, we stay ahead of the industry." },
  { title: "Client First", desc: "Your vision drives everything we do. We listen, design, and deliver to your exact needs." },
];

/* ─── PAGE ─── */

export default function TeamPage() {
  return (
    <main style={{ background: BLACK }}>
      {/* ── HERO ── */}
      <Section style={{ padding: 0 }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "48px 24px 60px",
            textAlign: "center",
          }}
        >
          <p style={LABEL}>Our Team</p>
          <h1
            style={{
              fontSize: "36px",
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontWeight: 900,
              color: WHITE,
              margin: "0 0 16px",
            }}
          >
            The People Behind Printec
          </h1>
          <p style={{ ...BODY, maxWidth: "480px", margin: "0 auto" }}>
            A team of designers, installers, and project managers who are passionate
            about making every project — from weddings to storefronts — impossible to ignore.
          </p>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: ORANGE,
              margin: "32px auto 0",
            }}
          />
        </div>
      </Section>

      <hr style={{ border: "none", borderTop: "1px solid #161616", margin: 0 }} />

      {/* ── LEADERSHIP ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...LABEL, textAlign: "center" }}>Leadership</p>
          <h2 style={{ ...H2, textAlign: "center", marginBottom: "60px" }}>
            Meet Our Leaders
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              maxWidth: "1200px",
              margin: "0 auto",
              gap: "24px",
            }}
          >
            {LEADERSHIP.map((person) => (
              <div
                key={person.name}
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  overflow: "hidden",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                className="card-subtle"
              >
                {/* Photo */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3 / 4",
                    position: "relative",
                    overflow: "hidden",
                    background: "#0a0a0a",
                  }}
                >
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={`${person.name} — ${person.role} at Printec Corp`}
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      style={{ objectFit: "cover", objectPosition: "center 20%" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.15)",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif",
                        letterSpacing: "2px",
                      }}
                    >
                      PHOTO
                    </div>
                  )}
                </div>

                <div style={{ padding: "24px" }}>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: ORANGE,
                      margin: "0 0 8px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {person.role}
                  </p>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 12px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {person.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.5)",
                      margin: "0 0 20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {person.bio}
                  </p>

                  {/* Contact links */}
                  <div style={{ display: "flex", gap: "12px" }}>
                    <a
                      href={`mailto:${person.email}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        fontFamily: "Arial, sans-serif",
                        transition: "color 0.2s",
                      }}
                      className="team-link"
                    >
                      <Mail size={14} />
                      Email
                    </a>
                    <a
                      href={`tel:${person.phone?.replace(/[^+\d]/g, "")}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        fontFamily: "Arial, sans-serif",
                        transition: "color 0.2s",
                      }}
                      className="team-link"
                    >
                      <Phone size={14} />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <hr style={{ border: "none", borderTop: "1px solid #161616", margin: 0 }} />

      {/* ── VALUES ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p style={{ ...LABEL, textAlign: "center" }}>
            <Award size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
            What Drives Us
          </p>
          <h2 style={{ ...H2, textAlign: "center", marginBottom: "60px" }}>
            Our Values
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  padding: "28px 24px",
                  transition: "border-color 0.3s",
                }}
                className="card-subtle"
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: ORANGE,
                    fontFamily: "Arial, sans-serif",
                    opacity: 0.3,
                  }}
                >
                  0{i + 1}
                </span>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: WHITE,
                    margin: "12px 0 8px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <CtaBanner />
    </main>
  );
}
