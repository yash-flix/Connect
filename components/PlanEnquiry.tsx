"use client";

import { useRef, type MouseEvent } from "react";
import { EarlyAccess } from "./EarlyAccess";
import { Logo } from "./Logo";
import styles from "./site.module.css";

type Props = { plan: string; primary?: boolean };

/** "Ask about <plan>" button that opens the enquiry form in a modal. */
export function PlanEnquiry({ plan, primary }: Props) {
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
        Ask about {plan}
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
              aria-label="Close"
              onClick={() => ref.current?.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className={styles.modalIntro}>
            <p className={styles.eyebrow}>Package · {plan}</p>
            <h2 id={`enquiry-${plan}`} className={styles.modalTitle}>
              Tell us about your business.
            </h2>
            <p className={styles.muted}>
              We’ll get back to you about {plan} and map how the agents would
              handle your enquiries.
            </p>
          </div>
          <EarlyAccess plan={plan} className={styles.modalForm} />
        </div>
      </dialog>
    </>
  );
}
