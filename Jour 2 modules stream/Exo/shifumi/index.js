const fs = require("fs");
const readline = require('readline');
const u = require("./src/utils");
require("dotenv").config();

const {APP_SHEET, APP_ROCK, APP_CHISEL, APP_NUMBER_PLAYERS} = process.env;

const chifoumi = new u.Chifoumi({
    sheet : APP_SHEET,
    rock : APP_ROCK,
    chisel : APP_CHISEL,
    number_players : APP_NUMBER_PLAYERS,
    count : 42,
});

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

console.log(
    'Taper start pour commencer !'
);

rl.setPrompt("hello >");
rl.prompt();

rl.on("line", (line) => {
    line = line.trim().toString();

    if (line === "start"){

        chifoumi.run();

        chifoumi.showResults();

        console.log(" Nouvelle partie ? Taper start !");
        rl.prompt;
    }

    if (line == "stop") {
        console.log("Merci d'avoir joué");
        process.exit(0);
    }
}).on("close", () => {
    console.log("Merci d'avoir joué");
    process.exit(0);

});