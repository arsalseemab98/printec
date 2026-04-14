# Manual Calendar Bookings + Orders Page + Reorderable Nav — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add manual booking creation from the admin calendar, add a new `/admin/orders` page (signed/completed contracts), and make the admin sidebar navigation reorderable via drag-and-drop.

**Architecture:**
- Manual bookings and "orders" both reuse the existing `contracts` table — no new tables. A booking = a contract with no `inquiry_id`; an order = a contract with status `Signed` or `Completed`.
- The admin sidebar's nav order is persisted per-browser in `localStorage` (single-admin product, no multi-user complexity needed).

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Supabase, HTML5 drag-and-drop API (no new deps).

**No test suite exists in this project** — verification is manual (run dev server, click through flows). Each task ends with explicit manual verification steps.

---

## Task 1: Add "Add Booking" button + modal scaffold on calendar

**Files:**
- Modify: `src/app/admin/calendar/page.tsx`

**Step 1: Add modal state + button in header**

Near the top of `CalendarPage`, beside the existing `useState` calls, add:

```tsx
const [showAddModal, setShowAddModal] = useState(false);
const [addModalDate, setAddModalDate] = useState<string>("");
```

In the header row (where the view toggle and legend live), add a button to the right of the view-toggle group:

```tsx
<button
  onClick={() => {
    setAddModalDate(dateKey(new Date()));
    setShowAddModal(true);
  }}
  style={{
    background: ORANGE,
    color: "#0C0C0C",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
  }}
>
  <PlusCircle size={16} /> Add Booking
</button>
```

Add `PlusCircle` to the lucide-react import at the top of the file.

**Step 2: Render a no-op modal stub**

At the bottom of the returned JSX (before the closing wrapper), add:

```tsx
{showAddModal && (
  <div
    onClick={() => setShowAddModal(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 500,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: 8,
        padding: "1.5rem",
        width: "min(480px, 92vw)",
        color: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 1rem", fontSize: 18 }}>Add Booking</h3>
      <p style={{ color: "#999", fontSize: 13 }}>Date: {addModalDate}</p>
      <button
        onClick={() => setShowAddModal(false)}
        style={{ marginTop: 16, background: "#222", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: 4, cursor: "pointer" }}
      >
        Close
      </button>
    </div>
  </div>
)}
```

**Step 3: Verify**

```bash
npx next dev -p 3424
```

Open http://localhost:3424/admin/calendar, click "Add Booking", confirm modal opens with today's date and closes on backdrop or Close.

**Step 4: Commit**

```bash
git add src/app/admin/calendar/page.tsx
git commit -m "feat(admin): add booking modal scaffold to calendar"
```

---

## Task 2: Wire up booking form fields

**Files:**
- Modify: `src/app/admin/calendar/page.tsx`

**Step 1: Add form state**

Below the `addModalDate` state, add:

```tsx
const [bookingForm, setBookingForm] = useState({
  client_name: "",
  client_email: "",
  event_date: "",
  category: "Other",
  venue: "",
  service_description: "",
  total_price: "",
  advance_amount: "",
  status: "Pending",
});
const [savingBooking, setSavingBooking] = useState(false);

const CONTRACT_CATEGORIES = [
  "Vehicle Wrap",
  "Channel Letters",
  "Window Wrap",
  "Wall Wrap",
  "Floor Wrap",
  "Neon Sign",
  "Business Signage",
  "Event / Wedding",
  "Other",
];
const BOOKING_STATUSES = ["Pending", "Sent", "Signed", "Completed"];
```

Update the `Add Booking` button's `onClick` to also reset the form:

```tsx
onClick={() => {
  const today = dateKey(new Date());
  setAddModalDate(today);
  setBookingForm({
    client_name: "",
    client_email: "",
    event_date: today,
    category: "Other",
    venue: "",
    service_description: "",
    total_price: "",
    advance_amount: "",
    status: "Pending",
  });
  setShowAddModal(true);
}}
```

**Step 2: Replace the stub body of the modal with real fields**

Replace the stub `<p>` and Close button with:

