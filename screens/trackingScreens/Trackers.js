// TODO: Show all the trackers that the user has created
// and allow them to click on them to view the tracker details

import React, { useEffect } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { useState } from "react";
import { getTrackers } from "../../components/ReadFirebaseDb"; // Import getTrackers
import AsyncStorage from "@react-native-async-storage/async-storage";
import { general } from "../../styles/general";
import { trackerStyle } from "../../styles/trackingScreens/trackerStyle";
import { addNewStyle } from "../../styles/trackingScreens/addNewStyle";
import Icon from "react-native-vector-icons/FontAwesome5";
import { IconButton, Surface, Button } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useLoginContext } from "../../components/LoginContext";

export default function Trackers({ navigation }) {
  const { colors } = useTheme();
  const [trackerList, setTrackerList] = useState([]);
  const [iconName, setIconName] = useState("running");
  const { loginState } = useLoginContext();

  useEffect(() => {
    showTrackers();
  }, [navigation]);

  const showTrackers = async () => {
    try {
      const fetchedTrackers = await getTrackers(loginState);
      setTrackerList(fetchedTrackers);
    } catch (error) {
      console.error("Error fetching trackers:", error);
    }
  };

  const trackerPress = (tracker) => {
    navigation.navigate("MyTracker", { tracker: tracker });
  };

  // TESTING ASYNCSTORAGE REMOVE THIS
  const showAsyncStorage = async () => {
    // AsyncStorage.clear();

    try {
      const value = await AsyncStorage.getAllKeys();

      if (value !== null) {
        alert(value);
      }
    } catch (e) {
      console.error("Error fetching asyncStorage: ", e);
    }
  };

  return (
    <View style={general.scaffold}>
      <Text style={{ ...general.title, color: colors.text }}>Trackers</Text>
      <ScrollView>
        {trackerList.map((tracker, index) => (
          <Pressable
            key={index}
            onPress={() => trackerPress(tracker)}
            style={trackerStyle.tracker}
          >
            <Surface
              elevation={4}
              style={{
                ...addNewStyle.template,
                backgroundColor: colors.accent,
                borderColor: colors.primary,
              }}
            >
              <Icon
                name={
                  tracker.type === "Running"
                    ? "running"
                    : tracker.type === "Reading"
                    ? "book"
                    : tracker.type === "Exercise"
                    ? "dumbbell"
                    : "question-circle"
                }
                size={40}
                color={colors.primary}
              />
              <Text style={{ ...addNewStyle.templateText, color: colors.text }}>
                {tracker.name}
              </Text>
            </Surface>
          </Pressable>
        ))}
      </ScrollView>

      {/* Button for testing asyncStorage */}
      <Button
        children="Show asyncStorage"
        mode="contained"
        buttonColor={colors.primary}
        onPress={showAsyncStorage}
      />
    </View>
  );
}
