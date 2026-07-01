# 07 - Security

## 1. Objectif

Ce document définit les règles de sécurité du projet `thomasorta.fr`.

L'objectif est de protéger :

* l'espace administrateur ;
* le formulaire de contact ;
* les données de configuration ;
* les données envoyées par les visiteurs ;
* le déploiement sur hébergement mutualisé IONOS.

La V1 reste simple, mais aucune règle de sécurité essentielle ne doit être négligée.

---

## 2. Principes généraux

Règles principales :

* aucun secret dans Git ;
* aucun mot de passe en clair ;
* aucune confiance aveugle dans le frontend ;
* validation backend obligatoire ;
* routes administrateur protégées ;
* messages d'erreur publics non techniques ;
* exposition minimale des fichiers serveur ;
* aucune reprise de code legacy.

---

## 3. Secrets et configuration

Les informations sensibles doivent être stockées hors du code versionné.

Exemples de secrets :

```text
DATABASE_URL
MAILER_DSN
APP_SECRET
ADMIN_INITIAL_PASSWORD
OPENWEATHER_API_KEY
```

Règles :

* `.env.example` peut être versionné avec des valeurs neutres ;
* `.env`, `.env.dev` et `.env.local` ne doivent jamais être versionnés ;
* les secrets de production doivent être configurés sur le serveur ;
* aucun identifiant IONOS, SMTP ou MySQL ne doit apparaître dans le dépôt.

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

## 4. Authentification administrateur

L'espace administrateur est protégé par email et mot de passe.

Règles :

* mot de passe hashé avec Symfony ;
* aucun mot de passe stocké en clair ;
* rôle minimum : `ROLE_ADMIN` ;
* route dashboard inaccessible sans authentification ;
* déconnexion disponible ;
* erreurs de connexion génériques.

Message d'erreur autorisé :

```text
Identifiants invalides.
```

Messages interdits :

```text
Email inconnu.
Mot de passe incorrect.
Utilisateur inexistant.
```

Ces messages ne doivent pas aider un attaquant à deviner les comptes existants.

---

## 5. Protection des routes admin

Routes concernées :

```text
/api/admin/login
/api/admin/me
/api/admin/logout
/api/admin/dashboard
/admin/login
/admin/dashboard
```

Règles :

* `/admin/login` est public ;
* `/admin/dashboard` est protégé côté frontend ;
* `/api/admin/dashboard` est protégé côté backend ;
* la sécurité backend reste prioritaire ;
* le frontend ne doit jamais être considéré comme une barrière suffisante.

Si un utilisateur non connecté tente d'accéder au dashboard, il doit être redirigé vers la page de connexion.

---

## 6. Formulaire de contact

Le formulaire de contact est une zone publique, donc sensible aux abus.

Champs concernés :

```text
name
email
subject
message
consent
website
```

Règles obligatoires :

* validation frontend pour l'expérience utilisateur ;
* validation backend pour la sécurité ;
* contrôle du format email ;
* champs obligatoires ;
* longueurs maximales ;
* `consent` obligatoire ;
* `website` doit rester vide pour la protection honeypot ;
* nettoyage des données avant traitement ;
* aucun HTML dangereux accepté dans le message ;
* réponse claire en cas d'erreur.

La validation frontend ne remplace jamais la validation backend.

---

## 7. Protection anti-spam

La V1 doit prévoir une protection simple contre les abus du formulaire.

Options possibles :

* champ honeypot invisible ;
* limitation basique par IP ;
* délai minimal avant soumission ;
* reCAPTCHA ou alternative uniquement si nécessaire.

Priorité V1 :

```text
honeypot + validation backend + limitation simple
```

L'objectif est de rester léger sans complexifier inutilement le projet.

---

## 8. Données personnelles

Le formulaire de contact collecte des données personnelles.

Données concernées :

* prénom ;
* nom ;
* email ;
* sujet ;
* message.

Règles :

* informer l'utilisateur via la page Protection des données ;
* demander l'acceptation avant envoi ;
* ne collecter que les données nécessaires ;
* ne pas conserver les messages en base dans la V1 ;
* ne pas vendre ni transmettre les données à des tiers.

