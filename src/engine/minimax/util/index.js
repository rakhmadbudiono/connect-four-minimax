const _ = require("lodash");

function generateNextBoard(lastBoard, move, isComputerTurn) {
    for(let i = 5; i>-1; i--) {
        if(lastBoard[i][move] === 0){
            let board = _.cloneDeep(lastBoard);

            if(isComputerTurn){
                board[i][move] = 2;
            } else {
                board[i][move] = 1;
            }

            return board;
        }
    }
} 

function getVerticalBoard(board, i){
    let verticalBoard = [];

    for(let j = 0; j < 6; j++){
        verticalBoard.push(board[j][i]);
    }

    return verticalBoard;
}

function getDiagonalPositiveBelowBoard(board, i){
  let diagonalBoard = [];

  for(let j = 0; j < 6; j++){
      if (i+j > 6) {
        break;
      }

      diagonalBoard.push(board[5-j][i+j]);
  }

  return diagonalBoard;
}

function getDiagonalNegativeAboveBoard(board, i){
  let diagonalBoard = [];

  for(let j = 0; j < 6; j++){
      if (i+j > 6) {
        break;
      }

      diagonalBoard.push(board[j][i+j]);
  }

  return diagonalBoard;
}

function getDiagonalNegativeBelowBoard(board, i){
  let diagonalBoard = [];
  let k = i;

  for(let j = 5; j>-1; j--){
      if (k < 0) {
        break;
      }

      diagonalBoard.push(board[j][k]);
      k--;
  }

  return diagonalBoard;
}

function getDiagonalPositiveAboveBoard(board, i){
  let diagonalBoard = [];
  let k = i;

  for(let j = 0; j < 6; j++){
      if (k > 6) {
        break;
      }

      diagonalBoard.push(board[j][k]);
      k++;
  }

  return diagonalBoard;
}

function getAllPossibleStates(board, isTurnPlayer) {
    let possibleStates = [];
    
    for(let i = 0; i < 7; i++){
        let tempState = {
          move: '',
          board: ''
        }

        if(isLegalMove(board, i)){
          tempState.move = i;
          tempState.board = generateNextBoard(board, i, !isTurnPlayer);
          possibleStates.push(tempState);
        }
    }

    return possibleStates;
}

function isLegalMove(board, move){
  return board[0][move] === 0;
}

function getWinner(board) {
  for(let i = 0; i < 6; i++) {
    let horizontalArrayString = board[i].toString();

    if(horizontalArrayString.includes("1,1,1,1")) {
      return 1;
    } else if(horizontalArrayString.includes("2,2,2,2")) {
      return 2;
    }
  }

  for(let i = 0; i < 7; i++){
    let verticalArrayString = getVerticalBoard(board, i).toString();
    let diagonalPositiveBelowBoard = getDiagonalPositiveBelowBoard(board, i).toString();
    let diagonalNegativeAboveBoard = getDiagonalNegativeAboveBoard(board, i).toString();
    let diagonalNegativeBelowBoard = getDiagonalNegativeBelowBoard(board, i).toString();
    let diagonalPositiveAboveBoard = getDiagonalPositiveAboveBoard(board, i).toString();

    if (verticalArrayString.includes("1,1,1,1")) {
      return 1;
    } else if (verticalArrayString.includes("2,2,2,2")){
      return 2;
    } else if (diagonalPositiveBelowBoard.includes("1,1,1,1")) {
      return 1;
    } else if (diagonalPositiveBelowBoard.includes("2,2,2,2")){
      return 2;
    } else if (diagonalNegativeAboveBoard.includes("1,1,1,1")) {
      return 1;
    } else if (diagonalNegativeAboveBoard.includes("2,2,2,2")){
      return 2;
    } else if (diagonalNegativeBelowBoard.includes("1,1,1,1")) {
      return 1;
    } else if (diagonalNegativeBelowBoard.includes("2,2,2,2")){
      return 2;
    } else if (diagonalPositiveAboveBoard.includes("1,1,1,1")) {
      return 1;
    } else if (diagonalPositiveAboveBoard.includes("2,2,2,2")){
      return 2;
    } 
  }

  return 0;
}

function randomMove(){
  return Math.floor(Math.random() * Math.floor(7));
}

module.exports = {
    getVerticalBoard,
    getDiagonalPositiveBelowBoard,
    getDiagonalPositiveAboveBoard,
    getDiagonalNegativeAboveBoard,
    getDiagonalNegativeBelowBoard,
    getAllPossibleStates,
    generateNextBoard,
    getWinner,
    randomMove
}