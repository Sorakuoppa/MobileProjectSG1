import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image, Alert } from 'react-native';
import { general } from '../../styles/general';
import { db  } from '../../components/FirebaseConfig';
import { collection,  getDocs, query, where } from '@firebase/firestore';
import { useLoginContext } from '../../components/LoginContext';
import * as ImagePicker from 'expo-image-picker';
import UploadImage, { deleteProfilePicture } from '../../components/ImageManagement';
import { accountStyle } from '../../styles/accountManagementStyles/accountStyle';

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
        aspect: [4,3],
        quality: 1,
      });
      const uri = result.assets[0].uri
      if (!result.canceled && uri) {
        const imageUrl = await UploadImage(uri); // Upload image and get URL
        if (imageUrl) {
          setUserData(prevUserData => ({ ...prevUserData, profilePicture: uri }));
        }     
       } else {
        console.log('Image selection cancelled or URI not found');
      } 
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  const takePictureWithCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
      const uri = result.assets[0].uri
      console.log('URI Logged',uri);
      if (!result.canceled && uri) {
        // Upload the taken picture to Firebase Storage and update user data
        const imageUrl = await UploadImage(uri);
        if (imageUrl) {
          setUserData(prevUserData => ({ ...prevUserData, profilePicture: uri }));
        }
      }
    } catch (error) {
      console.log('Error taking picture:', error);
    }
  };

  const deleteUserProfilePicture = async () => {
    try {
      const deleteUserPicture = await deleteProfilePicture(userData)
      console.log(deleteUserPicture);
      if (deleteUserPicture) {
      setUserData(prevUserData => ({ ...prevUserData, profilePicture: '' }));
    }
    } catch (error) {

    }
  }
  

  return (
    <View style={general.scaffold}>
      <Text style={general.title}>Account</Text>
      {userData && (
        <View>
          <Text>Email: {userData.email}</Text>
          <Text>Username: {userData.username}</Text>
          {userData.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={accountStyle.image} />
          ) : (
            <Image style={accountStyle.image} />

          )}
          <Button title="Select Image from gallery" onPress={selectImage} />

        </View>
        
      )}
      <View style={accountStyle.padding}>
     <Button title="Take a picture"  onPress={takePictureWithCamera} />
     </View>
      <View style={accountStyle.padding}>
     <Button title="Delete your profile picture "  onPress={deleteUserProfilePicture} />
     </View>
    </View>
  );
  
}
