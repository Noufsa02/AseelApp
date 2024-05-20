import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // You may need to install @expo/vector-icons

// Import your screens
import ProfileScreen from './ProfileScreen';
import UploadAndCapture from './UploadAndCapture';
import Community from './Community';
import HomePage from './HomePage';
import mapPage from './MapPage';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#5D1B20'},
        tabBarActiveTintColor: 'white', // White color for active icons
        tabBarInactiveTintColor: '#FAF6D0', // Set inactive tint color
        tabBarLabel: () => null, // Removes text label
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = {
            Home: 'home-outline',
            Map: 'map-outline',
            UploadAndCapture: 'camera-outline',
            Community: 'people-outline',
            Profile: 'person-outline'
          }[route.name];
          return (
            <Ionicons
              name={iconName}
              size={focused ? 30 : 24} // Larger size when focused
              color={focused ? 'white' : color} // White color when focused
            />
          );
        }
      })}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Map" component={mapPage} options={{ headerShown: false }} />
      <Tab.Screen name="UploadAndCapture" component={UploadAndCapture} options={{ headerShown: false }} />
      <Tab.Screen name="Community" component={Community} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default NavigationBar;
