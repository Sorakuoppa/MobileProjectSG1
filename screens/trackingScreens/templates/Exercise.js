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
  const [checkedPush, setCheckedPush] = useState(false);
  const [checkedPull, setCheckedPull] = useState(false);
  const [checkedLegs, setCheckedLegs] = useState(false);

  const { colors } = useTheme();
  const pushDay = exerciseData.filter((exercise) => exercise.type === "push");
  const pullDay = exerciseData.filter((exercise) => exercise.type === "pull");
  const legDay = exerciseData.filter((exercise) => exercise.type === "legs");

  return (
    <View style={general.scaffold}>
      <ScrollView style={{ width: "80%" }}>
        <TouchableOpacity
          onPress={() => setCollapsedPush(!collapsedPush)}
          style={{
            ...templateStyle.exerciseContainer,
            flexDirection: "column",
          }}
        >
          <View style={templateStyle.exerciseTitle}>
            <Text style={{ color: colors.primary }}> Push day </Text>
            <Checkbox
              status={checkedPush ? "checked" : "unchecked"}
              onPress={() => setCheckedPush(!checkedPush)}
              color={colors.primary}
            />
          </View>
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
          <View style={templateStyle.exerciseTitle}>
            <Text style={{ color: colors.primary }}> Pull day </Text>
            <Checkbox
              status={checkedPull ? "checked" : "unchecked"}
              onPress={() => setCheckedPull(!checkedPull)}
              color={colors.primary}
            />
          </View>
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
          <View style={templateStyle.exerciseTitle}>
            <Text style={{ color: colors.primary }}> Leg day </Text>
            <Checkbox
              status={checkedLegs ? "checked" : "unchecked"}
              onPress={() => setCheckedLegs(!checkedLegs)}
              color={colors.primary}
            />
          </View>
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
