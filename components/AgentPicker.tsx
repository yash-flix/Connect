"use client";

import { useState } from "react";
import { agents, parents, type AgentId } from "@/lib/content";
import { BoardFigure } from "./BoardFigure";
import { ModuleIcon } from "./iso";
import styles from "./site.module.css";

const DEFAULT: AgentId[] = ["qualify", "booking", "handoff"];

export function AgentPicker() {
  const [installed, setInstalled] = useState<AgentId[]>(DEFAULT);

  const toggle = (id: AgentId) =>
    setInstalled((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );

  const chosen = agents.filter((a) => installed.includes(a.id));

  return (
    <div className={styles.picker}>
      <div>
        {/* The two parent agents, one per channel. */}
        <ul className={styles.parents}>
          {parents.map((p) => {
            const jobs = chosen.filter((a) => a.by.includes(p.id));
            const on = jobs.length > 0;
            return (
              <li key={p.id} className={styles.parent} data-on={on}>
                <div className={styles.parentHead}>
                  <ModuleIcon id={p.id} on={on} />
                  <div>
                    <span className={styles.code}>{p.code} · Agent</span>
                    <h3 className={styles.entryName}>{p.name}</h3>
                  </div>
                </div>
                <p className={styles.entryJob}>{p.job}</p>
                <p className={styles.parentJobs}>
                  <span className={styles.code}>Doing now</span>
                  {on ? jobs.map((a) => a.name).join(" · ") : "Nothing yet"}
                </p>
              </li>
            );
          })}
        </ul>

        {/* The jobs those agents carry out. */}
        <p className={`${styles.code} ${styles.jobsLabel}`}>
          The jobs they do · switch on what you need
        </p>
        <ol className={styles.catalogue}>
          {agents.map((a) => {
            const on = installed.includes(a.id);
            return (
              <li key={a.id} className={styles.entry} data-on={on}>
                <ModuleIcon id={a.id} on={on} />
                <div className={styles.entryText}>
                  <div className={styles.entryHead}>
                    <span className={styles.entryName}>{a.name}</span>
                    <span className={styles.code}>{a.code}</span>
                  </div>
                  <p className={styles.entryJob}>{a.job}</p>
                  <p className={styles.entryExample}>{a.example}</p>
                  <ul className={styles.chips} aria-label="Done by">
                    {a.by.map((id) => (
                      <li key={id}>{parents.find((p) => p.id === id)?.name}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className={styles.toggle}
                  aria-pressed={on}
                  aria-label={`${on ? "Switch off" : "Switch on"} ${a.name}`}
                  onClick={() => toggle(a.id)}
                >
                  {on ? "On" : "Switch on"}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles.preview} aria-live="polite">
        <BoardFigure
          fig="Fig. 3 · Your board"
          status={`${chosen.length} of ${agents.length} jobs on`}
          installed={installed}
          label={`Connect board with ${chosen.length} jobs switched on`}
          caption={
            chosen.length === 0
              ? "An empty board. Switch on a job to start."
              : chosen.map((a) => a.name).join(" + ")
          }
          meta={
            <a href="#early-access" className={styles.btnPrimary}>
              Ask about this setup
            </a>
          }
        />
      </div>
    </div>
  );
}
