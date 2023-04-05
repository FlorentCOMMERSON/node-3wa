# Server node

Nous allons découvrir le module http pour créer notre propre serveur natif en Node.js.

```js
// module
const http = require("http");
```

Pour créer un serveur qui écoutera des requêtes, nous allons faire une instance de la méthode **createServer** sur le module http.

```js
const server = http.createServer();
```

La gestion des requêtes se fait de manière asynchrone, elle se fera à l'aide d'une **fonction callback**.

Notez que http est également capable d'effectuer des requêtes, nous le verrons plus tard.

```js
// pour faire des requêtes clients
http.get(…);
```

## Création du callback

Nous allons récupérer les input/output de notre serveur, c'est un stream, un flux entrant. Nous allons également gérer la réponse et sa sortie.

- Stream req représente la requête.

- Stream res représente la réponse.

- La méthode writeHead envoie les entêtes au client (navigateur). Précisez le code HTTP de retour, ici 200, c'est le statut HTTP. N'oubliez pas l'encodage également.

- La méthode write écrit la réponse en sortie, end termine la requête. Il ne faut pas l'oubliez c'est primordial pour stopper le processus. 

```js
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.write("Bonjour le serveur");
  res.end();
});
```

Il faut également définir appeler la méthode listen, pour écouter les requêtes entrantes sur un port donné, une fois que le serveur est lancé.

```js
server.listen(8000);
```

## Exemple complet dans le fichier server.js


## Gestion des routes 

Vous pouvez également créer des routes spécifiques pour servir des pages en fonction d'une URL. Pensez au favicon.ico, il faut gérer cette requête faites par le navigateur sur votre serveur.

```js

// server 
const server = http.createServer((req, res) => {

    const url = req.url.replace('/', '');

    if (url === 'favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });

        res.end();
        return; // pensez à arrêter l'exécution des scripts côté serveur une fois la réponse envoyée.
    }

    res.writeHead(200, {
    "Content-Type": "text/plain",
        });
    res.end("Hello, World!"); // méthode write et end 
    }
);

```

Pour gérer les autres routes vous utiliserez la propriété **url** de la méthode req. Vous analyserez sa valeur pour définir une réponse donnée. Notez que vous pouvez retourner une page HTML également avec la méthode res.end :

```js
// analyse de la route
const url = req.url.replace('/', '');

res.end(`
  <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Ma page de test</title>
    </head>
    <body>
      <img src="images/firefox-icon.png" alt="Mon image de test">
    </body>
  </html>
`);

```

## Servir un fichier statique

Nous allons utiliser le module **fs** de Node.js pour servir un fichier statique à notre client. 
Voir l'exemple dans le fichier stat.js



