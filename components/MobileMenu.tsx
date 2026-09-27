"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n/config";
import type { NavLink } from "@/lib/nav";
import { LangToggle } from "./LangToggle";
import styles from "./site.module.css";

type Props = {
  /** Same links as the header, with early access in its section order. */
  links: NavLink[];
  lang: Lang;
  t: {
    group: string;
    toEnglish: string;
    toHindi: string;
    mobile: string;
    openMenu: string;
    closeMenu: string;
  };
};

export function MobileMenu({ links, lang, t }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={styles.mobileMenu}>
      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.menuIcon} data-open={open} aria-hidden="true" />
        <span className={styles.srOnly}>{open ? t.closeMenu : t.openMenu}</span>
      </button>
      {open && (
        <nav id="mobile-menu" className={styles.menuPanel} aria-label={t.mobile}>
          <ol>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)}>
                  <span className={styles.menuNum}>{l.n}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ol>
          <div className={styles.menuLang}>
            <span className={styles.code}>{t.group}</span>
            <LangToggle lang={lang} t={t} />
          </div>
        </nav>
      )}
    </div>
  );
}
