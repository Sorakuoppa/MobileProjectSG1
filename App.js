import React, { useState, useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { DrawerStack, MainNavigator } from "./components/ScreenStack";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { ThemeContext } from "./components/Contexts/ThemeContext";
import * as Font from "expo-font";
import {
  darkColors,
  lightColors,
  DarkTheme,
  LightTheme,
} from "./styles/general";
import { FirstTimeLoadProvider } from "./components/Contexts/FirstTimeLoadContext";
import { LoginProvider } from "./components/Contexts/LoginContext";
import { PermissionProvider } from "./components/AccountComponents/Permissions";
import { LoadingProvider } from "./components/Contexts/ProfilePictureLoadingContext";

export default function App() {

  const [theme, setTheme] = useState("dark");

  //Custom fonts can be added to this list
 const [fontLoaded, setFontLoaded] = useState(false);

useEffect(() => {
  async function loadFont() {
    await Font.loadAsync({
      Gantari: require("./assets/fonts/Gantari.ttf"),
    });

    setFontLoaded(true);
  }

  loadFont();
}, []);


  if (!fontLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <PermissionProvider>
        {/* Theme colors are handled here */}
        <NavigationContainer theme={theme === "dark" ? DarkTheme : LightTheme}>
          <StatusBar
            barStyle={theme === "dark" ? "light-content" : "dark-content"}
            backgroundColor={
              theme === 'started' ? '#FF2E00' :
              theme === "dark" ? darkColors.secondary : lightColors.secondary
            }
          />
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <FirstTimeLoadProvider>
              <LoadingProvider>
                <LoginProvider>
                  <MainNavigator />
                </LoginProvider>
              </LoadingProvider>
            </FirstTimeLoadProvider>
          </ThemeContext.Provider>
        </NavigationContainer>
      </PermissionProvider>
    </PaperProvider>
  );
}
