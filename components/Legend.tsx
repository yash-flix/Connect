import { bounds, points } from "@/lib/iso";
import { IsoBox, ModuleIcon } from "./iso";
import iso from "./iso.module.css";
import styles from "./site.module.css";

const rhombus = points([
  [0, 0, 0],
  [10, 0, 0],
  [10, 10, 0],
  [0, 10, 0],
]);
const rb = bounds(
  [
    [0, 0, 0],
    [10, 0, 0],
    [0, 10, 0],
    [10, 10, 0],
  ],
  1,
);
const flatBox = `${rb.minX} ${rb.minY} ${rb.w} ${rb.h}`;

const core = bounds(
  [
    [0, 0, 2],
    [14, 0, 0],
    [0, 4, 0],
    [14, 4, 0],
  ],
  1,
);

const items = [
  {
    key: "module",
    title: "Agent module",
    body: "One agent, one job.",
    swatch: <ModuleIcon id="booking" on />,
  },
  {
    key: "socket",
    title: "Open socket",
    body: "Room to add an agent later.",
    swatch: (
      <svg viewBox={flatBox} className={styles.swatch} aria-hidden="true">
        <polygon points={rhombus} className={iso.socketBed} />
      </svg>
    ),
  },
  {
    key: "ghost",
    title: "Installing",
    body: "An agent being plugged in.",
    swatch: (
      <svg viewBox={flatBox} className={styles.swatch} aria-hidden="true">
        <polygon points={rhombus} className={iso.socketGhost} />
      </svg>
    ),
  },
  {
    key: "core",
    title: "Core",
    body: "Shared inbox, calendar and rules.",
    swatch: (
      <svg
        viewBox={`${core.minX} ${core.minY} ${core.w} ${core.h}`}
        className={styles.swatch}
        aria-hidden="true"
      >
        <IsoBox x={0} y={0} z={0} w={14} d={4} h={2} tone="ink" />
      </svg>
    ),
  },
  {
    key: "channel",
    title: "Channel",
    body: "Where customers reach you.",
    swatch: (
      <svg viewBox="0 0 24 12" className={styles.swatch} aria-hidden="true">
        <rect x="1" y="3" width="3.4" height="3" rx="0.6" className={iso.jack} />
        <path d="M4.4 4.5C11 4.5 12 9 20 9" className={iso.cable} />
        <circle cx="21" cy="9" r="1.2" className={iso.leaderDot} />
      </svg>
    ),
  },
];

export function Legend() {
  return (
    <div className={styles.legend}>
      <span className={styles.code}>Legend</span>
      <ul>
        {items.map((i) => (
          <li key={i.key}>
            <span className={styles.swatchBox}>{i.swatch}</span>
            <span>
              <strong>{i.title}</strong>
              <span>{i.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
