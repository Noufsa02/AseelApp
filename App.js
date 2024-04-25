import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

// Import screens
import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import SignInScreen from './SignInScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SignUpScreen from './SignUpScreen';
import UsageGuideScreen from './UsageGuideScreen';
import NavigationBar from './NavigationBar'; // npm install @react-navigation/bottom-tabs
import AboutUsScreen from './AboutUsScreen';
import EditProfileScreen from './EditProfileScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"
       screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal', // Enable horizontal swipe gestures
      }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UsageGuide" component={UsageGuideScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }}/>
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
