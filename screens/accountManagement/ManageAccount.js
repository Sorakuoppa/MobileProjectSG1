import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import { general } from '../../styles/general';
import { auth, db  } from '../../components/FirebaseComponents/FirebaseConfig';
import { collection,  doc,  getDocs, query, updateDoc, where } from '@firebase/firestore';
import { useLoginContext } from '../../components/Contexts/LoginContext';
import * as ImagePicker from 'expo-image-picker';
import UploadImage, { deleteProfilePicture } from '../../components/AccountComponents/ImageManagement';
import avatar from '../../assets/avatar/2.png'
import { useTheme } from "@react-navigation/native";
import { updateEmail, updatePassword } from 'firebase/auth';
import { Modal } from 'react-native';
import { manageAccountStyle } from '../../styles/accountManagementStyles/manageAccountStyle';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { PermissionContext } from '../../components/AccountComponents/Permissions';
import { ThemeContext } from '../../components/Contexts/ThemeContext';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { useLoadingContext } from '../../components/Contexts/ProfilePictureLoadingContext';
import { isValidEmail, isValidPassword, isValidUsername, reauthenticateUser } from '../../components/AccountComponents/Validations';

// TODO 15.4
// ADD HANDLING FOR AUTH/REQUIRES-RECENT-LOGIN ERROR
// STYLE SAVE CHANGES BUTTON
// PRETTIFY ERROR HANDLING

export default function ManageAccount() {
  const { mediaLibararyStatus, requestMediaPermission, cameraStatus, requestCameraPermission } = useContext(PermissionContext)
  const { email } = useLoginContext(); 
  const { colors } = useTheme();
  const [userData, setUserData] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const {isLoading, setIsLoading} = useLoadingContext()
  const {setUsername, setUserEmail} = useLoginContext() 
  const [reAuthPassword, setReAuthPassword] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", '==', email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
          setIsUserDataLoading(false)
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
      console.log(cameraStatus);
      if (cameraStatus.granted) {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        handleImagePickerResult(result);
      } else {
        const status = await requestCameraPermission();
        if (status.granted) {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          handleImagePickerResult(result);
      }
      }
    } catch (error) {
      console.log('Error taking picture:', error);
      // Handle specific errors if needed
    }
  };
  
  const chooseFromGallery = async () => {
    try {
      console.log(mediaLibararyStatus);
      if (mediaLibararyStatus.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        handleImagePickerResult(result);
      } else {
        const status = await requestMediaPermission();
        if (status.granted) {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          handleImagePickerResult(result);
      }
    }
  } catch (error) {
      console.log('ImagePicker Error:', error);
      // Handle specific errors if needed
    }
  }
