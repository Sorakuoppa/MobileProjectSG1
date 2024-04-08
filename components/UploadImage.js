import React from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from './FirebaseConfig';
import { doc, updateDoc } from '@firebase/firestore';
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
  return (
    <div></div>
  )
}
