import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../../components/FirebaseComponents/FirebaseConfig";
import MilestoneComponent from "./MilestoneComponent";

import { general } from "../../../styles/general";
import { ScrollView } from "react-native-gesture-handler";

export default function ProgressComponent({ tracker }) {
  const [progress, setProgress] = useState(0);
  const { colors } = useTheme();

  const updateFBProgress = async (value, milestone) => {

    const newMilestones = tracker.milestones.map((m) => {
      if (m === milestone) {
        return { ...m, done: !m.done };
      } else {
        return m;
      }
    });
    try {
    const docRef = doc(db, "trackers", auth.currentUser.uid, "trackers", tracker.name);
    console.log(milestone.milestone);

    await updateDoc(docRef, {
      milestones: newMilestones,
      progress: 0,
    });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    

  };

  return (
    <View style={general.scaffold}>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={progress}
        tintColor={colors.primary}
        onAnimationComplete={() => {}}
        backgroundColor={colors.text}
      />
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {tracker.milestones.map((milestone, index) => (
          <MilestoneComponent
            key={index}
            text={
              tracker.type === "Exercise" ? milestone.name : milestone.milestone
            }
            numeric={milestone.numeric}
            onCheck={() => updateFBProgress(20, milestone)}
            onUncheck={() => updateFBProgress(-20, milestone)}
            isDone={milestone.done}
          />
        ))}
      </ScrollView>
    </View>
  );
}
