-- Applied via MCP on 2026-04-19. Adds industry tag for customer
-- segmentation in the email composer's recipient picker.

ALTER TABLE public.inquiries ADD COLUMN industry text NULL;

-- Defensive alignment with contracts/quotes/email_logs/email_templates
-- which received FORCE on 2026-04-19. Service role still bypasses RLS
-- via role privilege; FORCE only matters if a future role becomes
-- the table owner.
ALTER TABLE public.inquiries FORCE ROW LEVEL SECURITY;
