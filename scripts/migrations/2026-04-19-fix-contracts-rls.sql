-- Applied via MCP on 2026-04-19. Fixes the contracts RLS leak where
-- `Allow public read by id` and `Allow all for service role` were both
-- attached to the `public` Postgres role with `qual: true`, allowing
-- anon clients (i.e. anyone with the public anon key from the browser
-- bundle) to read every contract row including PII, financial data,
-- contract terms, and signature_data.

DROP POLICY IF EXISTS "Allow public read by id" ON public.contracts;
DROP POLICY IF EXISTS "Allow all for service role" ON public.contracts;

CREATE POLICY "service_role full access on contracts"
  ON public.contracts
  AS PERMISSIVE
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

ALTER TABLE public.contracts FORCE ROW LEVEL SECURITY;
