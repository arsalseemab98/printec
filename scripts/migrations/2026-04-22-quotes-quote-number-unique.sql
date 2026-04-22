-- Race fix for /api/admin/quotes POST: two concurrent requests both read
-- count(*) and produce the same PQ-NNNN. Adding a unique index turns the
-- silent duplicate into a 23505 error that the route handler retries.
--
-- Applied via Supabase MCP (mcp__supabase__apply_migration) on 2026-04-22.
-- Verified post-apply: index quotes_quote_number_key exists (btree unique).
-- Duplicate pre-check: zero duplicates at apply time.

CREATE UNIQUE INDEX IF NOT EXISTS quotes_quote_number_key
  ON public.quotes (quote_number);