```tsx
<h3 style={{ margin: "0 0 1rem", fontSize: 18 }}>Add Booking</h3>

{[
  { key: "client_name", label: "Client Name", type: "text", required: true },
  { key: "client_email", label: "Client Email", type: "email" },
  { key: "event_date", label: "Event Date", type: "date", required: true },
  { key: "venue", label: "Venue", type: "text" },
  { key: "service_description", label: "Service Description", type: "text" },
  { key: "total_price", label: "Total Price ($)", type: "number", required: true },
  { key: "advance_amount", label: "Advance ($)", type: "number" },
].map((f) => (
  <div key={f.key} style={{ marginBottom: "0.75rem" }}>
    <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>
      {f.label}{f.required ? " *" : ""}
    </label>
    <input
      type={f.type}
      value={bookingForm[f.key as keyof typeof bookingForm]}
      onChange={(e) => setBookingForm((p) => ({ ...p, [f.key]: e.target.value }))}
      style={{ width: "100%", padding: "0.5rem", background: "#0C0C0C", border: "1px solid #333", borderRadius: 4, color: "#fff", fontSize: 14, colorScheme: "dark", boxSizing: "border-box" }}
    />
  </div>
))}

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
  <div>
    <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Category</label>
    <select
      value={bookingForm.category}
      onChange={(e) => setBookingForm((p) => ({ ...p, category: e.target.value }))}
      style={{ width: "100%", padding: "0.5rem", background: "#0C0C0C", border: "1px solid #333", borderRadius: 4, color: "#fff", fontSize: 14 }}
    >
      {CONTRACT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
    </select>
  </div>
  <div>
    <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Status</label>
    <select
      value={bookingForm.status}
      onChange={(e) => setBookingForm((p) => ({ ...p, status: e.target.value }))}
      style={{ width: "100%", padding: "0.5rem", background: "#0C0C0C", border: "1px solid #333", borderRadius: 4, color: "#fff", fontSize: 14 }}
    >
      {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  </div>
</div>

<div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
  <button
    onClick={() => setShowAddModal(false)}
    disabled={savingBooking}
    style={{ background: "#222", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: 4, cursor: "pointer", fontSize: 13 }}
  >
    Cancel
  </button>
  <button
    onClick={handleCreateBooking}
    disabled={savingBooking}
    style={{ background: ORANGE, color: "#0C0C0C", border: "none", padding: "0.5rem 1rem", borderRadius: 4, cursor: "pointer", fontSize: 13, fontWeight: 600, opacity: savingBooking ? 0.6 : 1 }}
  >
    {savingBooking ? "Saving..." : "Create Booking"}
  </button>
</div>
```

**Step 3: Verify rendering**

Reload, open modal, confirm all fields render and both dropdowns show their options. `handleCreateBooking` does not exist yet — clicking Create Booking throws a reference error. That's fine; next task implements it.

---

## Task 3: Implement booking save + refetch

**Files:**
- Modify: `src/app/admin/calendar/page.tsx`

**Step 1: Refactor the entries-loader into a reusable function**

Rename the inline `load` inside the existing `useEffect` to a top-level `loadEntries` inside the component, called from `useEffect`. Then wire the effect to call it:

```tsx
const loadEntries = useCallback(async () => {
  setLoading(true);
  const [contractsRes, inquiriesRes] = await Promise.all([
    fetch("/api/admin/contracts"),
    fetch("/api/admin/inquiries"),
  ]);
  // ... existing body, ending with setEntries + setLoading(false)
}, []);

useEffect(() => { loadEntries(); }, [loadEntries]);
```

Add `useCallback` to the React import.

**Step 2: Add `handleCreateBooking`**

```tsx
async function handleCreateBooking() {
  if (!bookingForm.client_name.trim() || !bookingForm.event_date || !bookingForm.total_price) {
    alert("Client name, event date, and total price are required.");
    return;
  }
  setSavingBooking(true);
  try {
    const res = await fetch("/api/admin/contracts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: bookingForm.client_name.trim(),
        client_email: bookingForm.client_email.trim() || null,
        event_date: bookingForm.event_date,
        venue: bookingForm.venue.trim() || null,
        service_description: bookingForm.service_description.trim() || null,
        category: bookingForm.category,
        total_price: Number(bookingForm.total_price) || 0,
        advance_amount: Number(bookingForm.advance_amount) || 0,
        status: bookingForm.status,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Failed to create booking.");
      return;
    }
    setShowAddModal(false);
    await loadEntries();
  } finally {
    setSavingBooking(false);
  }
}
```

**Step 3: Verify before committing**

Check `src/app/api/admin/contracts/route.ts` POST handler (lines ~26+). Confirm it accepts these fields and auto-generates `contract_number`. If POST requires `inquiry_id`, change the schema to allow null (it already does per the PUT whitelist — verify the POST matches). If any of {`category`, `service_description`, `venue`, `advance_amount`} are missing from the POST insert, add them.

**Step 4: Manual test**

1. Reload calendar.
2. Click "Add Booking".
3. Fill: client name "Test Client", event date = tomorrow, category = "Vehicle Wrap", total = 1500, status = Pending.
4. Click Create Booking.
5. Confirm modal closes, calendar refetches, booking badge appears on tomorrow's cell with the right color, and clicking it routes to `/admin/contracts/<new-id>`.

