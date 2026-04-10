# Manual Quote Creation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Allow admins to create quotes for walk-in/phone customers who have no existing inquiry, by entering customer details and being redirected to the existing quote builder.

**Architecture:** A new `/admin/quotes/new` page collects customer info (name, service required; email, phone, description, budget, event_date optional), POSTs to the existing inquiries API to auto-create an inquiry with status "Quoted", then redirects to the existing quote builder. The inquiries API validation is relaxed to require only name (not name+email). The "Send to Customer" button in the quote builder is conditionally hidden when the inquiry has no email.

**Tech Stack:** Next.js App Router, TypeScript, Supabase, existing admin UI patterns (inline styles, dark theme)

---

### Task 1: Relax inquiry API validation (name-only required)

**Files:**
- Modify: `src/app/api/admin/inquiries/route.ts:26-36`

**Step 1: Update POST validation**

Current code at line 31-36 requires both name and email:
```typescript
if (!name || !email) {
  return NextResponse.json(
    { error: "Name and email are required." },
    { status: 400 }
  );
}
```

Change to require only name:
```typescript
if (!name) {
  return NextResponse.json(
    { error: "Name is required." },
    { status: 400 }
  );
}
```

Also update the insert to handle email being null (line 38-50):
```typescript
const { data, error } = await supabase
  .from("inquiries")
  .insert({
    name,
    email: email || null,
    phone: phone || null,
    service: service || null,
    description: description || null,
    source: source || "admin",
    status: status || "New",
  })
  .select()
  .single();
```

**Step 2: Verify the dev server still works**

Run: `cd /Users/arsalseemab/Desktop/github/printec && npx next dev -p 3424`

Test manually: existing inquiry creation from admin still works.

**Step 3: Commit**

```bash
git add src/app/api/admin/inquiries/route.ts
git commit -m "fix: relax inquiry API to require only name, email now optional"
```

---

### Task 2: Create `/admin/quotes/new` page

**Files:**
- Create: `src/app/admin/quotes/new/page.tsx`

**Step 1: Create the new page**

Build a client component with:
- Page title "Create Manual Quote"
- Form fields: Name (required), Service (required dropdown from `SERVICES_NAV` in constants.ts), Email (optional), Phone (optional), Description (optional textarea), Budget (optional), Event Date (optional date input)
- "Continue to Quote Builder" button (orange, primary)
- "Cancel" link back to `/admin/quotes`
- On submit: POST to `/api/admin/inquiries` with `{ name, email, phone, service, description, budget, event_date, source: "manual-quote", status: "Quoted" }`
- On success: `router.push(/admin/inquiries/${data.id}/quote)`
- On error: show inline error message
- Style: match existing admin pages (dark bg `#0C0C0C`, cards `#111` with `#222` borders, orange accent `#F7941D`, 13-14px font)

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES_NAV } from "@/lib/constants";

