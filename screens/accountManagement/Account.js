import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { general } from '../../styles/general';
import { db, auth, storage, storageRef } from '../../components/FirebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc } from '@firebase/firestore';
import { useLoginContext } from '../../components/LoginContext';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';

export default function Account() {
  const { email } = useLoginContext(); // Assuming you have userEmail in your context
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", '==', email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  // Function to handle image selection
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result.assets[0].uri);
  
      if (!result.canceled && result.assets[0].uri) {
        const currentUser = auth.currentUser; // Get the current user
        const imagesRef = ref(storage, 'images');
        // Upload the selected image to Firebase Storage
        await uploadBytes(imagesRef, result.assets[0].uri);
        // Once the image is uploaded, get the download URL
        const url = await getDownloadURL(imagesRef);
        // Update the user document in Firestore with the image URL
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, { profilePicture: url });
        console.log('Picture updated to database');
      } else {
        console.log('Image selection cancelled or URI not found');
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };
console.log(userData);
  return (
    <View style={general.scaffold}>
      <Text style={general.title}>Account</Text>
      {userData && (
        <View>
          <Text>Email: {userData.email}</Text>
          <Text>Username: {userData.username}</Text>
          {userData.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={{ width: 100, height: 100 }} />
          ) : (
            <Image  style={{ width: 100, height: 100 }} />
            // Alternatively, you can leave it blank
            // <View style={{ width: 100, height: 100 }} />
          )}
          <Button title="Select Image" onPress={selectImage} />
        </View>
      )}
    </View>
  );
  
}
