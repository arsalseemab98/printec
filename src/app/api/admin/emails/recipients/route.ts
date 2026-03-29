import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerClient();

  const [inquiriesRes, leadsRes, contractsRes] = await Promise.all([
    supabase.from("inquiries").select("id, name, email, service, status, created_at").order("created_at", { ascending: false }),
    supabase.from("catalog_leads").select("id, name, email, catalog_slug, created_at").order("created_at", { ascending: false }),
    supabase.from("contracts").select("id, client_name, client_email, category, status, created_at").order("created_at", { ascending: false }),
  ]);

  const recipients: { id: string; name: string; email: string; source: string; detail: string }[] = [];
  const seen = new Set<string>();

  // Inquiries
  for (const inq of inquiriesRes.data || []) {
    if (!inq.email || seen.has(inq.email.toLowerCase())) continue;
    seen.add(inq.email.toLowerCase());
    recipients.push({
      id: inq.id,
      name: inq.name || "Unknown",
      email: inq.email,
      source: "inquiry",
      detail: inq.service || inq.status || "",
    });
  }

  // Catalog leads
  for (const lead of leadsRes.data || []) {
    if (!lead.email || seen.has(lead.email.toLowerCase())) continue;
    seen.add(lead.email.toLowerCase());
    recipients.push({
      id: lead.id,
      name: lead.name || "Unknown",
      email: lead.email,
      source: "catalog",
      detail: lead.catalog_slug || "",
    });
  }

  // Contract clients
  for (const c of contractsRes.data || []) {
    if (!c.client_email || seen.has(c.client_email.toLowerCase())) continue;
    seen.add(c.client_email.toLowerCase());
    recipients.push({
      id: c.id,
      name: c.client_name || "Unknown",
      email: c.client_email,
      source: "contract",
      detail: c.category || c.status || "",
    });
  }

  return NextResponse.json(recipients);
}
