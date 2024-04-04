import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default async function addToFirebase(object, type) {
  if (!auth.currentUser) {
    let counter = 0;
    let key = "tracker" + counter;
    let key2 = "type" + counter;

    try {
      while (await AsyncStorage.getItem(key)) {
        counter++;
        key = "tracker" + counter;
        key2 = "type" + counter;
      }
      await AsyncStorage.setItem(key, JSON.stringify(object));
      await AsyncStorage.setItem(key2, type);
      alert("Saved to asyncstorage");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    try {
      await addDoc(
        collection(db, "trackers", auth.currentUser.uid, "trackers"),
        {
          milestones: object,
          type: type,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
