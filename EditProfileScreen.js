// EditProfileScreen.js
import React, { useState } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

const EditProfileScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState(route.params.username)
  const [email, setEmail] = useState('Ahmad@hotmail.com');
  const [password, setPassword] = useState('123admin');

  const handleSave = () => {
    navigation.navigate('Profile', { updatedUsername: username });
  };
  
  

  const handleDeleteAccount = () => {
    // Logic  here
    
  };
  

  return (
 
    <View style={styles.container}>
    <Image
        source={require('./assets/logo.png')} 
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
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
    width: 300, 
    height: 300, 
    resizeMode: 'contain',
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    width: '80%',
    paddingHorizontal: 10,
    color: 'black',
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
    width: '80%',
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteAccountButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    width: '80%',
  },
  deleteAccountButtonText: {
    color: 'white',
    textAlign: 'center',
  },

});

export default EditProfileScreen;