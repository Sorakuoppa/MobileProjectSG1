import { db, auth } from "./FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getTrackers(loginState) {
  try {
    if (loginState === false) {
      console.log("User is not authenticated. Trying to fetch trackers from AsyncStorage.");
      const storedData = await getTrackersFromAsyncStorage();
      return storedData;
    }

    const trackersCol = collection(db, "trackers", auth.currentUser.uid, "trackers");
    const trackersSnapshot = await getDocs(trackersCol);
    const trackerList = trackersSnapshot.docs.map(doc => doc.data());

    return trackerList;
  } catch (error) {
    console.error("Error fetching trackers:", error);
    return [];
  }
}

async function getTrackersFromAsyncStorage() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const storedData = [];
    
    for (const key of keys) {
      if (key.startsWith("tracker")) {
        const objectKey = key;
        const typeKey = key.replace("tracker", "type");
        const nameKey = key.replace("tracker", "name");
        
        const object = await AsyncStorage.getItem(objectKey);
        const type = await AsyncStorage.getItem(typeKey);
        const name = await AsyncStorage.getItem(nameKey);
        
        storedData.push({
          milestones: JSON.parse(object),
          type,
          name
        });
      }
    }

    return storedData;
  } catch (error) {
    console.error("Error fetching trackers from AsyncStorage:", error);
    return [];
  }
}
