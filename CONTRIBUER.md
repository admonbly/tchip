# Ajouter une expression

Les expressions sont dans `data/expressions.js`. L'ordre du tableau donne l'ordre des jours : la première est le Tchip #1, la deuxième le #2, etc. Ajoute toujours les nouvelles **à la fin** pour ne pas décaler les jours déjà passés. Chaque expression sert aussi au mode Voyager : elle rejoint le lexique de son pays, rangée par thème.

## Format

```js
{
  expression: "Un woro-woro",
  pays: "CI",                         // un code de TCHIP_PAYS
  theme: "transport",                 // une clé de TCHIP_THEMES (saluer, manger, se déplacer…)
  sens: "Un taxi collectif",
  leurres: ["Un vendeur ambulant", "Un tambour", "Un pont"],
  exemple: "Le woro-woro pour Cocody, c'est au coin du marché.",
  fiche: "Taxis communaux d'Abidjan, de couleur différente selon la commune.",

  // facultatif
  ailleurs: [{ sens: "La peluche d'un enfant", ou: "En France" }],   // autres sens, et où
  aussi: ["BF"],                      // autres pays où elle s'emploie (jamais proposés au bonus)
  prononciation: "wo-ro wo-ro",       // en syllabes, à la française
  audio: { fichier: "audio/ci/woro-woro.m4a", voix: "Aya", ville: "Abidjan" }
}
```

Deux expressions synonymes du même pays doivent avoir **exactement le même sens** (ex. « Ya fohi » et « Y a pas drap » : « Il n'y a pas de problème »). Le jeu évite alors de les proposer ensemble dans une même question.

## Une expression, plusieurs sens

Le jeu ne compte qu'**une** bonne réponse, celle du pays indiqué. Les autres sens vont dans `ailleurs` : ils s'affichent dans la fiche découverte sous « Ailleurs, ça veut aussi dire ». Règle importante : **aucun leurre ne doit être un vrai sens** de l'expression, sinon le joueur aurait raison en perdant (`npm run verifier` le refuse).

Si l'expression s'emploie **avec le même sens** dans d'autres pays, liste-les dans `aussi` : ils ne seront jamais proposés comme mauvaise réponse au bonus « d'où ça vient ? ».

## Traiter une proposition de joueur

Les propositions arrivent en tickets GitHub avec l'étiquette `proposition` (formulaire « Proposer une expression » dans le jeu, ou directement sur GitHub).
1. Faire confirmer le sens par au moins une personne du pays (en commentaire du ticket).
2. Choisir le sens principal ; les autres vont dans `ailleurs`.
3. Écrire 3 leurres plausibles, une phrase d'exemple, une fiche courte, choisir le thème et noter la prononciation.
4. Si une voix est jointe et que la personne a donné son accord, suivre « Enregistrer une voix » ci-dessous.
5. Ajouter l'entrée à la fin du tableau, citer le pseudo dans la fiche si la personne le souhaite, puis fermer le ticket.

## Ajouter un pays

Ajoute une ligne dans `TCHIP_PAYS`, en haut du même fichier, puis génère son drapeau :

```js
GA: { nom: "Gabon", drapeau: "🇬🇦", region: "Afrique centrale", accent: "gabonais", intro: "Une phrase sur le français du pays." },
```

```bash
npm run drapeaux
```

`accent` sert au carnet (« Tu parles un peu gabonais »). Si le drapeau n'existe pas dans `flag-icons`, dessine-le dans `tools/copier-drapeaux.js`.

## Enregistrer une voix

Les voix rendent le jeu vivant et aident à prononcer comme sur place. La règle : **de vraies personnes du pays, créditées, jamais de voix de synthèse ni d'imitation.** Un accent se partage, il ne se caricature pas.

1. Trouve une personne qui parle ainsi au quotidien, et demande-lui son **accord écrit** pour que sa voix soit publiée dans le jeu, avec son prénom (ou un pseudo) et sa ville.
2. Enregistre au téléphone, dans une pièce calme, à 20 cm du micro. Elle dit l'expression **une fois**, naturellement, comme dans la vie (pas de lecture appliquée). Puis, si elle veut, la phrase d'exemple.
3. Coupe les blancs au début et à la fin. Garde moins de 4 secondes.
4. Exporte en **.m4a** (AAC, mono, 64 kb/s) ou en .mp3.
5. Range le fichier dans `audio/<code du pays>/<expression>.m4a` (minuscules, tirets, sans accents), par exemple `audio/sn/jerejef.m4a`.
6. Ajoute le champ `audio` à l'expression, puis `npm run verifier` : la commande signale un fichier manquant.

Le bouton 🔊 apparaît alors dans le lexique, les fiches et les séries, avec le crédit « Voix : Aya, Abidjan ».

## Vérifier

```bash
npm run verifier
npm test
```

La vérification refuse un pays non déclaré ou sans drapeau, un thème inconnu, un leurre manquant ou en double, un leurre qui serait un vrai sens « ailleurs », une expression en double, un fichier audio manquant. La CI lance tout à chaque push : une erreur bloque la publication. Une fois sur `main`, les nouvelles expressions arrivent dans les apps sans mise à jour sur les stores (voir `DEPLOIEMENT.md`).

## Check-list avant d'ajouter

- [ ] L'expression est vérifiée par au moins une personne du pays (`RELECTURE.md`).
- [ ] Le sens tient en moins de 8 mots.
- [ ] Les 3 leurres sont plausibles, de longueur proche du bon sens, et tous différents.
- [ ] La phrase d'exemple aide sans donner la réponse mot pour mot.
- [ ] La fiche fait 1 ou 2 phrases. Dans le doute, « on raconte que ».
- [ ] La prononciation est relue par quelqu'un du pays.
- [ ] Rien d'insultant, de sexuel ou de moqueur envers un groupe.

## Varier le rythme

Alterne les pays d'un jour à l'autre, et glisse une expression « facile » (connue partout) après deux plus difficiles. C'est ce qui donne envie de revenir.
