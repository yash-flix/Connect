import Link from "next/link";
import { navLinks } from "@/lib/nav";
import { Logo } from "./Logo";
import styles from "./site.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footerHero}>
          <div className={styles.footerBrand}>
            <Logo />
            <p className={styles.muted}>
              The front desk for businesses that don’t have one.
            </p>
          </div>
          <Link href="/#early-access" className={styles.btnPrimary}>
            Get early access
          </Link>
        </div>

        <div className={styles.footerBase}>
          <nav className={styles.footerLinks} aria-label="Footer">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <span className={styles.code}>© {new Date().getFullYear()} Connect</span>
          <a href="#top" className={styles.code}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
