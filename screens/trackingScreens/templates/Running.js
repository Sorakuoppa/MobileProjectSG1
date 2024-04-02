import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import addToFirebase from "../../../components/AddToFirebase";
import MilestoneComponent from "../components/MilestoneComponent";
import InfoModal from "../components/InfoModal";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function Running({ template }) {
  const [objectList, setObjectList] = useState([]);
  const { colors } = useTheme();

  const onCheck = (text) => {
    let list = [...objectList];
    let newTrackerObject = {};
    newTrackerObject = { milestone: text, checked: true };
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

  return (
    <View style={{ ...general.scaffold, justifyContent: "space-between" }}>
      <View style={general.scaffold}>
        <Icon name={template.icon} size={40} color={colors.primary} />
        <Text style={{ ...general.title, color: colors.text }}>Running </Text>
        <InfoModal text1={"Checkmark indicates that the milestone will be completed upon checking!" } icon1={'check'} text2={'Milestones with these icons can be incremented according to your progress.'} icon2={'plus'} icon3={'minus'} />
        <Text style={{ color: colors.text }}> Choose your milestones:</Text>
        <MilestoneComponent
          text={"Run 5km"}
          onCheck={onCheck}
          onUncheck={onUncheck}
        />
        <MilestoneComponent
          text={"Run 20km"}
          onCheck={onCheck}
          onUncheck={onUncheck}
        />
        <MilestoneComponent
          text={"20 runs in a month!"}
          onCheck={onCheck}
          onUncheck={onUncheck}
        />
        <MilestoneComponent
          text={"Kilometers ran this month:"}
          onCheck={onCheck}
          onUncheck={onUncheck}
          numeric={true}
        />
      </View>
      <Button
        mode="contained"
        buttonColor={colors.primary}
        children="Add this tracker"
        onPress={buttonHandler}
        style={{ margin: 10 }}
      />
    </View>
  );
}
