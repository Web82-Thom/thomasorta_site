# 05 - Frontend Architecture

## 1. Objectif

Ce document decrit l'architecture frontend prevue pour la V1 du site `thomasorta.fr`.

Le frontend est developpe avec React, Vite et TypeScript.

Aucun fichier legacy de l'ancien site ne sera repris.

L'ancien site sert uniquement de reference pour :

* les textes utiles ;
* l'esprit general ;
* certaines images ;
* certaines idees visuelles ;
* le principe du widget meteo.

---

## 2. Principes generaux

Le frontend doit etre :

* clair ;
* structure ;
* maintenable ;
* responsive ;
* evolutif ;
* sans dette technique heritee.

Les principes retenus sont :

* composants React reutilisables ;
* separation des responsabilites ;
* logique metier isolee dans des classes ou services ;
* pages simples a lire ;
* aucun acces direct a une base de donnees ;
* aucune cle privee dans le frontend.

---

## 3. Approche POO

Meme si React repose sur des composants fonctionnels, le projet adopte une approche orientee objet pour organiser la logique applicative.

La POO est utilisee pour :

* representer les modeles metier ;
* centraliser les appels API ;
* isoler les regles de validation ;
* structurer les services ;
* eviter de melanger affichage et logique.

Exemples :

```text
ContactMessage
ContactApiService
ContactFormValidator
WeatherReport
```

Les composants React ne doivent pas contenir de logique complexe.

---

## 4. Stack frontend

Stack retenue :

* React ;
* Vite ;
* TypeScript ;
* React Router ;
* CSS Modules.

Aucune librairie UI lourde n'est prevue en V1.

---

## 5. Organisation des dossiers

Structure actuelle :

```text
frontend/
+-- public/
+-- src/
|   +-- app/
|   +-- features/
|   +-- layouts/
|   +-- router/
|   +-- shared/
|   |   +-- components/
|   |   +-- cookie-consent/
|   |   +-- design-system/
|   |   +-- styles/
|   +-- main.tsx
+-- index.html
+-- package.json
+-- tsconfig.json
+-- vite.config.ts
```

Etat actuel :

* React, Vite et TypeScript sont installes.
* React Router est installe.
* La structure utilise `shared/` pour les composants reutilisables, les styles globaux et le design-system.
* Le consentement cookies est prevu dans `shared/cookie-consent` car il concerne tout le site.
* `vite.config.ts` proxyfie `/api` vers le backend Symfony local en developpement.

---

## 6. Dossier `features`

Le dossier `features` contient les fonctionnalites metier du site.

Structure actuelle :

```text
src/features/
├── about/
├── contact/
├── home/
└── legal/
```

La feature `home` contient les sections de la page d'accueil :

```text
src/features/home/presentation/components/
├── Contact/
├── Hero/
├── Projects/
├── Services/
└── Weather/
```

La feature `contact` contient la logique transverse du formulaire :

```text
src/features/contact/
├── domain/
├── services/
└── validators/
```

Cette organisation permet de garder une logique propre et testable.

---

## 7. Dossier `layouts`

Le dossier `layouts` contient les structures de pages.

Structure actuelle :

```text
src/layouts/
├── Footer/
├── Header/
├── MainLayout/
└── PublicLayout.tsx
```

Responsabilites :

* structure commune des pages publiques ;
* inclusion du header ;
* inclusion du footer ;
* navigation principale.

---

## 8. Pages publiques

Les pages publiques sont placees dans les features concernees afin de garder une organisation coherente avec le domaine fonctionnel.

Pages publiques actuelles :

```text
src/features/home/presentation/
└── HomePage.tsx

src/features/about/
├── index.ts
└── presentation/
    ├── AboutPage.tsx
    ├── AboutPage.module.css
    ├── About.types.ts
    └── index.ts

src/features/legal/
├── index.ts
└── presentation/
    ├── LegalNoticePage.tsx
    ├── PrivacyPolicyPage.tsx
    ├── TermsOfUsePage.tsx
    ├── SiteMapPage.tsx
    └── components/
        └── LegalSection/
```

Les pages doivent rester lisibles.

La logique complexe doit etre deplacee dans les features, services ou validators.

---

## 9. Dossier `router`

Le dossier `router` contient la configuration des routes React.

Structure actuelle :

```text
src/router/
+-- AppRouter.tsx
+-- ScrollToHash.tsx
```

Routes publiques actuelles :

```text
/
/a-propos
/mentions-legales
/politique-confidentialite
/conditions-utilisation
/plan-du-site
```

Regles :

* routes publiques accessibles librement ;
* navigation interne via React Router ;
* scroll vers les ancres de la home via `ScrollToHash`.

Etat actuel :

* `AppRouter.tsx` existe.
* La route `/` est branchee vers `features/home/presentation/HomePage.tsx`.
* `HomePage.tsx` affiche `Hero`, `Weather`, `Services`, `Projects` et `Contact`.
* La route `/a-propos` est branchee vers `features/about`.
* Les routes legales publiques sont branchees via `features/legal`.
* `ScrollToHash.tsx` gere le scroll vers les ancres de la home depuis les liens de navigation.

