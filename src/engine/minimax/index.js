const app = require("../../App");
const util = require("util");
const { eval } = require("eval");

/* model 
    state: {
        board: [[],[],[],[]],
        move: 4
    }
*/

const currentState = app.getCurrentState();

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

  if (util.isGameOver(state)) {
    if (util.getWinner(state) === "Player") {
      return { move: 0, point: 9999 };
    } else if (util.getWinner(state) === "Computer") {
      return { move: 0, point: -9999 };
    } else {
      return { move: 0, point: -10 };
    }
  } else if (depth === 0) {
    return { move: 0, point: eval(state) };
  } else if (isPlayerState) {
    return max(allNextPossibleStates, depth, alpha, beta);
  } else {
    return min(allNextPossibleStates, depth, alpha, beta);
  }
}

module.exports = { move };
