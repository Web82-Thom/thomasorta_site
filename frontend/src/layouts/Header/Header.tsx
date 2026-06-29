import Container from "../../shared/components/Container";
import styles from "./Header.module.css";
import type { HeaderProps } from "./Header.types";

export default function Header({}: HeaderProps) {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <div className={styles.logo}>ThomasOrta.fr</div>

          <nav className={styles.navigation}>
            {/* Navigation à venir */}
          </nav>

          <div className={styles.actions}>
            {/* Bouton Contact à venir */}
          </div>
        </div>
      </Container>
    </header>
  );
}