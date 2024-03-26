import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth'; // Import createUserWithEmailAndPassword function
import { auth } from '../../components/FirebaseConfig'; // Import FirebaseConfig auth
import { useNavigation } from '@react-navigation/native';
import { loginAndRegisterStyles } from '../../styles/accountManagementStyles/loginAndRegisterComponent';

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigation = useNavigation();

 

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000); // Navigate to login screen after 2 seconds
    } catch (error) {
      alert(error.message);
      console.error('Authentication error:', error.message);
    }
  };
  return (
    <View style={loginAndRegisterStyles.authContainer}>
      <Text style={loginAndRegisterStyles.title}>Sign Up</Text>
      <TextInput
        style={loginAndRegisterStyles.input}
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
        <Button title="Sign Up" onPress={handleRegister} color="#3498db" />
      </View>
      {showSuccessMessage && (
        <Text style={loginAndRegisterStyles.successMessage}>
          Registration successful! 
        </Text>
      )}
     </View>
  );
};


export default RegisterComponent;
