import { StyleSheet } from "react-native";

export const darkColors = {
  primary: "#ff8c4c",
  secondary: "#36363e",
};
export const lightColors = {
  primary: "#FF5C00",
  secondary: "#FFEBD8",
};
export const LightTheme = {
  dark: false,
  colors: {
    primary: lightColors.primary,
    background: lightColors.secondary,
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
    card: darkColors.secondary,
    text: "white",
    border: darkColors.primary,
    notification: darkColors.primary,
  },
};

export const general = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "white",
    fontFamily: "Gantari",
  },
  scaffold: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
