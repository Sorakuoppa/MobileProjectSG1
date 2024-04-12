import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default async function addToFirebase(object, type, trackerName, progress) {
  if (auth.currentUser) {
    try {
      await addDoc(
        collection(db, "trackers", auth.currentUser.uid, "trackers"),
        {
          milestones: object,
          type: type,
          name: trackerName,
          progress: progress,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    try {
      let counter = 0;
      let key = "tracker" + counter;
      let key2 = "type" + counter;
      let key3 = "name" + counter;

      while (await AsyncStorage.getItem(key)) {
        counter++;
        key = "tracker" + counter;
        key2 = "type" + counter;
        key3 = "name" + counter;
      }
      
      await AsyncStorage.setItem(key, JSON.stringify(object));
      await AsyncStorage.setItem(key2, type);
      await AsyncStorage.setItem(key3, trackerName);
      alert("Saved to AsyncStorage");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
