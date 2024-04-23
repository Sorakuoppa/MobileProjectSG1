import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
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
import ExerciseComponent from "./ExerciseComponent";

import { general } from "../../../styles/general";
import { ScrollView } from "react-native-gesture-handler";

export default function ProgressComponent({ tracker }) {
  const [progress, setProgress] = useState(0);
  const [milestones, setMilestones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foundLocalTrackerName, setFoundLocalTrackerName] = useState('');
  const { colors } = useTheme();

  let progressValue = 100 / milestones.length;

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetchMilestones();
    }, 1000);
  }, [tracker.name]);

  const fetchMilestones = async () => {
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
  }
    else {
      try {
        // TÄMÄ LÖYTÄÄ NYKYISEN TRÄCKERIN ASYNC STORAGESTA.
        const allKeys = await AsyncStorage.getAllKeys();
        const trackers = await AsyncStorage.multiGet(allKeys);
        const foundTrackerIndex = trackers.findIndex((item) => item[1] === tracker.name);

        // Tbh en tiiä mihi noita keytä tarvitaa, mutta assignaa oikeat 
        // Keypairit kyseiseen träckeriin 

        const [, trackerName] = trackers[foundTrackerIndex]; // Extract the tracker name
        const [progressKey, progressValue] = trackers.find((item) => item[0] === `progress${foundTrackerIndex}`);
        const [typeKey, typeValue] = trackers.find((item) => item[0] === `type${foundTrackerIndex}`);
        const [trackerKey, milestoneValue] = trackers.find((item) => item[0] === `tracker${foundTrackerIndex}`);

        // Parsitaan milestone valuet ja runnataan jo määritellyt funktiot niillä
        console.log('progress value raw: ',typeof(progressValue));
        const parsedTrackers = JSON.parse(milestoneValue)
        setProgress(progressValue);
        setMilestones(parsedTrackers);
        // Now you have access to the related key-value pairs
        console.log("Progress:", progressValue);
        console.log("Type:", typeValue);
        console.log("Tracker:", milestoneValue);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching trackers from AsyncStorage:", error);
      }
    }
  };
  // THIS NEEDS DIFFERENT FUNCTIONALITY FOR NUMERIC MILESTONES
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
        console.error("Error updating document: ", e);
      }
    } else {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const trackers = await AsyncStorage.multiGet(allKeys);
        const foundTrackerIndex = trackers.findIndex((item) => item[1] === tracker.name);
        if (foundTrackerIndex !== -1) {
          const [trackerKey, milestoneValue] = trackers.find((item) => item[0] === `tracker${foundTrackerIndex}`);
          const parsedTrackerValue = JSON.parse(milestoneValue);
          const updatedTrackerValue = parsedTrackerValue.map((item) => {
            if (item.milestone === milestone.milestone) {
              return { ...item, done: !item.done };
            }
            return item;
          });
          await AsyncStorage.setItem(`tracker${foundTrackerIndex}`, JSON.stringify(updatedTrackerValue));
          
          // Calculate new progress value based on the updated milestones
          const newProgress = updatedTrackerValue.filter((item) => item.done).length / updatedTrackerValue.length * 100;
          await AsyncStorage.setItem(`progress${foundTrackerIndex}`, newProgress.toString());

          // Update state with new progress value and updated milestones
          setProgress(newProgress);
          setMilestones(updatedTrackerValue);
        }
      } catch (error) {
        console.error("Error updating AsyncStorage: ", error);
      }
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
        >
          {() => (
            <Text style={{ color: colors.text }}>{Math.round(progress)}%</Text>
          )}
        </AnimatedCircularProgress>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            paddingBottom: 20,
          }}
        >
          {tracker.type === "Exercise" && (
            <ExerciseComponent tracker={tracker} />
          )}
          {tracker.type != "Exercise" &&
            milestones.map((milestone, index) => (
              <MilestoneComponent
                key={index}
                text={milestone.milestone}
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
