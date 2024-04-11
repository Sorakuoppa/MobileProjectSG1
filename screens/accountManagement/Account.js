import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image, Alert, Pressable } from 'react-native';
import { general } from '../../styles/general';
import { db  } from '../../components/FirebaseConfig';
import { collection,  getDocs, query, where } from '@firebase/firestore';
import { useLoginContext } from '../../components/LoginContext';
import * as ImagePicker from 'expo-image-picker';
import UploadImage, { deleteProfilePicture } from '../../components/ImageManagement';
import { accountStyle } from '../../styles/accountManagementStyles/accountStyle';
import avatar from '../../assets/avatar.png'
import { useTheme } from "@react-navigation/native";
import { CommonActions, useNavigation } from "@react-navigation/native";



export default function Account() {
    const { colors } = useTheme();
    const { email } = useLoginContext(); // Assuming you have userEmail in your context
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation()
    const navigateToManagement = () => {
        navigation.navigate("ManageAccount")
    }

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
  return (
    <View style={general.scaffold}>
      <Text style={{...general.title, color:colors.text}}>Account</Text>
      {userData && (
        <View>
          {userData.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={{...accountStyle.image,}} />
          ) : (
            <Image source={avatar} style={{...accountStyle.image}} />
          )}
            <Text style={{...accountStyle.text, color:colors.text}}>{userData.username}</Text>
        </View>
      )}
    <View>
        <Pressable onPress={navigateToManagement} style={{...accountStyle.button, backgroundColor:colors.primary}}>
            <Text style={{...accountStyle.buttonText, color:colors.text}}>Edit account</Text>
        </Pressable>
    </View>
    </View>
  );
}
