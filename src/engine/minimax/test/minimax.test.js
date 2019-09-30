const { minimax } = require("../index");

const board = [[2,2,0,0,0,0,0],
               [1,2,0,0,2,0,0],
               [2,2,2,1,2,0,2],
               [2,1,1,2,1,0,1],
               [2,1,1,2,1,0,1],
               [1,2,1,1,1,2,1]]

console.log(minimax(board, 2, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, false));