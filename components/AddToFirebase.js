import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default async function addToFirebase(object, type) {
  try {
    await addDoc(collection(db, "trackers", auth.currentUser.uid, "trackers"), {
      milestones: object,
      type: type,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

