



#Pong

## Binome

- ***ELGHANI ZENAIDJI***


## Présentation du projet

- Il s'agit tout simplement de l'historique je de **Pong**, implemanté avec une système de connexion/déconnexion multi-joueurs en ligne en passant par le serveur locale.
- Pour y jouer, il vous faut 2 joueurs pour commencer a y jouer, en vous rendant sur la page du jeu de la machine qui sert de serveur ```http://localhost:8080/public/index.html```, cliquer sur le bouton **connect** pour vous connecter au server, attendre qu'un autre joueur rejoins le jeu et puis commencer y jouer ***:-)*** .
- Pour quiter le jeu, il suffit juste de cliquer sur le bouton **disconnect**.   

### Lancement du server en local
Pour lancer le server de pong et commencer à vous amuser, il vous suffit de suivre les étapes suivantes.
- Lancer un terminal et se mettre dans le dossier server et lancer le server avec la commande ```npm install```
- Lancer le server avec la commande ```nodemon```et voila le server est activé par votre machine qui fait office de server
- Rendz vous maintenant au dossier client toujour avec le terminal et installer le webpacka avec la commande ``` npm install webpack webpack-cli --save-dev ```
- Lancer du meme dossier (client) la surveillance du webpack pour recevoir le code js avec la commande ``` npm run watch ```


## Avancée sur le projet

#### v1

- Mise en place du webpack.

#### v2

- Création du premier paddle qui joue contre le mur.
- Gestion des mouvements du paddle avec les flèches dans les fonctions "keyDownActionHandler" et "keyUpActionHandler" présent dans la classe "Game".
- Suppression de la collision de la balle avec le mur de gauche qui termine le jeu. (Le jeu est relancé avec la touche espace à partir de la v3).
- Gestion de la collision dans la classe "Ball" avec la fonction "collisionWith" et "Shiftvalue" .   

  

#### v3

- Ajout de la seconde raquette à la droite du canvas.
- Gestion des mouvements avec les flèches dans les mêmes fonctions que la première raquette. Les déplacements de la deuxieme raquette sont maintenant fait à avec les touches "a" et "q" 
- Gestion de la collision avec la deuxième raquette.  
- La balle est relancé avec la touche espace lorsque la balle  touche une des parroie.
- Gestion et affichage du score lorsque la balle sort du canvas. Gestion dans les fonctions "score" dans "Ball".

#### v4

- Mise en place de la connexion.
- Mise en place du numero du client `pos` lors de la connexion.
- Mise en place de la limitation a deux joueur par game dans le server, si un autre tante de se connecter, il est automatiquement deconnecté du server.
- Mise en place de la connexion/deconnexion.
- Mise en place du lancment du jeu et de la balle que par le jeur #1.
- Mise en place de la synchronisation des raquettes.
- Mise en place de l'affichage du score.




#### Problèmes
- La balle a un peut de mal a se synchroniser parfois.

