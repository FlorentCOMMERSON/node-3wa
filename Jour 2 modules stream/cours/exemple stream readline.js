var readline = require('readline');

// Création de l'interface de gestion des entrées et sorties, basée sur input et ouput de la console
rl = readline.createInterface(process.stdin, process.stdout);

// Message dans la console
rl.setPrompt('Aloha > ');
// définit l'invite de commande
rl.prompt();

// écoute tout les événements de la console et récupère le flux en entrée
rl.on('line', function(line){
    switch(line.trim()) {
        case 'hello':
            console.log('world !');
            break;
        case 'quoi':
            console.log('feur !');
            break;    
        default:
            console.log('Say what ? I might have heard `' + line.trim() + '`');
            break    
    }
    rl.prompt();
     // si on fait un Ctrl + c pour arrêter le process
}).on('close', function() {
    console.log('Have a great day !');
    process.exit(0);
})