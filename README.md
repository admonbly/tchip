# Tchip

**Tu parles d'où ?** Chaque jour, une expression de la francophonie à deviner : ce qu'elle veut dire, puis d'où elle vient. La même pour tout le monde, de Dakar à Montréal, avec un score à partager sans spoiler.

Et quand on veut : **Voyager** pour apprendre les mots d'un pays avant d'y partir (séries sans limite, lexique par thème, prononciation), et le **Carnet** pour remplir son passeport, découvrir son accent et réviser au bon moment. 314 expressions de 22 pays.

![Logo Tchip](assets/logo-wordmark.svg)

Un seul code (HTML, CSS, JavaScript, sans framework) pour le **site web** et les **apps iOS et Android** (emballées avec [Capacitor](https://capacitorjs.com)).

## Lancer le jeu

Prérequis : [Node.js](https://nodejs.org) 22 ou plus.

```bash
npm install          # une fois
npm run serve        # → http://localhost:8000
```

Ouvrir `index.html` directement dans le navigateur marche aussi (sans le mode hors ligne).

## Commandes

| Commande | Rôle |
|---|---|
| `npm run verifier` | Contrôle la base d'expressions (pays inconnu, leurre en double…) et dit jusqu'à quelle date elle tient. |
| `npm test` | Tests automatiques : règles des données, moteur d'apprentissage, mode hors ligne. |
| `npm run drapeaux` | Copie les drapeaux des pays dans `assets/drapeaux/` (après l'ajout d'un pays). |
| `npm run build` | Vérifie puis construit `www/`, le dossier embarqué dans les apps et publié sur le web. |
| `npm run sync` | Build + copie dans les projets iOS et Android. |
| `npm run android` / `npm run ios` | Sync puis ouvre Android Studio / Xcode (Xcode : sur Mac uniquement). |
| `npm run icones` | Régénère toutes les icônes et écrans de lancement depuis la mascotte. |
| `npm run polices` | Recopie les polices dans `assets/fonts/` (après une mise à jour des paquets de polices). |
| `npm run serve -- www` | Sert la version construite. |
| `python3 tools/build-single.py` | Assemble tout en un seul fichier HTML (`dist/tchip.html`). |

## Structure

```
index.html             page du jeu
styles.css             identité visuelle (couleurs, typo, style « autocollant »)
app.js                 interface et logique : jeu du jour, Voyager, Carnet, partage, stats, archives,
                       réglages, rappel quotidien, contenu distant, statistiques anonymes
apprentissage.js       moteur d'apprentissage : niveaux, révisions espacées, séries, passeport, accent
verification.js        règles de la base d'expressions (partagées entre l'app, le build et la CI)
data/expressions.js    la base : thèmes, pays, expressions (l'ordre = l'ordre des jours)
audio/                 voix enregistrées par des gens de chaque pays (voir CONTRIBUER.md)
confidentialite.html   politique de confidentialité et mentions légales (affichée aussi dans l'app)
sw.js                  service worker : le site marche hors ligne
assets/                logo, icônes, polices (assets/fonts), drapeaux (assets/drapeaux), visuels Google Play (assets/store)
manifest.webmanifest   installation sur l'écran d'accueil (PWA)
capacitor.config.json  configuration des apps (identifiant app.tchip)
android/  ios/         projets natifs (générés par Capacitor, puis réglés aux normes des stores)
tools/                 build, vérification, tests, icônes, polices, drapeaux, serveur local
.github/workflows/     CI : tests, vérification, compilation Android et iOS, publication GitHub Pages
RELECTURE.md           liste de relecture des expressions par pays (⚠️ = à valider en priorité)
REGLES.md              règles du jeu détaillées
RELECTURE.md           les 120 expressions classées par pays, pour la relecture
.github/ISSUE_TEMPLATE formulaire des propositions d'expressions
CONTRIBUER.md          comment ajouter des expressions
DEPLOIEMENT.md         publier sur l'App Store et Google Play, pas à pas
```

## Réglages à connaître

En haut de `app.js` :

- `LANCEMENT` : la date du Tchip #1. À caler sur le jour du lancement public.
- `ADRESSE_PARTAGE` : le domaine affiché dans le texte partagé (`tchip.app` est provisoire).
- `ESSAIS_SENS` : nombre d'essais pour trouver le sens (2 par défaut).
- `CONTENU_URL` : où les apps vont chercher les nouvelles expressions (GitHub Pages par défaut). Elles n'acceptent qu'une liste valide qui ne retire aucune expression, pour que l'ordre des jours ne bouge jamais.
- `TELEMETRYDECK_APP_ID` : vide = pas de statistiques. Voir `DEPLOIEMENT.md` pour les activer.
- `DEPOT_PROPOSITIONS` : le dépôt GitHub où arrivent les propositions des joueurs, sous forme de tickets.

En local, ajoute `?jour=N` à l'adresse pour tester n'importe quel jour (désactivé une fois en ligne).

## Données du joueur

Pas de compte. Les parties, la série, les stats, les mots appris et le passeport restent sur l'appareil (`localStorage`). Dans les apps, une copie de secours est gardée dans le stockage natif (au cas où iOS viderait celui de la WebView), et les sauvegardes iCloud / Google du téléphone la prennent normalement en charge. Le joueur peut tout effacer dans Réglages.

## Feuille de route

**V1 (ce dépôt)** : jeu du jour, indice, bonus pays, partage, série, stats, archives ; mode Voyager (séries par pays, lexique par thème, prononciation, voix) ; Carnet (passeport, accent, révisions espacées) ; 314 expressions de 22 pays, dont certaines à plusieurs sens ; propositions des joueurs ; thème clair et sombre, site hors ligne, apps iOS et Android (rappel quotidien, retour haptique, partage natif), contenu mis à jour sans passer par les stores.

**V1.1 — avant le lancement**
- Faire relire chaque expression par des locuteurs de chaque pays (`RELECTURE.md`), en priorité les ⚠️ et les brouillons à partir du #39.
- Enregistrer les premières voix, en commençant par les salutations de chaque pays (`CONTRIBUER.md`).
- Acheter le domaine, le brancher dans `ADRESSE_PARTAGE` et sur GitHub Pages.
- Image de partage générée (story TikTok / Instagram) en plus du texte.

**V2 — le moteur viral**
- Choix du pays au premier lancement et **duel des pays** du jour (classement par pays, puis par ville).
- Packs « avant de partir » : les 20 mots indispensables d'une ville.
- Propositions des joueurs directement dans l'appli (sans compte GitHub), voix comprises, et votes de la communauté sur les sens.
- Petit serveur (Supabase ou Firebase) pour les classements.

**V3 — monétisation**
- Widget écran d'accueil.
- « Tchip+ » en achat intégré : archives illimitées, packs thématiques. Pas de pub au lancement (voir `DEPLOIEMENT.md`).

## Les propositions des joueurs

À la fin de chaque partie, le joueur peut proposer une expression de chez lui, avec jusqu'à 3 sens (et pour chaque sens, où ou dans quel contexte on l'emploie). Le jeu prépare un ticket GitHub prérempli avec l'étiquette `proposition`. Pense à créer cette étiquette dans *Issues → Labels*. Ceux qui n'ont pas de compte GitHub peuvent copier le texte et l'envoyer sur les réseaux.

## Identité

Palette wax (piment, indigo, mangue, menthe sur fond papier), Bricolage Grotesque pour les titres, Figtree pour le texte, et le style « autocollant » : bordure 2,5 px et ombre dure décalée. La mascotte est la bulle blasée qui tchipe. Ne jamais mettre de texte blanc sur le piment.
