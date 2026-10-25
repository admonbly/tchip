# Ajouter une expression

Les expressions sont dans `data/expressions.js`. L'ordre du tableau donne l'ordre des jours : la première est le Tchip #1, la deuxième le #2, etc. Ajoute toujours les nouvelles **à la fin** pour ne pas décaler les jours déjà passés.

## Format

```js
{
  expression: "Long crayon",
  pays: "CM",                       // un code de TCHIP_PAYS
  sens: "Une personne très diplômée",
  leurres: ["Un menteur", "Une personne très grande", "Un écrivain de lettres d'amour"],
  exemple: "Demande au long crayon de la famille, il saura remplir le formulaire.",
  fiche: "Expression camerounaise : plus le crayon est long, plus on a fait de longues études.",
  autresSens: [                     // facultatif : ce que l'expression veut dire ailleurs
    { sens: "Un vrai crayon très long", ou: "Au sens propre" }
  ],
  aVerifier: true                   // facultatif : à faire relire avant la mise en jeu
}
```

## Une expression, plusieurs sens

Le jeu ne compte qu'**une** bonne réponse, celle du pays indiqué. Les autres sens vont dans `autresSens` : ils s'affichent dans la fiche découverte sous « Ailleurs, ça veut aussi dire ». Règle importante : **aucun leurre ne doit être un vrai sens** de l'expression, sinon le joueur aurait raison en perdant.

## Traiter une proposition de joueur

Les propositions arrivent en tickets GitHub avec l'étiquette `proposition`.
1. Faire confirmer le sens par au moins une personne du pays (en commentaire du ticket).
2. Choisir le sens principal ; les autres vont dans `autresSens`.
3. Écrire 3 leurres plausibles et une fiche courte.
4. Ajouter l'entrée à la fin du tableau, citer le pseudo dans la fiche si la personne le souhaite, puis fermer le ticket.

## Ajouter un pays

Ajoute une ligne dans `TCHIP_PAYS`, en haut du même fichier :

```js
BF: { nom: "Burkina Faso", drapeau: "🇧🇫" },
```

## Check-list avant d'ajouter

- [ ] L'expression est vérifiée par au moins une personne du pays.
- [ ] Le sens tient en moins de 8 mots.
- [ ] Les 3 leurres sont plausibles, de longueur proche du bon sens, et tous différents.
- [ ] La phrase d'exemple aide sans donner la réponse mot pour mot.
- [ ] La fiche fait 1 ou 2 phrases.
- [ ] Rien d'insultant, de sexuel ou de moqueur envers un groupe.

## Varier le rythme

Alterne les pays d'un jour à l'autre, et glisse une expression « facile » (connue partout) après deux plus difficiles. C'est ce qui donne envie de revenir.
