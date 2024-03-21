import React from "react";
import { View, Text } from "react-native";
import { general } from "../../styles/general";
import { startedStyle } from "../../styles/startedStyle";

export default function GetStarted() {
  return (
    <View style={general.scaffold}>
      <View style={startedStyle.container}>
        <Text>Get Started</Text>
      </View>
    </View>
  );
}
