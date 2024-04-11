import { StyleSheet } from "react-native";

export const accountStyle = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    padding: {
        paddingTop: 20,
        marginTop: 20,
    },
    text: {
        fontFamily: 'Gantari',
        alignSelf: 'center',
        marginTop: 30,
        fontSize: 30,
    },
    buttonText: {
        fontFamily: 'Gantari',
        alignSelf: 'center'
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 50,
        alignSelf: 'flex-end',
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 150, // Add margin between content and button
    },
    
})