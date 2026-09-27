import type { Dictionary } from "@/lib/i18n";
import site from "./site.module.css";
import styles from "./packages.module.css";

type Node = { title: string; sub: string; growth?: boolean };

/** Which nodes in each row are Growth only; the words come from the dictionary. */
const growthOnly = {
  agents: [false, true],
  foundation: [false, false, false, false],
  ops: [true, false, false, true],
};

const withGrowth = (nodes: { title: string; sub: string }[], flags: boolean[]): Node[] =>
  nodes.map((n, i) => ({ ...n, growth: flags[i] }));

function Box({ n }: { n: Node }) {
  return (
    <div className={styles.node} data-growth={n.growth || undefined}>
      <span className={styles.nodeTitle}>{n.title}</span>
      <span className={styles.nodeSub}>{n.sub}</span>
    </div>
  );
}

/** Fig. 1 on /packages: both packages share one foundation; Growth switches modules on. */
export function ArchitectureFigure({ t }: { t: Dictionary["arch"] }) {
  const agents = withGrowth(t.agents, growthOnly.agents);
  const foundation = withGrowth(t.foundation, growthOnly.foundation);
  const ops = withGrowth(t.ops, growthOnly.ops);
  return (
    <figure className={site.sheet}>
      <span className={site.crosshairs} aria-hidden="true" />
      <div className={site.sheetHead}>
        <span className={site.code}>{t.fig}</span>
        <span className={site.code}>{t.oneFoundation}</span>
      </div>

      <div
        className={styles.arch}
        role="img"
        aria-label={t.aria}
      >
        <div className={styles.archAgents} aria-hidden="true">
          {agents.map((n) => (
            <div key={n.title} className={styles.down}>
              <Box n={n} />
            </div>
          ))}
        </div>

        <div className={styles.hub} aria-hidden="true">
          <span className={styles.nodeTitle}>{t.hubTitle}</span>
          <span className={styles.nodeSub}>{t.hubSub}</span>
        </div>

        <div className={styles.archRow} aria-hidden="true">
          {foundation.map((n) => (
            <div key={n.title} className={styles.up}>
              <Box n={n} />
            </div>
          ))}
        </div>

        <div className={styles.ops} aria-hidden="true">
          <span className={site.code}>{t.background}</span>
          <div className={styles.archRow}>
            {ops.map((n) => (
              <Box key={n.title} n={n} />
            ))}
          </div>
        </div>
      </div>

      <figcaption className={site.sheetFoot}>
        <span className={styles.legend}>
          <span><i data-kind="both" /> {t.inBoth}</span>
          <span><i data-kind="growth" /> {t.growthOnly}</span>
        </span>
        <span className={site.sheetMeta}>
          <span className={site.code}>{t.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}
