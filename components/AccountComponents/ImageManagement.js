import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db, storage } from '../FirebaseComponents/FirebaseConfig';
import { doc, updateDoc } from '@firebase/firestore';

export async function deleteProfilePicture(userData) {

        const currentUser = auth.currentUser; // Get the current user
        const filename = `images/${currentUser.uid}`
        const storageRef = ref(storage, filename);
        try {
          // Delete profile picture from Firebase Storage
          await deleteObject(storageRef);
  
          // Update user document in Firestore to remove profile picture
          const userDocRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userDocRef, { profilePicture: '' });
  
          // Update local user data
          userData.profilePicture = '';
          console.log('Profile picture deleted successfully:', userData);
          return userData;
      } catch (error) {
          console.log('Error deleting profile picture:', error);
          throw error; // Rethrow the error for handling in the caller function
      }
};

export default async function UploadImage(uri, setIsLoading, fileType) {
  setIsLoading(true);
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const currentUser = auth.currentUser; // Get the current user
    const filename = `images/${currentUser.uid}`
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          const userDocRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userDocRef, { profilePicture: downloadURL });
          console.log('Picture updated to database');
          setIsLoading(false);
        });
      }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    setIsLoading(false);
  }
}
