const util = require("./util");

function evaluate(board) {
    let score = 0;

    //horizontal scoring
    for(let i = 0; i < 6; i++) {
        let horizontalBoardString = board[i].toString();

        if(horizontalBoardString.includes("2,2,2,2")){
            score += 100;
        }else if(horizontalBoardString.includes("1,1,1,1")){
            score -= 100;
        }else if(
            horizontalBoardString.includes("2,2,2,0") ||
            horizontalBoardString.includes("2,2,0,2") ||
            horizontalBoardString.includes("2,0,2,2") ||
            horizontalBoardString.includes("0,2,2,2")
        ){
            score += 5;
        }else if(
            horizontalBoardString.includes("2,2,0,0") ||
            horizontalBoardString.includes("0,2,2,0") ||
            horizontalBoardString.includes("0,0,2,2") 
        ){
            score += 2;
        }
    }

    for(let i = 0; i < 7; i++) {
        
        //vertical scoring
        let verticalBoardString = util.getVerticalBoard(board, i).toString();

        if(verticalBoardString.includes("2,2,2,2")){
            score += 100;
        }else if(verticalBoardString.includes("1,1,1,1")){
            score -= 100;
        }else if(
            verticalBoardString.includes("2,2,2,0") ||
            verticalBoardString.includes("2,2,0,2") ||
            verticalBoardString.includes("2,0,2,2") ||
            verticalBoardString.includes("0,2,2,2")
        ){
            score += 5;
        }else if(
            verticalBoardString.includes("2,2,0,0") ||
            verticalBoardString.includes("0,2,2,0") ||
            verticalBoardString.includes("0,0,2,2") 
        ){
            score += 2;
        }

        //diagonal scoring
        let diagonalPositiveBelowBoard = util.getDiagonalPositiveBelowBoard(board, i).toString();

        if(diagonalPositiveBelowBoard.includes("2,2,2,2")){
            score += 100;
        }else if(diagonalPositiveBelowBoard.includes("1,1,1,1")){
            score -= 100;
        }else if(
            diagonalPositiveBelowBoard.includes("2,2,2,0") ||
            diagonalPositiveBelowBoard.includes("2,2,0,2") ||
            diagonalPositiveBelowBoard.includes("2,0,2,2") ||
            diagonalPositiveBelowBoard.includes("0,2,2,2")
        ){
            score += 5;
        }else if(
            diagonalPositiveBelowBoard.includes("2,2,0,0") ||
            diagonalPositiveBelowBoard.includes("0,2,2,0") ||
            diagonalPositiveBelowBoard.includes("0,0,2,2") 
        ){
            score += 2;
        }

        let diagonalPositiveAboveBoard = util.getDiagonalPositiveAboveBoard(board, i).toString();

        if(diagonalPositiveAboveBoard.includes("2,2,2,2")){
            score += 100;
        }else if(diagonalPositiveAboveBoard.includes("1,1,1,1")){
            score -= 100;
        }else if(
            diagonalPositiveAboveBoard.includes("2,2,2,0") ||
            diagonalPositiveAboveBoard.includes("2,2,0,2") ||
            diagonalPositiveAboveBoard.includes("2,0,2,2") ||
            diagonalPositiveAboveBoard.includes("0,2,2,2")
        ){
            score += 5;
        }else if(verticalBoardString.includes("1,1,1,1")){
            score -= 100;
        }else if(
            diagonalPositiveAboveBoard.includes("2,2,0,0") ||
            diagonalPositiveAboveBoard.includes("0,2,2,0") ||
            diagonalPositiveAboveBoard.includes("0,0,2,2") 
        ){
            score += 2;
        }

        let diagonalNegativeAboveBoard = util.getDiagonalNegativeAboveBoard(board, i).toString();

        if(diagonalNegativeAboveBoard.includes("2,2,2,2")){
            score += 100;
        }else if(diagonalNegativeAboveBoard.includes("1,1,1,1")){
            score -= 100;
        }else if(
            diagonalNegativeAboveBoard.includes("2,2,2,0") ||
            diagonalNegativeAboveBoard.includes("2,2,0,2") ||
            diagonalNegativeAboveBoard.includes("2,0,2,2") ||
            diagonalNegativeAboveBoard.includes("0,2,2,2")
        ){
            score += 5;
        }else if(verticalBoardString.includes("1,1,1,1")){
            score -= 100;
        }else if(
            diagonalNegativeAboveBoard.includes("2,2,0,0") ||
            diagonalNegativeAboveBoard.includes("0,2,2,0") ||
            diagonalNegativeAboveBoard.includes("0,0,2,2") 
        ){
            score += 2;
        }

        let diagonalNegativeBelowBoard = util.getDiagonalNegativeBelowBoard(board, i).toString();

        if(diagonalNegativeBelowBoard.includes("2,2,2,2")){
            score += 100;
        }else if(diagonalNegativeBelowBoard.includes("1,1,1,1")){
            score -= 100;
        }else if(
            diagonalNegativeBelowBoard.includes("2,2,2,0") ||
            diagonalNegativeBelowBoard.includes("2,2,0,2") ||
            diagonalNegativeBelowBoard.includes("2,0,2,2") ||
            diagonalNegativeBelowBoard.includes("0,2,2,2")
        ){
            score += 5;
        }else if(
            diagonalNegativeBelowBoard.includes("2,2,0,0") ||
            diagonalNegativeBelowBoard.includes("0,2,2,0") ||
            diagonalNegativeBelowBoard.includes("0,0,2,2") 
        ){
            score += 2;
        }
    }

    return score;
}

module.exports = {
    evaluate
}