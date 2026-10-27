# API des propositions (Cloudflare)

Les joueurs proposent des expressions **sans compte** et **sans rien rendre public**. Les propositions arrivent dans une base de données que l'équipe lit directement.

- **`api.tchip.app`** — reçoit les propositions (`POST /propositions`). En place :
  - seules les origines autorisées (le site et les apps) peuvent envoyer ;
  - **Turnstile** vérifie que c'est un humain ;
  - un champ piège attrape les robots ;
  - au plus 5 envois par heure et 20 par jour par appareil, et 500 par jour au total ;
  - tout est revérifié côté serveur (`src/regles.js`) ;
  - une voix fait 1 Mo au plus, et seulement avec l'accord de publication.
- **Base D1 `tchip-propositions`** — dans l'Union européenne (`jurisdiction: eu`). L'adresse IP n'est jamais gardée, seulement une empreinte qui change chaque jour. Chaque nuit, les refus de plus de 90 jours et les compteurs anti-abus de plus de 2 jours sont effacés (tâche cron ; voir plus bas).
- **Pas de page de tri en ligne.** On lit la base directement (dashboard, `wrangler`, ou l'API D1 depuis un agent). Le code d'une page de tri humaine reste dans `src/admin.js` : pour l'activer un jour, remettre la route `admin.tchip.app` dans `wrangler.toml`, remplir `ACCESS_EQUIPE` / `ACCESS_AUD` et protéger le sous-domaine par Cloudflare Access.

## État : en ligne

- Worker **`tchip-api`** déployé, domaine **`api.tchip.app`**.
- Base **`tchip-propositions`** (UE), tables créées.
- Secrets posés : `TURNSTILE_SECRET`, `SEL`. Clé publique Turnstile dans `app.js` (`TURNSTILE_CLE`).
- **Reste à faire une fois** : la tâche de nuit (purge) attend un sous-domaine *workers.dev*. Ouvre une fois le menu **Workers & Pages** du dashboard Cloudflare (il se crée tout seul), puis `npm run deployer` : le cron s'activera.

| Fichier | Rôle |
|---|---|
| `src/index.js` | le Worker : réception, anti-abus, Turnstile, purge (et page de tri optionnelle) |
| `src/regles.js` | règles des propositions et brouillon à coller (testés par `npm test` à la racine) |
| `src/admin.js` | page de tri humaine, optionnelle (désactivée tant que la route `admin.` n'est pas remise) |
| `schema.sql` | les tables : propositions, voix, limites |
| `wrangler.toml` | configuration : domaine, base, tâche de nuit |

## Lire les propositions

Account ID : `47fcbb92580a3bca41e375db1471d9c8` · Database ID : `a097a18e-827e-448f-b527-98682e3af31c`

- **Dashboard** : Cloudflare › Storage & Databases › D1 › `tchip-propositions` › *Console*.
- **En ligne de commande** :
  ```bash
  cd api
  npx wrangler d1 execute tchip-propositions --remote --command "SELECT id, cree, statut, expression, pays, pseudo, voix FROM propositions WHERE statut='nouvelle' ORDER BY cree DESC"
  ```
- **Pour un agent** : créer un jeton d'API Cloudflare limité à **D1 (lecture, ou lecture/écriture)**, puis appeler l'API D1 :
  `POST https://api.cloudflare.com/client/v4/accounts/<account_id>/d1/database/<database_id>/query` avec `{"sql": "SELECT …"}`.
- Une voix est stockée en BLOB dans la table `voix` (colonne `donnees`), avec `accord = 1`. `src/regles.js` → `brouillonEntree(proposition)` fabrique l'entrée à coller dans `data/expressions.js` (et le squelette anglais).

Statuts : `nouvelle` → `relecture` → `acceptee` / `refusee`. Mettre à jour la colonne `statut` quand une proposition est traitée ; les refus s'effacent au bout de 90 jours.

## Mettre à jour le Worker

Après une modification de `src/` ou `wrangler.toml` :
```bash
cd api && npm run deployer
```

## Essayer en local

```bash
cp .dev.vars.exemple .dev.vars
npm run base:locale
npm run dev
```
Puis, depuis la racine, `npm run serve`, et ouvre `http://localhost:8000/?api=http://127.0.0.1:8787`. En local, Turnstile utilise les clés de test officielles (tout passe) et la page de tri est accessible sur `http://127.0.0.1:8787/admin/` sans Access.
