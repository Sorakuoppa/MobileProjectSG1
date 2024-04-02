// Toimii toistaiseksi puskee FB:hen valitut liikkeet ja niiden tiedot
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import CollapsibleComponent from "../components/CollapsibleComponent";
import { exerciseData } from "../data/exerciseData";
import addToFirebase from "../../../components/AddToFirebase";


import { general } from "../../../styles/general";
import { ScrollView } from "react-native-gesture-handler";

export default function Exercise({ template }) {
  const { colors } = useTheme();
  const pushDay = exerciseData.filter((exercise) => exercise.type === "push");
  const pullDay = exerciseData.filter((exercise) => exercise.type === "pull");
  const legDay = exerciseData.filter((exercise) => exercise.type === "legs");

  // State to manage selected exercises
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleAddTracker = () => {
    if (selectedExercises.length > 0) {
      // Use addToFirebase function to add selectedExercises to Firebase
      addToFirebase(selectedExercises, 'Exercise');
      console.log("Added to Firebase")
    } else {
      alert("Please select at least one exercise to add this tracker");
    }
  };

  return (
    <View style={general.scaffold}>
      <Icon name={template.icon} size={40} color={colors.primary} />
      <Text style={{ ...general.title, color: colors.text }}>Exercise </Text>
      <ScrollView style={{ width: "80%" }}>
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
