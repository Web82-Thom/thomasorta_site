# 03 - Database Design

## 1. Objectif

Ce document decrit la strategie de donnees prevue pour la V1 du site `thomasorta.fr`.

Decision actuelle : aucune base de donnees n'est requise pour la V1.

Cette decision simplifie le deploiement, reduit la surface de maintenance et correspond au besoin fonctionnel actuel.

---

## 2. Donnees non stockees en V1

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

Les services et realisations sont integres cote frontend sous forme de contenu statique.

Les messages de contact sont uniquement envoyes par email via Symfony Mailer.

---

## 3. Flux de donnees V1

### Formulaire de contact

```text
React ContactForm
      |
      v
POST /api/contact
      |
      v
Symfony validation
      |
      v
Symfony Mailer
      |
      v
Boite mail configuree
```

Le message n'est jamais insere en base.

### Meteo

```text
React Weather
      |
      v
GET /api/weather
      |
      v
Symfony HttpClient
      |
      v
OpenWeather
```

La cle OpenWeather reste cote backend.

---

## 4. Securite des donnees

Regles obligatoires :

* aucun secret dans Git ;
* validation backend des donnees de contact avant envoi email ;
* aucune donnee sensible inutile ;
* pas d'acces direct a une base depuis React ;
* configuration sensible stockee dans `.env.local` ou variables serveur ;
* pas de stockage local des messages de contact.

---

## 5. Evolutions possibles

Une base MySQL pourra etre ajoutee plus tard si un besoin clair apparait.

Exemples possibles :

```text
projects
articles
settings
audit_logs
```

Ces tables ne doivent pas etre creees tant que leur usage n'est pas valide.

---

## 6. Decisions validees

Pour la V1 :

* aucune table n'est necessaire ;
* aucune migration metier n'est requise ;
* les messages de contact ne sont pas stockes ;
* les messages de contact sont uniquement envoyes par email ;
* aucun systeme de blog ou CMS n'est prevu ;
* les contenus publics restent statiques cote frontend.
