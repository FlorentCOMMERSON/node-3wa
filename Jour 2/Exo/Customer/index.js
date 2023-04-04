// ## 01 Exercice customer

// Créez un dossier **customer** dans lequel vous créez deux fichiers utils.js et index.js, le fichier utils est un module permettant d'écrire le code métier.

// Dans le fichier index.js importez le code, vos fonctions par exemple, permettant de mettre les prix TTC de l'objet priceHT suivant, vous ajouterez le prix TTC dans le tableau priceHT.

// Modifiez le tableau pour mettre les prix TTC

//*Indications : gérez les décimales dans les prix TTC à calculer, fixez celui-ci à 2 décimales après la virgule.*

//La partie logique du calcul est dans un fichier externe que l'on importe
const u = require ('./utils');

const {priceTTC} = u;

const products = [
    { name : "Apple", priceHT : 1.0, priceTTC : null },
    { name : "Orange", priceHT : 1.2, priceTTC : null },
    { name : "Rasberry", priceHT : 2.5, priceTTC : null },
];

products.forEach(function(product){
    product.priceTTC = priceTTC(product.priceHT);
});

console.table(products);