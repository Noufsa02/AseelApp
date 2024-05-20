import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
//import * as tf from '@tensorflow/tfjs';
//import '@tensorflow/tfjs-react-native';

const UploadAndCapture = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
 // const [model, setModel] = useState(null);
  const [labels, setLabels] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      // Request permissions
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted' && imagePickerStatus.status === 'granted');

      // Initialize TensorFlow.js
     // await tf.ready();

      // Load the model
     /// const modelUrl = 'https://teachablemachine.withgoogle.com/models/Dxh-9KRRF/model.json';
     // const loadedModel = await tf.loadLayersModel(modelUrl);
     // setModel(loadedModel);
     // console.log('Model loaded.');

      // Load class labels
     // const metadataUrl = 'https://teachablemachine.withgoogle.com/models/Dxh-9KRRF/metadata.json'; // Adjust as needed
     // const metadataResponse = await fetch(metadataUrl);
    //  const metadata = await metadataResponse.json();
     // setLabels(metadata.labels);
    })();
  }, []);

 {/* const classifyImage = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const img = await tf.browser.fromPixelsAsync(blob);
    const resized = tf.image.resizeBilinear(img, [224, 224]).toFloat();
    const offset = tf.scalar(127.5);
    const normalized = resized.sub(offset).div(offset);
    const batched = normalized.expandDims(0);

    const prediction = await model.predict(batched);
    const predictedIndex = prediction.argMax(1).dataSync()[0];

    if (predictedIndex !== undefined && predictedIndex < labels.length) {
      Alert.alert('Recognition Complete', `Picture recognized as: ${labels[predictedIndex]}`);
    } else {
      Alert.alert('Recognition Failed', 'The picture has not been recognized.');
    }
  };

  const handleImage = async (imageUri) => {
    if (!model || labels.length === 0) {
      Alert.alert('Model not loaded', 'Please wait for the model and labels to load before selecting an image.');
      return;
    }
    classifyImage(imageUri);
  };
*/}

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      handleImage(photo.uri);
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
      handleImage(result.uri);
    }
  };

  if (!hasPermission) {
    return <Text>No access to camera or gallery</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>
      <Image source={require('./assets/guide_image1.jpg')} style={styles.guidanceImage} />
      <View style={styles.cameraControls}>
        <TouchableOpacity onPress={takePicture} style={styles.cameraIcon}>
          <FontAwesome5 name="camera-retro" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
          <FontAwesome5 name="image" size={35} color="black" />
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