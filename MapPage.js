import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Adjusted coordinates for each region button to place them over specific map regions.
const regionData = [
  { name: "الشرقية", left: '69%', top: '55%' },
  { name: "مكة المكرمة", left: '22%', top: '55%' },
  { name: "المدينة المنورة", left: '15%', top: '48%' },
  { name: "الجوف", left: '15%', top: '35%' },
  { name: "تبوك", left: '4%', top: '39%' },
  { name: "حائل", left: '28%', top: '41%' },
  { name: "الرياض", left: '47%', top: '50%' },
  { name: "القصيم", left: '33%', top: '45%' },
  { name: "نجران", left: '48%', top: '63%' },
  { name: "جازان", left: '34%', top: '66%' },
  { name: "الباحة", left: '26%', top: '59%' },
  { name: "الحدود الشمالية", left: '31%', top: '36%' },
  { name: "عسير", left: '34%', top: '61%' }
];

const MapPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.page}>
      <View style={styles.container}>
        <Image source={require('./assets/KSAmap-removebg-preview.png')} style={styles.mapStyle} />
        {regionData.map((region, index) => (
          <RegionButton
            key={index}
            region={region}
            onPress={() => navigation.navigate('CategoryPage', { region: region.name })}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const RegionButton = ({ region, onPress }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: region.left,
        top: region.top,
        transform: [{ scale: scaleValue }],
      }}
    >
      <TouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{region.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#EDE0C8' // Adds a white background to the whole screen
  },
  button: {
    padding: 10, // Adjust padding to your needs
    alignItems: 'center',
    marginBottom: 10 // Space between buttons
  },
  buttonText: {
    fontSize: 12, // Set text size to your preference
    color: 'black', // Ensure text is visible against the transparent background
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '105%',
    height: 850 // Adjust the height based on the image size
  },
  mapStyle: {
    width: '110%',
    resizeMode: "contain",
    height: '100%'
  }
});

export default MapPage;