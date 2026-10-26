/* Tests automatiques de Tchip (sans dépendance). Usage : npm test
 * - règles de la base d'expressions (verification.js)
 * - moteur d'apprentissage (apprentissage.js)
 * - stratégie hors ligne du service worker (sw.js)
 */
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const verifier = require("../verification.js");
const A = require("../apprentissage.js");
const chargerDonnees = require("./charger-donnees.js");

const tests = [];
function test(nom, fn) { tests.push({ nom, fn }); }
function aleaFixe(graine) { let s = graine; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
const copie = (o) => JSON.parse(JSON.stringify(o));

// ---------- Données ----------
const { expressions, pays, themes } = chargerDonnees();

test("la base publiée est valide", () => {
  assert.deepStrictEqual(verifier(expressions, pays, themes), []);
});
test("chaque pays a assez d'expressions pour une série", () => {
  Object.keys(pays).forEach((c) => assert.ok(expressions.some((e) => e.pays === c), "aucune expression pour " + c));
});
test("un pays inconnu est refusé", () => {
  const e = copie(expressions); e[3].pays = "XX";
  assert.ok(verifier(e, pays, themes).some((p) => p.includes("pays inconnu")));
});
test("une expression en double est refusée", () => {
  const e = copie(expressions); e.push(copie(e[0]));
  assert.ok(verifier(e, pays, themes).some((p) => p.includes("déjà présente")));
});
test("un leurre qui est un vrai sens ailleurs est refusé", () => {
  const e = copie(expressions); const i = e.findIndex((x) => x.ailleurs);
  e[i].leurres[0] = e[i].ailleurs[0].sens;
  assert.ok(verifier(e, pays, themes).some((p) => p.includes("vrai sens ailleurs")));
});
test("un thème inconnu est refusé", () => {
  const e = copie(expressions); e[0].theme = "inconnu";
  assert.ok(verifier(e, pays, themes).some((p) => p.includes("thème inconnu")));
});
test("une voix ne peut pas venir d'un autre site", () => {
  const e = copie(expressions);
  e[0].audio = { fichier: "https://pisteur.example/son.mp3", voix: "X" };
  assert.ok(verifier(e, pays, themes).some((p) => p.includes("fichier audio")));
  e[0].audio = { fichier: "audio/ci/../../secret.mp3", voix: "X" };
  assert.ok(verifier(e, pays, themes).some((p) => p.includes("fichier audio")));
  e[0].audio = { fichier: "audio/ci/woro-woro.m4a", voix: "Aya" };
  assert.ok(!verifier(e, pays, themes).some((p) => p.includes("fichier audio")));
});
test("un code pays sert au chemin du drapeau : 2 lettres majuscules seulement", () => {
  const p = copie(pays); p["../x"] = copie(p.CI);
  assert.ok(verifier(expressions, p, themes).some((x) => x.includes("2 lettres")));
});
test("« aussi » ne peut pas contenir le pays d'origine", () => {
  const e = copie(expressions); e[0].aussi = [e[0].pays];
  assert.ok(verifier(e, pays, themes).some((p) => p.includes("aussi")));
});

// ---------- Anglais ----------
const { en } = chargerDonnees();
test("la traduction anglaise couvre tout et reste jouable", () => {
  assert.deepStrictEqual(verifier.traduction(expressions, pays, themes, en), []);
});
test("une expression sans traduction est signalée", () => {
  const t = copie(en); delete t.expressions[expressions[5].pays + "|" + expressions[5].expression];
  assert.ok(verifier.traduction(expressions, pays, themes, t).some((p) => p.includes("pas de traduction")));
});
test("deux sens différents d'un même pays ne se confondent pas en anglais", () => {
  const t = copie(en), ci = expressions.filter((e) => e.pays === "CI");
  const a = ci.find((e) => e.expression === "Gaou"), b = ci.find((e) => e.expression === "Brouteur");
  t.expressions["CI|Brouteur"].sens = t.expressions["CI|Gaou"].sens;
  assert.ok(a && b && verifier.traduction(expressions, pays, themes, t).some((p) => p.includes("traduit déjà")));
});
test("les synonymes gardent le même sens en anglais", () => {
  const t = copie(en); t.expressions["CI|Y a pas drap"].sens = "No worries";
  assert.ok(verifier.traduction(expressions, pays, themes, t).some((p) => p.includes("synonymes")));
});
test("chaque texte de l'interface a sa traduction anglaise", () => {
  const fenetre = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "langues.js"), "utf8"), { window: fenetre });
  const dico = fenetre.TCHIP_LANGUES.en;
  const cles = require("./cles-interface.js")(fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8"))
    .concat(A.NOMS_RANGS, Object.keys(pays).map((c) => pays[c].region))
    .concat(["un peu", "pas mal", "très", "complètement"].map((d) => "Tu parles " + d + " {a}"));
  assert.ok(cles.length > 200);
  assert.deepStrictEqual(cles.filter((k) => !dico[k]), []);
});

