import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // You may need to install @expo/vector-icons

// Import your screens
import ProfileScreen from './ProfileScreen';
import MapScreen from './MapScreen';
import UploadAndCapture from './UploadAndCapture';
import Community from './Community';
import HomePage from './HomePage';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      style: { backgroundColor: '#8F181C' }, // Set background color to #8F181C
        activeTintColor: '#84B7B9', // Set active tint color
        inactiveTintColor: '#9DBABB', // Set inactive tint color
      }}
    >      
    <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />      
          
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UploadAndCapture"
        component={UploadAndCapture}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" size={size} color={color} />
          ),
        }}
      />      
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />


    </Tab.Navigator>
  );
};

export default NavigationBar;
