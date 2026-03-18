"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryGridBlock } from "@/components/ui/gallery-grid-block-shadcnui";
import { EtheralShadow } from "@/components/ui/etheral-shadow";

/* ─── BRAND CONSTANTS (matching Printec logo spectrum) ─── */
const ORANGE = "#F7941D";
const RED = "#E53935";
const YELLOW = "#FFD600";
const MAGENTA = "#9B2D8E";
const TEAL = "#00897B";
const EMERALD = "#00695C";
const LIME = "#8BC34A";
const BLACK = "#0C0C0C";
const DARK1 = "#161616";
const DARK2 = "#222222";
const WHITE = "#FFFFFF";
const SPECTRUM = `linear-gradient(90deg, ${YELLOW}, ${ORANGE}, ${RED}, ${MAGENTA}, ${TEAL}, ${LIME})`;
const BRAND_COLORS = [YELLOW, ORANGE, RED, MAGENTA, TEAL, EMERALD, LIME];

/* ─── SVG NOISE TEXTURE DATA URL ─── */
const NOISE_SVG = `data:image/svg+xml;base64,${typeof window !== "undefined" ? btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="300" height="300" filter="url(#n)" opacity="0.18"/></svg>`) : ""}`;

/* ─── SERVICES DATA ─── */
const SERVICES = [
  { num: "01", title: "OUTDOOR LED CHANNEL", desc: "High-impact illuminated channel letters that demand attention day and night." },
  { num: "02", title: "SIGNMAKERS", desc: "Custom signage crafted with precision — from storefronts to monument signs." },
  { num: "03", title: "FOOD TRUCK WRAP", desc: "Full vehicle wraps that turn your food truck into a rolling billboard." },
  { num: "04", title: "FOOD TRAILER WRAP", desc: "Bold, durable trailer wraps built to withstand the road and the elements." },
  { num: "05", title: "WINDOW WRAP", desc: "Transform glass into prime advertising real estate with vivid window graphics." },
  { num: "06", title: "WATERPROOF MENUS", desc: "Tough, weather-resistant menus that look fresh no matter what." },
  { num: "07", title: "CUSTOM UNIFORMS", desc: "Branded apparel that unifies your crew and amplifies your identity." },
  { num: "08", title: "SPORTING WEARS", desc: "Performance gear with bold custom prints for teams and athletes." },
  { num: "09", title: "DIGITAL SIGNAGE", desc: "Dynamic digital displays that keep your messaging current and engaging." },
  { num: "10", title: "CONTENT MARKETING", desc: "Strategic content that builds your brand story and drives real engagement." },
  { num: "11", title: "GRAPHIC DESIGN", desc: "Raw, impactful design work — logos, layouts, campaigns, and beyond." },
];

/* ─── PORTFOLIO DATA ─── */
const PORTFOLIO_CATEGORIES = ["ALL", "VEHICLE WRAPS", "SIGNAGE", "PRINTING", "APPAREL", "DIGITAL"];

const PORTFOLIO = [
  { title: "TACO KING TRUCK", category: "VEHICLE WRAPS", filter: "VEHICLE WRAPS", angle: 12 },
  { title: "BBQ NATION TRAILER", category: "VEHICLE WRAPS", filter: "VEHICLE WRAPS", angle: -8 },
  { title: "NEON DISTRICT SIGN", category: "LED CHANNEL", filter: "SIGNAGE", angle: 5 },
  { title: "DOWNTOWN STOREFRONT", category: "MONUMENT SIGN", filter: "SIGNAGE", angle: -15 },
  { title: "APEX GYM UNIFORMS", category: "CUSTOM UNIFORMS", filter: "APPAREL", angle: 20 },
  { title: "LOCAL LEAGUE JERSEYS", category: "SPORTING WEAR", filter: "APPAREL", angle: -5 },
  { title: "LAKESIDE COFFEE WRAP", category: "WINDOW WRAP", filter: "PRINTING", angle: 10 },
  { title: "WATERPROOF MENU SET", category: "MENU DESIGN", filter: "PRINTING", angle: -12 },
  { title: "SOCIAL MEDIA CAMPAIGN", category: "CONTENT MARKETING", filter: "DIGITAL", angle: 7 },
  { title: "DIGITAL MENU BOARD", category: "DIGITAL SIGNAGE", filter: "DIGITAL", angle: -9 },
  { title: "FLEET WRAP — 5 VANS", category: "VEHICLE WRAPS", filter: "VEHICLE WRAPS", angle: 15 },
  { title: "BREWERY WINDOW ART", category: "WINDOW WRAP", filter: "PRINTING", angle: -6 },
];


/* ─── STATS DATA ─── */
const STATS = [
  { value: "25+", label: "YEARS IN THE GAME" },
  { value: "46%", label: "DESIGN DRIVEN" },
  { value: "70%", label: "SERVICE FOCUSED" },
  { value: "59%", label: "REPAIR SPECIALISTS" },
];

/* ─── NAV LINKS ─── */
const NAV_LINKS = ["ABOUT", "SERVICES", "WORK", "CONTACT"];

/* ─── ANIMATION VARIANTS (dramatic side entrances) ─── */
const snapUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const snapLeft = {
  hidden: { opacity: 0, x: -120 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const snapRight = {
  hidden: { opacity: 0, x: 120 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const snapScale = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const slideRotateLeft = {
  hidden: { opacity: 0, x: -100, rotate: -5 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const slideRotateRight = {
  hidden: { opacity: 0, x: 100, rotate: 5 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const flipUp = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* ─── TAPE STRIP COMPONENT ─── */
function TapeStrip({ rotation = -1.5, className = "" }: { rotation?: number; className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden py-2 ${className}`}>
      <div
        style={{
          background: SPECTRUM,
          height: "4px",
          width: "110%",
          marginLeft: "-5%",
          transform: `rotate(${rotation}deg)`,
        }}
      />
    </div>
  );
}

