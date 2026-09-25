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
};

/** The drawing sheet every board figure sits on, so they all match. */
export function BoardFigure({ fig, status, installed, installing, label, caption, meta }: Props) {
  return (
    <figure className={styles.sheet}>
      <div className={styles.sheetHead}>
        <span className={styles.code}>{fig}</span>
        <span className={styles.code}>{status}</span>
      </div>
      <div className={styles.sheetBoard}>
        <Board installed={installed} installing={installing} annotated label={label} />
      </div>
      <figcaption className={styles.sheetFoot}>
        <span>{caption}</span>
        <span className={styles.sheetMeta}>{meta}</span>
      </figcaption>
    </figure>
  );
}
