import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { useGameState } from "../store/context";

const GameBoardCell = (props:any):JSX.Element => {
    const { gameSymbol, playerSymbol } = useGameState();
    const { gameCell, onPress } = props;
    const { value } = gameCell;

    const cellWithValueStyle = value === null ? null : value === gameSymbol ? styles.gameCell : styles.playerCell;

    return (
        <TouchableHighlight onPress={onPress} style={[styles.cell, cellWithValueStyle]}>
            <Text style={styles.textStyle}>{ value }</Text>
        </TouchableHighlight>
     );
}

const styles = StyleSheet.create({
    cell: {
      width: 100,
      height: 100,
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderColor: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    gameCell: {
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
    playerCell: {
      backgroundColor: '#f4511e',
    },
    textStyle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1},
        textShadowRadius: 3
    }
  });
 
export default GameBoardCell;