import { NextRequest, NextResponse } from "next/server";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { createServerClient } from "@/lib/supabase";
import { ContractPDF } from "@/lib/contract-pdf";

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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.signature_data) {
      return NextResponse.json(
        { error: "Signature data is required." },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Fetch the contract
    const { data: contract, error: fetchErr } = await supabase
      .from("contracts")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchErr || !contract) {
      return NextResponse.json(
        { error: "Contract not found." },
        { status: 404 }
      );
    }

    if (contract.signed_at) {
      return NextResponse.json(
        { error: "Contract has already been signed." },
        { status: 400 }
      );
    }

    // Update contract with signature
    const signedAt = new Date().toISOString();
    const { data: updated, error: updateErr } = await supabase
      .from("contracts")
      .update({
        signature_data: body.signature_data,
        signed_at: signedAt,
        status: "Signed",
      })
      .eq("id", id)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json(
        { error: updateErr.message },
        { status: 500 }
      );
    }

    // Generate signed PDF
    const pdfElement = React.createElement(ContractPDF, {
      contract_number: updated.contract_number,
      client_name: updated.client_name || "",
      client_email: updated.client_email || "",
      event_date: updated.event_date,
      venue: updated.venue,
      service_description: updated.service_description,
      total_price: Number(updated.total_price) || 0,
      advance_amount: Number(updated.advance_amount) || 0,
      balance_amount: Number(updated.balance_amount) || 0,
      balance_due: updated.balance_due,
      travel_cost: Number(updated.travel_cost) || 0,
      terms: updated.terms || [],
      signature_data: updated.signature_data,
      signed_at: updated.signed_at,
      logoUrl: "https://printecwrap.com/printec-logo.png",
      providerSignatureUrl: "https://printecwrap.com/azhar-signature.png",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(pdfElement as any);
    const base64Pdf = Buffer.from(pdfBuffer).toString("base64");
    const fileName = `Printec-Contract-${updated.contract_number}-Signed.pdf`;

    // Build confirmation email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0C0C0C;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#161616;border:1px solid #222;border-radius:8px;overflow:hidden;">
      <div style="background:#F7941D;padding:20px 24px;">
        <h1 style="margin:0;color:#0C0C0C;font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:1px;">
          Contract Signed Successfully
        </h1>
      </div>
      <div style="padding:28px 24px;color:#ccc;font-size:15px;line-height:1.7;">
        <p style="margin:0 0 16px;">Hi <strong style="color:#fff;">${escapeHtml(updated.client_name || "there")}</strong>,</p>
        <p style="margin:0 0 16px;">Thank you for signing contract <strong style="color:#F7941D;">${escapeHtml(updated.contract_number)}</strong> with <strong style="color:#F7941D;">Printec Virginia LLC</strong>.</p>
        <p style="margin:0 0 16px;">A copy of the signed contract is attached to this email for your records.</p>
        <p style="margin:0 0 16px;">If you have any questions, simply reply to this email or call us.</p>
        <p style="margin:0;color:#888;">— The Printec Team</p>
      </div>
    </div>
    <div style="text-align:center;padding:20px;color:#444;font-size:11px;letter-spacing:1px;">
      PRINTEC VIRGINIA LLC &mdash; FROM VISION TO VINYL
    </div>
  </div>
</body>
</html>`;

    // Send signed PDF to both customer and Printec
    const emailFrom = process.env.EMAIL_FROM!;
    const graphClient = getGraphClient();

    const attachment = {
      "@odata.type": "#microsoft.graph.fileAttachment",
      name: fileName,
      contentType: "application/pdf",
      contentBytes: base64Pdf,
    };

    // Send to customer
    if (updated.client_email) {
      await graphClient.api(`/users/${emailFrom}/sendMail`).post({
        message: {
          subject: `Signed Contract — ${updated.contract_number} — Printec Virginia LLC`,
          body: { contentType: "HTML", content: emailHtml },
          toRecipients: [
            { emailAddress: { address: updated.client_email } },
          ],
          replyTo: [{ emailAddress: { address: emailFrom } }],
          attachments: [attachment],
        },
      });
    }

    // Send copy to Printec
    await graphClient.api(`/users/${emailFrom}/sendMail`).post({
      message: {
        subject: `Contract Signed — ${updated.contract_number} — ${escapeHtml(updated.client_name || "Customer")}`,
        body: { contentType: "HTML", content: `<p>Contract <strong>${escapeHtml(updated.contract_number)}</strong> has been signed by <strong>${escapeHtml(updated.client_name || "the customer")}</strong> (${escapeHtml(updated.client_email || "no email")}).</p><p>Signed at: ${signedAt}</p><p>Signed PDF is attached.</p>` },
        toRecipients: [
          { emailAddress: { address: "info@printecwrap.com" } },
        ],
        attachments: [attachment],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contract sign error:", error);
    return NextResponse.json(
      { error: "Failed to sign contract. Please try again." },
      { status: 500 }
    );
  }
}
