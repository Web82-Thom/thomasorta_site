# 09 - Roadmap

## 1. Objectif

Ce document décrit les étapes de développement du nouveau site professionnel `thomasorta.fr`.

L'objectif est de construire le projet progressivement, en validant chaque étape avant de passer à la suivante.

Chaque étape terminée doit laisser un projet compilable, propre et fonctionnel.

---

# Phase 1 — Conception

## Étape 1

* Création du dépôt Git.
* Création du README.
* Création de la documentation.
* Validation de l'architecture générale.

**Statut :** Termine

---

## Étape 2

Validation des documents :

* Functional Analysis
* Technical Architecture
* Database Design
* API Specification
* Frontend Architecture
* Backend Architecture
* Security
* Deployment
* Roadmap

**Statut :** Termine

---

# Phase 2 — Initialisation du projet

## Étape 3

Création de l'arborescence :

```text
thomasorta_site/
├── backend/
├── frontend/
├── docs/
└── README.md
```

Objectif :

* projet propre ;
* Git initialisé ;
* premier commit.

**Statut :** En cours

---

## Étape 4

Initialisation du backend Symfony.

Objectifs :

* installation Symfony ;
* configuration ;
* premier lancement.

**Statut :** Termine

---

## Étape 5

Initialisation du frontend React.

Objectifs :

* installation React ;
* installation Vite ;
* TypeScript ;
* premier lancement.

**Statut :** Termine

---

## Étape 6

Configuration Git.

Objectifs :

* `.gitignore`
* premier commit propre ;
* validation de la structure.

Livré :

* `.gitignore` backend aligné ;
* `.env.example` ajouté ;
* `.env`, `.env.dev` et `.env.local` exclus du versioning ;
* vrais fichiers env conservés localement uniquement.

**Statut :** Termine

---

# Phase 3 — Backend

## Étape 7

Configuration Symfony.

* Security
* Doctrine
* Mailer
* Validator
* HttpClient
* route météo publique `/api/weather`

**Statut :** En cours

---

## Étape 8

Création de la base de données.

* migrations ;
* entités ;
* repositories.

**Statut :** A faire

---

## Étape 9

Authentification administrateur.

Fonctionnalités :

* login ;
* logout ;
* protection des routes.

**Statut :** A faire

---

## Étape 10

Formulaire de contact.

Fonctionnalités :

* validation ;
* email ;
* réponses JSON.

Livré :

* endpoint `POST /api/contact` créé ;
* DTO `ContactMessage` ajouté ;
* validation backend ajoutée ;
* envoi email via Symfony Mailer ajouté.

Reste :

* validation manuelle avec une vraie configuration SMTP ;
* tests automatisés.

**Statut :** En cours

---

# Phase 4 — Frontend

## Étape 11

Architecture React.

Création des dossiers :

* app ;
* assets ;
* components ;
* features ;
* layouts ;
* pages ;
* router ;
* services ;
* styles.

Livré :

* structure `app`, `router`, `layouts`, `shared` et `features/home` en place ;
* composants `Hero`, `Weather`, `Services` et `Projects` créés dans la feature home ;
* assets du hero intégrés côté React.

**Statut :** En cours

---

## Étape 12

Création du layout principal.

* Header ;
* Footer ;
* Navigation.

Livré :

* `Header` créé et intégré ;
* navigation publique en place ;
* logo SVG dédié au header.

Reste :

* footer final.

**Statut :** En cours

---

## Étape 13

Création de la HomePage.

Sections :

* Hero ;
* Slider ;
* Services ;
* Réalisations ;
* Météo ;
* Contact.

Livré :

* `Hero` affiché sur la home ;
* widget météo affiché sur la home ;
* section Services affichée et validée sur la home ;
* section Réalisations affichée avec images et liens directs ;
* section Contact affichée et branchée au service frontend.

Reste :

* éventuel slider si confirmé utile.

**Statut :** En cours

---

## Étape 14

Création des pages légales.

* Mentions légales ;
* Protection des données.

**Statut :** A faire

---

## Étape 15

Connexion avec l'API Symfony.

* Contact ;
* Login ;
* Dashboard.

Livré :

* le frontend consomme `GET /api/weather` ;
* Vite proxyfie `/api` vers Symfony en développement ;
* le formulaire de contact frontend consomme `POST /api/contact`.

Reste :

* login ;
* dashboard.

**Statut :** En cours

---

# Phase 5 — Administration

## Étape 16

Création de la page Login.

Fonctionnalités :

* email ;
* mot de passe ;
* validation.

**Statut :** A faire

---

## Étape 17

Création du Dashboard.

Contenu :

```text
Réfléchis et pose tes idées.
```

**Statut :** A faire

---

# Phase 6 — Responsive

## Étape 18

Responsive Desktop.

**Statut :** A faire

---

## Étape 19

Responsive Tablette.

**Statut :** A faire

---

## Étape 20

Responsive Mobile.

**Statut :** A faire

---

# Phase 7 — Tests

## Étape 21

Tests frontend.

* navigation ;
* responsive ;
* formulaires.

**Statut :** A faire

---

## Étape 22

Tests backend.

* authentification ;
* API ;
* contact.

**Statut :** A faire

---

## Étape 23

Tests d'intégration.

Objectif :

* frontend ↔ backend.

**Statut :** A faire

---

# Phase 8 — Déploiement

## Étape 24

Préparation IONOS.

* configuration ;
* variables ;
* base MySQL.

**Statut :** A faire

---

## Étape 25

Déploiement.

Objectifs :

* build React ;
* Symfony ;
* HTTPS ;
* formulaire de contact ;
* administration.

**Statut :** A faire

---

## Étape 26

Validation finale.

Vérifications :

* site accessible ;
* responsive ;
* administration fonctionnelle ;
* formulaire opérationnel ;
* sécurité validée ;
* aucune erreur bloquante.

**Statut :** A faire

---

# Version cible

Version prévue :

```text
V1.0.0
```

Objectifs atteints :

* site professionnel moderne ;
* React + Vite ;
* Symfony ;
* MySQL ;
* responsive ;
* administration minimale ;
* formulaire de contact sécurisé ;
* déploiement IONOS ;
* aucune dépendance legacy ;
* architecture propre et évolutive.

---

# Philosophie

Le projet avance étape par étape.

Aucune fonctionnalité ne sera développée tant que l'étape précédente n'est pas validée.

L'objectif n'est pas de développer vite, mais de construire une base solide, lisible et facilement maintenable.
