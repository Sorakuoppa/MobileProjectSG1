// TODO: Show all the trackers that the user has created
// and allow them to click on them to view the tracker details

import React from "react";
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

export default function Trackers({ navigation }) {
  const { colors } = useTheme();
  const [trackerList, setTrackerList] = useState([]);

  const fetchTrackers = async () => {
    try {
      const fetchedTrackers = await readFromFirebase();
      setTrackerList(fetchedTrackers);
    } catch (error) {
      console.error("Error fetching trackers:", error);
    }
  };

  const trackerPress = () => {
    navigation.navigate("MyTracker");
  };
  // TESTING ASYNCSTORAGE REMOVE THIS
  const showAsyncStorage = async () => {
    // AsyncStorage.clear(); 

    try {
      const value = await AsyncStorage.getAllKeys();

      if (value !== null) {
        alert(value);
      }
    }
    catch (e) {
      console.error("Error fetching asyncStorage: ", e);
    }
  };

// TESTI NAPPI FIREBASE HAKUUN

  const handleButtonPress = async () => {
    try {
      const fetchedTrackers = await getTrackers();
      setTrackerList(fetchedTrackers);
    } catch (error) {
      console.error("Error fetching trackers:", error);
    }
  };

  return (
    <View style={general.scaffold}>
      <View>
        <Pressable onPress={trackerPress}>
          <Surface
            elevation={4}
            style={{
              ...addNewStyle.template,
              backgroundColor: colors.accent,
              borderColor: colors.primary,
            }}
          >
            <Icon name="running" size={40} color={colors.primary} />
            <Text style={{ ...addNewStyle.templateText, color: colors.text }}>
              My running tracker
            </Text>
          </Surface>
        </Pressable>

        {/* TESTI NAPPI MILLÄ HAETAAN DATAA FIREBASESTA*/}
        <Button title="Fetch Trackers" onPress={handleButtonPress}>asddasadsasdadsdas</Button>
      {/* CONSOLELOGAA PAINETTAESSA KOKO TRACKERLISTAN ATM */}      
      {/* Button for testing asyncStorage */}
      <Button
        children="Show asyncStorage"
        mode="contained"
        buttonColor={colors.primary}
        onPress={showAsyncStorage}
      />

      </View>
    </View>
  );
}