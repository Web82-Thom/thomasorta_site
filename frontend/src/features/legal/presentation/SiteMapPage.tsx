import { Link } from "react-router-dom";

import { LegalSection } from "./components/LegalSection";

export function SiteMapPage() {
  return (
    <LegalSection title="Plan du site">
      <p>
        Cette page regroupe l'ensemble des pages et sections principales de
        ThomasOrta.fr afin de faciliter la navigation des visiteurs ainsi que
        le référencement du site.
      </p>

      <h2>Navigation principale</h2>

      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>

        <li>
          <Link to="/#services">Services</Link>
        </li>

        <li>
          <Link to="/#portfolio">Réalisations</Link>
        </li>

        <li>
          <Link to="/#contact">Contact</Link>
        </li>
      </ul>

      <h2>Informations légales</h2>

      <ul>
        <li>
          <Link to="/mentions-legales">
            Mentions légales
          </Link>
        </li>

        <li>
          <Link to="/politique-confidentialite">
            Politique de confidentialité
          </Link>
        </li>

        <li>
          <Link to="/conditions-utilisation">
            Conditions d'utilisation
          </Link>
        </li>

        <li>
          <Link to="/plan-du-site">
            Plan du site
          </Link>
        </li>
      </ul>

      <h2>Services proposés</h2>

      <ul>
        <li>Création de sites vitrines</li>
        <li>Développement d'applications Web</li>
        <li>Développement d'applications Flutter</li>
        <li>Applications métier sur mesure</li>
        <li>Maintenance et évolution de projets</li>
        <li>Accompagnement technique</li>
      </ul>

      <h2>Réalisations</h2>

      <ul>
        <li>DepanFlow</li>
        <li>NociBlacK</li>
        <li>Cleaning Schedule</li>
        <li>ThomasOrta.fr</li>
      </ul>

      <h2>Contact</h2>

      <p>
        Pour toute demande d'information ou de devis, utilisez le formulaire de
        contact disponible sur la page d'accueil ou écrivez directement à :
      </p>

      <p>
        <strong>thomasorta.forweb@gmail.com</strong>
      </p>

      <p>
        Dernière mise à jour : juillet 2026.
      </p>
    </LegalSection>
  );
}