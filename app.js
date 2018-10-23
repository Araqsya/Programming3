var express = require('express');
var path = require('path');
var app = express();
var Grass =require("grass")
var GrassEater =require("./grasseater");
var Predator=require("./predator");
var Bird =require("./bird");
var Egg =require("./egg");
var Male =require("./male");
var Female =require("./female")
var Virus=require('./virus')
var TXCgrass = require("./txcgrass")
var Fire = require("./fire")
var grassArr = [];
var GrassEaterArr = [];
var PredatorArr = [];
var BirdArr = [];
var EggArr = [];
var MaleArr = [];
var FemaleArr = [];
var VirusArr = [];
var TXCgrassArr = [];
var FireArr = [];
createMatrix= require("./matrix")
var matrix = createMatrix(100, 100);
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
      FemaleArr.push(new Female(x, y, 7))
    }
    else if (matrix[y][x] == 8) {
      VirusArr.push(new Virus(x, y, 8))
    }
    else if (matrix[y][x] == 9) {
      TXCgrassArr.push(new TXCgrass(x, y, 9))
    }
    else if (matrix[y][x] == 10) {
      FireArr.push(new Fire(x, y, 9))
    }
  }
}
for (let i in grassArr) {
        grassArr[i].mul(grassArr, TXCgrassArr, matrix);
    }

    for (let i in GrassEaterArr) {
        GrassEaterArr[i].eat(GrassEaterArr, grassArr, TXCgrassArr, matrix);
    }
    
    for (var i in PredatorArr) {
        PredatorArr[i].eat(PredatorArr, GrassEaterArr, matrix);
    }
    

    for (var i in BirdArr) {
        BirdArr[i].eat(BirdArr, PredatorArr, grassArr, matrix);
    }
    for (var i in EggArr) {
        EggArr[i].mul(EggArr,BirdArr, matrix);
    }
    for (var i in MaleArr) {
        MaleArr[i].eat(MaleArr, grassArr, GrassEaterArr, PredatorArr, EggArr, BirdArr, matrix);
    }
    for (var i in FemaleArr) {
        FemaleArr[i].eat(FemaleArr, MaleArr, grassArr, GrassEaterArr, PredatorArr, EggArr, BirdArr, matrix);
    }
     for (var i in VirusArr) {
         VirusArr[i].move(VirusArr, matrix);
     }
     for (var i in TXCgrassArr) {
        TXCgrassArr[i].TXCfire(TXCgrassArr, FireArr, matrix);
    }
    for (var i in FireArr) {
        FireArr[i].die(FireArr, matrix);
    }
// Define the port to run on
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});