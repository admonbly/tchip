/* Génère toutes les icônes et écrans de lancement à partir de la mascotte (vectorielle).
 * Usage : npm run icones   (après « npx cap add android/ios », ou quand le logo change)
 * - web     : assets/app-icon-192.png, -512.png, -maskable-512.png
 * - Android : icône adaptative (+ monochrome Android 13), anciennes icônes, splash
 * - iOS     : icône 1024 sans transparence (exigence App Store), splash clair et sombre
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const racine = path.resolve(__dirname, "..");
const R = (...p) => path.join(racine, ...p);
const C = { piment: "#FF4D2E", papier: "#FFF3DF", encre: "#1D1B4F", indigo: "#1D1B4F", indigoNuit: "#4A45B8", nuit: "#14122E", mangue: "#FFC233" };

// Mascotte dans son repère 120×120 (mêmes tracés que app.js et assets/app-icon.svg).
// Boîte utile ≈ 107 de large, centrée en (63.5, 57.5).
function mascotte(v) {
  const bulle = v === "nuit" ? C.indigoNuit : C.indigo;
  const goutte = v === "icone" ? C.mangue : C.piment;
  const ondes = v === "icone" ? C.papier : C.mangue;
  return '<g transform="translate(2 6) scale(.86)">' +
    '<path d="M60 12c27.6 0 48 18.8 48 44s-20.4 44-48 44c-6.2 0-12-.9-17.4-2.7L20 108l5.6-20.4C16.9 79.6 12 68.5 12 56 12 30.8 32.4 12 60 12z" fill="' + bulle + '"/>' +
    '<path d="M40 43h12M66 41l12 3" stroke="' + C.papier + '" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M42 66c9-8 23-10 34-4" fill="none" stroke="' + C.papier + '" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M73 56.5c4-3.6 11.5-3.6 14 .8 2.4 4.2-.6 9.4-6.2 10-4.4.5-8.6-1.6-9.6-5-.5-2.1.3-4.4 1.8-5.8z" fill="' + goutte + '"/>' +
    '</g><path d="M100 42l8-7M103 57h11M100 72l8 7" stroke="' + ondes + '" stroke-width="5.5" stroke-linecap="round"/>';
}
// part = largeur de la mascotte / plus petit côté
function svg(l, h, { fond, part, variante }) {
  const s = (Math.min(l, h) * part) / 107;
  const tx = l / 2 - 63.5 * s, ty = h / 2 - 57.5 * s;
  return Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="' + l + '" height="' + h + '" viewBox="0 0 ' + l + " " + h + '">' +
    (fond ? '<rect width="' + l + '" height="' + h + '" fill="' + fond + '"/>' : "") +
    '<g transform="translate(' + tx + " " + ty + ") scale(" + s + ')">' + mascotte(variante) + "</g></svg>");
}
// Bannière Google Play (1024×500) : logo, mascotte sur pastille piment, frise wax (comme l'écran de résultat).
function banniere() {
  const logo = fs.readFileSync(R("assets/logo-wordmark.svg"), "utf8").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const couleurs = [C.piment, C.mangue, "#19B38A", C.indigo];
  let frise = "";
  for (let i = 0; i < 26; i++) {
    const x = i * 40;
    frise += i % 2 === 0
      ? '<path d="M' + x + ' 44a20 20 0 0 1 40 0z" fill="' + couleurs[i % 4] + '"/>'
      : '<circle cx="' + (x + 20) + '" cy="16" r="12" fill="' + couleurs[i % 4] + '"/>';
  }
  const s = 200 / 107;
  return Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500">' +
    '<rect width="1024" height="500" fill="' + C.papier + '"/>' +
    '<g transform="translate(70 115) scale(2.4) translate(8 0)">' + logo + "</g>" +
    '<circle cx="830" cy="225" r="140" fill="' + C.piment + '"/>' +
    '<g transform="translate(' + (830 - 63.5 * s) + " " + (225 - 57.5 * s) + ") scale(" + s + ')">' + mascotte("icone") + "</g>" +
    '<g transform="translate(0 456)">' + frise + "</g></svg>");
}
const icone = sharp(R("assets/app-icon.svg"), { density: 300 }).resize(1024, 1024).flatten({ background: C.piment }).png();
async function iconePng(taille, masque) {
  let img = sharp(await icone.clone().toBuffer()).resize(taille, taille);
  if (masque) {
    const forme = masque === "rond"
      ? '<circle cx="' + taille / 2 + '" cy="' + taille / 2 + '" r="' + taille / 2 + '"/>'
      : '<rect width="' + taille + '" height="' + taille + '" rx="' + taille * 0.18 + '"/>';
    img = sharp(await img.png().toBuffer()).composite([{ input: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="' + taille + '" height="' + taille + '">' + forme + "</svg>"), blend: "dest-in" }]);
  }
  return img.png();
}
async function ecrire(dest, sortie) { fs.mkdirSync(path.dirname(dest), { recursive: true }); await sortie.toFile(dest); console.log("  ", path.relative(racine, dest)); }
function existe(p) { return fs.existsSync(R(p)); }

(async function () {
  console.log("Web");
  await ecrire(R("assets/app-icon-192.png"), await iconePng(192));
  await ecrire(R("assets/app-icon-512.png"), await iconePng(512));
  await ecrire(R("assets/app-icon-maskable-512.png"), sharp(svg(512, 512, { fond: C.piment, part: 0.56, variante: "icone" })).png());

  if (existe("android")) {
    console.log("Android");
    const res = "android/app/src/main/res";
    const densites = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
    for (const [d, k] of Object.entries(densites)) {
      await ecrire(R(res, "mipmap-" + d, "ic_launcher.png"), await iconePng(48 * k, "carre"));
      await ecrire(R(res, "mipmap-" + d, "ic_launcher_round.png"), await iconePng(48 * k, "rond"));
      // couche avant de l'icône adaptative : la mascotte tient dans la zone sûre (66 dp sur 108)
      await ecrire(R(res, "mipmap-" + d, "ic_launcher_foreground.png"), sharp(svg(108 * k, 108 * k, { part: 0.5, variante: "icone" })).png());
      // splash des Android < 12 (les plus récents utilisent le thème de lancement, voir styles.xml)
      const [pl, ph] = [320 * k, 480 * k].map(Math.round);
      await ecrire(R(res, "drawable-port-" + d, "splash.png"), sharp(svg(pl, ph, { fond: C.papier, part: 0.38, variante: "lancement" })).png());
      await ecrire(R(res, "drawable-land-" + d, "splash.png"), sharp(svg(ph, pl, { fond: C.papier, part: 0.38, variante: "lancement" })).png());
    }
    await ecrire(R(res, "drawable", "splash.png"), sharp(svg(480, 320, { fond: C.papier, part: 0.38, variante: "lancement" })).png());
    await ecrire(R("assets/store/google-play-icone-512.png"), await iconePng(512));
    await ecrire(R("assets/store/google-play-banniere-1024x500.png"), sharp(banniere()).flatten({ background: C.papier }).png());
  }

  if (existe("ios")) {
    console.log("iOS");
    const xc = "ios/App/App/Assets.xcassets";
    // l'App Store refuse une icône avec canal alpha : flatten + removeAlpha
    await ecrire(R(xc, "AppIcon.appiconset", "AppIcon-512@2x.png"), sharp(await icone.clone().toBuffer()).removeAlpha().png());
    for (const [nom, fond, variante] of [["splash-2732x2732", C.papier, "lancement"], ["splash-nuit-2732x2732", C.nuit, "nuit"]]) {
      await ecrire(R(xc, "Splash.imageset", nom + ".png"), sharp(svg(2732, 2732, { fond, part: 0.2, variante })).png({ compressionLevel: 9 }));
    }
    for (const ancien of ["splash-2732x2732-1.png", "splash-2732x2732-2.png"]) fs.rmSync(R(xc, "Splash.imageset", ancien), { force: true });
    fs.writeFileSync(R(xc, "Splash.imageset", "Contents.json"), JSON.stringify({
      images: [
        { idiom: "universal", filename: "splash-2732x2732.png" },
        { idiom: "universal", filename: "splash-nuit-2732x2732.png", appearances: [{ appearance: "luminosity", value: "dark" }] }
      ],
      info: { version: 1, author: "xcode" }
    }, null, 2) + "\n");
  }
  console.log("✓ Icônes générées");
})().catch(function (e) { console.error(e); process.exit(1); });
