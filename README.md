# ThomasOrta.fr

## Presentation

Ce depot contient le code source du nouveau site professionnel de Thomas Orta.

L'objectif est de remplacer l'ancien site PHP par une architecture moderne, maintenable et evolutive basee sur React et Symfony.

Le projet est developpe progressivement, en privilegiant une conception propre avant toute implementation.

---

## Objectifs

* Presenter l'activite de developpeur Web & Mobile.
* Mettre en avant les services proposes.
* Presenter les realisations.
* Fournir un formulaire de contact securise.
* Conserver une base technique propre pour les futures evolutions.

La V1 reste volontairement simple afin de produire un site rapide, fiable et facile a maintenir.

---

## Architecture

```text
thomasorta_site/
├── backend/      Symfony
├── frontend/     React + Vite
├── docs/         Documentation fonctionnelle et technique
└── README.md
```

---

## Stack technique

### Frontend

* React
* Vite
* TypeScript
* CSS Modules

### Backend

* Symfony
* PHP 8.x
* Symfony Mailer
* Symfony Validator
* Symfony HttpClient

Une base MySQL n'est pas requise pour la V1, car aucun contenu public et aucun message de contact ne sont stockes.

---

## Fonctionnalites V1

* Accueil
* A propos
* Services
* Realisations
* Widget meteo
* Formulaire de contact
* Mentions legales
* Politique de confidentialite
* Conditions d'utilisation
* Plan du site
* Bandeau de consentement cookies
* Mesure d'audience Google Analytics 4 apres consentement

Le site V1 ne contient pas de back-office. Les contenus publics restent geres dans le code source React et les messages de contact sont uniquement envoyes par email.

---

## Developpement

Le projet est developpe localement puis deploie sur un hebergement mutualise IONOS.

Le frontend est construit avec React/Vite.

Le backend est developpe avec Symfony.

Aucun VPS ni Docker ne sont utilises pour la production de cette premiere version.

### Etat actuel

* Header public cree avec logo dedie.
* Footer public cree avec liens de navigation.
* HomePage branchee avec `Hero`, `Weather`, `Services`, `Projects` et `Contact`.
* Page A propos creee et branchee sur `/a-propos`.
* Pages legales publiques creees et branchees.
* Module de consentement cookies cree dans `shared/cookie-consent` et branche dans l'application.
* Module Google Analytics 4 cree dans `shared/analytics` et branche sur React Router.
* Aucun script Analytics n'est charge avant acceptation explicite des cookies.
* Widget meteo React branche sur `GET /api/weather`.
* Formulaire de contact branche sur `POST /api/contact`.
* Section Services creee et validee.
* Section Realisations creee avec cards, images et liens directs.
* Le proxy Vite `/api` pointe vers Symfony en developpement.
* Le build de production IONOS utilise `VITE_API_BASE_URL=/api/index.php` pour appeler Symfony sans dependance a une reecriture Apache fragile.
* Les vrais fichiers `.env`, `.env.dev` et `.env.local` sont exclus de Git.
* `backend/.env.example` sert de modele versionne.

---

## Documentation

Toute la documentation du projet est disponible dans le dossier `docs/`.

Les documents sont organises par etapes :

```text
docs/
├── 01-functional-analysis.md
├── 02-technical-architecture.md
├── 03-database-design.md
├── 04-api-specification.md
├── 05-frontend-architecture.md
├── 06-backend-architecture.md
├── 07-security.md
├── 08-deployment.md
└── 09-roadmap.md
```

---

## Philosophie

Les principes qui guident le developpement sont :

* simplicite ;
* qualite ;
* securite ;
* maintenabilite ;
* evolutivite.

Chaque fonctionnalite doit repondre a un besoin reel avant d'etre implementee.
