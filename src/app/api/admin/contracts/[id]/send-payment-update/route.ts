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

function buildBodyHtml(
  status: "Half Paid" | "Full Paid",
  contract: {
    contract_number: string;
    client_name: string | null;
    total_price: number;
    advance_amount: number;
    balance_amount: number;
    balance_due: string | null;
  }
): { subject: string; html: string } {
  const name = escapeHtml(contract.client_name || "there");
  const num = escapeHtml(contract.contract_number);
  const fmt = (n: number) =>
    Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const intro =
    status === "Full Paid"
      ? `<p style="margin:0 0 16px;">Thank you, <strong style="color:#fff;">${name}</strong> — your contract <strong style="color:#F7941D;">${num}</strong> is now paid in full.</p>`
      : `<p style="margin:0 0 16px;">Hi <strong style="color:#fff;">${name}</strong>, we've received a partial payment toward your contract <strong style="color:#F7941D;">${num}</strong>. Below is your remaining balance.</p>`;

  const balanceRow =
    status === "Full Paid"
      ? `
        <tr>
          <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Status</td>
          <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;font-weight:700;">PAID IN FULL</td>
        </tr>`
      : `
        <tr>
          <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Paid So Far</td>
          <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;">$${fmt(contract.advance_amount)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Remaining Balance</td>
          <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;font-size:18px;font-weight:700;">$${fmt(contract.balance_amount)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Balance Due</td>
          <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;">${escapeHtml(contract.balance_due || "TBD")}</td>
        </tr>`;

  const subject =
    status === "Full Paid"
      ? `Payment Received — Contract ${contract.contract_number} (Paid in Full)`
      : `Payment Update — Contract ${contract.contract_number}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0C0C0C;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#161616;border:1px solid #222;border-radius:8px;overflow:hidden;">
      <div style="background:#F7941D;padding:20px 24px;">
        <h1 style="margin:0;color:#0C0C0C;font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:1px;">
          ${status === "Full Paid" ? "Paid In Full" : "Payment Update"}
        </h1>
      </div>
      <div style="padding:28px 24px;color:#ccc;font-size:15px;line-height:1.7;">
        ${intro}
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr>
            <td style="padding:8px 12px;color:#F7941D;font-weight:700;border-bottom:1px solid #222;">Total</td>
            <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;">$${fmt(contract.total_price)}</td>
          </tr>
          ${balanceRow}
        </table>
        <p style="margin:0;color:#888;">Questions? Reply to this email and we'll get right back to you.</p>
        <p style="margin:16px 0 0;color:#888;">— The Printec Team</p>
      </div>
    </div>
    <div style="text-align:center;padding:20px;color:#444;font-size:11px;letter-spacing:1px;">
      PRINTEC VIRGINIA LLC &mdash; FROM VISION TO VINYL
    </div>
  </div>
</body>
</html>`;

  return { subject, html };
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerClient();

    const { data: contract, error: contractErr } = await supabase
      .from("contracts")
      .select("*")
      .eq("id", id)
      .single();

    if (contractErr || !contract) {
      return NextResponse.json({ error: "Contract not found." }, { status: 404 });
    }

    if (!contract.client_email) {
      return NextResponse.json(
        { error: "Contract has no client email address." },
        { status: 400 }
      );
    }

    if (contract.payment_status !== "Half Paid" && contract.payment_status !== "Full Paid") {
      return NextResponse.json(
        { error: "Set payment status to Half Paid or Full Paid before sending." },
        { status: 400 }
      );
    }

    const { subject, html } = buildBodyHtml(contract.payment_status, contract);

    const emailFrom = process.env.EMAIL_FROM!;
    const graphClient = getGraphClient();

    await graphClient.api(`/users/${emailFrom}/sendMail`).post({
      message: {
        subject,
        body: { contentType: "HTML", content: html },
        toRecipients: [{ emailAddress: { address: contract.client_email } }],
        replyTo: [{ emailAddress: { address: emailFrom } }],
      },
    });

    const sentAt = new Date().toISOString();
    const { error: updateErr } = await supabase
      .from("contracts")
      .update({ payment_email_sent_at: sentAt })
      .eq("id", id);

    if (updateErr) {
      console.error("Failed to update payment_email_sent_at:", updateErr);
    }

    return NextResponse.json({ success: true, sent_at: sentAt });
  } catch (error) {
    console.error("Payment update send error:", error);
    return NextResponse.json(
      { error: "Failed to send payment update. Please try again." },
      { status: 500 }
    );
  }
}