;
  
  const handleImagePickerResult = async (result) => {
    const uri = result.assets[0].uri;
    if (!result.canceled && uri) {
      // Upload the selected picture to Firebase Storage and update user data
      await UploadImage(uri, setIsLoading);
      setUserData(prevUserData => ({ ...prevUserData, profilePicture: uri }));
      setModalVisible(false);
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
    try {
      // Update email address in Firebase Authentication
      await updateEmail(auth.currentUser, newEmail);
      // Update email address in Firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { email: newEmail });
      // Update local state with the new email
      setUserEmail(newEmail);
      // Clear the new email input
      setNewEmail('');
      console.log('Changed email successfully'); 
   } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        setIsModalVisible(true);
      }
      console.log('Error changing email:', error);
    }
  };

  const handleChangePassword = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          await updatePassword(user,newPassword);
          // Password updated successfully
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

      try{
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { username: newUsername });

      // Update local state with the new username
      setUserData(prevUserData => ({ ...prevUserData, username: newUsername }));
      setUsername(newUsername)
      setNewUsername('')
      } catch (error) {
        console.log("Error updating username:", error);
      }
    };
  
    const openReauthModal = () => {
      if (newEmail != '' || newPassword != '') {
      setIsModalVisible(true)
      setReAuthPassword('')
    } else {
      handleSave()
    }
  }

    const handleReauthentication = async () => {
      setIsModalVisible(false)
      const reauthResult = await reauthenticateUser(reAuthPassword);
      if (reauthResult) {
            handleSave()
          } else {
            Alert.alert('Failed to reauthenticate user.')
          }
    }
    

    const handleSave = async () => {
      try {
        // Validation checks
        if ( newEmail && !isValidEmail(newEmail)) {
          Alert.alert('Invalid Email', 'Please enter a valid email address.');
          return;
        }
    
        if ( newPassword && !isValidPassword(newPassword)) {
          Alert.alert('Invalid Password', 'Password must be atleast 6 characters.');
          return;
        }
    
        if ( newUsername && !isValidUsername(newUsername)) {
          Alert.alert('Invalid Username', 'Please enter a valid username.');
          return;
        }
    
        // Call only the functions for fields that have been changed
        const promises = [];
    
        if (newEmail) {
          promises.push(handleChangeEmail());
        }
    
        if (newPassword) {
          promises.push(handleChangePassword());
        }
    
        if (newUsername) {
          promises.push(handleChangeUsername());
        }
    
        // Wait for all promises to resolve
        if (promises){
        await Promise.all(promises);
        // Display a success message after all operations are completed
        Alert.alert('Changes saved successfully');
      } 
      } catch (error) {
        console.error('Error saving changes:', error);
        Alert.alert('Error', 'Failed to save changes.');
      }
    };
    
    
   
    // Account detail change handling ends

if (isUserDataLoading) {
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
              <Surface style={{borderRadius: 120, backgroundColor: colors.accent, padding: 5}} elevation={3}>
                {!isLoading ?  <Image
                  source={
                    userData.profilePicture
                      ? { uri: userData.profilePicture }
                      : avatar
                  }
                  style={{...manageAccountStyle.image}}
                /> :
                <ActivityIndicator
            animating={true}
            color={colors.primary}
            size={200}
          />
                }
                
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
                  style={{ ...manageAccountStyle.iconStyle, backgroundColor: colors.accent, }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View style={manageAccountStyle.formFieldContainer}>
      <Text
          style={{
            ...manageAccountStyle.formFieldTitle,
            color: colors.primary,
          }}
        >
          Email
        </Text>
        <TextInput
          placeholder={email}
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
      <Text
          style={{
            ...manageAccountStyle.formFieldTitle,
            color: colors.primary,
          }}
        >
          Password
        </Text>
        <TextInput
          placeholder="New password"
          value={newPassword}
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
      <Text
          style={{
            ...manageAccountStyle.formFieldTitle,
            color: colors.primary,
          }}
        >
          Username
        </Text>
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
          <Pressable style={{...manageAccountStyle.button, backgroundColor: colors.primary, alignSelf: 'center'}} onPress={openReauthModal}>
          <Text style={{color: colors.text}}>Save changes</Text>
          </Pressable>
          
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
      <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={() => setIsModalVisible(false)}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ backgroundColor: colors.background, padding: 20, borderRadius: 10 }}>
      <TouchableOpacity
        onPress={() => setIsModalVisible(false)}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
      >
        <MaterialIcons
          name="close"
          color={colors.primary}
          size={24}
          onPress={() => setIsModalVisible(false)}
        />
      </TouchableOpacity>
      <Text style={{ ...manageAccountStyle.text, color: colors.text, backgroundColor: colors.background, paddingBottom: 15, marginTop: 30 }}>Please re-enter your current password</Text>

      <TextInput
        placeholder="Password"
        value={reAuthPassword}
        onChangeText={setReAuthPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{ ...manageAccountStyle.formField, borderColor: colors.primary, marginBottom: 15 }}
      />
      <Pressable
        style={{ ...manageAccountStyle.button, backgroundColor: colors.primary, alignSelf: 'center' }}
        onPress={handleReauthentication}
      >
        <Text style={{ ...manageAccountStyle.modalButtonText, color: colors.text }}>Submit</Text>
      </Pressable>
    </View>
  </View>
</Modal>
    </View>
  );
}
