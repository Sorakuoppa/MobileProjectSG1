import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const logOrReg = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    maxWidth: windowWidth - 5, // Set max width for the logo with some padding
    height: windowWidth / 1.5, // Set the height of the logo to 1/3rd of the screen width
    resizeMode: "contain",
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center", // Center content horizontally
    marginTop: 20, // Add margin between logo and content
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 30,
    fontWeight: '900',
    fontFamily: 'Gantari',
  },
  buttonContainer: {
    width: windowWidth - 25,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20, // Add margin between content and button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gantari',
    fontWeight: 'bold',
  },
  anonText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Gantari',

  },
  headerText: {
    fontWeight: "bold",
    fontSize: 26,
    
  },
  anonContainer: {
    marginTop: 15,
    alignSelf: "center"
},
anonButton: { 
  fontFamily: 'Gantari',
}
});
