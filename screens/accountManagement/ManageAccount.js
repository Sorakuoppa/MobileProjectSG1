import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import { general } from '../../styles/general';
import { auth, db  } from '../../components/FirebaseConfig';
import { collection,  doc,  getDocs, query, updateDoc, where } from '@firebase/firestore';
import { useLoginContext } from '../../components/LoginContext';
import * as ImagePicker from 'expo-image-picker';
import UploadImage, { deleteProfilePicture } from '../../components/ImageManagement';
import avatar from '../../assets/avatar.png'
import { useTheme } from "@react-navigation/native";
import { updateEmail, updatePassword } from 'firebase/auth';
import { Modal } from 'react-native';
import { manageAccountStyle } from '../../styles/accountManagementStyles/manageAccountStyle';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { PermissionContext } from '../../components/Permissions';
import { ThemeContext } from '../../components/ThemeContext';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { useLoadingContext } from '../../components/ProfilePictureLoadingContext';
import { isValidEmail, isValidPassword, isValidUsername, reauthenticateUser } from '../../components/Validations';

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
          await UploadImage(uri, setIsLoading);
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
    try {

      await updateEmail(auth.currentUser, newEmail)
      setUserEmail(newEmail)
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { email: newEmail });
      setNewEmail('')
      console.log(newEmail);
      console.log(userData.email);
      Alert.alert('Changed email succesfully')
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

      try{
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { username: newUsername });

      // Update local state with the new username
      setUserData(prevUserData => ({ ...prevUserData, username: newUsername }));
      setUsername(newUsername)
      setNewUsername('')
      Alert.alert('Successfully updated username!')
      } catch (error) {
        console.log("Error updating username:", error);
      }
    };
  
    const openReauthModal = () => {
      setIsModalVisible(true)
      setReAuthPassword('')
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
          Alert.alert('Invalid Password', 'Please enter a valid password.');
          return;
        }
    
        if ( newUsername && !isValidUsername(newUsername)) {
          Alert.alert('Invalid Username', 'Please enter a valid username.');
          return;
        }
    
        // Call only the functions for fields that have been changed
        const promises = [];
    
        if (newEmail && newEmail !== email) {
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
              <Surface style={{borderRadius: 90, backgroundColor: colors.accent}} elevation={3}>
                {!isLoading ?  <Image
                  source={
                    userData.profilePicture
                      ? { uri: userData.profilePicture }
                      : avatar
                  }
                  style={manageAccountStyle.image}
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
          <Text>Save changes</Text>
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
            <Text style={{...manageAccountStyle.text, color:colors.text, backgroundColor: colors.background, paddingBottom: 15}}>Please re-enter your password</Text>
            
            <TextInput
              placeholder="Password"
              value={reAuthPassword}
              onChangeText={setReAuthPassword}
              secureTextEntry
              style={{...manageAccountStyle.formField,
                borderColor: colors.primary,
              }}
            />
            <Pressable 
            style={{...manageAccountStyle.button, backgroundColor: colors.primary, alignSelf: 'center',}} 
            onPress={handleReauthentication}>
              <Text style={{...manageAccountStyle.modalButtonText,
                  color: colors.text,}}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
