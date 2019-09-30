function generateNextBoard(lastBoard, move, isPlayerTurn) {
    for(let i = 0; i<6; i++) {
        if(lastBoard[move][i] === 0){
            let board = lastBoard;

            if(isPlayerTurn){
                board[move][i] = 1;
            } else {
                board[move][i] = 2;
            }

            return board;
        }
    }
} 

function getAllPossibleStates(board, isPlayerTurn) {
    let possibleStates = [];
    
    for(let i = 0; i<7; i++){
        let tempState;         

        if(!isGameOver(board)){
            tempState.move = i;
            tempState.board = generateNextBoard(board, i, isPlayerTurn);
            possibleStates.push(tempState);
        }
    }

    return possibleStates;
}

function isGameOver(board){
    for (let i = 0; i < 6; i++){
        for (let j = 0; j < 7; j++){
            
        }
    }
}

module.exports = {
    getAllPossibleStates,
    isGameOver
}