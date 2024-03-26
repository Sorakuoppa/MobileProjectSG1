import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconButton, Checkbox } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import Icon from "react-native-vector-icons/FontAwesome5";
import MilestoneComponent from "./templates/MilestoneComponent";

import { general } from "../../styles/general";
import { trackerStyle } from "../../styles/trackingScreens/trackerStyle";

export default function MyTracker({ route }) {
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(false);

  const { colors } = useTheme();

  const updateProgress = () => {
    setChecked(!checked);
    if (!checked && progress < 100) {
      setProgress(progress + 10);
    } else if (checked && progress > 0) {
      setProgress(progress - 10);
    }
  };

  return (
    <View style={general.scaffold}>
      <Icon name="running" size={40} color={colors.primary} />
      <Text style={general.title}>My running tracker</Text>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: colors.text }}> Run 10km </Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={updateProgress}
          color={colors.primary}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: colors.text }}> Run 10km </Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={updateProgress}
          color={colors.primary}
        />
      </View>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={progress}
        tintColor={colors.primary}
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor={colors.text}
      />
    </View>
  );
}
