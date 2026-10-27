# Publier Tchip sur l'App Store et Google Play

Ce qui est déjà prêt dans le dépôt, puis ce qu'il reste à faire, dans l'ordre.

## Déjà prêt

- **Projets natifs** `ios/` et `android/` (Capacitor 8, identifiant `app.tchip`, version 1.0.0).
- **Fonctions natives** (elles comptent pour la règle Apple 4.2, « pas un simple site web emballé ») :
  rappel quotidien en notification locale, retour haptique, feuille de partage du téléphone, jeu 100 % hors ligne,
  bouton retour Android, copie de secours de la progression.
- **Deux langues** : français et anglais (interface, sens et fiches traduits ; l'anglais est choisi d'office si le téléphone est en anglais).
- **Réglages** : musique, bruitages, vibrations, animations, thème, langue, règles, invitation d'amis par le partage du téléphone (aucun accès aux contacts), à propos.
- **iOS** : français (langue de développement) et anglais déclarés, iPhone en portrait, icône 1024 sans transparence, écrans de lancement clair et sombre,
  manifeste de confidentialité (`PrivacyInfo.xcprivacy`), déclaration de chiffrement (aucun chiffrement propriétaire).
- **Android** : cible Android 16 (API 36), icône adaptative + monochrome (Android 13), icône de notification,
  écran de lancement clair et sombre, **aucune permission sensible** (l'alarme exacte est retirée).
- **Polices embarquées**, aucun appel à Google Fonts.
- **Page de confidentialité et mentions légales** (`confidentialite.html`), visible dans l'app (Réglages).
- **CI GitHub** : vérification des données, compilation Android et iOS à chaque push, publication du site.
- **Visuels Google Play** : `assets/store/google-play-icone-512.png` et `assets/store/google-play-banniere-1024x500.png`.

## 1. Une fois, sur GitHub (5 minutes)

1. **GitHub Pages** (fait) : dépôt › *Settings* › *Pages* › *Source* : **GitHub Actions**, *Custom domain* : `tchip.app`.
   À chaque push sur `main`, le site est publié :
   - jeu : `https://tchip.app/`
   - confidentialité (URL à donner aux deux stores) : `https://tchip.app/confidentialite.html` (en anglais : `https://tchip.app/confidentialite-en.html`)
   - expressions lues par les apps : `https://tchip.app/data/expressions.json` (`CONTENU_URL` dans `app.js`)
   L'ancienne adresse `admonbly.github.io/tchip` redirige vers `tchip.app`.
2. **Domaine `tchip.app`** (acheté chez Cloudflare) : les enregistrements DNS pointent vers GitHub Pages (4 A, 4 AAAA, et `www` en CNAME vers `admonbly.github.io`), en **« DNS only »** (nuage gris) pour que GitHub fournisse lui-même le certificat. Puis *Enforce HTTPS* coché dans les réglages Pages du dépôt. Le domaine est aussi vérifié dans les réglages GitHub du compte (*Settings › Pages*), pour que personne d'autre ne puisse l'utiliser.
3. **Mentions légales** (fait) : éditeur et directeur de la publication Moussa Traore, contact `contact@tchip.app` (Cloudflare Email Routing), dans `confidentialite.html` et `confidentialite-en.html`. À mettre à jour ensemble si une société reprend l'édition.
3 bis. **API des propositions** (`api/`, Cloudflare Worker + D1 + Turnstile + Access) : mise en ligne pas à pas dans `api/README.md`. Les joueurs proposent sans compte, rien n'est public, et le tri se fait sur `https://admin.tchip.app`.
4. **Sécurité du dépôt** (à faire sur GitHub) : double authentification sur le compte, et protection de `main` (*Settings › Branches* : CI obligatoire avant de fusionner). Tout ce qui arrive sur `main` part en moins d'une heure dans toutes les apps installées. `.well-known/security.txt` (où signaler une faille) expire le 26 octobre 2027 : changer la date `Expires` avant.
5. `ADRESSE_PARTAGE` (`tchip.app`) est aussi le lien des invitations (Réglages › Inviter des amis) : une fois les apps en ligne, une page d'accueil avec les deux boutons des stores sera l'idéal.

## 2. Comptes développeur

| | Apple | Google |
|---|---|---|
| Inscription | [Apple Developer Program](https://developer.apple.com/programs/) | [Play Console](https://play.google.com/console) |
| Prix | 99 $ par an | 25 $ une seule fois |
| À savoir | En société, il faut un numéro D-U-N-S (gratuit, quelques jours). | Un **nouveau compte personnel** doit faire un **test fermé avec au moins 12 testeurs pendant 14 jours** avant la mise en production. Prévois-le dans le planning. |

## 3. Publier sur iOS

Il faut un **Mac avec Xcode** (ou un service de build dans le cloud).

1. `npm install` puis `npm run ios` → Xcode s'ouvre.
2. Cible *App* › *Signing & Capabilities* : choisir ton équipe (*Team*). Rien d'autre à cocher : les notifications locales ne demandent aucune capacité spéciale.
3. Tester sur un vrai iPhone : partie complète, rappel (Réglages › Rappel quotidien), partage, mode avion.
4. *Product* › *Archive* › *Distribute App* › *App Store Connect*.
5. Dans [App Store Connect](https://appstoreconnect.apple.com) :
   - **Nom** : `Tchip – Tu parles d'où ?` (30 caractères max) · **Sous-titre** : par ex. `L'expression du jour à deviner`
   - **Catégorie** : Jeux › Mots (secondaire : Éducation)
   - **URL de confidentialité** : celle de GitHub Pages ci-dessus
   - **Captures d'écran** : iPhone 6,9 pouces (1320 × 2868) obligatoires. L'app tourne aussi sur iPad : il faut alors des captures iPad 13 pouces (2064 × 2752).
     Pour éviter ça, passer l'app en iPhone seul : Xcode › cible *App* › *Supported Destinations* › retirer iPad.
   - **Classification par âge** : répondre au questionnaire honnêtement (quelques expressions évoquent l'argent, une maîtresse, un pot-de-vin : c'est léger).
   - **Confidentialité de l'app** (« étiquettes ») : *Contenu utilisateur › Autre contenu utilisateur* et *Contenu utilisateur › Données audio* (les propositions d'expressions et les voix jointes), **non liés à l'identité**, **pas de suivi**, finalité : *Fonctionnalités de l'app*. C'est tout, tant que les statistiques sont désactivées (voir § 6).
   - **Langues de la fiche** : ajouter l'anglais (*App Store Connect › Informations sur l'app › Localisations*) avec son nom, sous-titre, description et captures en anglais, par ex. `Tchip – Where do you speak from?` · `Guess the expression of the day`.
   - **Notes pour la revue** (en anglais), à coller :
     > Tchip is a daily word game about expressions from the French-speaking world: guess what an expression means, then where it comes from. Available in French and English (Settings › Language). No account, no ads, no tracking. Native features: optional daily local reminder, haptic feedback, native share sheet (score sharing and friend invites, no contacts access), music and sound effects generated on device, full offline play. Player progress stays on the device.

## 4. Publier sur Android

1. Installer [Android Studio](https://developer.android.com/studio) (il fournit Java). `npm run android` ouvre le projet.
2. Tester sur un téléphone (ou récupérer l'APK de test produit par la CI : onglet *Actions* › dernier run › *tchip-android-debug*).
3. *Build* › *Generate Signed App Bundle* › **AAB**. Créer une clé de signature et la **sauvegarder en lieu sûr** (sans elle, plus de mises à jour). Activer *Play App Signing* dans la Play Console.
4. Dans la Play Console :
   - **Fiche** : description courte (80 car.), longue, icône 512 et bannière 1024×500 (dans `assets/store/`), au moins 2 captures de téléphone. Ajouter une traduction anglaise de la fiche (*Présence sur le Store › Traductions*).
   - **Catégorie** : Jeux › Mots.
   - **Classification du contenu** : questionnaire IARC.
   - **Public cible** : 13 ans et plus (en dessous, le programme « Familles » de Google ajoute des obligations).
   - **Sécurité des données** : *Contenu généré par l'utilisateur › Autre contenu généré par l'utilisateur* et *Audio › Enregistrements vocaux ou audio* : collectés, **non partagés** (Cloudflare est un sous-traitant, pas un tiers), **facultatifs**, chiffrés en transit, suppression sur demande (contact@tchip.app), finalité : *Fonctionnalités de l'appli*. C'est tout, tant que les statistiques sont désactivées (voir § 6).
   - **URL de confidentialité** : celle de GitHub Pages.
   - **Publicités** : « Non, mon app ne contient pas de publicité ».
5. Test fermé (12 testeurs, 14 jours si compte personnel récent), puis production.

## 5. Ajouter des expressions après la sortie

Ajouter les nouvelles expressions **à la fin** de `data/expressions.js` (voir `CONTRIBUER.md`), puis push sur `main`.
La CI vérifie la base et la publie : les apps la récupèrent à l'ouverture suivante (au plus une fois par heure), **sans passer par les stores**.
Elles refusent toute liste invalide ou plus courte que celle qu'elles embarquent : l'ordre des jours ne peut pas bouger.

Aujourd'hui : 314 expressions de 22 pays (au moins 10 par pays), soit un tchip du jour différent jusqu'au 3 septembre 2027 (`npm run verifier`). À partir du #39, les leurres, exemples, fiches et prononciations sont des brouillons à faire relire (`RELECTURE.md`). Les voix enregistrées s'ajoutent de la même façon (`audio/`, voir `CONTRIBUER.md`).

## 6. Activer les statistiques anonymes (recommandé)

Sans statistiques, impossible de savoir si les joueurs reviennent. Le code est prêt, désactivé.

1. Créer un compte sur [TelemetryDeck](https://telemetrydeck.com) (société allemande, données dans l'UE, sans traçage publicitaire) et une app « Tchip ».
2. Coller son *App ID* dans `TELEMETRYDECK_APP_ID` (en haut de `app.js`).
3. iOS : dans `ios/App/App/PrivacyInfo.xcprivacy`, remplacer `<key>NSPrivacyCollectedDataTypes</key><array/>` par :
   ```xml
   <key>NSPrivacyCollectedDataTypes</key>
   <array>
     <dict>
       <key>NSPrivacyCollectedDataType</key><string>NSPrivacyCollectedDataTypeProductInteraction</string>
       <key>NSPrivacyCollectedDataTypeLinked</key><false/>
       <key>NSPrivacyCollectedDataTypeTracking</key><false/>
       <key>NSPrivacyCollectedDataTypePurposes</key><array><string>NSPrivacyCollectedDataTypePurposeAnalytics</string></array>
     </dict>
     <dict>
       <key>NSPrivacyCollectedDataType</key><string>NSPrivacyCollectedDataTypeOtherDiagnosticData</string>
       <key>NSPrivacyCollectedDataTypeLinked</key><false/>
       <key>NSPrivacyCollectedDataTypeTracking</key><false/>
       <key>NSPrivacyCollectedDataTypePurposes</key><array><string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string></array>
     </dict>
   </array>
   ```
4. Mettre à jour les déclarations des stores :
   - **App Store** : *Données d'utilisation › Interaction avec le produit* (analyse) et *Diagnostics › Autres données de diagnostic* (fonctionnement de l'app), **non liées à l'identité**, **pas de suivi**. Aucune fenêtre « App Tracking Transparency » n'est nécessaire.
   - **Google Play** : *Activité dans l'app › Interactions avec l'app* et *Infos et performances de l'app › Diagnostics* : collectées, **non partagées**, chiffrées en transit, **facultatives** (le joueur peut refuser dans Réglages), finalité : analyses.
5. La page de confidentialité décrit déjà ces statistiques. L'app affiche alors l'interrupteur « Statistiques anonymes » dans Réglages.

Ce qui est envoyé : ouverture, fin de partie (score), partage, activation du rappel, erreurs JavaScript (message court). L'identifiant est aléatoire, haché, renouvelé tous les 13 mois. Les plantages natifs sont déjà remontés gratuitement par Xcode (*Organizer*) et la Play Console (*Android Vitals*).

## 7. La publicité : notre recommandation

**Pas de pub au lancement.**

- **Ça ne rapporterait presque rien.** Une partie dure une minute par jour, et les tarifs publicitaires sont bas dans une bonne partie de l'Afrique francophone : il faut des dizaines de milliers de joueurs quotidiens avant que ça compte.
- **Ça coûterait cher en rétention.** Une pub plein écran après la partie, c'est exactement ce qui fait désinstaller un petit jeu quotidien, et ta force, c'est la série 🔥.
- **Ça alourdit la conformité.** Il faudrait la fenêtre Apple de suivi (ATT) si la pub est personnalisée, un bandeau de consentement en Europe (Google UMP), des déclarations « données partagées avec des tiers », un fichier `app-ads.txt` sur ton domaine… L'app perdrait son argument « sans pub, sans traçage ».

**Quand il y aura du monde** (quelques milliers de joueurs quotidiens, mesurés grâce au § 6), deux options compatibles avec le jeu :

1. **Tchip+ en achat intégré** (déjà dans la feuille de route) : archives illimitées, packs thématiques, thèmes. Sur iOS, l'achat intégré Apple est obligatoire pour du contenu numérique (pas de paiement externe). C'est le modèle le plus propre.
2. **Pub « récompensée » facultative** avec Google AdMob : « regarde une vidéo pour débloquer une archive ». Le joueur choisit, rien n'interrompt la partie du jour. Commencer par des pubs **non personnalisées** pour éviter la fenêtre ATT.

## 8. À chaque nouvelle version

1. Monter la version dans `package.json` (ex. 1.0.1).
2. iOS (Xcode › cible *App* › *General*) : *Version* = la même, *Build* +1.
3. Android (`android/app/build.gradle`) : `versionName` = la même, `versionCode` +1.
4. `npm run sync`, tester sur un appareil, archiver / générer l'AAB, envoyer.

Une simple correction d'expression n'a pas besoin de nouvelle version (§ 5).
