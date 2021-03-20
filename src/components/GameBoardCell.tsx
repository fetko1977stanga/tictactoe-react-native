import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, TouchableHighlight, View } from "react-native";
import { Icon } from 'react-native-elements';
import { useGameState } from "../store/context";

const GameBoardCell = (props:any):JSX.Element => {
    const { gameSymbol, gameEnded } = useGameState();
    const { gameCell, onPress, flashing, isWinningCell } = props;
    const { value } = gameCell;
    const winningCellBackgroundColor = new Animated.Value(0);

    const flashingCell = flashing ? styles.gameCellFlashing : null;
    const winningCellStyle = isWinningCell ? styles.winningCell : null;

    useEffect(() => {
      if (gameEnded && isWinningCell) {
        Animated.timing(
          winningCellBackgroundColor,
          {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false
          }
        ).start();
      }
      
    }, [gameEnded, winningCellBackgroundColor, isWinningCell])

    const renderCellValue = (value: string):JSX.Element | null => {
        const iconColour = isWinningCell ? '#fff' : value === gameSymbol ? '#333' : '#f4511e';
        const iconName = value === 'x' ? 'times' : 'circle';
        if (value === null) {
            return value;
        }

        return <Icon name={iconName} type="font-awesome-5" size={30} color={iconColour} />
    }

    return (
        <TouchableHighlight onPress={onPress} style={[styles.cell, flashingCell, winningCellStyle]} underlayColor="#cecece">
            {
              isWinningCell ? 
              <Animated.View
                style={{
                  ...props.style,
                  backgroundColor: winningCellBackgroundColor.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#fff", "#f4511e"]
                  }),
                }}
              >{ renderCellValue(value) }</Animated.View> : 
              <View>{ renderCellValue(value) }</View>}
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
    winningCell: {
      backgroundColor: '#f4511e'
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