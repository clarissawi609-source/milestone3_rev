import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const role = request.cookies.get("role")?.value;
  const auth = request.cookies.get("auth")?.value;

  // Protect Admin
  if (pathname.startsWith("/admin")) {
    if (!auth || role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect Checkout
  if (pathname.startsWith("/checkout")) {
    if (!auth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*"],
};