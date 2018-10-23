var express = require('express');
var path = require('path');
var app = express();
var LivingCreature = require("./modules/livingcreature")
var Grass = require("./modules/grass")
var GrassEater = require("./modules/grasseater");
var Predator = require("./modules/predator");
var Bird = require("./modules/bird");
var Egg = require("./modules/egg");
var Male = require("./modules/male");
var Female = require("./modules/female")
var Virus = require('./modules/virus')
var TXCgrass = require("./modules/txcgrass")
var Fire = require("./modules/fire")
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
var createMatrix = require("./modules/matrix")
var matrix = createMatrix(100, 100);
for (var y = 0; y < matrix.length; y++) {
  for (var x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] == 1) {
      grassArr.push(new Grass(x, y, 1, matrix))
    }
    else if (matrix[y][x] == 2) {
      GrassEaterArr.push(new GrassEater(x, y, 2, matrix))
    }
    else if (matrix[y][x] == 3) {
      PredatorArr.push(new Predator(x, y, 3, matrix))
    }
    else if (matrix[y][x] == 5) {
      EggArr.push(new Egg(x, y, 5, matrix))
    }
    else if (matrix[y][x] == 4) {
      BirdArr.push(new Bird(x, y, 4, matrix))
    }
    else if (matrix[y][x] == 6) {
      MaleArr.push(new Male(x, y, 6, matrix))
    }
    else if (matrix[y][x] == 7) {
      FemaleArr.push(new Female(x, y, 7, matrix))
    }
    else if (matrix[y][x] == 8) {
      VirusArr.push(new Virus(x, y, 8, matrix))
    }
    else if (matrix[y][x] == 9) {
      TXCgrassArr.push(new TXCgrass(x, y, 9, matrix))
    }
    else if (matrix[y][x] == 10) {
      FireArr.push(new Fire(x, y, 10, matrix))
    }
  }
}
for (let i in grassArr) {
  grassArr[i].mul(grassArr, TXCgrassArr);
}

for (let i in GrassEaterArr) {
  GrassEaterArr[i].eat(GrassEaterArr, grassArr, TXCgrassArr);
}

for (var i in PredatorArr) {
  PredatorArr[i].eat(PredatorArr, GrassEaterArr);
}


for (var i in BirdArr) {
  BirdArr[i].eat(BirdArr, PredatorArr, grassArr);
}
for (var i in EggArr) {
  EggArr[i].mul(EggArr, BirdArr);
}
for (var i in MaleArr) {
  MaleArr[i].eat(MaleArr, grassArr, GrassEaterArr, PredatorArr, EggArr, BirdArr);
}
for (var i in FemaleArr) {
  FemaleArr[i].eat(FemaleArr, MaleArr, grassArr, GrassEaterArr, PredatorArr, EggArr, BirdArr);
}
for (var i in VirusArr) {
  VirusArr[i].move(VirusArr);
}
for (var i in TXCgrassArr) {
  TXCgrassArr[i].TXCfire(TXCgrassArr, FireArr);
}
for (var i in FireArr) {
  FireArr[i].die(FireArr);
}
// Define the port to run on
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});