// ---------- Apprentissage ----------
test("une bonne réponse fait monter le niveau et espace la révision", () => {
  let f = A.apresReponse(undefined, true, 10);
  assert.deepStrictEqual(f, { n: 1, d: 11, v: 1 });
  f = A.apresReponse(f, true, 11); assert.deepStrictEqual([f.n, f.d], [2, 14]);
  f = A.apresReponse(f, true, 14); assert.deepStrictEqual([f.n, f.d], [3, 21]);
  assert.ok(A.estMaitrise(f));
  f = A.apresReponse(f, true, 21); f = A.apresReponse(f, true, 42);
  assert.strictEqual(f.n, 4, "le niveau plafonne à 4");
});
test("trouver un mot avant sa date de révision ne le fait pas progresser", () => {
  const f = { n: 1, d: 11, v: 1 };
  assert.ok(!A.compteAujourdhui(f, 10));
  const apres = A.apresReponse(f, true, 10);
  assert.deepStrictEqual([apres.n, apres.d, apres.v], [1, 11, 2], "on ne maîtrise pas un mot en rejouant la même série");
  assert.ok(A.compteAujourdhui(f, 11));
  assert.strictEqual(A.apresReponse(f, true, 11).n, 2);
  assert.ok(A.compteAujourdhui(A.decouvrir(undefined, 10), 10), "un mot juste lu dans le lexique compte");
});
test("une erreur ramène au niveau 0 et on revoit le mot demain", () => {
  const f = A.apresReponse({ n: 3, d: 30, v: 5 }, false, 30);
  assert.deepStrictEqual(f, { n: 0, d: 31, v: 6 });
});
test("un mot lu dans le lexique n'est pas une révision", () => {
  const f = A.decouvrir(undefined, 5);
  assert.ok(!A.aReviser(f, 5));
  assert.strictEqual(A.decouvrir(f, 9), f, "découvrir ne remet pas à zéro un mot connu");
});
test("une série met les révisions dues en premier, sans doublon", () => {
  const ci = expressions.filter((e) => e.pays === "CI");
  const savoir = {};
  savoir[A.cle(ci[0])] = { n: 2, d: 3, v: 2 };     // due
  savoir[A.cle(ci[1])] = { n: 4, d: 99, v: 6 };    // pas due
  const serie = A.composerSerie(ci, savoir, 5, aleaFixe(7), 8);
  assert.strictEqual(serie.length, 8);
  assert.ok(serie.includes(ci[0]), "le mot à réviser est dans la série");
  assert.ok(!serie.includes(ci[1]), "le mot maîtrisé et pas dû laisse la place aux nouveaux");
  assert.strictEqual(new Set(serie).size, serie.length);
});
test("une petite liste donne une série plus courte", () => {
  const petite = expressions.filter((e) => e.pays === "TD").slice(0, 3);
  assert.strictEqual(A.composerSerie(petite, {}, 1, aleaFixe(1), 8).length, 3);
});
test("question « sens » : 4 propositions dont la bonne", () => {
  const e = expressions[0];
  const q = A.question(e, [], {}, aleaFixe(3));
  assert.strictEqual(q.type, "sens");
  assert.strictEqual(q.options.length, 4);
  assert.strictEqual(q.options[q.bonne], e.sens);
});
test("question inverse : réservée aux mots connus, intrus du même pays au sens différent", () => {
  const cm = expressions.filter((e) => e.pays === "CM");
  const e = cm[0];
  assert.strictEqual(A.question(e, cm, {}, () => 0).type, "sens", "jamais d'inverse pour un mot jamais vu");
  const savoir = {}; savoir[A.cle(e)] = { n: 1, d: 1, v: 1 };
  for (let g = 1; g < 30; g++) {
    const q = A.question(e, cm, savoir, aleaFixe(g));
    if (q.type !== "inverse") continue;
    assert.strictEqual(q.options[q.bonne], e.expression);
    q.options.forEach((o) => {
      const x = cm.find((y) => y.expression === o);
      assert.ok(x, "intrus du même pays");
      if (o !== e.expression) assert.notStrictEqual(x.sens, e.sens);
    });
  }
});
test("synonymes du même pays : jamais deux bonnes réponses dans une question inverse", () => {
  const ci = expressions.filter((e) => e.pays === "CI");
  const e = ci.find((x) => x.expression === "Ya fohi");
  const savoir = {}; savoir[A.cle(e)] = { n: 2, d: 1, v: 2 };
  for (let g = 1; g < 60; g++) {
    const q = A.question(e, ci, savoir, aleaFixe(g));
    assert.ok(!q.options.includes("Y a pas drap"), "« Y a pas drap » a le même sens que « Ya fohi »");
  }
});
test("tampons : 25, 50, 75 et 100 % de mots maîtrisés, rien pour un mot simplement vu", () => {
  const r = (total, maitrises) => A.rang({ total, vus: total, maitrises });
  assert.strictEqual(A.rang({ total: 20, vus: 12, maitrises: 0 }), 0, "voir des mots ne suffit pas");
  assert.strictEqual(r(20, 4), 0);
  assert.strictEqual(r(20, 5), 1);   // 25 %
  assert.strictEqual(r(20, 9), 1);
  assert.strictEqual(r(20, 10), 2);  // 50 %
  assert.strictEqual(r(20, 15), 3);  // 75 %
  assert.strictEqual(r(20, 19), 3);
  assert.strictEqual(r(20, 20), 4);  // 100 %
  assert.strictEqual(r(23, 6), 1, "on arrondit au mot supérieur : 25 % de 23 = 6 mots");
  assert.strictEqual(r(23, 5), 0);
});
test("prochain tampon : combien de mots il manque", () => {
  const p = { total: 23, vus: 10, maitrises: 7 };
  assert.deepStrictEqual(A.prochainPalier(p), { rang: 2, nom: "Voyageur", seuil: 50, requis: 12, manque: 5 });
  assert.strictEqual(A.pourcentage(p), 30);
  assert.strictEqual(A.prochainPalier({ total: 5, vus: 5, maitrises: 5 }), null);
  assert.strictEqual(A.prochainPalier({ total: 2, vus: 0, maitrises: 0 }).requis, 1, "petit pays : au moins un mot");
});
test("l'accent suit le pays le mieux maîtrisé (3 mots minimum)", () => {
  assert.strictEqual(A.accent({ CI: { total: 20, vus: 5, maitrises: 2 } }), null);
  const a = A.accent({ CI: { total: 20, vus: 10, maitrises: 4 }, TD: { total: 2, vus: 2, maitrises: 2 }, SN: { total: 10, vus: 9, maitrises: 8 } });
  assert.strictEqual(a.code, "SN");
  assert.strictEqual(a.degre, "très");
});

