# LIFPROJET - LPTO
## Objectifs
Ce projet à pour but d'implémenter un site web de jeu multijoueurs en ligne.
Vous pouvez y créer un compte, puis vous connecter afin de créer des salons public ou privé que vos amis pourront rejoindre pour vous affronter dans un mini-jeu
qui testera votre agilité à la souris.

## Installation
Pour pouvoir lancer ce projet,
vous devez disposer de NodeJS installé sur votre machine.
Vous devez aussi disposer de MongoDB.

### Pour accedez au site depuis le serveur Distant :
Connectez vous en SSH sur notre espace dans le serveur distant.
Accedez au répertoire /lifprojet-lpto/Backend
Puis executé la commade **npm start**.
Le serveur demarrera.
Rendez vous ensuite sur cet URL http://lif.sci-web.net/~lptsoft le site sera parfaitement fonctionnel.

### Pour accedez au site internet en version local :
Clonez ce projet,
Rendez vous sur le repertoire Backend et lancer seulement
**npm start**

Ouvrez un nouveau terminal, puis rendez vous sur le repertoire Frontend
entrez la commande **npm install**
suivit de **ng serve --open**
une page s'ouvrira automatiquement avec notre navigateur par défaut
Vous disposerez des mêmes fonctionnalités qu'en ligne.

Il y'a aussi un repertoire Application, rendez vous y
tapez **npm install**, suivit de **npm run-script build**,
suivit de **npm run-script electron**
Cela ouvrira une application native, contenant le client du site.

## Organisation

Le Projet est divisé en 3 parties,
1. Frontend Contient le client developpé sous angular,
Il contient un certains nombre de fichiers et dossiers de base.
Pour accedez au sources, il suffit d'acceder au répertoire src/app
Vous trouverez les différents components qui compose l'application, chaque composant dispose d'une partie html à afficher, d'un fichier de traitement en typescript, ainsi qu'une feuille de style.
Notre application est une arborescence de composants,
Un projet angular dispose aussi de fichiers dit de services, qui peuvent être injecté à nos composants.
typiquement le service d'authentification permet de sauvegarder les données d'authentification, qu'on peut réutiliser ensuite dans différents composant pour vérifié que nous sommes bien authentifié pour y acceder.

2. Backend Contient le serveur, sur lequels nous effectuons nos requêtes, le dossier database configure notre module nous permettant de se connecter à notre base de données MongoDB, le Dossier Socket qui implémentes les messages auxquelles réagit notre serveur. Le fichier app.js contient l'API, il configure les routes auxquelles notre serveur réagit. Le fichier server.js réunit toutes les fonctionnalités du serveur.

3. Une application de bureau, portée à l'aide d'électron. Avec les mêmes fonctionalitées que celles de l'application web.


## Résultats

Notre Projet contient pour l'instant différentes fonctionnalité : 

- Creation de compte / Authentification
- Création de salon public / privé
- Acces aux salons public / privé via clé
- Possibilité de chat entre plusieurs joueurs dans un salon
- Possibilité de patienté dans un lobby
- Possibilité de jouer à 1 mini-jeu à plusieurs
- Acces à la page Hall of Fame ou sont stocké les scores globaux et personnel


