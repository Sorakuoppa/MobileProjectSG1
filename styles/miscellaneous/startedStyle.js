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
    welcomeText: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
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