// ## 02 Exercice rechercher dans un fichier TP 01 

// 1. Vous allez lire un fichier puis calculer la moyenne de chaque étudiant. Affichez le nom de l'étudiant, puis donner sa moyenne. Récupérez les données dans le dossier Data le fichier **students.json**.

// 2. Pensez à gérer le cas où l'on souhaite arrêter le processus. Ainsi que le fait que la recherche doit être insensible à la casse. 

// 3. Gérez les exceptions/erreurs de saisi.

const fs = require("fs");
const readline = require("readline");
// On convertit les données du JSON en objet avec JSON.parse
const data = JSON.parse( fs.readFileSync("./Data/students.json") );
const {students} = data;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.setPrompt("Saisir un nom > ");
  rl.prompt();
  
  rl.on("line", (line) => {
    line = line.trim().toString();

    //test pour ne pas avoir un nombre
    if(isNaN(line) === false){
        console.log("Vous devez renseigner une chaîne de caractères");
        rl.prompt();
        return;
    }
    // si l'utilisateur veut stop le process
    if (line == "stop") {
        console.log("Have a great day!");
        process.exit(0);
    }

    for (const student of students) {
        const {name, notes} = student;
        //On compare le nom de l'étudiant de l'itération ( converti en minuscules) 
        //avec le nom entré dans la console (lui aussi converti en minuscules en minuscules)
        if (name.toLowerCase() === line.toLowerCase()){
            //basiquement reduce additionne les valeurs d'un tableau
            const sum = notes.reduce((acc, curr) => acc + curr);
            //calcul de la moyenne
            const average = Math.floor((sum / notes.length) * 100) /100;

            console.log(average);
            console.log("Une autre moyenne ?");
            rl.prompt();

            return
        }
    }
console.log("Etudiant non trouvé dans le fichier");
    rl.prompt();
  }).on("close", () => {
    console.log("Have a great day!");
    process.exit(0); // arrêt du processus
  });