import { StyleSheet } from "react-native";
import { darkColors } from "../general";

export const startedStyle = StyleSheet.create({
    container: {
        flex: 1,
        height: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: darkColors.primary,
    },
    welcomeTitle: {
      textAlign: 'center',
      color: '#ffe8d3',
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: "Gantari"
    },
    welcomeText: {
        textAlign: 'center',
        marginBottom: 20,
        padding: 20,
        fontSize: 18,
        fontFamily: 'Gantari',
      },
      button: {
        backgroundColor: '#ff5c00',
        paddingVertical: 12,
        paddingHorizontal: 100,
        borderRadius: 30,
        borderColor: '#ffe8d3',
        borderWidth: 2,
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      buttonContainer: {
        width: '100%', 
        alignSelf: 'center'
      },
});