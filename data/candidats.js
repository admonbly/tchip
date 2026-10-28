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
    },

    // ---------- RD Congo (lingala / français de Kinshasa) ----------
    {
      expression: "Yaya",
      pays: "CD", theme: "gens",
      sens: "Grand frère, aîné (terme de respect)",
      leurres: ["Un tout petit bébé", "Un chef d'entreprise", "Un voisin inconnu"],
      exemple: "Salue ton yaya, c'est l'aîné de la famille.",
      fiche: "Lingala. « Yaya » : le grand frère, l'aîné ; un mot de respect pour quelqu'un de plus âgé."
    },
    {
      expression: "Cadavéré",
      pays: "CD", theme: "quotidien",
      sens: "Épuisé, mort de fatigue",
      leurres: ["En pleine forme", "Très en colère", "Complètement ivre"],
      exemple: "Après le double service, je suis cadavéré.",
      fiche: "Français de Kinshasa. « Cadavéré » : complètement épuisé, à bout de forces."
    },
    {
      expression: "Un Kinois",
      pays: "CD", theme: "gens",
      sens: "Un habitant de Kinshasa",
      leurres: ["Un habitant de Lubumbashi", "Un touriste étranger", "Un pêcheur du fleuve"],
      exemple: "Les Kinois adorent la rumba.",
      fiche: "Un « Kinois » est un habitant de Kinshasa, la capitale."
    },
    {
      expression: "Un kuluna",
      pays: "CD", theme: "gens",
      sens: "Un jeune délinquant d'un gang de rue",
      leurres: ["Un agent de la circulation", "Un vendeur du marché", "Un musicien"],
      exemple: "Le quartier se méfie des kuluna la nuit.",
      fiche: "À Kinshasa, les « kuluna » sont de jeunes délinquants violents, souvent en bande."
    },
    {
      expression: "Un shege",
      pays: "CD", theme: "gens",
      sens: "Un enfant des rues",
      leurres: ["Un élève modèle", "Un jeune marié", "Un chauffeur de bus"],
      exemple: "Des shege demandent quelques pièces au carrefour.",
      fiche: "À Kinshasa, un « shege » est un enfant des rues."
    },
    {
      expression: "Un mopaya",
      pays: "CD", theme: "gens",
      sens: "Un étranger, quelqu'un d'ailleurs",
      leurres: ["Un membre de la famille", "Un enfant du quartier", "Un vieux du village"],
      exemple: "Il parle comme un mopaya, il n'est pas d'ici.",
      fiche: "Lingala. « Mopaya » : un étranger, quelqu'un venu d'ailleurs."
    },
    {
      expression: "Un mundele",
      pays: "CD", theme: "gens",
      sens: "Un Blanc, un Européen",
      leurres: ["Un chef coutumier", "Un sportif célèbre", "Un marchand ambulant"],
      exemple: "Les enfants crient « mundele ! » quand passe un Européen.",
      fiche: "Lingala. « Mundele » : un Blanc, un Européen."
    },
    {
      expression: "Liboma",
      pays: "CD", theme: "emotions",
      sens: "De la folie, un acte insensé",
      leurres: ["Une bonne affaire", "Un grand calme", "Une belle fête"],
      exemple: "Conduire si vite, c'est du liboma !",
      fiche: "Lingala. « Liboma » : la folie, un comportement insensé."
    },
    {
      expression: "Mabe",
      pays: "CD", theme: "emotions",
      sens: "Mauvais, méchant",
      leurres: ["Beau, agréable", "Riche", "Drôle"],
      exemple: "Ne sois pas mabe avec ton petit frère.",
      fiche: "Lingala. « Mabe » : mauvais, méchant."
    },
    {
      expression: "Esengo",
      pays: "CD", theme: "emotions",
      sens: "La joie, le bonheur",
      leurres: ["La fatigue", "La colère", "La peur"],
      exemple: "Quelle esengo de vous revoir tous !",
      fiche: "Lingala. « Esengo » : la joie, le bonheur."
    },
    {
      expression: "Kobeta libanga",
      pays: "CD", theme: "argent",
      sens: "Se débrouiller pour percer, surtout à l'étranger",
      leurres: ["Casser des pierres au chantier", "Jouer de la musique pour s'amuser", "Se disputer violemment"],
      exemple: "À l'étranger, il kobeta libanga pour se faire un nom.",
      fiche: "Lingala, littéralement « frapper la pierre » : se démener pour percer, souvent loin du pays."
    },
    {
      expression: "Mbongo",
      pays: "CD", theme: "argent",
      sens: "L'argent",
      leurres: ["Le temps", "La nourriture", "La chance"],
      exemple: "Sans mbongo, pas de taxi.",
      fiche: "Lingala. « Mbongo » : l'argent."
    },
    {
      expression: "Maboko pamba",
      pays: "CD", theme: "argent",
      sens: "Les mains vides, sans rien",
      leurres: ["Les mains sales", "Les bras musclés", "Les poches pleines"],
      exemple: "Il est revenu du marché maboko pamba, il n'a rien trouvé.",
      fiche: "Lingala, « les mains vides » : sans argent, sans rien."
    },
    {
      expression: "Kitoko",
      pays: "CD", theme: "quotidien",
      sens: "Beau, joli, élégant",
      leurres: ["Laid", "Fatigué", "Cassé"],
      exemple: "Ta robe est vraiment kitoko !",
      fiche: "Lingala. « Kitoko » : beau, joli, élégant."
    },
    {
      expression: "Likambo",
      pays: "CD", theme: "quotidien",
      sens: "Un problème, une affaire",
      leurres: ["Une bonne nouvelle", "Un cadeau", "Un repas de fête"],
      exemple: "Likambo te — pas de problème, on gère.",
      fiche: "Lingala. « Likambo » : un problème, une affaire ; « likambo te » : pas de souci."
    },
    {
      expression: "Le molato",
      pays: "CD", theme: "quotidien",
      sens: "Les habits, la tenue",
      leurres: ["La nourriture", "La maison", "La monnaie"],
      exemple: "Le sapeur soigne son molato des pieds à la tête.",
      fiche: "Lingala. « Molato » : les habits, la tenue."
    },
    {
      expression: "Tika",
      pays: "CD", theme: "quotidien",
      sens: "Laisse, arrête",
      leurres: ["Viens", "Donne", "Regarde"],
      exemple: "Tika ngai — laisse-moi tranquille.",
      fiche: "Lingala. « Tika » : laisse, arrête."
    },
    {
      expression: "Un nganga",
      pays: "CD", theme: "quotidien",
      sens: "Un guérisseur traditionnel, un féticheur",
      leurres: ["Un médecin d'hôpital", "Un professeur", "Un chef de quartier"],
      exemple: "Certains vont voir le nganga pour des plantes.",
      fiche: "Lingala. Un « nganga » : un guérisseur traditionnel, un féticheur."
    },
    {
      expression: "Makasi",
      pays: "CD", theme: "quotidien",
      sens: "Fort, puissant, solide",
      leurres: ["Faible", "Doux", "Lent"],
      exemple: "Ce café est makasi, bien fort !",
      fiche: "Lingala. « Makasi » : fort, puissant, solide."
    },
    {
      expression: "Kobina",
      pays: "CD", theme: "fete",
      sens: "Danser",
      leurres: ["Chanter faux", "Dormir", "Cuisiner"],
      exemple: "On a kobina toute la nuit sur la rumba.",
      fiche: "Lingala. « Kobina » : danser."
    },
    {
      expression: "La rumba",
      pays: "CD", theme: "fete",
      sens: "La rumba congolaise",
      leurres: ["Un plat de fête", "Une lutte traditionnelle", "Un marché de nuit"],
      exemple: "La rumba congolaise fait danser tout le continent.",
      fiche: "La rumba, née des deux Congo, est la musique et la danse reines de Kinshasa (classée à l'UNESCO)."
    },
    {
      expression: "Le ndombolo",
      pays: "CD", theme: "fete",
      sens: "Une danse congolaise endiablée",
      leurres: ["Un tambour", "Un chanteur célèbre", "Une boisson de fête"],
      exemple: "Le ndombolo a enflammé toute l'Afrique dans les années 2000.",
      fiche: "Le « ndombolo » est une danse congolaise très rythmée, et le style de musique qui va avec."
    },
    {
      expression: "Mbanda",
      pays: "CD", theme: "amour",
      sens: "Un(e) rival(e) en amour",
      leurres: ["Un ami d'enfance", "Un cousin", "Un témoin de mariage"],
      exemple: "Les deux mbanda se disputent l'attention du même homme.",
      fiche: "Lingala. « Mbanda » : un(e) rival(e) en amour (ou une belle-sœur)."
    },
    {
      expression: "Le madesu",
      pays: "CD", theme: "manger",
      sens: "Des haricots (plat populaire)",
      leurres: ["Du riz au poisson", "Une soupe de légumes", "Un gâteau sucré"],
      exemple: "Madesu ya bana : des haricots pour toute la famille.",
      fiche: "Lingala. « Madesu » : des haricots, un plat très courant à Kinshasa."
    },
    {
      expression: "Le fufu",
      pays: "CD", theme: "manger",
      sens: "Une pâte de manioc ou de maïs",
      leurres: ["Une boisson sucrée", "Une grillade", "Une salade de crudités"],
      exemple: "On trempe le fufu dans la sauce.",
      fiche: "Le « fufu » (foufou) : une pâte de farine de manioc ou de maïs, qu'on mange avec la sauce."
    },
    {
      expression: "Le liboke",
      pays: "CD", theme: "manger",
      sens: "Du poisson ou de la viande en papillote de feuilles",
      leurres: ["Un pain sucré", "Un jus de fruit", "Une purée de pomme de terre"],
      exemple: "Le liboke de poisson cuit doucement dans les feuilles.",
      fiche: "Lingala. Un « liboke » (ou maboke) : du poisson ou de la viande cuit en papillote de feuilles."
    },
    {
      expression: "Motuka",
      pays: "CD", theme: "transport",
      sens: "Une voiture",
      leurres: ["Un vélo", "Un bateau", "Un avion"],
      exemple: "Il a garé le motuka devant la parcelle.",
      fiche: "Lingala. « Motuka » : une voiture."
    },

    // ---------- Burkina Faso (mooré, dioula, culture) ----------
    {
      expression: "Laafi",
      pays: "BF", theme: "salutations",
      sens: "La santé, « ça va »",
      leurres: ["La fatigue", "La richesse", "La pluie"],
      exemple: "Laafi bala — ça va, tout va bien.",
      fiche: "Mooré. « Laafi » : la santé ; dans les salutations, « laafi bala » veut dire « ça va, la paix »."
    },
    {
      expression: "Kibaré ?",
      pays: "BF", theme: "salutations",
      sens: "Quoi de neuf ? Quelles nouvelles ?",
      leurres: ["Combien ça coûte ?", "Où vas-tu ?", "Quelle heure est-il ?"],
      exemple: "Kibaré ? — Quoi de neuf aujourd'hui ?",
      fiche: "Mooré. « Kibaré ? » : quoi de neuf ? quelles nouvelles ?"
    },
    {
      expression: "Le gonré",
      pays: "BF", theme: "manger",
      sens: "Des beignets de haricot (niébé)",
      leurres: ["Des frites de pomme de terre", "Un gâteau au chocolat", "Des chips de banane"],
      exemple: "Le matin, on achète des gonré au coin de la rue.",
      fiche: "Le « gonré » (ou « samsa ») : des beignets vapeur de pâte de haricot, un classique du petit matin à Ouaga."
    },
    {
      expression: "Le Faso",
      pays: "BF", theme: "quotidien",
      sens: "La patrie, le pays",
      leurres: ["La capitale", "Le fleuve", "Le marché central"],
      exemple: "Fier d'être un fils du Faso.",
      fiche: "Mooré. « Faso » : la patrie, le pays — on le retrouve dans « Burkina Faso », le pays des hommes intègres."
    },
    {
      expression: "Zaka",
      pays: "BF", theme: "quotidien",
      sens: "La cour, la concession familiale",
      leurres: ["Le champ", "La route", "Le marché"],
      exemple: "Toute la famille se réunit dans la zaka le soir.",
      fiche: "Mooré. La « zaka » : la cour, la concession où vit la famille."
    },
    {
      expression: "Le faso dan fani",
      pays: "BF", theme: "quotidien",
      sens: "Le pagne tissé, tissu national",
      leurres: ["Un plat de fête", "Une danse de mariage", "Un proverbe"],
      exemple: "Elle a cousu une tenue dans du faso dan fani.",
      fiche: "Le « Faso Dan Fani » est le pagne tissé à la main, tissu emblématique du Burkina."
    },
    {
      expression: "Le karité",
      pays: "BF", theme: "quotidien",
      sens: "Le beurre tiré des noix de karité",
      leurres: ["Un fruit sucré", "Une céréale", "Un poisson séché"],
      exemple: "On se protège la peau avec le beurre de karité.",
      fiche: "Le « karité » : les noix d'un arbre dont on tire un beurre pour la cuisine et la peau, une richesse du Burkina."
    },
    {
      expression: "La cola",
      pays: "BF", theme: "quotidien",
      sens: "La noix de cola, offerte en signe de respect",
      leurres: ["Une boisson gazeuse", "Un bijou", "Un instrument"],
      exemple: "On offre la cola au vieux en signe de respect.",
      fiche: "La noix de « cola » se partage lors des salutations et des cérémonies, en signe de respect."
    },
    {
      expression: "Un moaga",
      pays: "BF", theme: "gens",
      sens: "Un Mossi (le principal peuple du Burkina)",
      leurres: ["Un étranger", "Un enfant", "Un commerçant riche"],
      exemple: "Les Moose (pluriel de moaga) sont le plus grand peuple du pays.",
      fiche: "Mooré. Un « moaga » (pluriel « Moose ») : un Mossi, le principal peuple du Burkina."
    },
    {
      expression: "Le Moogho Naaba",
      pays: "BF", theme: "gens",
      sens: "Le roi des Mossi",
      leurres: ["Le maire de Ouagadougou", "Un chanteur célèbre", "Un riche commerçant"],
      exemple: "Chaque vendredi, le Moogho Naaba tient une cérémonie à Ouaga.",
      fiche: "Le « Moogho Naaba » est le roi des Mossi, une autorité traditionnelle très respectée."
    },
    {
      expression: "Les hommes intègres",
      pays: "BF", theme: "gens",
      sens: "Les Burkinabè",
      leurres: ["Les habitants de la capitale", "Les anciens combattants", "Les artisans du marché"],
      exemple: "Les Étalons, l'équipe des hommes intègres, jouent ce soir.",
      fiche: "Les Burkinabè sont « les hommes intègres » : « Burkina Faso » signifie « le pays des hommes intègres »."
    },
    {
      expression: "Un griot",
      pays: "BF", theme: "gens",
      sens: "Un conteur et musicien, gardien de la tradition",
      leurres: ["Un chef de village", "Un forgeron", "Un guerrier"],
      exemple: "Le griot raconte l'histoire de la famille depuis des générations.",
      fiche: "Un « griot » est un conteur, musicien et gardien de la mémoire, très présent chez les Mossi et les Mandingues."
    },
    {
      expression: "Toubabou",
      pays: "BF", theme: "gens",
      sens: "Un Blanc, un Européen",
      leurres: ["Un chef traditionnel", "Un marchand ambulant", "Un jeune de la ville"],
      exemple: "Le toubabou a du mal avec la chaleur.",
      fiche: "Dioula. « Toubabou » : un Blanc, un Européen."
    },
    {
      expression: "Le benga",
      pays: "BF", theme: "manger",
      sens: "Des haricots (plat quotidien)",
      leurres: ["Du riz au gras", "Une soupe de poisson", "Un gâteau de mil"],
      exemple: "À midi, benga avec un peu d'huile.",
      fiche: "Mooré. Le « benga » : des haricots, un plat quotidien très répandu."
    },
    {
      expression: "Le zoom-koom",
      pays: "BF", theme: "manger",
      sens: "Une boisson à la farine de mil",
      leurres: ["Une bière de mil", "Un thé sucré", "Un jus d'orange"],
      exemple: "Par la chaleur, rien de mieux qu'un zoom-koom bien frais.",
      fiche: "Le « zoom-koom » (« eau de farine » en mooré) : une boisson rafraîchissante de farine de mil, tamarin et gingembre."
    },
    {
      expression: "Le riz gras",
      pays: "BF", theme: "manger",
      sens: "Du riz cuit dans une sauce tomate huilée",
      leurres: ["Du riz au lait", "Une purée blanche", "Une galette sèche"],
      exemple: "Le dimanche, c'est riz gras pour toute la famille.",
      fiche: "Le « riz gras » : du riz cuit directement dans une sauce tomate bien huilée, un classique des grandes tablées."
    },
    {
      expression: "Le soumbala",
      pays: "BF", theme: "manger",
      sens: "Un condiment de graines de néré fermentées",
      leurres: ["Un fruit acide", "Un fromage frais", "Une pâte sucrée"],
      exemple: "Une cuillère de soumbala relève toute la sauce.",
      fiche: "Le « soumbala » : un condiment fort de graines de néré fermentées, l'âme de beaucoup de sauces."
    },
    {
      expression: "Le poulet bicyclette",
      pays: "BF", theme: "manger",
      sens: "Un poulet de ferme, maigre et savoureux",
      leurres: ["Un poulet en plastique pour enfant", "Un jouet à pédales", "Un plat de pâtes"],
      exemple: "Au maquis, on commande le poulet bicyclette braisé.",
      fiche: "Le « poulet bicyclette » : un poulet de ferme élevé en liberté, maigre et savoureux (on dit qu'il court autant qu'un vélo)."
    },
    {
      expression: "Le bissap",
      pays: "BF", theme: "manger",
      sens: "Un jus de fleurs d'hibiscus",
      leurres: ["Un pain grillé", "Une soupe épicée", "Un alcool fort"],
      exemple: "Un grand verre de bissap bien glacé.",
      fiche: "Le « bissap » : un jus rouge et acidulé, fait avec des fleurs d'hibiscus séchées."
    },
    {
      expression: "Le babenda",
      pays: "BF", theme: "manger",
      sens: "Un plat de feuilles vertes mijotées",
      leurres: ["Un dessert au chocolat", "Une brochette de viande", "Une boisson chaude"],
      exemple: "Le babenda mijote avec du soumbala et des arachides.",
      fiche: "Le « babenda » : un plat de feuilles vertes variées, mijotées, typiquement burkinabè."
    },
    {
      expression: "Le warba",
      pays: "BF", theme: "fete",
      sens: "Une danse traditionnelle mossi",
      leurres: ["Un tambour", "Un plat de fête", "Un marché de nuit"],
      exemple: "Les danseurs de warba font vibrer la place.",
      fiche: "Le « warba » : une danse traditionnelle mossi, rythmée et spectaculaire."
    },
    {
      expression: "Le bendré",
      pays: "BF", theme: "fete",
      sens: "Un tambour-calebasse des griots",
      leurres: ["Une danse de mariage", "Un chant religieux", "Un jeu d'enfants"],
      exemple: "Le griot fait parler le bendré pour annoncer la fête.",
      fiche: "Le « bendré » : un tambour fait d'une calebasse, l'instrument des griots mossi."
    },
    {
      expression: "Le balafon",
      pays: "BF", theme: "fete",
      sens: "Un xylophone de bois sur calebasses",
      leurres: ["Un tambour en peau", "Une flûte en roseau", "Une guitare moderne"],
      exemple: "Les notes du balafon résonnent dans tout le village.",
      fiche: "Le « balafon » : un xylophone de lames de bois posées sur des calebasses ; celui des Sambla est classé à l'UNESCO."
    },
    {
      expression: "Le FESPACO",
      pays: "BF", theme: "fete",
      sens: "Le grand festival du cinéma africain de Ouagadougou",
      leurres: ["Un marché d'artisanat", "Un championnat de lutte", "Une fête religieuse"],
      exemple: "Tous les deux ans, le FESPACO transforme Ouaga en capitale du cinéma.",
      fiche: "Le « FESPACO » : le plus grand festival de cinéma d'Afrique, à Ouagadougou."
    },
    {
      expression: "Gagner petit",
      pays: "BF", theme: "argent",
      sens: "Se débrouiller avec de modestes revenus",
      leurres: ["Dépenser sans compter", "Perdre son travail", "Hériter d'une fortune"],
      exemple: "Il gagne petit avec sa boutique, mais il s'en sort.",
      fiche: "Français populaire. « Gagner petit » : vivre et se débrouiller avec de petits moyens."
    },
    {
      expression: "C'est doux",
      pays: "BF", theme: "emotions",
      sens: "C'est agréable, c'est bon",
      leurres: ["C'est difficile", "C'est dangereux", "C'est trop cher"],
      exemple: "La sauce est bien relevée, c'est doux !",
      fiche: "Français populaire ouest-africain. « C'est doux » : c'est agréable, c'est bon, c'est réussi."
    },
    {
      expression: "Faire force",
      pays: "BF", theme: "ecole",
      sens: "Faire un gros effort, se donner à fond",
      leurres: ["Abandonner", "Se reposer", "Tricher"],
      exemple: "Fais force pour tes examens, tu es presque au bout.",
      fiche: "Français populaire. « Faire force » : faire un gros effort, se donner à fond."
    },
    {
      expression: "An ka taa",
      pays: "BF", theme: "quotidien",
      sens: "Allons-y, on y va",
      leurres: ["Assieds-toi", "Attends-moi", "Reviens demain"],
      exemple: "Il est tard, an ka taa — on y va !",
      fiche: "Dioula. « An ka taa » : allons-y, on y va."
    },
    {
      expression: "Le dèguè",
      pays: "BF", theme: "manger",
      sens: "Un dessert de mil et de lait caillé",
      leurres: ["Une soupe de légumes", "Une galette salée", "Un ragoût de viande"],
      exemple: "Après le repas, un bon dèguè bien frais.",
      fiche: "Le « dèguè » (ou « dégué ») : de petites billes de mil mêlées à du lait caillé sucré, un dessert très apprécié."
    },

    // ---------- Mali (bambara / français de Bamako) ----------
    {
      expression: "I ni sogoma",
      pays: "ML", theme: "salutations",
      sens: "Bonjour (le matin)",
      leurres: ["Bonne nuit", "Bon appétit", "Au revoir"],
      exemple: "I ni sogoma ! Bien dormi ?",
      fiche: "Bambara. « I ni sɔgɔma » : bonjour, le salut du matin."
    },
    {
      expression: "K'an bɛn",
      pays: "ML", theme: "salutations",
      sens: "Au revoir, à bientôt",
      leurres: ["Bonjour", "Merci beaucoup", "Bon voyage"],
      exemple: "K'an bɛn, à demain !",
      fiche: "Bambara. « K'an bɛn » : au revoir, à bientôt (« qu'on se retrouve »)."
    },
    {
      expression: "Ça va un peu",
      pays: "ML", theme: "salutations",
      sens: "Ça va plus ou moins, moyennement",
      leurres: ["Ça va très bien", "Ça ne va pas du tout", "Au revoir"],
      exemple: "— Ça va ? — Ça va un peu, le travail est dur.",
      fiche: "Français de Bamako. « Ça va un peu » : couci-couça, moyennement."
    },
    {
      expression: "Doni doni",
      pays: "ML", theme: "quotidien",
      sens: "Doucement, petit à petit",
      leurres: ["Très vite", "Tout de suite", "Encore une fois"],
      exemple: "Doni doni, on va y arriver.",
      fiche: "Bambara. « Dɔɔni dɔɔni » : doucement, petit à petit."
    },
    {
      expression: "Toubabou",
      pays: "ML", theme: "gens",
      sens: "Un Blanc, un étranger",
      leurres: ["Un chef de village", "Un commerçant", "Un musicien"],
      exemple: "Le toubabou visite le marché de Bamako.",
      fiche: "Bambara. « Toubabou » : un Blanc, un Européen (mot répandu dans toute la région)."
    },
    {
      expression: "Un djeli",
      pays: "ML", theme: "gens",
      sens: "Un griot, gardien de la parole",
      leurres: ["Un forgeron", "Un chasseur", "Un chef de quartier"],
      exemple: "Le djeli chante l'histoire des grandes familles.",
      fiche: "Bambara. Un « djeli » : un griot, dépositaire de la mémoire et de la parole."
    },
    {
      expression: "Un fama",
      pays: "ML", theme: "gens",
      sens: "Un chef, un homme puissant",
      leurres: ["Un mendiant", "Un enfant", "Un étranger de passage"],
      exemple: "Il se comporte comme un fama dans le quartier.",
      fiche: "Bambara. Un « fama » : un roi, un chef, un homme de pouvoir."
    },
    {
      expression: "Un dugutigi",
      pays: "ML", theme: "gens",
      sens: "Le chef de village",
      leurres: ["Le plus jeune du village", "Un voyageur", "Un commerçant riche"],
      exemple: "On salue le dugutigi avant de s'installer.",
      fiche: "Bambara. Le « dugutigi » : le chef du village (« le maître de la terre »)."
    },
    {
      expression: "Un bozo",
      pays: "ML", theme: "gens",
      sens: "Un pêcheur du fleuve (peuple bozo)",
      leurres: ["Un éleveur de bétail", "Un forgeron", "Un marchand de tissus"],
      exemple: "Les Bozos remontent le Niger en pirogue.",
      fiche: "Les « Bozos » sont le peuple de pêcheurs du fleuve Niger."
    },
    {
      expression: "Le djatiguiya",
      pays: "ML", theme: "gens",
      sens: "L'hospitalité, l'accueil de l'hôte",
      leurres: ["La méfiance", "La richesse", "Le départ en voyage"],
      exemple: "Au Mali, le djatiguiya est sacré.",
      fiche: "Bambara. Le « djatiguiya » : le devoir d'hospitalité entre l'hôte et son logeur (le « diatigui »)."
    },
    {
      expression: "Le wari",
      pays: "ML", theme: "argent",
      sens: "L'argent",
      leurres: ["Le temps", "La nourriture", "La route"],
      exemple: "Sans wari, pas de marché.",
      fiche: "Bambara. « Wari » : l'argent."
    },
    {
      expression: "Le balani show",
      pays: "ML", theme: "fete",
      sens: "Une fête de quartier avec sono et musique",
      leurres: ["Un match de football", "Un marché de nuit", "Une réunion de famille"],
      exemple: "Tout le quartier danse au balani show du week-end.",
      fiche: "À Bamako, le « balani show » est une fête de rue avec DJ et balafon électrifié."
    },
    {
      expression: "Le wassoulou",
      pays: "ML", theme: "fete",
      sens: "Une musique du sud du Mali",
      leurres: ["Une danse masquée", "Un plat de fête", "Un tissu traditionnel"],
      exemple: "Les chanteuses de wassoulou enflamment la scène.",
      fiche: "Le « wassoulou » : un style musical du sud du Mali, porté par de grandes voix de femmes."
    },
    {
      expression: "Le djembé",
      pays: "ML", theme: "fete",
      sens: "Un tambour à mains mandingue",
      leurres: ["Une flûte", "Une guitare", "Une trompette"],
      exemple: "Les mains courent sur le djembé.",
      fiche: "Le « djembé » : un tambour en bois et peau de chèvre, emblème de la musique mandingue."
    },
    {
      expression: "La kora",
      pays: "ML", theme: "fete",
      sens: "Une harpe-luth des griots",
      leurres: ["Un tambour", "Une danse", "Un chant religieux"],
      exemple: "La kora accompagne les récits du griot.",
      fiche: "La « kora » : une harpe-luth à 21 cordes, l'instrument des griots mandingues."
    },
    {
      expression: "Le sumu",
      pays: "ML", theme: "fete",
      sens: "Une fête, une soirée joyeuse",
      leurres: ["Un enterrement", "Un jour de jeûne", "Un long voyage"],
      exemple: "Il y a un sumu chez les voisins ce soir.",
      fiche: "Bambara. Un « sumu » : une fête, une soirée de réjouissances."
    },
    {
      expression: "Le fonio",
      pays: "ML", theme: "manger",
      sens: "Une petite céréale fine du Sahel",
      leurres: ["Un poisson séché", "Une racine sucrée", "Une viande fumée"],
      exemple: "Un bon fonio bien léger avec la sauce.",
      fiche: "Le « fonio » : une toute petite céréale ancienne, cuite comme une semoule."
    },
    {
      expression: "Le capitaine",
      pays: "ML", theme: "manger",
      sens: "Un gros poisson du fleuve Niger",
      leurres: ["Un pain de mil", "Un fruit acide", "Un fromage frais"],
      exemple: "Capitaine braisé au bord du fleuve.",
      fiche: "Le « capitaine » : un gros poisson d'eau douce (la perche du Nil), très prisé grillé."
    },
    {
      expression: "Le tô",
      pays: "ML", theme: "manger",
      sens: "Une pâte de mil ou de maïs",
      leurres: ["Une boisson sucrée", "Un beignet", "Une grillade"],
      exemple: "Le tô se mange avec une sauce gluante.",
      fiche: "Le « tô » : une pâte ferme de mil ou de maïs, base des repas, mangée avec la sauce."
    },
    {
      expression: "Le tigadèguèna",
      pays: "ML", theme: "manger",
      sens: "Un plat en sauce d'arachide",
      leurres: ["Une soupe de poisson", "Un riz au gras", "Une salade de crudités"],
      exemple: "Le tigadèguèna mijote avec de la viande.",
      fiche: "Bambara. Le « tigadèguèna » (« sauce d'arachide ») : le mafé malien, servi avec du riz."
    },
    {
      expression: "Une djakarta",
      pays: "ML", theme: "transport",
      sens: "Une moto bon marché",
      leurres: ["Un vieux car", "Un vélo", "Une charrette"],
      exemple: "Il fait le taxi avec sa djakarta.",
      fiche: "Au Mali, une « djakarta » est une moto chinoise bon marché, du nom d'une marque."
    },
    {
      expression: "Benkadi",
      pays: "ML", theme: "emotions",
      sens: "L'entente, la bonne harmonie",
      leurres: ["La dispute", "La peur", "La fatigue"],
      exemple: "Dans la famille, c'est le benkadi.",
      fiche: "Bambara. « Bɛnkadi » : l'entente, la concorde (« l'accord est doux »)."
    },
    {
      expression: "Le badenya",
      pays: "ML", theme: "emotions",
      sens: "La solidarité fraternelle",
      leurres: ["La rivalité", "La solitude", "La richesse"],
      exemple: "Le badenya unit les enfants d'une même mère.",
      fiche: "Bambara. Le « badenya » : l'esprit de solidarité entre enfants de la même mère."
    },
    {
      expression: "Le fadenya",
      pays: "ML", theme: "emotions",
      sens: "La rivalité entre demi-frères",
      leurres: ["L'amour maternel", "L'amitié d'enfance", "La paix du foyer"],
      exemple: "Le fadenya pousse chacun à se dépasser.",
      fiche: "Bambara. Le « fadenya » : la rivalité entre enfants d'un même père, moteur d'ambition."
    },
    {
      expression: "Un fatô",
      pays: "ML", theme: "gens",
      sens: "Un fou, un insensé",
      leurres: ["Un sage", "Un riche", "Un grand sportif"],
      exemple: "Ne conduis pas comme un fatô !",
      fiche: "Bambara. Un « fatɔ » : un fou, quelqu'un qui agit sans raison."
    },
    {
      expression: "Den",
      pays: "ML", theme: "gens",
      sens: "Un enfant",
      leurres: ["Un vieux", "Un chef", "Un mari"],
      exemple: "Les den jouent devant la concession.",
      fiche: "Bambara. « Den » : un enfant."
    },
    {
      expression: "Muso",
      pays: "ML", theme: "gens",
      sens: "Une femme",
      leurres: ["Un homme", "Une marmite", "Une maison"],
      exemple: "La muso prépare le tô.",
      fiche: "Bambara. « Muso » : une femme."
    },
    {
      expression: "Baara",
      pays: "ML", theme: "ecole",
      sens: "Le travail",
      leurres: ["Le repos", "Le jeu", "La fête"],
      exemple: "Le baara commence tôt le matin.",
      fiche: "Bambara. « Baara » : le travail."
    },
    {
      expression: "Jamana",
      pays: "ML", theme: "quotidien",
      sens: "Le pays, la contrée",
      leurres: ["La maison", "Le marché", "La rivière"],
      exemple: "Il est fier de son jamana.",
      fiche: "Bambara. « Jamana » : le pays, la contrée, la nation."
    },

    // ---------- Gabon (fang, parler de Libreville, culture) ----------
    {
      expression: "Mbolo",
      pays: "GA", theme: "salutations",
      sens: "Bonjour",
      leurres: ["Au revoir", "Bonne nuit", "Merci"],
      exemple: "Mbolo ! Comment ça va ce matin ?",
      fiche: "Fang. « Mbolo » : bonjour, le salut le plus courant au Gabon."
    },
    {
      expression: "Mbolani",
      pays: "GA", theme: "salutations",
      sens: "Bonjour à tous (à plusieurs personnes)",
      leurres: ["Bienvenue chez moi", "Félicitations", "Bon appétit"],
      exemple: "Mbolani ! Bonjour à toute la famille.",
      fiche: "Fang. « Mbolani » : bonjour à vous, quand on salue plusieurs personnes."
    },
    {
      expression: "Akiba",
      pays: "GA", theme: "salutations",
      sens: "Merci",
      leurres: ["Pardon", "Bonjour", "D'accord"],
      exemple: "Akiba beaucoup pour ton aide.",
      fiche: "Du myènè. « Akiba » : merci, employé dans tout le Gabon."
    },
    {
      expression: "Le toli bangando",
      pays: "GA", theme: "quotidien",
      sens: "L'argot de la rue à Libreville",
      leurres: ["Un quartier chic", "Un plat de fête", "Une danse ancienne"],
      exemple: "Il balance deux mots de toli bangando et tout le monde rit.",
      fiche: "Le « toli bangando » : l'argot des jeunes de Libreville, mêlant français et langues locales."
    },
    {
      expression: "Le mapane",
      pays: "GA", theme: "quotidien",
      sens: "Le quartier populaire, la rue",
      leurres: ["Le centre des affaires", "Le bord de mer", "Le marché couvert"],
      exemple: "Il a grandi dans le mapane, il connaît la débrouille.",
      fiche: "Argot de Libreville. Le « mapane » : le quartier populaire, la rue."
    },
    {
      expression: "Le matanga",
      pays: "GA", theme: "quotidien",
      sens: "Une veillée funèbre",
      leurres: ["Un mariage", "Un baptême", "Une remise de diplôme"],
      exemple: "Tout le village est venu au matanga.",
      fiche: "Le « matanga » : la veillée et les cérémonies qui suivent un décès, en Afrique centrale."
    },
    {
      expression: "Le bwiti",
      pays: "GA", theme: "quotidien",
      sens: "Un rite initiatique traditionnel",
      leurres: ["Un sport de combat", "Un marché de nuit", "Un conte pour enfants"],
      exemple: "Le bwiti se transmet de génération en génération.",
      fiche: "Le « bwiti » : un rite initiatique et spirituel gabonais, tourné vers les ancêtres."
    },
    {
      expression: "L'iboga",
      pays: "GA", theme: "quotidien",
      sens: "Une plante sacrée du bwiti",
      leurres: ["Un fruit sucré", "Un tissu brodé", "Un tambour"],
      exemple: "L'iboga est au cœur de la cérémonie du bwiti.",
      fiche: "L'« iboga » : une plante sacrée aux vertus puissantes, utilisée dans le rite bwiti."
    },
    {
      expression: "Le kaba",
      pays: "GA", theme: "quotidien",
      sens: "Une robe ample en pagne",
      leurres: ["Un chapeau de paille", "Un panier tressé", "Une paire de sandales"],
      exemple: "Elle a sorti son plus beau kaba pour la fête.",
      fiche: "Le « kaba » : une longue robe ample en pagne, portée en Afrique centrale."
    },
    {
      expression: "Le nyembwe",
      pays: "GA", theme: "manger",
      sens: "Une sauce de noix de palme",
      leurres: ["Une soupe de légumes", "Un jus de gingembre", "Une pâte sucrée"],
      exemple: "Poulet au nyembwe, le plat préféré des Gabonais.",
      fiche: "Le « nyembwe » : une sauce onctueuse à la pulpe de noix de palme, souvent avec du poulet ou du poisson."
    },
    {
      expression: "L'odika",
      pays: "GA", theme: "manger",
      sens: "Une pâte de mangue sauvage pour les sauces",
      leurres: ["Un fromage fermenté", "Une farine de blé", "Un sirop de canne"],
      exemple: "L'odika épaissit et parfume la sauce.",
      fiche: "L'« odika » (« chocolat du Gabon ») : une pâte de noix de mangue sauvage, pour lier les sauces."
    },
    {
      expression: "Le folong",
      pays: "GA", theme: "manger",
      sens: "Des feuilles vertes (sorte d'épinard)",
      leurres: ["Des frites d'igname", "Un poisson fumé", "Un gâteau de maïs"],
      exemple: "Du folong mijoté avec de l'arachide.",
      fiche: "Le « folong » : des feuilles vertes comestibles, cuisinées comme des épinards."
    },
    {
      expression: "L'atanga",
      pays: "GA", theme: "manger",
      sens: "Le safou, un fruit violet qu'on mange cuit",
      leurres: ["Une noix de coco", "Une banane plantain", "Un piment rouge"],
      exemple: "On fait ramollir les atanga au feu.",
      fiche: "L'« atanga » (le safou) : un fruit violet à la chair grasse, mangé chaud, ramolli à l'eau ou au feu."
    },
    {
      expression: "Le bâton de manioc",
      pays: "GA", theme: "manger",
      sens: "Du manioc cuit dans des feuilles",
      leurres: ["Un pain sucré", "Une canne à sucre", "Une racine crue"],
      exemple: "Un bâton de manioc avec le poisson braisé.",
      fiche: "Le « bâton de manioc » : de la pâte de manioc fermentée, roulée et cuite dans des feuilles."
    },
    {
      expression: "Le ngombi",
      pays: "GA", theme: "fete",
      sens: "Une harpe sacrée du bwiti",
      leurres: ["Un tambour d'appel", "Une flûte en bambou", "Une cloche"],
      exemple: "Le ngombi guide les chants de la cérémonie.",
      fiche: "Le « ngombi » : une harpe sacrée à huit cordes, jouée pendant le rite bwiti."
    },
    {
      expression: "Le mvett",
      pays: "GA", theme: "fete",
      sens: "Une épopée chantée fang",
      leurres: ["Une danse de mariage", "Un proverbe", "Un jeu de société"],
      exemple: "Le conteur récite le mvett toute la nuit.",
      fiche: "Le « mvett » : une longue épopée chantée des Fang, et la harpe-cithare qui l'accompagne."
    },
    {
      expression: "Le kongossa",
      pays: "GA", theme: "gens",
      sens: "Les ragots, les commérages",
      leurres: ["Un conseil de sages", "Une bonne nouvelle", "Un discours officiel"],
      exemple: "Au salon de coiffure, c'est le kongossa permanent.",
      fiche: "Le « kongossa » : les ragots, les potins — un mot partagé avec le Cameroun voisin."
    }

  ];

  var base = (window.TCHIP_EXPRESSIONS = window.TCHIP_EXPRESSIONS || []);
  for (var i = 0; i < candidats.length; i++) {
    candidats[i].candidat = true; // repère : jamais dans le tchip du jour, relecture avant publication
    base.push(candidats[i]);
  }
})();
