import { Link } from "react-router-dom";

import styles from "./LegalSection.module.css";
import type { LegalSectionProps } from "./LegalSection.types";

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className={styles.section}>
      <Link className={styles.backLink} to="/">
        Retour
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
