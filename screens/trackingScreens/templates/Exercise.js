// Toimii toistaiseksi puskee FB:hen valitut liikkeet ja niiden tiedot
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import CollapsibleComponent from "../components/CollapsibleComponent";
import MilestoneComponent from "../components/MilestoneComponent";
import InfoModal from "../components/InfoModal";
import { exerciseData, exerciseTrackers } from "../data/exerciseData";
import addToFirebase from "../../../components/AddToFirebase";

import { general } from "../../../styles/general";
import { ScrollView } from "react-native-gesture-handler";

export default function Exercise({ template, navigation }) {
  const [trackerName, setTrackerName] = useState("");
  const { colors } = useTheme();
  const pushDay = exerciseData.filter((exercise) => exercise.type === "push");
  const pullDay = exerciseData.filter((exercise) => exercise.type === "pull");
  const legDay = exerciseData.filter((exercise) => exercise.type === "legs");
  // State to manage selected exercises
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleAddTracker = () => {
    let newName = trackerName.trim();
    if (newName === "") {
      newName = "My Reading Tracker";
      setTrackerName(newName);
    }
    if (selectedExercises.length > 0) {
      // Use addToFirebase function to add selectedExercises to Firebase
      addToFirebase(selectedExercises, "Exercise", newName);
      setTrackerName("");
      navigation.navigate("Trackers");
    } else {
      alert("Please select at least one exercise to add this tracker");
    }
  };

  // Please manage the contents of this template from exerciseData.js
  return (
    <View style={general.scaffold}>
      <Icon name={template.icon} size={40} color={colors.primary} />
      <Text style={{ ...general.title, color: colors.text }}>Exercise </Text>
      <TextInput
        label=""
        placeholder="Name your tracker"
        mode="outlined"
        value={trackerName}
        onChangeText={(text) => setTrackerName(text)}
        selectionColor={colors.primary}
        outlineColor={colors.primary}
        activeOutlineColor={colors.primary}
        style={{ width: "90%", marginBottom: 20 }}
      />
      <Text style={{ color: colors.text }}> Choose your milestones</Text>
      <InfoModal
        text1={
          "Checkmark indicates that the milestone will be completed upon checking!"
        }
        icon1={"check"}
        text2={
          "Milestones with these icons can be incremented according to your progress."
        }
        icon2={"minus"}
        icon3={"plus"}
      />
      <ScrollView contentContainerStyle={{ width: "90%" }}>
        {/* Pass setSelectedExercises to CollapsibleComponent */}
        <CollapsibleComponent
          dataList={pushDay}
          title="Push day"
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
        />
        <CollapsibleComponent
          dataList={pullDay}
          title="Pull day"
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
        />
        <CollapsibleComponent
          dataList={legDay}
          title="Leg day"
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
        />
        {exerciseTrackers.map((tracker, index) => (
          <MilestoneComponent
            key={index}
            text={tracker.name}
            numeric={tracker.numeric}
            onCheck={() => {
              setSelectedExercises((prevSelectedExercises) => [
                ...prevSelectedExercises,
                tracker,
              ]);
            }}
            onUncheck={() => {
              setSelectedExercises((prevSelectedExercises) =>
                prevSelectedExercises.filter(
                  (exercise) => exercise.name !== tracker.name
                )
              );
            }}
          />
        ))}
      </ScrollView>
      {/* Button to add tracker */}
      <Button
        children="Add this tracker"
        mode="contained"
        buttonColor={colors.primary}
        style={{ marginBottom: 20 }}
        onPress={handleAddTracker}
      />
    </View>
  );
}
