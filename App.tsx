import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {GameProvider} from './src/store/context';
import NavigationContainer from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <NavigationContainer />
      </GameProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
