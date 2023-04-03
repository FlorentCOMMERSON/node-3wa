const fs = require('fs');

// Méthode asynchrone

fs.readFile('alien.txt', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

// Méthode synchrone

try{
    const data = fs.readFileSync('alien.txt', 'utf8');
    console.log(data);
}catch (err){
    console.error(err)
};

const { writeFile } = fs; 

const data = "Hello Node.js";

// writeFile('alien.txt', data , (err) => {
//     if (err) throw err;
//     console.log('Saved!');
// });

const { appendFile } = fs; 

const data2 = "Facehugger !";

appendFile('alien.txt', data2 , (err) => {
    if (err) throw err;
    console.log('Saved!');
});