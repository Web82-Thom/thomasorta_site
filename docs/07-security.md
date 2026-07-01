# 07 - Security

## 1. Objectif

Ce document definit les regles de securite du projet `thomasorta.fr`.

L'objectif est de proteger :

* le formulaire de contact ;
* les donnees de configuration ;
* les donnees envoyees par les visiteurs ;
* les secrets serveur ;
* le deploiement sur hebergement mutualise IONOS.

La V1 reste simple, mais aucune regle de securite essentielle ne doit etre negligee.

---

## 2. Principes generaux

Regles principales :

* aucun secret dans Git ;
* aucun mot de passe en clair ;
* aucune confiance aveugle dans le frontend ;
* validation backend obligatoire ;
* messages d'erreur publics non techniques ;
* exposition minimale des fichiers serveur ;
* aucune reprise de code legacy ;
* pas de back-office en V1.

---

## 3. Secrets et configuration

Les informations sensibles doivent etre stockees hors du code versionne.

Exemples de secrets :

```text
MAILER_DSN
CONTACT_RECIPIENT_EMAIL
CONTACT_SENDER_EMAIL
APP_SECRET
OPENWEATHER_API_KEY
```

Regles :

* `.env.example` peut etre versionne avec des valeurs neutres ;
* `.env`, `.env.dev` et `.env.local` ne doivent jamais etre versionnes ;
* les secrets de production doivent etre configures sur le serveur ;
* aucun identifiant IONOS, SMTP ou MySQL ne doit apparaitre dans le depot.

Le fichier `.gitignore` doit exclure au minimum :

```text
.env
.env.dev
.env.local
.env.*.local
var/
vendor/
node_modules/
dist/
build/
```

---

## 4. Formulaire de contact

Le formulaire de contact est une zone publique, donc sensible aux abus.

Champs concernes :

```text
name
email
subject
message
consent
website
```

Regles obligatoires :

* validation frontend pour l'experience utilisateur ;
* validation backend pour la securite ;
* controle du format email ;
* champs obligatoires ;
* longueurs maximales ;
* `consent` obligatoire ;
* `website` doit rester vide pour la protection honeypot ;
* nettoyage des donnees avant traitement ;
* aucun HTML dangereux accepte dans le message ;
* reponse claire en cas d'erreur.

La validation frontend ne remplace jamais la validation backend.

---

## 5. Protection anti-spam

La V1 doit prevoir une protection simple contre les abus du formulaire.

Options possibles :

* champ honeypot invisible ;
* limitation basique par IP ;
* delai minimal avant soumission ;
* reCAPTCHA ou alternative uniquement si necessaire.

Priorite V1 :

```text
honeypot + validation backend + limitation simple
```

L'objectif est de rester leger sans complexifier inutilement le projet.

---

## 6. Donnees personnelles

Le formulaire de contact collecte des donnees personnelles.

Donnees concernees :

* nom ;
* email ;
* sujet ;
* message.

Regles :

* informer l'utilisateur via la page Politique de confidentialite ;
* demander l'acceptation avant envoi ;
* ne collecter que les donnees necessaires ;
* ne pas conserver les messages en base dans la V1 ;
* ne pas vendre ni transmettre les donnees a des tiers.

---

## 7. Base de donnees

Aucune base de donnees metier n'est requise en V1.

Regles si une base est ajoutee plus tard :

* aucun acces direct depuis React ;
* requetes via Symfony ;
* pas de requetes SQL non maitrisees ;
* identifiants stockes hors Git ;
* utilisateur MySQL avec permissions adaptees si possible.

Les messages du formulaire de contact ne sont pas stockes en base. Ils sont uniquement transmis par email.

---

## 8. Emails

Les emails sont envoyes via Symfony Mailer.

Regles :

* configuration SMTP hors Git ;
* pas de mot de passe SMTP dans le code ;
* contenu email echappe si necessaire ;
* ne pas renvoyer d'erreur SMTP detaillee au visiteur ;
* journaliser l'erreur cote serveur si necessaire.

---

## 9. Frontend

Le frontend ne doit contenir aucune information sensible.

Interdits :

* mot de passe ;
* token prive ;
* identifiant base de donnees ;
* cle SMTP ;
* secret API prive ;
* logique de securite critique seule cote frontend.

Les variables frontend doivent uniquement contenir des informations publiques.

---

## 10. Backend

Le backend centralise la securite.

Responsabilites :

* validation ;
* traitement des donnees ;
* appel aux services externes ;
* envoi email ;
* reponses API controlees.

Les controllers doivent rester simples et deleguer la logique aux services dedies.

---

## 11. Gestion des erreurs

Regles :

* pas de stack trace en production ;
* pas de message SMTP detaille cote public ;
* erreurs de validation lisibles ;
* erreurs techniques generiques.

Exemple de message public :

```json
{
  "success": false,
  "message": "Une erreur est survenue. Veuillez reessayer plus tard."
}
```

---

## 12. Deploiement securise

Sur IONOS mutualise, seuls les fichiers publics necessaires doivent etre exposes.

Regles :

* ne pas exposer `src/` ;
* ne pas exposer `vendor/` si evitable publiquement ;
* ne pas exposer `.env` ;
* ne pas exposer `.git/`;
* pointer le domaine vers le bon dossier public ;
* verifier les droits des fichiers ;
* tester les routes sensibles apres deploiement.

---

## 13. Git et versioning

Avant chaque commit :

```bash
git status
git diff --cached --check
```

Verifications :

* aucun secret ajoute ;
* aucun fichier `.env` reel ;
* aucun fichier `.env.dev` ;
* aucun fichier `.env.local` ;
* aucun dossier `node_modules` ;
* aucun dossier `vendor` si non souhaite ;
* aucun build inutile si la strategie Git l'exclut ;
* aucun fichier legacy copie par erreur.

---

## 14. Ancien site

L'ancien site PHP ne doit pas etre copie dans la nouvelle base.

Autorises :

* textes relus ;
* images triees ;
* mentions legales nettoyees ;
* informations de contact verifiees.

Interdits :

* anciens fichiers PHP ;
* anciens scripts JS ;
* vieux back-office ;
* ancien systeme de publication ;
* fichiers inconnus non verifies.

---

## 15. Criteres de validation securite V1

La securite V1 est validee lorsque :

* le formulaire de contact est valide cote backend ;
* les messages de contact ne sont pas stockes ;
* les secrets ne sont pas versionnes ;
* les erreurs techniques ne sont pas visibles publiquement ;
* la cle OpenWeather reste cote backend ;
* le domaine pointe uniquement vers les dossiers publics necessaires ;
* aucune trace du legacy sensible n'est deployee.

---

## 16. Decisions validees

Pour la V1 :

* securite centralisee cote Symfony ;
* validation backend obligatoire ;
* formulaire contact protege simplement ;
* aucun secret dans Git ;
* aucun fichier legacy ;
* pas de base de donnees metier requise ;
* deploiement compatible hebergement mutualise IONOS.
