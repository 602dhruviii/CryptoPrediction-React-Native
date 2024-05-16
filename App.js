import React from 'react';
import { StyleSheet, View } from 'react-native';
import CryptoPredictionComponent from './CryptoPredictionComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <CryptoPredictionComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5def5', // Main background color
    alignItems: 'center',
    justifyContent: 'center',
  },
});
