import { EmailAuthProvider, reauthenticateWithCredential, signInWithCredential } from "firebase/auth";
import { auth } from "./FirebaseConfig";

export const reauthenticateUser = async (password) => {
  try {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email, 
      password
    );
    await reauthenticateWithCredential(user, credential);
    console.log('Reauthenticated successfully');
    return true; 
  } catch (error) {
    console.error('Error during reauthentication:', error);
    return false; 
  }
};


export const isValidEmail = (email) => {
    // Placeholder validation for email
    return /\S+@\S+\.\S+/.test(email);
  };
  
export  const isValidPassword = (password) => {
    // Placeholder validation for password
    return password.length >= 6;
  };
  
export  const isValidUsername = (username) => {
    // Placeholder validation for username
    return username.length > 0;
  };
  

