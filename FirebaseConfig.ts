
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
import {getFirestore} from "firebase/firestore";

// app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx5dPUEyLkezVYEinfYDwzsUe_vxLTJpA",
  authDomain: "aseel-demo.firebaseapp.com",
  projectId: "aseel-demo",
  storageBucket: "aseel-demo.appspot.com",
  messagingSenderId: "136825881752",
  appId: "1:136825881752:web:6f0b390f77768a2d60bced",
  measurementId: "G-SFKQ2C6DW2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
