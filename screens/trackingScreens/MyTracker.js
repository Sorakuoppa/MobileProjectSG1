import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import Icon from "react-native-vector-icons/FontAwesome5";
import MilestoneComponent from "./components/MilestoneComponent";
import { useLoginContext } from "../../components/LoginContext"; // Importing LoginContext

import { general } from "../../styles/general";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyTracker({ route, navigation }) {
  const [progress, setProgress] = useState(0);
  const { tracker } = route.params;
  const { colors } = useTheme();
  const { loginState } = useLoginContext(); // Accessing login state from context

  const updateProgress = (value) => {
    const newProgress = progress + value;
    setProgress(newProgress);
  };
 ///ASDDSADSADSADSADSADSADSA
  const deleteTracker = async () => {
    try {
      // Retrieve the tracker list from AsyncStorage
      const trackerListString = await AsyncStorage.getItem('trackers');
      if (trackerListString) {
        const trackerList = JSON.parse(trackerListString);
        // Filter out the deleted tracker from the list
        const updatedTrackerList = trackerList.filter(item => item.id !== tracker.id);
        // Save the updated tracker list back to AsyncStorage
        await AsyncStorage.setItem('trackers', JSON.stringify(updatedTrackerList));
        Alert.alert('Tracker deleted from AsyncStorage');
        // Signal to the Trackers component to refresh the list of trackers
        navigation.navigate('Trackers', { refresh: true });
      }
    } catch (error) {
      console.error('Error deleting tracker from AsyncStorage:', error);
    }
  };

  return (
    <View style={general.scaffold}>
      <Icon
        name={
          tracker.type === "Running"
            ? "running"
            : tracker.type === "Reading"
            ? "book"
            : tracker.type === "Exercise"
            ? "dumbbell"
            : "question"
        }
        size={40}
        color={colors.primary}
      />
      <Button title="Delete Tracker" onPress={deleteTracker} />
      <Text style={{ ...general.title, color: colors.text }}>
        {tracker.name}
      </Text>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={progress}
        tintColor={colors.primary}
        onAnimationComplete={() => {}}
        backgroundColor={colors.text}
      />
      <ScrollView>
        {tracker.milestones.map((milestone, index) => (
          <MilestoneComponent
            key={index}
            text={tracker.type === "Exercise" ? milestone.name : milestone.milestone}
            numeric={milestone.numeric}
            onCheck={() => updateProgress(20)}
            onUncheck={() => updateProgress(-20)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
