-- Applied via MCP on 2026-04-19. Same misconfigured-policy pattern as
-- contracts existed across multiple tables: `Allow all for service role`
-- (or similarly named) attached to the `public` Postgres role with
-- `USING (true)`, exposing rows to anon. Plus `promo_slides` had RLS
-- disabled entirely.
--
-- Verified leak (pre-fix): quotes was returning 1 row to anon with
-- financial PII. email_logs / email_templates / page_content were empty
-- but would leak as data grew.
--
-- Strategy:
-- - Admin-only tables (quotes, email_logs, email_templates): scope ALL
--   to service_role.
-- - Publicly-rendered tables (page_content, page_images, blog_posts,
--   promo_slides): explicit anon SELECT (filtered where applicable) +
--   service_role ALL for admin writes.

-- 1. quotes — admin only (financial data, was leaking)
DROP POLICY IF EXISTS "Allow all for service role" ON public.quotes;
CREATE POLICY "service_role full access on quotes"
  ON public.quotes AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);
ALTER TABLE public.quotes FORCE ROW LEVEL SECURITY;

-- 2. email_logs — admin only
DROP POLICY IF EXISTS "Service role full access on email_logs" ON public.email_logs;
CREATE POLICY "service_role full access on email_logs"
  ON public.email_logs AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);
ALTER TABLE public.email_logs FORCE ROW LEVEL SECURITY;

-- 3. email_templates — admin only
DROP POLICY IF EXISTS "Service role full access on email_templates" ON public.email_templates;
CREATE POLICY "service_role full access on email_templates"
  ON public.email_templates AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);
ALTER TABLE public.email_templates FORCE ROW LEVEL SECURITY;

-- 4. page_content — public READ (renders on website), service_role write
DROP POLICY IF EXISTS "Allow all for service role" ON public.page_content;
CREATE POLICY "anon select page_content"
  ON public.page_content AS PERMISSIVE FOR SELECT TO anon USING (true);
CREATE POLICY "service_role full access on page_content"
  ON public.page_content AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 5. page_images — public READ, service_role write
DROP POLICY IF EXISTS "Allow all for service role" ON public.page_images;
CREATE POLICY "anon select page_images"
  ON public.page_images AS PERMISSIVE FOR SELECT TO anon USING (true);
CREATE POLICY "service_role full access on page_images"
  ON public.page_images AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 6. blog_posts — anon SELECT only published rows; service_role writes anything
DROP POLICY IF EXISTS "Allow all for service role" ON public.blog_posts;
CREATE POLICY "anon select published blog_posts"
  ON public.blog_posts AS PERMISSIVE FOR SELECT TO anon USING (published = true);
CREATE POLICY "service_role full access on blog_posts"
  ON public.blog_posts AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 7. promo_slides — enable RLS (was disabled), anon SELECT active only, service_role ALL
ALTER TABLE public.promo_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_slides FORCE ROW LEVEL SECURITY;
CREATE POLICY "anon select active promo_slides"
  ON public.promo_slides AS PERMISSIVE FOR SELECT TO anon USING (active = true);
CREATE POLICY "service_role full access on promo_slides"
  ON public.promo_slides AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);
