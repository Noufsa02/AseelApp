// EditProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Importing necessary icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { reauthenticateWithCredential, EmailAuthProvider, updateEmail } from 'firebase/auth';

const cleanName = (firstName) => {
  // This will remove any quotation marks from the start and end of the string
  return firstName.replace(/^"(.+)"$/, '$1');
};

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;

    if (currentUser) {
      const userRef = doc(FIREBASE_DB, 'users', currentUser.uid);

      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setUsername(cleanName(userData.firstName)); // Set the username state to the name from Firestore
          setEmail(userData.email); // Set the email state to the email from Firestore
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

  const handleSave = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (currentUser) {
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        await reauthenticateWithCredential(currentUser, credential);

        if (currentUser.email !== email) {
          await updateEmail(currentUser, email);
        }

        const userRef = doc(FIREBASE_DB, 'users', currentUser.uid);
        await updateDoc(userRef, {
          firstName: username,
          email: email,
        });

        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'An error occurred while updating the profile');
    }
  };

  return (
    <LinearGradient colors={['#EDE0C8', '#fffafa']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>الغاء</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تعديل الملف الشخصي</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>حفظ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileImageContainer}>
        <FontAwesome name="user-circle" size={100} color="#424530" />
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={20} color="#6b6b6b" />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="الأسم الأول"
            placeholderTextColor="#6b6b6b"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#6b6b6b" />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="الإيميل"
            placeholderTextColor="#6b6b6b"
          />
        </View>
        <TouchableOpacity style={styles.inputContainer} onPress={() => navigation.navigate('ForgotPassword')}>
          <MaterialIcons name="lock-outline" size={20} color="#6b6b6b" />
          <Text style={styles.changePasswordText}>تغير كلمة المرور</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#000" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Image source={require('./assets/logo - Copy.png')} style={styles.logo} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  cancelText: {
    color: '#424530', // White for better visibility
    fontSize: 16,
    
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424530', // White for better visibility
  },
  saveText: {
    color: '#424530', // White for better visibility
    fontSize: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginBottom:30,
    marginTop:60,
  },
  form: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent white
    borderColor: '#A58E74', // Natural
    borderBottomWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 15,
    width: '100%',
  },
  input: {
    marginLeft: 10,
    flex: 1,
    height: 40,
    color: '#000', // Black
    fontSize: 16,
  },
  changePasswordText: {
    marginLeft: 10,
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'center',
  },
  footer: {
    alignItems: 'center',
    padding: 0,
    marginTop:30,
    //backgroundColor: '#424530', // Fern
  },
  logo: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
  },
});

export default EditProfileScreen;













