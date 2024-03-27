import React, { useContext } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import {Button } from 'react-native-paper';
import { CommonActions, useTheme } from '@react-navigation/native'; // Import CommonActions
import { FirstTimeLoadContext } from '../../components/FirstTimeLoadContext';
import { logOrReg } from '../../styles/miscellaneous/loginOrRegisterStyle';
import { general } from '../../styles/general';
import  onTrackLogo  from "../../assets/onTrackLogo.png";

// Tän funktion ja siihen liittyvän tyylitiedoston vois tulevaisuudessa nimetä uuellee ja organisoida ettei
// mee login ja register componenttien kans sekasin
// t. samppa

export default function LoginOrRegister({ navigation }) {
    const { setFirstTimeLoaded } = useContext(FirstTimeLoadContext); // Updated context and variable
    const { colors } = useTheme();

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
        
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'DrawerStack' }],
        })
      ;
  }

  return (
    <View style={general.scaffold}>
      <Image source={onTrackLogo} style={logOrReg.logo}/>
      <Text style={logOrReg.headerText}>Welcome!</Text>
    <View style={logOrReg.buttonContainer}>
      <Pressable style={logOrReg.button} onPress={handleLogin}>
        <Text style={logOrReg.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={logOrReg.button} onPress={handleRegister}>
        <Text style={logOrReg.buttonText} >Register</Text>
      </Pressable>
      <View style={logOrReg.anonContainer}>
      {/* <Pressable style={logOrReg.anonButton}  onPress={handleAnonLogin}>
        <Text style={logOrReg.anonText}>Continue without login</Text>
      </Pressable> */}
      <Button 
        children= "Continue without login"
        onPress={handleAnonLogin}
        style={logOrReg.anonButton}
        mode="contained"
        buttonColor={colors.primary}
      />
      </View>
    </View>
    </View>
  );
}
