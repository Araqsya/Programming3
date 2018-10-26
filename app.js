var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var server = require("http").Server(app);
var io = require("socket.io")(server);

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
var grasslifeArr=[];

var GrassEaterArr = [];
var grasseaterlifeArr=[];

var PredatorArr = [];
var predatorlifeArr=[];

var BirdArr = [];
var birdlifeArr=[];

var EggArr = [];
var egglifeArr = [];

var MaleArr = [];
var malelifeArr = [];

var FemaleArr = [];
var femalelifeArr = [];

var VirusArr = [];
var viruslifeArr = [];

var TXCgrassArr = [];
var txcgrass = [];

var FireArr = [];
var firelife = [];

var createMatrix = require("./modules/matrix")

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
      FireArr.push(new Fire(x, y, 10))
    }
  }
}



app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

server.listen(3000);

var framerate = 5;

var drawTime = 1000 / framerate;

io.on("connection", function (socket) {
  socket.emit("get matrix", matrix);
  var frameCount=0;
  var interval = setInterval(function () {
    for (let i in grassArr) {
      grassArr[i].mul(grassArr, TXCgrassArr, matrix);
    }

    for (let i in GrassEaterArr) {
      GrassEaterArr[i].eat(GrassEaterArr, grassArr, TXCgrassArr, matrix);
    }

    for (var i in PredatorArr) {
      PredatorArr[i].eat(PredatorArr, GrassEaterArr, grassArr, matrix);
    }

    for (var i in BirdArr) {
      BirdArr[i].eat(BirdArr, PredatorArr, grassArr, matrix);
    }
    for (var i in EggArr) {
      EggArr[i].mul(EggArr, BirdArr, matrix);
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
    
    frameCount++
    if(frameCount >= 60)
    {
      var stat = {
        "Grass": grassArr.length,
        "GrassEater" : GrassEaterArr.length,
        "Predator": PredatorArr.length,
        "Bird":BirdArr.length,
        "Egg":EggArr.length,
        "Male":MaleArr.length,
        "Female":FemaleArr.length,
        "Virus":VirusArr.length,
        "Txcgrass":TXCgrassArr.length,
        "Fire":FireArr.length,
      };
      socket.emit("get stat", stat)
      main(stat);

      frameCount = 0;
    }

    socket.emit("redraw", matrix)
  }, drawTime)



  function main(stat) {
    var file = "obj.json";
    fs.writeFileSync(file, JSON.stringify(stat));
  }
  
})