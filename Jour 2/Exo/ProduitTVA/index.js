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