import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerClient();

  const { data: inquiries, error: inqError } = await supabase
    .from("inquiries")
    .select("id, name, email, phone, service, status, source, created_at")
    .order("created_at", { ascending: false });

  const { data: leads, error: leadError } = await supabase
    .from("catalog_leads")
    .select("id, name, email, catalog_slug, created_at")
    .order("created_at", { ascending: false });

  // Safety net: contracts with no linked inquiry should still surface here.
  const { data: orphanContracts, error: contractError } = await supabase
    .from("contracts")
    .select("id, client_name, client_email, service_description, status, created_at")
    .is("inquiry_id", null)
    .order("created_at", { ascending: false });

  if (inqError || leadError || contractError) {
    return NextResponse.json(
      { error: inqError?.message || leadError?.message || contractError?.message },
      { status: 500 }
    );
  }

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
    ...(orphanContracts || []).map((c) => ({
      id: c.id,
      name: c.client_name || "",
      email: c.client_email || "",
      phone: "",
      service: c.service_description || "",
      status: c.status || "Pending",
      source: "Contract",
      type: "contract" as const,
      created_at: c.created_at,
    })),
  ];

  unified.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return NextResponse.json(unified);
}
