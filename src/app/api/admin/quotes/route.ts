import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const supabase = createServerClient();
  const inquiryId = req.nextUrl.searchParams.get("inquiry_id");

  let query = inquiryId
    ? supabase
        .from("quotes")
        .select("*")
        .eq("inquiry_id", inquiryId)
        .order("created_at", { ascending: false })
    : supabase
        .from("quotes")
        .select("*, inquiries(name, email, service, status)")
        .order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();

  // Concurrent POSTs can read the same count; retry on unique-violation
  // (23505) once the unique index from the 2026-04-22 migration is in place.
  for (let attempt = 0; attempt < 5; attempt++) {
    const { count, error: countError } = await supabase
      .from("quotes")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    const quoteNumber = `PQ-${String((count ?? 0) + 1 + attempt).padStart(4, "0")}`;

    const { data, error } = await supabase
      .from("quotes")
      .insert({
        inquiry_id: body.inquiry_id,
        quote_number: quoteNumber,
        items: body.items || [],
        total: body.total || 0,
        notes: body.notes || "",
        sent_at: body.sent_at || null,
      })
      .select()
      .single();

    if (!error) return NextResponse.json(data, { status: 201 });

    const isDuplicate =
      (error as { code?: string }).code === "23505" ||
      /duplicate key|quotes_quote_number/i.test(error.message);
    if (!isDuplicate) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json(
    { error: "Could not allocate a unique quote number after 5 attempts." },
    { status: 500 }
  );
}
