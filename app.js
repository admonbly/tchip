/* Tchip — logique du jeu (sans compte ni serveur de jeu)
 * - Une expression par jour, la même pour tout le monde, numérotée depuis le lancement.
 * - Étape 1 « Ça veut dire quoi ? » : 4 propositions, 2 essais. Après une erreur, l'indice (phrase d'exemple) s'ouvre.
 * - Étape 2 « D'où ça vient ? » : 4 pays, 1 essai, +1 point.
 * - Score sur 4 : 3 (1er essai) ou 1 (2e essai) ou 0, + 1 pour le pays.
 * La progression reste sur l'appareil (localStorage). Les mêmes fichiers tournent sur le web
 * et dans les apps iOS/Android (Capacitor) : les fonctions natives sont optionnelles.
 */
(function () {
  "use strict";

  // ---------- Réglages ----------
  var LANCEMENT = { a: 2026, m: 10, j: 25 };      // jour #1 (année, mois 1-12, jour)
  var ADRESSE_PARTAGE = "tchip.app";               // à remplacer par le vrai domaine
  var ESSAIS_SENS = 2;
  var VERSION_APP = "dev";                          // remplacé par la version de package.json au build
  // Expressions publiées en ligne : les apps reçoivent les nouvelles sans mise à jour sur les stores. "" = désactivé.
  var CONTENU_URL = "https://admonbly.github.io/tchip/data/expressions.json";
  // Statistiques anonymes (TelemetryDeck, hébergé en UE, sans traçage publicitaire). "" = désactivé.
  var TELEMETRYDECK_APP_ID = "";
  var HEURES_RAPPEL = [7, 9, 12, 18, 20];
  var ID_RAPPEL = 1;

  var EXPR_EMBARQUEES = window.TCHIP_EXPRESSIONS || [];
  var PAYS_EMBARQUES = window.TCHIP_PAYS || {};
  var EXPR = EXPR_EMBARQUEES;
  var PAYS = PAYS_EMBARQUES;
  var verifier = window.TCHIP_VERIFIER || null; // verification.js ; sans lui, aucun contenu distant n'est accepté
  var app = document.getElementById("app");
  var toastEl = document.getElementById("toast");

  // Un pays absent de TCHIP_PAYS ne doit jamais casser le rendu : repli neutre.
  function paysInfo(code) {
    return Object.prototype.hasOwnProperty.call(PAYS, code) ? PAYS[code] : { nom: String(code), drapeau: "🏳️" };
  }

  // Contrôle des données au démarrage (silencieux pour le joueur, visible en console, bloquant au build).
  function verifierDonnees() {
    var pbs = verifier ? verifier(EXPR, PAYS) : [];
    if (pbs.length && window.console && console.error) console.error("Tchip — données à corriger :\n- " + pbs.join("\n- "));
    return pbs;
  }

  // ---------- Stockage prudent ----------
  function lire(cle, defaut) {
    try { var v = localStorage.getItem(cle); return v ? JSON.parse(v) : defaut; } catch (e) { return defaut; }
  }
  function ecrire(cle, val) {
    try { localStorage.setItem(cle, JSON.stringify(val)); } catch (e) { /* stockage indisponible : on joue quand même */ }
    if (cle !== "tchip:contenu") sauvegarderSecours();
  }

  // ---------- Copie de secours native (apps) ----------
  // iOS peut vider le stockage d'une WebView quand le téléphone manque de place : la série 🔥 serait perdue.
  // On garde donc une copie de la progression dans le stockage natif de l'app (plugin Preferences).
  var CLE_SECOURS = "tchip:secours";
  var secoursEnAttente = null;
  function sauvegarderSecours() {
    var prefs = plugin("Preferences");
    if (!prefs) return;
    clearTimeout(secoursEnAttente);
    secoursEnAttente = setTimeout(function () {
      var copie = {};
      try {
        Object.keys(localStorage).forEach(function (k) {
          if (k.indexOf("tchip:") === 0 && k !== "tchip:contenu") copie[k] = localStorage.getItem(k);
        });
      } catch (e) { return; }
      prefs.set({ key: CLE_SECOURS, value: JSON.stringify(copie) }).catch(function () {});
    }, 500);
  }
  function restaurerSecours() {
    var prefs = plugin("Preferences");
    if (!prefs || lire("tchip:stats", null)) return; // stockage intact : rien à faire
    prefs.get({ key: CLE_SECOURS }).then(function (r) {
      var copie = r && r.value ? JSON.parse(r.value) : null;
      if (!copie || !copie["tchip:stats"]) return;
      Object.keys(copie).forEach(function (k) { try { localStorage.setItem(k, copie[k]); } catch (e) {} });
      if (lire("tchip:stats", null)) location.reload(); // seulement si l'écriture a réussi (pas de boucle)
    }).catch(function () {});
  }
  function reglages() {
    var r = lire("tchip:reglages", {});
    return { rappel: r.rappel === true, heure: HEURES_RAPPEL.indexOf(r.heure) !== -1 ? r.heure : 9, statsAnonymes: r.statsAnonymes !== false };
  }
  function changerReglage(cle, val) { var r = reglages(); r[cle] = val; ecrire("tchip:reglages", r); }

  // ---------- Contenu distant ----------
  // Accepté seulement s'il est valide et ne retire rien : l'ordre des jours ne doit jamais bouger.
  function contenuAcceptable(c) {
    return !!(verifier && c && Array.isArray(c.expressions) && c.pays && typeof c.pays === "object" &&
      c.expressions.length >= EXPR_EMBARQUEES.length && verifier(c.expressions, c.pays).length === 0);
  }
  function appliquerContenu(c) {
    if (contenuAcceptable(c) && c.expressions.length >= EXPR.length) { EXPR = c.expressions; PAYS = c.pays; return true; }
    return false;
  }
  function partieCommencee() { return !!(etat && (etat.erreurs.length || etat.sensFini || etat.fini)); }
  var dernierRafraichissement = 0;
  function rafraichirContenu() {
    if (!CONTENU_URL || !window.fetch || Date.now() - dernierRafraichissement < 3600000) return; // au plus une fois par heure
    dernierRafraichissement = Date.now();
    fetch(CONTENU_URL, { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (c) {
        if (!contenuAcceptable(c)) return;
        ecrire("tchip:contenu", c);
        var avant = P && P.e.expression;
        if (!appliquerContenu(c)) return;
        // l'expression du jour a changé (base qui s'allonge) : on l'affiche si la partie n'a pas commencé
        if (jourAffiche === jourReel && !partieCommencee() && puzzle(jourReel).e.expression !== avant && !document.getElementById("feuille")) {
          chargerJour(jourReel); rendre();
        }
      })
      .catch(function () { /* hors ligne : on garde le contenu connu */ });
  }

  // ---------- Pont natif (apps iOS / Android) ----------
  var Cap = window.Capacitor;
  function estNatif() { return !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform()); }
  function plugin(nom) {
    if (!estNatif() || !Cap.registerPlugin) return null;
    return (Cap.Plugins && Cap.Plugins[nom]) || Cap.registerPlugin(nom);
  }

  // ---------- Statistiques anonymes ----------
  // Un identifiant aléatoire (jamais lié à une personne), renouvelé au bout de 13 mois, haché avant envoi.
  var SESSION = Math.random().toString(36).slice(2, 10);
  function idAnonyme() {
    var id = lire("tchip:id", null);
    if (!id || !id.v || Date.now() - id.cree > 395 * 86400000) {
      id = { v: Math.random().toString(36).slice(2) + Date.now().toString(36), cree: Date.now() };
      ecrire("tchip:id", id);
    }
    return id.v;
  }
  function sha256(txt) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
    });
  }
  function signal(type, donnees) {
    if (!TELEMETRYDECK_APP_ID || !reglages().statsAnonymes || !window.fetch || !window.crypto || !crypto.subtle) return;
    var payload = { plateforme: estNatif() ? Cap.getPlatform() : "web", version: VERSION_APP };
    Object.keys(donnees || {}).forEach(function (k) { payload[k] = String(donnees[k]); });
    sha256(idAnonyme()).then(function (user) {
      var corps = { appID: TELEMETRYDECK_APP_ID, clientUser: user, sessionID: SESSION, type: type, payload: payload };
      if (VERSION_APP === "dev") corps.isTestMode = true;
      return fetch("https://nom.telemetrydeck.com/v2/", {
        method: "POST", mode: "cors", keepalive: true,
        headers: { "Content-Type": "application/json" }, body: JSON.stringify([corps])
      });
    }).catch(function () {});
  }
  // Erreurs JavaScript : remontées (message court, sans donnée personnelle) pour corriger vite.
  var erreursEnvoyees = 0;
  function signalerErreur(message, source) {
    if (erreursEnvoyees++ >= 3) return;
    signal("Erreur.js", { message: String(message || "?").slice(0, 200), source: String(source || "").split("/").pop().slice(0, 80) });
  }
  window.addEventListener("error", function (ev) { signalerErreur(ev.message, (ev.filename || "") + ":" + (ev.lineno || 0)); });
  window.addEventListener("unhandledrejection", function (ev) { signalerErreur(ev.reason && (ev.reason.message || ev.reason), "promesse"); });

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

  // score(état, expression) : indépendant de l'état global, pour pouvoir noter n'importe quel jour.
  function score(st, e) {
    var s = 0;
    if (st.sensOk) s += st.erreurs.length === 0 ? 3 : 1;
    if (st.pays && st.pays === e.pays) s += 1;
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
    s.distrib[score(etat, P.e)] += 1;
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
    toast._t = setTimeout(function () { toastEl.classList.remove("visible"); }, Math.max(1800, msg.length * 60));
  }
  // Retour haptique : natif dans les apps (l'API web de vibration n'existe pas sur iPhone).
  function vibrer(type) {
    var h = plugin("Haptics");
    if (h) { h.notification({ type: type === "succes" ? "SUCCESS" : "ERROR" }).catch(function () {}); return; }
    try { if (navigator.vibrate) navigator.vibrate(type === "succes" ? 30 : 80); } catch (e) {}
  }

  var ICONES = {
    aide: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/><path d="M12 17.6h.01"/></svg>',
    stats: '<svg viewBox="0 0 24 24"><path d="M5 20V12M12 20V5M19 20v-5"/></svg>',
    archives: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
    partager: '<svg viewBox="0 0 24 24"><path d="M12 15V3M7.5 7.5 12 3l4.5 4.5"/><path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>',
    fermer: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    reglages: '<svg viewBox="0 0 24 24"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/></svg>',
    cloche: '<svg viewBox="0 0 24 24"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>'
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
      '<button class="icon-btn" data-act="reglages" aria-label="Réglages">' + ICONES.reglages + '</button>' +
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
        var faux = etat.erreurs.indexOf(i) !== -1;
        h += '<button class="option' + (faux ? ' faux' : '') + '" data-sens="' + i + '"' + (faux ? ' disabled' : '') + '>' +
             '<span class="lettre">' + (faux ? '✕' : "ABCD"[i]) + '</span><span>' + esc(txt) + '</span></button>';
      });
      h += '</div>';
    } else {
      h += '<div class="etape-titre"><h2>D\'où vient cette expression ?</h2><span>+1 point</span></div><div class="options">';
      P.pays.forEach(function (code, i) {
        var p = paysInfo(code);
        h += '<button class="option" data-pays="' + i + '"><span class="drapeau" aria-hidden="true">' + esc(p.drapeau) + '</span><span>' + esc(p.nom) + '</span></button>';
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
    var s = score(etat, P.e);
    var serie = serieActuelle();
    return "Tchip #" + jourAffiche + " · " + s + "/4\n" +
      "💬 " + grilleTexte() + "\n" +
      "🌍 " + (etat.pays === P.e.pays ? "✅" : "❌") + "\n" +
      (jourAffiche === jourReel && serie > 1 ? "🔥 Série : " + serie + " jours\n" : "") +
      "Tu parles d'où ? " + ADRESSE_PARTAGE;
  }

  function rendreResultat() {
    var s = score(etat, P.e), p = paysInfo(P.e.pays);
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
         '<p class="origine">' + esc(p.drapeau) + ' ' + esc(p.nom) + '</p>' +
         '<dl><div><dt>Ça veut dire</dt><dd>' + esc(P.e.sens) + '</dd></div>' +
         '<div><dt>Exemple</dt><dd class="exemple">«&nbsp;' + esc(P.e.exemple) + '&nbsp;»</dd></div>' +
         '<div><dt>Le saviez-vous ?</dt><dd>' + esc(P.e.fiche) + '</dd></div></dl>' +
         '</article>';
    // Le rappel se propose ici, une seule fois, après une partie : c'est là que la permission a du sens (règle Apple).
    var proposerRappel = jourAffiche === jourReel && plugin("LocalNotifications") && !reglages().rappel && !lire("tchip:rappel-propose", false);
    h += '<div class="actions"><button class="btn" data-act="partager">' + ICONES.partager + 'Partager mon score</button>' +
         (proposerRappel ? '<button class="btn secondaire" data-act="proposer-rappel">' + ICONES.cloche + 'Me rappeler le tchip chaque jour</button>' : '') +
         '<button class="btn secondaire" data-act="archives">Jouer un jour précédent</button></div>';
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
      vibrer("succes");
      toast(etat.erreurs.length ? "Bien rattrapé !" : "Direct ! +3");
      setTimeout(rendre, 900);
    } else {
      etat.erreurs.push(i);
      vibrer("erreur");
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
    toast(ok ? "Bien vu ! +1" : "Raté, c'était " + paysInfo(P.e.pays).nom);
    vibrer(ok ? "succes" : "erreur");
    enregistrerStats();
    signal("Partie.finie", { score: score(etat, P.e), jour: jourAffiche, archive: jourAffiche !== jourReel });
    setTimeout(rendre, 1100);
  }

  function partager() {
    var t = textePartage();
    var fini = function () { toast("Score copié, colle-le où tu veux !"); };
    signal("Partage");
    var natif = plugin("Share");
    if (natif) { natif.share({ text: t, dialogTitle: "Partager mon score" }).catch(function () { /* partage annulé */ }); return; }
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
  function feuille(contenu, nom) {
    fermerFeuille();
    var fond = document.createElement("div");
    fond.className = "feuille-fond"; fond.id = "feuille";
    fond.setAttribute("data-feuille", nom || "");
    fond.innerHTML = '<div class="feuille" role="dialog" aria-modal="true">' + contenu + '</div>';
    fond.addEventListener("click", function (ev) { if (ev.target === fond) fermerFeuille(); });
    document.body.appendChild(fond);
    var f = fond.querySelector("[data-act='fermer']"); if (f) f.focus();
  }
  function fermerFeuille() { var f = document.getElementById("feuille"); if (f) f.remove(); }
  function feuilleOuverte(nom) { var f = document.getElementById("feuille"); return !!f && (!nom || f.getAttribute("data-feuille") === nom); }

  // ---------- Rappel quotidien (notification locale, programmée sur l'appareil : aucun serveur) ----------
  function programmerRappel(heure) {
    var ln = plugin("LocalNotifications");
    if (!ln) return Promise.resolve(false);
    return ln.cancel({ notifications: [{ id: ID_RAPPEL }] }).catch(function () {}).then(function () {
      return ln.schedule({ notifications: [{
        id: ID_RAPPEL,
        title: "Tchip",
        body: "Ton expression du jour t'attend 🌶️ Tu sais ce qu'elle veut dire ?",
        schedule: { on: { hour: heure, minute: 0 }, allowWhileIdle: true },
        isExactNotification: false // un rappel n'a pas besoin d'alarme exacte : aucune permission spéciale sur Android
      }] });
    }).then(function () { return true; });
  }
  function activerRappel(heure) {
    var ln = plugin("LocalNotifications");
    if (!ln) return Promise.resolve(false);
    return ln.requestPermissions().then(function (p) {
      if (p.display !== "granted") {
        changerReglage("rappel", false);
        toast("Notifications refusées : tu peux les autoriser dans les réglages du téléphone.");
        return false;
      }
      return programmerRappel(heure).then(function () {
        changerReglage("rappel", true); changerReglage("heure", heure);
        toast("Rappel activé : chaque jour à " + heure + " h");
        signal("Rappel.active", { heure: heure });
        return true;
      });
    }).catch(function () { toast("Impossible d'activer le rappel."); return false; });
  }
  function desactiverRappel() {
    var ln = plugin("LocalNotifications");
    changerReglage("rappel", false);
    if (ln) ln.cancel({ notifications: [{ id: ID_RAPPEL }] }).catch(function () {});
    signal("Rappel.desactive");
  }
  // Au lancement : si le joueur a coupé les notifications ou réinstallé l'app, on remet tout d'aplomb.
  function verifierRappel() {
    var ln = plugin("LocalNotifications");
    if (!ln || !reglages().rappel) return;
    ln.checkPermissions().then(function (p) {
      if (p.display !== "granted") { changerReglage("rappel", false); return; }
      return ln.getPending().then(function (r) {
        var present = (r.notifications || []).some(function (n) { return n.id === ID_RAPPEL; });
        if (!present) return programmerRappel(reglages().heure);
      });
    }).catch(function () {});
  }

  // ---------- Réglages, confidentialité ----------
  function interrupteur(act, actif, titre, detail) {
    return '<div class="reglage"><div><b>' + titre + '</b><span>' + detail + '</span></div>' +
      '<button class="interrupteur" role="switch" aria-checked="' + (actif ? "true" : "false") + '" aria-label="' + titre + '" data-act="' + act + '"><span></span></button></div>';
  }
  function feuilleReglages() {
    var r = reglages();
    var h = '<header><h2>Réglages</h2>' + boutonFermer() + '</header>';
    if (plugin("LocalNotifications")) {
      h += interrupteur("rappel", r.rappel, "Rappel quotidien", "Une notification quand le tchip du jour est prêt.");
      if (r.rappel) {
        h += '<label class="reglage"><div><b>Heure du rappel</b></div><select data-reglage="heure">' +
          HEURES_RAPPEL.map(function (x) { return '<option value="' + x + '"' + (x === r.heure ? " selected" : "") + '>' + x + ' h</option>'; }).join("") +
          '</select></label>';
      }
    }
    if (TELEMETRYDECK_APP_ID) {
      h += interrupteur("stats-anonymes", r.statsAnonymes, "Statistiques anonymes", "Aide à améliorer le jeu. Sans pub ni traçage, rien qui t'identifie.");
    }
    h += '<div class="actions">' +
      '<button class="btn secondaire" data-act="confidentialite">Confidentialité</button>' +
      '<button class="btn secondaire" data-act="effacer">Effacer mes données</button></div>' +
      '<p class="vide version">Tchip ' + esc(VERSION_APP) + ' · sans compte, ta progression reste sur cet appareil.</p>';
    feuille(h, "reglages");
  }
  function feuilleConfidentialite() {
    feuille('<header><h2>Confidentialité</h2>' + boutonFermer() + '</header><div class="texte-legal">Chargement…</div>', "confidentialite");
    var zone = function () { return document.querySelector("#feuille .texte-legal"); };
    fetch("confidentialite.html").then(function (r) { return r.text(); }).then(function (html) {
      var main = new DOMParser().parseFromString(html, "text/html").querySelector("main");
      if (!main || !zone()) return;
      var titre = main.querySelector("h1"); if (titre) titre.remove();
      zone().innerHTML = main.innerHTML; // notre propre page, embarquée avec l'app
    }).catch(function () { if (zone()) zone().textContent = "Page indisponible pour le moment."; });
  }
  function effacerDonnees() {
    if (!window.confirm("Effacer ta série, tes stats et tes parties sur cet appareil ? C'est définitif.")) return;
    var ln = plugin("LocalNotifications");
    if (ln) ln.cancel({ notifications: [{ id: ID_RAPPEL }] }).catch(function () {});
    clearTimeout(secoursEnAttente);
    try {
      Object.keys(localStorage).filter(function (k) { return k.indexOf("tchip:") === 0; })
        .forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
    var prefs = plugin("Preferences"); // la copie de secours part aussi, sinon elle serait restaurée
    (prefs ? prefs.remove({ key: CLE_SECOURS }).catch(function () {}) : Promise.resolve())
      .then(function () { location.reload(); });
  }

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
      '<p class="vide">🟥 un essai raté · 🟩 sens trouvé · 🌍 le bonus pays. Nouveau tchip chaque jour à minuit.</p>');
  }

  function feuilleStats() {
    var s = stats();
    var max = Math.max.apply(null, s.distrib.concat([1]));
    var pct = s.joues ? Math.round((s.trouves / s.joues) * 100) : 0;
    var auj = (s.dernier === jourReel) ? lire(cleJour(jourReel), null) : null;
    var scoreAuj = auj ? score(auj, puzzle(jourReel).e) : -1;
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
      var etatTxt = st && st.fini ? score(st, puzzle(n).e) + "/4" : (st ? "En cours" : "À jouer");
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
      case "aujourdhui": chargerJour(jourReel); rendre(); window.scrollTo(0, 0); return;
      case "reglages": return feuilleReglages();
      case "confidentialite": return feuilleConfidentialite();
      case "effacer": return effacerDonnees();
      case "rappel":
        if (reglages().rappel) { desactiverRappel(); feuilleReglages(); return; }
        b.disabled = true;
        return activerRappel(reglages().heure).then(function () { if (feuilleOuverte("reglages")) feuilleReglages(); });
      case "proposer-rappel":
        ecrire("tchip:rappel-propose", true);
        b.disabled = true;
        return activerRappel(reglages().heure).then(function () { if (etat.fini) rendre(); });
      case "stats-anonymes":
        changerReglage("statsAnonymes", !reglages().statsAnonymes);
        return feuilleReglages();
    }
  });
  document.addEventListener("change", function (ev) {
    if (ev.target.getAttribute("data-reglage") !== "heure") return;
    var heure = +ev.target.value;
    changerReglage("heure", heure);
    programmerRappel(heure).then(function () { toast("Rappel déplacé à " + heure + " h"); }).catch(function () {});
  });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") fermerFeuille(); });

  // Retour dans l'app (après une notification, ou le lendemain) : nouveau jour → nouveau tchip.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") return;
    if (numeroDuJour() !== jourReel) { location.reload(); return; }
    rafraichirContenu();
  });

  // Bouton retour Android : ferme la feuille ouverte, puis revient au jour, puis met l'app en arrière-plan.
  var appNatif = plugin("App");
  if (appNatif && Cap.getPlatform() === "android") {
    appNatif.addListener("backButton", function () {
      if (feuilleOuverte()) fermerFeuille();
      else if (jourAffiche !== jourReel) { chargerJour(jourReel); rendre(); window.scrollTo(0, 0); }
      else appNatif.minimizeApp();
    });
  }

  function enregistrerServiceWorker() {
    if (estNatif() || !("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }

  // ---------- Démarrage ----------
  verifierDonnees();
  appliquerContenu(lire("tchip:contenu", null)); // expressions reçues lors d'une visite précédente
  chargerJour(jourReel);
  rendre();
  if (!lire("tchip:vu-aide", false)) { ecrire("tchip:vu-aide", true); feuilleAide(); }
  enregistrerServiceWorker();
  restaurerSecours();
  verifierRappel();
  rafraichirContenu();
  signal("Ouverture");

  // Exposé pour les tests
  window.TCHIP = { numeroDuJour: numeroDuJour, puzzle: puzzle, verifierDonnees: verifierDonnees, score: function (st, e) { return score(st, e || P.e); } };
})();
