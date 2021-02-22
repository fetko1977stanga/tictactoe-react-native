import React, { Fragment, useEffect } from 'react';
import { View, StyleSheet, Text, BackHandler  } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {useGameDispatch, useGameState} from '../store/context';

                                                
const ResultScreen = ():JSX.Element => {
    const { gameEnded, winner, playerSymbol } = useGameState();
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
        }
    ), [navigation]);

    const exitApplication = ():void => {
        BackHandler.exitApp();
    }

    const renderActionButtons = ():JSX.Element => {
        return <View style={styles.actionContainer}>
            <Button
                icon={{name: 'play-circle', type: 'font-awesome-5', size: 30, color: 'white'}}
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

    const renderResult = ():JSX.Element => {
        if (winner) {
            return winner === playerSymbol ? <View style={styles.resultContainer}>
                <Icon
                    name='trophy'
                    type='font-awesome-5'
                    color='#ffd700'
                    size={100}
                    containerStyle={styles.iconContainer}
                />
                <Text style={styles.resultWonText}>You've won!</Text>
                {renderActionButtons()}
            </View> : <View style={styles.resultContainer}>
                <Icon
                    name='heart-broken'
                    type='font-awesome-5'
                    color='#333'
                    size={100}
                    containerStyle={styles.iconContainer}
                />
                <Text style={styles.resultText}>You've lost!</Text>
                {renderActionButtons()}
            </View>
        } else {
            return <View style={styles.resultContainer}>
                <Icon
                    name='equals'
                    type='font-awesome-5'
                    color='#f4511e'
                    size={100}
                    containerStyle={styles.iconContainer}
                />
                <Text style={styles.resultDrawText}>It's a draw!</Text>
                {renderActionButtons()}
            </View>
        }
    }

    return ( 
        <Fragment>
            { gameEnded ? 
                (<View style={styles.container}>
                    { renderResult() }
                </View>) : null
            }
        </Fragment>
        
     );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    iconContainer: {
        
    },
    resultText: {
        fontSize: 30,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    resultDrawText: {
        fontSize: 30,
        color: '#f4511e',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        textAlign: 'center'
    },
    resultWonText: {
        fontSize: 30,
        color: '#ffd700',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        textAlign: 'center'
    },
    resultContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#999'
    },
    actionContainer: {
        paddingTop: 50,
        paddingLeft: 40,
        paddingRight: 40,
    },
    buttonStyle: {
        backgroundColor: '#f4511e',
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttonQuitStyle: {
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttonContainerStyle: {
        marginBottom: 20,
        width: 150,
    },
    buttonTitleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10
    }
})
 
export default ResultScreen;