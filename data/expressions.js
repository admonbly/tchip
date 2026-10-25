/*
 * Tchip — base d'expressions
 * L'ordre du tableau = l'ordre des jours (#1, #2, #3…) : on ajoute toujours à la fin.
 * Chaque entrée :
 *   expression, pays (code de TCHIP_PAYS), theme (clé de TCHIP_THEMES),
 *   sens (la bonne réponse), leurres (3 mauvaises réponses plausibles), exemple, fiche (contexte court).
 * Facultatif :
 *   ailleurs      autres sens, et où on les emploie : [{ sens, ou }]
 *   aussi         autres pays où l'expression s'emploie (jamais proposés comme mauvaise réponse au bonus)
 *   prononciation guide simple, en syllabes à la française
 *   audio         enregistrement d'une vraie voix : { fichier: "audio/ci/garba.m4a", voix: "Aya", ville: "Abidjan" }
 * Pour ajouter une expression : voir CONTRIBUER.md, puis npm run verifier.
 */
window.TCHIP_THEMES = {
  salutations: { nom: "Saluer et remercier", emoji: "👋" },
  manger: { nom: "Manger et boire", emoji: "🍲" },
  transport: { nom: "Se déplacer", emoji: "🚕" },
  argent: { nom: "Argent et commerce", emoji: "💰" },
  gens: { nom: "Les gens", emoji: "👥" },
  amour: { nom: "Amour et amitié", emoji: "❤️" },
  emotions: { nom: "Réagir", emoji: "😮" },
  quotidien: { nom: "Vie de tous les jours", emoji: "🏠" },
  fete: { nom: "Fête et musique", emoji: "🎉" },
  ecole: { nom: "École et travail", emoji: "📚" }
};

window.TCHIP_PAYS = {
  CI: { nom: "Côte d'Ivoire", drapeau: "🇨🇮", region: "Afrique de l'Ouest", accent: "ivoirien", intro: "Le français d'Abidjan déborde d'énergie : il puise dans le nouchi, l'argot né dans la rue, popularisé par le zouglou et le coupé-décalé." },
  CM: { nom: "Cameroun", drapeau: "🇨🇲", region: "Afrique centrale", accent: "camerounais", intro: "Au Cameroun, on jongle entre le français, l'anglais et des dizaines de langues locales. Le mélange a un nom : le camfranglais." },
  SN: { nom: "Sénégal", drapeau: "🇸🇳", region: "Afrique de l'Ouest", accent: "sénégalais", intro: "Au Sénégal, le wolof s'invite dans toutes les phrases, du marché Sandaga aux bureaux du Plateau." },
  CD: { nom: "RD Congo", drapeau: "🇨🇩", region: "Afrique centrale", accent: "kinois", intro: "À Kinshasa, le français se mélange au lingala, la langue de la rumba et de l'ambiance." },
  BE: { nom: "Belgique", drapeau: "🇧🇪", region: "Europe", accent: "belge", intro: "Septante, un kot et une drache : le français de Belgique a ses mots à lui, souvent venus du wallon ou du néerlandais." },
  CH: { nom: "Suisse", drapeau: "🇨🇭", region: "Europe", accent: "romand", intro: "En Suisse romande, on compte en septante et huitante, on panosse le sol et on sort son natel." },
  FR: { nom: "France", drapeau: "🇫🇷", region: "Europe", accent: "français", intro: "D'une région à l'autre, la France ne parle pas tout à fait pareil : Marseille, Lyon, Toulouse ou Lille ont leurs mots." },
  QC: { nom: "Québec", drapeau: "🇨🇦", region: "Amériques et Caraïbes", accent: "québécois", intro: "Le français d'Amérique a gardé de vieux mots, en a inventé d'autres pour éviter l'anglais, et les dit avec un accent bien à lui." },
  DZ: { nom: "Algérie", drapeau: "🇩🇿", region: "Afrique du Nord", accent: "algérien", intro: "En Algérie, le français se mêle à la darja, l'arabe algérien, et aux mots nés dans les rues d'Alger et d'Oran." },
  RE: { nom: "La Réunion", drapeau: "🇷🇪", region: "Océan Indien", accent: "réunionnais", intro: "À La Réunion, le créole colore le français de l'île, du marché forain jusqu'aux cases des hauts." },
  BF: { nom: "Burkina Faso", drapeau: "🇧🇫", region: "Afrique de l'Ouest", accent: "burkinabè", intro: "Au pays des hommes intègres, le français vit avec le mooré et le dioula, et avec un sens de l'humour bien à lui." },
  HT: { nom: "Haïti", drapeau: "🇭🇹", region: "Amériques et Caraïbes", accent: "haïtien", intro: "En Haïti, tout le monde parle créole, et le français se nourrit de ses images et de ses proverbes." },
  CG: { nom: "Congo-Brazzaville", drapeau: "🇨🇬", region: "Afrique centrale", accent: "congolais", intro: "À Brazzaville, juste en face de Kinshasa, on partage le lingala, la rumba et le goût de l'élégance." },
  BJ: { nom: "Bénin", drapeau: "🇧🇯", region: "Afrique de l'Ouest", accent: "béninois", intro: "Au Bénin, le français s'enrichit du fon et du yoruba, et la moto-taxi a un nom à elle : le zémidjan." },
  GP: { nom: "Antilles", drapeau: "🇬🇵", region: "Amériques et Caraïbes", accent: "antillais", intro: "En Guadeloupe et en Martinique, le créole rythme le français, au marché comme sur la piste de danse." },
  TG: { nom: "Togo", drapeau: "🇹🇬", region: "Afrique de l'Ouest", accent: "togolais", intro: "Au Togo, l'éwé et le mina se glissent dans le français de Lomé, entre le grand marché et la plage." },
  ML: { nom: "Mali", drapeau: "🇲🇱", region: "Afrique de l'Ouest", accent: "malien", intro: "Au Mali, le bambara est la langue de la rue, et le français lui emprunte volontiers des mots." },
  TD: { nom: "Tchad", drapeau: "🇹🇩", region: "Afrique centrale", accent: "tchadien", intro: "Au Tchad, on parle français et arabe tchadien, et le français local invente ses propres mots." },
  MA: { nom: "Maroc", drapeau: "🇲🇦", region: "Afrique du Nord", accent: "marocain", intro: "Au Maroc, la darija, l'arabe marocain, se glisse dans le français de tous les jours." },
  TN: { nom: "Tunisie", drapeau: "🇹🇳", region: "Afrique du Nord", accent: "tunisien", intro: "En Tunisie, on passe du français au derja, l'arabe tunisien, souvent au milieu de la même phrase." },
  MG: { nom: "Madagascar", drapeau: "🇲🇬", region: "Océan Indien", accent: "malgache", intro: "À Madagascar, le malgache est la langue de tous : quelques mots s'imposent dès qu'on pose le pied à Tana." }
};

