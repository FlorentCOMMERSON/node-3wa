const http = require('http');
const hostname = 'localhost';
const port = 8000;

//envoi d'un requête vers le serveur
http.get(`http://${hostname}:${port}`, res => {
    let data = '';

    // recevoir des données par morceaux : Buffer
    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => console.log(data));
});