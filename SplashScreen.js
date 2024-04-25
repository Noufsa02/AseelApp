// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000); // Splash screen will be displayed for 3 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
  },
});

export default SplashScreen;
