// **03. Dans un template, utiliser l'objet JS suivant et passez-le à un template `.pug` :**
// ```js
// const loggedUser = {
//     name: {
//         first: 'Jean',
//         last: 'Dupont',
//     },
//     age: 36,
//     birthdate: new Date('1986-04-18'),
//     location: {
//         zipcode: '77420',
//         city: 'Champs-sur-Marne',
//     },
//     isAdmin: true
// };
// ```

// Le HTML généré devra être le suivant :
// ```html
// <div class="user-card">
//     <h4>Jean DUPONT <small>(36 ans)</small></h4>
//     <p>Né le 18/04/1986</p>
//     <p>Vit à <strong>Champs-sur-Marne, 77420</strong></p>
//     <span class="badge-admin">Est administrateur</span>
// </div>
// ```

// > Astuce: Afin d'obtenir un résultat visuel correctement indenté en HTML, vous pouvez passer l'option `{ pretty: true }` à **renderFile** et **compileFile**. Attention, cette option n'est pas recommandée en production, mais nous l'utiliseront ici pour vérifier le résultat des exercice

// ---

const pug = require('pug');

const loggedUser = {
    name: {
        first: 'Jean',
        last: 'Dupont',
    },
    age: 36,
    birthdate: new Date('1986-04-18'),
    location: {
        zipcode: '77420',
        city: 'Champs-sur-Marne',
    },
    isAdmin: true
};

try{
    const renderTemplate = pug.compileFile('template.pug', { pretty: true});
    const result = renderTemplate({loggedUser});
    console.log(result);
}catch (err) {
    console.log('Erreur de compilation :\n');
    console.log(err.message);
}
