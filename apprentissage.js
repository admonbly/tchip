/* Tchip — moteur d'apprentissage (mode Voyager, révisions, passeport).
 * Logique pure, sans affichage : partagée entre l'app (window.TCHIP_APPRENTISSAGE) et les tests Node (require).
 *
 * Chaque mot appris a une fiche dans le « savoir » du joueur : { n: niveau 0-4, d: jour de la prochaine révision, v: nombre de réponses }.
 * Une bonne réponse au bon moment (mot nouveau ou à revoir) fait monter le niveau et espace la révision (1, 3, 7 puis 21 jours) ;
 * une bonne réponse avant l'heure ne compte pas : on ne maîtrise pas un mot en rejouant dix fois la même série.
 * Une erreur ramène à 0 et on revoit le mot demain. Un mot est « maîtrisé » à partir du niveau 3.
 * Les tampons du passeport s'obtiennent au pourcentage de mots maîtrisés d'un pays : 25, 50, 75 et 100 %.
 * Les jours sont les numéros du jeu (numeroDuJour).
 */
(function (racine) {
  "use strict";

  var INTERVALLES = [1, 1, 3, 7, 21];
  var NIVEAU_MAX = INTERVALLES.length - 1;
  var MAITRISE = 3;
  var NOMS_RANGS = ["Pas encore de tampon", "Touriste", "Voyageur", "Habitué", "Enfant du pays"];
  var SEUILS = [0, 0.25, 0.5, 0.75, 1]; // part de mots maîtrisés pour chaque tampon

  function cle(e) { return e.pays + "|" + e.expression; }

  function melanger(liste, alea) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(alea() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function apresReponse(fiche, juste, jour) {
    var v = ((fiche && fiche.v) || 0) + 1;
    // trouvé avant sa date de révision : bien joué, mais le niveau ne bouge pas
    if (juste && fiche && fiche.v > 0 && fiche.d > jour) return { n: fiche.n, d: fiche.d, v: v };
    var n = juste ? Math.min((fiche ? fiche.n : 0) + 1, NIVEAU_MAX) : 0;
    return { n: n, d: jour + INTERVALLES[n], v: v };
  }
  // La réponse fera-t-elle progresser le mot ? (pour le dire au joueur)
  function compteAujourdhui(fiche, jour) { return !fiche || !fiche.v || fiche.d <= jour; }
  // Lu dans le lexique : le mot est découvert, à pratiquer dès aujourd'hui.
  function decouvrir(fiche, jour) { return fiche || { n: 0, d: jour, v: 0 }; }

  function estMaitrise(f) { return !!f && f.n >= MAITRISE; }
  function aReviser(f, jour) { return !!f && f.v > 0 && f.d <= jour; }

  function progression(liste, savoir) {
    var p = { total: liste.length, vus: 0, maitrises: 0 };
    liste.forEach(function (e) {
      var f = savoir[cle(e)];
      if (f) p.vus++;
      if (estMaitrise(f)) p.maitrises++;
    });
    return p;
  }
  function pourcentage(p) { return p.total ? Math.floor(p.maitrises / p.total * 100) : 0; }
  // Nombre de mots maîtrisés qu'il faut pour un tampon donné (au moins 1).
  function requis(p, r) { return Math.max(1, Math.ceil(SEUILS[r] * p.total)); }
  // 0 aucun tampon, 1 Touriste (25 % maîtrisés), 2 Voyageur (50 %), 3 Habitué (75 %), 4 Enfant du pays (100 %)
  function rang(p) {
    if (!p.total) return 0;
    for (var r = SEUILS.length - 1; r >= 1; r--) if (p.maitrises >= requis(p, r)) return r;
    return 0;
  }
  // Le prochain tampon à décrocher : { rang, nom, seuil (%), requis, manque } ou null si tout est maîtrisé.
  function prochainPalier(p) {
    var r = rang(p) + 1;
    if (r >= SEUILS.length || !p.total) return null;
    var n = requis(p, r);
    return { rang: r, nom: NOMS_RANGS[r], seuil: Math.round(SEUILS[r] * 100), requis: n, manque: n - p.maitrises };
  }
  // L'accent du joueur : le pays dont il maîtrise la plus grande part (3 mots maîtrisés au minimum).
  function accent(progressions) {
    var meilleur = null;
    Object.keys(progressions).forEach(function (code) {
      var p = progressions[code];
      if (p.maitrises < 3) return;
      var r = p.maitrises / p.total;
      if (!meilleur || r > meilleur.part || (r === meilleur.part && p.maitrises > meilleur.maitrises)) {
        meilleur = { code: code, part: r, maitrises: p.maitrises };
      }
    });
    if (meilleur) meilleur.degre = meilleur.part >= 1 ? "complètement" : meilleur.part >= 0.75 ? "très" : meilleur.part >= 0.5 ? "pas mal" : "un peu";
    return meilleur;
  }

  // Une série : d'abord les mots à revoir (les plus en retard d'abord), puis les nouveaux, puis les moins sûrs.
  function composerSerie(liste, savoir, jour, alea, taille) {
    var dus = [], nouveaux = [], autres = [];
    liste.forEach(function (e) {
      var f = savoir[cle(e)];
      if (aReviser(f, jour)) dus.push(e);
      else if (!f || !f.v) nouveaux.push(e);
      else autres.push(e);
    });
    dus.sort(function (a, b) { return savoir[cle(a)].d - savoir[cle(b)].d; });
    autres.sort(function (a, b) { return savoir[cle(a)].n - savoir[cle(b)].n || savoir[cle(a)].d - savoir[cle(b)].d; });
    return melanger(dus.concat(melanger(nouveaux, alea), autres).slice(0, taille), alea);
  }

  // Une question sur e. memePays = les expressions du même pays (pour la question inverse).
  // « sens » : reconnaître ce que ça veut dire. « inverse » : retrouver l'expression à partir du sens,
  // proposée seulement pour un mot déjà rencontré, avec des intrus du même pays qui ont un autre sens.
  function question(e, memePays, savoir, alea) {
    var f = savoir[cle(e)];
    var sensDeE = [e.sens].concat((e.ailleurs || []).map(function (a) { return a.sens; }));
    var intrus = memePays.filter(function (x) {
      return x.expression !== e.expression && sensDeE.indexOf(x.sens) === -1;
    });
    if (f && f.n >= 1 && intrus.length >= 3 && alea() < 0.4) {
      var opts = melanger([e.expression].concat(melanger(intrus, alea).slice(0, 3).map(function (x) { return x.expression; })), alea);
      return { e: e, type: "inverse", options: opts, bonne: opts.indexOf(e.expression) };
    }
    var o = melanger([e.sens].concat(e.leurres), alea);
    return { e: e, type: "sens", options: o, bonne: o.indexOf(e.sens) };
  }

  var api = {
    INTERVALLES: INTERVALLES, NOMS_RANGS: NOMS_RANGS, MAITRISE: MAITRISE, SEUILS: SEUILS,
    cle: cle, melanger: melanger, apresReponse: apresReponse, compteAujourdhui: compteAujourdhui, decouvrir: decouvrir,
    estMaitrise: estMaitrise, aReviser: aReviser, progression: progression, pourcentage: pourcentage,
    rang: rang, prochainPalier: prochainPalier, accent: accent,
    composerSerie: composerSerie, question: question
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else racine.TCHIP_APPRENTISSAGE = api;
})(this);
