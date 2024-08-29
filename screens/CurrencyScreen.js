import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeContext';
import { fetchCurrencyRates } from '../utils/api';

const CurrencyConverterScreen = () => {
  const { isDarkMode } = useTheme();
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('TRY');
  const [currency3, setCurrency3] = useState('NGN');
  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('0');
  const [value3, setValue3] = useState('0');
  const [exchangeRates, setExchangeRates] = useState({});
  const [activeCurrency, setActiveCurrency] = useState(1);

  useEffect(() => {
    const getRates = async () => {
      const rates = await fetchCurrencyRates('USD'); // Fetch base currency rates, e.g., USD
      setExchangeRates(rates.rates);
    };
    getRates();
  }, []);

  const convertCurrency = (value, fromCurrency, toCurrency) => {
    if (!value || isNaN(value) || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return '0';
    const rateFromBase = exchangeRates[fromCurrency] ? 1 / exchangeRates[fromCurrency] : 0;
    const rateToBase = exchangeRates[toCurrency];
    return (parseFloat(value) * rateFromBase * rateToBase).toFixed(2);
  };

  const handleInputChange = (value, currencyNumber) => {
    if (currencyNumber === 1) {
      setValue1(value);
      setValue2(convertCurrency(value, currency1, currency2));
      setValue3(convertCurrency(value, currency1, currency3));
      setActiveCurrency(1);
    } else if (currencyNumber === 2) {
      setValue2(value);
      setValue1(convertCurrency(value, currency2, currency1));
      setValue3(convertCurrency(value, currency2, currency3));
      setActiveCurrency(2);
    } else if (currencyNumber === 3) {
      setValue3(value);
      setValue1(convertCurrency(value, currency3, currency1));
      setValue2(convertCurrency(value, currency3, currency2));
      setActiveCurrency(3);
    }
  };

  const handleKeyPress = (key) => {
    let newValue1 = value1;
    let newValue2 = value2;
    let newValue3 = value3;

    if (key === 'C') {
      newValue1 = '0';
      newValue2 = '0';
      newValue3 = '0';
    } else if (key === '<') {
      if (activeCurrency === 1) newValue1 = value1.slice(0, -1) || '0';
      if (activeCurrency === 2) newValue2 = value2.slice(0, -1) || '0';
      if (activeCurrency === 3) newValue3 = value3.slice(0, -1) || '0';
    } else if (key !== '=') {
      if (activeCurrency === 1) newValue1 = (value1 === '0' ? '' : value1) + key;
      if (activeCurrency === 2) newValue2 = (value2 === '0' ? '' : value2) + key;
      if (activeCurrency === 3) newValue3 = (value3 === '0' ? '' : value3) + key;
    }

    // Convert values after updating the input
    if (activeCurrency === 1) {
      setValue1(newValue1);
      setValue2(convertCurrency(newValue1, currency1, currency2));
      setValue3(convertCurrency(newValue1, currency1, currency3));
    } else if (activeCurrency === 2) {
      setValue2(newValue2);
      setValue1(convertCurrency(newValue2, currency2, currency1));
      setValue3(convertCurrency(newValue2, currency2, currency3));
    } else if (activeCurrency === 3) {
      setValue3(newValue3);
      setValue1(convertCurrency(newValue3, currency3, currency1));
      setValue2(convertCurrency(newValue3, currency3, currency2));
    }
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <View style={styles.currencyRow}>
        <Picker
          selectedValue={currency1}
          onValueChange={(value) => setCurrency1(value)}
          style={styles.picker}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <Picker.Item label={currency} value={currency} key={currency} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => setActiveCurrency(1)}>
          <TextInput
            style={[styles.valueText, activeCurrency === 1 && styles.activeInput]}
            value={value1}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.currencyRow}>
        <Picker
          selectedValue={currency2}
          onValueChange={(value) => setCurrency2(value)}
          style={styles.picker}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <Picker.Item label={currency} value={currency} key={currency} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => setActiveCurrency(2)}>
          <TextInput
            style={[styles.valueText, activeCurrency === 2 && styles.activeInput]}
            value={value2}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.currencyRow}>
        <Picker
          selectedValue={currency3}
          onValueChange={(value) => setCurrency3(value)}
          style={styles.picker}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <Picker.Item label={currency} value={currency} key={currency} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => setActiveCurrency(3)}>
          <TextInput
            style={[styles.valueText, activeCurrency === 3 && styles.activeInput]}
            value={value3}
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
 });

 /*const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#1E90FF',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: '#1E90FF',
    paddingRight: 30,
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});
*/


export default CurrencyConverterScreen;
