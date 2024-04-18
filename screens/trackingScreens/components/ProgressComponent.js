import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import {
  db,
  auth,
} from "../../../components/FirebaseComponents/FirebaseConfig";
import MilestoneComponent from "./MilestoneComponent";

import { general } from "../../../styles/general";
import { ScrollView } from "react-native-gesture-handler";

export default function ProgressComponent({ tracker, navigation }) {
  const [progress, setProgress] = useState(0);
  const [milestones, setMilestones] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchMilestones = async () => {
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
          setProgress(progress);
          setMilestones(data.milestones);
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    fetchMilestones();
  }, [tracker.name]);

  const updateFBProgress = async (value, milestone) => {
    try {
      const docRef = doc(
        db,
        "trackers",
        auth.currentUser.uid,
        "trackers",
        tracker.name
      );
      const newProgress = progress + value;
      const newMilestones = milestones.map((item) => {
        if (item === milestone) {
          return { ...item, done: !item.done };
        }
        return item;
      });
      await updateDoc(docRef, {
        progress: newProgress,
        milestones: newMilestones,
      });
      setProgress(newProgress);
      setMilestones(newMilestones);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={general.scaffold}>
      {/* THIS SHOULD BE DYNAMIC BASED ON THE AMOUNT OF MILESTONES CHOSEN */}
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
        {milestones.map((milestone, index) => (
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
