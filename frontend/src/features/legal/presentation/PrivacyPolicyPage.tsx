import { MainLayout } from "../../../layouts/MainLayout";
import { LegalSection } from "./components/LegalSection";

export function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <LegalSection title="Politique de confidentialité">
        <p>
          La présente politique de confidentialité a pour objectif de vous
          informer de manière claire sur la collecte, l'utilisation et la
          protection de vos données personnelles lors de votre navigation sur le
          site ThomasOrta.fr.
        </p>

        <h2>Responsable du traitement</h2>

        <p>
          <strong>Thomas ORTA</strong>
          <br />
          Développeur Web & Mobile
          <br />
          Email : thomasorta.forweb@gmail.com
        </p>

        <h2>Données collectées</h2>

        <p>
          Le site collecte uniquement les informations que vous choisissez de
          transmettre via le formulaire de contact :
        </p>

        <ul>
          <li>Nom</li>
          <li>Adresse e-mail</li>
          <li>Sujet</li>
          <li>Message</li>
        </ul>

        <p>
          Un champ technique invisible (honeypot) est également utilisé afin de
          limiter les envois automatiques de spam. Ce champ ne contient aucune
          donnée personnelle légitime.
        </p>

        <h2>Finalité du traitement</h2>

        <p>
          Les informations recueillies sont utilisées exclusivement afin de :
        </p>

        <ul>
          <li>répondre à votre demande ;</li>
          <li>échanger avec vous concernant votre projet ;</li>
          <li>assurer le suivi de nos échanges.</li>
        </ul>

        <p>
          Aucune donnée n'est utilisée à des fins commerciales, publicitaires ou
          de prospection automatisée.
        </p>

        <h2>Base légale</h2>

        <p>
          Le traitement repose sur votre consentement, matérialisé par
          l'acceptation explicite de la case prévue dans le formulaire de
          contact avant son envoi.
        </p>

        <h2>Destinataire des données</h2>

        <p>
          Les informations transmises sont envoyées uniquement à l'adresse
          professionnelle de Thomas ORTA afin de permettre le traitement de
          votre demande.
        </p>

        <p>
          Les messages ne sont pas enregistrés dans une base de données du site.
          Ils sont transmis exclusivement par courrier électronique.
        </p>

        <h2>Durée de conservation</h2>

        <p>
          Les informations reçues sont conservées uniquement pendant la durée
          nécessaire au traitement de votre demande et aux échanges qui en
          découlent.
        </p>

        <h2>Sécurité</h2>

        <p>
          Le site met en œuvre plusieurs mesures destinées à protéger vos
          données, notamment :
        </p>

        <ul>
          <li>validation des données côté navigateur ;</li>
          <li>validation côté serveur Symfony ;</li>
          <li>protection anti-spam par champ honeypot ;</li>
          <li>transmission sécurisée des données.</li>
        </ul>

        <h2>Cookies</h2>

        <p>
          À ce jour, le site n'utilise pas de cookies publicitaires, de suivi
          marketing ou de profilage.
        </p>

        <p>
          Seuls les éventuels cookies techniques strictement nécessaires au bon
          fonctionnement du site peuvent être utilisés.
        </p>

        <h2>Vos droits</h2>

        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez notamment des droits suivants :
        </p>

        <ul>
          <li>droit d'accès ;</li>
          <li>droit de rectification ;</li>
          <li>droit d'effacement ;</li>
          <li>droit à la limitation du traitement ;</li>
          <li>droit d'opposition lorsque la réglementation le permet.</li>
        </ul>

        <p>
          Pour exercer vos droits ou obtenir toute information complémentaire,
          vous pouvez envoyer un e-mail à :
        </p>

        <p>
          <strong>thomasorta.forweb@gmail.com</strong>
        </p>

        <h2>Mise à jour</h2>

        <p>
          La présente politique de confidentialité peut être modifiée afin de
          tenir compte des évolutions du site, de la réglementation ou des
          services proposés.
        </p>

        <p>Dernière mise à jour : juillet 2026.</p>
      </LegalSection>
    </MainLayout>
  );
}
