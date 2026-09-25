import type { CSSProperties, ReactNode } from "react";
import type { AgentId } from "@/lib/content";
import { boxFaces, bounds, planeMatrix } from "@/lib/iso";
import styles from "./iso.module.css";

type Tone = "paper" | "moss" | "plate" | "ink";

type BoxProps = {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
  /** Drawn flat on the top face, in a w×d local coordinate space. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function IsoBox({ x, y, z, w, d, h, tone = "paper", children, className, style }: BoxProps) {
  const f = boxFaces(x, y, z, w, d, h);
  return (
    <g className={className} style={style} data-tone={tone}>
      <polygon points={f.front} className={styles.front} />
      <polygon points={f.side} className={styles.side} />
      <polygon points={f.top} className={styles.top} />
      {children && (
        <g transform={planeMatrix(x, y, z + h)} className={styles.glyph}>
          {children}
        </g>
      )}
    </g>
  );
}

/** Line-art symbol for each agent, drawn in a 10×10 box. */
export function Glyph({ id }: { id: AgentId }) {
  switch (id) {
    case "booking":
      return (
        <>
          <rect x="2.4" y="2.8" width="5.2" height="4.6" rx="0.3" />
          <path d="M2.4 4.3h5.2M4 2v1.6M6 2v1.6" />
          <rect x="5.1" y="5.2" width="1.2" height="1.2" className={styles.fill} />
        </>
      );
    case "voice":
      return (
        <>
          <circle cx="3.4" cy="5" r="0.9" className={styles.fill} />
          <path d="M5 3.6a2 2 0 0 1 0 2.8M6.4 2.4a3.6 3.6 0 0 1 0 5.2" />
        </>
      );
    case "whatsapp":
      return (
        <>
          <path d="M2.8 2.6h4.4a.6.6 0 0 1 .6.6v3a.6.6 0 0 1-.6.6H4.6L3 8.2V6.8h-.2a.6.6 0 0 1-.6-.6v-3a.6.6 0 0 1 .6-.6z" />
          <path d="M3.6 4.1h2.8M3.6 5.3h1.8" />
        </>
      );
    case "followup":
      return (
        <>
          <path d="M7.4 5a2.4 2.4 0 1 1-1-1.95" />
          <path d="M6.5 1.9l-.1 1.2 1.2.3" />
        </>
      );
    case "content":
      return <path d="M2.4 3.2h5.2M2.4 4.6h5.2M2.4 6h5.2M2.4 7.4h3" />;
    case "marketing":
      return (
        <>
          <path d="M2.4 4.2h1.4L7.4 2.6v4.8L3.8 5.8H2.4z" />
          <path d="M3.2 5.8l.5 1.8" />
        </>
      );
    case "leadgen":
      return (
        <>
          <circle cx="5" cy="5" r="2.6" />
          <circle cx="5" cy="5" r="1.3" />
          <circle cx="5" cy="5" r="0.35" className={styles.fill} />
        </>
      );
    case "proposal":
      return (
        <>
          <path d="M3 2.2h3l1.6 1.6v4H3z" />
          <path d="M6 2.2v1.6h1.6M3.9 5h2.6M3.9 6.3h1.8" />
        </>
      );
  }
}

/* ---------- Single module, used as a catalogue icon ---------- */

export function ModuleIcon({ id, on }: { id: AgentId; on: boolean }) {
  const h = 5;
  const b = bounds(
    [
      [0, 0, h],
      [10, 0, 0],
      [0, 10, 0],
      [10, 10, 0],
    ],
    1,
  );
  return (
    <svg
      className={styles.icon}
      viewBox={`${b.minX} ${b.minY} ${b.w} ${b.h}`}
      aria-hidden="true"
    >
      <IsoBox x={0} y={0} z={0} w={10} d={10} h={h} tone={on ? "moss" : "paper"}>
        <Glyph id={id} />
      </IsoBox>
    </svg>
  );
}

/* ---------- The logo mark: a single module on a plate ---------- */

export function Mark({ size = 22 }: { size?: number }) {
  const b = bounds(
    [
      [0, 0, 7],
      [10, 0, 0],
      [0, 10, 0],
      [10, 10, 0],
    ],
    0.8,
  );
  return (
    <svg
      width={size}
      height={size}
      viewBox={`${b.minX} ${b.minY} ${b.w} ${b.h}`}
      aria-hidden="true"
      className={styles.mark}
    >
      <IsoBox x={0} y={0} z={0} w={10} d={10} h={2} tone="plate" />
      <IsoBox x={2.5} y={2.5} z={2} w={5} d={5} h={5} tone="moss" />
    </svg>
  );
}
