/* Tchip — logique du jeu (v1, sans serveur)
 * - Une expression par jour, la même pour tout le monde, numérotée depuis le lancement.
 * - Étape 1 « Ça veut dire quoi ? » : 4 propositions, 2 essais. Après une erreur, l'indice (phrase d'exemple) s'ouvre.
 * - Étape 2 « D'où ça vient ? » : 4 pays, 1 essai, +1 point.
 * - Score sur 4 : 3 (1er essai) ou 1 (2e essai) ou 0, + 1 pour le pays.
 * Tout est stocké dans le navigateur (localStorage), sans compte.
 */
(function () {
  "use strict";

  // ---------- Réglages ----------
  var LANCEMENT = { a: 2026, m: 10, j: 25 };      // jour #1 (année, mois 1-12, jour)
  var ADRESSE_PARTAGE = "tchip.app";               // à remplacer par le vrai domaine
  var DEPOT_PROPOSITIONS = "https://github.com/admonbly/tchip"; // les propositions arrivent en tickets ici
  var SENS_MAX = 3;                                 // sens proposés au maximum pour une expression
  var ESSAIS_SENS = 2;

  var EXPR = window.TCHIP_EXPRESSIONS || [];
  var PAYS = window.TCHIP_PAYS || {};
  var app = document.getElementById("app");
  var toastEl = document.getElementById("toast");

  // ---------- Stockage prudent ----------
  function lire(cle, defaut) {
    try { var v = localStorage.getItem(cle); return v ? JSON.parse(v) : defaut; } catch (e) { return defaut; }
  }
  function ecrire(cle, val) {
    try { localStorage.setItem(cle, JSON.stringify(val)); } catch (e) { /* stockage indisponible : on joue quand même */ }
  }

  // ---------- Dates ----------
  function numeroDuJour(date) {
    var d = date || new Date();
    var auj = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    var dep = Date.UTC(LANCEMENT.a, LANCEMENT.m - 1, LANCEMENT.j);
    return Math.max(1, Math.floor((auj - dep) / 86400000) + 1);
  }
  function dateDuNumero(n) {
    var dep = Date.UTC(LANCEMENT.a, LANCEMENT.m - 1, LANCEMENT.j);
    var d = new Date(dep + (n - 1) * 86400000);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" });
  }
  function avantMinuit() {
    var now = new Date();
    var minuit = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var s = Math.max(0, Math.floor((minuit - now) / 1000));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    function p(x) { return (x < 10 ? "0" : "") + x; }
    return p(h) + ":" + p(m) + ":" + p(sec);
  }

  // ---------- Hasard déterministe (même ordre pour tout le monde) ----------
  function aleaSeed(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function melanger(liste, alea) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(alea() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function puzzle(n) {
    var e = EXPR[(n - 1) % EXPR.length];
    var alea = aleaSeed(n * 7919);
    var sens = melanger([e.sens].concat(e.leurres), alea);
    var autres = Object.keys(PAYS).filter(function (c) { return c !== e.pays; });
    var pays = melanger([e.pays].concat(melanger(autres, alea).slice(0, 3)), alea);
    return { n: n, e: e, sens: sens, pays: pays };
  }

  // ---------- État ----------
  var jourReel = numeroDuJour();
  var jourAffiche = jourReel;
  var P, etat;
  var timer = null;

  function cleJour(n) { return "tchip:jour:" + n; }
  function chargerJour(n) {
    jourAffiche = n;
    P = puzzle(n);
    etat = lire(cleJour(n), null) || { erreurs: [], sensOk: false, sensFini: false, pays: null, fini: false };
  }
  function sauver() { ecrire(cleJour(jourAffiche), etat); }

  function score(st) {
    var s = 0;
    if (st.sensOk) s += st.erreurs.length === 0 ? 3 : 1;
    if (st.pays && st.pays === P.e.pays) s += 1;
    return s;
  }

  function stats() {
    return lire("tchip:stats", { joues: 0, trouves: 0, serie: 0, meilleure: 0, dernier: 0, distrib: [0, 0, 0, 0, 0] });
  }
  function enregistrerStats() {
    if (jourAffiche !== jourReel) return; // les archives ne comptent pas
    var s = stats();
    if (s.dernier === jourReel) return;
    s.joues += 1;
    if (etat.sensOk) s.trouves += 1;
    s.serie = s.dernier === jourReel - 1 ? s.serie + 1 : 1;
    s.meilleure = Math.max(s.meilleure, s.serie);
    s.dernier = jourReel;
    s.distrib[score(etat)] += 1;
    ecrire("tchip:stats", s);
  }
  function serieActuelle() {
    var s = stats();
    return (s.dernier === jourReel || s.dernier === jourReel - 1) ? s.serie : 0;
  }

  // ---------- Petits utilitaires d'affichage ----------
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove("visible"); }, 1800);
  }
  function vibrer(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }

  var ICONES = {
    aide: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/><path d="M12 17.6h.01"/></svg>',
    stats: '<svg viewBox="0 0 24 24"><path d="M5 20V12M12 20V5M19 20v-5"/></svg>',
    archives: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
    partager: '<svg viewBox="0 0 24 24"><path d="M12 15V3M7.5 7.5 12 3l4.5 4.5"/><path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>',
    fermer: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    bulle: '<svg viewBox="0 0 24 24"><path d="M12 3.5c5 0 9 3.3 9 7.5s-4 7.5-9 7.5c-1.1 0-2.2-.2-3.2-.5L4 20l1.3-3.6C3.9 15 3 13.1 3 11c0-4.2 4-7.5 9-7.5z"/><path d="M12 8v6M9 11h6"/></svg>'
  };

  var WORDMARK = '<svg class="wordmark" viewBox="-8 0 232 100" role="img" aria-label="Tchip"><g class="ink" fill="none" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12V54q0 16 16 16"/><path d="M2 32H28"/><path d="M74 36A20 20 0 1 0 74 64"/><path d="M94 10V70M94 48A16 16 0 0 1 126 48V70"/><path d="M146 36V70"/><path d="M168 36V92"/><circle cx="186" cy="52" r="17"/></g><path d="M146 1c6.6 0 11 4.2 11 9.4s-4.4 9.4-11 9.4c-1.4 0-2.7-.2-3.9-.6L136 22l1.4-4.6c-1.6-1.8-2.4-4.2-2.4-7C135 5.2 139.4 1 146 1z" fill="var(--piment)"/></svg>';

  function mascotte(humeur) {
    var bulle = '<path class="bulle" d="M60 12c27.6 0 48 18.8 48 44s-20.4 44-48 44c-6.2 0-12-.9-17.4-2.7L20 108l5.6-20.4C16.9 79.6 12 68.5 12 56 12 30.8 32.4 12 60 12z" style="fill:var(--indigo)" stroke="var(--encre)" stroke-width="3"/>';
    var visage;
    if (humeur === "joie") {
      visage = '<path d="M38 46q7-9 14 0M66 46q7-9 14 0" fill="none" stroke="#FFF3DF" stroke-width="6" stroke-linecap="round"/>' +
               '<path d="M42 62q17 16 34 0" fill="none" stroke="#FFF3DF" stroke-width="7" stroke-linecap="round"/>';
    } else {
      visage = '<path d="M40 43h12M66 41l12 3" stroke="#FFF3DF" stroke-width="6" stroke-linecap="round"/>' +
               '<path d="M42 66c9-8 23-10 34-4" fill="none" stroke="#FFF3DF" stroke-width="7" stroke-linecap="round"/>' +
               '<path d="M73 56.5c4-3.6 11.5-3.6 14 .8 2.4 4.2-.6 9.4-6.2 10-4.4.5-8.6-1.6-9.6-5-.5-2.1.3-4.4 1.8-5.8z" fill="#FF4D2E"/>';
    }
    var ondes = humeur === "joie"
      ? '<path d="M100 30l6-8M106 50h10M100 70l6 8" stroke="#FFC233" stroke-width="5.5" stroke-linecap="round"/>'
      : '<path d="M100 42l8-7M103 57h11M100 72l8 7" stroke="#FFC233" stroke-width="5.5" stroke-linecap="round"/>';
    return '<svg class="mascotte" id="mascotte" viewBox="0 0 120 120" aria-hidden="true"><g transform="translate(2 6) scale(.86)">' + bulle + visage + '</g>' + ondes + '</svg>';
  }

  function motif() {
    // demi-cercles « wax » : piment, mangue, menthe, indigo en alternance
    var c = ["var(--piment)", "var(--mangue)", "var(--menthe)", "var(--indigo)"], s = "";
    for (var i = 0; i < 12; i++) {
      var x = i * 40;
      s += i % 2 === 0
        ? '<path d="M' + x + ' 44a20 20 0 0 1 40 0z" fill="' + c[i % 4] + '"/>'
        : '<circle cx="' + (x + 20) + '" cy="16" r="12" fill="' + c[i % 4] + '"/>';
    }
    return '<svg class="motif" viewBox="0 0 480 44" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + s + '</svg>';
  }

  function enTete() {
    return '<header class="topbar">' + WORDMARK +
      '<div class="icons">' +
      '<button class="icon-btn" data-act="archives" aria-label="Jours précédents">' + ICONES.archives + '</button>' +
      '<button class="icon-btn" data-act="stats" aria-label="Mes statistiques">' + ICONES.stats + '</button>' +
      '<button class="icon-btn" data-act="aide" aria-label="Comment jouer">' + ICONES.aide + '</button>' +
      '</div></header>';
  }

  function ligneDuJour() {
    var serie = serieActuelle();
    var gauche = jourAffiche === jourReel
      ? '<span class="chip">Tchip #' + jourAffiche + ' · ' + esc(dateDuNumero(jourAffiche)) + '</span>'
      : '<span class="chip archive">Archive #' + jourAffiche + ' · ' + esc(dateDuNumero(jourAffiche)) + '</span>';
    var droite = serie > 0 ? '<span class="chip serie" aria-label="Série de ' + serie + ' jours">🔥 ' + serie + ' j</span>' : '';
    return '<div class="dayline">' + gauche + droite + '</div>';
  }

  function vies() {
    var s = "";
    for (var i = 0; i < ESSAIS_SENS; i++) {
      var perdue = i >= ESSAIS_SENS - etat.erreurs.length;
      s += '<svg class="vie' + (perdue ? ' perdue' : '') + '" viewBox="0 0 24 20" aria-hidden="true"><path d="M12 1c6 0 11 3.8 11 8.6S18 18 12 18c-1.2 0-2.3-.2-3.4-.5L3 19.5l1.4-4C2.3 14 1 11.9 1 9.6 1 4.8 6 1 12 1z"/></svg>';
    }
    var reste = ESSAIS_SENS - etat.erreurs.length;
    return '<div class="vies">' + s + '<span>' + (reste > 1 ? reste + ' essais' : reste === 1 ? 'Dernier essai' : 'Plus d\'essai') + '</span></div>';
  }

  // ---------- Écrans ----------
  function rendre() {
    clearInterval(timer);
    if (!EXPR.length) { app.innerHTML = enTete() + '<p class="vide">Aucune expression chargée.</p>'; return; }
    if (etat.fini) return rendreResultat();
    var h = enTete() + ligneDuJour();
    h += '<section class="card">' + mascotte("neutre") +
         '<p class="question">' + (etat.sensFini ? 'Bonus · D\'où ça vient ?' : 'Ça veut dire quoi ?') + '</p>' +
         '<h1 class="expression">«&nbsp;' + esc(P.e.expression) + '&nbsp;»</h1>' +
         (etat.sensFini ? '<div class="vies"><span>' + (etat.sensOk ? 'Sens trouvé ✓ ' : 'Sens : ' + esc(P.e.sens)) + '</span></div>' : vies()) +
         '</section>';

    if (!etat.sensFini) {
      var ouvert = etat.erreurs.length > 0;
      h += '<div class="indice' + (ouvert ? ' ouvert' : '') + '"><b>Indice' + (ouvert ? '' : ' verrouillé') + '</b>' +
           (ouvert ? esc(P.e.exemple) : 'Une phrase d\'exemple s\'ouvre si tu te trompes.') + '</div>';
      h += '<div class="etape-titre"><h2>Choisis le bon sens</h2><span>' + (ouvert ? '1 point' : '3 points') + '</span></div>';
      h += '<div class="options">';
      P.sens.forEach(function (txt, i) {
        var faux = etat.erreurs.indexOf(txt) !== -1;
        h += '<button class="option' + (faux ? ' faux' : '') + '" data-sens="' + i + '"' + (faux ? ' disabled' : '') + '>' +
             '<span class="lettre">' + (faux ? '✕' : "ABCD"[i]) + '</span><span>' + esc(txt) + '</span></button>';
      });
      h += '</div>';
    } else {
      h += '<div class="etape-titre"><h2>D\'où vient cette expression ?</h2><span>+1 point</span></div><div class="options">';
      P.pays.forEach(function (code, i) {
        var p = PAYS[code];
        h += '<button class="option" data-pays="' + i + '"><span class="drapeau" aria-hidden="true">' + p.drapeau + '</span><span>' + esc(p.nom) + '</span></button>';
      });
      h += '</div>';
    }
    h += pied();
    app.innerHTML = h;
  }

  function pied() {
    return jourAffiche !== jourReel
      ? '<p class="pied">Partie d\'archive : elle ne compte pas dans ta série. <button data-act="aujourdhui">Revenir au tchip du jour</button></p>'
      : '';
  }

  function verdict(s) {
    return ["Aïe, tchip… Demain tu te rattrapes.", "Pas évident celle-là !", "Pas mal du tout.", "T'es chaud aujourd'hui !", "Sans faute. Respect total."][s];
  }

  function grilleTexte() {
    var g = etat.erreurs.map(function () { return "🟥"; }).join("") + (etat.sensOk ? "🟩" : "");
    return g;
  }

  function textePartage() {
    var s = score(etat);
    var serie = serieActuelle();
    return "Tchip #" + jourAffiche + " · " + s + "/4\n" +
      "💬 " + grilleTexte() + "\n" +
      "🌍 " + (etat.pays === P.e.pays ? "✅" : "❌") + "\n" +
      (jourAffiche === jourReel && serie > 1 ? "🔥 Série : " + serie + " jours\n" : "") +
      "Tu parles d'où ? " + ADRESSE_PARTAGE;
  }

  function rendreResultat() {
    var s = score(etat), p = PAYS[P.e.pays];
    var h = enTete() + ligneDuJour();
    h += '<section class="resultat">';
    h += '<div class="card score-card">' + mascotte(s >= 3 ? "joie" : "neutre") +
         '<p class="question">Ton score</p>' +
         '<p class="score">' + s + '<small>/4</small></p>' +
         '<p class="verdict">' + verdict(s) + '</p>' +
         '<div class="grille" aria-label="Grille de partage">💬 ' + grilleTexte() + '&nbsp; 🌍 ' + (etat.pays === P.e.pays ? '✅' : '❌') + '</div>' +
         '</div>';
    h += motif();
    h += '<article class="card fiche">' +
         '<h3>«&nbsp;' + esc(P.e.expression) + '&nbsp;»</h3>' +
         '<p class="origine">' + p.drapeau + ' ' + esc(p.nom) + '</p>' +
         '<dl><div><dt>Ça veut dire</dt><dd>' + esc(P.e.sens) + '</dd></div>' +
         '<div><dt>Exemple</dt><dd class="exemple">«&nbsp;' + esc(P.e.exemple) + '&nbsp;»</dd></div>' +
         autresSensHtml(P.e) +
         '<div><dt>Le saviez-vous ?</dt><dd>' + esc(P.e.fiche) + '</dd></div></dl>' +
         '</article>';
    h += '<div class="actions"><button class="btn" data-act="partager">' + ICONES.partager + 'Partager mon score</button>' +
         '<button class="btn secondaire" data-act="archives">Jouer un jour précédent</button></div>';
    h += '<section class="card proposer-carte">' +
         '<h3>Chez toi, on dit quoi ?</h3>' +
         '<p>Propose une expression de ton pays ou de ton quartier, avec un ou plusieurs sens. Les meilleures deviendront le tchip du jour.</p>' +
         '<button class="btn secondaire" data-act="proposer">' + ICONES.bulle + 'Proposer une expression</button>' +
         '</section>';
    if (jourAffiche === jourReel) {
      h += '<p class="prochain">Prochain tchip dans<strong id="compte">' + avantMinuit() + '</strong></p>';
    }
    h += '</section>' + pied();
    app.innerHTML = h;
    if (jourAffiche === jourReel) {
      timer = setInterval(function () {
        var el = document.getElementById("compte");
        if (!el) return clearInterval(timer);
        if (numeroDuJour() !== jourReel) { location.reload(); return; }
        el.textContent = avantMinuit();
      }, 1000);
    }
  }

  function animerMascotte(cls) {
    var m = document.getElementById("mascotte");
    if (!m) return;
    m.classList.remove("tchip", "joie"); void m.offsetWidth; m.classList.add(cls);
  }

  // ---------- Actions ----------
  function choisirSens(i) {
    var txt = P.sens[i];
    if (txt === P.e.sens) {
      etat.sensOk = true; etat.sensFini = true; sauver();
      var b = app.querySelector('[data-sens="' + i + '"]');
      if (b) { b.classList.add("bon"); b.querySelector(".lettre").textContent = "✓"; }
      app.querySelectorAll("[data-sens]").forEach(function (x) { x.disabled = true; });
      animerMascotte("joie");
      toast(etat.erreurs.length ? "Bien rattrapé !" : "Direct ! +3");
      setTimeout(rendre, 900);
    } else {
      etat.erreurs.push(txt);
      vibrer(80);
      if (etat.erreurs.length >= ESSAIS_SENS) {
        etat.sensFini = true; sauver();
        rendre(); animerMascotte("tchip");
        toast("Tchip ! C'était : " + P.e.sens);
      } else {
        sauver(); rendre(); animerMascotte("tchip");
        toast("Tchip ! Essaie encore");
      }
    }
  }

  function choisirPays(i) {
    etat.pays = P.pays[i];
    etat.fini = true;
    sauver();
    var ok = etat.pays === P.e.pays;
    app.querySelectorAll("[data-pays]").forEach(function (b, j) {
      b.disabled = true;
      if (P.pays[j] === P.e.pays) b.classList.add("bon");
      else if (j === i) b.classList.add("faux");
      else b.classList.add("eteint");
    });
    toast(ok ? "Bien vu ! +1" : "Raté, c'était " + PAYS[P.e.pays].nom);
    if (!ok) vibrer(80);
    enregistrerStats();
    setTimeout(rendre, 1100);
  }

  function partager() {
    var t = textePartage();
    var fini = function () { toast("Score copié, colle-le où tu veux !"); };
    try {
      if (navigator.share) {
        navigator.share({ text: t }).catch(function () { copier(t, fini); });
        return;
      }
    } catch (e) {}
    copier(t, fini);
  }
  function copier(t, ok) {
    try {
      navigator.clipboard.writeText(t).then(ok, function () { secours(t); });
    } catch (e) { secours(t); }
  }
  function secours(t) {
    feuille('<header><h2>Ton score</h2>' + boutonFermer() + '</header><p>Sélectionne le texte et copie-le :</p><textarea id="partage-texte" rows="6" style="width:100%;font:inherit;padding:10px;border-radius:12px;border:2.5px solid var(--encre);background:var(--surface);color:var(--encre)">' + esc(t) + '</textarea>');
    var ta = document.getElementById("partage-texte"); if (ta) { ta.focus(); ta.select(); }
  }

  // ---------- Feuilles ----------
  function boutonFermer() { return '<button class="icon-btn" data-act="fermer" aria-label="Fermer">' + ICONES.fermer + '</button>'; }
  function feuille(contenu) {
    fermerFeuille();
    var fond = document.createElement("div");
    fond.className = "feuille-fond"; fond.id = "feuille";
    fond.innerHTML = '<div class="feuille" role="dialog" aria-modal="true">' + contenu + '</div>';
    fond.addEventListener("click", function (ev) { if (ev.target === fond) fermerFeuille(); });
    document.body.appendChild(fond);
    var f = fond.querySelector("[data-act='fermer']"); if (f) f.focus();
  }
  function fermerFeuille() { var f = document.getElementById("feuille"); if (f) f.remove(); }

  function feuilleAide() {
    feuille('<header><h2>Comment jouer</h2>' + boutonFermer() + '</header>' +
      '<p>Chaque jour, une expression de la francophonie. La même pour tout le monde, de Dakar à Montréal.</p>' +
      '<ol class="regles">' +
      '<li><span class="pastille p1">1</span><div><b>Trouve le sens.</b> 4 propositions, 2 essais. Du premier coup : 3 points. Au deuxième : 1 point.</div></li>' +
      '<li><span class="pastille p2">2</span><div><b>Un indice si tu te trompes.</b> Une phrase d\'exemple s\'affiche pour t\'aider.</div></li>' +
      '<li><span class="pastille p3">3</span><div><b>Bonus : d\'où ça vient ?</b> Choisis le bon pays parmi 4, en un seul essai : +1 point.</div></li>' +
      '<li><span class="pastille p4">4</span><div><b>Partage sans spoiler.</b> Ta grille montre ton score, jamais la réponse. Reviens chaque jour pour faire grimper ta série 🔥.</div></li>' +
      '</ol>' +
      '<div class="exemple-grille">Tchip #12 · 3/4\n💬 🟥🟩\n🌍 ✅\n🔥 Série : 5 jours</div>' +
      '<p class="vide">🟥 un essai raté · 🟩 sens trouvé · 🌍 le bonus pays. Nouveau tchip chaque jour à minuit.</p>' +
      '<button class="btn secondaire" data-act="proposer">' + ICONES.bulle + 'Proposer une expression</button>');
  }

  // ---------- Autres sens (une expression peut vouloir dire autre chose ailleurs) ----------
  function autresSensHtml(e) {
    if (!e.autresSens || !e.autresSens.length) return "";
    var li = e.autresSens.map(function (a) {
      return '<li><b>' + esc(a.sens) + '</b>' + (a.ou ? '<span> · ' + esc(a.ou) + '</span>' : '') + '</li>';
    }).join("");
    return '<div><dt>Ailleurs, ça veut aussi dire</dt><dd><ul class="autres-sens">' + li + '</ul></dd></div>';
  }

  // ---------- Proposer une expression ----------
  var brouillon = null;
  function brouillonVide() { return { expression: "", pays: "", lieu: "", sens: [{ sens: "", ou: "" }], exemple: "", pseudo: "" }; }

  function optionsPays(choisi) {
    var codes = Object.keys(PAYS).sort(function (a, b) { return PAYS[a].nom.localeCompare(PAYS[b].nom, "fr"); });
    return '<option value="">Choisis…</option>' + codes.map(function (c) {
      return '<option value="' + c + '"' + (c === choisi ? ' selected' : '') + '>' + PAYS[c].drapeau + ' ' + esc(PAYS[c].nom) + '</option>';
    }).join("") + '<option value="AUTRE"' + (choisi === "AUTRE" ? ' selected' : '') + '>Un autre pays (précise-le dessous)</option>';
  }

  function lireFormulaire() {
    var f = document.getElementById("form-proposer");
    if (!f) return;
    brouillon.expression = f.elements["p-expression"].value;
    brouillon.pays = f.elements["p-pays"].value;
    brouillon.lieu = f.elements["p-lieu"].value;
    brouillon.exemple = f.elements["p-exemple"].value;
    brouillon.pseudo = f.elements["p-pseudo"].value;
    brouillon.sens = brouillon.sens.map(function (s, i) {
      return { sens: f.elements["p-sens-" + i].value, ou: f.elements["p-ou-" + i] ? f.elements["p-ou-" + i].value : "" };
    });
    ecrire("tchip:brouillon", brouillon);
  }

  function feuilleProposer() {
    if (!brouillon) brouillon = lire("tchip:brouillon", null) || brouillonVide();
    var champsSens = brouillon.sens.map(function (s, i) {
      return '<fieldset class="sens-bloc"><legend>Sens ' + (i + 1) + (i === 0 ? ' (le plus courant)' : '') + '</legend>' +
        '<label for="p-sens-' + i + '">Ça veut dire…</label>' +
        '<input id="p-sens-' + i + '" name="p-sens-' + i + '" maxlength="90" value="' + esc(s.sens) + '" placeholder="' + (i === 0 ? 'Ex. : une personne très diplômée' : 'Un autre sens') + '"' + (i === 0 ? ' required' : '') + '>' +
        (i > 0 ? '<label for="p-ou-' + i + '">Où ou dans quel contexte ? <span class="opt">facultatif</span></label>' +
          '<input id="p-ou-' + i + '" name="p-ou-' + i + '" maxlength="60" value="' + esc(s.ou) + '" placeholder="Ex. : chez les jeunes, au Gabon…">' +
          '<button type="button" class="lien-retirer" data-act="retirer-sens" data-index="' + i + '">Retirer ce sens</button>' : '') +
        '</fieldset>';
    }).join("");
    feuille('<header><h2>Propose ton expression</h2>' + boutonFermer() + '</header>' +
      '<p class="vide">Une expression qu\'on dit chez toi et que tout le monde devrait connaître. Elle peut avoir plusieurs sens : ajoute-les tous.</p>' +
      '<form id="form-proposer" class="formulaire" novalidate>' +
      '<label for="p-expression">L\'expression</label>' +
      '<input id="p-expression" name="p-expression" maxlength="60" required value="' + esc(brouillon.expression) + '" placeholder="Ex. : Long crayon">' +
      '<div class="deux-colonnes">' +
      '<div><label for="p-pays">Pays</label><select id="p-pays" name="p-pays" required>' + optionsPays(brouillon.pays) + '</select></div>' +
      '<div><label for="p-lieu">Ville ou région <span class="opt">facultatif</span></label><input id="p-lieu" name="p-lieu" maxlength="40" value="' + esc(brouillon.lieu) + '" placeholder="Ex. : Douala"></div>' +
      '</div>' +
      champsSens +
      (brouillon.sens.length < SENS_MAX ? '<button type="button" class="btn ajout" data-act="ajouter-sens">+ Ajouter un autre sens</button>' : '') +
      '<label for="p-exemple">Une phrase d\'exemple <span class="opt">facultatif</span></label>' +
      '<textarea id="p-exemple" name="p-exemple" maxlength="200" rows="2" placeholder="Comment on l\'emploie au quotidien">' + esc(brouillon.exemple) + '</textarea>' +
      '<label for="p-pseudo">Ton pseudo, pour te citer <span class="opt">facultatif</span></label>' +
      '<input id="p-pseudo" name="p-pseudo" maxlength="30" value="' + esc(brouillon.pseudo) + '" placeholder="Ex. : Aya de Yopougon">' +
      '<p class="erreur-form" id="erreur-form" hidden></p>' +
      '<button type="submit" class="btn">Préparer ma proposition</button>' +
      '</form>');
    var f = document.getElementById("form-proposer");
    f.addEventListener("input", lireFormulaire);
    f.addEventListener("submit", function (ev) { ev.preventDefault(); validerProposition(); });
  }

  function texteProposition() {
    var b = brouillon;
    var p = b.pays === "AUTRE" ? "Autre pays" : (PAYS[b.pays] ? PAYS[b.pays].drapeau + " " + PAYS[b.pays].nom : "");
    var lignes = [
      "Expression : " + b.expression.trim(),
      "Pays : " + p + (b.lieu.trim() ? " (" + b.lieu.trim() + ")" : "")
    ];
    b.sens.forEach(function (s, i) {
      if (!s.sens.trim()) return;
      lignes.push("Sens " + (i + 1) + " : " + s.sens.trim() + (s.ou && s.ou.trim() ? " — " + s.ou.trim() : ""));
    });
    if (b.exemple.trim()) lignes.push("Exemple : " + b.exemple.trim());
    if (b.pseudo.trim()) lignes.push("Proposé par : " + b.pseudo.trim());
    return lignes.join("\n");
  }

  function validerProposition() {
    lireFormulaire();
    var err = document.getElementById("erreur-form");
    var manque = [];
    if (!brouillon.expression.trim()) manque.push("l'expression");
    if (!brouillon.pays) manque.push("le pays");
    if (!brouillon.sens[0].sens.trim()) manque.push("au moins un sens");
    if (brouillon.pays === "AUTRE" && !brouillon.lieu.trim()) manque.push("le nom du pays (dans « Ville ou région »)");
    if (manque.length) {
      err.textContent = "Il manque " + manque.join(", ") + ".";
      err.hidden = false;
      return;
    }
    var texte = texteProposition();
    var titre = "Proposition : " + brouillon.expression.trim();
    var corps = texte + "\n\n---\nEnvoyé depuis le jeu Tchip.";
    var lien = DEPOT_PROPOSITIONS + "/issues/new?labels=proposition&title=" + encodeURIComponent(titre) + "&body=" + encodeURIComponent(corps);
    feuille('<header><h2>Merci, c\'est prêt !</h2>' + boutonFermer() + '</header>' +
      '<div class="exemple-grille">' + esc(texte) + '</div>' +
      '<p>Envoie-la sur la page des propositions de Tchip. On la fait relire par des gens de ton pays avant de la mettre en jeu.</p>' +
      '<a class="btn" href="' + esc(lien) + '" target="_blank" rel="noopener">Envoyer ma proposition</a>' +
      '<p class="vide">L\'envoi passe par GitHub et demande un compte gratuit. Pas de compte ? Copie le texte et envoie-le-nous sur nos réseaux.</p>' +
      '<button class="btn secondaire" data-act="copier-proposition">Copier le texte</button>' +
      '<button class="btn secondaire" data-act="nouvelle-proposition">Proposer une autre expression</button>');
    feuilleProposer.texte = texte;
  }

  function feuilleStats() {
    var s = stats();
    var max = Math.max.apply(null, s.distrib.concat([1]));
    var pct = s.joues ? Math.round((s.trouves / s.joues) * 100) : 0;
    var auj = (s.dernier === jourReel) ? lire(cleJour(jourReel), null) : null;
    var scoreAuj = auj ? (function () { var p0 = P; P = puzzle(jourReel); var sc = score(auj); P = p0; return sc; })() : -1;
    var lignes = "";
    for (var i = 4; i >= 0; i--) {
      var w = Math.max(8, Math.round((s.distrib[i] / max) * 100));
      lignes += '<div class="distrib-ligne"><span>' + i + '/4</span><div class="barre' + (i === scoreAuj ? ' actuelle' : '') + '" style="width:' + w + '%">' + s.distrib[i] + '</div></div>';
    }
    feuille('<header><h2>Mes stats</h2>' + boutonFermer() + '</header>' +
      '<div class="stats-grid">' +
      '<div class="stat"><b>' + s.joues + '</b><span>Parties</span></div>' +
      '<div class="stat"><b>' + pct + '%</b><span>Sens trouvés</span></div>' +
      '<div class="stat"><b>' + serieActuelle() + '</b><span>Série</span></div>' +
      '<div class="stat"><b>' + s.meilleure + '</b><span>Record</span></div>' +
      '</div><h3 style="margin:0;font-family:var(--f-display);font-size:20px">Répartition des scores</h3>' +
      '<div class="distrib">' + lignes + '</div>' +
      (s.joues === 0 ? '<p class="vide">Joue ton premier tchip pour remplir tes stats.</p>' : ''));
  }

  function feuilleArchives() {
    var items = "";
    for (var n = jourReel; n >= Math.max(1, jourReel - 59); n--) {
      var st = lire(cleJour(n), null);
      var label = n === jourReel ? "Aujourd'hui" : esc(dateDuNumero(n));
      var etatTxt = st && st.fini ? (function () { var p0 = P; P = puzzle(n); var sc = score(st); P = p0; return sc + "/4"; })() : (st ? "En cours" : "À jouer");
      items += '<li><button data-jour="' + n + '"><span>#' + n + ' · ' + label + '</span><span class="etat">' + etatTxt + '</span></button></li>';
    }
    feuille('<header><h2>Jours précédents</h2>' + boutonFermer() + '</header>' +
      '<p class="vide">Rattrape les tchips que tu as ratés. Ils ne comptent pas dans ta série.</p>' +
      '<ul class="archives">' + items + '</ul>' +
      (jourReel === 1 ? '<p class="vide">C\'est le premier jour de Tchip : les archives se rempliront dès demain.</p>' : ''));
  }

  // ---------- Événements ----------
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("button");
    if (!b || b.disabled) return;
    if (b.hasAttribute("data-sens")) return choisirSens(+b.getAttribute("data-sens"));
    if (b.hasAttribute("data-pays")) return choisirPays(+b.getAttribute("data-pays"));
    if (b.hasAttribute("data-jour")) { fermerFeuille(); chargerJour(+b.getAttribute("data-jour")); rendre(); window.scrollTo(0, 0); return; }
    switch (b.getAttribute("data-act")) {
      case "aide": return feuilleAide();
      case "stats": return feuilleStats();
      case "archives": return feuilleArchives();
      case "fermer": return fermerFeuille();
      case "partager": return partager();
      case "proposer": return feuilleProposer();
      case "ajouter-sens":
        lireFormulaire();
        if (brouillon.sens.length < SENS_MAX) brouillon.sens.push({ sens: "", ou: "" });
        ecrire("tchip:brouillon", brouillon);
        feuilleProposer();
        var dernier = document.getElementById("p-sens-" + (brouillon.sens.length - 1));
        if (dernier) dernier.focus();
        return;
      case "retirer-sens":
        lireFormulaire();
        brouillon.sens.splice(+b.getAttribute("data-index"), 1);
        ecrire("tchip:brouillon", brouillon);
        return feuilleProposer();
      case "copier-proposition":
        return copier(feuilleProposer.texte || "", function () { toast("Texte copié !"); });
      case "nouvelle-proposition":
        brouillon = brouillonVide();
        ecrire("tchip:brouillon", brouillon);
        return feuilleProposer();
      case "aujourdhui": chargerJour(jourReel); rendre(); window.scrollTo(0, 0); return;
    }
  });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") fermerFeuille(); });

  // ---------- Démarrage ----------
  // En local seulement : ?jour=N pour tester n'importe quel jour
  var apercu = null;
  try {
    var local = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    var q = new URLSearchParams(location.search).get("jour");
    if (local && q && +q >= 1) apercu = +q;
  } catch (e) {}
  chargerJour(apercu || jourReel);
  rendre();
  if (!lire("tchip:vu-aide", false)) { ecrire("tchip:vu-aide", true); feuilleAide(); }

  // Exposé pour les tests
  window.TCHIP = { numeroDuJour: numeroDuJour, puzzle: puzzle, score: function (st) { return score(st); } };
})();
