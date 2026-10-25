/*
 * Tchip — base d'expressions
 * Chaque entrée : expression, pays (code ci-dessous), sens (la bonne réponse),
 * leurres (3 mauvaises réponses plausibles), exemple, fiche (contexte court).
 * L'ordre du tableau = l'ordre de passage des jours (#1, #2, #3…).
 * Pour ajouter une expression : voir CONTRIBUER.md.
 */
window.TCHIP_PAYS = {
  "CI": {
    "nom": "Côte d'Ivoire",
    "drapeau": "🇨🇮"
  },
  "CM": {
    "nom": "Cameroun",
    "drapeau": "🇨🇲"
  },
  "SN": {
    "nom": "Sénégal",
    "drapeau": "🇸🇳"
  },
  "CD": {
    "nom": "RD Congo",
    "drapeau": "🇨🇩"
  },
  "BE": {
    "nom": "Belgique",
    "drapeau": "🇧🇪"
  },
  "CH": {
    "nom": "Suisse",
    "drapeau": "🇨🇭"
  },
  "FR": {
    "nom": "France",
    "drapeau": "🇫🇷"
  },
  "QC": {
    "nom": "Québec",
    "drapeau": "🇨🇦"
  },
  "DZ": {
    "nom": "Algérie",
    "drapeau": "🇩🇿"
  },
  "RE": {
    "nom": "La Réunion",
    "drapeau": "🇷🇪"
  },
  "BF": {
    "nom": "Burkina Faso",
    "drapeau": "🇧🇫"
  },
  "CG": {
    "nom": "Congo-Brazzaville",
    "drapeau": "🇨🇬"
  },
  "BJ": {
    "nom": "Bénin",
    "drapeau": "🇧🇯"
  },
  "TG": {
    "nom": "Togo",
    "drapeau": "🇹🇬"
  },
  "TD": {
    "nom": "Tchad",
    "drapeau": "🇹🇩"
  },
  "ML": {
    "nom": "Mali",
    "drapeau": "🇲🇱"
  },
  "HT": {
    "nom": "Haïti",
    "drapeau": "🇭🇹"
  },
  "GP": {
    "nom": "Antilles",
    "drapeau": "🇬🇵"
  },
  "MA": {
    "nom": "Maroc",
    "drapeau": "🇲🇦"
  }
};

