
// var grassArr = [];
// var GrassEaterArr = [];
// var PredatorArr = [];
// var BirdArr = [];
// var EggArr = [];31
// var MaleArr = [];
// var FemaleArr = [];
// var VirusArr = [];
// var TXCgrassArr = [];
// var FireArr = [];

// var matrix = createMatrix(100, 100);
var matrix;
var side = 5;
 socket.on("create mtx", function(mtx){matrix = mtx});
function setup() {
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

   

    /*for (var y = 0; y < matrix.length; y++) {
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
                FemaleArr.push(new Female(x, y, 7))
            }
             else if (matrix[y][x] == 8) {
                 VirusArr.push(new Virus(x, y, 8))
             }
             else  if (matrix[y][x] == 9) {
                TXCgrassArr.push(new TXCgrass(x, y, 9))
             }
             else  if (matrix[y][x] == 10) {
                FireArr.push(new Fire(x, y, 9))
             }
        }
    }*/
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
                fill('#FEB1B1');
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
             else if (matrix[y][x] == 8) {
                 fill('black');
                 rect(x * side, y * side, side, side);
             }
            else if (matrix[y][x] == 9) {
                fill('lightgreen');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 10) {
                fill('orange');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill('#acacac');
                rect(x * side, y * side, side, side);
            }

        }
    }
    /*for (let i in grassArr) {
        grassArr[i].mul();
    }

    for (let i in GrassEaterArr) {
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
     for (var i in VirusArr) {
         VirusArr[i].move();
     }
     for (var i in TXCgrassArr) {
        TXCgrassArr[i].TXCfire();
    }
    for (var i in FireArr) {
        FireArr[i].die();
    }*/
}





















