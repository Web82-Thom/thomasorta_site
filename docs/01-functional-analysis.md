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

Le site devient une vitrine professionnelle maintenable, sans systeme de publication ni contenu administrable complexe.

Priorites de la V1 :

- presentation claire de l'activite ;
- design responsive et credible professionnellement ;
- formulaire de contact fiable ;
- base technique propre React/Vite + Symfony ;
- espace administrateur minimal pour preparer les evolutions futures.

## 3. Pages publiques

### Accueil

La page d'accueil est la page principale du site.

Elle regroupe les sections suivantes :

- hero de presentation ;
- navigation vers les sections importantes ;
- slider ou zone de mise en avant visuelle ;
- presentation des services ;
- presentation des realisations ;
- widget meteo si son utilite est conservee dans l'identite du site ;
- formulaire de contact ;
- footer.

### Mentions legales

Page obligatoire contenant les informations legales du site.

Elle doit reprendre les informations utiles de l'ancien site, puis etre nettoyee et mise a jour avant publication.

### Protection des donnees

Page dediee a la gestion des donnees personnelles.

Elle doit expliquer simplement :

- quelles donnees sont envoyees via le formulaire de contact ;
- pourquoi elles sont collectees ;
- comment demander leur suppression ou correction ;
- si des donnees sont stockees localement dans le navigateur.

## 4. Fonctionnalites conservees

Le nouveau site conservera les elements suivants :

- menu de navigation ;
- section de presentation principale ;
- slider ou bloc de presentation visuelle ;
- widget meteo, a confirmer avant implementation ;
- presentation des services ;
- presentation des realisations ;
- formulaire de contact ;
- footer ;
- page de connexion administrateur ;
- page d'administration minimale.

## 5. Fonctionnalites supprimees de la V1

Les fonctionnalites suivantes ne seront pas reprises dans la V1 :

- publication d'articles ;
- blog ;
- gestion de posts ;
- commentaires ;
- telechargement d'APK ;
- contenus dynamiques administrables ;
- editeur de contenu depuis le back-office.

Ces elements pourront revenir plus tard uniquement s'ils correspondent a un vrai besoin produit.

## 6. Formulaire de contact

Le formulaire de contact est une fonctionnalite centrale de la V1.

Champs prevus :

- nom ;
- prenom ;
- email ;
- sujet ;
- message ;
- acceptation de transmission des informations.

Comportement attendu :

- validation cote frontend pour guider l'utilisateur ;
- validation cote backend pour securiser les donnees ;
- envoi email via Symfony ;
- message de succes apres envoi ;
- message d'erreur clair en cas d'echec ;
- protection minimale contre les abus, a definir pendant la conception technique.

Le backend ne doit jamais faire confiance uniquement a la validation frontend.

## 7. Espace administrateur

L'espace administrateur est conserve, mais son role change.

Dans l'ancien site, il servait a gerer des articles. Cette fonctionnalite est abandonnee pour la V1.

Fonctionnement prevu :

- connexion par email et mot de passe ;
- authentification securisee avec Symfony Security ;
- acces a une page d'administration ;
- deconnexion.

Le tableau de bord affichera simplement :

> Reflechis et pose tes idees.

Aucune autre fonctionnalite d'administration n'est prevue pour la V1.

L'objectif est de poser une base propre pour de futures evolutions sans surcharger la premiere version.

## 8. Architecture cible

Le projet sera organise en monorepo temporaire :

```text
thomasorta_site/
+-- backend/   Symfony API
+-- frontend/  React + Vite
+-- docs/      Documentation projet
+-- README.md
```

### Frontend

Le frontend sera developpe avec React et Vite.

Principes attendus :

- composants reutilisables ;
- pages claires ;
- styles organises ;
- responsive desktop, tablette et mobile ;
- pas de logique metier sensible dans le frontend.

Exemples de composants :

- `Header`;
- `HeroSection`;
- `ServiceCard`;
- `ProjectCard`;
- `ContactForm`;
- `Footer`;
- `AdminLoginForm`.

### Backend

Le backend sera developpe avec Symfony.

Responsabilites du backend :

- authentification administrateur ;
- validation securisee du formulaire de contact ;
- envoi des emails ;
- exposition d'API si necessaire ;
- centralisation des regles metier.

Le backend ne doit pas exposer de secrets dans le code versionne.

## 9. Securite

Regles obligatoires :

- aucun identifiant de base de donnees dans Git ;
- aucun mot de passe ou token dans le code source ;
- configuration sensible via `.env.local` ou variables d'environnement ;
- messages d'erreur techniques non affiches aux visiteurs ;
- routes admin protegees ;
- validation backend de toutes les donnees entrantes ;
- preparation du deploiement pour que seul le dossier public necessaire soit expose.

## 10. Contenus a migrer depuis l'ancien site

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

## 11. Hors perimetre V1

Ne pas developper dans la V1 :

- blog ;
- systeme de commentaires ;
- CMS complet ;
- gestion de projets depuis l'admin ;
- upload de fichiers ;
- espace client ;
- paiement ;
- API publique complexe ;
- notifications ;
- statistiques avancees.

Ces sujets doivent rester des evolutions possibles, pas des objectifs de depart.

## 12. Criteres de validation V1

La V1 sera consideree comme prete lorsque :

- la page d'accueil est complete et responsive ;
- le formulaire de contact fonctionne ;
- l'authentification admin fonctionne ;
- les pages legales sont presentes ;
- aucun secret n'est versionne ;
- le build frontend passe ;
- les tests backend principaux passent ;
- le deploiement cible est documente ;
- le site peut etre publie sans exposer les dossiers internes.

## 13. Philosophie du projet

Le projet doit rester propre, structure et evolutif.

Chaque fonctionnalite doit avoir une raison claire d'exister.

La V1 privilegie :

- la qualite ;
- la lisibilite ;
- la maintenabilite ;
- la securite ;
- la rapidite ;
- une base saine pour les prochaines versions.
