const util = require("../util")

const board = [[0,0,1,0,0,0,0],
               [0,0,1,0,0,0,0],
               [0,0,1,0,0,0,0],
               [0,0,1,0,0,0,0],
               [0,0,1,0,0,0,0],
               [1,2,1,1,1,0,0],]

console.log(util.generateNextBoard(board, 1, true));
console.log(util.getVerticalBoard(board, 0));
console.log(util.getAllPossibleStates(board, true));
console.log(util.getWinner(board));