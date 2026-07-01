# 06 - Backend Architecture

## 1. Objectif

Ce document decrit l'architecture backend prevue pour la V1 du site `thomasorta.fr`.

Le backend est developpe avec Symfony.

Aucun fichier legacy de l'ancien site PHP ne sera repris.

Le backend est reconstruit sur une base propre, moderne et maintenable.

---

## 2. Responsabilites du backend

Le backend est responsable de :

* la validation securisee des donnees ;
* le traitement du formulaire de contact ;
* l'envoi des emails ;
* l'appel a OpenWeather ;
* la protection des secrets serveur ;
* la centralisation des regles sensibles.

Le frontend ne doit jamais gerer une regle sensible seul.

---

## 3. Stack backend

Stack retenue :

* Symfony ;
* PHP 8.x ;
* Symfony Mailer ;
* Symfony Validator ;
* Symfony HttpClient ;
* Symfony MakerBundle en environnement de developpement.

Etat actuel :

* Symfony 7.4 est installe.
* Symfony Validator est installe.
* Symfony Mailer est installe.
* Symfony MakerBundle est installe en `dev`.
* Docker est desactive dans la configuration Symfony Flex.
* Symfony HttpClient est installe pour les appels externes, notamment OpenWeather.

Doctrine peut rester installe techniquement, mais aucune entite metier ni migration n'est requise pour la V1.

Le backend doit rester compatible avec un hebergement mutualise IONOS.

---

## 4. Principes d'architecture

Le backend suit une approche orientee objet.

Principes retenus :

* separation des responsabilites ;
* controllers legers ;
* services metier dedies ;
* DTO explicites ;
* validation backend obligatoire ;
* configuration sensible hors Git ;
* aucune logique metier cachee dans les templates ;
* aucune reprise de code legacy.

---

## 5. Organisation des dossiers

Structure cible :

```text
backend/
├── config/
├── public/
├── src/
│   ├── Controller/
│   ├── DTO/
│   ├── Service/
│   └── Validator/
├── templates/
├── tests/
├── .env.example
├── composer.json
└── symfony.lock
```

Les dossiers `Entity`, `Repository` et `migrations` ne sont pas necessaires au metier V1 tant qu'aucune persistence n'est validee.

---

## 6. Dossier `Controller`

Les controllers exposent les routes API.

Ils doivent rester courts.

Responsabilites :

* recevoir la requete ;
* appeler les DTO ou validators ;
* appeler le service metier adapte ;
* retourner une reponse JSON claire.

Controllers actuels ou prevus :

```text
src/Controller/
+-- WeatherController.php
+-- ContactController.php
```

Etat actuel :

* `WeatherController.php` expose `GET /api/weather`.
* `ContactController.php` expose `POST /api/contact`.
* Les routes API respectent le prefixe public `/api`.

Regles :

* pas de logique metier lourde dans les controllers ;
* pas de requetes SQL directes ;
* pas de traitement email directement dans le controller ;
* pas de secret manipule en clair hors processus necessaire.

---

## 7. Dossier `DTO`

Les DTO representent les donnees entrantes ou sortantes.

DTO actuel :

```text
src/DTO/
└── ContactMessage.php
```

Objectifs :

* eviter de manipuler directement des tableaux bruts ;
* rendre les donnees attendues explicites ;
* faciliter la validation ;
* ameliorer la lisibilite du code.

---

## 8. Dossier `Service`

Les services contiennent la logique metier.

Services actuels ou prevus :

```text
src/Service/
└── Contact/
    └── ContactMailSender.php
```

Responsabilites :

* traiter une demande de contact sans stockage en base ;
* envoyer un email ;
* centraliser les actions metier.

Regles :

* un service = une responsabilite claire ;
* services testables ;
* pas de dependance inutile au framework dans la logique metier quand ce n'est pas necessaire.

---

## 9. Dossier `Validator`

Le dossier `Validator` contient les regles de validation personnalisees si necessaire.

Exemple :

```text
src/Validator/
└── ContactMessageValidator.php
```

La validation standard Symfony doit etre privilegiee lorsque c'est suffisant.

Regles :

* email valide ;
* champs obligatoires ;
* message non vide ;
* acceptation obligatoire de la transmission des informations ;
* longueur maximale des champs ;
* honeypot vide.

---

## 10. Formulaire de contact

