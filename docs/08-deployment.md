# 08 - Deployment

## 1. Objectif

Ce document decrit la strategie de deploiement prevue pour la V1 du site `thomasorta.fr`.

Le site sera deploye sur un hebergement mutualise IONOS.

La V1 ne doit pas utiliser :

* VPS ;
* Docker ;
* Redis ;
* workers permanents ;
* infrastructure complexe.

L'objectif est d'obtenir un deploiement simple, fiable et maintenable.

---

## 2. Architecture de deploiement

Le projet est organise en deux parties :

```text
thomasorta_site/
├── frontend/  React + Vite
└── backend/   Symfony
```

En production :

* le frontend React est compile avec Vite ;
* le backend Symfony est deploye sur l'hebergement PHP ;
* les routes API sont exposees sous `/api` ;
* le domaine pointe uniquement vers les dossiers publics necessaires.

---

## 3. Frontend React

Le frontend est developpe dans le dossier :

```text
frontend/
```

Commande de build :

```bash
npm run build
```

Le build genere le dossier :

```text
frontend/dist/
```

Ce dossier contient les fichiers statiques a publier :

```text
index.html
assets/
```

Le contenu de `dist/` peut etre transfere sur l'espace web IONOS via FileZilla.

---

## 4. Backend Symfony

Le backend est developpe dans le dossier :

```text
backend/
```

En production, seul le point d'entree public doit etre expose :

```text
backend/public/
```

Les autres dossiers Symfony ne doivent pas etre accessibles publiquement :

```text
src/
config/
vendor/
var/
.env.example
```

Le domaine ou sous-dossier doit pointer vers le bon dossier public selon la configuration IONOS.

---

## 5. Base de donnees

Aucune base de donnees n'est requise pour la V1.

Aucune migration metier n'est a executer tant qu'aucune fonctionnalite persistante n'est validee.

Si une base MySQL est ajoutee plus tard, ses identifiants devront rester hors Git et etre configures cote serveur.

---

## 6. Configuration serveur

Les variables sensibles doivent etre configurees cote serveur.

Exemples :

```text
APP_ENV=prod
APP_SECRET=...
MAILER_DSN=...
CONTACT_RECIPIENT_EMAIL=...
CONTACT_SENDER_EMAIL=...
OPENWEATHER_API_KEY=...
```

Les fichiers `.env`, `.env.dev` et `.env.local` ne doivent jamais etre envoyes dans Git.

Un fichier `.env.local` peut etre present uniquement sur le serveur si necessaire.

---

## 7. Deploiement via FileZilla

Methode V1 :

1. Builder le frontend.
2. Preparer le backend Symfony.
3. Transferer les fichiers necessaires via FileZilla.
4. Configurer les variables serveur.
5. Tester le site public.
6. Tester le formulaire de contact.
7. Tester le widget meteo.
8. Verifier que les dossiers sensibles ne sont pas exposes.

---

## 8. Organisation cible cote IONOS

Organisation retenue pour la V1 :

```text
/htdocs/
+-- index.html
+-- assets/
+-- api/
```

Regles :

* le build React est servi depuis la racine publique ;
* les routes API Symfony sont accessibles sous `/api` ;
* le point d'entree Symfony public est relie a `/api` ;
* les dossiers internes Symfony restent hors exposition publique.

Cette strategie permet de garder un seul domaine public :

```text
https://thomasorta.fr
https://thomasorta.fr/api
```

La regle importante reste :

```text
Seuls les fichiers publics doivent etre accessibles depuis le navigateur.
```

---

## 9. Reecriture d'URL

React utilise une navigation cote client.

Il faudra prevoir une configuration de reecriture pour que les routes React fonctionnent au rechargement.

Exemples de routes concernees :

```text
/
/a-propos
/mentions-legales
/politique-confidentialite
/conditions-utilisation
/plan-du-site
```

Un fichier `.htaccess` pourra etre necessaire.

Objectif :

* servir `index.html` pour les routes React ;
* laisser les routes API Symfony fonctionner normalement ;
* eviter les erreurs 404 au rechargement.

---

## 10. API Symfony

Les routes API doivent rester accessibles sous un prefixe clair :

```text
/api/contact
/api/weather
```

Le frontend devra appeler ces routes via une URL configuree proprement.

Exemple :

```text
VITE_API_BASE_URL=/api
```

Aucune URL sensible ou secrete ne doit etre exposee.

---

## 11. Emails

Le formulaire de contact utilise Symfony Mailer.

A verifier en production :

* configuration SMTP ;
* adresse expeditrice ;
* adresse destinataire ;
* delivrabilite ;
* message de succes cote frontend ;
* gestion d'erreur propre en cas d'echec.

La configuration email ne doit jamais etre stockee dans le depot Git.

---

## 12. Checklist avant mise en ligne

Avant publication :

```text
Frontend
- npm install OK
- npm run build OK
- dist/ genere
- routes React testees

Backend
- composer install --no-dev OK
- APP_ENV=prod
- APP_SECRET configure
- MAILER_DSN configure
- OPENWEATHER_API_KEY configure
- cache Symfony pret

Securite
- aucun .env, .env.dev ou .env.local dans Git
- aucun secret dans le code
- formulaire valide backend
- erreurs techniques masquees
- dossiers sensibles non exposes

IONOS
- domaine pointe vers le bon dossier
- HTTPS actif
- PHP compatible Symfony
- test formulaire contact OK
- test meteo OK
```

---

## 13. Deploiement initial V1

Le premier deploiement doit rester manuel.

Objectif :

* comprendre le fonctionnement ;
* valider la structure ;
* verifier les chemins ;
* eviter une automatisation prematuree.

Une fois le processus stabilise, une procedure plus automatisee pourra etre etudiee.

---

## 14. Rollback simple

Avant chaque mise a jour en production :

* sauvegarder les fichiers existants ;
* conserver une copie locale du build precedent ;
* sauvegarder la configuration serveur si elle change.

En cas de probleme :

* remettre l'ancien dossier frontend ;
* remettre l'ancien backend ;
* restaurer la configuration si necessaire.

---

## 15. Ce qui est interdit en V1

Ne pas utiliser en production V1 :

* Docker ;
* VPS ;
* Redis ;
* queue workers ;
* cron complexe ;
* CI/CD obligatoire ;
* acces SSH obligatoire ;
* ancien code PHP legacy ;
* dossiers internes exposes publiquement.

---

## 16. Criteres de validation deploiement

Le deploiement est valide lorsque :

* le site public est accessible sur `thomasorta.fr` ;
* les routes React fonctionnent au rechargement ;
* le formulaire de contact fonctionne ;
* les emails sont recus ;
* le widget meteo fonctionne ;
* les pages legales sont accessibles ;
* aucun dossier sensible n'est accessible publiquement ;
* HTTPS est actif.

---

## 17. Decisions validees

Pour la V1 :

* deploiement sur IONOS mutualise ;
* aucun VPS ;
* aucun Docker ;
* build React transfere via FileZilla ;
* backend Symfony compatible PHP mutualise ;
* pas de base de donnees requise en V1 ;
* configuration sensible hors Git ;
* deploiement manuel documente.
