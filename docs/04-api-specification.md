# 04 - API Specification

## 1. Objectif

Ce document decrit les routes API prevues pour la V1 du site `thomasorta.fr`.

L'API est fournie par le backend Symfony.

Elle sert uniquement a :

* traiter le formulaire de contact sans stocker les messages ;
* exposer la meteo publique via Symfony sans exposer la cle OpenWeather cote frontend.

La V1 ne contient pas d'API pour blog, articles, projets, uploads, CMS ou back-office.

---

## 2. Principes generaux

L'API respecte les principes suivants :

* toutes les donnees entrantes sont validees cote backend ;
* les erreurs techniques ne sont jamais exposees au visiteur ;
* le frontend React ne communique qu'avec l'API Symfony ;
* aucune route ne donne un acces direct a une base de donnees ;
* les reponses sont retournees au format JSON.

---

## 3. Routes publiques

### 3.1 Envoyer un message de contact

```http
POST /api/contact
```

Cette route recoit les donnees du formulaire de contact.

### Donnees attendues

```json
{
  "name": "Thomas Orta",
  "email": "contact@example.com",
  "subject": "Demande de contact",
  "message": "Bonjour, je souhaite vous contacter.",
  "consent": true,
  "website": ""
}
```

### Regles de validation

* `name` obligatoire ;
* `email` obligatoire et valide ;
* `subject` obligatoire ;
* `message` obligatoire, entre 20 et 5000 caracteres ;
* `consent` doit etre egal a `true` ;
* `website` doit rester vide, champ honeypot anti-spam.

### Reponse succes

```json
{
  "success": true,
  "message": "Votre message a bien ete envoye."
}
```

### Reponse erreur de validation

```json
{
  "success": false,
  "message": "Certains champs sont invalides.",
  "errors": {
    "email": "L'adresse e-mail est invalide."
  }
}
```

### Comportement attendu

Lorsqu'un message est valide :

* le backend valide les donnees ;
* le message n'est pas enregistre en base ;
* un email est envoye a l'adresse configuree ;
* une reponse claire est renvoyee au frontend.

---

### 3.2 Lire la meteo publique

```http
GET /api/weather?city=Montauban
```

Cette route permet au frontend d'afficher le widget meteo sans exposer la cle OpenWeather dans le navigateur.

### Parametres attendus

| Parametre | Type | Obligatoire | Description |
| --- | --- | --- | --- |
| `city` | string | non | Ville demandee. Si vide ou absent, `montauban` est utilise par defaut. |

### Reponse succes

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

### Reponse ville introuvable

```json
{
  "message": "Ville introuvable."
}
```

### Regles

* la cle `OPENWEATHER_API_KEY` reste cote backend ;
* aucune cle API meteo ne doit etre presente dans React ;
* le backend retourne une reponse JSON simple ;
* les erreurs techniques OpenWeather ne sont pas exposees au visiteur.

---

## 4. Routes non prevues en V1

Les routes suivantes ne doivent pas etre creees dans la V1 :

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

Ces routes pourront etre ajoutees plus tard uniquement si un besoin clair est valide.

---

## 5. Format des reponses

Les reponses API doivent etre simples et previsibles.

### Format succes recommande

```json
{
  "success": true,
  "message": "Action reussie."
}
```

### Format erreur recommande

```json
{
  "success": false,
  "message": "Une erreur est survenue."
}
```

### Format erreur avec details de validation

```json
{
  "success": false,
  "message": "Les informations envoyees sont invalides.",
  "errors": {
    "fieldName": "Message d'erreur."
  }
}
```

---

## 6. Securite API

Regles obligatoires :

* validation backend systematique ;
* aucun secret expose dans les reponses ;
* aucun detail technique affiche cote public ;
* protection minimale contre les soumissions abusives du formulaire ;
* methode HTTP coherente avec l'action realisee.

---

## 7. Decisions validees

Pour la V1 :

* l'API est fournie par Symfony ;
* le frontend React consomme uniquement l'API Symfony ;
* le formulaire de contact passe par `POST /api/contact` ;
* le widget meteo passe par `GET /api/weather` ;
* les messages de contact ne sont jamais stockes en base ;
* aucune API blog, article, projet, upload, CMS ou back-office n'est prevue.