Le formulaire de contact est la fonctionnalite backend principale de la V1.

Flux attendu :

```text
React ContactForm
        |
        v
POST /api/contact
        |
        v
ContactController
        |
        v
ContactMessage DTO + validation
        |
        v
ContactMailSender
        |
        +-- envoi email via Symfony Mailer
```

Regles :

* validation backend obligatoire ;
* reponse JSON claire ;
* aucun stockage du message en base ;
* envoi email configure cote serveur ;
* aucun detail technique expose au visiteur.

---

## 11. Emails

Les emails sont envoyes via Symfony Mailer.

Service dedie :

```text
ContactMailSender
```

Responsabilites :

* construire le contenu email ;
* envoyer le message ;
* utiliser la configuration SMTP ;
* eviter les duplications.

La configuration SMTP doit etre placee dans `.env.local` ou dans les variables d'environnement serveur.

---

## 12. Meteo

Le backend expose une route publique legere pour le widget meteo.

Route actuelle :

```http
GET /api/weather?city=Montauban
```

Responsabilites :

* lire la ville demandee ;
* appeler OpenWeather via Symfony HttpClient ;
* garder la cle `OPENWEATHER_API_KEY` cote serveur ;
* retourner une reponse JSON simple au frontend ;
* masquer les erreurs techniques externes.

Configuration :

```text
OPENWEATHER_API_KEY
```

La cle doit etre placee dans `.env.local` en developpement ou dans les variables serveur en production.

---

## 13. Reponses API

Les reponses API doivent rester coherentes.

Format succes :

```json
{
  "success": true,
  "message": "Action reussie."
}
```

Format erreur :

```json
{
  "success": false,
  "message": "Une erreur est survenue."
}
```

Format erreur de validation :

```json
{
  "success": false,
  "message": "Les informations envoyees sont invalides.",
  "errors": {
    "email": "L'adresse email est invalide."
  }
}
```

---

## 14. Gestion des erreurs

Regles :

* aucune stack trace affichee cote visiteur ;
* messages techniques uniquement dans les logs ;
* reponses publiques simples ;
* erreurs de validation detaillees mais non sensibles ;
* erreurs SMTP non exposees.

---

## 15. Configuration

Les informations sensibles ne doivent jamais etre versionnees.

Exemples :

```text
MAILER_DSN
CONTACT_RECIPIENT_EMAIL
CONTACT_SENDER_EMAIL
APP_SECRET
OPENWEATHER_API_KEY
```

Fichiers :

```text
.env.example
.env
.env.dev
.env.local
```

Regles :

* `.env.example` est le seul fichier env prevu pour etre versionne ;
* `.env`, `.env.dev` et `.env.local` ne doivent pas etre versionnes ;
* les secrets de production sont configures sur le serveur.

---

## 16. Tests backend

Des tests simples doivent couvrir les parties critiques.

Priorites :

* validation du formulaire de contact ;
* comportement en cas de donnees invalides ;
* honeypot ;
* envoi email via service dedie ;
* route meteo avec reponse controlee.

Les tests n'ont pas besoin d'etre complexes en V1, mais les fonctionnalites sensibles doivent etre verifiees.

---

## 17. Ce qui est interdit

Ne pas integrer dans le backend V1 :

* ancien code PHP legacy ;
* ancien systeme de blog ;
* ancien CRUD articles ;
* upload de fichiers ;
* gestion APK ;
* CMS complet ;
* logique metier dans les controllers ;
* identifiants en dur ;
* mots de passe en clair ;
* back-office.

---

## 18. Compatibilite hebergement mutualise

Le backend doit rester compatible avec IONOS mutualise.

Contraintes :

* pas de Docker en production ;
* pas de worker obligatoire ;
* pas de Redis obligatoire ;
* pas de commande serveur permanente ;
* configuration simple ;
* dossier public expose uniquement.

Le deploiement devra etre documente dans le fichier dedie.

---

## 19. Decisions validees

Pour la V1 :

* backend Symfony ;
* architecture POO ;
* aucun fichier legacy ;
* controllers legers ;
* services metier dedies ;
* Symfony Mailer ;
* Symfony Validator ;
* Symfony HttpClient ;
* pas de base de donnees metier requise ;
* formulaire de contact securise ;
* hebergement mutualise IONOS compatible.
