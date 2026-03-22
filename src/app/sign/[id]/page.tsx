"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { use } from "react";

interface Contract {
  id: string;
  contract_number: string;
  client_name: string | null;
  client_email: string | null;
  event_date: string | null;
  venue: string | null;
  service_description: string | null;
  total_price: number;
  advance_amount: number;
  balance_amount: number;
  balance_due: string | null;
  travel_cost: number;
  terms: string[] | null;
  signed_at: string | null;
  signature_data: string | null;
}

export default function SignContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [signed, setSigned] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  const fetchContract = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/contracts/${id}`);
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      if (data.error) {
        setNotFound(true);
        return;
      }
      setContract(data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  /* ── Canvas setup ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [contract]);

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function onPointerUp() {
    drawingRef.current = false;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  function isCanvasBlank(): boolean {
    const canvas = canvasRef.current;
    if (!canvas) return true;
    const ctx = canvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255) {
        return false;
      }
    }
    return true;
  }

  async function handleSubmit() {
    if (isCanvasBlank()) {
      setError("Please draw your signature before submitting.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const canvas = canvasRef.current!;
      const signatureData = canvas.toDataURL("image/png");

      const res = await fetch(`/api/contracts/${id}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signature_data: signatureData }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to sign contract. Please try again.");
        return;
      }

      setSigned(true);
    } catch {
      setError("Failed to sign contract. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  /* ── Loading state ── */
  if (loading) {
    return (
      <div style={pageWrapper}>
        <div style={contentContainer}>
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ color: "#666", fontSize: "16px" }}>
              Loading contract...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (notFound || !contract) {
    return (
      <div style={pageWrapper}>
        <div style={contentContainer}>
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/printec-logo.png"
              alt="Printec Virginia LLC"
              style={{ height: "48px", marginBottom: "2rem" }}
            />
            <h1
              style={{
                fontSize: "24px",
                color: "#333",
                marginBottom: "1rem",
                fontWeight: 700,
              }}
            >
              Contract Not Found
            </h1>
            <p style={{ color: "#666", fontSize: "15px" }}>
              This contract link is invalid or has expired.
            </p>
          </div>
          <ContractFooter />
        </div>
      </div>
    );
  }

  /* ── Already signed ── */
  if (contract.signed_at && !signed) {
    return (
      <div style={pageWrapper}>
        <div style={contentContainer}>
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/printec-logo.png"
              alt="Printec Virginia LLC"
              style={{ height: "48px", marginBottom: "2rem" }}
            />
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "24px",
                color: "#333",
                marginBottom: "0.75rem",
                fontWeight: 700,
              }}
            >
              Already Signed
            </h1>
            <p
              style={{
                color: "#666",
                fontSize: "15px",
                marginBottom: "1.5rem",
              }}
            >
              This contract was signed on{" "}
              <strong>{formatDate(contract.signed_at)}</strong>.
            </p>
            {contract.signature_data && (
              <div
                style={{
                  display: "inline-block",
                  background: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "1rem",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contract.signature_data}
                  alt="Signature"
                  style={{ maxWidth: "300px", height: "auto" }}
                />
              </div>
            )}
          </div>
          <ContractFooter />
        </div>
      </div>
    );
  }

  /* ── Success state ── */
  if (signed) {
    return (
      <div style={pageWrapper}>
        <div style={contentContainer}>
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/printec-logo.png"
              alt="Printec Virginia LLC"
              style={{ height: "48px", marginBottom: "2rem" }}
            />
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "28px",
                color: "#333",
                marginBottom: "0.75rem",
                fontWeight: 800,
              }}
            >
              Contract Signed Successfully!
            </h1>
            <p
              style={{
                color: "#666",
                fontSize: "15px",
                lineHeight: 1.7,
                maxWidth: "420px",
                margin: "0 auto",
              }}
            >
              Thank you for signing contract{" "}
              <strong style={{ color: "#F7941D" }}>
                {contract.contract_number}
              </strong>
              . A confirmation email with the signed contract will be sent to
              your email address.
            </p>
          </div>
          <ContractFooter />
        </div>
      </div>
    );
  }

  /* ── Main signing view ── */
  return (
    <div style={pageWrapper}>
      <div style={contentContainer}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/printec-logo.png"
            alt="Printec Virginia LLC"
            style={{ height: "56px" }}
          />
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "28px",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              color: "#F7941D",
              textTransform: "uppercase",
              letterSpacing: "3px",
              margin: "0 0 0.75rem",
            }}
          >
            Client Agreement
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
              color: "#555",
              fontSize: "14px",
            }}
          >
            <span>
              <strong style={{ color: "#333" }}>Contract:</strong>{" "}
              {contract.contract_number}
            </span>
            {contract.event_date && (
              <span>
                <strong style={{ color: "#333" }}>Event Date:</strong>{" "}
                {formatDate(contract.event_date)}
              </span>
            )}
          </div>
          {contract.venue && (
            <p
              style={{ color: "#555", fontSize: "14px", marginTop: "0.5rem" }}
            >
              <strong style={{ color: "#333" }}>Venue:</strong>{" "}
              {contract.venue}
            </p>
          )}
        </div>

        <hr style={dividerStyle} />

        {/* Client Info */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={sectionTitle}>Client Information</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <p style={fieldLabel}>Name</p>
              <p style={fieldValue}>{contract.client_name || "\u2014"}</p>
            </div>
            <div>
              <p style={fieldLabel}>Email</p>
              <p style={fieldValue}>{contract.client_email || "\u2014"}</p>
            </div>
            {contract.service_description && (
              <div style={{ gridColumn: "1 / -1" }}>
                <p style={fieldLabel}>Service</p>
                <p style={fieldValue}>{contract.service_description}</p>
              </div>
            )}
          </div>
        </section>

        <hr style={dividerStyle} />

        {/* Pricing */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={sectionTitle}>Pricing</h2>
          <div
            style={{
              background: "#f9f9f9",
              border: "1px solid #e8e8e8",
              borderRadius: "8px",
              padding: "1.25rem",
            }}
          >
            <div style={priceRow}>
              <span style={priceLabel}>Total Price</span>
              <span style={priceValueHighlight}>
                {formatCurrency(contract.total_price)}
              </span>
            </div>
            <div style={priceRow}>
              <span style={priceLabel}>Advance Payment</span>
              <span style={priceValueNormal}>
                {formatCurrency(contract.advance_amount)}
              </span>
            </div>
            <div style={priceRow}>
              <span style={priceLabel}>Balance Due</span>
              <span style={priceValueHighlight}>
                {formatCurrency(contract.balance_amount)}
              </span>
            </div>
            {contract.travel_cost > 0 && (
              <div style={priceRow}>
                <span style={priceLabel}>Travel Cost</span>
                <span style={priceValueNormal}>
                  {formatCurrency(contract.travel_cost)}
                </span>
              </div>
            )}
            {contract.balance_due && (
              <div
                style={{
                  ...priceRow,
                  borderTop: "1px solid #e0e0e0",
                  paddingTop: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                <span style={priceLabel}>Balance Due Timing</span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#F7941D",
                    fontWeight: 600,
                  }}
                >
                  {contract.balance_due}
                </span>
              </div>
            )}
          </div>
        </section>

        <hr style={dividerStyle} />

        {/* Terms */}
        {contract.terms && contract.terms.length > 0 && (
          <>
            <section style={{ marginBottom: "2rem" }}>
              <h2 style={sectionTitle}>Terms & Conditions</h2>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {contract.terms.map((term, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "14px",
                      color: "#444",
                      lineHeight: 1.7,
                      paddingLeft: "0.5rem",
                    }}
                  >
                    {term}
                  </li>
                ))}
              </ol>
            </section>

            <hr style={dividerStyle} />
          </>
        )}

        {/* Signature Area */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={sectionTitle}>Signature</h2>
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "1rem",
            }}
          >
            Draw Your Signature Below
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <canvas
                ref={canvasRef}
                width={400}
                height={200}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={{
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  cursor: "crosshair",
                  touchAction: "none",
                  display: "block",
                  maxWidth: "100%",
                  height: "auto",
                  background: "#fff",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginTop: "1rem",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={clearCanvas}
                  style={{
                    padding: "0.625rem 1.5rem",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    color: "#666",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Clear
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    padding: "0.625rem 2rem",
                    background: "#F7941D",
                    border: "none",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: submitting ? "wait" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                    transition: "all 0.2s",
                  }}
                >
                  {submitting ? "Submitting..." : "Sign & Submit"}
                </button>
              </div>
              {error && (
                <p
                  style={{
                    color: "#dc2626",
                    fontSize: "13px",
                    textAlign: "center",
                    marginTop: "0.75rem",
                  }}
                >
                  {error}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <ContractFooter />
      </div>
    </div>
  );
}

/* ── Footer Component ── */
function ContractFooter() {
  return (
    <div
      style={{
        borderTop: "1px solid #e8e8e8",
        paddingTop: "1.5rem",
        marginTop: "1rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          color: "#999",
          letterSpacing: "0.5px",
          margin: 0,
        }}
      >
        Printec Virginia LLC &mdash; 15485 Marsh Overlook Dr, Woodbridge, VA
        22191 &mdash; (715) 503-5444
      </p>
    </div>
  );
}

/* ── Style constants ── */
const pageWrapper: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f5f5f5",
  padding: "2rem 1rem",
  fontFamily: "'Inter', Arial, sans-serif",
};

const contentContainer: React.CSSProperties = {
  maxWidth: "680px",
  margin: "0 auto",
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
  padding: "2.5rem",
};

const dividerStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #eee",
  margin: "0 0 2rem",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "2px",
  color: "#F7941D",
  fontWeight: 700,
  marginBottom: "1rem",
};

const fieldLabel: React.CSSProperties = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "#999",
  margin: "0 0 0.25rem",
  fontWeight: 500,
};

const fieldValue: React.CSSProperties = {
  fontSize: "15px",
  color: "#333",
  margin: 0,
  lineHeight: 1.5,
};

const priceRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem 0",
};

const priceLabel: React.CSSProperties = {
  fontSize: "14px",
  color: "#666",
};

const priceValueNormal: React.CSSProperties = {
  fontSize: "14px",
  color: "#333",
  fontWeight: 500,
};

const priceValueHighlight: React.CSSProperties = {
  fontSize: "16px",
  color: "#F7941D",
  fontWeight: 700,
};
