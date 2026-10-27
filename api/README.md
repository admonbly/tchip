# API des propositions (Cloudflare)

Les joueurs proposent des expressions **sans compte** et **sans rien rendre public**. Les propositions arrivent ici, et l'équipe les trie sur `https://admin.tchip.app`.

- **`api.tchip.app`** : reçoit les propositions (`POST /propositions`). Plusieurs protections :
  - seules les origines autorisées (le site et les apps) peuvent envoyer ;
  - **Turnstile** vérifie que c'est un humain ;
  - un champ piège attrape les robots ;
  - au plus 5 envois par heure et 20 par jour par appareil, et 500 par jour au total ;
  - tout est revérifié côté serveur (`src/regles.js`) ;
  - une voix fait 1 Mo au plus, et seulement avec l'accord de publication.
- **`admin.tchip.app`** : la page de tri. **Cloudflare Access** demande un code envoyé par e-mail, et le Worker revérifie lui-même le jeton d'Access (signature, audience, expiration) avant de répondre.
- **Chaque nuit** : les refus de plus de 90 jours et les compteurs anti-abus de plus de 2 jours sont effacés.
- **Données** : base D1 dans l'Union européenne. L'adresse IP n'est jamais gardée, seulement une empreinte qui change chaque jour.

| Fichier | Rôle |
|---|---|
| `src/index.js` | le Worker : réception, anti-abus, Turnstile, Access, admin, purge |
| `src/regles.js` | règles des propositions (testées par `npm test` à la racine) |
| `src/admin.js` | la page de tri |
| `schema.sql` | les tables : propositions, voix, limites |
| `wrangler.toml` | configuration : domaines, base, tâche de nuit, réglages Access |

## Mise en ligne (une fois)

Tout se fait dans ce dossier (`cd api`), avec ton compte Cloudflare, celui de `tchip.app`.

1. **Installer et te connecter** :
   ```bash
   npm install
   ```
   ```bash
   npx wrangler login
   ```
2. **Créer la base, dans l'Union européenne** :
   ```bash
   npx wrangler d1 create tchip-propositions --jurisdiction=eu
   ```
   Copie le `database_id` affiché dans `wrangler.toml` (ligne `database_id`), puis crée les tables :
   ```bash
   npm run base:distante
   ```
3. **Turnstile** (tableau de bord Cloudflare › *Turnstile* › *Add widget*) :
   - nom `Tchip` ;
   - noms d'hôte `tchip.app` et `localhost` (ce dernier pour les apps iOS et Android) ;
   - mode *Managed*.

   Colle la **clé du site** (publique) dans `app.js`, à la ligne `TURNSTILE_CLE`. Range la **clé secrète** dans le Worker (elle n'est jamais écrite dans un fichier) :
   ```bash
   npx wrangler secret put TURNSTILE_SECRET
   ```
4. **Le sel des empreintes** : une longue chaîne au hasard, que personne n'a besoin de connaître :
   ```bash
   npx wrangler secret put SEL
   ```
5. **Cloudflare Access** (tableau de bord › *Zero Trust* › *Access* › *Applications* › *Add an application* › *Self-hosted*) :
   - domaine `admin.tchip.app` ;
   - une règle *Allow* avec ton e-mail (et celui des relecteurs).

   Dans `wrangler.toml`, mets ensuite :
   - `ACCESS_EQUIPE` : le domaine de ton équipe, par exemple `https://tchip.cloudflareaccess.com` (*Zero Trust › Settings › Custom Pages*) ;
   - `ACCESS_AUD` : l'*Application Audience (AUD) Tag* de l'application.

   Tant que ces deux réglages ne sont pas remplis, l'admin refuse tout le monde.
6. **Publier** : Cloudflare crée lui-même les adresses `api.tchip.app` et `admin.tchip.app`.
   ```bash
   npm run deployer
   ```
7. **Vérifier** :
   - ouvre `https://admin.tchip.app` : tu reçois un code par e-mail, puis tu vois la page vide ;
   - pousse `app.js` avec la clé Turnstile, envoie une proposition depuis `https://tchip.app`, et vérifie qu'elle arrive dans l'admin.

Pour mettre à jour le Worker plus tard, relance seulement `npm run deployer`.

## Essayer en local

```bash
cp .dev.vars.exemple .dev.vars
```
```bash
npm run base:locale
```
```bash
npm run dev
```
Puis, depuis la racine du dépôt, `npm run serve`, et ouvre `http://localhost:8000/?api=http://127.0.0.1:8787` pour envoyer une proposition. La page de tri locale est sur `http://127.0.0.1:8787/admin/`, sans Access. En local, Turnstile utilise les clés de test officielles, qui laissent tout passer.
