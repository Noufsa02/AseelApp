// UploadAndCapture.js
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Platform, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { FIREBASE_DB } from './FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const modelJson = require('./assets/model/model.json');
const modelWeights = require('./assets/model/weights.bin');

const UploadAndCapture = ({ navigation }) => {
  const [result, setResult] = useState('');
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');

  useEffect(() => {
    (async () => {
      await tf.ready();
      // Load your model. Adjust paths as necessary.
      const loadedModel = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
      setModel(loadedModel);
      console.log('Model loaded.');

      // Request camera roll permissions from the user.
      if (Platform.OS !== 'web') {
        const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        
        if (libraryPermission.status !== 'granted' || cameraPermission.status !== 'granted') {
          alert('Sorry, we need camera and camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleImageAndPredict = async (source) => {
    setLoading(true);
    setResult('');
    setAdditionalInfo('');

    let pickerResult;
    if (source === 'camera') {
      pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        base64: true
      });
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        base64: true
      });
    }

    try {
      if (!pickerResult.cancelled && pickerResult.assets && pickerResult.assets.length && pickerResult.assets.every(img => img.base64 != null)) {
        const imageTensor = decodeJpeg(tf.util.encodeString(pickerResult.assets[0].base64, 'base64'));
        const processedImage = preprocessImage(imageTensor);
        const {predictionMsg, predictedClass} = await makePrediction(processedImage);
        setResult(predictionMsg);
        // Fetch additional information from Firestore
        const additionalInfo = predictedClass != null && await fetchAdditionalInfo(predictedClass);
        setAdditionalInfo(additionalInfo);
      } else {
        console.log('No image picked or missing base64 data');
        setResult('No image picked or missing base64 data');
      }
    } catch (error) {
      console.error(error);
      setResult('An error occurred during prediction');
    } finally {
      setLoading(false);
    }
  };

  const preprocessImage = (imageTensor) => {
    const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);
    return resizedImage.div(255.0).expandDims(0);
  };

  const makePrediction = async (image) => {
    if (!model) {
      return {predictionMsg: 'Model not loaded yet', predictedClass: null};
    }
    const predictions = await model.predict(image).data();
    //const classes = ['Salwa Palace', 'Kaf Palace', 'Zabel Palace', 'Mared Palace', 'Almasmaq Palace', 'Al-Waziya Palace', 'Wall of Dalam', 'eayn alnajm', 'Ibrahim Palace', 'muraqab raghba'];
    const classes = [
      "Alwizaya palace", "A wall painting from the first century BC", "The historical Almurabae palace", "albuyut altiyniat fi hayi almarabae", "suq alqaysaria", "sur aldilam", "sadu alsabein birawdat sadir", "eayn alnajm", "Almasmak palace", "Marid palace",
      "Zaebal palace", "Al-Shanana Tower in Al-Rass", "Uhud Castle", "Al Kut Tower", "Historic Jeddah", "almaraqab aljanubiu bishaqra", "kaf palace", "The historic muraqab raghbat", "Salwa Palace", "Ibrahim Palace",
      "aleayn alqawsiat - eayan faraj", "The historic castle of Urwa bin Al-Zubair palaces", "Al Khubara Heritage Town", "Shamsan Castle", "Tabuk Heritage Castle", "Alqara Mountain", "AIUla Heritage Town", "Jubaila Police Station", "Mount Munikh Observatory", "The heritage town of Oyoun Al-Jawa",
      "Ghaseiba neighborhood", "Turaif neighborhood", "King Abdulaziz Historical Center", "Imam Turki bin Abdullah Castle", "King Abdulaziz Castle in Duba", "Historical Shada Palace", "Historical Khuzam Palace", "Khuzam Palace in Al-Ahsa", "Al-Dahou neighborhood", "Al-Bujairi neighborhood",
      "The town's heritage castle in Al-Wajh", "Al-Turaif bathroom", "Alamara Palace in Ghat", "Dhi Ain Heritage Village", "Al-amara Palace in Al-Issawiya", "Almajlis Heritage Market in Shaqra", "Al-Qashla Palace", "The historic King Abdulaziz Palace in Wadi Al-Dawa", "King Abdulaziz Palace in Quba", "The historic King Abdulaziz Palace in Lina Center",
      "Gold bracelets from Thaj Treasure", "Copper astrolabe", "Gilded silver tableware", "Patterned limestone slab", "Pottery vessel dating back to the fifth millennium", "A pottery bowl from the Tayma civilization", "Stone inscription from the tenth century AD", "A precious necklace made of gold pearls and rubies", "Lahyani Statue from the 4th century", "Statue of the King of Lihyan from the 4 century BC",
      "A necklace made of bone and shells from 7th BC", "Statue of suffering man", "Latch for the Alhujra alsharifa", "Camel statue", "A precious porcelain statue", "Tombstone from the third century AH", "Statue of a woman dating from first century AD", "7,000-year-old fossilized scrapers and axes", "Monument of dhat aleuyun", "A lamp made of gilded copper",
      "9000 year old horse figure", "A silver cup from the Al-Faw civilization", "Lion mask from the 2nd century AD", "Statue decorated with precious stones", "Head of a statue dating back to the 4th century BC", "Saluki head and body", "A silver dirham from the Abbasid era", "Glass perfume bottle", "Small statue from the 3rd century BC", "Almarmar statue of a man",
      "Tombstone from Mecca", "Date-shaped bottle", "A manuscript of the Qur'an", "A rare manuscript of the Holy Qur'an", "A mural dating back to the first century BC", "Aaref Castle", "King Abdulaziz stood in the center of Al Majmaah", "Al Uqair Heritage Port", "King Abdulaziz Palace in Haddad", "The governorate building in the town of Al-Ula"
    ];

    const highestPredictionIndex = predictions.indexOf(Math.max(...predictions));
    const highestPredictionValue = predictions[highestPredictionIndex];
    const threshold = 0.5; // Adjust this threshold based on your needs

    if (highestPredictionValue > threshold) {
        return {predictionMsg: `${classes[highestPredictionIndex]} has been recognized`, predictedClass: classes[highestPredictionIndex]};
    } else {
        return {predictionMsg: 'Heritage not recognized', predictedClass: null};
    }
  };

  const fetchAdditionalInfo = async (predictedClass) => {
    try {
      const q = query(collection(FIREBASE_DB, 'model'), where('Name', '==', predictedClass));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.data().Description || 'No additional information found';
      } else {
        return 'No additional information found';
      }
    } catch (error) {
      console.error(error);
      return 'Error fetching additional information';
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Select Image from Library" onPress={() => handleImageAndPredict('library')} disabled={loading || !model} />
      <View style={{ height: 20 }} />
      <Button title="Capture Image with Camera" onPress={() => handleImageAndPredict('camera')} disabled={loading || !model} />
      {loading ? (
        <ActivityIndicator size="large" color="#0e1457" style={{ marginTop: 20 }} />
      ) : (
        <>
          <Text style={{ marginTop: 20 }}>{result}</Text>
          {additionalInfo ? <Text>{additionalInfo}</Text> : null}
        </>
      )}
    </View>
  );
};

export default UploadAndCapture;

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { Camera } from 'expo-camera';
// import * as ImagePicker from 'expo-image-picker';
// import '@tensorflow/tfjs-react-native';
// import * as tf from '@tensorflow/tfjs';
// //import { downloadFile } from './fileManager'; // Import the download function
// import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import { Asset } from 'expo-asset';
// import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

// const UploadAndCapture = ({ navigation }) => {
//   // const cameraRef = useRef(null);
//   // const [model, setModel] = useState(null);
//   // const [isLoading, setIsLoading] = useState(false);

//   const [result, setResult] = useState('');

//   useEffect(() => {
//     async function loadModel(){
//       console.log("[+] Application started")
//       //Wait for tensorflow module to be ready
//       const tfReady = await tf.ready();
//       console.log("[+] Loading custom mask detection model")
//       //Replce model.json and group1-shard.bin with your own custom model
//       const modelJson = await require("./assets/model/model.json");
//       const modelWeight = await require("./assets/model/model.weights.bin");

//       const maskDetector = await tf.loadLayersModel(bundleResourceIO(modelJson,modelWeight));
//       console.log("[+] Loading pre-trained face detection model")
//       //Blazeface is a face detection model provided by Google
//       const faceDetector =  await blazeface.load();
//       //Assign model to variable
//       setMaskDetector(maskDetector)
//       setFaceDetector(faceDetector)
//       console.log("[+] Model Loaded")
//     }
//     loadModel()
//   }, []); 

  
//   useEffect(() => {
//     (async () => {
//       const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
//       const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       setHasPermission(cameraStatus === 'granted' && galleryStatus === 'granted');

//       setIsLoading(true);
//       await tf.ready();

//       // Loading the model from local assets
//       const modelJson = require('./assets/model/model.json');
//       const modelWeights = require('./assets/model/model.weights.bin');

//       const [modelJsonAsset, modelWeightsAsset] = await Promise.all([
//         Asset.loadAsync(modelJson),
//         Asset.loadAsync(modelWeights)
//       ]);

//       const model = await tf.loadLayersModel(bundleResourceIO(modelJsonAsset.uri, [modelWeightsAsset.uri]));
//       setModel(model);
//       setIsLoading(false);

//       // Assuming labels are stored locally or fetched from a remote source
//       const labels = ["قصر الوزية", "قصر المربع التاريخي", "البيوت الطينية في حي المربع",
//       "سوق القيصرية","سور الدلم","سد السبعين بروضة سدير",
//       "عين النجم","قصر المصمك","قلعة مارد","قلعة زعبل"
//       ]; // Update according to your model's labels
//       setLabels(labels);
//     })();
//   }, []);

//   const handleImage = async (uri) => {
//     if (!model) {
//       Alert.alert('Model not ready', 'Please wait until the model is loaded.');
//       return;
//     }

//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const img = await tf.browser.fromPixels(blob);
//     const resized = tf.image.resizeBilinear(img, [224, 224]);
//     const normalized = resized.div(255.0);
//     const batched = normalized.expandDims(0);
//     const prediction = await model.predict(batched);
//     const resultIndex = prediction.argMax(1).dataSync()[0];

//     if (resultIndex !== undefined && labels[resultIndex]) {
//       Alert.alert('Recognition Complete', `Picture recognized as: ${labels[resultIndex]}`);
//     } else {
//       Alert.alert('Recognition Failed', 'The picture has not been recognized.');
//     }
//   };

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       handleImage(photo.uri);
//     }
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       handleImage(result.uri);
//     }
//   };

//   if (!hasPermission) {
//     return <Text>No access to camera or gallery</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.navBar}>
//         <Image source={require('./assets/logo.png')} style={styles.logo} />
//       </View>
//       <Image source={require('./assets/guide_image1.jpg')} style={styles.guidanceImage} />
//       <View style={styles.cameraControls}>
//         <TouchableOpacity onPress={takePicture} style={styles.cameraIcon}>
//           <FontAwesome5 name="camera-retro" size={35} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
//           <FontAwesome5 name="image" size={35} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAF6D0',
//   },
//   navBar: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   logo: {
//     width: 600,
//     height: 250,
//     resizeMode: 'contain',
//   },
//   guidanceImage: {
//     width: '100%',
//     height: 400,
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginBottom: 80,
//   },
//   cameraControls: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     position: 'absolute',
//     bottom: 70,
//     width: '100%',
//   },
//   cameraIcon: {
//     padding: 10,
//     backgroundColor: '#8F181C',
//      borderRadius: 50,
//   }
// });

//  export default UploadAndCapture;








//______________________________________________________________________________________________________



// // Initialize TensorFlow.js for React Native
// tf.ready().then(() => {
//   // Load bundled model
//   tf.loadLayersModel(bundleResourceIO(require('./assets/model/model.json'), [require('./assets/model/model.weights.bin')]))
//     .then(model => global.model = model);
// });

// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const handleImage = async (response) => {
//   if (response.didCancel) {
//     console.log('User cancelled image picker');
//   } else if (response.errorCode) {
//     console.log('ImagePicker Error: ', response.errorMessage);
//   } else {
//     const source = { uri: response.assets[0].uri };
//     classifyImage(source.uri);
//   }
// };

// export const captureImage = () => {
//   launchCamera({ mediaType: 'photo', quality: 1 }, handleImage);
// };

// export const selectImage = () => {
//   launchImageLibrary({ mediaType: 'photo', quality: 1 }, handleImage);
// };


// const UploadAndCapture = ({ navigation }) => {

  // const [hasPermission, setHasPermission] = useState(null);
  // const [model, setModel] = useState(null);
  // const [labels, setLabels] = useState([]);
  // const cameraRef = useRef(null);

 

  // useEffect(() => {
  //   (async () => {
  //     const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
  //     const { status: imagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setHasPermission(cameraStatus === 'granted' || imagePickerStatus === 'granted');

  //     await tf.ready();
  //     const modelUrl = 'https://teachablemachine.withgoogle.com/models/Dxh-9KRRF/model.json';
  //     const metadataUrl = 'https://teachablemachine.withgoogle.com/models/Dxh-9KRRF/metadata.json';
  //     const loadedModel = await tf.loadLayersModel(modelUrl);
  //     const metadataResponse = await fetch(metadataUrl);
  //     const metadata = await metadataResponse.json();
      
  //     setModel(loadedModel);
  //     setLabels(metadata.labels);
  //   })();
  // }, []);
  // useEffect(() => {
  //   async function loadModel(){
  //     console.log("[+] Application started")
  //     //Wait for tensorflow module to be ready
  //     const tfReady = await tf.ready();
  //     console.log("[+] Loading custom mask detection model")
  //     //Replce model.json and group1-shard.bin with your own custom model
  //     const modelJson = await require("./assets/model/model.json");
  //     const modelWeight = await require("./assets/model/model.weights.bin");
  //     const heritageClassifier = await tf.loadLayersModel(bundleResourceIO(modelJson,modelWeight));
  //     console.log("[+] Loading pre-trained face detection model")
  //     //Blazeface is a face detection model provided by Google
  //     const imageClassifier =  await blazeface.load();
  //     //Assign model to variable
  //     setheritageClassifier(heritageClassifier)
  //     setimageClassifier(imageClassifier)
  //     console.log("[+] Model Loaded")
  //   }
  //   loadModel()
  // }, []); 


  // const classifyImage = async (imageUri) => {
  //   const response = await fetch(imageUri);
  //   const blob = await response.blob();
  
  //   // Create an ImageBitmap from the Blob
  //   const imgBitmap = await createImageBitmap(blob);
  
  //   // Use tf.browser.fromPixels which now can accept ImageBitmap
  //   const img = tf.browser.fromPixels(imgBitmap);
  //   const resized = tf.image.resizeBilinear(img, [224, 224]).toFloat();
  //   const offset = tf.scalar(127.5);
  //   const normalized = resized.sub(offset).div(offset);
  //   const batched = normalized.expandDims(0);
  
  //   const prediction = await model.predict(batched);
  //   const predictedIndex = prediction.argMax(1).dataSync()[0];
  
  //   if (predictedIndex !== undefined && predictedIndex < labels.length) {
  //     Alert.alert('Recognition Complete', `Picture recognized as: ${labels[predictedIndex]}`);
  //   } else {
  //     Alert.alert('Recognition Failed', 'The picture has not been recognized.');
  //   }
  // };
  

  // const handleImage = async (uri) => {
  //   if (model && labels.length > 0) {
  //     classifyImage(uri);
  //   } else {
  //     Alert.alert('Model not loaded', 'Please wait for the model and labels to load before selecting an image.');
  //   }
  // };

  // const takePicture = async () => {
  //   if (cameraRef.current) {
  //     const photo = await cameraRef.current.takePictureAsync();
  //     handleImage(photo.uri);
  //   }
  // };

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     handleImage(result.uri);
  //   }
  // };

  // if (!hasPermission) {
  //   return <Text>No access to camera or gallery</Text>;
  // }



//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={cameraRef}>
//         <View style={styles.cameraControls}>
//           <TouchableOpacity onPress={takePicture} style={styles.cameraIcon}>
//             <FontAwesome5 name="camera-retro" size={35} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
//             <FontAwesome5 name="image" size={35} color="white" />
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAF6D0',
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   cameraControls: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     padding: 20,
//   },
//   cameraIcon: {
//     padding: 10,
//     backgroundColor: '#8F181C',
//     borderRadius: 50,
//   }
// });

// export default UploadAndCapture;



//____________________________________________________________________________

/**
 * 
 * import
 * 
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

npm install react-native-image-picker


 ____________________________________________________________________
    const [imagePicker,setImagePicker] = useState("")
     *** the permition code ***
     import { launchImageLibrary } from 'react-native-image-picker';

// Function to request permission and open gallery
const openGallery = () => {
  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = { uri: response.assets[0].uri };
      setImagePicker(source.uri); // Update the state with the selected image URI
    }
  });
};

_________________________________________________________________________________________
1- image picker 

import { launchImageLibrary } from 'react-native-image-picker';

const selectImage = () => {
  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    includeBase64: true,
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = { uri: response.assets[0].uri };
      // Optional: You can also handle the base64 string
      const base64 = response.assets[0].base64;
      // Process the image or store the uri/base64
    }
  });
};

___________________________________________
2- pre-processing:
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';

const base64ImageToTensor = (base64) => {
  const rawImageData = tf.util.encodeString(base64, 'base64');
  const tensor = decodeJpeg(rawImageData);
  return tensor;
};

const resizeAndNormalizeImage = (imageTensor) => {
  const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]); // Resize to the expected input size
  const normalizedImage = resizedImage.div(255.0); // Normalize to [0, 1]
  return normalizedImage.expandDims(0); // Add batch dimension
};
_______________________________________________________
3- the model
const makePrediction = async (processedImage) => {
  const model = await loadModel(); // Assuming you have a function to load your model
  const prediction = await model.predict(processedImage);
  return prediction;
};


_____________________ call it _________________

import React, { useState } from 'react';
import { Button, View } from 'react-native';

export default function App() {
  const [imagePicker, setImagePicker] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick an Image" onPress={openGallery} />
    </View>
  );
}


    const [isEnabled,setIsEnabled] = useState(true) // for the button search in the model 

    const [heritage,setHeritage]=useState([]) //An array to store detected heritage data.

    const [HeritageDetector,setHeritageDetector]=useState("") //not nessary 

    const [heritageClassifier, setHeritageClassifier] = useState(null); // To hold loaded TensorFlow model
    for detecting image and provide the lable.

____________________________________________________________________________________________________
    useEffect(() => {
      async function loadModel(){
        console.log("[+] Application started")
        //Wait for tensorflow module to be ready
        const tfReady = await tf.ready();
        console.log("[+] Loading custom detection model")
        //Replce model.json and group1-shard.bin with your own custom model
        const modelJson = await require("./assets/model/model.json");
        const modelWeight = await require("./assets/model/group1-shard.bin");
        const heritageClassifier = await tf.loadLayersModel(bundleResourceIO(modelJson,modelWeight));
_____________________________________________________________________________________________________

        imageToTensor:
Converts JPEG image data to a TensorFlow tensor, discarding the alpha channel 
(used for image transparency) because the models expect only three channels (red, green, blue).

     function imageToTensor(rawImageData){
      //Function to convert jpeg image to tensors
      const TO_UINT8ARRAY = true;
      const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
      // Drop the alpha channel info for mobilenet
      const buffer = new Uint8Array(width * height * 3);
      let offset = 0; // offset into original data
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];
        offset += 4;
      }
      return tf.tensor3d(buffer, [height, width, 3]);
    }
 * 
 * 
 * 
 * 
 * 
 * 
 */