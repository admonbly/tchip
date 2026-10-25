/* Copie les polices (Fontsource, licence OFL) dans assets/fonts/ et écrit assets/fonts/polices.css.
 * Usage : npm run polices   (à relancer seulement si on met à jour les paquets de polices)
 * Les polices sont embarquées dans l'app : pas d'appel à Google Fonts, l'app marche hors ligne
 * et aucune adresse IP de joueur n'est envoyée à un tiers.
 */
const fs = require("fs");
const path = require("path");

const racine = path.resolve(__dirname, "..");
const dest = path.join(racine, "assets", "fonts");
const SOUS_ENSEMBLES = ["latin", "latin-ext"]; // le français, le wolof (ë), le lingala… tiennent dedans

const SOURCES = [
  // [paquet, fichier CSS Fontsource, nom de famille utilisé dans styles.css]
  ["@fontsource-variable/bricolage-grotesque", "opsz.css", "Bricolage Grotesque"],
  ["@fontsource-variable/figtree", "wght.css", "Figtree"],
  ["@fontsource-variable/figtree", "wght-italic.css", "Figtree"]
];

fs.mkdirSync(dest, { recursive: true });
let css = "/* Généré par tools/copier-polices.js — ne pas modifier à la main. Polices sous licence OFL (voir *-LICENSE.txt). */\n";

for (const [paquet, fichierCss, famille] of SOURCES) {
  const dossier = path.join(racine, "node_modules", paquet);
  const source = fs.readFileSync(path.join(dossier, fichierCss), "utf8");
  for (const bloc of source.match(/@font-face\s*{[^}]+}/g) || []) {
    const url = (bloc.match(/url\(\.\/files\/([^)]+)\)/) || [])[1];
    if (!url || !SOUS_ENSEMBLES.some((s) => url.includes("-" + s + "-"))) continue;
    fs.copyFileSync(path.join(dossier, "files", url), path.join(dest, url));
    css += "\n" + bloc
      .replace(/font-family:\s*'[^']+'/, "font-family: '" + famille + "'")
      .replace(/url\(\.\/files\//, "url(./")
      .replace("format('woff2-variations')", "format('woff2')") + "\n"; // forme la plus sûre pour WKWebView (iOS)
  }
  const licence = path.join(dest, paquet.split("/")[1] + "-LICENSE.txt");
  fs.copyFileSync(path.join(dossier, "LICENSE"), licence);
}

fs.writeFileSync(path.join(dest, "polices.css"), css);
console.log("Polices copiées dans", path.relative(racine, dest));
for (const f of fs.readdirSync(dest)) console.log("  ", f, fs.statSync(path.join(dest, f)).size, "octets");
