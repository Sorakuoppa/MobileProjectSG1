import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import { general } from '../../styles/general';
import { auth, db  } from '../../components/FirebaseConfig';
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
import { ThemeContext } from '../../components/ThemeContext';
import { ActivityIndicator, Surface } from 'react-native-paper';
export default function ManageAccount() {
  const { mediaLibararyStatus, requestMediaPermission, cameraStatus, requestCameraPermission } = useContext(PermissionContext)
  const { email } = useLoginContext(); 
  const { colors } = useTheme();
  const [userData, setUserData] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

 


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", '==', email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
          setIsLoading(false)
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    }
    if (email) {
      fetchUserData();
    }
  }, [email]);


  // Photo deletion and selection handling starts 

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

  // Photo deletion and selection handling ends


  // Account detail change handling starts

  const handleChangeEmail = async () => {
    // Handle updating email logic here
  };

  const handleChangePassword = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          await updatePassword(user,newPassword);
          // Password updated successfully
          Alert.alert('Success', 'Password updated successfully.');
          setNewPassword('')
        } else {
          // No user signed in
          Alert.alert('Error', 'No user signed in.');
        }
      } catch (error) {
        console.error('Error updating password:', error.message);
        Alert.alert('Error', 'Failed to update password.');
      }
  };

  const handleChangeUsername = async () => {
    // Handle updating username logic here
  };
  
    // Account detail change handling ends

if (isLoading) {
      return (
        <View style={{...general.scaffold}}>
          <Image
            source={
              theme === "dark"
                ? require("../../assets/logos/onTrack_dark_theme.png")
                : require("../../assets/logos/onTrack_light_theme.png")
            }
            style={{ width: 200, height: 100, marginBottom: 40}}
          />
          <View>
            <Text
              style={{
                ...general.title,
                color: colors.text,
                marginBottom: 20,
              }}
            >
              Fetching account data...
            </Text>
            <ActivityIndicator
              animating={true}
              color={colors.primary}
              size={80}
            />
          </View>
        </View>
      );
    }

  return (
    <View style={general.scaffold}>
      <Text style={{ ...general.title, color: colors.text }}>Account</Text>
      {userData && (
        <View>
          <TouchableOpacity onPress={selectImage}>
            <View>
              <Surface style={{borderRadius: 90, backgroundColor: colors.accent}} elevation={3}>
                <Image
                  source={
                    userData.profilePicture
                      ? { uri: userData.profilePicture }
                      : avatar
                  }
                  style={manageAccountStyle.image}
                />
              </Surface>
              <View
                style={{
                  ...manageAccountStyle.overlay,
                  backgroundColor: colors.overlayBackgroundColor,
                }}
              >
                <MaterialIcons
                  name="add-a-photo"
                  size={24}
                  color={colors.primary}
                  onPress={selectImage}
                  style={{
                    opacity: 0.9,
                    backgroundColor: colors.accent,
                    borderRadius: 20,
                    padding: 10,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View style={manageAccountStyle.formFieldContainer}>
        <TextInput
          placeholder={userData.email}
          value={newEmail}
          onChangeText={setNewEmail}
          style={{
            ...manageAccountStyle.formField,
            borderColor: colors.primary,
          }}
          autoCapitalize="none"
        />
      </View>
      <View style={manageAccountStyle.formFieldContainer}>
        <TextInput
          placeholder="New password"
          secureTextEntry
          onChangeText={setNewPassword}
          autoCapitalize="none"
          style={{
            ...manageAccountStyle.formField,
            borderColor: colors.primary,
          }}
        />
      </View>
      <View style={manageAccountStyle.formFieldContainer}>
        <TextInput
          placeholder={userData.username}
          value={newUsername}
          onChangeText={setNewUsername}
          style={{
            ...manageAccountStyle.formField,
            borderColor: colors.primary,
          }}
        />
      </View>

      <Button title="Change Email" onPress={handleChangeEmail} />
      <Button title="Change Password" onPress={handleChangePassword} />
      <Button title="Change Username" onPress={handleChangeUsername} />
      {/* Modal for selecting image source */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={manageAccountStyle.modalContainer}>
          <View
            style={{
              ...manageAccountStyle.modalContent,
              backgroundColor: colors.background,
            }}
          >
            <TouchableOpacity
              style={{
                ...manageAccountStyle.button,
                backgroundColor: colors.primary,
                alignSelf: "left",
              }}
              onPress={takePictureWithCamera}
            >
              <Text
                style={{
                  ...manageAccountStyle.modalButtonText,
                  color: colors.text,
                }}
              >
                Take a picture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...manageAccountStyle.button,
                backgroundColor: colors.primary,
                alignSelf: "left",
              }}
              onPress={chooseFromGallery}
            >
              <Text
                style={{
                  ...manageAccountStyle.modalButtonText,
                  color: colors.text,
                }}
              >
                Choose from gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...manageAccountStyle.button,
                backgroundColor: "red",
                alignSelf: "left",
              }}
              onPress={deleteUserProfilePicture}
            >
              <Text
                style={{
                  ...manageAccountStyle.modalButtonText,
                  color: colors.text,
                }}
              >
                Delete your profile picture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...manageAccountStyle.button,
                backgroundColor: colors.primary,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={{
                  ...manageAccountStyle.modalButtonText,
                  color: colors.text,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
