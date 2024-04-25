import { FIREBASE_APP,FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { FontAwesome5 } from '@expo/vector-icons';



const ProfileScreen = ({ navigation }) => {
  const isActive = true;
  const [username, setUsername] = useState('أمل');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        Alert.alert('Permission Error', 'Camera access is needed to take pictures.');
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePicker} style={styles.imageSection}>
        <Image
          source={avatar ? { uri: avatar } : require('./assets/pro.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.usernameText}>{username}</Text>
      </TouchableOpacity>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfileScreen', {
            /* username,
            setUsername, */
            /* avatarUri: avatar,
            setAvatar */
          })}>
          <Text style={styles.menuText}>تعديل الملف الشخصي</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>إعجاباتي</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>منشوراتي</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AboutUsScreen')}
        >
          <Text style={styles.menuText}>من نحن</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <FontAwesome5 name="user" size={isActive ? 26 : 24} color={isActive ? "#ffffff" : "#F9E4D4"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="map" size={24} color="#F9E4D4" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UploadAndCapture')}>
          <FontAwesome5 name="camera" size={24} color="#F9E4D4" />
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6D0',
  },
  imageSection: {
    alignItems: 'center',
    marginTop: 80,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  usernameText: {
    color: 'black',
    fontSize: 30,
    marginBottom: 50,
    
  },
  menu: {
    padding: 20,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderBottomColor: '#8F181C',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%', 
  },
  menuText: {
    color: '#8F181C',
    fontSize: 18,
    textAlign: 'center', 
    paddingTop:15,
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

export default ProfileScreen;