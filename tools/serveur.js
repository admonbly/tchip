/* Petit serveur statique pour jouer en local, sans dépendance.
 * Usage : npm run serve            → sert le dossier du projet  (http://localhost:8000)
 *         npm run serve -- www     → sert la version construite (npm run build d'abord)
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const racine = path.resolve(__dirname, "..", process.argv[2] || ".");
const port = Number(process.env.PORT) || 8000;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".webmanifest": "application/manifest+json",
  ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8"
};

http.createServer(function (req, res) {
  let chemin = decodeURIComponent(req.url.split("?")[0]);
  if (chemin.endsWith("/")) chemin += "index.html";
  const fichier = path.join(racine, chemin);
  if (!fichier.startsWith(racine)) { res.writeHead(403); res.end(); return; }
  fs.readFile(fichier, function (err, donnees) {
    if (err) { res.writeHead(404); res.end("Introuvable"); return; }
    // En local seulement : la politique de sécurité autorise aussi le Worker de test (api/, npm run dev).
    if (path.basename(fichier) === "index.html") {
      donnees = Buffer.from(String(donnees).replace("connect-src 'self'", "connect-src 'self' http://127.0.0.1:8787 http://localhost:8787"));
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(fichier)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(donnees);
  });
}).listen(port, function () { console.log("Tchip sur http://localhost:" + port + "  (" + (path.relative(process.cwd(), racine) || ".") + ")"); });
