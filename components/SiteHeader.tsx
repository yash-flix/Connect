import Link from "next/link";
import { getMenuLinks, getNavLinks } from "@/lib/nav";
import { getDictionary, getLang } from "@/lib/i18n/server";
import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import styles from "./site.module.css";

export async function SiteHeader() {
  const [lang, d] = await Promise.all([getLang(), getDictionary()]);
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/#top" aria-label={d.nav.home}>
          <Logo />
        </Link>
        <nav className={styles.navLinks} aria-label={d.nav.primary}>
          {getNavLinks(d).map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <LangToggle lang={lang} t={d.lang} />
        <Link href="/#early-access" className={styles.btnPrimary}>
          {d.nav.earlyAccessButton}
        </Link>
        <MobileMenu
          links={getMenuLinks(d)}
          lang={lang}
          t={{ ...d.lang, mobile: d.nav.mobile, openMenu: d.nav.openMenu, closeMenu: d.nav.closeMenu }}
        />
      </div>
    </header>
  );
}