// ---------- Service worker ----------
function mondeSw(reseau) {
  const code = fs.readFileSync(path.join(__dirname, "..", "sw.js"), "utf8").replace("var DELAI_RESEAU = 4000;", "var DELAI_RESEAU = 50;");
  const stock = new Map(), ecouteurs = {};
  const cache = {
    match: async (req) => stock.get(typeof req === "string" ? "http://x/" + req : req.url.split("?")[0]),
    put: async (req, rep) => { stock.set(req.url, rep); },
    add: async (url) => { stock.set("http://x/" + url, { status: 200, corps: "cache:" + url }); }
  };
  vm.runInNewContext(code, {
    self: { addEventListener: (t, f) => (ecouteurs[t] = f), location: { origin: "http://x" }, skipWaiting: async () => {}, clients: { claim: async () => {} } },
    caches: { open: async () => cache, keys: async () => [], delete: async () => true },
    fetch: (req) => reseau === "coupé" ? Promise.reject(new Error("hors ligne"))
      : new Promise((ok) => setTimeout(() => ok({ status: 200, corps: "réseau", clone() { return this; } }), reseau === "lent" ? 300 : 5)),
    Response: { error: () => ({ status: 0 }) }, URL, Promise, setTimeout
  });
  return {
    installer: () => new Promise((ok) => ecouteurs.install({ waitUntil: (p) => p.then(ok) })),
    demander: (url, mode) => new Promise((ok) => ecouteurs.fetch({ request: { method: "GET", url, mode: mode || "cors" }, respondWith: ok })),
    ecouteurs
  };
}
test("hors ligne : le jeu sort du cache", async () => {
  const w = mondeSw("coupé"); await w.installer();
  assert.strictEqual((await w.demander("http://x/app.js")).corps, "cache:app.js");
  assert.strictEqual((await w.demander("http://x/page?x=1", "navigate")).corps, "cache:index.html");
});
test("en ligne : la dernière version du réseau est servie", async () => {
  const w = mondeSw("normal"); await w.installer();
  assert.strictEqual((await w.demander("http://x/app.js")).corps, "réseau");
});
test("réseau lent : le cache répond sans attendre", async () => {
  const w = mondeSw("lent"); await w.installer();
  assert.strictEqual((await w.demander("http://x/styles.css")).corps, "cache:styles.css");
});
test("les autres domaines ne sont pas interceptés", () => {
  const w = mondeSw("normal"); let pris = false;
  w.ecouteurs.fetch({ request: { method: "GET", url: "https://nom.telemetrydeck.com/v2/" }, respondWith: () => (pris = true) });
  assert.ok(!pris);
});

(async () => {
  let echecs = 0;
  for (const t of tests) {
    try { await t.fn(); console.log("✓ " + t.nom); }
    catch (e) { echecs++; console.log("✗ " + t.nom + "\n    " + e.message); }
  }
  console.log("\n" + (tests.length - echecs) + "/" + tests.length + " tests réussis");
  process.exit(echecs ? 1 : 0);
})();
