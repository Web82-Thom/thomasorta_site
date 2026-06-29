# Buttons

## Objectif

Les boutons doivent être immédiatement identifiables et offrir une expérience cohérente sur l'ensemble du site.

---

## Types de boutons

### Primary

Utilisé pour les actions principales.

Exemples :

- Me contacter
- Envoyer
- Découvrir mes réalisations

Couleurs :

- Fond : Bleu lagon
- Texte : Blanc

---

### Secondary

Utilisé pour les actions secondaires.

Exemples :

- En savoir plus
- Retour

Couleurs :

- Fond : Blanc
- Bordure : Bleu lagon
- Texte : Bleu lagon

---

### Accent

Utilisé pour mettre en avant une action importante.

Exemples :

- Télécharger
- Découvrir

Couleurs :

- Fond : Or
- Texte : Blanc

---

## Radius

Tous les boutons utilisent :

```css
--radius-md
```

---

## Ombre

Au repos :

```css
--shadow-sm
```

Au survol :

```css
--shadow-md
```

---

## États

Tous les boutons possèdent les états suivants :

- normal
- hover
- focus
- active
- disabled

---

## Règles

- Un seul style Primary sur tout le site.
- Les boutons utilisent les variables du Design System.
- Aucun style inline.
- Les couleurs sont exclusivement définies dans `theme.css`.