// ## 01 Exercice Shuffle
// Créez un module utils dans un dossier src, dans ce fichier créez un algorithme qui mélange les users. 
// Puis définissez un serveur Node.js natif, comme on a vu dans ce cours, et utilisez deux routes : 
// la route racine qui affichera une page HTML avec la liste des users (voir les données ci-dessous) 
// et la route shuffle qui mélangera les utilisateurs.

// Constantes et variables
const http = require("http");
const shuffleUsers = require("./src/utils");

const hostname = "127.0.0.1";
const port = "8000";
const users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
];

// Server
const server = http.createServer((req,res) => {
    const url = req.url.replace('/','');

// pas de favicon pour l'instant
    if (url === 'favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});

        res.end();
        return; // pensez à arrêter l'exécution des scripts côté serveur une fois la réponse envoyée.
    }
    // Url racine
    if (url === ""){
        res.setHeader("Content-Type", "text/html;charset=utf8");
        res.end(
            `<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Exo Shuffle</title>   
                </head>
                <body>
                    <p><a href="/shuffle">Shuffle</a></p>
                </body>
            </html>`
        )
    }
    //url shuffle
    if (url === "shuffle"){
        const shuffle = shuffleUsers(users);
        res.setHeader("Content-Type", "text/html;charset=utf8");
        res.end(
            `<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Exo Shuffle</title>   
                </head>
                <body>
                    <p><a href="/shuffle">Shuffle</a></p>
                    ${shuffle};
                </body>
            </html>`
        )
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running ate http://${hostname}:${port}/`);
});