**Step 5: Commit**

```bash
git add src/app/admin/calendar/page.tsx src/app/api/admin/contracts/route.ts
git commit -m "feat(admin): create manual bookings from calendar"
```

---

## Task 4: Click-empty-day to quick-create

**Files:**
- Modify: `src/app/admin/calendar/page.tsx`

**Step 1:** Find the monthly view day-cell render. On cells with no entries, add a subtle `+` affordance on hover and `onClick` → opens the modal with that day's date prefilled.

```tsx
onClick={() => {
  if (dayEntries.length > 0) return; // cells with bookings keep their current click behavior
  const key = dateKey(day);
  setAddModalDate(key);
  setBookingForm((p) => ({ ...p, event_date: key }));
  setShowAddModal(true);
}}
```

Set `cursor: "pointer"` on the cell so the affordance is discoverable.

**Step 2: Verify**

Click an empty day → modal opens with that date prefilled.

**Step 3: Commit**

```bash
git add src/app/admin/calendar/page.tsx
git commit -m "feat(admin): click empty calendar day to quick-add booking"
```

---

## Task 5: Create `/admin/orders` page

**Files:**
- Create: `src/app/admin/orders/page.tsx`

**Step 1: Scaffold the page**

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface Contract {
  id: string;
  contract_number: string;
  client_name: string | null;
  client_email: string | null;
  event_date: string | null;
  category: string | null;
  total_price: number;
  balance_amount: number;
  status: string;
  signed_at: string | null;
  completed_at: string | null;
  created_at: string;
}

const ORANGE = "#F7941D";
const ORDER_STATUSES = ["All", "Signed", "Completed"] as const;
const STATUS_COLORS: Record<string, string> = {
  Signed: "#22C55E",
  Completed: "#6B7280",
};