window.TCHIP_EXPRESSIONS = [
  {
    "expression": "Être enjaillé",
    "pays": "CI",
    "sens": "Être tout excité, s'éclater",
    "leurres": [
      "Être épuisé après le travail",
      "Être en retard",
      "Être coincé dans les embouteillages"
    ],
    "exemple": "Le DJ a lancé le son, tout le monde était enjaillé.",
    "fiche": "Mot du français ivoirien, tiré de l'anglais « enjoy ». On dit aussi « s'enjailler » et « enjaillement »."
  },
  {
    "expression": "Une drache",
    "pays": "BE",
    "sens": "Une grosse averse",
    "leurres": [
      "Une dispute de famille",
      "Une gaufre sucrée",
      "Une bière forte"
    ],
    "exemple": "Prends ton parapluie, il va tomber une drache.",
    "fiche": "Belgicisme très courant, aussi entendu dans le nord de la France. On dit même « il drache »."
  },
  {
    "expression": "Mbenguiste",
    "pays": "CM",
    "sens": "Une personne qui vit en Europe",
    "leurres": [
      "Un joueur de foot professionnel",
      "Une vendeuse du marché",
      "Un musicien de bikutsi"
    ],
    "exemple": "Le mbenguiste est rentré pour les vacances avec des cadeaux pour tout le quartier.",
    "fiche": "Camfranglais. « Mbeng » désigne l'Europe, la France en particulier, et le mbenguiste celui qui y est parti."
  },
  {
    "expression": "Tarpin",
    "pays": "FR",
    "sens": "Très, beaucoup",
    "leurres": [
      "Pas du tout",
      "Peut-être",
      "Hier soir"
    ],
    "exemple": "Elle est tarpin bonne, la pizza de ce camion.",
    "fiche": "Expression marseillaise. « C'est tarpin loin » : c'est vraiment très loin."
  },
  {
    "expression": "Teranga",
    "pays": "SN",
    "sens": "L'hospitalité, l'accueil chaleureux",
    "leurres": [
      "Le marché du dimanche",
      "La saison des pluies",
      "Un plat de fête"
    ],
    "exemple": "Reste manger avec nous, c'est la teranga !",
    "fiche": "Mot wolof devenu une fierté nationale. L'équipe de foot du Sénégal s'appelle les Lions de la Teranga."
  },
  {
    "expression": "Ça joue ?",
    "pays": "CH",
    "sens": "Ça va ? C'est d'accord ?",
    "leurres": [
      "On va jouer au foot ?",
      "Tu sais chanter ?",
      "Il pleut dehors ?"
    ],
    "exemple": "On se retrouve à 18 h devant la gare, ça joue ?",
    "fiche": "Tournure romande. « Ça joue » veut dire « ça marche, c'est bon »."
  },
  {
    "expression": "Deuxième bureau",
    "pays": "CD",
    "sens": "Une maîtresse, une relation cachée",
    "leurres": [
      "Un deuxième emploi",
      "Un bureau de vote",
      "Une salle de réunion"
    ],
    "exemple": "Il dit qu'il fait des heures sup, mais tout le monde sait qu'il est chez son deuxième bureau.",
    "fiche": "Très courant à Kinshasa et dans toute l'Afrique francophone. Le « premier bureau », c'est la femme officielle."
  },
  {
    "expression": "Être tanné",
    "pays": "QC",
    "sens": "En avoir marre",
    "leurres": [
      "Être bronzé",
      "Être riche",
      "Être malade"
    ],
    "exemple": "Je suis tanné de l'hiver, j'ai hâte au printemps.",
    "fiche": "Québécisme du quotidien. « Être tanné de quelque chose », c'est ne plus le supporter."
  },
  {
    "expression": "Gaou",
    "pays": "CI",
    "sens": "Une personne naïve, qui se fait avoir",
    "leurres": [
      "Un grand frère respecté",
      "Un riche commerçant",
      "Un très bon danseur"
    ],
    "exemple": "Il a payé trois fois le prix, c'est un vrai gaou.",
    "fiche": "Nouchi rendu célèbre dans toute l'Afrique par la chanson « Premier Gaou » de Magic System."
  },
  {
    "expression": "Hittiste",
    "pays": "DZ",
    "sens": "Un jeune sans emploi qui « tient les murs »",
    "leurres": [
      "Un chanteur à succès",
      "Un chauffeur de taxi",
      "Un fan de football"
    ],
    "exemple": "Dans le quartier, les hittistes refont le monde toute la journée.",
    "fiche": "De l'arabe dialectal « hit », le mur. Mot passé dans le français d'Algérie et repris dans les dictionnaires."
  },
  {
    "expression": "Un kot",
    "pays": "BE",
    "sens": "Une chambre d'étudiant",
    "leurres": [
      "Un petit café",
      "Un costume",
      "Une vieille voiture"
    ],
    "exemple": "Je rentre le week-end, la semaine je dors dans mon kot à Louvain.",
    "fiche": "Belgicisme. On « kote » quand on loue une chambre près de son université."
  },
  {
    "expression": "Long crayon",
    "pays": "CM",
    "sens": "Une personne très diplômée",
    "leurres": [
      "Un menteur",
      "Une personne très grande",
      "Un écrivain de lettres d'amour"
    ],
    "exemple": "Demande au long crayon de la famille, il saura remplir le formulaire.",
    "fiche": "Expression camerounaise : plus le crayon est long, plus on a fait de longues études."
  },
  {
    "expression": "Ndank ndank",
    "pays": "SN",
    "sens": "Doucement, petit à petit",
    "leurres": [
      "Vite, dépêche-toi",
      "Tout droit",
      "Pas du tout"
    ],
    "exemple": "Ne t'inquiète pas pour le chantier, ndank ndank on va y arriver.",
    "fiche": "Wolof. Le proverbe dit qu'on attrape le singe doucement, petit à petit."
  },
  {
    "expression": "Avoir le seum",
    "pays": "FR",
    "sens": "Être dégoûté, frustré",
    "leurres": [
      "Avoir sommeil",
      "Avoir de la chance",
      "Avoir très faim"
    ],
    "exemple": "On a perdu à la dernière minute, j'ai trop le seum.",
    "fiche": "Argot français venu de l'arabe, où le mot évoque le poison. Très utilisé par les jeunes."
  },
  {
    "expression": "Une panosse",
    "pays": "CH",
    "sens": "Une serpillière",
    "leurres": [
      "Une grosse tartine",
      "Une paresseuse",
      "Une poêle"
    ],
    "exemple": "Passe un coup de panosse, il y a de la boue partout.",
    "fiche": "Mot de Suisse romande et de Savoie. On dit aussi « panosser » pour laver le sol."
  },
  {
    "expression": "Zoreil",
    "pays": "RE",
    "sens": "Un métropolitain installé sur l'île",
    "leurres": [
      "Un pêcheur de nuit",
      "Une personne qui écoute aux portes",
      "Un vendeur de samoussas"
    ],
    "exemple": "Le nouveau prof est un zoreil, il arrive de Lyon.",
    "fiche": "On raconte que les nouveaux venus tendaient l'oreille pour comprendre le créole."
  },
  {
    "expression": "Ya fohi",
    "pays": "CI",
    "sens": "Il n'y a pas de problème",
    "leurres": [
      "Il fait très chaud",
      "On n'a plus d'argent",
      "Je suis fatigué"
    ],
    "exemple": "Tu es en retard ? Ya fohi, on t'attend.",
    "fiche": "Nouchi. Mot à mot, « il n'y a rien »."
  },
  {
    "expression": "Sapeur",
    "pays": "CD",
    "sens": "Un adepte de l'élégance vestimentaire extrême",
    "leurres": [
      "Un pompier",
      "Un vendeur de chaussures",
      "Un danseur de rumba"
    ],
    "exemple": "Le dimanche, les sapeurs défilent en costume trois pièces.",
    "fiche": "Vient de la SAPE, Société des ambianceurs et des personnes élégantes, née entre Kinshasa et Brazzaville."
  },
  {
    "expression": "Magasiner",
    "pays": "QC",
    "sens": "Faire du shopping",
    "leurres": [
      "Ranger son garage",
      "Tenir une boutique",
      "Faire des réserves"
    ],
    "exemple": "Samedi, on va magasiner au centre d'achats.",
    "fiche": "Québécisme qui évite l'anglicisme « shopping ». On fait aussi du « lèche-vitrine »."
  },
  {
    "expression": "Bayam-sellam",
    "pays": "CM",
    "sens": "Une revendeuse de vivres au marché",
    "leurres": [
      "Une coiffeuse de rue",
      "Une chanteuse de cabaret",
      "Une maîtresse d'école"
    ],
    "exemple": "La bayam-sellam est arrivée à 5 h pour acheter les plantains aux camions.",
    "fiche": "De l'anglais « buy 'em, sell 'em » : acheter pour revendre. Un pilier des marchés camerounais."
  },
  {
    "expression": "Avoir bon",
    "pays": "BE",
    "sens": "Se sentir bien, prendre du plaisir",
    "leurres": [
      "Avoir une bonne note",
      "Avoir raison",
      "Avoir faim"
    ],
    "exemple": "Au soleil sur la terrasse, j'ai bon.",
    "fiche": "Belgicisme chaleureux. « T'as bon ? » demande si tout va bien pour toi."
  },
  {
    "expression": "Peuchère",
    "pays": "FR",
    "sens": "Le pauvre ! (compassion)",
    "leurres": [
      "Quelle chance !",
      "Dépêche-toi !",
      "Quel menteur !"
    ],
    "exemple": "Il a raté son bus sous la pluie, peuchère.",
    "fiche": "Interjection provençale, de Marseille à Nîmes, pour plaindre quelqu'un avec tendresse."
  },
  {
    "expression": "Brouteur",
    "pays": "CI",
    "sens": "Un arnaqueur sur internet",
    "leurres": [
      "Un vendeur de légumes",
      "Un fan de foot",
      "Un chauffeur de taxi"
    ],
    "exemple": "Fais attention à ce faux profil, c'est sûrement un brouteur.",
    "fiche": "On l'explique souvent par l'image du mouton qui broute sans effort : le brouteur « broute » l'argent des autres."
  },
  {
    "expression": "Essencerie",
    "pays": "SN",
    "sens": "Une station-service",
    "leurres": [
      "Une boutique de parfums",
      "Un garage de motos",
      "Une pharmacie"
    ],
    "exemple": "Arrête-toi à l'essencerie, on est presque à sec.",
    "fiche": "Mot du français du Sénégal, aussi entendu dans d'autres pays d'Afrique de l'Ouest."
  },
  {
    "expression": "Le natel",
    "pays": "CH",
    "sens": "Le téléphone portable",
    "leurres": [
      "Le maillot de bain",
      "La fondue",
      "Le bus de nuit"
    ],
    "exemple": "Donne-moi ton numéro de natel, je t'envoie l'adresse.",
    "fiche": "Nom d'un ancien réseau mobile suisse devenu le mot de tous les jours pour le portable."
  },
  {
    "expression": "Tchoko",
    "pays": "CM",
    "sens": "Un pot-de-vin",
    "leurres": [
      "Du chocolat chaud",
      "Une danse",
      "Un petit enfant"
    ],
    "exemple": "Sans tchoko, ton dossier ne bougera pas.",
    "fiche": "Camfranglais. Le mot sert souvent à dénoncer la petite corruption."
  },
  {
    "expression": "Un gone",
    "pays": "FR",
    "sens": "Un enfant, un gamin",
    "leurres": [
      "Un supporter de foot",
      "Un vieux monsieur",
      "Un ouvrier de la soie"
    ],
    "exemple": "Les gones jouent dans la cour depuis ce matin.",
    "fiche": "Mot lyonnais. On le retrouve dans le roman « Le Gone du Chaâba » d'Azouz Begag."
  },
  {
    "expression": "Ma blonde",
    "pays": "QC",
    "sens": "Ma petite amie",
    "leurres": [
      "Ma bière",
      "Ma voiture",
      "Ma sœur"
    ],
    "exemple": "Je te présente ma blonde, on sort ensemble depuis l'été.",
    "fiche": "Au Québec, ta blonde est ta copine, quelle que soit la couleur de ses cheveux. Le copain, c'est le « chum »."
  },
  {
    "expression": "Toubab",
    "pays": "SN",
    "sens": "Un Blanc, un étranger occidental",
    "leurres": [
      "Un grand marabout",
      "Un taxi collectif",
      "Un plat de riz"
    ],
    "exemple": "Les enfants criaient « toubab ! » en voyant les touristes passer.",
    "fiche": "Mot employé dans plusieurs pays d'Afrique de l'Ouest, souvent sans méchanceté."
  },
  {
    "expression": "Je ne sais pas venir",
    "pays": "BE",
    "sens": "Je ne peux pas venir",
    "leurres": [
      "J'ignore le chemin",
      "Je n'ai pas envie",
      "Je viendrai plus tard"
    ],
    "exemple": "Désolé, ce soir je ne sais pas venir, je garde les enfants.",
    "fiche": "En Belgique, « savoir » s'emploie souvent pour « pouvoir »."
  },
  {
    "expression": "Faire le boucan",
    "pays": "CI",
    "sens": "Frimer, étaler son argent",
    "leurres": [
      "Faire du bruit la nuit",
      "Cuisiner au feu de bois",
      "Se battre"
    ],
    "exemple": "Il est arrivé en grosse voiture pour faire le boucan devant tout le monde.",
    "fiche": "Nouchi. Le « boucantier » est celui qui en met plein la vue, figure très liée au coupé-décalé."
  },
  {
    "expression": "Le daron",
    "pays": "FR",
    "sens": "Le père",
    "leurres": [
      "Le patron du bar",
      "Le grand frère",
      "Le chauffeur"
    ],
    "exemple": "Je ne peux pas sortir, mon daron veut que je révise.",
    "fiche": "Vieil argot remis au goût du jour. La mère, c'est la « daronne », les deux parents « les darons »."
  },
  {
    "expression": "Un cornet",
    "pays": "CH",
    "sens": "Un sac en plastique ou en papier",
    "leurres": [
      "Une glace",
      "Une trompette",
      "Un chapeau pointu"
    ],
    "exemple": "Vous voulez un cornet pour vos courses ?",
    "fiche": "Suisse romande. Au supermarché, on vous propose un cornet, pas un sachet."
  },
  {
    "expression": "Mange-mille",
    "pays": "CM",
    "sens": "Un policier qui réclame des petits billets",
    "leurres": [
      "Un gros mangeur",
      "Un vendeur de beignets",
      "Un millionnaire"
    ],
    "exemple": "Au carrefour, le mange-mille arrête tous les taxis.",
    "fiche": "Expression camerounaise : le billet de 1 000 francs CFA glissé pour éviter une amende."
  },
  {
    "expression": "Dibiterie",
    "pays": "SN",
    "sens": "Un restaurant de viande grillée",
    "leurres": [
      "Une boulangerie",
      "Un salon de coiffure",
      "Une boutique de tissus"
    ],
    "exemple": "On finit la soirée à la dibiterie du coin, ils font le meilleur mouton.",
    "fiche": "Du wolof « dibi », la viande grillée. Une institution des nuits dakaroises."
  },
  {
    "expression": "C'est du brol",
    "pays": "BE",
    "sens": "C'est du bazar, du fouillis",
    "leurres": [
      "C'est délicieux",
      "C'est trop cher",
      "C'est très ancien"
    ],
    "exemple": "Range ta chambre, c'est du brol partout.",
    "fiche": "Belgicisme d'origine flamande. Un « brol » peut aussi être un truc sans valeur."
  },
  {
    "expression": "Une poche",
    "pays": "FR",
    "sens": "Un sac en plastique",
    "leurres": [
      "Une petite piscine",
      "Un portefeuille",
      "Une casquette"
    ],
    "exemple": "Mets les pommes dans une poche, je les porte.",
    "fiche": "Dans le Sud-Ouest, on demande une poche à la caisse. Les mêmes disent aussi « chocolatine »."
  },
  {
    "expression": "Faire coop",
    "pays": "CD",
    "sens": "Faire une petite combine pour se débrouiller",
    "leurres": [
      "Travailler à la ferme",
      "Donner un coup de poing",
      "Retrouver un ami d'enfance"
    ],
    "exemple": "Il n'a pas de travail fixe, il fait coop au marché.",
    "fiche": "Kinois. La « coop » regroupe toutes les petites affaires qui permettent de tenir jusqu'à la fin du mois."
  },
  {
    "expression": "Motamoter",
    "pays": "CM",
    "sens": "Réciter par cœur sans comprendre",
    "leurres": [
      "Parler très vite",
      "Écrire des poèmes",
      "Traduire mot à mot une chanson"
    ],
    "exemple": "Il ne comprend rien à la leçon, il motamote juste.",
    "fiche": "Camerounais, de « mot à mot ». Le reproche classique des professeurs."
  },
  {
    "expression": "Quétaine",
    "pays": "QC",
    "sens": "Ringard, de mauvais goût",
    "leurres": [
      "Très cher",
      "Amusant",
      "Bien cuisiné"
    ],
    "exemple": "Sa chemise à fleurs est vraiment quétaine.",
    "fiche": "Québécisme très courant pour tout ce qui est kitsch ou démodé."
  },
  {
    "expression": "Faire le cacou",
    "pays": "FR",
    "sens": "Frimer, faire le malin",
    "leurres": [
      "Faire la cuisine",
      "Faire semblant de dormir",
      "Se cacher"
    ],
    "exemple": "Il fait le cacou avec son scooter devant le lycée.",
    "fiche": "Expression provençale, de Marseille à Toulon."
  },
  {
    "expression": "Caïmanter",
    "pays": "CI",
    "sens": "Travailler dur, bûcher ses cours",
    "leurres": [
      "Dormir toute la journée",
      "Mentir à ses parents",
      "Nager dans la lagune"
    ],
    "exemple": "Le bac approche, je caïmante tous les soirs.",
    "fiche": "Ivoirien : on bosse avec la ténacité du caïman qui ne lâche rien. Très employé par les élèves et les étudiants."
  },
  {
    "expression": "Être bleu de quelqu'un",
    "pays": "BE",
    "sens": "Être amoureux",
    "leurres": [
      "Être en colère",
      "Avoir peur",
      "Être malade"
    ],
    "exemple": "Depuis la soirée, il est bleu d'elle.",
    "fiche": "Belgicisme : on est « bleu » de la personne qu'on a dans la peau."
  },
  {
    "expression": "Achouka !",
    "pays": "CM",
    "sens": "Bien fait pour toi !",
    "leurres": [
      "À tes souhaits !",
      "Bon appétit !",
      "Attention !"
    ],
    "exemple": "Tu as triché et tu t'es fait prendre ? Achouka !",
    "fiche": "Camfranglais. On le lance, un brin moqueur, à celui qui récolte ce qu'il a semé."
  },
  {
    "expression": "Camembérer",
    "pays": "SN",
    "sens": "Sentir mauvais des pieds",
    "leurres": [
      "Manger trop de fromage",
      "Faire la sieste",
      "Bavarder sans fin"
    ],
    "exemple": "Enlève tes baskets ailleurs, ça camembère dans la chambre !",
    "fiche": "Mot du français du Sénégal, en clin d'œil à l'odeur du fromage normand."
  },
  {
    "expression": "Un salomon",
    "pays": "CD",
    "sens": "Une personne qui dort dans le salon",
    "leurres": [
      "Un homme très sage",
      "Un poisson grillé",
      "Un juge de quartier"
    ],
    "exemple": "Mon cousin est arrivé du village, c'est lui le salomon maintenant.",
    "fiche": "Jeu de mots kinois entre le roi Salomon et le « salon » où l'on dort faute de chambre.",
    "aVerifier": true
  },
  {
    "expression": "Un grimpion",
    "pays": "CH",
    "sens": "Un arriviste",
    "leurres": [
      "Un alpiniste",
      "Un enfant turbulent",
      "Un vendeur ambulant"
    ],
    "exemple": "Ce grimpion ferait tout pour devenir chef.",
    "fiche": "Suisse romande : celui qui grimpe les échelons à tout prix."
  },
  {
    "expression": "Niaiseux",
    "pays": "QC",
    "sens": "Naïf, un peu bête",
    "leurres": [
      "Timide",
      "Têtu",
      "Paresseux"
    ],
    "exemple": "Arrête de faire le niaiseux, tu as très bien compris.",
    "fiche": "Québécisme. On dit aussi « niaiser » pour faire perdre son temps à quelqu'un."
  },
  {
    "expression": "Avoir un sadoul",
    "pays": "FR",
    "sens": "En avoir assez, être rassasié",
    "leurres": [
      "Avoir soif",
      "Être en retard",
      "Avoir de la chance"
    ],
    "exemple": "J'en ai un sadoul de tes histoires.",
    "fiche": "Midi toulousain et Pyrénées, de l'occitan « sadol », rassasié."
  },
  {
    "expression": "C'est caillou",
    "pays": "BF",
    "sens": "C'est dur, c'est difficile",
    "leurres": [
      "C'est gratuit",
      "C'est très lourd à porter",
      "C'est fini"
    ],
    "exemple": "Les examens cette année, c'est caillou !",
    "fiche": "Expression burkinabè : une situation aussi dure qu'un caillou."
  },
  {
    "expression": "Être comme lait et citron",
    "pays": "HT",
    "sens": "Être fâchés l'un contre l'autre",
    "leurres": [
      "S'entendre à merveille",
      "Être jumeaux",
      "Être très différents physiquement"
    ],
    "exemple": "Les deux voisins sont comme lait et citron depuis l'histoire du mur.",
    "fiche": "Image haïtienne : le citron fait tourner le lait."
  },
  {
    "expression": "Aller à Kumba",
    "pays": "CM",
    "sens": "Se rajeunir, mentir sur son âge",
    "leurres": [
      "Partir en voyage d'affaires",
      "Se marier",
      "Aller à l'hôpital"
    ],
    "exemple": "Il dit qu'il a 25 ans ? Il est allé à Kumba, oui.",
    "fiche": "Camfranglais : on raconte que certains faisaient refaire leurs papiers à Kumba pour gagner quelques années."
  },
  {
    "expression": "Faire palabre",
    "pays": "CI",
    "sens": "Se disputer, avoir un conflit",
    "leurres": [
      "Faire un discours",
      "Raconter des contes",
      "Négocier un prix"
    ],
    "exemple": "Ne viens pas faire palabre ici, on veut la paix.",
    "fiche": "En Côte d'Ivoire, la palabre est une dispute ; on « règle la palabre » pour faire la paix.",
    "autresSens": [
      {
        "sens": "Discuter longuement (« palabrer »)",
        "ou": "Dans une grande partie de l'Afrique et en France"
      }
    ]
  },
  {
    "expression": "Un taiseux",
    "pays": "BE",
    "sens": "Une personne qui parle peu",
    "leurres": [
      "Un menteur",
      "Un espion",
      "Un musicien"
    ],
    "exemple": "Mon grand-père est un taiseux, mais il observe tout.",
    "fiche": "Mot belge, aussi courant dans le nord de la France."
  },
  {
    "expression": "Un allocataire",
    "pays": "CM",
    "sens": "Un menteur",
    "leurres": [
      "Un chômeur",
      "Un vendeur de crédit téléphonique",
      "Un fonctionnaire"
    ],
    "exemple": "Ne crois pas ce qu'il dit, c'est un allocataire.",
    "fiche": "Au Cameroun, un « allô » est un mensonge, et l'allocataire celui qui en raconte.",
    "autresSens": [
      {
        "sens": "Une personne qui touche des allocations",
        "ou": "En France"
      }
    ]
  },
  {
    "expression": "Ne pas lâcher la patate",
    "pays": "QC",
    "sens": "Persévérer, ne pas abandonner",
    "leurres": [
      "Avoir très faim",
      "Garder un secret",
      "Rester à la maison"
    ],
    "exemple": "Il te reste un examen, lâche pas la patate !",
    "fiche": "Encouragement québécois, souvent abrégé en « lâche pas la patate »."
  },
  {
    "expression": "Au pas de caméléon",
    "pays": "CG",
    "sens": "Très lentement",
    "leurres": [
      "En changeant d'avis",
      "Sans faire de bruit",
      "En se cachant"
    ],
    "exemple": "Le dossier avance au pas de caméléon.",
    "fiche": "Expression du Congo-Brazzaville : le caméléon pose chaque patte avec une lenteur infinie."
  },
  {
    "expression": "Gros-doigts",
    "pays": "RE",
    "sens": "Maladroit",
    "leurres": [
      "Gourmand",
      "Voleur",
      "Musclé"
    ],
    "exemple": "Ne le laisse pas porter les verres, c'est un gros-doigts.",
    "fiche": "Expression réunionnaise pour quelqu'un qui casse tout."
  },
  {
    "expression": "Un jaguar",
    "pays": "BJ",
    "sens": "Un homme beau et élégant",
    "leurres": [
      "Un voleur rapide",
      "Un chauffeur de taxi",
      "Un sportif"
    ],
    "exemple": "Regarde-le dans son costume, c'est un vrai jaguar.",
    "fiche": "Au Bénin, le jaguar est l'homme qui en impose par son allure."
  },
  {
    "expression": "Doudou",
    "pays": "GP",
    "sens": "Chéri, personne aimée",
    "leurres": [
      "Un jouet en tissu",
      "Une boisson sucrée",
      "Un grand-père"
    ],
    "exemple": "Viens danser, doudou !",
    "fiche": "Mot tendre des Antilles, popularisé par les chansons de zouk.",
    "autresSens": [
      {
        "sens": "La peluche d'un enfant",
        "ou": "En France"
      }
    ]
  },
  {
    "expression": "La pluie",
    "pays": "TG",
    "sens": "La bourse des étudiants",
    "leurres": [
      "Une grosse dispute",
      "Le salaire des profs",
      "La saison des fêtes"
    ],
    "exemple": "Attends que la pluie tombe, après on ira au maquis.",
    "fiche": "À l'université au Togo, quand la bourse arrive, il « pleut » enfin de l'argent."
  },
  {
    "expression": "Une chocolatine",
    "pays": "FR",
    "sens": "Un pain au chocolat",
    "leurres": [
      "Une mousse au chocolat",
      "Un chocolat chaud",
      "Une barre chocolatée"
    ],
    "exemple": "Deux chocolatines et une baguette, s'il vous plaît.",
    "fiche": "Le grand débat de France : chocolatine dans le Sud-Ouest, pain au chocolat presque partout ailleurs."
  },
  {
    "expression": "Le bacho",
    "pays": "CM",
    "sens": "Le baccalauréat",
    "leurres": [
      "Le patron",
      "Le marché central",
      "Le bus scolaire"
    ],
    "exemple": "Cette année je passe le bacho, je n'ai pas le temps de sortir.",
    "fiche": "Camfranglais du quotidien des lycéens camerounais."
  },
  {
    "expression": "Un car rapide",
    "pays": "SN",
    "sens": "Un minibus coloré de Dakar",
    "leurres": [
      "Un TGV",
      "Une voiture de course",
      "Un camion de livraison"
    ],
    "exemple": "J'ai pris le car rapide jusqu'à Colobane.",
    "fiche": "Peints de jaune et de bleu, ils sont un symbole de Dakar… et ne sont pas forcément rapides."
  },
  {
    "expression": "Ma go",
    "pays": "CI",
    "sens": "Ma petite amie",
    "leurres": [
      "Ma mère",
      "Ma voiture",
      "Ma meilleure amie d'enfance"
    ],
    "exemple": "Je ne peux pas ce soir, je sors avec ma go.",
    "fiche": "Nouchi passé dans toute l'Afrique francophone.",
    "autresSens": [
      {
        "sens": "« Go ! » : vas-y, c'est parti",
        "ou": "En France, de l'anglais"
      }
    ]
  },
  {
    "expression": "Faire la baboune",
    "pays": "QC",
    "sens": "Bouder",
    "leurres": [
      "Faire le clown",
      "Grimacer de douleur",
      "Manger salement"
    ],
    "exemple": "Il fait la baboune depuis qu'on a perdu.",
    "fiche": "Au Québec, la baboune, c'est la lèvre qu'on avance quand on boude."
  },
  {
    "expression": "Brosser un cours",
    "pays": "BE",
    "sens": "Sécher un cours",
    "leurres": [
      "Réviser à fond",
      "Nettoyer la classe",
      "Prendre des notes"
    ],
    "exemple": "On a brossé le cours de math pour aller à la plage.",
    "fiche": "En Belgique, on « brosse » les cours qu'on sèche."
  },
  {
    "expression": "Un baobab",
    "pays": "CM",
    "sens": "Une personne puissante et respectée",
    "leurres": [
      "Un grand paresseux",
      "Un vieux menteur",
      "Un arbre à palabres"
    ],
    "exemple": "Pour ce dossier, il faut passer par un baobab du ministère.",
    "fiche": "Comme l'arbre géant, le baobab est solide, imposant et inébranlable."
  },
  {
    "expression": "Mikiliste",
    "pays": "CD",
    "sens": "Une personne qui vit en Europe",
    "leurres": [
      "Un musicien de rumba",
      "Un militaire",
      "Un vendeur de pagnes"
    ],
    "exemple": "Le mikiliste est rentré pour les fêtes avec des valises pleines.",
    "fiche": "Lingala, de « Mikili », le monde lointain et l'Europe. Le cousin kinois du mbenguiste camerounais."
  },
  {
    "expression": "Adodoler",
    "pays": "CH",
    "sens": "Câliner, bercer un enfant",
    "leurres": [
      "Gronder",
      "Endormir avec un médicament",
      "Habiller chaudement"
    ],
    "exemple": "Elle adodole le petit pour qu'il s'endorme.",
    "fiche": "Mot tendre de Suisse romande.",
    "aVerifier": true
  },
  {
    "expression": "Le zbeul",
    "pays": "FR",
    "sens": "Le désordre, le chaos",
    "leurres": [
      "Le patron",
      "Un plat épicé",
      "La fête"
    ],
    "exemple": "Le prof est sorti cinq minutes, c'était le zbeul.",
    "fiche": "Argot français venu de l'arabe dialectal, où « zbel » désigne les ordures."
  },
  {
    "expression": "Être couranté",
    "pays": "CM",
    "sens": "Être au courant de tout",
    "leurres": [
      "Avoir l'électricité",
      "Courir très vite",
      "Être pressé"
    ],
    "exemple": "Demande à Mireille, elle est toujours couranté des nouvelles du quartier.",
    "fiche": "Expression camerounaise : être branché sur le « courant » des infos."
  },
  {
    "expression": "Un garba",
    "pays": "CI",
    "sens": "Un plat d'attiéké au thon frit",
    "leurres": [
      "Un taxi collectif",
      "Un vendeur de rue",
      "Un pagne"
    ],
    "exemple": "À midi, un garba bien pimenté et je suis prêt.",
    "fiche": "Le plat populaire d'Abidjan, servi dans les « garbadromes »."
  },
  {
    "expression": "Mouiller à siaux",
    "pays": "QC",
    "sens": "Pleuvoir très fort",
    "leurres": [
      "Arroser son jardin",
      "Pleurer beaucoup",
      "Laver le plancher"
    ],
    "exemple": "Prends ton imper, il mouille à siaux.",
    "fiche": "Au Québec, il « mouille » quand il pleut, et « à siaux » quand c'est à pleins seaux."
  },
  {
    "expression": "Une sotrama",
    "pays": "ML",
    "sens": "Un minibus vert de Bamako",
    "leurres": [
      "Un marché couvert",
      "Une chanteuse",
      "Un plat de riz"
    ],
    "exemple": "La sotrama était pleine, j'ai dû rester debout.",
    "fiche": "Les minibus verts qui font vivre les transports de Bamako."
  },
  {
    "expression": "Cadonner",
    "pays": "TD",
    "sens": "Offrir un cadeau",
    "leurres": [
      "Fermer à clé",
      "Faire du commerce",
      "Rendre la monnaie"
    ],
    "exemple": "Pour la fête, il m'a cadonné une belle montre.",
    "fiche": "Verbe tiré de « cadeau » et « donner », entendu au Tchad."
  },
  {
    "expression": "Un tap-tap",
    "pays": "HT",
    "sens": "Un bus coloré de transport collectif",
    "leurres": [
      "Un tambour",
      "Une danse",
      "Un marchand de glaces"
    ],
    "exemple": "Le tap-tap pour Pétion-Ville part dans dix minutes.",
    "fiche": "En Haïti, ces camionnettes peintes de couleurs vives et de messages sont de vraies œuvres d'art roulantes."
  },
  {
    "expression": "Avoir un gros cou",
    "pays": "BE",
    "sens": "Se croire important",
    "leurres": [
      "Être malade",
      "Avoir trop mangé",
      "Être fatigué"
    ],
    "exemple": "Depuis sa promotion, il a un gros cou.",
    "fiche": "Belgicisme pour moquer la prétention."
  },
  {
    "expression": "La hchouma",
    "pays": "MA",
    "sens": "La honte, la gêne",
    "leurres": [
      "La fierté",
      "La colère",
      "La fatigue"
    ],
    "exemple": "Mange avec ta main droite, c'est la hchouma sinon !",
    "fiche": "Notion forte au Maghreb : ce qui ne se fait pas devant les autres."
  },
  {
    "expression": "Trabendiste",
    "pays": "DZ",
    "sens": "Un revendeur au marché noir",
    "leurres": [
      "Un chauffeur de bus",
      "Un footballeur",
      "Un douanier"
    ],
    "exemple": "Les baskets viennent d'un trabendiste du marché.",
    "fiche": "De « trabendo », venu de l'espagnol « contrabando », la contrebande."
  },
  {
    "expression": "Chichard",
    "pays": "CM",
    "sens": "Radin",
    "leurres": [
      "Élégant",
      "Bavard",
      "Peureux"
    ],
    "exemple": "Il ne paie jamais sa tournée, ce chichard.",
    "fiche": "Camerounais, de « chiche », qui ne donne pas grand-chose."
  },
  {
    "expression": "Mordre le carreau",
    "pays": "BF",
    "sens": "Être battu nettement",
    "leurres": [
      "Manger très vite",
      "Glisser sur le carrelage",
      "Tricher aux cartes"
    ],
    "exemple": "Notre équipe a mordu le carreau, 4 à 0.",
    "fiche": "L'équivalent burkinabè de « mordre la poussière »."
  },
  {
    "expression": "Gavé",
    "pays": "FR",
    "sens": "Très, beaucoup",
    "leurres": [
      "Rassasié",
      "Fatigué",
      "Énervé"
    ],
    "exemple": "C'est gavé bien, ce concert !",
    "fiche": "Bordeaux. « Gavé » y fait le même travail que « tarpin » à Marseille."
  },
  {
    "expression": "Le mbalax",
    "pays": "SN",
    "sens": "La musique populaire sénégalaise",
    "leurres": [
      "Un plat de mil",
      "Une lutte traditionnelle",
      "Un tissu brodé"
    ],
    "exemple": "Au mariage, tout le monde a dansé sur du mbalax.",
    "fiche": "Rythmes de sabar et musique moderne, popularisés par Youssou N'Dour."
  },
  {
    "expression": "Un chum",
    "pays": "QC",
    "sens": "Un ami, un copain",
    "leurres": [
      "Un chewing-gum",
      "Un patron",
      "Un voisin"
    ],
    "exemple": "Je vais au hockey avec mes chums.",
    "fiche": "De l'anglais. Au Québec, « mon chum » peut être ton ami… ou ton amoureux.",
    "autresSens": [
      {
        "sens": "Mon petit ami (« mon chum »)",
        "ou": "Au Québec aussi, selon le contexte"
      }
    ]
  },
  {
    "expression": "Un maquis",
    "pays": "CI",
    "sens": "Un petit restaurant populaire",
    "leurres": [
      "Une forêt dense",
      "Une boîte de nuit chic",
      "Un marché de nuit"
    ],
    "exemple": "On se retrouve au maquis pour le poulet braisé.",
    "fiche": "En Côte d'Ivoire et dans plusieurs pays voisins, le maquis est le resto convivial du quartier.",
    "autresSens": [
      {
        "sens": "La végétation épaisse, ou la Résistance pendant la guerre",
        "ou": "En France"
      }
    ]
  },
  {
    "expression": "Je wanda",
    "pays": "CM",
    "sens": "Je m'étonne, ça me surprend",
    "leurres": [
      "Je me promène",
      "Je n'ai plus d'argent",
      "Je suis d'accord"
    ],
    "exemple": "Tu as eu 18 en maths ? Je wanda !",
    "fiche": "Camfranglais, de l'anglais « wonder »."
  },
  {
    "expression": "Dégun",
    "pays": "FR",
    "sens": "Personne",
    "leurres": [
      "Tout le monde",
      "Un ami",
      "Un étranger"
    ],
    "exemple": "Il y a dégun à la plage ce matin.",
    "fiche": "Marseillais, de l'occitan « degun », personne."
  },
  {
    "expression": "Être déçu en bien",
    "pays": "CH",
    "sens": "Être agréablement surpris",
    "leurres": [
      "Être un peu déçu",
      "Être soulagé",
      "Être jaloux"
    ],
    "exemple": "Je pensais que le film serait nul, j'ai été déçu en bien.",
    "fiche": "Tournure typiquement suisse romande, qui fait sourire les voisins français."
  },
  {
    "expression": "Ndeko",
    "pays": "CD",
    "sens": "Frère, ami proche",
    "leurres": [
      "Ennemi",
      "Patron",
      "Voisin bruyant"
    ],
    "exemple": "Ndeko, viens m'aider à porter ça.",
    "fiche": "Mot lingala qui sert aussi bien pour un frère que pour un ami."
  },
  {
    "expression": "Un ndjangui",
    "pays": "CM",
    "sens": "Une tontine",
    "leurres": [
      "Une fête de mariage",
      "Un marché de nuit",
      "Un taxi-moto"
    ],
    "exemple": "Ce mois-ci, c'est mon tour de bouffer le ndjangui.",
    "fiche": "La tontine camerounaise : chacun cotise, et la cagnotte revient à tour de rôle à un membre."
  },
  {
    "expression": "Un essuie",
    "pays": "BE",
    "sens": "Une serviette de bain",
    "leurres": [
      "Un essuie-glace",
      "Un mouchoir",
      "Un balai"
    ],
    "exemple": "N'oublie pas ton essuie pour la piscine.",
    "fiche": "Belgicisme. En Suisse, on parlera plutôt d'un « linge »."
  },
  {
    "expression": "C'est plate",
    "pays": "QC",
    "sens": "C'est ennuyeux",
    "leurres": [
      "C'est plat et vide",
      "C'est facile",
      "C'est gratuit"
    ],
    "exemple": "Il pleut, c'est plate, on peut pas sortir.",
    "fiche": "Québécisme, on prononce « platte »."
  },
  {
    "expression": "Un gbaka",
    "pays": "CI",
    "sens": "Un minibus de transport en commun",
    "leurres": [
      "Un gros mensonge",
      "Un bagarreur",
      "Un plat de manioc"
    ],
    "exemple": "Le gbaka est plein, attends le suivant.",
    "fiche": "Les gbakas sillonnent Abidjan, avec leurs apprentis qui crient les destinations."
  },
  {
    "expression": "Un feyman",
    "pays": "CM",
    "sens": "Un escroc",
    "leurres": [
      "Un footballeur",
      "Un pasteur",
      "Un vendeur de beignets"
    ],
    "exemple": "Il promettait de doubler ton argent ? C'est un feyman.",
    "fiche": "Camerounais. Le « fey », c'est l'art de l'arnaque."
  },
  {
    "expression": "Jërëjëf",
    "pays": "SN",
    "sens": "Merci",
    "leurres": [
      "Bonjour",
      "Au revoir",
      "Pardon"
    ],
    "exemple": "Jërëjëf pour le repas, c'était délicieux !",
    "fiche": "Le merci wolof, qu'on entend partout au Sénégal et en Gambie."
  },
  {
    "expression": "Biloute",
    "pays": "FR",
    "sens": "Petit gars (affectueux)",
    "leurres": [
      "Un idiot",
      "Un ivrogne",
      "Un patron"
    ],
    "exemple": "Ça va, biloute ?",
    "fiche": "Ch'ti, mot tendre du Nord, rendu célèbre par le film « Bienvenue chez les Ch'tis »."
  },
  {
    "expression": "Le marmay",
    "pays": "RE",
    "sens": "Les enfants",
    "leurres": [
      "La marmite",
      "Le marché",
      "La mer"
    ],
    "exemple": "Le marmay joue dans la cour depuis ce matin.",
    "fiche": "Créole réunionnais, cousin de « marmaille »."
  },
  {
    "expression": "Un lolo",
    "pays": "GP",
    "sens": "Une petite épicerie de quartier",
    "leurres": [
      "Un bébé",
      "Un sirop",
      "Un vieux bateau"
    ],
    "exemple": "Va chercher du pain au lolo du coin.",
    "fiche": "Aux Antilles, le lolo dépanne tout le quartier, souvent jusque tard."
  },
  {
    "expression": "Une diacre",
    "pays": "CG",
    "sens": "Une jolie jeune femme, une petite amie",
    "leurres": [
      "Une religieuse",
      "Une grand-mère",
      "Une institutrice"
    ],
    "exemple": "Il est venu à la fête avec sa diacre.",
    "fiche": "Expression du Congo-Brazzaville, détournée du vocabulaire de l'église.",
    "aVerifier": true
  },
  {
    "expression": "Bienvenue !",
    "pays": "QC",
    "sens": "De rien (en réponse à merci)",
    "leurres": [
      "Entrez !",
      "Félicitations !",
      "Au revoir !"
    ],
    "exemple": "— Merci pour le café ! — Bienvenue !",
    "fiche": "Calque de l'anglais « you're welcome » : au Québec, on répond « bienvenue » à un merci.",
    "autresSens": [
      {
        "sens": "Formule d'accueil",
        "ou": "Dans toute la francophonie"
      }
    ]
  },
  {
    "expression": "Un zémidjan",
    "pays": "BJ",
    "sens": "Un moto-taxi",
    "leurres": [
      "Un griot",
      "Un marché",
      "Un poisson du lac"
    ],
    "exemple": "Prends un zémidjan, tu iras plus vite.",
    "fiche": "Au Bénin, en fon, « emmène-moi vite ». On dit souvent « zem », comme au Togo."
  },
  {
    "expression": "Yovo",
    "pays": "TG",
    "sens": "Un Blanc, un étranger",
    "leurres": [
      "Un enfant",
      "Un ancien du village",
      "Un commerçant"
    ],
    "exemple": "Les enfants chantent « yovo, yovo » aux touristes.",
    "fiche": "Mot du Togo et du Bénin, souvent joyeux. C'est le cousin du « toubab » sénégalais."
  },
  {
    "expression": "Un benskineur",
    "pays": "CM",
    "sens": "Un conducteur de moto-taxi",
    "leurres": [
      "Un boxeur",
      "Un mécanicien",
      "Un agent de police"
    ],
    "exemple": "Le benskineur m'a déposé devant le marché.",
    "fiche": "Au Cameroun, la moto-taxi est la « benskin »."
  },
  {
    "expression": "Une guindaille",
    "pays": "BE",
    "sens": "Une fête étudiante bien arrosée",
    "leurres": [
      "Une dispute",
      "Une course à pied",
      "Une grosse averse"
    ],
    "exemple": "Il y a une guindaille au cercle ce jeudi.",
    "fiche": "Tradition belge des cercles étudiants, de Louvain-la-Neuve à Liège."
  },
  {
    "expression": "Un woro-woro",
    "pays": "CI",
    "sens": "Un taxi collectif",
    "leurres": [
      "Un oiseau bavard",
      "Une danse",
      "Un marchand ambulant"
    ],
    "exemple": "Prends un woro-woro jusqu'à Cocody.",
    "fiche": "Taxi partagé d'Abidjan, qui circule dans une commune."
  },
  {
    "expression": "Kenavo",
    "pays": "FR",
    "sens": "Au revoir",
    "leurres": [
      "Bonjour",
      "À ta santé",
      "Merci"
    ],
    "exemple": "Kenavo, à l'année prochaine pour le fest-noz !",
    "fiche": "Breton, souvent employé en Bretagne même en parlant français."
  },
  {
    "expression": "Le grin",
    "pays": "BF",
    "sens": "Le groupe d'amis qui se retrouve autour du thé",
    "leurres": [
      "Un champ de mil",
      "Une petite boutique",
      "Le sourire"
    ],
    "exemple": "Ce soir je passe au grin, on va causer foot.",
    "fiche": "Au Burkina comme au Mali, le grin est un lieu de causerie et de thé à la menthe sous un arbre.",
    "autresSens": [
      {
        "sens": "Le même mot, même usage",
        "ou": "Au Mali"
      }
    ]
  },
  {
    "expression": "Kenbe la !",
    "pays": "HT",
    "sens": "Tiens bon !",
    "leurres": [
      "Arrête !",
      "Reviens !",
      "Prends ça !"
    ],
    "exemple": "Les temps sont durs, mais kenbe la !",
    "fiche": "Créole haïtien, l'encouragement qu'on se donne quand ça va mal."
  },
  {
    "expression": "Le kongossa",
    "pays": "CM",
    "sens": "Les ragots, les commérages",
    "leurres": [
      "Une danse",
      "Un plat de poisson",
      "Une prière"
    ],
    "exemple": "Ne fais pas attention, c'est du kongossa.",
    "fiche": "Camerounais. Il existe même des « radios kongossa » : le bouche-à-oreille du quartier."
  },
  {
    "expression": "Pantoute",
    "pays": "QC",
    "sens": "Pas du tout",
    "leurres": [
      "Partout",
      "Tout de suite",
      "Pour toujours"
    ],
    "exemple": "J'ai pas faim pantoute.",
    "fiche": "Contraction québécoise de « pas en tout »."
  },
  {
    "expression": "S'encoubler",
    "pays": "CH",
    "sens": "Trébucher",
    "leurres": [
      "S'endormir",
      "S'habiller",
      "Se marier"
    ],
    "exemple": "Je me suis encoublé dans le tapis.",
    "fiche": "Suisse romande et Savoie. Au figuré, on peut aussi s'encoubler dans ses explications."
  },
  {
    "expression": "Article 15",
    "pays": "CD",
    "sens": "Débrouille-toi",
    "leurres": [
      "C'est interdit",
      "Tais-toi",
      "Paie ta part"
    ],
    "exemple": "Pas de salaire ce mois-ci ? Article 15.",
    "fiche": "On raconte qu'un « article 15 » imaginaire disait « débrouillez-vous ». C'est devenu la devise de la débrouille au Congo."
  },
  {
    "expression": "Dafa neex",
    "pays": "SN",
    "sens": "C'est bon, c'est délicieux",
    "leurres": [
      "C'est trop cher",
      "Il fait chaud",
      "Ça suffit"
    ],
    "exemple": "Goûte ce thiéboudienne, dafa neex !",
    "fiche": "Wolof, à dire après une bonne assiette ou un bon moment."
  },
  {
    "expression": "On dit quoi ?",
    "pays": "CM",
    "sens": "Salut, ça va ?",
    "leurres": [
      "Qu'est-ce que tu as dit ?",
      "C'est quoi le problème ?",
      "On mange quoi ?"
    ],
    "exemple": "On dit quoi, mon frère ? Ça fait longtemps !",
    "fiche": "La salutation camerounaise par excellence. On répond souvent « On est là »."
  },
  {
    "expression": "Faire de son nez",
    "pays": "BE",
    "sens": "Faire le prétentieux",
    "leurres": [
      "Être enrhumé",
      "Fouiner partout",
      "Sentir bon"
    ],
    "exemple": "Depuis qu'il a sa voiture, il fait de son nez.",
    "fiche": "Belgicisme : on lève le nez de fierté."
  },
  {
    "expression": "Babi",
    "pays": "CI",
    "sens": "Le surnom d'Abidjan",
    "leurres": [
      "Un bébé",
      "Une grand-mère",
      "Un quartier de Dakar"
    ],
    "exemple": "Babi ne dort jamais.",
    "fiche": "Abidjan a plusieurs surnoms ; Babi est le plus affectueux."
  },
  {
    "expression": "Boudu !",
    "pays": "FR",
    "sens": "Oh là là ! (surprise)",
    "leurres": [
      "Silence !",
      "Allez !",
      "Pardon !"
    ],
    "exemple": "Boudu, il fait chaud aujourd'hui !",
    "fiche": "Exclamation toulousaine, de l'occitan."
  },
  {
    "expression": "Un dépanneur",
    "pays": "QC",
    "sens": "Une épicerie de quartier",
    "leurres": [
      "Un garagiste",
      "Un plombier",
      "Un taxi de nuit"
    ],
    "exemple": "Je descends au dépanneur chercher du lait.",
    "fiche": "Au Québec, le « dep » est ouvert tard et dépanne tout le monde.",
    "autresSens": [
      {
        "sens": "Un réparateur, une dépanneuse",
        "ou": "En France et ailleurs"
      }
    ]
  },
  {
    "expression": "Être bat",
    "pays": "CM",
    "sens": "Être génial… ou nul, selon le ton",
    "leurres": [
      "Être battu",
      "Être fatigué",
      "Être en colère"
    ],
    "exemple": "Ton nouveau téléphone est bat ! (bien) / Son concert était bat… (nul)",
    "fiche": "Camfranglais à double tranchant : c'est l'intonation qui dit si c'est un compliment.",
    "aVerifier": true
  }
];
