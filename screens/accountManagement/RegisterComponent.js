import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth'; // Import createUserWithEmailAndPassword function
import { auth, db } from '../../components/FirebaseConfig'; // Import FirebaseConfig auth
import { useNavigation } from '@react-navigation/native';
import { loginAndRegisterStyles } from '../../styles/accountManagementStyles/loginAndRegisterComponent';
import { setDoc, doc } from '@firebase/firestore';


const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');
  const [username, setUsername] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigation = useNavigation();

  const pushDataToBase = async (email, username) => {
    try {
      await setDoc(doc(db,"users", auth.currentUser.uid), {
        email: email,
        username: username,
      });
      console.log("Data pushed to database successfully");
    } catch (e) {
      console.log("Pushing to database failed", e.message);
    }
  }; 
 
  const handleRegister = async () => {
    if (password !== passwordRetype) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      pushDataToBase(email, username);
      setShowSuccessMessage(true); 
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000); 
    } catch (error) {
      alert(error.message);
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={loginAndRegisterStyles.container}>
      <Text style={loginAndRegisterStyles.title}>Sign Up</Text>
      <View style={loginAndRegisterStyles.formFieldContainer}>
        <Text style={loginAndRegisterStyles.formFieldTitle}>Email</Text>
        <TextInput
          style={loginAndRegisterStyles.formFieldInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
      </View>
      <View style={loginAndRegisterStyles.formFieldContainer}>
        <Text style={loginAndRegisterStyles.formFieldTitle}>Username</Text>
        <TextInput
          style={loginAndRegisterStyles.formFieldInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
        />
      </View>
      <View style={loginAndRegisterStyles.formFieldContainer}>
        <Text style={loginAndRegisterStyles.formFieldTitle}>Password</Text>
        <TextInput
          style={loginAndRegisterStyles.formFieldInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={loginAndRegisterStyles.formFieldContainer}>
        <Text style={loginAndRegisterStyles.formFieldTitle}>Confirm password</Text>
        <TextInput
          style={loginAndRegisterStyles.formFieldInput}
          value={passwordRetype}
          onChangeText={setPasswordRetype}
          placeholder="Confirm password"
          secureTextEntry
        />
      </View>
      <View style={loginAndRegisterStyles.buttonContainer}>
        <Pressable style={loginAndRegisterStyles.button} onPress={handleRegister}>
          <Text style={loginAndRegisterStyles.buttonText}>Sign up</Text>
        </Pressable>
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
