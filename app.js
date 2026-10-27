/* Tchip — logique du jeu (sans compte ni serveur de jeu)
 * Trois onglets :
 * - Aujourd'hui : une expression par jour, la même pour tout le monde, numérotée depuis le lancement.
 *   Étape 1 « Ça veut dire quoi ? » : 4 propositions, 2 essais. Après une erreur, l'indice (phrase d'exemple) s'ouvre.
 *   Étape 2 « D'où ça vient ? » : 4 pays, 1 essai, +1 point. Score sur 4 : 3 (1er essai) ou 1 (2e essai) ou 0, + 1 pour le pays.
 * - Voyager : on choisit un pays, on joue des séries sans limite et on parcourt son lexique par thème.
 * - Carnet : passeport (un tampon par pays), « ton accent » et révisions espacées (apprentissage.js).
 * La progression reste sur l'appareil (localStorage). Les mêmes fichiers tournent sur le web
 * et dans les apps iOS/Android (Capacitor) : les fonctions natives sont optionnelles.
 */
(function () {
  "use strict";

  // ---------- Réglages ----------
  var LANCEMENT = { a: 2026, m: 10, j: 25 };      // jour #1 (année, mois 1-12, jour)
  var ADRESSE_PARTAGE = "tchip.app";               // domaine affiché dans les partages et les invitations
  var LIEN_JEU = "https://" + ADRESSE_PARTAGE + "/";
  var API_PROPOSITIONS = "https://api.tchip.app/propositions"; // le Worker de api/ : propositions des joueurs, non publiques
  var TURNSTILE_CLE = "0x4AAAAAAFokpn7_fpWGAq5P";   // clé publique Turnstile (Cloudflare › Turnstile › tchip)
  var SENS_MAX = 3;                                 // sens proposés au maximum pour une expression
  var ESSAIS_SENS = 2;
  var VERSION_APP = "dev";                          // remplacé par la version de package.json au build
  // Expressions publiées en ligne : les apps reçoivent les nouvelles sans mise à jour sur les stores. "" = désactivé.
  var CONTENU_URL = "https://tchip.app/data/expressions.json";
  // Statistiques anonymes (TelemetryDeck, hébergé en UE, sans traçage publicitaire). "" = désactivé.
  var TELEMETRYDECK_APP_ID = "";
  var HEURES_RAPPEL = [7, 9, 12, 18, 20];
  var ID_RAPPEL = 1;

  var TAILLE_SERIE = 8;

  var EXPR_EMBARQUEES = window.TCHIP_EXPRESSIONS || [];
  // BASE : le contenu en français (et ses traductions) ; EXPR, PAYS, THEMES : ce qu'on affiche, dans la langue du joueur.
  var BASE = { expressions: EXPR_EMBARQUEES, pays: window.TCHIP_PAYS || {}, themes: window.TCHIP_THEMES || {}, en: window.TCHIP_EN || null };
  var EXPR = BASE.expressions;
  var PAYS = BASE.pays;
  var THEMES = BASE.themes;
  var verifier = window.TCHIP_VERIFIER || null; // verification.js ; sans lui, aucun contenu distant n'est accepté
  var AP = window.TCHIP_APPRENTISSAGE || null;   // apprentissage.js ; sans lui, seul le jeu du jour est proposé
  var SONS = window.TCHIP_SONS || null;          // sons.js : musique et bruitages
  var app = document.getElementById("app");
  var toastEl = document.getElementById("toast");

  // Un pays absent de TCHIP_PAYS ne doit jamais casser le rendu : repli neutre.
  function paysInfo(code) {
    return Object.prototype.hasOwnProperty.call(PAYS, code) ? PAYS[code] : { nom: String(code), drapeau: "🏳️" };
  }
  // Drapeau en image : Windows n'affiche pas les drapeaux emoji (il montre « CI », « ML »…).
  // Si l'image manque (pays reçu en ligne, pas encore dans l'app), on retombe sur l'emoji, inséré comme texte
  // (par un écouteur, pas un onerror dans le HTML : la politique de sécurité interdit tout script en ligne).
  function drapeau(code, taille) {
    return '<img class="drapeau-img' + (taille ? " " + taille : "") + '" src="assets/drapeaux/' + esc(String(code).toLowerCase()) + '.svg"' +
      ' alt="" data-e="' + esc(paysInfo(code).drapeau) + '">';
  }
  document.addEventListener("error", function (ev) {
    var img = ev.target;
    if (img && img.classList && img.classList.contains("drapeau-img")) img.replaceWith(img.getAttribute("data-e") || "");
  }, true); // les erreurs d'image ne remontent pas : on les attrape à la descente

  // Contrôle des données au démarrage (silencieux pour le joueur, visible en console, bloquant au build).
  function verifierDonnees() {
    var pbs = verifier ? verifier(BASE.expressions, BASE.pays, BASE.themes) : [];
    if (verifier && verifier.traduction && BASE.en) pbs = pbs.concat(verifier.traduction(BASE.expressions, BASE.pays, BASE.themes, BASE.en));
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
    return {
      rappel: r.rappel === true, heure: HEURES_RAPPEL.indexOf(r.heure) !== -1 ? r.heure : 9, statsAnonymes: r.statsAnonymes !== false,
      musique: r.musique === true, bruitages: r.bruitages !== false, vibrations: r.vibrations !== false, animations: r.animations !== false,
      theme: r.theme === "clair" || r.theme === "sombre" ? r.theme : "auto",
      langue: r.langue === "fr" || r.langue === "en" ? r.langue : null // null : celle du téléphone
    };
  }
  function changerReglage(cle, val) { var r = reglages(); r[cle] = val; ecrire("tchip:reglages", r); }

  // ---------- Langue : français ou anglais ----------
  // Les textes de l'interface sont écrits en français dans le code ; t() les traduit (langues.js), {x} = valeur à insérer.
  // Les expressions gardent leur forme d'origine ; en anglais, leurs sens, leurres et fiches viennent de data/expressions-en.js.
  var DICO_EN = (window.TCHIP_LANGUES && window.TCHIP_LANGUES.en) || {};
  var L = "fr";
  function t(fr, v) {
    var s = (L === "en" && DICO_EN[fr]) || fr;
    return v ? s.replace(/\{(\w+)\}/g, function (m, k) { return v[k] !== undefined ? v[k] : m; }) : s;
  }
  function langueDuTelephone() {
    try { return /^en\b/i.test(navigator.language || "") ? "en" : "fr"; } catch (e) { return "fr"; } // le français reste la langue du jeu
  }
  function localiser() {
    L = reglages().langue || langueDuTelephone();
    document.documentElement.lang = L;
    var tr = L === "en" ? BASE.en : null;
    if (!tr) { EXPR = BASE.expressions; PAYS = BASE.pays; THEMES = BASE.themes; return; }
    // une expression sans traduction (arrivée en ligne avant la sienne) reste en français
    EXPR = BASE.expressions.map(function (e) {
      var x = tr.expressions && tr.expressions[e.pays + "|" + e.expression];
      return x ? Object.assign({}, e, x) : e;
    });
    PAYS = {}; THEMES = {};
    Object.keys(BASE.pays).forEach(function (c) { PAYS[c] = Object.assign({}, BASE.pays[c], (tr.pays || {})[c]); });
    Object.keys(BASE.themes).forEach(function (k) { THEMES[k] = Object.assign({}, BASE.themes[k], (tr.themes || {})[k]); });
  }

  // ---------- Affichage, sons et vibrations réglables ----------
  function appliquerReglages() {
    var r = reglages(), racine = document.documentElement;
    if (r.theme === "auto") racine.removeAttribute("data-theme");
    else racine.setAttribute("data-theme", r.theme === "sombre" ? "dark" : "light");
    racine.classList.toggle("sans-animation", !r.animations);
    if (SONS) SONS.regler(r);
  }
  function son(nom) { if (SONS) SONS.jouer(nom); }

  // ---------- Contenu distant ----------
  // Accepté seulement s'il est valide et ne retire rien : l'ordre des jours ne doit jamais bouger.
  function contenuAcceptable(c) {
    return !!(verifier && c && Array.isArray(c.expressions) && c.pays && typeof c.pays === "object" && c.themes &&
      c.expressions.length >= EXPR_EMBARQUEES.length && verifier(c.expressions, c.pays, c.themes).length === 0);
  }
  function appliquerContenu(c) {
    if (!contenuAcceptable(c) || c.expressions.length < BASE.expressions.length) return false;
    // des traductions invalides ne bloquent pas les expressions : on garde alors celles qu'on a
    var en = c.en && verifier.traduction && verifier.traduction(c.expressions, c.pays, c.themes, c.en).length === 0 ? c.en : BASE.en;
    BASE = { expressions: c.expressions, pays: c.pays, themes: c.themes, en: en };
    localiser();
    return true;
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
        if (onglet === "jour" && !serie && jourAffiche === jourReel && !partieCommencee() && puzzle(jourReel).e.expression !== avant && !document.getElementById("feuille")) {
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
    return d.toLocaleDateString(L === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", timeZone: "UTC" });
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
    // jamais un pays où l'expression s'emploie aussi : la question serait injuste
    var autres = Object.keys(PAYS).filter(function (c) { return c !== e.pays && (e.aussi || []).indexOf(c) === -1; });
    var pays = melanger([e.pays].concat(melanger(autres, alea).slice(0, 3)), alea);
    return { n: n, e: e, sens: sens, pays: pays };
  }

  // ---------- État ----------
  var jourReel = numeroDuJour();
  var jourAffiche = jourReel;
  var P, etat;
  var timer = null;
  var onglet = "jour";      // jour | voyager | carnet
  var paysOuvert = null;    // code du pays affiché dans Voyager
  var serie = null;         // série de questions en cours (Voyager ou révisions)

  function cleJour(n) { return "tchip:jour:" + n; }
  function chargerJour(n) {
    jourAffiche = n;
    P = puzzle(n);
    etat = lire(cleJour(n), null) || { erreurs: [], sensOk: false, sensFini: false, pays: null, fini: false };
    // les pays proposés au bonus restent ceux affichés, même si de nouveaux pays arrivent entre-temps
    var o = etat.optionsPays;
    if (o && o.length === 4 && o.indexOf(P.e.pays) !== -1 && o.every(function (c) { return Object.prototype.hasOwnProperty.call(PAYS, c); })) P.pays = o;
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

  // ---------- Savoir du joueur (mots appris, révisions, passeport) ----------
  function savoir() { return lire("tchip:savoir", {}); }
  function exprDuPays(code) { return EXPR.filter(function (e) { return e.pays === code; }); }
  // L'expression du jour reste cachée dans Voyager tant qu'on ne l'a pas jouée : pas de triche, pas de spoiler.
  function cacheeAujourdhui(e) {
    if (e !== puzzle(jourReel).e) return false;
    var st = lire(cleJour(jourReel), null);
    return !(st && st.fini);
  }
  function jouables(liste) { return liste.filter(function (e) { return !cacheeAujourdhui(e); }); }
  function rangPays(code, s) { return AP.rang(AP.progression(exprDuPays(code), s || savoir())); }
  function noterReponse(e, juste) {
    if (!AP) return;
    var s = savoir();
    s[AP.cle(e)] = AP.apresReponse(s[AP.cle(e)], juste, jourReel);
    ecrire("tchip:savoir", s);
  }
  function decouvrirMot(e) {
    var s = savoir();
    if (s[AP.cle(e)]) return;
    s[AP.cle(e)] = AP.decouvrir(null, jourReel);
    ecrire("tchip:savoir", s);
  }
  function aRevoir(s) {
    s = s || savoir();
    return EXPR.filter(function (e) { return AP.aReviser(s[AP.cle(e)], jourReel) && !cacheeAujourdhui(e); });
  }
  function progressions(s) {
    var p = {};
    Object.keys(PAYS).forEach(function (c) { p[c] = AP.progression(exprDuPays(c), s); });
    return p;
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
  // type : "succes", "erreur", ou "tampon" (un coup franc, comme un vrai tampon sur le passeport)
  function vibrer(type) {
    if (!reglages().vibrations) return;
    var h = plugin("Haptics");
    if (h) {
      (type === "tampon" ? h.impact({ style: "HEAVY" }) : h.notification({ type: type === "succes" ? "SUCCESS" : "ERROR" })).catch(function () {});
      return;
    }
    try { if (navigator.vibrate) navigator.vibrate(type === "succes" ? 30 : type === "tampon" ? [50, 40, 90] : 80); } catch (e) {}
  }

  // ---------- Mouvement ----------
  // Tout se coupe si le joueur les coupe dans les réglages, ou si le téléphone demande moins d'animations
  // (le CSS fait pareil de son côté).
  function moinsDeMouvement() {
    if (!reglages().animations) return true;
    try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }
  // Petits confettis qui jaillissent d'une bonne réponse.
  function confettis(el) {
    if (!el || moinsDeMouvement()) return;
    var r = el.getBoundingClientRect(), h = "";
    var couleurs = ["var(--mangue)", "var(--menthe)", "var(--piment)", "var(--sur-indigo)"];
    for (var i = 0; i < 16; i++) {
      var a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 70;
      h += '<i style="left:' + Math.round(r.left + r.width * (0.15 + Math.random() * 0.7)) + 'px;top:' + Math.round(r.top + r.height / 2) + 'px;' +
        'background:' + couleurs[i % 4] + ';--x:' + Math.round(Math.cos(a) * d) + 'px;--y:' + Math.round(Math.sin(a) * d - 30) + 'px;' +
        '--r:' + Math.round(Math.random() * 540 - 270) + 'deg"></i>';
    }
    var couche = document.createElement("div");
    couche.className = "confettis"; couche.setAttribute("aria-hidden", "true"); couche.innerHTML = h;
    document.body.appendChild(couche);
    setTimeout(function () { couche.remove(); }, 900);
  }
  // Les chiffres marqués data-compte (et data-de, s'ils partent d'ailleurs que 0) défilent jusqu'à leur valeur.
  function animerCompteurs() {
    app.querySelectorAll("[data-compte]").forEach(function (el) {
      var fin = +el.getAttribute("data-compte"), de = +(el.getAttribute("data-de") || 0), t0 = null;
      if (fin === de) return;
      el.textContent = de;
      requestAnimationFrame(function pas(t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / 650);
        el.textContent = Math.round(de + (fin - de) * (1 - Math.pow(1 - k, 3)));
        if (k < 1 && el.isConnected) requestAnimationFrame(pas);
      });
    });
  }

  var ICONES = {
    aide: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/><path d="M12 17.6h.01"/></svg>',
    stats: '<svg viewBox="0 0 24 24"><path d="M5 20V12M12 20V5M19 20v-5"/></svg>',
    archives: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
    partager: '<svg viewBox="0 0 24 24"><path d="M12 15V3M7.5 7.5 12 3l4.5 4.5"/><path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>',
    fermer: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    reglages: '<svg viewBox="0 0 24 24"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/></svg>',
    cloche: '<svg viewBox="0 0 24 24"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>',
    jour: '<svg viewBox="0 0 24 24"><path d="M12 4c4.7 0 8 2.9 8 6.6s-3.3 6.6-8 6.6c-1 0-2-.1-2.9-.4L5 18.5l1-3.2C4.8 14.1 4 12.4 4 10.6 4 6.9 7.3 4 12 4z"/></svg>',
    voyager: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5z"/></svg>',
    carnet: '<svg viewBox="0 0 24 24"><rect x="5" y="3.5" width="14" height="17" rx="2.5"/><circle cx="12" cy="10.5" r="3"/><path d="M9 16h6"/></svg>',
    retour: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    bulle: '<svg viewBox="0 0 24 24"><path d="M12 3.5c5 0 9 3.3 9 7.5s-4 7.5-9 7.5c-1.1 0-2.2-.2-3.2-.5L4 20l1.3-3.6C3.9 15 3 13.1 3 11c0-4.2 4-7.5 9-7.5z"/><path d="M12 8v6M9 11h6"/></svg>',
    son: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
    inviter: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M19 8v6M16 11h6"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><path d="M12 7.5h.01"/></svg>',
    cadenas: '<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/></svg>'
  };

  var WORDMARK = '<svg class="wordmark" viewBox="-8 0 232 100" role="img" aria-label="Tchip"><g class="ink" fill="none" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12V54q0 16 16 16"/><path d="M2 32H28"/><path d="M74 36A20 20 0 1 0 74 64"/><path d="M94 10V70M94 48A16 16 0 0 1 126 48V70"/><path d="M146 36V70"/><path d="M168 36V92"/><circle cx="186" cy="52" r="17"/></g><path d="M146 1c6.6 0 11 4.2 11 9.4s-4.4 9.4-11 9.4c-1.4 0-2.7-.2-3.9-.6L136 22l1.4-4.6c-1.6-1.8-2.4-4.2-2.4-7C135 5.2 139.4 1 146 1z" fill="var(--piment)"/></svg>';

  function mascotte(humeur) {
    var bulle = '<path class="bulle" d="M60 12c27.6 0 48 18.8 48 44s-20.4 44-48 44c-6.2 0-12-.9-17.4-2.7L20 108l5.6-20.4C16.9 79.6 12 68.5 12 56 12 30.8 32.4 12 60 12z" style="fill:var(--indigo)" stroke="var(--encre)" stroke-width="3"/>';
    var visage;
    if (humeur === "joie") {
      visage = '<path class="yeux" d="M38 46q7-9 14 0M66 46q7-9 14 0" fill="none" stroke="#FFF3DF" stroke-width="6" stroke-linecap="round"/>' +
               '<path d="M42 62q17 16 34 0" fill="none" stroke="#FFF3DF" stroke-width="7" stroke-linecap="round"/>';
    } else {
      visage = '<path d="M40 43h12M66 41l12 3" stroke="#FFF3DF" stroke-width="6" stroke-linecap="round"/>' +
               '<path d="M42 66c9-8 23-10 34-4" fill="none" stroke="#FFF3DF" stroke-width="7" stroke-linecap="round"/>' +
               '<path d="M73 56.5c4-3.6 11.5-3.6 14 .8 2.4 4.2-.6 9.4-6.2 10-4.4.5-8.6-1.6-9.6-5-.5-2.1.3-4.4 1.8-5.8z" fill="#FF4D2E"/>';
    }
    var ondes = humeur === "joie"
      ? '<path class="ondes" d="M100 30l6-8M106 50h10M100 70l6 8" stroke="#FFC233" stroke-width="5.5" stroke-linecap="round"/>'
      : '<path class="ondes" d="M100 42l8-7M103 57h11M100 72l8 7" stroke="#FFC233" stroke-width="5.5" stroke-linecap="round"/>';
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
      '<button class="icon-btn" data-act="archives" aria-label="' + t("Jours précédents") + '">' + ICONES.archives + '</button>' +
      '<button class="icon-btn" data-act="stats" aria-label="' + t("Mes statistiques") + '">' + ICONES.stats + '</button>' +
      '<button class="icon-btn" data-act="aide" aria-label="' + t("Comment jouer") + '">' + ICONES.aide + '</button>' +
      '<button class="icon-btn" data-act="reglages" aria-label="' + t("Réglages") + '">' + ICONES.reglages + '</button>' +
      '</div></header>';
  }

  function ligneDuJour() {
    var serie = serieActuelle();
    var gauche = jourAffiche === jourReel
      ? '<span class="chip">Tchip #' + jourAffiche + ' · ' + esc(dateDuNumero(jourAffiche)) + '</span>'
      : '<span class="chip archive">' + t("Archive") + ' #' + jourAffiche + ' · ' + esc(dateDuNumero(jourAffiche)) + '</span>';
    var droite = serie > 0 ? '<span class="chip serie' + (feterSerie ? ' danse' : '') + '" aria-label="' + t("Série de {n} jours", { n: serie }) + '">' +
      '<span class="flamme" aria-hidden="true">🔥</span> ' + t("{n} j", { n: serie }) + '</span>' : '';
    return '<div class="dayline">' + gauche + droite + '</div>';
  }

  function vies() {
    var s = "";
    for (var i = 0; i < ESSAIS_SENS; i++) {
      var perdue = i >= ESSAIS_SENS - etat.erreurs.length;
      s += '<svg class="vie' + (perdue ? ' perdue' : '') + '" viewBox="0 0 24 20" aria-hidden="true"><path d="M12 1c6 0 11 3.8 11 8.6S18 18 12 18c-1.2 0-2.3-.2-3.4-.5L3 19.5l1.4-4C2.3 14 1 11.9 1 9.6 1 4.8 6 1 12 1z"/></svg>';
    }
    var reste = ESSAIS_SENS - etat.erreurs.length;
    return '<div class="vies">' + s + '<span>' + (reste > 1 ? t("{n} essais", { n: reste }) : reste === 1 ? t("Dernier essai") : t("Plus d'essai")) + '</span></div>';
  }

  // ---------- Navigation ----------
  // Arrivée sur un écran : "de-droite" (on avance), "de-gauche" (on revient), "du-bas" (une série s'ouvre),
  // "place" (même écran, nouvelle étape). null = simple mise à jour (une réponse, le lexique derrière une feuille) : rien ne bouge.
  var entree = null, feterSerie = false;
  var ANIMES = ["anime", "vient-de-droite", "vient-de-gauche", "vient-du-bas"];
  function rendre() {
    rendreEcran();
    var sens = entree; entree = null;
    ANIMES.forEach(function (c) { app.classList.remove(c); }); // une mise à jour juste après une arrivée ne rejoue pas la cascade
    if (!sens || moinsDeMouvement()) return;
    void app.offsetWidth; // relance l'animation même si la classe était déjà là
    app.querySelectorAll(".grille-pays, .lexique, .passeport, .stats-grid, .options, .actions").forEach(function (liste) {
      Array.prototype.forEach.call(liste.children, function (x, i) { x.style.setProperty("--i", Math.min(i, 10)); });
    });
    app.classList.add("anime");
    if (sens !== "place") app.classList.add("vient-" + sens);
    clearTimeout(rendre._t);
    rendre._t = setTimeout(function () { ANIMES.forEach(function (c) { app.classList.remove(c); }); }, 1000);
    animerCompteurs();
  }
  // Point d'entrée unique de l'affichage : l'onglet courant, ou la série en cours (plein écran).
  function rendreEcran() {
    clearInterval(timer);
    document.body.classList.toggle("en-serie", !!serie);
    if (AP) barreOnglets();
    if (!EXPR.length) { app.innerHTML = enTete() + '<p class="vide">' + t("Aucune expression chargée.") + '</p>'; return; }
    if (serie) return rendreSerie();
    if (onglet === "voyager") return paysOuvert ? rendrePays() : rendreVoyager();
    if (onglet === "carnet") return rendreCarnet();
    return rendreJour();
  }
  var ORDRE_ONGLETS = { jour: 0, voyager: 1, carnet: 2 };
  function allerA(o, code) {
    var avant = serie ? 99 : ORDRE_ONGLETS[onglet] * 2 + (paysOuvert ? 1 : 0), apres = ORDRE_ONGLETS[o] * 2 + (code ? 1 : 0);
    // ouvrir un pays, c'est toujours aller plus loin ; sinon on glisse dans le sens des onglets
    entree = code && code !== paysOuvert ? "de-droite" : apres > avant ? "de-droite" : apres < avant ? "de-gauche" : "place";
    onglet = o; paysOuvert = code || null; serie = null;
    fermerFeuille(); rendre(); window.scrollTo(0, 0);
    if (code) signal("Pays.ouvert", { pays: code });
  }
  function barreOnglets() {
    var nav = document.getElementById("onglets");
    if (!nav) {
      nav = document.createElement("nav");
      nav.id = "onglets"; nav.className = "onglets";
      document.body.appendChild(nav);
    }
    nav.setAttribute("aria-label", t("Navigation principale"));
    var dus = aRevoir().length;
    nav.innerHTML = [["jour", t("Aujourd'hui")], ["voyager", t("Voyager")], ["carnet", t("Carnet")]].map(function (o) {
      var actif = o[0] === onglet;
      var badge = o[0] === "carnet" && dus ? '<span class="badge" aria-label="' + t("{n} mots à revoir", { n: dus }) + '">' + dus + '</span>' : '';
      return '<button data-onglet="' + o[0] + '"' + (actif ? ' aria-current="page" class="actif"' : '') + '>' + ICONES[o[0]] + '<span>' + o[1] + '</span>' + badge + '</button>';
    }).join("");
  }

  // ---------- Écran du jour ----------
  function rendreJour() {
    if (etat.fini) return rendreResultat();
    var h = enTete() + ligneDuJour();
    h += '<section class="card">' + mascotte("neutre") +
         '<p class="question">' + (etat.sensFini ? t("Bonus · D'où ça vient ?") : t("Ça veut dire quoi ?")) + '</p>' +
         '<h1 class="expression">«&nbsp;' + esc(P.e.expression) + '&nbsp;»</h1>' +
         (etat.sensFini ? '<div class="vies"><span>' + (etat.sensOk ? t("Sens trouvé ✓") + ' ' : t("Sens :") + ' ' + esc(P.e.sens)) + '</span></div>' : vies()) +
         '</section>';

    if (!etat.sensFini) {
      var ouvert = etat.erreurs.length > 0;
      h += '<div class="indice' + (ouvert ? ' ouvert' : '') + '"><b>' + (ouvert ? t("Indice") : t("Indice verrouillé")) + '</b>' +
           (ouvert ? esc(P.e.exemple) : t("Une phrase d'exemple s'ouvre si tu te trompes.")) + '</div>';
      h += '<div class="etape-titre"><h2>' + t("Choisis le bon sens") + '</h2><span>' + (ouvert ? t("1 point") : t("3 points")) + '</span></div>';
      h += '<div class="options">';
      P.sens.forEach(function (txt, i) {
        var faux = etat.erreurs.indexOf(i) !== -1;
        h += '<button class="option' + (faux ? ' faux' : '') + '" data-sens="' + i + '"' + (faux ? ' disabled' : '') + '>' +
             '<span class="lettre">' + (faux ? '✕' : "ABCD"[i]) + '</span><span>' + esc(txt) + '</span></button>';
      });
      h += '</div>';
    } else {
      h += '<div class="etape-titre"><h2>' + t("D'où vient cette expression ?") + '</h2><span>' + t("+1 point") + '</span></div><div class="options">';
      P.pays.forEach(function (code, i) {
        var p = paysInfo(code);
        h += '<button class="option" data-pays="' + i + '">' + drapeau(code, "moyen") + '<span>' + esc(p.nom) + '</span></button>';
      });
      h += '</div>';
    }
    h += pied();
    app.innerHTML = h;
  }

  function pied() {
    return jourAffiche !== jourReel
      ? '<p class="pied">' + t("Partie d'archive : elle ne compte pas dans ta série.") + ' <button data-act="aujourdhui">' + t("Revenir au tchip du jour") + '</button></p>'
      : '';
  }

  function verdict(s) {
    return t(["Aïe, tchip… Demain tu te rattrapes.", "Pas évident celle-là !", "Pas mal du tout.", "T'es chaud aujourd'hui !", "Sans faute. Respect total."][s]);
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
      (jourAffiche === jourReel && serie > 1 ? "🔥 " + t("Série : {n} jours", { n: serie }) + "\n" : "") +
      t("Tu parles d'où ?") + " " + ADRESSE_PARTAGE;
  }

  function rendreResultat() {
    var s = score(etat, P.e), p = paysInfo(P.e.pays);
    var h = enTete() + ligneDuJour();
    h += '<section class="resultat">';
    h += '<div class="card score-card">' + mascotte(s >= 3 ? "joie" : "neutre") +
         '<p class="question">' + t("Ton score") + '</p>' +
         '<p class="score"><span data-compte="' + s + '">' + s + '</span><small>/4</small></p>' +
         '<p class="verdict">' + verdict(s) + '</p>' +
         '<div class="grille" aria-label="' + t("Grille de partage") + '">💬 ' + grilleTexte() + '&nbsp; 🌍 ' + (etat.pays === P.e.pays ? '✅' : '❌') + '</div>' +
         '</div>';
    h += motif();
    h += '<article class="card fiche">' +
         '<h3>«&nbsp;' + esc(P.e.expression) + '&nbsp;»</h3>' +
         '<p class="origine">' + drapeau(P.e.pays) + ' ' + esc(p.nom) + '</p>' +
         blocSon(P.e) + blocFiche(P.e) +
         '</article>';
    // Le rappel se propose ici, une seule fois, après une partie : c'est là que la permission a du sens (règle Apple).
    var proposerRappel = jourAffiche === jourReel && plugin("LocalNotifications") && !reglages().rappel && !lire("tchip:rappel-propose", false);
    h += '<div class="actions"><button class="btn" data-act="partager">' + ICONES.partager + t("Partager mon score") + '</button>' +
         (AP ? '<button class="btn secondaire" data-voyage="' + esc(P.e.pays) + '">' + ICONES.voyager + t("Plus de mots :") + ' ' + drapeau(P.e.pays) + ' ' + esc(p.nom) + '</button>' : '') +
         (proposerRappel ? '<button class="btn secondaire" data-act="proposer-rappel">' + ICONES.cloche + t("Me rappeler le tchip chaque jour") + '</button>' : '') +
         '<button class="btn secondaire" data-act="archives">' + t("Jouer un jour précédent") + '</button></div>';
    h += '<section class="card proposer-carte">' +
         '<h3>' + t("Chez toi, on dit quoi ?") + '</h3>' +
         '<p>' + t("Propose une expression de ton pays ou de ton quartier, avec un ou plusieurs sens. Les meilleures deviendront le tchip du jour.") + '</p>' +
         '<button class="btn secondaire" data-act="proposer">' + ICONES.bulle + t("Proposer une expression") + '</button>' +
         '</section>';
    if (jourAffiche === jourReel) {
      h += '<p class="prochain">' + t("Prochain tchip dans") + '<strong id="compte">' + avantMinuit() + '</strong></p>';
    }
    h += '</section>' + pied();
    app.innerHTML = h;
    feterSerie = false; // la flamme danse une fois, juste après la partie
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
    // puis elle reprend sa respiration
    m.addEventListener("animationend", function fin(ev) {
      if (ev.target !== m) return;
      m.classList.remove(cls); m.removeEventListener("animationend", fin);
    });
  }

  // ---------- Actions ----------
  function choisirSens(i) {
    var txt = P.sens[i];
    if (txt === P.e.sens) {
      etat.sensOk = true; etat.sensFini = true; etat.optionsPays = P.pays; sauver();
      noterReponse(P.e, etat.erreurs.length === 0); // rattrapé au 2e essai : le mot reviendra en révision demain
      var b = app.querySelector('[data-sens="' + i + '"]');
      if (b) { b.classList.add("bon"); b.querySelector(".lettre").textContent = "✓"; }
      app.querySelectorAll("[data-sens]").forEach(function (x) { x.disabled = true; });
      animerMascotte("joie");
      confettis(b);
      son("juste"); vibrer("succes");
      toast(etat.erreurs.length ? t("Bien rattrapé !") : t("Direct ! +3"));
      setTimeout(function () { entree = "place"; rendre(); }, 900);
    } else {
      etat.erreurs.push(i);
      son("faux"); vibrer("erreur");
      if (etat.erreurs.length >= ESSAIS_SENS) {
        etat.sensFini = true; etat.optionsPays = P.pays; sauver();
        noterReponse(P.e, false);
        rendre(); animerMascotte("tchip");
        toast(t("Tchip ! C'était :") + " " + P.e.sens);
      } else {
        sauver(); rendre(); animerMascotte("tchip");
        toast(t("Tchip ! Essaie encore"));
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
    toast(ok ? t("Bien vu ! +1") : t("Raté, c'était {pays}", { pays: paysInfo(P.e.pays).nom }));
    son(ok ? "juste" : "faux"); vibrer(ok ? "succes" : "erreur");
    if (ok) confettis(app.querySelector('[data-pays="' + i + '"]'));
    enregistrerStats();
    signal("Partie.finie", { score: score(etat, P.e), jour: jourAffiche, archive: jourAffiche !== jourReel });
    feterSerie = jourAffiche === jourReel;
    var s = score(etat, P.e);
    setTimeout(function () { entree = "place"; rendre(); if (s >= 3) son("fanfare"); }, 1100);
  }

  function partager() {
    signal("Partage");
    partagerTexte(textePartage(), t("Partager mon score"));
  }
  function partagerTexte(texte, titre) {
    var fini = function () { toast(t("Copié, colle-le où tu veux !")); };
    var natif = plugin("Share");
    if (natif) { natif.share({ text: texte, dialogTitle: titre }).catch(function () { /* partage annulé */ }); return; }
    try {
      if (navigator.share) {
        navigator.share({ text: texte }).catch(function () { copier(texte, fini); });
        return;
      }
    } catch (e) {}
    copier(texte, fini);
  }
  function copier(texte, ok) {
    try {
      navigator.clipboard.writeText(texte).then(ok, function () { secours(texte); });
    } catch (e) { secours(texte); }
  }
  function secours(texte) {
    feuille('<header><h2>' + t("À partager") + '</h2>' + boutonFermer() + '</header><p>' + t("Sélectionne le texte et copie-le :") + '</p><textarea id="partage-texte" rows="6" style="width:100%;font:inherit;padding:10px;border-radius:12px;border:2.5px solid var(--encre);background:var(--surface);color:var(--encre)">' + esc(texte) + '</textarea>');
    var ta = document.getElementById("partage-texte"); if (ta) { ta.focus(); ta.select(); }
  }

  // ---------- Fiche d'une expression, prononciation et voix ----------
  function blocFiche(e) {
    var h = '<dl><div><dt>' + t("Ça veut dire") + '</dt><dd>' + esc(e.sens) + '</dd></div>' +
      '<div><dt>' + t("Exemple") + '</dt><dd class="exemple">«&nbsp;' + esc(e.exemple) + '&nbsp;»</dd></div>' +
      '<div><dt>' + t("Le saviez-vous ?") + '</dt><dd>' + esc(e.fiche) + '</dd></div>';
    if (e.ailleurs && e.ailleurs.length) {
      h += '<div><dt>' + t("Ailleurs, ça veut aussi dire") + '</dt><dd>' + e.ailleurs.map(function (a) {
        return esc(a.sens) + ' <span class="ou">(' + esc(a.ou) + ')</span>';
      }).join("<br>") + '</dd></div>';
    }
    if (e.aussi && e.aussi.length) {
      h += '<div><dt>' + t("Aussi employé") + '</dt><dd>' + e.aussi.map(function (c) { return drapeau(c) + " " + esc(paysInfo(c).nom); }).join(", ") + '</dd></div>';
    }
    return h + '</dl>';
  }
  // Prononciation écrite, et vraie voix enregistrée quand il y en a une, créditée : jamais de voix de synthèse,
  // pour que l'accent soit celui de quelqu'un du pays, pas une imitation.
  function blocSon(e) {
    var h = "";
    if (e.audio) {
      h += '<button class="btn-son" data-son="' + EXPR.indexOf(e) + '">' + ICONES.son +
        '<span>' + t("Écouter") + '<small>' + t("Voix :") + ' ' + esc(e.audio.voix) + (e.audio.ville ? ", " + esc(e.audio.ville) : "") + '</small></span></button>';
    }
    if (e.prononciation) h += '<p class="prononciation">' + t("Se dit&nbsp;:") + ' <i>' + esc(e.prononciation) + '</i></p>';
    return h ? '<div class="bloc-son">' + h + '</div>' : "";
  }
  var sonEnCours = null;
  function jouerSon(e) {
    if (!e || !e.audio) return;
    if (sonEnCours) sonEnCours.pause();
    var a = new Audio(e.audio.fichier), distant = false;
    a.onerror = function () {
      // fichier pas encore embarqué dans l'app (expression reçue en ligne) : on le prend sur le site
      if (!distant && CONTENU_URL) { distant = true; a.src = CONTENU_URL.replace(/data\/expressions\.json$/, "") + e.audio.fichier; a.play().catch(function () {}); }
      else toast(t("Son indisponible pour le moment."));
    };
    sonEnCours = a;
    a.play().catch(function () {});
    signal("Son.ecoute", { pays: e.pays });
  }
  function pastilles(f) {
    var n = f ? f.n : 0, h = "";
    for (var i = 1; i <= 4; i++) h += '<i' + (i <= n ? ' class="plein"' : '') + '></i>';
    return '<span class="pastilles" role="img" aria-label="' + t("Niveau {n} sur 4", { n: n }) + '">' + h + '</span>';
  }
  function etatMot(f) {
    if (!f) return t("Nouveau mot");
    if (!f.v) return t("Découvert : il t'attend dans ta prochaine série");
    var quand = f.d <= jourReel ? t("à revoir aujourd'hui") : t("à revoir dans {n} j", { n: f.d - jourReel });
    return (AP.estMaitrise(f) ? t("Maîtrisé") + " · " : "") + quand;
  }

  // ---------- Voyager ----------
  var ORDRE_REGIONS = ["Afrique de l'Ouest", "Afrique centrale", "Afrique du Nord", "Océan Indien", "Europe", "Amériques et Caraïbes"];
  function regions() {
    var r = {};
    // les régions restent en français dans les données (elles servent à trier) ; seul leur affichage est traduit
    Object.keys(BASE.pays).forEach(function (c) { var nom = BASE.pays[c].region || "Ailleurs"; (r[nom] = r[nom] || []).push(c); });
    function rangRegion(nom) { var i = ORDRE_REGIONS.indexOf(nom); return i === -1 ? 99 : i; }
    return Object.keys(r).sort(function (a, b) { return rangRegion(a) - rangRegion(b); }).map(function (nom) {
      return { nom: t(nom), codes: r[nom].sort(function (a, b) { return exprDuPays(b).length - exprDuPays(a).length; }) };
    });
  }
  function nomRang(r) { return t(AP.NOMS_RANGS[r]); }
  function badgeRang(r) { return r ? '<span class="rang rang-' + r + '">' + nomRang(r) + '</span>' : ''; }
  // Barre de mots maîtrisés, avec un repère à chaque palier de tampon (25, 50, 75 %).
  // En clair, derrière : le chemin parcouru (mots qui avancent) ; en plein, devant : les mots maîtrisés.
  // opts.de / opts.deA : maîtrisés et chemin parcouru avant la série (la barre se remplit depuis là) ;
  // opts.eclat : rang qu'on vient de décrocher.
  function barreProgression(p, opts) {
    opts = opts || {};
    var part = p.total ? p.maitrises / p.total : 0, dernier = AP.SEUILS.length - 1, a = AP.avancement(p);
    var reperes = AP.SEUILS.slice(1, -1).map(function (s, k) {
      return '<b' + (opts.eclat === k + 1 ? ' class="eclat"' : '') + ' style="left:' + Math.round(s * 100) + '%"></b>';
    }).join("");
    return '<span class="barre-prog' + (opts.eclat === dernier ? ' complete' : '') + '" role="img" aria-label="' + t("{n} mots maîtrisés sur {total}, {pct} %", { n: p.maitrises, total: p.total, pct: AP.pourcentage(p) }) + '">' +
      '<i class="en-cours" style="--p:' + a.toFixed(3) + (opts.deA ? ';--de:' + opts.deA.toFixed(3) : '') + '"></i>' +
      '<i style="--p:' + part.toFixed(3) + (opts.de ? ';--de:' + opts.de.toFixed(3) : '') + '"></i>' + reperes + '</span>';
  }
  // Sous la barre : pourquoi le tampon n'est pas encore là, quand des mots avancent.
  function phraseEnCours(p) {
    if (!p.enCours) return "";
    return '<p class="palier">' + (p.enCours > 1
      ? t("{n} mots avancent : retrouve-les les jours suivants pour qu'ils deviennent maîtrisés.", { n: p.enCours })
      : t("1 mot avance : retrouve-le les jours suivants pour qu'il devienne maîtrisé.")) + '</p>';
  }
  function phrasePalier(p) {
    var s = AP.prochainPalier(p);
    if (!s) return t("Tous les mots sont maîtrisés. Respect total !");
    return t(s.manque > 1 ? "Encore <b>{n} mots maîtrisés</b> pour le tampon {rang} ({pct} %)." : "Encore <b>{n} mot maîtrisé</b> pour le tampon {rang} ({pct} %).",
      { n: s.manque, rang: esc(nomRang(s.rang)), pct: s.seuil });
  }
  function carteRevision() {
    var n = aRevoir().length;
    if (!n) return "";
    return '<button class="carte-revision" data-act="reviser"><span class="ico" aria-hidden="true">🔁</span>' +
      '<span><b>' + (n > 1 ? t("{n} mots à revoir", { n: n }) : t("1 mot à revoir")) + '</b><small>' + t("Une série rapide pour ne pas les oublier") + '</small></span>' +
      '<span class="fleche" aria-hidden="true">→</span></button>';
  }
  function rendreVoyager() {
    var prog = progressions(savoir());
    var h = enTete() +
      '<section class="intro-page"><p class="question">' + t("Voyager") + '</p><h1 class="titre-page">' + t("Tu pars où&nbsp;?") + '</h1>' +
      '<p>' + t("Apprends à parler comme là-bas avant d'y aller. Joue autant que tu veux : chaque pays a ses séries et son lexique.") + '</p></section>' +
      carteRevision();
    regions().forEach(function (reg) {
      h += '<h2 class="region">' + esc(reg.nom) + '</h2><div class="grille-pays">';
      reg.codes.forEach(function (c) {
        var p = paysInfo(c), pr = prog[c];
        h += '<button class="carte-pays" data-voyage="' + esc(c) + '">' +
          drapeau(c, "grand") +
          '<b>' + esc(p.nom) + '</b>' +
          '<span class="compte">' + (pr.total > 1 ? t("{n} mots", { n: pr.total }) : t("1 mot")) +
          (pr.maitrises ? ' · ' + t("{pct} % maîtrisés", { pct: AP.pourcentage(pr) }) : pr.enCours ? ' · ' + texteEnCours(pr.enCours) : '') + '</span>' +
          barreProgression(pr) + badgeRang(AP.rang(pr)) + '</button>';
      });
      h += '</div>';
    });
    app.innerHTML = h;
  }
  function rendrePays() {
    var c = paysOuvert, p = paysInfo(c), s = savoir();
    var liste = exprDuPays(c), visibles = jouables(liste), pr = AP.progression(liste, s), r = AP.rang(pr);
    var h = enTete() +
      '<button class="lien-retour" data-act="retour-voyager">' + ICONES.retour + t("Tous les pays") + '</button>' +
      '<section class="card entete-pays">' +
        drapeau(c, "tres-grand") +
        '<h1 class="titre-page">' + esc(p.nom) + '</h1>' +
        (p.intro ? '<p>' + esc(p.intro) + '</p>' : '') +
        '<div class="niveau">' + (badgeRang(r) || '<span class="rang">' + nomRang(0) + '</span>') +
        '<span>' + t("{pct} % · {n}/{total} maîtrisés", { pct: '<span data-compte="' + AP.pourcentage(pr) + '">' + AP.pourcentage(pr) + '</span>', n: pr.maitrises, total: pr.total }) + '</span></div>' + barreProgression(pr) +
        '<p class="palier">' + phrasePalier(pr) + '</p>' + phraseEnCours(pr) +
      '</section>' +
      '<div class="actions"><button class="btn" data-act="serie-pays">' + ICONES.voyager + t("Jouer une série") + '</button></div>' +
      '<p class="vide centre">' + t("{n} mots par série. Un mot est maîtrisé quand tu l'as trouvé 3 fois au bon moment : la première fois, le lendemain, puis 3 jours plus tard.", { n: Math.min(TAILLE_SERIE, visibles.length) }) + '</p>';
    if (visibles.length < liste.length) h += '<p class="note-verrou">🔒 ' + t("Une expression de ce pays est le tchip du jour : elle apparaîtra ici quand tu l'auras jouée.") + '</p>';
    h += '<h2 class="region">' + t("Lexique") + '</h2>';
    Object.keys(THEMES).forEach(function (th) {
      var mots = visibles.filter(function (e) { return e.theme === th; });
      if (!mots.length) return;
      h += '<h3 class="theme"><span aria-hidden="true">' + esc(THEMES[th].emoji) + '</span> ' + esc(THEMES[th].nom) + '</h3><ul class="lexique">';
      mots.forEach(function (e) {
        var f = s[AP.cle(e)];
        h += '<li><button class="mot" data-mot="' + EXPR.indexOf(e) + '">' +
          '<span class="mot-expr">' + esc(e.expression) + (e.audio ? ' <span aria-label="' + t("avec enregistrement") + '">🔊</span>' : '') + '</span>' +
          (f ? '<span class="mot-sens">' + esc(e.sens) + '</span>' : '<span class="mot-sens cache">' + t("Touche pour découvrir") + '</span>') +
          pastilles(f) + '</button></li>';
      });
      h += '</ul>';
    });
    h += '<section class="card proposer-carte"><h3>' + t("Il manque un mot&nbsp;?") + '</h3>' +
      '<p>' + t("Tu connais une expression de {pays} qui n'est pas là ? Propose-la : elle sera relue par des gens du pays.", { pays: esc(p.nom) }) + '</p>' +
      '<button class="btn secondaire" data-act="proposer" data-code="' + esc(c) + '">' + ICONES.bulle + t("Proposer une expression") + '</button></section>';
    app.innerHTML = h;
  }
  function feuilleMot(e) {
    if (!e || cacheeAujourdhui(e)) return;
    decouvrirMot(e);
    if (onglet === "voyager" && paysOuvert && !serie) rendre(); // le sens apparaît dans le lexique, derrière la feuille
    var p = paysInfo(e.pays), th = THEMES[e.theme], f = savoir()[AP.cle(e)];
    feuille('<header><h2 class="titre-mot">«&nbsp;' + esc(e.expression) + '&nbsp;»</h2>' + boutonFermer() + '</header>' +
      '<p class="origine">' + drapeau(e.pays) + ' ' + esc(p.nom) + (th ? ' · ' + esc(th.emoji) + ' ' + esc(th.nom) : '') + '</p>' +
      blocSon(e) + '<div class="fiche">' + blocFiche(e) + '</div>' +
      '<div class="maitrise">' + pastilles(f) + '<span>' + etatMot(f) + '</span></div>', "mot");
  }

  // ---------- Séries (Voyager et révisions) ----------
  // retour = { onglet, code, source: "pays" | "revision" } : où revenir, et quoi rejouer.
  function lancerSerie(liste, retour) {
    var s = savoir();
    var choix = AP.composerSerie(jouables(liste), s, jourReel, Math.random, TAILLE_SERIE);
    if (!choix.length) { toast(t("Rien à revoir pour l'instant, reviens demain !")); return; }
    var rangs = {};
    Object.keys(PAYS).forEach(function (c) { rangs[c] = rangPays(c, s); });
    serie = {
      retour: retour, i: 0, bonnes: 0, reponse: null, resultats: [], rangsAvant: rangs, tampons: [],
      avant: retour.source === "pays" ? AP.progression(exprDuPays(retour.code), s) : null, // pour montrer le chemin parcouru au bilan
      questions: choix.map(function (e) { return AP.question(e, jouables(exprDuPays(e.pays)), s, Math.random); })
    };
    entree = "du-bas";
    fermerFeuille(); rendre(); window.scrollTo(0, 0);
  }
  function rejouerSerie() {
    var r = serie.retour;
    lancerSerie(r.source === "pays" ? exprDuPays(r.code) : aRevoir(), r);
  }
  function quitterSerie() {
    var r = serie ? serie.retour : { onglet: "voyager" };
    allerA(r.onglet, r.code);
  }
  function repondre(k) {
    if (!serie || serie.reponse !== null) return;
    var q = serie.questions[serie.i], juste = k === q.bonne;
    var fiche = savoir()[AP.cle(q.e)];
    serie.reponse = k;
    // trouvé avant sa date de révision : on le dit, pour que la règle du jeu soit claire
    serie.tropTot = juste && !AP.compteAujourdhui(fiche, jourReel) ? fiche.d - jourReel : 0;
    if (juste) serie.bonnes++;
    serie.resultats.push({ e: q.e, juste: juste });
    noterReponse(q.e, juste);
    son(juste ? "juste" : "faux"); vibrer(juste ? "succes" : "erreur");
    rendre();
    if (juste) confettis(app.querySelector(".option.bon"));
  }
  function suivant() {
    serie.i++; serie.reponse = null;
    if (serie.i >= serie.questions.length) {
      serie.fini = true;
      var s = savoir();
      serie.tampons = Object.keys(serie.rangsAvant).map(function (c) { return { code: c, rang: rangPays(c, s) }; })
        .filter(function (x) { return x.rang > serie.rangsAvant[x.code]; });
      signal("Serie.finie", { pays: serie.retour.code || "revision", bonnes: serie.bonnes, total: serie.questions.length });
    }
    entree = serie.fini ? "place" : "de-droite";
    rendre(); window.scrollTo(0, 0);
  }
  function rendreSerie() {
    if (serie.fini) return rendreFinSerie();
    var q = serie.questions[serie.i], e = q.e, p = paysInfo(e.pays), rep = serie.reponse, n = serie.questions.length;
    var inverse = q.type === "inverse";
    var h = '<div class="serie-haut"><button class="icon-btn" data-act="quitter-serie" aria-label="' + t("Quitter la série") + '">' + ICONES.fermer + '</button>' +
      '<span class="progression" role="progressbar" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + serie.i + '"><i style="--p:' + (serie.i / n).toFixed(3) + ';--de:' + (Math.max(0, serie.i - 1) / n).toFixed(3) + '"></i></span>' +
      '<span class="compteur">' + (serie.i + 1) + '/' + n + '</span></div>';
    h += '<section class="card carte-question"><p class="question">' + drapeau(e.pays) + ' ' + esc(p.nom) + ' · ' +
      (inverse ? t("Comment dit-on…") : t("Ça veut dire quoi ?")) + '</p>' +
      '<h1 class="expression' + (inverse ? ' inverse' : '') + '">' + (inverse ? esc(e.sens) : '«&nbsp;' + esc(e.expression) + '&nbsp;»') + '</h1></section>';
    h += '<div class="options">';
    q.options.forEach(function (txt, k) {
      var cls = rep === null ? "" : k === q.bonne ? " bon" : k === rep ? " faux" : " eteint";
      var lettre = rep !== null && k === q.bonne ? '✓' : rep === k ? '✕' : "ABCD"[k];
      h += '<button class="option' + cls + '" data-rep="' + k + '"' + (rep !== null ? ' disabled' : '') + '>' +
        '<span class="lettre">' + lettre + '</span><span>' + esc(txt) + '</span></button>';
    });
    h += '</div>';
    if (rep !== null) {
      var juste = rep === q.bonne;
      h += '<section class="card retour-reponse ' + (juste ? 'juste' : 'rate') + '">' +
        '<p class="verdict-court">' + (juste ? t("Bien joué !") : t("Pas tout à fait…")) + '</p>' +
        (serie.tropTot ? '<p class="petit">' + t("Déjà vu récemment : ce mot progressera à sa prochaine révision, dans {n} j.", { n: serie.tropTot }) + '</p>' : '') +
        '<h3>«&nbsp;' + esc(e.expression) + '&nbsp;»</h3><p class="sens-rappel">' + esc(e.sens) + '</p>' +
        blocSon(e) +
        '<p class="exemple">«&nbsp;' + esc(e.exemple) + '&nbsp;»</p>' +
        '<p class="petit">' + esc(e.fiche) + '</p>' +
        '<button class="btn" data-act="suivant">' + (serie.i + 1 < n ? t("Continuer") : t("Voir mon bilan")) + '</button></section>';
    }
    app.innerHTML = h;
    if (rep !== null) {
      var bloc = app.querySelector(".retour-reponse");
      if (bloc && bloc.scrollIntoView) bloc.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }
  function rendreFinSerie() {
    var n = serie.questions.length, b = serie.bonnes, part = b / n;
    var msg = t(part === 1 ? "Sans faute, respect total !" : part >= 0.75 ? "Ça rentre, continue comme ça." :
      part >= 0.5 ? "Pas mal. Les mots ratés reviendront demain." : "Courage : c'est en se trompant qu'on retient.");
    var h = '<section class="resultat">' +
      '<div class="card score-card">' + mascotte(part >= 0.75 ? "joie" : "neutre") +
      '<p class="question">' + t("Série terminée") + '</p><p class="score"><span data-compte="' + b + '">' + b + '</span><small>/' + n + '</small></p><p class="verdict">' + msg + '</p></div>';
    serie.tampons.forEach(function (x) {
      h += '<div class="card nouveau-tampon">' + tampon(x.code, x.rang, false, AP.progression(exprDuPays(x.code), savoir())) +
        '<p><b>' + t("Nouveau tampon !") + '</b><br>' + esc(paysInfo(x.code).nom) + ' : ' + esc(nomRang(x.rang)) + '</p></div>';
    });
    if (serie.retour.source === "pays") {
      var code = serie.retour.code, pr = AP.progression(exprDuPays(code), savoir()), av = serie.avant || pr;
      var gagne = serie.tampons.filter(function (x) { return x.code === code; })[0];
      h += '<div class="card palier-carte"><p class="niveau"><span>' + drapeau(code) + ' ' + esc(paysInfo(code).nom) + '</span>' +
        '<span>' + t("{pct} % maîtrisés", { pct: '<span data-compte="' + AP.pourcentage(pr) + '" data-de="' + AP.pourcentage(av) + '">' + AP.pourcentage(pr) + '</span>' }) + '</span></p>' +
        barreProgression(pr, { de: av.total ? av.maitrises / av.total : 0, deA: AP.avancement(av), eclat: gagne ? gagne.rang : 0 }) +
        '<p class="palier">' + phrasePalier(pr) + '</p>' + phraseEnCours(pr) + '</div>';
    }
    h += motif() + '<h2 class="region">' + t("Les mots de la série") + '</h2><ul class="lexique bilan">' + serie.resultats.map(function (r) {
      return '<li><button class="mot ' + (r.juste ? 'juste' : 'rate') + '" data-mot="' + EXPR.indexOf(r.e) + '">' +
        '<span class="mot-expr">' + (r.juste ? '✓ ' : '✕ ') + esc(r.e.expression) + '</span><span class="mot-sens">' + esc(r.e.sens) + '</span></button></li>';
    }).join("") + '</ul>';
    h += '<div class="actions"><button class="btn" data-act="rejouer-serie">' + ICONES.voyager + t("Encore une série") + '</button>' +
      (serie.tampons.length ? '<button class="btn secondaire" data-act="partager-passeport">' + ICONES.partager + t("Partager mon passeport") + '</button>' : '') +
      '<button class="btn secondaire" data-act="quitter-serie">' + t("Terminer") + '</button></div></section>';
    app.innerHTML = h;
    if (!serie.fete) {
      serie.fete = true;
      if (serie.tampons.length) setTimeout(function () { son("tampon"); vibrer("tampon"); son("fanfare"); }, 550); // quand le tampon touche le papier
      else if (part >= 0.75) son("fanfare");
    }
  }

  // ---------- Carnet : passeport, accent, révisions ----------
  // pr : la progression du pays. Tant que le pays n'est pas complètement maîtrisé, un anneau autour du tampon montre
  // le chemin parcouru : plein pour les mots maîtrisés, clair pour ceux qui avancent. Ainsi un 8/8 se voit tout de suite,
  // même si le tampon, lui, n'arrive qu'avec des mots maîtrisés (3 bonnes réponses sur 3 jours).
  function tampon(code, rang, cliquable, pr) {
    var p = paysInfo(code), enCours = pr ? pr.enCours : 0;
    var titre = rang ? nomRang(rang) : (enCours ? t("En route") : t("À visiter"));
    var detail = !pr || rang >= 4 ? "" : rang ? t("{pct} %", { pct: AP.pourcentage(pr) }) : enCours ? t("{n} en cours", { n: enCours }) : "";
    var a = pr && rang < 4 ? Math.round(AP.avancement(pr) * 100) : 0;
    var cls = "tampon rang-" + rang + (a ? " avec-anneau" : "") + (!rang && enCours ? " en-route" : "");
    var style = a ? ' style="--m:' + AP.pourcentage(pr) + ';--a:' + a + '"' : '';
    var contenu = drapeau(code, "moyen") +
      '<span class="t-nom">' + esc(p.nom) + '</span><span class="t-rang">' + esc(titre) + '</span>' +
      (detail ? '<span class="t-pct">' + detail + '</span>' : '');
    return cliquable
      ? '<button class="' + cls + '"' + style + ' data-voyage="' + esc(code) + '" aria-label="' + esc(p.nom + " : " + titre + (detail ? ", " + detail : "")) + '">' + contenu + '</button>'
      : '<div class="' + cls + '"' + style + '>' + contenu + '</div>';
  }
  function texteEnCours(n) { return n > 1 ? t("{n} mots en cours", { n: n }) : t("1 mot en cours"); }
  function rendreCarnet() {
    var s = savoir(), prog = progressions(s), acc = AP.accent(prog);
    var cles = Object.keys(s), maitrises = cles.filter(function (k) { return AP.estMaitrise(s[k]); }).length;
    var codes = Object.keys(PAYS), nbTampons = codes.filter(function (c) { return AP.rang(prog[c]) > 0; }).length;
    var h = enTete() + '<section class="intro-page"><p class="question">' + t("Carnet") + '</p><h1 class="titre-page">' + t("Ton passeport") + '</h1></section>';
    h += '<section class="card accent-card"><p class="question">' + t("Ton accent") + '</p>';
    if (acc) {
      h += '<p class="accent-phrase">' + drapeau(acc.code, "grand") + '<span>' + phraseAccent(acc, true) + '</span></p>';
    } else {
      h += '<p class="accent-phrase">' + t("Pas encore d'accent…") + '</p><p class="vide">' + t("Maîtrise 3 mots d'un même pays pour attraper ton premier accent.") + '</p>';
    }
    h += '</section><div class="stats-grid">' +
      [[cles.length, t("Mots découverts")], [maitrises, t("Maîtrisés")], [nbTampons, t("Tampons")], [aRevoir(s).length, t("À revoir")]].map(function (x) {
        return '<div class="stat"><b data-compte="' + x[0] + '">' + x[0] + '</b><span>' + x[1] + '</span></div>';
      }).join("") + '</div>';
    h += carteRevision() + '<h2 class="region">' + t("Tampons") + '</h2>' +
      '<p class="legende-paliers">' + t("Pour chaque pays, maîtrise {paliers} de ses mots.", { paliers:
      AP.SEUILS.slice(1).map(function (s, i) { return '<span class="rang rang-' + (i + 1) + '">' + t("{pct} %", { pct: Math.round(s * 100) }) + '</span> ' + nomRang(i + 1); }).join(" · ") }) +
      ' ' + t("Le cercle autour du tampon se remplit à chaque bonne réponse au bon moment.") +
      '</p><div class="passeport">';
    codes.slice().sort(function (a, b) {
      return AP.rang(prog[b]) - AP.rang(prog[a]) || AP.avancement(prog[b]) - AP.avancement(prog[a]);
    }).forEach(function (c) { h += tampon(c, AP.rang(prog[c]), true, prog[c]); });
    h += '</div>';
    h += nbTampons
      ? '<div class="actions"><button class="btn secondaire" data-act="partager-passeport">' + ICONES.partager + t("Partager mon passeport") + '</button></div>'
      : '<p class="vide centre">' + t("Maîtrise 25 % des mots d'un pays pour décrocher ton premier tampon.") + '</p>';
    app.innerHTML = h;
  }
  // « Tu parles très ivoirien » ; degre vient d'apprentissage.js (un peu, pas mal, très, complètement)
  function phraseAccent(acc, html) {
    var p = paysInfo(acc.code), nom = esc(p.accent || p.nom);
    return t("Tu parles " + acc.degre + " {a}", { a: html ? "<b>" + nom + "</b>" : nom });
  }
  function textePasseport() {
    var prog = progressions(savoir()), acc = AP.accent(prog);
    var lignes = Object.keys(PAYS).map(function (c) { return { c: c, r: AP.rang(prog[c]) }; })
      .filter(function (x) { return x.r > 0; })
      .sort(function (a, b) { return b.r - a.r; }).slice(0, 8)
      .map(function (x) { return paysInfo(x.c).drapeau + " " + nomRang(x.r); });
    return t("Mon passeport Tchip") + " 🛂\n" + lignes.join("\n") +
      (acc ? "\n" + phraseAccent(acc, false) : "") +
      "\n" + t("Tu parles d'où ?") + " " + ADRESSE_PARTAGE;
  }

  // ---------- Proposer une expression ----------
  // Envoyée à api.tchip.app (Cloudflare, voir api/) : rien de public, triée par l'équipe et relue par des gens du pays.
  // Turnstile vérifie qu'un humain envoie ; un champ piège invisible attrape les robots les plus simples.
  var brouillon = null, voixChoisie = null, jetonTurnstile = "", widgetTurnstile = null;
  function brouillonVide() { return { expression: "", pays: "", lieu: "", sens: [{ sens: "", ou: "" }], exemple: "", pseudo: "" }; }
  function choixPaysProposition(choisi) {
    var codes = Object.keys(PAYS).sort(function (a, b) { return PAYS[a].nom.localeCompare(PAYS[b].nom, L); });
    // pas d'emoji drapeau ici : une liste déroulante ne peut pas afficher d'image, et Windows montrerait « CI », « ML »
    return '<option value="">' + t("Choisis…") + '</option>' + codes.map(function (c) {
      return '<option value="' + esc(c) + '"' + (c === choisi ? ' selected' : '') + '>' + esc(PAYS[c].nom) + '</option>';
    }).join("") + '<option value="AUTRE"' + (choisi === "AUTRE" ? ' selected' : '') + '>' + t("Un autre pays (précise-le dessous)") + '</option>';
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
  function feuilleProposer(codePays) {
    if (!brouillon) brouillon = lire("tchip:brouillon", null) || brouillonVide();
    if (codePays && !brouillon.pays && !brouillon.expression) brouillon.pays = codePays;
    var champsSens = brouillon.sens.map(function (s, i) {
      var opt = ' <span class="opt">' + t("facultatif") + '</span>';
      return '<fieldset class="sens-bloc"><legend>' + (i === 0 ? t("Sens 1 (le plus courant)") : t("Sens {n}", { n: i + 1 })) + '</legend>' +
        '<label for="p-sens-' + i + '">' + t("Ça veut dire…") + '</label>' +
        '<input id="p-sens-' + i + '" name="p-sens-' + i + '" maxlength="90" value="' + esc(s.sens) + '" placeholder="' + (i === 0 ? t("Ex. : une personne très diplômée") : t("Un autre sens")) + '"' + (i === 0 ? ' required' : '') + '>' +
        (i > 0 ? '<label for="p-ou-' + i + '">' + t("Où ou dans quel contexte ?") + opt + '</label>' +
          '<input id="p-ou-' + i + '" name="p-ou-' + i + '" maxlength="60" value="' + esc(s.ou) + '" placeholder="' + t("Ex. : chez les jeunes, au Gabon…") + '">' +
          '<button type="button" class="lien-retirer" data-act="retirer-sens" data-index="' + i + '">' + t("Retirer ce sens") + '</button>' : '') +
        '</fieldset>';
    }).join("");
    var opt = ' <span class="opt">' + t("facultatif") + '</span>';
    feuille('<header><h2>' + t("Propose ton expression") + '</h2>' + boutonFermer() + '</header>' +
      '<p class="vide">' + t("Une expression qu'on dit chez toi et que tout le monde devrait connaître. Elle peut avoir plusieurs sens : ajoute-les tous.") + '</p>' +
      '<form id="form-proposer" class="formulaire" novalidate>' +
      '<label for="p-expression">' + t("L'expression") + '</label>' +
      '<input id="p-expression" name="p-expression" maxlength="60" required value="' + esc(brouillon.expression) + '" placeholder="' + t("Ex. : Long crayon") + '">' +
      '<div class="deux-colonnes">' +
      '<div><label for="p-pays">' + t("Pays") + '</label><select id="p-pays" name="p-pays" required>' + choixPaysProposition(brouillon.pays) + '</select></div>' +
      '<div><label for="p-lieu">' + t("Ville ou région") + opt + '</label><input id="p-lieu" name="p-lieu" maxlength="40" value="' + esc(brouillon.lieu) + '" placeholder="' + t("Ex. : Douala") + '"></div>' +
      '</div>' +
      champsSens +
      (brouillon.sens.length < SENS_MAX ? '<button type="button" class="btn ajout" data-act="ajouter-sens">' + t("+ Ajouter un autre sens") + '</button>' : '') +
      '<label for="p-exemple">' + t("Une phrase d'exemple") + opt + '</label>' +
      '<textarea id="p-exemple" name="p-exemple" maxlength="200" rows="2" placeholder="' + t("Comment on l'emploie au quotidien") + '">' + esc(brouillon.exemple) + '</textarea>' +
      '<label for="p-pseudo">' + t("Ton pseudo, pour te citer") + opt + '</label>' +
      '<input id="p-pseudo" name="p-pseudo" maxlength="30" value="' + esc(brouillon.pseudo) + '" placeholder="' + t("Ex. : Aya de Yopougon") + '">' +
      blocVoix() +
      // piège à robots : invisible et ignoré par les humains (et par les lecteurs d'écran)
      '<div class="piege" aria-hidden="true"><label for="p-site">Site</label><input id="p-site" name="p-site" tabindex="-1" autocomplete="off"></div>' +
      '<div id="zone-turnstile" class="turnstile"></div>' + // pas id="turnstile" : il masquerait window.turnstile
      '<p class="erreur-form" id="erreur-form" role="alert" hidden></p>' +
      '<p class="note-publique">🔒 ' + t("Ta proposition arrive directement chez l'équipe Tchip : elle n'est pas publique. N'y mets ni ton nom complet, ni ton numéro, ni ton adresse.") + '</p>' +
      '<button type="submit" class="btn" id="envoyer-proposition">' + t("Envoyer ma proposition") + '</button>' +
      '</form>', "proposer");
    var f = document.getElementById("form-proposer");
    f.addEventListener("input", lireFormulaire);
    f.addEventListener("change", function (ev) { if (ev.target.id === "p-voix") choisirVoix(ev.target.files && ev.target.files[0]); });
    f.addEventListener("submit", function (ev) { ev.preventDefault(); envoyerProposition(); });
    monterTurnstile();
  }
  // Voix facultative : un fichier audio court, avec l'accord de publication.
  function blocVoix() {
    var opt = ' <span class="opt">' + t("facultatif") + '</span>';
    if (!voixChoisie) {
      return '<label for="p-voix">' + t("Ta voix qui dit l'expression") + opt + '</label>' +
        '<input id="p-voix" name="p-voix" type="file" accept="audio/*">' +
        '<p class="aide-champ">' + t("Un enregistrement de moins de 5 secondes (1 Mo au plus), dit comme dans la vie.") + '</p>';
    }
    return '<div class="voix-jointe"><span>🎙️ ' + esc(voixChoisie.name) + ' · ' + Math.max(1, Math.round(voixChoisie.size / 1024)) + ' Ko</span>' +
      '<button type="button" class="lien-retirer" data-act="retirer-voix">' + t("Retirer") + '</button></div>' +
      '<label class="accord"><input type="checkbox" id="p-accord">' +
      t("J'accepte que ma voix soit publiée dans Tchip, avec mon pseudo et ma ville.") + '</label>';
  }
  function choisirVoix(fichier) {
    var err = document.getElementById("erreur-form");
    if (!fichier) return;
    if (fichier.size > 1024 * 1024 || !/^audio\//.test(fichier.type || "")) {
      err.textContent = t("Ce fichier ne va pas : il faut un son de 1 Mo au plus.");
      err.hidden = false;
      return;
    }
    voixChoisie = fichier;
    feuilleProposer();
  }
  // Turnstile (Cloudflare) se charge seulement quand on ouvre le formulaire.
  function monterTurnstile() {
    var zone = document.getElementById("zone-turnstile");
    if (!zone || !TURNSTILE_CLE) return;
    jetonTurnstile = "";
    function rendre() {
      try {
        widgetTurnstile = window.turnstile.render(zone, {
          sitekey: TURNSTILE_CLE, language: L, theme: "auto", size: "flexible",
          callback: function (j) { jetonTurnstile = j; },
          "expired-callback": function () { jetonTurnstile = ""; },
          "error-callback": function () { jetonTurnstile = ""; }
        });
      } catch (e) { /* le widget réapparaîtra à la prochaine ouverture */ }
    }
    if (window.turnstile) return rendre();
    if (monterTurnstile.enCours) { monterTurnstile.enCours.push(rendre); return; }
    monterTurnstile.enCours = [rendre];
    var s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = function () { var a = monterTurnstile.enCours; monterTurnstile.enCours = null; a.forEach(function (f) { f(); }); };
    s.onerror = function () { monterTurnstile.enCours = null; };
    document.head.appendChild(s);
  }
  function envoyerProposition() {
    lireFormulaire();
    var err = document.getElementById("erreur-form"), bouton = document.getElementById("envoyer-proposition");
    function erreur(msg) { err.textContent = msg; err.hidden = false; }
    var manque = [];
    if (!brouillon.expression.trim()) manque.push(t("l'expression"));
    if (!brouillon.pays) manque.push(t("le pays"));
    if (!brouillon.sens[0].sens.trim()) manque.push(t("au moins un sens"));
    if (brouillon.pays === "AUTRE" && !brouillon.lieu.trim()) manque.push(t("le nom du pays (dans « Ville ou région »)"));
    if (manque.length) return erreur(t("Il manque {liste}.", { liste: manque.join(", ") }));
    var accord = document.getElementById("p-accord");
    if (voixChoisie && !(accord && accord.checked)) return erreur(t("Coche l'accord pour envoyer ta voix, ou retire-la."));
    if (!jetonTurnstile) return erreur(t("Vérification anti-robot en cours : attends une seconde, puis réessaie."));

    var donnees = {
      expression: brouillon.expression, pays: brouillon.pays, lieu: brouillon.lieu, exemple: brouillon.exemple, pseudo: brouillon.pseudo,
      sens: brouillon.sens.filter(function (s) { return s.sens.trim(); }), langue: L,
      site: (document.getElementById("p-site") || {}).value || ""
    };
    var corps = new FormData();
    corps.append("donnees", JSON.stringify(donnees));
    corps.append("turnstile", jetonTurnstile);
    if (voixChoisie) { corps.append("voix", voixChoisie, voixChoisie.name); corps.append("accord", "1"); }
    err.hidden = true; bouton.disabled = true; bouton.textContent = t("Envoi…");
    fetch(API_PROPOSITIONS, { method: "POST", body: corps }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) { return { statut: r.status, d: d }; });
    }).then(function (rep) {
      if (rep.statut === 201) {
        signal("Proposition.envoyee", { pays: brouillon.pays, voix: !!voixChoisie });
        var exp = brouillon.expression.trim();
        brouillon = brouillonVide(); voixChoisie = null; ecrire("tchip:brouillon", brouillon);
        son("fanfare");
        return feuille('<header><h2>' + t("Merci, c'est envoyé !") + '</h2>' + boutonFermer() + '</header>' +
          '<p>' + t("« {exp} » est bien arrivée chez l'équipe Tchip. On la fait relire par des gens du pays avant de la mettre en jeu.", { exp: esc(exp) }) + '</p>' +
          '<button class="btn" data-act="fermer">' + t("Retour au jeu") + '</button>' +
          '<button class="btn secondaire" data-act="nouvelle-proposition">' + t("Proposer une autre expression") + '</button>', "proposition-envoyee");
      }
      var e = rep.d.erreur;
      erreur(e === "limite" ? t("Tu as envoyé beaucoup de propositions : réessaie dans une heure.")
        : e === "robot" ? t("La vérification anti-robot a échoué. Réessaie.")
        : e === "accord" ? t("Coche l'accord pour envoyer ta voix, ou retire-la.")
        : e === "voix trop lourde" || e === "format de voix" || e === "trop lourd" ? t("Ce fichier ne va pas : il faut un son de 1 Mo au plus.")
        : t("Ta proposition n'a pas pu être envoyée. Vérifie les champs et réessaie."));
      remettreBouton();
    }).catch(function () {
      erreur(t("Pas de connexion : ta proposition est gardée ici, réessaie quand tu auras du réseau."));
      remettreBouton();
    });
    function remettreBouton() {
      bouton.disabled = false; bouton.textContent = t("Envoyer ma proposition");
      if (window.turnstile && widgetTurnstile !== null) { try { window.turnstile.reset(widgetTurnstile); } catch (x) {} } // un jeton ne sert qu'une fois
      jetonTurnstile = "";
    }
  }

  // ---------- Feuilles ----------
  function boutonFermer() { return '<button class="icon-btn" data-act="fermer" aria-label="' + t("Fermer") + '">' + ICONES.fermer + '</button>'; }
  // En-tête d'une feuille ; retour : ouverte depuis les réglages, on peut y revenir.
  function enteteFeuille(titre, retour) {
    return (retour ? '<button class="lien-retour" data-act="reglages">' + ICONES.retour + t("Réglages") + '</button>' : '') +
      '<header><h2>' + titre + '</h2>' + boutonFermer() + '</header>';
  }
  function feuille(contenu, nom) {
    // la même feuille, mise à jour (un interrupteur, un champ ajouté) : on change son contenu sans la refaire monter
    var ouverte = nom && feuilleOuverte(nom) && document.querySelector("#feuille .feuille");
    if (ouverte) { ouverte.innerHTML = contenu; return; }
    fermerFeuille();
    var fond = document.createElement("div");
    fond.className = "feuille-fond"; fond.id = "feuille";
    fond.setAttribute("data-feuille", nom || "");
    fond.innerHTML = '<div class="feuille" role="dialog" aria-modal="true">' + contenu + '</div>';
    fond.addEventListener("click", function (ev) { if (ev.target === fond) fermerFeuille(true); });
    document.body.appendChild(fond);
    var f = fond.querySelector("[data-act='fermer']"); if (f) f.focus();
  }
  // anime : fermée par le joueur (bouton, fond, Échap, retour), la feuille redescend.
  // Sinon (une autre feuille s'ouvre, on change d'écran), elle disparaît tout de suite.
  function fermerFeuille(anime) {
    var f = document.getElementById("feuille");
    if (!f) return;
    if (!anime || moinsDeMouvement()) { f.remove(); return; }
    f.removeAttribute("id"); f.classList.add("sortie"); // plus « ouverte » : une autre feuille peut s'ouvrir aussitôt
    setTimeout(function () { f.remove(); }, 200);
  }
  function feuilleOuverte(nom) { var f = document.getElementById("feuille"); return !!f && (!nom || f.getAttribute("data-feuille") === nom); }

  // ---------- Rappel quotidien (notification locale, programmée sur l'appareil : aucun serveur) ----------
  function programmerRappel(heure) {
    var ln = plugin("LocalNotifications");
    if (!ln) return Promise.resolve(false);
    return ln.cancel({ notifications: [{ id: ID_RAPPEL }] }).catch(function () {}).then(function () {
      return ln.schedule({ notifications: [{
        id: ID_RAPPEL,
        title: "Tchip",
        body: t("Ton expression du jour t'attend 🌶️ Tu sais ce qu'elle veut dire ?"),
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
        toast(t("Notifications refusées : tu peux les autoriser dans les réglages du téléphone."));
        return false;
      }
      return programmerRappel(heure).then(function () {
        changerReglage("rappel", true); changerReglage("heure", heure);
        toast(t("Rappel activé : chaque jour à {h} h", { h: heure }));
        signal("Rappel.active", { heure: heure });
        return true;
      });
    }).catch(function () { toast(t("Impossible d'activer le rappel.")); return false; });
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

  // ---------- Réglages ----------
  // Général : sons, vibrations, affichage, rappel. Divers : langue, règles, invitations, à propos, confidentialité.
  function interrupteur(act, actif, titre, detail) {
    return '<div class="reglage"><div><b>' + titre + '</b><span>' + detail + '</span></div>' +
      '<button class="interrupteur" role="switch" aria-checked="' + (actif ? "true" : "false") + '" aria-label="' + titre + '" data-act="' + act + '"><span></span></button></div>';
  }
  // Choix entre quelques valeurs (thème, langue) : des boutons côte à côte.
  function segments(reglage, valeur, options, titre) {
    return '<div class="reglage"><div><b>' + titre + '</b></div><div class="segments" role="radiogroup" aria-label="' + titre + '">' +
      options.map(function (o) {
        return '<button role="radio" aria-checked="' + (o[0] === valeur) + '" data-act="choix" data-reglage="' + reglage + '" data-valeur="' + o[0] + '"' +
          (o[2] ? ' lang="' + o[2] + '"' : '') + '>' + o[1] + '</button>';
      }).join("") + '</div></div>';
  }
  function ligneLien(act, icone, titre, detail) {
    return '<button class="reglage lien" data-act="' + act + '"><span class="ico" aria-hidden="true">' + icone + '</span>' +
      '<span class="texte"><b>' + titre + '</b>' + (detail ? '<span>' + detail + '</span>' : '') + '</span><span class="chevron" aria-hidden="true">›</span></button>';
  }
  function peutVibrer() { return !!(plugin("Haptics") || navigator.vibrate); }
  function feuilleReglages() {
    var r = reglages();
    var h = enteteFeuille(t("Réglages")) + '<h3 class="groupe-titre">' + t("Général") + '</h3><div class="groupe">';
    if (SONS && SONS.disponible) {
      h += interrupteur("musique", r.musique, t("Musique"), t("Une petite boucle de balafon pendant que tu joues.")) +
        interrupteur("bruitages", r.bruitages, t("Bruitages"), t("Bonne réponse, tchip, tampon…"));
    }
    if (peutVibrer()) h += interrupteur("vibrations", r.vibrations, t("Vibrations"), t("Un petit retour sous le doigt quand tu réponds."));
    h += interrupteur("animations", r.animations, t("Animations"), t("Confettis, glissements, tampons qui s'impriment."));
    h += segments("theme", r.theme, [["auto", t("Auto")], ["clair", t("Clair")], ["sombre", t("Sombre")]], t("Thème"));
    if (plugin("LocalNotifications")) {
      h += interrupteur("rappel", r.rappel, t("Rappel quotidien"), t("Une notification quand le tchip du jour est prêt."));
      if (r.rappel) {
        h += '<label class="reglage"><div><b>' + t("Heure du rappel") + '</b></div><select data-reglage="heure">' +
          HEURES_RAPPEL.map(function (x) { return '<option value="' + x + '"' + (x === r.heure ? " selected" : "") + '>' + t("{h} h", { h: x }) + '</option>'; }).join("") +
          '</select></label>';
      }
    }
    if (TELEMETRYDECK_APP_ID) {
      h += interrupteur("stats-anonymes", r.statsAnonymes, t("Statistiques anonymes"), t("Aide à améliorer le jeu. Sans pub ni traçage, rien qui t'identifie."));
    }
    h += '</div><h3 class="groupe-titre">' + t("Divers") + '</h3><div class="groupe">' +
      segments("langue", L, [["fr", "Français", "fr"], ["en", "English", "en"]], t("Langue")) +
      ligneLien("regles", ICONES.aide, t("Règles du jeu")) +
      ligneLien("inviter", ICONES.inviter, t("Inviter des amis"), t("Par message, WhatsApp, réseaux sociaux…")) +
      ligneLien("a-propos", ICONES.info, t("À propos"), t("Version {v}", { v: esc(VERSION_APP) })) +
      ligneLien("confidentialite", ICONES.cadenas, t("Confidentialité")) +
      '</div><button class="btn danger" data-act="effacer">' + t("Effacer mes données") + '</button>' +
      '<p class="vide version">' + t("Sans compte : ta progression reste sur cet appareil.") + '</p>';
    feuille(h, "reglages");
  }
  // Un réglage a changé : on l'applique tout de suite, et la feuille se met à jour sur place.
  function basculer(cle) {
    var r = reglages();
    changerReglage(cle, !r[cle]);
    appliquerReglages();
    if (cle === "bruitages" && !r.bruitages) son("juste");      // un aperçu de ce qu'on vient d'allumer
    if (cle === "vibrations" && !r.vibrations) vibrer("succes");
    feuilleReglages();
  }
  function choisirReglage(cle, valeur) {
    changerReglage(cle, valeur);
    if (cle === "langue") {
      localiser();
      chargerJour(jourAffiche); // même partie, textes dans la nouvelle langue
      rendre();
      if (reglages().rappel) programmerRappel(reglages().heure).catch(function () {}); // le texte de la notification aussi
      signal("Langue", { langue: valeur });
    }
    appliquerReglages();
  }
  function inviter() {
    signal("Invitation");
    partagerTexte(t("Je joue à Tchip : chaque jour, une expression de la francophonie à deviner, d'Abidjan à Montréal. Tu parles d'où ? Viens jouer avec moi 👉 {lien}", { lien: LIEN_JEU }), t("Inviter des amis"));
  }
  function feuilleAPropos() {
    var voix = EXPR.some(function (e) { return e.audio; });
    var credits = [
      t("Expressions : rassemblées à partir de dictionnaires, d'études et de propositions de joueurs."),
      voix ? t("Voix : de vraies personnes du pays, créditées sur chaque mot.") : "",
      t("Musique et bruitages : créés pour Tchip."),
      t("Drapeaux : flag-icons (licence MIT)."),
      t("Polices : Bricolage Grotesque et Figtree (licence SIL OFL).")
    ].filter(Boolean);
    feuille(enteteFeuille(t("À propos"), true) +
      '<div class="a-propos">' + WORDMARK + '<p>' + t("Tu parles d'où ?") + '</p></div>' +
      '<p>' + t("Le jeu des expressions de la francophonie : une à deviner chaque jour, et des centaines à apprendre avant de partir en voyage.") + '</p>' +
      '<dl class="infos">' +
      '<div><dt>' + t("Version") + '</dt><dd>' + esc(VERSION_APP) + '</dd></div>' +
      '<div><dt>' + t("Contenu") + '</dt><dd>' + t("{n} expressions, {p} pays", { n: EXPR.length, p: Object.keys(PAYS).length }) + '</dd></div>' +
      '</dl>' +
      '<h3 class="groupe-titre">' + t("Crédits") + '</h3><ul class="credits">' + credits.map(function (c) { return '<li>' + c + '</li>'; }).join("") + '</ul>' +
      '<div class="actions"><button class="btn secondaire" data-act="inviter">' + ICONES.inviter + t("Inviter des amis") + '</button>' +
      '<a class="btn secondaire" href="mailto:contact@tchip.app">' + t("Signaler un problème") + '</a></div>', "a-propos");
  }
  function feuilleConfidentialite() {
    feuille(enteteFeuille(t("Confidentialité"), true) + '<div class="texte-legal">' + t("Chargement…") + '</div>', "confidentialite");
    var zone = function () { return document.querySelector("#feuille .texte-legal"); };
    fetch(L === "en" ? "confidentialite-en.html" : "confidentialite.html").then(function (r) { return r.text(); }).then(function (html) {
      var main = new DOMParser().parseFromString(html, "text/html").querySelector("main");
      if (!main || !zone()) return;
      var titre = main.querySelector("h1"); if (titre) titre.remove();
      zone().innerHTML = main.innerHTML; // notre propre page, embarquée avec l'app
    }).catch(function () { if (zone()) zone().textContent = t("Page indisponible pour le moment."); });
  }
  function effacerDonnees() {
    if (!window.confirm(t("Effacer ta série, tes stats et tes parties sur cet appareil ? C'est définitif."))) return;
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

  // Accueil, affiché une seule fois au premier lancement : 3 lignes, une par onglet, avec les mêmes icônes.
  function feuilleBienvenue() {
    var etapes = [
      ["jour", "p1", t("Chaque jour, une expression"), t("Devine ce qu'elle veut dire, puis de quel pays elle vient.")]
    ];
    if (AP) etapes.push(
      ["voyager", "p2", t("Voyager"), t("Choisis un pays et apprends ses mots. Joue autant que tu veux.")],
      ["carnet", "p3", t("Carnet"), t("Gagne un tampon pour chaque pays que tu apprends.")]
    );
    feuille('<header><h2>' + t("Bienvenue sur Tchip&nbsp;!") + '</h2>' + boutonFermer() + '</header>' +
      '<p class="intro-aide">' + t("Le jeu des expressions de la francophonie, de Dakar à Montréal.") + '</p>' +
      '<ol class="etapes-aide">' + etapes.map(function (x) {
        return '<li><span class="pastille ' + x[1] + '" aria-hidden="true">' + ICONES[x[0]] + '</span><div><b>' + x[2] + '</b><span>' + x[3] + '</span></div></li>';
      }).join("") + '</ol>' +
      segments("langue", L, [["fr", "Français", "fr"], ["en", "English", "en"]], t("Langue")) +
      '<button class="btn" data-act="fermer">' + t("C'est parti&nbsp;!") + '</button>' +
      '<p class="vide centre">' + t("Besoin d'aide plus tard ? Touche le <b>?</b> en haut de l'écran.") + '</p>', "bienvenue");
  }

  // Aide complète (bouton « ? », ou « Règles du jeu » dans les réglages) : courte, une partie par onglet.
  function feuilleAide(depuisReglages) {
    var h = enteteFeuille(t("Comment jouer"), depuisReglages) +
      '<section class="aide-bloc"><h3><span class="pastille p1" aria-hidden="true">' + ICONES.jour + '</span>' + t("Aujourd'hui") + '</h3><ul>' +
      [t("Une nouvelle expression chaque jour à minuit, la même pour tout le monde."),
        t("Trouve ce qu'elle veut dire. Tu as <b>2 essais</b> : du premier coup, <b>3 points</b> ; au deuxième, <b>1 point</b>."),
        t("Si tu te trompes, un <b>indice</b> apparaît."),
        t("Bonus : trouve le pays. <b>+1 point</b>."),
        t("Partage ton score : la réponse reste secrète. Joue chaque jour pour faire monter ta série 🔥.")
      ].map(function (x) { return '<li>' + x + '</li>'; }).join("") +
      '</ul></section>';
    if (AP) h +=
      '<section class="aide-bloc"><h3><span class="pastille p2" aria-hidden="true">' + ICONES.voyager + '</span>' + t("Voyager") + '</h3><ul>' +
      '<li>' + t("Choisis un pays et joue des séries de 8 mots, autant que tu veux.") + '</li>' +
      '<li>' + t("Dans le lexique, touche un mot pour voir ce qu'il veut dire.") + '</li>' +
      '</ul></section>' +
      '<section class="aide-bloc"><h3><span class="pastille p3" aria-hidden="true">' + ICONES.carnet + '</span>' + t("Carnet") + '</h3><ul>' +
      '<li>' + t("Un mot est <b>maîtrisé</b> quand tu l'as trouvé 3 fois : la première fois, le lendemain, puis 3 jours après.") + '</li>' +
      '<li>' + t("Les mots à revoir t'attendent ici. Le chiffre rouge te dit combien.") + '</li>' +
      '<li>' + t("Maîtrise les mots d'un pays pour gagner ses tampons :") + '</li>' +
      '</ul><div class="paliers-aide">' + AP.SEUILS.slice(1).map(function (s, i) {
        return '<span class="rang rang-' + (i + 1) + '">' + t("{pct} %", { pct: Math.round(s * 100) }) + '</span><span>' + nomRang(i + 1) + '</span>';
      }).join("") + '</div></section>';
    feuille(h, "aide");
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
    feuille('<header><h2>' + t("Mes stats") + '</h2>' + boutonFermer() + '</header>' +
      '<div class="stats-grid">' +
      '<div class="stat"><b>' + s.joues + '</b><span>' + t("Parties") + '</span></div>' +
      '<div class="stat"><b>' + pct + '%</b><span>' + t("Sens trouvés") + '</span></div>' +
      '<div class="stat"><b>' + serieActuelle() + '</b><span>' + t("Série") + '</span></div>' +
      '<div class="stat"><b>' + s.meilleure + '</b><span>' + t("Record") + '</span></div>' +
      '</div><h3 style="margin:0;font-family:var(--f-display);font-size:20px">' + t("Répartition des scores") + '</h3>' +
      '<div class="distrib">' + lignes + '</div>' +
      (s.joues === 0 ? '<p class="vide">' + t("Joue ton premier tchip pour remplir tes stats.") + '</p>' : ''));
  }

  function feuilleArchives() {
    var items = "";
    for (var n = jourReel; n >= Math.max(1, jourReel - 59); n--) {
      var st = lire(cleJour(n), null);
      var label = n === jourReel ? t("Aujourd'hui") : esc(dateDuNumero(n));
      var etatTxt = st && st.fini ? score(st, puzzle(n).e) + "/4" : (st ? t("En cours") : t("À jouer"));
      items += '<li><button data-jour="' + n + '"><span>#' + n + ' · ' + label + '</span><span class="etat">' + etatTxt + '</span></button></li>';
    }
    feuille('<header><h2>' + t("Jours précédents") + '</h2>' + boutonFermer() + '</header>' +
      '<p class="vide">' + t("Rattrape les tchips que tu as ratés. Ils ne comptent pas dans ta série.") + '</p>' +
      '<ul class="archives">' + items + '</ul>' +
      (jourReel === 1 ? '<p class="vide">' + t("C'est le premier jour de Tchip : les archives se rempliront dès demain.") + '</p>' : ''));
  }

  // ---------- Événements ----------
  document.addEventListener("click", function (ev) {
    if (ev.target.closest(".mascotte")) return animerMascotte("joie"); // la toucher la fait sauter
    var b = ev.target.closest("button");
    if (!b || b.disabled) return;
    if (b.hasAttribute("data-sens")) return choisirSens(+b.getAttribute("data-sens"));
    if (b.hasAttribute("data-pays")) return choisirPays(+b.getAttribute("data-pays"));
    if (b.hasAttribute("data-jour")) { fermerFeuille(); onglet = "jour"; chargerJour(+b.getAttribute("data-jour")); entree = "place"; rendre(); window.scrollTo(0, 0); return; }
    if (b.hasAttribute("data-onglet")) { son("clic"); return allerA(b.getAttribute("data-onglet")); }
    if (b.hasAttribute("data-voyage")) return allerA("voyager", b.getAttribute("data-voyage"));
    if (b.hasAttribute("data-mot")) return feuilleMot(EXPR[+b.getAttribute("data-mot")]);
    if (b.hasAttribute("data-rep")) return repondre(+b.getAttribute("data-rep"));
    if (b.hasAttribute("data-son")) return jouerSon(EXPR[+b.getAttribute("data-son")]);
    switch (b.getAttribute("data-act")) {
      case "retour-voyager": return allerA("voyager");
      case "serie-pays": return lancerSerie(exprDuPays(paysOuvert), { onglet: "voyager", code: paysOuvert, source: "pays" });
      case "reviser": return lancerSerie(aRevoir(), { onglet: onglet, code: paysOuvert, source: "revision" });
      case "suivant": return suivant();
      case "quitter-serie": return quitterSerie();
      case "rejouer-serie": return rejouerSerie();
      case "partager-passeport": signal("Passeport.partage"); return partagerTexte(textePasseport(), t("Partager mon passeport"));
      case "proposer": return feuilleProposer(b.getAttribute("data-code"));
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
      case "retirer-voix":
        voixChoisie = null;
        return feuilleProposer();
      case "nouvelle-proposition":
        brouillon = brouillonVide(); voixChoisie = null;
        ecrire("tchip:brouillon", brouillon);
        return feuilleProposer();
      case "aide": return feuilleAide();
      case "stats": return feuilleStats();
      case "archives": return feuilleArchives();
      case "fermer": return fermerFeuille(true);
      case "partager": return partager();
      case "aujourdhui": onglet = "jour"; chargerJour(jourReel); entree = "place"; rendre(); window.scrollTo(0, 0); return;
      case "reglages": return feuilleReglages();
      case "musique": case "bruitages": case "vibrations": case "animations": return basculer(b.getAttribute("data-act"));
      case "choix":
        choisirReglage(b.getAttribute("data-reglage"), b.getAttribute("data-valeur"));
        return feuilleOuverte("bienvenue") ? feuilleBienvenue() : feuilleReglages();
      case "regles": return feuilleAide(true);
      case "inviter": return inviter();
      case "a-propos": return feuilleAPropos();
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
    programmerRappel(heure).then(function () { toast(t("Rappel déplacé à {h} h", { h: heure })); }).catch(function () {});
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    if (feuilleOuverte()) fermerFeuille(true);
    else if (serie) quitterSerie();
  });

  // Retour dans l'app (après une notification, ou le lendemain) : nouveau jour → nouveau tchip.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") return;
    if (numeroDuJour() !== jourReel) { location.reload(); return; }
    rafraichirContenu();
  });

  // Bouton retour Android : feuille ouverte → série → page pays → onglet du jour → archive → arrière-plan.
  var appNatif = plugin("App");
  if (appNatif && Cap.getPlatform() === "android") {
    appNatif.addListener("backButton", function () {
      if (feuilleOuverte()) fermerFeuille(true);
      else if (serie) quitterSerie();
      else if (onglet === "voyager" && paysOuvert) allerA("voyager");
      else if (onglet !== "jour") allerA("jour");
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
  localiser();
  appliquerReglages();
  appliquerContenu(lire("tchip:contenu", null)); // expressions reçues lors d'une visite précédente
  // En local seulement : ?jour=N pour tester n'importe quel jour
  var apercu = null;
  try {
    var local = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    var q = new URLSearchParams(location.search).get("jour");
    if (local && !estNatif() && q && +q >= 1) apercu = Math.floor(+q);
    // En local aussi : ?api=http://127.0.0.1:8787 pour essayer le Worker de api/ (npm run dev), avec la clé de test de Turnstile
    var api = new URLSearchParams(location.search).get("api");
    if (local && !estNatif() && api && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(api)) {
      API_PROPOSITIONS = api + "/propositions";
      TURNSTILE_CLE = "1x00000000000000000000AA";
    }
  } catch (e) {}
  chargerJour(apercu || jourReel);
  entree = "place";
  rendre();
  if (!lire("tchip:vu-aide", false)) { ecrire("tchip:vu-aide", true); feuilleBienvenue(); }
  enregistrerServiceWorker();
  restaurerSecours();
  verifierRappel();
  rafraichirContenu();
  signal("Ouverture");

  // Exposé pour les tests
  window.TCHIP = { numeroDuJour: numeroDuJour, puzzle: puzzle, verifierDonnees: verifierDonnees, score: function (st, e) { return score(st, e || P.e); } };
})();
