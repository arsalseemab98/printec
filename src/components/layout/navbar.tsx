"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ORANGE,
  BLACK,
  DARK1,
  DARK2,
  WHITE,
  SERVICES_NAV,
} from "@/lib/constants";
import { SkewedButton } from "@/components/shared/skewed-button";
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  Home,
  Info,
  Briefcase,
  FolderOpen,
  BookOpen,
  Mail,
  Users,
} from "lucide-react";

const MOBILE_ICONS: Record<string, React.ReactNode> = {
  HOME: <Home size={18} />,
  ABOUT: <Info size={18} />,
  TEAM: <Users size={18} />,
  SERVICES: <Briefcase size={18} />,
  PORTFOLIO: <FolderOpen size={18} />,
  BLOG: <BookOpen size={18} />,
  CONTACT: <Mail size={18} />,
};

const MAIN_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "TEAM", href: "/team" },
  { label: "SERVICES", href: "#", hasDropdown: true },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoAnimated, setLogoAnimated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!sessionStorage.getItem("logo-animated")) {
      setLogoAnimated(true);
      sessionStorage.setItem("logo-animated", "1");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkStyle = (href: string): React.CSSProperties => ({
    background: "none",
    border: "none",
    color: isActive(href) ? ORANGE : WHITE,
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    fontWeight: 900,
    fontSize: "13px",
    letterSpacing: "2px",
    cursor: "pointer",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "color 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? `${BLACK}f5` : `${DARK1}ee`,
        backdropFilter: "blur(10px)",
        transition: "background 0.3s ease",
      }}
    >
      {/* Top accent line */}
      <div style={{ height: "2px", background: ORANGE, width: "100%" }} />

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
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          <Image
            src="/printec-logo-light.png"
            alt="Printec Virginia LLC"
            width={200}
            height={125}
            className={logoAnimated ? "logo-spin-bounce" : undefined}
            style={{ height: "44px", width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
          className="nav-desktop"
        >
          {MAIN_LINKS.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                ref={dropdownRef}
                style={{ position: "relative" }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  style={linkStyle(link.href)}
                  onClick={() => setServicesOpen(!servicesOpen)}
                  onMouseEnter={(e) => {
                    if (!isActive(link.href)) e.currentTarget.style.color = ORANGE;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.href)) e.currentTarget.style.color = WHITE;
                  }}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    style={{
                      transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "8px",
                        background: DARK1,
                        border: `1px solid ${DARK2}`,
                        borderTop: `2px solid ${ORANGE}`,
                        minWidth: "240px",
                        padding: "8px 0",
                        zIndex: 1001,
                      }}
                    >
                      {SERVICES_NAV.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          style={{
                            display: "block",
                            padding: "10px 20px",
                            color: WHITE,
                            fontFamily: "'Arial Black', 'Impact', sans-serif",
                            fontWeight: 900,
                            fontSize: "12px",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = DARK2;
                            e.currentTarget.style.color = ORANGE;
                            e.currentTarget.style.paddingLeft = "24px";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = WHITE;
                            e.currentTarget.style.paddingLeft = "20px";
                          }}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={linkStyle(link.href)}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.color = ORANGE;
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.color = isActive(link.href) ? ORANGE : WHITE;
                }}
              >
                {link.label}
              </Link>
            )
          )}
          <SkewedButton href="tel:+17155035444" style={{ padding: "10px 24px", fontSize: "12px" }}>
            <Phone size={16} style={{ marginRight: "6px" }} />
            CALL NOW
          </SkewedButton>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          {mobileOpen ? (
            <X size={28} color={ORANGE} />
          ) : (
            <Menu size={28} color={ORANGE} />
          )}
        </button>
      </div>

      {/* Bottom line */}
      <div style={{ height: "1px", background: "#222", width: "100%" }} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: DARK1,
              overflow: "hidden",
              borderTop: `1px solid ${DARK2}`,
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {MAIN_LINKS.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
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
                        padding: "12px 0",
                        borderBottom: `1px solid ${DARK2}`,
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textTransform: "uppercase",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {MOBILE_ICONS[link.label]}
                        {link.label}
                      </span>
                      <ChevronDown
                        size={18}
                        color={ORANGE}
                        style={{
                          transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: "hidden" }}
                        >
                          {SERVICES_NAV.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: "block",
                                padding: "10px 0 10px 20px",
                                color: `${WHITE}bb`,
                                fontFamily: "'Arial Black', 'Impact', sans-serif",
                                fontWeight: 900,
                                fontSize: "13px",
                                letterSpacing: "2px",
                                textDecoration: "none",
                                textTransform: "uppercase",
                                borderBottom: `1px solid ${DARK2}44`,
                              }}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      color: isActive(link.href) ? ORANGE : WHITE,
                      fontFamily: "'Arial Black', 'Impact', sans-serif",
                      fontWeight: 900,
                      fontSize: "16px",
                      letterSpacing: "3px",
                      textDecoration: "none",
                      textAlign: "left",
                      padding: "12px 0",
                      borderBottom: `1px solid ${DARK2}`,
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {MOBILE_ICONS[link.label]}
                    {link.label}
                  </Link>
                )
              )}
              <div style={{ paddingTop: "16px" }}>
                <SkewedButton href="tel:+17155035444">
                  <Phone size={18} style={{ marginRight: "6px" }} />
                  CALL NOW
                </SkewedButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
