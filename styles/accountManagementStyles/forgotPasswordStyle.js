import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const forgotPasswordStyle = StyleSheet.create({
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
    paddingVertical: 12,
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontFamily: 'Gantari',
  },
 
  formFieldContainer: {
    width: windowWidth - 40,
    marginBottom: 20,
  },
  formFieldTitle: {
    fontSize: 16,
    fontFamily: 'Gantari',
    marginBottom: 5,
  },
  formFieldInput: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    fontSize: 16,
    fontFamily: 'Gantari',
    width: 350,
  },
});
