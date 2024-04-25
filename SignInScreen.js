import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';



const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH ;


  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };


  const handleSignInPress = async () => {
    setLoading(true);
    // Reset previous error messages
    setEmailError('');
    setPasswordError('');

    // Validate fields
    if (!email) {
      setEmailError('الرجاء كتابة البريد الإلكتروني');
      return;
    }
    if (!password) {
      setPasswordError('الرجاء كتابة كلمة المرور');
      return;
    }

    try {
      const respose = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('NavigationBar');
    } catch (error) {
      console.error('Sign in failed:', error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
    
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
        {/* Header text moved to top */}
        <Text style={styles.headerText}>تسجيل الدخول</Text>
         {/* Sign-in form */}

         <TouchableOpacity onPress={handleSignInPress}>
              <Text style={styles.button}>تسجيل الدخول </Text>
            </TouchableOpacity>

            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="البريد الإلكتروني"
                autoCapitalize='none'
                value={email}
                onChangeText={text => setEmail(text)}
            />

            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="كلمة المرور"
                autoCapitalize='none'
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />   
                 {/* { loading ? ActivityIndicator size='large'} */}
           {/* <TouchableOpacity
              title="تسجيل الدخول"
              onPress={handleSignInPress}
              style={styles.button}
            ><Text style={styles.buttonText}>تسجيل الدخول</Text>
            </TouchableOpacity>
  */}

<TouchableOpacity onPress={handleSignInPress}>
              <Text style={styles.button}>تسجيل الدخول </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={handleForgotPasswordPress}>
              <Text style={styles.signUpText}>هل نسيت كلمة المرور؟</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUpPress}>
              <Text style={styles.signUpText}>ليس لديك حساب؟ قم بالتسجيل الآن</Text>
            </TouchableOpacity>
            <View style={styles.bottomSpace}></View>

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
    marginTop: 20, // Adjust the margin to move the header text to the top
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
    paddingVertical: 10, // Add vertical padding
    paddingHorizontal: 15, // Add horizontal padding
    marginBottom: 20,
    borderRadius: 5,
    left: 2,
  },
  signUpText: {
    color: 'dodgerblue',
    marginTop: 40,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center', // Center the error message horizontally
  },
  bottomSpace: {
    marginBottom: 40, // Add space at the bottom
  },
  button: {
    backgroundColor: '#649BA2', //fafcfc 649BA2
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 35,
    top:210,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FAF6D0',
  },
});

export default SignInScreen;

