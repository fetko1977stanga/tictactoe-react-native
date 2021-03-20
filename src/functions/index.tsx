import React from 'react';
import { IBoardCell, IGameOutcome, IState } from '../interfaces';

export const switchPlayer = ({ gameSymbol, playerSymbol }: IState, symbol: string) => {
  return symbol === gameSymbol ? playerSymbol : gameSymbol;
};

export const getEmptyBoardCells = (gameBoard: Array<IBoardCell>): Array<IBoardCell> =>  {
    return gameBoard.filter((cell: IBoardCell) => cell.value === null);
}

export const checkForWinner = (gameBoard : Array<IBoardCell>) : null | IGameOutcome => {
  const outcome:IGameOutcome = {
    result: '',
    winningIds: [],
  };  
  const lines = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
      ]
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        const firstSymbol = gameBoard[a - 1].value;
        const secondSymbol = gameBoard[b - 1].value;
        const thirdSymbol = gameBoard[c - 1].value;

        if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
          outcome.result = firstSymbol;
          outcome.winningIds.push(a);
          outcome.winningIds.push(b);
          outcome.winningIds.push(c);
          return outcome;
        }

        if (getEmptyBoardCells(gameBoard).length === 0) {
          outcome.result = 'draw';
          return outcome;
        }
      }

      return null
}

export const minimax = (board: Array<IBoardCell>, state: IState, depth: number, isMaximazing: boolean): any => {
  const {gameSymbol, playerSymbol} = state;
  const outcome: IGameOutcome | null = checkForWinner(board);
  if (outcome !== null) {
     return outcome.result === 'draw' ? 0 : outcome.result === gameSymbol ? 1 : -1;
  }
  
  if (isMaximazing) {
    let bestScore = -Infinity;
    
    for (let boardCell of board) {
      if (boardCell.value === null) {
          boardCell.value = gameSymbol;
          
          let score = minimax(board, state, depth + 1, false);
          boardCell.value = null;

          bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;
    
    for (let boardCell of board) {
      if (boardCell.value === null) {
          boardCell.value = playerSymbol;
          
          let score = minimax(board, state, depth + 1, true);
          
          boardCell.value = null;

          bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore;
  }
};