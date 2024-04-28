# Hackaton 2024 - MelodyQuest

![map](./map.png)

Il s’agit d’un karaoké virtuel qui comporte des salles avec différents thèmes de musique et la possibilité de créer des salles privées. Il y’a une salle principale dans laquelle on trouve un accueil pour pouvoir choisir le thème de la salle souhaité donc une salle à thème ou une salle privée et qu’on veut et on peut également choisir d’inviter toute la map ou les personnages souhaités.

![image](https://github.com/LucasGitB/melodyquest/assets/83619646/708db3ee-cc76-4e7e-a032-3324b6e2270c)

## Production environment


## Contributors

### Developer Team

Lucas AFONSO - Alias : @LucasGitB
Jason AFONSO - Alias : @JasonAfs
Raouf ABDOU MSA - Alias : @raouf-abdoumsa

* *public*: Static files like PDFs or audio files
* *src*: Scripts files
* *tilesets*: All tilesets
* *map.tmj*: Map file
* *map.png*: The map thumbnail displayed on the in-game map information

If you want to use more than one map file, just add the new map file on root or in a folder.

we recommend using 500x500 images for the map thumbnails.

If you are going to create custom websites to embed in the map, please reference the HTML files in the `input` option in *vite.config.js*.

## Technical Stack

This project utilizes a stack comprising TypeScript and Node.js for the WorkAdventure map functionality, along with Symfony for the LiveScore API:

TypeScript: For scripting within WorkAdventure maps to manage dynamic behaviors.
Node.js: Serves as the runtime environment for developing and testing the interactive maps.
Laravel: Used for the LiveScore API, managing live score updates, video streaming, and sport of the day.

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

## Licenses

This project contains multiple licenses as follows:

* [Code license](./LICENSE.code) *(all files except those for other licenses)*
* [Map license](./LICENSE.map) *(`map.tmj` and the map visual as well)*
* [Assets license](./LICENSE.assets) *(the files inside the `src/assets/` folder)*

### About third party assets

If you add third party assets in your map, do not forget to:
1. Credit the author and license with the "tilesetCopyright" property present in the properties of each tilesets in the `map.tmj` file
2. Add the license text in LICENSE.assets
