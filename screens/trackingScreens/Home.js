import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { homeStyles } from "../../styles/trackingScreens/homeStyle";
import { general } from "../../styles/general";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Modal, Portal, IconButton, Divider } from "react-native-paper";

export default function Home() {
  const { colors } = useTheme();
  return (
    <View style={[general.scaffold, { backgroundColor: colors.background }]}>
      
      <View style={[homeStyles.progress, { backgroundColor: colors.accent }]}>
        <Text style={[homeStyles.card, { color: colors.text }]}>Today</Text>
        <Text style={[homeStyles.card, { color: colors.text }]}>May 15th</Text>
        <Text style={[homeStyles.card, { color: colors.text }]}>*PROGRESS*</Text>
        <Text style={[homeStyles.card, { color: colors.text }]}>Milestones 0/2 done</Text>
      </View>
      <View style={{ height: 2, backgroundColor: colors.primary }} />


      <Text style={[homeStyles.card, { color: colors.text }]}>Today's milestones</Text>


      <View style={[homeStyles.progress, { backgroundColor: colors.accent }]}>
        <Text style={[homeStyles.progressDate, { color: colors.text }]}>15.5.2024</Text>
        <Text style={[homeStyles.progressName, { color: colors.text }]}>Gardening</Text>
        <Text style={[homeStyles.progressMilestone, { color: colors.text }]}>Water succulets</Text>
        <Text style={[homeStyles.progressBottomInfo, { color: colors.text }]}>
        <IconButton
        icon="information-outline"
        iconColor={colors.primary}
        size={30}
      />
      </Text>
      </View>
    </View>
  );
}
