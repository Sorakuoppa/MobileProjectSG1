import React, {useContext, useEffect} from "react";
import { View, Text, Pressable, StatusBar, Image } from "react-native";
import { ThemeContext } from "../../components/Contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { general } from "../../styles/general";
import { useNavigation } from '@react-navigation/native';
import { startedStyle } from "../../styles/miscellaneous/startedStyle";

export default function GetStarted() {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  // This theme displays an orange statusbar to match the gradient background
  useEffect(() => {
    theme.setTheme("started");
  }, []);

  // Function to navigate to LoginOrRegister screen
  const goToLoginOrRegister = () => {
    theme.setTheme("dark");
    navigation.navigate('LoginOrRegister');
  };

  return (
    <LinearGradient
      colors={["#FF2E00", "#FFC700"]}
      style={startedStyle.container}
    >
      <Image
        source={require("../../assets/logos/StartupLogo.png")} 
        style={{ width: 250, height: 200, marginBottom: 20 }}
      />
      <View style={startedStyle.content}>
        <Text style={startedStyle.welcomeTitle}>
          Welcome to Our Tracking Application!
        </Text>
        <Text style={startedStyle.welcomeText}>
          Welcome aboard! Our tracking application empowers you to stay
          organized and productive by tracking anything, anytime. Whether it's
          your daily habits, fitness goals, work projects, or personal
          milestones, our intuitive interface and insightful charts help you
          visualize your progress and make informed decisions. Sync across
          devices and get started today to unlock your full potential!
        </Text>
        <View style={startedStyle.buttonContainer}>
          <Pressable
            onPress={goToLoginOrRegister}
            style={{ ...startedStyle.button }}
          >
            <Text style={startedStyle.buttonText}>Get Started</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
