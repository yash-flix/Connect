import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n";
import { Glyph, type GlyphId } from "./iso";
import site from "./site.module.css";
import styles from "./packages.module.css";

type Card = { title: string; sub: string; icon: GlyphId; growth?: boolean };

/** Icons and Growth-only flags for each stage; the words come from the dictionary. */
const shape = {
  customer: [
    { icon: "whatsapp", growth: false },
    { icon: "proposal", growth: true },
  ],
  connect: [
    { icon: "whatsapp", growth: false },
    { icon: "voice", growth: true },
  ],
  you: [
    { icon: "booking", growth: false },
    { icon: "handoff", growth: false },
    { icon: "content", growth: false },
  ],
} as const;

const cards = (
  items: { title: string; sub: string }[],
  s: readonly { icon: GlyphId; growth: boolean }[],
): Card[] => items.map((it, i) => ({ ...it, ...s[i] }));

function Stage({
  n,
  label,
  items,
  badge,
  tone,
  children,
}: {
  n: number;
  label: string;
  items: Card[];
  badge: string;
  tone?: "accent";
  children?: ReactNode;
}) {
  return (
    <div className={styles.stage} data-tone={tone}>
      <div className={styles.stageHead}>
        <span className={styles.stageNo}>{n}</span>
        <span className={styles.stageLabel}>{label}</span>
      </div>
      <ul className={styles.cards}>
        {items.map((c) => (
          <li key={c.title} className={styles.card}>
            <span className={styles.cardIcon}>
              <svg viewBox="0 0 10 10">
                <Glyph id={c.icon} />
              </svg>
            </span>
            <span className={styles.cardText}>
              <span className={styles.cardTitle}>{c.title}</span>
              <span className={styles.cardSub}>{c.sub}</span>
            </span>
            {c.growth && <span className={styles.badge}>{badge}</span>}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

/** Fig. 1 on /packages: what happens, told as customer → Connect's agents → you. */
export function ArchitectureFigure({ t }: { t: Dictionary["arch"] }) {
  return (
    <figure className={site.sheet}>
      <span className={site.crosshairs} aria-hidden="true" />
      <div className={site.sheetHead}>
        <span className={site.code}>{t.fig}</span>
        <span className={site.code}>{t.meta}</span>
      </div>

      <div className={styles.journey} role="img" aria-label={t.aria}>
        <div className={styles.journeyInner} aria-hidden="true">
          <Stage n={1} label={t.customer.label} items={cards(t.customer.items, shape.customer)} badge={t.growth} />
          <span className={styles.arrow}>→</span>
          <Stage
            n={2}
            label={t.connect.label}
            items={cards(t.connect.items, shape.connect)}
            badge={t.growth}
            tone="accent"
          >
            <ul className={styles.promises}>
              {t.connect.promises.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Stage>
          <span className={styles.arrow}>→</span>
          <Stage n={3} label={t.you.label} items={cards(t.you.items, shape.you)} badge={t.growth} />
        </div>
      </div>

      <figcaption className={site.sheetFoot}>
        <span className={styles.legend}>
          <span className={styles.badge}>{t.growth}</span>
          {t.growthNote}
        </span>
      </figcaption>
    </figure>
  );
}
