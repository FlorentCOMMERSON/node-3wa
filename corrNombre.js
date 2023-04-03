let count = 0;

// console.log("Vous devez choisir un nombre compris entre 1 et 100 pour trouver le nombre en or !");
process.stdout.write("Vous devez choisir un nombre compris entre 1 et 100 pour trouver le nombre en or !");

process.stdin.on("data", (chunk) => {
    const number = parseInt(chunk);
    const goldNumber = 42;

    count++;

    if (isNaN(number) === true){
        process.stdout.write("UN NOMBRE !");
    }

    if (count > 5) {
        process.stdout.write("Vous avez dépassé les 5 tentatives");
    }

    if (number > goldNumber){
        process.stdout.write(`Le nombre en or est plus petit que ${number}`);
    } else if (number < goldNumber){
        process.stdout.write(`Le nombre en or est plus grand que ${number}`);
    } else {
        process.stdout.write(`Vous avez trouvé en ${count} tentatives le nombre ${goldNumber}`);
        process.exit(0);
    };
   })
