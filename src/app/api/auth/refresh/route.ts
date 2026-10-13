import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  cookieOptions,
  refreshTokens,
} from "@/lib/tokens";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const from = searchParams.get("from") ?? "/dashboard";
  const safeFrom = from.startsWith("/") && !from.startsWith("//") ? from : "/dashboard";

  function toLogin() {
    const response = NextResponse.redirect(new URL("/login?expired=1", request.url));
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);
    return response;
  }

  if (searchParams.has("logout")) return toLogin();

  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!refresh) return toLogin();

  const tokens = await refreshTokens(refresh);
  if (!tokens) return toLogin();

  const target = new URL(safeFrom, request.url);
  target.searchParams.set("refreshed", "1");

  const response = NextResponse.redirect(target);
  response.cookies.set(ACCESS_COOKIE, tokens.access_token, cookieOptions(tokens.access_token));
  response.cookies.set(REFRESH_COOKIE, tokens.refresh_token, cookieOptions(tokens.refresh_token, true));
  return response;
}