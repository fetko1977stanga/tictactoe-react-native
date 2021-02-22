import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Icon } from 'react-native-elements';
import { useGameState } from "../store/context";

const GameBoardCell = (props:any):JSX.Element => {
    const { gameSymbol, playerSymbol } = useGameState();
    const { gameCell, onPress, flashing } = props;
    const { value } = gameCell;

    const flashingCell = flashing ? styles.gameCellFlashing : null;

    const renderCellValue = (value: string):JSX.Element | null => {
        const iconColour = value === gameSymbol ? '#333' : '#f4511e';
        const iconName = value === 'x' ? 'times' : 'circle';
        if (value === null) {
            return value;
        }

        return <Icon name={iconName} type="font-awesome-5" size={30} color={iconColour} />
    }

    return (
        <TouchableHighlight onPress={onPress} style={[styles.cell, flashingCell]} underlayColor="#cecece">
            <View>{ renderCellValue(value) }</View>
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
    gameCellFlashing: {
      backgroundColor: '#cecece'
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