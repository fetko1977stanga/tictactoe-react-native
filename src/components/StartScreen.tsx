import React, { Fragment, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useGameDispatch, useGameState } from '../store/context';
import { useNavigation  } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import Overlay from './shared/Overlay';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function StartScreen() {
    const dispatch = useGameDispatch();
    const navigation = useNavigation();
    const [checkedSymbol, setCheckedSymbol] = useState('');
    const [noSymbolCheckedError, setNoSymbolCheckedError] = useState(false);
    const [orderDrawStarted, setOrderDrawStarted] = useState(false);
    const { gameMoveInProgress } = useGameState();

    const handleGameStart = ():void => {
        if (!checkedSymbol) {
            return setNoSymbolCheckedError(true);
        }

        let gameSymbol = checkedSymbol === 'o' ? 'x' : 'o';

        dispatch({type: 'GAME_START', payload: { playerSymbol: checkedSymbol, gameSymbol }});
        setCheckedSymbol('');
        navigation.navigate('Game');
    }

    const drawOrderHandler = ():void => {
        setOrderDrawStarted(true);
        const drawNumber = Math.floor(Math.random() * Math.floor(100));
        let gameMoveInProgress = drawNumber % 2 == 0 ? true : false;
        setTimeout(() => {
            dispatch({type: 'FIRST_START', payload: { gameMoveInProgress }});
            setOrderDrawStarted(false);
        }, 2000);
    }

    const handleCheckSymbol = (symbol: string):void => {
        setNoSymbolCheckedError(false);
        setCheckedSymbol(symbol);
        drawOrderHandler();
    }

    return (
        <Fragment>
            <View style={styles.container}>
                <View style={styles.pickSymbolContainer}>
                    <Text style={styles.pickSymbolText}>Pick one</Text>
                    {
                        noSymbolCheckedError && <Text style={styles.errorText}>Please pick a mark!</Text>
                    }
                    <View style={styles.pickSymbolsWrapper}>
                        <TouchableWithoutFeedback style={styles.symbolsButtonContainerStyle} onPress={() => handleCheckSymbol('o')}>
                            <Icon name="circle" type="font-awesome-5" iconStyle={styles.symbolsButtonStyle} size={60} color="white" />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={styles.symbolsButtonContainerStyle} onPress={() => handleCheckSymbol('x')}>
                            <Icon name="times" type="font-awesome-5" iconStyle={styles.symbolsButtonStyle} size={60} color="white" />
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        checkedSymbol ? (
                            gameMoveInProgress ? <View style={styles.orderMessageContainer}>
                                <Text style={styles.orderMessageText}>You'll start second!</Text>
                            </View> : <View style={styles.orderMessageContainer}>
                            <Text style={styles.orderMessageText}>You'll start first!</Text>
                            </View>
                        ) : null
                    }
                </View>
                <Button
                    icon={{name: 'play-circle', type: 'font-awesome', size: 100, color: 'white'}}
                    raised
                    iconRight
                    title=''
                    onPress={handleGameStart}
                    buttonStyle={styles.buttonStyle}
                />
                {
                    orderDrawStarted ? (
                        <Overlay
                            image={null}
                            icon={{ name: 'dice', type: 'font-awesome-5', size: 80, color: '#f4511e'}}
                            spinner={{ size: 60, color: '#f4511e' }}
                        />
                    ) : null
                }
                
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#cecece'
    },
    pickSymbolContainer: {
        paddingTop: 20,
        paddingBottom: 10
    },
    pickSymbolText: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#f4511e'
    },
    pickSymbolsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingBottom: 30,
        paddingTop: 30,
    },
    buttonStyle: {
        backgroundColor: '#f4511e',
        fontSize: 40,
        borderRadius: 100
    },
    symbolsButtonContainerStyle: {
        backgroundColor: '#f4511e',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        shadowColor: 'rgba(0,0,0,0.75)',
        shadowOffset: { width: 2, height: 2 },
        elevation: 2,
    },
    symbolsButtonStyle: {
        backgroundColor: '#f4511e'
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center'
    },
    orderMessageContainer: {
        paddingBottom: 10
    },
    orderMessageText: {
        textAlign: 'center',
        color: '#f4511e',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        elevation: 1,
        fontWeight: 'bold',
        fontSize: 20
    }
})