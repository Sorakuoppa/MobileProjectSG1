import { initializeApp } from '@firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from '@firebase/auth'; // Import getAuth function
import { getFirestore } from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3Qxgy3_c6uZ6U4ylIiZeS-KnXL1IRMm8",
  authDomain: "mobileserviceprojectteam2.firebaseapp.com",
  projectId: "mobileserviceprojectteam2",
  storageBucket: "mobileserviceprojectteam2.appspot.com",
  messagingSenderId: "638686673712",
  appId: "1:638686673712:web:d3f4dbe5ed223a8db0e6f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})

const db = getFirestore(app);



export { app, auth, db }; // Export both app and auth