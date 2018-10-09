function createMatrix(n, m) {
    var matrix1 = [];
    for (var y = 0; y < m; y++) {
        matrix1[y] = [];
        for (var x = 0; x < n; x++) {
            matrix1[y][x] = Math.round(Math.random())
        }
    }
    matrix1[89][15] = 2;
    matrix1[8][99] = 2;
    matrix1[5][55] = 2;
    matrix1[87][63] = 2;
    matrix1[31][75] = 2;
    matrix1[22][63] = 2;
    matrix1[92][5] = 3;
    matrix1[5][88] = 3;
    matrix1[30][49] = 3;
    matrix1[99][9] = 3;
    matrix1[5][0] = 3;
    matrix1[0][99] = 5;
    matrix1[99][99] = 5;
    matrix1[0][0] = 5;
    matrix1[99][0] = 5;
    matrix1[51][45] = 6;
    matrix1[49][45] = 6;
    matrix1[50][46] = 7;
    return matrix1;
}
var grassArr = [];
var GrassEaterArr = [];
var PredatorArr = [];
var BirdArr = [];
var EggArr = [];
var MaleArr = [];
var FemaleArr = [];
var matrix = createMatrix(100, 100);

var side = 5;

function setup() {
    frameRate(16);
    createCanvas(matrix[0].length * side, matrix.length * side, );
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                GrassEaterArr.push(new GrassEater(x, y, 2))
            }
            else if (matrix[y][x] == 3) {
                PredatorArr.push(new Predator(x, y, 3))
            }
            else if (matrix[y][x] == 5) {
                EggArr.push(new Egg(x, y, 5))
            }
            else if (matrix[y][x] == 4) {
                BirdArr.push(new Bird(x, y, 4))
            }
            else if (matrix[y][x] == 6) {
                MaleArr.push(new Male(x, y, 6))
            }
            else if (matrix[y][x] == 7) {
                FemaleArr.push(new Female(x, y, 6))
            }
        }
    }
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill('red');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill('purple');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('orange');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill('#0000CD');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill('#FF00FF');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill('#acacac');
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in GrassEaterArr) {
        GrassEaterArr[i].eat();
    }

    for (var i in PredatorArr) {
        PredatorArr[i].eat();
    }

    for (var i in BirdArr) {
        BirdArr[i].eat();
    }
    for (var i in EggArr) {
        EggArr[i].mul();
    }
    for (var i in MaleArr) {
        MaleArr[i].eat();
    }
    for (var i in FemaleArr) {
        FemaleArr[i].eat();
    }


}





















