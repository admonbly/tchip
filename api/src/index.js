/* Tchip — API des propositions (Cloudflare Worker + D1).
 *
 * api.tchip.app   POST /propositions : un joueur envoie une expression (et, s'il veut, sa voix).
 *                 Protections : origines autorisées, Turnstile (anti-robot), champ piège, limites par appareil
 *                 et par jour, tout revérifié côté serveur (regles.js), taille maximale. Aucune donnée lue en retour.
 * admin.tchip.app page de tri, réservée à l'admin : Cloudflare Access filtre en amont, et le Worker revérifie
 *                 le jeton d'Access (signature, audience, expiration) avant de répondre.
 * Tous les jours  purge : refus de plus de 90 jours, compteurs anti-abus de plus de 2 jours.
 *
 * En local (npm run dev, avec DEV=1 dans .dev.vars), l'admin est servi sous /admin sans Access.
 */
import { verifierProposition, verifierVoix, brouillonEntree, LIMITES, STATUTS } from "./regles.js";
import { PAGE_ADMIN, SCRIPT_ADMIN } from "./admin.js";

const JOUR = 86400000;

export default {
  async fetch(requete, env) {
    const url = new URL(requete.url);
    const dev = env.DEV === "1";
    try {
      if (dev && url.pathname === "/admin") return Response.redirect(url.origin + "/admin/", 302);
      const admin = url.hostname.startsWith("admin.") || (dev && url.pathname.startsWith("/admin"));
      if (admin) return await routeAdmin(requete, env, dev ? url.pathname.replace(/^\/admin/, "") || "/" : url.pathname);
      if (url.pathname === "/propositions") return await routePublique(requete, env);
      return texte("Tchip API", 200);
    } catch (e) {
      console.error(e && e.stack || e);
      return json({ erreur: "serveur" }, 500);
    }
  },

  async scheduled(evt, env) {
    const maintenant = Date.now();
    const vieux = await env.DB.prepare("SELECT id FROM propositions WHERE statut = 'refusee' AND maj < ?").bind(maintenant - 90 * JOUR).all();
    for (const p of vieux.results) await supprimer(env, p.id);
    await env.DB.prepare("DELETE FROM limites WHERE cree < ?").bind(maintenant - 2 * JOUR).run();
  }
};

// ---------- Réponses ----------
function json(corps, statut, entetes) {
  return new Response(JSON.stringify(corps), { status: statut || 200, headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, entetes || {}) });
}
function texte(t, statut) { return new Response(t, { status: statut, headers: { "Content-Type": "text/plain; charset=utf-8" } }); }

// ---------- Public : recevoir une proposition ----------
function enteteCors(requete, env) {
  const origine = requete.headers.get("Origin") || "";
  const autorisees = String(env.ORIGINES || "").split(",").map((s) => s.trim()).filter(Boolean);
  const dev = env.DEV === "1" && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origine);
  if (autorisees.indexOf(origine) === -1 && !dev) return null;
  return { "Access-Control-Allow-Origin": origine, "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400", "Vary": "Origin" };
}

