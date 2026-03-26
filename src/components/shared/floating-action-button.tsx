"use client";

import { useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  FileText,
  Phone,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  CheckCircle,
} from "lucide-react";
import { trackEvent } from "@/lib/gtag";
import { ORANGE, BLACK, DARK1, DARK2, WHITE, IMG } from "@/lib/constants";
import Image from "next/image";

type View = "menu" | "form" | "success";

const INPUT: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: DARK2,
  border: `1px solid #333`,
  borderRadius: "6px",
  color: WHITE,
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const LABEL: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  marginBottom: "6px",
  fontFamily: "Arial, sans-serif",
};

export function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || undefined,
          description: formData.message,
          source: "floating-widget",
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
        setError(data.error || "Something went wrong.");
        return;
      }
      setView("success");
      trackEvent("generate_lead", { source: "floating-widget", service: formData.service || "general", page: window.location.pathname });
    } catch (err) {
      console.error("[FloatingWidget] Submission failed:", err);
      setError("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setView("menu");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setError("");
    }, 300);
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 9997,
          }}
        />
      )}

      {/* Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "380px",
            maxWidth: "calc(100vw - 48px)",
            maxHeight: "calc(100vh - 140px)",
            overflowY: "auto",
            background: DARK1,
            border: `1px solid ${DARK2}`,
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 9999,
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            animation: "modalSlideUp 0.35s ease both",
          }}
        >
          {/* Banner Photo Header */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: view === "menu" ? "130px" : "80px",
              overflow: "hidden",
              transition: "height 0.3s ease",
            }}
          >
            <Image
              src={IMG.worker}
              alt="Printec Team"
              width={380}
              height={130}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "85% 15%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "80%",
                background: `linear-gradient(to top, ${DARK1}, transparent)`,
                pointerEvents: "none",
              }}
            />

            {/* Online badge */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "rgba(0,0,0,0.5)",
                padding: "3px 10px",
                borderRadius: "20px",
                backdropFilter: "blur(4px)",
              }}
            >
              <span className="online-dot" />
              <span
                style={{
                  color: "#22c55e",
                  fontSize: "10px",
                  fontWeight: 500,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Online
              </span>
            </div>

            {/* Close */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 2,
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                borderRadius: "50%",
                width: "26px",
                height: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}
            >
              <X size={13} />
            </button>

            {/* Overlay text */}
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                left: "14px",
                zIndex: 2,
              }}
            >
              <h2
                style={{
                  color: WHITE,
                  fontSize: view === "menu" ? "18px" : "15px",
                  fontWeight: 700,
                  margin: 0,
                  fontFamily: "Arial, sans-serif",
                  textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                }}
              >
                {view === "menu"
                  ? "Hi there!"
                  : view === "form"
                  ? "Connect with Our Team"
                  : "Thank You!"}
              </h2>
              {view === "menu" && (
                <p
                  style={{
                    color: "#bbb",
                    fontSize: "12px",
                    margin: "2px 0 0",
                    fontFamily: "Arial, sans-serif",
                    textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                  }}
                >
                  How can we help you today?
                </p>
              )}
            </div>
          </div>

          {/* ─── MENU VIEW ─── */}
          {view === "menu" && (
            <div style={{ padding: "14px" }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {/* Connect with Our Team — opens form */}
                <button
                  onClick={() => setView("form")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "13px 16px",
                    background: ORANGE,
                    borderRadius: "8px",
                    color: BLACK,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ffaa33";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = ORANGE;
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <Send size={17} />
                  <span style={{ flex: 1 }}>Connect with Our Team</span>
                  <ArrowRight size={15} />
                </button>

                {/* Get a Quote */}
                <a
                  href="/contact"
                  onClick={() => trackEvent("cta_click", { button_text: "Get a Free Quote", destination: "/contact", page: window.location.pathname })}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "13px 16px",
                    background: DARK2,
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#ccc",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    border: `1px solid #333`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ORANGE;
                    e.currentTarget.style.color = ORANGE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#333";
                    e.currentTarget.style.color = "#ccc";
                  }}
                >
                  <FileText size={17} color={ORANGE} />
                  <span style={{ flex: 1 }}>Get a Free Quote</span>
                  <ArrowRight size={15} style={{ opacity: 0.4 }} />
                </a>

                {/* Call */}
                <a
                  href="tel:+17155035444"
                  onClick={() => trackEvent("phone_click", { page: window.location.pathname, location: "floating-widget" })}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "13px 16px",
                    background: DARK2,
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#ccc",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    border: `1px solid #333`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ORANGE;
                    e.currentTarget.style.color = ORANGE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#333";
                    e.currentTarget.style.color = "#ccc";
                  }}
                >
                  <Phone size={17} color={ORANGE} />
                  <span style={{ flex: 1 }}>Call (715) 503-5444</span>
                  <ArrowRight size={15} style={{ opacity: 0.4 }} />
                </a>
              </div>

              <div
                style={{
                  textAlign: "center",
                  color: "#444",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  marginTop: "12px",
                  paddingTop: "10px",
                  borderTop: `1px solid ${DARK2}`,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                PRINTEC VIRGINIA LLC — FROM VISION TO VINYL
              </div>
            </div>
          )}

          {/* ─── FORM VIEW ─── */}
          {view === "form" && (
            <div style={{ padding: "16px" }}>
              {/* Back button */}
              <button
                onClick={() => setView("menu")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "none",
                  color: ORANGE,
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "Arial, sans-serif",
                  padding: "0 0 12px",
                  letterSpacing: "0.5px",
                }}
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  style={INPUT}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                  style={INPUT}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone (optional)"
                  style={INPUT}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{ ...INPUT, appearance: "none", cursor: "pointer" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                >
                  <option value="">Service (optional)</option>
                  <option value="Vinyl Wraps">Vinyl Wraps</option>
                  <option value="Business Signage">Business Signage</option>
                  <option value="Dance Floor Wraps">Dance Floor Wraps</option>
                  <option value="Wall Wraps">Wall Wraps</option>
                  <option value="Window Wraps">Window Wraps</option>
                  <option value="Channel Letters & Signage">Channel Letters & Signage</option>
                  <option value="Custom Neon Signs">Custom Neon Signs</option>
                  <option value="Food Truck Wraps">Food Truck Wraps</option>
                  <option value="Wedding Floor Wraps">Wedding Floor Wraps</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Other">Other</option>
                </select>
                {error && (
                  <div
                    style={{
                      padding: "10px 12px",
                      background: "rgba(229,57,53,0.1)",
                      border: "1px solid rgba(229,57,53,0.3)",
                      borderRadius: "6px",
                      color: "#E53935",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "12px",
                    }}
                  >
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={loading ? undefined : "neon-pulse"}
                  style={{
                    width: "100%",
                    padding: "13px",
                    background: loading ? "#555" : ORANGE,
                    border: `2px solid ${loading ? "#555" : ORANGE}`,
                    borderRadius: "8px",
                    color: WHITE,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.3s",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <Send size={16} />
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          )}

          {/* ─── SUCCESS VIEW ─── */}
          {view === "success" && (
            <div
              style={{
                padding: "40px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: `${ORANGE}22`,
                  border: `2px solid ${ORANGE}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircle size={28} color={ORANGE} />
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: WHITE,
                  margin: "0 0 8px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Message Sent!
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  margin: "0 0 24px",
                  lineHeight: 1.6,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Our team will reach out to you shortly. We typically respond
                within the hour.
              </p>
              <button
                onClick={handleClose}
                style={{
                  padding: "12px 32px",
                  background: DARK2,
                  border: `1px solid #333`,
                  borderRadius: "8px",
                  color: WHITE,
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ORANGE;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}

      {/* FAB Button */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="neon-pulse"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: ORANGE,
            border: `2px solid ${ORANGE}`,
            color: BLACK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: `0 0 15px rgba(247,148,29,0.5), 0 0 30px rgba(247,148,29,0.2)`,
          }}
        >
          {open ? <X size={26} /> : <MessageCircle size={26} />}
        </button>
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .online-dot {
          width: 7px; height: 7px; background: #22c55e;
          border-radius: 50%; display: inline-block;
          animation: pulseGreen 2s infinite;
        }
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }
      `}</style>
    </>
  );
}
