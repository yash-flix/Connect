/**
 * Language settings shared by server and client code. Keep this file free of
 * the dictionaries so client components can import it without bundling them.
 */
export const LANGS = ["en", "hi"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "lang";

export function isLang(v: unknown): v is Lang {
  return typeof v === "string" && (LANGS as readonly string[]).includes(v);
}

/** Fills `{name}` placeholders, e.g. fmt("Ask about {plan}", { plan: "Core" }). */
export function fmt(s: string, vars: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}
