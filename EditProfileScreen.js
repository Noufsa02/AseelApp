// EditProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';



const cleanName = (firstName) => {
  // This will remove any quotation marks from the start and end of the string
  return firstName.replace(/^"(.+)"$/, '$1');
};



const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123admin');


  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;

    if (currentUser) {
      const userRef = doc(FIREBASE_DB, 'users', currentUser.uid);

      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setUsername(cleanName(userData.firstName)); // Set the username state to the name from Firestore
        } else {
          console.log('No user data available');
          setUsername('No name available'); // Set username to 'No name available' if not found
        }
      });
      return () => unsubscribe();
    } else {
      console.log('No user is logged in');
      setUsername('User not logged in'); // Set username to 'User not logged in' if no user is logged in
    }
  }, []);


  const handleSave = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    // Save logic here
    navigation.goBack();
  };

  const handleDeleteAccount = () => {
    // Delete account logic here
    Alert.alert('Confirm', 'Are you sure you want to delete your account?', [
      { text: 'Yes', onPress: () => navigation.goBack() },
      { text: 'No' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={20} color="#6b6b6b" />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#6b6b6b" />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={20} color="#6b6b6b" />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    width: '90%',
  },
  input: {
    marginLeft: 10,
    flex: 1,
    height: 40,
    color: 'black',
  },
  saveButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    width: '90%',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default EditProfileScreen;
