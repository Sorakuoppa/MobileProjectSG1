import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { aboutUsData } from "./data/aboutUsData";
import { general } from "../../styles/general";


export default function MoreAboutUs({ navigation, route }) {
  const { colors } = useTheme();
  const { name } = route.params;


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.primary, fontFamily: 'Gantari', fontSize: 32 }}>More about us</Text>
      <Text style={{ color: colors.text, fontFamily: 'Gantari' }}>Name: {name}</Text>
      <Text style={{ color: colors.text, fontFamily: 'Gantari' }}>Links?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ color: colors.text, backgroundColor: colors.primary, fontFamily: 'Gantari', padding: 10, borderRadius: 30,  }}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
