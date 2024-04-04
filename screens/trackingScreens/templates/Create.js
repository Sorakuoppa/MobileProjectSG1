import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconButton, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function Create({template}) {
  const { colors } = useTheme();








  return (
    <View style={{ ...general.scaffold, justifyContent: "space-between" }}>
      <Icon name={template.icon} size={40} color={colors.primary} />
      <Text style={{ ...general.title, color: colors.text }}>
        Create your own tracker
      </Text>
      <Text style={{ color: colors.text }}> Choose your milestones</Text>
    </View>
  );
}
