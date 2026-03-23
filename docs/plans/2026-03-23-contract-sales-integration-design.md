# Contract-Sales Integration Design

## Goal
Connect the contract system to dashboard sales metrics. When a contract is signed, its total_price feeds into Booked Pipeline. When marked completed, it feeds into Completed Revenue. Add explicit status management with manual override.

## Contract Status System
- Replace implicit status (derived from timestamps) with explicit `status` column
- 5 statuses: Pending → Sent → Signed → Completed, plus Cancelled
- Timestamps still set on send/sign, but status is source of truth
- Admin can manually change status via dropdown in contract detail header
- Status badges: Pending (yellow), Sent (blue), Signed (green), Completed (orange), Cancelled (red)

## Sales Metrics Integration
- Dashboard query includes contracts alongside inquiries:
  - **Booked Pipeline**: sum of inquiry `booked_price` (status=Booked) + contract `total_price` (status=Signed)
  - **Completed Revenue**: sum of inquiry `completed_price` (status=Completed) + contract `total_price` (status=Completed)
  - **Average Order**: recalculated across both completed inquiries and completed contracts
  - **New Inquiries**: unchanged (inquiry-only)
- Date filter applies to contracts (signed_at for Signed, completed_at for Completed)

## Automatic Status Transitions
- Sending contract → status = Sent
- Customer signs → status = Signed
- Manual override available at any stage via dropdown

## Contract Detail Page Changes
- Status dropdown in header (replaces static badge)
- Confirmation prompt when changing to Completed or Cancelled

## Contract List Page Changes
- Filter tabs: All / Pending / Sent / Signed / Completed / Cancelled

## Database Changes
- Add `status` column (text, default 'Pending')
- Add `completed_at` column (timestamp, nullable)
- Migrate existing: set status from sent_at/signed_at values

## Decisions
- Contracts and inquiries remain independent (no auto-sync between them)
- Both contribute to dashboard sales metrics independently
- Contract total_price is the value used for sales (not advance or balance)
