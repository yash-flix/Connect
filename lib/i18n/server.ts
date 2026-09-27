import { cookies } from "next/headers";
import { cache } from "react";
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from "./config";
import { dictionaryFor } from "./index";

/**
 * The visitor's language, from the `lang` cookie the header toggle sets.
 * Server components only. Reading cookies makes the route dynamic.
 */
export const getLang = cache(async (): Promise<Lang> => {
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
});

/** The dictionary for the visitor's language. Server components only. */
export async function getDictionary() {
  return dictionaryFor(await getLang());
}
