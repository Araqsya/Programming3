var LivingCreature= require("./livingcreature")
module.exports=class Virus extends LivingCreature {
    constructor(x, y, index, matrix){
        super(x, y, index, matrix);
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
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }
   mul(VirusArr) {
    var emptyCells = this.chooseCell(0);
    var newCell = this.random(emptyCells);
    if (this.age==25) {
        var newVirus = new Virus(newCell[0], newCell[1], this.index);
        VirusArr.push(newVirus);
        this.matrix[newCell[1]][newCell[0]] == 8;
    }   
}
die(VirusArr) {
    if (this.age >=30 ) {
    for (var i in VirusArr) {
        if (this.x == VirusArr[i].x && this.y == VirusArr[i].y) {
            VirusArr.splice(i, 1);
            break;
        }
    }
    this.matrix[this.y][this.x] = 0
}}
    move(VirusArr) {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var y = newCell[1]
            var x = newCell[0]
            this.matrix[y][x] = 8
            this.matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.age++
            this.die(VirusArr);
            this.mul(VirusArr);
        }
    }
   
}