var LivingCreature= require("./livingcreature")
module.exports=class Predator extends  LivingCreature {
   constructor(x, y, index, matrix){
        super(x, y, index, matrix);
        this.energy = 100;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
     chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }
    move(PredatorArr) {
        var emptyCells = this.chooseCell(0);
        var grassCells = this.chooseCell(1);
        var newCell1 = this.random(grassCells)
        var newCell = this.random(emptyCells);
        if (newCell) {
            var y = newCell[1]
            var x = newCell[0]
            this.matrix[y][x] = 3
            this.matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy--}
            else if(grassCells){
                var y = newCell1[1]
            var x = newCell1[0]
            this.matrix[y][x] = 3
            this.matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy--
            }
            if (this.energy == 0) {
                this.die(PredatorArr);
            }
        }
    mul(PredatorArr) {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (this.energy >= 22) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            this.matrix[newCell[1]][newCell[0]] == 3;
            this.energy = 12;
        }
    }
    die(PredatorArr) {

        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
        this.matrix[this.y][this.x] = 0
    }
    eat(PredatorArr, GrassEaterArr) {
        var emptyCells = this.chooseCell(2);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var x = newCell[0]
            var y = newCell[1]
            this.matrix[y][x] = 3
            this.matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy += 2
            for (var i in GrassEaterArr) {
                if (x == GrassEaterArr[i].x && y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.mul(PredatorArr);
        } else {
            this.move(PredatorArr);
        }
    }
}