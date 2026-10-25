# Tchip

**Tu parles d'où ?** Chaque jour, une expression de la francophonie à deviner : ce qu'elle veut dire, puis d'où elle vient. La même pour tout le monde, de Dakar à Montréal, avec un score à partager sans spoiler.

![Logo Tchip](assets/logo-wordmark.svg)

## Lancer le jeu

Aucune installation. C'est un site statique en HTML, CSS et JavaScript, sans dépendance.

```bash
# n'importe quel petit serveur fait l'affaire
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Ouvrir `index.html` directement dans le navigateur marche aussi.

Pour obtenir un seul fichier autonome (pratique pour un test ou un partage rapide) :

```bash
python3 tools/build-single.py          # → dist/tchip.html
```

## Structure

```
index.html             page du jeu
styles.css             identité visuelle (couleurs, typo, style « autocollant »)
app.js                 logique : jour, essais, score, partage, série, stats, archives
data/expressions.js    la base d'expressions (l'ordre = l'ordre des jours)
assets/                logo, symbole, icône d'app, favicons
manifest.webmanifest   installation sur l'écran d'accueil (PWA)
tools/build-single.py  assemble tout en un fichier
REGLES.md              règles du jeu détaillées
CONTRIBUER.md          comment ajouter des expressions
```

## Réglages à connaître

En haut de `app.js` :

- `LANCEMENT` : la date du Tchip #1. À caler sur le jour du lancement public.
- `ADRESSE_PARTAGE` : le domaine affiché dans le texte partagé (`tchip.app` est provisoire, à remplacer par le vrai domaine).
- `ESSAIS_SENS` : nombre d'essais pour trouver le sens (2 par défaut).

Les données du joueur (parties, série, stats) restent dans son navigateur (`localStorage`). Il n'y a ni compte ni serveur dans cette version.

## Feuille de route

**V1 (ce dépôt)** : jeu du jour, indice, bonus pays, partage texte, série, stats, archives, 38 expressions de 10 pays, thème clair et sombre, installable sur mobile.

**V1.1 — avant le lancement**
- Faire relire chaque expression par des locuteurs de chaque pays.
- Monter la base à 120 expressions au moins (4 mois de jeu).
- Acheter le domaine, le brancher dans `ADRESSE_PARTAGE`, héberger (GitHub Pages, Netlify ou Cloudflare Pages, gratuits).
- Image de partage générée (story TikTok / Instagram) en plus du texte.

**V2 — le moteur viral**
- Choix du pays au premier lancement et **duel des pays** du jour (classement par pays, puis par ville).
- Passeport : un tampon par pays découvert.
- Propositions d'expressions par les joueurs, validées par vote.
- Petit serveur (Supabase ou Firebase) pour les classements et la base d'expressions.

**V3 — applis iOS et Android**
- Emballer le jeu web avec Capacitor (le plus rapide, on garde ce code) ou le réécrire en React Native / Expo.
- Notifications « ton tchip du jour est là », widget écran d'accueil.
- Premium à environ 2 € par mois : archives illimitées, packs thématiques, sans pub.

## Identité

Palette wax (piment, indigo, mangue, menthe sur fond papier), Bricolage Grotesque pour les titres, Figtree pour le texte, et le style « autocollant » : bordure 2,5 px et ombre dure décalée. La mascotte est la bulle blasée qui tchipe. Ne jamais mettre de texte blanc sur le piment.
