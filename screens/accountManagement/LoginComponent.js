import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../../components/FirebaseConfig'; // Import FirebaseConfig auth
import { loginAndRegisterStyles } from '../../styles/accountManagementStyles/loginAndRegisterComponent';
import { useTheme } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLoginContext } from '../../components/LoginContext';
import { FirstTimeLoadContext } from '../../components/FirstTimeLoadContext';
import { CommonActions, useNavigation } from '@react-navigation/native';
const LoginComponent = () => {
  const { setFirstTimeLoaded } = useContext(FirstTimeLoadContext); // Updated context and variable
  const { setUserEmail, setUsername, setLoginState } = useLoginContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const usersRef = collection(db, "users")
  const q = query(usersRef, where("email", '==', email))
  const { colors } = useTheme();

  const navigateForgotPage = () => {
    navigation.navigate("ForgotPassword")
  }

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
        setLoginState(true);
  
        console.log('User signed in successfully!');
        setEmail('')
        setPassword('')
        setFirstTimeLoaded(true);
  
        
      });
      const redirected = navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
      if (!redirected) {
    CommonActions.reset({
        index: 0,
        routes: [{ name: 'DrawerStack' }],
    });
}

    } catch (error) {
      alert(error.message);
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={loginAndRegisterStyles.container}>
      <Text style={{...loginAndRegisterStyles.title, color: colors.text}}>Sign In</Text>
      <View style={loginAndRegisterStyles.formFieldContainer}>
        <Text style={{...loginAndRegisterStyles.formFieldTitle, color: colors.primary}}>Email</Text>
        <TextInput
          style={loginAndRegisterStyles.formFieldInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
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
      <View>
        <Pressable >
          <Text style={loginAndRegisterStyles.anonText} onPress={navigateForgotPage}>Forgot password?</Text>
        </Pressable>
      </View>
      <View>
        <Pressable  style={loginAndRegisterStyles.button} onPress={handleLogin}>
          <Text style={loginAndRegisterStyles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
  
  }
export default LoginComponent;
