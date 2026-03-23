import { supabase } from "./supabase";

export async function getPageImage(
  pageSlug: string,
  slot: string
): Promise<string | null> {
  const { data } = await supabase
    .from("page_images")
    .select("url")
    .eq("page_slug", pageSlug)
    .eq("slot", slot)
    .single();
  return data?.url ?? null;
}

export async function getPageImages(
  pageSlug: string
): Promise<Record<string, string>> {
  const { data } = await supabase
    .from("page_images")
    .select("slot, url")
    .eq("page_slug", pageSlug);
  const map: Record<string, string> = {};
  if (data) {
    for (const row of data) {
      map[row.slot] = row.url;
    }
  }
  return map;
}

export async function getPageContent(
  pageSlug: string,
  field: string
): Promise<string | null> {
  const { data } = await supabase
    .from("page_content")
    .select("value")
    .eq("page_slug", pageSlug)
    .eq("field", field)
    .single();
  return data?.value ?? null;
}

export async function getBlogPosts(publishedOnly = true) {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (publishedOnly) query = query.eq("published", true);
  const { data } = await query;
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}
