/* Tchip — contrôle de la base d'expressions.
 * Partagé entre l'app (navigateur, window.TCHIP_VERIFIER) et les outils Node (require) :
 * une seule règle, appliquée au build, en CI et au contenu téléchargé.
 * Renvoie la liste des problèmes (vide si tout va bien).
 */
(function (racine) {
  "use strict";

  function texte(v) { return typeof v === "string" && v.trim() !== ""; }
  // Ce qui sert à fabriquer une adresse (drapeau, voix) reste strictement local : un contenu reçu en ligne
  // ne doit jamais pouvoir faire charger un fichier ailleurs (fuite d'adresse IP, pistage).
  var CODE_PAYS = /^[A-Z]{2}$/;
  var FICHIER_AUDIO = /^audio\/[a-z]{2}\/[a-z0-9]+(-[a-z0-9]+)*\.(m4a|mp3)$/;
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
      if (!CODE_PAYS.test(code)) pbs.push("Pays « " + code + " » : le code doit faire 2 lettres majuscules.");
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
      var cle = e.pays + "|" + e.expression.toLowerCase();
      if (vues[cle]) pbs.push(num + " : « " + e.expression + " » déjà présente au " + vues[cle] + " pour ce pays (un même mot peut servir dans plusieurs pays avec un sens propre, mais pas deux fois dans le même pays).");
      vues[cle] = "#" + (i + 1);
      if (!possede(pays, e.pays)) pbs.push(num + " : pays inconnu « " + e.pays + " » (à ajouter dans TCHIP_PAYS).");
      if (themes && !possede(themes, e.theme)) pbs.push(num + " : thème inconnu « " + e.theme + " ».");
      if (e.aussi !== undefined && (!Array.isArray(e.aussi) || !e.aussi.every(function (c) { return possede(pays, c) && c !== e.pays; }))) {
        pbs.push(num + " : « aussi » doit lister d'autres codes de TCHIP_PAYS.");
      }
      if (e.prononciation !== undefined && !texte(e.prononciation)) pbs.push(num + " : prononciation vide.");
      if (e.synonymes !== undefined && (!Array.isArray(e.synonymes) || !e.synonymes.length || !e.synonymes.every(texte))) {
        pbs.push(num + " : « synonymes » doit lister au moins une autre façon de le dire (du texte).");
      }
      if (e.source !== undefined && !/^https?:\/\/\S+$/.test(e.source)) pbs.push(num + " : la source doit être une adresse web.");
      if (e.audio !== undefined && (!e.audio || !texte(e.audio.fichier) || !texte(e.audio.voix))) pbs.push(num + " : audio incomplet (fichier et voix).");
      else if (e.audio && !FICHIER_AUDIO.test(e.audio.fichier)) pbs.push(num + " : le fichier audio doit être dans audio/<pays>/, en .m4a ou .mp3 (ex. audio/ci/woro-woro.m4a).");
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

  // Traduction (data/expressions-en.js) : complète, et aussi jouable que l'original.
  function verifierTraduction(expressions, pays, themes, tr) {
    if (!tr || typeof tr !== "object" || !tr.expressions || !tr.pays) return ["Traduction : format invalide."];
    var pbs = [];
    Object.keys(pays || {}).forEach(function (c) {
      var p = tr.pays[c];
      if (!p || !texte(p.nom) || !texte(p.accent) || !texte(p.intro)) pbs.push("Traduction du pays « " + c + " » : nom, accent ou intro manquant.");
    });
    Object.keys(themes || {}).forEach(function (k) {
      if (!tr.themes || !tr.themes[k] || !texte(tr.themes[k].nom)) pbs.push("Traduction du thème « " + k + " » manquante.");
    });
    var sensFr = {}; // pays → sens anglais → sens français : deux sens différents ne doivent pas se confondre
    (expressions || []).forEach(function (e, i) {
      if (!e || e.candidat) return; // les candidats (data/candidats.js) sont relus avant d'être traduits
      var num = "#" + (i + 1) + " « " + e.expression + " »", x = tr.expressions[e.pays + "|" + e.expression];
      if (!x) { pbs.push(num + " : pas de traduction."); return; }
      if (!texte(x.sens) || !texte(x.fiche)) { pbs.push(num + " : sens ou fiche manquant dans la traduction."); return; }
      if (!Array.isArray(x.leurres) || x.leurres.length !== 3 || !x.leurres.every(texte)) { pbs.push(num + " : il faut 3 leurres traduits."); return; }
      var opts = [x.sens].concat(x.leurres);
      if (new Set(opts).size !== opts.length) pbs.push(num + " : deux propositions identiques dans la traduction.");
      var nbAilleurs = (e.ailleurs || []).length;
      if (nbAilleurs !== (x.ailleurs || []).length) pbs.push(num + " : traduire chacun des autres sens (« ailleurs »).");
      else (x.ailleurs || []).forEach(function (a) {
        if (!a || !texte(a.sens) || !texte(a.ou)) pbs.push(num + " : autre sens traduit incomplet.");
        else if (x.leurres.indexOf(a.sens) !== -1) pbs.push(num + " : le leurre « " + a.sens + " » est un vrai sens ailleurs.");
      });
      var parPays = sensFr[e.pays] = sensFr[e.pays] || {};
      if (parPays[x.sens] !== undefined && parPays[x.sens] !== e.sens) pbs.push(num + " : « " + x.sens + " » traduit déjà un autre sens de ce pays.");
      parPays[x.sens] = e.sens;
    });
    // synonymes : même sens en français dans un pays → même sens en anglais
    (expressions || []).forEach(function (e, i) {
      if (e && e.candidat) return;
      var x = e && tr.expressions[e.pays + "|" + e.expression];
      if (!x) return;
      (expressions || []).slice(i + 1).forEach(function (f) {
        var y = tr.expressions[f.pays + "|" + f.expression];
        if (y && f.pays === e.pays && f.sens === e.sens && y.sens !== x.sens) pbs.push("« " + e.expression + " » et « " + f.expression + " » sont synonymes : même sens en anglais.");
      });
    });
    return pbs;
  }
  verifier.traduction = verifierTraduction;

  if (typeof module !== "undefined" && module.exports) module.exports = verifier;
  else racine.TCHIP_VERIFIER = verifier;
})(this);
