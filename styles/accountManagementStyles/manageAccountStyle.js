import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const manageAccountStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust the width as needed
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#007AFF', // Blue color
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Gantari'
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    alignSelf: 'flex-end',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15, // Add margin between content and button
  
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  padding: {
    paddingTop: 20,
    marginTop: 20,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    padding: 10,
  },
  text: {
    fontFamily: 'Gantari',
    fontSize: 16,
  },
  formFieldContainer: {
    paddingTop: 10,
    width: windowWidth - 40,
  },
  formField: {
    borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 3,
    fontSize: 16,
    fontFamily: 'Gantari',
  },
  iconStyle: {
    opacity: 0.9,
    borderRadius: 20, 
    padding: 10 
  },
});
