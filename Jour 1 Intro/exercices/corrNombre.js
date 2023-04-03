// ### 01 Exercice 

// 1. Créez un petit jeu en console : on doit deviner un nombre compris entre 1 et 100. Si l'utilisateur propose un nombre plus petit on lui indique qui l'est plus grand et réciproquement. 

// 2. L'utilisateur à 10 tentatives pour deviner le nombre caché, après le jeu s'arrête. Si l'utilisateur trouve le nombre avant cette borne, le jeu s'arrête également. 

// 3. Pensez à gérer également les erreurs de saisi dans le jeu.

let count = 0;

// console.log("Vous devez choisir un nombre compris entre 1 et 100 pour trouver le nombre en or !");
process.stdout.write("Vous devez choisir un nombre compris entre 1 et 100 pour trouver le nombre en or en 10 essais maximum !");

process.stdin.on("data", (chunk) => {
    const number = parseInt(chunk);
    const goldNumber = 42;

    count++;
    
    // Tests pour gérer le nombre de tentative
    if(count<=10){
        process.stdout.write(`Vous en êtes à la tentative n°${count}`);
    }else{
        process.stdout.write(`Vous n'êtes pas parvenu à trouver le nombre en Or`);
    }

    // Test pour vérifier que l'input est bien un int
    if (isNaN(number) === true){
        process.stdout.write("UN NOMBRE !");
    }

    // Tests pour renseigner l'utilisateur sur sa position par rapport au nombre à trouver
    if (number > goldNumber){
        process.stdout.write(`Le nombre en or est plus petit que ${number}`);
    } else if (number < goldNumber){
        process.stdout.write(`Le nombre en or est plus grand que ${number}`);
    } else {
        process.stdout.write(`Vous avez trouvé en ${count} tentatives le nombre ${goldNumber}`);
        process.exit(0);
    };
   })
