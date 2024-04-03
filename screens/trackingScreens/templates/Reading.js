import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import MilestoneComponent from "../components/MilestoneComponent";
import InfoModal from "../components/InfoModal";
import { readingData } from "../data/readingData";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";
import { ScrollView } from "react-native-gesture-handler";

export default function Reading({ template }) {
  const { colors } = useTheme();

  return (
    <View style={{ ...general.scaffold, justifyContent: "space-between" }}>
      <View style={general.scaffold}>
        <Icon name={template.icon} size={40} color={colors.primary} />
        <Text style={{ ...general.title, color: colors.text }}>Reading </Text>
        <Text style={{ color: colors.text }}> Choose your milestones</Text>
        <InfoModal
          text1={
            "Checkmark indicates that the milestone will be completed upon checking!"
          }
          icon1={"check"}
          text2={
            "Milestones with these icons can be incremented according to your progress."
          }
          icon2={"minus"}
          icon3={"plus"}
        />
        <ScrollView contentContainerStyle={{width: '95%'}}>
          {readingData.map((milestone, index) => (
            <MilestoneComponent
              key={index}
              text={milestone.title}
              numeric={milestone.numeric}
              onCheck={() => {}}
              onUncheck={() => {}}
            />
          ))}
        </ScrollView>
      </View>
      <Button
        mode="contained"
        buttonColor={colors.primary}
        children="Add this tracker"
        onPress={() => console.log("Button pressed")}
        style={{ margin: 20 }}
      />
    </View>
  );
}
