import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const supabase = createServerClient();
  const inquiryId = req.nextUrl.searchParams.get("inquiry_id");

  let query = supabase
    .from("contracts")
    .select("*")
    .order("created_at", { ascending: false });

  if (inquiryId) {
    query = query.eq("inquiry_id", inquiryId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();

  const { count, error: countError } = await supabase
    .from("contracts")
    .select("*", { count: "exact", head: true });

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  const contractNumber = `PC-${String((count ?? 0) + 1).padStart(3, "0")}`;

  const totalPrice = Number(body.total_price) || 0;
  const advanceAmount = Number(body.advance_amount) || 0;
  const balanceAmount = totalPrice - advanceAmount;

  // If admin created the contract without picking an inquiry, mint one so the
  // customer surfaces in the Customers list and CRM pipeline.
  let inquiryId: string | null = body.inquiry_id || null;
  if (!inquiryId && body.client_name) {
    const { data: newInquiry, error: inqErr } = await supabase
      .from("inquiries")
      .insert({
        name: body.client_name,
        email: body.client_email || null,
        service: body.service_description || body.category || null,
        status: "Booked",
        source: "contract",
      })
      .select("id")
      .single();

    if (inqErr) {
      console.error("Auto-create inquiry failed:", inqErr);
      return NextResponse.json(
        { error: `Failed to create linked inquiry: ${inqErr.message}` },
        { status: 500 }
      );
    }
    inquiryId = newInquiry?.id ?? null;
  }

  const { data, error } = await supabase
    .from("contracts")
    .insert({
      inquiry_id: inquiryId,
      contract_number: contractNumber,
      event_date: body.event_date || null,
      venue: body.venue || null,
      service_description: body.service_description || null,
      total_price: totalPrice,
      advance_amount: advanceAmount,
      balance_amount: balanceAmount,
      balance_due: body.balance_due || null,
      travel_cost: Number(body.travel_cost) || 0,
      client_name: body.client_name || null,
      client_email: body.client_email || null,
      terms: Array.isArray(body.terms) ? body.terms : [],
      category: body.category || "Other",
      status: body.status || "Pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
