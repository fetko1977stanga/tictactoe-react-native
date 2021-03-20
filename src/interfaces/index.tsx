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
    difficulty: string;
    gameEnded: boolean;
    movesCounter: number;
    outcome: null | IGameOutcome;
}

export interface IAction {
    type: string;
    payload?: any
}

export interface IGameOutcome {
    result: string;
    winningIds: number[];
}