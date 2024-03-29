import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Checkbox } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function CollapsibleComponent({ dataList, title }) {
  const [collapsed, setCollapsed] = useState(true);
  const [checked, setChecked] = useState(false);
  const { colors } = useTheme();
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleCheckboxToggle = () => {
    setChecked(!checked);
    if (!checked) {
      setSelectedExercises(dataList);
      console.log(selectedExercises);
    }else
    {
      console.log("Array cleared");
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
      <Button mode="contained"/>
    </TouchableOpacity>
    
  );
}
