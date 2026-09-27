"use client";

import { useRef, type MouseEvent } from "react";
import type { Dictionary } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/config";
import { EarlyAccess } from "./EarlyAccess";
import { Logo } from "./Logo";
import styles from "./site.module.css";

type Props = {
  plan: string;
  primary?: boolean;
  t: Dictionary["enquiry"];
  /** Words for the form inside the modal. */
  form: Dictionary["form"];
};

/** "Ask about <plan>" button that opens the enquiry form in a modal. */
export function PlanEnquiry({ plan, primary, t, form }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  // A click on the backdrop lands on the dialog itself, not its panel.
  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) e.currentTarget.close();
  };

  return (
    <>
      <button
        type="button"
        className={primary ? styles.btnPrimary : styles.btnGhost}
        onClick={() => ref.current?.showModal()}
      >
        {fmt(t.button, { plan })}
      </button>

      <dialog
        ref={ref}
        className={styles.modal}
        aria-labelledby={`enquiry-${plan}`}
        onClick={onBackdrop}
      >
        <div className={styles.modalPanel}>
          <div className={styles.modalHead}>
            <Logo />
            <button
              type="button"
              className={styles.modalClose}
              aria-label={t.close}
              onClick={() => ref.current?.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className={styles.modalIntro}>
            <p className={styles.eyebrow}>{fmt(t.eyebrow, { plan })}</p>
            <h2 id={`enquiry-${plan}`} className={styles.modalTitle}>
              {t.title}
            </h2>
            <p className={styles.muted}>{fmt(t.body, { plan })}</p>
          </div>
          <EarlyAccess plan={plan} className={styles.modalForm} t={form} />
        </div>
      </dialog>
    </>
  );
}
