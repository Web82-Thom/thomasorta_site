# 06 - Backend Architecture

## 1. Objectif

Ce document décrit l'architecture backend prévue pour la V1 du site `thomasorta.fr`.

Le backend sera développé avec Symfony.

Aucun fichier legacy de l'ancien site PHP ne sera repris.

L'ancien site sert uniquement de référence pour :

* certains contenus ;
* certaines idées fonctionnelles ;
* les informations légales utiles ;
* les paramètres à vérifier avant migration.

Le backend sera entièrement reconstruit sur une base propre, moderne et maintenable.

---

## 2. Responsabilités du backend

Le backend est responsable de :

* l'authentification administrateur ;
* la validation sécurisée des données ;
* le traitement du formulaire de contact ;
* l'envoi des emails ;
* l'accès à la base de données ;
* la protection des routes sensibles ;
* la centralisation des règles métier.

Le frontend ne doit jamais gérer une règle sensible seul.

---

## 3. Stack backend

Stack retenue :

* Symfony ;
* PHP 8.x ;
* MySQL ;
* Doctrine ORM ;
* Symfony Security ;
* Symfony Mailer ;
* Symfony Validator.
* Symfony MakerBundle en environnement de développement.

État actuel :

* Symfony 7.4 est installé.
* Doctrine ORM et Doctrine Migrations sont installés.
* Symfony Security est installé.
* Symfony Validator est installé.
* Symfony Mailer est installé.
* Symfony MakerBundle est installé en `dev`.
* Docker est désactivé dans la configuration Symfony Flex.

Le backend doit rester compatible avec un hébergement mutualisé IONOS.

Aucun VPS ni Docker ne sont prévus pour la production V1.

---

## 4. Principes d'architecture

Le backend suit une approche orientée objet.

Principes retenus :

* séparation des responsabilités ;
* controllers légers ;
* services métier dédiés ;
* entités Doctrine propres ;
* validation backend obligatoire ;
* configuration sensible hors Git ;
* aucune logique métier cachée dans les templates ;
* aucune reprise de code legacy.

---

## 5. Organisation des dossiers

Structure cible :

```text id="li18ec"
backend/
├── config/
├── migrations/
├── public/
├── src/
│   ├── Controller/
│   ├── Entity/
│   ├── Repository/
│   ├── Service/
│   ├── Dto/
│   ├── Security/
│   └── Validator/
├── templates/
├── tests/
├── .env
├── composer.json
└── symfony.lock
```

---

## 6. Dossier `Controller`

Les controllers exposent les routes API.

Ils doivent rester courts.

Responsabilités :

* recevoir la requête ;
* appeler les DTO ou validators ;
* appeler le service métier adapté ;
* retourner une réponse JSON claire.

Controllers prévus :

```text id="77ylbo"
src/Controller/
+-- HomeController.php
+-- Api/
|   +-- ContactController.php
|   +-- Admin/
|       +-- AuthController.php
|       +-- DashboardController.php
```

État actuel :

* `HomeController.php` existe et retourne une réponse JSON de santé.
* Sa route actuelle est `/`.
* Les futures routes métier devront respecter le préfixe public `/api`.
* Le contrôleur de santé pourra être déplacé vers `/api` ou `/api/health` avant la stabilisation de l'API.

Règles :

* pas de logique métier lourde dans les controllers ;
* pas de requêtes SQL directes ;
* pas de traitement email directement dans le controller ;
* pas de mot de passe manipulé en clair hors processus nécessaire.

---

## 7. Dossier `Entity`

Les entités représentent les tables de la base de données.

Entités V1 prévues :

```text id="oquexu"
src/Entity/
└── AdminUser.php
```

Responsabilités :

* représenter les données persistées ;
* définir les champs Doctrine ;
* rester simples et lisibles.

Les entités ne doivent pas devenir des classes fourre-tout.

---

## 8. Dossier `Repository`

Les repositories centralisent l'accès aux données.

Repositories prévus :

```text id="lu5jp3"
src/Repository/
└── AdminUserRepository.php
```

Responsabilités :

* requêtes de lecture spécifiques ;
* recherche d'utilisateur admin par email ;

Règles :

* éviter les requêtes dispersées dans les services ;
* ne pas placer de logique métier complexe dans les repositories.

---

## 9. Dossier `Service`

Les services contiennent la logique métier.

Services prévus :

```text id="3ofq9z"
src/Service/
├── Contact/
│   ├── ContactRequestHandler.php
│   └── ContactMailer.php
├── Admin/
│   └── AdminDashboardService.php
└── Security/
    └── AdminAuthService.php
```

Responsabilités :

* traiter un message de contact ;
* traiter une demande de contact sans stockage en base ;
* envoyer un email ;
* préparer les données du dashboard admin ;
* centraliser les actions métier.

Règles :

* un service = une responsabilité claire ;
* services testables ;
* pas de dépendance inutile au framework dans la logique métier quand ce n'est pas nécessaire.

---

## 10. Dossier `Dto`

Les DTO représentent les données entrantes ou sortantes.

DTO prévus :

```text id="ftw39d"
src/Dto/
├── Contact/
│   └── ContactRequestDto.php
└── Admin/
    └── LoginRequestDto.php
```

Objectifs :

* éviter de manipuler directement des tableaux bruts ;
* rendre les données attendues explicites ;
* faciliter la validation ;
* améliorer la lisibilité du code.

---

## 11. Dossier `Security`

Le dossier `Security` contient les éléments liés à l'authentification.

