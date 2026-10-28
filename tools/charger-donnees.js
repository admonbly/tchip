/* Charge data/expressions.js et sa traduction data/expressions-en.js (écrits pour le navigateur) dans Node,
 * sans les exécuter dans le contexte global. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const racine = path.resolve(__dirname, "..");

module.exports = function chargerDonnees() {
  const fenetre = {};
  for (const f of ["expressions.js", "candidats.js", "expressions-en.js"]) {
    const fichier = path.join(racine, "data", f);
    if (fs.existsSync(fichier)) vm.runInNewContext(fs.readFileSync(fichier, "utf8"), { window: fenetre }, { filename: "data/" + f });
  }
  return { expressions: fenetre.TCHIP_EXPRESSIONS, pays: fenetre.TCHIP_PAYS, themes: fenetre.TCHIP_THEMES, en: fenetre.TCHIP_EN || null };
};