/* ─── SECTION WRAPPER — CSS-only reveal ─── */
function Section({
  children,
  id,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`section-reveal ${visible ? "section-visible" : ""} ${className}`}
      style={{ position: "relative", ...style }}
    >
      {children}
    </section>
  );
}

/* ─── SKEWED BUTTON ─── */
function SkewedButton({
  children,
  href,
  onClick,
  filled = true,
  style = {},
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  filled?: boolean;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    display: "inline-block",
    padding: "14px 32px",
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    fontWeight: 900,
    fontSize: "14px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    transform: "skewX(-6deg)",
    border: filled ? "none" : `2px solid ${TEAL}`,
    background: filled ? SPECTRUM : "transparent",
    color: filled ? WHITE : TEAL,
    cursor: "pointer",
    transition: "all 0.2s ease",
    ...style,
  };
  if (href) {
    return (
      <a href={href} style={base}>
        <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>{children}</span>
      </a>
    );
  }
  return (
    <button onClick={onClick} style={base}>
      <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>{children}</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── MAIN PAGE COMPONENT ─── */
/* ═══════════════════════════════════════════════════════ */
export default function PrintecStreetPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Reset scroll on mount so animations retrigger after refresh
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);


  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div
      style={{
        background: BLACK,
        color: WHITE,
        fontFamily: "'Arial Black', 'Impact', 'Helvetica Neue', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* ─── GRAIN OVERLAY (lightweight CSS only) ─── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.4,
        }}
      />

      {/* ═══════════════════════════════════════════ */}
      {/* ─── 1. NAVIGATION ─── */}
      {/* ═══════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: `${DARK1}ee`,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Spectrum border line — separate element to avoid borderImage layout issues */}
        <div style={{ height: "3px", background: SPECTRUM, width: "100%" }} />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
            overflow: "visible",
          }}
        >
          {/* Logo */}
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/printec-logo-light.png"
              alt="Printec Corp"
              style={{
                height: "48px",
                width: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="nav-desktop">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                style={{
                  background: "none",
                  border: "none",
                  color: WHITE,
                  fontFamily: "'Arial Black', 'Impact', sans-serif",
                  fontWeight: 900,
                  fontSize: "13px",
                  letterSpacing: "2px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
                onMouseLeave={(e) => (e.currentTarget.style.color = WHITE)}
              >
                {link}
              </button>
            ))}
            <SkewedButton href="tel:+17155035444" style={{ padding: "10px 24px", fontSize: "12px" }}>
              CALL NOW
            </SkewedButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <div style={{ width: "28px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  display: "block",
                  height: "3px",
                  background: ORANGE,
                  transition: "all 0.3s",
                  transform: mobileOpen ? "rotate(45deg) translateY(9px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  height: "3px",
                  background: ORANGE,
                  transition: "all 0.3s",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  height: "3px",
                  background: ORANGE,
                  transition: "all 0.3s",
                  transform: mobileOpen ? "rotate(-45deg) translateY(-9px)" : "none",
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ background: DARK1, overflow: "hidden", borderTop: `1px solid ${DARK2}` }}
            >
              <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(link.toLowerCase())}
                    style={{
                      background: "none",
                      border: "none",
                      color: WHITE,
                      fontFamily: "'Arial Black', 'Impact', sans-serif",
                      fontWeight: 900,
                      fontSize: "16px",
                      letterSpacing: "3px",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "8px 0",
                      borderBottom: `1px solid ${DARK2}`,
                    }}
                  >
                    {link}
                  </button>
                ))}
                <SkewedButton href="tel:+17155035444">CALL NOW</SkewedButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════════════════════════════════ */}
      {/* ─── 2. HERO SECTION ─── */}
      {/* ═══════════════════════════════════════════ */}
      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        {/* Etheral Shadow — lazy loaded, pauses when offscreen */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <EtheralShadow
            color="rgba(247, 148, 29, 0.2)"
            animation={{ scale: 30, speed: 20 }}
            noise={{ opacity: 0.3, scale: 1.2 }}
            sizing="fill"
          />
        </div>

        {/* Diagonal Stripes Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              ${DARK1}44 40px,
              ${DARK1}44 42px
            )`,
            zIndex: 1,
          }}
        />

        <div
          className="hero-content"
        >
          <div
            style={{
              position: "relative",
              zIndex: 2,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "120px 24px 80px",
            }}
          >
            {/* Sticker label — slides from left with rotation */}
            <motion.div
              initial={{ opacity: 0, x: -120, rotate: -12 }}
              animate={{ opacity: 1, x: 0, rotate: -3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{
                display: "inline-block",
                background: ORANGE,
                color: BLACK,
                padding: "6px 20px",
                fontWeight: 900,
                fontSize: "12px",
                letterSpacing: "3px",
                transform: "rotate(-3deg) skewX(-4deg)",
                marginBottom: "32px",
              }}
            >
              OSHKOSH, WISCONSIN
            </motion.div>

            {/* Giant Outline Text — each word animates separately */}
            <h1
              style={{
                fontSize: "clamp(48px, 12vw, 160px)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-2px",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -150, skewX: -10 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                style={{ display: "block", WebkitTextStroke: `2px ${WHITE}`, color: "transparent" }}
              >
                DESIGN
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 150, skewX: 10 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                style={{ display: "block", WebkitTextStroke: `2px ${ORANGE}`, color: "transparent" }}
              >
                YOUR
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                style={{ display: "block", WebkitTextStroke: `2px ${WHITE}`, color: "transparent" }}
              >
                PRINT
              </motion.span>
            </h1>

            {/* Subtitle — slides up with the orange highlight popping in */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
              style={{
                marginTop: "32px",
                fontSize: "clamp(14px, 2vw, 20px)",
                fontWeight: 400,
                fontFamily: "Arial, sans-serif",
                letterSpacing: "4px",
                textTransform: "uppercase",
                maxWidth: "600px",
              }}
            >
              WE MAKE YOUR BUSINESS{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
                style={{
                  background: ORANGE,
                  color: BLACK,
                  padding: "2px 10px",
                  fontWeight: 900,
                  display: "inline-block",
                  transform: "skewX(-4deg)",
                }}
              >
                STAND OUT
              </motion.span>
            </motion.p>

            {/* CTA Buttons — staggered entrance from below */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
              style={{ marginTop: "48px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <SkewedButton onClick={() => scrollTo("contact")}>GET A QUOTE</SkewedButton>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <SkewedButton onClick={() => scrollTo("work")} filled={false}>
                  VIEW WORK
                </SkewedButton>
              </motion.div>
            </motion.div>

            {/* Rotating 25+ Badge — CSS spin */}
            <div
              className="badge-spin"
              style={{
                position: "absolute",
                right: "clamp(20px, 8vw, 120px)",
                top: "clamp(100px, 20vh, 200px)",
                width: "clamp(80px, 10vw, 120px)",
                height: "clamp(80px, 10vw, 120px)",
                zIndex: 3,
              }}
            >
              <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
                <circle cx="60" cy="60" r="55" fill="none" stroke={ORANGE} strokeWidth="3" />
                <path
                  id="badge-text-path"
                  d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                  fill="none"
                />
                <text
                  fill={ORANGE}
                  fontSize="10"
                  fontWeight="900"
                  fontFamily="'Arial Black', Impact, sans-serif"
                  letterSpacing="3"
                >
                  <textPath href="#badge-text-path">
                    {"\u2022"} 25+ YEARS {"\u2022"} TRUSTED {"\u2022"} PROVEN {"\u2022"}
                  </textPath>
                </text>
                <text
                  x="60"
                  y="60"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={WHITE}
                  fontSize="28"
                  fontWeight="900"
                  fontFamily="'Arial Black', Impact, sans-serif"
                >
                  25+
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TAPE STRIP ─── */}
      <TapeStrip rotation={-1.2} />

      {/* ═══════════════════════════════════════════ */}
      {/* ─── 3. ABOUT SECTION ─── */}
      {/* ═══════════════════════════════════════════ */}
      <Section
        id="about"
        style={{ padding: "clamp(60px, 10vw, 120px) 24px", maxWidth: "1280px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
          }}
          className="about-grid"
        >
          <div className="reveal-left">
            {/* Sticker tag */}
            <div
              style={{
                display: "inline-block",
                background: ORANGE,
                color: BLACK,
                padding: "4px 14px",
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "2px",
                transform: "rotate(-2deg)",
                marginBottom: "24px",
              }}
            >
              WHO WE ARE
            </div>
            <h2
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 900,
                lineHeight: 1,
                textTransform: "uppercase",
                margin: 0,
                position: "relative",
                display: "inline-block",
              }}
            >
              WE DON&apos;T JUST PRINT
              <span
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "100%",
                  height: "6px",
                  background: ORANGE,
                  transform: "skewX(-8deg)",
                }}
              />
            </h2>
            <h2
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 900,
                lineHeight: 1,
                textTransform: "uppercase",
                margin: "8px 0 0",
                color: ORANGE,
              }}
            >
              WE MAKE AN IMPACT
            </h2>
          </div>

          <div className="reveal-right">
            <p
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.8vw, 18px)",
                lineHeight: 1.8,
                color: "#b0b0b0",
                maxWidth: "600px",
              }}
            >
              For over <strong style={{ color: ORANGE }}>25 years</strong>, Printec Corp has been the go-to print and
              signage powerhouse in Oshkosh, Wisconsin. From food truck wraps that stop traffic to LED channel letters
              that light up the night — we bring your vision to life with raw creativity and precision craftsmanship.
              No fluff. No shortcuts. Just bold work that gets noticed.
            </p>
            <div style={{ marginTop: "32px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {["WRAPS", "SIGNS", "DESIGN", "PRINT"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: `2px solid ${ORANGE}`,
                    padding: "6px 16px",
                    fontWeight: 900,
                    fontSize: "11px",
                    letterSpacing: "2px",
                    transform: "skewX(-4deg)",
                    display: "inline-block",
                    color: ORANGE,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── TAPE STRIP ─── */}
      <TapeStrip rotation={1.0} />

      {/* ═══════════════════════════════════════════ */}
      {/* ─── 4. SERVICES — HORIZONTAL SCROLL ─── */}
      {/* ═══════════════════════════════════════════ */}
      <Section
        id="services"
        style={{ padding: "clamp(60px, 10vw, 120px) 24px 60px", maxWidth: "100%", overflow: "hidden" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Header */}
          <div className="reveal-left" style={{ marginBottom: "48px" }}>
            <div
              style={{
                display: "inline-block",
                background: ORANGE,
                color: BLACK,
                padding: "4px 14px",
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "3px",
                fontFamily: "'Arial Black', Impact, sans-serif",
                transform: "rotate(-2deg) skewX(-4deg)",
                marginBottom: "20px",
              }}
            >
              <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>WHAT WE DO</span>
            </div>
            <h2
              style={{
                fontSize: "clamp(36px, 6vw, 56px)",
                fontWeight: 900,
                lineHeight: 1,
                textTransform: "uppercase",
                margin: 0,
                fontFamily: "'Arial Black', Impact, sans-serif",
              }}
            >
              OUR <span style={{ color: ORANGE }}>SERVICES</span>
            </h2>
          </div>
        </div>

        {/* Scroll wrapper */}
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto" }}>
          {/* Left arrow */}
          <button
            onClick={() => {
              const el = document.getElementById("services-scroll");
              el?.scrollBy({ left: -300, behavior: "smooth" });
            }}
            style={{
              position: "absolute",
              left: "-8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "44px",
              height: "44px",
              background: DARK1,
              border: `2px solid ${DARK2}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: ORANGE,
              transition: "border-color 0.2s",
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => {
              const el = document.getElementById("services-scroll");
              el?.scrollBy({ left: 300, behavior: "smooth" });
            }}
            style={{
              position: "absolute",
              right: "-8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "44px",
              height: "44px",
              background: DARK1,
              border: `2px solid ${DARK2}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: ORANGE,
              transition: "border-color 0.2s",
            }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable cards */}
          <div
            id="services-scroll"
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              padding: "8px 4px 16px",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            className="hide-scrollbar"
          >
            {SERVICES.map((svc, i) => (
                <div
                  key={svc.num}
                  className="service-card-hover"
                  style={{
                    minWidth: "280px",
                    maxWidth: "280px",
                    height: "360px",
                    background: DARK1,
                    padding: "28px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "default",
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                    border: `1px solid ${DARK2}`,
                    borderTop: `4px solid ${ORANGE}`,
                    transition: "transform 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  {/* Content */}
                  <div style={{ position: "relative", zIndex: 2, marginTop: "8px" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 900,
                        letterSpacing: "3px",
                        color: ORANGE,
                        marginBottom: "20px",
                        fontFamily: "'Arial Black', Impact, sans-serif",
                      }}
                    >
                      {svc.num}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Arial Black', Impact, sans-serif",
                        fontSize: "18px",
                        fontWeight: 900,
                        color: WHITE,
                        lineHeight: 1.2,
                        marginBottom: "14px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {svc.desc}
                    </p>
                  </div>

                  {/* Ghost number */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      right: "10px",
                      fontFamily: "'Arial Black', Impact, sans-serif",
                      fontSize: "120px",
                      fontWeight: 900,
                      lineHeight: 1,
                      color: ORANGE,
                      opacity: 0.05,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {svc.num}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </Section>

      {/* ─── TAPE STRIP ─── */}
      <TapeStrip rotation={1.3} />

      {/* ═══════════════════════════════════════════ */}
      {/* ─── 6. GALLERY GRID WITH LIGHTBOX ─── */}
      {/* ═══════════════════════════════════════════ */}
      <div id="work">
        <GalleryGridBlock />
      </div>

      {/* ─── TAPE STRIP ─── */}
      <TapeStrip rotation={1.0} />

      {/* ═══════════════════════════════════════════ */}
      {/* ─── 7. QUOTE / CTA SECTION ─── */}
      {/* ═══════════════════════════════════════════ */}
      <Section
        style={{
          padding: "clamp(60px, 10vw, 120px) 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Skewed background */}
        <div
          style={{
            position: "absolute",
            inset: "-20px -40px",
            background: DARK1,
            transform: "skewY(-2deg)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div className="reveal-flip">
            <div
              style={{
                display: "inline-block",
                background: ORANGE,
                color: BLACK,
                padding: "12px 40px",
                fontWeight: 900,
                fontSize: "clamp(12px, 2vw, 16px)",
                letterSpacing: "3px",
                transform: "skewX(-6deg)",
                marginBottom: "32px",
              }}
            >
              <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>READY TO GO BIG?</span>
            </div>
          </div>

          <h2
            className="reveal-up"
            style={{
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 900,
              lineHeight: 1.1,
              textTransform: "uppercase",
              margin: "0 0 24px",
            }}
          >
            YOUR BRAND DESERVES
            <br />
            <span style={{ color: ORANGE }}>MORE THAN ORDINARY</span>
          </h2>

          <p
            className="reveal-up"
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "clamp(14px, 1.8vw, 18px)",
              color: "#999",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Whether it&apos;s a full truck wrap, a lit-up storefront, or a complete brand overhaul — we bring the heat.
            Let&apos;s build something that turns heads.
          </p>

          <div className="reveal-up" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <SkewedButton onClick={() => scrollTo("contact")}>START YOUR PROJECT</SkewedButton>
            <SkewedButton href="tel:+17155035444" filled={false}>
              +1 715-503-5444
            </SkewedButton>
          </div>
        </div>
      </Section>

      {/* ─── TAPE STRIP ─── */}
      <TapeStrip rotation={0.8} />

      {/* ═══════════════════════════════════════════ */}
      {/* ─── 8. CONTACT SECTION ─── */}
      {/* ═══════════════════════════════════════════ */}
      <Section
        id="contact"
        style={{ padding: "clamp(60px, 10vw, 120px) 24px", maxWidth: "1280px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(32px, 5vw, 64px)",
          }}
        >
          {/* Left: Info */}
          <div className="reveal-left">
            <div
              style={{
                display: "inline-block",
                background: ORANGE,
                color: BLACK,
                padding: "4px 14px",
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "2px",
                transform: "rotate(-2deg)",
                marginBottom: "20px",
              }}
            >
              GET IN TOUCH
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 900,
                lineHeight: 1.1,
                textTransform: "uppercase",
                margin: "0 0 32px",
              }}
            >
              LET&apos;S <span style={{ color: ORANGE }}>TALK</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { label: "PHONE", value: "+1 715-503-5444", href: "tel:+17155035444" },
                { label: "EMAIL", value: "printecwisconsin@gmail.com", href: "mailto:printecwisconsin@gmail.com" },
                { label: "LOCATION", value: "Oshkosh, Wisconsin", href: null },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: "10px",
                      letterSpacing: "3px",
                      color: ORANGE,
                      marginBottom: "4px",
                    }}
                  >
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: "16px",
                        color: WHITE,
                        textDecoration: "none",
                        borderBottom: `1px solid ${DARK2}`,
                        paddingBottom: "2px",
                        transition: "border-color 0.2s",
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", color: WHITE }}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-right">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {[
                { name: "name", label: "YOUR NAME", type: "text", placeholder: "John Doe" },
                { name: "email", label: "EMAIL", type: "email", placeholder: "john@example.com" },
                { name: "phone", label: "PHONE", type: "tel", placeholder: "+1 (___) ___-____" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 900,
                      fontSize: "10px",
                      letterSpacing: "3px",
                      marginBottom: "8px",
                      color: ORANGE,
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: DARK1,
                      border: `2px solid ${DARK2}`,
                      color: WHITE,
                      fontFamily: "Arial, sans-serif",
                      fontSize: "15px",
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = DARK2)}
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: 900,
                    fontSize: "10px",
                    letterSpacing: "3px",
                    marginBottom: "8px",
                    color: ORANGE,
                  }}
                >
                  PROJECT DETAILS
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: DARK1,
                    border: `2px solid ${DARK2}`,
                    color: WHITE,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "15px",
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = DARK2)}
                />
              </div>

              <SkewedButton onClick={() => {}} style={{ width: "100%", textAlign: "center", marginTop: "8px" }}>
                SEND MESSAGE
              </SkewedButton>
            </form>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════ */}
      {/* ─── 9. FOOTER ─── */}
      {/* ═══════════════════════════════════════════ */}
      <footer style={{ background: DARK1, position: "relative" }}>
        {/* Top gradient bar */}
        <div
          style={{
            height: "4px",
            background: SPECTRUM,
          }}
        />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "clamp(40px, 6vw, 64px) 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
          }}
        >
          {/* Logo & tagline */}
          <div style={{ overflow: "visible" }}>
            <div style={{ marginBottom: "16px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/printec-logo-light.png"
                alt="Printec Corp"
                style={{
                  height: "60px",
                  width: "auto",
                  display: "block",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "13px",
                color: "#666",
                lineHeight: 1.6,
                maxWidth: "280px",
              }}
            >
              Design Your Print. We Make Your Business Stand Out. Proudly serving Oshkosh, Wisconsin for over 25 years.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "3px",
                color: ORANGE,
                marginBottom: "20px",
                marginTop: 0,
              }}
            >
              QUICK LINKS
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#888",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "13px",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "3px",
                color: ORANGE,
                marginBottom: "20px",
                marginTop: 0,
              }}
            >
              TOP SERVICES
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Food Truck Wraps", "LED Channel Signs", "Window Wraps", "Custom Uniforms", "Graphic Design"].map(
                (svc) => (
                  <span key={svc} style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#888" }}>
                    {svc}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "3px",
                color: ORANGE,
                marginBottom: "20px",
                marginTop: 0,
              }}
            >
              CONTACT
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href="tel:+17155035444"
                style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#888", textDecoration: "none" }}
              >
                +1 715-503-5444
              </a>
              <a
                href="mailto:printecwisconsin@gmail.com"
                style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#888", textDecoration: "none" }}
              >
                printecwisconsin@gmail.com
              </a>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#888" }}>
                Oshkosh, Wisconsin
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: `1px solid ${DARK2}`,
            padding: "20px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "12px",
              color: "#555",
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} Printec Corp. All rights reserved. Oshkosh, WI.
          </p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════ */}
      {/* ─── RESPONSIVE STYLES ─── */}
      {/* ═══════════════════════════════════════════ */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          background: ${BLACK};
          overflow-x: hidden;
        }
        ::selection {
          background: ${ORANGE};
          color: ${BLACK};
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${BLACK};
        }
        ::-webkit-scrollbar-thumb {
          background: ${TEAL};
          border-radius: 0;
        }

        /* CSS reveal animations — replaces framer-motion variants */
        .section-reveal {
          opacity: 1;
        }
        .section-reveal .reveal-up,
        .section-reveal .reveal-left,
        .section-reveal .reveal-right,
        .section-reveal .reveal-flip,
        .section-reveal .reveal-scale {
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .section-reveal .reveal-up { transform: translateY(60px); }
        .section-reveal .reveal-left { transform: translateX(-100px) rotate(-3deg); }
        .section-reveal .reveal-right { transform: translateX(100px) rotate(3deg); }
        .section-reveal .reveal-flip { transform: translateY(40px) perspective(600px) rotateX(10deg); }
        .section-reveal .reveal-scale { transform: scale(0.85); }

        .section-visible .reveal-up,
        .section-visible .reveal-left,
        .section-visible .reveal-right,
        .section-visible .reveal-flip,
        .section-visible .reveal-scale {
          opacity: 1;
          transform: none;
        }
        /* Stagger children */
        .section-visible .reveal-up:nth-child(2) { transition-delay: 0.1s; }
        .section-visible .reveal-up:nth-child(3) { transition-delay: 0.2s; }
        .section-visible .reveal-up:nth-child(4) { transition-delay: 0.3s; }
        .section-visible .reveal-left { transition-delay: 0.05s; }
        .section-visible .reveal-right { transition-delay: 0.15s; }

        /* Gallery card hover — overlay + zoom on parent hover */
        .gallery-card:hover {
          border-color: ${ORANGE} !important;
          box-shadow: 0 0 20px rgba(247,148,29,0.15) !important;
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.08) !important;
        }

        /* Service card hover */
        .service-card-hover {
          transition: transform 0.3s ease, border-color 0.3s ease !important;
        }
        .service-card-hover:hover {
          transform: translateY(-8px) !important;
          border-color: ${ORANGE} !important;
        }

        /* Badge spin */
        @keyframes badgeSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .badge-spin {
          animation: badgeSpin 20s linear infinite;
        }

        /* Hide scrollbar on services carousel */
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }

        /* Nav responsive */
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-btn {
            display: block !important;
          }
          .portfolio-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 769px) {
          .nav-mobile-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
