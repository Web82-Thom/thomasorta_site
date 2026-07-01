import logo from "../../assets/images/logo-header.svg";
import styles from "./Footer.module.css";
import type { FooterProps } from "./Footer.types";

const currentYear = new Date().getFullYear();

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`${styles.footer} ${className ?? ""}`}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src={logo} alt="Logo Thomas ORTA" />

          <div>
            <strong>Thomas ORTA</strong>
            <span>Développeur Web & Mobile</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Navigation pied de page">
          <a href="#top">Accueil</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Réalisations</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className={styles.contact}>
          <span>Léojac, Montauban, Tarn-et-Garonne</span>
          <span>Tel: 06.12.14.92.55</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {currentYear} Thomas ORTA. Tous droits réservés.</span>

        <div className={styles.legalLinks}>
          <a href="/mentions-legales">Mentions légales</a>
          <a href="/politique-confidentialite">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
}