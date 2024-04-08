import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { general } from '../../styles/general';
import { db  } from '../../components/FirebaseConfig';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useLoginContext } from '../../components/LoginContext';
import * as ImagePicker from 'expo-image-picker';
import UploadImage from '../../components/UploadImage';
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
          <Button title="Select Image" onPress={selectImage} />
        </View>
      )}
    </View>
  );
  
}
