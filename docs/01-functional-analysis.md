# ThomasOrta.fr - Analyse fonctionnelle

## 1. Objectif du projet

Le site `thomasorta.fr` est le site professionnel de Thomas Orta.

Son objectif est de presenter son activite de developpeur Web et Mobile avec une experience moderne, claire, rapide et professionnelle.

Le site doit permettre a un futur client, partenaire ou recruteur de comprendre rapidement :

- qui est Thomas Orta ;
- quels services sont proposes ;
- quelles realisations prouvent le savoir-faire ;
- comment prendre contact.

L'ancien site PHP sert uniquement de reference pour le contenu, l'esprit general et les assets utiles. Aucun ancien code PHP ne sera reutilise dans la nouvelle base technique.

## 2. Positionnement de la V1

La V1 doit rester volontairement simple.

Le site devient une vitrine professionnelle maintenable, sans systeme de publication, sans contenu modifiable en ligne et sans back-office.

Priorites de la V1 :

- presentation claire de l'activite ;
- design responsive et credible professionnellement ;
- formulaire de contact fiable ;
- widget meteo repris dans l'esprit de l'ancien site PHP ;
- pages legales publiques ;
- base technique propre React/Vite + Symfony.

## 3. Pages publiques

### Accueil

La page d'accueil est la page principale du site.

Elle regroupe les sections suivantes :

- hero de presentation ;
- navigation vers les sections importantes ;
- presentation des services ;
- presentation des realisations ;
- widget meteo ;
- formulaire de contact ;
- footer.

### A propos

Page de presentation personnelle et professionnelle.

Elle permet d'expliquer :

- le parcours ;
- les competences ;
- l'approche de developpement ;
- la valeur proposee aux clients.

### Mentions legales

Page obligatoire contenant les informations legales du site.

### Politique de confidentialite

Page dediee a la gestion des donnees personnelles.

Elle doit expliquer simplement :

- quelles donnees sont envoyees via le formulaire de contact ;
- pourquoi elles sont collectees ;
- comment demander leur suppression ou correction ;
- qu'aucun message de contact n'est stocke en base dans la V1.

### Conditions d'utilisation et plan du site

Ces pages completent les informations legales et facilitent la navigation.

## 4. Fonctionnalites conservees

Le nouveau site conserve les elements suivants :

- menu de navigation ;
- section de presentation principale ;
- widget meteo ;
- presentation des services ;
- presentation des realisations ;
- formulaire de contact ;
- footer ;
- pages legales.

## 5. Fonctionnalites supprimees de la V1

Les fonctionnalites suivantes ne seront pas reprises dans la V1 :

- publication d'articles ;
- blog ;
- gestion de posts ;
- commentaires ;
- telechargement d'APK ;
- contenus dynamiques pilotables en ligne ;
- editeur de contenu ;
- back-office.

Ces elements pourront revenir plus tard uniquement s'ils correspondent a un vrai besoin produit.

## 6. Formulaire de contact

Le formulaire de contact est une fonctionnalite centrale de la V1.

Champs prevus :

- nom ;
- email ;
- sujet ;
- message ;
- acceptation de transmission des informations ;
- champ honeypot invisible.

Comportement attendu :

- validation cote frontend pour guider l'utilisateur ;
- validation cote backend pour securiser les donnees ;
- envoi email via Symfony ;
- message de succes apres envoi ;
- message d'erreur clair en cas d'echec ;
- protection minimale contre les abus.

Le backend ne doit jamais faire confiance uniquement a la validation frontend.

Les messages du formulaire de contact ne sont pas stockes en base dans la V1. Ils sont uniquement envoyes vers la boite mail configuree.

## 7. Architecture cible

Le projet est organise en monorepo temporaire :

```text
thomasorta_site/
+-- backend/   Symfony API
+-- frontend/  React + Vite
+-- docs/      Documentation projet
+-- README.md
```

### Frontend

Le frontend est developpe avec React et Vite.

Principes attendus :

- composants reutilisables ;
- pages claires ;
- styles organises ;
- responsive desktop, tablette et mobile ;
- pas de logique metier sensible dans le frontend.

Exemples de composants :

- `Header`;
- `Hero`;
- `ServiceCard`;
- `ProjectCard`;
- `ContactForm`;
- `Footer`.

### Backend

Le backend est developpe avec Symfony.

Responsabilites du backend :

- validation securisee du formulaire de contact ;
- envoi des emails ;
- exposition de l'API meteo ;
- protection des secrets serveur ;
- centralisation des regles sensibles.

Le backend ne doit pas exposer de secrets dans le code versionne.

## 8. Securite

Regles obligatoires :

- aucun identifiant de base de donnees dans Git ;
- aucun mot de passe ou token dans le code source ;
- configuration sensible via `.env.local` ou variables d'environnement ;
- messages d'erreur techniques non affiches aux visiteurs ;
- validation backend de toutes les donnees entrantes ;
- preparation du deploiement pour que seuls les dossiers publics necessaires soient exposes.

## 9. Contenus a migrer depuis l'ancien site

Les contenus suivants peuvent etre repris apres tri :

- textes de presentation ;
- liste des services ;
- liste des realisations ;
- images de projets ;
- mentions legales ;
- texte de protection des donnees ;
- informations de contact.

Les contenus doivent etre relus avant migration pour corriger :

- fautes ;
- formulations trop anciennes ;
- liens obsoletes ;
- images inutiles ou trop lourdes ;
- informations sensibles.

## 10. Hors perimetre V1

Ne pas developper dans la V1 :

- blog ;
- systeme de commentaires ;
- CMS complet ;
- gestion dynamique des projets ;
- upload de fichiers ;
- espace client ;
- paiement ;
- API publique complexe ;
- notifications ;
- statistiques avancees.

Ces sujets doivent rester des evolutions possibles, pas des objectifs de depart.

## 11. Criteres de validation V1

La V1 sera consideree comme prete lorsque :

- la page d'accueil est complete et responsive ;
- la page A propos est complete ;
- les pages legales sont presentes ;
- le formulaire de contact fonctionne ;
- les emails sont recus ;
- le widget meteo fonctionne sans exposer la cle API ;
- aucun secret n'est versionne ;
- le build frontend passe ;
- les tests backend principaux passent ;
- le deploiement cible est documente ;
- le site peut etre publie sans exposer les dossiers internes.

## 12. Philosophie du projet

Le projet doit rester propre, structure et evolutif.

Chaque fonctionnalite doit avoir une raison claire d'exister.

La V1 privilegie :

- la qualite ;
- la lisibilite ;
- la maintenabilite ;
- la securite ;
- la rapidite ;
- une base saine pour les prochaines versions.
