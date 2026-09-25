"use client";

import { useState } from "react";
import { agents, type AgentId } from "@/lib/content";
import { BoardFigure } from "./BoardFigure";
import { ModuleIcon } from "./iso";
import styles from "./site.module.css";

const DEFAULT: AgentId[] = ["booking", "whatsapp", "followup"];

export function AgentPicker() {
  const [installed, setInstalled] = useState<AgentId[]>(DEFAULT);

  const toggle = (id: AgentId) =>
    setInstalled((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );

  const chosen = agents.filter((a) => installed.includes(a.id));

  return (
    <div className={styles.picker}>
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
              </div>
              <button
                type="button"
                className={styles.toggle}
                aria-pressed={on}
                aria-label={`${on ? "Remove" : "Install"} ${a.name}`}
                onClick={() => toggle(a.id)}
              >
                {on ? "Installed" : "Install"}
              </button>
            </li>
          );
        })}
      </ol>
      <div className={styles.preview} aria-live="polite">
        <BoardFigure
          fig="Fig. 3 · Your board"
          status={`${chosen.length} of ${agents.length} installed`}
          installed={installed}
          label={`Connect board with ${chosen.length} agents installed`}
          caption={
            chosen.length === 0
              ? "An empty board. Install an agent to start."
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
