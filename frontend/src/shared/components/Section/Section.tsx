import styles from "./Section.module.css";

import type { SectionProps } from "./Section.types";

function Section({ children, id }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      {children}
    </section>
  );
}

export default Section;