export default function CreateManualQuotePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !service) {
      setError("Name and Service are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          service,
          description: description.trim() || null,
          budget: budget.trim() || null,
          event_date: eventDate || null,
          source: "manual-quote",
          status: "Quoted",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create inquiry");
      }

      const data = await res.json();
      router.push(`/admin/inquiries/${data.id}/quote`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "0.6rem 0.75rem",
    background: "#111",
    border: "1px solid #333",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.35rem",
    color: "rgba(255,255,255,0.6)",
    fontSize: "12px",
    fontWeight: 600 as const,
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Link
        href="/admin/quotes"
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
        <ArrowLeft size={14} /> Back to Quotes
      </Link>

      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "0.5rem",
        }}
      >
        Create Manual Quote
      </h1>
      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "14px",
          marginBottom: "2rem",
        }}
      >
        Enter customer details to create a new quote. An inquiry will be
        automatically created.
      </p>

      {error && (
        <div
          style={{
            padding: "0.75rem 1rem",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "4px",
            color: "#ef4444",
            fontSize: "13px",
            marginBottom: "1.5rem",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "4px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* Name — required */}
          <div>
            <label style={labelStyle}>
              Name <span style={{ color: "#F7941D" }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer name"
              required
              style={inputStyle}
            />
          </div>

          {/* Service — required */}
          <div>
            <label style={labelStyle}>
              Service <span style={{ color: "#F7941D" }}>*</span>
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="">Select a service...</option>
              {SERVICES_NAV.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Email — optional */}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@email.com (optional)"
              style={inputStyle}
            />
          </div>

          {/* Phone — optional */}
          <div>
            <label style={labelStyle}>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number (optional)"
              style={inputStyle}
            />
          </div>

          {/* Description — optional */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what they need (optional)"
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Budget + Event Date row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Budget</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $500 (optional)"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1.5rem",
            justifyContent: "flex-end",
          }}
        >
          <Link
            href="/admin/quotes"
            style={{
              padding: "0.6rem 1.25rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid #333",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1.25rem",
              background: submitting ? "rgba(247,148,29,0.3)" : "#F7941D",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: submitting ? "wait" : "pointer",
            }}
          >
            {submitting ? "Creating..." : "Continue to Quote Builder"}
            {!submitting && <ArrowRight size={14} />}
          </button>
        </div>
      </form>
    </div>
  );
}
```

**Step 2: Verify the page renders**

Navigate to `http://localhost:3424/admin/quotes/new` and confirm the form renders correctly.

**Step 3: Commit**

```bash
git add src/app/admin/quotes/new/page.tsx
git commit -m "feat: add manual quote creation page at /admin/quotes/new"
```

---

### Task 3: Add "Create Quote" button to quotes listing page

**Files:**
- Modify: `src/app/admin/quotes/page.tsx` (around line 26, after page title)

**Step 1: Add the button**

Find the page heading (search for the `<h1>` tag with "Quotes" text) and add a "Create Quote" button next to it, linking to `/admin/quotes/new`. Use a `Link` from `next/link` with `Plus` icon from `lucide-react`.

Add `Plus` to the lucide-react import at line 5:
```typescript
import { Send, Eye, RefreshCw, Plus } from "lucide-react";
```

Then wrap the heading and button in a flex container:
```tsx
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
  <h1 style={{ /* existing styles */ }}>Quotes</h1>
  <Link
    href="/admin/quotes/new"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      background: "#F7941D",
      border: "none",
      borderRadius: "4px",
      color: "#fff",
      fontSize: "13px",
      fontWeight: 600,
      textDecoration: "none",
    }}
  >
    <Plus size={14} /> Create Quote
  </Link>
</div>
```

**Step 2: Verify**

Navigate to `/admin/quotes` and confirm the button appears and links to `/admin/quotes/new`.

**Step 3: Commit**

```bash
git add src/app/admin/quotes/page.tsx
git commit -m "feat: add Create Quote button to quotes listing page"
```

---

### Task 4: Add "Create Quote" link to admin sidebar

**Files:**
- Modify: `src/app/admin/layout.tsx:29-44` (NAV_ITEMS array)

**Step 1: Add sidebar entry**

Add `PlusCircle` to the lucide-react import at line 7-27.

Then add a new nav item after the existing Quotes entry (line 37):
```typescript
{ label: "Quotes", href: "/admin/quotes", icon: ClipboardList },
{ label: "  + Create Quote", href: "/admin/quotes/new", icon: PlusCircle },
```

Note: The indented label with `+` visually nests it under Quotes.

**Step 2: Verify**

Check sidebar shows "Create Quote" under Quotes, and clicking it navigates to `/admin/quotes/new`.

**Step 3: Commit**

```bash
git add src/app/admin/layout.tsx
git commit -m "feat: add Create Quote link to admin sidebar navigation"
```

---

### Task 5: Hide "Send to Customer" button when inquiry has no email

**Files:**
- Modify: `src/app/admin/inquiries/[id]/quote/page.tsx:353-374`

**Step 1: Wrap the send button in an email check**

The send button is at lines 353-374. Wrap it with a conditional check on `inquiry?.email`:

```tsx
{inquiry?.email && (
  <button
    onClick={handleSend}
    disabled={sending}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      background: sending
        ? "rgba(247,148,29,0.3)"
        : "rgba(247,148,29,0.15)",
      border: "1px solid #F7941D",
      borderRadius: "4px",
      color: "#F7941D",
      fontSize: "13px",
      fontWeight: 600,
      cursor: sending ? "wait" : "pointer",
      opacity: sending ? 0.6 : 1,
    }}
  >
    <Send size={14} /> {sending ? "Sending..." : "Send to Customer"}
  </button>
)}
```

**Step 2: Verify both scenarios**

- Open a quote for an inquiry WITH email → "Send to Customer" visible
- Create a manual quote WITHOUT email → only "Save" and "Download PDF" visible

**Step 3: Commit**

```bash
git add src/app/admin/inquiries/[id]/quote/page.tsx
git commit -m "feat: hide Send to Customer button when inquiry has no email"
```

---

### Task 6: End-to-end test and final commit

**Step 1: Test the full flow — with email**

1. Go to `/admin/quotes` → click "Create Quote"
2. Fill in: Name "John Doe", Service "Business Signage", Email "john@test.com"
3. Click "Continue to Quote Builder"
4. Verify redirect to quote builder with customer info displayed
5. Add a line item, save the quote
6. Verify "Send to Customer" button is visible
7. Check `/admin/inquiries` — new inquiry appears with status "Quoted"

**Step 2: Test the full flow — without email**

1. Go to `/admin/quotes/new`
2. Fill in: Name "Walk-in Customer", Service "Floor Wraps" (no email)
3. Click "Continue to Quote Builder"
4. Add a line item, save the quote
5. Verify "Send to Customer" button is NOT visible
6. Verify "Download PDF" works

**Step 3: Test sidebar link**

Click "Create Quote" in sidebar → navigates to `/admin/quotes/new`.

**Step 4: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "feat: complete manual quote creation feature"
```
