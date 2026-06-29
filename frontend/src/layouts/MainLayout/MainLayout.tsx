import { Header } from "../Header";
import styles from "./MainLayout.module.css";
import type { MainLayoutProps } from "./MainLayout.types";

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer} />
    </div>
  );
}