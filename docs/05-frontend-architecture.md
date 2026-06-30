# 05 - Frontend Architecture

## 1. Objectif

Ce document décrit l'architecture frontend prévue pour la V1 du site `thomasorta.fr`.

Le frontend sera développé avec React, Vite et TypeScript.

Aucun fichier legacy de l'ancien site ne sera repris.

L'ancien site sert uniquement de référence pour :

* les textes utiles ;
* l'esprit général ;
* certaines images ;
* certaines idées visuelles.
* le principe du widget météo.

Le code frontend sera entièrement reconstruit sur une base propre.

---

## 2. Principes généraux

Le frontend doit être :

* clair ;
* structuré ;
* maintenable ;
* responsive ;
* évolutif ;
* sans dette technique héritée.

Les principes retenus sont :

* composants React réutilisables ;
* séparation des responsabilités ;
* logique métier isolée dans des classes ou services ;
* pages simples à lire ;
* aucun accès direct à la base de données ;
* aucune clé privée dans le frontend.

---

## 3. Approche POO

Même si React repose sur des composants fonctionnels, le projet adopte une approche orientée objet pour organiser la logique applicative.

La POO sera utilisée pour :

* représenter les modèles métier ;
* centraliser les appels API ;
* isoler les règles de validation ;
* structurer les services ;
* éviter de mélanger affichage et logique.

Exemples :

```text
ContactRequest
AdminUser
ContactApiService
AuthApiService
ContactFormValidator
```

Les composants React ne doivent pas contenir de logique complexe.

Ils doivent principalement :

* afficher les données ;
* gérer les interactions utilisateur ;
* appeler des services dédiés ;
* afficher les états de chargement, succès ou erreur.

---

## 4. Stack frontend

Stack retenue :

* React ;
* Vite ;
* TypeScript ;
* React Router ;
* CSS Modules.

Aucune librairie UI lourde n'est prévue en V1.

L'objectif est de garder un site léger, maîtrisé et facilement personnalisable.

---

## 5. Organisation des dossiers

Structure cible :

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
|   |   +-- design-system/
|   |   +-- styles/
|   +-- main.tsx
+-- index.html
+-- package.json
+-- tsconfig.json
+-- vite.config.ts
```

État actuel :

* React, Vite et TypeScript sont installés.
* React Router est installé.
* Le build Vite fonctionne.
* ESLint fonctionne.
* L'ancienne structure Vite par défaut a été supprimée.
* La structure actuelle utilise `shared/` pour les composants réutilisables, les styles globaux et le design-system.
* `vite.config.ts` proxyfie `/api` vers le backend Symfony local en développement.

---

## 6. Dossier `app`

Le dossier `app` contient les éléments globaux de l'application.

Exemples :

```text
src/app/
├── App.tsx
├── App.module.css
└── config.ts
```

Responsabilités :

* composant racine ;
* configuration globale ;
* initialisation de l'application ;
* structure principale.

---

## 7. Dossier `shared`

Le dossier `shared` contient les éléments transverses réutilisables par plusieurs features.

Structure actuelle :

```text
src/shared/
+-- components/
+-- design-system/
+-- styles/
```

Responsabilités :

* composants UI génériques ;
* styles globaux ;
* documentation du design-system ;
* tokens visuels et conventions communes.

---

## 7.1 Dossier `assets`

Le dossier `assets` contient les ressources utilisées par React.

Exemples :

```text
src/assets/
├── images/
├── icons/
└── logos/
```

Règles :

* aucune image inutile ;
* fichiers optimisés avant intégration ;
* noms clairs ;
* pas d'assets legacy en vrac.

---

## 8. Dossier `shared/components`

Le dossier `components` contient les composants réutilisables et indépendants.

Exemples :

```text
src/shared/components/
+-- Button/
+-- Card/
+-- Container/
+-- Section/
+-- Title/
```

Chaque composant peut contenir :

```text
Button/
+-- Button.tsx
+-- Button.types.ts
+-- Button.module.css
+-- index.ts
```

Règles :

* un composant = une responsabilité ;
* pas d'appel API direct dans les composants génériques ;
* pas de logique métier complexe ;
* styles isolés avec CSS Modules.

---

## 9. Dossier `features`

Le dossier `features` contient les fonctionnalités métier du site.

Exemples :

```text
src/features/
├── contact/
├── admin/
├── services/
├── projects/
└── weather/
```

Chaque feature peut contenir :

```text
contact/
├── domain/
├── services/
├── presentation/
└── validators/
```

Organisation recommandée :

```text
src/features/contact/
├── domain/
│   └── ContactRequest.ts
├── services/
│   └── ContactApiService.ts
├── validators/
│   └── ContactFormValidator.ts
└── presentation/
    └── ContactForm.tsx
