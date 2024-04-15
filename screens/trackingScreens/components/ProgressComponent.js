import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { collection, getDocs, deleteDoc, setDoc, onSnapshot, query } from "firebase/firestore";
import { db, auth } from "../../../components/FirebaseConfig";
import MilestoneComponent from "./MilestoneComponent";

import { general } from "../../../styles/general";
import { ScrollView } from "react-native-gesture-handler";

export default function ProgressComponent({ tracker }) {
  const [progress, setProgress] = useState(0);
  const { colors } = useTheme();

  const updateProgress = (value) => {
    console.log(tracker.milestones.length);
    const newProgress = progress + value;
    setProgress(newProgress);
  };

  const updateFBProgress = async (value) => {
    // const newProgress = progress + value;
    // setProgress(newProgress);
    // setDoc(collection(db, "trackers", auth.currentUser.uid, "trackers", tracker.id), {
    //   progress: newProgress,
    // });

    const querySnapshot = await getDocs(collection(db, "trackers", auth.currentUser.uid, "trackers"));
    console.log(querySnapshot);
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
            onCheck={() => updateFBProgress(20)}
            onUncheck={() => updateProgress(-20)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
