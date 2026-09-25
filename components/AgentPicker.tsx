"use client";

import { useState } from "react";
import { agents } from "@/lib/content";
import styles from "./site.module.css";

const DEFAULT = ["booking", "whatsapp", "followup"];

export function AgentPicker() {
  const [selected, setSelected] = useState<string[]>(DEFAULT);

  const toggle = (id: string) =>
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );

  const chosen = agents.filter((a) => selected.includes(a.id));

  return (
    <div className={styles.picker}>
      <ul className={styles.agentGrid}>
        {agents.map((a) => {
          const on = selected.includes(a.id);
          return (
            <li key={a.id}>
              <button
                type="button"
                className={styles.agentCard}
                data-on={on}
                aria-pressed={on}
                onClick={() => toggle(a.id)}
              >
                <span className={styles.agentTop}>
                  <span className={styles.mono}>{a.code}</span>
                  <span className={styles.check} aria-hidden="true">
                    {on ? "✓" : "+"}
                  </span>
                </span>
                <span className={styles.agentName}>{a.name}</span>
                <span className={styles.agentJob}>{a.job}</span>
                <span className={styles.agentExample}>{a.example}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.summary} aria-live="polite">
        <div>
          <span className={styles.mono}>Your Connect</span>
          <p className={styles.summaryList}>
            {chosen.length === 0
              ? "No agents yet — pick the work you want off your plate."
              : chosen.map((a) => a.name).join(" · ")}
          </p>
        </div>
        <div className={styles.summaryRight}>
          <span className={styles.summaryCount}>
            {chosen.length}
            <span> / {agents.length} agents</span>
          </span>
          <a href="#early-access" className={styles.btnPrimary}>
            Request this setup
          </a>
        </div>
      </div>
    </div>
  );
}
