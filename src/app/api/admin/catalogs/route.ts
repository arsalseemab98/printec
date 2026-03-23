import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("catalogs")
    .select("id, title, slug, description, created_at, catalog_projects(id)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map to include project_count
  const catalogs = (data || []).map((c: Record<string, unknown>) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    description: c.description,
    created_at: c.created_at,
    project_count: Array.isArray(c.catalog_projects) ? c.catalog_projects.length : 0,
  }));

  return NextResponse.json({ catalogs });
}

export async function POST(req: Request) {
  const supabase = createServerClient();
  const body = await req.json();
  const { title, slug, description } = body;

  if (!title || !slug) {
    return NextResponse.json(
      { error: "Title and slug are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("catalogs")
    .insert({ title, slug, description })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
