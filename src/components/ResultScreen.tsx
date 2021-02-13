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
                console.log('Back');
                e.preventDefault();
            } else {
                dispatch({type: 'RESET_GAME'});
                navigation.dispatch(e.data.action)
            }
        }
    ), [navigation]);

    const exitApplication = ():void => {
        console.log('Exit application');
        BackHandler.exitApp();
    }

    const renderActionButtons = ():JSX.Element => {
        return <View style={styles.actionContainer}>
            <Button
                icon={{name: 'play-circle', type: 'font-awesome', size: 30, color: '#f4511e'}}
                raised
                iconRight
                title='Start New Game'
                onPress={() => navigation.navigate('Start')}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitleStyle}
            />
            <Button
                icon={{name: 'window-close', type: 'font-awesome', size: 30, color: '#f4511e'}}
                raised
                iconRight
                title='Quit Game'
                onPress={() => exitApplication()}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitleStyle}
            />
        </View>
    }

    const renderResult = ():JSX.Element => {
        if (winner) {
            return winner === playerSymbol ? <View style={styles.winResultContainer}>
                <Icon
                    name='trophy'
                    type='font-awesome-5'
                    color='#fff'
                    size={100}
                    containerStyle={styles.icon}
                />
                <Text style={styles.resultText}>Win</Text>
                {renderActionButtons()}
            </View> : <View style={styles.loserResultContainer}>
                <Icon
                    name='heart-broken'
                    type='font-awesome-5'
                    color='#fff'
                    size={100}
                    containerStyle={styles.icon}
                />
                <Text style={styles.resultText}>Lose</Text>
                {renderActionButtons()}
            </View>
        } else {
            return <View style={styles.drawResultContainer}>
                <Icon
                    name='equals'
                    type='font-awesome-5'
                    color='#fff'
                    size={100}
                    containerStyle={styles.icon}
                />
                <Text style={styles.resultText}>Draw</Text>
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
    icon: {
        backgroundColor: 'transparent'
    },
    resultText: {
        fontSize: 60,
        color: 'white'
    },
    drawResultContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(40, 69, 167, .95)'
    },
    winResultContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(40, 167, 69, .95)'
    },
    loserResultContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(167, 40, 69, .95)'
    },
    actionContainer: {
        display: 'flex',
        width: '100%',
        paddingTop: 50,
        paddingLeft: 40,
        paddingRight: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonStyle: {
        backgroundColor: '#fff',
        fontSize: 40
    },
    buttonTitleStyle: {
        color: '#f4511e'
    }
})
 
export default ResultScreen;