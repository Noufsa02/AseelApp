//Ghadee, [4/23/2024 8:10 PM]
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const UploadAndCapture = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const isActive = true;

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted' && imagePickerStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo taken: ', photo);
      Alert.alert('Photo Taken!', 'Check your console for the image data.');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log('Image picked: ', result);
      Alert.alert('Image Selected!', 'Check your console for the image data.');
    }
  };

  if (!hasPermission) {
    return <Text>No access to camera or gallery</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
      </View>

      <Image
        source={require('./assets/guide_image1.jpg')} // Make sure you have this image in your assets
        style={styles.guidanceImage}
      />

      <View style={styles.cameraControls}>
        <TouchableOpacity onPress={() => takePicture()} style={styles.cameraIcon}>
          <FontAwesome5 name="camera-retro" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
          <FontAwesome5 name="image" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <FontAwesome5 name="user" size={24} color="#F9E4D4" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="map" size={24} color="#F9E4D4" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UploadAndCapture')}>
          <FontAwesome5 name="camera" size={isActive ? 26 : 24} color={isActive ? "#ffffff" : "#F9E4D4"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Community')}>
          <FontAwesome5 name="comments" size={24} color="#F9E4D4" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="home" size={24} color="#F9E4D4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Ghadee, [4/23/2024 8:10 PM]
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6D0',
  },
  navBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Spacing below the logo
  },
  logo: {
    width: 600,
    height: 250,
    resizeMode: 'contain',
  },
  guidanceImage: {
    width: '100%',
    height: 400, // Adjust the height as needed
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 80, // Spacing below the guidance image
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 70, //position right above the navigation bar
    width: '100%',
  },
  cameraIcon: {
    marginHorizontal: 100, // Adjust spacing as needed
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#8F181C',
    paddingVertical: 3,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
export default UploadAndCapture;