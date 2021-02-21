import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import GameBoardCell from './GameBoardCell';
import {useGameState, useGameDispatch} from '../store/context';
import { IAction, IBoardCell, IState } from "../interfaces";
import { useNavigation } from "@react-navigation/native";

const GameBoard = () => {
    const [flashingCellId, setFlashingCellId] = useState(-1);
    const state:IState = useGameState();
    const navigation = useNavigation();
    const { gameBoard, playerSymbol, gameEnded, gameMoveInProgress, gameSymbol, gameStarted } = state;
    const dispatch:React.Dispatch<IAction> = useGameDispatch();

    useEffect(() => {
      if (gameEnded) {
        navigation.navigate('Result');
      }

      if (gameMoveInProgress && gameStarted) {
          makeGameMove(gameBoard);
      }
    }, [gameMoveInProgress, gameStarted, gameEnded]);

    const makeGameMove = (board: any):void => {
      const freeBoardFields: Array<number> = board.filter((boardCell:any) => {
          return boardCell.value === null;
      }).map((boardCell:any) => boardCell.id);

      let pickedCell:number;

      if (freeBoardFields.length < 2) {
          pickedCell = freeBoardFields[Math.floor(Math.random() * freeBoardFields.length)];
          dispatch({ type: 'SELECT_CELL', payload: { id: pickedCell, value: gameSymbol}});
      } else {
        const makingMoveInterval = setInterval(() =>{
          pickedCell = freeBoardFields[Math.floor(Math.random() * freeBoardFields.length)];
          setFlashingCellId(pickedCell);
        }, 200); 
  
        setTimeout(() => {
            clearInterval(makingMoveInterval);
            setFlashingCellId(-1);
            pickedCell = freeBoardFields[Math.floor(Math.random() * freeBoardFields.length)];
            dispatch({ type: 'SELECT_CELL', payload: { id: pickedCell, value: gameSymbol}});
        }, 2000);
      }
    }

    const handleSelectCell = (gameCell: IBoardCell):void => {
      const {id, value} = gameCell;
        if (value === null) {
            dispatch({ type: 'SELECT_CELL', payload: { id, value: playerSymbol } });
        }
    }

    const renderCell = (gameCell: IBoardCell):JSX.Element => {
      const flashing:boolean = gameCell.id === flashingCellId;
      return <GameBoardCell key={gameCell.id} gameCell={gameCell} onPress={() => handleSelectCell(gameCell)} flashing={flashing} />
    }

    return (
      <View style={styles.container}>
        <View style={styles.board}>
          {gameBoard.map((gameCell:any) => renderCell(gameCell))}
        </View>
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
    }
  });
 
export default GameBoard;