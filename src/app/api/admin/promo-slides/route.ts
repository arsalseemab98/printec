import { NextRequest, NextResponse } from "next/server";
import { createServerClient, supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("promo_slides")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ slides: data || [] });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, link, active, sort_order } = body;

    if (!text) {
      return NextResponse.json(
        { error: "text is required" },
        { status: 400 }
      );
    }

    const sb = createServerClient();

    const { data, error } = await sb
      .from("promo_slides")
      .insert({
        text,
        link: link || "",
        active: active ?? true,
        sort_order: sort_order ?? 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ slide: data }, { status: 201 });
  } catch (err) {
    console.error("Promo slide create error:", err);
    return NextResponse.json(
      { error: "Failed to create promo slide" },
      { status: 500 }
    );
  }
}
