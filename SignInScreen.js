import  React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,TextInput,ScrollView,ActivityIndicator,} from 'react-native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignInPress = async () => {
    setLoading(true);
    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      setEmailError(!email ? 'الرجاء كتابة البريد الإلكتروني' : '');
      setPasswordError(!password ? 'الرجاء كتابة كلمة المرور' : '');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      navigation.navigate('NavigationBar');
    } catch (error) {
      console.error('Sign in failed:', error);
      alert('Sign in failed: ' + error.message);
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
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>تسجيل الدخول</Text>
        
        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#6a676e"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor="#6a676e"
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity onPress={handleSignInPress} style={styles.button}>
          {loading ? (
            <ActivityIndicator size="large" color="#FAF6D0" />
          ) : (
            <Text style={styles.buttonText}>تسجيل الدخول</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPasswordPress} style={styles.linkButton}>
          <Text style={styles.signUpText}>هل نسيت كلمة المرور؟</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUpPress} style={styles.linkButton}>
          <Text style={styles.signUpText}>ليس لديك حساب؟ قم بالتسجيل الآن</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0C8',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300, // Adjust the size as required
    height: 300, // Adjust the size as required
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#9DBABB',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 0,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
    textAlign: 'right', // This aligns the text to the right
  },
  
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5D1B20',
    paddingVertical: 7, // Reduced padding to make the button thinner
    paddingHorizontal: 20, // You can adjust horizontal padding if you want to change the width as well
    borderRadius: 40,
    width: '50%', // Keep the width as is if you don't want to change it
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Adjust the space around the button if needed
  },
  
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CCC',
  },
  linkButton: {
    marginVertical: 15,
  },
  signUpText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
