const util = require("util");

function evaluate(board) {
    let score = 0;

    //horizontal scoring
    for(let i = 0; i < 6; i++) {
        let horizontalBoardString = board[i].toString();

        if(horizontalBoardString.includes("1,1,1,1")){
            score += 100;
        }else if(horizontalBoardString.includes("2,2,2,2")){
            score -= 4;
        }else if(horizontalBoardString.includes("1,1,1")){
            score += 20;
        }else if(horizontalBoardString.includes("1,1")){
            score += 10;
        }
    }

    //vertical scoring
    for(let i = 0; i < 7; i++) {
        let verticalBoardString = util.getVerticalBoard(board, i).toString();

        if(verticalBoardString.includes("1,1,1,1")){
            score += 100;
        }else if(verticalBoardString.includes("2,2,2,2")){
            score -= 4;
        }else if(verticalBoardString.includes("1,1,1")){
            score += 20;
        }else if(verticalBoardString.includes("1,1")){
            score += 10;
        }
    }

    return score;
}

// function countPiece(board, pieceType) {
//     let count = 0;
    
//     for(let i = 0; i<7; i++){
//         for(let j = 0; j<6; j++){
//             if(board[i][j] === pieceType) {
//                 count++;
//             }
//         }
//     }

//     return count;
// }

module.exports = {
    evaluate
}