import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { app, auth, db } from "../../../components/FirebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import MilestoneComponent from "../components/MilestoneComponent";
import { IconButton, Checkbox } from "react-native-paper";
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
  // Add the objectList to the Firestore database
  const buttonHandler = async () => {
   try {
      const trackerRef = collection(db, "trackers");
      const newTracker = {
        name: "Running",
        milestones: objectList,
        
      };
      const docRef = await addDoc(trackerRef, newTracker);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) { 
      console.error("Error adding document: ", e);

   }
  };

  return (
    <View style={{ ...general.scaffold, justifyContent: "space-between" }}>
      <View style={general.scaffold}>
        <Icon name={template.icon} size={40} color={colors.primary} />
        <Text style={{ ...general.title, color: colors.text }}>Running </Text>
        <Text style={{ color: colors.text }}> Milestones in this tracker:</Text>
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
