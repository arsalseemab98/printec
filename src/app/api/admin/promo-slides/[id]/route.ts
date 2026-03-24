import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { text, link, active, sort_order } = body;

    const sb = createServerClient();

    const { data, error } = await sb
      .from("promo_slides")
      .update({
        text,
        link: link ?? "",
        active: active ?? true,
        sort_order: sort_order ?? 0,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ slide: data });
  } catch (err) {
    console.error("Promo slide update error:", err);
    return NextResponse.json(
      { error: "Failed to update promo slide" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sb = createServerClient();

    const { error } = await sb
      .from("promo_slides")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Promo slide delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete promo slide" },
      { status: 500 }
    );
  }
}
