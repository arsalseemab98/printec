"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import { GalleryGridBlock } from "@/components/ui/gallery-grid-block-shadcnui";
import { EtheralShadow } from "@/components/ui/etheral-shadow";
import { SkewedButton } from "@/components/shared/skewed-button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES as PORTFOLIO } from "@/lib/constants";
import { trackEvent } from "@/lib/gtag";

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
  { num: "01", title: "CHANNEL LETTERS & SIGNAGE", desc: "Custom channel letter signs, monument signs, and pylon signs crafted to make you impossible to miss.", href: "/channel-letters-signage" },
  { num: "02", title: "LED CHANNEL LETTERS", desc: "Energy-efficient illuminated signs that shine 24/7 — front-lit, back-lit, and halo options for any space.", href: "/led-channel-letters" },
  { num: "03", title: "WINDOW WRAPS", desc: "Transform storefront glass into prime advertising space with vivid, full-color window graphics.", href: "/window-wraps" },
  { num: "04", title: "STOREFRONT GRAPHICS", desc: "Professional window decals and storefront signage that drive foot traffic and boost curb appeal.", href: "/storefront-window-graphics" },
  { num: "05", title: "WALL WRAPS", desc: "Turn blank walls into bold brand statements for offices, retail stores, restaurants, and gyms.", href: "/wall-wraps" },
  { num: "06", title: "FLOOR WRAPS", desc: "Custom vinyl floor graphics for weddings, corporate events, trade shows, and brand activations.", href: "/dance-floor-wraps" },
  { num: "07", title: "WEDDING FLOOR WRAPS", desc: "Elegant monograms, florals, and photo-realistic floor decals that make your special day unforgettable.", href: "/wedding-floor-wrap" },
  { num: "08", title: "VEHICLE WRAPS", desc: "Full and partial vehicle wraps that turn your fleet into mobile billboards — cars, trucks, vans, and trailers.", href: "/contact" },
  { num: "09", title: "GRAPHIC DESIGN", desc: "Logo design, brand identity, marketing materials, and campaign visuals — from concept to print-ready files.", href: "/contact" },
];

/* ─── PORTFOLIO DATA (imported from constants.ts — single source of truth) ─── */
// PORTFOLIO_CATEGORIES and PORTFOLIO are imported below


/* ─── STATS DATA ─── */
const STATS = [
  { value: "2017", label: "ESTABLISHED" },
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

/* ─── SKEWED BUTTON — imported from shared component ─── */

/* ═══════════════════════════════════════════════════════ */
/* ─── MAIN PAGE COMPONENT ─── */
/* ═══════════════════════════════════════════════════════ */
/* ─── CTA SECTION ANIMATED — typewriter + split reveal ─── */
function CtaSectionAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const typewriterText = "READY TO GO BIG?";

  return (
    <div ref={ref}>
      {/* Typewriter label */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "inline-block",
            background: ORANGE,
            color: BLACK,
            padding: "12px 40px",
            fontWeight: 900,
            fontSize: "clamp(12px, 2vw, 16px)",
            letterSpacing: "3px",
          }}
        >
          {typewriterText.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.03, duration: 0.03 }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Split reveal heading */}
      <h2
        style={{
          fontSize: "clamp(28px, 5vw, 52px)",
          fontWeight: 900,
          lineHeight: 1.1,
          textTransform: "uppercase",
          margin: "0 0 24px",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <motion.span
            initial={{ x: -300, opacity: 0 }}
            animate={visible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ display: "inline-block" }}
          >
            YOUR VISION DESERVES
          </motion.span>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.span
            initial={{ x: 300, opacity: 0 }}
            animate={visible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            style={{ display: "inline-block", color: ORANGE }}
          >
            MORE THAN ORDINARY
          </motion.span>
        </div>
      </h2>

      {/* Paragraph — fades up */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "clamp(14px, 1.8vw, 18px)",
          color: "#999",
          lineHeight: 1.7,
          maxWidth: "600px",
          margin: "0 auto 40px",
        }}
      >
        Whether it&apos;s a dream wedding floor, a show-stopping storefront, or a fleet that turns every road into a billboard — we make it happen.
        From events to enterprises, let&apos;s create something unforgettable.
      </motion.p>

      {/* Buttons — staggered from below */}
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <SkewedButton href="/contact" onClick={() => trackEvent("cta_click", { button_text: "START YOUR PROJECT", destination: "/contact", page: "/" })}>START YOUR PROJECT</SkewedButton>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <SkewedButton href="tel:+17155035444" filled={false} onClick={() => trackEvent("phone_click", { page: "/", location: "hero" })}>
            +1 715-503-5444
          </SkewedButton>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── SERVICES HEADER — typewriter + split reveal ─── */
function ServicesHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const typewriterText = "WHAT WE DO";

  return (
    <div ref={ref} style={{ marginBottom: "48px", overflow: "hidden" }}>
      {/* Typewriter label */}
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
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        {typewriterText.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.06, duration: 0.05 }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Split reveal heading — OUR from left, SERVICES from right */}
      <h2
        style={{
          fontSize: "clamp(36px, 6vw, 56px)",
          fontWeight: 900,
          lineHeight: 1,
          textTransform: "uppercase",
          margin: 0,
          fontFamily: "'Arial Black', Impact, sans-serif",
          display: "flex",
          gap: "clamp(8px, 2vw, 20px)",
          flexWrap: "wrap",
        }}
      >
        <motion.span
          initial={{ x: -200, opacity: 0 }}
          animate={visible ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          OUR
        </motion.span>
        <motion.span
          initial={{ x: 200, opacity: 0 }}
          animate={visible ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{ color: ORANGE }}
        >
          SERVICES
        </motion.span>
      </h2>
    </div>
  );
}

