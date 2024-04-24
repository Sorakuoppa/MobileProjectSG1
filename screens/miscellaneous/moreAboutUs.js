import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { aboutUsData } from "./data/aboutUsData";
import { general } from "../../styles/general";

export default function MoreAboutUs({ navigation, route }) {
  const { colors } = useTheme();
  const { name } = route.params;
  const { image } = route.params;

  const filteredList = aboutUsData.filter((item) => item.name === name);

  useEffect(() => {
    console.log(filteredList);
  }, [filteredList]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        children="Back"
        onPress={() => navigation.navigate("About us")}
        style={{
          backgroundColor: colors.primary,
          padding: 10,
          borderRadius: 30,
        }}
        mode="contained"
      />
      <Text
        style={{ color: colors.primary, fontFamily: "Gantari", fontSize: 32 }}
      >
        More about us
      </Text>
      <Image
        source={image}
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          marginRight: 10,
        }}
      />
      {filteredList.map((item, index) => (
        <View key={index} style={{ width: "80%", padding: 10 }}>
          <Text style={{ ...general.text, color: colors.text }}>
            {item.name}
          </Text>
          <Text style={{ ...general.text, color: colors.text }}>
            {item.title}
          </Text>
          <Text style={{ ...general.text, color: colors.text }}>
            {item.description}
          </Text>
        </View>
      ))}
    </View>
  );
}
