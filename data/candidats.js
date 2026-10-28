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
    },
    {
      expression: "Une bouquet",
      pays: "GA", theme: "gens",
      sens: "Une belle jeune femme",
      leurres: ["Un bouquet de fleurs", "Un jeune homme élégant", "Une vieille dame"],
      exemple: "Cette bouquet-là fait tourner les têtes dans le mapane.",
      fiche: "Français du Gabon. Une « bouquet » : une belle jeune femme."
    },
    {
      expression: "On est ensemble",
      pays: "GA", theme: "salutations",
      sens: "On est solidaires, à bientôt",
      leurres: ["Chacun pour soi", "On se dépêche", "On a fini"],
      exemple: "Pas de souci, on est ensemble !",
      fiche: "Expression de solidarité chère aux Gabonais : « on est ensemble », on se soutient (aussi dite ailleurs en Afrique)."
    },

    // ---------- Bénin (vodoun, cuisine, histoire du Dahomey) ----------
    {
      expression: "Le vodoun",
      pays: "BJ", theme: "quotidien",
      sens: "La religion traditionnelle béninoise",
      leurres: ["Une danse de mariage", "Un marché de nuit", "Un conte pour enfants"],
      exemple: "Le vodoun est né sur ces terres, au cœur de l'ancien Dahomey.",
      fiche: "Le « vodoun » : la religion traditionnelle du Bénin, culte des divinités et des ancêtres (à l'origine du mot « vaudou »)."
    },
    {
      expression: "Un fa",
      pays: "BJ", theme: "quotidien",
      sens: "La divination traditionnelle",
      leurres: ["Une note de musique", "Un plat de fête", "Un jeu de cartes"],
      exemple: "Avant la grande décision, on consulte le Fa.",
      fiche: "Le « Fa » : l'art divinatoire béninois, consulté pour connaître son destin."
    },
    {
      expression: "Un bokonon",
      pays: "BJ", theme: "gens",
      sens: "Un devin qui consulte le Fa",
      leurres: ["Un chef de village", "Un forgeron", "Un marchand ambulant"],
      exemple: "Le bokonon lit les signes du Fa.",
      fiche: "Un « bokonon » : le prêtre-devin qui interprète le Fa."
    },
    {
      expression: "Le Dahomey",
      pays: "BJ", theme: "quotidien",
      sens: "L'ancien royaume, ancien nom du pays",
      leurres: ["La capitale actuelle", "Un fleuve", "Un marché célèbre"],
      exemple: "Les rois du Dahomey régnaient depuis Abomey.",
      fiche: "Le « Dahomey » : le puissant royaume d'Abomey, et l'ancien nom du Bénin jusqu'en 1975."
    },
    {
      expression: "Une amazone",
      pays: "BJ", theme: "gens",
      sens: "Une femme guerrière du Dahomey",
      leurres: ["Une reine de beauté", "Une marchande du grand marché", "Une danseuse"],
      exemple: "Les amazones du roi étaient redoutées au combat.",
      fiche: "Les « Amazones » (Agojie) : le corps de femmes soldats du royaume du Dahomey."
    },
    {
      expression: "La récade",
      pays: "BJ", theme: "gens",
      sens: "Le sceptre, emblème du pouvoir royal",
      leurres: ["Une couronne en or", "Un tambour de guerre", "Un trône sculpté"],
      exemple: "Le messager brandit la récade du roi.",
      fiche: "La « récade » : le bâton-sceptre des rois du Dahomey, porté par leurs messagers."
    },
    {
      expression: "Les appliqués d'Abomey",
      pays: "BJ", theme: "quotidien",
      sens: "Des tentures brodées racontant les rois",
      leurres: ["Des bijoux en argent", "Des masques en bois", "Des poteries peintes"],
      exemple: "Les appliqués d'Abomey racontent les exploits des rois.",
      fiche: "Les « appliqués d'Abomey » : des tentures de tissu cousu qui illustrent l'histoire du royaume."
    },
    {
      expression: "La Porte du Non-Retour",
      pays: "BJ", theme: "quotidien",
      sens: "Le mémorial de la traite à Ouidah",
      leurres: ["Un ancien palais royal", "Une plage touristique", "Un marché aux poissons"],
      exemple: "La Porte du Non-Retour, à Ouidah, rappelle le départ des esclaves.",
      fiche: "La « Porte du Non-Retour » : le monument de Ouidah en mémoire des déportés de la traite."
    },
    {
      expression: "Ganvié",
      pays: "BJ", theme: "quotidien",
      sens: "Un village sur pilotis, sur le lac",
      leurres: ["Une montagne sacrée", "Un parc animalier", "Un désert de sable"],
      exemple: "À Ganvié, on se déplace en pirogue entre les maisons.",
      fiche: "« Ganvié » : un grand village lacustre sur le lac Nokoué, surnommé la « Venise de l'Afrique »."
    },
    {
      expression: "Tokpa",
      pays: "BJ", theme: "argent",
      sens: "Le grand marché de Cotonou",
      leurres: ["Le port de pêche", "La gare routière", "Le quartier des banques"],
      exemple: "On trouve de tout à Tokpa, le plus grand marché.",
      fiche: "« Dantokpa » (Tokpa) : l'immense marché de Cotonou, l'un des plus grands d'Afrique de l'Ouest."
    },
    {
      expression: "Un hounon",
      pays: "BJ", theme: "gens",
      sens: "Un prêtre du vodoun",
      leurres: ["Un maire", "Un instituteur", "Un médecin"],
      exemple: "Le hounon dirige la cérémonie au couvent.",
      fiche: "Un « hounon » : un prêtre du vodoun, gardien d'une divinité."
    },
    {
      expression: "Un zangbeto",
      pays: "BJ", theme: "fete",
      sens: "Un masque gardien de la nuit",
      leurres: ["Un épouvantail de champ", "Un costume de carnaval", "Un jouet d'enfant"],
      exemple: "Le zangbeto tourne sur lui-même sans qu'on voie personne dessous.",
      fiche: "Le « zangbeto » : le « veilleur de nuit » masqué, gardien traditionnel qui semble danser tout seul."
    },
    {
      expression: "Un egungun",
      pays: "BJ", theme: "fete",
      sens: "Un masque qui incarne un ancêtre",
      leurres: ["Un chanteur de rue", "Un conteur", "Un acrobate"],
      exemple: "L'egungun sort en habits chatoyants, il ne faut pas le toucher.",
      fiche: "L'« egungun » (« revenant ») : un masque qui fait revenir un ancêtre parmi les vivants."
    },
    {
      expression: "Le gelede",
      pays: "BJ", theme: "fete",
      sens: "Un masque yoruba célébrant les mères",
      leurres: ["Une danse guerrière", "Un chant de récolte", "Un jeu de société"],
      exemple: "Le gelede honore le pouvoir des femmes et des mères.",
      fiche: "Le « Gèlèdè » : une mascarade yoruba du sud Bénin, classée à l'UNESCO, en hommage aux mères."
    },
    {
      expression: "Le zinli",
      pays: "BJ", theme: "fete",
      sens: "Une musique et danse du Dahomey",
      leurres: ["Un plat de fête", "Un tissu royal", "Un proverbe"],
      exemple: "Le zinli, au départ chant funèbre, fait aujourd'hui danser.",
      fiche: "Le « zinli » : un rythme et une danse nés dans la région d'Abomey."
    },
    {
      expression: "La fête du vodoun",
      pays: "BJ", theme: "fete",
      sens: "La fête nationale du vodoun (10 janvier)",
      leurres: ["La fête de l'indépendance", "Un carnaval de rue", "Une fête des récoltes"],
      exemple: "Chaque 10 janvier, Ouidah célèbre la fête du vodoun.",
      fiche: "La « fête du vodoun » : la fête nationale du 10 janvier, qui rassemble adeptes et visiteurs à Ouidah."
    },
    {
      expression: "Yovo",
      pays: "BJ", theme: "gens",
      sens: "Un Blanc, un étranger",
      leurres: ["Un chef traditionnel", "Un enfant", "Un commerçant"],
      exemple: "Les enfants chantent « yovo yovo » en voyant l'étranger.",
      fiche: "« Yovo » : un Blanc, un Européen — mot partagé avec le Togo voisin."
    },
    {
      expression: "Un zem",
      pays: "BJ", theme: "transport",
      sens: "Un moto-taxi",
      leurres: ["Un vélo", "Un grand bus", "Un bateau"],
      exemple: "Je prends un zem pour aller au marché.",
      fiche: "« Zem » : le diminutif de « zémidjan », le moto-taxi omniprésent à Cotonou."
    },
    {
      expression: "Le tchoukoutou",
      pays: "BJ", theme: "manger",
      sens: "Une bière de mil locale",
      leurres: ["Un jus d'ananas", "Un café au lait", "Une limonade"],
      exemple: "On partage le tchoukoutou dans une calebasse.",
      fiche: "Le « tchoukoutou » : une bière de mil artisanale, bue en commun."
    },
    {
      expression: "Le sodabi",
      pays: "BJ", theme: "manger",
      sens: "Un alcool de vin de palme",
      leurres: ["Un sirop sucré", "Une tisane", "Un bouillon de poisson"],
      exemple: "Le sodabi, c'est fort, on en boit un petit verre.",
      fiche: "Le « sodabi » : un alcool fort distillé à partir du vin de palme, emblématique du Bénin."
    },
    {
      expression: "Le tchakpalo",
      pays: "BJ", theme: "manger",
      sens: "Une bière de mil du nord",
      leurres: ["Un thé à la menthe", "Une bouillie sucrée", "Un jus de gingembre"],
      exemple: "Au marché, on sert le tchakpalo tiède.",
      fiche: "Le « tchakpalo » : une bière de mil, surtout dans le nord du pays."
    },
    {
      expression: "Le wassa-wassa",
      pays: "BJ", theme: "manger",
      sens: "Un couscous d'igname",
      leurres: ["Un riz au poisson", "Une purée de banane", "Une soupe épaisse"],
      exemple: "Le wassa-wassa se mange avec une sauce arachide.",
      fiche: "Le « wassa-wassa » : un couscous fait de farine d'igname, plat du nord Bénin."
    },
    {
      expression: "L'amiwo",
      pays: "BJ", theme: "manger",
      sens: "Une pâte de maïs à la tomate",
      leurres: ["Une galette sucrée", "Un gratin de pommes de terre", "Une salade composée"],
      exemple: "Amiwo et poulet, un classique.",
      fiche: "L'« amiwo » : une pâte de maïs rouge, préparée avec une sauce tomate, souvent servie avec du poulet."
    },
    {
      expression: "Le télibo",
      pays: "BJ", theme: "manger",
      sens: "Une pâte d'igname",
      leurres: ["Un pain de blé", "Un beignet sucré", "Une crêpe fine"],
      exemple: "Le télibo noir se mange avec une sauce gluante.",
      fiche: "Le « télibo » : une pâte faite de cossettes d'igname, sombre et élastique."
    },
    {
      expression: "Le gari",
      pays: "BJ", theme: "manger",
      sens: "De la semoule de manioc",
      leurres: ["De la farine de blé", "Du sucre en poudre", "Du gros sel"],
      exemple: "Un peu d'eau sur le gari et c'est prêt.",
      fiche: "Le « gari » : une semoule de manioc, saupoudrée sur les plats ou bue délayée dans l'eau."
    },
    {
      expression: "L'atassi",
      pays: "BJ", theme: "manger",
      sens: "Du riz cuit avec des haricots",
      leurres: ["Des pâtes à la tomate", "Une salade de fruits", "Un ragoût de poisson"],
      exemple: "Atassi bien chaud avec de l'huile rouge.",
      fiche: "L'« atassi » : un plat de riz et de haricots cuits ensemble."
    },
    {
      expression: "Le kuli-kuli",
      pays: "BJ", theme: "manger",
      sens: "Des bâtonnets croustillants d'arachide",
      leurres: ["Des bonbons au miel", "Des chips de banane", "Des biscuits au beurre"],
      exemple: "Des kuli-kuli pour grignoter sur la route.",
      fiche: "Le « kuli-kuli » : des bâtonnets ou galettes frits à base de pâte d'arachide."
    },
    {
      expression: "L'akpan",
      pays: "BJ", theme: "manger",
      sens: "Un yaourt de maïs fermenté",
      leurres: ["Un fromage de chèvre", "Une crème au chocolat", "Un jus de tamarin"],
      exemple: "Un akpan bien frais avec du sucre.",
      fiche: "L'« akpan » : une préparation liquide et acidulée de maïs fermenté, servie fraîche et sucrée."
    },
    {
      expression: "Le tchinkoumè",
      pays: "BJ", theme: "manger",
      sens: "Une pâte de maïs noire à la sauce",
      leurres: ["Une purée de carottes", "Un gâteau au chocolat", "Une soupe claire"],
      exemple: "Le tchinkoumè se fait avec du maïs grillé.",
      fiche: "Le « tchinkoumè » : une pâte de maïs noircie (maïs grillé), typique de la région de Porto-Novo."
    },

    // ---------- Togo (éwé, mina, cuisine, culture) ----------
    {
      expression: "Miawézon",
      pays: "TG", theme: "salutations",
      sens: "Bienvenue à vous (à plusieurs)",
      leurres: ["Au revoir à tous", "Merci beaucoup", "Bon voyage"],
      exemple: "Miawézon ! Entrez, soyez les bienvenus.",
      fiche: "Éwé. « Miawézon » : bienvenue à vous (« woézon » pour une seule personne)."
    },
    {
      expression: "Agoo",
      pays: "TG", theme: "salutations",
      sens: "Pardon, laissez passer, je peux ?",
      leurres: ["Au revoir", "Merci", "Félicitations"],
      exemple: "Agoo ! Je peux entrer ?",
      fiche: "Éwé/akan. « Agoo » : pour s'annoncer, demander la parole ou le passage (partagé avec le Bénin et le Ghana)."
    },
    {
      expression: "Yoo",
      pays: "TG", theme: "quotidien",
      sens: "D'accord, OK",
      leurres: ["Non", "Peut-être", "Jamais"],
      exemple: "On se voit demain ? — Yoo !",
      fiche: "Éwé. « Yoo » : d'accord, entendu."
    },
    {
      expression: "Blewu",
      pays: "TG", theme: "quotidien",
      sens: "Doucement, lentement",
      leurres: ["Très vite", "Tout de suite", "Fort"],
      exemple: "Blewu, ne casse rien !",
      fiche: "Éwé. « Blewu(u) » : doucement, lentement, avec précaution."
    },
    {
      expression: "Le gongon",
      pays: "TG", theme: "quotidien",
      sens: "La cloche du crieur public",
      leurres: ["Une horloge de ville", "Un tambour de fête", "Une sirène d'usine"],
      exemple: "Au son du gongon, tout le quartier écoute l'annonce.",
      fiche: "Le « gongon » : la cloche que frappe le crieur public pour annoncer les nouvelles ; de là, « gongonner »."
    },
    {
      expression: "Un apatam",
      pays: "TG", theme: "quotidien",
      sens: "Un hangar, une paillote",
      leurres: ["Un grenier à mil", "Une pirogue", "Un four à pain"],
      exemple: "On boit un verre à l'apatam du coin.",
      fiche: "Un « apatam » : un hangar ou une paillote ouverte, où l'on s'abrite, se repose ou boit un verre."
    },
    {
      expression: "Lonlon",
      pays: "TG", theme: "amour",
      sens: "L'amour",
      leurres: ["La colère", "La peur", "La fatigue"],
      exemple: "Entre eux, c'est le grand lonlon.",
      fiche: "Éwé. « Lɔlɔ̃ » : l'amour, l'affection."
    },
    {
      expression: "Nɔvi",
      pays: "TG", theme: "amour",
      sens: "Un frère, un proche",
      leurres: ["Un ennemi", "Un inconnu", "Un patron"],
      exemple: "C'est mon nɔvi, on a grandi ensemble.",
      fiche: "Éwé. « Nɔvi » : un frère, une sœur, un proche."
    },
    {
      expression: "Un éwé",
      pays: "TG", theme: "gens",
      sens: "Un Éwé (peuple du sud)",
      leurres: ["Un habitant du désert", "Un pêcheur étranger", "Un marchand nomade"],
      exemple: "Les Éwé vivent surtout dans le sud du Togo.",
      fiche: "Les « Éwé » : le principal peuple du sud du Togo (et du Ghana voisin)."
    },
    {
      expression: "Un kabyè",
      pays: "TG", theme: "gens",
      sens: "Un Kabyè (peuple du nord)",
      leurres: ["Un pêcheur du littoral", "Un prince du sud", "Un commerçant libanais"],
      exemple: "Les Kabyè sont réputés pour leurs luttes, les Evala.",
      fiche: "Les « Kabyè » : un grand peuple du nord du Togo."
    },
    {
      expression: "Dada",
      pays: "TG", theme: "gens",
      sens: "Grande sœur, maman (respect)",
      leurres: ["Un bébé", "Un chef d'État", "Un étranger"],
      exemple: "Dada, merci pour le repas !",
      fiche: "Éwé. « Dada » : grande sœur, mère — un mot de respect et d'affection."
    },
    {
      expression: "Fofo",
      pays: "TG", theme: "gens",
      sens: "Grand frère (respect)",
      leurres: ["Un petit enfant", "Un policier", "Un rival"],
      exemple: "Fofo, tu peux m'aider ?",
      fiche: "Éwé. « Fofo » : grand frère, aîné — un mot de respect."
    },
    {
      expression: "Un amega",
      pays: "TG", theme: "gens",
      sens: "Un notable, un chef",
      leurres: ["Un apprenti", "Un mendiant", "Un voyageur de passage"],
      exemple: "L'amega préside la réunion du quartier.",
      fiche: "Éwé. Un « amega » : une personne importante, un notable, un chef."
    },
    {
      expression: "Un togbé",
      pays: "TG", theme: "gens",
      sens: "Un aïeul, un chef traditionnel",
      leurres: ["Un nouveau-né", "Un touriste", "Un apprenti"],
      exemple: "Le togbé bénit l'assemblée.",
      fiche: "Éwé. « Togbui / Togbé » : un grand-père, un chef traditionnel vénéré."
    },
    {
      expression: "Le vodoun",
      pays: "TG", theme: "quotidien",
      sens: "La religion traditionnelle",
      leurres: ["Une danse de mariage", "Un sport de lutte", "Un grand marché"],
      exemple: "Le vodoun est très présent sur la côte togolaise.",
      fiche: "Le « vodoun » : la religion traditionnelle des divinités, partagée avec le Bénin voisin."
    },
    {
      expression: "Le Koutammakou",
      pays: "TG", theme: "quotidien",
      sens: "Le pays des maisons-tours du nord",
      leurres: ["Un parc national d'éléphants", "Un lac sacré", "Un grand marché"],
      exemple: "Le Koutammakou et ses tatas sont classés à l'UNESCO.",
      fiche: "Le « Koutammakou » : le paysage des Batammariba, avec ses maisons-tours en terre (UNESCO)."
    },
    {
      expression: "Une tata",
      pays: "TG", theme: "quotidien",
      sens: "Une maison-forteresse en terre",
      leurres: ["Une case ronde en paille", "Une tente de nomade", "Un immeuble moderne"],
      exemple: "La tata se visite comme un petit château de terre.",
      fiche: "Une « tata » (tata somba) : une maison-forteresse en terre à étage, dans le nord."
    },
    {
      expression: "Le marché aux fétiches",
      pays: "TG", theme: "quotidien",
      sens: "Le grand marché aux fétiches de Lomé",
      leurres: ["Un marché aux poissons", "Un marché aux fleurs", "Une brocante de meubles"],
      exemple: "Au marché aux fétiches d'Akodessewa, on trouve des remèdes traditionnels.",
      fiche: "Le « marché aux fétiches » d'Akodessewa, à Lomé : le plus grand marché de la médecine vodoun."
    },
    {
      expression: "Le kente",
      pays: "TG", theme: "quotidien",
      sens: "Un pagne tissé aux motifs colorés",
      leurres: ["Un chapeau de paille", "Un bijou en or", "Un masque sculpté"],
      exemple: "Il porte un kente éclatant pour la cérémonie.",
      fiche: "Le « kenté » : un pagne tissé à bandes, aux motifs vifs, chez les Éwé (et les Ashanti du Ghana)."
    },
    {
      expression: "L'agbadza",
      pays: "TG", theme: "fete",
      sens: "Une danse traditionnelle éwé",
      leurres: ["Un plat de fête", "Un tissu royal", "Un chant religieux"],
      exemple: "Les tam-tams lancent l'agbadza et tout le monde danse.",
      fiche: "L'« agbadza » : une danse éwé rythmée, née chez les guerriers."
    },
    {
      expression: "L'Epe-Ekpe",
      pays: "TG", theme: "fete",
      sens: "Le Nouvel An traditionnel guin",
      leurres: ["Une fête des récoltes", "Un carnaval de rue", "Un festival de cinéma"],
      exemple: "À Glidji, l'Epe-Ekpe révèle la pierre sacrée de l'année.",
      fiche: "L'« Epe-Ekpe » : le Nouvel An des Guin-Mina, marqué par la prise de la pierre sacrée à Glidji."
    },
    {
      expression: "L'Evala",
      pays: "TG", theme: "fete",
      sens: "Les luttes initiatiques des Kabyè",
      leurres: ["Une course de pirogues", "Un concours de chant", "Une fête de mariage"],
      exemple: "Pendant les Evala, les jeunes Kabyè s'affrontent à la lutte.",
      fiche: "Les « Evala » : les luttes initiatiques des jeunes Kabyè, chaque juillet dans le nord."
    },
    {
      expression: "Le fetri détsi",
      pays: "TG", theme: "manger",
      sens: "Une sauce gombo gluante",
      leurres: ["Une soupe de poisson claire", "Un riz sucré", "Une purée de banane"],
      exemple: "L'akoumé se mange avec le fetri détsi.",
      fiche: "Le « fétri détsi » : une sauce de gombo, filante, servie avec la pâte."
    },
    {
      expression: "L'ademe",
      pays: "TG", theme: "manger",
      sens: "Une sauce de feuilles (corète)",
      leurres: ["Une sauce tomate", "Un bouillon de viande", "Une crème dessert"],
      exemple: "L'ademe gluant accompagne la pâte de maïs.",
      fiche: "L'« adémè » : une sauce de feuilles de corète potagère, douce et gluante."
    },
    {
      expression: "L'agbeli kaklo",
      pays: "TG", theme: "manger",
      sens: "Des galettes de manioc frites",
      leurres: ["Des beignets sucrés", "Des chips de banane", "Des brochettes de viande"],
      exemple: "Des agbeli kaklo croustillants en snack.",
      fiche: "L'« agbeli kaklo » : des galettes de manioc râpé, frites, croustillantes."
    },
    {
      expression: "Le wagashi",
      pays: "TG", theme: "manger",
      sens: "Un fromage peul frit",
      leurres: ["Un yaourt sucré", "Un beurre de karité", "Un poisson fumé"],
      exemple: "Du wagashi doré à la poêle avec du piment.",
      fiche: "Le « wagashi » : un fromage frais d'origine peule, souvent frit, du nord Togo-Bénin."
    },
    {
      expression: "Le djenkoumè",
      pays: "TG", theme: "manger",
      sens: "Une pâte de maïs rouge à la sauce",
      leurres: ["Une pâte blanche nature", "Un gâteau au chocolat", "Une semoule sucrée"],
      exemple: "Djenkoumè et poulet, un régal.",
      fiche: "Le « djenkoumè » (ou « dêkoumè ») : une pâte de maïs cuite dans une sauce tomate, rouge et parfumée."
    },
    {
      expression: "Le riz djollof",
      pays: "TG", theme: "manger",
      sens: "Du riz épicé cuit dans une sauce tomate",
      leurres: ["Du riz au lait", "Du riz blanc nature", "Des pâtes à l'huile"],
      exemple: "Le riz djollof fait toujours débat entre voisins.",
      fiche: "Le « riz djollof » : du riz coloré et épicé, mijoté dans une sauce tomate, star de toute l'Afrique de l'Ouest."
    },
    {
      expression: "Le sodabi",
      pays: "TG", theme: "manger",
      sens: "Un alcool de vin de palme",
      leurres: ["Un jus de fruit", "Une bière blonde", "Un thé glacé"],
      exemple: "Un petit verre de sodabi pour la route.",
      fiche: "Le « sodabi » : un alcool fort de vin de palme, partagé avec le Bénin voisin."
    },

    // ---------- Congo-Brazzaville (lingala, kituba, la Sape) ----------
    {
      expression: "La Sape",
      pays: "CG", theme: "quotidien",
      sens: "Le culte de l'élégance vestimentaire",
      leurres: ["Un style de musique", "Un quartier riche", "Une danse de rue"],
      exemple: "À Bacongo, la Sape est un art de vivre.",
      fiche: "La « Sape » (Société des Ambianceurs et des Personnes Élégantes) : le culte de l'élégance, dont Brazzaville est un berceau."
    },
    {
      expression: "Un parisien",
      pays: "CG", theme: "gens",
      sens: "Un sapeur rentré de Paris",
      leurres: ["Un touriste français", "Un employé de mairie", "Un étudiant étranger"],
      exemple: "Le parisien est descendu de l'avion en costume trois pièces.",
      fiche: "Dans la Sape, un « parisien » est un sapeur de retour d'Europe, tiré à quatre épingles."
    },
    {
      expression: "Le mbongui",
      pays: "CG", theme: "quotidien",
      sens: "La case des palabres",
      leurres: ["Le marché central", "Le bord du fleuve", "Un terrain de foot"],
      exemple: "Les anciens se réunissent au mbongui pour régler l'affaire.",
      fiche: "Le « mbongui » : la case ou la place des palabres, où l'on discute et tranche les différends."
    },
    {
      expression: "Ambiancer",
      pays: "CG", theme: "fete",
      sens: "Mettre l'ambiance, animer",
      leurres: ["Se taire", "Se reposer", "Se fâcher"],
      exemple: "Le DJ ambiance toute la salle.",
      fiche: "« Ambiancer » : mettre l'ambiance, chauffer la fête (l'« ambianceur » en est le roi)."
    },
    {
      expression: "Le moambé",
      pays: "CG", theme: "manger",
      sens: "Un poulet à la sauce de noix de palme",
      leurres: ["Un riz au poisson", "Une soupe de légumes", "Une brochette grillée"],
      exemple: "Le poulet moambé, c'est le plat du dimanche.",
      fiche: "Le « moambé » : poulet ou poisson mijoté dans la pulpe de noix de palme, plat national des deux Congos."
    },
    {
      expression: "Le fumbwa",
      pays: "CG", theme: "manger",
      sens: "Un plat de feuilles sauvages à l'arachide",
      leurres: ["Un gâteau de manioc", "Un jus de gingembre", "Un ragoût de bœuf"],
      exemple: "Le fumbwa mijote avec du poisson fumé.",
      fiche: "Le « fumbwa » : des feuilles sauvages cuisinées à l'arachide et au poisson fumé."
    },
    {
      expression: "Le safou",
      pays: "CG", theme: "manger",
      sens: "La prune, un fruit violet mangé cuit",
      leurres: ["Une mangue sucrée", "Une noix de coco", "Un piment fort"],
      exemple: "On ramollit le safou à l'eau chaude avant de le manger.",
      fiche: "Le « safou » (la « prune ») : un fruit violet à la chair grasse, mangé chaud (l'atanga au Gabon)."
    },
    {
      expression: "Le munukutuba",
      pays: "CG", theme: "quotidien",
      sens: "La langue véhiculaire du sud du Congo",
      leurres: ["Un plat de fête", "Une danse ancienne", "Un quartier de Brazzaville"],
      exemple: "Au marché, on négocie en munukutuba.",
      fiche: "Le « munukutuba » (kituba) : une langue véhiculaire du sud du Congo, à côté du lingala."
    },
    {
      expression: "Un ndoki",
      pays: "CG", theme: "gens",
      sens: "Un sorcier, un jeteur de sorts",
      leurres: ["Un guérisseur bienveillant", "Un chef de village", "Un pêcheur"],
      exemple: "On accuse parfois les vieux d'être des ndoki.",
      fiche: "Lingala/kikongo. Un « ndoki » : un sorcier, celui qui lance de mauvais sorts."
    },
    {
      expression: "Mobali",
      pays: "CG", theme: "gens",
      sens: "Un homme",
      leurres: ["Une femme", "Un enfant", "Un vieillard"],
      exemple: "C'est un vrai mobali, courageux.",
      fiche: "Lingala. « Mobali » : un homme (aussi un mari, un petit ami)."
    },
    {
      expression: "Mwasi",
      pays: "CG", theme: "gens",
      sens: "Une femme",
      leurres: ["Un homme", "Un bébé", "Un chef"],
      exemple: "La mwasi tient le commerce de la famille.",
      fiche: "Lingala. « Mwasi » : une femme (aussi une épouse)."
    },
    {
      expression: "Koko",
      pays: "CG", theme: "gens",
      sens: "Un grand-parent, un aïeul",
      leurres: ["Un nourrisson", "Un voisin", "Un patron"],
      exemple: "Koko raconte les histoires d'avant.",
      fiche: "Lingala. « Koko » : un grand-parent, un ancêtre."
    },
    {
      expression: "Yaya",
      pays: "CG", theme: "gens",
      sens: "Grand frère, aîné (respect)",
      leurres: ["Un tout-petit", "Un étranger", "Un chef d'entreprise"],
      exemple: "Demande à yaya, il est plus âgé.",
      fiche: "Lingala. « Yaya » : le grand frère, l'aîné (mot partagé avec Kinshasa, sur l'autre rive)."
    },
    {
      expression: "Mopaya",
      pays: "CG", theme: "gens",
      sens: "Un étranger, quelqu'un d'ailleurs",
      leurres: ["Un cousin", "Un enfant du quartier", "Un ancien"],
      exemple: "On voit tout de suite que c'est un mopaya.",
      fiche: "Lingala. « Mopaya » : un étranger, quelqu'un venu d'ailleurs."
    },
    {
      expression: "Mbongo",
      pays: "CG", theme: "argent",
      sens: "L'argent",
      leurres: ["La nourriture", "Le temps", "La route"],
      exemple: "Pas de mbongo, pas de taxi.",
      fiche: "Lingala. « Mbongo » : l'argent."
    },
    {
      expression: "Kobeta libanga",
      pays: "CG", theme: "argent",
      sens: "Se débrouiller pour percer, surtout à l'étranger",
      leurres: ["Casser des cailloux au chantier", "Jouer de la musique pour s'amuser", "Se disputer fort"],
      exemple: "À l'étranger, il kobeta libanga pour y arriver.",
      fiche: "Lingala, « frapper la pierre » : se démener pour réussir, loin du pays (dit des deux côtés du fleuve)."
    },
    {
      expression: "Kitoko",
      pays: "CG", theme: "quotidien",
      sens: "Beau, joli, élégant",
      leurres: ["Laid", "Cassé", "Fatigué"],
      exemple: "Brazza by night, c'est kitoko !",
      fiche: "Lingala. « Kitoko » : beau, joli, élégant."
    },
    {
      expression: "Makasi",
      pays: "CG", theme: "quotidien",
      sens: "Fort, puissant, solide",
      leurres: ["Faible", "Doux", "Lent"],
      exemple: "Ce vin de palme est makasi.",
      fiche: "Lingala. « Makasi » : fort, puissant, solide."
    },
    {
      expression: "Likambo",
      pays: "CG", theme: "quotidien",
      sens: "Un problème, une affaire",
      leurres: ["Une bonne nouvelle", "Un cadeau", "Une fête"],
      exemple: "Likambo te — pas de souci.",
      fiche: "Lingala. « Likambo » : un problème, une affaire ; « likambo te » : pas de problème."
    },
    {
      expression: "Tika",
      pays: "CG", theme: "quotidien",
      sens: "Laisse, arrête",
      leurres: ["Viens", "Donne", "Regarde"],
      exemple: "Tika, ça suffit !",
      fiche: "Lingala. « Tika » : laisse, arrête."
    },
    {
      expression: "Nganga",
      pays: "CG", theme: "quotidien",
      sens: "Un guérisseur traditionnel",
      leurres: ["Un pharmacien", "Un professeur", "Un chef de quartier"],
      exemple: "Le nganga prépare des remèdes à base de plantes.",
      fiche: "Lingala/kikongo. Un « nganga » : un guérisseur traditionnel."
    },
    {
      expression: "Esengo",
      pays: "CG", theme: "emotions",
      sens: "La joie, le bonheur",
      leurres: ["La tristesse", "La colère", "La peur"],
      exemple: "Quelle esengo de se retrouver !",
      fiche: "Lingala. « Esengo » : la joie, le bonheur."
    },
    {
      expression: "Mabe",
      pays: "CG", theme: "emotions",
      sens: "Mauvais, méchant",
      leurres: ["Gentil", "Beau", "Riche"],
      exemple: "Ne sois pas mabe avec ta sœur.",
      fiche: "Lingala. « Mabe » : mauvais, méchant."
    },
    {
      expression: "Liboma",
      pays: "CG", theme: "emotions",
      sens: "De la folie, un acte insensé",
      leurres: ["Une bonne idée", "Un grand calme", "Une belle fête"],
      exemple: "Traverser le fleuve à la nage, c'est du liboma.",
      fiche: "Lingala. « Liboma » : la folie, un comportement insensé."
    },
    {
      expression: "Kobina",
      pays: "CG", theme: "fete",
      sens: "Danser",
      leurres: ["Chanter faux", "Dormir", "Cuisiner"],
      exemple: "On a kobina jusqu'au matin.",
      fiche: "Lingala. « Kobina » : danser."
    },
    {
      expression: "La rumba",
      pays: "CG", theme: "fete",
      sens: "La rumba congolaise",
      leurres: ["Une lutte traditionnelle", "Un plat de fête", "Un marché de nuit"],
      exemple: "La rumba de Brazza et de Kinshasa, un seul cœur.",
      fiche: "La rumba congolaise, née sur les deux rives du fleuve, classée à l'UNESCO."
    },
    {
      expression: "Le ndombolo",
      pays: "CG", theme: "fete",
      sens: "Une danse congolaise endiablée",
      leurres: ["Un tambour", "Un chanteur célèbre", "Une boisson de fête"],
      exemple: "Le ndombolo a fait danser tout le continent.",
      fiche: "Le « ndombolo » : une danse très rythmée des deux Congos, et son style musical."
    },
    {
      expression: "Motuka",
      pays: "CG", theme: "transport",
      sens: "Une voiture",
      leurres: ["Un vélo", "Une pirogue", "Un avion"],
      exemple: "Il a lavé le motuka avant la fête.",
      fiche: "Lingala. « Motuka » : une voiture."
    },

    // ---------- Maroc (darija, cuisine, culture) ----------
    {
      expression: "Labas",
      pays: "MA", theme: "salutations",
      sens: "Ça va, pas de mal",
      leurres: ["Au revoir", "Merci beaucoup", "Bon voyage"],
      exemple: "Labas ? — Labas, hamdoullah.",
      fiche: "Darija. « Labas » : ça va, pas de mal (à la fois la question et la réponse)."
    },
    {
      expression: "Hamdoullah",
      pays: "MA", theme: "salutations",
      sens: "Dieu merci, ça va bien",
      leurres: ["Hélas, non", "Peut-être", "À demain"],
      exemple: "Comment ça va ? — Hamdoullah, tout va bien.",
      fiche: "« Hamdoullah » : Dieu merci — réponse courante pour dire que tout va bien."
    },
    {
      expression: "Choukran",
      pays: "MA", theme: "salutations",
      sens: "Merci",
      leurres: ["Pardon", "Bonjour", "S'il te plaît"],
      exemple: "Choukran pour ton aide !",
      fiche: "« Choukran » : merci."
    },
    {
      expression: "Afak",
      pays: "MA", theme: "salutations",
      sens: "S'il te plaît",
      leurres: ["Merci", "Désolé", "Au revoir"],
      exemple: "Un café, afak.",
      fiche: "Darija. « 3afak » : s'il te plaît."
    },
    {
      expression: "Smahli",
      pays: "MA", theme: "salutations",
      sens: "Pardon, excuse-moi",
      leurres: ["Félicitations", "Bienvenue", "D'accord"],
      exemple: "Smahli, je suis en retard.",
      fiche: "Darija. « Smah liya » : pardonne-moi, excuse-moi."
    },
    {
      expression: "Yallah",
      pays: "MA", theme: "quotidien",
      sens: "Allons-y, dépêche",
      leurres: ["Attends", "Doucement", "Reste ici"],
      exemple: "Yallah, on est en retard !",
      fiche: "« Yallah » : allons-y, vite (de l'arabe)."
    },
    {
      expression: "Inchallah",
      pays: "MA", theme: "quotidien",
      sens: "Si Dieu le veut",
      leurres: ["Sûrement pas", "Tout de suite", "Comme d'habitude"],
      exemple: "On se voit demain, inchallah.",
      fiche: "« Inchallah » : si Dieu le veut — pour parler de l'avenir."
    },
    {
      expression: "Bzaf",
      pays: "MA", theme: "quotidien",
      sens: "Beaucoup, trop",
      leurres: ["Un peu", "Pas du tout", "Parfois"],
      exemple: "C'est bzaf cher pour moi.",
      fiche: "Darija. « Bzaf » (bezzef) : beaucoup, trop."
    },
    {
      expression: "Chwiya",
      pays: "MA", theme: "quotidien",
      sens: "Un peu, un petit peu",
      leurres: ["Énormément", "Jamais", "Très vite"],
      exemple: "Ajoute chwiya de sel.",
      fiche: "Darija. « Chwiya » : un peu, un petit peu."
    },
    {
      expression: "Mezyan",
      pays: "MA", theme: "emotions",
      sens: "Bien, bon, réussi",
      leurres: ["Mauvais", "Cassé", "Ennuyeux"],
      exemple: "Le travail est mezyan, bravo.",
      fiche: "Darija. « Mezyan » : bien, bon, de qualité."
    },
    {
      expression: "Un sahbi",
      pays: "MA", theme: "amour",
      sens: "Un ami, un pote",
      leurres: ["Un ennemi", "Un patron", "Un inconnu"],
      exemple: "C'est mon sahbi depuis l'enfance.",
      fiche: "Darija. « Sahbi » : mon ami, mon pote."
    },
    {
      expression: "Khoya",
      pays: "MA", theme: "amour",
      sens: "Mon frère (ami proche)",
      leurres: ["Mon voisin", "Mon rival", "Mon client"],
      exemple: "Khoya, viens m'aider !",
      fiche: "Darija. « Khoya » : mon frère — aussi pour un ami très proche."
    },
    {
      expression: "Un 3ami",
      pays: "MA", theme: "gens",
      sens: "Monsieur, le vieux (respect)",
      leurres: ["Un enfant", "Un étranger", "Un apprenti"],
      exemple: "3ami, vous avez l'heure ?",
      fiche: "Darija. « 3ami » (« ammi ») : « mon oncle », pour s'adresser avec respect à un homme plus âgé."
    },
    {
      expression: "Miskine",
      pays: "MA", theme: "gens",
      sens: "Le pauvre (par compassion)",
      leurres: ["Le riche", "Le chanceux", "Le menteur"],
      exemple: "Miskine, il a tout perdu.",
      fiche: "« Miskine » : le pauvre, le malheureux — dit avec compassion."
    },
    {
      expression: "Flouss",
      pays: "MA", theme: "argent",
      sens: "L'argent",
      leurres: ["Le temps", "La nourriture", "La chance"],
      exemple: "Je n'ai pas de flouss cette semaine.",
      fiche: "Darija. « Flouss » : l'argent."
    },
    {
      expression: "Le souk",
      pays: "MA", theme: "argent",
      sens: "Le marché traditionnel",
      leurres: ["La banque", "La gare", "La mairie"],
      exemple: "On achète les épices au souk.",
      fiche: "Le « souk » : le marché traditionnel, dédale d'échoppes."
    },
    {
      expression: "Le tajine",
      pays: "MA", theme: "manger",
      sens: "Un plat mijoté en plat de terre",
      leurres: ["Une soupe froide", "Un gâteau sec", "Une salade crue"],
      exemple: "Un tajine de poulet aux olives et citron confit.",
      fiche: "Le « tajine » : à la fois le plat de terre conique et le ragoût qui mijote dedans."
    },
    {
      expression: "La pastilla",
      pays: "MA", theme: "manger",
      sens: "Une tourte feuilletée sucrée-salée",
      leurres: ["Une tarte aux fruits", "Une pizza", "Un sandwich"],
      exemple: "La pastilla au poulet, saupoudrée de sucre et de cannelle.",
      fiche: "La « pastilla » (bastilla) : une tourte en fines feuilles, mêlant salé (volaille) et sucré (amandes, cannelle)."
    },
    {
      expression: "Le msemen",
      pays: "MA", theme: "manger",
      sens: "Une crêpe feuilletée carrée",
      leurres: ["Un pain rond", "Une soupe chaude", "Une glace"],
      exemple: "Msemen au petit-déjeuner avec du thé.",
      fiche: "Le « msemen » : une crêpe feuilletée pliée en carré, dorée à la poêle."
    },
    {
      expression: "Les cornes de gazelle",
      pays: "MA", theme: "manger",
      sens: "Une pâtisserie en croissant à l'amande",
      leurres: ["Des frites", "Un plat de viande", "Une boisson chaude"],
      exemple: "Des cornes de gazelle avec le thé à la menthe.",
      fiche: "Les « cornes de gazelle » (kaab el ghzal) : des croissants de pâte fine fourrés de pâte d'amande."
    },
    {
      expression: "Le ras el hanout",
      pays: "MA", theme: "manger",
      sens: "Un mélange d'épices parfumé",
      leurres: ["Un piment fort unique", "Un dessert au miel", "Une herbe fraîche"],
      exemple: "Une pincée de ras el hanout dans le tajine.",
      fiche: "Le « ras el hanout » : un mélange de nombreuses épices, le « meilleur de la boutique »."
    },
    {
      expression: "L'amlou",
      pays: "MA", theme: "manger",
      sens: "Une pâte d'amande, d'argan et de miel",
      leurres: ["Une confiture de fraises", "Un beurre salé", "Une sauce piquante"],
      exemple: "On trempe le pain dans l'amlou.",
      fiche: "L'« amlou » : une pâte onctueuse d'amandes, d'huile d'argan et de miel, du Sud marocain."
    },
    {
      expression: "La médina",
      pays: "MA", theme: "quotidien",
      sens: "La vieille ville",
      leurres: ["La plage", "Le quartier d'affaires", "La gare"],
      exemple: "On se perd avec plaisir dans la médina.",
      fiche: "La « médina » : la vieille ville historique, souvent entourée de remparts."
    },
    {
      expression: "Le riad",
      pays: "MA", theme: "quotidien",
      sens: "Une maison traditionnelle à patio",
      leurres: ["Un immeuble moderne", "Une tente", "Une ferme"],
      exemple: "Ils ont restauré un riad dans la médina.",
      fiche: "Le « riad » : une maison traditionnelle organisée autour d'un patio ou d'un jardin intérieur."
    },
    {
      expression: "Le hammam",
      pays: "MA", theme: "quotidien",
      sens: "Le bain de vapeur traditionnel",
      leurres: ["Une piscine", "Un salon de coiffure", "Une bibliothèque"],
      exemple: "On va au hammam le vendredi.",
      fiche: "Le « hammam » : le bain de vapeur public, moment de détente et de soins."
    },
    {
      expression: "La djellaba",
      pays: "MA", theme: "quotidien",
      sens: "Une longue robe à capuche",
      leurres: ["Un chapeau de paille", "Des sandales", "Une ceinture"],
      exemple: "Il enfile sa djellaba pour sortir.",
      fiche: "La « djellaba » : une longue robe ample à capuche, portée par les hommes et les femmes."
    },
    {
      expression: "Le gnaoua",
      pays: "MA", theme: "fete",
      sens: "Une musique afro-marocaine spirituelle",
      leurres: ["Une danse de mariage", "Un plat de fête", "Un conte pour enfants"],
      exemple: "Le festival gnaoua d'Essaouira attire le monde entier.",
      fiche: "Le « gnaoua » : une musique et une confrérie spirituelles, héritées des esclaves d'Afrique subsaharienne."
    },
    {
      expression: "Le chaabi",
      pays: "MA", theme: "fete",
      sens: "La musique populaire marocaine",
      leurres: ["Un chant religieux", "Une berceuse", "Un hymne national"],
      exemple: "Au mariage, le chaabi fait danser tout le monde.",
      fiche: "Le « chaabi » : la musique populaire festive, reine des mariages."
    },

    // ---------- Tchad (arabe tchadien, français du Tchad) — lot partiel, à compléter ----------
    {
      expression: "Nassara",
      pays: "TD", theme: "gens",
      sens: "Un Blanc, un Occidental",
      leurres: ["Un chef de village", "Un commerçant arabe", "Un éleveur nomade"],
      exemple: "Les enfants saluent le nassara dans la rue.",
      fiche: "Arabe tchadien. « Nassara » : un Blanc, un Européen (des « Nazaréens »)."
    },
    {
      expression: "Salam",
      pays: "TD", theme: "salutations",
      sens: "Bonjour, salut",
      leurres: ["Au revoir", "Merci", "Bon appétit"],
      exemple: "Salam ! Comment va la famille ?",
      fiche: "Arabe tchadien. « Salam » (salamaleikoum) : le salut, bonjour."
    },
    {
      expression: "Inchallah",
      pays: "TD", theme: "quotidien",
      sens: "Si Dieu le veut",
      leurres: ["Sûrement pas", "Tout de suite", "Comme toujours"],
      exemple: "On se verra demain, inchallah.",
      fiche: "« Inchallah » : si Dieu le veut, pour parler de l'avenir."
    },
    {
      expression: "Wallah",
      pays: "TD", theme: "emotions",
      sens: "Je te jure, c'est vrai",
      leurres: ["Peut-être", "Je ne sais pas", "Tant pis"],
      exemple: "Wallah, je dis la vérité !",
      fiche: "Arabe. « Wallah » : je le jure (« par Dieu »), pour appuyer ses propos."
    },
    {
      expression: "Hamdoulilah",
      pays: "TD", theme: "emotions",
      sens: "Dieu merci, ça va",
      leurres: ["Hélas", "Peut-être", "Au revoir"],
      exemple: "— Comment ça va ? — Hamdoulilah.",
      fiche: "« El hamdoulilah » : Dieu merci — on l'emploie pour dire que ça va."
    },
    {
      expression: "La daraba",
      pays: "TD", theme: "manger",
      sens: "Une sauce gluante (gombo)",
      leurres: ["Une viande grillée", "Un jus sucré", "Un pain plat"],
      exemple: "La boule se mange avec la daraba.",
      fiche: "Arabe tchadien. La « daraba » : une sauce gluante, souvent au gombo, servie avec la boule."
    },
    {
      expression: "Un feki",
      pays: "TD", theme: "gens",
      sens: "Un marabout, un lettré coranique",
      leurres: ["Un chef de guerre", "Un éleveur", "Un forgeron"],
      exemple: "On va voir le feki pour une bénédiction.",
      fiche: "Arabe tchadien. Un « feki » (faki) : un marabout, un lettré de l'école coranique."
    },
    {
      expression: "Le gala",
      pays: "TD", theme: "manger",
      sens: "La bière locale",
      leurres: ["Un thé sucré", "Un jus de fruit", "De l'eau minérale"],
      exemple: "On partage un gala bien frais le soir.",
      fiche: "Au Tchad, le « gala » est la bière la plus populaire, du nom de la marque nationale."
    },
    {
      expression: "Toumaï",
      pays: "TD", theme: "quotidien",
      sens: "Le célèbre fossile d'hominidé du Tchad",
      leurres: ["Un grand lac", "Une montagne sacrée", "Un ancien roi"],
      exemple: "Toumaï, trouvé au Tchad, a près de 7 millions d'années.",
      fiche: "« Toumaï » (« espoir de vie ») : le crâne d'hominidé découvert au Tchad, un des plus anciens connus."
    },
    {
      expression: "Piscinier",
      pays: "TD", theme: "gens",
      sens: "Un maître nageur",
      leurres: ["Un plombier", "Un pêcheur", "Un vendeur d'eau"],
      exemple: "Le piscinier surveille les baigneurs.",
      fiche: "Français du Tchad. Un « piscinier » : un maître nageur."
    },
    {
      expression: "Un sultan",
      pays: "TD", theme: "gens",
      sens: "Un chef traditionnel",
      leurres: ["Un maire élu", "Un commerçant riche", "Un jeune marié"],
      exemple: "Le sultan règle les litiges de la région.",
      fiche: "Au Tchad, un « sultan » est un chef traditionnel à la tête d'une communauté."
    },
    {
      expression: "Un clando",
      pays: "TD", theme: "transport",
      sens: "Un taxi-moto clandestin",
      leurres: ["Un grand bus", "Un vélo", "Une charrette"],
      exemple: "Je prends un clando pour traverser la ville.",
      fiche: "Un « clando » : une moto-taxi informelle, courante à N'Djamena."
    },
    {
      expression: "Un méhari",
      pays: "TD", theme: "transport",
      sens: "Un chameau de selle rapide",
      leurres: ["Un cheval de course", "Une barque", "Un âne de charge"],
      exemple: "Les nomades filent sur leurs méharis.",
      fiche: "Un « méhari » : un dromadaire de selle, rapide, monté dans le désert."
    },
    {
      expression: "La gandoura",
      pays: "TD", theme: "quotidien",
      sens: "Une longue tunique ample",
      leurres: ["Un turban", "Une paire de sandales", "Un chapeau de paille"],
      exemple: "Il porte une gandoura blanche pour la fête.",
      fiche: "La « gandoura » : une longue tunique ample, portée dans tout le Sahel."
    },
    {
      expression: "La chèche",
      pays: "TD", theme: "quotidien",
      sens: "Le long turban du désert",
      leurres: ["Une ceinture de cuir", "Un manteau de laine", "Un collier"],
      exemple: "Il enroule sa chèche pour se protéger du sable.",
      fiche: "La « chèche » : le long foulard-turban qui protège la tête et le visage du soleil et du sable."
    },

    // ---------- Algérie (darija, raï, cuisine, culture) ----------
    {
      expression: "Wesh",
      pays: "DZ", theme: "salutations",
      sens: "Salut, quoi de neuf ?",
      leurres: ["Au revoir", "Merci", "Attention"],
      exemple: "Wesh, ça va ou quoi ?",
      fiche: "Darija algérienne. « Wesh » : salut, et aussi « quoi ? »."
    },
    {
      expression: "Labès",
      pays: "DZ", theme: "salutations",
      sens: "Ça va, pas de mal",
      leurres: ["Au revoir", "Bon appétit", "Félicitations"],
      exemple: "Labès ? — Labès, hamdoullah.",
      fiche: "« Labès » : ça va, pas de mal (à la fois la question et la réponse)."
    },
    {
      expression: "Saha",
      pays: "DZ", theme: "salutations",
      sens: "Merci, bravo (et à ta santé)",
      leurres: ["Pardon", "Au revoir", "Attention"],
      exemple: "Saha ! Tu as bien travaillé.",
      fiche: "Darija. « Saha » : merci, bravo, à ta santé — selon le contexte."
    },
    {
      expression: "Hamdoullah",
      pays: "DZ", theme: "salutations",
      sens: "Dieu merci, ça va bien",
      leurres: ["Hélas", "Peut-être", "À demain"],
      exemple: "Ça va ? — Hamdoullah.",
      fiche: "« Hamdoullah » : Dieu merci — pour dire que tout va bien."
    },
    {
      expression: "Inchallah",
      pays: "DZ", theme: "quotidien",
      sens: "Si Dieu le veut",
      leurres: ["Sûrement pas", "Tout de suite", "Comme toujours"],
      exemple: "On se voit demain, inchallah.",
      fiche: "« Inchallah » : si Dieu le veut, pour parler de l'avenir."
    },
    {
      expression: "Makache",
      pays: "DZ", theme: "quotidien",
      sens: "Il n'y a pas, il n'y en a plus",
      leurres: ["Il y en a beaucoup", "C'est gratuit", "C'est fini"],
      exemple: "Makache de pain ce matin.",
      fiche: "Darija algérienne. « Makache » : il n'y a pas, il n'y en a point."
    },
    {
      expression: "Bezzef",
      pays: "DZ", theme: "quotidien",
      sens: "Beaucoup, trop",
      leurres: ["Un peu", "Pas du tout", "Parfois"],
      exemple: "Il y a bezzef de monde au marché.",
      fiche: "Darija. « Bezzef » : beaucoup, trop."
    },
    {
      expression: "Walou",
      pays: "DZ", theme: "quotidien",
      sens: "Rien du tout",
      leurres: ["Tout", "Beaucoup", "Peut-être"],
      exemple: "J'ai cherché, mais walou.",
      fiche: "Darija. « Walou » : rien, que dalle."
    },
    {
      expression: "Aya",
      pays: "DZ", theme: "quotidien",
      sens: "Allez, allons-y",
      leurres: ["Attends", "Doucement", "Reste ici"],
      exemple: "Aya, on y va !",
      fiche: "Darija algérienne. « Aya » : allez, allons, dépêche."
    },
    {
      expression: "Mlih",
      pays: "DZ", theme: "emotions",
      sens: "Bien, bon",
      leurres: ["Mauvais", "Cassé", "Triste"],
      exemple: "C'est mlih, continue comme ça.",
      fiche: "Darija. « Mlih » : bien, bon, de qualité."
    },
    {
      expression: "Zawali",
      pays: "DZ", theme: "gens",
      sens: "Un pauvre, quelqu'un qui galère",
      leurres: ["Un riche", "Un chef", "Un chanceux"],
      exemple: "Le zawali trime du matin au soir.",
      fiche: "Darija algérienne. Un « zawali » : un pauvre, un démuni."
    },
    {
      expression: "Un flen",
      pays: "DZ", theme: "gens",
      sens: "Untel, un type quelconque",
      leurres: ["Un ami proche", "Un chef connu", "Un parent"],
      exemple: "Flen a dit, flen a fait… les rumeurs !",
      fiche: "Darija. « Flen » : untel, monsieur Untel (une personne indéterminée)."
    },
    {
      expression: "Un sahbi",
      pays: "DZ", theme: "amour",
      sens: "Un ami, un pote",
      leurres: ["Un ennemi", "Un patron", "Un inconnu"],
      exemple: "Je sors avec les sahbi ce soir.",
      fiche: "Darija. « Sahbi » : mon ami, mon pote."
    },
    {
      expression: "Le trabendo",
      pays: "DZ", theme: "argent",
      sens: "Le marché noir, la contrebande",
      leurres: ["Le marché aux fleurs", "La bourse", "Une coopérative"],
      exemple: "Il vend des portables au trabendo.",
      fiche: "Darija algérienne. Le « trabendo » : le commerce informel, le marché noir (le « trabendiste » le pratique)."
    },
    {
      expression: "Le raï",
      pays: "DZ", theme: "fete",
      sens: "La musique populaire née à Oran",
      leurres: ["Une danse de mariage berbère", "Un plat de fête", "Un chant religieux"],
      exemple: "Le raï d'Oran a conquis le monde.",
      fiche: "Le « raï » : une musique populaire née à Oran, portée par les cheb et chabas."
    },
    {
      expression: "Le chaâbi",
      pays: "DZ", theme: "fete",
      sens: "La musique populaire d'Alger",
      leurres: ["Une danse du désert", "Un style de poésie écrite", "Un instrument à cordes"],
      exemple: "Une soirée chaâbi dure jusqu'au matin.",
      fiche: "Le « chaâbi » algérois : une musique populaire chantée, née dans la Casbah."
    },
    {
      expression: "La casbah",
      pays: "DZ", theme: "quotidien",
      sens: "La vieille ville fortifiée (d'Alger)",
      leurres: ["Le quartier des affaires", "Le port de commerce", "La plage"],
      exemple: "On grimpe les ruelles de la Casbah d'Alger.",
      fiche: "La « casbah » : la vieille ville fortifiée ; celle d'Alger est classée à l'UNESCO."
    },
    {
      expression: "El-Bahdja",
      pays: "DZ", theme: "quotidien",
      sens: "Alger, « la Joyeuse »",
      leurres: ["Le Sahara", "La mer Méditerranée", "Un palais royal"],
      exemple: "Bienvenue à El-Bahdja, la blanche Alger.",
      fiche: "« El-Bahdja » (« la Joyeuse ») : le surnom affectueux d'Alger."
    },
    {
      expression: "Le burnous",
      pays: "DZ", theme: "quotidien",
      sens: "Une grande cape de laine à capuche",
      leurres: ["Un tapis tissé", "Une paire de babouches", "Un plateau à thé"],
      exemple: "Le vieux s'enveloppe dans son burnous.",
      fiche: "Le « burnous » : une grande cape de laine à capuche, portée par les hommes."
    },
    {
      expression: "Le couscous",
      pays: "DZ", theme: "manger",
      sens: "La semoule vapeur aux légumes et viande",
      leurres: ["Un riz au lait", "Une soupe claire", "Un pain plat"],
      exemple: "Le couscous du vendredi réunit la famille.",
      fiche: "Le « couscous » : la semoule roulée, cuite à la vapeur, servie avec légumes et viande — plat emblématique du Maghreb."
    },
    {
      expression: "La chorba",
      pays: "DZ", theme: "manger",
      sens: "Une soupe épaisse, surtout au ramadan",
      leurres: ["Une salade fraîche", "Un gâteau au miel", "Une grillade"],
      exemple: "On rompt le jeûne avec une chorba bien chaude.",
      fiche: "La « chorba » : une soupe nourrissante (légumes, viande, vermicelle), reine des tables de ramadan."
    },
    {
      expression: "La chakchouka",
      pays: "DZ", theme: "manger",
      sens: "Une poêlée de tomates, poivrons et œufs",
      leurres: ["Une pâtisserie feuilletée", "Un ragoût de poisson", "Une purée sucrée"],
      exemple: "Une chakchouka avec du bon pain.",
      fiche: "La « chakchouka » : une poêlée de poivrons et tomates mijotés, souvent avec des œufs."
    },
    {
      expression: "Le bourek",
      pays: "DZ", theme: "manger",
      sens: "Un rouleau frit farci",
      leurres: ["Un bonbon", "Une boisson chaude", "Une salade verte"],
      exemple: "Des bourek à la viande hachée pour le ftour.",
      fiche: "Le « bourek » : une fine feuille roulée et frite, farcie à la viande, à l'œuf ou au fromage."
    },
    {
      expression: "La dolma",
      pays: "DZ", theme: "manger",
      sens: "Des légumes farcis à la viande",
      leurres: ["Une soupe froide", "Un pain sucré", "Un jus de fruit"],
      exemple: "Dolma de courgettes et de pommes de terre.",
      fiche: "La « dolma » : des légumes (ou feuilles) farcis de viande et de riz, mijotés en sauce."
    },
    {
      expression: "Le makroud",
      pays: "DZ", theme: "manger",
      sens: "Un gâteau de semoule aux dattes",
      leurres: ["Un biscuit salé", "Une crêpe fine", "Un bonbon acidulé"],
      exemple: "Des makroud bien collants au miel.",
      fiche: "Le « makroud » : un gâteau de semoule fourré de pâte de dattes, frit et trempé dans le miel."
    },
    {
      expression: "La kesra",
      pays: "DZ", theme: "manger",
      sens: "Une galette de semoule",
      leurres: ["Une boisson lactée", "Un gâteau sucré", "Une sauce piquante"],
      exemple: "On déchire la kesra pour saucer le plat.",
      fiche: "La « kesra » : une galette de semoule, le pain du quotidien dans beaucoup de foyers."
    },
    {
      expression: "La garantita",
      pays: "DZ", theme: "manger",
      sens: "Un flan de pois chiches (spécialité d'Oran)",
      leurres: ["Une tarte aux pommes", "Un beignet sucré", "Une soupe de lentilles"],
      exemple: "Une part de garantita au cumin et à l'harissa.",
      fiche: "La « garantita » (calentica) : un flan de farine de pois chiches cuit au four, emblème d'Oran."
    },
    {
      expression: "Le mhadjeb",
      pays: "DZ", theme: "manger",
      sens: "Une crêpe feuilletée farcie",
      leurres: ["Un gâteau au chocolat", "Une glace", "Une salade composée"],
      exemple: "Des mhadjeb farcis à la tomate et à l'oignon.",
      fiche: "Le « mhadjeb » : une crêpe feuilletée de semoule, fourrée d'une sauce tomate-poivron."
    },
    {
      expression: "Dziri",
      pays: "DZ", theme: "gens",
      sens: "Un Algérois, un Algérien",
      leurres: ["Un Marocain", "Un Tunisien", "Un étranger de passage"],
      exemple: "Fier d'être dziri, de la capitale.",
      fiche: "Darija. « Dziri » : un Algérois, un Algérien (de « Dzaïr », le nom d'Alger et de l'Algérie)."
    },

    // ---------- Tunisie (darija, cuisine, culture) ----------
    {
      expression: "Aslema",
      pays: "TN", theme: "salutations",
      sens: "Bonjour, salut",
      leurres: ["Au revoir", "Merci", "Bon appétit"],
      exemple: "Aslema ! Comment vas-tu ?",
      fiche: "Darija tunisienne. « Aslema » (« 3aslema ») : bonjour, salut."
    },
    {
      expression: "Labès",
      pays: "TN", theme: "salutations",
      sens: "Ça va, pas de mal",
      leurres: ["Au revoir", "Félicitations", "Bon voyage"],
      exemple: "Labès ? — Labès, hamdoullah.",
      fiche: "« Labès » : ça va, pas de mal."
    },
    {
      expression: "Hamdoullah",
      pays: "TN", theme: "salutations",
      sens: "Dieu merci, ça va bien",
      leurres: ["Hélas", "Peut-être", "À bientôt"],
      exemple: "Ça va ? — Hamdoullah.",
      fiche: "« Hamdoullah » : Dieu merci — pour dire que tout va bien."
    },
    {
      expression: "Inchallah",
      pays: "TN", theme: "quotidien",
      sens: "Si Dieu le veut",
      leurres: ["Jamais", "Tout de suite", "Comme toujours"],
      exemple: "On part demain, inchallah.",
      fiche: "« Inchallah » : si Dieu le veut."
    },
    {
      expression: "Famma",
      pays: "TN", theme: "quotidien",
      sens: "Il y a (il existe)",
      leurres: ["Il n'y a rien", "C'est fini", "C'est loin"],
      exemple: "Famma un bon café au coin.",
      fiche: "Darija tunisienne. « Famma » : il y a, il existe."
    },
    {
      expression: "Famache",
      pays: "TN", theme: "quotidien",
      sens: "Il n'y a pas",
      leurres: ["Il y en a beaucoup", "C'est gratuit", "C'est prêt"],
      exemple: "Famache de place dans le louage.",
      fiche: "Darija tunisienne. « Famache » : il n'y a pas, il n'y en a plus."
    },
    {
      expression: "Chwaya",
      pays: "TN", theme: "quotidien",
      sens: "Un peu, un petit peu",
      leurres: ["Beaucoup", "Jamais", "Très vite"],
      exemple: "Attends chwaya.",
      fiche: "Darija tunisienne. « Chwaya » : un peu, un petit peu."
    },
    {
      expression: "Taw",
      pays: "TN", theme: "quotidien",
      sens: "Maintenant, là",
      leurres: ["Hier", "Plus tard", "Jamais"],
      exemple: "Taw j'arrive, deux minutes.",
      fiche: "Darija tunisienne. « Taw » (tawa) : maintenant, à l'instant."
    },
    {
      expression: "Yalla",
      pays: "TN", theme: "quotidien",
      sens: "Allez, allons-y",
      leurres: ["Attends", "Doucement", "Reste"],
      exemple: "Yalla, on est en retard !",
      fiche: "« Yalla » : allez, allons-y, dépêche."
    },
    {
      expression: "Le machmoum",
      pays: "TN", theme: "quotidien",
      sens: "Un petit bouquet de jasmin",
      leurres: ["Un plateau de thé", "Un chapeau de paille", "Un éventail"],
      exemple: "Il porte un machmoum de jasmin à l'oreille.",
      fiche: "Le « machmoum » : un petit bouquet de fleurs (surtout de jasmin), qu'on offre ou qu'on porte à l'oreille."
    },
    {
      expression: "La fouta",
      pays: "TN", theme: "quotidien",
      sens: "Une étoffe rayée de hammam",
      leurres: ["Un tapis de prière", "Un plat en cuivre", "Un collier"],
      exemple: "Au hammam, on s'enroule dans la fouta.",
      fiche: "La « fouta » : une étoffe de coton rayée, utilisée au hammam et aujourd'hui en paréo ou serviette de plage."
    },
    {
      expression: "Sidi Bou Saïd",
      pays: "TN", theme: "quotidien",
      sens: "Le village bleu et blanc au-dessus de la mer",
      leurres: ["Un grand marché couvert", "Un désert de dunes", "Un port de pêche du Sud"],
      exemple: "On prend un thé aux pignons à Sidi Bou Saïd.",
      fiche: "« Sidi Bou Saïd » : le célèbre village aux maisons blanches et bleues, perché au-dessus de la Méditerranée."
    },
    {
      expression: "La chéchia",
      pays: "TN", theme: "quotidien",
      sens: "Une calotte de feutre rouge",
      leurres: ["Une paire de babouches", "Une ceinture brodée", "Un éventail de paille"],
      exemple: "Le vieux porte fièrement sa chéchia rouge.",
      fiche: "La « chéchia » : la calotte de feutre rouge, un emblème de l'artisanat tunisien."
    },
    {
      expression: "Ya hasra",
      pays: "TN", theme: "emotions",
      sens: "Hélas, quel dommage (nostalgie)",
      leurres: ["Quelle joie", "Quelle chance", "Quelle surprise"],
      exemple: "Ya hasra, le bon vieux temps…",
      fiche: "Darija tunisienne. « Ya hasra » : hélas, quel dommage — souvent teinté de nostalgie."
    },
    {
      expression: "Sahbi",
      pays: "TN", theme: "amour",
      sens: "Un ami, un pote",
      leurres: ["Un ennemi", "Un patron", "Un inconnu"],
      exemple: "Je vais au café avec sahbi.",
      fiche: "Darija. « Sahbi » : mon ami, mon pote."
    },
    {
      expression: "Le malouf",
      pays: "TN", theme: "fete",
      sens: "La musique classique andalouse de Tunisie",
      leurres: ["Une danse de mariage", "Un chant de pêcheurs", "Une musique de rue moderne"],
      exemple: "Un concert de malouf à la médina.",
      fiche: "Le « malouf » : la musique classique d'héritage arabo-andalou, raffinée, de Tunisie."
    },
    {
      expression: "Le mezoued",
      pays: "TN", theme: "fete",
      sens: "Une musique populaire à la cornemuse",
      leurres: ["Un chant religieux", "Une berceuse", "Un hymne national"],
      exemple: "Au mariage, le mezoued met le feu.",
      fiche: "Le « mezoued » : une musique populaire festive, jouée à la cornemuse du même nom."
    },
    {
      expression: "Le lablabi",
      pays: "TN", theme: "manger",
      sens: "Une soupe de pois chiches sur pain",
      leurres: ["Une salade de fruits", "Un gâteau au miel", "Une grillade"],
      exemple: "Un lablabi bien relevé le matin d'hiver.",
      fiche: "Le « lablabi » : une soupe de pois chiches versée sur du pain rassis, avec harissa, cumin, œuf et câpres."
    },
    {
      expression: "La ojja",
      pays: "TN", theme: "manger",
      sens: "Une poêlée épicée de tomates et d'œufs",
      leurres: ["Une tarte sucrée", "Une soupe froide", "Un riz au lait"],
      exemple: "Une ojja aux merguez, bien piquante.",
      fiche: "L'« ojja » : une poêlée de tomates et poivrons à la harissa, où l'on casse des œufs."
    },
    {
      expression: "Le kafteji",
      pays: "TN", theme: "manger",
      sens: "Des légumes frits hachés aux œufs",
      leurres: ["Une pâtisserie feuilletée", "Un couscous sucré", "Une soupe de poisson"],
      exemple: "Un kafteji bien haché avec du pain.",
      fiche: "Le « kafteji » : un mélange de légumes frits puis hachés (poivrons, courge, pomme de terre) avec des œufs."
    },
    {
      expression: "Le fricassé",
      pays: "TN", theme: "manger",
      sens: "Un petit pain frit garni",
      leurres: ["Une salade composée", "Un plat de pâtes", "Une brochette grillée"],
      exemple: "Un fricassé thon-harissa-olives, un délice.",
      fiche: "Le « fricassé » tunisien : un petit pain frit garni de thon, d'œuf, d'olives et de harissa."
    },
    {
      expression: "La mloukhiya",
      pays: "TN", theme: "manger",
      sens: "Un ragoût vert sombre mijoté longtemps",
      leurres: ["Une salade verte crue", "Un jus d'herbes", "Une pâte à tartiner"],
      exemple: "La mloukhiya a mijoté toute la journée.",
      fiche: "La « mloukhiya » : un ragoût fait de poudre de corète, d'un vert très sombre, mijoté des heures avec de la viande."
    },
    {
      expression: "La harissa",
      pays: "TN", theme: "manger",
      sens: "Une purée de piment relevée",
      leurres: ["Une sauce sucrée", "Une crème dessert", "Une soupe douce"],
      exemple: "Une pointe de harissa dans le couscous.",
      fiche: "La « harissa » : une purée de piments rouges à l'ail et aux épices, incontournable de la table tunisienne."
    },
    {
      expression: "Le tajine tunisien",
      pays: "TN", theme: "manger",
      sens: "Une omelette épaisse cuite au four",
      leurres: ["Un ragoût en plat de terre", "Une tourte sucrée", "Une soupe de légumes"],
      exemple: "Le tajine tunisien se coupe en parts comme un gâteau.",
      fiche: "Le « tajine tunisien » : une sorte d'omelette épaisse au four (rien à voir avec le tajine marocain mijoté)."
    },
    {
      expression: "Les makroudh",
      pays: "TN", theme: "manger",
      sens: "Un gâteau de semoule aux dattes",
      leurres: ["Un biscuit salé", "Une crêpe fine", "Un bonbon acidulé"],
      exemple: "Les makroudh de Kairouan, les plus réputés.",
      fiche: "Les « makroudh » : des losanges de semoule fourrés de dattes, spécialité de Kairouan."
    },
    {
      expression: "La bambalouni",
      pays: "TN", theme: "manger",
      sens: "Un beignet rond sucré",
      leurres: ["Une galette salée", "Une soupe chaude", "Un sandwich"],
      exemple: "Une bambalouni chaude saupoudrée de sucre.",
      fiche: "La « bambalouni » : un beignet rond et moelleux, saupoudré de sucre, vendu dans la rue."
    },
    {
      expression: "Le mesfouf",
      pays: "TN", theme: "manger",
      sens: "Un couscous sucré",
      leurres: ["Un couscous au poisson", "Une soupe épaisse", "Un pain grillé"],
      exemple: "Un mesfouf aux raisins secs et aux dattes.",
      fiche: "Le « mesfouf » : un couscous fin et sucré, aux raisins secs, fruits secs et parfois lait caillé."
    },
    {
      expression: "La slata méchouia",
      pays: "TN", theme: "manger",
      sens: "Une salade de légumes grillés",
      leurres: ["Une salade de fruits", "Une purée sucrée", "Un bouillon clair"],
      exemple: "Une slata méchouia avec du thon et des œufs.",
      fiche: "La « slata méchouia » : une salade de poivrons et tomates grillés puis hachés, à l'huile d'olive."
    },
    {
      expression: "Le tabouna",
      pays: "TN", theme: "manger",
      sens: "Un pain rond cuit au four en terre",
      leurres: ["Un gâteau feuilleté", "Une crêpe sucrée", "Une boisson chaude"],
      exemple: "Le tabouna tout chaud à la sortie du four.",
      fiche: "Le « tabouna » : un pain rond cuit contre la paroi d'un four en terre du même nom."
    },
    {
      expression: "La zlabia",
      pays: "TN", theme: "manger",
      sens: "Une pâtisserie frite en spirale au sirop",
      leurres: ["Une galette salée", "Un flan nature", "Une soupe sucrée"],
      exemple: "Des zlabia dorées pendant le ramadan.",
      fiche: "La « zlabia » : une pâtisserie frite en entrelacs, trempée dans un sirop sucré, très prisée au ramadan."
    },

    // ---------- France (régionalismes et argot) ----------
    {
      expression: "Être à la bourre",
      pays: "FR", theme: "quotidien",
      sens: "Être en retard",
      leurres: ["Être en avance", "Être fatigué", "Être très occupé"],
      exemple: "Désolé, je suis à la bourre ce matin.",
      fiche: "Familier. « Être à la bourre » : être en retard, pressé par le temps."
    },
    {
      expression: "Ça caille",
      pays: "FR", theme: "quotidien",
      sens: "Il fait très froid",
      leurres: ["Il fait très chaud", "Il pleut", "Il y a du vent"],
      exemple: "Mets ton manteau, ça caille dehors !",
      fiche: "Familier. « Ça caille » : il fait un froid de canard."
    },
    {
      expression: "Dracher",
      pays: "FR", theme: "quotidien",
      sens: "Pleuvoir très fort",
      leurres: ["Faire très chaud", "Neiger", "Faire du brouillard"],
      exemple: "Prends un parapluie, ça drache dans le Nord.",
      fiche: "Nord de la France (et Belgique). « Dracher » : pleuvoir à verse."
    },
    {
      expression: "Le cagnard",
      pays: "FR", theme: "quotidien",
      sens: "Le soleil de plomb",
      leurres: ["L'ombre fraîche", "Un vent froid", "Une averse"],
      exemple: "À midi, on fuit le cagnard.",
      fiche: "Sud de la France. « Le cagnard » : le soleil écrasant, la grosse chaleur."
    },
    {
      expression: "Le mistral",
      pays: "FR", theme: "quotidien",
      sens: "Le vent violent de la vallée du Rhône",
      leurres: ["Une pluie fine", "Une vague de chaleur", "Un orage d'été"],
      exemple: "Le mistral a soufflé trois jours.",
      fiche: "Provence. « Le mistral » : un vent froid et puissant qui descend la vallée du Rhône."
    },
    {
      expression: "Un gadin",
      pays: "FR", theme: "quotidien",
      sens: "Une chute",
      leurres: ["Un petit cadeau", "Un gros caillou", "Un raccourci"],
      exemple: "Il a pris un gadin sur le verglas.",
      fiche: "Familier. « Prendre un gadin » : tomber, se casser la figure."
    },
    {
      expression: "Askip",
      pays: "FR", theme: "quotidien",
      sens: "À ce qu'il paraît, paraît-il",
      leurres: ["Au revoir", "Tout de suite", "Sûrement pas"],
      exemple: "Askip il déménage à Lyon.",
      fiche: "Argot des jeunes. « Askip » : contraction de « à ce qu'il paraît »."
    },
    {
      expression: "Un minot",
      pays: "FR", theme: "gens",
      sens: "Un enfant (Marseille)",
      leurres: ["Un vieillard", "Un chef", "Un touriste"],
      exemple: "Les minots jouent au foot sur la place.",
      fiche: "Marseille. Un « minot » : un enfant, un gamin."
    },
    {
      expression: "Un drôle",
      pays: "FR", theme: "gens",
      sens: "Un enfant (Sud-Ouest)",
      leurres: ["Un comédien", "Un étranger", "Un vieux monsieur"],
      exemple: "Les drôles rentrent de l'école.",
      fiche: "Sud-Ouest. Un « drôle » (une « drôlesse ») : un enfant, un jeune."
    },
    {
      expression: "Un ch'ti",
      pays: "FR", theme: "gens",
      sens: "Un habitant du Nord",
      leurres: ["Un petit chat", "Un Breton", "Un Parisien"],
      exemple: "Les ch'tis sont connus pour leur accueil.",
      fiche: "Nord. Un « ch'ti » (ch'timi) : un habitant du Nord, et le parler de la région."
    },
    {
      expression: "Adishatz",
      pays: "FR", theme: "salutations",
      sens: "Bonjour, salut (Gascogne)",
      leurres: ["Merci beaucoup", "Bon appétit", "Félicitations"],
      exemple: "Adishatz ! Ça va, l'ami ?",
      fiche: "Gascon/occitan. « Adishatz » : bonjour comme au revoir, dans le Sud-Ouest."
    },
    {
      expression: "Kiffer",
      pays: "FR", theme: "emotions",
      sens: "Adorer, aimer beaucoup",
      leurres: ["Détester", "Oublier", "Craindre"],
      exemple: "Je kiffe trop ce morceau.",
      fiche: "Argot (de l'arabe « kif »). « Kiffer » : adorer, prendre du plaisir."
    },
    {
      expression: "Vénère",
      pays: "FR", theme: "emotions",
      sens: "Énervé, en colère",
      leurres: ["Calme", "Joyeux", "Fatigué"],
      exemple: "Il est vénère, ne le cherche pas.",
      fiche: "Verlan de « énervé ». « Vénère » : remonté, en colère."
    },
    {
      expression: "Relou",
      pays: "FR", theme: "emotions",
      sens: "Pénible, lourd",
      leurres: ["Agréable", "Drôle", "Discret"],
      exemple: "Arrête, t'es relou là.",
      fiche: "Verlan de « lourd ». « Relou » : pénible, casse-pieds."
    },
    {
      expression: "De ouf",
      pays: "FR", theme: "emotions",
      sens: "Fou, incroyable",
      leurres: ["Nul", "Minuscule", "Tranquille"],
      exemple: "Le concert était de ouf !",
      fiche: "Verlan de « fou ». « De ouf » : incroyable, dingue."
    },
    {
      expression: "Nickel",
      pays: "FR", theme: "emotions",
      sens: "Parfait, impeccable",
      leurres: ["Raté", "Bancal", "Sale"],
      exemple: "Rendez-vous à 8h ? Nickel.",
      fiche: "Familier. « Nickel » : parfait, impeccable."
    },
    {
      expression: "La ducasse",
      pays: "FR", theme: "fete",
      sens: "La fête foraine, la kermesse (Nord)",
      leurres: ["Un marché aux poissons", "Un repas de famille", "Une messe"],
      exemple: "On va à la ducasse ce week-end.",
      fiche: "Nord. La « ducasse » : la fête foraine ou la kermesse du village."
    },
    {
      expression: "Une pastaga",
      pays: "FR", theme: "manger",
      sens: "Un pastis (anisé du Sud)",
      leurres: ["Un café serré", "Une limonade", "Un vin chaud"],
      exemple: "Une petite pastaga à l'ombre des platanes.",
      fiche: "Sud. Une « pastaga » : un pastis, l'apéro anisé."
    },
    {
      expression: "Le kouign-amann",
      pays: "FR", theme: "manger",
      sens: "Un gâteau breton au beurre",
      leurres: ["Une crêpe au sucre", "Un far aux pruneaux", "Un cidre doux"],
      exemple: "Un kouign-amann bien caramélisé.",
      fiche: "Bretagne. Le « kouign-amann » : un gâteau feuilleté au beurre et au sucre, caramélisé."
    },

    // ---------- Québec (joual, cuisine) ----------
    {
      expression: "C'est le fun",
      pays: "QC", theme: "emotions",
      sens: "C'est amusant, c'est chouette",
      leurres: ["C'est ennuyeux", "C'est difficile", "C'est cher"],
      exemple: "La soirée était vraiment le fun.",
      fiche: "Québec. « C'est le fun » : c'est amusant, agréable (de l'anglais « fun »)."
    },
    {
      expression: "Voyons donc",
      pays: "QC", theme: "emotions",
      sens: "Allons donc ! (surprise, incrédulité)",
      leurres: ["Au revoir", "Bien sûr", "Tant pis"],
      exemple: "Voyons donc, c'est pas possible !",
      fiche: "Québec. « Voyons donc ! » : exclamation de surprise ou d'incrédulité."
    },
    {
      expression: "Capoter",
      pays: "QC", theme: "emotions",
      sens: "Paniquer, ou s'emballer d'enthousiasme",
      leurres: ["S'endormir", "Se taire", "Ralentir"],
      exemple: "Je capote, j'ai gagné !",
      fiche: "Québec. « Capoter » : perdre la tête — de panique comme d'enthousiasme."
    },
    {
      expression: "Achaler",
      pays: "QC", theme: "quotidien",
      sens: "Déranger, embêter quelqu'un",
      leurres: ["Aider", "Féliciter", "Ignorer"],
      exemple: "Arrête de m'achaler avec ça.",
      fiche: "Québec. « Achaler » : embêter, importuner."
    },
    {
      expression: "Jaser",
      pays: "QC", theme: "quotidien",
      sens: "Bavarder, discuter",
      leurres: ["Se disputer", "Travailler", "Dormir"],
      exemple: "On a jasé toute la soirée.",
      fiche: "Québec. « Jaser » : bavarder, papoter (sans sens négatif)."
    },
    {
      expression: "Pogner",
      pays: "QC", theme: "quotidien",
      sens: "Attraper, saisir, choper",
      leurres: ["Lâcher", "Donner", "Perdre"],
      exemple: "J'ai pogné le dernier autobus.",
      fiche: "Québec. « Pogner » : attraper, saisir, choper — un verbe à tout faire."
    },
    {
      expression: "Icitte",
      pays: "QC", theme: "quotidien",
      sens: "Ici",
      leurres: ["Là-bas", "Demain", "Dehors"],
      exemple: "Viens t'asseoir icitte.",
      fiche: "Québec. « Icitte » : ici (une prononciation ancienne restée populaire)."
    },
    {
      expression: "Astheure",
      pays: "QC", theme: "quotidien",
      sens: "Maintenant, à cette heure",
      leurres: ["Hier", "Jamais", "Bientôt"],
      exemple: "Astheure, on fait quoi ?",
      fiche: "Québec. « Astheure » (« à cette heure ») : maintenant."
    },
    {
      expression: "Chus",
      pays: "QC", theme: "quotidien",
      sens: "« Je suis » (prononcé « chu »)",
      leurres: ["« Je sais »", "« Je vais »", "« J'ai »"],
      exemple: "Chus tanné d'attendre.",
      fiche: "Québec. « Chus » : la prononciation courante de « je suis »."
    },
    {
      expression: "Barrer",
      pays: "QC", theme: "quotidien",
      sens: "Verrouiller (une porte)",
      leurres: ["Ouvrir en grand", "Peindre", "Nettoyer"],
      exemple: "N'oublie pas de barrer la porte.",
      fiche: "Québec. « Barrer » : fermer à clé, verrouiller."
    },
    {
      expression: "Avoir de la misère",
      pays: "QC", theme: "quotidien",
      sens: "Avoir du mal, peiner",
      leurres: ["Être pauvre", "S'amuser", "Se reposer"],
      exemple: "J'ai de la misère à démarrer l'auto l'hiver.",
      fiche: "Québec. « Avoir de la misère » : avoir du mal, peiner à faire quelque chose."
    },
    {
      expression: "Une piasse",
      pays: "QC", theme: "argent",
      sens: "Un dollar",
      leurres: ["Un centime", "Un billet de loterie", "Une pièce ancienne"],
      exemple: "Ça coûte dix piasses.",
      fiche: "Québec. « Une piasse » (piastre) : un dollar."
    },
    {
      expression: "Un bec",
      pays: "QC", theme: "amour",
      sens: "Un bisou, une bise",
      leurres: ["Un câlin", "Une dispute", "Un cadeau"],
      exemple: "Donne un bec à grand-maman.",
      fiche: "Québec. « Un bec » : un bisou (« donner un bec »)."
    },
    {
      expression: "Un breuvage",
      pays: "QC", theme: "manger",
      sens: "Une boisson",
      leurres: ["Un dessert", "Un médicament", "Un plat chaud"],
      exemple: "Qu'est-ce que tu prends comme breuvage ?",
      fiche: "Québec. « Un breuvage » : une boisson (un sens resté courant au Québec)."
    },
    {
      expression: "Le sirop d'érable",
      pays: "QC", theme: "manger",
      sens: "Le sirop tiré de la sève d'érable",
      leurres: ["Un sirop contre la toux", "Du miel de fleurs", "De la mélasse"],
      exemple: "Des crêpes noyées dans le sirop d'érable.",
      fiche: "Québec. « Le sirop d'érable » : la sève d'érable réduite, une fierté nationale."
    },
    {
      expression: "La tire d'érable",
      pays: "QC", theme: "manger",
      sens: "Du sirop d'érable figé sur la neige",
      leurres: ["Une glace à l'eau", "Un caramel mou en pot", "Une barbe à papa"],
      exemple: "À la cabane à sucre, on roule la tire sur la neige.",
      fiche: "Québec. « La tire d'érable » : du sirop chaud versé sur la neige, qu'on enroule sur un bâton."
    },
    {
      expression: "Une tourtière",
      pays: "QC", theme: "manger",
      sens: "Une tourte à la viande",
      leurres: ["Une tarte aux pommes", "Une salade", "Une soupe"],
      exemple: "La tourtière, incontournable au réveillon.",
      fiche: "Québec. « La tourtière » : une tourte à la viande hachée, plat des Fêtes."
    },
    {
      expression: "Un smoked meat",
      pays: "QC", theme: "manger",
      sens: "Un sandwich de bœuf fumé (Montréal)",
      leurres: ["Un poisson pané", "Un hot-dog", "Une pizza"],
      exemple: "Un smoked meat moutarde sur pain de seigle.",
      fiche: "Montréal. Le « smoked meat » : de la poitrine de bœuf fumée et épicée, en sandwich."
    },
    {
      expression: "Des bines",
      pays: "QC", theme: "manger",
      sens: "Des fèves au lard",
      leurres: ["Des frites", "Des pâtes", "Des légumes crus"],
      exemple: "Des bines et des œufs au déjeuner.",
      fiche: "Québec. « Des bines » (de l'anglais « beans ») : des fèves au lard, souvent sucrées au sirop d'érable."
    },

    // ---------- Belgique (belgicismes, Bruxelles, cuisine) ----------
    {
      expression: "Nonante",
      pays: "BE", theme: "quotidien",
      sens: "Quatre-vingt-dix",
      leurres: ["Quatre-vingts", "Soixante-dix", "Cent dix"],
      exemple: "Ça coûte nonante euros.",
      fiche: "Belgicisme (et Suisse). « Nonante » : 90, plus simple que « quatre-vingt-dix »."
    },
    {
      expression: "Une fois",
      pays: "BE", theme: "quotidien",
      sens: "Interjection sans valeur précise (« viens une fois »)",
      leurres: ["Une seule fois, pas plus", "Autrefois", "Une part de gâteau"],
      exemple: "Viens une fois voir ça !",
      fiche: "Belgicisme. « Une fois » ponctue la phrase, surtout à Bruxelles, sans vraiment compter."
    },
    {
      expression: "Un clignoteur",
      pays: "BE", theme: "quotidien",
      sens: "Le clignotant de la voiture",
      leurres: ["Un lampadaire", "Un feu rouge", "Un phare de vélo"],
      exemple: "Mets ton clignoteur avant de tourner.",
      fiche: "Belgicisme. Le « clignoteur » : le clignotant."
    },
    {
      expression: "Une ramassette",
      pays: "BE", theme: "quotidien",
      sens: "La pelle à poussière",
      leurres: ["Un balai", "Une éponge", "Un seau"],
      exemple: "Passe-moi la ramassette pour les miettes.",
      fiche: "Belgicisme. La « ramassette » : la pelle à poussière."
    },
    {
      expression: "Une carabistouille",
      pays: "BE", theme: "quotidien",
      sens: "Une sornette, une bêtise",
      leurres: ["Une friandise", "Une petite voiture", "Une dispute"],
      exemple: "Arrête tes carabistouilles !",
      fiche: "Belgicisme. Une « carabistouille » : une blague, une sornette, une bêtise."
    },
    {
      expression: "Blinquer",
      pays: "BE", theme: "quotidien",
      sens: "Briller, reluire",
      leurres: ["Clignoter", "Grincer", "Fondre"],
      exemple: "Le parquet blinque après le nettoyage.",
      fiche: "Belgicisme. « Blinquer » : briller, reluire (du néerlandais « blinken »)."
    },
    {
      expression: "La clinche",
      pays: "BE", theme: "quotidien",
      sens: "La poignée de porte",
      leurres: ["La serrure", "La sonnette", "Le paillasson"],
      exemple: "Tourne la clinche, ce n'est pas fermé.",
      fiche: "Belgicisme. La « clinche » : la poignée (ou le bec-de-cane) de porte."
    },
    {
      expression: "Une drève",
      pays: "BE", theme: "quotidien",
      sens: "Une allée bordée d'arbres",
      leurres: ["Une impasse", "Un pont", "Une place de marché"],
      exemple: "On se promène dans la drève du château.",
      fiche: "Belgicisme. Une « drève » : une allée bordée d'arbres."
    },
    {
      expression: "Spitant",
      pays: "BE", theme: "emotions",
      sens: "Vif, plein d'énergie, pétillant",
      leurres: ["Fatigué", "Timide", "Lent"],
      exemple: "Les enfants sont spitants ce matin.",
      fiche: "Belgicisme. « Spitant » : vif, pétillant, plein d'entrain."
    },
    {
      expression: "Non peut-être",
      pays: "BE", theme: "emotions",
      sens: "Mais oui, bien sûr ! (ironique)",
      leurres: ["Absolument pas", "Je ne sais pas", "Peut-être un jour"],
      exemple: "Tu viens ? Non peut-être ! (= évidemment)",
      fiche: "Bruxelles. « Non peut-être ! » veut dire… « mais oui, bien sûr ! » (ironie)."
    },
    {
      expression: "Bardaf !",
      pays: "BE", theme: "emotions",
      sens: "Badaboum ! (bruit de choc)",
      leurres: ["Bravo !", "Chut !", "Au secours !"],
      exemple: "Il a glissé et bardaf, par terre !",
      fiche: "Belgicisme. « Bardaf ! » : l'onomatopée du choc, de l'accident (« et patatras »)."
    },
    {
      expression: "Un dikkenek",
      pays: "BE", theme: "gens",
      sens: "Un vantard, une grande gueule",
      leurres: ["Un timide", "Un sage", "Un paresseux"],
      exemple: "Quel dikkenek, il se vante tout le temps.",
      fiche: "Bruxelles (du néerlandais « dikke nek », gros cou). Un « dikkenek » : un prétentieux, une grande gueule."
    },
    {
      expression: "Un zinneke",
      pays: "BE", theme: "gens",
      sens: "Un bâtard (chien), un vrai Bruxellois mélangé",
      leurres: ["Un chien de race", "Un chat de gouttière", "Un oiseau en cage"],
      exemple: "Son chien est un adorable zinneke.",
      fiche: "Bruxelles. Un « zinneke » : un chien bâtard — et, fièrement, un Bruxellois aux origines mêlées."
    },
    {
      expression: "Un peï",
      pays: "BE", theme: "gens",
      sens: "Un gars, un type (Bruxelles)",
      leurres: ["Un enfant", "Un vieillard", "Un chef"],
      exemple: "C'est un bon peï, tu peux lui faire confiance.",
      fiche: "Bruxelles. Un « peï » : un homme, un type (la femme, c'est une « meï »)."
    },
    {
      expression: "Un ket",
      pays: "BE", theme: "gens",
      sens: "Un gamin, un gars (Bruxelles)",
      leurres: ["Une fille", "Un grand-père", "Un policier"],
      exemple: "Les kets jouent au foot dans la rue.",
      fiche: "Bruxelles. Un « ket » : un gamin, un jeune gars."
    },
    {
      expression: "Un fritkot",
      pays: "BE", theme: "manger",
      sens: "Une baraque à frites",
      leurres: ["Une boulangerie", "Un bar à vin", "Une épicerie"],
      exemple: "On se retrouve au fritkot du coin.",
      fiche: "Belgicisme. Un « fritkot » (une « friterie ») : la baraque à frites, institution nationale."
    },
    {
      expression: "Les chicons",
      pays: "BE", theme: "manger",
      sens: "Les endives",
      leurres: ["Les épinards", "Les champignons", "Les haricots verts"],
      exemple: "Des chicons au gratin, avec du jambon.",
      fiche: "Belgicisme. Les « chicons » : les endives."
    },
    {
      expression: "Un américain",
      pays: "BE", theme: "manger",
      sens: "Du bœuf cru haché assaisonné",
      leurres: ["Un hamburger grillé", "Un steak bien cuit", "Un hot-dog"],
      exemple: "Un pain garni d'américain, préparé minute.",
      fiche: "Belgicisme. Un « américain » (filet américain) : du bœuf cru haché et assaisonné, comme un tartare."
    },
    {
      expression: "Un stoemp",
      pays: "BE", theme: "manger",
      sens: "Une purée aux légumes écrasés",
      leurres: ["Une soupe claire", "Une tarte salée", "Une salade verte"],
      exemple: "Stoemp aux carottes et saucisse.",
      fiche: "Belgicisme. Le « stoemp » : une purée de pommes de terre écrasées avec des légumes."
    },
    {
      expression: "Une mitraillette",
      pays: "BE", theme: "manger",
      sens: "Un sandwich baguette-viande-frites",
      leurres: ["Une petite pizza", "Une barquette de frites", "Un wrap"],
      exemple: "Une mitraillette fricadelle, s'il vous plaît.",
      fiche: "Belgicisme. Une « mitraillette » : une demi-baguette garnie de viande, de sauce et de frites."
    },
    {
      expression: "Un cuberdon",
      pays: "BE", theme: "manger",
      sens: "Un bonbon conique à cœur tendre",
      leurres: ["Un chocolat carré", "Une gaufre", "Une sucette dure"],
      exemple: "Un cuberdon framboise, le fameux « nez ».",
      fiche: "Belgicisme. Le « cuberdon » (ou « nez ») : un bonbon violet, dur dehors et tendre dedans."
    },

    // ---------- Suisse romande (helvétismes, cuisine, Alpes) ----------
    {
      expression: "Nonante",
      pays: "CH", theme: "quotidien",
      sens: "Quatre-vingt-dix",
      leurres: ["Quatre-vingts", "Soixante-dix", "Cent"],
      exemple: "Il a nonante ans.",
      fiche: "Helvétisme (et Belgique). « Nonante » : 90."
    },
    {
      expression: "Septante",
      pays: "CH", theme: "quotidien",
      sens: "Soixante-dix",
      leurres: ["Soixante", "Quatre-vingts", "Cent dix"],
      exemple: "Septante francs, s'il vous plaît.",
      fiche: "Helvétisme (et Belgique). « Septante » : 70."
    },
    {
      expression: "Service !",
      pays: "CH", theme: "salutations",
      sens: "De rien, je vous en prie",
      leurres: ["Au revoir !", "À table !", "Attention !"],
      exemple: "Merci beaucoup ! — Service !",
      fiche: "Helvétisme. « Service ! » : la réponse à « merci » (« de rien »)."
    },
    {
      expression: "Y a pas le feu au lac",
      pays: "CH", theme: "quotidien",
      sens: "Rien ne presse",
      leurres: ["C'est urgent", "C'est interdit", "C'est très loin"],
      exemple: "Prends ton temps, y a pas le feu au lac.",
      fiche: "Helvétisme. « Y a pas le feu au lac » : rien ne presse, on a tout notre temps."
    },
    {
      expression: "Un foehn",
      pays: "CH", theme: "quotidien",
      sens: "Un vent chaud des Alpes (et un sèche-cheveux)",
      leurres: ["Une averse de grêle", "Un brouillard épais", "Une vague de froid"],
      exemple: "Le foehn a fait fondre la neige ; passe-moi le foehn.",
      fiche: "Helvétisme. Le « foehn » : un vent chaud et sec des Alpes ; par extension, le sèche-cheveux."
    },
    {
      expression: "La bise",
      pays: "CH", theme: "quotidien",
      sens: "Un vent froid et sec du nord-est",
      leurres: ["Un petit bisou", "Une pluie tiède", "Un vent du sud"],
      exemple: "La bise souffle fort sur le Léman.",
      fiche: "Helvétisme. « La bise » : le vent froid et sec qui balaie le Plateau et le lac."
    },
    {
      expression: "Une action",
      pays: "CH", theme: "argent",
      sens: "Une promotion, un article en solde",
      leurres: ["Un film d'aventure", "Une part en bourse", "Une bonne action"],
      exemple: "Le café est en action cette semaine.",
      fiche: "Helvétisme. Une « action » : une promotion, un rabais en magasin (« en action »)."
    },
    {
      expression: "Un linge",
      pays: "CH", theme: "quotidien",
      sens: "Une serviette (de bain, de table)",
      leurres: ["Un rideau", "Un drap de lit", "Un tapis"],
      exemple: "Prends un linge pour te sécher.",
      fiche: "Helvétisme. Un « linge » : une serviette (de bain ou de table)."
    },
    {
      expression: "Un tablar",
      pays: "CH", theme: "quotidien",
      sens: "Une étagère, un rayon",
      leurres: ["Un tabouret", "Un tableau", "Une table basse"],
      exemple: "Range les bocaux sur le tablar.",
      fiche: "Helvétisme. Un « tablar » : une étagère, une planche de rangement."
    },
    {
      expression: "Poutzer",
      pays: "CH", theme: "quotidien",
      sens: "Nettoyer, faire le ménage",
      leurres: ["Cuisiner", "Jardiner", "Bricoler"],
      exemple: "On poutze l'appartement avant les invités.",
      fiche: "Helvétisme. « Poutzer » : nettoyer à fond (« faire la poutze »)."
    },
    {
      expression: "Réduire",
      pays: "CH", theme: "quotidien",
      sens: "Ranger, mettre de côté",
      leurres: ["Rapetisser", "Jeter", "Cacher"],
      exemple: "Réduis tes affaires avant de partir.",
      fiche: "Helvétisme. « Réduire » : ranger, remettre à sa place."
    },
    {
      expression: "Se réjouir",
      pays: "CH", theme: "emotions",
      sens: "Attendre avec impatience et plaisir",
      leurres: ["Regretter", "S'inquiéter", "S'ennuyer"],
      exemple: "Je me réjouis de te voir demain.",
      fiche: "Helvétisme. « Se réjouir de » : avoir hâte, attendre quelque chose avec plaisir."
    },
    {
      expression: "Une fourre",
      pays: "CH", theme: "quotidien",
      sens: "Une pochette, une chemise pour papiers",
      leurres: ["Un manteau fourré", "Un coussin", "Un sac à dos"],
      exemple: "Range la facture dans la fourre.",
      fiche: "Helvétisme. Une « fourre » : une chemise, une pochette (et aussi une housse)."
    },
    {
      expression: "Un bisse",
      pays: "CH", theme: "quotidien",
      sens: "Un canal d'irrigation de montagne (Valais)",
      leurres: ["Un sommet enneigé", "Un refuge d'alpage", "Un téléphérique"],
      exemple: "On randonne le long du bisse.",
      fiche: "Helvétisme (Valais). Un « bisse » : un canal d'irrigation à flanc de montagne."
    },
    {
      expression: "Le Cervin",
      pays: "CH", theme: "quotidien",
      sens: "La célèbre montagne pyramidale",
      leurres: ["Un grand lac", "Une vallée viticole", "Un glacier plat"],
      exemple: "Le Cervin domine Zermatt.",
      fiche: "Le « Cervin » (Matterhorn) : la montagne emblématique des Alpes suisses."
    },
    {
      expression: "Un chalet",
      pays: "CH", theme: "quotidien",
      sens: "Une maison de montagne en bois",
      leurres: ["Un immeuble en ville", "Une tente", "Une péniche"],
      exemple: "On loue un chalet pour l'hiver.",
      fiche: "Un « chalet » : à l'origine, la maison de bois des alpages ; aujourd'hui, la maison de montagne."
    },
    {
      expression: "La fondue",
      pays: "CH", theme: "manger",
      sens: "Du fromage fondu où l'on trempe du pain",
      leurres: ["Une soupe de légumes", "Une tarte au fromage", "Un gratin"],
      exemple: "On se fait une fondue ce soir.",
      fiche: "La « fondue » : du fromage fondu au vin blanc, dans lequel on trempe des morceaux de pain."
    },
    {
      expression: "La raclette",
      pays: "CH", theme: "manger",
      sens: "Du fromage fondu raclé sur des pommes de terre",
      leurres: ["Une purée gratinée", "Une pizza au fromage", "Une soupe chaude"],
      exemple: "Raclette-cornichons, le bonheur de l'hiver.",
      fiche: "La « raclette » : un demi-meule de fromage qu'on fait fondre et qu'on racle sur des pommes de terre."
    },
    {
      expression: "Le rösti",
      pays: "CH", theme: "manger",
      sens: "Une galette de pommes de terre rissolées",
      leurres: ["Une crêpe sucrée", "Un gratin de courge", "Une omelette"],
      exemple: "Un rösti doré avec un œuf dessus.",
      fiche: "Le « rösti » : une galette de pommes de terre rissolées à la poêle, spécialité alémanique."
    },
    {
      expression: "Le papet vaudois",
      pays: "CH", theme: "manger",
      sens: "Un plat de poireaux et pommes de terre à la saucisse",
      leurres: ["Une tarte aux pommes", "Un rôti de bœuf", "Une salade composée"],
      exemple: "Le papet vaudois avec sa saucisse aux choux.",
      fiche: "Le « papet vaudois » : un fondant de poireaux et pommes de terre, servi avec la saucisse aux choux."
    },
    {
      expression: "Le birchermüesli",
      pays: "CH", theme: "manger",
      sens: "Un muesli aux flocons et fruits",
      leurres: ["Un gâteau au chocolat", "Un bol de soupe", "Une tarte salée"],
      exemple: "Un birchermüesli au petit-déjeuner.",
      fiche: "Le « birchermüesli » : flocons d'avoine trempés, pomme râpée, yaourt et fruits — inventé par le docteur Bircher."
    },
    {
      expression: "La meringue double crème",
      pays: "CH", theme: "manger",
      sens: "Des meringues à la crème épaisse",
      leurres: ["Une glace à la vanille", "Un flan au caramel", "Une mousse au chocolat"],
      exemple: "Meringues et double crème de la Gruyère, un péché.",
      fiche: "Un dessert suisse : des meringues croquantes nappées de crème double de la Gruyère."
    },
    {
      expression: "Le Rivella",
      pays: "CH", theme: "manger",
      sens: "Un soda suisse à base de petit-lait",
      leurres: ["Une eau minérale des Alpes", "Un jus de pomme", "Un vin blanc"],
      exemple: "Un Rivella bien frais après le ski.",
      fiche: "Le « Rivella » : une boisson gazeuse suisse… faite à partir de petit-lait."
    },
    {
      expression: "Le cor des Alpes",
      pays: "CH", theme: "fete",
      sens: "Un très long cor en bois des alpages",
      leurres: ["Un tambour de fête", "Une cornemuse", "Une cloche de vache"],
      exemple: "Le cor des Alpes résonne dans la vallée.",
      fiche: "Le « cor des Alpes » : un instrument de bois de plusieurs mètres, dont le son porte d'un alpage à l'autre."
    },
    {
      expression: "La désalpe",
      pays: "CH", theme: "fete",
      sens: "La descente des troupeaux de l'alpage",
      leurres: ["Une course de ski", "Une foire aux vins", "Un marché de Noël"],
      exemple: "À la désalpe, les vaches défilent fleuries.",
      fiche: "La « désalpe » : la fête d'automne, quand on ramène les vaches de l'alpage, parées de fleurs et de cloches."
    },
    {
      expression: "Le yodel",
      pays: "CH", theme: "fete",
      sens: "Un chant alpin aux changements de voix",
      leurres: ["Une danse en cercle", "Un conte de montagne", "Un jeu de cartes"],
      exemple: "Un chœur de yodel à la fête du village.",
      fiche: "Le « yodel » (jodel) : un chant traditionnel alpin qui alterne voix de poitrine et voix de tête."
    }

  ];

  var base = (window.TCHIP_EXPRESSIONS = window.TCHIP_EXPRESSIONS || []);
  for (var i = 0; i < candidats.length; i++) {
    candidats[i].candidat = true; // repère : jamais dans le tchip du jour, relecture avant publication
    base.push(candidats[i]);
  }
})();
