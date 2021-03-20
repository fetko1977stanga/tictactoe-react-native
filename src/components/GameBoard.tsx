import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GameBoardCell from './GameBoardCell';
import {useGameState, useGameDispatch} from '../store/context';
import { IAction, IBoardCell, IGameOutcome, IState } from "../interfaces";
import { useNavigation } from "@react-navigation/native";
import { minimax } from "../functions";
import { Icon } from "react-native-elements";

const GameBoard = () => {
    const [flashingCellId, setFlashingCellId] = useState(-1);
    const state:IState = useGameState();
    const navigation = useNavigation();
    const { gameBoard, playerSymbol, gameEnded, gameMoveInProgress, gameSymbol, gameStarted, difficulty, outcome } = state;
    const dispatch:React.Dispatch<IAction> = useGameDispatch();

    const renderOutcome = (outcome: IGameOutcome | null):JSX.Element => {
      const resultText: string | null = outcome ? 
        outcome.result === playerSymbol ? `You've won!` : outcome.result === gameSymbol ?
         `You've lost!` : `It's a draw!` : null;

      const outcomeIconName: string = outcome ? 
        outcome.result === playerSymbol ? 'trophy' : 
        outcome.result === gameSymbol ? 'heart-broken' : 'equals' : '';

      const outcomeColor: string = outcome ? 
        outcome.result === playerSymbol ? '#ffd700' : 
        outcome.result === gameSymbol ? '#333' : '#f4511e' : '';

      return <View style={styles.resultsOutcome}>
                  <Text style={[styles.outcomeText, {color: outcomeColor}]}>{resultText}</Text>
                  <Icon
                      name={outcomeIconName}
                      type='font-awesome-5'
                      color={outcomeColor}
                      size={30}
                  />
            </View>  
    }

    useEffect(() => {
      if (gameEnded) {
        renderOutcome(outcome);
      }

      if (gameMoveInProgress) {
          makeGameMove(gameBoard);
      }
    }, [gameMoveInProgress, gameStarted, gameEnded]);

    const makeGameMove = (board: Array<IBoardCell>):void => {
      const freeBoardFields: Array<number> = board.filter((boardCell:any) => {
          return boardCell.value === null;
      }).map((boardCell:any) => boardCell.id);

      let bestScore = -Infinity;
      let bestMove:number;
      let flashingCell: number;

      if (board.length === freeBoardFields.length) {
        bestMove = freeBoardFields[Math.floor(Math.random() * freeBoardFields.length)];
      } else {
        if (difficulty === 'hard') {
          for (let boardCell of board) {
            if (boardCell.value === null) {
                boardCell.value = gameSymbol;
                
                let score = minimax(board, state, 0, false);
              
                boardCell.value = null;
    
                if (score > bestScore) {
                  bestScore = score;
                  bestMove = boardCell.id;
                }
            }
          }
        }
        
      }

      

      const makingMoveInterval = setInterval(() =>{
        flashingCell = freeBoardFields[Math.floor(Math.random() * freeBoardFields.length)];
        setFlashingCellId(flashingCell);
      }, 200);

      setTimeout(() => {
          clearInterval(makingMoveInterval);
          setFlashingCellId(-1);

          if (difficulty === 'easy') {
              bestMove = freeBoardFields[Math.floor(Math.random() * freeBoardFields.length)];
          }

          dispatch({ type: 'SELECT_CELL', payload: { id: bestMove, value: gameSymbol}});
      }, 1000);
    
    }

    const handleSelectCell = (gameCell: IBoardCell):void => {
        if(gameMoveInProgress) {
           return;
        }
        const {id, value} = gameCell;
        if (value === null) {
            dispatch({ type: 'SELECT_CELL', payload: { id, value: playerSymbol } });
        }
    }

    const renderCell = (gameCell: IBoardCell):JSX.Element => {
      const isWinningCell:boolean = outcome && outcome.winningIds.length > 0 ? outcome.winningIds.filter(id => gameCell.id === id).length > 0 : false;
      const flashing:boolean = gameCell.id === flashingCellId;
      return <GameBoardCell key={gameCell.id} gameCell={gameCell} onPress={() => handleSelectCell(gameCell)} flashing={flashing} isWinningCell={isWinningCell}/>
    }

    return (
      <View style={styles.container}>
        <View style={styles.board}>
          {gameBoard.map((gameCell:any) => renderCell(gameCell))}
        </View>
        {
            gameEnded ? renderOutcome(outcome) : null
        }
      </View>
     );
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    board: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: 310,
      borderColor: '#000',
      borderWidth: 5,
      backgroundColor: 'white'
    },
    cell: {
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor: '#000',
    },
    resultsOutcome: {
      paddingTop: 10
    },
    outcomeText: {
      fontSize: 30,
      fontWeight: 'bold'
    }
  });
 
export default GameBoard;