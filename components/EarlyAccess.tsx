"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/config";
import styles from "./site.module.css";

/**
 * Values stored with the enquiry, in English whatever the page language, so
 * the database stays consistent. Same order as the dictionary's `types`.
 */
const TYPE_VALUES = [
  "Clinic or wellness",
  "Salon or studio",
  "Home services",
  "Consulting or agency",
  "Other service business",
];

type Props = {
  /** Package the visitor asked about, when opened from a plan card. */
  plan?: string;
  className?: string;
  /** Words for the form, in the visitor's language. */
  t: Dictionary["form"];
};

export function EarlyAccess({ plan, className, t }: Props) {
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
        field?: string;
      } | null;
      const field = json?.field as keyof typeof t.errors | undefined;
      setError(field && field in t.errors ? t.errors[field] : t.errors.body);
    } catch {
      setError(t.networkError);
    } finally {
      setSubmitting(false);
    }
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
          {t.types.map((label, i) => (
            <option key={TYPE_VALUES[i]} value={TYPE_VALUES[i]}>
              {label}
            </option>
          ))}
        </select>
      </label>
      {plan && (
        <label className={styles.field}>
          <span>{t.plan}</span>
          <select name="plan" defaultValue={plan}>
            <option>Core</option>
            <option>Growth</option>
            <option value="Not sure yet">{t.notSure}</option>
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
        {submitting ? t.sending : plan ? fmt(t.askAbout, { plan }) : t.join}
      </button>
    </form>
  );
}
