import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../../components/FirebaseConfig"; // Import FirebaseConfig auth
import { loginAndRegisterStyles } from "../../styles/accountManagementStyles/loginAndRegisterComponent";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../../components/ThemeContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLoginContext } from "../../components/LoginContext";
import { FirstTimeLoadContext } from "../../components/FirstTimeLoadContext";
import { CommonActions, useNavigation } from "@react-navigation/native";
const LoginComponent = () => {
  const { setFirstTimeLoaded } = useContext(FirstTimeLoadContext); // Updated context and variable
  const { setUserEmail, setUsername, setLoginState } = useLoginContext();
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const { colors } = useTheme();

  const navigateForgotPage = () => {
    navigation.navigate("ForgotPassword");
  };

  const navigateRegisterPage = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password); // Access auth directly from FirebaseConfig

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // Lisää LoginContextiin käyttäjän sähköpostin ja salasanan
        const userData = doc.data();
        const userEmail = userData.email;
        const username = userData.username;
        setUserEmail(userEmail);
        setUsername(username);
        setLoginState(true);

        console.log("User signed in successfully!");
        setEmail("");
        setPassword("");
        setFirstTimeLoaded(true);
      });
      const redirected = navigation.dispatch(
        CommonActions.navigate({ name: "Home" })
      );
      if (!redirected) {
        CommonActions.reset({
          index: 0,
          routes: [{ name: "DrawerStack" }],
        });
      }
    } catch (error) {
      alert(error.message);
      console.error("Authentication error:", error.message);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={{...loginAndRegisterStyles.container}}>
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
              ...loginAndRegisterStyles.title,
              color: colors.text,
              marginBottom: 20,
            }}
          >
            Logging in...
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
    <View style={loginAndRegisterStyles.container}>
      <Text style={{ ...loginAndRegisterStyles.title, color: colors.text }}>
        Sign In
      </Text>
      <View
        style={{
          ...loginAndRegisterStyles.formFieldContainer,
          borderColor: colors.primary,
        }}
      >
        <Text
          style={{
            ...loginAndRegisterStyles.formFieldTitle,
            color: colors.primary,
          }}
        >
          Email
        </Text>
        <TextInput
          style={{
            ...loginAndRegisterStyles.formFieldInput,
            borderColor: colors.primary,
          }}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
      </View>
      <View style={loginAndRegisterStyles.formFieldContainer}>
        <Text
          style={{
            ...loginAndRegisterStyles.formFieldTitle,
            color: colors.primary,
          }}
        >
          Password
        </Text>
        <TextInput
          style={{
            ...loginAndRegisterStyles.formFieldInput,
            borderColor: colors.primary,
          }}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View>
        <Pressable>
          <Text
            style={loginAndRegisterStyles.anonText}
            onPress={navigateForgotPage}
          >
            Forgot password?
          </Text>
        </Pressable>
      </View>
      <View style={loginAndRegisterStyles.paddingTopView}>
        <Pressable>
          <Text
            style={loginAndRegisterStyles.anonText}
            onPress={navigateRegisterPage}
          >
            New user? Register here!
          </Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={{
            ...loginAndRegisterStyles.button,
            backgroundColor: colors.primary,
          }}
          onPress={handleLogin}
        >
          <Text style={loginAndRegisterStyles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default LoginComponent;
