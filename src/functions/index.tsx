import React from 'react';
import { IState } from '../interfaces';

export const checkForWinner = ({ gameBoard } : IState) : null | string => {
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
          return firstSymbol
        }
      }
      return null
}