/* ─── ABOUT SCROLL-DRIVEN SECTION ─── */
function AboutScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Everything completes by the time section reaches middle of viewport
  // Left side: slides in from left
  const leftX = useTransform(scrollYProgress, [0, 0.4], [-200, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  // Right side: slides in from right
  const rightX = useTransform(scrollYProgress, [0.1, 0.5], [300, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  // Tags: staggered from right, all done by scroll = 1.0 (center of viewport)
  const tag1X = useTransform(scrollYProgress, [0.4, 0.65], [200, 0]);
  const tag1Op = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);
  const tag2X = useTransform(scrollYProgress, [0.5, 0.75], [200, 0]);
  const tag2Op = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const tag3X = useTransform(scrollYProgress, [0.6, 0.85], [200, 0]);
  const tag3Op = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);
  const tag4X = useTransform(scrollYProgress, [0.7, 0.95], [200, 0]);
  const tag4Op = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const tagXValues = [tag1X, tag2X, tag3X, tag4X];
  const tagOpValues = [tag1Op, tag2Op, tag3Op, tag4Op];

  return (
    <section
      ref={sectionRef}
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
        <motion.div style={{ x: leftX, opacity: leftOpacity }}>
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
        </motion.div>

        <div>
          <motion.p
            style={{
              x: rightX,
              opacity: rightOpacity,
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.8,
              color: "#b0b0b0",
              maxWidth: "600px",
            }}
          >
            Since <strong style={{ color: ORANGE }}>2017</strong>, Printec Virginia LLC has been the go-to print and
            signage powerhouse in Woodbridge, Virginia. From food truck wraps that stop traffic to LED channel letters
            that light up the night — we bring your vision to life with raw creativity and precision craftsmanship.
            No fluff. No shortcuts. Just bold work that gets noticed.
          </motion.p>
          <div style={{ marginTop: "32px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {["WRAPS", "SIGNS", "DESIGN", "PRINT"].map((tag, i) => (
              <motion.span
                key={tag}
                style={{
                  x: tagXValues[i],
                  opacity: tagOpValues[i],
                  border: `2px solid ${ORANGE}`,
                  padding: "6px 16px",
                  fontWeight: 900,
                  fontSize: "11px",
                  letterSpacing: "2px",
                  display: "inline-block",
                  color: ORANGE,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePageClient() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Reset scroll on mount so animations retrigger after refresh
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

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
            {/* Giant Outline Text — each word animates separately */}
            <h1
              style={{
                fontSize: "clamp(36px, 8vw, 100px)",
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
                FROM
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 150, skewX: 10 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                style={{ display: "block", WebkitTextStroke: `2px ${ORANGE}`, color: "transparent" }}
              >
                VISION
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -150, skewX: -10 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                style={{ display: "block", WebkitTextStroke: `2px ${WHITE}`, color: "transparent" }}
              >
                TO
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
                style={{ display: "block", WebkitTextStroke: `2px ${ORANGE}`, color: "transparent" }}
              >
                VINYL.
              </motion.span>
            </h1>

            {/* Subtitle with animated text flip */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
              style={{ marginTop: "32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}
            >
              <span
                style={{
                  fontSize: "clamp(14px, 2vw, 20px)",
                  fontWeight: 400,
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                WE CREATE
              </span>
              <ContainerTextFlip
                words={["SIGNS", "WRAPS", "GRAPHICS", "EVENTS", "BRANDS"]}
                interval={2500}
                animationDuration={600}
                className="!text-xl md:!text-3xl !px-4 !py-1 [background:linear-gradient(to_bottom,#F7941D,#e8870f)] shadow-[inset_0_-1px_#c67010,inset_0_0_0_1px_#F7941D44,_0_4px_12px_rgba(247,148,29,0.3)] dark:[background:linear-gradient(to_bottom,#F7941D,#e8870f)] dark:shadow-[inset_0_-1px_#c67010,inset_0_0_0_1px_#F7941D44,_0_4px_12px_rgba(247,148,29,0.3)]"
                textClassName="!text-black !font-black tracking-wider"
              />
              <span
                style={{
                  fontSize: "clamp(14px, 2vw, 20px)",
                  fontWeight: 400,
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                THAT STAND OUT
              </span>
            </motion.div>

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
                <SkewedButton href="/contact" onClick={() => trackEvent("cta_click", { button_text: "GET A QUOTE", destination: "/contact", page: "/" })}>GET A QUOTE</SkewedButton>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <SkewedButton href="/portfolio" filled={false}>
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
                    {"\u2022"} EST. 2017 {"\u2022"} TRUSTED {"\u2022"} PROVEN {"\u2022"}
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
                  EST.
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TAPE STRIP ─── */}
      <TapeStrip rotation={-1.2} />

      {/* ═══════════════════════════════════════════ */}
      {/* ─── 3. ABOUT SECTION (scroll-driven) ─── */}
      {/* ═══════════════════════════════════════════ */}
      <AboutScrollSection />

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
          {/* Header — typewriter label + split reveal heading */}
          <ServicesHeader />
        </div>

        {/* Auto-scrolling carousel */}
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div
            className="services-marquee"
            style={{
              display: "flex",
              gap: "20px",
              width: "max-content",
              padding: "8px 0 16px",
            }}
          >
            {[...SERVICES, ...SERVICES].map((svc, i) => (
                <a
                  key={`${svc.num}-${i}`}
                  href={svc.href}
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
                    cursor: "pointer",
                    flexShrink: 0,
                    border: `1px solid ${DARK2}`,
                    borderTop: `4px solid ${ORANGE}`,
                    transition: "transform 0.25s ease, border-color 0.25s ease",
                    textDecoration: "none",
                    color: "inherit",
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

                  {/* Arrow + View link */}
                  <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "8px", color: ORANGE, fontSize: "11px", fontWeight: 900, letterSpacing: "2px", fontFamily: "'Arial Black', Impact, sans-serif" }}>
                    VIEW SERVICE
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
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
                </a>
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
      {/* ─── FOLLOW OUR WORK SECTION ─── */}
      {/* ═══════════════════════════════════════════ */}
      <Section
        style={{
          padding: "clamp(60px, 10vw, 100px) 24px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontWeight: 900,
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: ORANGE,
              marginBottom: "12px",
            }}
          >
            FOLLOW OUR WORK
          </div>
          <h2
            style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              textTransform: "uppercase",
              margin: "0 0 12px",
              color: WHITE,
            }}
          >
            See Our Latest Projects
          </h2>
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Follow us on social media for daily project updates, behind-the-scenes, and inspiration.
          </p>
        </div>

        {/* Social Platform Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "48px",
          }}
          className="social-cards-grid"
        >
          {[
            {
              icon: <Instagram size={28} />,
              handle: "@printecvirginia",
              desc: "Behind the scenes & finished projects",
              href: "https://www.instagram.com/printecvirginia/",
              label: "FOLLOW",
            },
            {
              icon: <Facebook size={28} />,
              handle: "Printec Virginia LLC",
              desc: "News, events & customer reviews",
              href: "https://www.facebook.com/printecvirginia",
              label: "FOLLOW",
            },
            {
              icon: (
                <svg width={28} height={28} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.18 8.18 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z" />
                </svg>
              ),
              handle: "@printecvirginia",
              desc: "Time-lapse installs & transformations",
              href: "https://www.tiktok.com/@printec.va",
              label: "FOLLOW",
            },
          ].map((platform) => (
            <a
              key={platform.href}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card-hover"
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: "4px",
                padding: "32px 24px",
                textAlign: "center",
                textDecoration: "none",
                color: "inherit",
                transition: "border-color 0.2s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ color: ORANGE }}>{platform.icon}</div>
              <div
                style={{
                  fontFamily: "'Arial Black', Impact, sans-serif",
                  fontWeight: 900,
                  fontSize: "15px",
                  color: WHITE,
                  letterSpacing: "0.5px",
                }}
              >
                {platform.handle}
              </div>
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.5,
                }}
              >
                {platform.desc}
              </div>
              <div
                style={{
                  marginTop: "8px",
                  fontFamily: "'Arial Black', Impact, sans-serif",
                  fontWeight: 900,
                  fontSize: "11px",
                  letterSpacing: "2px",
                  color: ORANGE,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {platform.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

      </Section>

      {/* ─── TAPE STRIP ─── */}
      <TapeStrip rotation={-0.8} />

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
          <CtaSectionAnimated />
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
                { label: "PHONE", value: "+1 (715) 503-5444", href: "tel:+17155035444" },
                { label: "EMAIL", value: "info@printecwrap.com", href: "mailto:info@printecwrap.com" },
                { label: "LOCATION", value: "Woodbridge, Virginia", href: null },
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
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="form-grid">
                <input type="text" placeholder="Your name" style={{ width: "100%", padding: "12px 14px", background: "#111", border: "1px solid #222", borderRadius: "4px", color: WHITE, fontFamily: "Arial, sans-serif", fontSize: "14px", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }} onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)} onBlur={(e) => (e.currentTarget.style.borderColor = "#222")} />
                <input type="email" placeholder="Email address" style={{ width: "100%", padding: "12px 14px", background: "#111", border: "1px solid #222", borderRadius: "4px", color: WHITE, fontFamily: "Arial, sans-serif", fontSize: "14px", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }} onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)} onBlur={(e) => (e.currentTarget.style.borderColor = "#222")} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="form-grid">
                <input type="tel" placeholder="Phone (optional)" style={{ width: "100%", padding: "12px 14px", background: "#111", border: "1px solid #222", borderRadius: "4px", color: WHITE, fontFamily: "Arial, sans-serif", fontSize: "14px", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }} onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)} onBlur={(e) => (e.currentTarget.style.borderColor = "#222")} />
                <select style={{ width: "100%", padding: "12px 14px", background: "#111", border: "1px solid #222", borderRadius: "4px", color: "rgba(255,255,255,0.5)", fontFamily: "Arial, sans-serif", fontSize: "14px", outline: "none", cursor: "pointer", transition: "border-color 0.2s", boxSizing: "border-box" }} onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)} onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}>
                  <option value="">Service type...</option>
                  <option value="Channel Letters">Channel Letters & Signage</option>
                  <option value="LED Channel Letters">LED Channel Letters</option>
                  <option value="Window Wraps">Window Wraps</option>
                  <option value="Wall Wraps">Wall Wraps</option>
                  <option value="Dance Floor Wraps">Dance Floor Wraps</option>
                  <option value="Wedding Floor Wraps">Wedding Floor Wraps</option>
                  <option value="Storefront Graphics">Storefront Graphics</option>
                  <option value="Vehicle Wraps">Vehicle Wraps</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  color: WHITE,
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
              />

              <SkewedButton onClick={() => {}} style={{ width: "100%", textAlign: "center" }}>
                SEND MESSAGE
              </SkewedButton>
            </form>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════ */}
      {/* ─── RESPONSIVE STYLES ─── */}
    </div>
  );
}
