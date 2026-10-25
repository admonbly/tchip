/* Tchip — service worker de la version web (PWA) : le jeu marche hors ligne.
 * Stratégie « réseau d'abord » : on sert toujours la dernière version publiée, et le cache
 * prend le relais sans réseau (ou si le réseau traîne plus de 4 s).
 * Inutile dans les apps iOS/Android : les fichiers y sont déjà embarqués (app.js ne l'enregistre pas).
 */
var VERSION = "dev"; // remplacé au build par « version-empreinte »
var CACHE = "tchip-" + VERSION;
var DELAI_RESEAU = 4000;
var COQUILLE = [
  "./", "index.html", "app.js", "verification.js", "styles.css", "data/expressions.js",
  "manifest.webmanifest", "confidentialite.html",
  "assets/fonts/polices.css",
  "assets/fonts/bricolage-grotesque-latin-opsz-normal.woff2",
  "assets/fonts/figtree-latin-wght-normal.woff2",
  "assets/fonts/figtree-latin-wght-italic.woff2",
  "assets/favicon-32.png", "assets/favicon-180.png", "assets/app-icon.svg"
];

self.addEventListener("install", function (ev) {
  ev.waitUntil(caches.open(CACHE).then(function (cache) {
    // un fichier manquant ne doit pas empêcher l'installation
    return Promise.all(COQUILLE.map(function (url) { return cache.add(url).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (ev) {
  ev.waitUntil(caches.keys().then(function (cles) {
    return Promise.all(cles.filter(function (k) { return k.indexOf("tchip-") === 0 && k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (ev) {
  var req = ev.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  ev.respondWith(reseauDabord(req));
});

function reseauDabord(req) {
  return caches.open(CACHE).then(function (cache) {
    function duCache() {
      return cache.match(req, { ignoreSearch: true }).then(function (r) {
        return r || (req.mode === "navigate" ? cache.match("index.html") : undefined);
      });
    }
    var reseau = fetch(req).then(function (rep) {
      if (rep.status === 200) cache.put(req, rep.clone());
      return rep;
    });
    var lent = new Promise(function (ok) { setTimeout(ok, DELAI_RESEAU); })
      .then(duCache)
      .then(function (r) { return r || reseau; });
    return Promise.race([reseau, lent]).catch(function () {
      return duCache().then(function (r) { return r || Response.error(); });
    });
  });
}
