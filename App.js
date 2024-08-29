import React from 'react';

//the commented code is how i wanted to do it, i know very little btw😭😭lol!
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
// import CurrencyScreen from './screens/CurrencyScreen';
// import CryptoScreen from './screens/CryptoScreen';
// import CalculatorScreen from './screens/CalculatorScreen';
// import WelcomeScreen from './screens/WelcomeScreen'; // Import the WelcomeScreen

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Welcome">
//         <Stack.Screen
//           name="Welcome"
//           component={WelcomeScreen}
//           options={{ headerShown: false }} // Hide header for the welcome screen
//         />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Currency" component={CurrencyScreen} />
//         <Stack.Screen name="Crypto" component={CryptoScreen} />
//         <Stack.Screen name="Calculator" component={CalculatorScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// the below code was cux i was told to use tabs not buttons anymore... so i have to navigate through appnavigator where i configured stacknav and tab nav lol😭😭




import { StatusBar } from 'react-native';
import AppNavigator from '././navigation/AppNavigator'; // Adjust the path as necessary
import { ThemeProvider } from '././context/ThemeContext'; // Import ThemeProvider
import {SettingScreen}from './screens/SettingScreen';
import { HomeScreen }from './screens/HomeScreen';

export default function App() {
  return (
    
    <ThemeProvider>
       <StatusBar barStyle="light-content" /> 
      <AppNavigator />
    </ThemeProvider>
    
  );
}
