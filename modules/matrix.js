module.exports = function (n, m) {
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
    matrix1[12][43] = 2;
    matrix1[89][25] = 2;
    matrix1[8][9] = 2;
    matrix1[51][55] = 2;
    matrix1[42][63] = 2;
    matrix1[31][95] = 2;
    matrix1[23][64] = 2;
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
    matrix1[45][64] = 8;
    matrix1[35][4] = 8;
    matrix1[56][24] = 8;

    return matrix1;
}