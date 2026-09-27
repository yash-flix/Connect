import type { Lang } from "./config";
import { en, type Dictionary } from "./en";
import { hi } from "./hi";

export type { Dictionary } from "./en";
export { DEFAULT_LANG, LANG_COOKIE, LANGS, fmt, isLang, type Lang } from "./config";

const dictionaries: Record<Lang, Dictionary> = { en, hi };

export function dictionaryFor(lang: Lang): Dictionary {
  return dictionaries[lang];
}
