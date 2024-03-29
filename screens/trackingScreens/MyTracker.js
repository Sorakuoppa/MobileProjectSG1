import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconButton, Checkbox } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import Icon from "react-native-vector-icons/FontAwesome5";
import MilestoneComponent from "./components/MilestoneComponent";

import { general } from "../../styles/general";
import { trackerStyle } from "../../styles/trackingScreens/trackerStyle";

export default function MyTracker({ route }) {
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(false);

  const { colors } = useTheme();

  const updateProgress = (value) => {
    const newProgress = progress + value;
    setProgress(newProgress);
  };

  return (
    <View style={general.scaffold}>
      <Icon name="running" size={40} color={colors.primary} />
      <Text style={{ ...general.title, color: colors.text }}>
        My running tracker
      </Text>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={progress}
        tintColor={colors.primary}
        onAnimationComplete={() => {}}
        backgroundColor={colors.text}
      />
      <MilestoneComponent
        text={"Run 20 km"}
        onCheck={() => updateProgress(20)}
        onUncheck={() => updateProgress(-20)}
      />
      <MilestoneComponent
        text={"Run 40 km"}
        onCheck={() => updateProgress(20)}
        onUncheck={() => updateProgress(-20)}
      />
    </View>
  );
}
