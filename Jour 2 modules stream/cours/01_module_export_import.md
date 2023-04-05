# Notions complémentaire sur les modules

Pour exporter des variables, fonctions ou objets dans Node.js, vous utiliserez la syntaxe suivante, créez un fichier utils.js :

```js

exports.name = "Alan";

```

Vous pouvez également exporter des fonctions, ou des objets :

```js

exports.Product = function(name, price){
    this.name = name;
    this.price = price;
};
```

Ou exporter plusieurs éléments en même temps :

```js

exports.Utils = {
    product : function(name, price) {},
    count : 0,
    model : {
        name : null, 
        email : null
    }
}
```

Dans un fichier index.js, dans le même dossier que le fichier utils.js (module) précédent, pour importer les éléments on utilise la fonction require de Node.js :

```js
const u = require('./utils');

```

## Des modules hors contexte

Node.js est parfaitement capable d'importer des modules qui ne sont pas dans le contexte courant, c'est à dire dans le dossier dans lequel on a ses scripts. En effet, Node.js possède dans son objet exports une variable **path** qui lui permet de parcourir des dossiers node_modules qui se trouvent, soit dans votre projet, soit dans les dossiers propres à Node.js installés dans votre système.

```js
// import d'un module natif de Node.js
const http = require('http');
```

## Module tiers

Il existe un grand nombre de modules tiers que l'on peut installer dans un projet Node.js. Nous allons utiliser le module **dotenv** qui permet de définir facilement des variables d'environnement.

Une variable d'environnement est une variable propre au contexte dans lequel notre application est exécutée. Vous pouvez être en développement ou en production, nous utilisons classiquement une variable d'environnement pour définir le type de développement en cours.

Dans un fichier app.js définissez la variable d'environnement suivante :

```js
process.env.NODE_ENV= 'production';
```

Vous allez maintenant utiliser un module tier : dotenv il vous permettra de définir vos variables d'environnement dans un fichier à part .env. Ce fichier sera placer à la racine de votre projet.



