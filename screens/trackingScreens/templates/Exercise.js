import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Checkbox } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/FontAwesome5";
import { exerciseData } from "../data/exerciseData";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";
import { ScrollView } from "react-native-gesture-handler";

export default function Exercise() {
  const [collapsedPush, setCollapsedPush] = useState(true);
  const [collapsedPull, setCollapsedPull] = useState(true);
  const [collapsedLegs, setCollapsedLegs] = useState(true);
  const { colors } = useTheme();
  const pushDay = exerciseData.filter((exercise) => exercise.type === "push");
  const pullDay = exerciseData.filter((exercise) => exercise.type === "pull");
  const legDay = exerciseData.filter((exercise) => exercise.type === "legs");

  return (
    <View style={general.scaffold}>
      <ScrollView style={{ width: "100%" }}>
        <TouchableOpacity
          onPress={() => setCollapsedPush(!collapsedPush)}
          style={{
            ...templateStyle.exerciseContainer,
            flexDirection: "column",
          }}
        >
          <Text style={{ color: colors.primary }}> Push day </Text>
          <Collapsible
            collapsed={collapsedPush}
            style={{ width: "auto", padding: 10 }}
          >
            {pushDay.map((exercise, index) => (
              <View key={index} style={templateStyle.exercise}>
                <Text style={{ color: colors.text }}> {exercise.name} </Text>
                <Text style={{ color: colors.text }}>
                  Sets: {exercise.sets}{" "}
                </Text>
                <Text style={{ color: colors.text }}>
                  Reps: {exercise.reps}{" "}
                </Text>
              </View>
            ))}
          </Collapsible>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCollapsedPull(!collapsedPull)}
          style={{
            ...templateStyle.exerciseContainer,
            flexDirection: "column",
          }}
        >
          <Text style={{ color: colors.primary }}> Pull day </Text>
          <Collapsible
            collapsed={collapsedPull}
            style={{ width: "auto", padding: 10 }}
          >
            {pullDay.map((exercise, index) => (
              <View key={index} style={templateStyle.exercise}>
                <Text style={{ color: colors.text }}> {exercise.name} </Text>
                <Text style={{ color: colors.text }}>
                  Sets: {exercise.sets}{" "}
                </Text>
                <Text style={{ color: colors.text }}>
                  Reps: {exercise.reps}{" "}
                </Text>
              </View>
            ))}
          </Collapsible>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCollapsedLegs(!collapsedLegs)}
          style={{
            ...templateStyle.exerciseContainer,
            flexDirection: "column",
          }}
        >
          <Text style={{ color: colors.primary }}> Leg day </Text>
          <Collapsible
            collapsed={collapsedLegs}
            style={{ width: "auto", padding: 10 }}
          >
            {legDay.map((exercise, index) => (
              <View key={index} style={templateStyle.exercise}>
                <Text style={{ color: colors.text }}> {exercise.name} </Text>
                <Text style={{ color: colors.text }}>
                  Sets: {exercise.sets}{" "}
                </Text>
                <Text style={{ color: colors.text }}>
                  Reps: {exercise.reps}{" "}
                </Text>
              </View>
            ))}
          </Collapsible>
        </TouchableOpacity>
      </ScrollView>
      <Button
        children="Add this tracker"
        mode="contained"
        buttonColor={colors.primary}
        style={{ marginBottom: 20 }}
        onPress={() => console.log("Add new exercise")}
      />
    </View>
  );
}
