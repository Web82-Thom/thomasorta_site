import { MainLayout } from "../../../layouts/MainLayout";
import { LegalSection } from "./components/LegalSection";

export function LegalNoticePage() {
  return (
    <MainLayout>
      <LegalSection title="Mentions légales">
      <h2>Éditeur du site</h2>

      <p>
        <strong>Thomas ORTA</strong>
        <br />
        Micro-entrepreneur
        <br />
        Développeur Web & Mobile
      </p>

      <p>
        3150 Route de Génébrières
        <br />
        82230 Léojac
        <br />
        France
      </p>

      <ul>
        <li>SIRET : 888 067 550 00028</li>
        <li>Code APE : 6201Z - Programmation informatique</li>
        <li>Email : thomasorta.forweb@gmail.com</li>
        <li>Téléphone : 06 12 14 92 55</li>
      </ul>

      <h2>Directeur de la publication</h2>

      <p>
        Le directeur de la publication est Thomas ORTA, en qualité d'éditeur du
        site.
      </p>

      <h2>Hébergement</h2>

      <p>
        Le site est hébergé par :
      </p>

      <p>
        <strong>IONOS SARL</strong>
        <br />
        7 Place de la Gare
        <br />
        BP 70109
        <br />
        57200 Sarreguemines
        <br />
        France
      </p>

      <p>
        Téléphone : 09 70 80 89 11
        <br />
        Site web :
        {" "}
        <a
          href="https://www.ionos.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.ionos.fr
        </a>
      </p>

      <h2>Propriété intellectuelle</h2>

      <p>
        L'ensemble des contenus présents sur ce site (textes, illustrations,
        photographies, logo, éléments graphiques, réalisations, code source et
        plus généralement tous les éléments composant le site) est protégé par
        le Code de la propriété intellectuelle.
      </p>

      <p>
        Toute reproduction, représentation, diffusion, modification ou
        exploitation, totale ou partielle, sans autorisation écrite préalable,
        est interdite.
      </p>

      <h2>Responsabilité</h2>

      <p>
        Les informations publiées sur ce site sont fournies à titre indicatif.
        Malgré le soin apporté à leur rédaction, elles peuvent être modifiées à
        tout moment sans préavis.
      </p>

      <p>
        L'éditeur ne saurait être tenu responsable des dommages directs ou
        indirects résultant de l'utilisation du site ou de l'impossibilité
        temporaire d'y accéder.
      </p>

      <h2>Liens externes</h2>

      <p>
        Ce site peut contenir des liens vers des sites tiers. Thomas ORTA ne
        peut être tenu responsable du contenu, de la disponibilité ou des
        pratiques de ces sites externes.
      </p>

      <h2>Technologies utilisées</h2>

      <p>
        Ce site est développé avec React, TypeScript et Symfony. Certaines
        fonctionnalités, comme le formulaire de contact ou les informations
        météorologiques, reposent sur des services applicatifs dédiés.
      </p>

      <h2>Contact</h2>

      <p>
        Pour toute question concernant le site ou son contenu, vous pouvez
        contacter :
      </p>

      <p>
        <strong>Thomas ORTA</strong>
        <br />
        Email : thomasorta.forweb@gmail.com
      </p>

      <p>
        Dernière mise à jour : juillet 2026.
      </p>
    </LegalSection>
      </MainLayout>
  );
}
