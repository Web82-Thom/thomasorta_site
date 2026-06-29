# 02 - Architecture technique

## 1. Objectif

Ce document décrit l'architecture technique retenue pour le projet.

L'objectif est de construire une base moderne, claire, maintenable et évolutive, tout en restant compatible avec un hébergement mutualisé IONOS.

---

# 2. Principes d'architecture

Le projet repose sur une séparation stricte entre :

* le frontend ;
* le backend ;
* la documentation.

Chaque partie possède une responsabilité clairement définie.

Le frontend ne contient aucune logique métier sensible.

Le backend centralise les règles métier, la sécurité et les échanges avec la base de données.

---

# 3. Organisation générale

Le projet est organisé sous la forme d'un monorepo.

```text
thomasorta_site/
│
├── backend/
│
├── frontend/
│
├── docs/
│
└── README.md
```

Chaque dossier est indépendant.

Le frontend et le backend peuvent être développés, testés et déployés séparément.

---

# 4. Frontend

Le frontend est une application React.

Responsabilités :

* affichage de l'interface utilisateur ;
* navigation ;
* responsive design ;
* appels vers l'API Symfony ;
* validation utilisateur simple ;
* expérience utilisateur.

Le frontend ne doit jamais :

* accéder directement à la base de données ;
* contenir des mots de passe ;
* contenir de clés privées ;
* implémenter des règles métier critiques.

---

# 5. Backend

Le backend est développé avec Symfony.

Responsabilités :

* authentification administrateur ;
* validation complète des données ;
* traitement du formulaire de contact ;
* envoi des emails ;
* exposition d'API REST ;
* sécurité.

Le backend représente l'unique point d'accès aux données sensibles.

---

# 6. Base de données

La base de données est utilisée uniquement par Symfony.

Le frontend ne communique jamais directement avec MySQL.

Toutes les opérations passent par l'API.

---

# 7. Communication

Le frontend communique uniquement avec le backend.

En production, les routes backend Symfony sont exposees sous le prefixe public `/api`.

Architecture logique :

```text
Navigateur
      │
      ▼
React
      │
      ▼
API Symfony
      │
      ▼
MySQL
```

Toutes les validations importantes sont réalisées côté backend.

---

# 8. Gestion des ressources

Les ressources statiques comprennent notamment :

* images ;
* icônes ;
* logos ;
* illustrations.

Les contenus légaux sont conservés dans le projet.

Les futurs médias devront être organisés de manière cohérente.

---

# 9. Configuration

La configuration est séparée du code.

Exemples :

* connexion base de données ;
* paramètres SMTP ;
* variables d'environnement.

Aucune information sensible ne doit être versionnée dans Git.

---

# 10. Déploiement

Le projet est destiné à être déployé sur un hébergement mutualisé IONOS.

Choix retenus :

* pas de VPS ;
* pas de Docker ;
* frontend compilé avant publication ;
* backend Symfony hébergé sur le serveur PHP ;
* API Symfony exposée publiquement sous `/api`.

Cette architecture reste simple à maintenir tout en étant suffisamment évolutive.

---

# 11. Évolutivité

L'architecture doit permettre d'ajouter facilement :

* de nouvelles pages ;
* de nouveaux composants React ;
* de nouvelles routes API ;
* des fonctionnalités administrateur ;
* d'autres services métier.

Ces évolutions devront respecter l'organisation existante afin de conserver un projet lisible.

---

# 12. Principes de développement

Les développements respecteront les principes suivants :

* responsabilité unique ;
* séparation des responsabilités ;
* réutilisation des composants ;
* lisibilité du code ;
* simplicité avant complexité ;
* documentation systématique des choix importants.

---

# 13. Décisions validées

Architecture retenue :

* Monorepo.
* Frontend React + Vite.
* Backend Symfony.
* API REST.
* Préfixe public API : `/api`.
* Base de données MySQL.
* Hébergement mutualisé IONOS.
* Aucun VPS.
* Aucun Docker en production.

Cette architecture constitue la base technique de la V1 du projet.
