/*
 * Tchip — base d'expressions
 * Chaque entrée : expression, pays (code ci-dessous), sens (la bonne réponse),
 * leurres (3 mauvaises réponses plausibles), exemple, fiche (contexte court).
 * L'ordre du tableau = l'ordre de passage des jours (#1, #2, #3…).
 * Pour ajouter une expression : voir CONTRIBUER.md.
 */
window.TCHIP_PAYS = {
  CI: { nom: "Côte d'Ivoire", drapeau: "🇨🇮" },
  CM: { nom: "Cameroun", drapeau: "🇨🇲" },
  SN: { nom: "Sénégal", drapeau: "🇸🇳" },
  CD: { nom: "RD Congo", drapeau: "🇨🇩" },
  BE: { nom: "Belgique", drapeau: "🇧🇪" },
  CH: { nom: "Suisse", drapeau: "🇨🇭" },
  FR: { nom: "France", drapeau: "🇫🇷" },
  QC: { nom: "Québec", drapeau: "🇨🇦" },
  DZ: { nom: "Algérie", drapeau: "🇩🇿" },
  RE: { nom: "La Réunion", drapeau: "🇷🇪" }
};

window.TCHIP_EXPRESSIONS = [
  {
    expression: "Être enjaillé",
    pays: "CI",
    sens: "Être tout excité, s'éclater",
    leurres: ["Être épuisé après le travail", "Être en retard", "Être coincé dans les embouteillages"],
    exemple: "Le DJ a lancé le son, tout le monde était enjaillé.",
    fiche: "Mot du français ivoirien, tiré de l'anglais « enjoy ». On dit aussi « s'enjailler » et « enjaillement »."
  },
  {
    expression: "Une drache",
    pays: "BE",
    sens: "Une grosse averse",
    leurres: ["Une dispute de famille", "Une gaufre sucrée", "Une bière forte"],
    exemple: "Prends ton parapluie, il va tomber une drache.",
    fiche: "Belgicisme très courant, aussi entendu dans le nord de la France. On dit même « il drache »."
  },
  {
    expression: "Mbenguiste",
    pays: "CM",
    sens: "Une personne qui vit en Europe",
    leurres: ["Un joueur de foot professionnel", "Une vendeuse du marché", "Un musicien de bikutsi"],
    exemple: "Le mbenguiste est rentré pour les vacances avec des cadeaux pour tout le quartier.",
    fiche: "Camfranglais. « Mbeng » désigne l'Europe, la France en particulier, et le mbenguiste celui qui y est parti."
  },
  {
    expression: "Tarpin",
    pays: "FR",
    sens: "Très, beaucoup",
    leurres: ["Pas du tout", "Peut-être", "Hier soir"],
    exemple: "Elle est tarpin bonne, la pizza de ce camion.",
    fiche: "Expression marseillaise. « C'est tarpin loin » : c'est vraiment très loin."
  },
  {
    expression: "Teranga",
    pays: "SN",
    sens: "L'hospitalité, l'accueil chaleureux",
    leurres: ["Le marché du dimanche", "La saison des pluies", "Un plat de fête"],
    exemple: "Reste manger avec nous, c'est la teranga !",
    fiche: "Mot wolof devenu une fierté nationale. L'équipe de foot du Sénégal s'appelle les Lions de la Teranga."
  },
  {
    expression: "Ça joue ?",
    pays: "CH",
    sens: "Ça va ? C'est d'accord ?",
    leurres: ["On va jouer au foot ?", "Tu sais chanter ?", "Il pleut dehors ?"],
    exemple: "On se retrouve à 18 h devant la gare, ça joue ?",
    fiche: "Tournure romande. « Ça joue » veut dire « ça marche, c'est bon »."
  },
  {
    expression: "Deuxième bureau",
    pays: "CD",
    sens: "Une maîtresse, une relation cachée",
    leurres: ["Un deuxième emploi", "Un bureau de vote", "Une salle de réunion"],
    exemple: "Il dit qu'il fait des heures sup, mais tout le monde sait qu'il est chez son deuxième bureau.",
    fiche: "Très courant à Kinshasa et dans toute l'Afrique francophone. Le « premier bureau », c'est la femme officielle."
  },
  {
    expression: "Être tanné",
    pays: "QC",
    sens: "En avoir marre",
    leurres: ["Être bronzé", "Être riche", "Être malade"],
    exemple: "Je suis tanné de l'hiver, j'ai hâte au printemps.",
    fiche: "Québécisme du quotidien. « Être tanné de quelque chose », c'est ne plus le supporter."
  },
  {
    expression: "Gaou",
    pays: "CI",
    sens: "Une personne naïve, qui se fait avoir",
    leurres: ["Un grand frère respecté", "Un riche commerçant", "Un très bon danseur"],
    exemple: "Il a payé trois fois le prix, c'est un vrai gaou.",
    fiche: "Nouchi rendu célèbre dans toute l'Afrique par la chanson « Premier Gaou » de Magic System."
  },
  {
    expression: "Hittiste",
    pays: "DZ",
    sens: "Un jeune sans emploi qui « tient les murs »",
    leurres: ["Un chanteur à succès", "Un chauffeur de taxi", "Un fan de football"],
    exemple: "Dans le quartier, les hittistes refont le monde toute la journée.",
    fiche: "De l'arabe dialectal « hit », le mur. Mot passé dans le français d'Algérie et repris dans les dictionnaires."
  },
  {
    expression: "Un kot",
    pays: "BE",
    sens: "Une chambre d'étudiant",
    leurres: ["Un petit café", "Un costume", "Une vieille voiture"],
    exemple: "Je rentre le week-end, la semaine je dors dans mon kot à Louvain.",
    fiche: "Belgicisme. On « kote » quand on loue une chambre près de son université."
  },
  {
    expression: "Long crayon",
    pays: "CM",
    sens: "Une personne très diplômée",
    leurres: ["Un menteur", "Une personne très grande", "Un écrivain de lettres d'amour"],
    exemple: "Demande au long crayon de la famille, il saura remplir le formulaire.",
    fiche: "Expression camerounaise : plus le crayon est long, plus on a fait de longues études."
  },
  {
    expression: "Ndank ndank",
    pays: "SN",
    sens: "Doucement, petit à petit",
    leurres: ["Vite, dépêche-toi", "Tout droit", "Pas du tout"],
    exemple: "Ne t'inquiète pas pour le chantier, ndank ndank on va y arriver.",
    fiche: "Wolof. Le proverbe dit qu'on attrape le singe doucement, petit à petit."
  },
  {
    expression: "Avoir le seum",
    pays: "FR",
    sens: "Être dégoûté, frustré",
    leurres: ["Avoir sommeil", "Avoir de la chance", "Avoir très faim"],
    exemple: "On a perdu à la dernière minute, j'ai trop le seum.",
    fiche: "Argot français venu de l'arabe, où le mot évoque le poison. Très utilisé par les jeunes."
  },
  {
    expression: "Une panosse",
    pays: "CH",
    sens: "Une serpillière",
    leurres: ["Une grosse tartine", "Une paresseuse", "Une poêle"],
    exemple: "Passe un coup de panosse, il y a de la boue partout.",
    fiche: "Mot de Suisse romande et de Savoie. On dit aussi « panosser » pour laver le sol."
  },
  {
    expression: "Zoreil",
    pays: "RE",
    sens: "Un métropolitain installé sur l'île",
    leurres: ["Un pêcheur de nuit", "Une personne qui écoute aux portes", "Un vendeur de samoussas"],
    exemple: "Le nouveau prof est un zoreil, il arrive de Lyon.",
    fiche: "On raconte que les nouveaux venus tendaient l'oreille pour comprendre le créole."
  },
  {
    expression: "Ya fohi",
    pays: "CI",
    sens: "Il n'y a pas de problème",
    leurres: ["Il fait très chaud", "On n'a plus d'argent", "Je suis fatigué"],
    exemple: "Tu es en retard ? Ya fohi, on t'attend.",
    fiche: "Nouchi. Mot à mot, « il n'y a rien »."
  },
  {
    expression: "Sapeur",
    pays: "CD",
    sens: "Un adepte de l'élégance vestimentaire extrême",
    leurres: ["Un pompier", "Un vendeur de chaussures", "Un danseur de rumba"],
    exemple: "Le dimanche, les sapeurs défilent en costume trois pièces.",
    fiche: "Vient de la SAPE, Société des ambianceurs et des personnes élégantes, née entre Kinshasa et Brazzaville."
  },
  {
    expression: "Magasiner",
    pays: "QC",
    sens: "Faire du shopping",
    leurres: ["Ranger son garage", "Tenir une boutique", "Faire des réserves"],
    exemple: "Samedi, on va magasiner au centre d'achats.",
    fiche: "Québécisme qui évite l'anglicisme « shopping ». On fait aussi du « lèche-vitrine »."
  },
  {
    expression: "Bayam-sellam",
    pays: "CM",
    sens: "Une revendeuse de vivres au marché",
    leurres: ["Une coiffeuse de rue", "Une chanteuse de cabaret", "Une maîtresse d'école"],
    exemple: "La bayam-sellam est arrivée à 5 h pour acheter les plantains aux camions.",
    fiche: "De l'anglais « buy 'em, sell 'em » : acheter pour revendre. Un pilier des marchés camerounais."
  },
  {
    expression: "Avoir bon",
    pays: "BE",
    sens: "Se sentir bien, prendre du plaisir",
    leurres: ["Avoir une bonne note", "Avoir raison", "Avoir faim"],
    exemple: "Au soleil sur la terrasse, j'ai bon.",
    fiche: "Belgicisme chaleureux. « T'as bon ? » demande si tout va bien pour toi."
  },
  {
    expression: "Peuchère",
    pays: "FR",
    sens: "Le pauvre ! (compassion)",
    leurres: ["Quelle chance !", "Dépêche-toi !", "Quel menteur !"],
    exemple: "Il a raté son bus sous la pluie, peuchère.",
    fiche: "Interjection provençale, de Marseille à Nîmes, pour plaindre quelqu'un avec tendresse."
  },
  {
    expression: "Brouteur",
    pays: "CI",
    sens: "Un arnaqueur sur internet",
    leurres: ["Un vendeur de légumes", "Un fan de foot", "Un chauffeur de taxi"],
    exemple: "Fais attention à ce faux profil, c'est sûrement un brouteur.",
    fiche: "On l'explique souvent par l'image du mouton qui broute sans effort : le brouteur « broute » l'argent des autres."
  },
  {
    expression: "Essencerie",
    pays: "SN",
    sens: "Une station-service",
    leurres: ["Une boutique de parfums", "Un garage de motos", "Une pharmacie"],
    exemple: "Arrête-toi à l'essencerie, on est presque à sec.",
    fiche: "Mot du français du Sénégal, aussi entendu dans d'autres pays d'Afrique de l'Ouest."
  },
  {
    expression: "Le natel",
    pays: "CH",
    sens: "Le téléphone portable",
    leurres: ["Le maillot de bain", "La fondue", "Le bus de nuit"],
    exemple: "Donne-moi ton numéro de natel, je t'envoie l'adresse.",
    fiche: "Nom d'un ancien réseau mobile suisse devenu le mot de tous les jours pour le portable."
  },
  {
    expression: "Tchoko",
    pays: "CM",
    sens: "Un pot-de-vin",
    leurres: ["Du chocolat chaud", "Une danse", "Un petit enfant"],
    exemple: "Sans tchoko, ton dossier ne bougera pas.",
    fiche: "Camfranglais. Le mot sert souvent à dénoncer la petite corruption."
  },
  {
    expression: "Un gone",
    pays: "FR",
    sens: "Un enfant, un gamin",
    leurres: ["Un supporter de foot", "Un vieux monsieur", "Un ouvrier de la soie"],
    exemple: "Les gones jouent dans la cour depuis ce matin.",
    fiche: "Mot lyonnais. On le retrouve dans le roman « Le Gone du Chaâba » d'Azouz Begag."
  },
  {
    expression: "Ma blonde",
    pays: "QC",
    sens: "Ma petite amie",
    leurres: ["Ma bière", "Ma voiture", "Ma sœur"],
    exemple: "Je te présente ma blonde, on sort ensemble depuis l'été.",
    fiche: "Au Québec, ta blonde est ta copine, quelle que soit la couleur de ses cheveux. Le copain, c'est le « chum »."
  },
  {
    expression: "Toubab",
    pays: "SN",
    sens: "Un Blanc, un étranger occidental",
    leurres: ["Un grand marabout", "Un taxi collectif", "Un plat de riz"],
    exemple: "Les enfants criaient « toubab ! » en voyant les touristes passer.",
    fiche: "Mot employé dans plusieurs pays d'Afrique de l'Ouest, souvent sans méchanceté."
  },
  {
    expression: "Je ne sais pas venir",
    pays: "BE",
    sens: "Je ne peux pas venir",
    leurres: ["J'ignore le chemin", "Je n'ai pas envie", "Je viendrai plus tard"],
    exemple: "Désolé, ce soir je ne sais pas venir, je garde les enfants.",
    fiche: "En Belgique, « savoir » s'emploie souvent pour « pouvoir »."
  },
  {
    expression: "Faire le boucan",
    pays: "CI",
    sens: "Frimer, étaler son argent",
    leurres: ["Faire du bruit la nuit", "Cuisiner au feu de bois", "Se battre"],
    exemple: "Il est arrivé en grosse voiture pour faire le boucan devant tout le monde.",
    fiche: "Nouchi. Le « boucantier » est celui qui en met plein la vue, figure très liée au coupé-décalé."
  },
  {
    expression: "Le daron",
    pays: "FR",
    sens: "Le père",
    leurres: ["Le patron du bar", "Le grand frère", "Le chauffeur"],
    exemple: "Je ne peux pas sortir, mon daron veut que je révise.",
    fiche: "Vieil argot remis au goût du jour. La mère, c'est la « daronne », les deux parents « les darons »."
  },
  {
    expression: "Un cornet",
    pays: "CH",
    sens: "Un sac en plastique ou en papier",
    leurres: ["Une glace", "Une trompette", "Un chapeau pointu"],
    exemple: "Vous voulez un cornet pour vos courses ?",
    fiche: "Suisse romande. Au supermarché, on vous propose un cornet, pas un sachet."
  },
  {
    expression: "Mange-mille",
    pays: "CM",
    sens: "Un policier qui réclame des petits billets",
    leurres: ["Un gros mangeur", "Un vendeur de beignets", "Un millionnaire"],
    exemple: "Au carrefour, le mange-mille arrête tous les taxis.",
    fiche: "Expression camerounaise : le billet de 1 000 francs CFA glissé pour éviter une amende."
  },
  {
    expression: "Dibiterie",
    pays: "SN",
    sens: "Un restaurant de viande grillée",
    leurres: ["Une boulangerie", "Un salon de coiffure", "Une boutique de tissus"],
    exemple: "On finit la soirée à la dibiterie du coin, ils font le meilleur mouton.",
    fiche: "Du wolof « dibi », la viande grillée. Une institution des nuits dakaroises."
  },
  {
    expression: "C'est du brol",
    pays: "BE",
    sens: "C'est du bazar, du fouillis",
    leurres: ["C'est délicieux", "C'est trop cher", "C'est très ancien"],
    exemple: "Range ta chambre, c'est du brol partout.",
    fiche: "Belgicisme d'origine flamande. Un « brol » peut aussi être un truc sans valeur."
  },
  {
    expression: "Une poche",
    pays: "FR",
    sens: "Un sac en plastique",
    leurres: ["Une petite piscine", "Un portefeuille", "Une casquette"],
    exemple: "Mets les pommes dans une poche, je les porte.",
    fiche: "Dans le Sud-Ouest, on demande une poche à la caisse. Les mêmes disent aussi « chocolatine »."
  },
  {
    expression: "Faire coop",
    pays: "CD",
    sens: "Faire une petite combine pour se débrouiller",
    leurres: ["Travailler à la ferme", "Donner un coup de poing", "Retrouver un ami d'enfance"],
    exemple: "Il n'a pas de travail fixe, il fait coop au marché.",
    fiche: "Kinois. La « coop » regroupe toutes les petites affaires qui permettent de tenir jusqu'à la fin du mois."
  }
];
