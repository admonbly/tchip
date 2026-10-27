-- Tchip — base des propositions (Cloudflare D1, SQLite).
-- Rien de public : seul l'admin (admin.tchip.app, protégé par Cloudflare Access) lit ces tables.

CREATE TABLE IF NOT EXISTS propositions (
  id          TEXT PRIMARY KEY,             -- identifiant aléatoire
  cree        INTEGER NOT NULL,             -- date d'envoi (ms)
  maj         INTEGER NOT NULL,             -- dernière modification (ms)
  statut      TEXT NOT NULL DEFAULT 'nouvelle', -- nouvelle | relecture | acceptee | refusee
  expression  TEXT NOT NULL,
  pays        TEXT NOT NULL,                -- code de TCHIP_PAYS, ou AUTRE
  lieu        TEXT NOT NULL DEFAULT '',
  sens        TEXT NOT NULL,                -- JSON : [{ "sens": "...", "ou": "..." }]
  exemple     TEXT NOT NULL DEFAULT '',
  pseudo      TEXT NOT NULL DEFAULT '',
  langue      TEXT NOT NULL DEFAULT 'fr',   -- langue de l'app au moment de l'envoi
  voix        INTEGER NOT NULL DEFAULT 0,   -- 1 si une voix est jointe (table voix)
  note        TEXT NOT NULL DEFAULT ''      -- note de l'admin (relecteur, décision…)
);
CREATE INDEX IF NOT EXISTS propositions_statut ON propositions (statut, cree);

-- Voix jointes : gardées à part, servies seulement à l'admin, publiées seulement avec l'accord donné à l'envoi.
CREATE TABLE IF NOT EXISTS voix (
  proposition TEXT PRIMARY KEY REFERENCES propositions(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,                -- audio/mp4, audio/mpeg…
  donnees     BLOB NOT NULL,                -- 1 Mo au plus
  accord      INTEGER NOT NULL              -- 1 : la personne accepte que sa voix soit publiée, créditée
);

-- Anti-abus : nombre d'envois par appareil et par heure. L'adresse IP n'est jamais gardée :
-- seulement une empreinte qui change chaque jour, effacée au bout de 2 jours.
CREATE TABLE IF NOT EXISTS limites (
  cle    TEXT PRIMARY KEY,                  -- empreinte du jour + heure
  compte INTEGER NOT NULL,
  cree   INTEGER NOT NULL
);
