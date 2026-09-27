"use client";

import { useState, type FormEvent } from "react";
import styles from "./site.module.css";

/** User-facing strings added for form submission, kept here for translation. */
export const FORM_TEXT = {
  sending: "Sending…",
  genericError: "Something went wrong. Please try again.",
  networkError: "Couldn’t reach the server. Check your connection and try again.",
} as const;

type Props = {
  /** Package the visitor asked about, when opened from a plan card. */
  plan?: string;
  className?: string;
};

export function EarlyAccess({ plan, className }: Props = {}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Posts to app/api/enquiries/route.ts, which stores the enquiry in MongoDB.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: plan ? "packages" : "home" }),
      });
      if (res.ok) {
        setSent(true);
        return;
      }
      const json = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setError(json?.error || FORM_TEXT.genericError);
    } catch {
      setError(FORM_TEXT.networkError);
    } finally {
      setSubmitting(false);
    }
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
      <input
        className={styles.honeypot}
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {error && (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className={styles.btnPrimary}
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting
          ? FORM_TEXT.sending
          : plan ? `Ask about ${plan}` : "Join early access"}
      </button>
    </form>
  );
}
