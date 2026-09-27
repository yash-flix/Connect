import type { FlowStep } from "@/lib/packages";
import site from "./site.module.css";
import styles from "./packages.module.css";

type Props = {
  fig: string;
  title: string;
  steps: FlowStep[];
  /** Branch labels at a decision, e.g. "No" and "Yes ↓". */
  labels: { no: string; yes: string };
};

/** A vertical step flow; decision steps branch sideways to a hand-off. */
export function PackageFlow({ fig, title, steps, labels }: Props) {
  return (
    <figure className={styles.flowCard}>
      <div className={site.sheetHead}>
        <span className={site.code}>{fig}</span>
        <span className={site.code}>{title}</span>
      </div>
      <ol className={styles.flow}>
        {steps.map((s, i) => (
          <li key={s.title} className={styles.flowItem}>
            <div className={styles.step} data-kind={s.kind}>
              <span className={styles.stepIdx}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className={styles.nodeTitle}>{s.title}</span>
                <span className={styles.nodeSub}>{s.sub}</span>
              </div>
              {s.tag && <span className={styles.tag}>{s.tag}</span>}
            </div>
            {s.no && (
              <div className={styles.no}>
                <span className={styles.noLabel}>{labels.no}</span>
                <div className={styles.step} data-kind="decision">
                  <div>
                    <span className={styles.nodeTitle}>{s.no.title}</span>
                    <span className={styles.nodeSub}>{s.no.sub}</span>
                  </div>
                </div>
                <span className={styles.yesLabel}>{labels.yes}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
