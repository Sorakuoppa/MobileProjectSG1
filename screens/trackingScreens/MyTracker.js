import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconButton, Checkbox } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import Icon from "react-native-vector-icons/FontAwesome5";
import MilestoneComponent from "./components/MilestoneComponent";

import { general } from "../../styles/general";
import { trackerStyle } from "../../styles/trackingScreens/trackerStyle";
import { ScrollView } from "react-native-gesture-handler";

export default function MyTracker({ route }) {
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(false);
  const {tracker} = route.params;
  const { colors } = useTheme();

  const updateProgress = (value) => {
    const newProgress = progress + value;
    setProgress(newProgress);
  };

  return (
    <View style={general.scaffold}>
      <Icon
        name={
          tracker.type === "Running"
            ? "running"
            : tracker.type === "Reading"
            ? "book"
            : tracker.type === "Exercise"
            ? "dumbbell"
            : "question"
        }
        size={40}
        color={colors.primary}
      />
      <Text style={{ ...general.title, color: colors.text }}>
        {tracker.name}
      </Text>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={progress}
        tintColor={colors.primary}
        onAnimationComplete={() => {}}
        backgroundColor={colors.text}
      />
      <ScrollView>
        {tracker.milestones.map((milestone, index) => (
          <MilestoneComponent
            key={index}
            text={milestone.milestone}
            numeric={milestone.numeric}
            onCheck={() => updateProgress(20)}
            onUncheck={() => updateProgress(-20)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
