import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import MilestoneComponent from "./MilestoneComponent";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function Reading({ template }) {
  const { colors } = useTheme();

  return (
    <View style={{ ...general.scaffold, justifyContent: "space-between" }}>
      <View style={general.scaffold}>
        <Icon name={template.icon} size={40} color={colors.primary} />
        <Text style={general.title}>Reading </Text>
        <Text style={{ color: colors.text }}> Milestones in this tracker:</Text>
        <MilestoneComponent text="Read 10 pages" type="checkbox" />
        <MilestoneComponent text="Read 20 pages" type="count" />
        <MilestoneComponent text="Book read!" type="checkbox" />
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
