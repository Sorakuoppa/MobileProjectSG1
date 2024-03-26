import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../components/FirebaseConfig'; // Import FirebaseConfig auth
import { loginAndRegisterStyles } from '../../styles/accountManagementStyles/loginAndRegisterComponent';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password); // Access auth directly from FirebaseConfig
      
      // TÄHÄN LISÄTÄÄN MITÄ TAPAHTUU KUN LOGIN ON SUCCESFULL

      
      console.log('User signed in successfully!');
    } catch (error) {
      alert(error.message);
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={loginAndRegisterStyles.authContainer}>
      <Text style={loginAndRegisterStyles.title}>Sign In</Text>
      <TextInput
        style={loginAndRegisterStyles
          .input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={loginAndRegisterStyles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={loginAndRegisterStyles.buttonContainer}>
        <Button title="Sign In" onPress={handleLogin} color="#3498db" />
      </View>
    </View>
  );
};



export default LoginComponent;
