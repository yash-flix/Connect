"use client";

import { useState } from "react";
import type { Agent, AgentId, Parent } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/config";
import { BoardFigure } from "./BoardFigure";
import { ModuleIcon } from "./iso";
import styles from "./site.module.css";

const DEFAULT: AgentId[] = ["qualify", "booking", "handoff"];

type Props = {
  agents: Agent[];
  parents: Parent[];
  t: Dictionary["picker"];
  board: Dictionary["board"];
  channels: string[];
};

export function AgentPicker({ agents, parents, t, board, channels }: Props) {
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
                    <span className={styles.code}>{p.code} · {t.agent}</span>
                    <h3 className={styles.entryName}>{p.name}</h3>
                  </div>
                </div>
                <p className={styles.entryJob}>{p.job}</p>
                <p className={styles.parentJobs}>
                  <span className={styles.code}>{t.doingNow}</span>
                  {on ? jobs.map((a) => a.name).join(" · ") : t.nothingYet}
                </p>
              </li>
            );
          })}
        </ul>

        {/* The jobs those agents carry out. */}
        <p className={`${styles.code} ${styles.jobsLabel}`}>
          {t.jobsLabel}
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
                  <ul className={styles.chips} aria-label={t.doneBy}>
                    {a.by.map((id) => (
                      <li key={id}>{parents.find((p) => p.id === id)?.name}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className={styles.toggle}
                  aria-pressed={on}
                  aria-label={fmt(on ? t.switchOffLabel : t.switchOnLabel, { name: a.name })}
                  onClick={() => toggle(a.id)}
                >
                  {on ? t.on : t.switchOn}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles.preview} aria-live="polite">
        <BoardFigure
          fig={t.fig}
          status={fmt(t.status, { n: chosen.length, total: agents.length })}
          agents={agents}
          installed={installed}
          label={fmt(t.boardLabel, { n: chosen.length })}
          text={board}
          channels={channels}
          caption={
            chosen.length === 0
              ? t.empty
              : chosen.map((a) => a.name).join(" + ")
          }
          meta={
            <a href="#early-access" className={styles.btnPrimary}>
              {t.ask}
            </a>
          }
        />
      </div>
    </div>
  );
}
