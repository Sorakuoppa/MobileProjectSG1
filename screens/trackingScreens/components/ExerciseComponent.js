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
    <>
      {tracker.milestones.map((exercise, index) => (
        <TouchableOpacity
          onPress={() => toggleCollapsed(index)}
          style={{
            ...templateStyle.exerciseContainer,
            flexDirection: "column",
            borderColor: colors.primary,
            backgroundColor: colors.accent,
          }}
          key={index}
        >
          <View style={templateStyle.exerciseTitle}>
            <Text style={{ color: colors.text }}> {exercise.name} </Text>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {}}
              color={colors.primary}
              uncheckedColor={colors.text}
            />
          </View>
          <ExerciseCollapsible
            key={index}
            exercise={exercise}
            collapse={collapsedState[index]}
            toggleCollapsed={() => toggleCollapsed(index)}
          />
        </TouchableOpacity>
      ))}
    </>
  );
}
