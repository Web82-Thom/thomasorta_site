# 09 - Roadmap

## 1. Objectif

Ce document decrit les etapes de developpement du nouveau site professionnel `thomasorta.fr`.

L'objectif est de construire le projet progressivement, en validant chaque etape avant de passer a la suivante.

Chaque etape terminee doit laisser un projet compilable, propre et fonctionnel.

---

## Phase 1 - Conception

### Etape 1

* Creation du depot Git.
* Creation du README.
* Creation de la documentation.
* Validation de l'architecture generale.

**Statut :** Termine

---

### Etape 2

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

## Phase 2 - Initialisation du projet

### Etape 3

Creation de l'arborescence :

```text
thomasorta_site/
├── backend/
├── frontend/
├── docs/
└── README.md
```

Objectif :

* projet propre ;
* Git initialise ;
* premier commit.

**Statut :** Termine

---

### Etape 4

Initialisation du backend Symfony.

Objectifs :

* installation Symfony ;
* configuration ;
* premier lancement.

**Statut :** Termine

---

### Etape 5

Initialisation du frontend React.

Objectifs :

* installation React ;
* installation Vite ;
* TypeScript ;
* premier lancement.

**Statut :** Termine

---

### Etape 6

Configuration Git.

Objectifs :

* `.gitignore`
* premier commit propre ;
* validation de la structure.

Livre :

* `.gitignore` backend aligne ;
* `.env.example` ajoute ;
* `.env`, `.env.dev` et `.env.local` exclus du versioning ;
* vrais fichiers env conserves localement uniquement.

**Statut :** Termine

---

## Phase 3 - Backend public

### Etape 7

Configuration Symfony.

* Mailer
* Validator
* HttpClient
* route meteo publique `/api/weather`
* route contact publique `/api/contact`

**Statut :** En cours

---

### Etape 8

Decision persistence V1.

Decision :

* aucune base de donnees requise pour la V1 ;
* aucun message de contact stocke ;
* contenus publics statiques cote React ;
* pas de back-office.

**Statut :** Termine

---

### Etape 9

Formulaire de contact.

Fonctionnalites :

* validation ;
* email ;
* reponses JSON.

Livre :

* endpoint `POST /api/contact` cree ;
* DTO `ContactMessage` ajoute ;
* validation backend ajoutee ;
* envoi email via Symfony Mailer ajoute ;
* test manuel reel valide avec configuration SMTP locale.

Reste :

* tests automatises.

**Statut :** En cours

---

## Phase 4 - Frontend public

### Etape 10

Architecture React.

Creation des dossiers :

* app ;
* features ;
* layouts ;
* router ;
* shared ;
* styles.

Livre :

* structure `app`, `router`, `layouts`, `shared` et `features/home` en place ;
* composants `Hero`, `Weather`, `Services`, `Projects` et `Contact` crees dans la feature home ;
* feature `about` creee pour la page A propos publique ;
* feature `legal` creee pour les pages legales publiques ;
* module `shared/cookie-consent` cree pour le consentement cookies ;
* assets du hero integres cote React.

**Statut :** En cours

---

### Etape 11

Creation du layout principal.

* Header ;
* Footer ;
* Navigation.

Livre :

* `Header` cree et integre ;
* `Footer` cree et integre ;
* navigation publique en place ;
* liens du header et du footer branches en navigation React Router ;
* etat actif de navigation aligne entre header et footer ;
* scroll vers les ancres de la home gere depuis les pages publiques ;
* lien `Cookies` ajoute dans le footer pour modifier le consentement ;
* logo SVG dedie au header.

**Statut :** En cours

---

### Etape 12

Creation de la HomePage.

Sections :

* Hero ;
* Services ;
* Realisations ;
* Meteo ;
* Contact.

Livre :

* `Hero` affiche sur la home ;
* widget meteo affiche sur la home ;
* section Services affichee et validee sur la home ;
* section Realisations affichee avec images et liens directs ;
* section Contact affichee et branchee au service frontend.

Reste :

* eventuel slider si confirme utile.

**Statut :** En cours

---

### Etape 13

Creation de la page A propos.

Livre :

