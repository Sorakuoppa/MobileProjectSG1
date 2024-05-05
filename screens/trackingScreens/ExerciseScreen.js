import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Checkbox, TextInput, Button } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { useTheme } from "@react-navigation/native";
import { general } from "../../styles/general";
import {
  templateStyle,
  addNewStyle,
} from "../../styles/trackingScreens/addNewStyle";

// This screen displays the exercises for the exercise tracker, used in every exercise tracker

export default function ExerciseScreen({ route, navigation }) {
  const [legCollapse, setLegCollapse] = useState(true);
  const [pullCollapse, setPullCollapse] = useState(true);
  const [pushCollapse, setPushCollapse] = useState(true);
  const { colors } = useTheme();
  const { tracker } = route.params;

  const legDay = tracker.milestones.filter((item) => item.type === "legs");
  const pullDay = tracker.milestones.filter((item) => item.type === "pull");
  const pushDay = tracker.milestones.filter((item) => item.type === "push");


  return (
    <View style={{ justifyContent: "space-between", flex: 1 }}>
      <View>
        <TouchableOpacity
          onPress={() => setLegCollapse(!legCollapse)}
          style={{
            ...templateStyle.exerciseContainer,
            backgroundColor: colors.accent,
            borderColor: colors.primary,
            margin: 10,
          }}
        >
          <Text style={{ color: colors.text }}>Leg Day</Text>
        </TouchableOpacity>
        <Collapsible collapsed={legCollapse}>
          <View style={{ ...templateStyle.exerciseTableContainer }}>
            <Text style={{ ...general.text, color: colors.text, width: 100 }}>
              Sets
            </Text>
            <Text style={{ ...general.text, color: colors.text, width: 100 }}>
              Reps
            </Text>
          </View>

          {legDay.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  ...templateStyle.exerciseTableText,
                  color: colors.text,
                  marginRight: 20,
                }}
              >
                {item.name + " "}
              </Text>
              <Text
                style={{
                  ...templateStyle.exerciseTableText,
                  color: colors.text,
                }}
              >
                {item.sets}
              </Text>
              <Text
                style={{
                  ...templateStyle.exerciseTableText,
                  color: colors.text,
                }}
              >
                {item.reps}
              </Text>
            </View>
          ))}
        </Collapsible>
        <TouchableOpacity
          onPress={() => setPullCollapse(!pullCollapse)}
          style={{
            ...templateStyle.exerciseContainer,
            backgroundColor: colors.accent,
            borderColor: colors.primary,
            margin: 10,
          }}
        >
          <Text style={{ color: colors.text }}>Pull Day</Text>
        </TouchableOpacity>
        <Collapsible collapsed={pullCollapse}>
          <View style={{ ...templateStyle.exerciseTableContainer }}>
            <Text style={{ ...general.text, color: colors.text, width: 100 }}>
              Sets
            </Text>
            <Text style={{ ...general.text, color: colors.text, width: 100 }}>
              Reps
            </Text>
          </View>
          {pullDay.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  ...templateStyle.exerciseTableText,
                  color: colors.text,
                  marginRight: 20,
                }}
              >
                {item.name + " "}
              </Text>
              <Text
                style={{
                  ...templateStyle.exerciseTableText,
                  color: colors.text,
                }}
              >
                {item.sets}
              </Text>
              <Text
                style={{
                  ...templateStyle.exerciseTableText,
                  color: colors.text,
                }}
              >
                {item.reps}
              </Text>
            </View>
          ))}
        </Collapsible>
        <TouchableOpacity
          onPress={() => setPushCollapse(!pushCollapse)}
          style={{
            ...templateStyle.exerciseContainer,
            backgroundColor: colors.accent,
            borderColor: colors.primary,
            margin: 10,
          }}
        >
          <Text style={{ color: colors.text }}>Push Day</Text>
        </TouchableOpacity>
        <Collapsible collapsed={pushCollapse}>
          <View style={{ ...templateStyle.exerciseTableContainer }}>
            <Text style={{ ...general.text, color: colors.text, width: 100 }}>
              Sets
            </Text>
            <Text style={{ ...general.text, color: colors.text, width: 100 }}>
              Reps
            </Text>
          </View>
          {pushDay.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  ...templateStyle.exerciseTableText,
                  color: colors.text,
                  marginRight: 20,
                }}
              >
                {item.name + " "}
              </Text>
              <Text
                style={{
                  ...templateStyle.exerciseTableText,
                  color: colors.text,
                }}
              >
                {item.sets}
              </Text>
              <Text
                style={{
                  ...templateStyle.exerciseTableText,
                  color: colors.text,
                }}
              >
                {item.reps}
              </Text>
            </View>
          ))}
        </Collapsible>
      </View>
      <Button
        children="Back"
        onPress={() => navigation.goBack()}
        buttonColor={colors.primary}
        style={{ margin: 10 }}
        textColor={colors.text}
      />
    </View>
  );
}
