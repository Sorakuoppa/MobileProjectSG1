import React from "react";
import { View, Text, Pressable, Animated } from "react-native";

import { general } from "../../styles/general";
import { trackerStyle } from "../../styles/trackingScreens/trackerStyle";
import { addNewStyle } from "../../styles/trackingScreens/addNewStyle";
import Icon from "react-native-vector-icons/FontAwesome5";
import { IconButton, Surface } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

export default function Trackers({ navigation }) {
  const { colors } = useTheme();

  const trackerPress = () => {
    navigation.navigate("MyTracker");
  };

  return (
    <View style={general.scaffold}>
      <Text style={general.title}>Trackers</Text>
      <View>
        <Pressable onPress={trackerPress}>
          <Surface
            elevation={4}
            style={{
              ...addNewStyle.template,
              backgroundColor: colors.background,
            }}
          >
            <Icon name="running" size={40} color={colors.primary} />
            <Text style={{ ...addNewStyle.templateText, color: colors.text }}>
              My running tracker
            </Text>
          </Surface>
        </Pressable>
      </View>
    </View>
  );
}
