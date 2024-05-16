import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

const CryptoPredictionComponent = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [cryptoPrice, setCryptoPrice] = useState('');
  const [prediction, setPrediction] = useState('');

  const fetchCryptoPrice = async () => {
    try {
      const apiKey = 'your-api-key'; // Replace 'YOUR_API_KEY' with your actual API key
      const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${selectedCrypto.toUpperCase()}`, {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
          'Accept': 'application/json'
        }
      });
      setCryptoPrice(response.data.data[selectedCrypto.toUpperCase()].quote.USD.price);
    } catch (error) {
      console.error(`Error fetching ${selectedCrypto} price:`, error);
    }
  };

  const handlePredict = async () => {
    try {
      const apiKey = '3f146e06-8a7b-4ab3-92d6-299b04526dc2'; // Replace 'YOUR_API_KEY' with your actual API key
      const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${selectedCrypto.toUpperCase()}`, {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
          'Accept': 'application/json'
        }
      });
      
      const change = response.data.data[selectedCrypto.toUpperCase()].quote.USD.volume_change_24h;
      
      if (change>8) {
        setPrediction('Positive: Price is expected to increase');
      } else if (change < -0.5) {
        setPrediction('Negative: Price is expected to decrease');
      } else {
        setPrediction('Neutral: Price is expected to stay the same');
      }
    } catch (error) {
      console.error(`Error predicting ${selectedCrypto} price:`, error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Prediction</Text>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter Cryptocurrency Symbol (e.g., BTC)"
          value={selectedCrypto}
          onChangeText={text => setSelectedCrypto(text)}
        />
        <Text style={styles.price}>Current Price: {cryptoPrice ? `$${cryptoPrice}` : 'Loading...'}</Text>
        <Button title="Fetch Price" onPress={fetchCryptoPrice}/>   
        <View style={styles.buttonSpacing} />
        <View style={styles.buttonSpacing} />     
        <Button title="Predict" onPress={handlePredict} />
        {prediction && <Text style={styles.prediction}>Prediction: <View style={styles.buttonSpacing} /> {prediction}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5def5', // Main background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#430f58', // Title text color
  },
  content: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: '#8594e4', // Input border color
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  price: {
    marginBottom: 20,
    color: '#6643b5', // Price text color
  },  buttonSpacing: {
    height: 10, // Adjust the height for the desired spacing
  },
  prediction: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8594e4', // Prediction text color
  },
});

export default CryptoPredictionComponent;
