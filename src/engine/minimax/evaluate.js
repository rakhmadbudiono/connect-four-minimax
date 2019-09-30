const util = require("./util");

function evaluate(board) {
    let score = 0;

    //horizontal scoring
    for(let i = 0; i < 6; i++) {
        let horizontalBoardString = board[i].toString();

        if(horizontalBoardString.includes("2,2,2,2")){
            score += 100;
        }else if(horizontalBoardString.includes("1,1,1,1")){
            score -= 80;
        }else if(horizontalBoardString.includes("1,1,1")){
            score += 20;
        }else if(horizontalBoardString.includes("2,2,2")){
            score += 20;
        }else if(horizontalBoardString.includes("2,2")){
            score += 5;
        }
    }

    //vertical scoring
    for(let i = 0; i < 7; i++) {
        let verticalBoardString = util.getVerticalBoard(board, i).toString();

        if(verticalBoardString.includes("2,2,2,2")){
            score += 100;
        }else if(verticalBoardString.includes("1,1,1,1")){
            score -= 80;
        }else if(verticalBoardString.includes("1,1,1")){
            score += 20;
        }else if(verticalBoardString.includes("2,2,2")){
            score += 20;
        }else if(verticalBoardString.includes("2,2")){
            score += 5;
        }
    }

    return score;
}

module.exports = {
    evaluate
}