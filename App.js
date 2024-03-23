import "react-native-gesture-handler";
import React, {useState} from "react";
import { StatusBar, useColorScheme } from "react-native";
import { DrawerStack } from "./components/ScreenStack";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { ThemeContext } from "./components/Context";
import { useFonts } from "expo-font";
import { darkColors, lightColors, DarkTheme, LightTheme } from "./styles/general";



export default function App() {
  const [theme, setTheme] = useState("dark");
  //Custom fonts can be added to this list
  const [fontsLoaded] = useFonts({
    Gantari: require("./assets/fonts/Gantari.ttf"),
  });

  //Detects the device's color scheme
  // const scheme = useColorScheme();


  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <StatusBar barStyle={theme === 'dark' ? "light-content" : "dark-content"} backgroundColor={theme === 'dark' ? darkColors.secondary : lightColors.secondary} />
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme}>
        {/* Go to ./components/ScreenStack to configure app navigation */}
        <ThemeContext.Provider value={{ theme, setTheme }}>
        <DrawerStack />
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}
