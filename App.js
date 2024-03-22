import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { DrawerStack } from "./components/ScreenStack";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { darkColors, lightColors, DarkTheme, LightTheme } from "./styles/general";


export default function App() {
  //Custom fonts can be added to this list
  const [fontsLoaded] = useFonts({
    Gantari: require("./assets/fonts/Gantari.ttf"),
  });

  //Detects the device's color scheme
  // const scheme = useColorScheme();

  // HARD CODED FOR TESTING, useColorScheme doesn't work on emulator
  const scheme = "dark";

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <StatusBar barStyle={scheme === 'dark' ? "light-content" : "dark-content"} backgroundColor={scheme === 'dark' ? darkColors.secondary : lightColors.secondary} />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        {/* Go to ./components/ScreenStack to configure app navigation */}
        <DrawerStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
