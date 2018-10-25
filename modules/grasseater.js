var LivingCreature= require("./livingcreature")
module.exports=class GrassEater extends LivingCreature {
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
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character, matrix);
    }
    move(GrassEaterArr, matrix) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var y = newCell[1]
            var x = newCell[0]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy--
            if (this.energy == 0) {
                this.die(GrassEaterArr, matrix);
            }
        }
    }
    mul(GrassEaterArr, matrix) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);
        if (this.energy==28) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            GrassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 10;
        }
    }
    die(GrassEaterArr, matrix) {

        for (var i in GrassEaterArr) {
            if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                GrassEaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
    eatToxic(newCell2, TXCgrassArr, GrassEaterArr, matrix) {

        var y = newCell2[1]
        var x = newCell2[0]
        matrix[y][x] = 2
        matrix[this.y][this.x] = 0
        this.y = y
        this.x = x

        this.die(GrassEaterArr, matrix)
        for (var i in TXCgrassArr) {
            if (x == TXCgrassArr[i].x && y == TXCgrassArr[i].y) {
                TXCgrassArr.splice(i, 1);
                break;
            }
        }

    }

    eat(GrassEaterArr, grassArr, TXCgrassArr, matrix) {
        var grassCells = this.chooseCell(1, matrix);
        var toxicCells = this.chooseCell(9, matrix);
        var newCell = this.random(grassCells);
        var newCell2 = this.random(toxicCells);
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

            this.mul(GrassEaterArr, matrix);
        }
        else if (newCell2) this.eatToxic(newCell2,  TXCgrassArr, GrassEaterArr, matrix)
        else this.move(GrassEaterArr, matrix);
    }
}