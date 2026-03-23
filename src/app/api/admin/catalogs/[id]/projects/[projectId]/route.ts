import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; projectId: string }> }
) {
  const { id, projectId } = await params;
  const supabase = createServerClient();
  const body = await req.json();
  const { title, description, image_url, specs, sort_order } = body;

  const { data, error } = await supabase
    .from("catalog_projects")
    .update({ title, description, image_url, specs, sort_order })
    .eq("id", projectId)
    .eq("catalog_id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; projectId: string }> }
) {
  const { id, projectId } = await params;
  const supabase = createServerClient();

  const { error } = await supabase
    .from("catalog_projects")
    .delete()
    .eq("id", projectId)
    .eq("catalog_id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
