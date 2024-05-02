import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import {
  db,
  auth,
} from "../../../components/FirebaseComponents/FirebaseConfig";
import { useTheme } from "@react-navigation/native";
import {
  templateStyle,
  addNewStyle,
} from "../../../styles/trackingScreens/addNewStyle";
import Icon from "react-native-vector-icons/FontAwesome5";
import MilestoneComponent from "./MilestoneComponent";
import ExerciseCollapsible from "./ExerciseCollapsible";

export default function ExerciseComponent({ tracker, navigation }) {
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState(tracker.progress);
  const [milestones, setMilestones] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
  const filteredList = tracker.milestones.filter(
    (item) => item.type === "tracker"
  );
  setMilestones(filteredList);
  }, [tracker.milestones]);

  let progressValue = 100 / milestones.length;

  const updateFBProgress = async (value, milestone) => {
    if (auth.currentUser) {
      try {
        const docRef = doc(
          db,
          "trackers",
          auth.currentUser.uid,
          "trackers",
          tracker.name
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const progress = data.progress;
          const updatedProgress = progress + value;
          setProgress(updatedProgress);
          const updatedMilestones = data.milestones.map((item) => {
            if (item.name === milestone.name) {
              return { ...item, done: !item.done };
            }
            return item;
          });
          await updateDoc(docRef, {
            progress: updatedProgress,
            milestones: updatedMilestones,
          });
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("ExerciseScreen", { tracker: tracker })
        }
      >
        <View
          style={{
            ...templateStyle.milestones,
            backgroundColor: colors.accent,
            borderColor: colors.primary,
          }}
        >
          <Text style={{ ...templateStyle.exerciseText, color: colors.text }}>
            Workouts{" "}
            <Icon
              name="arrow-right"
              size={20}
              color={colors.primary}
              style={{ marginLeft: 10 }}
            />
          </Text>
        </View>
      </TouchableOpacity>
      {milestones.map((milestone, index) => (
        <MilestoneComponent
          key={index}
          text={milestone.name}
          type={milestone.type}
          numeric={milestone.numeric}
          isDone={milestone.done}
          onCheck={() => {
            updateFBProgress(progressValue, milestone);
          }}
          onUncheck={() => {
            updateFBProgress(-progressValue, milestone);
          }}
        />
      ))}
    </>
  );
}
