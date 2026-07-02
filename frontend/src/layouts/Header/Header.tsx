import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "../../shared/components/Button";
import styles from "./Header.module.css";
import logoHeader from "../../assets/images/logo-header.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { hash, pathname } = useLocation();
  const isHomeActive = pathname === "/" && hash === "";
  const isServicesActive = pathname === "/" && hash === "#services";
  const isPortfolioActive = pathname === "/" && hash === "#portfolio";
  const isContactActive = pathname === "/" && hash === "#contact";
  const isAboutActive = pathname === "/a-propos";

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div
          className={`${styles.content} ${isMenuOpen ? styles.menuOpen : ""}`}
        >
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

          <button
            className={styles.menuToggle}
            type="button"
            aria-controls="main-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <nav
            id="main-navigation"
            className={styles.navigation}
            aria-label="Navigation principale"
          >
            <Link
              className={isHomeActive ? styles.activeLink : undefined}
              to="/"
              aria-current={isHomeActive ? "page" : undefined}
              onClick={closeMenu}
            >
              Accueil
            </Link>
            <Link
              className={isServicesActive ? styles.activeLink : undefined}
              to="/#services"
              aria-current={isServicesActive ? "page" : undefined}
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link
              className={isPortfolioActive ? styles.activeLink : undefined}
              to="/#portfolio"
              aria-current={isPortfolioActive ? "page" : undefined}
              onClick={closeMenu}
            >
              Réalisations
            </Link>
            <Link
              className={isContactActive ? styles.activeLink : undefined}
              to="/#contact"
              aria-current={isContactActive ? "page" : undefined}
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link
              className={isAboutActive ? styles.activeLink : undefined}
              to="/a-propos"
              aria-current={isAboutActive ? "page" : undefined}
              onClick={closeMenu}
            >
              À propos
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link
              className={styles.contactLink}
              to="/#contact"
              onClick={closeMenu}
            >
              <Button
                className={styles.contactButton}
                variant="ghost"
                size="medium"
              >
                Me contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
