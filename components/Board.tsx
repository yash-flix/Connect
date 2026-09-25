import { agents, type Agent, type AgentId } from "@/lib/content";
import { bounds, COS30, planeMatrix, points, project } from "@/lib/iso";
import { Glyph, IsoBox } from "./iso";
import styles from "./iso.module.css";

// Board geometry, in world units.
const SLOT = 10;
const PITCH = 13;
const M = 3;
const PH = 4; // plate thickness
const CORE_Y = M + SLOT + 4;
const CORE_D = 6;
const CORE_H = 2.5;
const ROW1_Y = CORE_Y + CORE_D + 4;
const PW = M * 2 + 4 * SLOT + 3 * (PITCH - SLOT);
const PD = ROW1_Y + SLOT + M;
const LIFT = 11; // how far the "installing" module floats

const CHANNELS = ["WhatsApp", "Calls", "Web forms", "Email"];
const JACK_Y = [16, 18.5, 21, 23.5];

function slot(i: number) {
  const row = i < 4 ? 0 : 1;
  return { sx: M + (i % 4) * PITCH, sy: row === 0 ? M : ROW1_Y, row, n: i + 1 };
}

/** Side face (y–z plane at x), local u → +y, v → down. */
function sideMatrix(x: number, y: number, z: number) {
  const [e, f] = project([x, y, z]);
  return `matrix(${-COS30} 0.5 0 1 ${e.toFixed(2)} ${f.toFixed(2)})`;
}

/** Front face (x–z plane at y), local u → +x, v → down. */
function frontMatrix(x: number, y: number, z: number) {
  const [e, f] = project([x, y, z]);
  return `matrix(${COS30} 0.5 0 1 ${e.toFixed(2)} ${f.toFixed(2)})`;
}

type Label = { key: string; text: string; sub?: string; left: number; top: number; pos: "above" | "below" | "right" };

function Module({
  agent,
  x,
  y,
  z,
  state,
  delay,
}: {
  agent: Agent;
  x: number;
  y: number;
  z: number;
  state: "on" | "installing";
  delay: number;
}) {
  const h = agent.height;
  const [lx, ly] = project([x + 1.4, y + SLOT, z + h - 1.3]);
  return (
    <g
      className={state === "installing" ? styles.float : styles.module}
      style={{ animationDelay: `${delay}s` }}
    >
      <IsoBox x={x} y={y} z={z} w={SLOT} d={SLOT} h={h} tone="moss" />
      {/* vent slots on the side face */}
      {h >= 5 &&
        [6, 7.2, 8.4].map((vy) => {
          const [ax, ay] = project([x + SLOT, y + vy, z + 1.3]);
          const [bx, by] = project([x + SLOT, y + vy, z + h - 1.6]);
          return <line key={vy} x1={ax} y1={ay} x2={bx} y2={by} className={styles.vent} />;
        })}
      {/* part code on the front face */}
      <g transform={frontMatrix(x, y + SLOT, z + h)}>
        <text x="3" y={h - 1.1} className={styles.faceText}>
          {agent.code}
        </text>
      </g>
      <circle
        cx={lx}
        cy={ly}
        r="0.55"
        className={state === "installing" ? styles.ledBlink : styles.led}
      />
      {/* raised cap carrying the glyph */}
      <IsoBox x={x + 1.2} y={y + 1.2} z={z + h} w={SLOT - 2.4} d={SLOT - 2.4} h={0.7} tone="moss">
        <g transform="scale(0.76)">
          <Glyph id={agent.id} />
        </g>
      </IsoBox>
    </g>
  );
}

type BoardProps = {
  installed: AgentId[];
  /** Agent shown floating above its socket, mid-install. */
  installing?: AgentId;
  /** Callouts, channel cables and labels (the hero figure). */
  annotated?: boolean;
  label: string;
};

