function shuffleUsers(users){
    //construction d'une liste en html
    let html = '<ul>';
    // Mélanger les nom
    users.sort( (a,b) => Math.random() - 0.5);
    // ajout des items de liste (les noms) dans une boucle
    for(const user of users) {
        html += `<li>${user}</li>`;
    }

    html += '</ul>';

    return html;
}
//export du module 
module.exports = shuffleUsers;