import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const loginAndRegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: 'Gantari',
    color: '#fff',
    fontSize: 25
  },
  button: {
    backgroundColor: '#ff5c00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20, // Add margin between content and button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gantari',
  },
  anonText: {
    fontSize: 16,
    fontFamily: 'Gantari',
    color: '#fff'
  },
 
  formFieldContainer: {
    width: windowWidth - 40,
    marginBottom: 20,
  },
  formFieldTitle: {
    color: '#FF5C00',
    fontSize: 16,
    fontFamily: 'Gantari',
    marginBottom: 5,
  },
  formFieldInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FF5C00',
    fontSize: 16,
    fontFamily: 'Gantari',
  },
  paddingTopView: {
    paddingTop: 15,
  }
});
