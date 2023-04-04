# Readline

Les streams permettent d'optimiser le traitement des données en gérant les flux, par exemple les flux des données en console. Il faut savoir que JS ou Node.js est limité en mémoire (2Gb max). 

L'utilisation des streams permet de gérer des données sans que l'on ait besoin de les stocker. Cette notion n'est pas évidente à bien assimiler, il faut du temps pour bien l'appréhender, donc prennez le temps de lire et faire les exercices.

- lecture d'un flux de données en console :

```js
process.stdin.setEncoding('utf8');

process.stdin.on('data', (input) => {
    
    input = input.toString();

    input.includes('stop') ? process.stdin.pause() : console.log(input);
    
})

process.stdin.on('pause', () => process.stdout.write('end \n'));
```

## Readline

Ce module permet de lire ligne par ligne, par exemple, le contenu d'un fichier. Nous pouvons également l'utiliser pour créer une interface pour gérer les flux d'entrées et de sorties de la console.

```js
const readline = require("readline");

// Création de l'interface de gestion des entrées et sorties, basée sur input et ouput de la console

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

rl.question("How do you like node ?", answer => {
    console.log(` Your answer ${answer} `);

    // la méthode close permet d'arrêter le processus d'écoute 
    rl.close();
});

```

Vous pouvez utiliser les événements de l'interface de readline. La méthode **on** avec line permet de récupérer les données (flux en entrée) tapez en console.

```js
rl.on('line', (data) => {
});

```

## Exemple plus complet dans le fichier exemple stream readline.js





