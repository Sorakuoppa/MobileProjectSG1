import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { aboutUsData } from "./data/aboutUsData";
import { general } from "../../styles/general";


export default function MoreAboutUs({ navigation, route }) {
  const { colors } = useTheme();
  const { name } = route.params;


  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
      <Text style={{...general.title,  color: colors.text }}>More about us</Text>
      <Text style={{ color: colors.text }}>Name: {name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ color: colors.text }}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
