import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import MilestoneComponent from "./MilestoneComponent";
import { IconButton, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";
export default function Running({template}) {
  const { colors } = useTheme();

  return (
    <View style={{ ...general.scaffold, justifyContent: "space-between" }}>
      <View style={general.scaffold}>
        <Icon name={template.icon} size={40} color={colors.primary} />
        <Text style={{...general.title, color: colors.text}}>Running </Text>
        <Text style={{ color: colors.text }}> Milestones in this tracker:</Text>
        <MilestoneComponent text="Run 10km" type="checkbox" />
        <MilestoneComponent text="Run 20km" type="count" />
        <MilestoneComponent text="20 runs in a month!" type="checkbox" />
      </View>
      <Button
        mode="contained"
        buttonColor={colors.primary}
        children="Add this tracker"
        onPress={() => console.log("Button pressed")}
        style={{ margin: 10 }}
      />
    </View>
  );
}
