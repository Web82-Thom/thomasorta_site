# 03 - Database Design

## 1. Objectif

Ce document decrit la base de donnees prevue pour la V1 du site `thomasorta.fr`.

La V1 reste volontairement simple.

La base de donnees sert uniquement a gerer l'administrateur.

Les messages envoyes depuis le formulaire de contact ne sont pas stockes en base. Ils sont uniquement transmis par email a la boite mail configuree.

Aucun blog, article, projet dynamique, upload, historique de messages ou CMS n'est prevu dans la V1.

---

## 2. Choix de base de donnees

La base de donnees retenue est MySQL.

Elle sera utilisee uniquement par le backend Symfony.

Le frontend React ne communique jamais directement avec la base de donnees.

Tous les echanges passent obligatoirement par l'API Symfony.

---

## 3. Table prevue

Pour la V1, une seule table est necessaire :

```text
admin_users
```

---

## 4. Table `admin_users`

La table `admin_users` stocke les comptes autorises a acceder a l'espace administrateur.

### Champs

```text
id
email
password_hash
roles
created_at
updated_at
```

### Description des champs

| Champ           | Type logique | Description                            |
| --------------- | ------------ | -------------------------------------- |
| `id`            | integer      | Identifiant unique de l'administrateur |
| `email`         | string       | Email utilise pour la connexion        |
| `password_hash` | string       | Mot de passe hashe                     |
| `roles`         | json/string  | Roles de l'utilisateur                 |
| `created_at`    | datetime     | Date de creation du compte             |
| `updated_at`    | datetime     | Date de derniere modification          |

### Regles

* L'email doit etre unique.
* Le mot de passe ne doit jamais etre stocke en clair.
* Le champ `password_hash` contient uniquement le hash genere par Symfony.
* Un administrateur possede au minimum le role `ROLE_ADMIN`.

---

## 5. Donnees non stockees en V1

Les elements suivants ne sont pas stockes en base dans la V1 :

* messages du formulaire de contact ;
* articles ;
* posts ;
* blog ;
* realisations ;
* services ;
* fichiers APK ;
* images uploadees ;
* commentaires ;
* statistiques avancees ;
* preferences utilisateur.

Les services et realisations seront integres cote frontend sous forme de contenu statique.

Les messages de contact seront uniquement envoyes par email via Symfony Mailer.

---

## 6. Securite des donnees

Regles obligatoires :

* aucun mot de passe en clair ;
* hash des mots de passe avec le systeme Symfony ;
* validation backend des donnees de contact avant envoi email ;
* aucune donnee sensible inutile ;
* pas d'acces direct a MySQL depuis React ;
* routes d'administration protegees ;
* configuration de connexion stockee dans `.env.local` ou variables serveur.

---

## 7. Schema logique

```text
admin_users

id
email
password_hash
roles
created_at
updated_at
```

Aucune relation complexe n'est necessaire pour la V1.

---

## 8. Evolutions possibles

La base pourra evoluer plus tard avec de nouvelles tables si un besoin clair apparait.

Exemples possibles :

```text
admin_notes
ideas
projects
articles
settings
```

Ces tables ne doivent pas etre creees tant que leur usage n'est pas valide.

---

## 9. Decisions validees

Pour la V1 :

* MySQL est utilise comme base de donnees.
* Symfony est le seul backend autorise a acceder a MySQL.
* React ne communique jamais directement avec MySQL.
* Seule la table `admin_users` est necessaire.
* Les messages de contact ne sont pas stockes.
* Les messages de contact sont uniquement envoyes par email.
* Aucun systeme de blog ou CMS n'est prevu.
* Les contenus publics restent statiques cote frontend.
