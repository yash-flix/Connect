import type { ReactNode } from "react";
import type { Agent, AgentId } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { Board } from "./Board";
import styles from "./site.module.css";

type Props = {
  fig: string;
  status: string;
  agents: Agent[];
  installed: AgentId[];
  installing?: AgentId;
  label: string;
  /** Words printed on the board. */
  text: Dictionary["board"];
  channels: string[];
  caption: ReactNode;
  meta: ReactNode;
  /** Optional panel beside the board, e.g. a legend. */
  aside?: ReactNode;
};

/** The drawing sheet every board figure sits on, so they all match. */
export function BoardFigure({
  fig,
  status,
  agents,
  installed,
  installing,
  label,
  text,
  channels,
  caption,
  meta,
  aside,
}: Props) {
  return (
    <figure className={styles.sheet}>
      <span className={styles.crosshairs} aria-hidden="true" />
      <div className={styles.sheetHead}>
        <span className={styles.code}>{fig}</span>
        <span className={styles.code}>{status}</span>
      </div>
      <div className={styles.sheetBoard} data-aside={aside ? true : undefined}>
        <Board
          agents={agents}
          installed={installed}
          installing={installing}
          annotated
          label={label}
          text={text}
          channels={channels}
        />
        {aside}
      </div>
      <figcaption className={styles.sheetFoot}>
        <span>{caption}</span>
        <span className={styles.sheetMeta}>{meta}</span>
      </figcaption>
    </figure>
  );
}
