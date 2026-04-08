import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { runAntiSpamChecks } from "@/lib/antispam";

export async function POST(req: Request) {
  const supabase = createServerClient();
  const body = await req.json();
  const { name, email, catalog_slug, turnstileToken, _hp_website, _formLoadedAt } = body;

  // ── Anti-spam checks ──
  const spamCheck = await runAntiSpamChecks({
    turnstileToken,
    email: email || "",
    honeypot: _hp_website,
    formLoadedAt: _formLoadedAt,
    name: name || "",
  });
  if (!spamCheck.ok) {
    if (spamCheck.error === "__honeypot__") {
      return NextResponse.json({ id: "fake", name, email, catalog_slug }, { status: 201 });
    }
    console.warn(`[Catalog Leads API] Anti-spam blocked: ${spamCheck.error}`);
    return NextResponse.json({ error: spamCheck.error }, { status: 400 });
  }

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
