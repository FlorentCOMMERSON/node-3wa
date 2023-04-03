// ### 02 Exercice read students

// Les données sont dans le dossier Data et dans le fichier student.txt

// 1. Lisez le fichier à l'aide de la méthode asynchrone.

// 1.(bis) Pour la suite utilisez l'approche synchrone afin de récupérer les données que vous pourrez exploiter par la suite dans le script.

// 2. Recherchez dans le tableau tous les étudiants qui ont eu plus de 17 de moyenne strictement.

// 3. Recherchez dans le tableau l'étudiant qui a eu la meilleur node.

// 4. Récupérez les données dans un objet student, puis ajoutez chaque étudiant dans un tableau students.

// 5. Ordonnez maintenant l'ensemble des données dans le tableau.

// 6. Ajoutez dans le fichier students.txt les étudiants suivants :

// - 18 Sonia Paris

// - 17 Clarisse Marseille

// 7. Lire le fichier lui-même et mettez chaque nom en majuscule

const fs = require("fs");

// 1 - asynchrone

fs.readFile('students.txt', "utf8", (err, data) => {

    if(err) {
        console.error(err);
        return;
    }
// on gère le retour chariot \r (éventuel) et saut de ligne \n et on écrase le tableau précédent avec les résultats
    const lines = data.split(/\r?\n/);
    // console.log(lines);
});

// 1-bis synchrone afin d'avoir le tableau de données avant de le traiter. 

let st=[];
try{
// on gère le retour chariot \r (éventuel) et saut de ligne \n qui servent à séparer les différentes lignes comme données du tableau st
    st = fs.readFileSync('students.txt', "utf8").split(/\r?\n/);
   // On créer un filtre pour enlever les données du tableau vides 
    st = st.filter((data) => data != "");
} catch(err){
    console.error(err);
}

// 2 - plus de 17
const elite=[];
for (line of st){
    // Cette seconde boucle parcourt les différentes données de chaque ligne qui sont 
    // split par l'espace (ne fonctionnerait donc pas en l'état avec des villes contenant des espaces)
    for(y of line.split(" ")){
        // On compare chaque donnée avec 17 puis on pousse la ligne correspondante si true
        if (y > 17) {
            elite.push(line);
        }
    }
}

// 3 -  meilleure note

let bestNote = 0;
let bestOfTheBest = "";

for (line of st){
    for(y of line.split(" ")){
        if (isNaN(y)=== false && y > bestOfTheBest){
            bestNote = parseInt(y);
            bestOfTheBest = line;
        }
    }
}
// console.log(bestOfTheBest);

// 4 Récupérer les données / puis ajouter dans un tableau

const students =[];

for (line of st) {
    const [note, name, address] = line.split(" ");
    //permet d'éviter la lignede données Note Name Address 
    if (name === "Name") continue;
    students.push ({name, note, address});
}

// 5 - Ordonner dans le tableau par note

students.sort( (s1,s2) => s1.note - s2.note);

// console.log(students);

// 6 - Ajouter des étudiants

const {appendFile, writeFile} = fs; // assignation par décomposition

for (const st of [ "18 Sonia Paris", "17 Clarisse Marseille"])
//On ajoute les étudiants au fichier txt
appendFile('students.txt',"\n" + st , (err) => {
    if (err) throw err;
    //On lit le nouveau fichier mis à jour
    fs.readFile("students.txt", 'utf8', (err, data)=> {
        if (err) {
            console.error(err);
            return
        }
    })
})

// 7 Récupérer parisiens et placer dans un nouveau fichier

let str = "";
for (const i in st) {
    const [note, name, address] = st[i].split(" ");
    // Gestion de la ligne Note Name Adress afin de l'afficher dans le nouveau fichier
    if (name === "Name") { 
        str += `${note} ${name} ${address} \n`;
        continue;
    }
    // Test pour récupérer uniquement les lignes où l'adresse est Paris et les concaténer à notre variable str
    if (address == "Paris" ){
    str += `${note} ${name.toUpperCase()} ${address} \n`;
    }
}
//Ecriture de la variable str sur le nouveau fichier txt dédié
writeFile("studentsParis.txt", str, console.error);
