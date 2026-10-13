import "server-only";
import { cookies } from "next/headers";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  cookieOptions,
  type Tokens,
} from "@/lib/tokens";


export async function setSession({access_token, refresh_token}: Tokens) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, access_token, cookieOptions(access_token)); 
  store.set(REFRESH_COOKIE, refresh_token, cookieOptions(refresh_token, true));
}

export async function getSession() {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value;
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getRefreshToken() {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value;
}