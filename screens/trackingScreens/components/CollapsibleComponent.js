import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Checkbox } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

// Dynamic component to display and handle the collapsible buttons in Exercise template screen
export default function CollapsibleComponent({
  dataList,
  title,
  selectedExercises,
  setSelectedExercises,
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [checked, setChecked] = useState(false);
  const { colors } = useTheme();

  const handleCheckboxToggle = () => {
    setChecked(!checked);
    if (!checked) {
      // If checkbox is checked, add all exercises from dataList to selectedExercises
      setSelectedExercises(prevSelectedExercises => [...prevSelectedExercises, ...dataList]);
    } else {
      // If checkbox is unchecked, filter out the exercises from dataList in selectedExercises
      setSelectedExercises(prevSelectedExercises =>
        prevSelectedExercises.filter(exercise => !dataList.some(item => item.name === exercise.name))
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setCollapsed(!collapsed)}
      style={{
        ...templateStyle.exerciseContainer,
        flexDirection: "column",
        borderColor: colors.primary,
        backgroundColor: colors.accent,
      }}
    >
      <View style={templateStyle.exerciseTitle}>
        <Text style={{ color: colors.text }}> {title} </Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={handleCheckboxToggle}
          color={colors.primary}
          uncheckedColor={colors.text}
        />
      </View>
      <Collapsible
        collapsed={collapsed}
        style={{ width: "auto", padding: 10 }}
      >
        {dataList.map((exercise, index) => (
          <View key={index} style={templateStyle.exercise}>
            <Text style={{ color: colors.text }}> {exercise.name} </Text>
            <Text style={{ color: colors.text }}>Sets: {exercise.sets} </Text>
            <Text style={{ color: colors.text }}>Reps: {exercise.reps} </Text>
          </View>
        ))}
      </Collapsible>
    </TouchableOpacity>
  );
}
