import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image, Alert, TouchableOpacity } from 'react-native';
import { general } from '../../styles/general';
import { db  } from '../../components/FirebaseConfig';
import { collection,  getDocs, query, where } from '@firebase/firestore';
import { useLoginContext } from '../../components/LoginContext';
import * as ImagePicker from 'expo-image-picker';
import UploadImage, { deleteProfilePicture } from '../../components/ImageManagement';
import avatar from '../../assets/avatar.png'
import { useTheme } from "@react-navigation/native";
import { updatePassword } from 'firebase/auth';
import { Modal } from 'react-native';
import { manageAccountStyle } from '../../styles/accountManagementStyles/manageAccountStyle';
import { Pressable } from 'react-native';
TouchableOpacity

export default function ManageAccount() {
  const { email } = useLoginContext(); // Assuming you have userEmail in your context
  const [userData, setUserData] = useState(null);
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

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
    }
    if (email) {
      fetchUserData();
    }
  }, [email]);

  // Function to handle image selection
  const selectImage = () => {
    setModalVisible(true);

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
       await UploadImage(uri);
       setUserData(prevUserData => ({ ...prevUserData, profilePicture: uri }));
       setModalVisible(false);
      }
    } catch (error) {
      console.log('Error taking picture:', error);
    }
  };

  const chooseFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
      const uri = result.assets[0].uri
      if (!result.canceled && uri) {
         await UploadImage(uri); // Upload image and get URL
         setUserData(prevUserData => ({ ...prevUserData, profilePicture: uri }));
         console.log('Set user profile picture data as:', userData.profilePicture);
         setModalVisible(false);
       } else {
        console.log('Image selection cancelled or URI not found');
      } 
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  }

  const deleteUserProfilePicture = async () => {
    try {
      const deleteUserPicture = await deleteProfilePicture(userData)
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
          {userData.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={manageAccountStyle.image} />
          ) : (
            <Image source={avatar} style={manageAccountStyle.image} />
          )}
          <Text>Email: {userData.email}</Text>
          <Text>Username: {userData.username}</Text>
          
        </View>
      )}
      
      <View style={manageAccountStyle.padding}>
      <Pressable style={{...manageAccountStyle.button, backgroundColor:colors.primary}} onPress={selectImage}>
          <Text>Set a new profile photo</Text>
        </Pressable>
        <Pressable style={{...manageAccountStyle.button, backgroundColor:colors.primary}} onPress={deleteUserProfilePicture}>
          <Text>Delete your profile picture</Text>
        </Pressable>
      </View>

      {/* Modal for selecting image source */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={manageAccountStyle.modalContainer}>
          <View style={manageAccountStyle.modalContent}>
            <TouchableOpacity style={{...manageAccountStyle.button, backgroundColor:colors.primary, alignSelf: 'left'}} onPress={takePictureWithCamera}>
              <Text style={manageAccountStyle.modalButtonText}>Take a picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...manageAccountStyle.button, backgroundColor:colors.primary, alignSelf: 'left'}} onPress={chooseFromGallery}>
              <Text style={manageAccountStyle.modalButtonText}>Choose from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...manageAccountStyle.button, backgroundColor:colors.primary, alignSelf: 'left'}} onPress={() => setModalVisible(false)}>
              <Text style={manageAccountStyle.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
