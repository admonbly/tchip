/* Tchip — page de tri des propositions (admin.tchip.app). Servie par le Worker, sans dépendance.
 * Tout le contenu des joueurs est inséré avec textContent : jamais interprété comme du HTML.
 */
export const PAGE_ADMIN = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Tchip — propositions</title>
<style>
  :root { --papier:#FFF3DF; --surface:#FFFBF4; --encre:#1D1B4F; --douce:#5A5778; --piment:#FF4D2E; --mangue:#FFC233; --menthe:#19B38A; --trait:#E9D6B5; }
  @media (prefers-color-scheme: dark) { :root { --papier:#14122E; --surface:#221F4A; --encre:#FFF3DF; --douce:#B9B5D9; --trait:#3A3670; } }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--papier); color: var(--encre); font: 16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
  main { max-width: 760px; margin: 0 auto; padding: 16px; display: grid; gap: 14px; }
  h1 { margin: 8px 0 0; font-size: 28px; }
  .onglets { display: flex; flex-wrap: wrap; gap: 8px; }
  .onglets button, .actions button { font: inherit; font-weight: 700; border: 2px solid var(--encre); border-radius: 999px; padding: 6px 14px; background: var(--surface); color: var(--encre); cursor: pointer; }
  .onglets button[aria-pressed="true"] { background: var(--encre); color: var(--papier); }
  .carte { background: var(--surface); border: 2px solid var(--encre); border-radius: 16px; padding: 14px; display: grid; gap: 8px; box-shadow: 0 3px 0 var(--encre); }
  .carte h2 { margin: 0; font-size: 22px; }
  .meta { color: var(--douce); font-size: 14px; }
  .sens { margin: 0; padding-left: 20px; }
  textarea { width: 100%; font: inherit; border: 2px solid var(--encre); border-radius: 10px; padding: 8px; background: var(--papier); color: var(--encre); }
  .actions { display: flex; flex-wrap: wrap; gap: 8px; }
  .actions .ok { background: var(--menthe); color: #1D1B4F; border-color: #1D1B4F; }
  .actions .non { background: var(--piment); color: #1D1B4F; border-color: #1D1B4F; }
  .actions .lien { background: transparent; border-style: dashed; }
  pre { margin: 0; white-space: pre-wrap; background: var(--papier); border: 2px dashed var(--trait); border-radius: 10px; padding: 10px; font-size: 13px; }
  .vide { color: var(--douce); }
  .erreur { color: var(--piment); font-weight: 700; }
</style>
</head>
<body>
<main>
  <h1>Propositions</h1>
  <p class="meta">Relis avec quelqu'un du pays avant d'accepter. Les refus sont effacés au bout de 90 jours.</p>
  <nav class="onglets" id="onglets" aria-label="Statut"></nav>
  <p class="erreur" id="erreur" hidden></p>
  <section id="liste" aria-live="polite"></section>
</main>
<script src="admin.js"></script>
</body>
</html>`;

export const SCRIPT_ADMIN = `(function () {
  "use strict";
  var NOMS = { nouvelle: "Nouvelles", relecture: "En relecture", acceptee: "Acceptées", refusee: "Refusées" };
  var base = location.pathname.indexOf("/admin") === 0 ? "/admin" : "";   // en local : servi sous /admin
  var statut = "nouvelle";
  var liste = document.getElementById("liste"), erreur = document.getElementById("erreur");

  function el(tag, attrs, enfants) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === "texte") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (enfants || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function appel(methode, chemin, corps) {
    return fetch(base + chemin, {
      method: methode, credentials: "same-origin",
      headers: Object.assign({ "X-Tchip-Admin": "1" }, corps ? { "Content-Type": "application/json" } : {}),
      body: corps ? JSON.stringify(corps) : undefined
    }).then(function (r) {
      if (!r.ok) throw new Error("Erreur " + r.status);
      return (r.headers.get("Content-Type") || "").indexOf("json") !== -1 ? r.json() : r.blob();
    });
  }
  function montrerErreur(e) { erreur.textContent = e.message || String(e); erreur.hidden = false; }

  function onglets(comptes) {
    var n = {}; (comptes || []).forEach(function (c) { n[c.statut] = c.n; });
    var nav = document.getElementById("onglets"); nav.textContent = "";
    Object.keys(NOMS).forEach(function (s) {
      var b = el("button", { type: "button", "aria-pressed": String(s === statut), texte: NOMS[s] + " (" + (n[s] || 0) + ")" });
      b.addEventListener("click", function () { statut = s; charger(); });
      nav.appendChild(b);
    });
  }

  function carte(p) {
    var date = new Date(p.cree).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
    var c = el("article", { class: "carte" }, [
      el("h2", { texte: "« " + p.expression + " »" }),
      el("p", { class: "meta", texte: p.pays + (p.lieu ? " · " + p.lieu : "") + " · " + date + " · app en " + p.langue + (p.pseudo ? " · par " + p.pseudo : "") }),
      el("ol", { class: "sens" }, p.sens.map(function (s) { return el("li", { texte: s.sens + (s.ou ? " — " + s.ou : "") }); })),
      p.exemple ? el("p", { texte: "Exemple : « " + p.exemple + " »" }) : null
    ]);
    if (p.voix) {
      var ecouter = el("button", { type: "button", class: "lien", texte: "🔊 Écouter la voix (accord de publication donné)" });
      ecouter.addEventListener("click", function () {
        appel("GET", "/api/voix/" + p.id).then(function (blob) {
          var a = el("audio", { controls: "", src: URL.createObjectURL(blob) });
          ecouter.replaceWith(a); a.play();
        }).catch(montrerErreur);
      });
      c.appendChild(el("div", { class: "actions" }, [ecouter]));
    }
    var note = el("textarea", { rows: "2", maxlength: "500", placeholder: "Note : qui a relu, pourquoi ce choix…" });
    note.value = p.note || "";
    c.appendChild(note);
    var actions = el("div", { class: "actions" });
    function changer(s) {
      return function () { appel("PATCH", "/api/propositions/" + p.id, { statut: s, note: note.value }).then(function () { if (s === "acceptee") brouillon(p, c); else charger(); }).catch(montrerErreur); };
    }
    if (p.statut !== "relecture") actions.appendChild(bouton("En relecture", "", changer("relecture")));
    if (p.statut !== "acceptee") actions.appendChild(bouton("Accepter", "ok", changer("acceptee")));
    else actions.appendChild(bouton("Voir le brouillon", "", function () { brouillon(p, c); }));
    if (p.statut !== "refusee") actions.appendChild(bouton("Refuser", "non", changer("refusee")));
    actions.appendChild(bouton("Supprimer", "lien", function () {
      if (confirm("Supprimer définitivement cette proposition ?")) appel("DELETE", "/api/propositions/" + p.id).then(charger).catch(montrerErreur);
    }));
    c.appendChild(actions);
    return c;
  }
  function bouton(texte, classe, action) {
    var b = el("button", { type: "button", class: classe, texte: texte });
    b.addEventListener("click", action);
    return b;
  }
  // Acceptée : le brouillon à coller dans data/expressions.js (fin du tableau) et data/expressions-en.js.
  function brouillon(p, c) {
    appel("GET", "/api/brouillon/" + p.id).then(function (b) {
      var zone = el("div", {}, [
        el("p", { class: "meta", texte: "À coller à la fin de data/expressions.js, puis compléter les « À ÉCRIRE » :" }), el("pre", { texte: b.fr }),
        el("p", { class: "meta", texte: "Et dans data/expressions-en.js :" }), el("pre", { texte: b.en }),
        b.credit ? el("p", { class: "meta", texte: "Crédit à citer dans la fiche si la personne le souhaite : " + b.credit }) : null
      ]);
      c.appendChild(zone);
    }).catch(montrerErreur);
  }

  function charger() {
    erreur.hidden = true;
    appel("GET", "/api/propositions?statut=" + statut).then(function (d) {
      onglets(d.comptes);
      liste.textContent = "";
      if (!d.propositions.length) liste.appendChild(el("p", { class: "vide", texte: "Rien ici pour l'instant." }));
      d.propositions.forEach(function (p) { liste.appendChild(carte(p)); });
    }).catch(montrerErreur);
  }
  charger();
})();`;
