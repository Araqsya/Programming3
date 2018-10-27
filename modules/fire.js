var LivingCreature = require("./livingcreature")
module.exports = class Fire extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0
    }
    die(FireArr, matrix, firelifeArr) {
        this.multiply++
        if (this.multiply == 10) {
            for (var i in FireArr) {
                if (this.x == FireArr[i].x && this.y == FireArr[i].y) {
                    FireArr.splice(i, 1);
                    matrix[this.y][this.x] = 0
                    firelifeArr[1]++

                    break;
                }
            }
        }
    }

}