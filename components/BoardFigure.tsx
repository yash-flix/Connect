import type { ReactNode } from "react";
import type { AgentId } from "@/lib/content";
import { Board } from "./Board";
import styles from "./site.module.css";

type Props = {
  fig: string;
  status: string;
  installed: AgentId[];
  installing?: AgentId;
  label: string;
  caption: ReactNode;
  meta: ReactNode;
  /** Optional panel beside the board, e.g. a legend. */
  aside?: ReactNode;
};

/** The drawing sheet every board figure sits on, so they all match. */
export function BoardFigure({ fig, status, installed, installing, label, caption, meta, aside }: Props) {
  return (
    <figure className={styles.sheet}>
      <span className={styles.crosshairs} aria-hidden="true" />
      <div className={styles.sheetHead}>
        <span className={styles.code}>{fig}</span>
        <span className={styles.code}>{status}</span>
      </div>
      <div className={styles.sheetBoard} data-aside={aside ? true : undefined}>
        <Board installed={installed} installing={installing} annotated label={label} />
        {aside}
      </div>
      <figcaption className={styles.sheetFoot}>
        <span>{caption}</span>
        <span className={styles.sheetMeta}>{meta}</span>
      </figcaption>
    </figure>
  );
}