```

Cette organisation permet de garder une logique propre et testable.

---

## 10. Dossier `layouts`

Le dossier `layouts` contient les structures de pages.

Exemples :

```text
src/layouts/
├── PublicLayout.tsx
└── AdminLayout.tsx
```

Responsabilités :

* structure commune des pages publiques ;
* structure commune des pages admin ;
* inclusion du header, footer ou navigation admin.

---

## 11. Dossier `pages`

Le dossier `pages` contient les pages principales de l'application.

Pages publiques prévues :

```text
src/pages/
├── HomePage.tsx
├── LegalNoticePage.tsx
└── PrivacyPolicyPage.tsx
```

Pages admin prévues :

```text
src/pages/admin/
├── AdminLoginPage.tsx
└── AdminDashboardPage.tsx
```

Les pages doivent rester lisibles.

La logique complexe doit être déplacée dans les features, services ou validators.

---

## 12. Dossier `router`

Le dossier `router` contient la configuration des routes React.

Exemple :

```text
src/router/
+-- AppRouter.tsx
```

Routes prévues :

```text
/
/mentions-legales
/protection-des-donnees
/admin/login
/admin/dashboard
```

Règles :

* routes publiques accessibles librement ;
* routes admin protégées ;
* redirection vers `/admin/login` si non authentifié.

État actuel :

* `AppRouter.tsx` existe.
* La route `/` est branchée vers `features/home/presentation/HomePage.tsx`.
* `HomePage.tsx` affiche le `Hero`, le widget `Weather` et la section `Services`.
* Les routes légales et admin restent à implémenter.

---

## 12.1 Dossier `shared/design-system`

Le dossier `shared/design-system` documente les conventions visuelles du frontend.

État actuel :

```text
src/shared/design-system/
+-- animations.md
+-- buttons.md
+-- cards.md
+-- colors.md
+-- forms.md
+-- icons.md
+-- spacing.md
+-- typography.md
```

Responsabilités :

* centraliser les décisions UI ;
* éviter les composants incohérents ;
* guider la création des composants partagés.

---

## 13. Dossier `services`

Le dossier `services` contient les services globaux.

Exemples :

```text
src/shared/services/
+-- HttpClient.ts
+-- StorageService.ts
+-- EnvironmentService.ts
```

Responsabilités :

* centraliser les appels HTTP ;
* gérer les erreurs réseau ;
* centraliser les variables publiques du frontend ;
* éviter la duplication de code.

---

## 14. Dossier `shared/styles`

Le dossier `styles` contient les styles globaux.

Exemples :

```text
src/shared/styles/
+-- reset.css
+-- theme.css
+-- typography.css
+-- utilities.css
+-- global.css
```

Règles :

* styles globaux limités ;
* variables CSS centralisées ;
* composants stylés via CSS Modules ;
* aucun style inline sauf cas très spécifique.

---

## 15. Modèles métier

Les modèles métier représentent les objets manipulés par l'application.

Exemple `ContactRequest` :

```text
src/features/contact/domain/ContactRequest.ts
```

Responsabilités :

* représenter les données du formulaire ;
* fournir une structure claire ;
* éviter les objets anonymes partout dans le code.

Exemples de modèles :

```text
ContactRequest
AdminUser
AuthSession
ServiceItem
ProjectItem
WeatherQuery
WeatherReport
```

---

## 16. Services API

Les appels API doivent être centralisés dans des services dédiés.

Exemples :

```text
ContactApiService
AuthApiService
AdminApiService
WeatherApiService
```

Règles :

* aucun `fetch` direct dans les pages ;
* aucun `fetch` direct dans les composants UI partagés ;
* chaque service a une responsabilité claire ;
* les erreurs sont traitées proprement.

État actuel :

* le widget météo utilise une fonction locale `fetchWeather` dans `Weather.tsx` ;
* cette solution est acceptée pour la première intégration car le composant est isolé et la logique reste courte ;
* si d'autres appels API sont ajoutés, la logique HTTP devra être extraite vers un service dédié.

---

## 17. Validation frontend

La validation frontend sert à guider l'utilisateur.

Elle ne remplace jamais la validation backend.

Exemple :

```text
ContactFormValidator
LoginFormValidator
```

Règles :

* vérifier les champs obligatoires ;
* vérifier le format email ;
* afficher des messages clairs ;
* empêcher les soumissions inutiles ;
* ne jamais considérer la validation frontend comme une sécurité suffisante.

---

## 18. Administration frontend

L'administration V1 reste minimale.

Pages prévues :

```text
/admin/login
/admin/dashboard
```

Fonctionnement :

* formulaire email/mot de passe ;
* appel API de connexion ;
* stockage contrôlé de l'état de session ;
* protection de la route dashboard ;
* affichage du message :

```text
Réfléchis et pose tes idées.
```

Aucune gestion de contenu n'est prévue en V1.

---

## 18.1 Widget météo

Le widget météo est conservé dans l'esprit de l'ancien site PHP.

Il doit rester une fonctionnalité légère de la page d'accueil.

Règles :

* aucun secret API privé dans le frontend ;
* appel public via `/api/weather` ;
* affichage d'un état d'erreur simple si la météo est indisponible ;
* dépendance au backend Symfony validée car la clé OpenWeather reste côté serveur ;
* pas de blocage du chargement principal de la page.

État actuel :

```text
src/features/home/presentation/components/Weather/
+-- Weather.tsx
+-- Weather.types.ts
+-- Weather.module.css
+-- index.ts
```

Le composant affiche :

* une ville par défaut ;
* un formulaire de recherche ;
* les températures courante, minimum et maximum ;
* l'icône OpenWeather ;
* un état de chargement ;
* un état d'erreur simple.

---

## 19. Contenu statique

Les services, réalisations et textes de présentation sont statiques dans la V1.

Ils peuvent être organisés dans des fichiers dédiés.

Exemple :

```text
src/features/services/data/services.ts
src/features/projects/data/projects.ts
```

Règles :

* contenu clair ;
* facile à modifier ;
* aucune dépendance à une base de données ;
* pas de CMS caché ou bricolé.

État actuel :

* la section `Services` est implémentée dans `src/features/home/presentation/components/Services/` ;
* les services affichés sur l'accueil restent statiques dans `Services.tsx` ;
* si la liste grossit, les données pourront être déplacées dans un fichier dédié sans changer le composant de présentation.

---

## 20. Responsive design

Le site doit être compatible avec :

* desktop ;
* tablette ;
* mobile.

Priorités :

* lisibilité ;
* rapidité ;
* navigation simple ;
* formulaire utilisable sur mobile ;
* sections bien espacées.

---

## 21. Accessibilité

Le frontend doit respecter les bonnes pratiques de base :

* balises HTML sémantiques ;
* labels sur les champs de formulaire ;
* boutons explicites ;
* contrastes corrects ;
* navigation clavier raisonnable ;
* textes alternatifs sur les images utiles.

---

## 22. Performance

Le site doit rester léger.

Règles :

* éviter les librairies inutiles ;
* optimiser les images ;
* limiter le JavaScript ;
* utiliser le build Vite ;
* charger seulement ce qui est nécessaire.

---

## 23. Ce qui est interdit

Ne pas intégrer dans le frontend V1 :

* ancien code PHP ;
* ancien JavaScript legacy ;
* jQuery ;
* Bootstrap imposé par l'ancien site ;
* logique métier sensible ;
* accès direct MySQL ;
* secrets ;
* appels API dispersés ;
* gros framework UI inutile.

---

## 24. Décisions validées

Pour la V1 :

* frontend React + Vite + TypeScript ;
* CSS Modules ;
* architecture par features ;
* approche POO pour les modèles, services et validators ;
* aucun fichier legacy ;
* contenu public majoritairement statique ;
* administration minimale ;
* appels API centralisés ;
* priorité à la lisibilité et à la maintenabilité.
