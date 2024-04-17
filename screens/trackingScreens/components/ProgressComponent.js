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
  onSnapshot,
  query,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../../components/FirebaseComponents/FirebaseConfig";
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
    const docRef = collection(db, "trackers", auth.currentUser.uid, "trackers");
    const collectionSnap = await getDocs(docRef);
    const idList = [];
    collectionSnap.forEach((doc) => {
        idList.push(doc.id);
        }
    )
    console.log(idList[0])

    const specificDocRef = doc(
      db,
      "trackers",
      auth.currentUser.uid,
      "trackers",
      idList[0]
    );
    const docSnap = await getDoc(specificDocRef);

    // Check if the document exists
    if (docSnap.exists()) {
      // Log the document data
      console.log(docSnap.id, " => ", docSnap.data());
    } else {
      console.log("No such document!");
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
            onCheck={() => updateFBProgress(20)}
            onUncheck={() => updateProgress(-20)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
