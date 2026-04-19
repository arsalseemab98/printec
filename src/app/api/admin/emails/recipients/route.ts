import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const supabase = createServerClient();
  const industry = req.nextUrl.searchParams.get("industry");

  let inquiriesQuery = supabase
    .from("inquiries")
    .select("id, name, email, service, status, industry, created_at")
    .order("created_at", { ascending: false });
  if (industry) {
    inquiriesQuery = inquiriesQuery.eq("industry", industry);
  }

  const [inquiriesRes, leadsRes, contractsRes] = await Promise.all([
    inquiriesQuery,
    industry
      ? Promise.resolve({ data: [] as Array<{ id: string; name: string | null; email: string; catalog_slug: string | null; created_at: string }>, error: null })
      : supabase
          .from("catalog_leads")
          .select("id, name, email, catalog_slug, created_at")
          .order("created_at", { ascending: false }),
    industry
      ? Promise.resolve({ data: [] as Array<{ id: string; client_name: string | null; client_email: string; category: string | null; status: string; created_at: string }>, error: null })
      : supabase
          .from("contracts")
          .select("id, client_name, client_email, category, status, created_at")
          .order("created_at", { ascending: false }),
  ]);

  const recipients: { id: string; name: string; email: string; source: string; detail: string; industry: string | null }[] = [];
  const seen = new Set<string>();

  for (const inq of inquiriesRes.data || []) {
    if (!inq.email || seen.has(inq.email.toLowerCase())) continue;
    seen.add(inq.email.toLowerCase());
    recipients.push({
      id: inq.id,
      name: inq.name || "Unknown",
      email: inq.email,
      source: "inquiry",
      detail: inq.service || inq.status || "",
      industry: inq.industry ?? null,
    });
  }

  for (const lead of leadsRes.data || []) {
    if (!lead.email || seen.has(lead.email.toLowerCase())) continue;
    seen.add(lead.email.toLowerCase());
    recipients.push({
      id: lead.id,
      name: lead.name || "Unknown",
      email: lead.email,
      source: "catalog",
      detail: lead.catalog_slug || "",
      industry: null,
    });
  }

  for (const c of contractsRes.data || []) {
    if (!c.client_email || seen.has(c.client_email.toLowerCase())) continue;
    seen.add(c.client_email.toLowerCase());
    recipients.push({
      id: c.id,
      name: c.client_name || "Unknown",
      email: c.client_email,
      source: "contract",
      detail: c.category || c.status || "",
      industry: null,
    });
  }

  return NextResponse.json(recipients);
}
