# Simplon-Netflix

### Consommer une api pour réaliser un Neftlix like

 ## Lancer le projet



```
git clone git@github.com:Maalxi/brief_6_Netflix.git
cd Brief_6_Netflix
npm install
npx parcel index.html
```

 ## Cahier des charges du projet:

## Barre de navigation

Un champ de saisie permet à l’utilisateur de faire une recherche

## La page d’accueil

Un hero banner pour mettre en avant un film Cf. maquette
2 listes de films, thème au choix, avec ou sans carrousel Cf. maquette

## La page de recherche

Affiche la recherche saisie par l’utilisateur en haut de la page
Les 10 films les plus pertinents vis-à-vis de la recherche sont affichés, utiliser une pagination si il y a plus de 10 films à proposer
Lorsqu’un utilisateur clique sur un film il est redirigé vers la page détails du film

## La page de détails 

Elle affiche les données les plus pertinentes à propos du film

## Idées bonus

Depuis la page de détails vous proposez d’autres films susceptibles de plaires
Depuis la page de recherche vous permettez à l’utilisateur de trier par catégories etc
Les éléments de listes présentant un film affichent une carte plus détaillée au survol
L’utilisateur peut mettre des films en favoris

## Technique

L’application peut être une SPA (single page application) ou avoir plusieurs pages.
Vous êtes libres d’utiliser un framework CSS

## Sécurité

Votre clé d’authentification TMDB est secrète, cette donnée sensible ne doit pas être versionné avec Git

