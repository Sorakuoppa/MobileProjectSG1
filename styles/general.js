import { StyleSheet } from "react-native";

export const gradientColors = ["#c36800", "#ff7d03", "#ff7b00"];
export const darkColors = {
  primary: "#FF5C00",
  secondary: "#363636",
};
export const lightColors = {
  primary: "#FF5C00",
  secondary: "#FFEBD8",
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
    backgroundColor: darkColors.secondary,
  },
  container: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "80%",
    borderWidth: 2,
    borderColor: "#ffcc00",
    borderRadius: 10,
  },
  progress: {
    flex: 0.2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "80%",
    backgroundColor: lightColors.secondary,
    margin: 10,
  },
});
