import { db, auth } from "./FirebaseConfig"; // Import the db object from your Firestore configuration
import { collection, getDocs } from "firebase/firestore";

export async function getTrackers(loginState) {
  try {
    // Check if user is authenticated
    if (loginState === false) {
      console.log("User is not authenticated. Cannot fetch trackers.");
      return [];
    }
    
    // Check if auth.currentUser is null to prevent accessing currentUser property on null
    if (!auth.currentUser) {
      console.log("Current user is null. Cannot fetch trackers.");
      return [];
    }

    // User is authenticated, proceed with fetching trackers
    const trackersCol = collection(db, "trackers", auth.currentUser.uid, "trackers");
    const trackersSnapshot = await getDocs(trackersCol);
    const trackerList = trackersSnapshot.docs.map(doc => {
      console.log(doc.data()); // Log each document's data
      return doc.data();
    });

    return trackerList;
  } catch (error) {
    console.error("Error fetching trackers:", error);
    return [];
  }
}
