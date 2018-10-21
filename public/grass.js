class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.weather = 0;
        this.weather++;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(ch) {
        var found = [];
        for (let i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}


class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
    }

    infection() {
        if (this.chooseCell(8)) return true;
        else return false;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (this.multiply >= 60 && this.infection()) {
            this.transtoxic();
        }
        else if (this.multiply >= 5 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);

            matrix[newCell[1]][newCell[0]] = this.index;

            this.multiply = 0;
        }
    }
    transtoxic() {
        for (let i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {

                grassArr.splice(i, 1);
                matrix[this.y][this.x] = 9;

                var newTXC = new TXCgrass(this.x, this.y, 9);
                TXCgrassArr.push(newTXC);

                this.multiply = 0;
                break;
            }
        }
    }
}