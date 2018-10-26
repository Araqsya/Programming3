var matrix;
var socket;
var side = 5;
var weather=200;
var stat = {};
setInterval(function(){
    weather++
}, 100)
function setup() {
    frameRate(0);
    var socket = io.connect();
    socket.on("get matrix", function(mtx){
        matrix = mtx
        createCanvas(matrix[0].length * side + 800, matrix.length * side);
        noLoop();
        
        socket.on("redraw", function(mtx){
            matrix=mtx;
            redraw();
        })

        socket.on("get stat", function(data){
            stat = data;
        })
    });
    
    background('#acacac');

}
function draw() {
    background('#acacac');

    fill(50);
    textSize(20);
    var margin = 25; 
    for(var i in stat)
    {
        text(i + ": " + stat[i], 600, margin);
        margin += 25;
    }  

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green')
                if(weather%200>100){
                     fill('#20B2AA')
                }
                   
               
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
}