# Sticky Actions Column — /admin/customers

## Problem

On `/admin/customers` the Actions column (Inquiry / Contract / Delete buttons) is cut off on the right for some rows. Reproduces on both laptop (narrow window) and iPhone.

Root causes:

1. **Desktop table** — 9 columns (Name, Email, Phone, Source, Industry, Type, Status, Date, Actions). On a 1024px laptop minus the 240px admin sidebar = 784px of content area. With long emails/sources the intrinsic table width exceeds that, and the table scrolls horizontally inside `.admin-table-wrap`. The Actions column is rightmost, so it's the one that disappears off the right edge.
2. **iPhone** — The mobile card view from commit `a9b6b23` already replaces the table, so this should be fine in principle. Need to verify the catalog_lead card action row (3 buttons) can never overflow 320px viewport by ensuring `flex-wrap` is set.

## Approach

**Approach A — Sticky Actions column (approved).**

Pin the Actions `<th>` and `<td>` to the right edge of the scroll viewport using `position: sticky; right: 0`. The rest of the table scrolls horizontally underneath while the action buttons stay fully visible.

As a safety belt on iPhone, confirm `flex-wrap: wrap` is on the mobile-card action row so the Delete button wraps to a second line instead of clipping on narrow iPhones (SE 1st gen = 320px).

## Scope

**In scope**

- `src/app/admin/customers/page.tsx`: add `position: sticky; right: 0` styling to the Actions `<th>` and each row's Actions `<td>`. Add a solid background to the sticky cells (so underlying content doesn't bleed through) and a left border or shadow as a visual seam.
- Confirm the mobile card action row already has `flex-wrap: wrap` — if not, add it.

**Out of scope**

- Other admin pages with wide tables (`/admin/contracts`, `/admin/emails`, `/admin/catalogs/leads`, `/admin/statistics`). Same pattern can be applied later.
- Adding Delete to `/admin/quotes`.
- Any redesign of the table or column list.

## Design details

### Sticky cells

```tsx
// Actions <th>
style={{
  position: "sticky",
  right: 0,
  background: "#111",         // match table header bg
  borderLeft: "1px solid #222",
  zIndex: 2,
  // ...existing header styles
}}

// Actions <td>
style={{
  position: "sticky",
  right: 0,
  background: "#111",         // match row bg (dark)
  borderLeft: "1px solid #222",
  zIndex: 1,
  // ...existing cell styles
}}
```

Notes:

- Light-mode override in `globals.css` already re-paints rows via `.admin-light main td { ... background: #fff !important; }`. The sticky cell needs to participate — so we use `background: "#111"` inline (dark mode) and let `.admin-light` rewrite it for light mode. If the light-mode background doesn't propagate to sticky cells, we add one explicit `.admin-light .sticky-action { background: #fff !important; }` rule.
- `zIndex: 2` on `<th>` ensures it stays above the body cells while scrolling vertically over them.

### Mobile card safety

The action row in the card already has:

```tsx
style={{ display: "flex", gap: "6px", flexWrap: "wrap", ... }}
```

per `src/app/admin/customers/page.tsx` line ~673. Verified present; no change required, but the plan must re-verify.

## Verification

- Laptop at 1024px and 800px window widths: all three buttons visible without horizontal scroll to the right.
- iPhone (mobile card view): all buttons fit on one row on 375px viewport; on 320px, Delete wraps to second line without clipping.
- Light mode: sticky cell repaints correctly, no transparent column over data.
- Hover on a row: background change still applied to sticky cell (we already set explicit `background` so hover must set the sticky bg too, or we drop the hover bg change on sticky cells).

## Risk

Low. CSS-only change inside one component. Fallback if sticky misbehaves in light mode: remove sticky, revert to documented horizontal scroll.
