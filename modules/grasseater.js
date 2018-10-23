var LivingCreature= require("./livingcreature")
module.exports=class GrassEater extends LivingCreature {
    constructor(x, y, index, matrix) {
        super(x, y, index, matrix);
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
    move(GrassEaterArr) {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var y = newCell[1]
            var x = newCell[0]
            this.matrix[y][x] = 2
            this.matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy--
            if (this.energy == 0) {
                this.die(GrassEaterArr);
            }
        }
    }
    mul(GrassEaterArr) {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (this.energy==28) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            GrassEaterArr.push(newGrassEater);
            this.matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 10;
        }
    }
    die(GrassEaterArr) {

        for (var i in GrassEaterArr) {
            if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                GrassEaterArr.splice(i, 1);
                break;
            }
        }
        this.matrix[this.y][this.x] = 0
    }
    eatToxic(newCell, TXCgrassArr, GrassEaterArr) {

        var y = newCell[1]
        var x = newCell[0]
        this.matrix[y][x] = 2
        this.matrix[this.y][this.x] = 0
        this.y = y
        this.x = x

        this.die(GrassEaterArr)
        for (var i in TXCgrassArr) {
            if (x == TXCgrassArr[i].x && y == TXCgrassArr[i].y) {
                TXCgrassArr.splice(i, 1);
                break;
            }
        }

    }

    eat(GrassEaterArr, grassArr, TXCgrassArr) {
        var grassCells = this.chooseCell(1);
        var toxicCells = this.chooseCell(9);
        var newCell = this.random(grassCells);
        var newCell2 = this.random(toxicCells);
        if (newCell) {

            var y = newCell[1]
            var x = newCell[0]

            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);

                    this.matrix[y][x] = this.index;
                    this.matrix[this.y][this.x] = 0

                    this.y = y
                    this.x = x

                    this.energy += 2

                    break;
                }
            }

            this.mul(GrassEaterArr);
        }
        else if (newCell2) this.eatToxic(newCell2,  TXCgrassArr, GrassEaterArr)
        else this.move(GrassEaterArr);
    }
}