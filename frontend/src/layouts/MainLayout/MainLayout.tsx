import styles from "./MainLayout.module.css";
import type { MainLayoutProps } from "./MainLayout.types";

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header} />

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer} />
    </div>
  );
}