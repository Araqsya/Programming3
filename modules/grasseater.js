var LivingCreature= require("./livingcreature")
module.exports=class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
        var a = Math.round(Math.random())
       if(a==1){
           this.gender="female"
       }
        else{
            this.gender="male"
        }
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
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character, matrix);
    }
    move(GrassEaterArr, matrix, grasseaterlifeArr) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var y = newCell[1]
            var x = newCell[0]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            this.energy--
            if (this.energy == 0) {
                this.die(GrassEaterArr, matrix, grasseaterlifeArr);
            }
        }
    }
    mul(GrassEaterArr, matrix, grasseaterlifeArr) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);

        if (this.energy==28 && newCell && this.gender=="female") {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            GrassEaterArr.push(newGrassEater);
            grasseaterlifeArr[0]++
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 10;
        }
    }
    die(GrassEaterArr, matrix, grasseaterlifeArr) {

        for (var i in GrassEaterArr) {
            if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                GrassEaterArr.splice(i, 1);
                grasseaterlifeArr[1]++
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
    eatToxic(newCell2, TXCgrassArr, GrassEaterArr, matrix,  txcgrasslifeArr, grasseaterlifeArr) {

        var y = newCell2[1]
        var x = newCell2[0]
        matrix[y][x] = 2
        matrix[this.y][this.x] = 0
        this.y = y
        this.x = x

        this.die(GrassEaterArr, matrix, grasseaterlifeArr)
        for (var i in TXCgrassArr) {
            if (x == TXCgrassArr[i].x && y == TXCgrassArr[i].y) {
                TXCgrassArr.splice(i, 1);
                txcgrasslifeArr[1]++
                break;
            }
        }

    }

    eat(GrassEaterArr, grassArr, TXCgrassArr, matrix, grasseaterlifeArr, grasslifeArr, txcgrasslifeArr) {
        var grassCells = this.chooseCell(1, matrix);
        var toxicCells = this.chooseCell(9, matrix);
        var newCell = this.random(grassCells);
        var newCell2 = this.random(toxicCells);
        if (newCell) {

            var y = newCell[1]
            var x = newCell[0]

            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    grasslifeArr[1]++
                    matrix[y][x] = this.index;
                    matrix[this.y][this.x] = 0
                    
                    this.y = y
                    this.x = x

                    this.energy += 2

                    break;
                }
            }

            this.mul(GrassEaterArr, matrix, grasseaterlifeArr);
        }
        else if (newCell2) this.eatToxic(newCell2,  TXCgrassArr, GrassEaterArr, matrix,  txcgrasslifeArr, grasseaterlifeArr)
        else this.move(GrassEaterArr, matrix, grasseaterlifeArr);
    }
}