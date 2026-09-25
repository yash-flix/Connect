import { Mark } from "./iso";
import styles from "./site.module.css";

export function Logo() {
  return (
    <span className={styles.logo}>
      <Mark size={24} />
      <span>Connect</span>
    </span>
  );
}
