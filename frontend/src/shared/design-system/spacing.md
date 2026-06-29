# Spacing

## Objectif

Les espacements doivent rester cohérents sur tout le site.

Le système utilise une échelle simple basée sur des multiples de 4 pixels.

---

## Variables CSS

```css
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 24px;
--spacing-6: 32px;
--spacing-7: 48px;
--spacing-8: 64px;
--spacing-9: 96px;
```

---

## Règles d'utilisation

- `--spacing-1` à `--spacing-3` : petits espacements internes.
- `--spacing-4` à `--spacing-6` : marges courantes entre composants.
- `--spacing-7` à `--spacing-9` : espacements de sections.

---

## Sections

Les grandes sections utilisent :

```css
--section-padding: 96px;
```

Sur mobile, cette valeur pourra être réduite dans les media queries.