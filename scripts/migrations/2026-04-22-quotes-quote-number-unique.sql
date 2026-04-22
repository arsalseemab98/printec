-- Race fix for /api/admin/quotes POST: two concurrent requests both read
-- count(*) and produce the same PQ-NNNN. Adding a unique index turns the
-- silent duplicate into a 23505 error that the route handler retries.
--
-- Apply via Supabase MCP (mcp__supabase__apply_migration) after re-auth:
--   name: quotes_quote_number_unique
--   query: contents below.
--
-- If duplicates already exist, the CREATE UNIQUE INDEX will fail. Run the
-- duplicate check first and renumber the offenders.

CREATE UNIQUE INDEX IF NOT EXISTS quotes_quote_number_key
  ON public.quotes (quote_number);
