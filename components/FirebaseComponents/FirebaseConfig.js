import { initializeApp } from '@firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, sendPasswordResetEmail, ActionCodeSettings } from '@firebase/auth'; // Import getAuth function
import { getFirestore } from '@firebase/firestore';
import { getStorage, ref } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3Qxgy3_c6uZ6U4ylIiZeS-KnXL1IRMm8",
  authDomain: "mobileserviceprojectteam2.firebaseapp.com",
  projectId: "mobileserviceprojectteam2",
  storageBucket: "gs://mobileserviceprojectteam2.appspot.com",
  messagingSenderId: "638686673712",
  appId: "1:638686673712:web:d3f4dbe5ed223a8db0e6f5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const passwordReset = (email) => {
  return sendPasswordResetEmail(auth, email); 
};


export { app, auth, db, passwordReset, storage, storageRef }; 