import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (email.trim() === '') {
      alert('Please enter your email address.');
      return;
    }
  
    try {
      setLoading(true);
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      setLoading(false);
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      setLoading(false);
      console.error('Password reset failed:', error);
      let errorMessage = 'Failed to send password reset email. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email address.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      alert(errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerText}>إعادة تعيين كلمة المرور</Text>
      <TextInput
        style={[styles.input, { borderColor: email ? '#8F181C' : '#CCCCCC' }]}
        placeholder="عنوان البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>تأكيد</Text>
        )}
      </TouchableOpacity>
      {/* Back Button */}
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDE0C8',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor:'#F6F6F6',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    width: '50%',
    backgroundColor: '#5D1B20',
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute', 
    top: 55, 
    left: 20, 
    zIndex: 10,
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
