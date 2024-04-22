import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, TextInput, RadioButton, IconButton } from "react-native-paper";
import IconPicker from "react-native-icon-picker";
import Icon from "react-native-vector-icons/FontAwesome5";

import { choosableIcons } from "../data/createData";

import { general } from "../../../styles/general";
import { createStyle } from "../../../styles/trackingScreens/createStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Create({ template }) {
  const [value, setValue] = useState("Check");
  const [icon, setIcon] = useState("plus-circle");
  const [picker, setPicker] = useState(false);
  const { colors } = useTheme();

  const chooseIcon = (icon) => {
    console.log(icon)
    setIcon(icon.icon);
    setPicker(!picker);
  }

  return (
    <View style={{ ...general.scaffold, justifyContent: "flex-start" }}>
      <Text style={{ ...general.title, color: colors.text }}>
        Create your own tracker
      </Text>
      <Text
        style={{ color: colors.text, alignSelf: "flex-start", marginLeft: 20 }}
      >
        Tracker name:
      </Text>
      <TextInput
        label=""
        mode="outlined"
        style={{ width: "95%", margin: 10 }}
      />
      <Text style={{ ...general.title, color: colors.text }}>
        Choose icon:{" "}
      </Text>
      <IconPicker
        showIconPicker={picker}
        toggleIconPicker={() => setPicker(!picker)}
        iconDetails={choosableIcons}
        onSelect={(icon) => chooseIcon(icon)}
        content={<Icon name={icon} size={40} color={colors.primary} />}
        selectedIcon={{ icon: icon, family: "FontAwesome5" }}
        selectedIconContainerStyle={{ backgroundColor: colors.primary }}
        
      />
      <Text style={{ ...general.title, color: colors.text, marginTop: 20 }}>Milestones</Text>
      <Text
        style={{ color: colors.text, alignSelf: "flex-start", marginLeft: 20 }}
      >
        Milestone name:
      </Text>
      <TextInput
        label=""
        mode="outlined"
        style={{ width: "95%", margin: 10 }}
      />
      <Text style={{ color: colors.text }}>Milestone type:</Text>
      <RadioButton.Group
        onValueChange={(value) => setValue(value)}
        value={value}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.text }}>Check</Text>
          <RadioButton value="Check" color={colors.primary} />
          <Text style={{ color: colors.text }}>Numeric</Text>
          <RadioButton value="Numeric" color={colors.primary} />
        </View>
      </RadioButton.Group>
      <Button
        children="Add Milestone"
        mode="contained"
        buttonColor={colors.primary}
        style={{ width: "95%", margin: 10 }}
        onPress={() => {}}
      />
      <View style={createStyle.milestoneList}></View>
    </View>
  );
}
