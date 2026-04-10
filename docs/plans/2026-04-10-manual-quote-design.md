# Manual Quote Creation — Design Doc

**Date**: 2026-04-10
**Status**: Approved

## Problem

Quotes are tightly coupled to inquiries — there's no way to create a quote for a walk-in, phone call, or manually found customer without first navigating through the inquiry system. This slows down quoting for customers discovered outside the normal inquiry flow.

## Solution

Add a `/admin/quotes/new` page that collects minimal customer details, auto-creates an inquiry (status: "Quoted"), and redirects to the existing quote builder.

## Data Flow

```
User clicks "Create Quote" → /admin/quotes/new
    ↓
Fills in: name*, service* (+ optional: email, phone, description, budget, event_date)
    ↓
Clicks "Continue to Quote Builder"
    ↓
POST /api/admin/inquiries → creates inquiry with status "Quoted"
    ↓
Redirect to /admin/inquiries/{new_id}/quote (existing quote builder)
    ↓
User adds line items, notes → saves/sends quote as normal
```

## Form Fields

| Field | Required | Type |
|-------|----------|------|
| Name | Yes | text input |
| Service | Yes | dropdown (from constants.ts service list) |
| Email | No | email input |
| Phone | No | text input |
| Description | No | textarea |
| Budget | No | text input |
| Event Date | No | date picker |

## Quote Sending Logic

- **Email provided**: Show "Save", "Download PDF", and "Send via Email" buttons
- **No email**: Show "Save" and "Download PDF" only. Hide "Send via Email" button

## Entry Points

1. **Quotes listing page** (`/admin/quotes`): "Create Quote" button in page header
2. **Admin sidebar**: "Create Quote" link/icon near the Quotes nav item

## Changes Required

| What | Where | Change |
|------|-------|--------|
| New page | `/admin/quotes/new` | Customer info form → creates inquiry → redirects to quote builder |
| Button | `/admin/quotes` page header | "Create Quote" button linking to `/admin/quotes/new` |
| Sidebar link | Admin sidebar nav | "Create Quote" link near Quotes nav item |
| Conditional send | Quote builder (`/admin/inquiries/[id]/quote`) | Hide "Send via Email" if inquiry has no email |

## What Stays Untouched

- Quote builder UI and logic
- Quote PDF template
- Quote save/update/send APIs
- Quotes listing page (beyond adding the button)
- Database schema (no migrations needed)

## Technical Notes

- Uses existing `POST /api/admin/inquiries` — no new API routes
- No database migrations or schema changes
- Auto-created inquiry gets status "Quoted" immediately
- UI matches existing admin dark theme and card styling
