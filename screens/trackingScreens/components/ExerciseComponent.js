import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { useTheme } from "@react-navigation/native";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";
import MilestoneComponent from "./MilestoneComponent";
import ExerciseCollapsible from "./ExerciseCollapsible";

export default function ExerciseComponent({ tracker }) {
  const [collapsedState, setCollapsedState] = useState(
    Array(tracker.milestones.length).fill(true)
  );
  const [checked, setChecked] = useState(false);
  const { colors } = useTheme();

  const toggleCollapsed = (index) => {
    const newCollapsedState = [...collapsedState];
    newCollapsedState[index] = !newCollapsedState[index];
    setCollapsedState(newCollapsedState);
  };
  return (
    <TouchableOpacity
      style={{
        ...templateStyle.exerciseContainer,
        backgroundColor: colors.accent,
        borderColor: colors.primary,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ color: colors.text }}>Workouts</Text>
      </View>
    </TouchableOpacity>
  );
}
