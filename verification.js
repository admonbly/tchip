/* Tchip — contrôle de la base d'expressions.
 * Partagé entre l'app (navigateur, window.TCHIP_VERIFIER) et les outils Node (require) :
 * une seule règle, appliquée au build, en CI et au contenu téléchargé.
 * Renvoie la liste des problèmes (vide si tout va bien).
 */
(function (racine) {
  "use strict";

  function texte(v) { return typeof v === "string" && v.trim() !== ""; }
  function possede(obj, cle) { return Object.prototype.hasOwnProperty.call(obj, cle); }

  function verifier(expressions, pays) {
    if (!Array.isArray(expressions) || !expressions.length) return ["Aucune expression."];
    if (!pays || typeof pays !== "object") return ["TCHIP_PAYS manquant."];
    var pbs = [];
    var codes = Object.keys(pays);
    if (codes.length < 4) pbs.push("Il faut au moins 4 pays dans TCHIP_PAYS pour l'étape bonus.");
    codes.forEach(function (code) {
      if (!pays[code] || !texte(pays[code].nom) || !texte(pays[code].drapeau)) pbs.push("Pays « " + code + " » : nom ou drapeau manquant.");
    });
    expressions.forEach(function (e, i) {
      var num = "#" + (i + 1) + " « " + ((e && e.expression) || "?") + " »";
      if (!e || !texte(e.expression) || !texte(e.sens) || !texte(e.exemple) || !texte(e.fiche)) pbs.push(num + " : champ obligatoire manquant.");
      if (!e || !possede(pays, e.pays)) pbs.push(num + " : pays inconnu « " + (e && e.pays) + " » (à ajouter dans TCHIP_PAYS).");
      if (!e || !Array.isArray(e.leurres) || e.leurres.length !== 3 || !e.leurres.every(texte)) { pbs.push(num + " : il faut exactement 3 leurres."); return; }
      var opts = [e.sens].concat(e.leurres);
      if (new Set(opts).size !== opts.length) pbs.push(num + " : deux propositions identiques (sens/leurres).");
    });
    return pbs;
  }

  if (typeof module !== "undefined" && module.exports) module.exports = verifier;
  else racine.TCHIP_VERIFIER = verifier;
})(this);
