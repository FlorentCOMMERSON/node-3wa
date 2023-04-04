// ## 01 Exercice rechercher un étudiant

// L'utilisateur doit proposer dans le terminal un nom d'étudiant. Dès que l'utilisateur à trouver un nom dans la liste on arrête le processus d'écoute.

// La recherche sera insensible à la casse et aux espaces.

const readline = require('readline');
const students = ["Alan", "Sonia", "Sophie"];

const rl = readline.createInterface({ 
    input : process.stdin,
    output : process.stdout});

rl.setPrompt("Name > ");
rl.prompt();

rl.on("line", (line) => {
    if (students.includes(line.trim())) {
        console.log('yes we did it, houra');
        rl.close();
        return
    }
    console.log('Try again ...');
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day !');
    process.exit(0);
});


