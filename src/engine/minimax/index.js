const util = require("./util");
const { evaluate } = require("./evaluate");

function max(states, depth, alpha, beta) {
    let score = Number.NEGATIVE_INFINITY;
    let comparedScore;
  
    let move = util.randomMove();
  
    for (let i = 0; i < states.length; i++) {
      comparedScore = minimax(states[i].board, depth - 1, alpha, beta, true).score;
  
      if (comparedScore > score) {
        score = comparedScore;
        move = states[i].move;
      }
  
      //prunning
      if (alpha < score) {
        alpha = score;
      }
  
      if (alpha >= beta) {
        break;
      }
    }
  
    return { move: move, score: score };
  }

function min(states, depth, alpha, beta) {
  let score = Number.POSITIVE_INFINITY;
  let comparedScore;

  let move = util.randomMove();

  for (let i = 0; i < states.length; i++)  {
    comparedScore = minimax(states[i].board, depth - 1, alpha, beta, false).score;
    if (comparedScore < score) {
      score = comparedScore;
      move = states[i].move;
    }

    //prunning
    if (alpha > score) {
      alpha = score;
    }

    if (alpha >= beta) {
      break;
    }
  }

  return { move: move, score: score };
}

function minimax(board, depth, alpha, beta, isPlayerTurn) {
  let possibleStates = util.getAllPossibleStates(board, isPlayerTurn);
  let winCondition = util.getWinner(board);
  
    if (winCondition !== 0 || depth === 0) {
      
      return { move: -1, score: evaluate(board) };
    } else {
      if (isPlayerTurn) {
        
        return min(possibleStates, depth, alpha, beta);
      } else {

        return max(possibleStates, depth, alpha, beta);
      }
    }
}

module.exports = { minimax };
