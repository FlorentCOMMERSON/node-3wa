const express = require('express');

const app = express();

//sécurité et autorisations
app((req, res, next) => {
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})


// requete express
app.use((req, res) => {
    res.json({ message: 'Une bien belle requête !'});
})

// méthode next lance l'exécution et passe au middleware suivant
app.use((req, res, next) => {
    console.log('test');
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Une bien belle requête !'});
    next();
})

app.use((req, res, next) => {
    res.status(201);
})

//requete GET avec route
app.get('/data/movies', (req, res, next) => {
    const movies = [
        {
            id: '1',
            title : 'Alien',
            real : 'Ridley Scott', 
        },
        {
            id: '2',
            title : 'Blade Runner',
            real : 'Ridley Scott', 
        },
    ]
})

//requete POST avec route
app.post('data/form', (req, res, next) => {
    console.log(req.body);
    res.status(201);
});

// export du module
module.exports = app;