---

## 9. Base de données

La base MySQL est accessible uniquement par Symfony.

Règles :

* aucun accès direct depuis React ;
* requêtes via Doctrine ;
* pas de requêtes SQL non maîtrisées ;
* identifiants stockés hors Git ;
* utilisateur MySQL avec permissions adaptées si possible.

Tables concernées en V1 :

```text
admin_users
```

Les messages du formulaire de contact ne sont pas stockés en base. Ils sont uniquement transmis par email.

---

## 10. Emails

Les emails sont envoyés via Symfony Mailer.

Règles :

* configuration SMTP hors Git ;
* pas de mot de passe SMTP dans le code ;
* contenu email échappé si nécessaire ;
* ne pas renvoyer d'erreur SMTP détaillée au visiteur ;
* journaliser l'erreur côté serveur si nécessaire.

---

## 11. Frontend

Le frontend ne doit contenir aucune information sensible.

Interdits :

* mot de passe ;
* token privé ;
* identifiant base de données ;
* clé SMTP ;
* secret API privé ;
* logique de sécurité critique seule côté frontend.

Les variables frontend doivent uniquement contenir des informations publiques.

---

## 12. Backend

Le backend centralise la sécurité.

Responsabilités :

* validation ;
* authentification ;
* autorisation ;
* traitement des données ;
* accès base de données ;
* envoi email ;
* réponses API contrôlées.

Les controllers doivent rester simples et déléguer la logique aux services dédiés.

---

## 13. Gestion des erreurs

Règles :

* pas de stack trace en production ;
* pas de message SQL affiché ;
* pas de message SMTP détaillé côté public ;
* erreurs de validation lisibles ;
* erreurs techniques génériques.

Exemple de message public :

```json
{
  "success": false,
  "message": "Une erreur est survenue. Veuillez réessayer plus tard."
}
```

---

## 14. Déploiement sécurisé

Sur IONOS mutualisé, seul le dossier public nécessaire doit être exposé.

Règles :

* ne pas exposer `src/` ;
* ne pas exposer `vendor/` si évitable publiquement ;
* ne pas exposer `.env` ;
* ne pas exposer `.git/`;
* pointer le domaine vers le bon dossier public ;
* vérifier les droits des fichiers ;
* tester les routes sensibles après déploiement.

---

## 15. Git et versioning

Avant chaque commit :

```bash
git status
git diff --cached --check
```

Vérifications :

* aucun secret ajouté ;
* aucun fichier `.env` réel ;
* aucun fichier `.env.dev` ;
* aucun fichier `.env.local` ;
* aucun dossier `node_modules` ;
* aucun dossier `vendor` si non souhaité ;
* aucun build inutile si la stratégie Git l'exclut ;
* aucun fichier legacy copié par erreur.

---

## 16. Ancien site

L'ancien site PHP ne doit pas être copié dans la nouvelle base.

Autorisés :

* textes relus ;
* images triées ;
* mentions légales nettoyées ;
* informations de contact vérifiées.

Interdits :

* anciens fichiers PHP ;
* anciens scripts JS ;
* vieux back-office ;
* ancien système de publication ;
* fichiers inconnus non vérifiés.

---

## 17. Critères de validation sécurité V1

La sécurité V1 est validée lorsque :

* l'admin nécessite une authentification ;
* le dashboard admin est protégé côté backend ;
* les mots de passe sont hashés ;
* le formulaire de contact est validé côté backend ;
* les secrets ne sont pas versionnés ;
* les erreurs techniques ne sont pas visibles publiquement ;
* le domaine pointe uniquement vers les dossiers publics nécessaires ;
* aucune trace du legacy sensible n'est déployée.

---

## 18. Décisions validées

Pour la V1 :

* sécurité centralisée côté Symfony ;
* authentification admin minimale ;
* validation backend obligatoire ;
* formulaire contact protégé simplement ;
* aucun secret dans Git ;
* aucun fichier legacy ;
* aucun accès direct MySQL depuis React ;
* déploiement compatible hébergement mutualisé IONOS.
