/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeContext';
import { fetchCryptoRates, fetchAllCrypto, fetchCurrencyRates } from '../utils/api';

const CryptoConverterScreen = () => {
  const { isDarkMode } = useTheme();
  const [crypto1, setCrypto1] = useState('bitcoin');
  const [crypto2, setCrypto2] = useState('ethereum');
  const [currency, setCurrency] = useState('USD');
  const [crypto1Value, setCrypto1Value] = useState('0');
  const [crypto2Value, setCrypto2Value] = useState('0');
  const [currencyValue, setCurrencyValue] = useState('0');
  const [cryptoRates, setCryptoRates] = useState({});
  const [fiatRates, setFiatRates] = useState({});
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [activeField, setActiveField] = useState(1);

  useEffect(() => {
    const getRates = async () => {
      const cryptoData = await fetchCryptoRates('usd');
      setCryptoRates(cryptoData);
      const fiatData = await fetchCurrencyRates('USD');
      setFiatRates(fiatData.rates);

      const allCryptos = await fetchAllCrypto();
      setCryptoOptions(allCryptos.map(crypto => ({ id: crypto.id, name: crypto.name })));
    };

    getRates();
  }, []);

  const convertFromBase = (value, fromRate, toRate) => {
    if (!value || isNaN(value)) return '0';
    return ((parseFloat(value) * fromRate) / toRate).toFixed(2);
  };

  const handleInputChange = (value, field) => {
    if (isNaN(value)) return;

    if (field === 1) {
      setCrypto1Value(value);
      const crypto1ToUSD = cryptoRates[crypto1]?.usd || 0;
      setCrypto2Value(convertFromBase(value, crypto1ToUSD, cryptoRates[crypto2]?.usd || 0));
      setCurrencyValue(convertFromBase(value, crypto1ToUSD, fiatRates[currency] || 0));
      setActiveField(1);
    } else if (field === 2) {
      setCrypto2Value(value);
      const crypto2ToUSD = cryptoRates[crypto2]?.usd || 0;
      setCrypto1Value(convertFromBase(value, crypto2ToUSD, cryptoRates[crypto1]?.usd || 0));
      setCurrencyValue(convertFromBase(value, crypto2ToUSD, fiatRates[currency] || 0));
      setActiveField(2);
    } else if (field === 3) {
      setCurrencyValue(value);
      const currencyToUSD = fiatRates[currency] || 0;
      setCrypto1Value(convertFromBase(value, currencyToUSD, cryptoRates[crypto1]?.usd || 0));
      setCrypto2Value(convertFromBase(value, currencyToUSD, cryptoRates[crypto2]?.usd || 0));
      setActiveField(3);
    }
  };

  const handleKeyPress = (key) => {
    let newValue;
    if (key === 'C') {
      setCrypto1Value('0');
      setCrypto2Value('0');
      setCurrencyValue('0');
    } else if (key === '<') {
      if (activeField === 1) newValue = crypto1Value.slice(0, -1) || '0';
      if (activeField === 2) newValue = crypto2Value.slice(0, -1) || '0';
      if (activeField === 3) newValue = currencyValue.slice(0, -1) || '0';
      handleInputChange(newValue, activeField);
    } else if (key !== '=') {
      if (activeField === 1) newValue = (crypto1Value === '0' ? '' : crypto1Value) + key;
      if (activeField === 2) newValue = (crypto2Value === '0' ? '' : crypto2Value) + key;
      if (activeField === 3) newValue = (currencyValue === '0' ? '' : currencyValue) + key;
      handleInputChange(newValue, activeField);
    }
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Converter</Text>

      <View style={styles.currencyRow}>
        <Picker
          selectedValue={crypto1}
          onValueChange={(value) => setCrypto1(value)}
          style={styles.picker}
        >
          {cryptoOptions.map(crypto => (
            <Picker.Item label={crypto.name} value={crypto.id} key={crypto.id} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => setActiveField(1)}>
          <TextInput
            style={[styles.valueText, activeField === 1 && styles.activeInput]}
            value={crypto1Value}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.currencyRow}>
        <Picker
          selectedValue={crypto2}
          onValueChange={(value) => setCrypto2(value)}
          style={styles.picker}
        >
          {cryptoOptions.map(crypto => (
            <Picker.Item label={crypto.name} value={crypto.id} key={crypto.id} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => setActiveField(2)}>
          <TextInput
            style={[styles.valueText, activeField === 2 && styles.activeInput]}
            value={crypto2Value}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.currencyRow}>
        <Picker
          selectedValue={currency}
          onValueChange={(value) => setCurrency(value)}
          style={styles.picker}
        >
          {Object.keys(fiatRates).map((curr) => (
            <Picker.Item label={curr} value={curr} key={curr} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => setActiveField(3)}>
          <TextInput
            style={[styles.valueText, activeField === 3 && styles.activeInput]}
            value={currencyValue}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.keypad}>
        {['C', '<', '%', '/'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {['7', '8', '9', '*'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {['4', '5', '6', '-'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {['1', '2', '3', '+'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {['00', '0', '.', '='].map((key) => (
          <TouchableOpacity
            key={key}
            style={[styles.key, key === '=' && styles.equalsKey]}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={[styles.keyText, key === '=' && styles.equalsKeyText]}>
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}; */

//the above fetches all the crypto currencies in the API, and man they are like a billion lol
//so i've gotta optimixe it cuz it's making the code (app) really slow!!

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeContext';
import { fetchCryptoRates, fetchAllCrypto, fetchCurrencyRates } from '../utils/api';

const initialCryptos = [
  'bitcoin', 'ethereum', 'tether', 'binancecoin', 'usd-coin', 'ripple', 'cardano', 
  'dogecoin', 'solana', 'tron', 'toncoin', 'polkadot', 'polygon', 'litecoin', 
  'avalanche-2', 'wrapped-bitcoin', 'chainlink', 'stellar', 'filecoin', 
  'trueusd', 'dai', 'shiba-inu', 'lido-dao', 'bitcoin-cash', 'pepe', 
  'near', 'uniswap', 'cronos', 'the-graph', 'algorand'
];

const CryptoConverterScreen = () => {
  const { isDarkMode } = useTheme();
  const [crypto1, setCrypto1] = useState('bitcoin');
  const [crypto2, setCrypto2] = useState('ethereum');
  const [currency, setCurrency] = useState('USD');
  const [crypto1Value, setCrypto1Value] = useState('0');
  const [crypto2Value, setCrypto2Value] = useState('0');
  const [currencyValue, setCurrencyValue] = useState('0');
  const [cryptoRates, setCryptoRates] = useState({});
  const [fiatRates, setFiatRates] = useState({});
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [activeField, setActiveField] = useState(1);

  useEffect(() => {
    const getRates = async () => {
      const cryptoData = await fetchCryptoRates('usd');
      setCryptoRates(cryptoData);
      const fiatData = await fetchCurrencyRates('USD');
      setFiatRates(fiatData.rates);

      const allCryptos = await fetchAllCrypto();
      setCryptoOptions(allCryptos.filter(crypto => initialCryptos.includes(crypto.id)));
    };

    getRates();
  }, []);

  const convertFromBase = (value, fromRate, toRate) => {
    if (!value || isNaN(value)) return '0';
    return ((parseFloat(value) * fromRate) / toRate).toFixed(2);
  };

  const handleInputChange = (value, field) => {
    if (isNaN(value)) return;

    if (field === 1) {
      setCrypto1Value(value);
      const crypto1ToUSD = cryptoRates[crypto1]?.usd || 0;
      setCrypto2Value(convertFromBase(value, crypto1ToUSD, cryptoRates[crypto2]?.usd || 0));
      setCurrencyValue(convertFromBase(value, crypto1ToUSD, fiatRates[currency] || 0));
      setActiveField(1);
    } else if (field === 2) {
      setCrypto2Value(value);
      const crypto2ToUSD = cryptoRates[crypto2]?.usd || 0;
      setCrypto1Value(convertFromBase(value, crypto2ToUSD, cryptoRates[crypto1]?.usd || 0));
      setCurrencyValue(convertFromBase(value, crypto2ToUSD, fiatRates[currency] || 0));
      setActiveField(2);
    } else if (field === 3) {
      setCurrencyValue(value);
      const currencyToUSD = fiatRates[currency] || 0;
      setCrypto1Value(convertFromBase(value, currencyToUSD, cryptoRates[crypto1]?.usd || 0));
      setCrypto2Value(convertFromBase(value, currencyToUSD, cryptoRates[crypto2]?.usd || 0));
      setActiveField(3);
    }
  };

  const handleKeyPress = (key) => {
    let newValue;
    if (key === 'C') {
      setCrypto1Value('0');
      setCrypto2Value('0');
      setCurrencyValue('0');
    } else if (key === '<') {
      if (activeField === 1) newValue = crypto1Value.slice(0, -1) || '0';
      if (activeField === 2) newValue = crypto2Value.slice(0, -1) || '0';
      if (activeField === 3) newValue = currencyValue.slice(0, -1) || '0';
      handleInputChange(newValue, activeField);
    } else if (key !== '=') {
      if (activeField === 1) newValue = (crypto1Value === '0' ? '' : crypto1Value) + key;
      if (activeField === 2) newValue = (crypto2Value === '0' ? '' : crypto2Value) + key;
      if (activeField === 3) newValue = (currencyValue === '0' ? '' : currencyValue) + key;
      handleInputChange(newValue, activeField);
    }
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Converter</Text>

      <View style={styles.currencyRow}>
        <Picker
          selectedValue={crypto1}
          onValueChange={(value) => setCrypto1(value)}
          style={styles.picker}
        >
          {cryptoOptions.map(crypto => (
            <Picker.Item label={crypto.name} value={crypto.id} key={crypto.id} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => setActiveField(1)}>
          <TextInput
            style={[styles.valueText, activeField === 1 && styles.activeInput]}
            value={crypto1Value}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.currencyRow}>
        <Picker
          selectedValue={crypto2}
          onValueChange={(value) => setCrypto2(value)}
          style={styles.picker}
        >
          {cryptoOptions.map(crypto => (
            <Picker.Item label={crypto.name} value={crypto.id} key={crypto.id} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => setActiveField(2)}>
          <TextInput
            style={[styles.valueText, activeField === 2 && styles.activeInput]}
            value={crypto2Value}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.currencyRow}>
        <Picker
          selectedValue={currency}
          onValueChange={(value) => setCurrency(value)}
          style={styles.picker}
        >
          {Object.keys(fiatRates).map((curr) => (
            <Picker.Item label={curr} value={curr} key={curr} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => setActiveField(3)}>
          <TextInput
            style={[styles.valueText, activeField === 3 && styles.activeInput]}
            value={currencyValue}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>


{/*trying to regulate the fetching and display of the crypto currencies for better perfomance*/}
{/**seems like the button may just have to display all at once, that name/id gimmick ain't fooling me */}

      {/*<TouchableOpacity onPress={() => setShowMore(!showMore)} style={styles.moreButton}>
        <Text style={styles.moreText}>{showMore ? 'Show Less' : 'More...'}</Text>
      </TouchableOpacity>

      {showMore && (
        <View style={styles.moreCryptos}>
          {cryptoOptions.length === initialCryptos.length && (
            <Text style={styles.noMoreText}>No more cryptocurrencies to display.</Text>
          )}
          {cryptoOptions.filter(crypto => !initialCryptos.includes(crypto.id)).map(crypto => (
            <Picker.Item label={crypto.name} value={crypto.id} key={crypto.id} />
          ))}
        </View>
      )}*/}

      <View style={styles.keypad}>
        {['C', '<', '%', '/'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {['7', '8', '9', '*'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {['4', '5', '6', '-'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {['1', '2', '3', '+'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {['00', '0', '.', '='].map((key) => (
          <TouchableOpacity
            key={key}
            style={[styles.key, key === '=' && styles.equalsKey]}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={[styles.keyText, key === '=' && styles.equalsKeyText]}>
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#1E90FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  valueText: {
    fontSize: 20,
    color: '#1E90FF',
    width: 100,
    textAlign: 'right',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E90FF',
  },
  activeInput: {
    color: '#FF4500',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  key: {
    width: '22%',
    marginBottom: 10,
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  keyText: {
    fontSize: 18,
    color: '#1E90FF',
  },
  equalsKey: {
    backgroundColor: '#1E90FF',
  },
  equalsKeyText: {
    color: 'white',
  },
  picker: {
    width: 150,
    height: 40,
    color: '#1E90FF',
  },

//styling for the R-button if used and fetching all
  moreButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF', 
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, //shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
  },
  moreText: {
    color: '#FFF', 
    fontSize: 16,
    fontWeight: '500', 
  },
  moreCryptos: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F7F7F7',
    borderColor: '#DDD', 
    borderWidth: 1,
  },
  noMoreText: {
    color: '#888', 
    fontSize: 14,
    textAlign: 'center',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  valueText: {
    fontSize: 20,
    color: '#FFF',
    width: 100,
    textAlign: 'right',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  activeInput: {
    color: '#FF4500', 
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  key: {
    width: '22%',
    marginBottom: 10,
    backgroundColor: '#555',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  keyText: {
    fontSize: 18,
    color: '#FFF',
  },
  equalsKey: {
   backgroundColor: '#1E90FF',
  },
  equalsKeyText: {
    color: 'white',
  },
  picker: {
    width: 150,
    height: 40,
    color: '#FFF',
  },

//styling for the R-button if used and fetching all
  moreButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, //shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
  },
  moreText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500', 
  },
  moreCryptos: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333', 
    borderColor: '#555', 
    borderWidth: 1,
  },
  noMoreText: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CryptoConverterScreen;
