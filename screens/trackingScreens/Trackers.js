// TODO: Show all the trackers that the user has created
// and allow them to click on them to view the tracker details

import React, { useEffect, useCallback, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { getTrackers } from "../../components/ReadFirebaseDb";
import { db, auth } from "../../components/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { general } from "../../styles/general";
import { trackerStyle } from "../../styles/trackingScreens/trackerStyle";
import { addNewStyle } from "../../styles/trackingScreens/addNewStyle";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Surface, Button, ActivityIndicator } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useLoginContext } from "../../components/LoginContext";

export default function Trackers({ navigation }) {
  const { colors } = useTheme();
  const [trackerList, setTrackerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { loginState } = useLoginContext();

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect");
      showTrackers();
      return () => {};
    }, [loginState])
  );

  const showTrackers = async () => {
    setIsLoading(true);
    try {
      const fetchedTrackers = await getTrackers(loginState);
      setTrackerList(fetchedTrackers);
    } catch (error) {
      console.error("Error fetching trackers:", error);
    }
    setIsLoading(false);
  };

  const trackerPress = (tracker) => {
    navigation.navigate("MyTracker", { tracker: tracker });
  };

  const clearFirebase = async () => {
    try {
      const trackerRef = collection(db, "trackers", auth.currentUser.uid, "trackers"); 
      await deleteDoc(trackerRef);

    } catch (e) {
      console.error("Error deleting document: ", e);
  }
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

  if (isLoading) {
    return (
      <View style={{ ...general.scaffold, justifyContent: "center" }}>
        <Text
          style={{ ...general.title, color: colors.text, marginBottom: 40 }}
        >
          Fetching your trackers...
        </Text>
        <ActivityIndicator animating={true} color={colors.primary} size={80} />
      </View>
    );
  } else if (!isLoading) {
    return (
      <View style={general.scaffold}>
        <Text style={{ ...general.title, color: colors.text }}>Trackers</Text>
        <Button
          children= "Delete all trackers"
          mode="contained"
          buttonColor={colors.primary}
          onPress={() => clearFirebase}
        />
        <ScrollView>
          {trackerList.map((tracker, index) => (
            <Pressable
              key={index}
              onPress={() => trackerPress(tracker)}
              style={{}}
            >
              <Surface
                elevation={4}
                style={{
                  ...trackerStyle.tracker,
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
                <Text
                  style={{ ...addNewStyle.templateText, color: colors.text }}
                >
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
}
