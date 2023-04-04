exports.priceTTC = function (price, tva = 0.2) {
    price = parseFloat(price);

    if(isNaN(price)) {
        console.error("Ce n'est pas un nombre");
    }
    return Math.floor((1+tva) * price * 100) / 100;
};