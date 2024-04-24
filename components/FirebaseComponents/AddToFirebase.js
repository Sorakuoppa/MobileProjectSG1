import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "./FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";

export default async function addToFirebase(object, type, trackerName, progress, icon) {

  if (auth.currentUser) {
    try {
      const docRef = doc(db, "trackers", auth.currentUser.uid, "trackers", trackerName);
      await setDoc(docRef, {
        milestones: object,
        type: type,
        name: trackerName,
        progress: progress,
        icon: icon,
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
      let key5 = "icon" + counter;

      while (await AsyncStorage.getItem(key)) {
        counter++;
        key = "tracker" + counter;
        key2 = "type" + counter;
        key3 = "name" + counter;
        key4 = "progress" + counter;
        key5 = "icon" + counter;
      }
      
      await AsyncStorage.setItem(key, JSON.stringify(object));
      await AsyncStorage.setItem(key2, type);
      await AsyncStorage.setItem(key3, trackerName);
      await AsyncStorage.setItem(key4, progress.toString());
      await AsyncStorage.setItem(key5, icon);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
