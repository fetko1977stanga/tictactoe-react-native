import React, { Fragment, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import GameBoard from './GameBoard';
import GameMove from './GameMove';
import { Button } from 'react-native-elements';
import { useGameDispatch } from '../store/context';

export default function GameScreen () {
    const navigation = useNavigation();
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


    const handleResetGame = () => {
        navigation.navigate('Start');
    }

    return (
        <Fragment>
            <View style={styles.container}>
                <GameBoard />
                <Button onPress={handleResetGame} title='Reset Game' buttonStyle={styles.resetGameButton} />
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
        backgroundColor: '#bebebe'
    },
    resetGameButton: {
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 0,
        paddingTop: 10,
        paddingBottom: 10
    }
});
