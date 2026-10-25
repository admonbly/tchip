/* Régénère RELECTURE.md à partir de data/expressions.js, regroupé par pays.
 * Garde les cases déjà cochées et les ⚠️ existants. Usage : npm run relecture [-- "Expression à signaler" …]
 */
const fs = require("fs");
const path = require("path");
const chargerDonnees = require("./charger-donnees.js");

const racine = path.resolve(__dirname, "..");
const fichier = path.join(racine, "RELECTURE.md");
const ancien = fs.existsSync(fichier) ? fs.readFileSync(fichier, "utf8") : "";
const cochees = new Set([...ancien.matchAll(/^- \[x\] \*\*#\d+ (.+?)\*\*/gim)].map((m) => m[1]));
const alertes = new Set([...ancien.matchAll(/^- \[[ x]\] \*\*#\d+ (.+?)\*\* ⚠️/gim)].map((m) => m[1]).concat(process.argv.slice(2)));
const intro = ancien.includes("\n## ") ? ancien.slice(0, ancien.indexOf("\n## ")) : "# Relecture des expressions\n";

const { expressions, pays } = chargerDonnees();
const parPays = {};
expressions.forEach((e, i) => (parPays[e.pays] = parPays[e.pays] || []).push({ e, n: i + 1 }));
const ordre = Object.keys(pays);
const codes = Object.keys(parPays).sort((a, b) => parPays[b].length - parPays[a].length || ordre.indexOf(a) - ordre.indexOf(b));

let md = intro.replace(/\s+$/, "") + "\n";
for (const code of codes) {
  const p = pays[code];
  md += `\n## ${p.drapeau} ${p.nom} (${parPays[code].length})\n\n`;
  for (const { e, n } of parPays[code]) {
    const autres = (e.ailleurs || []).map((a) => " · autres sens : " + a.sens + " (" + a.ou + ")").join("");
    const pron = e.prononciation ? " · se dit : *" + e.prononciation + "*" : "";
    md += `- [${cochees.has(e.expression) ? "x" : " "}] **#${n} ${e.expression}**${alertes.has(e.expression) ? " ⚠️" : ""} : ${e.sens}${autres}${pron}\n`;
  }
}
fs.writeFileSync(fichier, md);
console.log("✓ RELECTURE.md : " + expressions.length + " expressions, " + codes.length + " pays, " + alertes.size + " ⚠️, " + cochees.size + " validée(s)");
