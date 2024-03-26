import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth'; // Import createUserWithEmailAndPassword function
import { auth, db } from '../../components/FirebaseConfig'; // Import FirebaseConfig auth
import { useNavigation } from '@react-navigation/native';
import { loginAndRegisterStyles } from '../../styles/accountManagementStyles/loginAndRegisterComponent';
import { setDoc, doc } from '@firebase/firestore';


const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigation = useNavigation();

  const pushDataToBase = async (email, username) => {
    try {
    await setDoc(doc(db,"users", username), {
    email: email,
    username: username,}) 
  console.log("Data pushed to database successfully");
}
  catch (e) {
    console.log("Pushing to database failed", e.message)
  }
} 
 
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      pushDataToBase(email,username)
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
       <TextInput
        style={loginAndRegisterStyles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
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
