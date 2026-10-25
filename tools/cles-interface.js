/* Liste les textes d'interface à traduire : les chaînes "entre guillemets" passées à t(…) dans app.js.
 * Les morceaux de phrase construits à la volée (ex. "Tu parles " + degré) sont ignorés : tests.js les vérifie à part.
 * Usage : node tools/cles-interface.js            → affiche les textes sans traduction anglaise
 */
const fs = require("fs");
const path = require("path");

function clesInterface(source) {
  const cles = new Set();
  const re = /(^|[^\w.$])t\(/g;
  let m;
  while ((m = re.exec(source))) {
    let i = m.index + m[0].length, prof = 1, chaine = null, debut = 0;
    for (; i < source.length && prof > 0; i++) {
      const c = source[i];
      if (chaine) {
        if (c === "\\") { i++; continue; }
        if (c === chaine) {
          if (chaine === '"') { const v = source.slice(debut, i); if (v && v.trim() === v && !/^<[^>]+>$/.test(v)) cles.add(JSON.parse('"' + v + '"')); }
          chaine = null;
        }
      } else if (c === '"' || c === "'") { chaine = c; debut = i + 1; }
      else if (c === "(") prof++;
      else if (c === ")") prof--;
    }
  }
  return [...cles];
}
module.exports = clesInterface;

if (require.main === module) {
  const racine = path.resolve(__dirname, "..");
  const fenetre = {};
  require("vm").runInNewContext(fs.readFileSync(path.join(racine, "langues.js"), "utf8"), { window: fenetre });
  const en = fenetre.TCHIP_LANGUES.en;
  const manquants = clesInterface(fs.readFileSync(path.join(racine, "app.js"), "utf8")).filter((k) => !en[k]);
  console.log(manquants.length ? manquants.join("\n") : "✓ tous les textes ont leur traduction anglaise");
}
