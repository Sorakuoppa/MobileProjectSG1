import React, { useContext, useEffect, useState } from 'react';
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
import { MaterialIcons } from '@expo/vector-icons'; 
import { PermissionContext } from '../../components/Permissions';

export default function ManageAccount() {
  const { email } = useLoginContext(); 
  const [userData, setUserData] = useState(null);
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const { mediaLibararyStatus, requestMediaPermission, cameraStatus, requestCameraPermission } = useContext(PermissionContext);

 


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
      // Check if camera permissions are granted
      if (cameraStatus.granted) {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        const uri = result.assets[0].uri;
        console.log('URI Logged', uri);
        if (!result.canceled && uri) {
          // Upload the taken picture to Firebase Storage and update user data
          await UploadImage(uri);
          setUserData(prevUserData => ({ ...prevUserData, profilePicture: uri }));
          setModalVisible(false);
        }
      } else if (!cameraStatus.granted) {
        // Request camera permissions
        const { status } = await requestCameraPermission();
        if (status.granted) {
          // If permissions granted, proceed to take picture
          takePictureWithCamera();
        } else {
          Alert.alert('Camera permissions are required to take a photo.');
        }
      } else {
        Alert.alert('Camera permissions are required to take a photo.');
      }
    } catch (error) {
      console.log('Error taking picture:', error);
    }
  };

  const chooseFromGallery = async () => {
    try {
      // Check if media library permissions are granted
      if (mediaLibararyStatus.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        const uri = result.assets[0].uri;
        if (!result.canceled && uri) {
          // Upload the selected picture to Firebase Storage and update user data
          await UploadImage(uri);
          setUserData(prevUserData => ({ ...prevUserData, profilePicture: uri }));
          setModalVisible(false);
        }
      } else if (!mediaLibararyStatus.granted) {
        // Request media library permissions
        const { status } = await requestMediaPermission();
        console.log(status);
        if (status.granted) {
          // If permissions granted, proceed to choose from gallery
          chooseFromGallery();
        } else {
          Alert.alert('Media library permissions are required to choose a photo.');
        }
      } else {
        Alert.alert('Media library permissions are required to choose a photo.');
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };
  const deleteUserProfilePicture = async () => {
    try {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete your profile picture?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              const deleteUserPicture = await deleteProfilePicture(userData);
              if (deleteUserPicture) {
                setUserData(prevUserData => ({ ...prevUserData, profilePicture: '' }));
                setModalVisible(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      Alert.alert('Error', 'Failed to delete profile picture.');
    }
  };
  

  return (
    <View style={general.scaffold}>
      <Text style={{...general.title, color: colors.text}}>Account</Text>
      {userData && (
        <View>
          <TouchableOpacity onPress={selectImage}>
            <View>
              <Image source={userData.profilePicture ? { uri: userData.profilePicture } : avatar} style={manageAccountStyle.image} />
              <View style={{...manageAccountStyle.overlay, backgroundColor: colors.overlayBackgroundColor}}>
              <MaterialIcons name="add-a-photo" size={24} color="black" onPress={selectImage} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Modal for selecting image source */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={manageAccountStyle.modalContainer}>
          <View style={{...manageAccountStyle.modalContent, backgroundColor: colors.background}}>
            <TouchableOpacity style={{...manageAccountStyle.button, backgroundColor:colors.primary, alignSelf: 'left'}} onPress={takePictureWithCamera}>
              <Text style={{...manageAccountStyle.modalButtonText, color: colors.text}}>Take a picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...manageAccountStyle.button, backgroundColor:colors.primary, alignSelf: 'left'}} onPress={chooseFromGallery}>
              <Text style={{...manageAccountStyle.modalButtonText, color: colors.text}}>Choose from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...manageAccountStyle.button, backgroundColor:'red', alignSelf: 'left',}} onPress={deleteUserProfilePicture}>
              <Text style={{...manageAccountStyle.modalButtonText, color: colors.text}}>Delete your profile picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...manageAccountStyle.button, backgroundColor:colors.primary}} onPress={() => setModalVisible(false)}>
              <Text style={{...manageAccountStyle.modalButtonText, color: colors.text}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
