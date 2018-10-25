var LivingCreature= require("./livingcreature")
var TXCgrass = require("./txcgrass")
module.exports=class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
    }

    infection(matrix) {
        if (this.chooseCell(8, matrix)) return true;
        else return false;
    }

    mul(grassArr, TXCgrassArr, matrix) {
        this.multiply++;
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);

        if (this.multiply >= 60 && this.infection(matrix)) {
            this.transtoxic(grassArr,TXCgrassArr, matrix);
        }
        else if (this.multiply >= 5 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);

            matrix[newCell[1]][newCell[0]] = this.index;

            this.multiply = 0;
        }
    }
    transtoxic(grassArr,TXCgrassArr, matrix) {
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