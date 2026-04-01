"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Building2,
  Wrench,
  ArrowUpRight,
  Instagram,
  Facebook,
} from "lucide-react";
import { trackEvent } from "@/lib/gtag";
import {
  ORANGE,
  RED,
  DARK1,
  DARK2,
  WHITE,
  SERVICES_NAV,
} from "@/lib/constants";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Catalogs", href: "/catalogs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  ...SERVICES_NAV,
  { name: "Wedding Floor Wraps", href: "/wedding-floor-wrap" },
  { name: "LED Channel Letters", href: "/led-channel-letters" },
  { name: "Channel Letters Near Me", href: "/channel-letter-signs-near-me" },
  { name: "Storefront Graphics", href: "/storefront-window-graphics" },
];

const LOCATION_LINKS = [
  { label: "Virginia", href: "/locations/virginia" },
  { label: "Washington DC", href: "/locations/washington-dc" },
  { label: "Maryland", href: "/locations/maryland" },
  { label: "New York", href: "/locations/new-york" },
  { label: "Los Angeles", href: "/locations/los-angeles" },
  { label: "Chicago", href: "/locations/chicago" },
  { label: "Seattle", href: "/locations/seattle" },
  { label: "Dallas", href: "/locations/dallas" },
  { label: "Houston", href: "/locations/houston" },
];

const CONNECT_ICON_MAP: Record<string, React.ReactNode> = {
  Phone: <Phone size={14} style={{ color: ORANGE, flexShrink: 0 }} />,
  Email: <Mail size={14} style={{ color: ORANGE, flexShrink: 0 }} />,
  WhatsApp: <MessageCircle size={14} style={{ color: ORANGE, flexShrink: 0 }} />,
  Address: <MapPin size={14} style={{ color: ORANGE, flexShrink: 0 }} />,
};

const CONNECT_ITEMS = [
  { label: "Phone", value: "(715) 503-5444", href: "tel:+17155035444" },
  { label: "Email", value: "info@printecwrap.com", href: "mailto:info@printecwrap.com" },
  { label: "WhatsApp", value: "+1 (715) 503-5444", href: "https://wa.me/17155035444" },
  { label: "Address", value: "Woodbridge, VA 22191", href: null },
];

const HOURS = [
  { day: "Mon - Fri", time: "9:00 AM - 6:00 PM" },
  { day: "Saturday", time: "10:00 AM - 4:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const columnHeadingStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontWeight: 900,
  fontSize: "14px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: ORANGE,
  marginBottom: "20px",
};

const linkStyle: React.CSSProperties = {
  display: "block",
  color: `${WHITE}bb`,
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  letterSpacing: "0.5px",
  textDecoration: "none",
  padding: "4px 0",
  transition: "color 0.15s",
};

export function Footer() {
  return (
    <footer
      style={{
        background: DARK1,
        color: WHITE,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Top separator */}
      <div style={{ height: "1px", background: "#222" }} />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(48px, 6vw, 80px) 24px 40px",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "24px" }}>
          <Link href="/" style={{ display: "inline-block" }}>
            <Image
              src="/printec-logo-light.png"
              alt="Printec Virginia LLC"
              width={200}
              height={125}
              style={{ height: "52px", width: "auto" }}
            />
          </Link>
        </div>

        {/* Follow Us */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "48px" }}>
          <span
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 900,
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: ORANGE,
            }}
          >
            FOLLOW US
          </span>
          {[
            { href: "https://www.instagram.com/printecvirginia/", icon: <Instagram size={20} /> },
            { href: "https://www.facebook.com/printecvirginia", icon: <Facebook size={20} /> },
            {
              href: "https://www.tiktok.com/@printec.va",
              icon: (
                <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.18 8.18 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z" />
                </svg>
              ),
            },
          ].map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.5)",
                transition: "color 0.15s",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "clamp(24px, 4vw, 48px)",
          }}
          className="footer-grid"
        >
          {/* Company */}
          <div>
            <h4 style={{ ...columnHeadingStyle, display: "flex", alignItems: "center", gap: "8px" }}>
              <Building2 size={16} /> Company
            </h4>
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={linkStyle}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${WHITE}bb`; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ ...columnHeadingStyle, display: "flex", alignItems: "center", gap: "8px" }}>
              <Wrench size={16} /> Services
            </h4>
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ ...linkStyle, display: "inline-flex", alignItems: "center", gap: "4px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${WHITE}bb`; }}
              >
                {"name" in link ? link.name : ""}
                <ArrowUpRight size={12} style={{ flexShrink: 0, opacity: 0.6 }} />
              </Link>
            ))}
          </div>

          {/* Locations */}
          <div>
            <h4 style={{ ...columnHeadingStyle, display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin size={16} /> Locations
            </h4>
            {LOCATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={linkStyle}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${WHITE}bb`; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div>
            <h4 style={columnHeadingStyle}>Connect</h4>
            {CONNECT_ITEMS.map((item) => (
              <div key={item.label} style={{ padding: "4px 0" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    color: `${WHITE}66`,
                    textTransform: "uppercase",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 900,
                  }}
                >
                  {CONNECT_ICON_MAP[item.label]}
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      ...linkStyle,
                      padding: "2px 0 8px",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${WHITE}bb`; }}
                    onClick={() => trackEvent(item.label === "Phone" ? "phone_click" : item.label === "Email" ? "email_click" : "whatsapp_click", { page: window.location.pathname, location: "footer" })}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span style={{ ...linkStyle, padding: "2px 0 8px" }}>{item.value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ ...columnHeadingStyle, display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={16} /> Hours
            </h4>
            {HOURS.map((h) => (
              <div key={h.day} style={{ padding: "4px 0", display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: "Arial, sans-serif",
                    color: `${WHITE}bb`,
                  }}
                >
                  {h.day}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: "Arial, sans-serif",
                    color: h.time === "Closed" ? RED : `${WHITE}dd`,
                    fontWeight: h.time === "Closed" ? 700 : 400,
                  }}
                >
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: `1px solid ${DARK2}`,
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontFamily: "Arial, sans-serif",
              color: `${WHITE}66`,
              letterSpacing: "0.5px",
            }}
          >
            &copy; 2026 Printec Virginia LLC. All rights reserved.
          </span>
          <a
            href="https://www.swiftcore.se/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontFamily: "Arial, sans-serif",
              color: `${WHITE}44`,
              letterSpacing: "0.5px",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${WHITE}44`; }}
          >
            Created by
            <Image
              src="/swiftcore-logo.png"
              alt="SwiftCore"
              width={20}
              height={20}
              style={{ height: "16px", width: "auto", opacity: 0.5, transition: "opacity 0.15s" }}
            />
            SwiftCore
          </a>
        </div>
      </div>
    </footer>
  );
}
