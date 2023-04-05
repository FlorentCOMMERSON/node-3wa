const http = require("http");
const hostname = "localhost";
const port = "8000";

//Nous allons récupérer les input/output de notre serveur, c'est un stream, un flux entrant, 
// nous allons également gérer la réponse et sa sortie.
//req représente la requête.
// res représente la réponse.
const server = http.createServer((req, res) => {

    const url = req.url.replace('/','');

    if (url === 'favicon.ico') {
        //La méthode writeHead envoie les entêtes au client (navigateur). 
        //Précisez le code HTTP de retour, ici 200, c'est le statut HTTP. 
        res.writeHead(200, {'Content-Type': 'image/x-icon'});

        res.end();
        return;
    }
    
    if (url === 'test') {
        // La méthode write écrit la réponse en sortie
        // end termine la requête. Il ne faut pas l'oubliez c'est primordiale pour stopper le processus. 
        // end permet à la fois de write puis de fermer la requête.
        res.end(`<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>test</title>   
                </head>
                <body>
                    <p>Bienvenue sur la page de test</p>
                </body>
            </html>`
        );

    }

    res.end("Hello World!");
});

//Il faut également définir appeler la méthode listen, pour écouter les requêtes entrantes sur un port donné, 
// une fois que le serveur est lancé.
server.listen(port, hostname, () => {
    console.log(`Server running ate http://${hostname}:${port}/`);
});


