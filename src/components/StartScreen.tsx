import React, { Fragment, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useGameDispatch, useGameState } from '../store/context';
import { useNavigation  } from '@react-navigation/native';
import { Button, Icon, Divider, CheckBox  } from 'react-native-elements';
import Overlay from './shared/Overlay';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function StartScreen() {
    const dispatch = useGameDispatch();
    const navigation = useNavigation();
    const [checkedSymbol, setCheckedSymbol] = useState('');
    const [orderDrawStarted, setOrderDrawStarted] = useState(false);
    const { gameMoveInProgress, difficulty } = useGameState();

    const handleGameStart = ():void => {
        let gameSymbol = checkedSymbol === 'o' ? 'x' : 'o';

        dispatch({type: 'GAME_START', payload: { playerSymbol: checkedSymbol, gameSymbol }});
        setCheckedSymbol('');
        navigation.navigate('Game');
    }

    const drawOrderHandler = ():void => {
        setOrderDrawStarted(true);
        const drawNumber = Math.floor(Math.random() * Math.floor(100));
        let gameMoveInProgress = drawNumber % 2 == 0 ? true : false;
        dispatch({type: 'FIRST_START', payload: { gameMoveInProgress }});
        setTimeout(() => {
            setOrderDrawStarted(false);
        }, 2000);
    }

    const handleCheckSymbol = (symbol: string):void => {
        if (checkedSymbol) {
            return;
        }
        setCheckedSymbol(symbol);
        drawOrderHandler();
    }

    const renderSelectDifficultyLevel = ():JSX.Element => {
        return <View>
                <Text style={styles.difficultySelectContainerCopy}>Select difficulty:</Text>
                    <View style={styles.difficultySelectContainerCheckboxes}>
                        <CheckBox
                            center
                            iconRight
                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent'}}
                            title='Easy'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={difficulty === 'easy'}
                            onPress={() => dispatch({type: 'SET_DIFFICULTY', payload: { difficulty: 'easy' }})}
                            checkedColor='#333'
                            uncheckedColor='#333'
                            textStyle={styles.checkboxText}
                        />
                        <CheckBox
                            center
                            title='Hard'
                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent'}}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={difficulty === 'hard'}
                            onPress={() => dispatch({type: 'SET_DIFFICULTY', payload: { difficulty: 'hard' }})}
                            checkedColor='#333'
                            uncheckedColor='#333'
                            textStyle={styles.checkboxText}
                        />
                    </View>
                </View>
        
        
    }

    const renderStartButton = ():JSX.Element => {
        return <View style={{ display: 'flex', alignItems: 'center'}}>
                    <Button
                        icon={{name: 'play-circle', type: 'font-awesome', size: 100, color: 'white'}}
                        raised
                        iconRight
                        title=''
                        onPress={handleGameStart}
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStyle}
                    />
                </View>
    }

    const renderOrderMessages = (gameMoveInProgress: boolean):JSX.Element => {
        return gameMoveInProgress ? 
        <View style={styles.orderMessageContainer}>
            <Text style={styles.orderMessageText}>You'll start second!</Text>
            { renderSelectDifficultyLevel() }
        </View> : 
        <View style={styles.orderMessageContainer}>
            <Text style={styles.orderMessageText}>You'll start first!</Text>
            { renderSelectDifficultyLevel() }
        </View>
    }

    return (
        <Fragment>
            <View style={styles.container}>
                <View style={styles.pickSymbolContainer}>
                    <Text style={styles.pickSymbolText}>Pick one</Text>
                    <Divider style={styles.divider} />
                    <View style={styles.pickSymbolsWrapper}>
                        <TouchableWithoutFeedback style={[styles.symbolsButtonContainerStyle, checkedSymbol === 'o' ? styles.selected : null ]} onPress={() => handleCheckSymbol('o')}>
                            <Icon name="circle" type="font-awesome-5" iconStyle={checkedSymbol === 'o' ? styles.selectedSymbolsButtonStyle : styles.symbolsButtonStyle} size={60} color="white" />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={[styles.symbolsButtonContainerStyle, checkedSymbol === 'x' ? styles.selected : null ]} onPress={() => handleCheckSymbol('x')}>
                            <Icon name="times" type="font-awesome-5" iconStyle={checkedSymbol === 'x' ? styles.selectedSymbolsButtonStyle : styles.symbolsButtonStyle} size={60} color="white" />
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        checkedSymbol ? (
                            renderOrderMessages(gameMoveInProgress)  
                        ) : null
                    }
                    {
                        difficulty && checkedSymbol ? renderStartButton() : null
                    }
                </View>
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
        backgroundColor: '#999'
    },
    divider: {
        backgroundColor: '#333'
    },
    selected: {
        backgroundColor: '#f4511e'
    },
    pickSymbolContainer: {
        paddingTop: 20,
        paddingBottom: 10
    },
    pickSymbolText: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
        paddingBottom: 10
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
        borderRadius: 100,
    },
    buttonContainerStyle: {
        width: 120,
        marginTop: 20
    },
    symbolsButtonContainerStyle: {
        backgroundColor: '#333',
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
        backgroundColor: '#333'
    },
    selectedSymbolsButtonStyle: {
        backgroundColor: '#f4511e'
    },
    orderMessageContainer: {
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    orderMessageText: {
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
        fontSize: 20
    },
    difficultySelectContainerCopy: {
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
        fontSize: 18
    },
    difficultySelectContainerCheckboxes: {
        display: 'flex',
        flexDirection: 'row',
    },
    checkboxText: {
        color: '#333',
        fontSize: 18,
    }
})