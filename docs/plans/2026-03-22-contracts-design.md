# Digital Contract System Design

## Summary
Digital contract system for creating, sending, and signing client agreements. Admin creates contracts (from inquiry or standalone), sends signing link to customer via email, customer draws signature on screen, signed PDF emailed to both parties.

## Database: contracts table
- id, inquiry_id (nullable FK), contract_number (PC-001)
- event_date, venue, service_description
- total_price, advance_amount, balance_amount, balance_due, travel_cost
- client_name, client_email
- terms (jsonb — 10 default clauses, editable)
- signature_data (base64), signed_at, sent_at, created_at

## Pages
- /admin/contracts — list (Pending/Signed filter)
- /admin/contracts/new — create (manual or ?inquiry_id= auto-fill)
- /admin/contracts/[id] — view/edit, send link, download PDF
- /sign/[id] — public customer signing page (no auth)

## Flow
1. Admin creates contract → 2. Sends email link → 3. Customer signs → 4. Signed PDF to both parties