---

## 10. Design-system et composants partages

Le dossier `shared` contient les elements transverses reutilisables.

```text
src/shared/
+-- components/
+-- cookie-consent/
+-- design-system/
+-- styles/
```

Responsabilites :

* composants UI generiques ;
* mecanismes transverses comme le consentement cookies ;
* styles globaux ;
* documentation du design-system ;
* tokens visuels et conventions communes.

---

## 11. Consentement cookies

Le consentement cookies est une fonctionnalite transverse du frontend.

Structure cible :

```text
src/shared/cookie-consent/
├── components/
│   └── CookieBanner/
│       ├── CookieBanner.tsx
│       └── CookieBanner.module.css
├── contexts/
│   └── CookieConsentContext.tsx
├── hooks/
│   └── useCookieConsent.ts
├── services/
│   └── CookieConsentStorage.ts
├── types/
│   └── CookieConsent.types.ts
└── index.ts
```

Responsabilites :

* `CookieConsentContext` centralise l'etat global ;
* `useCookieConsent` expose une API simple aux composants ;
* `CookieConsentStorage` isole l'acces a `localStorage` ;
* `CookieBanner` gere uniquement l'interface utilisateur ;
* `index.ts` centralise les exports publics du module.

Etats fonctionnels :

```text
unknown
accepted
refused
```

Regles :

* le bandeau s'affiche uniquement si l'etat est `unknown` ;
* le choix est stocke dans `localStorage` ;
* le footer doit proposer un lien `Cookies` permettant de modifier le choix ;
* aucun outil d'analyse ou de marketing ne doit etre charge tant que l'etat n'est pas `accepted` ;
* la structure doit permettre d'ajouter plus tard Google Analytics, Matomo ou Microsoft Clarity sans refactorisation.

---

## 12. Services API

Les appels API doivent etre centralises dans des services dedies.

Exemples :

```text
ContactApiService
WeatherApiService
```

Regles :

* aucun `fetch` direct dans les composants UI partages ;
* chaque service a une responsabilite claire ;
* les erreurs sont traitees proprement.

Etat actuel :

* le formulaire de contact consomme `POST /api/contact` via `ContactApiService` ;
* le widget meteo consomme `GET /api/weather`.

---

## 13. Validation frontend

La validation frontend sert a guider l'utilisateur.

Elle ne remplace jamais la validation backend.

Exemple :

```text
ContactFormValidator
```

Regles :

* verifier les champs obligatoires ;
* verifier le format email ;
* afficher des messages clairs ;
* empecher les soumissions inutiles ;
* ne jamais considerer la validation frontend comme une securite suffisante.

---

## 14. Contenu statique

Les services, realisations et textes de presentation sont statiques dans la V1.

Regles :

* contenu clair ;
* facile a modifier ;
* aucune dependance a une base de donnees ;
* pas de CMS cache ou bricole.

Etat actuel :

* la section `Services` est implementee dans `src/features/home/presentation/components/Services/` ;
* la section `Projects` est implementee dans `src/features/home/presentation/components/Projects/` ;
* les realisations sont declarees dans `Projects.data.ts` avec statut, technologies, image et lien direct optionnel ;
* les images de realisations doivent etre preparees en ratio `16:9` pour conserver un affichage propre dans les cards.

---

## 15. Responsive design

Le site doit etre compatible avec :

* desktop ;
* tablette ;
* mobile.

Priorites :

* lisibilite ;
* rapidite ;
* navigation simple ;
* formulaire utilisable sur mobile ;
* sections bien espacees.

---

## 16. Accessibilite

Le frontend doit respecter les bonnes pratiques de base :

* balises HTML semantiques ;
* labels sur les champs de formulaire ;
* boutons explicites ;
* contrastes corrects ;
* navigation clavier raisonnable ;
* textes alternatifs sur les images utiles.

---

## 17. Performance

Le site doit rester leger.

Regles :

* eviter les librairies inutiles ;
* optimiser les images ;
* limiter le JavaScript ;
* ne pas charger de scripts tiers optionnels sans consentement ;
* utiliser le build Vite ;
* charger seulement ce qui est necessaire.

---

## 18. Ce qui est interdit

Ne pas integrer dans le frontend V1 :

* ancien code PHP ;
* ancien JavaScript legacy ;
* jQuery ;
* Bootstrap impose par l'ancien site ;
* logique metier sensible ;
* acces direct MySQL ;
* secrets ;
* appels API disperses ;
* gros framework UI inutile ;
* back-office.
* scripts analytics ou marketing charges avant consentement.

---

## 19. Decisions validees

Pour la V1 :

* frontend React + Vite + TypeScript ;
* CSS Modules ;
* architecture par features ;
* approche POO pour les modeles, services et validators ;
* aucun fichier legacy ;
* contenu public statique ;
* consentement cookies gere dans `shared/cookie-consent` ;
* appels API limites a la meteo et au contact ;
* priorite a la lisibilite et a la maintenabilite.
