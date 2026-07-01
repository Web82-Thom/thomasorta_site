# 02 - Architecture technique

## 1. Objectif

Ce document decrit l'architecture technique retenue pour le projet.

L'objectif est de construire une base moderne, claire, maintenable et evolutive, tout en restant compatible avec un hebergement mutualise IONOS.

---

## 2. Principes d'architecture

Le projet repose sur une separation stricte entre :

* le frontend ;
* le backend ;
* la documentation.

Chaque partie possede une responsabilite clairement definie.

Le frontend ne contient aucune logique metier sensible.

Le backend centralise la validation, les appels externes, l'envoi email et la protection des secrets serveur.

---

## 3. Organisation generale

Le projet est organise sous la forme d'un monorepo.

```text
thomasorta_site/
├── backend/
├── frontend/
├── docs/
└── README.md
```

Chaque dossier est independant.

Le frontend et le backend peuvent etre developpes, testes et deployes separement.

Etat actuel :

* `backend/` contient un projet Symfony installe.
* `frontend/` contient un projet React/Vite installe.
* `docs/` contient la documentation fonctionnelle et technique.

---

## 4. Frontend

Le frontend est une application React.

Responsabilites :

* affichage de l'interface utilisateur ;
* navigation ;
* responsive design ;
* appels vers l'API Symfony ;
* validation utilisateur simple ;
* experience utilisateur.

Etat actuel :

* React 19 est installe.
* Vite est installe.
* TypeScript est installe.
* React Router est installe.
* Les routes publiques principales sont branchees.

Le frontend ne doit jamais :

* acceder directement a une base de donnees ;
* contenir des mots de passe ;
* contenir de cles privees ;
* implementer des regles metier critiques seul.

---

## 5. Backend

Le backend est developpe avec Symfony.

Responsabilites :

* validation complete des donnees ;
* traitement du formulaire de contact ;
* envoi des emails ;
* exposition des routes API publiques ;
* appel a OpenWeather sans exposer la cle au frontend ;
* securite des secrets serveur.

Etat actuel :

* Symfony 7.4 est installe.
* Validator, Mailer et HttpClient sont disponibles.
* `GET /api/weather` expose le widget meteo.
* `POST /api/contact` traite le formulaire de contact.
* Les routes API finales sont exposees sous `/api`.

---

## 6. Base de donnees

Aucune base de donnees n'est requise pour la V1.

Raisons :

* les messages de contact ne sont pas stockes ;
* les services et realisations sont statiques cote React ;
* les pages legales sont statiques ;
* aucun back-office n'est prevu.

MySQL pourra etre ajoute plus tard uniquement si un besoin fonctionnel clair justifie du contenu persistant.

---

## 7. Communication

Le frontend communique uniquement avec le backend.

En production, les routes backend Symfony sont exposees sous le prefixe public `/api`.

Architecture logique :

```text
Navigateur
      |
      v
React
      |
      v
API Symfony
      |
      v
Services externes / email
```

Toutes les validations importantes sont realisees cote backend.

---

## 8. Gestion des ressources

Les ressources statiques comprennent notamment :

* images ;
* icones ;
* logos ;
* illustrations.

Les contenus publics sont conserves dans le projet React.

Les futurs medias devront etre organises de maniere coherente.

---

## 9. Configuration

La configuration est separee du code.

Exemples :

* parametres SMTP ;
* cle OpenWeather ;
* secret Symfony ;
* variables d'environnement.

Aucune information sensible ne doit etre versionnee dans Git.

---

## 10. Deploiement

Le projet est destine a etre deploye sur un hebergement mutualise IONOS.

Choix retenus :

* pas de VPS ;
* pas de Docker ;
* frontend compile avant publication ;
* backend Symfony heberge sur le serveur PHP ;
* API Symfony exposee publiquement sous `/api`.

Cette architecture reste simple a maintenir tout en etant suffisamment evolutive.

---

## 11. Evolutivite

L'architecture doit permettre d'ajouter facilement :

* de nouvelles pages ;
* de nouveaux composants React ;
* de nouvelles routes API ;
* d'autres services metier ;
* une persistence de donnees future si un besoin est valide.

Ces evolutions devront respecter l'organisation existante afin de conserver un projet lisible.

---

## 12. Principes de developpement

Les developpements respecteront les principes suivants :

* responsabilite unique ;
* separation des responsabilites ;
* reutilisation des composants ;
* lisibilite du code ;
* simplicite avant complexite ;
* documentation systematique des choix importants.

---

## 13. Decisions validees

Architecture retenue :

* Monorepo.
* Frontend React + Vite.
* Backend Symfony.
* API REST publique limitee.
* Prefixe public API : `/api`.
* Pas de base de donnees requise en V1.
* Hebergement mutualise IONOS.
* Aucun VPS.
* Aucun Docker en production.

Cette architecture constitue la base technique de la V1 du projet.
