class Egg extends  LivingCreature {
   constructor(x, y, index){
        super(x, y, index);
        this.multiply = 0;
        this.N = 1;
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
    transform() {
        for (var i in EggArr) {
            if (this.x == EggArr[i].x && this.y == EggArr[i].y) {
                EggArr.splice(i, 1);
                break;
            }
            matrix[this.y][this.x] = 4;
            var newBird = new Bird(this.x, this.y, this.index);
            BirdArr.push(newBird);
        }
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (this.multiply >= 11 && newCell) {
            var newEgg = new Egg(newCell[0], newCell[1], this.index);
            EggArr.push(newEgg);
            matrix[newCell[1]][newCell[0]] = 5;
            this.multiply = 0;
            this.N++
            if (this.N >= 3) {
                this.N = 0
                this.transform();
            }
        }
    }
}