const { minimax } = require("../index");

const board = [[0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0]]

console.log(minimax(board, 4, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, false));