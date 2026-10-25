/* Charge data/expressions.js (écrit pour le navigateur) dans Node, sans l'exécuter dans le contexte global. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const racine = path.resolve(__dirname, "..");

module.exports = function chargerDonnees() {
  const fenetre = {};
  const code = fs.readFileSync(path.join(racine, "data", "expressions.js"), "utf8");
  vm.runInNewContext(code, { window: fenetre }, { filename: "data/expressions.js" });
  return { expressions: fenetre.TCHIP_EXPRESSIONS, pays: fenetre.TCHIP_PAYS };
};
