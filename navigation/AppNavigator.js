//importing prerequisites...
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import CryptoScreen from '../screens/CryptoScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SettingsScreen from '../screens/SettingScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#f4511e' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#000',
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff', 
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tab.Screen
        name="Main"
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <FontAwesome
              name="cog"
              size={30}
              color="black"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Currency"
        component={CurrencyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="dollar" color={color} size={size} />
          ),
          headerRight: () => (
            <FontAwesome
              name="cog"
              size={30}
              color="black"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Crypto"
        component={CryptoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bitcoin" color={color} size={size} />
          ),
          headerRight: () => (
            <FontAwesome
              name="cog"
              size={30}
              color="black"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calculator" color={color} size={size} />
          ),
          headerRight: () => (
            <FontAwesome
              name="cog"
              size={30}
              color="black"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerStyle: { backgroundColor: '#f4511e' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
