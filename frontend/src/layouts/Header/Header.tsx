import { Button } from "../../shared/components/Button";
import styles from "./Header.module.css";
import logoHeader from "../../assets/images/logo-header.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img
              className={styles.logo}
              src={logoHeader}
              alt="Logo ORTA Solutions Numériques"
              draggable={false}
            />
          </div>

          <div className={styles.identity}>
            <p className={styles.name}>Thomas ORTA</p>
            <p className={styles.role}>
              Développeur <span>Web & Mobile</span>
            </p>
            <a className={styles.phone} href="tel:+33612149255">
              06 12 14 92 55
            </a>
          </div>

          <nav className={styles.navigation} aria-label="Navigation principale">
            <a className={styles.activeLink} href="/" aria-current="page">
              Accueil
            </a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
            <a href="/admin">Admin</a>
          </nav>

          <div className={styles.actions}>
            <Button className={styles.contactButton} variant="ghost" size="medium">
              Me contacter
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
