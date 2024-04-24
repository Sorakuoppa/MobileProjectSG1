import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { useTheme } from "@react-navigation/native";
import {templateStyle, addNewStyle} from "../../styles/trackingScreens/addNewStyle";


export default function ExerciseScreen({route} ) {
    const [legCollapse, setLegCollapse] = useState(true);
    const [pullCollapse, setPullCollapse] = useState(true);
    const [pushCollapse, setPushCollapse] = useState(true);
    const { colors } = useTheme();
    const { tracker } = route.params;


    const legDay = tracker.milestones.filter((item) => item.type === "legs");
    const pullDay = tracker.milestones.filter((item) => item.type === "pull");
    const pushDay = tracker.milestones.filter((item) => item.type === "push");

    return (
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
          {legDay.map((item, index) => (
            <View key={index}>
              <Text>{item.name}</Text>
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
          {pullDay.map((item, index) => (
            <View key={index}>
              <Text>{item.name}</Text>
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
          {pushDay.map((item, index) => (
            <View key={index}>
              <Text>{item.name}</Text>
            </View>
          ))}
        </Collapsible>
      </View>
    );
}