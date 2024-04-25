import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomePage = ({ navigation }) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgrounds = [
    { image: require('./assets/background1.jpg'), text: 'Text for background 1' },
    { image: require('./assets/background2.jpg'), text: 'Text for background 2' },
    { image: require('./assets/background3.jpg'), text: 'Text for background 3' },
    { image: require('./assets/background4.jpg'), text: 'Text for background 4' },
    { image: require('./assets/background5.jpg'), text: 'Text for background 5' },
    { image: require('./assets/background6.jpg'), text: 'Text for background 6' },
    { image: require('./assets/background7.jpg'), text: 'Text for background 7' },
    { image: require('./assets/background8.jpg'), text: 'Text for background 8' },
    { image: require('./assets/background9.jpg'), text: 'Text for background 9' },
    // Add more background images and texts as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={backgrounds[backgroundIndex].image} style={styles.backgroundImage}>
        <Text style={styles.backgroundText}>{backgrounds[backgroundIndex].text}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

});


export default HomePage;