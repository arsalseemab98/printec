"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const DEFAULT_TERMS = [
  "Services: Provider agrees to perform the {service} for {venue} printing, install (\"Services\") Custom Design Included Total of ${total}",
  "Payment: Client agrees to pay Provider the total fee of ${advance} advance and balance ${balance} {balance_due}, for the Services, payable as follows:",
  "Deposit/Cancellation: Printec also reserves right to cancel the dance floor event in any unforeseen circumstances, with the return of the deposit.",
  "Confidentiality: Both parties agree to keep all information related to this Agreement confidential and shall not disclose it to any third party without the prior written consent of the other party.",
  "Liability: Provider's total liability under this Agreement shall be limited to the total fee paid by the Client. In no event shall Provider be liable for any indirect, special, or consequential damages caused by the floor vinyl installation to the property or any individual.",
  "Governing Law: This Agreement shall be governed by the laws of Virginia without regard to its convict of law provisions.",
  "Entire Agreement: This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements and understandings, whether written or oral, relating to the subject matter of this Agreement.",
  "Film: Removable 6 mil vinyl specially designed for wooden dance floors.",
  "Amendment: This Agreement may be amended or modified only by a written agreement signed by both parties.",
  "Signatures: This Agreement is executed by the duly authorized representatives",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem",
  background: "#0C0C0C",
  border: "1px solid #333",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "rgba(255,255,255,0.35)",
  display: "block",
  marginBottom: "6px",
  fontWeight: 500,
};

export default function NewContractPageWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: "40px", color: "rgba(255,255,255,0.5)" }}>Loading...</div>}>
      <NewContractPage />
    </Suspense>
  );
}

function NewContractPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inquiryId = searchParams.get("inquiry_id");

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [travelCost, setTravelCost] = useState<number>(0);
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);
  const [balanceDue, setBalanceDue] = useState("One week prior to event");
  const [category, setCategory] = useState("Other");
  const [terms, setTerms] = useState<string[]>([...DEFAULT_TERMS]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingInquiry, setLoadingInquiry] = useState(!!inquiryId);

  const balanceAmount = totalPrice - advanceAmount;

  // Pre-fill from inquiry if inquiry_id is present
  useEffect(() => {
    if (!inquiryId) return;
    async function loadInquiry() {
      try {
        const res = await fetch(`/api/admin/inquiries/${inquiryId}`);
        if (res.ok) {
          const data = await res.json();
          setClientName(data.name || "");
          setClientEmail(data.email || "");
          setServiceDescription(data.service || "");
        }
      } catch {
        // silent
      } finally {
        setLoadingInquiry(false);
      }
    }
    loadInquiry();
  }, [inquiryId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiry_id: inquiryId || null,
          client_name: clientName,
          client_email: clientEmail,
          event_date: eventDate || null,
          venue,
          service_description: serviceDescription,
          total_price: totalPrice,
          travel_cost: travelCost,
          advance_amount: advanceAmount,
          balance_due: balanceDue,
          category,
          terms,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/admin/contracts/${data.id}`);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create contract.");
        setSubmitting(false);
      }
    } catch {
      alert("Failed to create contract.");
      setSubmitting(false);
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "#F7941D";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "#333";
  }

  if (loadingInquiry) {
    return <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading inquiry data...</p>;
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/contracts"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "rgba(255,255,255,0.5)",
          textDecoration: "none",
          fontSize: "13px",
          marginBottom: "1.5rem",
        }}
      >
        <ArrowLeft size={14} /> Back to Contracts
      </Link>

      {/* Header */}
      <p
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "4px",
          color: "#F7941D",
          fontWeight: 500,
          marginBottom: "0.5rem",
        }}
      >
        New Contract
      </p>
      <h1
        style={{
          fontSize: "36px",
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 2rem 0",
        }}
      >
        Create Agreement
      </h1>

      <form onSubmit={handleSubmit}>
        <div
          className="admin-form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {/* Left column - Client & Event Info */}
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 1.25rem",
              }}
            >
              Client & Event Details
            </h2>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Client Email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                style={{ ...inputStyle, colorScheme: "dark" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Venue</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <label style={labelStyle}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {["Dance Floor Wraps", "Wall Wraps", "Window Wraps", "Channel Letters", "Vinyl Wraps", "Business Signage", "Neon Signs", "Other"].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Service Description</label>
              <textarea
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          {/* Right column - Pricing */}
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 1.25rem",
              }}
            >
              Pricing
            </h2>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Total Price ($)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={totalPrice || ""}
                onChange={(e) => setTotalPrice(Number(e.target.value) || 0)}
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Travel Cost ($)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={travelCost || ""}
                onChange={(e) => setTravelCost(Number(e.target.value) || 0)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Advance Amount ($)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={advanceAmount || ""}
                onChange={(e) => setAdvanceAmount(Number(e.target.value) || 0)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Balance Amount ($)</label>
              <div
                style={{
                  ...inputStyle,
                  background: "#181818",
                  color: "#F7941D",
                  fontWeight: 700,
                  cursor: "default",
                }}
              >
                {balanceAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Balance Due</label>
              <input
                type="text"
                value={balanceDue}
                onChange={(e) => setBalanceDue(e.target.value)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 1.25rem",
            }}
          >
            Contract Terms
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {terms.map((term, i) => (
              <div key={i}>
                <label style={labelStyle}>Term {i + 1}</label>
                <textarea
                  value={term}
                  onChange={(e) => {
                    const updated = [...terms];
                    updated[i] = e.target.value;
                    setTerms(updated);
                  }}
                  rows={2}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "0.75rem 2rem",
            background: "#F7941D",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 700,
            cursor: submitting ? "wait" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Creating..." : "Create Contract"}
        </button>
      </form>
    </div>
  );
}
