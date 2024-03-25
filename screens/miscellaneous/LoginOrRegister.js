import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { CommonActions } from '@react-navigation/native'; // Import CommonActions
import { LoginContext } from '../../components/FirstTimeLoadContext';
export default function LoginOrRegister({ navigation }) {
  const { setIsUserLoggedIn } = useContext(LoginContext);

  const handleLogin = () => {
    // Perform login logic here
    // Once login is successful, set isUserLoggedIn to true
    setIsUserLoggedIn(true);

    // Navigate to the home screen
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    // Perform registration logic here
    // Once registration is successful, set isUserLoggedIn to true
    setIsUserLoggedIn(true);

    // Navigate to the home screen
    navigation.navigate('Register');
  };

  const handleAnonLogin = () => {
    setIsUserLoggedIn(true);
    navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'DrawerStack' }],
        })
      );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login or Register Screen</Text>
      <Pressable onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={handleRegister}>
        <Text>Register</Text>
      </Pressable>
      <Pressable onPress={handleAnonLogin}>
        <Text>Continue without login</Text>
      </Pressable>
    </View>
  );
}
