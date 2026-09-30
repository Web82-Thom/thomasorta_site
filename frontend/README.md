# Frontend ThomasOrta.fr

Frontend public du site professionnel ThomasOrta.fr, developpe avec React, TypeScript et Vite.

## Stack

* React ;
* React Router ;
* TypeScript ;
* Vite ;
* CSS Modules ;
* ESLint.

## Commandes

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

`npm run dev` lance l'environnement local. `npm run preview` sert le build de production genere dans `dist/`.

## Configuration

Variables publiques utilisees par le frontend en production :

```text
VITE_API_BASE_URL=/api/index.php
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GA_ENABLED=true
```

Toutes les variables prefixees par `VITE_` sont integrees au bundle public. Aucun secret ne doit y etre place.

Google Analytics 4 reste desactive en developpement. Sa validation locale doit etre effectuee avec `npm run build`, puis `npm run preview`.

## Architecture

```text
src/
+-- app/
+-- features/
+-- layouts/
+-- router/
+-- shared/
|   +-- analytics/
|   +-- components/
|   +-- cookie-consent/
|   +-- design-system/
|   +-- styles/
+-- main.tsx
```

Le module `shared/cookie-consent` gere les choix `unknown`, `accepted` et `refused`.

Le module `shared/analytics` charge Google Analytics uniquement apres acceptation. Il centralise la configuration GA4, le chargement de `gtag.js` et le suivi manuel des routes React.

## Validation avant commit

```bash
npm run lint
npm run build
```
