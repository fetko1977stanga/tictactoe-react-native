import React, { Fragment, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {useGameState, useGameDispatch} from '../store/context';
import Overlay from './shared/Overlay';
import { ANIMATED_OVERLAY_IMG } from './../img';

const GameMove = ():JSX.Element => {
    const state = useGameState();
    const { gameBoard, gameMoveInProgress, gameSymbol, gameStarted } = state;
    const dispatch = useGameDispatch();

    useEffect(() => {
        if (gameMoveInProgress && gameStarted) {
            makeGameMove(gameBoard);
        }
    }, [gameMoveInProgress, gameStarted]);
    
    const makeGameMove = (board: any):void => {
        const freeBoardFields: Array<number> = board.filter((boardCell:any) => {
            return boardCell.value === null;
        }).map((boardCell:any) => boardCell.id);

        const pickedCell = freeBoardFields[Math.floor(Math.random() * freeBoardFields.length)];

        setTimeout(() => {
            dispatch({ type: 'SELECT_CELL', payload: { id: pickedCell, value: gameSymbol}});
        }, 1500);
    }

    return ( 
        <Fragment>
            {
                gameMoveInProgress ? (
                    <Overlay 
                        image={ANIMATED_OVERLAY_IMG}
                        copy='Game making a move...'
                        icon={null}
                        spinner={null}
                    />
                ) : null
            }
        </Fragment>
        
     );
}

const styles = StyleSheet.create({
    overlayBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        backgroundColor: '#fff',
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
 
export default GameMove;