import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const CalculatorScreen = () => {
  const { isDarkMode } = useTheme();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('calcHistory');
        if (savedHistory !== null) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadHistory();
  }, []);

  const saveHistory = async (newHistory) => {
    try {
      await AsyncStorage.setItem('calcHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = (value) => {
    setInput(input + value);
  };

  const handleCalculate = () => {
    try {
      const resultValue = eval(input);
      setResult(resultValue);

      const newHistory = [...history, `${input} = ${resultValue}`];
      setHistory(newHistory);
      saveHistory(newHistory);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleErase = () => {
    setInput(input.slice(0, -1));
  };

  const clearHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem('calcHistory');
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setHistoryVisible(true);
      setRefreshing(false);
    }, 500);
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.historyContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!historyVisible && (
          <View style={styles.pullDownContainer}>
            <AntDesign name="down" size={22} color={styles.pullDownText.color} />
            <Text style={styles.pullDownText}>Pull down to view history</Text>
          </View>
        )}
        {historyVisible && (
          <>
            <TouchableOpacity style={styles.clearHistoryButton} onPress={clearHistory}>
              <Text style={styles.clearHistoryButtonText}>Clear History 🗑️</Text>
            </TouchableOpacity>
            {history.map((item, index) => (
              <Text key={index} style={styles.historyText}>{item}</Text>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}> 
        <View style={styles.resultContainer}>
         <TextInput
           style={styles.result}
           value={input}
           onChangeText={setInput}
           placeholder=""
           editable={false}
         />
         <Text style={styles.result}>{result}</Text>
        </View>

       <View style={styles.buttonContainer}>
         <View style={styles.row}>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
             <Text style={styles.buttonText}>7</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
             <Text style={styles.buttonText}>8</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
             <Text style={styles.buttonText}>9</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('+')}>
             <Text style={styles.buttonText}>+</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.row}>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
             <Text style={styles.buttonText}>4</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
             <Text style={styles.buttonText}>5</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
             <Text style={styles.buttonText}>6</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('-')}>
             <Text style={styles.buttonText}>-</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.row}>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
             <Text style={styles.buttonText}>1</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
             <Text style={styles.buttonText}>2</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
             <Text style={styles.buttonText}>3</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}>
             <Text style={styles.buttonText}>*</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.row}>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
             <Text style={styles.buttonText}>0</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}>
             <Text style={styles.buttonText}>.</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={handleCalculate}>
             <Text style={styles.buttonText}>=</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('/')}>
             <Text style={styles.buttonText}>/</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.row}>
           <TouchableOpacity style={[styles.button, styles.eraseButton]} onPress={handleErase}>
             <Text style={styles.buttonText}>DEL</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
             <Text style={styles.buttonText}>C</Text>
           </TouchableOpacity>
         </View>
       </View>
      </View>
    </View>
  );
};

//light mode styles
const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  resultContainer: {
    width: '100%',
    marginBottom: 8,
    height: '20%',
  },
  result: {
    fontSize: 25,
    textAlign: 'right',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  eraseButton: {
    backgroundColor: '#e67e22',
  },
  clearButton: {
    width: '75%',
    backgroundColor: '#e74c3c',
  },
  historyContainer: {
    width: '100%',
    maxHeight: 200,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    height:'40%',
  },
  pullDownContainer: {
    alignItems: 'center',
    padding: 10,
    height: 80,
  },
  pullDownText: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  historyText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  clearHistoryButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    marginBottom: 10,
  },
  clearHistoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

//dark mode styles
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  resultContainer: {
    width: '100%',
    marginBottom: 8,
    height: '20%',
  },
  result: {
    fontSize: 25,
    textAlign: 'right',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    padding: 10,
    backgroundColor: '#333',
    color: '#fff',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: '#555',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  eraseButton: {
    backgroundColor: '#e67e22',
  },
  clearButton: {
    width: '75%',
    backgroundColor: '#e74c3c',
  },
  historyContainer: {
    width: '100%',
    maxHeight: 200,
    marginBottom: 20,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 8,
    height: '40%',
  },
  pullDownContainer: {
    alignItems: 'center',
    padding: 10,
    height: 80,
  },
  pullDownText: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 4,
  },
  historyText: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 5,
  },
  clearHistoryButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    marginBottom: 10,
  },
  clearHistoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CalculatorScreen;

