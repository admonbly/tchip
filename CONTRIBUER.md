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
  fiche: "Expression camerounaise : plus le crayon est long, plus on a fait de longues études."
}
```

## Ajouter un pays

Ajoute une ligne dans `TCHIP_PAYS`, en haut du même fichier :

```js
BF: { nom: "Burkina Faso", drapeau: "🇧🇫" },
```

## Vérifier

```bash
npm run verifier
```

La commande refuse une expression dont le pays n'est pas déclaré, un leurre manquant ou en double, un champ vide. La CI la lance à chaque push : une erreur bloque la publication. Une fois sur `main`, les nouvelles expressions arrivent dans les apps sans mise à jour sur les stores (voir `DEPLOIEMENT.md`).

## Check-list avant d'ajouter

- [ ] L'expression est vérifiée par au moins une personne du pays.
- [ ] Le sens tient en moins de 8 mots.
- [ ] Les 3 leurres sont plausibles, de longueur proche du bon sens, et tous différents.
- [ ] La phrase d'exemple aide sans donner la réponse mot pour mot.
- [ ] La fiche fait 1 ou 2 phrases.
- [ ] Rien d'insultant, de sexuel ou de moqueur envers un groupe.

## Varier le rythme

Alterne les pays d'un jour à l'autre, et glisse une expression « facile » (connue partout) après deux plus difficiles. C'est ce qui donne envie de revenir.
