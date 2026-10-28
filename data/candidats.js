/*
 * Tchip — expressions CANDIDATES (brouillons à relire).
 *
 * But : amener chaque pays à ~40 expressions pour l'entraînement libre (Voyager),
 * sans toucher au tchip du jour, qui ne pioche QUE dans data/expressions.js (confirmé).
 *
 * Règles :
 *   - même format qu'une entrée de data/expressions.js (voir son en-tête) ;
 *   - chaque entrée reçoit automatiquement « candidat: true » (cf. bas du fichier) ;
 *   - ces mots apparaissent dans Voyager (séries + lexique) mais JAMAIS comme expression du jour ;
 *   - la version anglaise (data/expressions-en.js) n'est pas exigée tant qu'ils sont candidats ;
 *   - champ « source » (adresse web) à attacher à la relecture, pour tracer l'origine.
 *
 * Validation d'un candidat : vérifier avec des gens du pays / une source fiable,
 * compléter la source, retirer « candidat » et le déplacer dans data/expressions.js (à la fin),
 * puis ajouter sa traduction dans data/expressions-en.js.
 */
(function () {
  "use strict";
  var candidats = [

    // ---------- Côte d'Ivoire (nouchi) ----------
    {
      expression: "Djô",
      pays: "CI", theme: "gens",
      sens: "Un gars, un copain",
      leurres: ["Un chef de quartier", "Un vendeur ambulant", "Un nouveau venu en ville"],
      exemple: "Mon djô, on se voit ce soir au maquis ?",
      fiche: "Nouchi d'Abidjan. « Djô » désigne un homme, un pote ; la fille, elle, c'est la « go »."
    },
    {
      expression: "C'est gbê",
      pays: "CI", theme: "emotions",
      sens: "C'est la vérité, c'est du sérieux",
      leurres: ["C'est fini", "C'est trop cher", "C'est dangereux"],
      exemple: "Je te jure, c'est gbê : je l'ai vu de mes yeux.",
      fiche: "Nouchi. « Gbê », c'est le vrai, le sérieux ; « dire gbê », c'est dire la vérité."
    },
    {
      expression: "Kpata",
      pays: "CI", theme: "quotidien",
      sens: "Beau, chic, de bonne qualité",
      leurres: ["Bon marché", "Cassé, en panne", "Ennuyeux"],
      exemple: "Ta nouvelle coupe est kpata !",
      fiche: "Nouchi. « Kpata » qualifie ce qui est beau, classe, réussi."
    },
    {
      expression: "Bramogo",
      pays: "CI", theme: "amour",
      sens: "Un ami très proche, un frère",
      leurres: ["Un cousin éloigné", "Un rival", "Un voisin qu'on connaît à peine"],
      exemple: "C'est mon bramogo depuis l'école primaire.",
      fiche: "Nouchi, de l'anglais « brother » et de « môgô » (le gars) : l'ami proche, le frère de cœur."
    },
    {
      expression: "Chap-chap",
      pays: "CI", theme: "quotidien",
      sens: "Très vite, sans traîner",
      leurres: ["Petit à petit", "Plus tard", "En cachette"],
      exemple: "Finis ton assiette chap-chap, on doit partir.",
      fiche: "Nouchi. « Chap-chap » : vite fait, rapidement."
    },
    {
      expression: "Gazer",
      pays: "CI", theme: "transport",
      sens: "Partir, filer rapidement",
      leurres: ["Se disputer", "Trop manger", "Faire le plein d'essence"],
      exemple: "Il est déjà tard, on gaze !",
      fiche: "Nouchi. « Gazer », « on gaze » : y aller, filer sans attendre."
    },
    {
      expression: "Le bengué",
      pays: "CI", theme: "gens",
      sens: "L'Europe, l'étranger (surtout la France)",
      leurres: ["Le centre-ville d'Abidjan", "Le marché du quartier", "Le village d'origine"],
      exemple: "Son grand frère est parti au bengué l'an dernier.",
      fiche: "Nouchi. « Le bengué », c'est l'Europe ; « partir au bengué », c'est émigrer."
    },
    {
      expression: "Un zamou",
      pays: "CI", theme: "quotidien",
      sens: "Un porte-bonheur, un gri-gri",
      leurres: ["Un bijou en or", "Un vieux proverbe", "Un remède contre la fièvre"],
      exemple: "Il porte toujours son zamou avant un match.",
      fiche: "Nouchi. Un « zamou » est une amulette, un gri-gri censé protéger ou porter chance."
    },
    {
      expression: "Le gbangban",
      pays: "CI", theme: "emotions",
      sens: "Le vacarme, la bagarre, le désordre",
      leurres: ["Le silence total", "Une bonne nouvelle", "Un long voyage"],
      exemple: "Dès que l'arbitre a sifflé, c'était le gbangban dans le stade.",
      fiche: "Nouchi. Le « gbangban », c'est le bruit, la bagarre, la pagaille."
    },
    {
      expression: "Le dabali",
      pays: "CI", theme: "manger",
      sens: "La nourriture, le repas",
      leurres: ["La monnaie, l'argent", "La file d'attente", "La vaisselle sale"],
      exemple: "Après le travail, on cherche le dabali.",
      fiche: "Nouchi. « Le dabali », c'est la bouffe, le repas ; « daba », manger."
    },
    {
      expression: "Un gbonhi",
      pays: "CI", theme: "gens",
      sens: "Une bande, un groupe d'amis",
      leurres: ["Un conflit de voisinage", "Un quartier mal famé", "Un ancien du village"],
      exemple: "Tout le gbonhi se retrouve au terrain le dimanche.",
      fiche: "Nouchi. Le « gbonhi », c'est la bande, le groupe de potes."
    },
    {
      expression: "Gnata",
      pays: "CI", theme: "gens",
      sens: "Un ringard, quelqu'un de dépassé",
      leurres: ["Un homme très élégant", "Un enfant gâté", "Un grand sportif"],
      exemple: "Avec ces vieilles baskets, il a l'air gnata.",
      fiche: "Nouchi. « Gnata » : ringard, pas à la mode, un peu lourd."
    },
    {
      expression: "Faroter",
      pays: "CI", theme: "argent",
      sens: "Frimer en distribuant de l'argent",
      leurres: ["Négocier un prix", "Économiser sou par sou", "Emprunter de l'argent"],
      exemple: "En boîte, il farote pour impressionner les go.",
      fiche: "Nouchi. « Faroter » (ou « farot »), c'est frimer, jeter de l'argent pour épater."
    },
    {
      expression: "Un fanico",
      pays: "CI", theme: "ecole",
      sens: "Un blanchisseur, un laveur de linge",
      leurres: ["Un gardien d'immeuble", "Un vendeur de journaux", "Un cireur de chaussures"],
      exemple: "Le fanico récupère le linge le lundi et le rend propre le jeudi.",
      fiche: "Nouchi d'Abidjan. Les « fanico » sont les blanchisseurs qui lavent le linge à la main au bord de l'eau."
    },
    {
      expression: "Être kpê",
      pays: "CI", theme: "argent",
      sens: "Être fauché, sans un sou",
      leurres: ["Être très occupé", "Être en colère", "Être amoureux"],
      exemple: "Attends la paie, là je suis kpê.",
      fiche: "Nouchi. « Être kpê » : être à sec, sans argent."
    },
    {
      expression: "Un bakroman",
      pays: "CI", theme: "gens",
      sens: "Un enfant des rues",
      leurres: ["Un commerçant du marché", "Un élève brillant", "Un chauffeur de taxi"],
      exemple: "Des bakromans dorment près de la gare routière.",
      fiche: "Nouchi d'Abidjan. Un « bakroman » est un enfant qui vit dans la rue."
    },
    {
      expression: "Sutrer",
      pays: "CI", theme: "quotidien",
      sens: "Aider, dépanner quelqu'un",
      leurres: ["Surveiller quelqu'un", "Doubler dans la file", "Se moquer de quelqu'un"],
      exemple: "Sutre-moi avec 500 francs, je te rends demain.",
      fiche: "Nouchi. « Sutrer » quelqu'un, c'est le dépanner, lui rendre service."
    },

    // ---------- Cameroun (camfranglais) ----------
    {
      expression: "Le mboko",
      pays: "CM", theme: "quotidien",
      sens: "La débrouille, la vie de la rue",
      leurres: ["Le calme du village", "Un grand marché couvert", "Une réunion de famille"],
      exemple: "Il connaît le mboko, il sait se débrouiller partout.",
      fiche: "Camfranglais. Le « mboko », c'est la rue, la débrouille au quotidien."
    },
    {
      expression: "Le ngeme",
      pays: "CM", theme: "argent",
      sens: "La galère, le manque d'argent",
      leurres: ["Une grosse fortune", "Une bonne nouvelle", "Un long voyage"],
      exemple: "En fin de mois, c'est le ngeme pour tout le monde.",
      fiche: "Camfranglais. Le « ngeme », c'est la galère, la dèche."
    },
    {
      expression: "Une nga",
      pays: "CM", theme: "amour",
      sens: "Une fille, une copine",
      leurres: ["Une grand-mère", "Une patronne sévère", "Une voisine âgée"],
      exemple: "Il est venu à la fête avec sa nga.",
      fiche: "Camfranglais. Une « nga » : une fille, une petite amie."
    },
    {
      expression: "Ekié !",
      pays: "CM", theme: "emotions",
      sens: "Exclamation de surprise ou d'indignation",
      leurres: ["Une formule de politesse", "Un cri de joie à un but", "Un au revoir"],
      exemple: "Ekié ! Tu as vu le prix de l'essence ?",
      fiche: "Camfranglais. « Ekié ! » marque la surprise, l'étonnement ou l'agacement."
    },
    {
      expression: "Un mbindi",
      pays: "CM", theme: "gens",
      sens: "Un petit, un gamin, un cadet",
      leurres: ["Un chef de famille", "Un vieux sage", "Un homme costaud"],
      exemple: "Envoie le mbindi acheter du pain.",
      fiche: "Camfranglais. Un « mbindi » : un petit, un plus jeune."
    },
    {
      expression: "Mon combi",
      pays: "CM", theme: "amour",
      sens: "Un pote, un complice de confiance",
      leurres: ["Mon patron", "Mon rival", "Un inconnu"],
      exemple: "Je te présente mon combi, on a grandi ensemble.",
      fiche: "Camfranglais. Le « combi », c'est le complice, le pote fidèle."
    },
    {
      expression: "Le soya",
      pays: "CM", theme: "manger",
      sens: "De la viande grillée en brochettes",
      leurres: ["Une soupe de légumes", "Un jus de gingembre", "Un gâteau de fête"],
      exemple: "On s'arrête manger du soya au bord de la route.",
      fiche: "Camfranglais. Le « soya » : brochettes de viande épicée grillée, vendues dans la rue."
    },
    {
      expression: "Le quat",
      pays: "CM", theme: "quotidien",
      sens: "Le quartier",
      leurres: ["Le marché central", "Le terrain de foot", "La gare routière"],
      exemple: "Tout le quat connaît ce vieux.",
      fiche: "Camfranglais (de « quartier »). Le « quat », c'est le coin où on vit."
    },
    {
      expression: "Un ndoss",
      pays: "CM", theme: "gens",
      sens: "Un malin, un débrouillard rusé",
      leurres: ["Un homme naïf", "Un grand timide", "Un vieux fatigué"],
      exemple: "Méfie-toi, ce ndoss a toujours un plan.",
      fiche: "Camfranglais. Un « ndoss » : un débrouillard rusé, parfois un peu voyou."
    },
    {
      expression: "Le pia",
      pays: "CM", theme: "argent",
      sens: "L'argent",
      leurres: ["Le temps libre", "La nourriture", "Le travail"],
      exemple: "Sans pia, pas de taxi, on marche.",
      fiche: "Camfranglais. Le « pia » : l'argent, les sous."
    },
    {
      expression: "Nayo nayo",
      pays: "CM", theme: "quotidien",
      sens: "Doucement, tout doucement",
      leurres: ["Très vite", "En cachette", "Encore une fois"],
      exemple: "Nayo nayo, tu vas y arriver.",
      fiche: "Camfranglais. « Nayo nayo » : doucement, petit à petit."
    },
    {
      expression: "Damer",
      pays: "CM", theme: "manger",
      sens: "Manger",
      leurres: ["Dormir", "Courir", "Payer"],
      exemple: "On a bien damé ce midi.",
      fiche: "Camfranglais. « Damer » : manger, se nourrir."
    },
    {
      expression: "Le gombo",
      pays: "CM", theme: "ecole",
      sens: "Un petit boulot d'appoint, une combine",
      leurres: ["Un examen difficile", "Une dispute", "Un jour férié"],
      exemple: "Il fait des gombos le week-end pour arrondir.",
      fiche: "Camfranglais. Un « gombo », c'est un petit business à côté, une combine pour gagner un peu."
    },

    // ---------- Sénégal (wolof) ----------
    {
      expression: "Xarit",
      pays: "SN", theme: "amour",
      sens: "Un ami",
      leurres: ["Un ennemi", "Un inconnu", "Un cousin éloigné"],
      exemple: "C'est mon xarit depuis l'école.",
      fiche: "Wolof. « Xarit » : un ami ; « sama xarit », mon ami."
    },
    {
      expression: "Déedéet",
      pays: "SN", theme: "quotidien",
      sens: "Non",
      leurres: ["Oui", "Peut-être", "Merci"],
      exemple: "Tu veux du thé ? Déedéet, ça va.",
      fiche: "Wolof. « Déedéet » : non (le « oui », c'est « waaw »)."
    },
    {
      expression: "Nio far",
      pays: "SN", theme: "amour",
      sens: "On est ensemble, solidaires",
      leurres: ["On est en retard", "On est fâchés", "On est perdus"],
      exemple: "Compte sur moi, nio far !",
      fiche: "Wolof. « Nio far » : on est ensemble, un mot de solidarité très sénégalais."
    },
    {
      expression: "Dafa tang",
      pays: "SN", theme: "quotidien",
      sens: "Il fait très chaud",
      leurres: ["Il pleut beaucoup", "Il est tard", "C'est très loin"],
      exemple: "Ferme les rideaux, dafa tang aujourd'hui.",
      fiche: "Wolof. « Tang », c'est chaud ; « dafa tang » : il fait chaud, ou c'est brûlant."
    },
    {
      expression: "Sutura",
      pays: "SN", theme: "gens",
      sens: "La discrétion, la pudeur, la dignité",
      leurres: ["La richesse", "La force physique", "La rapidité"],
      exemple: "On règle ça avec sutura, sans faire de bruit.",
      fiche: "Wolof. La « sutura » : la discrétion et la dignité, une valeur importante au Sénégal."
    },
    {
      expression: "Kaay",
      pays: "SN", theme: "quotidien",
      sens: "Viens (ici)",
      leurres: ["Pars", "Assieds-toi", "Attends"],
      exemple: "Kaay fi, viens voir !",
      fiche: "Wolof. « Kaay » : viens ; « kaay fi », viens ici."
    },
    {
      expression: "Dëgg dëgg",
      pays: "SN", theme: "emotions",
      sens: "Vraiment, pour de vrai",
      leurres: ["À peine", "Par hasard", "En secret"],
      exemple: "Dëgg dëgg, je ne savais pas !",
      fiche: "Wolof. « Dëgg » : vrai ; « dëgg dëgg » : vraiment, sans blague."
    },
    {
      expression: "Jàmm",
      pays: "SN", theme: "salutations",
      sens: "La paix",
      leurres: ["La fête", "La route", "La force"],
      exemple: "Nanga def ? Jàmm rekk — la paix, ça va.",
      fiche: "Wolof. « Jàmm » : la paix ; elle revient dans les salutations, « jàmm rekk », la paix seulement."
    },
    {
      expression: "Le yassa",
      pays: "SN", theme: "manger",
      sens: "Un plat à la sauce oignon-citron",
      leurres: ["Un thé à la menthe", "Une galette sucrée", "Une soupe de légumes"],
      exemple: "Ce midi, yassa poulet.",
      fiche: "Plat sénégalais : viande ou poisson mariné, sauce aux oignons et au citron."
    },
    {
      expression: "Le maffé",
      pays: "SN", theme: "manger",
      sens: "Un ragoût à la sauce d'arachide",
      leurres: ["Un riz au poisson", "Une grillade", "Une salade de fruits"],
      exemple: "Le maffé mijote depuis ce matin.",
      fiche: "Plat ouest-africain : viande en sauce d'arachide, servi avec du riz."
    },
    {
      expression: "Le thiof",
      pays: "SN", theme: "manger",
      sens: "Un poisson très prisé, le mérou",
      leurres: ["Un coquillage", "Un pain local", "Un fromage frais"],
      exemple: "Au marché, le thiof est cher aujourd'hui.",
      fiche: "Le « thiof » (mérou) est le poisson préféré des Sénégalais ; on en fait le thiéboudienne."
    },
    {
      expression: "Le ndogou",
      pays: "SN", theme: "manger",
      sens: "Le repas de rupture du jeûne",
      leurres: ["Le petit-déjeuner d'école", "Un plat de mariage", "Le repas de midi"],
      exemple: "On partage le ndogou à la tombée de la nuit.",
      fiche: "Au Sénégal, le « ndogou » est la rupture du jeûne pendant le ramadan : dattes, café, pain."
    },
    {
      expression: "Un gorgui",
      pays: "SN", theme: "gens",
      sens: "Un vieux, un homme âgé respecté",
      leurres: ["Un petit enfant", "Un étranger de passage", "Un jeune marié"],
      exemple: "Demande au gorgui du quartier, il sait tout.",
      fiche: "Wolof. « Góor gi » : l'homme ; « gorgui » désigne un aîné respecté."
    },
    {
      expression: "Une drianké",
      pays: "SN", theme: "gens",
      sens: "Une femme mûre, élégante et aisée",
      leurres: ["Une petite fille", "Une vendeuse pauvre", "Une étudiante"],
      exemple: "Les driankés sont arrivées en grand boubou.",
      fiche: "Wolof. Une « drianké » : une femme mûre, ronde, élégante et respectée."
    },
    {
      expression: "Le sabar",
      pays: "SN", theme: "fete",
      sens: "Une fête de danse aux tam-tams",
      leurres: ["Un match de lutte", "Un marché de nuit", "Une cérémonie silencieuse"],
      exemple: "Il y a un sabar dans le quartier ce soir.",
      fiche: "Le « sabar » est à la fois le tam-tam wolof et la fête de danse qui va avec."
    },
    {
      expression: "Le mbeuguel",
      pays: "SN", theme: "amour",
      sens: "L'amour",
      leurres: ["La jalousie", "La tristesse", "La patience"],
      exemple: "Entre eux, c'est le grand mbeuguel.",
      fiche: "Wolof. « Mbeuguel » : l'amour, l'affection."
    },
    {
      expression: "Un xale",
      pays: "SN", theme: "gens",
      sens: "Un enfant, un gamin",
      leurres: ["Un vieillard", "Un chef de village", "Un commerçant"],
      exemple: "Les xale jouent au foot dans la rue.",
      fiche: "Wolof. « Xale » : un enfant, un jeune."
    },
    {
      expression: "Baax na",
      pays: "SN", theme: "emotions",
      sens: "C'est bien, c'est bon",
      leurres: ["C'est fini", "C'est cassé", "C'est trop cher"],
      exemple: "Ton idée ? Baax na, on fait comme ça.",
      fiche: "Wolof. « Baax » : bien ; « baax na » : c'est bien, c'est bon."
    },
    {
      expression: "Dalal ak jàmm",
      pays: "SN", theme: "salutations",
      sens: "Bienvenue",
      leurres: ["Au revoir", "Bon voyage", "Félicitations"],
      exemple: "Dalal ak jàmm, entre, sois le bienvenu !",
      fiche: "Wolof. « Dalal ak jàmm » : bienvenue, littéralement « arrive en paix »."
    },
    {
      expression: "Dégg naa",
      pays: "SN", theme: "quotidien",
      sens: "J'ai compris, j'ai entendu",
      leurres: ["Je ne sais pas", "J'ai oublié", "Je suis fatigué"],
      exemple: "Dégg naa, je m'en occupe.",
      fiche: "Wolof. « Dégg » : entendre, comprendre ; « dégg naa » : j'ai compris."
    },
    {
      expression: "Yaakaar",
      pays: "SN", theme: "emotions",
      sens: "L'espoir",
      leurres: ["La peur", "La colère", "La chance"],
      exemple: "Garde le yaakaar, ça va s'arranger.",
      fiche: "Wolof. « Yaakaar » : l'espoir, l'espérance."
    },
    {
      expression: "Un ndongo",
      pays: "SN", theme: "ecole",
      sens: "Un élève, un disciple",
      leurres: ["Un professeur", "Un directeur", "Un parent d'élève"],
      exemple: "Les ndongos récitent le Coran à la daara.",
      fiche: "Wolof. Un « ndongo » : un élève, un disciple (par ex. d'une école coranique, la daara)."
    }

  ];

  var base = (window.TCHIP_EXPRESSIONS = window.TCHIP_EXPRESSIONS || []);
  for (var i = 0; i < candidats.length; i++) {
    candidats[i].candidat = true; // repère : jamais dans le tchip du jour, relecture avant publication
    base.push(candidats[i]);
  }
})();
