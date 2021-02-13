import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const Overlay = (props: any):JSX.Element => {
    const { image, copy, icon, spinner } = props;
    return (
        <View style={styles.overlayBackdrop}>
            <View style={styles.overlay}>
                {
                    image ? <Image source={ image } style={ styles.overlayImage }/> : null
                }
                {
                    icon ? <Icon name={icon.name} type={icon.type} size={icon.size} color={icon.color} /> : null
                }
                {
                    copy ? <Text style={ styles.overlayCopyStyle}>{ copy }</Text> : null
                }
                {
                    spinner ? <ActivityIndicator size={spinner.size} color={spinner.color} style={{ paddingTop: 10 }} /> : null
                }
            </View>
        </View>
    )
}

export default Overlay;

const styles = StyleSheet.create({
    overlayBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        elevation: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlayImage: {
        width: 100,
        height: 100
    },
    overlayCopyStyle: {
        paddingTop: 10,
        fontWeight: 'bold',
        color: '#333'
    },
    overlay: {
        backgroundColor: '#fff',
        width: 250,
        height: 250,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
