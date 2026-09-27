"use client";

import { useState, type FormEvent } from "react";
import styles from "./site.module.css";

type Props = {
  /** Package the visitor asked about, when opened from a plan card. */
  plan?: string;
  className?: string;
};

export function EarlyAccess({ plan, className }: Props = {}) {
  const [sent, setSent] = useState(false);

  // No backend yet — wire this to your CRM or form service.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className={`${styles.formDone} ${className ?? ""}`} role="status">
        <span className={styles.code}>Received</span>
        <p>
          {plan
            ? `Thanks. We’ll be in touch about ${plan} and how it would fit your business.`
            : "Thanks. We’ll reach out to map your lead-to-appointment workflow together."}
        </p>
      </div>
    );
  }

  return (
    <form className={`${styles.form} ${className ?? ""}`} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span>Your name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label className={styles.field}>
        <span>Work email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className={styles.field}>
        <span>Business type</span>
        <select name="type" defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option>Clinic or wellness</option>
          <option>Salon or studio</option>
          <option>Home services</option>
          <option>Consulting or agency</option>
          <option>Other service business</option>
        </select>
      </label>
      {plan && (
        <label className={styles.field}>
          <span>Package</span>
          <select name="plan" defaultValue={plan}>
            <option>Core</option>
            <option>Growth</option>
            <option>Not sure yet</option>
          </select>
        </label>
      )}
      <label className={`${styles.field} ${styles.fieldWide}`}>
        <span>What takes up most of your time?</span>
        <textarea
          name="task"
          rows={3}
          placeholder="e.g. Replying to WhatsApp inquiries after hours and chasing people to confirm."
        />
      </label>
      <button type="submit" className={styles.btnPrimary}>
        {plan ? `Ask about ${plan}` : "Join early access"}
      </button>
    </form>
  );
}
