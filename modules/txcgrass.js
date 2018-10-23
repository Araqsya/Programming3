var LivingCreature= require("./livingcreature")
var Fire =require("./fire")
module.exports=class TXCgrass extends LivingCreature {
    constructor(x, y, index, matrix) {
        super(x, y, index, matrix);
        this.multiply = 0
    }
    TXCfire() {
       
        if (TXCgrassArr.length >= 200) {
            for (var i=0; i<100; i++) {
                if (this.x == TXCgrassArr[i].x && this.y == TXCgrassArr[i].y) {
                    TXCgrassArr.splice(i, 1);
                    this.matrix[this.y][this.x] = 10
                    var newFire = new Fire(this.x, this.y, 10);
                    FireArr.push(newFire);
                    break;
                }
            }
    }
}}