var LivingCreature = require("./livingcreature")
module.exports = class Virus extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.age = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3]
        ];
    }
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character, matrix);
    }
    mul(VirusArr, matrix, viruslifeArr) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);
        if (this.age == 25) {
            var newVirus = new Virus(newCell[0], newCell[1], this.index);
            VirusArr.push(newVirus);
            viruslifeArr[0]++
            matrix[newCell[1]][newCell[0]] == 8;
        }
    }
    die(VirusArr, matrix, viruslifeArr) {
        if (this.age >= 30) {
            for (var i in VirusArr) {
                if (this.x == VirusArr[i].x && this.y == VirusArr[i].y) {
                    VirusArr.splice(i, 1);
                    viruslifeArr[1]++
                    break;
                }
            }
            matrix[this.y][this.x] = 0
        }
    }
    move(VirusArr, matrix, viruslifeArr) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var y = newCell[1]
            var x = newCell[0]
            matrix[y][x] = 8
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.age++
            this.die(VirusArr, matrix, viruslifeArr);
            this.mul(VirusArr, matrix, viruslifeArr);
        }
    }

}