import Link from "next/link";
import { navLinks } from "@/lib/nav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import styles from "./site.module.css";

export function SiteHeader() {
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/#top" aria-label="Connect, home">
          <Logo />
        </Link>
        <nav className={styles.navLinks} aria-label="Primary">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/#early-access" className={styles.btnPrimary}>
          Early access
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
