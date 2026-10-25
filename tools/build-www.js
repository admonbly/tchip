/* Construit www/ : le dossier embarqué dans les apps iOS/Android (Capacitor) et publié sur le web.
 * - copie les fichiers du jeu ;
 * - ajoute le runtime Capacitor (pont vers les plugins natifs, sans bundler) ;
 * - publie data/expressions.json, lu par les apps pour recevoir les nouvelles expressions sans mise à jour ;
 * - date la version (app et service worker).
 * Usage : npm run build   (vérifie d'abord les données)
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const chargerDonnees = require("./charger-donnees.js");
const pkg = require("../package.json");

const racine = path.resolve(__dirname, "..");
const sortie = path.join(racine, "www");
const FICHIERS = [
  "index.html", "app.js", "verification.js", "styles.css", "sw.js",
  "manifest.webmanifest", "confidentialite.html", "data/expressions.js"
];
const DOSSIERS = ["assets"];

function copier(rel) {
  const dest = path.join(sortie, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(path.join(racine, rel), dest, { recursive: true });
}
function remplacer(rel, avant, apres) {
  const f = path.join(sortie, rel);
  const contenu = fs.readFileSync(f, "utf8");
  if (!contenu.includes(avant)) throw new Error(rel + " : « " + avant + " » introuvable");
  fs.writeFileSync(f, contenu.replace(avant, apres));
}

fs.rmSync(sortie, { recursive: true, force: true });
FICHIERS.concat(DOSSIERS).forEach(copier);

// Runtime Capacitor : chargé avant app.js, inactif dans un navigateur ordinaire.
fs.copyFileSync(path.join(racine, "node_modules/@capacitor/core/dist/capacitor.js"), path.join(sortie, "capacitor.js"));
remplacer("index.html", '<script src="app.js"></script>', '<script src="capacitor.js"></script>\n<script src="app.js"></script>');

// Contenu distant (même ordre que data/expressions.js : l'ordre = l'ordre des jours).
const { expressions, pays } = chargerDonnees();
fs.writeFileSync(path.join(sortie, "data", "expressions.json"), JSON.stringify({ version: 1, pays, expressions }));

// Versions : celle de l'app (affichée dans les réglages) et celle du cache hors ligne.
remplacer("app.js", 'var VERSION_APP = "dev";', 'var VERSION_APP = "' + pkg.version + '";');
const empreinte = crypto.createHash("sha256");
(function parcourir(dossier) {
  for (const nom of fs.readdirSync(dossier).sort()) {
    const f = path.join(dossier, nom);
    if (fs.statSync(f).isDirectory()) parcourir(f);
    else if (nom !== "sw.js") empreinte.update(nom).update(fs.readFileSync(f));
  }
})(sortie);
remplacer("sw.js", 'var VERSION = "dev";', 'var VERSION = "' + pkg.version + "-" + empreinte.digest("hex").slice(0, 10) + '";');

console.log("✓ www/ prêt (version " + pkg.version + ", " + expressions.length + " expressions)");
