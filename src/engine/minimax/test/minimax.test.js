const { minimax } = require("../index");

const board = [[0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0],
               [0,0,1,0,0,0,0],
               [0,0,1,0,0,0,0],
               [1,2,1,2,2,0,0]]

console.log(minimax(board, 18, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, false));