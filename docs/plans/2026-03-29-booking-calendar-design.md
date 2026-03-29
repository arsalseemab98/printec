# Admin Booking Calendar — Design

## Goal
Add a calendar view to the admin portal showing contracts and inquiries with monthly, weekly, and daily views.

## Architecture
- **New page**: `/admin/calendar` (sidebar nav position 3, after Statistics)
- **No new packages** — CSS Grid calendar, no external library
- **Data**: Fetch from existing `/api/admin/contracts` + `/api/admin/inquiries`
- **DB change**: Add `event_date` column to `inquiries` table (nullable)

## Views

| View | Layout | Navigation |
|------|--------|------------|
| Monthly (default) | 7-column grid, entries stacked in day cells | ← → arrows + "Today" button |
| Weekly | 7 columns (Mon–Sun), taller rows | ← → arrows |
| Daily | Single column, entries as cards | ← → arrows |

## Calendar Entry (Summary Style)
- Colored left border (status color)
- Client name (bold)
- Category (small text)
- Total price
- Click → navigates to contract/inquiry detail page

## Color Coding

| Type | Color | Hex |
|------|-------|-----|
| Inquiry (no contract) | Blue | #3B82F6 |
| Contract — Pending | Yellow | #EAB308 |
| Contract — Sent | Orange | #F7941D |
| Contract — Signed | Green | #22C55E |
| Contract — Completed | Gray | #6B7280 |
| Contract — Cancelled | Red | #EF4444 |

## Legend
Small inline guide at top of page showing all colors with labels.

## Inquiry → Contract Logic
- If inquiry has a linked contract (matched by `inquiry_id`), hide the inquiry from calendar
- Only unlinked inquiries appear
- Inquiry date: use `event_date` if set, fall back to `created_at`

## DB Change
- Add `event_date` (date, nullable) to `inquiries` table
- Editable on inquiry detail page

## Mobile
- Monthly view: compact entries (name only, colored dot)
- Weekly/Daily: full summary cards
- View toggle buttons responsive
