import React from 'react';
import Home from './screens/Home';
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
    <PaperProvider>
      <Home />
    </PaperProvider>
    </NavigationContainer>
  );
}

