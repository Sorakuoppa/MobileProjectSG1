import React from 'react';
import { Button, View } from 'react-native';
import { signOut } from '@firebase/auth'; // Import the signOut function from Firebase authentication
import { useLoginContext } from '../../components/LoginContext';
import { auth } from '../../components/FirebaseConfig';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTheme } from 'react-native-paper';

const SignOutButton = () => {
    const { loginState, setLoginState, setUserEmail, setUsername } = useLoginContext(); // Get the function to update login state from the context
    const { colors } = useTheme();
 
    const handleSignOut = async () => {
    try {
      await signOut(auth); // Call the signOut function to sign out the user
        setLoginState(false)
        setUserEmail('')
        setUsername('')
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  return (
    <View>
     {loginState && ( // Render the button only if the user is logged in
        <Icon
          name="sign-out-alt"
          size={24}
          color={focused ? colors.primary : colors.text}
          onPress={handleSignOut}
        />
      )}
    </View>
  );
};

export default SignOutButton;
