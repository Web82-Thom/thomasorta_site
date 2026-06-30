# 04 - API Specification

## 1. Objectif

Ce document décrit les routes API prévues pour la V1 du site `thomasorta.fr`.

L'API est fournie par le backend Symfony.

Elle sert uniquement à :

* gérer l'authentification administrateur ;
* traiter le formulaire de contact sans stocker les messages ;
* exposer la météo publique via Symfony sans exposer la clé OpenWeather côté frontend ;
* permettre l'accès minimal à la page admin.

La V1 ne contient pas d'API pour blog, articles, projets, uploads ou CMS.

---

## 2. Principes généraux

L'API respecte les principes suivants :

* toutes les routes sensibles sont protégées ;
* toutes les données entrantes sont validées côté backend ;
* les erreurs techniques ne sont jamais exposées au visiteur ;
* le frontend React ne communique qu'avec l'API Symfony ;
* aucune route ne donne un accès direct à la base de données ;
* les réponses sont retournées au format JSON.

---

## 3. Routes publiques

### 3.1 Envoyer un message de contact

```http
POST /api/contact
```

Cette route reçoit les données du formulaire de contact.

### Données attendues

```json
{
  "firstName": "Thomas",
  "lastName": "Orta",
  "email": "contact@example.com",
  "subject": "Demande de contact",
  "message": "Bonjour, je souhaite vous contacter.",
  "privacyAccepted": true
}
```

### Règles de validation

* `firstName` obligatoire ;
* `lastName` obligatoire ;
* `email` obligatoire et valide ;
* `subject` obligatoire ;
* `message` obligatoire ;
* `privacyAccepted` doit être égal à `true`.

### Réponse succès

```json
{
  "success": true,
  "message": "Votre message a bien été envoyé."
}
```

### Réponse erreur de validation

```json
{
  "success": false,
  "message": "Les informations envoyées sont invalides.",
  "errors": {
    "email": "L'adresse email est invalide."
  }
}
```

### Comportement attendu

Lorsqu'un message est valide :

* le backend valide les données ;
* le message n'est pas enregistré en base ;
* un email est envoyé à l'adresse configurée ;
* une réponse claire est renvoyée au frontend.

---

### 3.2 Lire la météo publique

```http
GET /api/weather?city=Montauban
```

Cette route permet au frontend d'afficher le widget météo sans exposer la clé OpenWeather dans le navigateur.

### Paramètres attendus

| Paramètre | Type | Obligatoire | Description |
| --- | --- | --- | --- |
| `city` | string | non | Ville demandée. Si vide ou absent, `montauban` est utilisé par défaut. |

### Réponse succès

```json
{
  "city": "Montauban",
  "description": "partiellement nuageux",
  "temperature": 30,
  "temperatureMin": 30,
  "temperatureMax": 30,
  "icon": "03d",
  "iconUrl": "https://openweathermap.org/img/wn/03d@2x.png"
}
```

### Réponse ville introuvable

```json
{
  "message": "Ville introuvable."
}
```

### Règles

* la clé `OPENWEATHER_API_KEY` reste côté backend ;
* aucune clé API météo ne doit être présente dans React ;
* le backend retourne une réponse JSON simple ;
* les erreurs techniques OpenWeather ne sont pas exposées au visiteur.

---

## 4. Routes d'authentification administrateur

### 4.1 Connexion administrateur

```http
POST /api/admin/login
```

Cette route permet à l'administrateur de se connecter avec email et mot de passe.

L'authentification V1 repose sur une session Symfony avec cookie HTTP, comme l'ancien site PHP dans son principe de session serveur.

Aucun JWT n'est prévu en V1.

### Données attendues

```json
{
  "email": "admin@example.com",
  "password": "mot-de-passe"
}
```

### Réponse succès

```json
{
  "success": true,
  "user": {
    "email": "admin@example.com",
    "roles": ["ROLE_ADMIN"]
  }
}
```

### Réponse erreur

```json
{
  "success": false,
  "message": "Identifiants invalides."
}
```

### Règles

* ne jamais indiquer si l'email ou le mot de passe est incorrect séparément ;
* limiter les informations retournées ;
* ne jamais retourner le hash du mot de passe ;
* protéger la route contre les abus si nécessaire.

---

### 4.2 Vérifier la session administrateur

```http
GET /api/admin/me
```

Cette route permet au frontend de savoir si l'administrateur est connecté.

### Réponse connecté

```json
{
  "authenticated": true,
  "user": {
    "email": "admin@example.com",
    "roles": ["ROLE_ADMIN"]
  }
}
```

### Réponse non connecté

```json
{
  "authenticated": false
}
```

---

### 4.3 Déconnexion administrateur

```http
POST /api/admin/logout
```

Cette route permet de fermer la session administrateur.

### Réponse succès

```json
{
  "success": true,
  "message": "Déconnexion réussie."
}
```

---

## 5. Routes administrateur protégées

### 5.1 Accès au tableau de bord admin

```http
GET /api/admin/dashboard
```

Cette route est protégée.

Elle retourne uniquement le contenu minimal du dashboard.

### Réponse succès

```json
{
  "message": "Réfléchis et pose tes idées."
}
```

### Règles

* route accessible uniquement à un utilisateur authentifié ;
* rôle minimum requis : `ROLE_ADMIN`.

---

## 6. Routes non prévues en V1

Les routes suivantes ne doivent pas être créées dans la V1 :

```text
/api/articles
/api/posts
/api/projects
/api/uploads
/api/comments
/api/settings
/api/apk
/api/newsletter
```

Ces routes pourront être ajoutées plus tard uniquement si un besoin clair est validé.

---

## 7. Format des réponses

Les réponses API doivent être simples et prévisibles.

### Format succès recommandé

```json
{
  "success": true,
  "message": "Action réussie."
}
```

### Format erreur recommandé

```json
{
  "success": false,
  "message": "Une erreur est survenue."
}
```

### Format erreur avec détails de validation

```json
{
  "success": false,
  "message": "Les informations envoyées sont invalides.",
  "errors": {
    "fieldName": "Message d'erreur."
  }
}
```

---

## 8. Sécurité API

Règles obligatoires :

* validation backend systématique ;
* routes admin protégées ;
* aucun secret exposé dans les réponses ;
* aucun détail technique affiché côté public ;
* messages d'erreur génériques pour l'authentification ;
* protection minimale contre les soumissions abusives du formulaire ;
* méthode HTTP cohérente avec l'action réalisée.

---

## 9. Décisions validées

Pour la V1 :

* l'API est fournie par Symfony ;
* le frontend React consomme uniquement l'API Symfony ;
* le formulaire de contact passe par `POST /api/contact` ;
* le widget météo passe par `GET /api/weather` ;
* l'administration utilise une authentification Symfony ;
* l'authentification admin repose sur une session Symfony ;
* le dashboard admin reste minimal ;
* les messages de contact ne sont jamais stockés en base ;
* aucune API blog, article, projet, upload ou CMS n'est prévue.
