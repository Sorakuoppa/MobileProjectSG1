// This component was setup to use dynamically in the Exercise tracker but was left unused due to peroformance issues


import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";
import { useTheme } from "@react-navigation/native";

export default function ExerciseCollapsible({exercise, collapse, toggleCollapsed}) {
  const [checked, setChecked] = useState(false);
  const { colors } = useTheme();

 
  return (
    <Collapsible collapsed={collapse} style={{ width: "auto", padding: 10 }}>
      <View style={templateStyle.exercise}>
        <Text style={{ color: colors.text }}> Sets: {exercise.sets} </Text>
        <Text style={{ color: colors.text }}> Reps: {exercise.reps} </Text>
        <TextInput
          label="Weight"
          mode="outlined"
          keyboardType="numeric"
          value={exercise.weight}
          onChangeText={() => {setChecked(!checked)}}
          selectionColor={colors.primary}
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
          style={{ width: "90%", marginBottom: 20 }}
        />
      </View>
    </Collapsible>
  );
}
