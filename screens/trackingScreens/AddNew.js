import React from "react";
import { View, Text, Pressable} from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { general } from "../../styles/general";
import { addNewStyle } from "../../styles/trackingScreens/addNewStyle";

export default function AddNew() {
    const { colors } = useTheme();


    return (
      <View style={{ ...general.scaffold, justifyContent: "flex-start" }}>
        <View style={addNewStyle.templatesContainer}>
          <Pressable onPress={() => console.log('Template chosen!')}>
            <Surface elevation={4} style={{...addNewStyle.template, backgroundColor: colors.background}}>
              <Icon name="dumbbell" size={40} color={colors.primary} />
              <Text style={{...addNewStyle.templateText, color: colors.text}}>Basic exercise template for your workout goals!</Text>
            </Surface>
          </Pressable>
        </View>
      </View>
    );
}