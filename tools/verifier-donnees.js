/* Vérifie la base d'expressions. Échoue (code 1) au moindre problème : utilisé par le build et la CI.
 * Usage : npm run verifier
 */
const fs = require("fs");
const path = require("path");
const verifier = require("../verification.js");
const chargerDonnees = require("./charger-donnees.js");

const { expressions, pays } = chargerDonnees();
const problemes = verifier(expressions, pays);

if (problemes.length) {
  console.error("✗ Données à corriger (" + problemes.length + ") :\n  - " + problemes.join("\n  - "));
  process.exit(1);
}

// Jusqu'à quand la base tient-elle ? (au-delà, les expressions se répètent)
const app = fs.readFileSync(path.resolve(__dirname, "..", "app.js"), "utf8");
const m = app.match(/LANCEMENT\s*=\s*{\s*a:\s*(\d+),\s*m:\s*(\d+),\s*j:\s*(\d+)/);
let couverture = "";
if (m) {
  const fin = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3] + expressions.length - 1));
  couverture = " — couvre jusqu'au " + fin.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) + " (ensuite, les expressions se répètent)";
}
console.log("✓ " + expressions.length + " expressions, " + Object.keys(pays).length + " pays" + couverture);
