import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login page and API routes
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Check for admin session cookie on all /admin/* routes
  const session = request.cookies.get("admin_session");

  if (!session || session.value !== "authenticated") {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
