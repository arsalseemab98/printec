"use client";

import { useState, FormEvent } from "react";
import { ORANGE, BLACK, WHITE, DARK1, DARK2 } from "@/lib/constants";
import { Section } from "@/components/shared/section";
import { Phone, Mail, MessageCircle, MapPin, Clock, User, Send, Map, Instagram, Facebook } from "lucide-react";

const BUDGET_OPTIONS = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000+",
];

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "#111",
  border: "1px solid #222",
  borderRadius: "4px",
  color: WHITE,
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s ease",
  boxSizing: "border-box",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: "Arial, sans-serif",
  fontWeight: 600,
  fontSize: "11px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  marginBottom: "6px",
};

const INFO_ITEM_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "16px",
  marginBottom: "28px",
};

const INFO_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Arial Black', 'Impact', sans-serif",
  fontWeight: 900,
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: ORANGE,
  marginBottom: "4px",
};

const INFO_VALUE_STYLE: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
  color: WHITE,
  lineHeight: 1.5,
};

const ICON_BOX_STYLE: React.CSSProperties = {
  width: "44px",
  height: "44px",
  minWidth: "44px",
  background: ORANGE,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  color: BLACK,
  fontWeight: 900,
  fontSize: "18px",
};

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    description: "",
    budget: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "contact-form",
          page: window.location.pathname,
          ...Object.fromEntries(
            ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
              .map((k) => [k, new URLSearchParams(window.location.search).get(k)])
              .filter(([, v]) => v)
          ),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error("[ContactForm] Submission failed:", err);
      setError("Failed to send. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── Contact Info + Form Section ── */}
      <Section
        style={{
          background: DARK1,
          padding: "80px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "60px",
          }}
          className="contact-grid"
        >
          {/* ── Left Column: Contact Info ── */}
          <div>
            <h2
              style={{
                fontFamily: "'Arial Black', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(28px, 5vw, 42px)",
                letterSpacing: "-1px",
                textTransform: "uppercase",
                color: WHITE,
                margin: "0 0 40px 0",
                lineHeight: 1,
              }}
            >
              CONTACT <span style={{ color: ORANGE }}>INFO</span>
            </h2>

            {/* Phone */}
            <div style={INFO_ITEM_STYLE}>
              <div style={ICON_BOX_STYLE}>
                <Phone size={20} color={BLACK} strokeWidth={2.5} />
              </div>
              <div>
                <div style={INFO_LABEL_STYLE}>PHONE</div>
                <a href="tel:+17155035444" style={{ ...INFO_VALUE_STYLE, textDecoration: "none" }}>
                  (715) 503-5444
                </a>
              </div>
            </div>

            {/* Email */}
            <div style={INFO_ITEM_STYLE}>
              <div style={ICON_BOX_STYLE}>
                <Mail size={20} color={BLACK} strokeWidth={2.5} />
              </div>
              <div>
                <div style={INFO_LABEL_STYLE}>EMAIL</div>
                <a href="mailto:info@printecwrap.com" style={{ ...INFO_VALUE_STYLE, textDecoration: "none" }}>
                  info@printecwrap.com
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div style={INFO_ITEM_STYLE}>
              <div style={ICON_BOX_STYLE}>
                <MessageCircle size={20} color={BLACK} strokeWidth={2.5} />
              </div>
              <div>
                <div style={INFO_LABEL_STYLE}>WHATSAPP</div>
                <a
                  href="https://wa.me/17155035444"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...INFO_VALUE_STYLE, textDecoration: "none" }}
                >
                  (715) 503-5444
                </a>
              </div>
            </div>

            {/* Address */}
            <div style={INFO_ITEM_STYLE}>
              <div style={ICON_BOX_STYLE}>
                <MapPin size={20} color={BLACK} strokeWidth={2.5} />
              </div>
              <div>
                <div style={INFO_LABEL_STYLE}>ADDRESS</div>
                <div style={INFO_VALUE_STYLE}>
                  Woodbridge, VA 22191
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div style={INFO_ITEM_STYLE}>
              <div style={ICON_BOX_STYLE}>
                <Clock size={20} color={BLACK} strokeWidth={2.5} />
              </div>
              <div>
                <div style={INFO_LABEL_STYLE}>BUSINESS HOURS</div>
                <div style={INFO_VALUE_STYLE}>
                  Mon - Fri: 9AM - 6PM<br />
                  Sat: 10AM - 4PM<br />
                  Sun: Closed
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div style={INFO_ITEM_STYLE}>
              <div style={ICON_BOX_STYLE}>
                <Instagram size={20} color={BLACK} strokeWidth={2.5} />
              </div>
              <div>
                <div style={INFO_LABEL_STYLE}>FOLLOW US</div>
                <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
                  {[
                    {
                      href: "https://www.instagram.com/printecvirginia/",
                      label: "Instagram",
                      icon: <Instagram size={18} />,
                    },
                    {
                      href: "https://www.facebook.com/printecvirginia",
                      label: "Facebook",
                      icon: <Facebook size={18} />,
                    },
                    {
                      href: "https://www.tiktok.com/@printec.va",
                      label: "TikTok",
                      icon: (
                        <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
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
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: WHITE,
                        textDecoration: "none",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "14px",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = WHITE; }}
                    >
                      {social.icon}
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Quote Form ── */}
          <div
            style={{
              background: BLACK,
              padding: "40px 32px",
              border: `2px solid ${DARK2}`,
            }}
          >
            <h2
              style={{
                fontFamily: "'Arial Black', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(24px, 4vw, 36px)",
                letterSpacing: "-1px",
                textTransform: "uppercase",
                color: WHITE,
                margin: "0 0 8px 0",
                lineHeight: 1,
              }}
            >
              GET A <span style={{ color: ORANGE }}>FREE QUOTE</span>
            </h2>
            <p
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                color: `${WHITE}88`,
                letterSpacing: "1px",
                margin: "0 0 32px 0",
              }}
            >
              Fill out the form and we&apos;ll get back to you within 24 hours.
            </p>

            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    background: ORANGE,
                    margin: "0 auto 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "4px",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={BLACK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                    fontWeight: 900,
                    fontSize: "24px",
                    color: WHITE,
                    textTransform: "uppercase",
                    margin: "0 0 12px 0",
                  }}
                >
                  QUOTE <span style={{ color: ORANGE }}>REQUESTED!</span>
                </h3>
                <p
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    color: `${WHITE}99`,
                    letterSpacing: "0.5px",
                  }}
                >
                  We&apos;ll review your project and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "20px",
                  }}
                  className="form-grid"
                >
                  {/* Name */}
                  <div>
                    <label style={{ ...LABEL_STYLE, display: "flex", alignItems: "center", gap: "6px" }}>
                      <User size={14} color={ORANGE} strokeWidth={2.5} />
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      style={INPUT_STYLE}
                      onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={LABEL_STYLE}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      style={INPUT_STYLE}
                      onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "20px",
                  }}
                  className="form-grid"
                >
                  {/* Phone */}
                  <div>
                    <label style={LABEL_STYLE}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      style={INPUT_STYLE}
                      onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <label style={LABEL_STYLE}>Service Type *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      style={{ ...INPUT_STYLE, appearance: "none", cursor: "pointer" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                    >
                      <option value="" disabled>
                        Select a service...
                      </option>
                      <optgroup label="Wraps">
                        <option value="Vinyl Wraps">Vinyl Wraps</option>
                        <option value="Wall Wraps">Wall Wraps</option>
                        <option value="Window Wraps">Window Wraps</option>
                        <option value="Storefront Window Graphics">Storefront Window Graphics</option>
                        <option value="Food Truck Wraps">Food Truck Wraps</option>
                        <option value="Food Trailer Wraps">Food Trailer Wraps</option>
                      </optgroup>
                      <optgroup label="Floor Wraps">
                        <option value="Dance Floor Wraps">Dance Floor Wraps</option>
                        <option value="Wedding Floor Wraps">Wedding Floor Wraps</option>
                        <option value="Event Floor Graphics">Event Floor Graphics</option>
                      </optgroup>
                      <optgroup label="Signage">
                        <option value="Business Signage">Business Signage</option>
                        <option value="Channel Letters & Signage">Channel Letters &amp; Signage</option>
                        <option value="LED Channel Letters">LED Channel Letters</option>
                        <option value="Custom Neon Signs">Custom Neon Signs</option>
                        <option value="Digital Signage">Digital Signage</option>
                      </optgroup>
                      <optgroup label="Print & Design">
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Large Format Printing">Large Format Printing</option>
                        <option value="Banners & Posters">Banners &amp; Posters</option>
                        <option value="Custom Uniforms">Custom Uniforms</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="Content Marketing">Content Marketing</option>
                        <option value="Other">Other (describe below)</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={LABEL_STYLE}>Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    style={{ ...INPUT_STYLE, appearance: "none", cursor: "pointer" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                  >
                    <option value="" disabled>
                      Select budget range...
                    </option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Description */}
                <div style={{ marginBottom: "28px" }}>
                  <label style={LABEL_STYLE}>Project Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project - what do you need, timeline, any special requirements..."
                    style={{ ...INPUT_STYLE, resize: "vertical", minHeight: "120px" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(229,57,53,0.1)",
                      border: "1px solid rgba(229,57,53,0.3)",
                      borderRadius: "4px",
                      color: "#E53935",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "13px",
                      marginBottom: "8px",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "16px 32px",
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                    fontWeight: 900,
                    fontSize: "14px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    textAlign: "center",
                    border: `2px solid ${ORANGE}`,
                    background: loading ? "#555" : ORANGE,
                    color: WHITE,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    textShadow: loading
                      ? "none"
                      : `0 0 10px rgba(247,148,29,0.8), 0 0 20px rgba(247,148,29,0.4)`,
                    boxShadow: loading
                      ? "none"
                      : `0 0 15px rgba(247,148,29,0.5), 0 0 30px rgba(247,148,29,0.2), inset 0 0 15px rgba(255,255,255,0.1)`,
                    opacity: loading ? 0.7 : 1,
                  }}
                  className={loading ? undefined : "neon-pulse"}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    {loading ? "SENDING..." : "GET FREE QUOTE"}
                    {!loading && <Send size={18} color={WHITE} strokeWidth={2.5} />}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Responsive CSS via style tag */}
        <style>{`
          @media (min-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr 1.2fr !important;
            }
          }
          @media (max-width: 600px) {
            .form-grid {
              grid-template-columns: 1fr !important;
            }
          }
          input::placeholder,
          textarea::placeholder,
          select option[disabled] {
            color: ${WHITE}44;
          }
          select option {
            background: ${DARK2};
            color: ${WHITE};
          }
        `}</style>
      </Section>

      {/* ── Map Placeholder Section ── */}
      <Section
        style={{
          background: BLACK,
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: DARK2,
              border: `2px solid ${DARK1}`,
              minHeight: "360px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Grid pattern overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                  linear-gradient(${DARK1}66 1px, transparent 1px),
                  linear-gradient(90deg, ${DARK1}66 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                pointerEvents: "none",
              }}
            />

            {/* Map pin icon */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "64px",
                height: "64px",
                background: ORANGE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                marginBottom: "24px",
              }}
            >
              <Map size={28} color={BLACK} strokeWidth={2.5} />
            </div>

            <h3
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "'Arial Black', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: "18px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: WHITE,
                margin: "0 0 8px 0",
                textAlign: "center",
              }}
            >
              1234 COMMERCE DRIVE
            </h3>
            <p
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                color: `${WHITE}88`,
                letterSpacing: "1px",
                margin: "0 0 24px 0",
                textAlign: "center",
              }}
            >
              Woodbridge, VA 22191
            </p>

            <a
              href="https://www.google.com/maps/search/1234+Commerce+Drive+Virginia+Beach+VA+23456"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-block",
                padding: "12px 28px",
                background: "transparent",
                border: `2px solid ${ORANGE}`,
                color: ORANGE,
                fontFamily: "'Arial Black', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "4px",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>
                VIEW ON GOOGLE MAPS
              </span>
            </a>
          </div>

          {/* Separator under map */}
          <div
            style={{
              height: "1px",
              background: "#161616",
            }}
          />
        </div>
      </Section>
    </>
  );
}
