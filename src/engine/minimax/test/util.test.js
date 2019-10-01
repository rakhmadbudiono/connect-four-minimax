const util = require("../util")

const board = [[0,0,0,0,0,0,0],
               [0,0,0,2,0,1,0],
               [1,0,2,0,0,0,0],
               [2,2,0,0,0,0,0],
               [2,2,0,2,0,0,0],
               [2,1,1,1,0,0,0]]

console.log(util.generateNextBoard(board, 1, true));
console.log(util.getVerticalBoard(board, 0));
console.log(util.getDiagonalPositiveAboveBoard(board, 4));
console.log(util.getDiagonalPositiveBelowBoard(board, 0));
console.log(util.getDiagonalNegativeAboveBoard(board, 4));
console.log(util.getDiagonalNegativeBelowBoard(board, 4));
console.log(util.getAllPossibleStates(board, true));
console.log(util.getWinner(board));