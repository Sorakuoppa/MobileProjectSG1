import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function MoreAboutUs({ navigation, route }) {
  const { colors } = useTheme();
  const { name } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.text }}>More about us</Text>
      <Text style={{ color: colors.text }}>Name: {name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ color: colors.text }}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
