import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { CommonActions } from '@react-navigation/native'; // Import CommonActions
import { FirstTimeLoadContext } from '../../components/FirstTimeLoadContext';
export default function LoginOrRegister({ navigation }) {
    const { setFirstTimeLoaded } = useContext(FirstTimeLoadContext); // Updated context and variable

  const handleLogin = () => {
    // Tämä navigoi loginscreeniin
    navigation.navigate('Login');
  };

  const handleRegister = () => {
  // Tämä navigoi kirjautumiseen
  // Nämä kaikki napit vielä tyylittämättä
    
    navigation.navigate('Register');
  };

  const handleAnonLogin = () => {
    setFirstTimeLoaded(true);
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
