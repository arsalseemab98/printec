import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sb = createServerClient();

  const { data, error } = await sb
    .from("contracts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sb = createServerClient();
  const body = await req.json();

  const allowed = [
    "inquiry_id",
    "event_date",
    "venue",
    "service_description",
    "total_price",
    "advance_amount",
    "balance_amount",
    "balance_due",
    "travel_cost",
    "client_name",
    "client_email",
    "terms",
    "status",
    "completed_at",
    "category",
    "payment_status",
    "payment_email_sent_at",
  ];

  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  // Auto-set completed_at when status changes to Completed
  if (updates.status === "Completed" && !updates.completed_at) {
    updates.completed_at = new Date().toISOString();
  }
  // Clear completed_at if status changes away from Completed
  if (updates.status && updates.status !== "Completed") {
    updates.completed_at = null;
  }

  // Auto-recalculate balance if price fields change
  if (updates.total_price !== undefined || updates.advance_amount !== undefined) {
    // Fetch current values for any field not provided
    if (updates.total_price === undefined || updates.advance_amount === undefined) {
      const { data: current } = await sb
        .from("contracts")
        .select("total_price, advance_amount")
        .eq("id", id)
        .single();

      if (current) {
        const tp = Number(updates.total_price ?? current.total_price) || 0;
        const aa = Number(updates.advance_amount ?? current.advance_amount) || 0;
        updates.balance_amount = tp - aa;
      }
    } else {
      updates.balance_amount = Number(updates.total_price) - Number(updates.advance_amount);
    }
  }

  const { data, error } = await sb
    .from("contracts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sb = createServerClient();

  const { error } = await sb.from("contracts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
