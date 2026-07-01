import { Link, useLocation } from "react-router-dom";

import { Button } from "../../shared/components/Button";
import styles from "./Header.module.css";
import logoHeader from "../../assets/images/logo-header.svg";

export default function Header() {
  const { hash, pathname } = useLocation();
  const isHomeActive = pathname === "/" && hash === "";
  const isServicesActive = pathname === "/" && hash === "#services";
  const isPortfolioActive = pathname === "/" && hash === "#portfolio";
  const isContactActive = pathname === "/" && hash === "#contact";
  const isAboutActive = pathname === "/a-propos";

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

          <div className={styles.actions}>
            <Link className={styles.contactLink} to="/#contact">
              <Button className={styles.contactButton} variant="ghost" size="medium">
                Me contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
