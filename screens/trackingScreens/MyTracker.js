import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome5";
import ProgressComponent from "./components/ProgressComponent";
import { useLoginContext } from "../../components/Contexts/LoginContext";
import { general } from "../../styles/general";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "@firebase/database";

export default function MyTracker({ route, navigation }) {
  const { tracker } = route.params;
  const [progress, setProgress] = useState(0);
  const [progressAmount, setProgressAmount] = useState(
    tracker.milestones.length * 10
  );
  const { colors } = useTheme();
  const { loginState } = useLoginContext();

  const deleteTracker = async () => {
    try {
      // Retrieve the tracker list from AsyncStorage
      const trackerListString = await AsyncStorage.getItem("trackers");
      if (trackerListString) {
        const trackerList = JSON.parse(trackerListString);
        // Filter out the deleted tracker from the list
        const updatedTrackerList = trackerList.filter(
          (item) => item.id !== tracker.id
        );
        // Save the updated tracker list back to AsyncStorage
        await AsyncStorage.setItem(
          "trackers",
          JSON.stringify(updatedTrackerList)
        );
        Alert.alert("Tracker deleted from AsyncStorage");
        // Signal to the Trackers component to refresh the list of trackers
        navigation.navigate("Trackers", { refresh: true });
      }
    } catch (error) {
      console.error("Error deleting tracker from AsyncStorage:", error);
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
      <ProgressComponent tracker={tracker} />
    </View>
  );
}
