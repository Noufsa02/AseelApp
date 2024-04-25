// WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/background_welcome.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>مرحبًا بك في أصيل ..</Text>
        <Text style={styles.Slang}>استعراض أصالة المملكة العربية السعودية بلمسة واحدة</Text>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>تسجيل الدخول</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>إنشاء حساب</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
    position: "absolute",
    bottom:90,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    position: "absolute",
    bottom:150,
    left: 2,
    color: '#649BA2',
  },
  Slang:{
    fontSize: 15,
    fontWeight: 'bold',
    position: "absolute",
    bottom:130,
    color: '#649BA2',

  },
  button1: {
    backgroundColor: '#8F181C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    position: "absolute",
    top:230,
  },
  button2: {
    backgroundColor: '#8F181C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    position: "absolute",
    top:300,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FAF6D0',
  },
});

export default WelcomeScreen;
