-- Stop silent quote loss. Previously quotes.inquiry_id was NOT NULL and the FK
-- was ON DELETE CASCADE: deleting an inquiry silently dropped every linked
-- quote (financial record). Switch to nullable + ON DELETE SET NULL so the
-- quote (PDF metadata, total, sent_at) survives. Mirror of contracts.inquiry_id
-- which already uses SET NULL.
--
-- Applied via Supabase MCP (mcp__supabase__apply_migration) on 2026-04-22.
-- Verified post-apply: is_nullable=YES, delete_rule=SET NULL.
--
-- Note: this only protects FUTURE inquiry deletions. Quotes already cascaded
-- away (the gap PQ-0001/0003/0004/0005/0006 in production at apply time) are
-- not recoverable.

ALTER TABLE public.quotes
  ALTER COLUMN inquiry_id DROP NOT NULL;

ALTER TABLE public.quotes
  DROP CONSTRAINT IF EXISTS quotes_inquiry_id_fkey;

ALTER TABLE public.quotes
  ADD CONSTRAINT quotes_inquiry_id_fkey
  FOREIGN KEY (inquiry_id) REFERENCES public.inquiries(id) ON DELETE SET NULL;