Éléments possibles :

```text id="9gchav"
src/Security/
├── AdminUserProvider.php
├── AdminAuthenticator.php
└── LoginRateLimiter.php
```

Responsabilités :

* authentifier l'administrateur ;
* protéger les routes admin ;
* gérer la session Symfony ;
* limiter les tentatives abusives si nécessaire.

---

## 12. Dossier `Validator`

Le dossier `Validator` contient les règles de validation personnalisées si nécessaire.

Exemples :

```text id="0vqdle"
src/Validator/
└── ContactRequestValidator.php
```

La validation standard Symfony doit être privilégiée lorsque c'est suffisant.

Règles :

* email valide ;
* champs obligatoires ;
* message non vide ;
* acceptation obligatoire de la transmission des informations ;
* longueur maximale des champs.

---

## 13. Authentification administrateur

La V1 conserve uniquement une authentification admin minimale.

Fonctionnement prévu :

* connexion par email et mot de passe ;
* mot de passe hashé ;
* session Symfony avec cookie HTTP ;
* accès protégé au dashboard ;
* déconnexion.

Routes concernées :

```text id="uztiw7"
/api/admin/login
/api/admin/me
/api/admin/logout
/api/admin/dashboard
```

Rôle minimum :

```text id="v8yg4n"
ROLE_ADMIN
```

Aucune gestion multi-admin avancée n'est prévue en V1.

---

## 14. Formulaire de contact

Le formulaire de contact est la fonctionnalité backend principale de la V1.

Flux attendu :

```text id="xtaasd"
React ContactForm
        │
        ▼
POST /api/contact
        │
        ▼
ContactController
        │
        ▼
ContactRequestDto + validation
        │
        ▼
ContactRequestHandler
        │
        └── envoi email via ContactMailer
```

Règles :

* validation backend obligatoire ;
* réponse JSON claire ;
* aucun stockage du message en base ;
* envoi email configuré côté serveur ;
* aucun détail technique exposé au visiteur.

---

## 15. Emails

Les emails sont envoyés via Symfony Mailer.

Service dédié :

```text id="1oo2xl"
ContactMailer
```

Responsabilités :

* construire le contenu email ;
* envoyer le message ;
* utiliser la configuration SMTP ;
* éviter les duplications.

La configuration SMTP doit être placée dans `.env.local` ou dans les variables d'environnement serveur.

---

## 16. Réponses API

Les réponses API doivent rester cohérentes.

Format succès :

```json id="i4xzyy"
{
  "success": true,
  "message": "Action réussie."
}
```

Format erreur :

```json id="zl6ww1"
{
  "success": false,
  "message": "Une erreur est survenue."
}
```

Format erreur de validation :

```json id="qx5a41"
{
  "success": false,
  "message": "Les informations envoyées sont invalides.",
  "errors": {
    "email": "L'adresse email est invalide."
  }
}
```

---

## 17. Gestion des erreurs

Règles :

* aucune stack trace affichée côté visiteur ;
* messages techniques uniquement dans les logs ;
* réponses publiques simples ;
* erreurs de validation détaillées mais non sensibles ;
* erreurs d'authentification génériques.

Exemple :

```text id="twj4gj"
Identifiants invalides.
```

Ne pas afficher :

```text id="9h6xqi"
Cet email n'existe pas.
Mot de passe incorrect.
Erreur SQL.
SMTP connection failed.
```

---

## 18. Configuration

Les informations sensibles ne doivent jamais être versionnées.

Exemples :

```text id="z9d183"
DATABASE_URL
MAILER_DSN
APP_SECRET
ADMIN_INITIAL_PASSWORD
```

Fichiers :

```text id="26itlj"
.env
.env.local
```

Règles :

* `.env` peut contenir des valeurs génériques ;
* `.env.local` ne doit pas être versionné ;
* les secrets de production sont configurés sur le serveur.

---

## 19. Tests backend

Des tests simples doivent couvrir les parties critiques.

Priorités :

* validation du formulaire de contact ;
* connexion admin ;
* refus d'accès admin non authentifié ;
* réponse du dashboard admin ;
* comportement en cas de données invalides.

Les tests n'ont pas besoin d'être complexes en V1, mais les fonctionnalités sensibles doivent être vérifiées.

---

## 20. Ce qui est interdit

Ne pas intégrer dans le backend V1 :

* ancien code PHP legacy ;
* ancien système de blog ;
* ancien CRUD articles ;
* upload de fichiers ;
* gestion APK ;
* CMS complet ;
* logique métier dans les controllers ;
* identifiants en dur ;
* mots de passe en clair ;
* accès non protégé à l'administration.

---

## 21. Compatibilité hébergement mutualisé

Le backend doit rester compatible avec IONOS mutualisé.

Contraintes :

* pas de Docker en production ;
* pas de worker obligatoire ;
* pas de Redis obligatoire ;
* pas de commande serveur permanente ;
* configuration simple ;
* dossier public exposé uniquement.

Le déploiement devra être documenté dans le fichier dédié.

---

## 22. Décisions validées

Pour la V1 :

* backend Symfony ;
* architecture POO ;
* aucun fichier legacy ;
* controllers légers ;
* services métier dédiés ;
* Doctrine ORM ;
* MySQL ;
* Symfony Security ;
* Symfony Mailer ;
* Symfony Validator ;
* authentification admin minimale ;
* formulaire de contact sécurisé ;
* hébergement mutualisé IONOS compatible.
