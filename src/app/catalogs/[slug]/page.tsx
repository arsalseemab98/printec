import { getSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/catalogs/catalog-page";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = getSupabase();
  const { data } = await supabase.from("catalogs").select("title, description").eq("slug", slug).single();
  if (!data) return { title: "Catalog Not Found" };
  return {
    title: `${data.title} Portfolio | Printec Virginia LLC`,
    description: data.description || `Browse our ${data.title} portfolio catalog.`,
    openGraph: { title: `${data.title} | Printec Virginia`, description: data.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = getSupabase();
  const { data } = await supabase
    .from("catalogs")
    .select("*, catalog_projects(*)")
    .eq("slug", slug)
    .single();

  if (!data) notFound();

  const projects = (data.catalog_projects || []).sort(
    (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
  );

  return <CatalogPage catalog={data} projects={projects} />;
}
