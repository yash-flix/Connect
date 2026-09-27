"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/nav";
import styles from "./site.module.css";

// Same links as the header, with early access in its section order before FAQ.
const links = [
  ...navLinks.slice(0, -1),
  { n: "§ 4", label: "Early access", href: "/#early-access" },
  ...navLinks.slice(-1),
];

export function MobileMenu() {
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
        <span className={styles.srOnly}>{open ? "Close menu" : "Open menu"}</span>
      </button>
      {open && (
        <nav id="mobile-menu" className={styles.menuPanel} aria-label="Mobile">
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
        </nav>
      )}
    </div>
  );
}
