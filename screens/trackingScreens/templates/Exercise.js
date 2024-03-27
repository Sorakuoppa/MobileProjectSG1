import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";

import CollapsibleComponent from "./CollapsibleComponent";
import { exerciseData } from "../data/exerciseData";

import { general } from "../../../styles/general";
import { ScrollView } from "react-native-gesture-handler";

export default function Exercise() {
  const { colors } = useTheme();
  const pushDay = exerciseData.filter((exercise) => exercise.type === "push");
  const pullDay = exerciseData.filter((exercise) => exercise.type === "pull");
  const legDay = exerciseData.filter((exercise) => exercise.type === "legs");

  return (
    <View style={general.scaffold}>
      <ScrollView style={{ width: "80%" }}>
        <CollapsibleComponent dataList={pushDay} title="Push day" />
        <CollapsibleComponent dataList={pullDay} title="Pull day" />
        <CollapsibleComponent dataList={legDay} title="Leg day" />
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
