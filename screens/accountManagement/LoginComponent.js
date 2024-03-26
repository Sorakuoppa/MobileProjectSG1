import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../../components/FirebaseConfig'; // Import FirebaseConfig auth
import { loginAndRegisterStyles } from '../../styles/accountManagementStyles/loginAndRegisterComponent';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLoginContext } from '../../components/LoginContext';
import { FirstTimeLoadContext } from '../../components/FirstTimeLoadContext';
import { CommonActions } from '@react-navigation/native';

const LoginComponent = (navigation) => {
  const { setFirstTimeLoaded } = useContext(FirstTimeLoadContext); // Updated context and variable
  const { setUserEmail, setUsername } = useLoginContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const usersRef = collection(db, "users")
  const q = query(usersRef, where("email", '==', email))

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password); // Access auth directly from FirebaseConfig

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // Lisää LoginContextiin käyttäjän sähköpostin ja salasanan
        const userData = doc.data();
        const userEmail = userData.email;
        const username = userData.username;
        setUserEmail(userEmail);
        setUsername(username);

        console.log('User signed in successfully!');
        setFirstTimeLoaded(true);
        
    
         CommonActions.reset({
            index: 0,
            routes: [{ name: 'DrawerStack' }],
          })
        ;
      });
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