window.TCHIP_EXPRESSIONS = [
  {
    expression: "Être enjaillé",
    pays: "CI",
    theme: "fete",
    sens: "Être tout excité, s'éclater",
    leurres: ["Être épuisé après le travail", "Être en retard", "Être coincé dans les embouteillages"],
    exemple: "Le DJ a lancé le son, tout le monde était enjaillé.",
    fiche: "Mot du français ivoirien, tiré de l'anglais « enjoy ». On dit aussi « s'enjailler » et « enjaillement »."
  },
  {
    expression: "Une drache",
    pays: "BE",
    theme: "quotidien",
    sens: "Une grosse averse",
    leurres: ["Une dispute de famille", "Une gaufre sucrée", "Une bière forte"],
    exemple: "Prends ton parapluie, il va tomber une drache.",
    fiche: "Belgicisme très courant, aussi entendu dans le nord de la France. On dit même « il drache ».",
    aussi: ["FR"]
  },
  {
    expression: "Mbenguiste",
    pays: "CM",
    theme: "gens",
    sens: "Une personne qui vit en Europe",
    leurres: ["Un joueur de foot professionnel", "Une vendeuse du marché", "Un musicien de bikutsi"],
    exemple: "Le mbenguiste est rentré pour les vacances avec des cadeaux pour tout le quartier.",
    fiche: "Camfranglais. « Mbeng » désigne l'Europe, la France en particulier, et le mbenguiste celui qui y est parti."
  },
  {
    expression: "Tarpin",
    pays: "FR",
    theme: "quotidien",
    sens: "Très, beaucoup",
    leurres: ["Pas du tout", "Peut-être", "Hier soir"],
    exemple: "Elle est tarpin bonne, la pizza de ce camion.",
    fiche: "Expression marseillaise. « C'est tarpin loin » : c'est vraiment très loin."
  },
  {
    expression: "Teranga",
    pays: "SN",
    theme: "salutations",
    sens: "L'hospitalité, l'accueil chaleureux",
    leurres: ["Le marché du dimanche", "La saison des pluies", "Un plat de fête"],
    exemple: "Reste manger avec nous, c'est la teranga !",
    fiche: "Mot wolof devenu une fierté nationale. L'équipe de foot du Sénégal s'appelle les Lions de la Teranga.",
    prononciation: "té-ran-ga"
  },
  {
    expression: "Ça joue ?",
    pays: "CH",
    theme: "salutations",
    sens: "Ça va ? C'est d'accord ?",
    leurres: ["On va jouer au foot ?", "Tu sais chanter ?", "Il pleut dehors ?"],
    exemple: "On se retrouve à 18 h devant la gare, ça joue ?",
    fiche: "Tournure romande. « Ça joue » veut dire « ça marche, c'est bon »."
  },
  {
    expression: "Deuxième bureau",
    pays: "CD",
    theme: "amour",
    sens: "Une maîtresse, une relation cachée",
    leurres: ["Un deuxième emploi", "Un bureau de vote", "Une salle de réunion"],
    exemple: "Il dit qu'il fait des heures sup, mais tout le monde sait qu'il est chez son deuxième bureau.",
    fiche: "Très courant à Kinshasa et dans toute l'Afrique francophone. Le « premier bureau », c'est la femme officielle.",
    aussi: ["CG", "CM", "CI", "SN", "BF", "ML", "BJ", "TG", "TD"]
  },
  {
    expression: "Être tanné",
    pays: "QC",
    theme: "emotions",
    sens: "En avoir marre",
    leurres: ["Être bronzé", "Être riche", "Être malade"],
    exemple: "Je suis tanné de l'hiver, j'ai hâte au printemps.",
    fiche: "Québécisme du quotidien. « Être tanné de quelque chose », c'est ne plus le supporter."
  },
  {
    expression: "Gaou",
    pays: "CI",
    theme: "gens",
    sens: "Une personne naïve, qui se fait avoir",
    leurres: ["Un grand frère respecté", "Un riche commerçant", "Un très bon danseur"],
    exemple: "Il a payé trois fois le prix, c'est un vrai gaou.",
    fiche: "Nouchi rendu célèbre dans toute l'Afrique par la chanson « Premier Gaou » de Magic System."
  },
  {
    expression: "Hittiste",
    pays: "DZ",
    theme: "gens",
    sens: "Un jeune sans emploi qui « tient les murs »",
    leurres: ["Un chanteur à succès", "Un chauffeur de taxi", "Un fan de football"],
    exemple: "Dans le quartier, les hittistes refont le monde toute la journée.",
    fiche: "De l'arabe dialectal « hit », le mur. Mot passé dans le français d'Algérie et repris dans les dictionnaires."
  },
  {
    expression: "Un kot",
    pays: "BE",
    theme: "ecole",
    sens: "Une chambre d'étudiant",
    leurres: ["Un petit café", "Un costume", "Une vieille voiture"],
    exemple: "Je rentre le week-end, la semaine je dors dans mon kot à Louvain.",
    fiche: "Belgicisme. On « kote » quand on loue une chambre près de son université."
  },
  {
    expression: "Long crayon",
    pays: "CM",
    theme: "ecole",
    sens: "Une personne très diplômée",
    leurres: ["Un menteur", "Une personne très grande", "Un écrivain de lettres d'amour"],
    exemple: "Demande au long crayon de la famille, il saura remplir le formulaire.",
    fiche: "Expression camerounaise : plus le crayon est long, plus on a fait de longues études."
  },
  {
    expression: "Ndank ndank",
    pays: "SN",
    theme: "quotidien",
    sens: "Doucement, petit à petit",
    leurres: ["Vite, dépêche-toi", "Tout droit", "Pas du tout"],
    exemple: "Ne t'inquiète pas pour le chantier, ndank ndank on va y arriver.",
    fiche: "Wolof. Le proverbe dit qu'on attrape le singe doucement, petit à petit.",
    prononciation: "n'dank n'dank"
  },
  {
    expression: "Avoir le seum",
    pays: "FR",
    theme: "emotions",
    sens: "Être dégoûté, frustré",
    leurres: ["Avoir sommeil", "Avoir de la chance", "Avoir très faim"],
    exemple: "On a perdu à la dernière minute, j'ai trop le seum.",
    fiche: "Argot français venu de l'arabe, où le mot évoque le poison. Très utilisé par les jeunes."
  },
  {
    expression: "Une panosse",
    pays: "CH",
    theme: "quotidien",
    sens: "Une serpillière",
    leurres: ["Une grosse tartine", "Une paresseuse", "Une poêle"],
    exemple: "Passe un coup de panosse, il y a de la boue partout.",
    fiche: "Mot de Suisse romande et de Savoie. On dit aussi « panosser » pour laver le sol.",
    aussi: ["FR"]
  },
  {
    expression: "Zoreil",
    pays: "RE",
    theme: "gens",
    sens: "Un métropolitain installé sur l'île",
    leurres: ["Un pêcheur de nuit", "Une personne qui écoute aux portes", "Un vendeur de samoussas"],
    exemple: "Le nouveau prof est un zoreil, il arrive de Lyon.",
    fiche: "On raconte que les nouveaux venus tendaient l'oreille pour comprendre le créole."
  },
  {
    expression: "Ya fohi",
    pays: "CI",
    theme: "emotions",
    sens: "Il n'y a pas de problème",
    leurres: ["Il fait très chaud", "On n'a plus d'argent", "Je suis fatigué"],
    exemple: "Tu es en retard ? Ya fohi, on t'attend.",
    fiche: "Nouchi. Mot à mot, « il n'y a rien ».",
    prononciation: "ya fo-hi"
  },
  {
    expression: "Sapeur",
    pays: "CD",
    theme: "gens",
    sens: "Un adepte de l'élégance vestimentaire extrême",
    leurres: ["Un pompier", "Un vendeur de chaussures", "Un danseur de rumba"],
    exemple: "Le dimanche, les sapeurs défilent en costume trois pièces.",
    fiche: "Vient de la SAPE, Société des ambianceurs et des personnes élégantes, née entre Kinshasa et Brazzaville.",
    aussi: ["CG"]
  },
  {
    expression: "Magasiner",
    pays: "QC",
    theme: "argent",
    sens: "Faire du shopping",
    leurres: ["Ranger son garage", "Tenir une boutique", "Faire des réserves"],
    exemple: "Samedi, on va magasiner au centre d'achats.",
    fiche: "Québécisme qui évite l'anglicisme « shopping ». On fait aussi du « lèche-vitrine »."
  },
  {
    expression: "Bayam-sellam",
    pays: "CM",
    theme: "argent",
    sens: "Une revendeuse de vivres au marché",
    leurres: ["Une coiffeuse de rue", "Une chanteuse de cabaret", "Une maîtresse d'école"],
    exemple: "La bayam-sellam est arrivée à 5 h pour acheter les plantains aux camions.",
    fiche: "De l'anglais « buy 'em, sell 'em » : acheter pour revendre. Un pilier des marchés camerounais.",
    prononciation: "baï-yam sè-lam"
  },
  {
    expression: "Avoir bon",
    pays: "BE",
    theme: "emotions",
    sens: "Se sentir bien, prendre du plaisir",
    leurres: ["Avoir une bonne note", "Avoir raison", "Avoir faim"],
    exemple: "Au soleil sur la terrasse, j'ai bon.",
    fiche: "Belgicisme chaleureux. « T'as bon ? » demande si tout va bien pour toi."
  },
  {
    expression: "Peuchère",
    pays: "FR",
    theme: "emotions",
    sens: "Le pauvre ! (compassion)",
    leurres: ["Quelle chance !", "Dépêche-toi !", "Quel menteur !"],
    exemple: "Il a raté son bus sous la pluie, peuchère.",
    fiche: "Interjection provençale, de Marseille à Nîmes, pour plaindre quelqu'un avec tendresse."
  },
  {
    expression: "Brouteur",
    pays: "CI",
    theme: "argent",
    sens: "Un arnaqueur sur internet",
    leurres: ["Un vendeur de légumes", "Un fan de foot", "Un chauffeur de taxi"],
    exemple: "Fais attention à ce faux profil, c'est sûrement un brouteur.",
    fiche: "On l'explique souvent par l'image du mouton qui broute sans effort : le brouteur « broute » l'argent des autres."
  },
  {
    expression: "Essencerie",
    pays: "SN",
    theme: "transport",
    sens: "Une station-service",
    leurres: ["Une boutique de parfums", "Un garage de motos", "Une pharmacie"],
    exemple: "Arrête-toi à l'essencerie, on est presque à sec.",
    fiche: "Mot du français du Sénégal, aussi entendu dans d'autres pays d'Afrique de l'Ouest."
  },
  {
    expression: "Le natel",
    pays: "CH",
    theme: "quotidien",
    sens: "Le téléphone portable",
    leurres: ["Le maillot de bain", "La fondue", "Le bus de nuit"],
    exemple: "Donne-moi ton numéro de natel, je t'envoie l'adresse.",
    fiche: "Nom d'un ancien réseau mobile suisse devenu le mot de tous les jours pour le portable."
  },
  {
    expression: "Tchoko",
    pays: "CM",
    theme: "argent",
    sens: "Un pot-de-vin",
    leurres: ["Du chocolat chaud", "Une danse", "Un petit enfant"],
    exemple: "Sans tchoko, ton dossier ne bougera pas.",
    fiche: "Camfranglais. Le mot sert souvent à dénoncer la petite corruption.",
    prononciation: "tcho-ko"
  },
  {
    expression: "Un gone",
    pays: "FR",
    theme: "gens",
    sens: "Un enfant, un gamin",
    leurres: ["Un supporter de foot", "Un vieux monsieur", "Un ouvrier de la soie"],
    exemple: "Les gones jouent dans la cour depuis ce matin.",
    fiche: "Mot lyonnais. On le retrouve dans le roman « Le Gone du Chaâba » d'Azouz Begag."
  },
  {
    expression: "Ma blonde",
    pays: "QC",
    theme: "amour",
    sens: "Ma petite amie",
    leurres: ["Ma bière", "Ma voiture", "Ma sœur"],
    exemple: "Je te présente ma blonde, on sort ensemble depuis l'été.",
    fiche: "Au Québec, ta blonde est ta copine, quelle que soit la couleur de ses cheveux. Le copain, c'est le « chum »."
  },
  {
    expression: "Toubab",
    pays: "SN",
    theme: "gens",
    sens: "Un Blanc, un étranger occidental",
    leurres: ["Un grand marabout", "Un taxi collectif", "Un plat de riz"],
    exemple: "Les enfants criaient « toubab ! » en voyant les touristes passer.",
    fiche: "Mot employé dans plusieurs pays d'Afrique de l'Ouest, souvent sans méchanceté.",
    aussi: ["ML"]
  },
  {
    expression: "Je ne sais pas venir",
    pays: "BE",
    theme: "quotidien",
    sens: "Je ne peux pas venir",
    leurres: ["J'ignore le chemin", "Je n'ai pas envie", "Je viendrai plus tard"],
    exemple: "Désolé, ce soir je ne sais pas venir, je garde les enfants.",
    fiche: "En Belgique, « savoir » s'emploie souvent pour « pouvoir »."
  },
  {
    expression: "Faire le boucan",
    pays: "CI",
    theme: "argent",
    sens: "Frimer, étaler son argent",
    leurres: ["Faire du bruit la nuit", "Cuisiner au feu de bois", "Se battre"],
    exemple: "Il est arrivé en grosse voiture pour faire le boucan devant tout le monde.",
    fiche: "Nouchi. Le « boucantier » est celui qui en met plein la vue, figure très liée au coupé-décalé."
  },
  {
    expression: "Le daron",
    pays: "FR",
    theme: "gens",
    sens: "Le père",
    leurres: ["Le patron du bar", "Le grand frère", "Le chauffeur"],
    exemple: "Je ne peux pas sortir, mon daron veut que je révise.",
    fiche: "Vieil argot remis au goût du jour. La mère, c'est la « daronne », les deux parents « les darons »."
  },
  {
    expression: "Un cornet",
    pays: "CH",
    theme: "quotidien",
    sens: "Un sac en plastique ou en papier",
    leurres: ["Une glace", "Une trompette", "Un chapeau pointu"],
    exemple: "Vous voulez un cornet pour vos courses ?",
    fiche: "Suisse romande. Au supermarché, on vous propose un cornet, pas un sachet."
  },
  {
    expression: "Mange-mille",
    pays: "CM",
    theme: "argent",
    sens: "Un policier qui réclame des petits billets",
    leurres: ["Un gros mangeur", "Un vendeur de beignets", "Un millionnaire"],
    exemple: "Au carrefour, le mange-mille arrête tous les taxis.",
    fiche: "Expression camerounaise : le billet de 1 000 francs CFA glissé pour éviter une amende."
  },
  {
    expression: "Dibiterie",
    pays: "SN",
    theme: "manger",
    sens: "Un restaurant de viande grillée",
    leurres: ["Une boulangerie", "Un salon de coiffure", "Une boutique de tissus"],
    exemple: "On finit la soirée à la dibiterie du coin, ils font le meilleur mouton.",
    fiche: "Du wolof « dibi », la viande grillée. Une institution des nuits dakaroises."
  },
  {
    expression: "C'est du brol",
    pays: "BE",
    theme: "quotidien",
    sens: "C'est du bazar, du fouillis",
    leurres: ["C'est délicieux", "C'est trop cher", "C'est très ancien"],
    exemple: "Range ta chambre, c'est du brol partout.",
    fiche: "Belgicisme d'origine flamande. Un « brol » peut aussi être un truc sans valeur."
  },
  {
    expression: "Une poche",
    pays: "FR",
    theme: "quotidien",
    sens: "Un sac en plastique",
    leurres: ["Une petite piscine", "Un portefeuille", "Une casquette"],
    exemple: "Mets les pommes dans une poche, je les porte.",
    fiche: "Dans le Sud-Ouest, on demande une poche à la caisse. Les mêmes disent aussi « chocolatine »."
  },
  {
    expression: "Faire coop",
    pays: "CD",
    theme: "argent",
    sens: "Faire une petite combine pour se débrouiller",
    leurres: ["Travailler à la ferme", "Donner un coup de poing", "Retrouver un ami d'enfance"],
    exemple: "Il n'a pas de travail fixe, il fait coop au marché.",
    fiche: "Kinois. La « coop » regroupe toutes les petites affaires qui permettent de tenir jusqu'à la fin du mois."
  },
  {
    expression: "Motamoter",
    pays: "CM",
    theme: "ecole",
    sens: "Réciter par cœur sans comprendre",
    leurres: ["Bégayer en parlant", "Copier sur son voisin", "Écrire des lettres d'amour"],
    exemple: "Il a motamoté toute sa leçon d'histoire, mais impossible de l'expliquer.",
    fiche: "Formé sur « mot à mot » : on récite sa leçon mot pour mot, sans forcément la comprendre. Un réflexe d'écolier bien connu."
  },
  {
    expression: "Quétaine",
    pays: "QC",
    theme: "quotidien",
    sens: "Ringard, de mauvais goût",
    leurres: ["Très cher, luxueux", "Fragile, qui casse vite", "Bien rangé, propre"],
    exemple: "Son chandail de Noël qui clignote, c'est tellement quétaine !",
    fiche: "Québécisme du quotidien pour tout ce qui est kitsch. Son origine reste discutée."
  },
  {
    expression: "Faire le cacou",
    pays: "FR",
    theme: "gens",
    sens: "Frimer, faire le malin",
    leurres: ["Faire la sieste", "Faire la cuisine", "Faire la queue"],
    exemple: "Arrête de faire le cacou sur ton scooter, tu vas finir par tomber.",
    fiche: "Expression marseillaise. Le cacou, c'est le frimeur du quartier, lunettes de soleil et chaîne en or."
  },
  {
    expression: "Caïmanter",
    pays: "CI",
    theme: "ecole",
    sens: "Travailler dur, bûcher ses cours",
    leurres: ["Dormir toute la journée", "Tricher à un examen", "Faire la fête toute la nuit"],
    exemple: "Le bac approche, je caïmante tous les soirs jusqu'à minuit.",
    fiche: "Ivoirisme d'étudiant. Le « caïman », c'est l'élève qui ne lâche jamais ses cahiers."
  },
  {
    expression: "Être bleu de quelqu'un",
    pays: "BE",
    theme: "amour",
    sens: "Être amoureux",
    leurres: ["Être en colère contre lui", "Avoir peur de lui", "Être jaloux de lui"],
    exemple: "Depuis la soirée de jeudi, il est complètement bleu de Sarah.",
    fiche: "Belgicisme. En Belgique, l'amour rend bleu plutôt que rouge."
  },
  {
    expression: "Achouka !",
    pays: "CM",
    theme: "emotions",
    sens: "Bien fait pour toi !",
    leurres: ["Bon appétit !", "À tes souhaits !", "Bonne route !"],
    exemple: "Tu te moquais de moi et maintenant c'est toi qui es tombé ? Achouka !",
    fiche: "Interjection camerounaise un brin moqueuse, pour quelqu'un qui récolte ce qu'il a semé."
  },
  {
    expression: "Camembérer",
    pays: "SN",
    theme: "quotidien",
    sens: "Sentir mauvais des pieds",
    leurres: ["Manger trop de fromage", "Faire la grasse matinée", "Parler la bouche pleine"],
    exemple: "Enlève tes baskets dehors, tu camembères !",
    fiche: "Mot du français d'Afrique de l'Ouest, inspiré de l'odeur bien connue du camembert."
  },
  {
    expression: "Un salomon",
    pays: "CD",
    theme: "gens",
    sens: "Une personne qui dort dans le salon",
    leurres: ["Un homme très sage", "Un vendeur de poisson", "Un grand salon de coiffure"],
    exemple: "Avec toute la famille en visite, c'est moi le salomon cette semaine.",
    fiche: "On raconte qu'à Kinshasa ce jeu de mots sur « salon » désigne celui qui dort sur le canapé, faute de chambre."
  },
  {
    expression: "Un grimpion",
    pays: "CH",
    theme: "gens",
    sens: "Un arriviste",
    leurres: ["Un alpiniste", "Un enfant turbulent", "Un vendeur ambulant"],
    exemple: "Ce grimpion ferait n'importe quoi pour devenir chef de service.",
    fiche: "Helvétisme : celui qui « grimpe » dans la société, quitte à marcher sur les autres."
  },
  {
    expression: "Niaiseux",
    pays: "QC",
    theme: "gens",
    sens: "Naïf, un peu bête",
    leurres: ["Très gentil, serviable", "Fatigué, endormi", "Riche et radin"],
    exemple: "Arrête de faire le niaiseux, tu sais très bien de quoi je parle.",
    fiche: "Québécisme. « Arrête de me niaiser », c'est « arrête de te moquer de moi »."
  },
  {
    expression: "Avoir un sadoul",
    pays: "FR",
    theme: "manger",
    sens: "En avoir assez, être rassasié",
    leurres: ["Avoir très soif", "Avoir le hoquet", "Avoir de la fièvre"],
    exemple: "Après trois parts de tarte, j'ai un sadoul, je ne peux plus rien avaler.",
    fiche: "Du provençal « sadou », rassasié. Dans le Sud, on peut aussi en avoir un sadoul… de quelqu'un."
  },
  {
    expression: "C'est caillou",
    pays: "BF",
    theme: "emotions",
    sens: "C'est dur, c'est difficile",
    leurres: ["C'est très bon marché", "C'est tout près d'ici", "C'est complètement vide"],
    exemple: "Trouver du travail à Ouaga en ce moment, c'est caillou.",
    fiche: "L'image parle d'elle-même : dur comme un caillou. Courant au Burkina Faso et chez ses voisins."
  },
  {
    expression: "Être comme lait et citron",
    pays: "HT",
    theme: "gens",
    sens: "Être fâchés l'un contre l'autre",
    leurres: ["Être inséparables", "Se ressembler beaucoup", "Être de la même famille"],
    exemple: "Depuis l'histoire de l'héritage, les deux frères sont comme lait et citron.",
    fiche: "Image du créole haïtien : versez du citron dans le lait, il tourne. Deux personnes qui ne peuvent plus se mélanger."
  },
  {
    expression: "Aller à Kumba",
    pays: "CM",
    theme: "gens",
    sens: "Se rajeunir, mentir sur son âge",
    leurres: ["Partir en vacances au village", "Changer de travail", "Se marier en secret"],
    exemple: "Elle dit qu'elle a vingt-cinq ans ? Elle est allée à Kumba, oui !",
    fiche: "Expression camerounaise pleine d'humour pour celui qui s'enlève quelques années. Kumba est une ville du Sud-Ouest."
  },
  {
    expression: "Faire palabre",
    pays: "CI",
    theme: "gens",
    sens: "Se disputer, avoir un conflit",
    leurres: ["Faire la cuisine ensemble", "Partir en voyage", "Faire la sieste"],
    exemple: "Ils ont fait palabre pour une place de parking devant tout le quartier.",
    fiche: "En Côte d'Ivoire, « palabre » rime avec dispute. Ailleurs, la palabre est d'abord une longue discussion pour régler un différend.",
    ailleurs: [{ sens: "Discuter longuement (« palabrer »)", ou: "Dans une grande partie de l'Afrique et en France" }]
  },
  {
    expression: "Un taiseux",
    pays: "BE",
    theme: "gens",
    sens: "Une personne qui parle peu",
    leurres: ["Un menteur", "Un gros dormeur", "Un fumeur"],
    exemple: "Son grand-père est un taiseux, mais quand il raconte une histoire, tout le monde écoute.",
    fiche: "Mot de Belgique et du nord de la France, entré dans les dictionnaires. Un taiseux n'est pas fâché : il préfère se taire.",
    aussi: ["FR"]
  },
  {
    expression: "Un allocataire",
    pays: "CM",
    theme: "gens",
    sens: "Un menteur",
    leurres: ["Un voisin bruyant", "Un vendeur de crédit téléphonique", "Un grand travailleur"],
    exemple: "Ne crois pas ce qu'il raconte, c'est un allocataire.",
    fiche: "Au Cameroun, le mot vise celui qui raconte des histoires. En France, un allocataire touche simplement des allocations.",
    ailleurs: [{ sens: "Une personne qui touche des allocations", ou: "En France" }]
  },
  {
    expression: "Ne pas lâcher la patate",
    pays: "QC",
    theme: "emotions",
    sens: "Persévérer, ne pas abandonner",
    leurres: ["Ne pas partager son repas", "Garder un secret", "Rester à la maison"],
    exemple: "Il te reste une session à faire, lâche pas la patate !",
    fiche: "Encouragement québécois par excellence, souvent dit « Lâche pas la patate ! ». Une chanson cajun l'a rendu célèbre."
  },
  {
    expression: "Au pas de caméléon",
    pays: "CG",
    theme: "quotidien",
    sens: "Très lentement",
    leurres: ["En changeant sans cesse d'avis", "En se cachant de tout le monde", "En courant très vite"],
    exemple: "Avec les embouteillages, on a traversé Brazzaville au pas de caméléon.",
    fiche: "Le caméléon avance une patte après l'autre, en prenant tout son temps : l'image parle à tout le Congo."
  },
  {
    expression: "Gros-doigts",
    pays: "RE",
    theme: "gens",
    sens: "Maladroit",
    leurres: ["Gourmand", "Très fort", "Avare"],
    exemple: "Ne laisse pas gros-doigts porter les verres, il va tout casser.",
    fiche: "Créole réunionnais : avoir de gros doigts, c'est tout laisser tomber."
  },
  {
    expression: "Un jaguar",
    pays: "BJ",
    theme: "gens",
    sens: "Un homme beau et élégant",
    leurres: ["Un voleur très rapide", "Un chauffeur de taxi", "Un chef de quartier"],
    exemple: "Avec son costume neuf, il est sorti en vrai jaguar.",
    fiche: "Au Bénin, le jaguar soigne son allure et aime qu'on le remarque, comme le fauve… ou la voiture de luxe."
  },
  {
    expression: "Doudou",
    pays: "GP",
    theme: "amour",
    sens: "Chéri, personne aimée",
    leurres: ["Un petit gâteau", "Un grand-père", "Un chapeau de paille"],
    exemple: "Viens danser, doudou, c'est notre chanson !",
    fiche: "Mot doux des Antilles, qu'on entend dans la chanson « Adieu foulards, adieu madras ». En métropole, le doudou est la peluche des enfants.",
    ailleurs: [{ sens: "La peluche d'un enfant", ou: "En France" }]
  },
  {
    expression: "La pluie",
    pays: "TG",
    theme: "ecole",
    sens: "La bourse des étudiants",
    leurres: ["La saison des examens", "Les grandes vacances", "La cantine de l'université"],
    exemple: "La pluie est tombée ce matin, ce soir on mange au maquis !",
    fiche: "On raconte qu'à l'université de Lomé la bourse arrive comme la pluie après la saison sèche : tout le monde l'attend."
  },
  {
    expression: "Une chocolatine",
    pays: "FR",
    theme: "manger",
    sens: "Un pain au chocolat",
    leurres: ["Une tablette de chocolat", "Un chocolat chaud", "Une crêpe au chocolat"],
    exemple: "Une chocolatine et un café, s'il vous plaît.",
    fiche: "Dans le Sud-Ouest, on ne dit pas pain au chocolat. Le débat chocolatine contre pain au chocolat agite toute la France."
  },
  {
    expression: "Le bacho",
    pays: "CM",
    theme: "ecole",
    sens: "Le baccalauréat",
    leurres: ["Le bus scolaire", "Le dortoir", "Le cahier de textes"],
    exemple: "Il a eu son bacho du premier coup, la famille a fait la fête.",
    fiche: "Au Cameroun, le bacho se prépare dur. En France, on disait autrefois « le bachot »."
  },
  {
    expression: "Un car rapide",
    pays: "SN",
    theme: "transport",
    sens: "Un minibus coloré de Dakar",
    leurres: ["Un train express", "Une moto-taxi", "Une voiture de course"],
    exemple: "Prends le car rapide jusqu'à Colobane, c'est pas cher.",
    fiche: "Peints en jaune et bleu, couverts d'inscriptions, les cars rapides sont une icône de Dakar… même s'ils ne sont pas si rapides."
  },
  {
    expression: "Ma go",
    pays: "CI",
    theme: "amour",
    sens: "Ma petite amie",
    leurres: ["Ma grande sœur", "Ma voisine", "Ma patronne"],
    exemple: "Je te présente ma go, on se connaît depuis le lycée.",
    fiche: "Nouchi : la « go », c'est la fille, et « ma go », ta copine. Le mot a fait le tour de l'Afrique francophone.",
    ailleurs: [{ sens: "« Go ! » : vas-y, c'est parti", ou: "En France, de l'anglais" }]
  },
  {
    expression: "Faire la baboune",
    pays: "QC",
    theme: "emotions",
    sens: "Bouder",
    leurres: ["Faire des grimaces", "Faire la fête", "Faire du bruit"],
    exemple: "Il fait la baboune parce qu'on est partis sans lui.",
    fiche: "Au Québec, la baboune, c'est la lèvre qui s'avance quand on boude."
  },
  {
    expression: "Brosser un cours",
    pays: "BE",
    theme: "ecole",
    sens: "Sécher un cours",
    leurres: ["Réviser un cours", "Recopier un cours", "Donner un cours"],
    exemple: "On brosse le cours de 8 h, il fait trop beau.",
    fiche: "Belgicisme d'étudiant. On peut aussi brosser l'école… ou le boulot."
  },
  {
    expression: "Un baobab",
    pays: "CM",
    theme: "gens",
    sens: "Une personne puissante et respectée",
    leurres: ["Une personne très lente", "Un grand menteur", "Un vendeur de fruits"],
    exemple: "C'est un baobab du quartier, personne n'ose le contredire.",
    fiche: "Comme l'arbre géant qui domine la savane, le baobab est solide et intouchable."
  },
  {
    expression: "Mikiliste",
    pays: "CD",
    theme: "gens",
    sens: "Une personne qui vit en Europe",
    leurres: ["Un militaire", "Un musicien", "Un commerçant"],
    exemple: "Le mikiliste est revenu pour les fêtes, sapé de la tête aux pieds.",
    fiche: "Du lingala « mikili », le monde, et surtout l'Europe. Le cousin kinois du mbenguiste camerounais.",
    aussi: ["CG"],
    prononciation: "mi-ki-list"
  },
  {
    expression: "Adodoler",
    pays: "CH",
    theme: "amour",
    sens: "Câliner, bercer un enfant",
    leurres: ["Gronder un enfant", "Gâter de bonbons", "Faire rire"],
    exemple: "La grand-maman adodole le petit jusqu'à ce qu'il s'endorme.",
    fiche: "Mot doux de Suisse romande, pour les câlins qu'on fait aux tout-petits."
  },
  {
    expression: "Le zbeul",
    pays: "FR",
    theme: "quotidien",
    sens: "Le désordre, le chaos",
    leurres: ["Le silence total", "Une petite fête", "Un plat épicé"],
    exemple: "Après la soirée, c'était le zbeul dans l'appart.",
    fiche: "Argot des jeunes, de l'arabe maghrébin « zbel », les ordures. « Mettre le zbeul », c'est semer la pagaille."
  },
  {
    expression: "Être couranté",
    pays: "CM",
    theme: "gens",
    sens: "Être au courant de tout",
    leurres: ["Avoir l'électricité", "Être toujours pressé", "Être tombé malade"],
    exemple: "Demande à Tatiana, elle est toujours couranté de ce qui se passe au quartier.",
    fiche: "Formé sur « être au courant » : celui qui sait tout avant tout le monde."
  },
  {
    expression: "Un garba",
    pays: "CI",
    theme: "manger",
    sens: "Un plat d'attiéké au thon frit",
    leurres: ["Un jus de gingembre", "Une soupe de poisson", "Un beignet sucré"],
    exemple: "À midi, on se fait un garba au coin de la rue.",
    fiche: "Le plat roi des étudiants d'Abidjan : attiéké, thon frit, piment et oignon. Bon, rapide et pas cher."
  },
  {
    expression: "Mouiller à siaux",
    pays: "QC",
    theme: "quotidien",
    sens: "Pleuvoir très fort",
    leurres: ["Arroser son jardin", "Transpirer beaucoup", "Pleurer de rire"],
    exemple: "Prends ton imperméable, il mouille à siaux.",
    fiche: "Au Québec, « mouiller » veut dire pleuvoir, et « siaux » se dit pour seaux : il pleut à seaux."
  },
  {
    expression: "Une sotrama",
    pays: "ML",
    theme: "transport",
    sens: "Un minibus vert de Bamako",
    leurres: ["Un marché couvert", "Une moto-taxi", "Un bateau sur le Niger"],
    exemple: "Monte dans la sotrama, elle va jusqu'au grand marché.",
    fiche: "Du nom de la société qui les exploitait. Les minibus verts font partie du paysage de Bamako.",
    prononciation: "so-tra-ma"
  },
  {
    expression: "Cadonner",
    pays: "TD",
    theme: "amour",
    sens: "Offrir un cadeau",
    leurres: ["Recevoir une amende", "Cacher un secret", "Rendre la monnaie"],
    exemple: "Pour son anniversaire, je vais la cadonner d'un beau pagne.",
    fiche: "Verbe formé sur « cadeau », courant au Tchad et chez ses voisins. On entend aussi « cadeauter ».",
    aussi: ["CM"]
  },
  {
    expression: "Un tap-tap",
    pays: "HT",
    theme: "transport",
    sens: "Un bus coloré de transport collectif",
    leurres: ["Un tambour de carnaval", "Un vendeur de rue", "Un petit marteau"],
    exemple: "On a pris un tap-tap pour monter à Pétion-Ville.",
    fiche: "Pick-up et bus peints de couleurs vives, ornés de messages. On raconte que leur nom vient des petits coups frappés sur la carrosserie pour descendre."
  },
  {
    expression: "Avoir un gros cou",
    pays: "BE",
    theme: "gens",
    sens: "Se croire important",
    leurres: ["Avoir mal à la gorge", "Être très gourmand", "Avoir de la chance"],
    exemple: "Depuis qu'il est chef d'équipe, il a un gros cou.",
    fiche: "Belgicisme : à force de se rengorger, le cou gonfle."
  },
  {
    expression: "La hchouma",
    pays: "MA",
    theme: "emotions",
    sens: "La honte, la gêne",
    leurres: ["La fête de fin d'année", "La fatigue", "La chance"],
    exemple: "Tu ne vas pas sortir comme ça devant les invités, hchouma !",
    fiche: "Mot de la darija, très présent au Maghreb : la hchouma, c'est ce qui ne se fait pas devant les autres.",
    aussi: ["DZ", "TN"],
    prononciation: "h'chou-ma"
  },
  {
    expression: "Trabendiste",
    pays: "DZ",
    theme: "argent",
    sens: "Un revendeur au marché noir",
    leurres: ["Un chauffeur de car", "Un ouvrier du bâtiment", "Un joueur de cartes"],
    exemple: "Il a trouvé ces baskets chez un trabendiste, à moitié prix.",
    fiche: "De l'espagnol « contrabando », la contrebande. Le trabendo a fait vivre bien des familles algériennes."
  },
  {
    expression: "Chichard",
    pays: "CM",
    theme: "argent",
    sens: "Radin",
    leurres: ["Généreux", "Bavard", "Peureux"],
    exemple: "Ne compte pas sur lui pour payer la tournée, il est trop chichard.",
    fiche: "Formé sur « chiche », avare. Le chichard compte chaque franc."
  },
  {
    expression: "Mordre le carreau",
    pays: "BF",
    theme: "emotions",
    sens: "Être battu nettement",
    leurres: ["Avoir très faim", "Se cogner contre une vitre", "Jouer aux cartes"],
    exemple: "Notre équipe a mordu le carreau : cinq buts à zéro.",
    fiche: "Image du lutteur qui finit le nez au sol. Se dit d'une défaite sans appel."
  },
  {
    expression: "Gavé",
    pays: "FR",
    theme: "quotidien",
    sens: "Très, beaucoup",
    leurres: ["Pas assez", "Vraiment trop tard", "À peine"],
    exemple: "Il fait gavé chaud aujourd'hui.",
    fiche: "Mot de Bordeaux et du Sud-Ouest : le cousin bordelais du « tarpin » marseillais."
  },
  {
    expression: "Le mbalax",
    pays: "SN",
    theme: "fete",
    sens: "La musique populaire sénégalaise",
    leurres: ["Un plat de riz au poisson", "Un tissu de fête", "Une lutte traditionnelle"],
    exemple: "Le mbalax a fait danser toute la noce jusqu'au matin.",
    fiche: "Percussions sabar, guitares et voix : Youssou N'Dour a fait connaître le mbalax dans le monde entier.",
    prononciation: "m'ba-lakh"
  },
  {
    expression: "Un chum",
    pays: "QC",
    theme: "amour",
    sens: "Un ami, un copain",
    leurres: ["Un patron", "Un chewing-gum", "Un fêtard"],
    exemple: "Je vais voir le hockey avec mes chums ce soir.",
    fiche: "De l'anglais « chum », copain. Selon le contexte, « mon chum » peut aussi être ton amoureux.",
    ailleurs: [{ sens: "Mon petit ami (« mon chum »)", ou: "Au Québec aussi, selon le contexte" }]
  },
  {
    expression: "Un maquis",
    pays: "CI",
    theme: "manger",
    sens: "Un petit restaurant populaire",
    leurres: ["Un salon de coiffure", "Un vieux marché couvert", "Une boîte de nuit chic"],
    exemple: "On se retrouve au maquis, ils font un très bon poulet braisé.",
    fiche: "Pilier de la vie ivoirienne : tables en plastique, poisson braisé, boisson fraîche et musique.",
    ailleurs: [{ sens: "La végétation épaisse, ou la Résistance pendant la guerre", ou: "En France" }],
    aussi: ["BF"]
  },
  {
    expression: "Je wanda",
    pays: "CM",
    theme: "emotions",
    sens: "Je m'étonne, ça me surprend",
    leurres: ["Je m'en vais", "Je suis fatigué", "J'ai compris"],
    exemple: "Tu as fini tout le plat tout seul ? Je wanda !",
    fiche: "Camfranglais, de l'anglais « to wonder », se demander."
  },
  {
    expression: "Dégun",
    pays: "FR",
    theme: "gens",
    sens: "Personne",
    leurres: ["Tout le monde", "Quelqu'un de bizarre", "Un ami"],
    exemple: "À cette heure-là, il y a dégun sur la plage.",
    fiche: "Marseillais, du provençal « degun ». « Dégun ne m'a rien dit » : personne ne m'a prévenu."
  },
  {
    expression: "Être déçu en bien",
    pays: "CH",
    theme: "emotions",
    sens: "Être agréablement surpris",
    leurres: ["Être légèrement déçu", "Être vexé", "Être inquiet"],
    exemple: "Je n'attendais rien de ce film, j'ai été déçu en bien.",
    fiche: "Helvétisme savoureux : la surprise est là, mais dans le bon sens."
  },
  {
    expression: "Ndeko",
    pays: "CD",
    theme: "amour",
    sens: "Frère, ami proche",
    leurres: ["Patron", "Voisin", "Inconnu"],
    exemple: "Merci ndeko, sans toi je n'y serais pas arrivé.",
    fiche: "Lingala. « Ndeko » désigne le frère ou la sœur, et par extension l'ami à qui l'on tient.",
    aussi: ["CG"],
    prononciation: "n'dé-ko"
  },
  {
    expression: "Un ndjangui",
    pays: "CM",
    theme: "argent",
    sens: "Une tontine",
    leurres: ["Un marché de nuit", "Un mariage", "Un prêt bancaire"],
    exemple: "Avec l'argent du ndjangui, elle a ouvert sa boutique.",
    fiche: "Chaque membre cotise, et à tour de rôle l'un d'eux reçoit la cagnotte : une banque de confiance entre amis.",
    prononciation: "n'djan-gui"
  },
  {
    expression: "Un essuie",
    pays: "BE",
    theme: "quotidien",
    sens: "Une serviette de bain",
    leurres: ["Un essuie-glace", "Un mouchoir", "Un tablier"],
    exemple: "N'oublie pas ton essuie pour la piscine.",
    fiche: "Belgicisme. L'essuie de vaisselle sèche les verres, l'essuie de bain, c'est pour toi."
  },
  {
    expression: "C'est plate",
    pays: "QC",
    theme: "emotions",
    sens: "C'est ennuyeux",
    leurres: ["C'est facile", "C'est pas cher", "C'est tout droit"],
    exemple: "Il pleut toute la fin de semaine, c'est plate.",
    fiche: "Québécisme du quotidien. On dit aussi « une soirée plate »."
  },
  {
    expression: "Un gbaka",
    pays: "CI",
    theme: "transport",
    sens: "Un minibus de transport en commun",
    leurres: ["Une moto-taxi", "Un grand camion", "Une pirogue"],
    exemple: "Prends le gbaka jusqu'à Adjamé, puis un woro-woro.",
    fiche: "Minibus bondés qui relient les communes d'Abidjan. L'apprenti crie la destination à chaque arrêt.",
    prononciation: "g'ba-ka"
  },
  {
    expression: "Un feyman",
    pays: "CM",
    theme: "argent",
    sens: "Un escroc",
    leurres: ["Un pompier", "Un homme très riche", "Un guérisseur"],
    exemple: "Il promettait de doubler ton argent ? C'est un feyman.",
    fiche: "Camfranglais, de « fey », l'escroquerie. Les feymen les plus célèbres ont même inspiré des chansons."
  },
  {
    expression: "Jërëjëf",
    pays: "SN",
    theme: "salutations",
    sens: "Merci",
    leurres: ["Bonjour", "Au revoir", "S'il vous plaît"],
    exemple: "Jërëjëf pour le thé, il était délicieux.",
    fiche: "Le merci wolof, à dire souvent au Sénégal. On te répondra « Ñoo ko bokk » : on le partage.",
    prononciation: "djè-rè-djèf"
  },
  {
    expression: "Biloute",
    pays: "FR",
    theme: "gens",
    sens: "Petit gars (affectueux)",
    leurres: ["Un vieux grincheux", "Un enfant gâté", "Un buveur de bière"],
    exemple: "Viens par ici, biloute, on va manger une frite.",
    fiche: "Ch'ti affectueux du Nord, popularisé par le film « Bienvenue chez les Ch'tis »."
  },
  {
    expression: "Le marmay",
    pays: "RE",
    theme: "gens",
    sens: "Les enfants",
    leurres: ["Les grands-parents", "Les voisins", "Les touristes"],
    exemple: "Le marmay joue dans la cour depuis ce matin.",
    fiche: "Créole réunionnais, de « marmaille ». La petite troupe des enfants de la famille."
  },
  {
    expression: "Un lolo",
    pays: "GP",
    theme: "argent",
    sens: "Une petite épicerie de quartier",
    leurres: ["Un bébé", "Un verre de rhum", "Une fête de famille"],
    exemple: "Va au lolo acheter du pain et de l'huile.",
    fiche: "Aux Antilles, le lolo est la petite boutique où l'on trouve de tout, et où l'on prend des nouvelles du quartier."
  },
  {
    expression: "Une diacre",
    pays: "CG",
    theme: "amour",
    sens: "Une jolie jeune femme, une petite amie",
    leurres: ["Une femme d'église", "Une grand-mère", "Une vendeuse"],
    exemple: "Il est venu à la fête avec sa diacre.",
    fiche: "On raconte qu'à Brazzaville ce mot d'église a pris un sens bien plus profane."
  },
  {
    expression: "Bienvenue !",
    pays: "QC",
    theme: "salutations",
    sens: "De rien (en réponse à merci)",
    leurres: ["Au revoir !", "Bon appétit !", "À tes souhaits !"],
    exemple: "— Merci pour le lift ! — Bienvenue !",
    fiche: "Calque de l'anglais « you're welcome ». Au Québec, on répond « bienvenue » à un merci.",
    ailleurs: [{ sens: "Formule d'accueil", ou: "Dans toute la francophonie" }]
  },
  {
    expression: "Un zémidjan",
    pays: "BJ",
    theme: "transport",
    sens: "Un moto-taxi",
    leurres: ["Un marché flottant", "Un bus de nuit", "Une pirogue"],
    exemple: "Pour aller vite au marché Dantokpa, prends un zémidjan.",
    fiche: "Du fon « zé mi dján » : « prends-moi vite ». Les « zems » en chemise jaune sillonnent Cotonou.",
    aussi: ["TG"],
    prononciation: "zé-mi-djan"
  },
  {
    expression: "Yovo",
    pays: "TG",
    theme: "gens",
    sens: "Un Blanc, un étranger",
    leurres: ["Un enfant", "Un sorcier", "Un commerçant"],
    exemple: "« Yovo, yovo, bonsoir ! » chantent les enfants au passage des touristes.",
    fiche: "Mot éwé et fon, entendu au Togo et au Bénin. La petite comptine des enfants est célèbre.",
    aussi: ["BJ"],
    prononciation: "yo-vo"
  },
  {
    expression: "Un benskineur",
    pays: "CM",
    theme: "transport",
    sens: "Un conducteur de moto-taxi",
    leurres: ["Un vendeur d'essence", "Un mécanicien", "Un agent de police"],
    exemple: "Le benskineur m'a déposé devant la porte en cinq minutes.",
    fiche: "De « bend skin », se pencher : la position sur la moto, et le nom d'une danse. Les benskineurs règnent sur les rues de Douala."
  },
  {
    expression: "Une guindaille",
    pays: "BE",
    theme: "fete",
    sens: "Une fête étudiante bien arrosée",
    leurres: ["Un examen difficile", "Une randonnée", "Une dispute"],
    exemple: "Grosse guindaille jeudi soir, avant le blocus.",
    fiche: "Belgicisme d'étudiant, surtout à Louvain-la-Neuve et Liège. Le « blocus », c'est la période de révision."
  },
  {
    expression: "Un woro-woro",
    pays: "CI",
    theme: "transport",
    sens: "Un taxi collectif",
    leurres: ["Un vendeur ambulant", "Un tambour", "Un pont"],
    exemple: "Le woro-woro pour Cocody, c'est au coin du marché.",
    fiche: "Taxis communaux d'Abidjan, de couleur différente selon la commune. On les partage avec d'autres passagers.",
    prononciation: "wo-ro wo-ro"
  },
  {
    expression: "Kenavo",
    pays: "FR",
    theme: "salutations",
    sens: "Au revoir",
    leurres: ["Bonjour", "Santé !", "Merci"],
    exemple: "Kenavo, et à la prochaine marée !",
    fiche: "Breton : on croise « kenavo » sur les panneaux à la sortie des villages.",
    prononciation: "ké-na-vo"
  },
  {
    expression: "Le grin",
    pays: "BF",
    theme: "amour",
    sens: "Le groupe d'amis qui se retrouve autour du thé",
    leurres: ["Le marché du soir", "Un champ de mil", "La saison sèche"],
    exemple: "Après le travail, il passe au grin boire le thé avec ses amis.",
    fiche: "Au Burkina comme au Mali, le grin réunit chaque jour les amis autour du thé, pour parler foot, politique et histoires de quartier.",
    aussi: ["ML"]
  },
  {
    expression: "Kenbe la !",
    pays: "HT",
    theme: "emotions",
    sens: "Tiens bon !",
    leurres: ["Laisse tomber !", "Dépêche-toi !", "Tais-toi !"],
    exemple: "Les examens sont presque finis, kenbe la !",
    fiche: "Créole haïtien, de « tenir ». Un encouragement qu'on entend partout en Haïti.",
    prononciation: "kèn-bé la"
  },
  {
    expression: "Le kongossa",
    pays: "CM",
    theme: "gens",
    sens: "Les ragots, les commérages",
    leurres: ["La musique de fête", "Le marché du dimanche", "Une soupe épicée"],
    exemple: "Le kongossa va vite au quartier, tout le monde est déjà au courant.",
    fiche: "Mot camerounais connu dans toute l'Afrique centrale. Celui qui le pratique est un « kongosseur ».",
    aussi: ["CG"],
    prononciation: "kon-go-ssa"
  },
  {
    expression: "Pantoute",
    pays: "QC",
    theme: "emotions",
    sens: "Pas du tout",
    leurres: ["Partout", "Pas encore", "Tout de suite"],
    exemple: "J'ai pas faim pantoute.",
    fiche: "Contraction de « pas en tout ». Québécisme très courant à l'oral."
  },
  {
    expression: "S'encoubler",
    pays: "CH",
    theme: "quotidien",
    sens: "Trébucher",
    leurres: ["S'endormir", "Se marier", "S'enrhumer"],
    exemple: "Je me suis encoublé dans le tapis en entrant.",
    fiche: "Mot de Suisse romande et de Savoie. On s'encouble aussi dans ses explications.",
    aussi: ["FR"]
  },
  {
    expression: "Article 15",
    pays: "CD",
    theme: "argent",
    sens: "Débrouille-toi",
    leurres: ["C'est interdit", "Paie l'amende", "Signe ici"],
    exemple: "Pas de salaire ce mois-ci ? Article 15 !",
    fiche: "On raconte qu'il viendrait d'un article de constitution qui disait en substance « débrouillez-vous ». C'est devenu la devise de Kinshasa."
  },
  {
    expression: "Dafa neex",
    pays: "SN",
    theme: "manger",
    sens: "C'est bon, c'est délicieux",
    leurres: ["C'est trop cher", "J'ai faim", "C'est épicé"],
    exemple: "Ton thiéboudienne, dafa neex !",
    fiche: "Wolof. On l'entend à table, mais aussi pour dire qu'un moment est agréable.",
    prononciation: "da-fa nèh"
  },
  {
    expression: "On dit quoi ?",
    pays: "CM",
    theme: "salutations",
    sens: "Salut, ça va ?",
    leurres: ["Répète, je n'ai pas entendu", "Qu'est-ce qu'on fait ce soir ?", "Combien ça coûte ?"],
    exemple: "On dit quoi, mon frère ? Ça fait longtemps !",
    fiche: "Salut camerounais, aussi très courant en Côte d'Ivoire. Une réponse classique : « On dit rien ! ».",
    aussi: ["CI"]
  },
  {
    expression: "Faire de son nez",
    pays: "BE",
    theme: "gens",
    sens: "Faire le prétentieux",
    leurres: ["Avoir le rhume", "Fouiner partout", "Bouder"],
    exemple: "Depuis qu'il a gagné au loto, il fait de son nez.",
    fiche: "Belgicisme : on lève le nez pour regarder les autres de haut."
  },
  {
    expression: "Babi",
    pays: "CI",
    theme: "quotidien",
    sens: "Le surnom d'Abidjan",
    leurres: ["Le surnom de Bouaké", "Un bébé", "Un vieux taxi"],
    exemple: "Je descends à Babi ce week-end.",
    fiche: "Abidjan, c'est Babi : le surnom affectueux de la capitale économique, chanté par toute une génération d'artistes."
  },
  {
    expression: "Boudu !",
    pays: "FR",
    theme: "emotions",
    sens: "Oh là là ! (surprise)",
    leurres: ["Au secours !", "Bonne nuit !", "Silence !"],
    exemple: "Boudu, qu'il fait chaud aujourd'hui !",
    fiche: "Interjection toulousaine, de l'occitan « bon Diu », bon Dieu. Elle sert pour la surprise, la colère ou l'admiration."
  },
  {
    expression: "Un dépanneur",
    pays: "QC",
    theme: "argent",
    sens: "Une épicerie de quartier",
    leurres: ["Un distributeur de billets", "Une station de lavage", "Un parking"],
    exemple: "Je passe au dépanneur chercher du lait.",
    fiche: "Au Québec, le « dépanneur » (ou « dep ») ouvre tard et dépanne quand il manque quelque chose.",
    ailleurs: [{ sens: "Un réparateur, une dépanneuse", ou: "En France et ailleurs" }]
  },
  {
    expression: "Être bat",
    pays: "CM",
    theme: "emotions",
    sens: "Être génial… ou nul, selon le ton",
    leurres: ["Être en retard", "Être malade", "Être amoureux"],
    exemple: "Ton nouveau téléphone est bat !",
    fiche: "Camfranglais à double tranchant : selon le ton, c'est un compliment ou une moquerie."
  },
  {
    expression: "L'attiéké",
    pays: "CI",
    theme: "manger",
    sens: "Une semoule de manioc fermenté",
    leurres: ["Une sauce à l'arachide", "Un pain de mil", "Une boisson au gingembre"],
    exemple: "Un poisson braisé avec de l'attiéké, et je suis le plus heureux.",
    fiche: "Le grand classique ivoirien, servi avec du poisson ou du poulet braisé. Son savoir-faire est reconnu par l'UNESCO.",
    prononciation: "a-tié-ké"
  },
  {
    expression: "Un char",
    pays: "QC",
    theme: "transport",
    sens: "Une voiture",
    leurres: ["Un chariot de supermarché", "Un tracteur", "Un autobus"],
    exemple: "Mon char est au garage, peux-tu venir me chercher ?",
    fiche: "Vieux mot français resté vivant au Québec. On « stationne son char »."
  },
  {
    expression: "Nangadef ?",
    pays: "SN",
    theme: "salutations",
    sens: "Comment ça va ?",
    leurres: ["Combien ça coûte ?", "Tu viens d'où ?", "On mange quoi ?"],
    exemple: "Nangadef ? Ça fait longtemps qu'on ne t'a pas vu au quartier !",
    fiche: "La salutation wolof de tous les jours. Au Sénégal, on prend le temps de se saluer avant de parler d'autre chose.",
    prononciation: "nan-ga-dèf"
  },
  {
    expression: "Septante",
    pays: "BE",
    theme: "quotidien",
    sens: "Soixante-dix",
    leurres: ["Dix-sept", "Sept cents", "Quatre-vingts"],
    exemple: "Le billet coûte septante euros.",
    fiche: "En Belgique, on dit septante et nonante, mais quatre-vingts. Bien plus simple que « soixante-dix-neuf » !",
    aussi: ["CH"]
  },
  {
    expression: "Le ndolè",
    pays: "CM",
    theme: "manger",
    sens: "Un plat de feuilles amères à l'arachide",
    leurres: ["Une bière de maïs", "Un pain de manioc", "Une sauce au poisson fumé"],
    exemple: "Pour les fêtes, maman prépare toujours un grand ndolè.",
    fiche: "Le plat emblématique du Cameroun : des feuilles amères, de la pâte d'arachide, de la viande ou des crevettes.",
    prononciation: "n'do-lè"
  },
  {
    expression: "Wakha",
    pays: "MA",
    theme: "salutations",
    sens: "D'accord",
    leurres: ["Merci", "Pardon", "Au revoir"],
    exemple: "— On se voit au café à 18 h ? — Wakha.",
    fiche: "Le « OK » marocain, qu'on entend dans toutes les conversations.",
    prononciation: "wa-kha (kh comme la jota espagnole)"
  },
  {
    expression: "Une wassingue",
    pays: "FR",
    theme: "quotidien",
    sens: "Une serpillière",
    leurres: ["Un vieux torchon", "Une gaufre du Nord", "Un tablier"],
    exemple: "Passe la wassingue, les enfants ont tout renversé.",
    fiche: "Mot du Nord et de la Belgique, venu du flamand. Le cousin de la panosse suisse.",
    aussi: ["BE"]
  },
  {
    expression: "Mbote",
    pays: "CD",
    theme: "salutations",
    sens: "Bonjour",
    leurres: ["Merci", "Au revoir", "Pardon"],
    exemple: "Mbote na bino, tout le monde va bien ?",
    fiche: "Le bonjour lingala, de Kinshasa à Brazzaville.",
    aussi: ["CG"],
    prononciation: "m'bo-té"
  },
  {
    expression: "Huitante",
    pays: "CH",
    theme: "quotidien",
    sens: "Quatre-vingts",
    leurres: ["Dix-huit", "Huit cents", "Quatre-vingt-dix"],
    exemple: "Ma grand-mère fête ses huitante ans dimanche.",
    fiche: "Dit surtout dans les cantons de Vaud, du Valais et de Fribourg. Même les Belges disent quatre-vingts !"
  },
  {
    expression: "Vazaha",
    pays: "MG",
    theme: "gens",
    sens: "Un étranger, souvent blanc",
    leurres: ["Un guide de montagne", "Un pêcheur", "Un vendeur de vanille"],
    exemple: "Au marché, les enfants saluent le vazaha avec un grand sourire.",
    fiche: "Mot malgache, rarement méchant : on te le dira souvent si tu voyages à Madagascar.",
    prononciation: "va-za"
  },
  {
    expression: "Barcha",
    pays: "TN",
    theme: "quotidien",
    sens: "Beaucoup",
    leurres: ["Un peu", "Jamais", "Ensuite"],
    exemple: "Il y avait barcha monde à la plage de La Marsa.",
    fiche: "Le « beaucoup » tunisien, qu'on glisse aussi dans les phrases en français.",
    prononciation: "bar-cha"
  },
  {
    expression: "Ou lé bien ?",
    pays: "RE",
    theme: "salutations",
    sens: "Tu vas bien ?",
    leurres: ["Tu es où ?", "Tu as faim ?", "Tu viens quand ?"],
    exemple: "Ou lé bien, dalon ? Ça fait longtemps !",
    fiche: "Le « ça va » créole réunionnais. On répond « Lé bien, é ou ? »."
  },
  {
    expression: "Sak pase ?",
    pays: "HT",
    theme: "salutations",
    sens: "Quoi de neuf ? Ça va ?",
    leurres: ["Tu passes quand ?", "C'est combien ?", "Tu as faim ?"],
    exemple: "— Sak pase ? — N'ap boule !",
    fiche: "La salutation haïtienne la plus connue, de « qu'est-ce qui se passe ? ».",
    prononciation: "sak pa-sé"
  },
  {
    expression: "Barka",
    pays: "BF",
    theme: "salutations",
    sens: "Merci",
    leurres: ["Bonjour", "Bienvenue", "Bonne nuit"],
    exemple: "Barka pour le repas, c'était très bon.",
    fiche: "Le merci en mooré, la langue la plus parlée du Burkina Faso."
  },
  {
    expression: "Sa ka maché ?",
    pays: "GP",
    theme: "salutations",
    sens: "Comment ça va ?",
    leurres: ["Où tu vas ?", "Tu as marché ?", "C'est combien ?"],
    exemple: "Sa ka maché, ti moun ? Ou byen ?",
    fiche: "La salutation créole des Antilles. On répond souvent « Sa ka maché ! » ou « An la ».",
    prononciation: "sa ka ma-ché"
  },
  {
    expression: "L'alloco",
    pays: "CI",
    theme: "manger",
    sens: "Des bananes plantains frites",
    leurres: ["Des beignets de haricots", "Du riz au gras", "Du poisson fumé"],
    exemple: "Le soir, on achète de l'alloco avec du piment au bord de la route.",
    fiche: "Vendu au coin des rues dès la tombée du jour. À Abidjan, l'Allocodrome de Cocody lui doit son nom."
  },
  {
    expression: "Khouya",
    pays: "DZ",
    theme: "amour",
    sens: "Mon frère (pour un ami aussi)",
    leurres: ["Mon oncle", "Mon voisin", "Mon patron"],
    exemple: "Merci khouya, tu m'as sauvé la journée.",
    fiche: "Darja. On appelle « khouya » son frère, mais aussi un ami ou un inconnu sympathique.",
    aussi: ["MA", "TN"],
    prononciation: "khou-ya (kh comme la jota espagnole)"
  },
  {
    expression: "Agoo !",
    pays: "BJ",
    theme: "salutations",
    sens: "Pardon, je peux entrer ? Laissez passer !",
    leurres: ["Bon appétit !", "Au revoir !", "Bravo !"],
    exemple: "Agoo ! Il y a quelqu'un dans la maison ?",
    fiche: "On le dit en arrivant chez quelqu'un ou pour se frayer un chemin. On répond « Ame ! », entre.",
    aussi: ["TG"],
    prononciation: "a-gô"
  },
  {
    expression: "Akpé",
    pays: "TG",
    theme: "salutations",
    sens: "Merci",
    leurres: ["Bonjour", "Au revoir", "Excusez-moi"],
    exemple: "Akpé pour ton aide, tu es gentil.",
    fiche: "Le merci en éwé. « Akpé kaka », c'est merci beaucoup.",
    aussi: ["BJ"],
    prononciation: "ak-pé"
  },
  {
    expression: "Tiguidou !",
    pays: "QC",
    theme: "emotions",
    sens: "Parfait, c'est d'accord !",
    leurres: ["Au secours !", "Quel dommage !", "Dépêche-toi !"],
    exemple: "— On se rejoint à 19 h ? — Tiguidou !",
    fiche: "Expression québécoise joyeuse : tout est beau, tout est réglé."
  },
  {
    expression: "Maa ngi fi rekk",
    pays: "SN",
    theme: "salutations",
    sens: "Je vais bien, je suis là",
    leurres: ["Je suis pressé", "Je ne comprends pas", "Je reviens tout de suite"],
    exemple: "— Nangadef ? — Maa ngi fi rekk, et toi ?",
    fiche: "La réponse wolof à « nangadef ? ». Mot à mot : « je suis là, seulement »."
  },
  {
    expression: "Une chique",
    pays: "BE",
    theme: "manger",
    sens: "Un chewing-gum",
    leurres: ["Un bonbon à la menthe", "Une cigarette", "Une petite bière"],
    exemple: "Tu as une chique ? J'ai mangé de l'ail à midi.",
    fiche: "Belgicisme. On mâche une chique, on ne la colle pas sous la table."
  },
  {
    expression: "Un mbom",
    pays: "CM",
    theme: "gens",
    sens: "Un gars, un mec",
    leurres: ["Un oncle", "Un policier", "Un chef de village"],
    exemple: "Le mbom là, il parle trop.",
    fiche: "Camfranglais très courant à Douala et Yaoundé.",
    prononciation: "m'bom"
  },
  {
    expression: "Le gnamakoudji",
    pays: "CI",
    theme: "manger",
    sens: "Un jus de gingembre",
    leurres: ["Un jus de bissap", "Une bière de mil", "Un lait caillé"],
    exemple: "Il fait trop chaud, sers-moi un gnamakoudji bien frais.",
    fiche: "Boisson piquante au gingembre, souvent parfumée à l'ananas ou au citron. On la boit très froide.",
    prononciation: "nya-ma-kou-dji"
  },
  {
    expression: "Safi",
    pays: "MA",
    theme: "emotions",
    sens: "C'est bon, ça suffit",
    leurres: ["C'est délicieux", "C'est trop cher", "C'est loin"],
    exemple: "Safi, j'ai assez mangé, merci !",
    fiche: "Darija. « Safi » clôt une discussion, une négociation ou un repas.",
    aussi: ["DZ"]
  },
  {
    expression: "Fada",
    pays: "FR",
    theme: "gens",
    sens: "Un peu fou",
    leurres: ["Très riche", "Très timide", "Très fatigué"],
    exemple: "Il se baigne en janvier, il est complètement fada !",
    fiche: "Marseillais, du provençal. Pagnol l'a rendu célèbre, et on le dit avec tendresse."
  },
  {
    expression: "Matondo",
    pays: "CD",
    theme: "salutations",
    sens: "Merci",
    leurres: ["Bonjour", "D'accord", "Bon voyage"],
    exemple: "Matondo mingi pour le repas, c'était très bon.",
    fiche: "Le merci lingala. « Matondo mingi », c'est merci beaucoup.",
    aussi: ["CG"],
    prononciation: "ma-ton-do"
  },
  {
    expression: "Faire la poutze",
    pays: "CH",
    theme: "quotidien",
    sens: "Faire le grand ménage",
    leurres: ["Faire la grasse matinée", "Faire la vaisselle", "Faire les courses"],
    exemple: "Samedi, on fait la poutze avant l'arrivée des invités.",
    fiche: "De l'allemand « putzen », nettoyer. Un mot qui sent le savon noir."
  },
  {
    expression: "Mora mora",
    pays: "MG",
    theme: "quotidien",
    sens: "Doucement, sans se presser",
    leurres: ["Tout de suite", "Plus fort", "Tout droit"],
    exemple: "Ici, on vit mora mora, le bus partira quand il sera plein.",
    fiche: "La philosophie malgache du temps : on prend la vie calmement.",
    prononciation: "mour-mour"
  },
  {
    expression: "Behi",
    pays: "TN",
    theme: "emotions",
    sens: "D'accord, c'est bien",
    leurres: ["C'est loin", "Pas question", "Je ne sais pas"],
    exemple: "— On se retrouve à Sidi Bou Saïd ? — Behi !",
    fiche: "Le « OK » tunisien. « Behi barcha », c'est très bien.",
    prononciation: "bé-hi"
  },
  {
    expression: "Le saka-saka",
    pays: "CG",
    theme: "manger",
    sens: "Des feuilles de manioc pilées et cuisinées",
    leurres: ["Une bière de maïs", "Un poisson fumé", "Une galette de riz"],
    exemple: "Ma tante prépare le meilleur saka-saka de Brazzaville.",
    fiche: "Le nom qu'on donne au Congo-Brazzaville au plat de feuilles de manioc, le « pondu » de Kinshasa."
  },
  {
    expression: "I ni ce",
    pays: "ML",
    theme: "salutations",
    sens: "Merci, bonjour (salutation)",
    leurres: ["Au revoir", "Pardon", "Bon voyage"],
    exemple: "I ni ce pour l'accueil, la famille a été très gentille.",
    fiche: "En bambara, « i ni ce » sert à saluer et à remercier. Les salutations maliennes sont longues : on prend des nouvelles de toute la famille.",
    aussi: ["BF", "CI"],
    prononciation: "i ni tché"
  },
  {
    expression: "Un dalon",
    pays: "RE",
    theme: "amour",
    sens: "Un ami, un pote",
    leurres: ["Un voisin", "Un oncle", "Un pêcheur"],
    exemple: "Ce soir, je vais pique-niquer avec mes dalons à l'Étang-Salé.",
    fiche: "Créole réunionnais pour l'ami fidèle."
  },
  {
    expression: "N'ap boule",
    pays: "HT",
    theme: "salutations",
    sens: "Ça roule, ça va bien",
    leurres: ["Je suis pressé", "Je roule à moto", "Je suis perdu"],
    exemple: "— Sak pase ? — N'ap boule, e ou ?",
    fiche: "La réponse classique à « sak pase ? ». Mot à mot : « on roule »."
  },
  {
    expression: "Le dolo",
    pays: "BF",
    theme: "fete",
    sens: "La bière de mil",
    leurres: ["Un jus de bissap", "Un thé à la menthe", "Une liqueur de karité"],
    exemple: "Le samedi, les anciens se retrouvent au cabaret pour boire le dolo.",
    fiche: "Bière traditionnelle de mil ou de sorgho, brassée par les femmes et servie dans des calebasses.",
    aussi: ["ML"]
  },
  {
    expression: "Pani pwoblem",
    pays: "GP",
    theme: "emotions",
    sens: "Pas de problème",
    leurres: ["Plus de pain", "Pas maintenant", "Il pleut"],
    exemple: "Tu arrives plus tard ? Pani pwoblem, on t'attend.",
    fiche: "Créole antillais. « Pani », c'est « il n'y a pas ».",
    prononciation: "pa-ni pwo-blèm"
  },
  {
    expression: "Il fait frette",
    pays: "QC",
    theme: "quotidien",
    sens: "Il fait très froid",
    leurres: ["Il fait humide", "Il fait beau", "Il y a du vent"],
    exemple: "Mets ta tuque, il fait frette à matin.",
    fiche: "Prononciation québécoise de « froid ». Par -30 °C, on dit qu'il fait frette en masse."
  },
  {
    expression: "L'ataya",
    pays: "SN",
    theme: "manger",
    sens: "Le thé à la menthe servi en trois tournées",
    leurres: ["Un jus de fruits pressés", "Le café du matin", "Une soupe du soir"],
    exemple: "Reste un peu, on prépare l'ataya.",
    fiche: "Le thé se boit en trois verres, du plus amer au plus sucré. Le préparer prend du temps : c'est tout l'intérêt.",
    prononciation: "a-ta-ya"
  },
  {
    expression: "Y a pas drap",
    pays: "CI",
    theme: "emotions",
    sens: "Il n'y a pas de problème",
    leurres: ["Il n'y a plus de place", "Il fait très froid", "Il n'y a rien à manger"],
    exemple: "Tu peux venir avec ton cousin, y a pas drap.",
    fiche: "Nouchi rassurant, cousin de « ya fohi ». Le « drap », ici, c'est le souci."
  },
  {
    expression: "Un pistolet",
    pays: "BE",
    theme: "manger",
    sens: "Un petit pain rond",
    leurres: ["Une saucisse épicée", "Une gaufre fourrée", "Une frite très longue"],
    exemple: "Le dimanche matin, on va chercher des pistolets chez le boulanger.",
    fiche: "Le petit pain croustillant du petit-déjeuner bruxellois. Rien à voir avec une arme."
  },
  {
    expression: "Mon tara",
    pays: "CM",
    theme: "amour",
    sens: "Mon pote, mon ami",
    leurres: ["Mon voisin", "Mon patron", "Mon cousin"],
    exemple: "C'est mon tara depuis l'école primaire.",
    fiche: "Camfranglais affectueux pour l'ami de toujours."
  },
  {
    expression: "Bslama",
    pays: "MA",
    theme: "salutations",
    sens: "Au revoir",
    leurres: ["Bonjour", "Merci", "Bon appétit"],
    exemple: "Merci pour tout, bslama !",
    fiche: "Mot à mot « avec la paix ». On l'utilise pour prendre congé.",
    aussi: ["DZ"],
    prononciation: "b'sla-ma"
  },
  {
    expression: "Un pitchoun",
    pays: "FR",
    theme: "gens",
    sens: "Un petit enfant",
    leurres: ["Un petit chien", "Un apéritif", "Un pique-nique"],
    exemple: "Le pitchoun dort enfin, on peut parler.",
    fiche: "Mot affectueux du Sud, de l'occitan « pichon », petit. Au féminin, la pitchounette."
  },
  {
    expression: "Un wewa",
    pays: "CD",
    theme: "transport",
    sens: "Un moto-taxi",
    leurres: ["Un taxi-bus", "Une pirogue", "Un camion de marchandises"],
    exemple: "Avec les bouchons, prends un wewa, tu arriveras plus vite.",
    fiche: "Les wewas se faufilent partout dans les embouteillages de Kinshasa."
  },
  {
    expression: "Un bancomat",
    pays: "CH",
    theme: "argent",
    sens: "Un distributeur de billets",
    leurres: ["Un compte en banque", "Une carte de fidélité", "Un coffre-fort"],
    exemple: "Je passe au bancomat retirer de l'argent pour le marché.",
    fiche: "Le nom suisse du distributeur, qu'on trouve à chaque coin de rue… en francs suisses."
  },
  {
    expression: "Un taxi-be",
    pays: "MG",
    theme: "transport",
    sens: "Un minibus de ville à Tana",
    leurres: ["Un taxi de luxe", "Une charrette à zébus", "Un petit bateau"],
    exemple: "Le taxi-be pour Analakely est déjà bondé.",
    fiche: "« Be » veut dire « grand » en malgache : le grand taxi, en fait un minibus collectif.",
    prononciation: "tak-si bé"
  },
  {
    expression: "Yezzi !",
    pays: "TN",
    theme: "emotions",
    sens: "Ça suffit, arrête !",
    leurres: ["Viens vite !", "Bravo !", "Encore !"],
    exemple: "Yezzi, ça fait trois fois que tu racontes la même blague !",
    fiche: "Derja. Pour couper court à une discussion ou à une bêtise.",
    aussi: ["DZ"],
    prononciation: "yèz-zi"
  },
  {
    expression: "Une tuque",
    pays: "QC",
    theme: "quotidien",
    sens: "Un bonnet d'hiver",
    leurres: ["Une écharpe", "Une paire de bottes", "Une couverture"],
    exemple: "Oublie pas ta tuque, il neige.",
    fiche: "Le bonnet de laine, souvent à pompon, indispensable de l'hiver québécois."
  },
  {
    expression: "Le thiéboudienne",
    pays: "SN",
    theme: "manger",
    sens: "Le riz au poisson, plat national",
    leurres: ["Le mouton grillé de fête", "La bouillie de mil", "Le poulet au citron"],
    exemple: "Le vendredi à midi, chez nous, c'est thiéboudienne.",
    fiche: "Du wolof « ceebu jën », riz et poisson. Le savoir-faire du thiéboudienne est inscrit au patrimoine de l'UNESCO.",
    prononciation: "tchè-bou-djèn"
  },
  {
    expression: "Un kpakpato",
    pays: "CI",
    theme: "gens",
    sens: "Un commère, quelqu'un qui rapporte tout",
    leurres: ["Un vendeur de pain", "Un bon danseur", "Un chauffeur de gbaka"],
    exemple: "Ne raconte rien devant lui, c'est un kpakpato.",
    fiche: "Nouchi. Le kpakpato répète tout et mélange parfois les histoires : tout le quartier finit par être au courant.",
    prononciation: "kpa-kpa-to"
  },
  {
    expression: "À tantôt !",
    pays: "BE",
    theme: "salutations",
    sens: "À tout à l'heure !",
    leurres: ["À demain !", "Bonne nuit !", "Adieu !"],
    exemple: "Je vais faire une course, à tantôt !",
    fiche: "En Belgique, « tantôt » désigne un moment plus tard dans la même journée."
  },
  {
    expression: "Ashia !",
    pays: "CM",
    theme: "emotions",
    sens: "Courage ! Désolé pour toi",
    leurres: ["Bien fait !", "Félicitations !", "Bon appétit !"],
    exemple: "Tu as raté ton bus ? Ashia, il y en a un autre dans une heure.",
    fiche: "Un mot de compassion qu'on entend partout au Cameroun, pour un petit souci comme pour un deuil."
  },
  {
    expression: "Un cari",
    pays: "RE",
    theme: "manger",
    sens: "Un plat mijoté aux épices",
    leurres: ["Un jus de canne", "Une salade de fruits", "Un gâteau de patate douce"],
    exemple: "Dimanche, cari poulet au feu de bois chez grand-mère.",
    fiche: "Le plat réunionnais par excellence, avec du riz et des grains. Cari poulet, cari zourite, cari bichique…"
  },
  {
    expression: "Le griot",
    pays: "HT",
    theme: "manger",
    sens: "Du porc frit mariné",
    leurres: ["Une banane bouillie", "Une soupe de giraumon", "Un riz aux haricots"],
    exemple: "Le samedi, griot et bananes pesées avec du pikliz.",
    fiche: "Plat de fête haïtien : porc mariné aux agrumes puis frit, servi avec une salade de chou très piquante, le pikliz.",
    ailleurs: [{ sens: "Un conteur et musicien de tradition orale", ou: "En Afrique de l'Ouest" }]
  },
  {
    expression: "Le tô",
    pays: "BF",
    theme: "manger",
    sens: "Une pâte de mil ou de maïs",
    leurres: ["Une soupe de poisson", "Un pain de manioc", "Une galette de riz"],
    exemple: "Le tô avec la sauce gombo, c'est le repas de tous les jours.",
    fiche: "Pâte épaisse de céréales, servie avec une sauce. Le plat de base au Burkina et au Mali.",
    aussi: ["ML"]
  },
  {
    expression: "Un bokit",
    pays: "GP",
    theme: "manger",
    sens: "Un sandwich frit guadeloupéen",
    leurres: ["Une boisson au rhum", "Un gâteau à la banane", "Une soupe de poisson"],
    exemple: "Sur la route de la plage, on s'arrête manger un bokit.",
    fiche: "Pain frit garni de morue, poulet ou thon : le casse-croûte star de la Guadeloupe."
  },
  {
    expression: "Chouf !",
    pays: "DZ",
    theme: "emotions",
    sens: "Regarde !",
    leurres: ["Écoute !", "Attends !", "Tais-toi !"],
    exemple: "Chouf, la mer est magnifique ce soir !",
    fiche: "Darja, aussi passé dans l'argot français. « Faire le chouf », c'est faire le guet.",
    aussi: ["MA", "TN"]
  },
  {
    expression: "Le kpayo",
    pays: "BJ",
    theme: "transport",
    sens: "L'essence de contrebande",
    leurres: ["Un vieux taxi", "Un marché de pièces détachées", "Une moto neuve"],
    exemple: "Il fait le plein au kpayo, en bouteilles, au bord de la route.",
    fiche: "Essence venue du Nigeria voisin, vendue en bouteilles sur les trottoirs du Bénin.",
    prononciation: "kpa-yo"
  },
  {
    expression: "Woézon !",
    pays: "TG",
    theme: "salutations",
    sens: "Bienvenue !",
    leurres: ["Bonne route !", "Bon courage !", "À demain !"],
    exemple: "Woézon à Lomé ! Tu as fait bon voyage ?",
    fiche: "La bienvenue en éwé, que l'on te souhaitera dès ton arrivée au Togo.",
    prononciation: "wo-é-zon"
  },
  {
    expression: "La boule",
    pays: "TD",
    theme: "manger",
    sens: "Une pâte épaisse de céréales",
    leurres: ["Un ballon de foot", "Une bouteille de thé", "Une galette de pain"],
    exemple: "La boule avec la sauce gombo, c'est le repas de la famille.",
    fiche: "Pâte de mil, de sorgho ou de maïs, servie avec une sauce : le plat de base au Tchad."
  },
  {
    expression: "Un môgô",
    pays: "CI",
    theme: "gens",
    sens: "Un gars, un type",
    leurres: ["Un vieux sage", "Un policier", "Un enfant"],
    exemple: "Le môgô devant la boutique, tu le connais ?",
    fiche: "Nouchi venu du dioula, où le mot veut dire « personne ». Très courant à Abidjan."
  },
  {
    expression: "Placoter",
    pays: "QC",
    theme: "gens",
    sens: "Bavarder",
    leurres: ["Se disputer", "Chuchoter", "Se moquer"],
    exemple: "On a placoté tout l'après-midi sur la galerie.",
    fiche: "Québécisme : jaser de tout et de rien, sans se presser."
  },
  {
    expression: "Un clando",
    pays: "SN",
    theme: "transport",
    sens: "Un taxi clandestin",
    leurres: ["Un bus de nuit", "Un vendeur à la sauvette", "Un passager sans billet"],
    exemple: "Il n'y a plus de bus, on va prendre un clando.",
    fiche: "Au Sénégal, le clando prend des passagers sans licence de taxi. Pratique, mais on négocie le prix avant de monter."
  },
  {
    expression: "Un grand taxi",
    pays: "MA",
    theme: "transport",
    sens: "Un taxi collectif entre deux villes",
    leurres: ["Un taxi de luxe", "Un car touristique", "Un taxi pour l'aéroport"],
    exemple: "Pour aller de Fès à Meknès, prends un grand taxi à la gare routière.",
    fiche: "Souvent de vieilles Mercedes, partagées par six passagers. En ville, on prend un « petit taxi », de couleur différente selon la ville."
  },
  {
    expression: "Péguer",
    pays: "FR",
    theme: "quotidien",
    sens: "Coller, être collant",
    leurres: ["Pêcher", "Payer", "Peigner"],
    exemple: "Lave-toi les mains, elles pèguent avec la confiture.",
    fiche: "Mot du Sud, de l'occitan « pega », la poix. Par temps de canicule, tout pègue."
  },
  {
    expression: "Un ambianceur",
    pays: "CD",
    theme: "fete",
    sens: "Un fêtard, celui qui met l'ambiance",
    leurres: ["Un musicien de rumba", "Un vendeur de boissons", "Un animateur radio"],
    exemple: "Invite-le, c'est un vrai ambianceur, la fête sera réussie.",
    fiche: "À Kinshasa, l'ambiance est un art de vivre, et l'ambianceur en est le maître.",
    aussi: ["CG", "CM", "CI"]
  },
  {
    expression: "Être de piquet",
    pays: "CH",
    theme: "ecole",
    sens: "Être de garde, d'astreinte",
    leurres: ["Être puni", "Être en vacances", "Être en retard"],
    exemple: "Je ne peux pas boire ce soir, je suis de piquet à l'hôpital.",
    fiche: "Helvétisme : être disponible au cas où le travail appelle."
  },
  {
    expression: "Misaotra",
    pays: "MG",
    theme: "salutations",
    sens: "Merci",
    leurres: ["Bonjour", "Au revoir", "Excusez-moi"],
    exemple: "Misaotra pour l'accueil, c'était magnifique.",
    fiche: "Le merci malgache. Le « o » final se prononce à peine.",
    prononciation: "mi-sôtr"
  },
  {
    expression: "Aychek",
    pays: "TN",
    theme: "salutations",
    sens: "Merci",
    leurres: ["Pardon", "Bonjour", "Bonne nuit"],
    exemple: "Aychek pour le café, c'était parfait.",
    fiche: "Le merci tunisien, mot à mot « qu'il te fasse vivre ». On l'entend partout.",
    prononciation: "aï-chek"
  },
  {
    expression: "Le GSM",
    pays: "BE",
    theme: "quotidien",
    sens: "Le téléphone portable",
    leurres: ["Le réseau wifi", "La carte d'identité", "Le chargeur"],
    exemple: "Envoie-moi un message sur mon GSM.",
    fiche: "Du nom de la norme de téléphonie mobile. En Suisse, c'est le natel ; au Québec, le cellulaire."
  },
  {
    expression: "Njoh",
    pays: "CM",
    theme: "argent",
    sens: "Gratuit",
    leurres: ["Très cher", "À crédit", "En solde"],
    exemple: "Le concert est njoh ce soir, on y va !",
    fiche: "Camfranglais. « Manger njoh », c'est manger sans payer.",
    prononciation: "n'djo"
  },
  {
    expression: "Fraya",
    pays: "CI",
    theme: "quotidien",
    sens: "S'enfuir, se sauver",
    leurres: ["Se reposer", "Se fâcher", "S'habiller"],
    exemple: "Quand il a vu son père arriver, il a fraya par la porte de derrière.",
    fiche: "Nouchi. On le dit aussi de quelqu'un qui part sans payer, ou qui s'éclipse d'une soirée."
  },
  {
    expression: "Une poutine",
    pays: "QC",
    theme: "manger",
    sens: "Des frites avec fromage en grains et sauce brune",
    leurres: ["Une tarte au sucre", "Un sandwich au jambon", "Une soupe aux pois"],
    exemple: "Après le show, une bonne poutine, c'est obligatoire.",
    fiche: "Le plat québécois le plus célèbre, né dans les années 1950. Le fromage doit faire « couic-couic » sous la dent."
  },
  {
    expression: "Un bana-bana",
    pays: "SN",
    theme: "argent",
    sens: "Un petit vendeur ambulant",
    leurres: ["Un grand commerçant en gros", "Un douanier", "Un changeur d'argent"],
    exemple: "Le bana-bana passe tous les jours avec ses lunettes de soleil et ses chargeurs.",
    fiche: "Mot wolof. Les bana-banas vendent un peu de tout, en circulant d'un marché à l'autre."
  },
  {
    expression: "Un rougail saucisse",
    pays: "RE",
    theme: "manger",
    sens: "Des saucisses à la tomate et au piment",
    leurres: ["Une soupe de poisson", "Des beignets de crevettes", "Un riz au curcuma"],
    exemple: "Pour le pique-nique, on emporte une marmite de rougail saucisse.",
    fiche: "Saucisses fumées, tomates, oignons, piment : le grand classique des repas de famille réunionnais."
  },
  {
    expression: "Le lakou",
    pays: "HT",
    theme: "gens",
    sens: "La cour où vit la famille élargie",
    leurres: ["Le marché du village", "La plage", "L'église du quartier"],
    exemple: "Tous les cousins ont grandi ensemble dans le même lakou.",
    fiche: "Le lakou réunit plusieurs maisons autour d'une cour commune : un modèle de vie familiale en Haïti."
  },
  {
    expression: "On est ensemble",
    pays: "BF",
    theme: "salutations",
    sens: "On se soutient, à bientôt",
    leurres: ["On se marie", "On habite ensemble", "On part ensemble"],
    exemple: "Merci pour ton aide, on est ensemble !",
    fiche: "Formule de solidarité et d'au revoir très courante au Burkina et en Côte d'Ivoire.",
    aussi: ["CI"]
  },
  {
    expression: "Des accras",
    pays: "GP",
    theme: "manger",
    sens: "Des beignets de morue",
    leurres: ["Des bananes frites", "Des boudins créoles", "Des crevettes grillées"],
    exemple: "Pour l'apéritif, des accras bien chauds et un jus de goyave.",
    fiche: "Petits beignets épicés, de morue le plus souvent, servis à toutes les fêtes antillaises.",
    aussi: ["HT"]
  },
  {
    expression: "Gâter le coin",
    pays: "CI",
    theme: "fete",
    sens: "Faire sensation, mettre le feu",
    leurres: ["Abîmer la maison", "Rentrer trop tard", "Rater son examen"],
    exemple: "Avec sa nouvelle chanson, l'artiste a gâté le coin au concert.",
    fiche: "En Côte d'Ivoire, « gâter » peut être un compliment : celui qui gâte le coin a fait très fort."
  },
  {
    expression: "Zwin",
    pays: "MA",
    theme: "emotions",
    sens: "Beau, joli",
    leurres: ["Cher", "Vieux", "Fragile"],
    exemple: "Le riad est vraiment zwin, regarde les zelliges !",
    fiche: "Darija pour tout ce qui est beau : un lieu, un vêtement, un moment.",
    aussi: ["DZ"]
  },
  {
    expression: "Chelou",
    pays: "FR",
    theme: "emotions",
    sens: "Bizarre, louche",
    leurres: ["Joli", "Rapide", "Cher"],
    exemple: "Ce type qui nous suit depuis tout à l'heure, il est chelou.",
    fiche: "Verlan de « louche ». Né dans les banlieues, il est aujourd'hui compris partout en France."
  },
  {
    expression: "Le pondu",
    pays: "CD",
    theme: "manger",
    sens: "Des feuilles de manioc pilées et mijotées",
    leurres: ["Des haricots rouges", "Un poisson grillé", "Une sauce aux arachides"],
    exemple: "Le pondu avec du poisson salé, c'est le goût de la maison.",
    fiche: "Le plat de tous les jours en RD Congo. Au Congo-Brazzaville, on dit « saka-saka »."
  },
  {
    expression: "Un chenit",
    pays: "CH",
    theme: "quotidien",
    sens: "Un désordre, un fouillis",
    leurres: ["Un petit chien", "Un chalet de montagne", "Un plat de fromage"],
    exemple: "Quel chenit dans ta chambre, on ne voit plus le sol !",
    fiche: "Mot de Suisse romande et de Savoie, pour un endroit sens dessus dessous.",
    aussi: ["FR"]
  },
  {
    expression: "Salama",
    pays: "MG",
    theme: "salutations",
    sens: "Bonjour",
    leurres: ["Merci", "À bientôt", "Bon voyage"],
    exemple: "Salama ! Tu viens de quelle région ?",
    fiche: "Salutation courante à Madagascar. On entend aussi « manao ahoana » dans les hauts plateaux.",
    prononciation: "sa-la-m'"
  },
  {
    expression: "Un louage",
    pays: "TN",
    theme: "transport",
    sens: "Un taxi collectif entre deux villes",
    leurres: ["Une voiture de location", "Un bateau pour Djerba", "Un train de banlieue"],
    exemple: "Le louage pour Sousse part dès qu'il a ses huit passagers.",
    fiche: "Minibus blancs à bande de couleur : la façon la plus courante de voyager entre les villes tunisiennes."
  },
  {
    expression: "Mwana",
    pays: "CG",
    theme: "gens",
    sens: "Un enfant",
    leurres: ["Un ancien", "Un étranger", "Un voisin"],
    exemple: "Le mwana dort, parle doucement.",
    fiche: "Mot du lingala et du kituba, qu'on retrouve dans beaucoup de langues bantoues.",
    aussi: ["CD"],
    prononciation: "mwa-na"
  },
  {
    expression: "Le bogolan",
    pays: "ML",
    theme: "quotidien",
    sens: "Un tissu teint à la boue",
    leurres: ["Un instrument à cordes", "Un plat de riz", "Une maison en terre"],
    exemple: "Elle porte une veste en bogolan achetée au marché de Bamako.",
    fiche: "Tissu de coton décoré avec de la boue fermentée et des plantes. Un savoir-faire malien devenu mode.",
    aussi: ["BF"],
    prononciation: "bo-go-lan"
  },
  {
    expression: "S'il vous plaît",
    pays: "BE",
    theme: "salutations",
    sens: "Tenez, voici (en tendant quelque chose)",
    leurres: ["Excusez-moi", "Je vous en prie, entrez", "Merci beaucoup"],
    exemple: "La serveuse pose les frites sur la table : « S'il vous plaît ! »",
    fiche: "En Belgique, on dit aussi « s'il vous plaît » en donnant quelque chose, comme le « bitte » allemand.",
    ailleurs: [{ sens: "Formule de politesse pour demander", ou: "Partout" }]
  },
  {
    expression: "Le ngomna",
    pays: "CM",
    theme: "gens",
    sens: "Le gouvernement, l'État",
    leurres: ["Le chef du village", "Le grand marché", "La police de la route"],
    exemple: "La route est cassée depuis des mois, on attend le ngomna.",
    fiche: "De l'anglais « government », passé dans le camfranglais.",
    prononciation: "n'gom-na"
  },
  {
    expression: "La fin de semaine",
    pays: "QC",
    theme: "quotidien",
    sens: "Le week-end",
    leurres: ["Le vendredi soir", "Le mois prochain", "La fin du mois"],
    exemple: "Qu'est-ce que tu fais en fin de semaine ?",
    fiche: "Au Québec, on évite l'anglais « week-end » : on part au chalet en fin de semaine."
  },
  {
    expression: "Goorgoorlu",
    pays: "SN",
    theme: "argent",
    sens: "Se débrouiller pour faire vivre sa famille",
    leurres: ["Se reposer après le travail", "Faire la fête", "Partir à l'étranger"],
    exemple: "Pas de travail fixe, alors il fait goorgoorlu tous les jours.",
    fiche: "Mot wolof devenu célèbre grâce à un personnage de BD puis de série télé, le débrouillard dakarois.",
    prononciation: "gor-gor-lou"
  },
  {
    expression: "La hogra",
    pays: "DZ",
    theme: "emotions",
    sens: "Le mépris, l'injustice des puissants",
    leurres: ["La fête de l'Aïd", "La chaleur de l'été", "La famille éloignée"],
    exemple: "Les jeunes dénoncent la hogra dans leurs chansons.",
    fiche: "Mot fort de la darja : le sentiment d'être humilié par plus puissant que soi.",
    aussi: ["MA"]
  },
  {
    expression: "L'akassa",
    pays: "BJ",
    theme: "manger",
    sens: "Une pâte de maïs fermentée",
    leurres: ["Une sauce aux arachides", "Une bière de mil", "Un beignet de haricot"],
    exemple: "L'akassa avec du poisson frit et du piment, c'est mon plat préféré.",
    fiche: "Pâte de maïs fermentée, enveloppée dans des feuilles. Très populaire au Bénin et au Togo.",
    aussi: ["TG"]
  },
  {
    expression: "Le koliko",
    pays: "TG",
    theme: "manger",
    sens: "Des frites d'igname",
    leurres: ["Une sauce au gombo", "Un gâteau de riz", "Un jus de citron"],
    exemple: "Le soir, on achète du koliko bien croustillant avec du piment.",
    fiche: "Igname coupée en bâtonnets et frite : le snack de rue préféré de Lomé."
  },
  {
    expression: "Le zouglou",
    pays: "CI",
    theme: "fete",
    sens: "Une musique née chez les étudiants d'Abidjan",
    leurres: ["Une danse de mariage du nord", "Un tambour sacré", "Une radio populaire"],
    exemple: "Ce morceau de zouglou raconte la galère des étudiants, tout le monde connaît les paroles.",
    fiche: "Né au début des années 1990 dans les cités universitaires, le zouglou raconte la vie avec humour. Magic System en est issu."
  },
  {
    expression: "Le zembrocal",
    pays: "RE",
    theme: "manger",
    sens: "Du riz au curcuma et aux haricots",
    leurres: ["Un gâteau de manioc", "Une sauce piquante", "Une salade de chou"],
    exemple: "Le zembrocal accompagne parfaitement le cari.",
    fiche: "Riz jaune au curcuma, cuit avec des haricots ou des pois : un plat de fête réunionnais."
  },
  {
    expression: "Le konpa",
    pays: "HT",
    theme: "fete",
    sens: "La musique de danse haïtienne",
    leurres: ["Un tambour vaudou", "Un carnaval", "Une chanson d'enfant"],
    exemple: "La soirée a fini sur du konpa, tout le monde dansait collé-serré.",
    fiche: "Créé dans les années 1950, le konpa est la grande musique populaire d'Haïti."
  },
  {
    expression: "Yako !",
    pays: "BF",
    theme: "emotions",
    sens: "Courage, désolé pour toi",
    leurres: ["Bravo !", "Dépêche-toi !", "Bon appétit !"],
    exemple: "Tu t'es fait voler ton vélo ? Yako, mon frère.",
    fiche: "Mot de compassion pour un petit malheur comme pour un deuil, au Burkina et en Côte d'Ivoire.",
    aussi: ["CI"]
  },
  {
    expression: "Le zouk",
    pays: "GP",
    theme: "fete",
    sens: "Une musique dansante des Antilles",
    leurres: ["Un rhum agricole", "Un carnaval de rue", "Un tambour en bois"],
    exemple: "Au bal, dès que le zouk commence, la piste se remplit.",
    fiche: "Né aux Antilles dans les années 1980, popularisé par le groupe Kassav'. « Zouk » voulait dire fête."
  },
  {
    expression: "Bssaha !",
    pays: "MA",
    theme: "manger",
    sens: "Bon appétit ! À ta santé !",
    leurres: ["Au secours !", "Bon voyage !", "Attention !"],
    exemple: "Le tajine arrive sur la table : bssaha !",
    fiche: "Mot à mot « avec la santé ». On le dit à table, mais aussi pour féliciter quelqu'un d'un nouvel achat.",
    aussi: ["DZ", "TN"],
    prononciation: "b'sa-ha"
  },
  {
    expression: "Un mâchon",
    pays: "FR",
    theme: "manger",
    sens: "Un casse-croûte lyonnais du matin",
    leurres: ["Un vin de Bourgogne", "Une brioche aux pralines", "Un fromage de chèvre"],
    exemple: "Le dimanche, mâchon à 9 h : saucisson, cervelle de canut et pot de beaujolais.",
    fiche: "Tradition lyonnaise : le repas copieux des ouvriers après la première partie de leur journée."
  },
  {
    expression: "La chikwangue",
    pays: "CD",
    theme: "manger",
    sens: "Un pain de manioc cuit dans des feuilles",
    leurres: ["Une galette de maïs", "Un beignet sucré", "Une bière de banane"],
    exemple: "Passe au marché acheter deux chikwangues pour le dîner.",
    fiche: "Pâte de manioc enveloppée dans des feuilles, qui se conserve plusieurs jours. On dit aussi « kwanga ».",
    aussi: ["CG"],
    prononciation: "chi-kwan-gué"
  },
  {
    expression: "Tout de bon !",
    pays: "CH",
    theme: "salutations",
    sens: "Bonne continuation !",
    leurres: ["Tout est réglé !", "C'est trop bon !", "Bon appétit !"],
    exemple: "Merci pour votre aide, et tout de bon !",
    fiche: "Formule romande pour se quitter en se souhaitant le meilleur."
  },
  {
    expression: "Le romazava",
    pays: "MG",
    theme: "manger",
    sens: "Un bouillon de viande aux brèdes",
    leurres: ["Un riz au lait de coco", "Une brochette de zébu", "Un jus de mangue"],
    exemple: "Un romazava bien chaud avec du riz, le plat du dimanche.",
    fiche: "Plat national malgache : viande de zébu et brèdes, ces feuilles qui picotent la langue.",
    prononciation: "rou-ma-zav'"
  },
  {
    expression: "Une brik",
    pays: "TN",
    theme: "manger",
    sens: "Une feuille croustillante farcie à l'œuf",
    leurres: ["Un gâteau aux dattes", "Une soupe de pois chiches", "Un pain rond"],
    exemple: "Mange ta brik par le coin, sinon le jaune coule partout !",
    fiche: "Feuille de pâte frite, garnie d'un œuf, de thon ou de pommes de terre. Un incontournable du ramadan."
  },
  {
    expression: "Une loque",
    pays: "BE",
    theme: "quotidien",
    sens: "Une serpillière",
    leurres: ["Un vieux pull", "Un chiffon à poussière", "Un tapis de bain"],
    exemple: "Passe la loque dans la cuisine, il y a de l'eau partout.",
    fiche: "Belgicisme. En Suisse, c'est la panosse ; dans le Nord, la wassingue."
  },
  {
    expression: "Le bobolo",
    pays: "CM",
    theme: "manger",
    sens: "Un bâton de manioc cuit dans des feuilles",
    leurres: ["Un beignet de haricot", "Une brochette de bœuf", "Une banane braisée"],
    exemple: "Un poisson braisé avec du bobolo, et c'est la fête.",
    fiche: "Pâte de manioc roulée et cuite dans des feuilles. On le vend en longs bâtons au bord des routes."
  },
  {
    expression: "Être en beau fusil",
    pays: "QC",
    theme: "emotions",
    sens: "Être très fâché",
    leurres: ["Être bien habillé", "Être pressé", "Être chanceux"],
    exemple: "Quand il a vu sa voiture rayée, il était en beau fusil.",
    fiche: "Québécisme imagé : la colère part comme un coup de fusil."
  },
  {
    expression: "Waaw",
    pays: "SN",
    theme: "salutations",
    sens: "Oui",
    leurres: ["Non", "Peut-être", "Attends"],
    exemple: "— Tu viens ce soir ? — Waaw, je serai là.",
    fiche: "Le oui wolof. Le non se dit « déedéet ».",
    prononciation: "wa-ou"
  },
  {
    expression: "Un apprenti",
    pays: "CI",
    theme: "transport",
    sens: "Le jeune qui encaisse et appelle les passagers d'un gbaka",
    leurres: ["Un élève conducteur", "Un vendeur de tickets de bus", "Un agent de la circulation"],
    exemple: "L'apprenti est accroché à la portière et crie « Adjamé ! Adjamé ! ».",
    fiche: "Sur les gbakas d'Abidjan, l'apprenti fait tout : il rabat les passagers, encaisse et annonce les arrêts.",
    ailleurs: [{ sens: "Une personne qui apprend un métier", ou: "Partout" }]
  }
];
