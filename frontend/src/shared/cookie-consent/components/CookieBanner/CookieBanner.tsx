import { useCookieConsent } from "../../hooks/useCookieConsent";

import styles from "./CookieBanner.module.css";

export function CookieBanner() {
  const { status, accept, refuse } = useCookieConsent();

  if (status !== "unknown") {
    return null;
  }

  return (
    <aside className={styles.banner} aria-label="Préférences des cookies">
      <div className={styles.content}>
        <div className={styles.textContent}>
          <p className={styles.title}>Gestion des cookies</p>

          <p className={styles.description}>
            Ce site utilise des cookies nécessaires à son fonctionnement. Avec
            votre accord, des cookies de mesure d'audience pourront être ajoutés
            pour améliorer l'expérience utilisateur.
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={refuse}
          >
            Refuser
          </button>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={accept}
          >
            Accepter
          </button>
        </div>
      </div>
    </aside>
  );
}