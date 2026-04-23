# Sticky Actions Column Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Pin the Actions column of `/admin/customers` desktop table to the right edge so Inquiry/Contract/Delete buttons are always visible — no more right-edge clipping on narrow laptops.

**Architecture:** Pure CSS `position: sticky; right: 0` on the Actions `<th>` and `<td>`, backed by a new `.sticky-action` class in `globals.css` that handles both dark and light mode backgrounds. Mobile (<=768px) still renders the card view — no change needed on that path, but we verify `flex-wrap` is in place.

**Tech Stack:** Next.js 16 App Router, React 19, plain CSS (globals.css), inline styles.

**No test framework in this project** — the codebase has no jest/vitest setup (`package.json` has no `test` script, no `__tests__` or `.test.tsx` files exist). Verification is visual via Safari/Chrome at specific viewport widths. Each task still lists an explicit pass/fail criterion.

**Design doc:** `docs/plans/2026-04-24-customers-sticky-actions-design.md`

---

### Task 1: Add `.sticky-action` CSS class

**Files:**
- Modify: `src/app/globals.css` — append new rules near the existing `.admin-table-wrap` block (around line 532–538).

**Step 1: Read the current block to find the exact insertion point**

Run:
```bash
grep -n "admin-table-wrap" src/app/globals.css
```
Expected: two hits around lines 532 and 536.

**Step 2: Append the sticky-action rule right after `.admin-table-wrap table`**

Add these rules inside the same `@media (max-width: 768px)` block is NOT desired — sticky needs to apply on desktop where the table is visible. Put the rule at module scope (outside any media query), and override for light mode via `.admin-light`.

Insert after line 538 (end of `.admin-table-wrap table` block):

```css
/* Sticky Actions column for admin tables (dark mode default) */
.sticky-action {
  position: sticky;
  right: 0;
  background: #111;
  border-left: 1px solid #222;
  z-index: 1;
}
th.sticky-action {
  z-index: 2;
}
.admin-light .sticky-action {
  background: #fff !important;
  border-left-color: #e0e0e0 !important;
}
```

**Step 3: Verify the file still parses**

Run:
```bash
npx next lint --file src/app/globals.css 2>&1 | head -20
```
Expected: no CSS syntax errors. (Lint may skip CSS — acceptable as long as no parse error appears.)

**Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "css: add .sticky-action utility for pinned right columns"
```

---

### Task 2: Apply `.sticky-action` to the Actions `<th>`

**Files:**
- Modify: `src/app/admin/customers/page.tsx` — the table header block at `{["Name", "Email", ..., "Actions"].map((h) => ...)}`.

**Step 1: Locate the current header loop**

Run:
```bash
grep -n '"Actions"' src/app/admin/customers/page.tsx
```
Expected: one hit (currently line ~509).

**Step 2: Change the header map to conditionally apply `className="sticky-action"` when the header is "Actions"**

Replace the header `<th>` block — currently:

```tsx
{[
  "Name", "Email", "Phone", "Source", "Industry",
  "Type", "Status", "Date", "Actions",
].map((h) => (
  <th
    key={h}
    style={{
      textAlign: "left",
      padding: "0.75rem 1rem",
      color: "rgba(255,255,255,0.4)",
      fontWeight: 500,
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      borderBottom: "1px solid #222",
    }}
  >
    {h}
  </th>
))}
```

With:

```tsx
{[
  "Name", "Email", "Phone", "Source", "Industry",
  "Type", "Status", "Date", "Actions",
].map((h) => (
  <th
    key={h}
    className={h === "Actions" ? "sticky-action" : undefined}
    style={{
      textAlign: "left",
      padding: "0.75rem 1rem",
      color: "rgba(255,255,255,0.4)",
      fontWeight: 500,
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      borderBottom: "1px solid #222",
    }}
  >
    {h}
  </th>
))}
```

**Step 3: Type-check**

Run:
```bash
npx tsc --noEmit; echo "EXIT=$?"
```
Expected: `EXIT=0`.

**Step 4: Do NOT commit yet.** The `<td>` change in Task 3 belongs in the same commit.

---

### Task 3: Apply `.sticky-action` to the Actions `<td>`

**Files:**
- Modify: `src/app/admin/customers/page.tsx` — the last `<td>` in the row render (the one containing the three action buttons), currently around line ~640–755.

**Step 1: Locate the Actions `<td>`**

Run:
```bash
grep -n 'padding: "0.75rem 0.5rem"' src/app/admin/customers/page.tsx
```
Expected: one hit — that's the Actions cell.

**Step 2: Add `className="sticky-action"` to that `<td>` and remove any style properties the class now owns (the class already sets `borderLeft` and `background`, so drop those if duplicated)**

Change from:

```tsx
<td
  style={{
    padding: "0.75rem 0.5rem",
    borderBottom: "1px solid #161616",
    whiteSpace: "nowrap",
  }}
