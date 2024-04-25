// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button, ScrollView } from 'react-native';
import { FIREBASE_APP,FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';


const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const auth = FIREBASE_AUTH ;



  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };


  const handleSignUpPress = async () => {
  
    // Reset previous error messages
    setFirstNameError('');
    setLastNameError('');
    setBirthdayError('');
    setEmailError('');
    setPhoneNumberError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate each field
    if (!firstName) {
      setFirstNameError("عليك ملأ هذا الحقل");
    }
    if (!lastName) {
      setLastNameError('عليك ملأ هذا الحقل');
    }
    if (!birthday) {
      setBirthdayError('عليك ملأ هذا الحقل');
    }
    if (!email) {
      setEmailError('الرجاء إدخال إيميلك الشخصي');
    }
    if (!phoneNumber) {
      setPhoneNumberError('الرجاء إدخال رقم هاتفك');
    }
    if (!password) {
      setPasswordError('الرجاء تعيين كلمة سر');
    }
    if (!confirmPassword) {
      setConfirmPasswordError('الرجاء إعادة كتابة الرقم السري');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const doc = await addDoc(collection(FIREBASE_DB, 'users'), {
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    });

   navigation.navigate('UsageGuide');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      {/* Content area */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>إنشاء حساب</Text>
         {/* Sign-up form */}
         <TextInput
          style={styles.input}
          placeholder="الإسم الأول"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="الاسم الأخير"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="تاريخ الميلاد"
          value={birthday}
          onChangeText={text => setBirthday(text)}
        />
        {birthdayError ? <Text style={styles.errorText}>{birthdayError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="الايميل"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="رقم الجوال"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="الرقم السري"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="تأكيد الرقم السري"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        <Button
          title="إنشاء حساب"
          onPress={handleSignUpPress}
          style={styles.button}
        />
        <TouchableOpacity onPress={handleSignInPress}>
          <Text style={styles.signInText}>هل لديك حساب بالفعل؟ قم بتسجيل الدخول</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF6D0',

  },
  logo: {
    width: 300,
    height: 300,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#649BA2',
    marginTop: 10,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#8F181C',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  input: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    left: 2,
  },
  signInText: {
    color: 'dodgerblue',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#649BA2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default SignUpScreen;
