import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackHeaderLeftButtonProps, StackNavigationOptions } from '@react-navigation/stack';

import StartScreen from '../components/StartScreen';
import GameScreen from '../components/GameScreen';
import ResultScreen from '../components/ResultScreen';

const startScreenOptions:StackNavigationOptions = {
    title: 'TicTacToe',
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

const gameScreenOptions:StackNavigationOptions = {
    title: 'TicTacToe',
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerLeft: (props: StackHeaderLeftButtonProps) => null,
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

const resultScreenOptions:StackNavigationOptions = {
    title: 'TicTacToe',
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerLeft: (props: StackHeaderLeftButtonProps) => null,
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

const Stack = createStackNavigator();

export default () => <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} options={startScreenOptions} />
        <Stack.Screen name="Game" component={GameScreen} options={gameScreenOptions} />
        <Stack.Screen name="Result" component={ResultScreen} options={resultScreenOptions} />
    </Stack.Navigator>
</NavigationContainer>