import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { useTheme } from "@react-navigation/native";
import {
  templateStyle,
  addNewStyle,
} from "../../../styles/trackingScreens/addNewStyle";
import MilestoneComponent from "./MilestoneComponent";
import ExerciseCollapsible from "./ExerciseCollapsible";

export default function ExerciseComponent({ tracker }) {
  const [checked, setChecked] = useState(false);
  const { colors } = useTheme();


    const filteredList = tracker.milestones.filter(
      (item) => item.type === "tracker"
    );

    useEffect(() => {
      console.log(filteredList);
    }, [filteredList]);


  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            ...templateStyle.milestones,
            backgroundColor: colors.accent,
            borderColor: colors.primary,
          }}
        >
          <Text style={{ ...templateStyle.exerciseText, color: colors.text }}>
            Workouts
          </Text>
        </View>
      </TouchableOpacity>
      {filteredList.map((milestone, index) => (
        <MilestoneComponent
          key={index}
          text={milestone.name}
          type={milestone.type}
          numeric={milestone.numeric}
          isDone={milestone.done}
        />
      ))}
    </>
  );
}
