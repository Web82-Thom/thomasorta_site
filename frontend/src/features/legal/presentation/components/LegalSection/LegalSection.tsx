import styles from "./LegalSection.module.css";
import type { LegalSectionProps } from "./LegalSection.types";

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>{children}</div>
    </section>
  );
}