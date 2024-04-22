import { StyleSheet } from "react-native";

export const darkColors = {
  primary: "#ff8c4c",
  secondary: "#36363e",
};
export const lightColors = {
  primary: "#FF5C00",
  secondary: "#fdf8f4",
};
export const LightTheme = {
  dark: false,
  colors: {
    primary: lightColors.primary,
    background: lightColors.secondary,
    accent: '#FFE8D3',
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
    outlineVariant: darkColors.primary,
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
  text: {
    textAlign: 'left',
    width: "80%",
    padding: 10,
    fontSize: 18,
    fontFamily: 'Gantari',
  },
});
