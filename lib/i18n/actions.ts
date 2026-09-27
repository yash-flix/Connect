"use server";

import { cookies } from "next/headers";
import { LANG_COOKIE, isLang } from "./config";

/**
 * Saves the visitor's language. Setting a cookie in a Server Action makes
 * Next.js re-render the current page and layouts in the same round trip, so
 * the page switches language without a reload and keeps its URL.
 */
export async function setLang(lang: string) {
  if (!isLang(lang)) return;
  (await cookies()).set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
