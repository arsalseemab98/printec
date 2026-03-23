import { NextRequest, NextResponse } from "next/server";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { createServerClient } from "@/lib/supabase";

function getGraphClient() {
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID!,
    process.env.AZURE_CLIENT_ID!,
    process.env.AZURE_CLIENT_SECRET!
  );
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return Client.initWithMiddleware({ authProvider });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerClient();

    // Fetch contract
    const { data: contract, error: contractErr } = await supabase
      .from("contracts")
      .select("*")
      .eq("id", id)
      .single();

    if (contractErr || !contract) {
      return NextResponse.json(
        { error: "Contract not found." },
        { status: 404 }
      );
    }

    if (!contract.client_email) {
      return NextResponse.json(
        { error: "Contract has no client email address." },
        { status: 400 }
      );
    }

    const signingLink = `https://printecwrap.com/sign/${id}`;

    // Build email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0C0C0C;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#161616;border:1px solid #222;border-radius:8px;overflow:hidden;">
      <div style="background:#F7941D;padding:20px 24px;">
        <h1 style="margin:0;color:#0C0C0C;font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:1px;">
          Your Contract from Printec Virginia LLC
        </h1>
      </div>
      <div style="padding:28px 24px;color:#ccc;font-size:15px;line-height:1.7;">
        <p style="margin:0 0 16px;">Hi <strong style="color:#fff;">${escapeHtml(contract.client_name || "there")}</strong>,</p>
        <p style="margin:0 0 16px;">Your contract <strong style="color:#F7941D;">${escapeHtml(contract.contract_number)}</strong> from <strong style="color:#F7941D;">Printec Virginia LLC</strong> is ready for your review and signature.</p>
        <p style="margin:0 0 8px;color:#888;">Contract details:</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr>
            <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Event Date</td>
            <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;">${contract.event_date ? new Date(contract.event_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "TBD"}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Venue</td>
            <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;">${escapeHtml(contract.venue || "TBD")}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Total</td>
            <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;font-size:18px;font-weight:700;">$${Number(contract.total_price).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
          </tr>
        </table>
        <div style="text-align:center;margin:24px 0;">
          <a href="${signingLink}" style="display:inline-block;padding:14px 36px;background:#F7941D;color:#0C0C0C;font-weight:900;font-size:16px;text-decoration:none;border-radius:6px;text-transform:uppercase;letter-spacing:1px;">
            Review &amp; Sign Contract
          </a>
        </div>
        <p style="margin:0 0 16px;color:#888;font-size:13px;">If the button doesn't work, copy and paste this link into your browser:<br><a href="${signingLink}" style="color:#F7941D;text-decoration:none;word-break:break-all;">${signingLink}</a></p>
        <p style="margin:0;color:#888;">— The Printec Team</p>
      </div>
    </div>
    <div style="text-align:center;padding:20px;color:#444;font-size:11px;letter-spacing:1px;">
      PRINTEC CORP &mdash; FROM VISION TO VINYL
    </div>
  </div>
</body>
</html>`;

    // Send email via Microsoft Graph
    const emailFrom = process.env.EMAIL_FROM!;
    const graphClient = getGraphClient();

    await graphClient.api(`/users/${emailFrom}/sendMail`).post({
      message: {
        subject: `Your Contract from Printec Virginia LLC — ${contract.contract_number}`,
        body: { contentType: "HTML", content: emailHtml },
        toRecipients: [
          { emailAddress: { address: contract.client_email } },
        ],
        replyTo: [
          { emailAddress: { address: emailFrom } },
        ],
      },
    });

    // Update sent_at timestamp
    const { data: updated, error: updateErr } = await supabase
      .from("contracts")
      .update({ sent_at: new Date().toISOString(), status: "Sent" })
      .eq("id", id)
      .select()
      .single();

    if (updateErr) {
      console.error("Failed to update sent_at:", updateErr);
    }

    return NextResponse.json({
      success: true,
      sent_at: updated?.sent_at ?? new Date().toISOString(),
    });
  } catch (error) {
    console.error("Contract send error:", error);
    return NextResponse.json(
      { error: "Failed to send contract. Please try again." },
      { status: 500 }
    );
  }
}
