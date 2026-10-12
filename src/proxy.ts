import { NextResponse, type NextRequest } from "next/server";
import { decodeJwt } from "jose";

const PROTECTED = ["/dashboard"];
const AUTH_PAGES = ["/login", "/register"];

function isTokenValid(token?: string): boolean {
  if (!token) return false;
  try {
    const { exp } = decodeJwt(token);
    return !exp || exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const loggedIn = isTokenValid(request.cookies.get("session")?.value);

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (isProtected && !loggedIn) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    const response = NextResponse.redirect(url);
    response.cookies.delete("session");
    return response;
  }

  if (isAuthPage && loggedIn && !searchParams.has("expired")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};