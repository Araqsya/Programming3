class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
    }
    getNewCoordinates() {
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
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var y = newCell[1]
            var x = newCell[0]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy--
            if (this.energy == 0) {
                this.die();
            }
        }
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (this.energy == 20) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            GrassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] == this.index;
            this.energy = 10;
        }
    }
    die() {

        for (var i in GrassEaterArr) {
            if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                GrassEaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
    eatToxic(newCell) {

        var y = newCell[1]
        var x = newCell[0]
        matrix[y][x] = 2
        matrix[this.y][this.x] = 0
        this.y = y
        this.x = x

        this.die()
        for (var i in TXCgrassArr) {
            if (x == TXCgrassArr[i].x && y == TXCgrassArr[i].y) {
                TXCgrassArr.splice(i, 1);
                break;
            }
        }

    }

    eat() {
        var grassCells = this.chooseCell(1);
        var toxicCells = this.chooseCell(9);
        var newCell = random(grassCells);
        var newCell2 = random(toxicCells);
        if (newCell) {

            var y = newCell[1]
            var x = newCell[0]

            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);

                    matrix[y][x] = this.index;
                    matrix[this.y][this.x] = 0

                    this.y = y
                    this.x = x

                    this.energy += 2

                    break;
                }
            }

            this.mul();
        }
        else if (newCell2) this.eatToxic(newCell2)
        else this.move();
    }
}