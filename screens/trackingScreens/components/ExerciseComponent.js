import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { useTheme } from "@react-navigation/native";
import {
  templateStyle,
  addNewStyle,
} from "../../../styles/trackingScreens/addNewStyle";
import Icon from "react-native-vector-icons/FontAwesome5";
import MilestoneComponent from "./MilestoneComponent";
import ExerciseCollapsible from "./ExerciseCollapsible";

export default function ExerciseComponent({ tracker, navigation }) {
  const [checked, setChecked] = useState(false);
  const { colors } = useTheme();


    const filteredList = tracker.milestones.filter(
      (item) => item.type === "tracker"
    );



  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("ExerciseScreen", { tracker: tracker })
        }
      >
        <View
          style={{
            ...templateStyle.milestones,
            backgroundColor: colors.accent,
            borderColor: colors.primary,
          }}
        >
          <Text style={{ ...templateStyle.exerciseText, color: colors.text }}>
            Workouts {" "}
            <Icon
              name="arrow-right"
              size={20}
              color={colors.primary}
              style={{ marginLeft: 10 }}
            />
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
