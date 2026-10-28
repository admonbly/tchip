/* Vérifie la base d'expressions. Échoue (code 1) au moindre problème : utilisé par le build et la CI.
 * Usage : npm run verifier
 */
const fs = require("fs");
const path = require("path");
const verifier = require("../verification.js");
const chargerDonnees = require("./charger-donnees.js");

const racine = path.resolve(__dirname, "..");
const { expressions, pays, themes, en } = chargerDonnees();
const problemes = verifier(expressions, pays, themes);

// La version anglaise : toutes les expressions traduites, et tous les textes de l'interface.
if (!en) problemes.push("data/expressions-en.js manquant.");
else problemes.push(...verifier.traduction(expressions, pays, themes, en));
const fenetre = {};
require("vm").runInNewContext(fs.readFileSync(path.join(racine, "langues.js"), "utf8"), { window: fenetre });
require("./cles-interface.js")(fs.readFileSync(path.join(racine, "app.js"), "utf8"))
  .filter((k) => !fenetre.TCHIP_LANGUES.en[k])
  .forEach((k) => problemes.push("Texte d'interface sans traduction anglaise (langues.js) : « " + k + " »."));

// Chaque pays a son drapeau en image (npm run drapeaux).
Object.keys(pays).forEach(function (code) {
  if (!fs.existsSync(path.join(racine, "assets", "drapeaux", code.toLowerCase() + ".svg"))) {
    problemes.push("Pays « " + code + " » : drapeau manquant dans assets/drapeaux (lance npm run drapeaux).");
  }
});

// Les enregistrements déclarés doivent exister (le navigateur, lui, ne peut pas le vérifier).
expressions.forEach(function (e, i) {
  if (e && e.audio && e.audio.fichier && !fs.existsSync(path.join(racine, e.audio.fichier))) {
    problemes.push("#" + (i + 1) + " « " + e.expression + " » : fichier audio introuvable (" + e.audio.fichier + ").");
  }
});

if (problemes.length) {
  console.error("✗ Données à corriger (" + problemes.length + ") :\n  - " + problemes.join("\n  - "));
  process.exit(1);
}

// Jusqu'à quand la base tient-elle ? (au-delà, les expressions du jour se répètent)
// Seules les expressions confirmées alimentent le tchip du jour ; les candidats (data/candidats.js)
// ne servent qu'à l'entraînement libre de Voyager.
const confirmees = expressions.filter((e) => !e.candidat);
const candidats = expressions.length - confirmees.length;
const app = fs.readFileSync(path.join(racine, "app.js"), "utf8");
const m = app.match(/LANCEMENT\s*=\s*{\s*a:\s*(\d+),\s*m:\s*(\d+),\s*j:\s*(\d+)/);
let couverture = "";
if (m) {
  const fin = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3] + confirmees.length - 1));
  couverture = " — le jour couvre jusqu'au " + fin.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) + " (ensuite, les expressions se répètent)";
}
const avecAudio = expressions.filter((e) => e.audio).length;
console.log("✓ " + confirmees.length + " expressions confirmées" + (candidats ? " + " + candidats + " candidats (Voyager)" : "") +
  ", " + Object.keys(pays).length + " pays, " + avecAudio + " enregistrement(s)" + couverture);
