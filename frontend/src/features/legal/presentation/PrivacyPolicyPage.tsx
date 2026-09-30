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
          Le formulaire de contact collecte uniquement les informations que
          vous choisissez de transmettre :
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

        <p>
          Lorsque vous acceptez la mesure d'audience, Google Analytics collecte
          également des données relatives à votre navigation, notamment les
          pages consultées, les événements de navigation, les données de
          session, l'adresse IP, la localisation approximative ainsi que des
          informations sur le navigateur et l'appareil utilisés.
        </p>

        <h2>Finalité du traitement</h2>

        <p>Les données du formulaire de contact sont utilisées afin de :</p>

        <ul>
          <li>répondre à votre demande ;</li>
          <li>échanger avec vous concernant votre projet ;</li>
          <li>assurer le suivi de nos échanges.</li>
        </ul>

        <p>
          Les données de navigation collectées avec votre accord sont utilisées
          pour mesurer la fréquentation du site et mieux comprendre son
          utilisation. Aucune donnée n'est utilisée à des fins de publicité
          personnalisée, de profilage publicitaire ou de prospection automatisée.
        </p>

        <h2>Base légale</h2>

        <p>
          Le traitement des informations transmises par le formulaire repose
          sur votre consentement, matérialisé par l'acceptation explicite de la
          case prévue avant son envoi.
        </p>

        <p>
          La mesure d'audience réalisée avec Google Analytics repose également
          sur votre consentement préalable. Le service reste désactivé tant que
          vous ne l'avez pas accepté et vous pouvez retirer votre consentement à
          tout moment.
        </p>

        <h2>Destinataires des données</h2>

        <p>
          Les informations transmises par le formulaire sont adressées à Thomas
          ORTA afin de permettre le traitement de votre demande. Elles transitent
          par le prestataire de messagerie Google Gmail.
        </p>

        <p>
          Les messages ne sont pas enregistrés dans une base de données du site.
          Ils sont transmis exclusivement par courrier électronique.
        </p>

        <p>
          Lorsque la mesure d'audience est acceptée, les données de navigation
          sont traitées par Google Analytics, un service fourni par Google. Pour
          en savoir plus sur le traitement réalisé par Google, vous pouvez
          consulter les{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            règles de confidentialité relatives aux sites partenaires de Google
          </a>
          .
        </p>

        <h2>Durée de conservation</h2>

        <p>
          Les informations reçues sont conservées uniquement pendant la durée
          nécessaire au traitement de votre demande et aux échanges qui en
          découlent.
        </p>

        <p>
          Les données utilisateur et les données d'événement collectées par
          Google Analytics sont conservées pendant 2 mois, conformément au
          paramétrage de la propriété Analytics. Cette durée ne s'applique pas
          aux rapports statistiques agrégés standards.
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

        <h2>Cookies et mesure d'audience</h2>

        <p>
          Le site utilise Google Analytics afin de mesurer son audience et de
          mieux comprendre son utilisation.
        </p>

        <p>
          Google Analytics n'est activé qu'après votre consentement via le
          bandeau de gestion des cookies. En cas de refus, aucun suivi Google
          Analytics n'est déclenché.
        </p>

        <p>
          Google Analytics peut déposer les cookies de mesure d'audience
          <strong> _ga</strong> et <strong>_ga_&lt;identifiant&gt;</strong>. Leur
          durée de validité maximale par défaut est de 2 ans, sous réserve des
          limitations appliquées par le navigateur.
        </p>

        <p>
          Le site n'utilise pas Google Analytics à des fins de publicité
          personnalisée ou de profilage publicitaire.
        </p>

        <p>
          Vous pouvez retirer votre consentement à tout moment en utilisant le
          lien « Cookies » disponible dans le pied de page du site.
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
          <li>droit d'opposition lorsque la réglementation le permet ;</li>
          <li>droit à la portabilité lorsque celui-ci est applicable ;</li>
          <li>droit de retirer votre consentement à tout moment ;</li>
          <li>droit d'introduire une réclamation auprès de la CNIL.</li>
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

        <p>Dernière mise à jour : septembre 2026.</p>
      </LegalSection>
    </MainLayout>
  );
}
