import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const cleanName = (firstName) => {
  // This will remove any quotation marks from the start and end of the string
  return firstName.replace(/^"(.+)"$/, '$1');
};

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('Loading...'); // Initial state set to 'Loading...'
  const [avatar, setAvatar] = useState(null);
  const [gender, setGender] = useState('');

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        Alert.alert('Permission Error', 'Camera access is needed to take pictures.');
      }
    })();
  }, []);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;

    if (currentUser) {
      const userRef = doc(FIREBASE_DB, 'users', currentUser.uid);

      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
          const userData = doc.data();
          setUsername(cleanName(userData.firstName));
          setGender(userData.gender);

        } else {
          console.log('No user data available');
          setUsername('No name available');
        }
      }, (error) => {
        console.error("Error fetching document:", error);
      });

      return () => unsubscribe();
    } else {
      console.log('No user is logged in');
      setUsername('User not logged in'); // Set username to 'User not logged in' if no user is logged in
    }
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

  const renderDefaultAvatar = () => {
    if (gender === 'male') {
      return <Fontisto name="male" size={100} color="#000" />;
    } else if (gender === 'female') {
      return <Fontisto name="female" size={100} color="#000" />;
    } else {
      return <Fontisto name="person" size={100} color="#000" />;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePicker} style={styles.imageSection}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          renderDefaultAvatar()
        )}
        <Text style={styles.usernameText}>{username}</Text>
      </TouchableOpacity>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}>
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
          onPress={() => navigation.navigate('AboutUs')}
        >
          <Text style={styles.menuText}>من نحن</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}
          onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.menuText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0C8',
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


