const fs = require('fs'),
    http = require('http');


http.createServer(function(req, res) {
    // __dirname donne le chemin absolu pour trouver le fichier
  // ici la politique des urls indiquera le chemin à suivre pour récupérer le fichier
    fs.readFile(__dirname + req.url, (err, data) => {
         // on gère les erreurs et surtout on retourne une page 404 si il y a un problème
        if(err){
            res.writeHead(404);
            res.end(JSON.stringify(err));
            // Il ne faut oublier de sortir de la fonction pour ne pas exécuter la suite du script
            return;
        }
        // si tout se passe bien on retourne les données
        res.writeHead(200);
        res.end(data);
    });
}).listen(8000);