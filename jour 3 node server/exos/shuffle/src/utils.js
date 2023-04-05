function shuffleUsers(users){
    let html = '<ul>';

    users.sort( (a,b) => Math.random() - 0.5);

    for(const user of users) {
        html += `<li>${user}</li>`;
    }

    html += '</ul>';

    return html;
}

module.exports = shuffleUsers;