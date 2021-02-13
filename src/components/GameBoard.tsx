import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import GameBoardCell from './GameBoardCell';
import {useGameState, useGameDispatch} from '../store/context';
import { IAction, IBoardCell, IState } from "../interfaces";
import { useNavigation } from "@react-navigation/native";

const GameBoard = () => {
    const state:IState = useGameState();
    const navigation = useNavigation();
    const { gameBoard, playerSymbol, gameEnded } = state;
    const dispatch:React.Dispatch<IAction> = useGameDispatch();

    useEffect(() => {
      if (gameEnded) {
        navigation.navigate('Result');
      }
    });

    const handleSelectCell = (gameCell: IBoardCell):void => {
      const {id, value} = gameCell;
        if (value === null) {
            dispatch({ type: 'SELECT_CELL', payload: { id, value: playerSymbol } });
        }
    }

    return (
      <View style={styles.container}>
        <View style={styles.board}>
          {gameBoard.map((gameCell:any) => <GameBoardCell key={gameCell.id} gameCell={gameCell} onPress={() => handleSelectCell(gameCell)} />)}
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