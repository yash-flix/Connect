"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./frames.module.css";

export type RectFieldProps = {
  /** Columns in the grid. Default 8. */
  cols?: number;
  /** Rows in the grid. Default 3. */
  rows?: number;
  /** Gap between cells in px. Default 8. */
  gap?: number;
  /** Cell aspect ratio as a CSS value, e.g. "1" or "3 / 2". Default "1". */
  ratio?: string;
  /** Cell indices (row-major, 0-based) drawn with a paper-2 fill. */
  filled?: number[];
  /** Cell indices drawn in the moss accent. Use sparingly (1–2 cells). */
  accent?: number[];
  /** Cell indices drawn dashed, as "not yet built" placeholders. */
  ghost?: number[];
  /** Per-cell stagger in ms for the draw-in. Default 28. */
  stagger?: number;
  className?: string;
  style?: CSSProperties;
};

type State = "static" | "armed" | "in";

/**
 * A grid of hairline rectangles that draws itself in when scrolled into view.
 *
 * Server-renders fully drawn (no-JS and reduced-motion users see the final
 * state). On mount, if the field is still below the fold it is "armed"
 * (hidden) and revealed once by an IntersectionObserver.
 */
export function RectField({
  cols = 8,
  rows = 3,
  gap = 8,
  ratio = "1",
  filled = [],
  accent = [],
  ghost = [],
  stagger = 28,
  className,
  style,
}: RectFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen at mount: leave it drawn, don't flash it away.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setState("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const total = Math.max(1, cols) * Math.max(1, rows);
  const fillSet = new Set(filled);
  const accentSet = new Set(accent);
  const ghostSet = new Set(ghost);

  const vars = {
    "--field-cols": Math.max(1, cols),
    "--field-gap": `${gap}px`,
    "--field-ratio": ratio,
    "--field-stagger": `${stagger}ms`,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={[styles.field, className].filter(Boolean).join(" ")}
      data-state={state}
      style={vars}
    >
      {Array.from({ length: total }, (_, i) => {
        const kind = accentSet.has(i)
          ? "accent"
          : fillSet.has(i)
            ? "fill"
            : ghostSet.has(i)
              ? "ghost"
              : undefined;
        // Stagger diagonally (row + col) so the field sweeps from top-left.
        const order = Math.floor(i / cols) + (i % cols);
        return (
          <span
            key={i}
            className={styles.cell}
            data-kind={kind}
            style={{ "--i": order } as CSSProperties}
          />
        );
      })}
    </div>
  );
}
