import { bounds, project, type Vec3 } from "@/lib/iso";
import { Glyph, IsoBox } from "./iso";
import styles from "./iso.module.css";

// Four stations along the x axis: inquiry → Connect → calendar → follow-up.
const Y = 0;
const stations = [
  { n: "01", x: 0, w: 9, d: 9, h: 5 },
  { n: "02", x: 26, w: 18, d: 14, h: 2 },
  { n: "03", x: 60, w: 12, d: 12, h: 3 },
  { n: "04", x: 88, w: 9, d: 9, h: 8 },
];

const LANE_Y = 5.5;

export function FlowScene() {
  const extents: Vec3[] = stations.flatMap((s) => [
    [s.x, Y, s.h + 5] as Vec3,
    [s.x + s.w, Y, 0] as Vec3,
    [s.x, Y + s.d, 0] as Vec3,
    [s.x + s.w, Y + s.d, 0] as Vec3,
  ]);
  const b = bounds(extents, 3);
  const lead = 8;
  const vb = { x: b.minX, y: b.minY - lead, w: b.w, h: b.h + lead };

  const [p0x, p0y] = project([4.5, LANE_Y, 0]);
  const [p1x, p1y] = project([92.5, LANE_Y, 0]);
  const lane = `M${p0x.toFixed(2)} ${p0y.toFixed(2)} L${p1x.toFixed(2)} ${p1y.toFixed(2)}`;

  const markers = stations.map((s) => {
    const [x, y] = project([s.x + s.w / 2, Y + s.d / 2, s.h + (s.n === "02" ? 6 : 1)]);
    return {
      n: s.n,
      left: ((x - vb.x) / vb.w) * 100,
      top: ((y - 4 - vb.y) / vb.h) * 100,
    };
  });

  const [inq, hub, cal, fol] = stations;

  return (
    <div className={styles.flowWrap}>
      <svg
        className={styles.svg}
        viewBox={`${vb.x.toFixed(2)} ${vb.y.toFixed(2)} ${vb.w.toFixed(2)} ${vb.h.toFixed(2)}`}
        role="img"
        aria-label="A lead moves from an inquiry, through Connect, to a booked appointment and a follow-up."
      >
        {/* Ground lane */}
        <path d={lane} className={styles.path} />

        {/* 01 Inquiry: a message block */}
        <IsoBox x={inq.x} y={Y} z={0} w={inq.w} d={inq.d} h={inq.h}>
          <g transform="scale(0.9)">
            <Glyph id="whatsapp" />
          </g>
        </IsoBox>

        {/* 02 Connect: a plate with modules */}
        <IsoBox x={hub.x} y={Y} z={0} w={hub.w} d={hub.d} h={hub.h} tone="plate" />
        {[
          [hub.x + 2, 2, 5],
          [hub.x + 10, 2, 7],
          [hub.x + 2, 8, 4],
          [hub.x + 10, 8, 6],
        ]
          .sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
          .map(([x, y, h]) => (
            <IsoBox key={`${x}-${y}`} x={x} y={y} z={hub.h} w={6} d={4.5} h={h} tone="moss" />
          ))}

        {/* 03 Calendar: a slab with a grid and one booked slot */}
        <IsoBox x={cal.x} y={Y} z={0} w={cal.w} d={cal.d} h={cal.h}>
          <g>
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <rect
                  key={`${r}${c}`}
                  x={1.6 + c * 3.1}
                  y={1.6 + r * 3.1}
                  width="2.6"
                  height="2.6"
                  rx="0.2"
                />
              )),
            )}
          </g>
        </IsoBox>
        <IsoBox x={cal.x + 4.7} y={Y + 4.7} z={cal.h} w={2.6} d={2.6} h={2.4} tone="moss" />

        {/* 04 Follow-up: a tall block with a loop */}
        <IsoBox x={fol.x} y={Y} z={0} w={fol.w} d={fol.d} h={fol.h}>
          <g transform="scale(0.9)">
            <Glyph id="followup" />
          </g>
        </IsoBox>

        {/* Moving lead */}
        <circle r="1.1" className={styles.packet}>
          <animateMotion dur="6s" repeatCount="indefinite" path={lane} keyPoints="0;0.3;0.3;0.66;0.66;1" keyTimes="0;0.25;0.4;0.65;0.8;1" calcMode="linear" />
        </circle>
      </svg>

      {markers.map((m) => (
        <span
          key={m.n}
          className={styles.step}
          style={{ left: `${m.left}%`, top: `${m.top}%` }}
          aria-hidden="true"
        >
          <b>{m.n}</b>
        </span>
      ))}
    </div>
  );
}
