import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("catalogs")
    .select("*, catalog_projects(*)")
    .eq("slug", slug)
    .order("sort_order", { ascending: true, referencedTable: "catalog_projects" })
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
