import { initializeApp } from '@firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, sendPasswordResetEmail, ActionCodeSettings } from '@firebase/auth'; // Import getAuth function
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
const actionCodeSettings = {
  // Customize email template
  emailTemplate: {
body: `You can customize the body of the email here. Use {{link}} to include the password reset link.`,
  },
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})
const db = getFirestore(app);
const passwordReset = (email) => {
  return sendPasswordResetEmail(auth, email, actionCodeSettings); 
};


export { app, auth, db, passwordReset }; 