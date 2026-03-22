# CRM / Inquiry Management Design

## Summary

Add CRM functionality to the admin portal: inquiry list from contact form submissions, status pipeline (New → Contacted → Follow Up → Quoted → Booked → Completed), branded PDF quote generation, and sales dashboard with booked pipeline vs completed revenue.

## Database

### inquiries table
- id (uuid PK), name, email, phone, service, description, budget, source, page
- utm_source, utm_medium, utm_campaign
- status (text: New/Contacted/Follow Up/Quoted/Booked/Completed)
- booked_price (numeric), completed_price (numeric)
- notes (text), created_at, updated_at

### quotes table
- id (uuid PK), inquiry_id (FK → inquiries)
- quote_number (text: PQ-001), items (jsonb: [{description, price}])
- total (numeric), notes (text), sent_at (timestamptz), created_at

## Admin Pages
- /admin/inquiries — filterable list with status tabs and search
- /admin/inquiries/[id] — detail view with status change, price entry, notes, quote history
- /admin/inquiries/[id]/quote — quote builder with line items, PDF preview, send email
- /admin dashboard — updated with sales metrics (booked pipeline, completed revenue, avg order)

## Contact Form Change
- POST /api/contact also inserts into inquiries table with status "New"

## PDF Quote
- Branded with Printec logo, company info, quote number
- Customer details, line items (description + price), total
- Notes/terms section
- Generated with @react-pdf/renderer, sent via Microsoft Graph email

## Packages
- @react-pdf/renderer — PDF generation from React components
