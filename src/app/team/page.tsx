import { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import {
  ORANGE,
  BLACK,
  WHITE,
} from "@/lib/constants";
import {
  Linkedin,
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

const LEADERSHIP = [
  {
    name: "Rashid Ahmed",
    role: "Founder & CEO",
    bio: "A decade in the signage industry. Rashid founded Printec Corp with a vision to deliver bold, high-quality graphics that help businesses stand out. He oversees every major project personally.",
    email: "rashid@printeccorp.com",
    linkedin: "#",
  },
  {
    name: "Sarah Mitchell",
    role: "Creative Director",
    bio: "Former agency designer with 15 years of brand identity experience. Sarah leads the design team and ensures every project meets the highest creative standards.",
    email: "sarah@printeccorp.com",
    linkedin: "#",
  },
  {
    name: "James Rivera",
    role: "Operations Manager",
    bio: "Manages production, installation scheduling, and quality control. James ensures projects are delivered on time and exceed client expectations every time.",
    email: "james@printeccorp.com",
    linkedin: "#",
  },
];

const TEAM_MEMBERS = [
  { name: "Michael Chen", role: "Lead Installer", specialty: "Vehicle Wraps & Fleet Graphics" },
  { name: "Angela Torres", role: "Senior Designer", specialty: "Channel Letters & 3D Signage" },
  { name: "David Park", role: "Production Manager", specialty: "Large Format & Digital Printing" },
  { name: "Lisa Nguyen", role: "Project Coordinator", specialty: "Client Relations & Scheduling" },
  { name: "Marcus Johnson", role: "Installation Technician", specialty: "Window & Wall Wraps" },
  { name: "Priya Sharma", role: "Graphic Designer", specialty: "Floor Graphics & Event Branding" },
  { name: "Carlos Mendez", role: "Fabrication Specialist", specialty: "LED & Channel Letter Assembly" },
  { name: "Emma Wilson", role: "Sales Representative", specialty: "Consultations & Client Growth" },
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
            width: "100%",
            aspectRatio: "1920 / 400",
            background: "#111",
            border: "1px solid #222",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.2)",
            fontSize: "13px",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "2px",
          }}
        >
          TEAM PHOTO — 1920 × 400
        </div>
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
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
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
                {/* Photo placeholder */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    background: "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.15)",
                    fontSize: "12px",
                    fontFamily: "Arial, sans-serif",
                    letterSpacing: "2px",
                  }}
                >
                  PHOTO — 400 × 300
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
                      href={person.linkedin}
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
                      <Linkedin size={14} />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <hr style={{ border: "none", borderTop: "1px solid #161616", margin: 0 }} />

      {/* ── TEAM GRID ── */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...LABEL, textAlign: "center" }}>
            <Users size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
            The Crew
          </p>
          <h2 style={{ ...H2, textAlign: "center", marginBottom: "60px" }}>
            Our Talented Team
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  overflow: "hidden",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                className="card-subtle"
              >
                {/* Photo placeholder */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    background: "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.12)",
                    fontSize: "11px",
                    fontFamily: "Arial, sans-serif",
                    letterSpacing: "2px",
                  }}
                >
                  PHOTO
                </div>

                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: WHITE,
                      margin: "0 0 4px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: ORANGE,
                      margin: "0 0 8px",
                      fontFamily: "Arial, sans-serif",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      margin: 0,
                      fontFamily: "Arial, sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    {member.specialty}
                  </p>
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
