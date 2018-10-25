var LivingCreature= require("./livingcreature")
var Fire =require("./fire")
module.exports=class TXCgrass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0
    }
    TXCfire(TXCgrassArr, FireArr, matrix) {
       
        if (TXCgrassArr.length >= 200) {
            for (var i=0; i<100; i++) {
                if (this.x == TXCgrassArr[i].x && this.y == TXCgrassArr[i].y) {
                    TXCgrassArr.splice(i, 1);
                    matrix[this.y][this.x] = 10
                    var newFire = new Fire(this.x, this.y, 10);
                    FireArr.push(newFire);
                    break;
                }
            }
    }
}}