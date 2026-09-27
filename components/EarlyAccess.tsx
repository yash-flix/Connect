"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/config";
import styles from "./site.module.css";

type Props = {
  /** Package the visitor asked about, when opened from a plan card. */
  plan?: string;
  className?: string;
  /** Words for the form, in the visitor's language. */
  t: Dictionary["form"];
};

export function EarlyAccess({ plan, className, t }: Props) {
  const [sent, setSent] = useState(false);

  // No backend yet — wire this to your CRM or form service.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className={`${styles.formDone} ${className ?? ""}`} role="status">
        <span className={styles.code}>{t.received}</span>
        <p>
          {plan
            ? fmt(t.doneWithPlan, { plan })
            : t.done}
        </p>
      </div>
    );
  }

  return (
    <form className={`${styles.form} ${className ?? ""}`} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span>{t.name}</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label className={styles.field}>
        <span>{t.email}</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className={styles.field}>
        <span>{t.type}</span>
        <select name="type" defaultValue="">
          <option value="" disabled>
            {t.choose}
          </option>
          <option>{t.types[0]}</option>
          <option>{t.types[1]}</option>
          <option>{t.types[2]}</option>
          <option>{t.types[3]}</option>
          <option>{t.types[4]}</option>
        </select>
      </label>
      {plan && (
        <label className={styles.field}>
          <span>{t.plan}</span>
          <select name="plan" defaultValue={plan}>
            <option>Core</option>
            <option>Growth</option>
            <option>{t.notSure}</option>
          </select>
        </label>
      )}
      <label className={`${styles.field} ${styles.fieldWide}`}>
        <span>{t.task}</span>
        <textarea
          name="task"
          rows={3}
          placeholder={t.placeholder}
        />
      </label>
      <button type="submit" className={styles.btnPrimary}>
        {plan ? fmt(t.askAbout, { plan }) : t.join}
      </button>
    </form>
  );
}
