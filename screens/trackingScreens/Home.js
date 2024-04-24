import React, { useCallback, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { getTrackers } from "../../components/FirebaseComponents/ReadFirebaseDb";
import { useLoginContext } from "../../components/Contexts/LoginContext";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { homeStyles } from "../../styles/trackingScreens/homeStyle";
import { general } from "../../styles/general";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  const { colors } = useTheme();
  const { loginState } = useLoginContext();
  const [trackerList, setTrackerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      showTrackers();
      return () => { };
    }, [loginState])
  );

  const trackerPress = (tracker) => {
    navigation.navigate("MyTracker", { tracker: tracker });
  };

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
          <Text style={[homeStyles.card, homeStyles.header, { color: colors.text }]}>Today is {currentDate()}</Text>
          <AnimatedCircularProgress
            size={120}
            width={20}
            fill={progress}
            tintColor={colors.primary}
            backgroundColor={colors.accent}
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            {() => <Text style={[homeStyles.header, { color: colors.text }]}>{Math.round(progress)}%</Text>}
          </AnimatedCircularProgress>
          <Text style={[homeStyles.progressText, { color: colors.text }]}>Progress: {completedMilestones} / {totalMilestones} Milestones completed!</Text>
        </View>
      </View>

      {/* Individual tracker cards */}
      <ScrollView style={{ backgroundColor: colors.background }}>
        {trackerList.map((tracker, index) => (
          <Pressable key={index} onPress={() => trackerPress(tracker)}>
            <View key={index} style={[homeStyles.progressCard, { backgroundColor: colors.accent, borderColor: colors.primary }]}>
              <Text style={[homeStyles.progressName, { color: colors.text }]}>Name: {tracker.name}</Text>
              {/* <Text style={[homeStyles.progressName, { color: colors.text }]}>Type: {tracker.type}</Text> */}
              <View style={[homeStyles.progressLine, { alignContent: '' }]}>
                <Text style={[homeStyles.progressMilestone, { color: colors.text }]}>
                  Milestones: {tracker.milestones.filter(milestone => milestone.done).length} / {tracker.milestones.length}
                </Text>
                <AnimatedCircularProgress
                  size={60}
                  width={8}
                  animating= {"false"}
                  fill={tracker.progress}
                  tintColor={colors.primary}
                  backgroundColor={colors.background}
                  style={{ marginBottom: 5, marginTop: 5, marginRight: 5 }}
                >
                  {() => <Text style={[homeStyles.progressPercent, { color: colors.text }]}>{Math.round(tracker.progress)}%</Text>}
                </AnimatedCircularProgress>
              </View>
              <IconButton
                  icon="information-outline"
                  iconColor={colors.primary}
                  size={30}
                  onPress={() => trackerPress(tracker)}
                />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}


