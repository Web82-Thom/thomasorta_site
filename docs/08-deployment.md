# 08 - Deployment

## 1. Objectif

Ce document décrit la stratégie de déploiement prévue pour la V1 du site `thomasorta.fr`.

Le site sera déployé sur un hébergement mutualisé IONOS.

La V1 ne doit pas utiliser :

* VPS ;
* Docker ;
* Redis ;
* workers permanents ;
* infrastructure complexe.

L'objectif est d'obtenir un déploiement simple, fiable et maintenable.

---

## 2. Architecture de déploiement

Le projet est organisé en deux parties :

```text
thomasorta_site/
├── frontend/  React + Vite
└── backend/   Symfony
```

En production :

* le frontend React est compilé avec Vite ;
* le backend Symfony est déployé sur l'hébergement PHP ;
* MySQL est fourni par IONOS ;
* le domaine pointe uniquement vers les dossiers publics nécessaires.

---

## 3. Frontend React

Le frontend est développé dans le dossier :

```text
frontend/
```

Commande de build :

```bash
npm run build
```

Le build génère le dossier :

```text
frontend/dist/
```

Ce dossier contient les fichiers statiques à publier :

```text
index.html
assets/
```

Le contenu de `dist/` peut être transféré sur l'espace web IONOS via FileZilla.

---

## 4. Backend Symfony

Le backend est développé dans le dossier :

```text
backend/
```

En production, seul le point d'entrée public doit être exposé :

```text
backend/public/
```

Les autres dossiers Symfony ne doivent pas être accessibles publiquement :

```text
src/
config/
vendor/
var/
migrations/
.env.example
```

Le domaine ou sous-dossier doit pointer vers le bon dossier public selon la configuration IONOS.

---

## 5. Base de données MySQL

La base de données est fournie par IONOS.

À prévoir :

* création d'une base MySQL ;
* création ou récupération des identifiants ;
* configuration de `DATABASE_URL` côté serveur ;
* exécution des migrations Symfony si nécessaire ;
* vérification de la connexion backend.

Aucun identifiant MySQL ne doit être versionné dans Git.

---

## 6. Configuration serveur

Les variables sensibles doivent être configurées côté serveur.

Exemples :

```text
APP_ENV=prod
APP_SECRET=...
DATABASE_URL=...
MAILER_DSN=...
OPENWEATHER_API_KEY=...
```

Les fichiers `.env`, `.env.dev` et `.env.local` ne doivent jamais être envoyés dans Git.

Un fichier `.env.local` peut être présent uniquement sur le serveur si nécessaire.

---

## 7. Déploiement via FileZilla

Méthode V1 :

1. Builder le frontend.
2. Préparer le backend Symfony.
3. Transférer les fichiers nécessaires via FileZilla.
4. Configurer les variables serveur.
5. Importer ou migrer la base MySQL.
6. Tester le site public.
7. Tester le formulaire de contact.
8. Tester la connexion admin.
9. Vérifier que les dossiers sensibles ne sont pas exposés.

---

## 8. Organisation cible côté IONOS

Organisation retenue pour la V1 :

```text
/htdocs/
+-- index.html
+-- assets/
+-- api/
```

Règles :

* le build React est servi depuis la racine publique ;
* les routes API Symfony sont accessibles sous `/api` ;
* le point d'entrée Symfony public est relié à `/api` ;
* les dossiers internes Symfony restent hors exposition publique.

Cette stratégie permet de garder un seul domaine public :

```text
https://thomasorta.fr
https://thomasorta.fr/api
```

La règle importante reste :

```text
Seuls les fichiers publics doivent être accessibles depuis le navigateur.
```

---

## 9. Réécriture d'URL

React utilise une navigation côté client.

Il faudra prévoir une configuration de réécriture pour que les routes React fonctionnent au rechargement.

Exemples de routes concernées :

```text
/
/mentions-legales
/protection-des-donnees
/admin/login
/admin/dashboard
```

Un fichier `.htaccess` pourra être nécessaire.

Objectif :

* servir `index.html` pour les routes React ;
* laisser les routes API Symfony fonctionner normalement ;
* éviter les erreurs 404 au rechargement.

---

## 10. API Symfony

Les routes API doivent rester accessibles sous un préfixe clair :

```text
/api/contact
/api/weather
/api/admin/login
/api/admin/me
/api/admin/logout
/api/admin/dashboard
```

Le frontend devra appeler ces routes via une URL configurée proprement.

Exemple :

```text
VITE_API_BASE_URL=/api
```

Aucune URL sensible ou secrète ne doit être exposée.

---

## 11. Emails

Le formulaire de contact utilise Symfony Mailer.

À vérifier en production :

* configuration SMTP ;
* adresse expéditrice ;
* adresse destinataire ;
* délivrabilité ;
* message de succès côté frontend ;
* gestion d'erreur propre en cas d'échec.

La configuration email ne doit jamais être stockée dans le dépôt Git.

---

## 12. Checklist avant mise en ligne

Avant publication :

```text
Frontend
- npm install OK
- npm run build OK
- dist/ généré
- routes React testées

Backend
- composer install --no-dev OK
- APP_ENV=prod
- APP_SECRET configuré
- DATABASE_URL configuré
- MAILER_DSN configuré
- migrations OK
- cache Symfony prêt

Sécurité
- aucun .env, .env.dev ou .env.local dans Git
- aucun secret dans le code
- admin protégé
- formulaire validé backend
- erreurs techniques masquées
- dossiers sensibles non exposés

IONOS
- domaine pointé vers le bon dossier
- HTTPS actif
- base MySQL active
- PHP compatible Symfony
- test formulaire contact OK
```

---

## 13. Déploiement initial V1

Le premier déploiement doit rester manuel.

Objectif :

* comprendre le fonctionnement ;
* valider la structure ;
* vérifier les chemins ;
* éviter une automatisation prématurée.

Une fois le processus stabilisé, une procédure plus automatisée pourra être étudiée.

---

## 14. Rollback simple

Avant chaque mise à jour en production :

* sauvegarder les fichiers existants ;
* exporter la base MySQL si elle change ;
* conserver une copie locale du build précédent.

En cas de problème :

* remettre l'ancien dossier frontend ;
* remettre l'ancien backend ;
* restaurer la base si nécessaire.

---

## 15. Ce qui est interdit en V1

Ne pas utiliser en production V1 :

* Docker ;
* VPS ;
* Redis ;
* queue workers ;
* cron complexe ;
* CI/CD obligatoire ;
* accès SSH obligatoire ;
* ancien code PHP legacy ;
* dossiers internes exposés publiquement.

---

## 16. Critères de validation déploiement

Le déploiement est validé lorsque :

* le site public est accessible sur `thomasorta.fr` ;
* les routes React fonctionnent au rechargement ;
* le formulaire de contact fonctionne ;
* les emails sont reçus ;
* la connexion admin fonctionne ;
* le dashboard admin est protégé ;
* les pages légales sont accessibles ;
* aucun dossier sensible n'est accessible publiquement ;
* HTTPS est actif.

---

## 17. Décisions validées

Pour la V1 :

* déploiement sur IONOS mutualisé ;
* aucun VPS ;
* aucun Docker ;
* build React transféré via FileZilla ;
* backend Symfony compatible PHP mutualisé ;
* base MySQL IONOS ;
* configuration sensible hors Git ;
* déploiement manuel documenté.
