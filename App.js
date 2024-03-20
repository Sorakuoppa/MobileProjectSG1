import React from "react";
import Home from "./screens/Home";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Gantari: require("./assets/fonts/Gantari.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <PaperProvider>
        <Home />
      </PaperProvider>
    </NavigationContainer>
  );
}
