import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import {
  db,
  auth,
} from "../../../components/FirebaseComponents/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MilestoneComponent from "./MilestoneComponent";

import { general } from "../../../styles/general";
import { ScrollView } from "react-native-gesture-handler";

export default function ProgressComponent({ tracker }) {
  const [progress, setProgress] = useState(0);
  const [milestones, setMilestones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();

let progressValue = 100/milestones.length;

  useEffect(() => {
    setIsLoading(true);
    console.log(tracker.name);
    setTimeout(() => {
      fetchMilestones();
    }, 1000);
    
  }, [tracker.name]);

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
    } finally {
      setIsLoading(false);
    }
    if (!auth.currentUser) {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        if (tracker.name === allKeys[0]) {
          const storedData = await AsyncStorage.getItem(allKeys[0]);
          const parsedData = JSON.parse(storedData);
          setMilestones(parsedData.milestones);
          setProgress(parsedData.progress);
          setIsLoading(false);
        }

      } catch (error) {
        console.error("Error fetching trackers from AsyncStorage:", error);
      }
    }
  };
// THIS NEEDS DIFFERENT FUNCTIONALITY FOR NUMERIC MILESTONES
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

  if (isLoading) {
    return (
      <View style={general.scaffold}>
        <ActivityIndicator animating={true} color={colors.primary} />
      </View>
    );
  } else if (!isLoading) {
    return (
      <View style={general.scaffold}>
        <AnimatedCircularProgress
          size={120}
          width={20}
          fill={progress}
          tintColor={colors.primary}
          onAnimationComplete={() => {}}
          backgroundColor={colors.accent}
          style={{ marginBottom: 20 }}
        />
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            paddingBottom: 20,
          }}
        >
          {milestones.map((milestone, index) => (
            <MilestoneComponent
              key={index}
              text={
                tracker.type === "Exercise"
                  ? milestone.name
                  : milestone.milestone
              }
              type="tracker"
              numeric={milestone.numeric}
              onCheck={() => updateFBProgress(progressValue, milestone)}
              onUncheck={() => updateFBProgress(-progressValue, milestone)}
              isDone={milestone.done}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
