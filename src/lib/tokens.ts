import { decodeJwt } from "jose";

export const ACCESS_COOKIE = "access_token";
export const REFRESH_COOKIE = "refresh_token";

const REFRESH_FALLBACK_SECONDS = 60 * 60 * 24 * 30;

export type Tokens = { access_token: string; refresh_token: string };

function getExp(token: string): number | undefined {
  try {
    return decodeJwt(token).exp;
  } catch {
    return undefined; // JWT missing, return string
  }
}


export function isExpired(token?: string): boolean {
  if (!token) return true;
  const exp = getExp(token);
  return exp ? exp * 1000 - 10_000 <= Date.now() : false;
}

export function cookieOptions(token: string, isRefresh = false) {
  const exp = getExp(token);
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: exp
      ? new Date(exp * 1000)
      : new Date(Date.now() + (isRefresh ? REFRESH_FALLBACK_SECONDS : 900) * 1000),
  };
}


export async function refreshTokens(refreshToken: string): Promise<Tokens | null> {
  try {
    const res = await fetch(`https://api.makeascene.social/v1/auth/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) return null;

    const data = await res.json();
    if (!data?.access_token || !data?.refresh_token) return null;
    return { access_token: data.access_token, refresh_token: data.refresh_token };
  } catch {
    return null;
  }
}