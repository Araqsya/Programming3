var LivingCreature= require("./livingcreature")
var TXCgrass = require("./txcgrass")
module.exports=class Grass extends LivingCreature {
    constructor(x, y, index, matrix) {
        super(x, y, index, matrix);
        this.multiply = 0;
    }

    infection() {
        if (this.chooseCell(8)) return true;
        else return false;
    }

    mul(grassArr, TXCgrassArr) {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        if (this.multiply >= 60 && this.infection()) {
            this.transtoxic(grassArr,TXCgrassArr);
        }
        else if (this.multiply >= 5 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);

            this.matrix[newCell[1]][newCell[0]] = this.index;

            this.multiply = 0;
        }
    }
    transtoxic(grassArr,TXCgrassArr) {
        for (let i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {

                grassArr.splice(i, 1);
                this.matrix[this.y][this.x] = 9;

                var newTXC = new TXCgrass(this.x, this.y, 9);
                TXCgrassArr.push(newTXC);

                this.multiply = 0;
                break;
            }
        }
    }
}