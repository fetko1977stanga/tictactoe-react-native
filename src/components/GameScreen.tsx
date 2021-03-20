import React, { Fragment, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler, StyleSheet, View } from 'react-native';
import GameBoard from './GameBoard';
import { Button } from 'react-native-elements';
import { useGameDispatch, useGameState } from '../store/context';

export default function GameScreen () {
    const navigation = useNavigation();
    const { gameEnded } = useGameState();
    const dispatch = useGameDispatch();

    useEffect(() => navigation.addListener('beforeRemove', (e) => {
        const { type } = e.data.action;
        if(type === 'GO_BACK') {
            e.preventDefault();
        } else {
            dispatch({type: 'RESET_GAME'});
            navigation.dispatch(e.data.action)
        }
    }));

    const exitApplication = ():void => {
        BackHandler.exitApp();
    }

    const renderActionButtons = ():JSX.Element => {
        return <View style={styles.actionContainer}>
            <Button
                icon={{name: 'play-circle', type: 'font-awesome-5', size: 30.5, color: 'white'}}
                raised
                iconRight
                title='Restart'
                onPress={() => navigation.navigate('Start')}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonTitleStyle}
            />
            <Button
                icon={{name: 'times', type: 'font-awesome-5', size: 30, color: 'white'}}
                raised
                iconRight
                title='Quit'
                onPress={() => exitApplication()}
                buttonStyle={styles.buttonQuitStyle}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonTitleStyle}
            />
        </View>
    }

    const renderResetButton = ():JSX.Element => {
        return <View style={styles.actionContainer}>
            <Button
                onPress={handleResetGame}
                title='Reset Game'
                buttonStyle={styles.resetGameButton}
                containerStyle={styles.resetGameButtonContainerStyle}
            />
        </View>
    }


    const handleResetGame = () => {
        navigation.navigate('Start');
    }

    return (
        <Fragment>
            <View style={styles.container}>
                <GameBoard />
                {
                    gameEnded ? renderActionButtons() : renderResetButton()
                }
                
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#777'
    },
    resetGameButton: {
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 0,
        paddingTop: 20,
        paddingBottom: 20
    },
    resetGameButtonContainerStyle: {
        width: '100%'
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttonStyle: {
        backgroundColor: '#f4511e',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 0,
        paddingTop: 20,
        paddingBottom: 20
    },
    buttonQuitStyle: {
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 0,
        paddingTop: 20,
        paddingBottom: 20
    },
    buttonContainerStyle: {
        width: '50%',
        borderRadius: 0,
    },
    buttonTitleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10
    }
});
