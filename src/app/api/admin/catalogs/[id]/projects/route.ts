import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("catalog_projects")
    .select("*")
    .eq("catalog_id", id)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();
  const body = await req.json();
  const { title, description, image_url, specs, sort_order } = body;

  let finalSortOrder = sort_order;

  if (finalSortOrder == null) {
    const { data: existing } = await supabase
      .from("catalog_projects")
      .select("sort_order")
      .eq("catalog_id", id)
      .order("sort_order", { ascending: false })
      .limit(1);

    finalSortOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 0;
  }

  const { data, error } = await supabase
    .from("catalog_projects")
    .insert({
      catalog_id: id,
      title,
      description,
      image_url,
      specs,
      sort_order: finalSortOrder,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();
  const body = await req.json();
  const { order } = body as { order: { id: string; sort_order: number }[] };

  if (!order || !Array.isArray(order)) {
    return NextResponse.json(
      { error: "order array is required" },
      { status: 400 }
    );
  }

  const updates = order.map((item) =>
    supabase
      .from("catalog_projects")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id)
      .eq("catalog_id", id)
  );

  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);

  if (failed?.error) {
    return NextResponse.json({ error: failed.error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
