/* Vérifie la base d'expressions. Échoue (code 1) au moindre problème : utilisé par le build et la CI.
 * Usage : npm run verifier
 */
const fs = require("fs");
const path = require("path");
const verifier = require("../verification.js");
const chargerDonnees = require("./charger-donnees.js");

const racine = path.resolve(__dirname, "..");
const { expressions, pays, themes } = chargerDonnees();
const problemes = verifier(expressions, pays, themes);

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
const app = fs.readFileSync(path.join(racine, "app.js"), "utf8");
const m = app.match(/LANCEMENT\s*=\s*{\s*a:\s*(\d+),\s*m:\s*(\d+),\s*j:\s*(\d+)/);
let couverture = "";
if (m) {
  const fin = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3] + expressions.length - 1));
  couverture = " — couvre jusqu'au " + fin.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) + " (ensuite, les expressions se répètent)";
}
const avecAudio = expressions.filter((e) => e.audio).length;
console.log("✓ " + expressions.length + " expressions, " + Object.keys(pays).length + " pays, " + avecAudio + " enregistrement(s)" + couverture);
