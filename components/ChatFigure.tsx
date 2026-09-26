import { Glyph } from "./iso";
import styles from "./site.module.css";

type Bubble = { from: "them" | "us"; time: string; text: string };

const thread: Bubble[] = [
  { from: "them", time: "9:40 pm", text: "Hi, are you open Saturday? How much is a first visit?" },
  {
    from: "us",
    time: "9:40 pm",
    text: "Hi Priya! Yes, 9:00–13:00. A first visit is 45 min. Saturday 10:00 or 11:30 are free. Shall I book one?",
  },
  { from: "them", time: "9:41 pm", text: "10:00 please" },
  { from: "us", time: "9:41 pm", text: "Done. You’re booked for Sat 10:00. I’ll send a reminder on Friday." },
];

const outcomes = [
  ["Answered", "Replied in seconds with your hours and prices, while you were off the clock."],
  ["Booked", "Picked a free slot from your calendar and confirmed it."],
  ["Reminded", "A reminder goes out the day before, so the visit actually happens."],
];

const slots = ["9:00", "10:00", "11:30", "12:15"];

/** Fig. 1: one late-night message, handled end to end. */
export function ChatFigure() {
  return (
    <figure className={styles.sheet}>
      <span className={styles.crosshairs} aria-hidden="true" />
      <div className={styles.sheetHead}>
        <span className={styles.code}>Fig. 1 · A 9:40 pm message, handled</span>
        <span className={styles.code}>You were off the clock</span>
      </div>

      <div className={styles.chatFig}>
        <div className={styles.phone} role="img" aria-label="A customer asks on WhatsApp at 9:40 pm if the business is open Saturday. Connect replies with hours, price and two free slots, the customer picks 10:00, and Connect confirms the booking and schedules a reminder.">
          <div className={styles.phoneBar} aria-hidden="true">
            <svg viewBox="0 0 10 10">
              <Glyph id="whatsapp" />
            </svg>
            <span>WhatsApp · Your business</span>
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
            <span className={styles.code}>Sat</span>
            {slots.map((s) => (
              <span key={s} className={styles.slot} data-booked={s === "10:00" || undefined}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <ol className={styles.outcomes}>
          {outcomes.map(([title, body], i) => (
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
        <span>No missed message, no back-and-forth, no forgotten booking. That’s the whole idea.</span>
        <span className={styles.sheetMeta}>
          <span className={styles.code}>Illustration · product in development</span>
        </span>
      </figcaption>
    </figure>
  );
}
