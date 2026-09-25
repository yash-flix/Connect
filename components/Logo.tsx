import styles from "./site.module.css";

export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="9" height="9" rx="1" fill="currentColor" />
      <rect
        x="14"
        y="14"
        width="9"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10 5.5h8.5V14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className={styles.logo}>
      <LogoMark />
      <span>Connect</span>
    </span>
  );
}
