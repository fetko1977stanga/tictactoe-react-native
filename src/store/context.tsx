import React from 'react';
import { IState, IAction, IBoardCell } from '../interfaces';
import { checkForWinner } from '../functions';

const initialState: IState = {
    gameStarted: false,
    playerSymbol: '',
    gameSymbol: '',
    gameMoveInProgress: false,
    gameBoard: [
        {id: 1, value: null},
        {id: 2, value: null},
        {id: 3, value: null},
        {id: 4, value: null},
        {id: 5, value: null},
        {id: 6, value: null},
        {id: 7, value: null},
        {id: 8, value: null},
        {id: 9, value: null}
    ],
    movesCounter: 0,
    gameEnded: false,
    winner: null
}

const defaultAction: React.Dispatch<IAction> = () => {};

const GameStateContext = React.createContext<IState>(initialState);
const GameDispatchContext = React.createContext<React.Dispatch<IAction>>(defaultAction)

function gameReducer(state: IState, action: IAction) {
    //console.log(action);
    switch (action.type) {
        case 'GAME_START':
            const {playerSymbol, gameSymbol} = action.payload;
            return {...state, gameStarted: true, playerSymbol, gameSymbol, gameEnded: false};
        case 'FIRST_START':
            return {...state, gameMoveInProgress: action.payload.gameMoveInProgress }
        case 'RESET_GAME':
            return initialState;
        case 'SELECT_CELL':
            let gameMoveInProgress = action.payload.value === state.playerSymbol;
            let movesCounter = state.movesCounter + 1;

            let updatedGameBoard = state.gameBoard.map((cell: IBoardCell) => {
                return cell.id === action.payload.id ? {...cell, id: action.payload.id, value: action.payload.value} : cell; 
            });

            const winner = checkForWinner({...state, gameBoard: updatedGameBoard });
            
            if (winner !== null || movesCounter === 9) {
                return {...state, winner, gameBoard: updatedGameBoard, movesCounter, gameMoveInProgress: false, gameEnded: true};
            }

            return {...state, gameMoveInProgress, movesCounter, gameBoard: updatedGameBoard};
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

function GameProvider({children}:any) {
    const [state, dispatch] = React.useReducer(gameReducer, initialState)
    return (
      <GameStateContext.Provider value={state}>
        <GameDispatchContext.Provider value={dispatch}>
          {children}
        </GameDispatchContext.Provider>
      </GameStateContext.Provider>
    )
}

function useGameState() {
    const context = React.useContext(GameStateContext)
    if (context === undefined) {
      throw new Error('useCountState must be used within a CountProvider')
    }
    return context
}

function useGameDispatch() {
    const context = React.useContext(GameDispatchContext)
    if (context === undefined) {
      throw new Error('useCountDispatch must be used within a CountProvider')
    }
    return context
}
  
  export {GameProvider, useGameState, useGameDispatch};