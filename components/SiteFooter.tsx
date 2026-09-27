import Link from "next/link";
import { getNavLinks } from "@/lib/nav";
import { getDictionary } from "@/lib/i18n/server";
import { Logo } from "./Logo";
import styles from "./site.module.css";

export async function SiteFooter() {
  const d = await getDictionary();
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footerHero}>
          <div className={styles.footerBrand}>
            <Logo />
            <p className={styles.muted}>{d.footer.tagline}</p>
          </div>
          <Link href="/#early-access" className={styles.btnPrimary}>
            {d.footer.cta}
          </Link>
        </div>

        <div className={styles.footerBase}>
          <nav className={styles.footerLinks} aria-label={d.nav.footer}>
            {getNavLinks(d).map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <span className={styles.code}>© {new Date().getFullYear()} Connect</span>
          <a href="#top" className={styles.code}>
            {d.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
