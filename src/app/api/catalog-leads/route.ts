import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
  const supabase = createServerClient();
  const body = await req.json();
  const { name, email, catalog_slug } = body;

  if (!name || !email || !catalog_slug) {
    return NextResponse.json(
      { error: "Name, email, and catalog_slug are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("catalog_leads")
    .insert({ name, email, catalog_slug })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
