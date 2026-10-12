import "server-only";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "session";

export async function setSession(token: string, expiresAt?: number) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...(expiresAt && { expires: new Date(expiresAt * 1000) }),
  });
}

export async function getSession() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value;
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}