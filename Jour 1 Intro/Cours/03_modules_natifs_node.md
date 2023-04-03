# Modules Natifs node

## Introduction

Pour importez dans votre script courant un module, vous utiliserez la fonction **require** de Node :

```js
const myModule = require('myModule');
```

La notion de module : c'est un morceau de code, c'est une **unité** qui **encapsule** du code (pas d'effet de bord) et qui va permettre d'exporter du code. Les modules de Node.js n'ont rien avoir avec les modules ES6.

Node ne suit pas le format ES6 pour la gestion de ses modules, mais suit le **format CommonJS**. 

Pour connaitre la liste des modules natifs Node.js, il faut se rendre sur sa page de documentation, attention à la version de Node.js que vous utilisez, les modules d'une version à l'autre change.

[modules](https://nodejs.org/dist/latest-v14.x/docs/api/)

## Debug

Vous pouvez debuguer Node.js de différentes manières :

- Soit le debug de vscode

- Soit avec une option de commande lors de l'exécution d'un script par Node.js.

```bash
node --inspect myFile.js
```

- Soit en utilisant des console.error dans le code pour afficher des informations.

- Soit lire les informations remontées par Node.js dans la console.

## Module natif : os

Le module os donne des informations sur l'environnement système dans lequel s'exécute les scripts. 

### Exemples

Dans votre dossier Examples créez un fichier os_example.js, écrivez les lignes suivantes et exécutez le script en console

```js
// chargement du module dans le script courant
const os = require('os');

// on récupère les informations de l'utilisateur
const { username } = os.userInfo();

// on récupère le nombre de CPU
const cpus = os.cpus().length;

console.log(
  `Cet ordinateur appartient à ${username} il a ${cpus} CPU.`
);
```

## Process

Le module **process** est un objet global de Node.js, il fournit de l'information et un contôle sur le process courant Node.js. Vous n'avez pas à importer ce module dans votre script, ce dernier est présent par défaut.

Il permet par exemple de lire ou d'enregistrer des variables d'environnement. 

Affiche les variables d'environnement de votre système et de Node.js :

```bash
node -p 'process.env'
```

*Nous verrons plus tard comment définir et utiliser des variables d'environnement.*

Process permet également de poser des listeners sur des flux particuliers. Notez que chaque système d'exploitation est doté de 3 flux (ou stream en Anglais) : **entrée**, **sortie** et **erreur**.

- stream stdin permet de capturer les inputs passés à la console et de les passer en stream au script Node.js :

```js
process.stdin.write('Bonjour \n');
```

- stream stdout quand à lui fait l'inverse de stdin, il affiche des output dans la console. Ici le flux va du script vers la console :

```js
process.stdout.write('Bonjour \n');
```

- stream stderr en console permet d'afficher les erreurs.

```js
process.stderr.write('Error \n');
```

### Gestion de fin de process

La méthode **on** de process, permet d'écouter des événements. Vous pouvez par exemple rester à l'écoute de tout ce qui sera capturé en console dans votre script :

```js
process.stdin.on('data', (chunk) => {
    // récupère le flux et le converti en chaine de caractères, la méthode replace permet de supprimer le saut de ligne            
    const text = chunk.toString().replace("\n", ""); 
});
```

Si on souhaite arrêter l'écoute on doit faire un Ctrl + C. 

On peut également arrêter le processus lui-même dans le script JS :

```js
process.stdin.on('data', (chunk) => {
    processus.exit(0); // arrêt du processus la valeur 0 est une convetion
});
```

## fs

Ce module de Node permet de traiter les fichiers dans vos scripts. Vous pouvez lire, écrire ou supprimer des fichiers.

### méthode readFile de fs

Vous devez préciser le chemin, l'encodage du fichier et une fonction de callback.

- Méthode asynchrone pour lire un fichier.

```js
// Chargement du module dans votre code
const fs = require('fs');

fs.readFile('/Data/titanic.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

- Méhode synchrone pour lire un fichier.

```js
const fs = require('fs');

try {
  const data = fs.readFileSync('/Data/titanic.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
};
```

### Ecrire des caractèress dans un fichier

La méthode writeFile sur l'objet fs permet d'écrire dans un fichier :

```js
const fs = require("fs");
const { writeFile} = fs; // assignation par décomposition

const data = "Hello Node.js";

writeFile('myFile.txt', data, (err) => {
  if (err) throw err;
  console.log('Saved!');
});
```

## Ajouter des caractères dans un fichier

La méthode **appendFile** de fs permet d'ajouter un contenu à un fichier existant, par contre la méthode précédente, **writeFile**, écrasera à chaque fois le contenu.