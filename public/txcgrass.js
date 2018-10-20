class TXCgrass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
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
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (this.multiply ==7 && newCell) {
            var newGrass = new TXCgrass(newCell[0], newCell[1], this.index, this.inf);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 9;
            this.multiply = 0;
        }
    }}