import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "./FirebaseConfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useLoginContext } from "../Contexts/LoginContext";

export default async function addToFirebase(object, type, trackerName, progress) {

  if (auth.currentUser) {
    try {
      const docRef = doc(db, "trackers", auth.currentUser.uid, "trackers", trackerName);
      await setDoc(docRef, {
        milestones: object,
        type: type,
        name: trackerName,
        progress: progress,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else if (!auth.currentUser){
    try {
      let counter = 0;
      let key = "tracker" + counter;
      let key2 = "type" + counter;
      let key3 = "name" + counter;
      let key4 = "progress" + counter;

      while (await AsyncStorage.getItem(key)) {
        counter++;
        key = "tracker" + counter;
        key2 = "type" + counter;
        key3 = "name" + counter;
        key4 = "progress" + counter;
      }
      
      await AsyncStorage.setItem(key, JSON.stringify(object));
      await AsyncStorage.setItem(key2, type);
      await AsyncStorage.setItem(key3, trackerName);
      await AsyncStorage.setItem(key4, progress.toString());
      alert("Saved to AsyncStorage");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
