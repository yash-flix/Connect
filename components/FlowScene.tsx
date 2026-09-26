import { COS30, project } from "@/lib/iso";
import { Glyph, IsoBox } from "./iso";
import styles from "./iso.module.css";
import site from "./site.module.css";

type Step = { n: string; title: string; body: string };

// Four stations: inquiry → Connect → calendar → follow-up. Each is centred on
// the world diagonal (t, -t), which projects to one horizontal screen line, so
// the stations read left to right in a level row, each one directly above
// its step's explanation.
const STEP = 20; // world distance between station centres along t
const SPACING = 2 * STEP * COS30; // the same distance on screen
const stations = [
  { n: "01", s: 10, h: 5 },
  { n: "02", s: 16, h: 2 },
  { n: "03", s: 12, h: 3 },
  { n: "04", s: 10, h: 8 },
].map((st, i) => {
  const t = i * STEP;
  return { ...st, x: t - st.s / 2, y: -t - st.s / 2, cx: t, cy: -t };
});

const TOP = 15; // headroom above the lane for the tallest block
const BOTTOM = 10;

export function FlowScene({ steps }: { steps: Step[] }) {
  const vb = {
    x: project([stations[0].cx, stations[0].cy, 0])[0] - SPACING / 2,
    y: -TOP,
    w: SPACING * stations.length,
    h: TOP + BOTTOM,
  };

  const ends = [stations[0], stations[stations.length - 1]].map((s) => project([s.cx, s.cy, 0]));
  const lane = `M${ends[0][0].toFixed(2)} ${ends[0][1].toFixed(2)} L${ends[1][0].toFixed(2)} ${ends[1][1].toFixed(2)}`;

  const [inq, hub, cal, fol] = stations;
  const hubMods = [
    [2, 2, 5],
    [9, 2, 7],
    [2, 9, 4],
    [9, 9, 6],
  ];

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
        <IsoBox x={inq.x} y={inq.y} z={0} w={inq.s} d={inq.s} h={inq.h}>
          <Glyph id="whatsapp" />
        </IsoBox>

        {/* 02 Connect: a plate with modules */}
        <IsoBox x={hub.x} y={hub.y} z={0} w={hub.s} d={hub.s} h={hub.h} tone="plate" />
        {hubMods
          .sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
          .map(([dx, dy, h]) => (
            <IsoBox
              key={`${dx}-${dy}`}
              x={hub.x + dx}
              y={hub.y + dy}
              z={hub.h}
              w={5}
              d={5}
              h={h}
              tone="moss"
            />
          ))}

        {/* 03 Calendar: a slab with a grid and one booked slot */}
        <IsoBox x={cal.x} y={cal.y} z={0} w={cal.s} d={cal.s} h={cal.h}>
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
        <IsoBox x={cal.x + 4.7} y={cal.y + 4.7} z={cal.h} w={2.6} d={2.6} h={2.4} tone="moss" />

        {/* 04 Follow-up: a tall block with a loop */}
        <IsoBox x={fol.x} y={fol.y} z={0} w={fol.s} d={fol.s} h={fol.h}>
          <Glyph id="followup" />
        </IsoBox>

        {/* Moving lead */}
        <circle r="1.1" className={styles.packet}>
          <animateMotion dur="6s" repeatCount="indefinite" path={lane} keyPoints="0;0.33;0.33;0.67;0.67;1" keyTimes="0;0.25;0.4;0.65;0.8;1" calcMode="linear" />
        </circle>
      </svg>

      <ol className={site.flowSteps}>
        {steps.map((st) => (
          <li key={st.n}>
            <span className={site.stepNum}>{st.n}</span>
            <div>
              <h3 className={site.h3}>{st.title}</h3>
              <p className={site.muted}>{st.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
