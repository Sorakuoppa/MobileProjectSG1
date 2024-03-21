import "react-native-gesture-handler";
import React from "react";
import {DrawerStack}from "./components/ScreenStack";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function App() {
  //Custom fonts can be added to this list
  const [fontsLoaded] = useFonts({
    Gantari: require("./assets/fonts/Gantari.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        {/* Go to ./components/ScreenStack to configure app navigation */}
        <DrawerStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