function fmtDate(d: string | null) {
  if (!d) return "—";
  const [y, m, dd] = d.slice(0, 10).split("-").map(Number);
  return new Date(y, (m || 1) - 1, dd || 1).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function fmtMoney(n: number) {
  return "$" + Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof ORDER_STATUSES)[number]>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/contracts");
      const all: Contract[] = await res.json();
      setOrders(Array.isArray(all) ? all.filter((c) => c.status === "Signed" || c.status === "Completed") : []);
      setLoading(false);
    })();
  }, []);

  const filtered = orders.filter((o) => {
    if (filter !== "All" && o.status !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        o.contract_number?.toLowerCase().includes(q) ||
        o.client_name?.toLowerCase().includes(q) ||
        o.category?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalRevenue = filtered.reduce((s, o) => s + Number(o.total_price || 0), 0);

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Orders</h1>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 24 }}>
        Confirmed jobs (Signed + Completed contracts). {filtered.length} orders · {fmtMoney(totalRevenue)} total
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {ORDER_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              background: filter === s ? ORANGE : "#111",
              color: filter === s ? "#0C0C0C" : "#fff",
              border: `1px solid ${filter === s ? ORANGE : "#222"}`,
              padding: "0.4rem 0.9rem",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {s}
          </button>
        ))}
        <div style={{ marginLeft: "auto", position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: "#666" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search client, number, category..."
            style={{ background: "#111", border: "1px solid #222", borderRadius: 4, color: "#fff", fontSize: 13, padding: "0.45rem 0.75rem 0.45rem 2rem", width: 260 }}
          />
        </div>
      </div>

      {loading ? (
        <p style={{ color: "#666" }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: "#666" }}>No orders yet.</p>
      ) : (
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 140px 140px 120px 120px 100px", padding: "12px 16px", borderBottom: "1px solid #222", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#666", fontWeight: 600 }}>
            <div>Order #</div><div>Client</div><div>Category</div><div>Event Date</div><div>Total</div><div>Balance</div><div>Status</div>
          </div>
          {filtered.map((o) => (
            <Link
              key={o.id}
              href={`/admin/contracts/${o.id}`}
              style={{ display: "grid", gridTemplateColumns: "120px 1fr 140px 140px 120px 120px 100px", padding: "14px 16px", borderBottom: "1px solid #1a1a1a", fontSize: 13, color: "#fff", textDecoration: "none" }}
            >
              <div style={{ color: ORANGE, fontWeight: 600 }}>{o.contract_number}</div>
              <div>{o.client_name || "—"}</div>
              <div style={{ color: "#aaa" }}>{o.category || "—"}</div>
              <div style={{ color: "#aaa" }}>{fmtDate(o.event_date)}</div>
              <div>{fmtMoney(o.total_price)}</div>
              <div style={{ color: o.balance_amount > 0 ? "#EAB308" : "#22C55E" }}>{fmtMoney(o.balance_amount)}</div>
              <div><span style={{ background: STATUS_COLORS[o.status], color: "#0C0C0C", padding: "2px 8px", borderRadius: 3, fontSize: 11, fontWeight: 600 }}>{o.status}</span></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Manual test**

Visit `/admin/orders`. Confirm: Signed + Completed contracts show; pending/sent hidden; search filters; filter tabs work; clicking a row navigates to the contract detail.

**Step 3: Commit**

```bash
git add src/app/admin/orders/page.tsx
git commit -m "feat(admin): add orders page for signed/completed contracts"
```

---

## Task 6: Add Orders to sidebar nav

**Files:**
- Modify: `src/app/admin/layout.tsx`

**Step 1:** Import `Package` icon from lucide-react. Add to `NAV_ITEMS` after Contracts:

```tsx
{ label: "Orders", href: "/admin/orders", icon: Package },
```

**Step 2: Verify** — nav shows Orders entry, highlights when active, navigates correctly.

**Step 3: Commit**

```bash
git add src/app/admin/layout.tsx
git commit -m "feat(admin): link orders page in sidebar nav"
```

---

## Task 7: Extract nav into a reorderable component

**Files:**
- Modify: `src/app/admin/layout.tsx`

**Step 1: Store order in localStorage + state**

Add near the top of `AdminLayout`:

```tsx
const STORAGE_KEY = "admin-nav-order-v1";
const [navOrder, setNavOrder] = useState<string[]>(() => NAV_ITEMS.map((i) => i.href));

useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as string[];
      const known = new Set(NAV_ITEMS.map((i) => i.href));
      // keep saved order, append any new items that appeared since last save
      const merged = [
        ...parsed.filter((h) => known.has(h)),
        ...NAV_ITEMS.map((i) => i.href).filter((h) => !parsed.includes(h)),
      ];
      setNavOrder(merged);
    } catch { /* fall back to default */ }
  }
}, []);

useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(navOrder));
}, [navOrder]);

const orderedNavItems = navOrder
  .map((href) => NAV_ITEMS.find((i) => i.href === href))
  .filter(Boolean) as typeof NAV_ITEMS;
```

Replace both `NAV_ITEMS.map(...)` loops (desktop sidebar + mobile drawer) with `orderedNavItems.map(...)`.

**Step 2: Add drag handlers**

Add drag state:

```tsx
const [dragIndex, setDragIndex] = useState<number | null>(null);
const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

function moveItem(from: number, to: number) {
  setNavOrder((prev) => {
    const next = [...prev];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    return next;
  });
}
```

On each sidebar `<Link>` wrapper, add:

```tsx
draggable
onDragStart={() => setDragIndex(idx)}
onDragOver={(e) => { e.preventDefault(); setDragOverIndex(idx); }}
onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
onDrop={(e) => {
  e.preventDefault();
  if (dragIndex !== null && dragIndex !== idx) moveItem(dragIndex, idx);
  setDragIndex(null);
  setDragOverIndex(null);
}}
style={{
  // existing styles...
  opacity: dragIndex === idx ? 0.4 : 1,
  borderTop: dragOverIndex === idx && dragIndex !== null && dragIndex !== idx ? `2px solid ${activeColor}` : undefined,
  cursor: "grab",
}}
```

Use the `idx` from `.map((item, idx) => ...)`.

**Step 3: Add a "Reset order" button**

Below the dark/light toggle and above Logout:

```tsx
<button
  onClick={() => {
    setNavOrder(NAV_ITEMS.map((i) => i.href));
    localStorage.removeItem(STORAGE_KEY);
  }}
  style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 1.25rem", background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 11, cursor: "pointer", width: "100%", textAlign: "left" }}
>
  Reset nav order
</button>
```

**Step 4: Manual test**

- Drag "Calendar" above "Dashboard" — order updates, reload preserves the new order.
- Drag "Orders" to top — persists.
- Click "Reset nav order" — defaults return.
- Mobile drawer uses the same order (read-only on touch is fine; don't add drag on mobile — test that mobile still works).

**Step 5: Commit**

```bash
git add src/app/admin/layout.tsx
git commit -m "feat(admin): drag-reorderable sidebar nav persisted to localStorage"
```

---

## Task 8: Final push

```bash
git push
```

Verify on Vercel that the preview/production deploy succeeds and the three features work in the deployed admin.

---

## Rollback notes

- Booking creation: nothing new in DB — contracts POST already exists. Revert the calendar page and you're back to the previous state.
- Orders page: purely additive; delete `src/app/admin/orders/page.tsx` to remove.
- Nav reorder: users' saved order lives in `localStorage[admin-nav-order-v1]`. Clearing that key or clicking Reset restores the default.
