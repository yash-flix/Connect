import type { CSSProperties, ReactNode } from "react";
import styles from "./frames.module.css";

export { RectField, type RectFieldProps } from "./RectField";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ------------------------------------------------------------------------ */
/* Frame: outline rectangle + corner crop marks, optional mono captions.    */
/* ------------------------------------------------------------------------ */

export type FrameProps = {
  children?: ReactNode;
  /** Mono label knocked into the top edge, e.g. "Fig. 1 — Booking flow". */
  caption?: ReactNode;
  /** Mono label knocked into the bottom-right edge, e.g. "Scale 1:1". */
  note?: ReactNode;
  /** Draw the inner hairline outline. Default true. */
  outline?: boolean;
  /** Draw the four corner crop marks. Default true. */
  marks?: boolean;
  /** "moss" tints the marks + outline with the accent. Default "ink". */
  tone?: "ink" | "moss";
  /** Inner padding around children. Default "md". */
  pad?: "none" | "sm" | "md" | "lg";
  /** Scroll-driven draw-in (CSS view timeline; static where unsupported). */
  animate?: boolean;
  /**
   * Colour behind the caption knock-out. Set to match the section background
   * when the frame sits on --paper-2 or --card. Default var(--paper).
   */
  background?: string;
  as?: "div" | "figure" | "section" | "aside";
  className?: string;
  style?: CSSProperties;
};

export function Frame({
  children,
  caption,
  note,
  outline = true,
  marks = true,
  tone = "ink",
  pad = "md",
  animate = false,
  background,
  as: Tag = "div",
  className,
  style,
}: FrameProps) {
  const isFigure = Tag === "figure";
  const CaptionTag = isFigure ? "figcaption" : "span";
  return (
    <Tag
      className={cx(styles.frame, className)}
      data-tone={tone}
      data-pad={pad}
      data-animate={animate || undefined}
      style={{ ...(background ? { "--frame-bg": background } : null), ...style } as CSSProperties}
    >
      {outline && <span aria-hidden="true" className={styles.outline} />}
      {marks && (
        <>
          <span aria-hidden="true" className={styles.mark} data-c="tl" />
          <span aria-hidden="true" className={styles.mark} data-c="tr" />
          <span aria-hidden="true" className={styles.mark} data-c="bl" />
          <span aria-hidden="true" className={styles.mark} data-c="br" />
        </>
      )}
      {caption && <CaptionTag className={cx(styles.mono, styles.caption)}>{caption}</CaptionTag>}
      {note && (
        <span aria-hidden="true" className={cx(styles.mono, styles.note)}>
          {note}
        </span>
      )}
      <div className={styles.frameBody}>{children}</div>
    </Tag>
  );
}

/* ------------------------------------------------------------------------ */
/* RectStack: a front sheet with offset hairline sheets behind it.          */
/* ------------------------------------------------------------------------ */

export type RectStackProps = {
  /** Content for the front sheet. Omit for a purely decorative block. */
  children?: ReactNode;
  /** Total sheets including the front one (2–6). Default 3. */
  layers?: number;
  /** Offset between sheets in px. Default 10. */
  step?: number;
  /** Direction the back sheets travel. Default "se". */
  direction?: "se" | "ne" | "sw" | "nw";
  /** Aspect ratio for the sheets, e.g. "4 / 3". Omit to size to children. */
  ratio?: string;
  /** "sheets" = opaque paper (occluding); "wire" = outlines only. */
  fill?: "sheets" | "wire";
  /** Where the moss accent goes. Default "none". */
  accent?: "none" | "front" | "back";
  /** Corner radius in px (0–6). Default 4. */
  radius?: number;
  /** Fan the back sheets out on scroll (CSS view timeline). */
  animate?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Class for the front sheet, for padding/layout of children. */
  frontClassName?: string;
};

export function RectStack({
  children,
  layers = 3,
  step = 10,
  direction = "se",
  ratio,
  fill = "sheets",
  accent = "none",
  radius = 4,
  animate = false,
  className,
  style,
  frontClassName,
}: RectStackProps) {
  const n = Math.min(6, Math.max(2, Math.round(layers)));
  const backs = Array.from({ length: n - 1 }, (_, i) => n - 1 - i); // farthest first
  const decorative = children == null;
  return (
    <div
      className={cx(styles.stack, className)}
      data-dir={direction}
      data-fill={fill}
      data-accent={accent}
      data-animate={animate || undefined}
      aria-hidden={decorative || undefined}
      style={
        {
          "--stack-layers": n,
          "--stack-step": `${step}px`,
          "--stack-radius": `${Math.min(6, Math.max(0, radius))}px`,
          ...(ratio ? { "--stack-ratio": ratio } : null),
          ...style,
        } as CSSProperties
      }
    >
      <div className={styles.stackInner} data-ratio={ratio ? "" : undefined}>
        {backs.map((k) => (
          <span
            key={k}
            aria-hidden="true"
            className={styles.sheet}
            data-last={k === n - 1 || undefined}
            style={{ "--k": k } as CSSProperties}
          />
        ))}
        <div className={cx(styles.front, frontClassName)}>{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Panel: a window-like rectangle with a hairline title bar.                */
/* ------------------------------------------------------------------------ */

export type PanelProps = {
  children?: ReactNode;
  /** Mono title in the bar, e.g. "booking.agent". */
  title: ReactNode;
  /** Mono status on the right of the bar, e.g. "idle" / "planned". */
  meta?: ReactNode;
  /** "moss" marks the panel as active/selected. */
  tone?: "ink" | "moss";
  className?: string;
  bodyClassName?: string;
  style?: CSSProperties;
};

export function Panel({ children, title, meta, tone = "ink", className, bodyClassName, style }: PanelProps) {
  return (
    <div className={cx(styles.panel, className)} data-tone={tone} style={style}>
      <div className={styles.panelBar}>
        <span aria-hidden="true" className={styles.panelKeys}>
          <span />
          <span />
          <span />
        </span>
        <span className={cx(styles.mono, styles.panelTitle)}>{title}</span>
        {meta && <span className={cx(styles.mono, styles.panelMeta)}>{meta}</span>}
      </div>
      <div className={cx(styles.panelBody, bodyClassName)}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Divider: section rule drawn like a drafting scale.                       */
/* ------------------------------------------------------------------------ */

export type DividerProps = {
  /** Section number shown in moss, e.g. "02". */
  index?: string;
  /** Mono section label, e.g. "The agents". */
  label?: string;
  /** Show scale tick marks along the rule. Default true. */
  ticks?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Divider({ index, label, ticks = true, className, style }: DividerProps) {
  const hasText = Boolean(index || label);
  return (
    <div
      className={cx(styles.divider, className)}
      data-ticks={ticks ? undefined : "false"}
      role="separator"
      aria-label={hasText ? [index, label].filter(Boolean).join(" ") : undefined}
      style={style}
    >
      {hasText && (
        <span aria-hidden="true" className={cx(styles.mono, styles.dividerText)}>
          {index && <span className={styles.dividerIndex}>{index}</span>}
          {label && <span className={styles.dividerLabel}>{label}</span>}
        </span>
      )}
      <span aria-hidden="true" className={styles.scale} />
    </div>
  );
}
