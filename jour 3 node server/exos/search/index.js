// ## 02 Exercice search JSON file

// Créez un projet et récupérez le fichier Data/ dans la partie Exercices du cours. 

// Nous allons créer une petite API qui retournera des données au format JSON.

// Implémentez les routes suivantes : 

// - all

// - /search/[Name_user] pour récupérer les informations liés à un utilisateur

// Gérez également les erreurs, si un user n'existe pas alors on retournera une page 404.

const http = require('http');
const fs = require('fs');

const hostname= "127.0.0.1",
    port = 8000;

const server = http.createServer((req, res) => {
    const url = req.url.replace('/','');

    console.log(url);

    if(url ==="all") {
        // récupérer le all.Json, pas de gestion d'erreur ici
        const json = JSON.parse(fs.readFileSync(`./Data/all.json`, "utf-8"));
        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(json));
        return;
    }

    if (url.includes("search")){
        // on découpe les éléments de l'url dans un array puis on récupère le dernier (le nom)
        const search = url.split(/\//).pop();
        let json;
        try{
            //on essaie de récupérer le json de la recherche
            json = JSON.parse(fs.readFileSync(`Data/${search}.json`, "utf-8"));
        }catch (err){
            // si aucun json n'a été trouvé
            res.writeHead(404, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({error : "404 not found"}));
            return;
        }
        // on affiche le json
        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(json));
        return;
    }
    // page racine
    res.writeHead(404, {"Content-Type" : "application/json"});
    res.end(JSON.stringify({error : "404 not found"}));
});

server.listen(port, hostname,  () => {
    console.log(`Server running at http://${hostname}:${port}`);
});