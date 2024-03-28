import { StyleSheet } from "react-native";

export const darkColors = {
  primary: "#ff8c4c",
  secondary: "#36363e",
};
export const lightColors = {
  primary: "#FF5C00",
  secondary: "#ffffff",
};
export const LightTheme = {
  dark: false,
  colors: {
    primary: lightColors.primary,
    background: lightColors.secondary,
    accent: '#FFF7F0',
    card: lightColors.secondary,
    text: "black",
    border: lightColors.primary,
    notification: lightColors.primary,
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: darkColors.primary,
    background: darkColors.secondary,
    accent: '#4c4c4c',
    card: darkColors.secondary,
    text: "white",
    border: darkColors.primary,
    notification: darkColors.primary,
  },
};

export const general = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "Gantari",
    marginBottom: 20,
  },
  scaffold: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
});
