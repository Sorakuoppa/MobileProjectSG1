import { StyleSheet } from "react-native";
import { darkColors } from "../general";

export const startedStyle = StyleSheet.create({
    container: {
        flex: 1,
        height: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkColors.primary,
    },
    welcomeTitle: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold'
    },
    welcomeText: {
        textAlign: 'justify',
        marginBottom: 20,
        padding: 20,
        fontSize: 18,
        fontFamily: 'Gantari',
      },
      button: {
        backgroundColor: '#ff5c00',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      buttonContainer: {
        width: '100%', 
        alignSelf: 'center'
      },
});