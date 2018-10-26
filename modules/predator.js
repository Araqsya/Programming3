var LivingCreature = require("./livingcreature")
var Grass = require("./grass")
module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 100;
        this.female = 0;
        this.male = 0;
        var a = Math.round(Math.random())
        if(a==1){
            this.gender="female"
            this.female++
        }
         else{
             this.gender="male"
             this.male++

         }
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
    move(PredatorArr, grassArr, matrix) {
        var emptyCells = this.chooseCell(0, matrix);
        var grassCells = this.chooseCell(1, matrix);
        var grass = this.random(grassCells)
        var newCell = this.random(emptyCells);

        if (newCell) {
            var y = newCell[1]
            var x = newCell[0]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy--
        }
        else if (grass){
            for (var i in grassArr) {
                if (grass[0] == grassArr[i].x && grass[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    var gr = new Grass(this.x, this.y, 1);
                    grassArr.push(gr)
                    matrix[this.y][this.x] = 1;
                    break;
                }
            }
        matrix[grass[1]][grass[0]] = 3;
        this.x = grass[0];
        this.y = grass[1];

        this.energy--;
        if (this.energy == 0) {
            this.die(PredatorArr, matrix);
        }
        }

    }
    mul(PredatorArr, matrix) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);
        if (this.energy >= 18 && newCell && this.gender =="female") {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 12;
        }
    }
    die(PredatorArr, matrix) {

        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
    eat(PredatorArr, GrassEaterArr, grassArr, matrix) {
        var emptyCells = this.chooseCell(2, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var x = newCell[0]
            var y = newCell[1]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy += 2
            for (var i in GrassEaterArr) {
                if (x == GrassEaterArr[i].x && y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.mul(PredatorArr, matrix);
        } else {
            this.move(PredatorArr, grassArr, matrix);
        }
    }
}