>
  <div style={{ display: "flex", gap: "6px" }}>
    {/* buttons */}
  </div>
</td>
```

To:

```tsx
<td
  className="sticky-action"
  style={{
    padding: "0.75rem 0.5rem",
    borderBottom: "1px solid #161616",
    whiteSpace: "nowrap",
  }}
>
  <div style={{ display: "flex", gap: "6px" }}>
    {/* buttons */}
  </div>
</td>
```

(No style deletions needed — the `.sticky-action` class's `background` and `border-left` layer on top without conflict.)

**Step 3: Handle row hover collision**

The parent `<tr>` sets `style.background` via `onMouseEnter`/`onMouseLeave`. That won't repaint the sticky `<td>` because it has its own opaque bg. Accept this minor cosmetic difference — hover tint only shows on scrollable cells, not the pinned column. Document it inline:

No code change needed; just understand this is intentional per design doc.

**Step 4: Type-check**

```bash
npx tsc --noEmit; echo "EXIT=$?"
```
Expected: `EXIT=0`.

**Step 5: Commit Tasks 2+3 together**

```bash
git add src/app/admin/customers/page.tsx
git commit -m "ui: pin Actions column on /admin/customers desktop table

Uses the new .sticky-action class on the Actions th/td so the
Inquiry/Contract/Delete buttons stay visible when the table
scrolls horizontally on narrow laptops."
```

---

### Task 4: Verify mobile card flex-wrap

**Files:**
- Read only: `src/app/admin/customers/page.tsx` — the mobile card Actions row (inside `.admin-mobile-only`).

**Step 1: Confirm the mobile card action row still has `flex-wrap: wrap`**

Run:
```bash
grep -n 'flexWrap: "wrap"' src/app/admin/customers/page.tsx
```
Expected: at least 2 hits — one for the top-of-card chip row, one for the actions row at the bottom of the card. If the actions row is missing `flexWrap: "wrap"`, add it.

**Step 2: If missing, edit**

Locate the action `<div>` inside the card (the one containing the Inquiry/Contract/Delete buttons and `borderTop: "1px solid #1a1a1a"`). Ensure its style object includes `flexWrap: "wrap"`.

**Step 3: No commit yet if no change was needed.** If a fix was required, commit:

```bash
git add src/app/admin/customers/page.tsx
git commit -m "ui: ensure mobile card action row wraps on narrow iPhones"
```

---

### Task 5: Visual verification

**Environment:** local dev or preview deploy — whichever is faster.

**Step 1: Start dev server**

```bash
npm run dev
```
Wait for "Ready".

**Step 2: Open `/admin/customers` in Chrome devtools**

- Log in at `/admin/login` with `ADMIN_PASSWORD` from `.env.local`.
- Navigate to `/admin/customers`.
- Seed data isn't required — any existing customer rows will do; if empty, the screen shows a placeholder and there's nothing to verify.

**Step 3: Verify at 3 viewport widths**

Open Chrome devtools → device toolbar → set these widths:

| Width  | Expected |
|--------|----------|
| 1280px | Full desktop — table shows, no horizontal scroll, Delete button fully visible in Actions column. |
| 1024px | Table shows with horizontal scroll enabled. Actions column stays pinned to right edge while scrolling. All three buttons visible. |
| 800px  | Table still shows (>= 769px breakpoint). Horizontal scroll active. Actions column remains pinned right. |
| 375px (iPhone) | Table hidden. Mobile cards render. All buttons visible inside cards without horizontal overflow. |

**Step 4: Toggle light mode in the admin sidebar**

- Click the "Light Mode" button.
- Repeat the 1024px viewport test.
- Expected: Actions column stays pinned; background is white (`#fff`); left border is light grey.

**Step 5: Report any regression**

If any viewport shows a broken layout (Actions cell transparent, content bleeding through, button clipping on iPhone) — STOP and return to Task 1 to debug. Do not proceed to push.

---

### Task 6: Push to production

**Step 1: Push**

```bash
git push origin main
```

**Step 2: Wait ~2 min for Vercel deploy**

**Step 3: Verify on the live iPhone**

- Open `https://printecwrap.com/admin/login` on iPhone.
- Log in.
- Visit `/admin/customers`.
- Scroll a row horizontally (if needed) — Delete button should always be reachable.

**Step 4: Done.** Mark plan as complete in the tracker.

---

## Rollback

If sticky breaks in any unforeseen way (e.g., Safari iOS doesn't honor the rule due to some ancestor `overflow: hidden`), revert by removing the `className="sticky-action"` from the two elements and deleting the CSS rule block:

```bash
git revert HEAD~1..HEAD
git push origin main
```

Table reverts to plain horizontal-scroll behavior — same as before this change.
