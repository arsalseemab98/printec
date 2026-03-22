"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";

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
  created_at: string;
}

function formatDate(d: string | null) {
  if (!d) return "\u2014";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

export default function SignContractPage() {
  const params = useParams();
  const id = params.id as string;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/contracts/${id}`);
        if (!res.ok) {
          setError("Contract not found.");
          return;
        }
        const data = await res.json();
        setContract(data);
        if (data.signed_at) {
          setSigned(true);
        }
      } catch {
        setError("Failed to load contract.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const getCanvasCoords = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if ("touches" in e) {
        const touch = e.touches[0];
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  function handlePointerDown(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  }

  function handlePointerMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  }

  function handlePointerUp() {
    setIsDrawing(false);
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  }

  async function handleSign() {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;
    setSigning(true);
    try {
      const signatureData = canvas.toDataURL("image/png");
      const res = await fetch(`/api/contracts/${id}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signature_data: signatureData }),
      });
      if (res.ok) {
        setSigned(true);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to sign contract.");
      }
    } catch {
      alert("Failed to sign contract. Please try again.");
    } finally {
      setSigning(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={{ color: "#666", textAlign: "center", padding: "4rem 0" }}>
            Loading contract...
          </p>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p
            style={{
              color: "#ef4444",
              textAlign: "center",
              padding: "4rem 0",
              fontSize: "16px",
            }}
          >
            {error || "Contract not found."}
          </p>
        </div>
      </div>
    );
  }

  if (signed) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "32px",
              }}
            >
              &#10003;
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#111",
                margin: "0 0 0.75rem",
              }}
            >
              Contract Signed Successfully
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.7 }}>
              Thank you, {contract.client_name || "Client"}! Your signed
              contract <strong style={{ color: "#F7941D" }}>{contract.contract_number}</strong> has
              been submitted. A copy will be sent to your email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ margin: 0, color: "#F7941D", fontSize: "18px", fontWeight: 800, letterSpacing: "1px" }}>
                PRINTEC VIRGINIA LLC
              </h2>
              <p style={{ margin: "4px 0 0", color: "#888", fontSize: "12px" }}>
                printecwisconsin@gmail.com | printecvirginia@gmail.com
              </p>
              <p style={{ margin: "2px 0 0", color: "#888", fontSize: "12px" }}>
                www.printecwrap.com | (715) 503-5444
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, color: "#F7941D", fontWeight: 700, fontSize: "14px" }}>
                {contract.contract_number}
              </p>
              <p style={{ margin: "4px 0 0", color: "#888", fontSize: "12px" }}>
                {formatDate(contract.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 style={styles.title}>Client Agreement</h1>
        <div style={{ height: 3, width: 60, background: "#F7941D", margin: "0 0 2rem" }} />

        {/* Event Info */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <p style={styles.infoLabel}>Event Date</p>
            <p style={styles.infoValue}>{formatDate(contract.event_date)}</p>
          </div>
          <div style={styles.infoCard}>
            <p style={styles.infoLabel}>Venue</p>
            <p style={styles.infoValue}>{contract.venue || "\u2014"}</p>
          </div>
          <div style={styles.infoCard}>
            <p style={styles.infoLabel}>Service</p>
            <p style={styles.infoValue}>
              {contract.service_description || "\u2014"}
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div style={styles.pricingSection}>
          <div style={styles.pricingRow}>
            <span style={{ color: "#666" }}>Total Price</span>
            <span style={{ color: "#111", fontWeight: 700, fontSize: "18px" }}>
              {formatCurrency(contract.total_price)}
            </span>
          </div>
          <div style={styles.pricingRow}>
            <span style={{ color: "#666" }}>Advance Amount</span>
            <span style={{ color: "#111", fontWeight: 600 }}>
              {formatCurrency(contract.advance_amount)}
            </span>
          </div>
          <div style={styles.pricingRow}>
            <span style={{ color: "#666" }}>Balance</span>
            <span style={{ color: "#F7941D", fontWeight: 700 }}>
              {formatCurrency(contract.balance_amount)}
            </span>
          </div>
          <div style={{ ...styles.pricingRow, borderBottom: "none" }}>
            <span style={{ color: "#666" }}>Balance Due</span>
            <span style={{ color: "#111" }}>
              {contract.balance_due || "Due on event day"}
            </span>
          </div>
          {contract.travel_cost > 0 && (
            <div style={{ ...styles.pricingRow, borderBottom: "none" }}>
              <span style={{ color: "#666" }}>Travel Cost</span>
              <span style={{ color: "#111" }}>
                {formatCurrency(contract.travel_cost)}
              </span>
            </div>
          )}
        </div>

        {/* Terms */}
        <h2 style={styles.sectionTitle}>Terms & Conditions</h2>
        <div style={{ marginBottom: "2rem" }}>
          {(contract.terms || []).map((term, i) => (
            <div key={i} style={styles.termRow}>
              <span style={styles.termNum}>{i + 1}.</span>
              <p style={styles.termText}>{term}</p>
            </div>
          ))}
        </div>

        {/* Signature Section */}
        <div style={{ borderTop: "2px solid #F7941D", paddingTop: "2rem" }}>
          <h2 style={styles.sectionTitle}>Sign Below</h2>
          <p style={{ color: "#888", fontSize: "14px", margin: "0 0 1rem" }}>
            Use your mouse or finger to draw your signature in the box below.
          </p>

          <div
            style={{
              border: "2px solid #ddd",
              borderRadius: "8px",
              background: "#fff",
              position: "relative",
              overflow: "hidden",
              touchAction: "none",
            }}
          >
            <canvas
              ref={canvasRef}
              width={700}
              height={200}
              style={{
                width: "100%",
                height: "200px",
                cursor: "crosshair",
                display: "block",
              }}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
            />
            {!hasSignature && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#ccc",
                  fontSize: "16px",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Draw your signature here
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginTop: "1rem",
              justifyContent: "flex-end",
            }}
          >
            <button onClick={clearSignature} style={styles.clearBtn}>
              Clear
            </button>
            <button
              onClick={handleSign}
              disabled={!hasSignature || signing}
              style={{
                ...styles.signBtn,
                opacity: !hasSignature || signing ? 0.5 : 1,
                cursor: !hasSignature || signing ? "not-allowed" : "pointer",
              }}
            >
              {signing ? "Submitting..." : "Sign & Submit"}
            </button>
          </div>
        </div>

        {/* Provider Info */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            background: "#f9f9f9",
            borderRadius: "8px",
            borderLeft: "3px solid #F7941D",
          }}
        >
          <p style={{ margin: 0, fontWeight: 700, color: "#111", fontSize: "14px" }}>
            Provider: Printec Virginia LLC
          </p>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "13px" }}>
            Muhammad Azhar — CEO / Founder
          </p>
          <p style={{ margin: "2px 0 0", color: "#666", fontSize: "13px" }}>
            15485 Marsh Overlook Dr, Woodbridge, VA 22191
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "2rem 0 1rem",
            color: "#bbb",
            fontSize: "12px",
          }}
        >
          PRINTEC VIRGINIA LLC &mdash; From Vision to Vinyl
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f5",
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: "2rem 1rem",
  },
  container: {
    maxWidth: 780,
    margin: "0 auto",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
    padding: "2.5rem",
  },
  header: {
    borderBottom: "2px solid #F7941D",
    paddingBottom: "1rem",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#111",
    margin: "0 0 0.5rem",
    letterSpacing: "1px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "1rem",
    marginBottom: "2rem",
  },
  infoCard: {
    background: "#f9f9f9",
    borderRadius: "8px",
    padding: "1rem",
    borderLeft: "3px solid #F7941D",
  },
  infoLabel: {
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#F7941D",
    fontWeight: 700,
    margin: "0 0 0.35rem",
  },
  infoValue: {
    fontSize: "14px",
    color: "#111",
    margin: 0,
    fontWeight: 600,
  },
  pricingSection: {
    background: "#f9f9f9",
    borderRadius: "8px",
    padding: "1rem 1.25rem",
    marginBottom: "2rem",
  },
  pricingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.6rem 0",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#111",
    margin: "0 0 1rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  termRow: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "0.5rem",
    alignItems: "flex-start",
  },
  termNum: {
    color: "#F7941D",
    fontWeight: 700,
    fontSize: "13px",
    minWidth: "24px",
  },
  termText: {
    fontSize: "13px",
    color: "#555",
    lineHeight: 1.7,
    margin: 0,
  },
  clearBtn: {
    padding: "0.6rem 1.5rem",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "6px",
    color: "#666",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  signBtn: {
    padding: "0.6rem 2rem",
    background: "#F7941D",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 700,
  },
};