* page `/a-propos` creee dans `features/about/presentation` ;
* contenu structure en blocs professionnels ;
* route publique branchee dans `AppRouter` ;
* lien de retour vers l'accueil ajoute.

**Statut :** Termine

---

### Etape 14

Creation des pages legales.

* Mentions legales ;
* Politique de confidentialite ;
* Conditions d'utilisation ;
* Plan du site.

Livre :

* pages legales creees dans `features/legal/presentation` ;
* composant `LegalSection` mutualise ;
* exports centralises dans `features/legal/index.ts` ;
* routes publiques legales branchees dans `AppRouter`.

**Statut :** Termine

---

### Etape 15

Consentement cookies.

Fonctionnalites :

* bandeau RGPD moderne en bas de page ;
* etats `unknown`, `accepted`, `refused` ;
* stockage du choix dans `localStorage` ;
* lien `Cookies` dans le footer pour modifier le choix ;
* aucun script d'analyse ou de marketing charge sans consentement.

Livre :

* arborescence `src/shared/cookie-consent` creee ;
* types `unknown`, `accepted`, `refused` ajoutes ;
* `CookieConsentStorage` ajoute pour isoler `localStorage` ;
* `CookieConsentProvider` ajoute et branche dans `main.tsx` ;
* `useCookieConsent` ajoute ;
* `CookieBanner` ajoute et rendu dans `App.tsx` ;
* bouton `Cookies` ajoute dans le footer via `reset()`.

Reste :

* validation visuelle desktop/tablette/mobile ;
* verification manuelle du flux accepter/refuser/reouvrir ;
* tests frontend si la strategie de tests est confirmee ;
* alignement final du texte de politique de confidentialite si necessaire.

**Statut :** En cours

---

### Etape 16

Connexion avec l'API Symfony.

Livre :

* le frontend consomme `GET /api/weather` ;
* Vite proxyfie `/api` vers Symfony en developpement ;
* le formulaire de contact frontend consomme `POST /api/contact`.

Reste :

* tests automatises frontend ;
* verification responsive complete.

**Statut :** En cours

---

## Phase 5 - Responsive

### Etape 17

Responsive Desktop.

**Statut :** A faire

---

### Etape 18

Responsive Tablette.

**Statut :** A faire

---

### Etape 19

Responsive Mobile.

**Statut :** A faire

---

## Phase 6 - Tests

### Etape 20

Tests frontend.

* navigation ;
* responsive ;
* formulaires.
* consentement cookies.

**Statut :** A faire

---

### Etape 21

Tests backend.

* API meteo ;
* contact ;
* validation ;
* email.

**Statut :** A faire

---

### Etape 22

Tests d'integration.

Objectif :

* frontend vers backend ;
* formulaire de contact ;
* widget meteo.

**Statut :** A faire

---

## Phase 7 - Deploiement

### Etape 23

Preparation IONOS.

* configuration ;
* variables serveur ;
* PHP ;
* SMTP ;
* OpenWeather.

**Statut :** A faire

---

### Etape 24

Deploiement.

Objectifs :

* build React ;
* Symfony ;
* HTTPS ;
* formulaire de contact ;
* widget meteo ;
* bandeau cookies ;
* pages publiques.

**Statut :** A faire

---

### Etape 25

Validation finale.

Verifications :

* site accessible ;
* responsive ;
* formulaire operationnel ;
* widget meteo operationnel ;
* consentement cookies operationnel ;
* pages legales accessibles ;
* securite validee ;
* aucune erreur bloquante.

**Statut :** A faire

---

## Version cible

Version prevue :

```text
V1.0.0
```

Objectifs atteints :

* site professionnel moderne ;
* React + Vite ;
* Symfony ;
* responsive ;
* formulaire de contact securise ;
* widget meteo ;
* consentement cookies ;
* pages legales ;
* deploiement IONOS ;
* aucune dependance legacy ;
* architecture propre et evolutive.

---

## Philosophie

Le projet avance etape par etape.

Aucune fonctionnalite ne sera developpee tant que l'etape precedente n'est pas validee.

L'objectif n'est pas de developper vite, mais de construire une base solide, lisible et facilement maintenable.
