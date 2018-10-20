class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
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
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}


class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.inf = false
        this.multiply = 0
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
    infection() {
        var emptyCells = this.chooseCell(8);
        if (emptyCells) {
            this.inf = true
        }
        else {
            this.inf = false
        }

    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        this.infection()
        if(this.multiply>=5){
            this.transtoxic()
        }
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index, this.inf);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
       transtoxic() {
           if (this.inf == true) {
               for (var i in grassArr) {
                   if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                       grassArr.splice(i, 1);
                       break;
                   }
                   matrix[this.y][this.x] = 9;
                   var newTXC = new TXCgrass(this.x, this.y, 9);
                   TXCgrassArr.push(newTXC);
               }
           }
   
       }
}