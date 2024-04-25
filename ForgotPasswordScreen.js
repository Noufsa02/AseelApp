import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Perform your password reset logic here
    if (!email) {
      Alert.alert('Error', 'الرجاء إدخال البريد الإلكتروني لإعادة تعيين كلمة المرور');
    } else {
      // Send a reset password email to the provided email address
      // Example: Call your API endpoint to initiate the password reset process
      // After successful submission, navigate to a confirmation page or display a success message
      Alert.alert('Success', 'تم إرسال رسالة إعادة تعيين كلمة المرور إلى البريد الإلكتروني المقدم');
      // Navigate to the confirmation page
      // navigation.navigate('ResetPasswordConfirmation');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>نسيت كلمة المرور</Text>
      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>إعادة تعيين كلمة المرور</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#8F181C',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
