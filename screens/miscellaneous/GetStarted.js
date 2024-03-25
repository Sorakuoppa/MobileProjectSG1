import React from "react";
import { View, Text, Pressable } from "react-native";
import { general } from "../../styles/general";
import { useNavigation } from '@react-navigation/native';
import { startedStyle } from "../../styles/miscellaneous/startedStyle";
export default function GetStarted() {
  const navigation = useNavigation();

  // Function to navigate to LoginOrRegister screen
  const goToLoginOrRegister = () => {
    navigation.navigate('LoginOrRegister');
  };

  return (
    <View style={general.scaffold}>
      <View style={startedStyle.container}>
        <Text>Get Started</Text>

        <Text>Here's going to be some text about getting started
          with the application and some other useless shit ya know
        </Text>
      </View>
      
      <Pressable onPress={goToLoginOrRegister}>
        <Text>Get Started</Text>
      </Pressable>
    </View>
  );
}
