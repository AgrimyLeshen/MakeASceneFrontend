import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  cookieOptions,
  isExpired,
  refreshTokens,
  type Tokens,
} from "@/lib/tokens"

//add protected pages here and down in the matcher
const PROTECTED = ["/dashboard"];
const AUTH_PAGES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const {pathname, searchParams} = request.nextUrl;

  const access = request.cookies.get(ACCESS_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;

  let loggedIn = !isExpired(access);
  let newTokens: Tokens | null = null;

  if(!loggedIn && refresh) {
    newTokens = await refreshTokens(refresh);
    loggedIn = newTokens !== null;
  }

  function applyTokens(response: NextResponse) {
    if(newTokens) {
      response.cookies.set(ACCESS_COOKIE, newTokens.access_token, cookieOptions(newTokens.access_token));
      response.cookies.set(REFRESH_COOKIE, newTokens.refresh_token, cookieOptions(newTokens.refresh_token, true));
    }
    return response;
  }

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (isProtected && !loggedIn) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    const response = NextResponse.redirect(url);
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);
    return response;
  }

  if (isAuthPage && loggedIn && !searchParams.has("expired")) {
    return applyTokens(NextResponse.redirect(new URL("/dashboard", request.url)));
  }

  const requestHeaders = new Headers(request.headers);
  if (newTokens) {
    request.cookies.set(ACCESS_COOKIE, newTokens.access_token);
    request.cookies.set(REFRESH_COOKIE, newTokens.refresh_token);
    requestHeaders.set("cookie", request.cookies.toString());
  }

  return applyTokens(NextResponse.next({ request: { headers: requestHeaders } }));
}

//add protected pages here too
export const config = {
  matcher: ["/dashboard", "/login", "/register"],
};
