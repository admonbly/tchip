/*
 * Tchip — Culture & Usages (pilote : Sénégal, Côte d'Ivoire).
 *
 * Un petit volet « guide » : des questions sur les usages d'un pays (saluer, manger,
 * marchander, respecter, coutumes), sur le même moteur que le jeu — question, 4 choix,
 * puis une explication qui apprend quelque chose.
 *
 * Chaque entrée :
 *   pays       code de TCHIP_PAYS
 *   categorie  clé de TCHIP_CULTURE_CATEGORIES
 *   question   l'énoncé
 *   bonne      la bonne réponse
 *   leurres    3 mauvaises réponses plausibles (idéalement vraies ailleurs : on apprend aussi par les leurres)
 *   explication le contexte montré après la réponse
 *   tchipPlus  true = réservé à Tchip+ ; absent/false = gratuit (teaser)
 *
 * Authenticité : contenu pilote, usages largement documentés. À FAIRE RELIRE par des gens
 * du pays avant d'ouvrir d'autres pays (comme pour les expressions).
 *
 * Le contenu reste en français (pas d'anglais exigé tant que c'est un pilote) : ne pas
 * passer ces textes par t(), seulement les libellés d'interface.
 */
(function () {
  "use strict";

  window.TCHIP_CULTURE_CATEGORIES = {
    salutations: { nom: "Salutations", emoji: "👋" },
    table: { nom: "À table", emoji: "🍽️" },
    argent: { nom: "Argent & marché", emoji: "💰" },
    tabous: { nom: "Tabous & respect", emoji: "🙏" },
    usages: { nom: "Us & coutumes", emoji: "✨" }
  };

  window.TCHIP_CULTURE = [

    // ================= SÉNÉGAL =================
    {
      pays: "SN", categorie: "salutations",
      question: "Tu entres dans une petite boutique à Dakar. Avant de demander ton pain, tu…",
      bonne: "salues et prends des nouvelles",
      leurres: ["demandes le prix tout de suite", "poses l'argent sans parler", "fais juste un signe de tête"],
      explication: "Au pays de la Teranga, on salue toujours et on prend des nouvelles (la famille, la santé) avant de passer aux affaires. Sauter cette étape est vu comme brusque."
    },
    {
      pays: "SN", categorie: "salutations",
      question: "« Nanga def ? » en wolof veut dire…",
      bonne: "Comment vas-tu ?",
      leurres: ["Combien ça coûte ?", "Où vas-tu ?", "Tu viens d'où ?"],
      explication: "« Nanga def ? » est le « ça va ? » wolof. On répond souvent « Maa ngi fi » — « je vais bien », littéralement « je suis là »."
    },
    {
      pays: "SN", categorie: "table",
      question: "Autour du bol commun (le « bool »), tu manges…",
      bonne: "de la main droite, la portion devant toi",
      leurres: ["de la main gauche", "en piochant partout dans le plat", "toujours à la cuillère, jamais à la main"],
      explication: "On partage un grand plat ; chacun mange la part placée devant lui, de la main droite. L'hôte pousse souvent les bons morceaux de poisson vers l'invité."
    },
    {
      pays: "SN", categorie: "argent",
      question: "Au marché Sandaga, le premier prix qu'on t'annonce, c'est…",
      bonne: "un point de départ : on négocie",
      leurres: ["le prix final, fixe", "déjà le plus bas possible", "une insulte si tu réponds"],
      explication: "Le marchandage fait partie du jeu et se fait avec le sourire. Discuter le prix est normal, et même attendu."
    },
    {
      pays: "SN", categorie: "usages",
      question: "La Teranga, dont le Sénégal est si fier, c'est…",
      bonne: "l'hospitalité, l'art d'accueillir",
      leurres: ["une danse de mariage", "un plat de fête", "une région du Sud"],
      explication: "La Teranga, c'est l'accueil chaleureux de l'autre. Le Sénégal se surnomme « le pays de la Teranga »."
    },
    {
      pays: "SN", categorie: "table", tchipPlus: true,
      question: "Le plat que les Sénégalais tiennent pour leur plat national, le ceebu jën, c'est…",
      bonne: "du riz au poisson",
      leurres: ["du poulet braisé", "du mil au lait", "des haricots à l'huile"],
      explication: "« Ceebu jën » (riz-poisson) est le plat emblématique, né à Saint-Louis. Il en existe une version rouge (à la tomate) et une blanche."
    },
    {
      pays: "SN", categorie: "tabous", tchipPlus: true,
      question: "Pour donner ou recevoir un objet, ou de l'argent, tu utilises…",
      bonne: "la main droite",
      leurres: ["la main gauche", "les deux, peu importe", "la main gauche pour l'argent"],
      explication: "La main gauche est réservée à l'hygiène : donner ou recevoir de la main gauche est impoli. Dans le doute, la droite — ou les deux mains, encore plus respectueux."
    },
    {
      pays: "SN", categorie: "tabous", tchipPlus: true,
      question: "Tu t'adresses à une personne âgée que tu ne connais pas. Tu l'appelles…",
      bonne: "« Tonton » ou « Tata »",
      leurres: ["par son prénom", "« Monsieur / Madame » et rien d'autre", "« vieux / vieille »"],
      explication: "Appeler un aîné « Tonton » ou « Tata » marque le respect, même sans lien de famille. On ne tutoie pas un aîné à la légère."
    },
    {
      pays: "SN", categorie: "usages", tchipPlus: true,
      question: "La grande fête musulmane où l'on partage un mouton, très suivie au Sénégal, c'est…",
      bonne: "la Tabaski",
      leurres: ["la Korité", "le Magal", "le Gamou"],
      explication: "La Tabaski (Aïd el-Kébir) est la fête du mouton. À ne pas confondre avec la Korité, qui clôt le Ramadan, ni le Magal de Touba, pèlerinage mouride."
    },

    // ================= CÔTE D'IVOIRE =================
    {
      pays: "CI", categorie: "salutations",
      question: "En Côte d'Ivoire, quand on te lance « On dit quoi ? », c'est…",
      bonne: "une façon de dire « salut, quoi de neuf ? »",
      leurres: ["une demande d'argent", "une petite provocation", "une question sur les prix"],
      explication: "« On dit quoi ? » est une salutation familière. On répond « On est là », « ça va un peu »."
    },
    {
      pays: "CI", categorie: "salutations",
      question: "« Akwaba », qu'on voit partout à l'arrivée, veut dire…",
      bonne: "Bienvenue",
      leurres: ["Au revoir", "Merci", "Attention"],
      explication: "« Akwaba » est un mot akan (baoulé, agni) qui signifie « bienvenue ». C'est le mot qui accueille dès l'aéroport d'Abidjan."
    },
    {
      pays: "CI", categorie: "table",
      question: "L'attiéké, qu'on mange à toute heure, est fait à base de…",
      bonne: "manioc",
      leurres: ["maïs", "riz", "semoule de blé"],
      explication: "L'attiéké est une semoule de manioc fermenté, légèrement acidulée. Il accompagne poisson et viande."
    },
    {
      pays: "CI", categorie: "table",
      question: "Le « garba » du coin de rue, c'est…",
      bonne: "de l'attiéké avec du thon frit",
      leurres: ["un riz gras au poulet", "une brochette de bœuf", "une soupe épicée"],
      explication: "Le garba (attiéké + thon frit, piment, oignon) est le casse-croûte populaire par excellence, servi par le « garbadrome » du quartier."
    },
    {
      pays: "CI", categorie: "usages",
      question: "Le « maquis », institution ivoirienne, c'est…",
      bonne: "un resto-bar populaire, souvent en plein air",
      leurres: ["un marché de nuit", "une forêt protégée", "un quartier d'affaires"],
      explication: "Le maquis est le lieu de la convivialité : poisson braisé, boisson, musique. Sortir « au maquis », c'est la base de la vie abidjanaise."
    },
    {
      pays: "CI", categorie: "table", tchipPlus: true,
      question: "Le foutou se mange…",
      bonne: "avec les doigts, trempé dans la sauce",
      leurres: ["à la cuillère, comme une soupe", "froid, en dessert", "coupé au couteau"],
      explication: "Le foutou (banane plantain et/ou igname pilés) se façonne en boule de la main droite et se trempe dans la sauce — graine, gombo…"
    },
    {
      pays: "CI", categorie: "argent", tchipPlus: true,
      question: "Sur un marché d'Adjamé, dire « c'est trop cher » et proposer moins, c'est…",
      bonne: "normal : le marchandage est attendu",
      leurres: ["très mal vu", "réservé aux étrangers", "interdit avant midi"],
      explication: "Le marchandage fait partie de l'achat : on discute, on plaisante, on tombe d'accord. La monnaie est le franc CFA."
    },
    {
      pays: "CI", categorie: "tabous", tchipPlus: true,
      question: "Face à une personne âgée ou à un chef, le respect passe d'abord par…",
      bonne: "la saluer avant toute chose",
      leurres: ["lui taper sur l'épaule", "l'appeler par son prénom", "garder sa casquette"],
      explication: "On salue toujours les aînés en premier, souvent à deux mains, avant d'entamer quoi que ce soit. L'âge et le statut se respectent."
    },
    {
      pays: "CI", categorie: "usages", tchipPlus: true,
      question: "La musique festive née à Abidjan dans les années 2000, avec ses pas de danse, c'est…",
      bonne: "le coupé-décalé",
      leurres: ["le makossa", "le ndombolo", "le mbalax"],
      explication: "Le coupé-décalé est né dans les nuits ivoiriennes (DJ Arafat en est une icône). Le makossa est camerounais, le ndombolo congolais, le mbalax sénégalais."
    }

  ];
})();
