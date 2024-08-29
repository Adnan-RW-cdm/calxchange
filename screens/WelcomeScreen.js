// screens/WelcomeScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();

    // Navigate to HomeScreen after animation ends
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Use replace to prevent going back to WelcomeScreen
    }, 5000); // Match duration of animation

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        <Image
          source= {require("../assets/images/logo.png")} 
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Calxchange...◌</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
