var express = require('express');
var path = require('path');
var app = express();

var Egg = require("./egg"); 
var eggArr = [];

eggArr.push(new Egg(1, 2, 4));

eggArr[0].mul(eggArr);

// Define the port to run on
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});