# Forms

## Objectif

Les formulaires doivent être simples, lisibles et cohérents sur l'ensemble du site.

La priorité est donnée à l'expérience utilisateur et à l'accessibilité.

---

## Champs concernés

- Input texte
- Email
- Textarea
- Checkbox
- Bouton

---

## Apparence

Fond :

- Blanc

Texte :

- Couleur principale

Bordure :

- Couleur Border

Radius :

```css
--radius-md
```

Padding :

```css
--spacing-4
```

---

## États

Tous les champs possèdent les états suivants :

- Normal
- Focus
- Error
- Disabled

---

## Focus

Lorsqu'un champ reçoit le focus :

- bordure Bleu lagon ;
- légère ombre ;
- transition fluide.

---

## Messages d'erreur

Les erreurs doivent :

- être visibles immédiatement ;
- être placées sous le champ concerné ;
- utiliser la couleur Error du Design System ;
- rester courtes et compréhensibles.

---

## Validation

La validation est réalisée :

- côté React pour guider l'utilisateur ;
- côté Symfony pour garantir la sécurité.

La validation backend reste toujours prioritaire.

---

## Accessibilité

Chaque champ possède :

- un label ;
- un placeholder si nécessaire ;
- une navigation clavier correcte ;
- un contraste suffisant.

---

## Règles

- Aucun style inline.
- Tous les formulaires utilisent les variables CSS du Design System.
- Les composants de formulaire seront réutilisables dans tout le projet.