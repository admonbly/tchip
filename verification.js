/* Tchip — contrôle de la base d'expressions.
 * Partagé entre l'app (navigateur, window.TCHIP_VERIFIER) et les outils Node (require) :
 * une seule règle, appliquée au build, en CI et au contenu téléchargé.
 * Renvoie la liste des problèmes (vide si tout va bien).
 */
(function (racine) {
  "use strict";

  function texte(v) { return typeof v === "string" && v.trim() !== ""; }
  function possede(obj, cle) { return !!obj && Object.prototype.hasOwnProperty.call(obj, cle); }

  // themes est facultatif (anciennes versions du contenu) ; s'il est fourni, chaque expression doit en avoir un valide.
  function verifier(expressions, pays, themes) {
    if (!Array.isArray(expressions) || !expressions.length) return ["Aucune expression."];
    if (!pays || typeof pays !== "object") return ["TCHIP_PAYS manquant."];
    var pbs = [];
    var codes = Object.keys(pays);
    if (codes.length < 4) pbs.push("Il faut au moins 4 pays dans TCHIP_PAYS pour l'étape bonus.");
    codes.forEach(function (code) {
      var p = pays[code];
      if (!p || !texte(p.nom) || !texte(p.drapeau)) pbs.push("Pays « " + code + " » : nom ou drapeau manquant.");
      else if (themes && (!texte(p.region) || !texte(p.accent) || !texte(p.intro))) pbs.push("Pays « " + code + " » : région, accent ou intro manquant.");
    });
    if (themes) Object.keys(themes).forEach(function (t) {
      if (!themes[t] || !texte(themes[t].nom) || !texte(themes[t].emoji)) pbs.push("Thème « " + t + " » : nom ou emoji manquant.");
    });
    var vues = {};
    expressions.forEach(function (e, i) {
      var num = "#" + (i + 1) + " « " + ((e && e.expression) || "?") + " »";
      if (!e || !texte(e.expression) || !texte(e.sens) || !texte(e.exemple) || !texte(e.fiche)) { pbs.push(num + " : champ obligatoire manquant."); return; }
      var cle = e.expression.toLowerCase();
      if (vues[cle]) pbs.push(num + " : déjà présente au " + vues[cle] + " (une expression ne doit avoir qu'un pays d'origine).");
      vues[cle] = "#" + (i + 1);
      if (!possede(pays, e.pays)) pbs.push(num + " : pays inconnu « " + e.pays + " » (à ajouter dans TCHIP_PAYS).");
      if (themes && !possede(themes, e.theme)) pbs.push(num + " : thème inconnu « " + e.theme + " ».");
      if (e.aussi !== undefined && (!Array.isArray(e.aussi) || !e.aussi.every(function (c) { return possede(pays, c) && c !== e.pays; }))) {
        pbs.push(num + " : « aussi » doit lister d'autres codes de TCHIP_PAYS.");
      }
      if (e.prononciation !== undefined && !texte(e.prononciation)) pbs.push(num + " : prononciation vide.");
      if (e.audio !== undefined && (!e.audio || !texte(e.audio.fichier) || !texte(e.audio.voix))) pbs.push(num + " : audio incomplet (fichier et voix).");
      if (!Array.isArray(e.leurres) || e.leurres.length !== 3 || !e.leurres.every(texte)) { pbs.push(num + " : il faut exactement 3 leurres."); return; }
      var opts = [e.sens].concat(e.leurres);
      if (new Set(opts).size !== opts.length) pbs.push(num + " : deux propositions identiques (sens/leurres).");
      if (e.ailleurs !== undefined) {
        if (!Array.isArray(e.ailleurs) || !e.ailleurs.every(function (a) { return a && texte(a.sens) && texte(a.ou); })) pbs.push(num + " : « ailleurs » doit lister des { sens, ou }.");
        else e.ailleurs.forEach(function (a) {
          if (e.leurres.indexOf(a.sens) !== -1) pbs.push(num + " : le leurre « " + a.sens + " » est un vrai sens ailleurs, la question serait ambiguë.");
        });
      }
    });
    return pbs;
  }

  if (typeof module !== "undefined" && module.exports) module.exports = verifier;
  else racine.TCHIP_VERIFIER = verifier;
})(this);
