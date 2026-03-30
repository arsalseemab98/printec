import { NextResponse } from "next/server";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

export async function GET() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const emailFrom = process.env.EMAIL_FROM || "info@printecwrap.com";

  if (!tenantId || !clientId || !clientSecret) {
    return NextResponse.json({
      status: "error",
      message: "Azure credentials not configured",
      canSendEmail: false,
    });
  }

  try {
    // Test 1: Acquire a token (verifies credentials are valid)
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const token = await credential.getToken("https://graph.microsoft.com/.default");

    if (!token) {
      return NextResponse.json({
        status: "error",
        message: "Failed to acquire token",
        canSendEmail: false,
      });
    }

    // Token expiry (this is the OAuth token, not the client secret)
    const tokenExpiresAt = token.expiresOnTimestamp
      ? new Date(token.expiresOnTimestamp).toISOString()
      : null;

    // Test 2: Try a lightweight Graph API call to verify email access
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ["https://graph.microsoft.com/.default"],
    });
    const graphClient = Client.initWithMiddleware({ authProvider });

    let emailAccess = false;
    let emailError = "";
    try {
      // Try to get mailbox settings — lightweight call that verifies email permissions
      await graphClient.api(`/users/${emailFrom}/mailboxSettings`).get();
      emailAccess = true;
    } catch (err: unknown) {
      emailError = err instanceof Error ? err.message : "Unknown error";
    }

    // Check Azure AD app registration expiry via Graph API
    let secretExpiry: string | null = null;
    let secretDaysLeft: number | null = null;
    try {
      const app = await graphClient
        .api(`/applications`)
        .filter(`appId eq '${clientId}'`)
        .select("passwordCredentials")
        .get();

      if (app?.value?.[0]?.passwordCredentials?.length > 0) {
        // Find the latest expiring secret
        const secrets = app.value[0].passwordCredentials;
        const latestSecret = secrets.reduce(
          (latest: { endDateTime: string }, s: { endDateTime: string }) =>
            new Date(s.endDateTime) > new Date(latest.endDateTime) ? s : latest,
          secrets[0]
        );
        secretExpiry = latestSecret.endDateTime;
        secretDaysLeft = Math.floor(
          (new Date(latestSecret.endDateTime).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );
      }
    } catch {
      // App registration query may not be permitted — that's okay
    }

    return NextResponse.json({
      status: emailAccess ? "healthy" : "degraded",
      canSendEmail: emailAccess,
      emailError: emailError || null,
      emailFrom,
      tokenExpiresAt,
      secretExpiry,
      secretDaysLeft,
      checkedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    return NextResponse.json({
      status: "error",
      message: err instanceof Error ? err.message : "Failed to connect to Azure",
      canSendEmail: false,
      checkedAt: new Date().toISOString(),
    });
  }
}
