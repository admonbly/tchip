/* Copie les drapeaux des pays de TCHIP_PAYS dans assets/drapeaux/<code>.svg.
 * Usage : npm run drapeaux   (à relancer quand on ajoute un pays)
 * Des images plutôt que des emoji : Windows n'affiche pas les drapeaux emoji (il montre « CI », « ML »…),
 * et les SVG sont identiques sur tous les appareils.
 * Source : flag-icons (licence MIT), sauf les drapeaux dessinés ici (flag-icons donne le Canada ou la France) :
 * - QC : le fleurdelisé, drapeau officiel du Québec ;
 * - RE : le Lo Mahavèl, drapeau populaire de La Réunion ;
 * - MQ : le rouge-vert-noir, drapeau officiel de la Martinique depuis février 2023 (Collectivité territoriale) ;
 * - GP : la bannière au soleil et à la canne à sucre (armoiries de Basse-Terre), le drapeau local non politique
 *   le plus répandu ; la Guadeloupe n'a pas de drapeau officiel propre.
 */
const fs = require("fs");
const path = require("path");
const chargerDonnees = require("./charger-donnees.js");

const racine = path.resolve(__dirname, "..");
const dest = path.join(racine, "assets", "drapeaux");
const source = path.join(racine, "node_modules", "flag-icons", "flags", "4x3");

// Fleur de lys dans une boîte de 100 × 100, pointe vers le haut.
const LYS = '<path d="M50 6c-9 13-11 26-6 38l2 12h8l2-12c5-12 3-25-6-38z"/>' +
  '<path d="M45 50c-15 0-25-9-23-20 2-8 12-9 14-2 2 6-3 9 0 14 2 4 6 6 9 8z"/>' +
  '<path d="M55 50c15 0 25-9 23-20-2-8-12-9-14-2-2 6 3 9 0 14-2 4-6 6-9 8z"/>' +
  '<rect x="32" y="56" width="36" height="8" rx="3"/>' +
  '<path d="M44 64l-6 16c5-1 9-5 12-10 3 5 7 9 12 10l-6-16z"/>';
function lys(cx, cy, couleur, taille) {
  const s = taille || 1.08;
  return '<g fill="' + (couleur || "#fff") + '" transform="translate(' + (cx - 50 * s) + " " + (cy - 50 * s) + ") scale(" + s + ')">' + LYS + "</g>";
}
// Soleil à 30 rayons (bannière de la Guadeloupe)
function soleil(cx, cy) {
  let rayons = "";
  for (let i = 0; i < 30; i++) {
    const a = (i / 30) * 2 * Math.PI, c = Math.cos(a), s = Math.sin(a);
    rayons += "M" + (cx + c * 74).toFixed(1) + " " + (cy + s * 74).toFixed(1) + "L" + (cx + c * 112).toFixed(1) + " " + (cy + s * 112).toFixed(1);
  }
  return '<path d="' + rayons + '" stroke="#fcdd09" stroke-width="7" stroke-linecap="round"/><circle cx="' + cx + '" cy="' + cy + '" r="64" fill="#fcdd09"/>';
}
// Canne à sucre : tige à nœuds et feuilles
const CANNE = '<g fill="#008000"><rect x="309" y="150" width="22" height="315" rx="6"/>' +
  '<path d="M320 200c-40-30-80-34-120-20 40 2 76 14 116 32z"/><path d="M320 250c40-34 84-40 126-26-42 2-80 16-122 36z"/>' +
  '<path d="M320 320c-44-26-86-28-122-12 40 0 78 10 118 24z"/></g>' +
  '<path d="M309 230h22M309 300h22M309 370h22M309 430h22" stroke="#004d00" stroke-width="5"/>';

const SUR_MESURE = {
  QC: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">' +
    '<path fill="#003da5" d="M0 0h640v480H0z"/><path fill="#fff" d="M280 0h80v480h-80zM0 200h640v80H0z"/>' +
    lys(140, 100) + lys(500, 100) + lys(140, 380) + lys(500, 380) + "</svg>",
  RE: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">' +
    '<path fill="#0b4ea2" d="M0 0h640v480H0z"/>' +
    '<g fill="#ffd200"><path d="M320 270L-60 0H40z"/><path d="M320 270L130 0h90z"/><path d="M320 270L275 0h90z"/><path d="M320 270L420 0h90z"/><path d="M320 270L600 0h100z"/></g>' +
    '<path fill="#e1251b" d="M320 270L70 480h500z"/></svg>',
  MQ: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">' +
    '<path fill="#00a650" d="M0 0h640v240H0z"/><path fill="#000" d="M0 240h640v240H0z"/>' +
    '<path fill="#e1000f" d="M0 0l300 240L0 480z"/></svg>',
  GP: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">' +
    '<path fill="#000" d="M0 0h640v480H0z"/><path fill="#002488" d="M0 0h640v120H0z"/>' +
    lys(160, 62, "#fcdd09", 0.95) + lys(320, 62, "#fcdd09", 0.95) + lys(480, 62, "#fcdd09", 0.95) +
    soleil(320, 300) + CANNE + "</svg>"
};

const { pays } = chargerDonnees();
fs.mkdirSync(dest, { recursive: true });
const manquants = [];
for (const code of Object.keys(pays)) {
  const cible = path.join(dest, code.toLowerCase() + ".svg");
  if (SUR_MESURE[code]) { fs.writeFileSync(cible, SUR_MESURE[code] + "\n"); continue; }
  const fichier = path.join(source, code.toLowerCase() + ".svg");
  if (!fs.existsSync(fichier)) { manquants.push(code); continue; }
  fs.copyFileSync(fichier, cible);
}
fs.copyFileSync(path.join(racine, "node_modules", "flag-icons", "LICENSE"), path.join(dest, "flag-icons-LICENSE.txt"));
if (manquants.length) { console.error("✗ Drapeaux introuvables : " + manquants.join(", ") + " (à dessiner dans SUR_MESURE)"); process.exit(1); }
console.log("✓ " + Object.keys(pays).length + " drapeaux dans assets/drapeaux/");
