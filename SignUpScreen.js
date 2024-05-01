
// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text,ActivityIndicator, StyleSheet, TouchableOpacity, Image, TextInput, Button, ScrollView } from 'react-native';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const auth = FIREBASE_AUTH;

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

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError('الرجاء التأكد من تطابق كلمتي المرور');
      return; // Exit early if passwords don't match
    }

    // Early return if there are any errors
    if (firstNameError || lastNameError || birthdayError || emailError || phoneNumberError || passwordError || confirmPasswordError) {
      return;
    }

    setLoading(true); 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
    
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        firstName,
        lastName,
        birthday,
        phoneNumber,
        email,
      });
    
      navigation.navigate('UsageGuide');
    } catch (error) {
      // Check if the error is an email already in use error
      if (error.code === 'auth/email-already-in-use') {
        setError('This email address is already in use. Please try another.');
      } else {
        setError(error.message); // Set any other error messages
      }
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Content area */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>إنشاء حساب</Text>

        {/* Form fields */}
        <TextInput
          style={styles.input}
          placeholder="الإسم الأول"
          placeholderTextColor="#ccc"
          value={firstName}
          onChangeText={setFirstName}
        />
        {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="الاسم الأخير"
          placeholderTextColor="#ccc"
          value={lastName}
          onChangeText={setLastName}
        />
        {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="تاريخ الميلاد"
          placeholderTextColor="#ccc"
          value={birthday}
          onChangeText={setBirthday}
        />
        {birthdayError ? <Text style={styles.errorText}>{birthdayError}</Text> : null}

        <TextInput
  style={styles.input}
  placeholder="الايميل"
  placeholderTextColor="#ccc"
  value={email}
  onChangeText={(text) => setEmail(text)}
/>

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="رقم الجوال"
          placeholderTextColor="#ccc"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

        <TextInput
  style={styles.input}
  placeholder="الرقم السري"
  placeholderTextColor="#ccc"
  value={password}
  onChangeText={(text) => setPassword(text)}
  secureTextEntry
/>

        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TextInput
  style={styles.input}
  placeholder="تأكيد الرقم السري"
  placeholderTextColor="#ccc"
  value={confirmPassword}
  onChangeText={(text) => setConfirmPassword(text)}
  secureTextEntry
/>
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        {/* Submit button */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          {loading ? (
            <ActivityIndicator size="small" color="#FAF6D0" />
          ) : (
            <Text style={styles.buttonText}>إنشاء حساب</Text>
          )}
        </TouchableOpacity>

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
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
  },
});

export default SignUpScreen;
