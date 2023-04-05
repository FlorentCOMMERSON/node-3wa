class Chifoumi {
    constructor({ sheet, rock, chisel, number_players, count }) {
        this.sheet = sheet;
        this.rock = rock;
        this.chisel = chisel;
        this.number_players = number_players;
        this.count = count;
        this.max = 3;
        this.stat = {
            same: 0,
        };
    }

    choice() {
        const elements = [this.sheet, this.rock, this.chisel];

        return elements[Math.floor(Math.random() * this.max)];
    }

    run() {

        this.stat.same = 0;

        this.stat.players = [];
        for (let i = 0; i < this.number_players; i++) {
            this.stat.players.push(0);
        }

        let [choice1, choice2] = [this.choice(), this.choice()];

        let count = 0;

        while (count < this.count) {
            if (choice1 === choice2) {
                this.stat.same++;
            }


            if (choice1 === this.sheet) {
                if (choice2 === this.rock) {
                    this.stat.players[0] += 1;
                } else {
                    this.stat.players[1] += 1;
                }
            }

            if (choice1 === this.rock) {
                if (choice2 === this.chisel) {
                    this.stat.players[0] += 1;
                } else {
                    this.stat.players[1] += 1;
                }
            }

            if (choice1 === this.chisel) {
                if (choice2 === this.sheet) {
                    this.stat.players[0] += 1;
                } else {
                    this.stat.players[1] += 1;
                }
            }

            [choice1, choice2] = [this.choice(), this.choice()];

            count++;
        }
    }

    showResults() {
        this.stat.winner = this.stat.players[0] > this.stat.players[1] ? "j1" : "j2";

        console.table(this.stat);
    }
}
exports.Chifoumi = Chifoumi;



