import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth'; // Import createUserWithEmailAndPassword function
import { auth } from '../../components/FirebaseConfig'; // Import FirebaseConfig auth

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // TÄHÄN VÄLIIN LISÄTÄÄN MITÄ TAPAHTUU KUN REKISTERÖINTI ON ONNISTUNUT

      
      console.log('User created successfully!');
    } catch (error) {
      alert(error.message);
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleRegister} color="#3498db" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});

export default RegisterComponent;
