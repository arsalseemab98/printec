import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerClient();

  // Fetch inquiries
  const { data: inquiries, error: inqError } = await supabase
    .from("inquiries")
    .select("id, name, email, phone, service, status, source, created_at")
    .order("created_at", { ascending: false });

  // Fetch catalog leads
  const { data: leads, error: leadError } = await supabase
    .from("catalog_leads")
    .select("id, name, email, catalog_slug, created_at")
    .order("created_at", { ascending: false });

  if (inqError || leadError) {
    return NextResponse.json(
      { error: inqError?.message || leadError?.message },
      { status: 500 }
    );
  }

  // Merge into unified array
  const unified = [
    ...(inquiries || []).map((inq) => ({
      id: inq.id,
      name: inq.name,
      email: inq.email,
      phone: inq.phone || "",
      service: inq.service || "",
      status: inq.status || "New",
      source: inq.source || "",
      type: "inquiry" as const,
      created_at: inq.created_at,
    })),
    ...(leads || []).map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: "",
      service: lead.catalog_slug || "",
      status: "Lead",
      source: "Catalog: " + (lead.catalog_slug || ""),
      type: "catalog_lead" as const,
      created_at: lead.created_at,
    })),
  ];

  // Sort all by created_at desc
  unified.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return NextResponse.json(unified);
}
