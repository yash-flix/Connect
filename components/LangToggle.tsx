"use client";

import { useTransition } from "react";
import { setLang } from "@/lib/i18n/actions";
import type { Lang } from "@/lib/i18n/config";
import styles from "./site.module.css";

type Props = {
  lang: Lang;
  /** Labels in the current language, from the dictionary's `lang` slice. */
  t: { group: string; toEnglish: string; toHindi: string };
};

const options: { lang: Lang; label: string }[] = [
  { lang: "en", label: "EN" },
  { lang: "hi", label: "हिं" },
];

/**
 * EN | हिं switch. A Server Action saves the choice in the `lang` cookie; Next.js
 * then re-renders the server components, which read it, so the URL stays the same.
 */
export function LangToggle({ lang, t }: Props) {
  const [pending, startTransition] = useTransition();

  const choose = (next: Lang) => {
    if (next === lang || pending) return;
    startTransition(() => setLang(next));
  };

  return (
    <div role="group" aria-label={t.group} className={styles.lang} data-pending={pending || undefined}>
      {options.map((o) => (
        <button
          key={o.lang}
          type="button"
          data-lang={o.lang}
          aria-pressed={o.lang === lang}
          aria-label={o.lang === "en" ? t.toEnglish : t.toHindi}
          onClick={() => choose(o.lang)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