async function routePublique(requete, env) {
  const cors = enteteCors(requete, env);
  if (!cors) return json({ erreur: "origine" }, 403);
  if (requete.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (requete.method !== "POST") return json({ erreur: "methode" }, 405, cors);
  if (+(requete.headers.get("Content-Length") || 0) > LIMITES.voixOctets + 64 * 1024) return json({ erreur: "trop lourd" }, 413, cors);

  // Anti-abus d'abord (avant tout appel externe) : par appareil et par heure, par jour, et pour tout le monde.
  const ip = requete.headers.get("CF-Connecting-IP") || "local";
  const jour = new Date().toISOString().slice(0, 10), heure = new Date().getUTCHours();
  const empreinte = await sha256(ip + "|" + jour + "|" + (env.SEL || ""));
  const [h, j, total] = await Promise.all([
    compter(env, "h:" + empreinte + ":" + heure), compter(env, "j:" + empreinte), compter(env, "total:" + jour)
  ]);
  if (h > LIMITES.parHeure || j > LIMITES.parJour || total > LIMITES.totalParJour) return json({ erreur: "limite" }, 429, cors);

  let form;
  try { form = await requete.formData(); } catch (e) { return json({ erreur: "format" }, 400, cors); }

  if (!(await turnstileValide(form.get("turnstile"), ip, env))) return json({ erreur: "robot" }, 403, cors);

  let champs = null;
  try { champs = JSON.parse(String(form.get("donnees") || "")); } catch (e) { /* champs reste vide : refusé plus bas */ }
  const r = verifierProposition(champs);
  if (!r.ok) return json({ erreur: "champs", detail: r.erreurs }, 400, cors);

  const fichier = form.get("voix");
  const aVoix = fichier && typeof fichier === "object" && fichier.size > 0;
  const v = verifierVoix(aVoix ? fichier.type : "", aVoix ? fichier.size : 0, form.get("accord") === "1");
  if (!v.ok) return json({ erreur: v.erreur }, 400, cors);

  const id = crypto.randomUUID(), maintenant = Date.now(), p = r.valeur;
  const ordres = [env.DB.prepare(
    "INSERT INTO propositions (id, cree, maj, statut, expression, pays, lieu, sens, exemple, pseudo, langue, voix) VALUES (?, ?, ?, 'nouvelle', ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, maintenant, maintenant, p.expression, p.pays, p.lieu, JSON.stringify(p.sens), p.exemple, p.pseudo, p.langue, v.voix ? 1 : 0)];
  if (v.voix) {
    ordres.push(env.DB.prepare("INSERT INTO voix (proposition, type, donnees, accord) VALUES (?, ?, ?, 1)")
      .bind(id, fichier.type.split(";")[0], new Uint8Array(await fichier.arrayBuffer())));
  }
  await env.DB.batch(ordres);
  return json({ ok: true }, 201, cors);
}

async function compter(env, cle) {
  const r = await env.DB.prepare(
    "INSERT INTO limites (cle, compte, cree) VALUES (?, 1, ?) ON CONFLICT(cle) DO UPDATE SET compte = compte + 1 RETURNING compte"
  ).bind(cle, Date.now()).first();
  return r ? r.compte : 0;
}

async function turnstileValide(jeton, ip, env) {
  if (!env.TURNSTILE_SECRET || !jeton) return false; // sans clé configurée, on refuse tout : jamais d'API ouverte par erreur
  const corps = new FormData();
  corps.append("secret", env.TURNSTILE_SECRET);
  corps.append("response", String(jeton));
  if (ip !== "local") corps.append("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: corps });
  const d = await r.json().catch(() => ({}));
  return d.success === true;
}

// ---------- Admin ----------
const ENTETES_ADMIN = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex"
};

async function routeAdmin(requete, env, chemin) {
  if (env.DEV !== "1" && !(await accessValide(requete, env))) return new Response("Accès réservé.", { status: 403, headers: ENTETES_ADMIN });
  const m = requete.method;
  if (m === "GET" && chemin === "/") return new Response(PAGE_ADMIN, { headers: Object.assign({ "Content-Type": "text/html; charset=utf-8" }, ENTETES_ADMIN) });
  if (m === "GET" && chemin === "/admin.js") return new Response(SCRIPT_ADMIN, { headers: Object.assign({ "Content-Type": "text/javascript; charset=utf-8" }, ENTETES_ADMIN) });

  // L'API d'admin exige un en-tête maison : un autre site ne peut pas l'envoyer sans autorisation CORS (jamais donnée ici).
  if (requete.headers.get("X-Tchip-Admin") !== "1") return json({ erreur: "entete" }, 403, ENTETES_ADMIN);

  if (m === "GET" && chemin === "/api/propositions") {
    const statut = new URL(requete.url).searchParams.get("statut") || "nouvelle";
    if (STATUTS.indexOf(statut) === -1) return json({ erreur: "statut" }, 400, ENTETES_ADMIN);
    const r = await env.DB.prepare(
      "SELECT id, cree, maj, statut, expression, pays, lieu, sens, exemple, pseudo, langue, voix, note FROM propositions WHERE statut = ? ORDER BY cree DESC LIMIT 200"
    ).bind(statut).all();
    const comptes = await env.DB.prepare("SELECT statut, COUNT(*) AS n FROM propositions GROUP BY statut").all();
    return json({ propositions: r.results.map((p) => Object.assign(p, { sens: JSON.parse(p.sens) })), comptes: comptes.results }, 200, ENTETES_ADMIN);
  }
  const id = (chemin.match(/^\/api\/(?:propositions|voix|brouillon)\/([0-9a-f-]{36})$/) || [])[1];
  if (!id) return json({ erreur: "introuvable" }, 404, ENTETES_ADMIN);

  if (m === "PATCH" && chemin.startsWith("/api/propositions/")) {
    const d = await requete.json().catch(() => ({}));
    if (STATUTS.indexOf(d.statut) === -1) return json({ erreur: "statut" }, 400, ENTETES_ADMIN);
    const note = typeof d.note === "string" ? d.note.slice(0, 500) : "";
    await env.DB.prepare("UPDATE propositions SET statut = ?, note = ?, maj = ? WHERE id = ?").bind(d.statut, note, Date.now(), id).run();
    return json({ ok: true }, 200, ENTETES_ADMIN);
  }
  if (m === "DELETE" && chemin.startsWith("/api/propositions/")) {
    await supprimer(env, id);
    return json({ ok: true }, 200, ENTETES_ADMIN);
  }
  if (m === "GET" && chemin.startsWith("/api/voix/")) {
    const v = await env.DB.prepare("SELECT type, donnees FROM voix WHERE proposition = ?").bind(id).first();
    if (!v) return json({ erreur: "introuvable" }, 404, ENTETES_ADMIN);
    const octets = v.donnees instanceof ArrayBuffer ? new Uint8Array(v.donnees) : Uint8Array.from(v.donnees);
    return new Response(octets, { headers: Object.assign({ "Content-Type": v.type, "Content-Disposition": "inline" }, ENTETES_ADMIN) });
  }
  if (m === "GET" && chemin.startsWith("/api/brouillon/")) {
    const p = await env.DB.prepare("SELECT * FROM propositions WHERE id = ?").bind(id).first();
    if (!p) return json({ erreur: "introuvable" }, 404, ENTETES_ADMIN);
    return json(brouillonEntree(p), 200, ENTETES_ADMIN);
  }
  return json({ erreur: "introuvable" }, 404, ENTETES_ADMIN);
}

async function supprimer(env, id) {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM voix WHERE proposition = ?").bind(id),
    env.DB.prepare("DELETE FROM propositions WHERE id = ?").bind(id)
  ]);
}

// ---------- Cloudflare Access : on revérifie le jeton nous-mêmes ----------
let certificats = null, certificatsLus = 0;
export async function accessValide(requete, env) {   // exportée pour les tests
  const jeton = requete.headers.get("Cf-Access-Jwt-Assertion");
  const equipe = String(env.ACCESS_EQUIPE || "").replace(/\/$/, "");
  if (!jeton || !/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(equipe) || !env.ACCESS_AUD || env.ACCESS_AUD === "A_REMPLIR") return false;
  const [t, c, s] = jeton.split(".");
  if (!t || !c || !s) return false;
  const tete = JSON.parse(b64texte(t)), charge = JSON.parse(b64texte(c));
  if (tete.alg !== "RS256") return false;
  const maintenant = Math.floor(Date.now() / 1000);
  const aud = Array.isArray(charge.aud) ? charge.aud : [charge.aud];
  if (charge.iss !== equipe || aud.indexOf(env.ACCESS_AUD) === -1 || !(charge.exp > maintenant) || (charge.nbf && charge.nbf > maintenant + 60)) return false;
  if (!certificats || Date.now() - certificatsLus > 3600000) {
    certificats = (await (await fetch(equipe + "/cdn-cgi/access/certs")).json()).keys || [];
    certificatsLus = Date.now();
  }
  const jwk = certificats.find((k) => k.kid === tete.kid);
  if (!jwk) return false;
  const cle = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  return crypto.subtle.verify("RSASSA-PKCS1-v1_5", cle, b64octets(s), new TextEncoder().encode(t + "." + c));
}
function b64octets(s) {
  const b = atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));
  return Uint8Array.from(b, (x) => x.charCodeAt(0));
}
function b64texte(s) { return new TextDecoder().decode(b64octets(s)); }
async function sha256(t) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
  return Array.from(new Uint8Array(h), (b) => b.toString(16).padStart(2, "0")).join("");
}
