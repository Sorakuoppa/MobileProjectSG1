import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { general } from '../../styles/general';
import { db  } from '../../components/FirebaseComponents/FirebaseConfig';
import { collection,  getDocs, query, where } from '@firebase/firestore';
import { useLoginContext } from '../../components/Contexts/LoginContext';
import { accountStyle } from '../../styles/accountManagementStyles/accountStyle';
import avatar from '../../assets/avatar/2.png'
import { useIsFocused, useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { ThemeContext } from "../../components/Contexts/ThemeContext";
import { useLoadingContext } from '../../components/Contexts/ProfilePictureLoadingContext';


export default function Account() {
    const { colors } = useTheme();
    const { email } = useLoginContext(); // Assuming you have userEmail in your context
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation()
    const [isAccountDataLoading, setIsAccountDataLoading] = useState(true);
    const { theme } = useContext(ThemeContext);
    const isFocused = useIsFocused();
    const { IsLoading } = useLoadingContext();

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
        setIsAccountDataLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    }
    if (email && isFocused) {
      fetchUserData();
    }
  }, [email, isFocused]);
  return (
    <View style={general.scaffold}>
      {isAccountDataLoading ? (
        <View style={{ ...accountStyle.container }}>
          <Image
            source={
              theme === "dark"
                ? require("../../assets/logos/onTrack_dark_theme.png")
                : require("../../assets/logos/onTrack_light_theme.png")
            }
            style={{ width: 200, height: 100, marginBottom: 40 }}
          />
          <View>
            <Text
              style={{
                ...accountStyle.title,
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
      ) : (
        <View style={general.scaffold}>
          <Text style={{ ...general.title, color: colors.text }}>Account</Text>
          {userData && (
            <View>
              {IsLoading ? (
                <ActivityIndicator
                  animating={true}
                  color={colors.primary}
                  size={200}
                />
              ) : (
                userData.profilePicture ? (
                  <Image
                    source={{ uri: userData.profilePicture }}
                    style={{ ...accountStyle.image }}
                  />
                ) : (
                  <Image
                    source={avatar}
                    style={{ ...accountStyle.image }}
                  />
                )
              )}
            </View>
          )}
          <Text style={{ ...accountStyle.text, color: colors.text }}>
            {userData.username}
          </Text>
          <View>
            <Pressable
              onPress={navigateToManagement}
              style={{ ...accountStyle.button, backgroundColor: colors.primary }}
            >
              <Text style={{ ...accountStyle.buttonText, color: colors.text }}>
                Edit account
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}  