import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { ActivityIndicator, Button, Portal, Dialog } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import ProgressComponent from "./components/ProgressComponent";
import { useLoginContext } from "../../components/Contexts/LoginContext";
import { general } from "../../styles/general";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteDoc, doc } from "@firebase/firestore";
import { auth, db } from "../../components/FirebaseComponents/FirebaseConfig";

export default function MyTracker({ route, navigation }) {
  const { tracker } = route.params;
  const [dialog, setDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressAmount, setProgressAmount] = useState(
    tracker.milestones.length * 10
  );
  const { colors } = useTheme();
  const { loginState } = useLoginContext();

  // Function used for deleting single trackers from both asyncStorage and database
  const deleteTracker = async () => {
    if (!loginState) {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const trackers = await AsyncStorage.multiGet(allKeys);
        const foundTrackerIndex = trackers.findIndex(
          (item) => item[1] === tracker.name
        );
        if (foundTrackerIndex !== -1) {
          // Delete all items associated with the found tracker index
          const keysToDelete = trackers.filter((item) =>
            item[0].includes(foundTrackerIndex)
          );
          await AsyncStorage.multiRemove(keysToDelete.map((item) => item[0]));
          navigation.navigate("Trackers", { refresh: true });
        }
      } catch (error) {
        console.error("Error deleting tracker from AsyncStorage:", error);
      }
    } else {
      try {
        const docRef = doc(
          db,
          "trackers",
          auth.currentUser.uid,
          "trackers",
          tracker.name
        );
        await deleteDoc(docRef);
        navigation.navigate("Trackers", { refresh: true });
      } catch (error) {
        console.error("Error deleting tracker from database:", error);
      }
    }
    setDialog(false);
  };

  return (
    <View style={general.scaffold}>
      <Icon name={tracker.icon} size={40} color={colors.primary} />
      <Text style={{ ...general.title, color: colors.text }}>
        {tracker.name}
      </Text>
      <ProgressComponent tracker={tracker} navigation={navigation} route={route} />
      <Button
        children="Delete tracker"
        mode="contained"
        buttonColor="red"
        style={{ marginTop: 10, marginBottom: 10, color: colors.text }}
        onPress={() => setDialog(true)}
      />
      <Portal>
        <Dialog
          visible={dialog}
          onDismiss={() => setDialog(false)}
          style={{ backgroundColor: colors.accent }}
        >
          <Dialog.Title style={{ color: colors.text }}>
            Are you sure you want to delete tracker?
          </Dialog.Title>
          <Dialog.Actions>
            <Button
              children="Yes"
              textColor={colors.primary}
              onPress={deleteTracker}
            />
            <Button
              children="No"
              textColor={colors.primary}
              onPress={() => setDialog(false)}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
