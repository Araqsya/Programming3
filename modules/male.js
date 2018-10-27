var LivingCreature = require("./livingcreature")
module.exports = class Male extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 15;
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

    die(MaleArr, matrix, malelifeArr) {

        for (var i in MaleArr) {
            if (this.x == MaleArr[i].x && this.y == MaleArr[i].y) {
                MaleArr.splice(i, 1);
                malelifeArr[1]++
                break;
                
            }
        }
        matrix[this.y][this.x] = 0
    }
    move(MaleArr, matrix, malelifeArr) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var y = newCell[1]
            var x = newCell[0]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy--
            if (this.energy == 0) {
                this.die(MaleArr, matrix, malelifeArr);
            }
        }
    }
    eat(MaleArr, grassArr, GrassEaterArr, PredatorArr, EggArr, BirdArr, matrix, grasslifeArr, grasseaterlifeArr, predatorlifeArr, egglifeArr, birdlifeArr, malelifeArr) {
        var emptyCells = this.chooseCell(5, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var x = newCell[0]
            var y = newCell[1]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy += 3
            for (var i in EggArr) {
                if (x == EggArr[i].x && y == EggArr[i].y) {
                    EggArr.splice(i, 1);
                    egglifeArr[1]++
                    break;
                }
            }
        }

        var emptyCells = this.chooseCell(4, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var x = newCell[0]
            var y = newCell[1]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy += 2
            for (var i in BirdArr) {
                if (x == BirdArr[i].x && y == BirdArr[i].y) {
                    BirdArr.splice(i, 1);
                    birdlifeArr[1]++
                    break;
                }
            }
        }

        var emptyCells = this.chooseCell(3, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var x = newCell[0]
            var y = newCell[1]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy += 2
            for (var i in PredatorArr) {
                if (x == PredatorArr[i].x && y == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    predatorlifeArr[1]++
                    break;
                }
            }
        }

        var emptyCells = this.chooseCell(2, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var x = newCell[0]
            var y = newCell[1]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy += 2
            for (var i in GrassEaterArr) {
                if (x == GrassEaterArr[i].x && y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    grasseaterlifeArr[1]++
                    break;
                }
            }
        }

        var emptyCells = this.chooseCell(1, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var x = newCell[0]
            var y = newCell[1]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy += 2
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    grasslifeArr[1]++
                    break;
                }
            }
        }
        else {
            this.move(MaleArr, grassArr, GrassEaterArr, PredatorArr, EggArr, BirdArr, matrix, malelifeArr);

        }
    }
}