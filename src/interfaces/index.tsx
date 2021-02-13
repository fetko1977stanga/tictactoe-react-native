export interface IBoardCell {
    id: number;
    value: string | null;
}

export interface IState {
    gameStarted: boolean;
    playerSymbol: string;
    gameSymbol: string;
    gameMoveInProgress: boolean;
    gameBoard: Array<IBoardCell>;
    gameEnded: boolean;
    movesCounter: number;
    winner: null | string;
}

export interface IAction {
    type: string;
    payload?: any
}