/* Tchip — règles des propositions, sans dépendance à Cloudflare : utilisées par le Worker et testées par npm test.
 * Le serveur ne fait jamais confiance au formulaire : tout est revérifié ici (longueurs, champs attendus, voix).
 */

export const LIMITES = {
  expression: 60, lieu: 40, sens: 90, ou: 60, exemple: 200, pseudo: 30,
  nbSens: 3,
  voixOctets: 1024 * 1024,      // 1 Mo : quelques secondes de voix
  parHeure: 5,                  // envois par appareil et par heure
  parJour: 20,                  // envois par appareil et par jour
  totalParJour: 500             // tous joueurs confondus : la base ne peut pas être noyée
};
export const TYPES_VOIX = ["audio/mp4", "audio/x-m4a", "audio/m4a", "audio/aac", "audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/webm", "audio/ogg"];
export const STATUTS = ["nouvelle", "relecture", "acceptee", "refusee"];

// Texte d'une ligne : espaces normalisés, caractères de contrôle retirés.
function propre(v, max) {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u001f\u007f​-‏‪-‮⁦-⁩]/g, " ").replace(/\s+/g, " ").trim().slice(0, max + 1);
}

/* champs : { expression, pays, lieu, sens: [{ sens, ou }], exemple, pseudo, langue, site (piège à robots) }
 * Renvoie { ok, erreurs, valeur } ; valeur est la proposition nettoyée, prête à ranger. */
export function verifierProposition(champs) {
  const erreurs = [];
  const c = champs && typeof champs === "object" ? champs : {};
  if (c.site) erreurs.push("piege");                        // champ invisible : seul un robot le remplit
  const v = {
    expression: propre(c.expression, LIMITES.expression),
    pays: typeof c.pays === "string" ? c.pays.trim() : "",
    lieu: propre(c.lieu, LIMITES.lieu),
    exemple: propre(c.exemple, LIMITES.exemple),
    pseudo: propre(c.pseudo, LIMITES.pseudo),
    langue: c.langue === "en" ? "en" : "fr",
    sens: []
  };
  if (!v.expression) erreurs.push("expression");
  if (v.expression.length > LIMITES.expression) erreurs.push("expression trop longue");
  if (!/^([A-Z]{2}|AUTRE)$/.test(v.pays)) erreurs.push("pays");
  if (v.pays === "AUTRE" && !v.lieu) erreurs.push("lieu");
  ["lieu", "exemple", "pseudo"].forEach((k) => { if (v[k].length > LIMITES[k]) erreurs.push(k + " trop long"); });
  const sens = Array.isArray(c.sens) ? c.sens : [];
  if (sens.length > LIMITES.nbSens) erreurs.push("trop de sens");
  sens.slice(0, LIMITES.nbSens).forEach((s) => {
    const x = { sens: propre(s && s.sens, LIMITES.sens), ou: propre(s && s.ou, LIMITES.ou) };
    if (x.sens.length > LIMITES.sens || x.ou.length > LIMITES.ou) erreurs.push("sens trop long");
    if (x.sens) v.sens.push(x);
  });
  if (!v.sens.length) erreurs.push("sens");
  return { ok: erreurs.length === 0, erreurs, valeur: v };
}

// Voix jointe : type audio connu, taille raisonnable, et accord de publication obligatoire.
export function verifierVoix(type, taille, accord) {
  if (!taille) return { ok: true, voix: false };
  if (!accord) return { ok: false, erreur: "accord" };
  if (taille > LIMITES.voixOctets) return { ok: false, erreur: "voix trop lourde" };
  if (TYPES_VOIX.indexOf(String(type || "").split(";")[0].toLowerCase()) === -1) return { ok: false, erreur: "format de voix" };
  return { ok: true, voix: true };
}

// Brouillon à coller dans data/expressions.js (et sa traduction), à compléter avant de l'ajouter au jeu.
export function brouillonEntree(p) {
  const sens = typeof p.sens === "string" ? JSON.parse(p.sens) : p.sens;
  const j = (x) => JSON.stringify(x);
  const fr = [
    "  {",
    "    expression: " + j(p.expression) + ",",
    "    pays: " + j(p.pays === "AUTRE" ? "??" : p.pays) + ",   // proposé : " + (p.lieu || "-"),
    "    theme: \"quotidien\",   // à choisir dans TCHIP_THEMES",
    "    sens: " + j(sens[0].sens) + ",",
    "    leurres: [\"À ÉCRIRE\", \"À ÉCRIRE\", \"À ÉCRIRE\"],",
    "    exemple: " + j(p.exemple || "À ÉCRIRE") + ",",
    "    fiche: \"À ÉCRIRE\"" + (sens.length > 1 ? "," : ""),
    sens.length > 1 ? "    ailleurs: " + j(sens.slice(1).map((s) => ({ sens: s.sens, ou: s.ou || "À PRÉCISER" }))) : null,
    "  },"
  ].filter((l) => l !== null).join("\n");
  const en = "    " + j((p.pays === "AUTRE" ? "??" : p.pays) + "|" + p.expression) +
    ": { sens: \"TO WRITE\", leurres: [\"TO WRITE\", \"TO WRITE\", \"TO WRITE\"], fiche: \"TO WRITE\"" +
    (sens.length > 1 ? ", ailleurs: " + j(sens.slice(1).map(() => ({ sens: "TO WRITE", ou: "TO WRITE" }))) : "") + " },";
  return { fr, en, credit: p.pseudo ? "Proposé par " + p.pseudo + (p.lieu ? " (" + p.lieu + ")" : "") : "" };
}
