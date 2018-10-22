var LivingCreature= require("./livingcreature")
module.exports=class player extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0
    }}