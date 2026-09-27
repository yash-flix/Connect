import type { Dictionary } from "@/lib/i18n";
import { Glyph } from "./iso";
import styles from "./site.module.css";

/** Who sent each message in the thread; the words come from the dictionary. */
const senders = ["them", "us", "them", "us"] as const;

const slots = ["9:00", "10:00", "11:30", "12:15"];

/** Fig. 1: one late-night message, handled end to end. */
export function ChatFigure({ t }: { t: Dictionary["chat"] }) {
  const thread = t.thread.map((b, i) => ({ ...b, from: senders[i] }));
  return (
    <figure className={styles.sheet}>
      <span className={styles.crosshairs} aria-hidden="true" />
      <div className={styles.sheetHead}>
        <span className={styles.code}>{t.fig}</span>
        <span className={styles.code}>{t.offClock}</span>
      </div>

      <div className={styles.chatFig}>
        <div className={styles.phone} role="img" aria-label={t.aria}>
          <div className={styles.phoneBar} aria-hidden="true">
            <svg viewBox="0 0 10 10">
              <Glyph id="whatsapp" />
            </svg>
            <span>{t.phoneBar}</span>
          </div>
          <ol className={styles.thread} aria-hidden="true">
            {thread.map((b, i) => (
              <li
                key={i}
                className={`${styles.bubble} ${styles.rise}`}
                data-from={b.from}
                style={{ animationDelay: `${0.5 + i * 0.55}s` }}
              >
                {b.from === "us" && <span className={styles.bubbleWho}>Connect</span>}
                {b.text}
                <span className={styles.bubbleTime}>{b.time}</span>
              </li>
            ))}
          </ol>
          <div
            className={`${styles.calRow} ${styles.rise}`}
            style={{ animationDelay: `${0.5 + thread.length * 0.55}s` }}
            aria-hidden="true"
          >
            <span className={styles.code}>{t.day}</span>
            {slots.map((s) => (
              <span key={s} className={styles.slot} data-booked={s === "10:00" || undefined}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <ol className={styles.outcomes}>
          {t.outcomes.map(({ title, body }, i) => (
            <li key={title}>
              <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={styles.h3}>{title}</h3>
                <p className={styles.muted}>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className={styles.sheetFoot}>
        <span>{t.foot}</span>
        <span className={styles.sheetMeta}>
          <span className={styles.code}>{t.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}