export function Board({ installed, installing, annotated = false, label }: BoardProps) {
  const mods = agents.map((a, i) => ({
    agent: a,
    ...slot(i),
    on: installed.includes(a.id),
    floating: a.id === installing,
  }));

  // Trace paths on the plate top, from each socket into the core.
  const traces = mods.map((m) =>
    m.row === 0
      ? `M${m.sx + 3} ${m.sy + SLOT} V${m.sy + SLOT + 1.8} H${m.sx + 6.5} V${CORE_Y}`
      : `M${m.sx + 7} ${m.sy} V${m.sy - 1.8} H${m.sx + 3.5} V${CORE_Y + CORE_D}`,
  );

  // Channel cables: jacks on the plate's right side, feeding the core.
  const cables = annotated
    ? JACK_Y.map((jy, i) => {
        const [sx, sy] = project([PW, jy, PH - 2]);
        const ex = project([PW, 0, 0])[0] + 7;
        const ey = sy + 2 + (i - 1.5) * 4.2;
        return {
          name: CHANNELS[i],
          d: `M${sx.toFixed(2)} ${sy.toFixed(2)} C${(sx + 6).toFixed(2)} ${(sy + 3).toFixed(2)} ${(ex - 8).toFixed(2)} ${ey.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`,
          end: [ex, ey] as [number, number],
        };
      })
    : [];

  // A fixed canvas: same framing whatever is installed, annotated or not.
  const maxH = Math.max(...agents.map((a) => a.height));
  const b = bounds(
    [
      [0, 0, 0],
      [PW, 0, 0],
      [0, PD, 0],
      [PW + 3, PD + 3, 0],
      [M, M, PH + maxH + 0.7 + LIFT],
    ],
    2,
  );
  const lead = 9;
  const vb = { x: b.minX - 4, y: b.minY - lead - 4, w: b.w + 22, h: b.h + lead * 2 + 4 };
  const pct = (x: number, y: number) => ({
    left: ((x - vb.x) / vb.w) * 100,
    top: ((y - vb.y) / vb.h) * 100,
  });

  const labels: Label[] = [];
  const leaders: { key: string; x: number; y1: number; y2: number }[] = [];
  if (annotated) {
    const topY = vb.y + 6.5;
    const bottomY = vb.y + vb.h - 2.5;
    for (const m of mods) {
      if (!m.on && !m.floating) continue;
      const above = m.row === 0;
      const z = PH + m.agent.height + 0.7 + (m.floating ? LIFT : 0);
      const [ax, ay] = above
        ? project([m.sx + SLOT / 2, m.sy + SLOT / 2, z])
        : project([m.sx + SLOT / 2, m.sy + SLOT, PH]);
      const stagger = ((m.n - 1) % 2) * 4;
      const ey = above ? topY + stagger : bottomY - stagger;
      leaders.push({ key: m.agent.id, x: ax, y1: ay, y2: ey });
      labels.push({
        key: m.agent.id,
        text: m.agent.name,
        sub: m.floating ? "installing" : undefined,
        pos: above ? "above" : "below",
        ...pct(ax, ey),
      });
    }
    for (const c of cables) {
      labels.push({ key: c.name, text: c.name, pos: "right", ...pct(c.end[0], c.end[1]) });
    }
  }

  const row0 = mods.filter((m) => m.row === 0);
  const row1 = mods.filter((m) => m.row === 1);
  const floater = mods.find((m) => m.floating);

  const renderRow = (list: typeof mods) =>
    list.map((m, i) =>
      m.on && !m.floating ? (
        <Module
          key={m.agent.id}
          agent={m.agent}
          x={m.sx}
          y={m.sy}
          z={PH}
          state="on"
          delay={0.2 + (m.n - 1) * 0.08 + i * 0.01}
        />
      ) : m.floating ? (
        <g key={m.agent.id}>
          {/* guide lines from socket corners up to the floating module */}
          {(
            [
              [m.sx + SLOT, m.sy],
              [m.sx + SLOT, m.sy + SLOT],
              [m.sx, m.sy + SLOT],
            ] as const
          ).map(([gx, gy]) => {
            const [x1, y1] = project([gx, gy, PH]);
            const [, y2] = project([gx, gy, PH + LIFT]);
            return <line key={`${gx}-${gy}`} x1={x1} y1={y1} x2={x1} y2={y2} className={styles.guide} />;
          })}
          <Module agent={m.agent} x={m.sx} y={m.sy} z={PH + LIFT} state="installing" delay={0} />
        </g>
      ) : null,
    );

  return (
    <div className={styles.boardWrap}>
      <svg
        className={styles.svg}
        viewBox={`${vb.x.toFixed(2)} ${vb.y.toFixed(2)} ${vb.w.toFixed(2)} ${vb.h.toFixed(2)}`}
        role="img"
        aria-label={label}
      >
        {/* cast shadow */}
        <polygon
          className={styles.shadow}
          points={points([
            [2.5, 2.5, 0],
            [PW + 3, 2.5, 0],
            [PW + 3, PD + 3, 0],
            [2.5, PD + 3, 0],
          ])}
        />

        <IsoBox x={0} y={0} z={0} w={PW} d={PD} h={PH} tone="plate" />

        {/* machined groove around the plate edge */}
        <polyline
          className={styles.groove}
          points={points([
            [0, PD, 1.4],
            [PW, PD, 1.4],
            [PW, 0, 1.4],
          ])}
        />

        {/* channel jacks on the front edge */}
        {annotated && (
          <g transform={sideMatrix(PW, 0, PH)}>
            {JACK_Y.map((jy) => (
              <rect key={jy} x={jy - 1.1} y="1.1" width="2.2" height="1.8" rx="0.3" className={styles.jack} />
            ))}
          </g>
        )}

        {/* everything printed or routed on the plate top */}
        <g transform={planeMatrix(0, 0, PH)}>
          {[
            [1.5, 1.5],
            [PW - 1.5, 1.5],
            [1.5, PD - 1.5],
            [PW - 1.5, PD - 1.5],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="0.6" className={styles.screw} />
              <path d={`M${x - 0.35} ${y}h0.7`} className={styles.screwSlot} />
            </g>
          ))}

          {mods.map((m, i) => (
            <path
              key={`t-${m.agent.id}`}
              d={traces[i]}
              className={m.on ? styles.trace : styles.traceIdle}
            />
          ))}
          {mods.map((m, i) =>
            m.on ? (
              <path
                key={`p-${m.agent.id}`}
                d={traces[i]}
                pathLength={100}
                className={styles.pulse}
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            ) : null,
          )}
          {mods.map((m) => {
            const [vx, vy] = m.row === 0 ? [m.sx + 3, m.sy + SLOT] : [m.sx + 7, m.sy];
            return <circle key={`v-${m.agent.id}`} cx={vx} cy={vy} r="0.45" className={m.on ? styles.via : styles.viaIdle} />;
          })}

          {mods.map((m) => (
            <g key={`s-${m.agent.id}`}>
              <rect
                x={m.sx}
                y={m.sy}
                width={SLOT}
                height={SLOT}
                rx="0.6"
                className={m.floating ? styles.socketGhost : styles.socketBed}
              />
              <text x={m.sx + 0.2} y={m.sy - 0.7} className={styles.plateText}>
                {String(m.n).padStart(2, "0")}
              </text>
            </g>
          ))}

          {floater && (
            <rect
              x={floater.sx + 1.5}
              y={floater.sy + 1.5}
              width={SLOT - 1}
              height={SLOT - 1}
              rx="0.6"
              className={styles.floatShadow}
            />
          )}

          <text x={M} y={PD - 0.9} className={styles.plateText}>
            CONNECT · BOARD 01 · 8 SOCKETS
          </text>
        </g>

        {annotated &&
          cables.map((c) => <path key={c.name} d={c.d} className={styles.cable} />)}
        {annotated &&
          cables.map((c) => (
            <circle key={`e-${c.name}`} cx={c.end[0]} cy={c.end[1]} r="0.7" className={styles.leaderDot} />
          ))}

        {leaders
          .filter((l) => l.y2 < l.y1)
          .map((l) => (
            <line key={`l-${l.key}`} x1={l.x} y1={l.y1} x2={l.x} y2={l.y2} className={styles.leader} />
          ))}

        {renderRow(row0)}

        {/* the core: shared inbox, calendar and rules */}
        <IsoBox x={M} y={CORE_Y} z={PH} w={PW - 2 * M} d={CORE_D} h={CORE_H} tone="ink" />
        <g transform={planeMatrix(M, CORE_Y, PH + CORE_H)}>
          <text x="2" y="2.6" className={styles.coreTitle}>
            CONNECT CORE
          </text>
          <text x="2" y="4.6" className={styles.coreText}>
            INBOX · CALENDAR · RULES
          </text>
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={PW - 2 * M - 6 + i * 1.8}
              cy={CORE_D / 2}
              r="0.45"
              className={styles.coreLed}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </g>

        {renderRow(row1)}

        {leaders
          .filter((l) => l.y2 > l.y1)
          .map((l) => (
            <line key={`l-${l.key}`} x1={l.x} y1={l.y1} x2={l.x} y2={l.y2} className={styles.leader} />
          ))}
        {leaders.map((l) => (
          <circle key={`d-${l.key}`} cx={l.x} cy={l.y2} r="0.6" className={styles.leaderDot} />
        ))}
      </svg>

      {labels.map((l) => (
        <span
          key={`lab-${l.key}`}
          className={styles.callout}
          data-pos={l.pos}
          style={{ left: `${l.left}%`, top: `${l.top}%` }}
        >
          {l.sub && <em className={styles.calloutSub}>{l.sub}</em>}
          {l.text}
        </span>
      ))}
    </div>
  );
}
