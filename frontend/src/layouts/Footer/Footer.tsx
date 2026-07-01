import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo-header.svg";
import styles from "./Footer.module.css";
import type { FooterProps } from "./Footer.types";

const currentYear = new Date().getFullYear();

export function Footer({ className }: FooterProps) {
  const { hash, pathname } = useLocation();
  const isHomeActive = pathname === "/" && hash === "";
  const isServicesActive = pathname === "/" && hash === "#services";
  const isPortfolioActive = pathname === "/" && hash === "#portfolio";
  const isContactActive = pathname === "/" && hash === "#contact";
  const isAboutActive = pathname === "/a-propos";

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
          <Link
            className={isHomeActive ? styles.activeLink : undefined}
            to="/"
            aria-current={isHomeActive ? "page" : undefined}
          >
            Accueil
          </Link>
          <Link
            className={isServicesActive ? styles.activeLink : undefined}
            to="/#services"
            aria-current={isServicesActive ? "page" : undefined}
          >
            Services
          </Link>
          <Link
            className={isPortfolioActive ? styles.activeLink : undefined}
            to="/#portfolio"
            aria-current={isPortfolioActive ? "page" : undefined}
          >
            Réalisations
          </Link>
          <Link
            className={isContactActive ? styles.activeLink : undefined}
            to="/#contact"
            aria-current={isContactActive ? "page" : undefined}
          >
            Contact
          </Link>
          <Link
            className={isAboutActive ? styles.activeLink : undefined}
            to="/a-propos"
            aria-current={isAboutActive ? "page" : undefined}
          >
            À propos
          </Link>
        </nav>

        <div className={styles.contact}>
          <span>Léojac, Montauban, Tarn-et-Garonne</span>
          <span>Tel: 06.12.14.92.55</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {currentYear} Thomas ORTA. Tous droits réservés.</span>

        <div className={styles.legalLinks}>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/politique-confidentialite">
            Politique de confidentialité
          </Link>
          <Link to="/conditions-utilisation">Conditions d'utilisation</Link>
          <Link to="/plan-du-site">Plan du site</Link>
        </div>
      </div>
    </footer>
  );
}
