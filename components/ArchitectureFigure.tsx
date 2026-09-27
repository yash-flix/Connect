import site from "./site.module.css";
import styles from "./packages.module.css";

type Node = { title: string; sub: string; growth?: boolean };

const agents: Node[] = [
  { title: "WhatsApp agent", sub: "Replies to messages" },
  { title: "Voice agent", sub: "Calls new enquiries back", growth: true },
];

const foundation: Node[] = [
  { title: "Approved info", sub: "1 or up to 3 services" },
  { title: "Customer record", sub: "One per customer" },
  { title: "Hand-off to you", sub: "Alert + summary" },
  { title: "Calendar", sub: "Visits booked" },
];

const ops: Node[] = [
  { title: "Routing", sub: "Right info per service", growth: true },
  { title: "Monitoring", sub: "Alerts if anything breaks" },
  { title: "Basic report", sub: "Monthly numbers" },
  { title: "Full report", sub: "+ monthly review call", growth: true },
];

function Box({ n }: { n: Node }) {
  return (
    <div className={styles.node} data-growth={n.growth || undefined}>
      <span className={styles.nodeTitle}>{n.title}</span>
      <span className={styles.nodeSub}>{n.sub}</span>
    </div>
  );
}

/** Fig. 1 on /packages: both packages share one foundation; Growth switches modules on. */
export function ArchitectureFigure() {
  return (
    <figure className={site.sheet}>
      <span className={site.crosshairs} aria-hidden="true" />
      <div className={site.sheetHead}>
        <span className={site.code}>Fig. 1 · How the packages fit together</span>
        <span className={site.code}>One foundation</span>
      </div>

      <div
        className={styles.arch}
        role="img"
        aria-label="The WhatsApp agent, and in Growth the Voice agent, connect to one central flow. That flow uses your approved information, one record per customer, hand-offs to you and your calendar. Around it run routing (Growth), monitoring, a basic report, and a full report (Growth)."
      >
        <div className={styles.archAgents} aria-hidden="true">
          {agents.map((n) => (
            <div key={n.title} className={styles.down}>
              <Box n={n} />
            </div>
          ))}
        </div>

        <div className={styles.hub} aria-hidden="true">
          <span className={styles.nodeTitle}>Connect runs the flow</span>
          <span className={styles.nodeSub}>Your setup decides which modules are on</span>
        </div>

        <div className={styles.archRow} aria-hidden="true">
          {foundation.map((n) => (
            <div key={n.title} className={styles.up}>
              <Box n={n} />
            </div>
          ))}
        </div>

        <div className={styles.ops} aria-hidden="true">
          <span className={site.code}>Running in the background</span>
          <div className={styles.archRow}>
            {ops.map((n) => (
              <Box key={n.title} n={n} />
            ))}
          </div>
        </div>
      </div>

      <figcaption className={site.sheetFoot}>
        <span className={styles.legend}>
          <span><i data-kind="both" /> In both packages</span>
          <span><i data-kind="growth" /> Growth only</span>
        </span>
        <span className={site.sheetMeta}>
          <span className={site.code}>Upgrading is a switch, not a rebuild</span>
        </span>
      </figcaption>
    </figure>
  );
}
