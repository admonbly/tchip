/* Tchip — musique et bruitages, joués par le code (Web Audio) : aucun fichier, aucun droit d'auteur.
 * - Bruitages : bonne réponse (deux lames de balafon qui montent), erreur (un « tchip », le bruit de bouche
 *   qui a donné son nom au jeu), tampon (coup sourd), fanfare (fin de série, nouveau tampon), clic (onglets).
 * - Musique : une boucle douce de balafon, shaker et tambour, en gamme pentatonique. Coupée par défaut.
 * Les sons respectent le bouton silencieux de l'iPhone et se mêlent à la musique du joueur (session « ambient »).
 * Usage : TCHIP_SONS.regler({ musique, bruitages }) puis TCHIP_SONS.jouer("juste" | "faux" | "tampon" | "fanfare" | "clic").
 */
(function (racine) {
  "use strict";

  var ctx = null, sortie = null, busMusique = null, bruit = null;
  var reglage = { musique: false, bruitages: true };
  var enPause = false, veille = null;

  // Le contexte audio naît au premier son (un geste du joueur : obligatoire sur iPhone).
  function contexte() {
    if (!ctx) {
      var AC = racine.AudioContext || racine.webkitAudioContext;
      if (!AC) return null;
      try { if (navigator.audioSession) navigator.audioSession.type = "ambient"; } catch (e) {}
      ctx = new AC();
      sortie = ctx.createDynamicsCompressor();
      sortie.connect(ctx.destination);
      busMusique = ctx.createGain();
      busMusique.gain.value = 0.16;
      busMusique.connect(sortie);
      // une seconde de bruit blanc, réutilisée par le shaker, le tchip et le tampon
      bruit = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      var d = bruit.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended" && !enPause) ctx.resume().catch(function () {});
    return ctx;
  }
  // Sans musique, on endort le contexte après les bruitages : pas de batterie dépensée pour rien.
  function endormirPlusTard() {
    clearTimeout(veille);
    if (reglage.musique) return;
    veille = setTimeout(function () { if (ctx && !reglage.musique) ctx.suspend().catch(function () {}); }, 2500);
  }

  function enveloppe(g, t, attaque, volume, duree) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(volume, t + attaque);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attaque + duree);
  }
  function hz(note) { return 440 * Math.pow(2, (note - 69) / 12); } // numéro MIDI → fréquence

  // Une lame de balafon : un son pur qui s'éteint vite, plus un partiel aigu (×3,9) très bref qui donne le bois.
  function balafon(dest, note, t, volume) {
    var f = hz(note);
    [[1, 1, 0.45], [3.9, 0.35, 0.07], [9.6, 0.12, 0.025]].forEach(function (p) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f * p[0];
      enveloppe(g, t, 0.003, volume * p[1], p[2]);
      o.connect(g); g.connect(dest);
      o.start(t); o.stop(t + p[2] + 0.05);
    });
  }
  function souffle(dest, t, duree, volume, filtre, f1, f2, q) {
    var s = ctx.createBufferSource(), b = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = bruit;
    b.type = filtre; b.Q.value = q || 1;
    b.frequency.setValueAtTime(f1, t);
    if (f2) b.frequency.exponentialRampToValueAtTime(f2, t + duree);
    enveloppe(g, t, 0.004, volume, duree);
    s.connect(b); b.connect(g); g.connect(dest);
    s.start(t, Math.random() * 0.5); s.stop(t + duree + 0.05);
  }
  function tambour(dest, t, volume, haut, bas) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(haut, t);
    o.frequency.exponentialRampToValueAtTime(bas, t + 0.12);
    enveloppe(g, t, 0.004, volume, 0.28);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + 0.35);
  }

  var BRUITAGES = {
    clic: function (t) { balafon(sortie, 84, t, 0.12); },
    juste: function (t) { balafon(sortie, 76, t, 0.32); balafon(sortie, 83, t + 0.09, 0.36); },
    // le « tchip » : de l'air entre les dents, qui glisse vers le grave
    faux: function (t) { souffle(sortie, t, 0.26, 0.5, "bandpass", 3400, 1100, 6); balafon(sortie, 50, t + 0.02, 0.16); },
    tampon: function (t) { tambour(sortie, t, 0.75, 120, 45); souffle(sortie, t, 0.09, 0.3, "lowpass", 900); },
    fanfare: function (t) { [69, 73, 76, 81].forEach(function (n, i) { balafon(sortie, n, t + i * 0.085, 0.3); }); balafon(sortie, 88, t + 0.36, 0.2); }
  };

  function jouer(nom) {
    if (!reglage.bruitages || !BRUITAGES[nom] || enPause || !contexte()) return;
    BRUITAGES[nom](ctx.currentTime + 0.01);
    endormirPlusTard();
  }

  // ---------- Musique ----------
  // 104 battements par minute, en doubles croches. Gamme pentatonique de ré : ré mi fa# la si.
  var TEMPO = 104, PAS = 60 / TEMPO / 4;
  var GAMME = [62, 64, 66, 69, 71, 74, 76, 78, 81];
  // Phrases de 16 pas (une mesure) : indice dans GAMME, ou -1 pour un silence. Quatre phrases, jouées en boucle.
  var PHRASES = [
    [4, -1, 3, -1, 2, -1, 3, 4, -1, 6, -1, 4, 3, -1, 2, -1],
    [2, -1, 3, -1, 4, -1, 6, -1, 7, -1, 6, 4, -1, 3, -1, -1],
    [6, -1, 4, -1, 3, 4, -1, 2, -1, 3, -1, 1, 2, -1, -1, -1],
    [1, -1, 2, -1, 3, -1, 2, 3, -1, 4, -1, 3, 2, -1, 0, -1]
  ];
  var BASSE = [50, 50, 57, 55]; // ré, ré, la, sol : une note grave par mesure, rejouée sur le temps 3
  var pas = 0, prochain = 0, horloge = null;

  function programmerPas(i, t) {
    var mesure = Math.floor(i / 16) % 4, k = i % 16;
    var n = PHRASES[mesure][k];
    if (n >= 0) balafon(busMusique, GAMME[n], t, k % 4 === 0 ? 0.55 : 0.4);
    if (k === 0 || k === 8) balafon(busMusique, BASSE[mesure], t, 0.6);
    if (k % 2 === 0) souffle(busMusique, t, 0.05, k % 4 === 2 ? 0.22 : 0.12, "highpass", 6500);
    if (k === 0 || k === 6 || k === 10) tambour(busMusique, t, 0.5, 110, 55);
    if (k === 12 && mesure % 2 === 1) souffle(busMusique, t, 0.08, 0.3, "bandpass", 900, 0, 2);
  }
  function tic() {
    while (prochain < ctx.currentTime + 0.2) {
      programmerPas(pas, prochain);
      pas = (pas + 1) % 64;
      prochain += PAS;
    }
  }
  function demarrerMusique() {
    if (horloge || enPause || !contexte()) return;
    clearTimeout(veille);
    prochain = ctx.currentTime + 0.1;
    horloge = setInterval(tic, 50);
  }
  function arreterMusique() {
    clearInterval(horloge); horloge = null;
    endormirPlusTard();
  }

  function regler(r) {
    reglage.bruitages = r.bruitages !== false;
    reglage.musique = r.musique === true;
    if (reglage.musique) demarrerMusique(); else arreterMusique();
  }

  // Sur iPhone, le son ne peut démarrer qu'après un geste : la musique attend le premier toucher.
  function auPremierGeste() {
    document.removeEventListener("pointerdown", auPremierGeste, true);
    if (reglage.musique) { contexte(); demarrerMusique(); }
  }
  if (racine.document) {
    document.addEventListener("pointerdown", auPremierGeste, true);
    // App en arrière-plan ou écran éteint : tout se tait.
    document.addEventListener("visibilitychange", function () {
      enPause = document.visibilityState !== "visible";
      if (!ctx) return;
      if (enPause) { clearInterval(horloge); horloge = null; ctx.suspend().catch(function () {}); }
      else if (reglage.musique) { ctx.resume().catch(function () {}); demarrerMusique(); }
    });
  }

  racine.TCHIP_SONS = { jouer: jouer, regler: regler, disponible: !!(racine.AudioContext || racine.webkitAudioContext) };
})(this);
