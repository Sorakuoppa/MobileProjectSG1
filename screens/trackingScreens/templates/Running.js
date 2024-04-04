import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import addToFirebase from "../../../components/AddToFirebase";
import MilestoneComponent from "../components/MilestoneComponent";
import InfoModal from "../components/InfoModal";
import { runningData } from "../data/runningData";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";

export default function Running({ template }) {
  const [objectList, setObjectList] = useState([]);
  const { colors } = useTheme();

  const onCheck = (text, numeric) => {
    let list = [...objectList];
    let newTrackerObject = {};
    newTrackerObject = { milestone: text, checked: true, numeric: numeric };
    list.push(newTrackerObject);
    setObjectList(list);
  };

  const onUncheck = (text) => {
    let list = objectList.filter((obj) => obj.milestone !== text);
    setObjectList(list);
  };

  const buttonHandler = () => {
    if (objectList.length > 0) {
      addToFirebase(objectList, "Running");
    } else {
      alert("Please select at least one milestone to add this tracker");
    }
  };
  // Please manage the contents of this template from runningData.js
  return (
    <View style={{ ...general.scaffold, justifyContent: "space-between" }}>
      <Icon name={template.icon} size={40} color={colors.primary} />
      <Text style={{ ...general.title, color: colors.text }}>Running </Text>
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
      <ScrollView contentContainerStyle={{ width: "95%" }}>
        {runningData.map((milestone, index) => (
          <MilestoneComponent
            key={index}
            text={milestone.title}
            numeric={milestone.numeric}
            onCheck={(text) => onCheck(text, milestone.numeric)}
            onUncheck={onUncheck}
          />
        ))}
      </ScrollView>
      <Button
        mode="contained"
        buttonColor={colors.primary}
        children="Add this tracker"
        onPress={buttonHandler}
        style={{ margin: 20 }}
      />
    </View>
  );
}
