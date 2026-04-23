import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  const isProd = process.env.NODE_ENV === "production";
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    ...(isProd ? { domain: ".printecwrap.com" } : {}),
  });

  return response;
}
