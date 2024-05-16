import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomePage = ({ navigation }) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgrounds = [
    { image: require('./assets/background1.jpg'), text: ' أَصِيل، حيث تَتَوَهَّج رَوائعُ الماضي بين يَدَيِ الحَاضر'},
    { image: require('./assets/background2.jpg'), text: 'أمجاد تُسطّر لتراثٍ عريق وكنزٍ وطني.. نعتز بها دومًا' },
    { image: require('./assets/background3.jpg'), text: 'فخرٌ نتوارثه، وأصالة نعتزّ بها' },
    { image: require('./assets/background4.jpg'), text: 'ذاكرة فخر وميلاد اعتزاز' },
    { image: require('./assets/background5.jpg'), text: 'تراثنا وأصالتنا ثروة تتوارثها الأجيال' },
    { image: require('./assets/background6.jpg'), text: 'التراث.. قيمةٌ حضاريةٌ للأمم، وثروةٌ عظيمةٌ للشعوب.' },
    { image: require('./assets/background7.jpg'), text: '..قيمٌ نتوارثها.. لحاضِرنا ومُستقبلنا' },
    { image: require('./assets/background8.jpg'), text: 'تُراثنا هو أصالة ماضينا' },
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
      <View style={styles.textHighlight}>
          <Text style={styles.backgroundText}>{backgrounds[backgroundIndex].text}</Text>
        </View>
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
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  textHighlight: {
    backgroundColor: 'rgba(250, 246, 208, 0.5)',  // Semi-transparent white
    padding: 5,  // Adjust padding to control the size of the highlight
    borderRadius: 50,  // Optional: add rounded corners
  },

});


export default HomePage;