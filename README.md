# Hackaton 2024 - MelodyQuest

![map](./map.png)

Il s’agit d’un karaoké virtuel qui comporte des salles avec différents thèmes de musique et la possibilité de créer des salles privées. Il y’a une salle principale dans laquelle on trouve un accueil pour pouvoir choisir le thème de la salle souhaité donc une salle à thème ou une salle privée et qu’on veut et on peut également choisir d’inviter toute la map ou les personnages souhaités. Lorsque les joueurs sont téléportés dans leurs salles, il y'a un micro qui permet de lancer la vidéo du karaoké pour que tout le monde ait accès à ça, le joueur dois faire un partage d'écran et activé sa caméra et son micro pour que les autres joueurs puissent profiter de la performance du chanteur. À la fin de chaque partie, il y'a un système d'évaluation pour noter la performance et pour pouvoir classer les joueurs !

## Video

https://drive.google.com/file/d/1uxG5JTUiSTqrXOMjmrNkWtiNCHcqF6Pv/view?usp=sharing

## Lien du repository de l'API 

https://github.com/LucasGitB/melodyquestrating.git

## Contributors

List of functionalities along with the respective authors:

 * Création de l'API pour l'accueil + système de notation + tableau de scores (Raouf + Lucas)
 * Système d'invitation + téléportation + Intégration de l'API sur la map + Intégration Youtube (Jason)


### Developer Team

* Lucas AGUESSE - Alias *: @LucasGitB*
* Jason AFONSO - Alias *: @JasonAfs*
* Raouf ABDOU MSA - Alias *: @raouf-abdoumsa*


## Technical Stack

TypeScript
Node.js
Laravel
ExpresJs

## Requirements

Node.js version >=17

## Installation

With npm installed (comes with [node](https://nodejs.org/en/)), run the following commands into a terminal in the root directory of this project:

```shell
npm install
npm run dev
```

## Test production map

You can test the optimized map as it will be in production:
```sh
npm run build
npm run prod
```
## BDD

Vous devez créer une variable d'environnement dans le dossier backend :
Dans un fichier .env

DATABASE_URL=postgres://postgres.hvrnzohgbgijettvhzek:melodyquest2024@aws-0-eu-central-1.pooler.supabase.com:5432/postgres

## Licenses

This project contains multiple licenses as follows:

* [Code license](./LICENSE.code) *(all files except those for other licenses)*
* [Map license](./LICENSE.map) *(`map.tmj` and the map visual as well)*
* [Assets license](./LICENSE.assets) *(the files inside the `src/assets/` folder)*

### About third party assets

If you add third party assets in your map, do not forget to:
1. Credit the author and license with the "tilesetCopyright" property present in the properties of each tilesets in the `map.tmj` file
2. Add the license text in LICENSE.assets
