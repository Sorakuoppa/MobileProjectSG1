import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { getTrackers } from "../../components/FirebaseComponents/ReadFirebaseDb";
import { useLoginContext } from "../../components/Contexts/LoginContext";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { homeStyles } from "../../styles/trackingScreens/homeStyle";
import { general } from "../../styles/general";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
  const { colors } = useTheme();
  const { loginState } = useLoginContext();
  const [trackerList, setTrackerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
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



  let totalMilestones = 0;
  let completedMilestones = 0;
  trackerList.forEach(tracker => {
    totalMilestones += tracker.milestones.length;
    completedMilestones += tracker.milestones.filter(milestone => milestone.done).length;
  });
  const currentDate = () => {
    const date = new Date();
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const progress = (completedMilestones / totalMilestones) * 100;
  if (isLoading) {
    return (
      <View style={{ ...general.scaffold, justifyContent: "flex-start" }}>
        <Text style={{ ...general.title, color: colors.text }}>Trackers</Text>
        <Text
          style={{ ...general.title, color: colors.text, marginBottom: 40 }}
        >
          Fetching your trackers...
        </Text>
        <ActivityIndicator animating={true} color={colors.primary} size={80} />
      </View>
    );
  } 
  return (
    <>
      {/* Card showing current date and progress */}
      <View style={{ backgroundColor: colors.background }}>
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Text style={[homeStyles.card, homeStyles.header, { color: colors.text }]}> {currentDate()}</Text>
          <AnimatedCircularProgress
            size={120}
            width={20}
            fill={progress}
            tintColor={colors.primary}
            backgroundColor={colors.accent}
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            {() => <Text style={{ color: colors.text }}>{Math.round(progress)}%</Text>}
          </AnimatedCircularProgress>
          <Text style={{ color: colors.text }}>Progress: {completedMilestones} / {totalMilestones} Milestones completed!</Text>
        </View>
      </View>
  
      {/* Individual tracker cards */}
      <ScrollView style={{ backgroundColor: colors.background }}>
        {trackerList.map((tracker, index) => (
          <View key={index} style={{ backgroundColor: colors.accent, padding: 20, marginBottom: 10 }}>
            <Text style={{ color: colors.text }}>Name: {tracker.name}</Text>
            <Text style={{ color: colors.text }}>Type: {tracker.type}</Text>
            <View style={{alignContent: ''}}>
            <Text style={{ color: colors.text }}>
              Milestones: {tracker.milestones.filter(milestone => milestone.done).length} / {tracker.milestones.length}
            </Text>
            <IconButton
        icon="information-outline"
        iconColor={colors.primary}
        size={30}
        onPress={() => setVisible(true)}
      />
  </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}


