const util = require("util");
const { evaluate } = require("evaluate");

/* model 
    state: {
        board: [[],[],[],[]],
        move: 4
    }
*/

function max(states, depth, alpha, beta) {
    let score = -9999;
    let comparedScore;
  
    //set default move
    //let move = random move from possible states;
  
    states.map(state => {
      comparedScore = minimax(states[i], depth - 1, alpha, beta, false);
  
      if (comparedScore > score) {
        score = comparedScore;
        move = state.move;
      }
  
      //prunning
      if (alpha < score) {
        alpha = score;
      }
  
      if (alpha >= beta) {
        break;
      }
    });
  
    return { move: move, score: score };
  }

function min(states, depth, alpha, beta) {
  let score = 9999;
  let comparedScore;

  //set default move
  //let move = random move from possible states;

  states.map(state => {
    comparedScore = minimax(states[i], depth - 1, alpha, beta, true);

    if (comparedScore < score) {
      score = comparedScore;
      move = state.move;
    }

    //prunning
    if (alpha > score) {
      alpha = score;
    }

    if (alpha >= beta) {
      break;
    }
  });

  return { move: move, score: score };
}

function minimax(state, depth, alpha, beta, isPlayerState) {
  const allNextPossibleStates = util.getAllPossibleStates(currentState);
  const winCondition = util.isGameOver(state.board);

    if (winCondition === 1) {
      return { move: 0, point: 9999 };
    } else if (winCondition === 2) {
      return { move: 0, point: -9999 };
    } else if (winCondition === 3) {
      return { move: 0, point: -10 };
    } else {
      if (depth === 0) {
        return { move: 0, point: evaluate(state) };
      } else if (isPlayerState) {
        return max(allNextPossibleStates, depth, alpha, beta);
      } else {
        return min(allNextPossibleStates, depth, alpha, beta);
      }
    }
}

module.exports = { move };
