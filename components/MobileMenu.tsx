"use client";

import { useEffect, useState } from "react";
import styles from "./site.module.css";

const links = [
  ["§ 1", "How it works", "#flow"],
  ["§ 2", "Agents", "#agents"],
  ["§ 3", "Control", "#rules"],
  ["§ 4", "Early access", "#early-access"],
  ["§ 5", "FAQ", "#faq"],
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
            {links.map(([n, label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>
                  <span className={styles.tbNum}>{n}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}
