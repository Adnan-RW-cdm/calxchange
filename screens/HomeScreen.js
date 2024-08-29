/* import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { fetchCryptoRates, fetchCurrencyRates } from '../utils/api';
import {Animated,  Easing } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [cryptoRates, setCryptoRates] = useState(null);
  const [currencyRates, setCurrencyRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cryptoData = await fetchCryptoRates();
      const currencyData = await fetchCurrencyRates('USD'); // Replace 'USD' with the local currency code if needed
      setCryptoRates(cryptoData);
      setCurrencyRates(currencyData);
      setLoading(false);

      // Start fade-in animation after data is loaded
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView>
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Calxchange</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cryptocurrency Rates:</Text>
        {cryptoRates && (
          <View style={styles.ratesContainer}>
            <View style={styles.rateItem}>
              <Image source={require('../assets/icons/btc.png')} style={styles.icon} />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>Bitcoin</Text>
                <Text style={styles.rateValue}>${cryptoRates.bitcoin?.usd}</Text>
              </View>
            </View>
            <View style={styles.rateItem}>
              <Image source={require('../assets/icons/eth.png')} style={styles.icon} />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>Ethereum</Text>
                <Text style={styles.rateValue}>${cryptoRates.ethereum?.usd}</Text>
              </View>
            </View>
            <View style={styles.rateItem}>
              <Image source={require('../assets/icons/ltc.png')} style={styles.icon} />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>Litecoin</Text>
                <Text style={styles.rateValue}>${cryptoRates.litecoin?.usd}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Currency Rates:</Text>
        {currencyRates && (
          <View style={styles.ratesContainer}>
            <View style={styles.rateItem}>
              <FontAwesome name="dollar" size={40} color="green" />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>USD to EUR</Text>
                <Text style={styles.rateValue}>{currencyRates.rates?.EUR}</Text>
              </View>
            </View>
            <View style={styles.rateItem}>
              <FontAwesome name="dollar" size={40} color="green" />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>USD to GBP</Text>
                <Text style={styles.rateValue}>{currencyRates.rates?.GBP}</Text>
              </View>
            </View>
            <View style={styles.rateItem}>
              <FontAwesome name="dollar" size={40} color="green" />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>USD to JPY</Text>
                <Text style={styles.rateValue}>{currencyRates.rates?.JPY}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, {backgroundColor: "#2ecc71"}]} onPress={() => navigation.navigate('Currency')}>
          <Text style={styles.buttonText}>💱💹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#3498db'}]} onPress={() => navigation.navigate('Crypto')}>
          <Text style={styles.buttonText}>📊📈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: "#e74c3c"}]} onPress={() => navigation.navigate('Calculator')}>
          <Text style={styles.buttonText}>🔢🔣</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    marginTop: 20,
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  ratesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rateDetails: {
    marginLeft: 15,
  },
  rateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  icon: {
    width: 50,
    height: 50,
  },
  rateValue: {
    fontSize: 18,
    color: '#16a085',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    
    borderRadius: 10,
    width: '30%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
th' above commented code is not ur business 😭😭 just ignore it lol. i'm not giving up!
_________________________________________________________________________________________________________________________________
---------------------------------------------------------------------------------------------------------------------------------
*/


import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, Animated, Easing, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { fetchCryptoRates, fetchCurrencyRates } from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = () => {
  const { isDarkMode } = useTheme();
  const [cryptoRates, setCryptoRates] = useState(null);
  const [currencyRates, setCurrencyRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cryptoData = await fetchCryptoRates();
      const currencyData = await fetchCurrencyRates('USD');
      setCryptoRates(cryptoData);
      setCurrencyRates(currencyData);
      setLoading(false);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    };

    fetchData();
  }, []);

  const styles = isDarkMode ? darkStyles : lightStyles;

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Calxchange</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cryptocurrency Rates:</Text>
        {cryptoRates && (
          <View style={styles.ratesContainer}>
            <View style={styles.rateItem}>
              <Image source={require('../assets/icons/btc.png')} style={styles.icon} />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>Bitcoin</Text>
                <Text style={styles.rateValue}>${cryptoRates.bitcoin?.usd}</Text>
              </View>
            </View>
            <View style={styles.rateItem}>
              <Image source={require('../assets/icons/eth.png')} style={styles.icon} />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>Ethereum</Text>
                <Text style={styles.rateValue}>${cryptoRates.ethereum?.usd}</Text>
              </View>
            </View>
            <View style={styles.rateItem}>
              <Image source={require('../assets/icons/ltc.png')} style={styles.icon} />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>Litecoin</Text>
                <Text style={styles.rateValue}>${cryptoRates.litecoin?.usd}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Currency Rates:</Text>
        {currencyRates && (
          <View style={styles.ratesContainer}>
            <View style={styles.rateItem}>
              <FontAwesome name="dollar" size={40} color="green" />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>USD to EUR</Text>
                <Text style={styles.rateValue}>{currencyRates.rates?.EUR}</Text>
              </View>
            </View>
            <View style={styles.rateItem}>
              <FontAwesome name="dollar" size={40} color="green" />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>USD to GBP</Text>
                <Text style={styles.rateValue}>{currencyRates.rates?.GBP}</Text>
              </View>
            </View>
            <View style={styles.rateItem}>
              <FontAwesome name="dollar" size={40} color="green" />
              <View style={styles.rateDetails}>
                <Text style={styles.rateTitle}>USD to TRY</Text>
                <Text style={styles.rateValue}>{currencyRates.rates?.TRY}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    marginTop: 20,
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  ratesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rateDetails: {
    marginLeft: 15,
  },
  rateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  icon: {
    width: 50,
    height: 50,
  },
  rateValue: {
    fontSize: 18,
    color: '#16a085',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    width: '30%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 20,
    marginTop: 20,
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 10,
  },
  ratesContainer: {
    backgroundColor: '#34495e',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rateDetails: {
    marginLeft: 15,
  },
  rateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  icon: {
    width: 50,
    height: 50,
  },
  rateValue: {
    fontSize: 18,
    color: '#1abc9c',
  },
});

export default HomeScreen;

