# Admin Email System — Design

## Goal
Add email marketing/compose system to admin portal with templates, bulk send, and manual compose.

## Pages
- `/admin/emails` — Dashboard (sent log + quick actions)
- `/admin/emails/compose` — Compose with Tiptap WYSIWYG + recipient picker
- `/admin/emails/templates` — Saved templates CRUD

## Recipients
- Inquiries (contact form leads)
- Catalog leads (email-gated catalog viewers)
- Contract clients
- Filterable by source + status
- Individual or bulk select

## Sending
- Microsoft Graph API (existing infrastructure)
- Individual sends per recipient (personalized {name}, {service})
- Branded HTML wrapper (dark/orange theme)
- Progress indicator for bulk
- All sends logged to DB

## Templates
- Save subject + body as reusable template
- Load → edit → send workflow
- Placeholders: {name}, {email}, {service}

## Database
- `email_templates` — id, name, subject, body (HTML), created_at
- `email_logs` — id, template_id (nullable), subject, recipient_email, recipient_name, status, sent_at
