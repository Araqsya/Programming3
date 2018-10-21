class Fire extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
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
            matrix[this.y][this.x] = 0
        }
    }
}