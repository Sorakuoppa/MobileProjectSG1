import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db, storage } from './FirebaseConfig';
import { doc, updateDoc } from '@firebase/firestore';

export async function deleteProfilePicture(passedUserData) {
        const currentUser = auth.currentUser; // Get the current user
        const filename = `images/${currentUser.uid}`
        const storageRef = ref(storage, filename);
        const [userData, setUserData] = useState(passedUserData);
        console.log(userData);
  try {
    // Delete profile picture from Firebase Storage
    await deleteObject(storageRef)
    const userDocRef = doc(db, 'users', userData.email);
    await updateDoc(userDocRef, { profilePicture: '' });
    // Update local state
    setUserData(prevUserData => ({ ...prevUserData, profilePicture: '' }));
    Alert.alert('Success', 'Profile picture deleted successfully.');
    // Update user data in Firestore to remove profile picture
    return(userData)
  } catch (error) {
    console.log('Error deleting profile picture:', error);
    Alert.alert('Error', 'Failed to delete profile picture.');
  }
};

export default async function UploadImage(uri, fileType) {
    
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
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log("File available at", downloadURL);
              const userDocRef = doc(db, 'users', currentUser.uid);
              await updateDoc(userDocRef, { profilePicture: downloadURL });
              console.log('Picture updated to database');        
            });
          }
        );
}
