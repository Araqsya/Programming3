var LivingCreature= require("./livingcreature")
module.exports=class Fire extends LivingCreature {
    constructor(x, y, index, matrix) {
        super(x, y, index, matrix);
        this.multiply = 0
    }
    die() {
        this.multiply++
        if (this.multiply == 10) {
            for (var i in FireArr) {
                if (this.x == FireArr[i].x && this.y == FireArr[i].y) {
                    FireArr.splice(i, 1);
                    break;
                }
            }
           this.matrix[this.y][this.x] = 0
        }
    }
}