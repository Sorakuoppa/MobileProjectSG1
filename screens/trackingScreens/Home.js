import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerStack } from "../../components/ScreenStack";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { general, gradientColors, darkColors } from "../../styles/general";

export default function Home() {
  return (
    <View style={general.scaffold}>
      {/* <LinearGradient
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={gradientColors}
        style={general.container}
      >
        <Text style={general.title}>My exercise routine</Text>
        <Button
        children="Show my progress!"
        mode="contained"
        onPress={() => console.log("Button Pressed")}
      />
      </LinearGradient> */}
      <View style={general.progress}>
        <Text style={{ color: darkColors.primary }}>Milestone achieved!</Text>
        <Text style={{ color: "white" }}>Run 10km</Text>
      </View>
    </View>
  );
}
