import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { aboutUsData } from "./data/aboutUsData";
import { general } from "../../styles/general";


export default function MoreAboutUs({ navigation, route }) {
  const { colors } = useTheme();
  const { name, fname, image, link } = route.params;

  const filteredList = aboutUsData.filter((item) => item.name === name);

  // Function to handle opening the LinkedIn link
  const handleLinkedInPress = () => {
    if (link) {
      Linking.openURL(link);
    }
  };

  // Dynamically display the member's information
  return (
    <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
      <Text style={{ color: colors.primary, fontFamily: "Gantari", fontSize: 32, marginBottom: 20 }}>
        More about {fname}
      </Text>
      <Image
        source={image}
        style={{
          width: 150,
          height: 150,
          borderRadius: 100,
          marginBottom: 10,
        }}
      />
      {filteredList.map((item, index) => (
        <View key={index} style={{ width: "80%", }}>
          <Text style={{ ...general.text, color: colors.primary }}>
            {item.name}
          </Text>
          <Text style={{ ...general.text, color: colors.text }}>
            {item.title}
          </Text>
          <Text style={{ ...general.text, color: colors.text, textAlign: "left", width: "100%" }}>
            {item.description}
          </Text>
          {link && (
            <TouchableOpacity onPress={handleLinkedInPress}>
              <Text style={{ color: colors.primary, textDecorationLine: 'underline', marginTop: 10, marginLeft: 10, marginBottom: 30, fontWeight: 'bold'}}>
                Go to LinkedIn
              </Text>
            </TouchableOpacity>
          )}
          <Button
            children="Back"
            onPress={() => navigation.navigate("About us")}
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 30,
              marginTop: 10,
            }}
            mode="contained"
          />
        </View>
      ))}
    </View>
  );
}
