import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { general, gradientColors } from "../styles/general";

export default function Home() {
  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      angleCenter={{ x: 0.5, y: 0.5 }}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      colors={gradientColors}
      style={general.scaffold}
    >
      <Text style={general.title}>Welcome to the Home Screen</Text>
      <Button
        children="Show my progress!"
        mode="contained"
        onPress={() => console.log("Button Pressed")}
      />
    </LinearGradient>
  );
}
