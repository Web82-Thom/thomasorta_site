# ThomasOrta.fr

## Présentation

Ce dépôt contient le code source du nouveau site professionnel de Thomas Orta.

L'objectif est de remplacer l'ancien site PHP par une architecture moderne, maintenable et évolutive basée sur React et Symfony.

Le projet est développé progressivement, en privilégiant une conception propre avant toute implémentation.

---

## Objectifs

* Présenter l'activité de développeur Web & Mobile.
* Mettre en avant les services proposés.
* Présenter les réalisations.
* Fournir un formulaire de contact sécurisé.
* Disposer d'une base technique pérenne pour les futures évolutions.

La V1 reste volontairement simple afin de produire un site rapide, fiable et facile à maintenir.

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
* MySQL

---

## Fonctionnalités V1

* Accueil
* Services
* Réalisations
* Widget météo
* Formulaire de contact
* Mentions légales
* Protection des données
* Connexion administrateur
* Tableau de bord administrateur minimal

---

## Fonctionnalités prévues ultérieurement

L'espace administrateur est volontairement limité dans la première version.

Il servira de base pour intégrer progressivement de nouvelles fonctionnalités selon les besoins du projet.

---

## Développement

Le projet est développé localement puis déployé sur un hébergement mutualisé IONOS.

Le frontend est construit avec React/Vite.

Le backend est développé avec Symfony.

Aucun VPS ni Docker ne sont utilisés pour la production de cette première version.

### État actuel

* Header public créé avec logo dédié.
* HomePage branchée avec `Hero`.
* Widget météo React branché sur `GET /api/weather`.
* Le proxy Vite `/api` pointe vers Symfony en développement.
* Les vrais fichiers `.env`, `.env.dev` et `.env.local` sont exclus de Git.
* `backend/.env.example` sert de modèle versionné.

---

## Documentation

Toute la documentation du projet est disponible dans le dossier `docs/`.

Les documents sont organisés par étapes :

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

Les principes qui guident le développement sont :

* simplicité ;
* qualité ;
* sécurité ;
* maintenabilité ;
* évolutivité.

Chaque fonctionnalité doit répondre à un besoin réel avant d'être implémentée.
