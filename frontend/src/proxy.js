import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (pathname === "/login" || pathname === "/register") {
    if (!accessToken) {
      return NextResponse.next();
    }

    const { role } = decodeJwt(accessToken);

    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (role === "patient") {
      return NextResponse.redirect(new URL("/patient", request.url));
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { role } = decodeJwt(accessToken);

  if (pathname.startsWith("/admin") && role === "admin") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/patient") && role === "patient") {
    return NextResponse.next();
  }

  if (role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (role === "patient") {
    return NextResponse.redirect(new URL("/patient", request.url));
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/patient/:path*", "/login", "/register"],
};
