import { db } from "./FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

async function fetchDataFromFirestore() {
  try {
    const collectionRef = collection(db, "your_collection_name");

    const snapshot = await getDocs(collectionRef);

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Document ID: ", doc.id);
      console.log("Document data: ", data);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

fetchDataFromFirestore();
